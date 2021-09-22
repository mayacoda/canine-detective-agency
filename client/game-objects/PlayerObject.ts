import { Scene } from 'phaser'
import { PlayableScene } from '../scenes/PlayableScene'
import SimpleControlsPlugin from '../plugins/SimpleControlsPlugin'

export class PlayerObject extends Phaser.Physics.Matter.Image {
  scene!: PlayableScene
  speed: number = 10

  constructor(scene: PlayableScene, x: number, y: number, avatar: string = 'shepherd') {
    super(scene.matter.world, x, y, avatar)
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

    this.scene.gameStateManager.socket.emit('move', { x: this.x, y: this.y })
  }
}

export function loadPlayerAssets(scene: Scene) {
  scene.load.image('shepherd', 'images/shepherd.png')
  scene.load.image('pug', 'images/pug.png')
  scene.load.image('poodle', 'images/poodle.png')
  scene.load.image('stafford', 'images/stafford.png')
}
