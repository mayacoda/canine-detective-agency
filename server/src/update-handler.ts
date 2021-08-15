import { Socket } from 'socket.io'
import { ServerStateManager } from './server-state-manager'
import { resolveInterviewByBranchId } from '../../interface/dialog-manager'
import { InterviewRecord } from '../../interface/game-data-interface'

export const handleInterviewUpdate = (socket: Socket,
                                      stateManager: ServerStateManager,
                                      {
                                        branchId,
                                        dialogId
                                      }: { branchId: string, dialogId: string }) => {

  const newRecord = resolveInterviewByBranchId(dialogId, branchId)
  let existingRecords = stateManager.getState().gameData.interviews[dialogId]
  if (!existingRecords) {
    console.log(`Could not find existing interview records for "${ dialogId }", creating new ones`)
    existingRecords = []
  }
  // todo: check here for the branchId instead
  if (existingRecords.includes(newRecord)) return

  const updatedInterviewRecord = [ ...existingRecords, newRecord ]

  stateManager.updateInterviewRecord(dialogId, updatedInterviewRecord as InterviewRecord[])
}

export const handleDocumentUpdate = (socket: Socket,
                                     stateManager: ServerStateManager,
                                     data: any) => {

}

export const handlePhotoUpdate = (socket: Socket, stateManager: ServerStateManager, data: any) => {

}


export const handleObservationUpdate = (socket: Socket,
                                        stateManager: ServerStateManager,
                                        data: any) => {

}
