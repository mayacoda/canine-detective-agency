import { Photo } from './game-data-interface'
import { demoPhotos } from './game-data/demo-photos'

export const getPhotoById = (id: string): Photo => {
  // todo temporarily returning demo, should return actual game data
  return demoPhotos[id]
}
