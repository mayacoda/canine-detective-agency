import { Dialog } from '../../../interface/dialog-interface'

export const dialogData: Record<string, Dialog> = {
  charlie: {
    branches: [
      {
        id: 'first',
        dialog: [
          'Oh hello detective! It\'s good to see someone seriously taking on this case, for once.',
          'It\'s such a tragedy what happened to poor Jane. She was my patient, you know. A real gem of a person.',
          'Having to examine her body was not easy, let me tell you. Especially since I had gotten to know her so well recently. A real tragedy!',
          'Anyway, enough yappin\', I guess you want to question me?'
        ],
        afterLast: 'questions',
      },
      {
        id: 'questions',
        dialog: [ 'Well, what can I help you with?' ],
        fork: [
          {
            text: 'What can you tell me about Jane\'s health?',
            to: 'health'
          },
          {
            text: 'Did Jane come in often?',
            to: 'checkups'
          },
          {
            text: 'You were first on the scene, what did you find?',
            to: 'body'
          },
          {
            text: 'What can you tell me about pesticides and their effects on the body?',
            to: 'pesticides',
            condition: gameData => gameData.observations.includes('manor-pesticide-bottle') || gameData.observations.includes(
              'shop-pesticide-bottle')
          }
        ]
      },
      {
        id: 'health',
        dialog: [
          'She was a vital old bird, let me tell you that! I\'m quite shocked she met her end so swiftly.',
          'There were some complaints every once in a while, but her hollow bones were fit as a whistle, let me tell you.',
          'Is there anything else?'
        ],
        afterLast: 'questions'
      },
      {
        id: 'checkups',
        dialog: [
          'Yes, she did have bouts of nausea she would complain about. But what do I know about that, I eat things and throw them up and eat them again all the time!',
          'She also complained of lightheadedness and ... "tremors", she called them.',
          'I thought it was maybe nerves, talk of the town is that she and the Mister are on thin ice.',
          'Anyway, I prescribed her some nausea meds, hoping that would do the trick.'
        ],
        afterLast: 'questions'
      },
      {
        id: 'body',
        dialog: [
          'I was the first to examine the body, yes. It was clear even to me that she had been poisoned. With what? I\'m not sure.',
          'I took some samples and sent them off, you should have already gotten a toxicology report.',
          'Don\'t ask me what it all means, I\'m no good with that stuff.'
        ],
        afterLast: 'questions'
      },
      {
        id: 'pesticides',
        dialog: [
          'Depends on the type, really.',
          'Boric acid based pesticides cause skin irritation and lots of digestive problems. Sometimes they end up being fatal, especially if not treated.',
          'Neonicotinoid based pesticides usually go more for the central nervous system, and cause symptoms like dizziness, nausea, vomiting and a quickened heartbeat.'
        ],
        afterLast: 'questions'
      }
    ],
    start: 'first',
    speaker: 'Dr. Charlie, the doctor'
  },
  maria: {
    branches: [],
    start: 'first',
    speaker: 'Maria, the housemouse'
  },
  larry: {
    start: 'first',
    branches: [],
    speaker: 'Lawrence "Larry" Judge, the lawyer'
  },
  richard: {
    start: 'first',
    branches: [],
    speaker: 'Richard Robinson, the husband'
  },
  candice: {
    start: 'first',
    branches: [],
    speaker: 'Candice Raven, the niece'
  },
  ginger: {
    start: 'first',
    branches: [],
    speaker: 'Ginger, the shopkeep'
  },
  ranger: {
    start: 'first',
    branches: [],
    speaker: 'Ranger Caw, the pharmacist'
  }
}
