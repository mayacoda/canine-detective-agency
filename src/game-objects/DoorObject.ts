import { Scene, GameObjects } from 'phaser'
import { SceneName } from '../scenes/scene-name'

export class DoorObject extends GameObjects.Image {
  constructor(scene: Scene, x: number, y: number, texture: string, private sceneName: SceneName) {
    super(scene, x, y, texture);

    this.setInteractive()
    this.on('clicked', () => {
      console.log('I am a door and I got clicked')
      scene.scene.start(this.sceneName)
    })
  }
}

export function loadDoorAssets(scene: Scene) {
  scene.load.image('door', 'images/door.png')
}
