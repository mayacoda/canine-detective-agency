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
      const roomId = (ev as CustomEvent).detail as string
      gameStateManager.joinRoom(roomId.trim())
      loginContainer.isLoading = true
    })

    loginContainer.addEventListener('create-room', () => {
      gameStateManager.createRoom()
      loginContainer.isLoading = true
    })

    const socket = gameStateManager.socket

    socket.on('roomId', roomId => {
      this.roomId = roomId
      console.log('got room ID from server', roomId)
      this.scene.start('Start', { gameStateManager, roomId })
      loginContainer.isLoading = false
    })

    socket.on('playerId', playerId => {
      console.log('got player ID from server', playerId)
      if (this.roomId) {
        this.scene.start('Start', { gameStateManager, roomId: this.roomId })
      }
      loginContainer.isLoading = false
    })

    socket.on('tooManyPlayers', () => {
      loginContainer.error = 'Room has too many players </3'
      loginContainer.isLoading = false
    })

    socket.on('unknownRoom', () => {
      loginContainer.error = 'Room does not exist :('
      loginContainer.isLoading = false
    })
  }
}
