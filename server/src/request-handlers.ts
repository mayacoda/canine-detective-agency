import { Socket } from 'socket.io'
import { getDialogById } from '../../interface/dialog-manager'
import {
  DocumentDataRequest,
  DocumentDataResponse,
  InterviewDataRequest,
  InterviewDataResponse,
  ObservationDataRequest,
  ObservationDataResponse,
  PhotoDataRequest,
  PhotoDataResponse,
  ServerDataResponse
} from '../../interface/socket-interfaces'
import { getObservationById } from '../../interface/observation-manager'
import { getDocumentById } from '../../interface/document-manager'
import { getPhotoById } from '../../interface/photo-manager'

function emitDataResponse(socket: Socket, data: ServerDataResponse) {
  socket.emit('response', data)
}

export function handleDialogRequest(socket: Socket, data: InterviewDataRequest['data']) {
  const response: InterviewDataResponse = {
    type: 'data',
    evidenceType: 'interview',
    data: {
      id: data.id,
      dialog: getDialogById(data.id),
      uuid: data.uuid
    }
  }
  emitDataResponse(socket, response)
}

export function handleObservationRequest(socket: Socket, data: ObservationDataRequest['data']) {
  const response: ObservationDataResponse = {
    type: 'data',
    evidenceType: 'observation',
    data: {
      id: data.id,
      observation: getObservationById(data.id),
      uuid: data.uuid
    }
  }
  emitDataResponse(socket, response)
}

export function handleDocumentRequest(socket: Socket, data: DocumentDataRequest['data']) {
  const response: DocumentDataResponse = {
    type: 'data',
    evidenceType: 'document',
    data: {
      id: data.id,
      document: getDocumentById(data.id),
      uuid: data.uuid
    }
  }
  emitDataResponse(socket, response)
}

export function handlePhotoRequest(socket: Socket, data: PhotoDataRequest['data']) {
  const response: PhotoDataResponse = {
    type: 'data',
    evidenceType: 'photo',
    data: {
      id: data.id,
      photo: getPhotoById(data.id),
      uuid: data.uuid
    }
  }
  emitDataResponse(socket, response)
}

