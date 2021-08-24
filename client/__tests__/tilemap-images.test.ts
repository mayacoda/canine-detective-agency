import {
  getExistingImagesAsPathsFromTilemapsDir,
  getTiledPropertyValue,
  getTileMaps,
  TiledObjectLayer,
  TiledTileMap
} from './test-utils'
import { assert } from '../utils/assert'

describe('each tile map Images layer', () => {
  let tileMaps: TiledTileMap[] = []
  let imagePaths: string[] = []

  beforeAll(async () => {
    tileMaps = await getTileMaps()
    imagePaths = await getExistingImagesAsPathsFromTilemapsDir()
  })

  it('has an image property that corresponds to an actual file', () => {
    for (const map of tileMaps) {
      const images = (map.layers.find(layer => layer.name === 'Images') as TiledObjectLayer).objects

      for (const image of images) {
        const imageProperty = getTiledPropertyValue(image, 'image')
        assert(
          imageProperty,
          `${ map.tileMapName } has image "${ image.name }" with missing image property`
        )

        assert(
          imagePaths.includes('../images/' + imageProperty + '.png'),
          `${ map.tileMapName } has image "${ image.name }" with image property ${ imageProperty } which is missing a corresponding file`
        )
      }
    }
  })
})
