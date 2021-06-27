import { Door, loadDoorAssets } from '../game-objects/Door'
import { SceneName } from './scene-name'
import { createClickedListener } from '../utils/emit-game-object-events'
import { PlayableScene } from './PlayableScene'

export class ShopScene extends PlayableScene {
  constructor() {
    super(SceneName.Shop)
  }

  preload() {
    loadDoorAssets(this)
  }

  create() {
    super.create()
    this.doors.add(new Door(this, 500, 400, SceneName.Start))
    createClickedListener(this)
  }
}
