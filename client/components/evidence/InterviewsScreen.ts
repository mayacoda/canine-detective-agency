import { customElement } from 'lit/decorators'
import { html } from 'lit'
import { property, state } from 'lit/decorators.js'
import { EvidenceScreen } from './EvidenceScreen'
import { Interview, Statement } from '../../../interface/game-data-interface'

@customElement('dog-interviews-screen')
export class InterviewsScreen extends EvidenceScreen {
  @property()
  interviews!: Interview[]

  @state()
  activeInterview: { speaker: string, statements: Statement[] } | null = null

  _openInterview(speaker: string, statements: Statement[]) {
    this.activeInterview = { speaker, statements }
  }

  _closeInterview() {
    this.activeInterview = null
  }

  render() {
    return html`
        <div class="container">
            ${ this.activeInterview === null ? html`
                <ol class="list">
                    ${ this.interviews.map((interview) => {
                        return html`
                            <li @click="${ () => this._openInterview(
                                    interview.speaker,
                                    interview.statements
                            ) }"
                                class="card">
                                <div class="image"></div>
                                <h4>${ interview.speaker }</h4>
                            </li>`
                    }) }
                </ol>
            ` : html`
                <div class="detail-view">
                    <h1>${ this.activeInterview.speaker }</h1>
                    <div class="scroll-zone">
                        ${ this.activeInterview.statements.map(statement => html`
                            <p><strong>${ statement.speaker }: </strong> ${ statement.text }</p>
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
