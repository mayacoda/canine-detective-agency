import { customElement, property, state } from 'lit/decorators'
import { css, html, LitElement } from 'lit'

@customElement('dog-ui-solve')
export class UISolve extends LitElement {
  @state()
  culprit: string = ''

  @state()
  reason: string = ''

  @property()
  error: string = ''

  @property()
  solutionHasErrors: boolean = false

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

      input {
        border: 2px solid var(--primary-color);
        background-image: none;
        background-color: transparent;
        box-shadow: none;
        width: 14em;
        padding: var(--spacer-4) 24px;
        font-size: var(--font-size-medium);
        margin-bottom: var(--spacer-4)
      }

      label {
        display: flex;
        flex-direction: column;
      }

      .close-button::part(content) {
        font-family: var(--heading-font-family);
      }

      dog-button {
        margin-top: var(--spacer-6);
      }

      * {
        font-size: var(--font-size-medium);
      }

      h2 {
        font-family: var(--heading-font-family) !important;
        font-size: var(--font-size-large);
      }

      h4 {
        font-family: var(--heading-font-family) !important;
        font-size: var(--font-size-medium)
      }

      .error {
        color: var(--warning-color);
      }

    `
  }

  solve() {
    this.dispatchEvent(new CustomEvent(
      'solve',
      { detail: { culprit: this.culprit, reason: this.reason } }
    ))
  }

  close() {
    this.dispatchEvent(new CustomEvent('close'))
  }

  updateCulprit(ev: Event) {
    this.error = ''
    this.culprit = (ev.target as HTMLInputElement).value
  }

  updateReason(ev: Event) {
    this.error = ''
    this.reason = (ev.target as HTMLInputElement).value
  }

  render() {
    return html`
        <div class="container">
            <h2>Have you figured it out?</h2>
            <h4>Who killed Jane Robinson?</h4>

            ${ this.solutionHasErrors ? html`<p class="error">That solution isn't quite
                right</p>` : '' }

            <label>The culprit was...
                <input type="text" @keyup="${ this.updateCulprit }" value="${ this.culprit }"/>
            </label>

            <label>The reason they did it was...
                <input type="text" @keyup="${ this.updateReason }" value="${ this.reason }"/>
            </label>
            <dog-button @click="${ this.solve }">Solve the murder</dog-button>

            <dog-link-button class="close-button outline" @click="${ this.close }">x
            </dog-link-button>
        </div>
    `
  }
}
