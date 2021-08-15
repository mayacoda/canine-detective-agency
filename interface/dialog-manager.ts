import { Dialog } from './dialog-interface'
import { demoDialog } from './game-data/demo-dialog'
import { InterviewRecord } from './game-data-interface'

export const getDialogById = (id: string): Dialog => {
  // todo temporarily returning demo dialog, should return actual game dialog
  return demoDialog[id]
}

export const resolveInterviewByBranchId = (dialogId: string, branchId: string): InterviewRecord => {
  const dialog = getDialogById(dialogId)
  if (!dialog) throw new Error(`could not find dialogId "${ dialogId }"`)
  let branchStatements: string[] = undefined
  let branchQuestion: string = undefined
  dialog.branches.forEach(branch => {
    if (branch.id === branchId) {
      branchStatements = branch.dialog
    }
    if (branch.fork) {
      // todo: might not be good enough, as potentially multiple forks could lead to the same dialog
      const forkToBranch = branch.fork.find(fork => fork.to === branchId)
      if (forkToBranch) branchQuestion = forkToBranch.text
    }
  })

  if (!branchStatements) throw new Error(`could not find dialog branchId "${ branchId }"`)

  // todo: when multiplayer, make sure this is the player's name isntead
  const question = branchQuestion ? { text: branchQuestion, speaker: 'you' } : undefined
  const answers = branchStatements.map(text => ({ text, speaker: dialog.speaker }))

  const interviewDialog = []
  if (question) interviewDialog.push(question)
  interviewDialog.push(...answers)
  return {
    dialog: interviewDialog,
  }
}
