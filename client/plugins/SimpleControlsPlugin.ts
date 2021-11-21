import { Scene } from 'phaser'
import PluginManager = Phaser.Plugins.PluginManager

class SimpleControlsPlugin extends Phaser.Plugins.ScenePlugin {
  up: boolean = false
  right: boolean = false
  down: boolean = false
  left: boolean = false
  hasInput: boolean = false
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys

  constructor(scene: Scene, pluginManager: PluginManager) {
    super(scene, pluginManager, 'simple-controls')
  }

  start() {
    this.setUpCursors()

    this.scene.events.on('preupdate', this.preUpdate, this)
    this.scene.events.on('shutdown', this.shutdown, this)

    this.scene.scene.get('UI').events.on('ui-closed', this.uiClosed, this)
    this.scene.scene.get('UI').events.on('ui-opened', this.uiOpened, this)
  }

  uiClosed() {
    this.setUpCursors()
  }

  uiOpened() {
    this.tearDownCursors()
  }

  private setUpCursors() {
    this.scene.input.keyboard.addCapture([ 'W', 'S', 'A', 'D' ])

    this.cursors = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    }) as Phaser.Types.Input.Keyboard.CursorKeys

    this.cursors.up.isDown = false
    this.cursors.right.isDown = false
    this.cursors.down.isDown = false
    this.cursors.left.isDown = false
  }

  tearDownCursors() {
    this.scene.input.keyboard.removeAllKeys()
    this.scene.input.keyboard.clearCaptures()
    this.cursors = undefined
  }

  preUpdate() {
    const input = this.scene.input
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
    this.scene.scene.get('UI').events.off('ui-closed', this.uiClosed)
    this.scene.scene.get('UI').events.off('ui-opened', this.uiOpened)
  }
}

export default SimpleControlsPlugin
