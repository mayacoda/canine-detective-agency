import io from 'socket.io-client'
import { ResolvedGameState } from '../../interface/game-state-interface'
import { Dialog } from '../../interface/dialog-interface'
import { getUUID } from '../utils/uuid'
import { SocketWrapper } from './SocketWrapper'
import {
  ClientDataRequest,
  EvidenceType,
  ServerDataResponse
} from '../../interface/socket-interfaces'
import { assert } from '../utils/assert'
import { Document, Photo } from '../../interface/game-data-interface'

export type Handler = (state: ResolvedGameState) => void
export type EventType = 'update'

export class GameStateManager {
  listeners: Record<EventType, Handler[]> = { update: [] }
  socketWrapper: SocketWrapper

  constructor() {
    const socket = io('ws://localhost:3000', { transports: [ 'websocket' ] })
    this.socketWrapper = new SocketWrapper(socket)
  }

  private _state: ResolvedGameState | null = null

  get state() {
    return this._state
  }

  listen() {
    this.socketWrapper.onUpdate((data: ResolvedGameState) => {
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

  private async requestData(evidenceType: EvidenceType, id: string) {
    const request: ClientDataRequest = {
      type: 'data',
      evidenceType,
      data: { id, uuid: getUUID() }
    }

    return await new Promise((resolve) => {
      this.socketWrapper.emitRequest(request)

      this.socketWrapper.onResponse((response) => {
        if (response.data.uuid === request.data.uuid) {
          resolve(response)
        }
      })
    }) as ServerDataResponse
  }

  async requestDialog(id: string): Promise<Dialog | null> {
    const evidenceType = 'interview'
    const response = await this.requestData(evidenceType, id)
    assert(response.evidenceType === evidenceType)

    return response.data.dialog ?? null
  }

  updateDialog(dialogId: string, branchId: string) {
    this.socketWrapper.emitStateUpdate({
      type: 'update',
      evidenceType: 'interview',
      data: {
        dialogId, branchId
      }
    })
  }

  async requestObservation(id: string) {
    const evidenceType = 'observation'
    const response = await this.requestData(evidenceType, id)
    assert(response.evidenceType === evidenceType)

    return response.data.observation
  }

  updateObservation(id: string) {
    this.socketWrapper.emitStateUpdate({
      type: 'update',
      evidenceType: 'observation',
      data: { id }
    })
  }

  async requestPhoto(id: string): Promise<Photo | null> {
    const evidenceType = 'photo'
    const response = await this.requestData(evidenceType, id)
    assert(response.evidenceType === evidenceType)

    return response.data.photo ?? null
  }

  updatePhoto(id: string) {
    this.socketWrapper.emitStateUpdate({
      type: 'update',
      evidenceType: 'photo',
      data: { id }
    })
  }

  async requestDocument(id: string): Promise<Document | null> {
    const evidenceType = 'document'
    const response = await this.requestData(evidenceType, id)
    assert(response.evidenceType === evidenceType)

    return response.data.document ?? null
  }

  updateDocument(id: string) {
    this.socketWrapper.emitStateUpdate({
      type: 'update',
      evidenceType: 'photo',
      data: { id }
    })
  }

  private propagateUpdate(state: ResolvedGameState) {
    this.listeners.update.forEach(listener => listener(state))
  }

}
