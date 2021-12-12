import { dialogData } from '../game-data/dialog-data'
import { Dialog, Question } from '../../../interface/dialog-interface'
import { ServerSideGameData, Statement } from '../../../interface/game-data-interface'
import { Immutable } from '../../../interface/types'

export const getDialogByIdApplyingConditions = (id: string,
                                                gameData: Immutable<ServerSideGameData>,
                                                dialogRecord: Record<string, Dialog> = dialogData): Dialog | undefined => {

  const dialog = dialogRecord[id]
  if (!dialog) return undefined

  const allForks: Question [] = dialog.branches
    .map(branch => branch.fork)
    .filter((fork): fork is Question[] => !!fork)
    .flat()

  const afterLast: string [] = dialog.branches
    .map(branch => branch.afterLast)
    .filter((fork): fork is string => !!fork)

  const validForks = allForks
    .filter((fork: Question) => (!fork.condition || fork.condition(gameData)))
    .map(fork => fork.to)
    .concat([ dialog.start ])
    .concat(afterLast)

  return {
    speaker: dialog.speaker,
    start: dialog.start,
    imageUrl: dialog.imageUrl,
    branches: dialog.branches.map(branch => {
      return {
        ...branch,
        fork: branch.fork && branch.fork.filter(fork => validForks.includes(fork.to))
      }
    }).filter(branch => validForks.includes(branch.id))
  }
}

export const getDialogById = (id: string): Dialog => {
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

  if (branchStatements === null) throw new Error(`could not find dialog branchId "${ branchId }" in dialog ${ dialogId }`)

  // todo: when multiplayer, make sure this is the player's name instead?
  const question = branchQuestion ? { text: branchQuestion, speaker: 'Detective' } : undefined
  const answers = branchStatements.map(text => ({ text, speaker: dialog.speaker }))

  const interviewDialog = []
  if (question) interviewDialog.push(question)
  interviewDialog.push(...answers)
  return interviewDialog
}
