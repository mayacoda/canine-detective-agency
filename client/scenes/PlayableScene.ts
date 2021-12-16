import { Scene } from 'phaser'
import { SceneName } from './scene-name'
import { loadPlayerAssets, PlayerObject } from '../game-objects/PlayerObject'
import SimpleControlsPlugin from '../plugins/SimpleControlsPlugin'
import { getPhaserCentroid } from '../utils/geometry-utils'
import { NPC } from '../game-objects/NPC'
import { Vec2 } from '../../interface/geometry-interface'
import { GameStateManager } from '../game-state/game-state-manager'
import { InteractiveItem } from '../game-objects/InteractiveItem'
import { preloadFunctions } from './preload-functions'
import { ObservationItem } from '../game-objects/ObservationItem'
import { DocumentItem } from '../game-objects/DocumentItem'
import { assert } from '../utils/assert'
import { OtherPlayerObject } from '../game-objects/OtherPlayerObject'
import { Player } from '../../interface/game-state-interface'
import Tilemap = Phaser.Tilemaps.Tilemap
import MatterBody = Phaser.Types.Physics.Matter.MatterBody
import TiledObject = Phaser.Types.Tilemaps.TiledObject

function getTiledProperty(obj: TiledObject, name: string): any {
  return (obj.properties as { name: string, value: any }[] || []).find(prop => prop.name === name)?.value ?? null
}

function getPosition(object: Phaser.Types.Tilemaps.TiledObject) {
  let x = (object.x ?? 0) + (object.width ?? 0) / 2
  let y = (object.y ?? 0) - (object.height ?? 0) / 2 + 64
  return { x, y }
}

export class PlayableScene extends Scene {
  controls!: SimpleControlsPlugin
  player!: PlayerObject
  gameStateManager!: GameStateManager
  protected tileMap!: Tilemap

  private otherPlayers: Record<string, OtherPlayerObject> = {}
  private doors: MatterBody[] = []
  private NPCs: NPC[] = []
  private items: InteractiveItem[] = []

  constructor(sceneName: SceneName) {
    super(sceneName)
  }

  preload() {
    preloadFunctions[this.scene.key](this)
    loadPlayerAssets(this)
  }

  create(config: { fromDoor?: string, gameStateManager: GameStateManager }) {
    this.gameStateManager = config.gameStateManager
    this.controls.start()

    this.tileMap = this.make.tilemap({ key: this.scene.key })
    const tileset = this.tileMap.addTilesetImage('procreate-test-2', 'isometric-grid')
    this.setUpGroundLayers(tileset)
    this.setUpDoors()
    this.setUpObjects()
    this.setUpNPCs()
    this.setUpItems()
    this.setUpOtherPlayers()

    this.spawnPlayer(config)

    this.events.on('shutdown', () => {
      this.cleanUp()
    })
  }

  update(time: number, delta: number) {
    super.update(time, delta)

    if (this.controls.hasInput) {
      this.player.update(this.controls)

      this.matter.overlap(this.player, this.doors, (a: MatterBody, b: MatterBody) => {
        const doorName = 'gameObject' in b && b.gameObject.getData('doorName')
        const scene = ('gameObject' in b && b.gameObject.getData('scene'))
        if (scene) {
          this.gameStateManager.socket.emit('changeMap', scene)
          this.scene.start(
            scene,
            { fromDoor: doorName, gameStateManager: this.gameStateManager }
          )
        } else {
          console.warn('Door is missing "doorTo" property!')
        }
      })

      this.player.setDepth(this.player.y)

      this.NPCs.forEach(npc => npc.update())
    }
  }

  cleanUp() {
    this.NPCs = []
    this.doors = []
    this.items = []
    this.otherPlayers = {}
  }

  private setUpDoors() {
    this.doors = this.tileMap.getObjectLayer('Doors').objects.map(doorObj => {
      let { data, gameObject } = this.createPolygon(doorObj)
      const doorName = getTiledProperty(doorObj, 'doorName')
      const scene = getTiledProperty(doorObj, 'scene')
      gameObject.setData('doorName', doorName)
      gameObject.setData('scene', scene)
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
    const center = getPhaserCentroid(doorObj.polygon as Vec2[])
    let data = doorObj.polygon
    let x = doorObj.x ?? 0
    let y = doorObj.y ?? 0
    const gameObject = this.add.polygon(center.x + x, center.y + y + 64, data, 0x0000ff, 0.2)
    gameObject.visible = false
    return { data, gameObject }
  }

  private setUpObjects() {
    this.tileMap.getObjectLayer('Colliders')?.objects.forEach(object => {
      let { data, gameObject } = this.createPolygon(object)
      this.matter.add.gameObject(
        gameObject,
        {
          shape: { type: 'fromVerts', verts: data },
          isStatic: true
        }
      )
    })

    this.setUpImages('Images')
  }

  private setUpImages(layerName: string, setDepth: boolean = true) {
    this.tileMap.getObjectLayer(layerName)?.objects.map(object => {
      const { x, y } = getPosition(object)
      const image = this.add.image(x, y, object.name)
      if (setDepth) image.setDepth(image.y)
    })
  }

  private setUpGroundLayers(tileset: Phaser.Tilemaps.Tileset) {
    this.tileMap.layers.forEach(layerData => {
      if (layerData.name === 'Walls') {
        this.setUpImages('Lower Images', false)
      }

      const layer = this.tileMap.createLayer(layerData.name, tileset)
      layer.setCollisionByProperty({ collides: true })
      layer.setCullPadding(128, 128)
      this.matter.world.convertTilemapLayer(layer)
    })
  }

  private setUpNPCs() {
    this.tileMap.getObjectLayer('Characters')?.objects.map(object => {
      const { x, y } = getPosition(object)

      this.NPCs.push(new NPC(this, object.name, x, y))
    })
  }

  private setUpItems() {
    this.tileMap.getObjectLayer('Items')?.objects.map(object => {
      let { x, y } = getPosition(object)
      const id = getTiledProperty(object, 'id')
      const image = getTiledProperty(object, 'image')
      const type = object.type
      switch (type) {
        case 'observation':
          this.items.push(new ObservationItem(this, x, y, id, image))
          break
        case 'document':
          this.items.push(new DocumentItem(this, x, y, id, image))
          break
        default:
          this.items.push(new InteractiveItem(this, x, y, id, image))
      }
    })
  }

  private spawnPlayer(config: { fromDoor?: string }) {

    const spawnPoints = this.tileMap.getObjectLayer('Spawn Points').objects

    const currentPlayer = this.gameStateManager.getPlayer()
    assert(currentPlayer, 'Did not get current player from state manager')

    let { x, y } = currentPlayer.pos


    if (config.fromDoor) {
      const point = spawnPoints.find(point => {
        return config.fromDoor ? getTiledProperty(point, 'fromDoor') === config.fromDoor : null
      })
      if (point) {
        x = point.x ?? x
        y = point.y ?? y
      } else {
        console.warn(`Expected to find spawn point for ${ config.fromDoor }`)
      }
    }

    this.player = new PlayerObject(this, x, y + 64, currentPlayer.avatar)
  }

  private setUpOtherPlayers() {
    const initialPlayers = this.gameStateManager.state?.players
    if (initialPlayers) {
      this.updatePlayers(initialPlayers)
    }

    this.gameStateManager.socket.on('playersUpdate', players => {
      this.updatePlayers(players)
    })
  }

  private updatePlayers(players: Record<string, Player>) {
    const currentPlayer = this.gameStateManager.getPlayer()
    const playersOnServer = Object.values(players).filter(player => player.id !== currentPlayer?.id)
    const playersOnServerKeys = playersOnServer.map(player => player.id)

    for (const player of playersOnServer) {
      // check if player exists in current client game
      const otherPlayer = this.otherPlayers[player.id]
      if (otherPlayer) {
        // if yes, and player is still on the same map, update coordinates
        if (player.map === this.scene.key) {
          otherPlayer.x = player.pos.x
          otherPlayer.y = player.pos.y
          otherPlayer.setDepth(otherPlayer.y)
        } else {
          // if yes, and player is no longer on the map, remove player
          this.otherPlayers[player.id].destroy()
          delete this.otherPlayers[player.id]
        }
      } else if (player.map === this.scene.key) {
        // if no, and player is on the same map, add player
        this.otherPlayers[player.id] = new OtherPlayerObject(this, player)
      }
    }

    const playersOnClientKeys = Object.keys(this.otherPlayers)
    const playersOnClientButNotServer = playersOnClientKeys.filter(id => !playersOnServerKeys.includes(
      id))

    // if any player is on client game but not in update, remove them
    for (const id of playersOnClientButNotServer) {
      this.otherPlayers[id].destroy()
      delete this.otherPlayers[id]
    }
  }
}
