import { customElement } from 'lit/decorators'
import { html } from 'lit'
import { property } from 'lit/decorators.js'
import { Interviews } from '../../game-data/game-data-interface'
import { EvidenceScreen } from './EvidenceScreen'

@customElement('dog-interviews-screen')
export class InterviewsScreen extends EvidenceScreen {
  @property()
  interviews!: Interviews

  render() {
    return html`
        <div class="container">
            ${ Object.entries(this.interviews).map(([ person, interview ]) => html`
                <li>${ person }</li>`) }
        </div>`
  }

}
