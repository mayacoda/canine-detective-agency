import { Scene } from 'phaser'
import { GameStateManager } from '../game-state/game-state-manager'
import { LoginContainer } from '../components/LoginContainer'

export class LoginScene extends Scene {
  roomId?: string

  constructor() {
    super('Login')
  }

  create(config: { gameStateManager: GameStateManager }) {
    const x = this.game.canvas.width / 2
    const y = this.game.canvas.height / 2
    const gameStateManager = config.gameStateManager

    const loginContainer = new LoginContainer()
    this.add.dom(
      x,
      y,
      loginContainer,
      'display: flex; width: 100%; height: 100%; z-index: 10;'
    )

    loginContainer.addEventListener('join-room', (ev) => {
      this.roomId = (ev as CustomEvent).detail as string
      gameStateManager.joinRoom(this.roomId)
    })

    loginContainer.addEventListener('create-room', () => {
      gameStateManager.createRoom()
    })

    // todo scene should be able to directly communicate with the socket through a wrapper
    gameStateManager.addListener('roomId', (roomId) => {
      console.log('got room ID from server', roomId)
      this.scene.start('Start', { gameStateManager, roomId })
    })

    gameStateManager.addListener('playerId', (playerId) => {
      console.log('got player ID from server', playerId)
      if (this.roomId) {
        this.scene.start('Start', { gameStateManager, roomId: this.roomId })
      }
    })

    gameStateManager.addListener('tooManyPlayers', () => {
      console.log('too many players')
    })

    gameStateManager.addListener('unknownRoom', () => {
      console.log('unknown room')
    })
  }
}
