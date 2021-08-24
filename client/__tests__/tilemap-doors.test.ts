import { getTiledPropertyValue, getTileMaps, TiledObjectLayer, TiledTileMap } from './test-utils'
import { assert } from '../utils/assert'

describe('each tile map Doors layer', () => {
  let tileMaps: TiledTileMap[] = []
  let tileMapNames: string[] = []
  beforeAll(async () => {
    tileMaps = await getTileMaps()
    tileMapNames = tileMaps.map(map => map.tileMapName.split('.')[0])
  })

  it('has a "doorTo" property that corresponds to another tileMap', () => {
    for (const map of tileMaps) {
      const doors = (map.layers.find(layer => layer.name === 'Doors') as TiledObjectLayer)!.objects
      for (const door of doors) {
        const doorToProperty = getTiledPropertyValue(door, 'doorTo')
        assert(
          doorToProperty,
          `${ map.tileMapName } has a door "${ door.name }" which is missing a doorTo property`
        )
        assert(
          typeof doorToProperty.value === 'string' && doorToProperty.value !== '',
          `${ map.tileMapName } has a door "${ door.name }" with a doorTo property that is the wrong type or empty`
        )
        assert(
          tileMapNames.includes(doorToProperty.value),
          `${ map.tileMapName } has a door "${ door.name }" which leads to a nonexistent map`
        )
      }
    }
  })

  it('has a corresponding spawn point in the target map', () => {
    for (const map of tileMaps) {
      const doors = (map.layers.find(layer => layer.name === 'Doors') as TiledObjectLayer)!.objects
      for (const door of doors) {
        const doorTo = getTiledPropertyValue(door, 'doorTo')
        let spawnPointsNames: string[] = (tileMaps.find(map => map.tileMapName === doorTo + '.json')!.layers.find(
          layer => layer.name === 'Spawn Points') as TiledObjectLayer).objects.map(
          object => object.properties?.find(prop => prop.name === 'fromDoor')?.value).filter(val => !!val)

        assert(
          spawnPointsNames.includes(doorTo),
          `${ map.tileMapName } has a door with doorTo "${ doorTo }" which does not have a spawn point in the target map`
        )
      }
    }
  })
})
