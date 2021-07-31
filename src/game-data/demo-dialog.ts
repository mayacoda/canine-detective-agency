import { Dialog } from './dialog-interface'

export const demoDialog: Record<string, Dialog> = {
  charlie: {
    branches: [
      {
        id: 'first',
        dialog: [ 'hello there!', 'hi!', 'I am Charlie', 'a good boy' ],
        fork: [
          {
            to: 'second',
            text: 'a good boy you say?'
          },
          {
            to: 'third',
            text: 'did you hear about the murder?'
          }
        ]
      },
      {
        id: 'second',
        dialog: [ 'a good boy!', 'I\'m a good boy, I tell you!' ]
      },
      {
        id: 'third',
        dialog: [
          'no idea what you could possibly be talking about',
          'hehe...',
          'maybe a murder of crows!',
          '...'
        ]
      }
    ],
    start: 'first',
    speaker: 'Dr. Charlie'
  }
}
