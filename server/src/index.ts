import { GameState } from '../../interface/game-state-interface'
import { ClientDataRequest, ClientUpdateRequest } from '../../interface/socket-interfaces'
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
import { resolveGameState } from '../../client/game-state/resolve-game-state'
import { demoGameData } from './game-data/demo-game-data'

const io = new Server(3000)


function createDummyState(): GameState {
  return {
    currentPlayer: '',
    players: [],
    gameData: demoGameData
  }
}

io.on('connection', (socket: Socket) => {
  const stateManager = new ServerStateManager(createDummyState(), (newState) => {
    socket.emit('update', resolveGameState(newState))
  })

  socket.on('request', socketRequestHandler.bind(null, socket))
  socket.on('updateState', socketUpdateHandler.bind(null, stateManager))
})

const socketRequestHandler = (socket: Socket, request: ClientDataRequest) => {
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


const socketUpdateHandler = (stateManager: ServerStateManager,
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
