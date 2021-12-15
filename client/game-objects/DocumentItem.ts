import { InteractiveItem } from './InteractiveItem'
import { PlayableScene } from '../scenes/PlayableScene'
import { Document } from '../../interface/game-data-interface'

export class DocumentItem extends InteractiveItem {
  private document?: Document

  constructor(scene: PlayableScene, x: number, y: number, id: string, image: string) {
    super(scene, x, y, id, image)
    this.registerOnOpenListeners(async () => {
      if (!this.document) {
        this.document = await this.scene.gameStateManager.requestDocument(id)
        await this.scene.gameStateManager.updateDocument(this.id)
      }

      if (this.overlay && this.document) {
        this.overlay.innerText = `You have discovered "${ this.document.name }". Look in Evidence > Documents to read it.`
      }
    })
  }
}
