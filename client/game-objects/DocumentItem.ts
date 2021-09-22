import { InteractiveItem } from './InteractiveItem'
import { PlayableScene } from '../scenes/PlayableScene'

export class DocumentItem extends InteractiveItem {
  constructor(scene: PlayableScene, x: number, y: number, id: string, image: string) {
    super(scene, x, y, id, image)
    this.registerOnOpenListeners(() => {
      this.scene.gameStateManager.requestDocument(id).then(observation => {
        console.log('got observation from backend', observation)

        this.scene.gameStateManager.updateDocument(this.id)
      })
    })
  }
}
