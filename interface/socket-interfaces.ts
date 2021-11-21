import { Dialog } from './dialog-interface'
import { Document, Observation, Photo } from './game-data-interface'
import { Player, ResolvedGameState } from './game-state-interface'
import { Vec2 } from './geometry-interface'

type ClientEmittedEventPayload = {
  request: ClientDataRequest
  updateState: ClientEvidenceUpdateRequest
  createRoom: void
  joinRoom: string
  startGame: PlayerData
  move: Vec2
  changeMap: string
  solve: { culprit: string, reason: string }
}

type ServerEmittedEventPayload = {
  playerId: string
  update: ResolvedGameState
  unknownRoom: void
  tooManyPlayers: void
  response: ServerDataResponse
  roomId: string
  playersUpdate: Record<string, Player>
  murderSolved: string
  wrongSolution: void
}

export type ServerOn = <T extends keyof ClientEmittedEventPayload>(event: T,
                                                                   callback: (payload: ClientEmittedEventPayload[T]) => void) => void

export type ClientEmit = <T extends keyof ClientEmittedEventPayload>(event: T,
                                                                     ...payload: ClientEmittedEventPayload[T] extends undefined ? [ undefined ] : [ ClientEmittedEventPayload[T] ]) => void

export type ClientOn = <T extends keyof ServerEmittedEventPayload>(event: T,
                                                                   callback: (payload: ServerEmittedEventPayload[T]) => void) => void

export type ServerEmit = <T extends keyof ServerEmittedEventPayload>(event: T,
                                                                     ...payload: (ServerEmittedEventPayload[T] extends undefined ? [ undefined? ] : [ ServerEmittedEventPayload[T] ])) => void

export type EvidenceType = 'interview' | 'document' | 'photo' | 'observation'

export type PlayerData = {
  name: string,
  avatar: string,
  id: string
}

/**
 * Requests sent from the client to the server for game data
 */
interface ClientDataRequestBase {
  evidenceType: EvidenceType
}

export interface InterviewDataRequest extends ClientDataRequestBase {
  evidenceType: 'interview'
  data: { id: string, uuid: string }
}

export interface DocumentDataRequest extends ClientDataRequestBase {
  evidenceType: 'document'
  data: { id: string, uuid: string }
}

export interface PhotoDataRequest extends ClientDataRequestBase {
  evidenceType: 'photo'
  data: { id: string, uuid: string }
}

export interface ObservationDataRequest extends ClientDataRequestBase {
  evidenceType: 'observation'
  data: { id: string, uuid: string }
}

export type ClientDataRequest =
  InterviewDataRequest
  | DocumentDataRequest
  | PhotoDataRequest
  | ObservationDataRequest


/**
 * Requests sent from the client to the server to update the game state
 */

interface ClientEvidenceUpdateRequestBase {
  evidenceType: EvidenceType
}

export interface InterviewUpdateRequest extends ClientEvidenceUpdateRequestBase {
  evidenceType: 'interview',
  data: {
    dialogId: string,
    branchId: string
  }
}

export interface DocumentUpdateRequest extends ClientEvidenceUpdateRequestBase {
  evidenceType: 'document',
  data: { id: string }
}

export interface PhotoUpdateRequest extends ClientEvidenceUpdateRequestBase {
  evidenceType: 'photo',
  data: { id: string }
}

export interface ObservationUpdateRequest extends ClientEvidenceUpdateRequestBase {
  evidenceType: 'observation',
  data: {
    id: string
  }
}

export type ClientEvidenceUpdateRequest =
  InterviewUpdateRequest
  | DocumentUpdateRequest
  | PhotoUpdateRequest
  | ObservationUpdateRequest


/**
 * Responses sent from the server to the client with game data
 */
interface ServerDataResponseBase {
  evidenceType: EvidenceType
}

export interface InterviewDataResponse extends ServerDataResponseBase {
  evidenceType: 'interview',
  data: {
    id: string
    dialog: Dialog
    uuid: string
  }
}

export interface ObservationDataResponse extends ServerDataResponseBase {
  evidenceType: 'observation',
  data: {
    id: string
    uuid: string
    observation: Observation
  }
}

export interface PhotoDataResponse extends ServerDataResponseBase {
  evidenceType: 'photo',
  data: {
    id: string
    uuid: string
    photo: Photo
  }
}

export interface DocumentDataResponse extends ServerDataResponseBase {
  evidenceType: 'document',
  data: {
    id: string
    uuid: string
    document: Document
  }
}

export type ServerDataResponse =
  InterviewDataResponse
  | ObservationDataResponse
  | PhotoDataResponse
  | DocumentDataResponse

