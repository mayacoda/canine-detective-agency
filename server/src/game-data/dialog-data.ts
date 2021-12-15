import { Dialog } from '../../../interface/dialog-interface'

export const dialogData: Record<string, Dialog> = {
  charlie: {
    imageUrl: 'images/charlie.png',
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
            text: 'Where were you on Sunday at noon?',
            to: 'alibi'
          },
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
            condition: gameData => gameData.observations.includes('manorPesticideBottle')
              || gameData.observations.includes('shopPesticideBottle')
          }
        ]
      },
      {
        id: 'alibi',
        dialog: [ 'Sunday at noon? I\'m pretty sure I was napping. That\'s my favorite activity outside of work.' ],
        afterLast: 'questions'
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
    imageUrl: 'images/maria.png',
    branches: [
      {
        id: 'first',
        dialog: [
          'It\'s so dreadful, I just can\'t believe it!',
          '<she dabs her eyes with a tissue>'
        ],
        fork: [
          {
            text: 'When did you find Jane\'s body?',
            to: 'body'
          },
          {
            text: 'Where were you on Sunday at noon?',
            to: 'alibi'
          },
          {
            text: 'Can you describe the scene?',
            to: 'scene'
          },
          {
            text: 'How was working for the Robinsons? How long have you worked here?',
            to: 'work'
          },
          {
            text: 'You seem to know a lot of people, is there anything you can tell us about...',
            to: 'people'
          },
        ]
      },
      {
        id: 'people',
        dialog: [ 'Yes...?' ],
        fork: [
          {
            text: 'Jane Robinson',
            to: 'jane'
          },
          {
            text: 'Richard Robinson',
            to: 'richard'
          },
          {
            text: 'Ranger Caw',
            to: 'ranger',
            condition: gameData => !!gameData.interviews.ranger
          },
          {
            text: 'Candice Raven',
            to: 'candice',
            condition: gameData => !!gameData.interviews.candice
          },
          {
            text: 'Ginger, the shopkeeper',
            to: 'ginger',
            condition: gameData => gameData.observations.includes('shopClosedSigns') && gameData.observations.includes(
              'richardCalendar')
          }
        ]
      },
      {
        id: 'alibi',
        afterLast: 'first',
        dialog: [ 'Here, at the manor, of course. I was serving Mr. Richard and Candice biscuits and tea after lunch.' ],
      },
      {
        id: 'body',
        afterLast: 'first',
        dialog: [
          'It was sometime after lunch, I think. Probably around 2pm?',
          'I had just finished cleaning the kitchen, and was about to leave. I have Sunday afternoons off.',
          'She was right there in the foyer! <the mousemaid starts crying again>'
        ],
      },
      {
        id: 'scene',
        afterLast: 'first',
        dialog: [
          'Jane, rest her soul, was on the floor in the foyer.',
          'There was nothing broken or anything like that, just her poor self laying there by the front door.'
        ],
      },
      {
        id: 'work',
        afterLast: 'first',
        dialog: [
          'They\'re great, really. Both Jane and Mr. Richard are very reasonable people. I mean--were. <she lets out another solemn tear>',
          'Lately they hadn\'t been getting along all that well, maybe it was just old age.',
          'I\'ve been with them for six years now, seen them through thick and thin.'
        ],
        fork: [
          {
            text: 'They weren\'t getting along? How?',
            to: 'getting-along'
          },
          {
            text: 'Did you notice anything suspicious recently?',
            to: 'special-rapport'
          },
        ]
      },
      {
        id: 'getting-along',
        afterLast: 'first',
        dialog: [
          'Oh just the occasional fight here and there, though they were becoming more frequent.',
          'They were also spending less time together, more time by themselves and other people. <she emphasizes the last two words>'
        ],
      },
      {
        id: 'special-rapport',
        afterLast: 'first',
        dialog: [
          'Well... it\'s not quite my place to say... but...',
          'I have been noticing Mr. Ranger, the pharmacist, Candice\'s man, hanging around here a bit more than usual.',
          'It was like he and Mrs. Jane had a "special rapport".',
          'But I wouldn\'t make too much of it, I\'m sure it was nothing!'
        ],
      },
      {
        id: 'jane',
        afterLast: 'first',
        dialog: [
          'Mrs. Jane was always the life of the party. A true it-girl, back in the day. I\'ve seen pictures!',
          'Her family always had lots of money. This entire manor is her property, inherited it from her grandfather when she was young.',
          'But Jane isn\'t the beautiful, young socialite she once was. I think that fact was taking quite a toll on her.'
        ],
      },
      {
        id: 'richard',
        afterLast: 'first',
        dialog: [
          'Mr. Richard is a steady family man, just without the family. He has his own business and everything.',
          'He owns a pest control company, spends a lot of time in the field taking care of problems for people.',
          'The town loves him, even if he is a bit of a grump sometimes.'
        ],
      },
      {
        id: 'ranger',
        afterLast: 'first',
        dialog: [
          'What\'s there to say? Ranger is a dreamboat.',
          'He came to town many years ago and started working in the pharmacy. Even took over when the old owner passed away.',
          'He\'s a real go-getter, a charmer. He swept our dear Candice right off her feet. She didn\'t stand a chance!',
          'Between us, he\'s even proposed and they\'re planning a small wedding. How exciting!',
          '<she grins enthusiastically before remembering the situation and promptly returns to mourning>'
        ],
      },
      {
        id: 'candice',
        afterLast: 'first',
        dialog: [
          'Candice is Mrs. Jane\'s niece, but she was basically more of a daughter.',
          'She\'s quite a lot like her aunt, you know. Expensive jewelry, fancy parties, loves living the good life.',
          'The two had a big fight almost two weeks ago. A really nasty one.',
          'I don\'t know what it was about. I try not to eavesdrop, you see.',
          'Something about Jane stealing Ranger. I think it was because of their "special rapport."',
          'Candice was pretty upset about it. She hasn\'t come around since.'
        ],
      },
      {
        id: 'ginger',
        afterLast: 'first',
        dialog: [
          'The shopkeeper? Oh I don\'t know her that well...',
          'Except--she\'s been awfully nice to me whenever I do the shopping for Richard, buying his tools and whatnot.',
          'She\'s always asking how he\'s doing and sending her regards. It\'s very suspicious.',
          'You know, to be quite frank, I think something is going on between those two. Sometimes Richard goes away on business trips and comes back with squirrel fur all over his shirts!',
          'It\'s quite a pain to clean.'
        ],
      },
    ],
    start: 'first',
    speaker: 'Maria, the mousemaid'
  },
  larry: {
    imageUrl: 'images/larry.png',
    start: 'first',
    branches: [
      {
        id: 'first',
        dialog: [ 'Good day, detective! What can I do for you today? Need any legal advice?' ],
        fork: [
          {
            text: 'Where were you on Sunday at noon?',
            to: 'alibi'
          },
          {
            text: 'What was your relationship with Jane Robinson?',
            to: 'relationship'
          },
          {
            text: 'Did Jane change her will recently?',
            to: 'will',
            condition: gameData => gameData.documents.includes('janeJournal')
          },
          {
            text: 'Had Jane scheduled an appointment with you?',
            to: 'appointment',
            condition: gameData => gameData.observations.includes('janeNote')
          }
        ]
      },
      {
        id: 'relationship',
        afterLast: 'first',
        dialog: [
          'She was my client, simple as that. Since she inherited that estate, I\'ve taken care of all her legal problems.',
          'Since she\'s stopped with her wild days, it\'s quieted down quite a bit.',
          'I\'m very saddened by what happened to her. This town has lost a true guiding light'
        ],
      },
      {
        id: 'will',
        afterLast: 'first',
        dialog: [
          'I don\'t make it a habit to discuss my clients, but... If it\'ll help you figure out what happened to her...',
          'Yes, she did change her will recently to exclude Richard. I thought it strange at the time, but she seemed sound of mind and I didn\'t want to meddle.',
          'Something about doing her in, her words, not mine.'
        ],
      },
      {
        id: 'appointment',
        afterLast: 'first',
        dialog: [
          'I guess scheduling isn\'t that confidential, especially if you already know.',
          'Yes, she called me on April 2nd to schedule another appointment, presumably to change her will again.',
          'She seemed very upset, something about Candice. I didn\'t get into it, especially not over the phone.',
          'Unfortunately, I was fly fishing--well, fishing flies--all last week and had to schedule her for April 15th, the day after she died.'
        ],
      },
      {
        id: 'alibi',
        afterLast: 'first',
        dialog: [ 'Out of town, on my fishing trip. Ask my assistant, if you can find her.' ],
      },
    ],
    speaker: 'Lawrence "Larry" Judge, the lawyer'
  },
  richard: {
    imageUrl: 'images/richard.png',
    start: 'first',
    branches: [
      {
        id: 'first',
        dialog: [
          'Good detective, how fortunate that you have arrived! Please, help us get to the bottom of this, help find who took my beautiful wife away from me.'
        ],
        afterLast: 'questions'
      },
      {
        id: 'questions',
        dialog: [
          'I\'m an open book, ask whatever you need to know!'
        ],
        fork: [
          {
            text: 'Where were you on Sunday at noon?',
            to: 'alibi'
          },
          {
            text: 'What was your relationship like with Jane?',
            to: 'relationship'
          },
          {
            text: 'Tell me about those pesticides in the kitchen.',
            to: 'pesticides',
            condition: gameData => gameData.observations.includes('manorPesticideBottle')
          },
          {
            text: 'Why did your Candice and Jane have a fight?',
            to: 'fight',
            condition: gameData => gameData.interviews.maria && gameData.interviews.maria.includes(
              'candice')
          },
          {
            text: 'Were you having an affair with Ginger, the shopkeeper?',
            to: 'affair',
            condition: gameData => gameData.interviews.maria && gameData.interviews.maria.includes(
              'ginger')
          },
        ]
      },
      {
        id: 'alibi',
        afterLast: 'questions',
        dialog: [
          'I was here, in the living room with Candice, having tea. Maria stopped by a few times to bring us biscuits.',
          'Jane wasn\'t with us, I\'m not sure where she\'d gone.'
        ]
      },
      {
        id: 'relationship',
        afterLast: 'questions',
        dialog: [
          'She was my wife, of course!',
          'I\'m sorry for shouting, I just can\'t believe this is all happening. She was my world. I loved her so deeply.',
          'Sure, we had our ups and downs, what married couple doesn\'t?',
          'But I still loved her, more than words can describe. There\'s a gaping hole in my heart now that she\'s gone.'
        ],
      },
      {
        id: 'pesticides',
        afterLast: 'questions',
        dialog: [
          'I\'m a pest control man, what do you expect to find in my house?'
        ],
      },
      {
        id: 'fight',
        afterLast: 'questions',
        dialog: [
          'So you\'ve heard about the fight. Well, no way around it, it definitely happened.',
          'I\'m not sure what it was about, but both Candice and Jane were very upset afterward, even refused to speak to each other.',
          'That\'s what I was talking to Candice about on Sunday, she wanted to reconcile with her aunt.'
        ],
      },
      {
        id: 'affair',
        afterLast: 'questions',
        dialog: [
          'How did you...? ',
          'No, no, no... this doesn\'t look good for me, does it?',
          'Look, yes I will admit it, I was having an affair with Ginger. It hasn\'t been going on for long.',
          'Things were bad at home, I needed more bug killer in a pinch and Ginger helped me out. She was kind and caring, paid more attention to me than Jane had in years.',
          'I was weak, I faltered. It was a lapse in judgment that got out of hand. That\'s all, I swear!'
        ],
      },
    ],
    speaker: 'Richard Robinson, the husband'
  },
  candice: {
    imageUrl: 'images/candice.png',
    start: 'first',
    branches: [
      {
        id: 'first',
        afterLast: 'questions',
        dialog: [
          'I can\'t believe she\'s gone... Oh, hello there. You\'re the detective, right? I just can\'t believe my aunt is gone.',
          'She basically raised me all by herself, since I was a wee chick. She was more like a mother than my actual mother was!',
          'I\'m sorry, I\'m rambling. I guess you want me to answer some questions...'
        ],
      },
      {
        id: 'questions',
        dialog: [
          '...yes?'
        ],
        fork: [
          {
            text: 'Where were you on Sunday at noon?',
            to: 'alibi'
          },
          {
            text: 'I heard you and your aunt had a big fight, what was that about?',
            to: 'fight',
            condition: gameData => gameData.interviews.maria && gameData.interviews.maria.includes(
              'candice')
          },
          {
            text: 'Did you invite your aunt and uncle to your wedding? We found an invitation at Dr. Charlie\'s clinic.',
            to: 'wedding',
            condition: gameData => gameData.observations.includes('weddingInvite')
          },
          {
            text: 'Did you know about Ranger\'s financial problems?',
            to: 'finance',
            condition: gameData => gameData.observations.includes('rangerAccounts')
          },
        ]
      },
      {
        id: 'alibi',
        afterLast: 'questions',
        dialog: [
          'You couldn\'t possibly think that I...? Well, you\'re being thorough, I guess I should be glad.',
          'I was in the manor with uncle Richard. We were in the living room having tea.'
        ]
      },
      {
        id: 'fight',
        afterLast: 'questions',
        dialog: [
          'If you must know, though I don\'t know what this has to do with my aunt\'s untimely death, it was about Ranger.',
          'I had been noticing the two of them spending time together, without any proper reason. Lingering glances at family dinners, rendez-vous in the garden, things like that.',
          'So I confronted Aunt Jane about it.',
          'She denied it, of course, but not before calling me a "jealous little tart" and vowing to never speak to me again.',
          'That was the Monday before last, April 1st I think. We hadn\'t spoken since. I quite regret bringing it up, now...'
        ],
      },
      {
        id: 'wedding',
        afterLast: 'questions',
        dialog: [
          'I wanted to elope with Ranger, but he felt I should get a proper wedding. He\'s always thinking of what\'s best for me.',
          'We still wanted to be small, just our closest family and friends.',
          'You\'d think that would include aunt and uncle, but we weren\'t on the best of terms. At least not Aunt Jane and me. I was hoping to reconcile and hand her the invitation then.'
        ],
      },
      {
        id: 'finance',
        afterLast: 'questions',
        dialog: [
          'What? No...?',
          'He was always buying me flowers and jewelry, taking me to dinner. If he had any financial problems, I\'m sure he would have told me.',
          'You\'ve probably got something messed up.'
        ],
      },
    ],
    speaker: 'Candice Raven, the niece'
  },
  ginger: {
    imageUrl: 'images/ginger.png',
    start: 'first',
    branches: [
      {
        id: 'first',
        dialog: [
          'Hello detective, doing some shopping?'
        ],
        fork: [
          {
            text: 'Where were you on Sunday at noon?',
            to: 'alibi'
          },
          {
            text: 'What was your relationship with Jane Robinson?',
            to: 'relationship'
          },
          {
            text: 'I\'ve heard Jane was very close to Ranger, do you know anything about that?',
            to: 'jane-affair',
            condition: gameData => gameData.interviews.maria && gameData.interviews.maria.includes(
              'special-rapport')
          },
          {
            text: 'Maria the mousemaid suspects that you were having an affair with Richard Robinson.',
            to: 'richard-affair',
            condition: gameData => gameData.interviews.maria && gameData.interviews.maria.includes(
              'ginger')
          },
          {
            text: 'Why do you stock so much pesticide?',
            to: 'pesticide',
            condition: gameData => gameData.observations.includes('shopPesticideBottle')
          },
        ]
      },
      {
        id: 'alibi',
        afterLast: 'first',
        dialog: [
          'Let me think... the store would have been closed, so I would have been home...',
          'Ah! I remember now! I had a terrible headache, so I headed for the pharmacy to get some ibuprofen, but it was closed.',
          'I remember that was right at noon, the sun was unusually strong and hot.'
        ]
      },
      {
        id: 'relationship',
        afterLast: 'first',
        dialog: [
          'I wouldn\'t say it was much of a relationship, to be honest.',
          'I knew her from around town. In our younger days she was the one stealing away all the best looking beaus.',
          'But it looks like her niece is taking over that role now.',
          'It\'s a real tragedy what happened to her. I hope you get to the bottom of it.'
        ],
      },
      {
        id: 'jane-affair',
        afterLast: 'first',
        dialog: [
          'I\'m not much of a gossip, but I have heard rumors as well, about unsavory things.',
          'Personally, I think Jane just missed being in the spotlight. Being the girl all the boys pine over.',
          'Going after Ranger must have done wonders for her self-esteem.',
          'Not to speak ill of the dead, of course.'
        ],
      },
      {
        id: 'richard-affair',
        afterLast: 'first',
        dialog: [
          '<the shopkeeper freezes with terror for a long moment>',
          'Umm... how.. well, now...',
          '<she sighs deeply> Yes, I guess I might as well fess up to it.',
          'We were having an affair, since the beginning of the year.',
          'Richard had his work conferences every month, which he either attended partially or would skip. We would go up every other weekend, though, to a cabin in the woods instead.',
          'I\'m not ashamed. I love him, and the happiness he brings me is pure and beautiful. Not to speak ill of the dead, but Jane did not treat me right.'
        ],
      },
      {
        id: 'pesticides',
        afterLast: 'first',
        dialog: [
          'They\'re just the regular stock. The local pest control man, Richard, uses quite a lot of that stuff. He says it\'s easier for him to buy it from me than to order it wholesale.',
          'Something about taxes and shipping costs.'
        ],
      },
    ],
    speaker: 'Ginger, the shopkeeper'
  },
  ranger: {
    imageUrl: 'images/ranger.png',
    start: 'first',
    branches: [
      {
        id: 'first',
        dialog: [ 'Greetings, detective, how can I be of assistance?' ],
        fork: [
          {
            text: 'Where were you on Sunday at noon?',
            to: 'alibi'
          },
          {
            text: 'I\'ve heard you have a "special rapport" with Jane Robinson?',
            to: 'jane',
            condition: gameData => gameData.interviews.maria && gameData.interviews.maria.includes(
              'special-rapport')
          },
          {
            text: 'What is your relationship with Candice Raven?',
            to: 'candice',
            condition: gameData => !!gameData.interviews.candice
          },
          {
            text: 'I see from your books that you\'re having financial problems...',
            to: 'finance',
            condition: gameData => gameData.observations.includes('rangerAccounts')
          },
          {
            text: 'Do you know why Candice and Jane had a fight two weeks ago?',
            to: 'fight',
            condition: gameData => gameData.interviews.maria && gameData.interviews.maria.includes(
              'candice')
          }
        ]
      },
      {
        id: 'alibi',
        afterLast: 'first',
        dialog: [
          'Let\'s see... Sunday at noon I would have been here, at the pharmacy. I keep it open on Sundays, just in case people need anything.'
        ],
      },
      {
        id: 'jane',
        afterLast: 'first',
        dialog: [
          'I don\'t know what a "special rapport" could be about. Probably some town gossip.',
          'Jane was the aunt of my fiancée, nothing more, nothing less.',
          'I did her the favor of delivering any medication she needed personally to her door, but that\'s only because we were soon to become family.'
        ],
      },
      {
        id: 'candice',
        afterLast: 'first',
        dialog: [
          'Candice is... how do I put this... the silver lining around the rain cloud that is this city. She is beautiful, intelligent and witty, what more could a man ask for?',
          'We\'ve been dating now for years, I figured it was time to tie the knot already and proposed on Valentine\'s Day.'
        ],
      },
      {
        id: 'finance',
        afterLast: 'first',
        dialog: [
          'Nothing a strong business model can\'t handle.',
          'It\'s probably just a seasonal slump, people leaving for the countryside as the weather warms.',
          'Regardless, I have a back-up plan in place, should things go south.',
          'There\'s money coming my way, I can just feel it. <he smiles wryly>'
        ],
      },
      {
        id: 'fight',
        afterLast: 'first',
        dialog: [
          'Jane and Candice were often at each other\'s throats, I didn\'t make much of it.',
          'These things usually had a way of smoothing themselves over, at least that was the hope.'
        ],
      },
    ],
    speaker: 'Ranger Caw, the pharmacist'
  }
}
