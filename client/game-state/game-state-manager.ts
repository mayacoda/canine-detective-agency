import io from 'socket.io-client'
import { Player, ResolvedGameState } from '../../interface/game-state-interface'
import { Dialog } from '../../interface/dialog-interface'
import { getUUID } from '../utils/uuid'
import { SocketWrapper } from './SocketWrapper'
import {
  ClientDataRequest,
  EvidenceType,
  PlayerData,
  ServerDataResponse,
  ServerResponseEvent
} from '../../interface/socket-interfaces'
import { assert } from '../utils/assert'
import { Document, Photo } from '../../interface/game-data-interface'

export type Handler = (data?: any) => void

export class GameStateManager {

  listeners: Record<ServerResponseEvent, Handler[]> = {
    playerId: [],
    roomId: [],
    tooManyPlayers: [],
    unknownRoom: [],
    update: []
  }
  socketWrapper: SocketWrapper

  private _state: ResolvedGameState | null = null
  private _playerId?: string


  constructor() {
    const socket = io(
      process.env.SERVER_URL ?? 'ws://localhost:3000',
      { transports: [ 'websocket' ] }
    )
    this.socketWrapper = new SocketWrapper(socket)
  }


  get state() {
    return this._state
  }

  listen() {
    this.socketWrapper.onUpdate((data: ResolvedGameState) => {
      this._state = data
      this.propagateUpdate(this._state)
    })

    this.socketWrapper.onRoomId((roomId: string) => {
      this.listeners['roomId'].forEach(fn => fn(roomId))
    })

    this.socketWrapper.onPlayerId((playerId: string) => {
      this._playerId = playerId
      this.listeners['playerId'].forEach(fn => fn(playerId))
    })

    this.socketWrapper.onTooManyPlayers(() => {
      this.listeners['tooManyPlayers'].forEach(fn => fn())
    })

    this.socketWrapper.onUnknownRoom(() => {
      this.listeners['unknownRoom'].forEach(fn => fn())
    })
  }

  addListener(event: ServerResponseEvent, handler: Handler) {
    this.listeners[event].push(handler)
    return () => {
      this.removeListener(event, handler)
    }
  }

  removeListener(event: ServerResponseEvent, handler: Handler) {
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

  async requestPhoto(id: string): Promise<Photo> {
    const evidenceType = 'photo'
    const response = await this.requestData(evidenceType, id)
    assert(response.evidenceType === evidenceType)

    return response.data.photo
  }

  updatePhoto(id: string) {
    this.socketWrapper.emitStateUpdate({
      type: 'update',
      evidenceType: 'photo',
      data: { id }
    })
  }

  async requestDocument(id: string): Promise<Document> {
    const evidenceType = 'document'
    const response = await this.requestData(evidenceType, id)
    assert(response.evidenceType === evidenceType)

    return response.data.document
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


  joinRoom(id: string) {
    this.socketWrapper.emitJoinRoom({
      type: 'room',
      action: 'join',
      data: {
        roomId: id
      }
    })
  }

  createRoom() {
    this.socketWrapper.emitCreateRoom()
  }

  startGame(data: PlayerData) {
    this.socketWrapper.emitStartGame({
      action: 'start',
      type: 'room',
      data
    })
  }

  getPlayer(): Player | undefined {
    if (this.state && this._playerId) {
      return this.state.players[this._playerId]
    }
  }
}
