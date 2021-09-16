import { GameState } from '../../interface/game-state-interface'
import {
  ClientDataRequest,
  ClientUpdateRequest,
  JoinRoomRequest,
  StartGameRequest
} from '../../interface/socket-interfaces'
import { Server, Socket } from 'socket.io'
import {
  handleDialogRequest,
  handleDocumentRequest,
  handleObservationRequest,
  handlePhotoRequest
} from './request-handlers'
import { ServerStateManager } from './server-state-manager'
import {
  handleDocumentUpdate,
  handleInterviewUpdate,
  handleObservationUpdate,
  handlePhotoUpdate
} from './update-handler'
import { demoGameData } from './game-data/demo-game-data'
import { resolveGameState } from './game-data/resolve-game-state'

import { hri } from 'human-readable-ids'

const io = new Server(parseInt(process.env.PORT) || 3000)

const globalStates: Record<string, ServerStateManager> = {}
const playerRoomMap: Record<string, string> = {}

function createDummyState(): GameState {
  return {
    currentPlayer: '',
    players: [],
    gameData: demoGameData
  }
}

io.on('connection', (socket: Socket) => {
  console.log('initializing player communication')
  initPlayerCommunication(socket)
})

const initPlayerGame = (socket: Socket, stateManager: ServerStateManager) => {
  socket.on('request', dataRequestHandler.bind(null, socket))
  socket.on('updateState', gameStateUpdateHandler.bind(null, stateManager))
}

const initPlayerCommunication = (socket: Socket) => {
  socket.on('createRoom', createRoomHandler.bind(null, socket))
  socket.on('joinRoom', joinRoomHandler.bind(null, socket))
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
  })

  globalStates[roomId] = stateManager

  socket.on('startGame', startGameHandler.bind(null, socket, stateManager))

}

const startGameHandler = (socket: Socket,
                          stateManager: ServerStateManager,
                          request: StartGameRequest) => {
  initPlayerGame(socket, stateManager)

  stateManager.setPlayerData(socket.id, request.data)

  socket.emit('update', resolveGameState(stateManager.getState() as GameState))
}


const joinRoomHandler = (socket: Socket, request: JoinRoomRequest) => {
  const { roomId } = request.data
  const room = io.sockets.adapter.rooms.get(roomId)

  console.log('requesting to join roomId', roomId)
  if (!room || room.size === 0) return socket.emit('unknownRoom')

  if (room.size >= 4) return socket.emit('tooManyPlayers')

  playerRoomMap[socket.id] = roomId
  socket.join(roomId)
  socket.emit('playerId', socket.id)

  const stateManager = globalStates[roomId]

  initPlayerGame(socket, stateManager)
}

const dataRequestHandler = (socket: Socket, request: ClientDataRequest) => {
  switch (request.evidenceType) {
    case 'interview':
      handleDialogRequest(socket, request.data)
      break
    case 'observation':
      handleObservationRequest(socket, request.data)
      break
    case 'document':
      handleDocumentRequest(socket, request.data)
      break
    case 'photo':
      handlePhotoRequest(socket, request.data)
      break
  }
}

const gameStateUpdateHandler = (stateManager: ServerStateManager,
                                update: ClientUpdateRequest) => {
  switch (update.evidenceType) {
    case 'interview':
      handleInterviewUpdate(stateManager, update.data)
      break
    case 'document':
      handleDocumentUpdate(stateManager, update.data)
      break
    case 'photo':
      handlePhotoUpdate(stateManager, update.data)
      break
    case 'observation':
      handleObservationUpdate(stateManager, update.data)
      break

  }
}
