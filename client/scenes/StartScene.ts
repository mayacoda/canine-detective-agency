import { Scene } from 'phaser'
import { GameStateManager } from '../game-state/game-state-manager'
import { StartContainer } from '../components/StartContainer'
import { SceneName } from './scene-name'
import { assert } from '../utils/assert'

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

      // wait for the first update event so the client always has correct starting state
      gameStateManager.socket.on('update', () => {
        // todo does this socket.on depend on call order? Is it certain that gameStateManager is already initialized at this point?
        this.scene.start('UI', { gameStateManager })
        const map = gameStateManager.getPlayer().map
        assert(
          Object.values(SceneName).includes(map as SceneName),
          `Player map ${ map } does not exist in the game`
        )
        this.scene.start(map, { gameStateManager })
      })
    })

    startContainer.roomId = config.roomId


  }
}
