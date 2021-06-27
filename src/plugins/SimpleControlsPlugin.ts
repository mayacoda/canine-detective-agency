import { Scene } from 'phaser'
import PluginManager = Phaser.Plugins.PluginManager

class SimpleControlsPlugin extends Phaser.Plugins.ScenePlugin {
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
  up: boolean
  right: boolean
  down: boolean
  left: boolean
  private events: Phaser.Events.EventEmitter
  private input?: Phaser.Input.InputPlugin

  constructor(scene: Scene, pluginManager: PluginManager) {
    super(scene, pluginManager, 'simple-controls')
    this.up = false
    this.right = false
    this.down = false
    this.left = false
    this.events = new Phaser.Events.EventEmitter()
  }

  start() {

    if (!this.input) {
      this.input = this.scene.input
    }


    this.cursors = this.input.keyboard.createCursorKeys()

    // reset!
    this.up = false
    this.right = false
    this.down = false
    this.left = false
    this.cursors.up.isDown = false
    this.cursors.right.isDown = false
    this.cursors.down.isDown = false
    this.cursors.left.isDown = false

    this.scene.events.on('preupdate', this.preUpdate, this)
    this.scene.events.on('shutdown', this.shutdown, this)
  }

  preUpdate() {
    const input = this.input
    const cursors = this.cursors
    if (!input || !cursors) return

    this.up = cursors.up.isDown
    this.right = cursors.right.isDown
    this.down = cursors.down.isDown
    this.left = cursors.left.isDown
  }

  shutdown() {
    this.scene.events.off('preupdate', this.preUpdate)
    this.scene.events.off('shutdown', this.shutdown)
  }
}

export default SimpleControlsPlugin
