import { ClientSideGameData, ServerSideGameData } from '../../../interface/game-data-interface'
import { getDialogById, resolveInterviewByBranchId } from '../game-data-managers/dialog-manager'
import { getDocumentById } from '../game-data-managers/document-manager'
import { getPhotoById } from '../game-data-managers/photo-manager'
import { getObservationById } from '../game-data-managers/observation-manager'
import { GameState, ResolvedGameState } from '../../../interface/game-state-interface'

export const resolveGameData = (data: ServerSideGameData): ClientSideGameData => {
  return {
    interviews: Object.entries(data.interviews).map(([ id, branches ]) => {
      const speaker = getDialogById(id).speaker
      const statements = branches.map(branchId => resolveInterviewByBranchId(id, branchId)).flat()
      return { speaker, statements }
    }),
    documents: data.documents.map(id => getDocumentById(id)),
    photos: data.photos.map(id => getPhotoById(id)),
    observations: data.observations.map(id => getObservationById(id))
  }
}

export const resolveGameState = (state: GameState): ResolvedGameState => {
  return {
    ...state,
    gameData: resolveGameData(state.gameData)
  }
}
