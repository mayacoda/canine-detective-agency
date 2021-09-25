import { PlayableScene } from '../scenes/PlayableScene'
import { Scene } from 'phaser'
import { DialogBox } from '../components/dialog/DialogBox'
import { getTextBlockPosition } from '../utils/geometry-utils'
import GameObject = Phaser.GameObjects.GameObject

export class NPC extends Phaser.Physics.Matter.Image {
  scene!: PlayableScene
  npcName: string
  dialogBoxGameObject?: GameObject

  constructor(scene: PlayableScene,
              name: string,
              posX: number,
              posY: number) {
    super(scene.matter.world, posX, posY, name)
    this.npcName = name
    this.setStatic(true)
    this.setDepth(posY)
    this.setInteractive()
    scene.add.existing(this)
    this.registerListeners()
  }

  update() {
    if (!this.isPlayerNear()) {
      this.removeDialogBoxGameObject()
    }
  }

  private registerListeners() {
    this.on('pointerup', () => {
      if (this.isPlayerNear() && !this.dialogBoxGameObject) {
        const dialogBox = new DialogBox()
        const { x, y } = getTextBlockPosition(this)
        this.dialogBoxGameObject = this.scene.add.dom(x, y, dialogBox)
        this.scene.gameStateManager.requestDialog(this.npcName).then(dialog => {
          if (dialog) {
            dialogBox.dialog = dialog
            this.scene.gameStateManager.updateDialog(this.npcName, dialog.start)
          }
        })

        dialogBox.addEventListener('close', () => {
          this.removeDialogBoxGameObject()
        })

        dialogBox.addEventListener('dialog-branch', (ev) => {
          let branchId = (ev as CustomEvent).detail
          this.scene.gameStateManager.updateDialog(this.npcName, branchId)
        })
      }
    })
  }

  private removeDialogBoxGameObject() {
    if (this.dialogBoxGameObject) {
      this.dialogBoxGameObject.destroy(true)
      this.dialogBoxGameObject = undefined
    }
  }

  private isPlayerNear() {
    const { x, y } = this.scene.player
    let minDistance = this.width * 2
    return Phaser.Math.Distance.Between(x, y, this.x, this.y) < minDistance
  }
}

export function loadNPCAssets(scene: Scene) {
  scene.load.image('charlie', 'images/charlie.png')
}
