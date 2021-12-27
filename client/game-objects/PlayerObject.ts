import { Scene } from 'phaser'
import { PlayableScene } from '../scenes/PlayableScene'
import SimpleControlsPlugin from '../plugins/SimpleControlsPlugin'
import { Vec2 } from '../../interface/geometry-interface'
import { multiply, normalize } from '../utils/geometry-utils'

export class PlayerObject extends Phaser.Physics.Matter.Image {
  scene!: PlayableScene
  speed: number = 10

  constructor(scene: PlayableScene, x: number, y: number, avatar: string = 'shepherd') {
    super(scene.matter.world, x, y, avatar)
    this.setCircle(this.width / 6)
    this.setBounce(0)
    scene.add.existing(this)
    this.scene.cameras.main.startFollow(this, true)
  }

  update(controls: SimpleControlsPlugin) {
    const vec: Vec2 = { x: 0, y: 0 }

    if (controls.up) {
      vec.y = -1
    } else if (controls.down) {
      vec.y = 1
    }
    if (controls.left) {
      vec.x = -1
    } else if (controls.right) {
      vec.x = 1
    }

    const newSpeed = multiply(normalize(vec), this.speed)
    this.x += newSpeed.x
    this.y += newSpeed.y


    this.scene.gameStateManager.socket.emit('move', { x: this.x, y: this.y })
  }
}

export function loadPlayerAssets(scene: Scene) {
  scene.load.image('shepherd', 'images/shepherd.png')
  scene.load.image('pug', 'images/pug.png')
  scene.load.image('poodle', 'images/poodle.png')
  scene.load.image('stafford', 'images/stafford.png')
}
