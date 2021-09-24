import { PlayableScene } from '../scenes/PlayableScene'
import { Player } from '../../interface/game-state-interface'
import { NameTag } from '../components/NameTag'
import { getTextBlockPosition } from '../utils/geometry-utils'
import GameObject = Phaser.GameObjects.GameObject

export class OtherPlayerObject extends Phaser.GameObjects.Sprite {
  scene!: PlayableScene
  playerName!: string
  tag: GameObject | null = null

  constructor(scene: PlayableScene, { pos, avatar, name }: Player) {
    super(scene, pos.x, pos.y, avatar)
    scene.add.existing(this)
    this.scale = 0.8
    this.tint = 0xdddddd

    this.playerName = name
    this.setInteractive()

    this.on('pointerover', () => {
      const tag = new NameTag()
      tag.name = this.playerName
      const pos = getTextBlockPosition(this, this.playerName.length * 10 + 32)
      this.tag = this.scene.add.dom(pos.x, pos.y - 30, tag)
    })

    this.on('pointerout', () => {
      this.tag?.destroy()
      this.tag = null
    })
  }
}
