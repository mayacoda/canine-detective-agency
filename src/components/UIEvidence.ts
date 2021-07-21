import { customElement } from 'lit/decorators'
import { css, html, LitElement } from 'lit'
import { property, state } from 'lit/decorators.js'
import { GameData } from '../game-data/game-data-interface'
import './LinkButton'
import './Button'
import './evidence/InterviewsScreen'
import './evidence/ObservationsScreen'
import './evidence/PhotosScreen'
import './evidence/DocumentsScreen'

type EvidenceScreen = 'interviews' | 'observations' | 'photos' | 'documents'

@customElement('dog-ui-evidence')
export class UIEvidence extends LitElement {
  @property()
  gameData!: GameData

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
        list-style: none;
        width: 250px;
        flex-grow: 0;
      }

      .navigation li {
        margin-bottom: var(--spacer-5);
      }

      .navigation li span {
        text-transform: capitalize;
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
    console.log('changing screen to', screen)
    this._activeScreen = screen
  }

  render() {
    if (!this.gameData) return

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
                ${ this._screens.map(scene => html`
                    <li>
                        <dog-link-button
                                class="block align-left ${ this._activeScreen === scene ? 'active' : '' }"
                                @click="${ () => this._changeScreen(scene) }">
                            <span>${ scene }</span></dog-link-button>
                    </li>`) }
            </ul>
            <div class="evidence-screen">
                ${ evidenceScreen }
            </div>
            <dog-button class="close-button outline" @click="${ this._close }">𝖷</dog-button>
        </div>
    `
  }
}
