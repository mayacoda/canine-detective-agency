import { ServerStateManager } from './server-state-manager'

export const handleInterviewUpdate = (stateManager: ServerStateManager,
                                      {
                                        branchId,
                                        dialogId
                                      }: { branchId: string; dialogId: string }) => {

  let existingBranches = stateManager.getState().gameData.interviews[dialogId]
  if (!existingBranches) {
    console.log(`Could not find existing interview records for "${ dialogId }", creating new ones`)
    existingBranches = []
  }
  if (existingBranches.includes(branchId)) return

  const updatedBranches = [ ...existingBranches, branchId ]

  stateManager.updateInterviewRecord(dialogId, updatedBranches)
}

export const handleDocumentUpdate = (stateManager: ServerStateManager,
                                     data: any) => {
//@todo handle updating document
}

export const handlePhotoUpdate = (stateManager: ServerStateManager, data: any) => {
//@todo handle updating photo
}


export const handleObservationUpdate = (stateManager: ServerStateManager,
                                        data: any) => {
  stateManager.updateObservation(data.id)
}
