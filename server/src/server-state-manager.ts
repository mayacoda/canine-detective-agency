import { GameState } from '../../interface/game-state-interface'
import { Immutable } from '../../interface/types'
import { PlayerData } from '../../interface/socket-interfaces'


export class ServerStateManager {
  private state: GameState
  private readonly stateUpdateCallback: (state: GameState) => void

  constructor(state: GameState, stateUpdateCallback: (state: GameState) => void) {
    this.state = state
    this.stateUpdateCallback = stateUpdateCallback
  }

  updateState(newState: GameState) {
    this.state = newState
  }

  getState(): Immutable<GameState> {
    return this.state
  }

  setPlayerData(playerId: string, playerData: PlayerData) {
    // default spawning point for the game right now, might reset to 0, 0
    this.state.players[playerId] = {
      ...playerData,
      id: playerId,
      pos: { x: 1208.24, y: 877.283 },
      map: 'town'
    }
  }

  setRoomId(roomId: string) {
    this.state.roomId = roomId
  }

  updateInterviewRecord(dialogId: string,
                        updatedInterviewRecord: string[]) {
    if (this.state.gameData.interviews[dialogId]?.length !== updatedInterviewRecord.length) {
      this.state.gameData.interviews[dialogId] = updatedInterviewRecord
      this.stateUpdateCallback(this.state)
    }
  }

  private updateEvidence(evidenceType: 'documents' | 'observations' | 'photos', id: string) {
    if (!this.state.gameData[evidenceType].includes(id)) {
      this.state.gameData[evidenceType].push(id)
      this.stateUpdateCallback(this.state)
    }
  }

  updateObservation(id: string) {
    this.updateEvidence('observations', id)
  }

  updatePhoto(id: string) {
    this.updateEvidence('photos', id)
  }

  updateDocument(id: string) {
    this.updateEvidence('documents', id)
  }
}
