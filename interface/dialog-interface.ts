import { NPCName } from './game-data-interface'
import { GameState } from './game-state-interface'
import { Immutable } from './types'

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
  text: string,
  condition?: (gameData: Immutable<GameState['gameData']>) => boolean
}
