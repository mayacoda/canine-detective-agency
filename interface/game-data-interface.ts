// this will be the evidence that the player has already uncovered

export type NPCName = string

type HTMLString = string

// resolved when sending to the frontend
export interface ClientSideGameData {
  interviews: Interview[]
  documents: Document[]
  photos: Photo[]
  observations: Observation[]
}

// stored in database and fetched per game from server
export interface ServerSideGameData {
  interviews: Record<NPCName, string[]>
  documents: string[]
  photos: string[]
  observations: string[]
}

export interface Interview {
  speaker: string
  statements: Statement[]
  imageUrl: string
}

export interface Statement {
  speaker: string
  text: HTMLString
}

export interface Document {
  name: string
  description?: string
  content: HTMLString
}

export interface Photo {
  imageUrl: string
  description?: string
}

export interface Observation {
  location: string,
  imageUrl?: string,
  description: string
}
