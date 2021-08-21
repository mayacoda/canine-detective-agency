import { Socket } from 'socket.io'
import { getDialogById } from '../../interface/dialog-manager'
import { SocketRequest } from '../../interface/socket-interfaces'

export function handleDialogRequest(socket: Socket, data: SocketRequest['data']) {
  socket.emit('dialog', { id: data.id, dialog: getDialogById(data.id), uuid: data.uuid })
}
