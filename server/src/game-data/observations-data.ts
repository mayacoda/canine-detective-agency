import { Observation } from '../../../interface/game-data-interface'

export const observationsData: Record<string, Observation> = {
  janeNote: {
    description: 'A note found on Jane\'s desk. Looks like she wanted to speak with her lawyer again',
    location: 'Jane\'s room',
    imageUrl: 'images/jane-note.png'
  },
  richardFlyer: {
    description: 'Flyer for the Pest Control Conference. Says it occurs every first Saturday of the month',
    location: 'Richard\'s office',
    imageUrl: 'images/richard-flyer.png'
  },
  manorPesticideBottle: {
    description: 'A bottle of boric acid pesticide',
    location: 'Raven Manor kitchen',
    imageUrl: 'images/manor-pesticide-bottle.png'
  },
  candiceJewelery: {
    description: 'An expensive neckless in Candice\'s room in Raven Manor',
    location: 'Candice\'s room',
    imageUrl: 'images/candice-jewelry.png'
  },
  rangerChemDegree: {
    description: 'Ranger\'s chemical engineering degree. But why is he hiding it in his office?',
    location: 'Ranger\'s office',
    imageUrl: 'images/ranger-chem-degree.png'
  },
  rangerAccounts: {
    description: 'Ranger\'s accounts from the last fiscal year. He appears to be deeply in debt',
    location: 'Ranger\'s office',
    imageUrl: 'images/ranger-accounts.png'
  },
  rangerPharmaDegree: {
    description: 'Ranger\'s pharmacology degree, hanging proud in the pharmacy',
    location: 'Pharmacy',
    imageUrl: 'images/ranger-pharma-degree.png'
  },
  shopPesticideBottle: {
    description: 'An entire rack of boric acid pesticide',
    location: 'Bits \'n\' Things',
    imageUrl: 'images/shop-pesticide-bottle.png'
  },
  shopClosedSigns: {
    description: 'Signs which depict shop closures. Dates are Feb 7-8, Feb 21-22, Mar 7-8, Mar 21-22, Apr 5-6',
    location: 'Bits \'n\' Things office',
    imageUrl: 'images/shop-closed-signs.png'
  },
  shopWorkHours: {
    description: 'Work hours of the Bits \'n\' Things convenience store, displayed by the front door',
    location: 'Bits \'n\' Things',
    imageUrl: 'images/shop-work-hours.png'
  },
  weddingInvite: {
    description: 'A beautiful wedding invitation for Candice and Ranger\'s upcoming wedding',
    location: 'Dr. Charlie\'s clinic',
    imageUrl: 'images/wedding-invite.png'
  },
  rangerThesis: {
    description: 'A complicated thesis about different natural of pesticides and their effects on the body',
    location: 'Ranger\'s office',
    imageUrl: 'images/ranger-thesis.png'
  }
}
