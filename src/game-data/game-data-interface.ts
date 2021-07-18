// this will be the evidence that the player has already uncovered

type NPCName = string

type HTMLString = string

// fetched per game from server
export interface GameData {
  interviews: Record<NPCName, InterviewRecord[]>
  documents: Document[]
  photos: Photo[]
  observations: Observation[]
}

export interface InterviewRecord {
  dialog: Statement[],
  location: string,
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
