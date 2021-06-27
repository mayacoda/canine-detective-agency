import { Scene } from 'phaser'
import Pointer = Phaser.Input.Pointer
import GameObject = Phaser.GameObjects.GameObject

export function createClickedListener(scene: Scene) {
  scene.input.on('gameobjectup', (pointer: Pointer, gameObject: GameObject) => {
    gameObject.emit('clicked', pointer, gameObject)
  }, scene)
}
