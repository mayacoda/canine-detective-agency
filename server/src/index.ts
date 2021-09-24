import { GameState } from '../../interface/game-state-interface'
import { PlayerData } from '../../interface/socket-interfaces'
import { Server, Socket } from 'socket.io'
import { ServerStateManager } from './server-state-manager'
import { demoGameData } from './game-data/demo-game-data'
import { resolveGameState } from './game-data/resolve-game-state'

import { hri } from 'human-readable-ids'
import { TypedServerSocket } from './types'
import { dataRequestHandler, gameStateUpdateHandler } from './game-state-handlers'

const io = new Server(parseInt(process.env.PORT) || 3000)

const globalStates: Record<string, ServerStateManager> = {}
const playerRoomMap: Record<string, string> = {}

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
    dataRequestHandler(socket, request)
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

  ;(socket as Socket).on('disconnect', () => {
    stateManager.removePlayer((socket as Socket).id)
  })
}

const initPlayerCommunication = (socket: TypedServerSocket) => {
  socket.on('createRoom', () => {
    createRoomHandler(socket as Socket)
  })
  socket.on('joinRoom', (roomId) => {
    joinRoomHandler(socket as Socket, roomId)
  })
}

const createRoomHandler = (socket: Socket) => {
  console.log('player wants to join room')
  const roomId = hri.random()
  console.log('generated id', roomId)
  playerRoomMap[socket.id] = roomId

  console.log('emitting roomId', roomId)
  socket.emit('roomId', roomId)

  socket.join(roomId)
  console.log('emitting playerId', socket.id)
  socket.emit('playerId', socket.id)

  const stateManager = new ServerStateManager(createDummyState(), (newState) => {
    io.sockets.in(roomId).emit('update', resolveGameState(newState))
  }, (players) => {
    io.sockets.in(roomId).emit('playersUpdate', players)
  })

  stateManager.setRoomId(roomId)

  globalStates[roomId] = stateManager

  ;(socket as TypedServerSocket).on('startGame', (data) => {
    startGameHandler(socket, stateManager, data)
  })

}

const joinRoomHandler = (socket: Socket, roomId: string) => {
  const room = io.sockets.adapter.rooms.get(roomId)
  const typedSocket = socket as TypedServerSocket

  console.log(`${ socket.id } is requesting to join roomId ${ roomId }`)
  if (!room || room.size === 0) return typedSocket.emit('unknownRoom')

  if (room.size >= 4) return typedSocket.emit('tooManyPlayers')

  playerRoomMap[socket.id] = roomId
  socket.join(roomId)

  console.log('emitting roomId', roomId)
  socket.emit('roomId', roomId)
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
