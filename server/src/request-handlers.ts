import { Socket } from 'socket.io'
import { demoDialog } from '../../interface/game-data/demo-dialog'

export function handleDialogRequest(socket: Socket, id: string) {
  console.log('emitting event to client')
  socket.emit('dialog', { id, dialog: demoDialog[id] })
}
