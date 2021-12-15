import { InteractiveItem } from './InteractiveItem'
import { PlayableScene } from '../scenes/PlayableScene'
import { Observation } from '../../interface/game-data-interface'
import { ObservationItemCard } from '../components/interactive-item/ObservationItemCard'

export class ObservationItem extends InteractiveItem {
  private observation?: Observation

  constructor(scene: PlayableScene, x: number, y: number, id: string, image: string) {
    super(scene, x, y, id, image)
    this.registerOnOpenListeners(async () => {
      if (!this.observation) {
        this.observation = await this.scene.gameStateManager.requestObservation(id)
        await this.scene.gameStateManager.updateObservation(this.id)
      }

      if (this.overlay?.childElementCount === 0 && this.observation) {
        const card = new ObservationItemCard()
        card.observation = this.observation
        this.overlay?.appendChild(card)
      }
    })
  }
}
