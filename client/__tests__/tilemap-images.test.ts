import {
  getExistingImagesAsPathsFromTilemapsDir,
  getTileMaps,
  TiledTileMap
} from '../utils/test-utils'
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
      let imagesLayer = map.layers.find(layer => layer.name === 'Images')
      let lowerImagesLayer = map.layers.find(layer => layer.name === 'Lower Images')

      assert(
        imagesLayer && 'objects' in imagesLayer,
        `${ map.tileMapName } does not have an Images object layer`
      )

      const images = imagesLayer.objects

      if (lowerImagesLayer && 'objects' in lowerImagesLayer) {
        images.push(...lowerImagesLayer.objects)
      }

      for (const image of images) {
        assert(
          image.name,
          `${ map.tileMapName } has image "${ image.name }" with missing name property`
        )

        assert(
          imagePaths.includes('../images/' + image.name + '.png'),
          `${ map.tileMapName } has image "${ image.name }" which is missing a corresponding file`
        )
      }
    }
  })
})
