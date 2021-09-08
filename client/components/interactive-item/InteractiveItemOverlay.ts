import { css, html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('dog-interactive-item-overlay')
export class InteractiveItemOverlay extends LitElement {
  static get styles() {
    return css`
      .interactive-item-overlay {
        background-color: var(--text-color);
        color: var(--background-color);
        font-size: var(--font-size-small);
        padding: var(--spacer-5);
        width: 500px;
        display: flex;
        border-radius: var(--spacer-3);
        flex-direction: column;
      }

      .close-button {
        flex-grow: 1;
        text-align: right;
      }

      dog-link-button span {
        font-family: var(--heading-font-family);
      }
    `
  }

  render() {
    return html`
        <div class="interactive-item-overlay">
            <slot></slot>
            <dog-link-button class="inverse close-button" @click="${ this._close }"><span>x</span>
            </dog-link-button>
        </div>
    `
  }

  private _close() {
    this.dispatchEvent(new CustomEvent('close'))
  }
}
