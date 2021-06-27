import { Scene } from 'phaser'
import { PlayableScene } from '../scenes/PlayableScene'
import SimpleControlsPlugin from '../plugins/SimpleControlsPlugin'

export class Player extends Phaser.Physics.Arcade.Sprite {
  scene!: PlayableScene
  speed: number = 130

  constructor(scene: PlayableScene, x: number, y: number) {
    super(scene, x, y, 'player')
    scene.physics.world.enable(this)
    scene.add.existing(this)
    this.depth = 10
    this.setCollideWorldBounds(true)
  }

  update(controls: SimpleControlsPlugin) {
    this.body.velocity.y = 0
    this.body.velocity.x = 0

    if (controls.up) {
      this.body.velocity.y -= this.speed
    } else if (controls.down) {
      this.body.velocity.y += this.speed
    }
    if (controls.left) {
      this.body.velocity.x -= this.speed
    } else if (controls.right) {
      this.body.velocity.x += this.speed
    }
  }
}

export function loadPlayerAssets(scene: Scene) {
  scene.load.image('player', 'images/player-temp.png')
}
