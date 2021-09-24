import { GameState, Player } from '../../interface/game-state-interface'
import { Immutable } from '../../interface/types'
import { PlayerData } from '../../interface/socket-interfaces'
import { Vec2 } from '../../interface/geometry-interface'

import { firestore } from 'firebase-admin'
import DocumentReference = firestore.DocumentReference
import Firestore = firestore.Firestore


export class ServerStateManager {
  private state: GameState
  private readonly stateUpdateCallback: (state: GameState) => void
  private readonly playerUpdateCallback: (players: Record<string, Player>) => void
  private readonly docRef: DocumentReference

  constructor(state: GameState,
              db: Firestore,
              stateUpdateCallback: (state: GameState) => void,
              playerUpdateCallback: (players: Record<string, Player>) => void) {
    this.state = state
    this.stateUpdateCallback = (state) => {
      this.docRef.set(state).then(() => {
          stateUpdateCallback(state)
        }, (err) => {
          // todo throw error to frontend about state not syncing
          console.error('could not update game state in database', err)
        }
      )
    }
    this.playerUpdateCallback = (players) => {
      // set this up so that it doesn't send the entire game state to the DB each time a player moves
      this.docRef.set(this.state).then(() => {
          playerUpdateCallback(players)
        }, (err) => {
          // todo throw error to frontend about state not syncing
          console.error('could not update game state in database', err)
        }
      )
    }

    this.docRef = db.collection('rooms').doc(this.state.roomId)
    //todo figure out how to handle the return of this promise
    this.docRef.set(this.state).then(console.log)
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

    this.playerUpdateCallback(this.state.players)
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

  updatePosition(playerId: string, pos: Vec2) {
    this.state.players[playerId].pos = pos
    this.playerUpdateCallback(this.state.players)
  }

  updateMap(playerId: string, map: string) {
    this.state.players[playerId].map = map
    this.playerUpdateCallback(this.state.players)
  }

  removePlayer(playerId: string) {
    delete this.state.players[playerId]
    this.playerUpdateCallback(this.state.players)
  }
}
