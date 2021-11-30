// define a new manor scene class
import { PlayableScene } from './PlayableScene'
import { SceneName } from './scene-name'

export class ManorUpstairs extends PlayableScene {
  constructor() {
    super(SceneName.ManorUpstairs)
  }
}
