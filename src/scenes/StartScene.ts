import { Scene } from 'phaser'
import { DoorObject, loadDoorAssets } from '../game-objects/DoorObject'
import { DogButton } from '../components/DogButton'
import { SceneName } from './scene-name'
import { createClickedListener } from '../utils/emit-game-object-events'

export class StartScene extends Scene {
  constructor() {
    super(SceneName.Start)
  }

  preload() {
    loadDoorAssets(this)
  }

  create() {
    this.children.add(new DoorObject(this, 300, 200, 'door', SceneName.Shop))

    createClickedListener(this)

    const button = this.add.dom(400, 300, new DogButton())
    button.addListener('click').on('click', () => {
      console.log('clicking a button')
    })
  }
}
