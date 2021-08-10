import { GameState } from '../../interface/game-state-interface'
import { SocketRequest } from '../../interface/socket-interfaces'
import { Socket } from 'socket.io'
import { handleDialogRequest } from './request-handlers'
import { demoGameData } from '../../interface/game-data/demo-game-data'

const { Server } = require('socket.io')
const io = new Server(3000)

io.on('connection', (socket: Socket) => {
  const state: GameState = {
    currentPlayer: '',
    players: [],
    gameData: demoGameData
  }
  socket.emit('update', state)
  socket.on('request', socketRequestHandler.bind(null, socket))
})

const socketRequestHandler = (socket: Socket, request: SocketRequest) => {
  switch (request.type) {
    case 'dialog':
      handleDialogRequest(socket, request.data.id)
      break
  }
}
