import { ServerSideGameData } from '../../../interface/game-data-interface'

export const emptyGameData: ServerSideGameData = {
  interviews: {},
  observations: [],
  photos: [],
  documents: [ 'janeLetter', 'toxicology', 'autopsy' ]
}
