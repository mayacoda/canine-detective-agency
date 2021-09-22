import { Scene } from 'phaser'
import { GameStateManager } from '../game-state/game-state-manager'
import { StartContainer } from '../components/StartContainer'
import { SceneName } from './scene-name'

export class StartScene extends Scene {
  constructor() {
    super('Start')
  }

  create(config: { gameStateManager: GameStateManager, roomId: string }) {
    const x = this.game.canvas.width / 2
    const y = this.game.canvas.height / 2
    const gameStateManager = config.gameStateManager

    const startContainer = new StartContainer()
    this.add.dom(
      x,
      y,
      startContainer,
      'display: flex; width: 100%; height: 100%; z-index: 10;'
    )

    startContainer.addEventListener('start-game', (ev) => {
      let playerData = (ev as CustomEvent).detail
      gameStateManager.startGame(playerData)

      this.scene.start('UI', { gameStateManager })
      this.scene.start(SceneName.Town, { gameStateManager })
      // todo server should send a start location of the player. e.g. what map and their location
      // todo start scene should send to the initializing scene the player data
      // gameStateManager.addListener('update', (gameData) => {
      //   console.log('getting this new game data', gameData)
      // })
    })

    startContainer.roomId = config.roomId


  }
}
