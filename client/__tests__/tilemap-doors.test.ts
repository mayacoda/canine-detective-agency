import {
  getTiledPropertyValue,
  getTileMaps,
  TiledObjectLayer,
  TiledTileMap
} from '../utils/test-utils'
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
        const doorName = getTiledPropertyValue(door, 'doorName')
        const scene = getTiledPropertyValue(door, 'scene')
        assert(
          doorName,
          `${ map.tileMapName } has a door "${ door.name }" which is missing a doorName property`
        )
        assert(
          scene,
          `${ map.tileMapName } has a door "${ door.name }" which is missing a scene property`
        )
        assert(
          typeof doorName === 'string' && doorName !== '',
          `${ map.tileMapName } has a door "${ door.name }" with a doorName property that is the wrong type or empty`
        )
        assert(
          typeof scene === 'string' && scene !== '',
          `${ map.tileMapName } has a door "${ door.name }" with a scene property that is the wrong type or empty`
        )
        assert(
          tileMapNames.includes(scene),
          `${ map.tileMapName } has a door "${ door.name }" which leads to a nonexistent map`
        )
      }
    }
  })

  it('has a corresponding spawn point in the target map', () => {
    for (const map of tileMaps) {
      const doors = (map.layers.find(layer => layer.name === 'Doors') as TiledObjectLayer)!.objects
      for (const door of doors) {
        const doorName = getTiledPropertyValue(door, 'doorName')
        const scene = getTiledPropertyValue(door, 'scene')
        let spawnPointsNames: string[] = (tileMaps.find(map => map.tileMapName === scene + '.json')!.layers.find(
          layer => layer.name === 'Spawn Points') as TiledObjectLayer).objects.map(
          object => object.properties?.find(prop => prop.name === 'fromDoor')?.value).filter(val => !!val)

        assert(
          spawnPointsNames.includes(doorName),
          `"${ map.tileMapName }" has a door with doorName "${ doorName }" which does not have a spawn point in the target map "${ scene }"`
        )
      }
    }
  })
})
