import { Vec2 } from '../../interface/geometry-interface'

function add(vectorA: Vec2, vectorB: Vec2, output?: Vec2) {
  if (!output) output = { x: 0, y: 0 }
  output.x = vectorA.x + vectorB.x
  output.y = vectorA.y + vectorB.y
  return output
}

export function multiply(vector: Vec2, scalar: number) {
  return { x: vector.x * scalar, y: vector.y * scalar }
}

function divide(vector: Vec2, scalar: number) {
  return { x: vector.x / scalar, y: vector.y / scalar }
}

function magnitude({ x, y }: Vec2) {
  return Math.sqrt((x * x) + (y * y))
}

export function normalize(vec: Vec2) {
  return divide(vec, magnitude(vec))
}

function calcArea(vertices: Vec2[], signed: boolean) {
  let area = 0
  let j = vertices.length - 1

  for (let i = 0; i < vertices.length; i++) {
    area += (vertices[j].x - vertices[i].x) * (vertices[j].y + vertices[i].y)
    j = i
  }

  if (signed)
    return area / 2

  return Math.abs(area) / 2
}

export function getPhaserCentroid(vertices: Vec2[]) {
  let area = calcArea(vertices, true)
  let centre = { x: 0, y: 0 }
  let cross
  let temp
  let j

  for (let i = 0; i < vertices.length; i++) {
    j = (i + 1) % vertices.length
    cross = (vertices[i].x * vertices[j].y) - (vertices[i].y * vertices[j].x)
    temp = multiply(add(vertices[i], vertices[j]), cross)
    centre = add(centre, temp)
  }

  return divide(centre, 6 * area)
}

export function getTextBlockPosition(obj: Phaser.GameObjects.Image, width?: number) {
  const x = obj.x - ((width ?? 500) / 2)
  const y = obj.y + (obj.width / 2) + 24
  return { x, y }
}
