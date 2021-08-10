import io, { Socket } from 'socket.io-client'
import { GameState } from '../../interface/game-state-interface'
import { Dialog } from '../../interface/dialog-interface'

export type Handler = (state: GameState) => void
export type EventType = 'update'


export class GameStateManager {
  listeners: Record<EventType, Handler[]> = { update: [] }
  socket!: Socket
  private _state: GameState | null = null

  constructor() {
    this.socket = io('ws://localhost:3000', { transports: [ 'websocket' ] })
  }

  get state() {
    return this._state
  }

  listen() {
    this.socket.on('update', (data: GameState) => {
      this._state = data
      this.update(this._state)
    })
  }

  private update(state: GameState) {
    this.listeners.update.forEach(listener => listener(state))
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
      this.socket.emit('request', { type: 'dialog', data: { id } })

      this.socket.on('dialog', (data: { id: string, dialog: Dialog }) => {
        console.log('got the even from backend', data)
        if (data.id === id) {
          resolve(data.dialog)
        }
      })
    })
  }

  requestEvidence(id: string) {
    this.socket.emit('request', { type: 'evidence', data: { id } })
  }
}
