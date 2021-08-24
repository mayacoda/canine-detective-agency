import { dialogData } from '../game-data/dialog-data'
import { Dialog } from '../../../interface/dialog-interface'
import { Statement } from '../../../interface/game-data-interface'

export const getDialogById = (id: string): Dialog => {
  // todo temporarily returning demo dialog, should return actual game dialog
  return dialogData[id]
}

export const resolveInterviewByBranchId = (dialogId: string, branchId: string): Statement[] => {
  const dialog = getDialogById(dialogId)
  if (!dialog) throw new Error(`could not find dialogId "${ dialogId }"`)
  let branchStatements: string[] | null = null
  let branchQuestion: string | null = null

  for (const branch of dialog.branches) {
    if (branch.id === branchId) {
      branchStatements = branch.dialog
    }
    if (branch.fork) {
      // todo: might not be good enough, as potentially multiple forks could lead to the same dialog
      const forkToBranch = branch.fork.find(fork => fork.to === branchId)
      if (forkToBranch) branchQuestion = forkToBranch.text
    }
  }

  if (branchStatements === null) throw new Error(`could not find dialog branchId "${ branchId }"`)

  // todo: when multiplayer, make sure this is the player's name instead
  const question = branchQuestion ? { text: branchQuestion, speaker: 'Detective' } : undefined
  const answers = branchStatements.map(text => ({ text, speaker: dialog.speaker }))

  const interviewDialog = []
  if (question) interviewDialog.push(question)
  interviewDialog.push(...answers)
  return interviewDialog
}
