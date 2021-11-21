import { Scene } from 'phaser'
import PluginManager = Phaser.Plugins.PluginManager

class SimpleControlsPlugin extends Phaser.Plugins.ScenePlugin {
  up: boolean
  right: boolean
  down: boolean
  left: boolean
  hasInput: boolean
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
  // private cursors?: object
  private events: Phaser.Events.EventEmitter
  private input?: Phaser.Input.InputPlugin

  constructor(scene: Scene, pluginManager: PluginManager) {
    super(scene, pluginManager, 'simple-controls')
    this.up = false
    this.right = false
    this.down = false
    this.left = false
    this.hasInput = false
    this.events = new Phaser.Events.EventEmitter()
  }

  start() {

    if (!this.input) {
      this.input = this.scene.input
    }

    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    }) as Phaser.Types.Input.Keyboard.CursorKeys
    
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

    this.hasInput = this.up || this.right || this.down || this.left
  }

  shutdown() {
    this.scene.events.off('preupdate', this.preUpdate)
    this.scene.events.off('shutdown', this.shutdown)
  }
}

export default SimpleControlsPlugin
