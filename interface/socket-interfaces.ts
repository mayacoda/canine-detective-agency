import { Dialog } from './dialog-interface'
import { Document, Observation, Photo } from './game-data-interface'

export type EvidenceType = 'interview' | 'document' | 'photo' | 'observation'

/**
 * Requests sent from the client to the server
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


interface ClientUpdateRequestBase {
  type: 'update'
  evidenceType: EvidenceType
}

export interface InterviewUpdateRequest extends ClientUpdateRequestBase {
  evidenceType: 'interview',
  data: {
    dialogId: string,
    branchId: string
  }
}

export interface DocumentUpdateRequest extends ClientUpdateRequestBase {
  evidenceType: 'document',
  data: any
}

export interface PhotoUpdateRequest extends ClientUpdateRequestBase {
  evidenceType: 'photo',
  data: any
}

export interface ObservationUpdateRequest extends ClientUpdateRequestBase {
  evidenceType: 'observation',
  data: {
    id: string
  }
}

export type ClientUpdateRequest =
  InterviewUpdateRequest
  | DocumentUpdateRequest
  | PhotoUpdateRequest
  | ObservationUpdateRequest


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
