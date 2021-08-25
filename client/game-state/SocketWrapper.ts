import { Socket } from 'socket.io-client'
import { ResolvedGameState } from '../../interface/game-state-interface'
import {
  ClientDataRequest,
  ClientUpdateRequest,
  ServerDataResponse,
} from '../../interface/socket-interfaces'

export class SocketWrapper {
  private socket: Socket

  constructor(socket: Socket) {
    this.socket = socket
  }

  // backend updates the state
  onUpdate(callback: (data: ResolvedGameState) => void) {
    this.socket.on('update', callback)
  }

  // backend returns a response to a request
  onResponse(callback: (data: ServerDataResponse) => void) {
    this.socket.on('response', callback)
  }

  // request data from backend
  emitRequest(socketRequest: ClientDataRequest) {
    this.socket.emit('request', socketRequest)
  }

  // signal a state change to backend
  emitStateUpdate(stateUpdate: ClientUpdateRequest) {
    this.socket.emit('updateState', stateUpdate)
  }

}
