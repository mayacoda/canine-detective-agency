import { Scene } from 'phaser'
import { PlayableScene } from '../scenes/PlayableScene'
import SimpleControlsPlugin from '../plugins/SimpleControlsPlugin'

export class Player extends Phaser.Physics.Matter.Image {
  scene!: PlayableScene
  speed: number = 10

  constructor(scene: PlayableScene, x: number, y: number) {
    super(scene.matter.world, x, y, 'player')
    this.setCircle(this.width / 3)
    scene.add.existing(this)
    this.scene.cameras.main.startFollow(this, true)
  }

  update(controls: SimpleControlsPlugin) {
    if (controls.up) {
      this.y -= this.speed
    } else if (controls.down) {
      this.y += this.speed
    }
    if (controls.left) {
      this.x -= this.speed
    } else if (controls.right) {
      this.x += this.speed
    }
  }
}

export function loadPlayerAssets(scene: Scene) {
  scene.load.image('player', 'images/shepherd.png')
}
