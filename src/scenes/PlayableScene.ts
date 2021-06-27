import { Scene } from 'phaser'
import { SceneName } from './scene-name'
import { loadPlayerAssets, Player } from '../game-objects/Player'
import SimpleControlsPlugin from '../plugins/SimpleControlsPlugin'
import { Door, loadDoorAssets } from '../game-objects/Door'
import GameObject = Phaser.GameObjects.GameObject

export class PlayableScene extends Scene {
  controls!: SimpleControlsPlugin
  protected player!: Player
  protected doors!: Phaser.Physics.Arcade.Group

  constructor(sceneName: SceneName) {
    super(sceneName)
  }

  preload() {
    loadDoorAssets(this)
    loadPlayerAssets(this)
  }

  createPlayer() {
    this.player = new Player(this, 400, 300)
    this.cameras.main.startFollow(this.player, true)
  }

  create() {
    this.createPlayer()
    this.doors = this.physics.add.group()
    this.controls.start()
  }

  update(time: number, delta: number) {
    super.update(time, delta)

    this.player.update(this.controls)

    this.physics.overlap(this.player, this.doors, this.enterDoor, () => {
    }, this)
  }

  enterDoor(obj1: GameObject, obj2: GameObject) {
    const door = obj1 instanceof Door ? obj1 : obj2 instanceof Door ? obj2 : null

    if (door) {
      door.emit('open')
    }
  }
}
