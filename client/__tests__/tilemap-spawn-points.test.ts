import { getTileMaps, TiledObjectLayer, TiledTileMap } from './test-utils'
import { assert } from '../utils/assert'

describe('each tile map Spawn Points layer', () => {
  let tileMaps: TiledTileMap[] = []
  let tileMapNames: string[] = []
  beforeAll(async () => {
    tileMaps = await getTileMaps()
    tileMapNames = tileMaps.map(map => map.tileMapName.split('.')[0])
  })

  // todo: spawn points should correspond to a door, not just a map. Multiple doors should be able to lead to the same map, just in different locations
  it('has a "fromDoor" property that corresponds to another tileMap', () => {
    for (const map of tileMaps) {
      const spawnPoints = (map.layers.find(layer => layer.name === 'Spawn Points') as TiledObjectLayer)!.objects
      for (const spawnPoint of spawnPoints) {
        const fromDoorProperty = spawnPoint.properties?.find(property => property.name === 'fromDoor')

        if (fromDoorProperty) {
          assert(
            typeof fromDoorProperty.value === 'string' && fromDoorProperty.value !== '',
            `${ map.tileMapName } has a spawn point "${ spawnPoint.name }" with a fromDoor property that is the wrong type or empty`
          )
          assert(
            tileMapNames.includes(fromDoorProperty.value),
            `${ map.tileMapName } has a spawn point "${ spawnPoint.name }" which leads to a nonexistent map`
          )
        }

      }
    }
  })
})
