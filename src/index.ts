import { Scene, Game } from 'phaser'
import GameConfig = Phaser.Types.Core.GameConfig
import { CdaButton } from './components/button'

export default class Demo extends Scene {
  constructor() {
    super('demo')
  }

  preload() {
    this.load.image('logo', 'images/phaser3-logo.png')
    this.load.image('libs', 'images/libs.png')
    this.load.glsl('bundle', 'shaders/plasma-bundle.glsl.js')
    this.load.glsl('stars', 'shaders/starfields.glsl.js')
  }

  create() {
    this.add.shader('RGB Shift Field', 0, 0, 800, 600).setOrigin(0)

    this.add.shader('Plasma', 0, 412, 800, 172).setOrigin(0)

    this.add.image(400, 300, 'libs')

    const logo = this.add.image(400, 70, 'logo')

    this.tweens.add({
      targets: logo,
      y: 350,
      duration: 1500,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1
    })

    const button = this.add.dom(400, 300, new CdaButton())
    button.addListener('click').on('click', () => {
      console.log('clicking a button')
    })
  }
}

const config:GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#125555',
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
  scene: Demo
}


function initGame() {
  new Game(config)
}

initGame()
