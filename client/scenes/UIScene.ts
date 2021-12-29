import { Scene } from 'phaser'
import { UIContainer } from '../components/UIContainer'
import { GameStateManager } from '../game-state/game-state-manager'

export class UIScene extends Scene {
  private uiContainerGameObject!: Phaser.GameObjects.DOMElement
  private uiContainer!: UIContainer

  constructor() {
    super('UI')
  }

  create(config: { gameStateManager: GameStateManager }) {
    const x = this.game.canvas.width / 2
    const y = this.game.canvas.height / 2

    this.uiContainer = new UIContainer()
    this.uiContainer.classList.add('pointer-events-none')
    this.uiContainer.classList.add('z-index-10')

    this.uiContainerGameObject = this.add.dom(
      x,
      y,
      this.uiContainer,
      'display: flex; width: 100%; height: 100%; z-index: 10;'
    )

    const gameStateManager = config.gameStateManager
    console.log('state manager state', config.gameStateManager.state)
    this.uiContainer.gameData = gameStateManager.state?.gameData
    this.uiContainer.roomId = gameStateManager.state?.roomId

    gameStateManager.socket.on('update', state => {
      this.uiContainer.gameData = state.gameData
      this.uiContainer.roomId = state.roomId
    })

    this.uiContainer.addEventListener('solve', (ev) => {
      const event = ev as CustomEvent
      gameStateManager.socket.emit('solve', {
        culprit: event?.detail?.culprit ?? '',
        reason: event?.detail?.reason ?? ''
      })

      gameStateManager.socket.on('wrongSolution', () => {
        this.uiContainer.wrongSolution()
      })
    })

    gameStateManager.socket.on('murderSolved', message => {
      this.uiContainer.setMessage(message)
      this.uiContainer.setActiveState('finished')
    })

    this.uiContainer.addEventListener('switchState', ev => {
      const event = ev as CustomEvent
      if (event.detail) {
        this.scene.scene.events.emit('ui-opened')
        this.input.keyboard.enableGlobalCapture()
      } else {
        this.scene.scene.events.emit('ui-closed')
        this.input.keyboard.disableGlobalCapture()
      }
    })
  }
}
