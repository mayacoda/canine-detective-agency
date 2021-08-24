import {
  getExistingImagesAsPathsFromTilemapsDir,
  getTiledPropertyValue,
  getTileMaps,
  TiledObjectLayer,
  TiledTileMap
} from './test-utils'
import { assert } from '../utils/assert'
import { demoPhotos } from '../../interface/game-data/demo-photos'
import { demoDocuments } from '../../interface/game-data/demo-documents'
import { demoObservations } from '../../interface/game-data/demo-observations'

describe('each tile map Items layer', () => {
  let tileMaps: TiledTileMap[] = []
  let imagePaths: string[] = []

  beforeAll(async () => {
    tileMaps = await getTileMaps()
    imagePaths = await getExistingImagesAsPathsFromTilemapsDir()
  })

  it('has an image property that corresponds to an actual file', () => {
    for (const map of tileMaps) {
      const items = (map.layers.find(layer => layer.name === 'Items') as TiledObjectLayer).objects

      for (const item of items) {
        const imageProperty = getTiledPropertyValue(item, 'image')
        assert(
          imageProperty,
          `${ map.tileMapName } has item "${ item.name }" with missing image property`
        )

        assert(
          imagePaths.includes('../images/' + imageProperty + '.png'),
          `${ map.tileMapName } has item "${ item.name }" with image property ${ imageProperty } which is missing a corresponding file`
        )
      }
    }
  })

  it('has a type which is either "observation", "photo" or "document"', () => {
    for (const map of tileMaps) {
      const items = (map.layers.find(layer => layer.name === 'Items') as TiledObjectLayer).objects

      for (const item of items) {
        assert(
          [ 'observation', 'photo', 'document' ].includes(item.type),
          `${ map.tileMapName } has item "${ item.name }" with an incorrect type ${ item.type }`
        )
      }
    }
  })


  it('has an id property which corresponds to its description', () => {
    for (const map of tileMaps) {
      const items = (map.layers.find(layer => layer.name === 'Items') as TiledObjectLayer).objects

      for (const item of items) {
        const type = item.type
        const idProperty = getTiledPropertyValue(item, 'id')
        let description: any

        switch (type) {
          case 'photo':
            description = demoPhotos[idProperty]
            break
          case 'document':
            description = demoDocuments[idProperty]
            break
          case 'observation':
            description = demoObservations[idProperty]
            break
        }

        assert(
          idProperty,
          `${ map.tileMapName } has ${ item.type } "${ item.name }" with missing id property`
        )

        assert(
          description,
          `${ map.tileMapName } has ${ item.type } "${ item.name }" without corresponding description`
        )
      }
    }
  })
})
