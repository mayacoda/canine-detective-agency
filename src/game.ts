import { Game } from 'phaser'
import { SceneName } from './scenes/scene-name'
import { ShopScene } from './scenes/ShopScene'
import SimpleControlsPlugin from './plugins/SimpleControlsPlugin'
import { TownScene } from './scenes/TownScene'
import { ResidenceScene } from './scenes/ResidenceScene'
import { UIScene } from './scenes/UIScene'
import GameConfig = Phaser.Types.Core.GameConfig

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
      debug: true
    }
  },
  scene: []
}


function initGame() {
  const game = new Game(config)
  game.scene.add('UI', UIScene, true)

  // game scenes
  game.scene.add(SceneName.Town, TownScene, true)
  game.scene.add(SceneName.Shop, ShopScene)
  game.scene.add(SceneName.Residence, ResidenceScene)
}

initGame()
