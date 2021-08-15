import { NPCName } from './game-data-interface'

type BranchId = string

export interface Dialog {
  speaker: NPCName
  start: BranchId
  branches: DialogBranch[]
}

export interface DialogBranch {
  id: BranchId
  dialog: string[]
  fork?: Question[]
}

export interface Question {
  to: BranchId
  text: string
}
