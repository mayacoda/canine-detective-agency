import { GameData, ResolvedGameData } from '../../interface/game-data-interface'
import { getDialogById, resolveInterviewByBranchId } from '../../interface/dialog-manager'
import { GameState, ResolvedGameState } from '../../interface/game-state-interface'

export const resolveGameData = (data: GameData): ResolvedGameData => {
  return {
    interviews: Object.entries(data.interviews).map(([ id, branches ]) => {
      const speaker = getDialogById(id).speaker
      const statements = branches.map(branchId => resolveInterviewByBranchId(id, branchId)).flat()
      return { speaker, statements }
    }),
    documents: data.documents,
    photos: data.photos,
    observations: data.observations
  }
}

export const resolveGameState = (state: GameState): ResolvedGameState => {
  return {
    ...state,
    gameData: resolveGameData(state.gameData)
  }
}
