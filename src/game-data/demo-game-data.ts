import { GameData } from './game-data-interface'

export const demoGameData: GameData = {
  interviews: {
    maria: [
      {
        dialog: [
          {
            speaker: 'Maria',
            text: 'oh it was so horrible! I can\'t unsee what I saw, her sprawled on the floor like that. It was heartbreaking...'
          },
          {
            speaker: 'Max',
            text: 'Do you remember when you found the body?'
          },
          {
            speaker: 'Maria',
            text: 'Sometime after dinner, it can\'t have been too long because I had just finished doing the dishes...'
          }
        ],
        location: 'Raven Manor - Kitchen'
      }
    ]
  },
  observations: [
    {
      location: 'Raven Manor - Office',
      description: 'Jane\'s will has recently been updated',
      imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.standardlegal.com%2Fstore%2Fimages%2FSLN%2FLW-Doc-1.png&f=1&nofb=1'
    }
  ],
  photos: [
    {
      description: 'Jane in her youth',
      imageUrl: 'https://www.allaboutbirds.org/guide/assets/photo/59858041-480px.jpg'
    }
  ],
  documents: [
    { content: 'good-bye <em>cruel</em> world', name: 'Jane\'s will' }
  ]
}
