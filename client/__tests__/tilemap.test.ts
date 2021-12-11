import {
  getExistingImagesAsPathsFromTilemapsDir,
  getImagesUsedByTileMap,
  getTileMaps,
  TiledTileMap
} from '../utils/test-utils'
import { assert } from '../utils/assert'

describe('each tile map', () => {
  let tileMaps: TiledTileMap[] = []
  let allImages: string[] = []
  beforeAll(async () => {
    tileMaps = await getTileMaps()
    allImages = await getExistingImagesAsPathsFromTilemapsDir()
  })

  it('has a Ground tile layer', () => {
    for (const map of tileMaps) {
      const groundLayer = map.layers.find(layer => layer.name === 'Ground')
      assert(groundLayer, `${ map.tileMapName } is missing Ground layer`)
      assert(
        groundLayer!.type === 'tilelayer',
        `${ map.tileMapName } Ground layer isn't a tile layer`
      )
    }
  })

  it.each([
    [ 'Spawn Points' ],
    [ 'Items' ],
    [ 'Characters' ],
    [ 'Colliders' ],
    [ 'Images' ],
    [ 'Doors' ]
  ])(`has an object layer called %s`, (layerName) => {
    for (const map of tileMaps) {
      const objectLayer = map.layers.find(layer => layer.name === layerName)
      assert(objectLayer, `${ map.tileMapName } is missing ${ layerName } layer`)
      assert(
        objectLayer!.type === 'objectgroup',
        `${ map.tileMapName } Ground layer isn't a tile layer`
      )
    }
  })

  it('has a file for each image', () => {
    for (const map of tileMaps) {
      const imageRefs = getImagesUsedByTileMap(map)
      for (let imageRef of imageRefs) {
        assert(
          allImages.includes(imageRef),
          `${ map.tileMapName } has reference to ${ imageRef } which is missing a corresponding`
        )
      }
    }
  })
})


/*
  This is how it should work once https://github.com/kulshekhar/ts-jest/issues/2057 is resolved
 */
// import { getTileMaps } from '../utils/test-utils'
//
// const tileMaps = await getTileMaps()
//
// describe('tile maps', () => {
//   tileMaps.forEach(map => {
//     it(`${ map.tileMapName } has a Ground tile layer`, () => {
//       const groundLayer = map.layers.find(layer => layer.name === 'Ground')
//       expect(groundLayer).toBeDefined()
//       expect(groundLayer!.type).toEqual('tilelayer')
//     })
//
//     it.each([
//       [ 'Spawn Points' ],
//       [ 'Items' ],
//       [ 'Characters' ],
//       [ 'Colliders' ],
//       [ 'Images' ],
//       [ 'Doors' ]
//     ])(`${ map.tileMapName } has an object layer called %s`, (layerName) => {
//       const objectLayer = map.layers.find(layer => layer.name === layerName)
//       expect(objectLayer).toBeDefined()
//       expect(objectLayer!.type).toEqual('objectgroup')
//     })
//   })
// })
