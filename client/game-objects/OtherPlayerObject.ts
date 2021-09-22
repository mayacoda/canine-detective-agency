import { PlayableScene } from '../scenes/PlayableScene'

export class OtherPlayerObject extends Phaser.GameObjects.Sprite {
  scene!: PlayableScene

  constructor(scene: PlayableScene, x: number, y: number, avatar: string = 'shepherd') {
    super(scene, x, y, avatar)
    scene.add.existing(this)
    this.scale = 0.8
    this.tint = 0xdddddd
  }
}
