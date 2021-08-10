type SocketRequestType = 'dialog' | 'evidence'

type SocketRequestBase = {
  type: SocketRequestType
}

export type DialogSocketRequest = SocketRequestBase & {
  type: 'dialog'
  data: { id: string }
}

export type EvidenceSocketRequest = SocketRequestBase & {
  type: 'evidence'
  data: { id: string }
}

export type SocketRequest = DialogSocketRequest | EvidenceSocketRequest
