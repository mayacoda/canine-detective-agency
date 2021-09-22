import { PlayableScene } from './PlayableScene'
import { SceneName } from './scene-name'
import { GameStateManager } from '../game-state/game-state-manager'

export class TownScene extends PlayableScene {
  constructor() {
    super(SceneName.Town)
  }

  preload() {
    super.preload()

    this.load.image('house', 'images/house.png')
  }

  create(config: { fromDoor?: string; gameStateManager: GameStateManager }) {
    super.create(config)

    console.log('created the town scene')
  }
}
