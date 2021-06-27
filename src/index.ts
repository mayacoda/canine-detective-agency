import { Game } from 'phaser'
import { StartScene } from './scenes/StartScene'
import { SceneName } from './scenes/scene-name'
import { ShopScene } from './scenes/ShopScene'
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
  scene: StartScene
}


function initGame() {
  const game = new Game(config)
  game.scene.add(SceneName.Shop, ShopScene)
}

initGame()
