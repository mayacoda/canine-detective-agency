import { Scene } from 'phaser'
import { SceneName } from '../scenes/scene-name'

export class Door extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, private sceneName: SceneName) {
    super(scene, x, y, 'door')
    scene.physics.world.enable(this)
    scene.add.existing(this)
    this.setCollideWorldBounds(true)

    this.on('open', () => {
      scene.scene.start(this.sceneName)
    })
  }
}

export function loadDoorAssets(scene: Scene) {
  scene.load.image('door', 'images/door.png')
}
