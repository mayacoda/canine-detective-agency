import { observationsData } from '../game-data/observations-data'
import { Observation } from '../../../interface/game-data-interface'

export const getObservationById = (id: string): Observation => {
  // todo temporarily returning demo, should return actual game data
  return observationsData[id]
}
