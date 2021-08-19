import { Socket } from 'socket.io'
import { ServerStateManager } from './server-state-manager'

export const handleInterviewUpdate = (socket: Socket,
                                      stateManager: ServerStateManager,
                                      {
                                        branchId,
                                        dialogId
                                      }: { branchId: string, dialogId: string }) => {

  let existingBranches = stateManager.getState().gameData.interviews[dialogId]
  if (!existingBranches) {
    console.log(`Could not find existing interview records for "${ dialogId }", creating new ones`)
    existingBranches = []
  }
  if (existingBranches.includes(branchId)) return

  const updatedBranches = [ ...existingBranches, branchId ]

  stateManager.updateInterviewRecord(dialogId, updatedBranches)
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
