type SocketRequestType = 'dialog' | 'evidence'

interface SocketRequestBase {
  type: SocketRequestType
}

export interface DialogSocketRequest extends SocketRequestBase {
  type: 'dialog'
  data: { id: string }
}

export interface EvidenceSocketRequest extends SocketRequestBase {
  type: 'evidence'
  data: { id: string }
}

export type SocketRequest = DialogSocketRequest | EvidenceSocketRequest


type SocketUpdateType = 'interview' | 'document' | 'photo' | 'observation'

interface SocketUpdateBase {
  type: SocketUpdateType
}

export interface InterviewSocketUpdate extends SocketUpdateBase {
  type: 'interview',
  data: {
    dialogId: string,
    branchId: string
  }
}

export interface DocumentSocketUpdate extends SocketUpdateBase {
  type: 'document',
  data: any
}

export interface PhotoSocketUpdate extends SocketUpdateBase {
  type: 'photo',
  data: any
}

export interface ObservationSocketUpdate extends SocketUpdateBase {
  type: 'observation',
  data: any
}

export type SocketUpdate =
  InterviewSocketUpdate
  | DocumentSocketUpdate
  | PhotoSocketUpdate
  | ObservationSocketUpdate
