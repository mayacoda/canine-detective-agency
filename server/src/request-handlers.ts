import { Socket } from 'socket.io'
import { getDialogById } from '../../interface/dialog-manager'

export function handleDialogRequest(socket: Socket, id: string) {
  socket.emit('dialog', { id, dialog: getDialogById(id) })
}
