import { customElement } from 'lit/decorators'
import { html } from 'lit'
import { property, state } from 'lit/decorators.js'
import { EvidenceScreen } from './EvidenceScreen'
import { InterviewRecord, Interviews } from '../../../interface/game-data-interface'

@customElement('dog-interviews-screen')
export class InterviewsScreen extends EvidenceScreen {
  @property()
  interviews!: Interviews

  @state()
  activeInterview: { person: string, interview: InterviewRecord[] } | null = null

  _openInterview(person: string, interview: InterviewRecord[]) {
    this.activeInterview = { person, interview }
  }

  _closeInterview() {
    this.activeInterview = null
  }

  render() {
    return html`
        <div class="container">
            ${ this.activeInterview === null ? html`
                <ol class="list">
                    ${ Object.entries(this.interviews).map(([ person, interview ]) => html`
                        <li @click="${ () => this._openInterview(person, interview) }" class="card">
                            <div class="image"></div>
                            <h4>${ person }</h4>
                        </li>`) }
                </ol>
            ` : html`
                <div class="detail-view">
                    <h1>${ this.activeInterview.person }</h1>
                    <div class="scroll-zone">
                        ${ this.activeInterview.interview.map(record => html`
                            <h2>location: ${ record.location }</h2>
                            ${ record.dialog.map(statement => html`
                                <p><strong>${ statement.speaker }: </strong> ${ statement.text }</p>
                            `) }
                        `) }
                    </div>
                    <dog-button class="outline back-button" @click="${ this._closeInterview }"><-
                        Back
                    </dog-button>
                </div>
            ` }


        </div>`
  }

}
