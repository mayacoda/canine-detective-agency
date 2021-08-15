// this will be the evidence that the player has already uncovered

export type NPCName = string

type HTMLString = string

export type Interviews = Record<NPCName, InterviewRecord[]>

// fetched per game from server
export interface GameData {
  interviews: Interviews
  documents: Document[]
  photos: Photo[]
  observations: Observation[]
}

export interface InterviewRecord {
  dialog: Statement[], // todo introduce the same branchId system here for easier checking?
  location?: string, //todo do I really need this right now?
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
