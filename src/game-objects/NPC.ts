import { PlayableScene } from '../scenes/PlayableScene'
import { Scene } from 'phaser'
import { DialogBox } from '../components/dialog/DialogBox'
import { demoDialog } from '../game-data/demo-dialog'
import GameObject = Phaser.GameObjects.GameObject

export class NPC extends Phaser.Physics.Matter.Image {
  scene!: PlayableScene
  npcName!: string
  dialogBoxGameObject: GameObject | null = null

  constructor(scene: PlayableScene,
              name: string,
              posX: number,
              posY: number,
              dialogPosition: string) {
    super(scene.matter.world, posX, posY, name)
    this.npcName = name
    this.setStatic(true)
    this.setDepth(posY)
    this.setInteractive()
    scene.add.existing(this)
    this.registerListeners()
  }

  update() {
    if (!this.isPlayerNear() && this.dialogBoxGameObject !== null) {
      this.dialogBoxGameObject.destroy(true)
      this.dialogBoxGameObject = null
    }
  }

  private registerListeners() {
    this.on('pointerup', () => {
      if (this.isPlayerNear()) {
        let x = this.x - 250
        let y = this.y + (this.width / 2) + 24

        const dialogBox = new DialogBox()
        this.dialogBoxGameObject = this.scene.add.dom(x, y, dialogBox)
        dialogBox.dialog = demoDialog[this.npcName]
      }
    })
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
