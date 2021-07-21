export type Verts = { x: number, y: number }

export function getPolygonCentroid(verts: Verts[]) {
  const tmpVerts = [...verts]
  let first = tmpVerts[0]
  let last = tmpVerts[tmpVerts.length - 1]

  if (first.x != last.x || first.y != last.y) tmpVerts.push(first)

  let twiceArea = 0
  let x = 0
  let y = 0
  let nPts = tmpVerts.length
  let p1
  let p2
  let f

  for (let i = 0, j = nPts - 1; i < nPts; j = i++) {
    p1 = tmpVerts[i]
    p2 = tmpVerts[j]
    f = p1.x * p2.y - p2.x * p1.y
    twiceArea += f
    x += (p1.x + p2.x) * f
    y += (p1.y + p2.y) * f
  }

  f = twiceArea * 3
  return { x: x / f, y: y / f }
}

