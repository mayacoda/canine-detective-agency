import { PlayableScene } from '../scenes/PlayableScene'
import { InteractiveItemOverlay } from '../components/interactive-item/InteractiveItemOverlay'
import { getTextBlockPosition } from '../utils/geometry-utils'
import GameObject = Phaser.GameObjects.GameObject

export class InteractiveItem extends Phaser.GameObjects.Sprite {
  scene!: PlayableScene
  overlayGameObject?: GameObject
  overlay?: InteractiveItemOverlay
  id: string

  constructor(scene: PlayableScene, x: number, y: number, id: string, image: string) {
    super(scene, x, y, image)
    this.id = id
    scene.add.existing(this)
    this.setInteractive()
    this.setDepth(10000)
  }

  protected registerOnOpenListeners(callback: () => void) {
    this.on('pointerup', () => {
      if (!this.overlayGameObject) {
        this.overlay = new InteractiveItemOverlay()

        const { x, y } = getTextBlockPosition(this)
        this.overlay.addEventListener('close', () => {
          this.removeOverlayGameObject()
        })

        callback()

        this.overlayGameObject = this.scene.add.dom(x, y, this.overlay)
      }
    })
  }

  protected removeOverlayGameObject() {
    if (this.overlayGameObject) {
      this.overlayGameObject.destroy(true)
      this.overlayGameObject = undefined
      this.overlay?.remove()
    }
  }
}
