import {
  getExistingImagesAsPathsFromTilemapsDir,
  getTiledPropertyValue,
  getTileMaps,
  TiledObjectLayer,
  TiledTileMap
} from './test-utils'
import { assert } from '../utils/assert'
import { dialogData } from '../../server/src/game-data/dialog-data'

describe('each tile map Characters layer', () => {
  let tileMaps: TiledTileMap[] = []
  let imagePaths: string[] = []

  beforeAll(async () => {
    tileMaps = await getTileMaps()
    imagePaths = await getExistingImagesAsPathsFromTilemapsDir()
  })

  it('has an image property that corresponds to an actual file', () => {
    for (const map of tileMaps) {
      const characters = (map.layers.find(layer => layer.name === 'Characters') as TiledObjectLayer).objects

      for (const character of characters) {
        const imageProperty = getTiledPropertyValue(character, 'image')
        assert(
          imageProperty,
          `${ map.tileMapName } has character "${ character.name }" with missing image property`
        )

        assert(
          imagePaths.includes('../images/' + imageProperty + '.png'),
          `${ map.tileMapName } has character "${ character.name }" with image property ${ imageProperty } which is missing a corresponding file`
        )
      }
    }
  })

  it('has an id property which corresponds to dialog', () => {
    for (const map of tileMaps) {
      const characters = (map.layers.find(layer => layer.name === 'Characters') as TiledObjectLayer).objects

      for (const character of characters) {
        const idProperty = getTiledPropertyValue(character, 'id')
        assert(
          idProperty,
          `${ map.tileMapName } has character "${ character.name }" with missing id property`
        )

        assert(
          dialogData[idProperty],
          `${ map.tileMapName } has character "${ character.name }" without corresponding dialog`
        )
      }
    }
  })
})
