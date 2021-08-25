import { InteractiveItem } from './InteractiveItem'
import { PlayableScene } from '../scenes/PlayableScene'

export class PhotoItem extends InteractiveItem {
  constructor(scene: PlayableScene, x: number, y: number, id: string, image: string) {
    super(scene, x, y, id, image)
    this.registerListeners(() => {
      this.scene.gameStateManager.requestPhoto(id).then(observation => {
        console.log('got observation from backend', observation)

        this.scene.gameStateManager.updatePhoto(this.id)
      })
    })
  }
}
