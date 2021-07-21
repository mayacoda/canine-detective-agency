import { css, html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { GameData } from '../game-data/game-data-interface'
import './UIEvidence'

@customElement('dog-ui-container')
export class UIContainer extends LitElement {
  @property()
  gameData!: GameData

  @state()
  private _evidenceVisible = true
  @state()
  private _settingsVisible = false

  constructor() {
    super()
  }

  static get styles() {
    return css`
      .container, .overlay {
        position: absolute;
        width: 100%;
        height: 100%;
      }

      .container {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
      }

      .overlay {
        display: flex;
        backdrop-filter: blur(6px) brightness(70%);
        background: rgba(54, 50, 50, 0.77);
        z-index: 4;
      }

      .navigation {
        padding: 20px;
        grid-column-end: end;
        grid-row-end: end;
      }

      .navigation button {
        font-size: 2em
      }
    `
  }

  render() {
    return html`
        ${ this._evidenceVisible ? html`
            <dog-ui-evidence class="overlay" @close="${ () => this._evidenceVisible = false }"
                             .gameData=${ this.gameData }></dog-ui-evidence>` : '' }
        ${ this._settingsVisible ? html`
            <dog-ui-settings class="overlay"></dog-ui-settings>` : '' }
        <div class="container">
            <div class="navigation">
                <button @click="${ () => this._evidenceVisible = true }">Evidence</button>
                <button>Solve</button>
                <button>Settings</button>
            </div>

        </div>
    `
  }
}
