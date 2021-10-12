import { css, html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import './UIEvidence'
import './UIIntro'
import './UISolve'
import { ClientSideGameData } from '../../interface/game-data-interface'

@customElement('dog-ui-container')
export class UIContainer extends LitElement {
  @property()
  gameData?: ClientSideGameData

  @property()
  roomId?: string

  @state()
  private _activeState?: 'evidence' | 'solve' | 'intro' = undefined

  _close() {
    this._activeState = undefined
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

      .actions {
        pointer-events: all;
        padding: 20px;
        grid-column-end: end;
        grid-row-end: end;
      }

      .actions button {
        font-size: 2em
      }

      .header {
        font-size: var(--font-size-medium);
        margin-left: var(--spacer-5);
      }

      .highlight {
        pointer-events: all;
        color: var(--background-color);
        background-color: var(--primary-color);
        border-radius: var(--spacer-3);
        padding: var(--spacer-3) var(--spacer-4)
      }
    `
  }

  render() {
    return html`
        ${ this._activeState === 'evidence' ? html`
            <dog-ui-evidence class="overlay"
                             @close="${ this._close }"
                             .gameData=${ this.gameData }></dog-ui-evidence>` : '' }

        ${ this._activeState === 'solve' ? html`
            <dog-ui-solve class="overlay" @close="${ this._close }"></dog-ui-solve>` : '' }

        ${ this._activeState === 'intro' ? html`
            <dog-ui-intro class="overlay" @close="${ this._close }"></dog-ui-intro>` : '' }

        <div class="container">
            <div class="actions">
                <dog-button @click="${ () => this._activeState = 'evidence' }">Evidence</dog-button>
                <dog-button @click="${ () => this._activeState = 'solve' }">Solve</dog-button>
            </div>
            <div class="header">
                <h3>Room: <span class="highlight">${ this.roomId }</span></h3>
            </div>
        </div>
    `
  }
}
