import { PlayableScene } from './PlayableScene'
import { SceneName } from './scene-name'

export class TownScene extends PlayableScene {
  constructor() {
    super(SceneName.Town);
  }
}
