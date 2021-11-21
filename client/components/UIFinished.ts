import { customElement } from 'lit/decorators'
import { css, html, LitElement } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html'
import { property } from 'lit/decorators.js'

@customElement('dog-ui-finished')
export class UIFinished extends LitElement {
  @property()
  message: string = ''

  static get styles() {
    return css`
      .container {
        margin: var(--spacer-6);
        padding: var(--spacer-6);
        background-color: var(--background-color);
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
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

      * {
        font-size: var(--font-size-medium);
      }

      h1 {
        font-family: var(--heading-font-family) !important;
        font-size: var(--font-size-larger);
      }
    `
  }

  close() {
    this.dispatchEvent(new Event('close'))
  }

  render() {
    return html`
        <div class="container">
            <h1>Congratulations!</h1>
            ${ unsafeHTML(
                    this.message
            ) }
            <dog-link-button class="close-button outline" @click="${ this.close }">x
            </dog-link-button>
        </div>
    `
  }
}
