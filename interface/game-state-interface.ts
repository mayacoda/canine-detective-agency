import { GameData } from './game-data-interface'
import { Vec2 } from './geometry-interface'

export type Player = {
  pos: Vec2
  name: string
  id: string
}

export interface GameState {
  gameData: GameData,
  players: Player[]
  currentPlayer: string
}
