import { demoDocuments } from './game-data/demo-documents'
import { Document } from './game-data-interface'

export const getDocumentById = (id: string): Document => {
  // todo temporarily returning demo, should return actual game data
  return demoDocuments[id]
}
