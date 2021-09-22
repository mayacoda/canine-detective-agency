import { InteractiveItem } from './InteractiveItem'
import { PlayableScene } from '../scenes/PlayableScene'
import { Photo } from '../../interface/game-data-interface'
import { PhotoItemCard } from '../components/interactive-item/PhotoItemCard'

export class PhotoItem extends InteractiveItem {
  private photo?: Photo

  constructor(scene: PlayableScene, x: number, y: number, id: string, image: string) {

    super(scene, x, y, id, image)
    this.registerOnOpenListeners(async () => {
      if (!this.photo) {
        this.photo = await this.scene.gameStateManager.requestPhoto(id)
        await this.scene.gameStateManager.updatePhoto(this.id)
      }

      if (this.overlay?.childElementCount === 0) {
        const card = new PhotoItemCard()
        card.photo = this.photo
        this.overlay?.appendChild(card)
      }
    })
  }
}
