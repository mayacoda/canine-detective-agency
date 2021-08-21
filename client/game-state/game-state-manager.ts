import io, { Socket } from 'socket.io-client'
import { GameState, ResolvedGameState } from '../../interface/game-state-interface'
import { Dialog } from '../../interface/dialog-interface'
import { getUUID } from '../utils/uuid'

export type Handler = (state: ResolvedGameState) => void
export type EventType = 'update'

export class GameStateManager {
  listeners: Record<EventType, Handler[]> = { update: [] }
  socket!: Socket

  constructor() {
    this.socket = io('ws://localhost:3000', { transports: [ 'websocket' ] })
  }

  private _state: ResolvedGameState | null = null

  get state() {
    return this._state
  }

  listen() {
    this.socket.on('update', (data: ResolvedGameState) => {
      this._state = data
      this.propagateUpdate(this._state)
    })
  }

  addListener(event: EventType, handler: Handler) {
    this.listeners[event].push(handler)
  }

  removeListener(event: EventType, handler: Handler) {
    const index = this.listeners[event].indexOf(handler)
    this.listeners[event].splice(index, 1)
  }

  mutate(state: GameState) {
    this.socket.emit('mutate', state)
  }

  requestDialog(id: string): Promise<Dialog | null> {
    return new Promise((resolve) => {
      const uuid = getUUID()
      this.socket.emit('request', { type: 'dialog', data: { id, uuid } })

      this.socket.on('dialog', (data: { id: string, dialog: Dialog, uuid: string }) => {
        if (data.uuid === uuid) {
          resolve(data.dialog)
        }
      })
    })
  }

  updateDialog(dialogId: string, branchId: string) {
    this.socket.emit('updateState', {
      type: 'interview',
      data: {
        dialogId, branchId
      }
    })
  }

  requestEvidence(id: string) {
    this.socket.emit('request', { type: 'evidence', data: { id } })
  }

  private propagateUpdate(state: ResolvedGameState) {
    this.listeners.update.forEach(listener => listener(state))
  }

}
