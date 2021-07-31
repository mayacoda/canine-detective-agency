import { Scene } from 'phaser'
import { SceneName } from './scene-name'
import { loadPlayerAssets, Player } from '../game-objects/Player'
import SimpleControlsPlugin from '../plugins/SimpleControlsPlugin'
import { getPhaserCentroid, Verts } from '../utils/geometry-utils'
import Tilemap = Phaser.Tilemaps.Tilemap
import TilemapLayer = Phaser.Tilemaps.TilemapLayer
import MatterBody = Phaser.Types.Physics.Matter.MatterBody
import TiledObject = Phaser.Types.Tilemaps.TiledObject

function getTiledProperty(obj: TiledObject, name: string): any {
  return (obj.properties as { name: string, value: any }[] || []).find(prop => prop.name === name)?.value ?? null
}

export class PlayableScene extends Scene {
  controls!: SimpleControlsPlugin
  protected player!: Player
  protected tileMap!: Tilemap

  private groundLayer!: TilemapLayer
  private doors: MatterBody[] = []

  constructor(sceneName: SceneName) {
    super(sceneName)
  }

  preload() {
    this.load.image('tileset', 'tilemaps/isometric-grid.png')
    this.load.image('house', 'tilemaps/house.png')

    this.load.tilemapTiledJSON(this.scene.key, `tilemaps/${ this.scene.key }.json`)
    loadPlayerAssets(this)
  }

  create(config: { fromDoor?: string }) {
    this.controls.start()

    this.tileMap = this.make.tilemap({ key: this.scene.key })
    const tileset = this.tileMap.addTilesetImage('procreate-test-2', 'tileset')
    this.setUpGroundLayer(tileset)
    this.setUpDoors()
    this.spawnPlayer(config)

    this.setUpColliders()
  }

  update(time: number, delta: number) {
    super.update(time, delta)

    if (this.controls.hasInput) {
      this.player.update(this.controls)

      this.matter.overlap(this.player, this.doors, (a: MatterBody, b: MatterBody) => {
        const door = 'gameObject' in b && b.gameObject.getData('doorTo')
        if (door) {
          this.scene.start(door, { fromDoor: this.scene.key })
        } else {
          console.warn('Door is missing "doorTo" property!')
        }
      })

      this.player.setDepth(this.player.y)
    }
  }

  private setUpDoors() {
    this.doors = this.tileMap.getObjectLayer('Doors').objects.map(doorObj => {
      let { data, gameObject } = this.createPolygon(doorObj)
      const doorTo = getTiledProperty(doorObj, 'doorTo')
      gameObject.setData('doorTo', doorTo)
      return this.matter.add.gameObject(
        gameObject,
        {
          shape: { type: 'fromVerts', verts: data },
          isStatic: true
        }
      )
    })
  }

  private createPolygon(doorObj: Phaser.Types.Tilemaps.TiledObject) {
    const center = getPhaserCentroid(doorObj.polygon as Verts[])
    let data = doorObj.polygon
    let x = doorObj.x ?? 0
    let y = doorObj.y ?? 0
    const gameObject = this.add.polygon(center.x + x, center.y + y + 64, data, 0x0000ff, 0.2)
    gameObject.visible = false
    return { data, gameObject }
  }

  private setUpColliders() {
    this.tileMap.getObjectLayer('Colliders')?.objects.forEach(object => {
      if (object.type === 'collider') {
        let { data, gameObject } = this.createPolygon(object)
        this.matter.add.gameObject(
          gameObject,
          {
            shape: { type: 'fromVerts', verts: data },
            isStatic: true
          }
        )
      }
    })

    this.tileMap.getObjectLayer('Images')?.objects.map(object => {
      let x = (object.x ?? 0) + (object.width ?? 0) / 2
      let y = (object.y ?? 0) - (object.height ?? 0) / 2 + 64
      const image = this.add.image(x, y, object.name)
      image.setDepth(image.y)
    })
  }

  private setUpGroundLayer(tileset: Phaser.Tilemaps.Tileset) {
    const ground = this.tileMap.createLayer('Ground', tileset)
    ground.setCollisionByProperty({ collides: true })

    this.groundLayer = ground
    this.matter.world.convertTilemapLayer(ground)
  }

  private spawnPlayer(config: { fromDoor?: string }) {
    const spawnPoints = this.tileMap.getObjectLayer('Spawn Points').objects
    let x = 400
    let y = 300

    if (config.fromDoor) {
      const point = spawnPoints.find(point => {
        return config.fromDoor ? getTiledProperty(point, 'fromDoor') === config.fromDoor : null
      })
      if (point) {
        x = point.x ?? x
        y = point.y ?? y
        this.player = new Player(this, x, y + 64)
        return
      } else {
        console.warn(`Expected to find spawn point for ${ config.fromDoor }`)
      }
    }

    let defaultPoint = spawnPoints.find(point => !getTiledProperty(
      point,
      'fromDoor'
    )) ?? spawnPoints[0]

    if (defaultPoint) {
      x = defaultPoint.x ?? x
      y = defaultPoint.y ?? y
    }

    this.player = new Player(this, x, y + 64)
  }
}
