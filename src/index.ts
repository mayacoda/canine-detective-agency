import { Game } from 'phaser'
import { StartScene } from './scenes/StartScene'
import { SceneName } from './scenes/scene-name'
import { ShopScene } from './scenes/ShopScene'
import SimpleControlsPlugin from './plugins/SimpleControlsPlugin'
import GameConfig = Phaser.Types.Core.GameConfig

const config: GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaser-example',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600
  },
  parent: 'canine_detective_agency',
  dom: {
    createContainer: true
  },
  plugins: {
    scene: [
      { key: 'simple-controls', plugin: SimpleControlsPlugin, mapping: 'controls' }
    ]
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  },
  scene: StartScene
}


function initGame() {
  const game = new Game(config)
  game.scene.add(SceneName.Shop, ShopScene)
}

initGame()
