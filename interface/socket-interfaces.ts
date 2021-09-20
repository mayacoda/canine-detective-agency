import { Dialog } from './dialog-interface'
import { Document, Observation, Photo } from './game-data-interface'
import { ResolvedGameState } from './game-state-interface'


// todo properly populate the map of event -> payload so it reflects current reality (can refactor later)

type ClientEmittedEventPayload = {
  request: ClientDataRequest
  updateState: ClientEvidenceUpdateRequest
  createRoom: void
  joinRoom: string
  startGame: PlayerData
}

type ServerEmittedEventPayload = {
  playerId: string
  update: ResolvedGameState
  unknownRoom: void
  tooManyPlayers: void
  response: ServerDataResponse
}

export type ServerOn = <T extends keyof ClientEmittedEventPayload>(event: T,
                                                                   callback: (payload: ClientEmittedEventPayload[T]) => void) => void

export type ClientEmit = <T extends keyof ClientEmittedEventPayload>(event: T,
                                                                     payload: ClientEmittedEventPayload[T]) => void

export type ClientOn = <T extends keyof ServerEmittedEventPayload>(event: T,
                                                                   callback: (payload: ServerEmittedEventPayload[T]) => void) => void

export type ServerEmit = <T extends keyof ServerEmittedEventPayload>(event: T,
                                                                     ...payload: (ServerEmittedEventPayload[T] extends undefined ? [ undefined? ] : [ ServerEmittedEventPayload[T] ])) => void

export type ServerResponseEvent =
  'update'
  | 'playerId'
  | 'roomId'
  | 'unknownRoom'
  | 'tooManyPlayers'

export type ClientRequestEvent =
  'request' | 'updateState' | 'joinRoom' | 'createRoom' | 'startGame'

export type EvidenceType = 'interview' | 'document' | 'photo' | 'observation'

export type PlayerData = { name: string, avatar: string, id: string, }


/**
 * Requests sent from the client to the server for game data
 */
interface ClientDataRequestBase {
  type: 'data'
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
}

interface ClientEvidenceUpdateRequestBase {
  type: 'update'
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
  data: any
}

export interface PhotoUpdateRequest extends ClientEvidenceUpdateRequestBase {
  evidenceType: 'photo',
  data: any
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
  type: 'data'
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


/**
 * Requests sent from client to server to start a room
 */
interface ClientRoomRequestBase {
  type: 'room'
  action: 'create' | 'join' | 'start'
}

// requests a new room be created
export interface CreateRoomRequest extends ClientRoomRequestBase {
  action: 'create'
}

// requests to join an existing room
export interface JoinRoomRequest extends ClientRoomRequestBase {
  action: 'join',
  data: {
    roomId: string
  }
}

// requests to start the game after joining a room
export interface StartGameRequest extends ClientRoomRequestBase {
  action: 'start',
  data: PlayerData
}

export type ClientRoomRequest = CreateRoomRequest | JoinRoomRequest | StartGameRequest

