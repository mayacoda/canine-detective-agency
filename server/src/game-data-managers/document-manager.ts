import { Document } from '../../../interface/game-data-interface'
import { documentsData } from '../game-data/documents-data'

export const getDocumentById = (id: string): Document => {
  // todo temporarily returning demo, should return actual game data
  return documentsData[id]
}
