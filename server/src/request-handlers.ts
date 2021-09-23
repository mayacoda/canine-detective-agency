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
import { getObservationById } from './game-data-managers/observation-manager'
import { getDocumentById } from './game-data-managers/document-manager'
import { getPhotoById } from './game-data-managers/photo-manager'
import { getDialogById } from './game-data-managers/dialog-manager'
import { TypedServerSocket } from './types'


function emitDataResponse(socket: TypedServerSocket, data: ServerDataResponse) {
  socket.emit('response', data)
}

export function handleDialogRequest(socket: TypedServerSocket, data: InterviewDataRequest['data']) {
  const response: InterviewDataResponse = {
    evidenceType: 'interview',
    data: {
      id: data.id,
      dialog: getDialogById(data.id),
      uuid: data.uuid
    }
  }
  emitDataResponse(socket, response)
}

export function handleObservationRequest(socket: TypedServerSocket,
                                         data: ObservationDataRequest['data']) {
  const response: ObservationDataResponse = {
    evidenceType: 'observation',
    data: {
      id: data.id,
      observation: getObservationById(data.id),
      uuid: data.uuid
    }
  }
  emitDataResponse(socket, response)
}

export function handleDocumentRequest(socket: TypedServerSocket,
                                      data: DocumentDataRequest['data']) {
  const response: DocumentDataResponse = {
    evidenceType: 'document',
    data: {
      id: data.id,
      document: getDocumentById(data.id),
      uuid: data.uuid
    }
  }
  emitDataResponse(socket, response)
}

export function handlePhotoRequest(socket: TypedServerSocket, data: PhotoDataRequest['data']) {
  const response: PhotoDataResponse = {
    evidenceType: 'photo',
    data: {
      id: data.id,
      photo: getPhotoById(data.id),
      uuid: data.uuid
    }
  }
  emitDataResponse(socket, response)
}

