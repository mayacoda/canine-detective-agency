import { customElement } from 'lit/decorators'
import { css, html, LitElement } from 'lit'

@customElement('dog-ui-intro')
export class UIIntro extends LitElement {

  static get styles() {
    return css`
      .container {
        margin: var(--spacer-6);
        background-color: var(--background-color);
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: row;
        pointer-events: all !important;
      }

      .close-button {
        position: absolute;
        top: var(--spacer-4);
        right: var(--spacer-4);
      }

      .close-button::part(content) {
        font-family: var(--heading-font-family);
      }
    `
  }

  _close() {
    this.dispatchEvent(new Event('close'))
  }

  render() {
    return html`
        <div class="container">
            <h3>Hello dog detective!</h3>
            <dog-link-button class="close-button outline" @click="${ this._close }">x
            </dog-link-button>
        </div>
    `
  }
}
