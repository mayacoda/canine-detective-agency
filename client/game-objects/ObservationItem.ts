import { InteractiveItem } from './InteractiveItem'
import { PlayableScene } from '../scenes/PlayableScene'

export class ObservationItem extends InteractiveItem {
  constructor(scene: PlayableScene, x: number, y: number, id: string, image: string) {
    super(scene, x, y, id, image)
    this.registerListeners(() => {
      this.scene.gameStateManager.requestObservation(id).then(observation => {
        console.log('got observation from backend', observation)

        this.scene.gameStateManager.updateObservation(this.id)
      })
    })
  }
}
