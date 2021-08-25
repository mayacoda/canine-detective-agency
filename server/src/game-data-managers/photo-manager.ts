import { Photo } from '../../../interface/game-data-interface'
import { photosData } from '../game-data/photos-data'

export const getPhotoById = (id: string): Photo => {
  // todo temporarily returning demo, should return actual game data
  return photosData[id]
}
