import { Socket } from 'socket.io-client'
import { ClientEmit, ClientOn, } from '../../interface/socket-interfaces'


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
}
