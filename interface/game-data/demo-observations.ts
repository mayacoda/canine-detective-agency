import { Observation } from '../game-data-interface'

export const demoObservations: Record<string, Observation> = {
  example: {
    description: 'this is a mysterious ball in the middle of the square',
    location: 'middle of the square'
  },
  'will-update': {
    location: 'Raven Manor - Office',
    description: 'Jane\'s will has recently been updated',
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.standardlegal.com%2Fstore%2Fimages%2FSLN%2FLW-Doc-1.png&f=1&nofb=1'
  }
}
