import { Observation } from './game-data-interface'
import { demoObservations } from './game-data/demo-observations'

export const getObservationById = (id: string): Observation => {
  // todo temporarily returning demo, should return actual game data
  return demoObservations[id]
}
