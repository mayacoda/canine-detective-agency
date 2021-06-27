import { Scene } from 'phaser'
import { DoorObject, loadDoorAssets } from '../game-objects/DoorObject'
import { SceneName } from './scene-name'
import { createClickedListener } from '../utils/emit-game-object-events'

export class ShopScene extends Scene {
  constructor() {
    super(SceneName.Shop)
  }

  preload() {
    loadDoorAssets(this)
  }

  create() {
    this.children.add(new DoorObject(this, 500, 400, 'door', SceneName.Start))
    createClickedListener(this)
  }
}
