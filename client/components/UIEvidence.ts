import { customElement } from 'lit/decorators'
import { css, html, LitElement } from 'lit'
import { property, state } from 'lit/decorators.js'
import './LinkButton'
import './Button'
import './evidence/InterviewsScreen'
import './evidence/ObservationsScreen'
import './evidence/PhotosScreen'
import './evidence/DocumentsScreen'
import { ClientSideGameData } from '../../interface/game-data-interface'

type EvidenceScreen = 'interviews' | 'observations' | 'photos' | 'documents'

@customElement('dog-ui-evidence')
export class UIEvidence extends LitElement {
  @property()
  gameData!: ClientSideGameData

  @state()
  _activeScreen!: EvidenceScreen

  _screens: EvidenceScreen[] = [ 'interviews', 'documents', 'photos', 'observations' ]

  constructor() {
    super()
    this._activeScreen = this._screens[0]
  }

  static get styles() {
    return css`

      .ui-evidence {
        margin: var(--spacer-6);
        background-color: var(--background-color);
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: row;
      }

      .close-button {
        position: absolute;
        top: var(--spacer-4);
        right: var(--spacer-4);
      }

      .navigation {
        margin-top: var(--spacer-6);
        margin-left: var(--spacer-6);
        padding: 0;
        list-style: none;
        width: 250px;
        flex-grow: 0;
        flex-shrink: 0;
      }

      .navigation li {
        margin-bottom: var(--spacer-5);
      }

      .navigation li span {
        text-transform: capitalize;
        font-family: var(--heading-font-family);
      }

      .close-button span {
        font-family: var(--heading-font-family);
      }

      .evidence-screen {
        display: flex;
        flex-grow: 1;
      }
    `
  }

  _close() {
    this.dispatchEvent(new Event('close'))
  }

  _changeScreen(screen: EvidenceScreen) {
    this._activeScreen = screen
  }

  render() {
    if (!this.gameData) return html`
        <div class="ui-evidence">
            Nothing to see here...
            <dog-link-button class="close-button outline" @click="${ this._close }"><span>x</span>
            </dog-link-button>
        </div>
    `

    let evidenceScreen = html``

    switch (this._activeScreen) {
      case 'interviews':
        evidenceScreen = html`
            <dog-interviews-screen
                    .interviews="${ this.gameData.interviews }"></dog-interviews-screen>`
        break
      case 'observations':
        evidenceScreen = html`
            <dog-observations-screen
                    .observations="${ this.gameData.observations }"></dog-observations-screen>`
        break
      case 'photos':
        evidenceScreen = html`
            <dog-photos-screen .photos="${ this.gameData.photos }"></dog-photos-screen>`
        break
      case 'documents':
        evidenceScreen = html`
            <dog-documents-screen .documents="${ this.gameData.documents }"></dog-documents-screen>`
        break
    }

    return html`
        <div class="ui-evidence">
            <ul class="navigation">
                ${ this._screens.map(screen => html`
                    <li>
                        <dog-link-button
                                class="block align-left ${ this._activeScreen === screen ? 'active' : '' }"
                                @click="${ () => this._activeScreen = screen }">
                            <span>${ screen }</span></dog-link-button>
                    </li>`) }
            </ul>
            <div class="evidence-screen">
                ${ evidenceScreen }
            </div>
            <dog-link-button class="close-button outline" @click="${ this._close }"><span>x</span>
            </dog-link-button>
        </div>
    `
  }
}
