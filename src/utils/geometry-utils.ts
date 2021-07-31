export type Verts = { x: number, y: number }

function add(vectorA: Verts, vectorB: Verts, output?: Verts) {
  if (!output) output = { x: 0, y: 0 }
  output.x = vectorA.x + vectorB.x
  output.y = vectorA.y + vectorB.y
  return output
}

function mult(vector: Verts, scalar: number) {
  return { x: vector.x * scalar, y: vector.y * scalar }
}

function div(vector: Verts, scalar: number) {
  return { x: vector.x / scalar, y: vector.y / scalar }
}

function calcArea(vertices: Verts[], signed: boolean) {
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

export function getPhaserCentroid(vertices: Verts[]) {
  let area = calcArea(vertices, true)
  let centre = { x: 0, y: 0 }
  let cross
  let temp
  let j

  for (let i = 0; i < vertices.length; i++) {
    j = (i + 1) % vertices.length
    cross = (vertices[i].x * vertices[j].y) - (vertices[i].y * vertices[j].x)
    temp = mult(add(vertices[i], vertices[j]), cross)
    centre = add(centre, temp)
  }

  return div(centre, 6 * area)
}

