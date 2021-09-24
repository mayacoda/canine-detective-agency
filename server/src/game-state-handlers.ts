import { ClientDataRequest, ClientEvidenceUpdateRequest } from '../../interface/socket-interfaces'
import {
  handleDialogRequest,
  handleDocumentRequest,
  handleObservationRequest,
  handlePhotoRequest
} from './request-handlers'
import { ServerStateManager } from './server-state-manager'
import {
  handleDocumentUpdate,
  handleInterviewUpdate,
  handleObservationUpdate,
  handlePhotoUpdate
} from './update-handler'
import { TypedServerSocket } from './types'

export const dataRequestHandler = (socket: TypedServerSocket, request: ClientDataRequest) => {
  switch (request.evidenceType) {
    case 'interview':
      handleDialogRequest(socket, request.data)
      break
    case 'observation':
      handleObservationRequest(socket, request.data)
      break
    case 'document':
      handleDocumentRequest(socket, request.data)
      break
    case 'photo':
      handlePhotoRequest(socket, request.data)
      break
  }
}
export const gameStateUpdateHandler = (stateManager: ServerStateManager,
                                       update: ClientEvidenceUpdateRequest) => {
  switch (update.evidenceType) {
    case 'interview':
      handleInterviewUpdate(stateManager, update.data)
      break
    case 'document':
      handleDocumentUpdate(stateManager, update.data)
      break
    case 'photo':
      handlePhotoUpdate(stateManager, update.data)
      break
    case 'observation':
      handleObservationUpdate(stateManager, update.data)
      break

  }
}
