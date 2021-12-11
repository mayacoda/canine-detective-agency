import { GameState } from '../../interface/game-state-interface'
import { PlayerData } from '../../interface/socket-interfaces'
import { Server, Socket } from 'socket.io'
import { ServerStateManager } from './server-state-manager'
import { demoGameData } from './game-data/demo-game-data'
import { resolveGameState } from './game-data/resolve-game-state'

import { hri } from 'human-readable-ids'
import { TypedServerSocket } from './types'
import { dataRequestHandler, gameStateUpdateHandler } from './game-state-handlers'
import admin from 'firebase-admin'
import { COLLECTION_NAME } from './constants'
import { congratulatoryMessage, validateSolution } from './game-data/finished-game'

const io = new Server(parseInt(process.env.PORT) || 3000)

const globalStates: Record<string, ServerStateManager> = {}
const playerRoomMap: Record<string, string> = {}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  })
})

const db = admin.firestore()

function createDummyState(): GameState {
  return {
    players: {},
    gameData: demoGameData,
    roomId: ''
  }
}

io.on('connection', (socket: Socket) => {
  initPlayerCommunication(socket)
})

const initClientSocketListeners = (socket: TypedServerSocket, stateManager: ServerStateManager) => {
  socket.on('request', (request) => {
    dataRequestHandler(socket, request, stateManager.getState().gameData)
  })
  socket.on('updateState', (update) => {
    gameStateUpdateHandler(stateManager, update)
  })
  socket.on('move', pos => {
    stateManager.updatePosition((socket as Socket).id, pos)
  })
  socket.on('changeMap', map => {
    stateManager.updateMap((socket as Socket).id, map)
  })

  socket.on('solve', ({ culprit, reason }) => {
    console.log('got solve request from client', culprit, reason)
    if (validateSolution(culprit, reason)) {
      io.sockets.in(stateManager.getState().roomId).emit('murderSolved', congratulatoryMessage)
    } else {
      socket.emit('wrongSolution')
    }
  })

  ;(socket as Socket).on('disconnect', () => {
    stateManager.removePlayer((socket as Socket).id)
  })
}

const initPlayerCommunication = (socket: TypedServerSocket) => {
  socket.on('createRoom', () => {
    createRoomHandler(socket as Socket)
  })
  socket.on('joinRoom', (roomId) => {
    joinRoomHandler(socket as Socket, roomId).then(console.log)
  })
}

const createRoomHandler = (socket: Socket) => {
  const roomId = hri.random()
  playerRoomMap[socket.id] = roomId

  const newState = createDummyState()
  newState.roomId = roomId

  initRoom(socket, roomId, newState)
}

const initRoom = (socket: Socket, roomId: string, state: GameState) => {
  const typedSocket = socket as TypedServerSocket
  socket.join(roomId)

  const stateManager = new ServerStateManager(state, db, (newState) => {
    io.sockets.in(roomId).emit('update', resolveGameState(newState))
  }, (players) => {
    io.sockets.in(roomId).emit('playersUpdate', players)
  })

  stateManager.setRoomId(roomId)
  globalStates[roomId] = stateManager

  typedSocket.emit('roomId', roomId)
  typedSocket.emit('playerId', socket.id)

  typedSocket.on('startGame', (data) => {
    startGameHandler(socket, stateManager, data)
  })
}

const joinRoomHandler = async (socket: Socket, roomId: string) => {
  let room = io.sockets.adapter.rooms.get(roomId)
  const typedSocket = socket as TypedServerSocket

  if (!room || room.size === 0) {
    // if the room isn't open yet, check if it exists in the DB
    const cachedRoomState = await db.collection(COLLECTION_NAME).doc(roomId).get()
    if (cachedRoomState.exists) {
      // if it does, initialize it instead of throwing an error
      return initRoom(socket, roomId, cachedRoomState.data() as GameState)
    } else {
      return typedSocket.emit('unknownRoom')
    }
  }

  if (room.size >= 4) return typedSocket.emit('tooManyPlayers')

  playerRoomMap[socket.id] = roomId

  typedSocket.emit('roomId', roomId)
  typedSocket.emit('playerId', socket.id)

  const stateManager = globalStates[roomId]

  typedSocket.on('startGame', data => {
    startGameHandler(socket, stateManager, data)
  })
}

const startGameHandler = (socket: Socket,
                          stateManager: ServerStateManager,
                          data: PlayerData) => {
  console.log(`${ socket.id } is starting game in room`)
  initClientSocketListeners(socket, stateManager)

  stateManager.setPlayerData(socket.id, data)

  const state = resolveGameState(stateManager.getState() as GameState)
  console.log('emitting state update', state)

  ;(socket as TypedServerSocket).emit(
    'update',
    state
  )
}
