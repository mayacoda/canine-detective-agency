import { GameState } from '../../interface/game-state-interface'
import { SocketRequest, SocketUpdate } from '../../interface/socket-interfaces'
import { Socket } from 'socket.io'
import { handleDialogRequest } from './request-handlers'
import { demoGameData } from '../../interface/game-data/demo-game-data'
import { ServerStateManager } from './server-state-manager'
import {
  handleDocumentUpdate,
  handleInterviewUpdate,
  handleObservationUpdate,
  handlePhotoUpdate
} from './update-handler'
import { resolveGameState } from '../../client/game-state/resolve-game-state'

const { Server } = require('socket.io')
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
  socket.on('updateState', socketUpdateHandler.bind(null, socket, stateManager))
})

const socketRequestHandler = (socket: Socket, request: SocketRequest) => {
  switch (request.type) {
    case 'dialog':
      handleDialogRequest(socket, request.data)
      break
  }
}


const socketUpdateHandler = (socket: Socket,
                             stateManager: ServerStateManager,
                             update: SocketUpdate) => {
  switch (update.type) {
    case 'interview':
      handleInterviewUpdate(socket, stateManager, update.data)
      break
    case 'document':
      handleDocumentUpdate(socket, stateManager, update.data)
      break
    case 'photo':
      handlePhotoUpdate(socket, stateManager, update.data)
      break
    case 'observation':
      handleObservationUpdate(socket, stateManager, update.data)
      break

  }
}
