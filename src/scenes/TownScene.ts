import { PlayableScene } from './PlayableScene'
import { SceneName } from './scene-name'

export class TownScene extends PlayableScene {
  constructor() {
    super(SceneName.Town)
  }

  preload() {
    super.preload()

    this.load.image('house', 'images/house.png')
  }
}
