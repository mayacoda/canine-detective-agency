import { Game } from 'phaser'
import SimpleControlsPlugin from './plugins/SimpleControlsPlugin'
import { GameStateManager } from './game-state/game-state-manager'
import dotenv from 'dotenv'
import { LoginScene } from './scenes/LoginScene'
import { StartScene } from './scenes/StartScene'
import { UIScene } from './scenes/UIScene'
import { TownScene } from './scenes/TownScene'
import { SceneName } from './scenes/scene-name'
import { ShopScene } from './scenes/ShopScene'
import { ResidenceScene } from './scenes/ResidenceScene'
import GameConfig = Phaser.Types.Core.GameConfig

dotenv.config()

const config: GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'canine_detective_agency',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 2048,
    height: 1152,
    autoRound: true
  },
  dom: {
    createContainer: true
  },
  plugins: {
    scene: [
      { key: 'simple-controls', plugin: SimpleControlsPlugin, mapping: 'controls' }
    ]
  },
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: []
}


function initGame() {
  const game = new Game(config)
  const gameStateManager = new GameStateManager()

  game.scene.add('Login', LoginScene, true, { gameStateManager })

  game.scene.add('Start', StartScene, false, { gameStateManager })
  game.scene.add('UI', UIScene, false, { gameStateManager })

  // game scenes
  game.scene.add(SceneName.Town, TownScene, false, { gameStateManager })
  game.scene.add(SceneName.Shop, ShopScene, false, { gameStateManager })
  game.scene.add(SceneName.Residence, ResidenceScene, false, { gameStateManager })

  gameStateManager.listen()
}

initGame()
