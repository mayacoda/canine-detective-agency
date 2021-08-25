import { customElement } from 'lit/decorators'
import { html } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html'
import { property, state } from 'lit/decorators.js'
import { Document } from '../../../interface/game-data-interface'
import { EvidenceScreen } from './EvidenceScreen'

@customElement('dog-documents-screen')
export class DocumentsScreen extends EvidenceScreen {
  @property()
  documents!: Document[]

  @state()
  activeDocument: Document | null = null

  render() {
    return html`
        <div class="container">
            ${ this.activeDocument === null ? html`
                <ul class="list">
                    ${ this.documents.map(document => html`
                        <li class="card" @click="${ () => this.activeDocument = document }">
                            <div class="image"></div>
                            <h4>${ document.name }</h4>
                        </li>`) }
                </ul>
            ` : html`
                <div class="detail-view">
                    <h1>${ this.activeDocument.name }</h1>
                    <div class="scroll-zone">
                        ${ this.activeDocument.description ? html`${ this.activeDocument.description }` : '' }
                        ${ unsafeHTML(this.activeDocument.content) }
                    </div>
                    <dog-button class="outline back-button"
                                @click="${ () => this.activeDocument = null }"><-
                        Back
                    </dog-button>
                </div>
            ` }
        </div>`
  }
}
