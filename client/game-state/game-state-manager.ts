import io from 'socket.io-client'
import { Player, ResolvedGameState } from '../../interface/game-state-interface'
import { Dialog } from '../../interface/dialog-interface'
import { getUUID } from '../utils/uuid'
import { SocketWrapper, TypedClientSocket } from './SocketWrapper'
import {
  ClientDataRequest,
  EvidenceType,
  PlayerData,
  ServerDataResponse
} from '../../interface/socket-interfaces'
import { assert } from '../utils/assert'
import { Document, Photo } from '../../interface/game-data-interface'

export class GameStateManager {
  public socket: Readonly<TypedClientSocket>

  private _state: ResolvedGameState | null = null
  private _playerId?: string


  constructor() {
    const socket = io(
      process.env.SERVER_URL ?? 'ws://localhost:3000',
      { transports: [ 'websocket' ] }
    )
    this.socket = new SocketWrapper(socket).getSocket()
  }


  get state() {
    return this._state
  }

  listen() {
    this.socket.on('update', data => {
      this._state = data
    })

    this.socket.on('playerId', playerId => {
      this._playerId = playerId
    })

    window.addEventListener('beforeunload', () => {
      this.socket.emit('leave')
    })
  }

  private async requestData(evidenceType: EvidenceType, id: string) {
    const request: ClientDataRequest = {
      evidenceType,
      data: { id, uuid: getUUID() }
    }

    return await new Promise((resolve) => {
      this.socket.emit('request', request)

      this.socket.on('response', (response) => {
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
    this.socket.emit('updateState', {
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
    this.socket.emit('updateState', {
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
    this.socket.emit('updateState', {
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
    this.socket.emit('updateState', {
      evidenceType: 'photo',
      data: { id }
    })
  }

  joinRoom(id: string) {
    this.socket.emit('joinRoom', id)
  }

  createRoom() {
    this.socket.emit('createRoom')
  }

  startGame(data: PlayerData) {
    this.socket.emit('startGame', data)
  }

  getPlayer(): Player {
    assert(
      this._state && this._playerId,
      'Calling GameStateManager.getPlayer before state was initialized'
    )
    return this._state.players[this._playerId]
  }
}
