import { Door } from '../game-objects/Door'
import { DogButton } from '../components/DogButton'
import { SceneName } from './scene-name'
import { createClickedListener } from '../utils/emit-game-object-events'
import { PlayableScene } from './PlayableScene'

export class StartScene extends PlayableScene {
  constructor() {
    super(SceneName.Start)
  }

  create() {
    super.create()

    this.doors.add(new Door(this, 300, 200, SceneName.Shop))

    createClickedListener(this)
    const button = this.add.dom(400, 300, new DogButton())
    button.addListener('click').on('click', () => {
      console.log('clicking a button')
    })
  }
}
