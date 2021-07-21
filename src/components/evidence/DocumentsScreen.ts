import { customElement } from 'lit/decorators'
import { html } from 'lit'
import { property } from 'lit/decorators.js'
import { Document } from '../../game-data/game-data-interface'
import { EvidenceScreen } from './EvidenceScreen'

@customElement('dog-documents-screen')
export class DocumentsScreen extends EvidenceScreen {
  @property()
  documents!: Document[]

  render() {
    return html`
        <div class="container">
            ${ this.documents.map(document => html`
                <li>${ document.name } -- ${ document.description }</li>`) }
        </div>`
  }
}
