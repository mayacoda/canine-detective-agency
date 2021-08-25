import * as path from 'path'
import { readdir, readFile } from 'fs/promises'
import { Dirent } from 'fs'

export type TiledTileLayer = { name: string, type: 'tilelayer', visible: boolean }
export type TiledObjectLayer = {
  name: string, type: 'objectgroup', visible: boolean, objects: Array<TiledObject>
}

type TiledObject = {
  name: string
  properties?: Array<{
    name: string
    type: string
    value: any
  }>,
  type: string
  visible: boolean
}

export type TiledTileMap = {
  layers: Array<TiledTileLayer | TiledObjectLayer>
  tilesets: Array<{ image?: string, tiles?: { image: string } }>
} & {
  tileMapName: string
}

export function getTiledPropertyValue(object: TiledObject, propName: string): any {
  return object.properties?.find(prop => prop.name === propName)?.value
}

export async function getTileMaps(): Promise<TiledTileMap[]> {
  const dirPath = path.resolve(process.cwd(), 'client/assets/tilemaps')
  const tileMaps: TiledTileMap[] = []
  const possibleTileMaps = await readdir(dirPath, {
    encoding: 'utf-8',
    withFileTypes: true
  })

  for (const tileMap of possibleTileMaps) {
    if (tileMap.isFile() && path.extname(tileMap.name) === '.json') {
      let fileContent = await readFile(path.resolve(dirPath, tileMap.name), { encoding: 'utf-8' })
      const tileMapContent = JSON.parse(fileContent)
      tileMaps.push({ ...tileMapContent, tileMapName: tileMap.name })
    }
  }

  return tileMaps
}

export async function getExistingImagesAsPathsFromTilemapsDir(): Promise<string[]> {
  const imagesPath = path.resolve(process.cwd(), 'client/assets/images')
  const tilemapsPath = path.resolve(process.cwd(), 'client/assets/tilemaps')
  const images = []

  let isImageFile = (file: Dirent) => file.isFile() && [
    '.png',
    '.jpg',
    '.jpeg',
    '.gif'
  ].includes(path.extname(file.name))

  let tileMapImages = (await readdir(tilemapsPath, {
    encoding: 'utf-8',
    withFileTypes: true
  })).filter(isImageFile).map(file => file.name)

  let imageImages = (await readdir(imagesPath, {
    encoding: 'utf-8',
    withFileTypes: true
  })).filter(isImageFile).map(file => path.relative(
    tilemapsPath,
    path.resolve(imagesPath, file.name)
  ))

  images.push(...tileMapImages, ...imageImages)

  return images
}


export function getImagesUsedByTileMap(tileMap: TiledTileMap): string[] {
  const images: string[] = []
  for (const tileSet of tileMap.tilesets) {
    let image = tileSet.image
    let tiles = tileSet.tiles
    if (typeof image === 'string') {
      images.push(image)
    } else if (Array.isArray(tiles)) {
      for (const tile of tiles) {
        images.push(tile.image)
      }
    }
  }

  return images
}
