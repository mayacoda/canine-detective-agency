import { PlayableScene } from '../scenes/PlayableScene'

export class InteractiveItem extends Phaser.GameObjects.Sprite {
  scene!: PlayableScene
  id: string

  constructor(scene: PlayableScene, x: number, y: number, id: string, image: string) {
    super(scene, x, y, image)
    this.id = id
    scene.add.existing(this)
    this.registerListeners()
    this.setInteractive()
  }

  private registerListeners() {
    this.on('pointerup', () => {
      console.log('clicking on the thing')
    })
  }
}
