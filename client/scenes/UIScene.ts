import { Scene } from 'phaser'
import { UIContainer } from '../components/UIContainer'
import { GameStateManager } from '../game-state/game-state-management'

export class UIScene extends Scene {
  private uiContainerGameObject!: Phaser.GameObjects.DOMElement
  private uiContainer!: UIContainer
  private gameStateManager!: GameStateManager

  constructor() {
    super('UI')
  }

  create(config: { gameStateManager: GameStateManager }) {
    const x = this.game.canvas.width / 2
    const y = this.game.canvas.height / 2

    this.uiContainer = new UIContainer()
    this.uiContainerGameObject = this.add.dom(
      x,
      y,
      this.uiContainer,
      'display: flex; width: 100%; height: 100%; z-index: 10;'
    )

    this.gameStateManager = config.gameStateManager
    this.gameStateManager.addListener('update', state => {
      this.uiContainer.gameData = state.gameData
    })
  }
}
