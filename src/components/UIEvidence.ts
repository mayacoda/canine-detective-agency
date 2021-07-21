import { customElement } from 'lit/decorators'
import { css, html, LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import { GameData } from '../game-data/game-data-interface'

@customElement('dog-ui-evidence')
export class UIEvidence extends LitElement {
  @property()
  gameData!: GameData

  static get styles() {
    return css`
      * {
        font-size: 1.3em;
      }
    `
  }

  _close() {
    this.dispatchEvent(new Event('close'))
  }

  render() {
    return html`
    <div>
        <pre>${JSON.stringify(this.gameData, null, 2)}</pre>
        <button @click="${this._close}">Close</button>
    </div>
    `
  }
}
