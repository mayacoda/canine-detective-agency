import { Socket } from 'socket.io-client'
import { ResolvedGameState } from '../../interface/game-state-interface'
import {
  ClientDataRequest,
  ClientEmit,
  ClientEvidenceUpdateRequest,
  ClientOn,
  JoinRoomRequest,
  ServerDataResponse,
  StartGameRequest,
} from '../../interface/socket-interfaces'


export type  TypedClientSocket = {
  on: ClientOn
  emit: ClientEmit
}

export class SocketWrapper {
  private readonly socket: Socket // todo add type for this that has only enumerated events in on and emit

  constructor(socket: Socket) {
    this.socket = socket
  }

  getSocket(): TypedClientSocket {
    return this.socket as TypedClientSocket
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
  emitStateUpdate(stateUpdate: ClientEvidenceUpdateRequest) {
    this.socket.emit('updateState', stateUpdate)
  }

  emitJoinRoom(joinRoomRequest: JoinRoomRequest) {
    this.socket.emit('joinRoom', joinRoomRequest)
  }

  emitCreateRoom() {
    this.socket.emit('createRoom')
  }

  onRoomId(callback: (roomId: string) => void) {
    this.socket.on('roomId', callback)
  }

  onPlayerId(callback: (playerId: string) => void) {
    this.socket.on('playerId', callback)
  }

  onUnknownRoom(callback: () => void) {
    this.socket.on('unknownRoom', callback)
  }

  onTooManyPlayers(callback: () => void) {
    this.socket.on('tooManyPlayers', callback)
  }

  emitStartGame(startGameRequest: StartGameRequest) {
    this.socket.emit('startGame', startGameRequest)
  }
}
