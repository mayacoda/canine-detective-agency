import { getDialogById, getDialogByIdApplyingConditions } from './dialog-manager'
import { Dialog } from '../../../interface/dialog-interface'
import { Immutable } from '../../../interface/types'
import { ServerSideGameData } from '../../../interface/game-data-interface'

const mockDialogData: Record<string, Dialog> = {
  withoutConditions: {
    start: 'first',
    branches: [
      {
        id: 'first',
        dialog: [ 'say this first' ],
        fork: [
          { to: 'second', text: 'to second' }
        ]
      },
      {
        id: 'second',
        dialog: [ 'say second' ]
      }
    ],
    speaker: 'No conditions'
  },
  withConditions: {
    start: 'first',
    branches: [
      {
        id: 'first',
        dialog: [ 'say this first' ],
        fork: [
          { to: 'second', text: 'to second' },
          {
            to: 'third',
            text: 'to third with met condition',
            condition: (gameData) => gameData.documents.includes('will')
          },
          {
            to: 'fourth',
            text: 'to fourth with unmet condition',
            condition: gameData => gameData.documents.includes(
              'journal')
          }
        ]
      },
      {
        id: 'second',
        dialog: [ 'say second' ]
      },
      {
        id: 'third',
        dialog: [ 'say third' ]
      },
      {
        id: 'fourth',
        dialog: [ 'say fourth' ]
      }
    ],
    speaker: 'Conditions'
  }
}

const mockGameData: Immutable<ServerSideGameData> = {
  documents: [ 'will' ],
  interviews: {},
  observations: [],
  photos: []
}

describe('dialog-manager', () => {
  describe('getDialogById', () => {
    it('returns start branch at beginning of dialog', () => {
      expect(getDialogByIdApplyingConditions(
        'withoutConditions',
        mockGameData,
        mockDialogData
      )).toEqual(
        mockDialogData.withoutConditions)
    })

    it('returns undefined when the ID passed is not found in dialog data', () => {
      expect(getDialogByIdApplyingConditions('invalid', mockGameData, mockDialogData)).toEqual(
        undefined)
    })

    let dialog = getDialogByIdApplyingConditions(
      'withConditions',
      mockGameData,
      mockDialogData
    )
    it('returns all branches with met conditions', () => {
      let branches = dialog!.branches
      expect(branches).toHaveLength(3)
      expect(branches[0].id).toEqual('first')
      expect(branches[1].id).toEqual('second')
      expect(branches[2].id).toEqual('third')
    })

    it('returns all forks with met conditions', () => {
      let forks = dialog!.branches[0]!.fork!

      expect(forks).toHaveLength(2)
      expect(forks[0].to).toEqual('second')
      expect(forks[1].to).toEqual('third')
    })

    it('does not show branches with unmet conditions', () => {
      let branches = dialog!.branches

      expect(branches.find(branch => branch.id === 'fourth')).toBeUndefined()
    })

    it('does not show forks with unmet conditions', () => {
      let forks = dialog!.branches[0]!.fork!

      expect(forks.find(fork => fork.to === 'fourth')).toBeUndefined()
    })
  })

})
