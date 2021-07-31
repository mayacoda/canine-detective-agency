import { Scene } from 'phaser'
import { UIContainer } from '../components/UIContainer'
import { demoGameData } from '../game-data/demo-game-data'

export class UIScene extends Scene {
  private uiContainerGameObject!: Phaser.GameObjects.DOMElement
  private uiContainer!: UIContainer

  constructor() {
    super('UI')
  }

  create() {
    const x = this.game.canvas.width / 2
    const y = this.game.canvas.height / 2

    this.uiContainer = new UIContainer()
    this.uiContainerGameObject = this.add.dom(
      x,
      y,
      this.uiContainer,
      'display: flex; width: 100%; height: 100%; z-index: 10;'
    )
  }

  update() {
    this.uiContainer.gameData = demoGameData
  }
}
