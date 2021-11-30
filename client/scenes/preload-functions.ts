import { Scene } from 'phaser'
 
/* This file is autogenerated by scripts/load-images.js */ 
export const preloadFunctions: Record<string, (scene: Scene) => void> = {
  'manor-upstairs': function (scene: Scene) {
    scene.load.tilemapTiledJSON('manor-upstairs', 'tilemaps/manor-upstairs.json')
    scene.load.image('isometric-grid', 'tilemaps/isometric-grid.png')
    scene.load.image('house', 'images/house.png')
    scene.load.image('charlie', 'images/charlie.png')
    scene.load.image('player-temp', 'images/player-temp.png')
    scene.load.image('plant2', 'images/plant2.png')
    scene.load.image('plant1', 'images/plant1.png')
    scene.load.image('stairs', 'images/stairs.png')
    scene.load.image('desc-stairs', 'images/desc-stairs.png')
  },
  'manor': function (scene: Scene) {
    scene.load.tilemapTiledJSON('manor', 'tilemaps/manor.json')
    scene.load.image('isometric-grid', 'tilemaps/isometric-grid.png')
    scene.load.image('house', 'images/house.png')
    scene.load.image('charlie', 'images/charlie.png')
    scene.load.image('player-temp', 'images/player-temp.png')
    scene.load.image('plant2', 'images/plant2.png')
    scene.load.image('plant1', 'images/plant1.png')
    scene.load.image('stairs', 'images/stairs.png')
    scene.load.image('desc-stairs', 'images/desc-stairs.png')
  },
  'residence': function (scene: Scene) {
    scene.load.tilemapTiledJSON('residence', 'tilemaps/residence.json')
    scene.load.image('isometric-grid', 'tilemaps/isometric-grid.png')
  },
  'shop': function (scene: Scene) {
    scene.load.tilemapTiledJSON('shop', 'tilemaps/shop.json')
    scene.load.image('isometric-grid', 'tilemaps/isometric-grid.png')
  },
  'town': function (scene: Scene) {
    scene.load.tilemapTiledJSON('town', 'tilemaps/town.json')
    scene.load.image('isometric-grid', 'tilemaps/isometric-grid.png')
    scene.load.image('house', 'images/house.png')
    scene.load.image('charlie', 'images/charlie.png')
    scene.load.image('player-temp', 'images/player-temp.png')
    scene.load.image('plant2', 'images/plant2.png')
    scene.load.image('plant1', 'images/plant1.png')
    scene.load.image('stairs', 'images/stairs.png')
    scene.load.image('desc-stairs', 'images/desc-stairs.png')
  },
}