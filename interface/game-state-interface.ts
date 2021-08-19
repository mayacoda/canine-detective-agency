import { GameData, ResolvedGameData } from './game-data-interface'
import { Vec2 } from './geometry-interface'

export type Player = {
  pos: Vec2
  name: string
  id: string
}

export interface GameState {
  gameData: GameData
  players: Player[]
  currentPlayer: string // todo will probably not be part of the backend's game state, but will be filled in by socket
}

export interface ResolvedGameState {
  gameData: ResolvedGameData
  players: Player[]
  currentPlayer: string
}
