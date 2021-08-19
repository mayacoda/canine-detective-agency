import { GameState } from '../../interface/game-state-interface'
import { Immutable } from '../../interface/types'

export class ServerStateManager {
  private state: GameState
  private readonly stateUpdateCallback: (state: GameState) => void

  constructor(state: GameState, stateUpdateCallback: (state: GameState) => void) {
    this.state = state
    this.stateUpdateCallback = stateUpdateCallback
    this.stateUpdateCallback(this.state)
  }

  updateState(newState: GameState) {
    this.state = newState
  }

  getState(): Immutable<GameState> {
    return this.state
  }

  updateInterviewRecord(dialogId: string,
                        updatedInterviewRecord: string[]) {
    this.state.gameData.interviews[dialogId] = updatedInterviewRecord
    this.stateUpdateCallback(this.state)
    console.log('updated new state', this.state)
  }
}
