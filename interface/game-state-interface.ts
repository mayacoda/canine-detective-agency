import { ClientSideGameData, ServerSideGameData } from './game-data-interface'
import { Vec2 } from './geometry-interface'

export type Player = {
  pos: Vec2
  map: string
  name: string
  avatar: string
  id: string
}

export interface GameState {
  gameData: ServerSideGameData
  players: Record<string, Player>
  roomId: string
}

export interface ResolvedGameState {
  roomId: string
  gameData: ClientSideGameData
  players: Record<string, Player>
}
