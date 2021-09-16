import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('dog-button')
export class Button extends LitElement {
  @property()
  disabled: boolean = false

  static get styles() {
    return css`
      button {
        color: var(--background-color);
        border: 2px solid var(--primary-color);
        background: var(--primary-color);
        font-size: var(--font-size-medium);
        cursor: pointer;
        padding: var(--spacer-4) 24px;
        border-radius: var(--spacer-3);
        font-family: var(--heading-font-family);
      }

      :host(.outline) button {
        background: var(--background-color);
        color: var(--text-color);
      }

      button:hover {
        background: var(--primary-dark-color);
      }

      :host(.outline) button:hover {
        color: var(--primary-color)
      }

      :host(.inverse) button {
        color: var(--text-color);
        background: var(--background-color);
      }

      :host(.large) button {
        font-size: var(--font-size-large);
      }

      :host(.small) button {
        font-size: var(--font-size-small);
      }

      :host(.smaller) button {
        font-size: var(--font-size-smaller);
      }

      .disabled {
        opacity: 0.7;
        pointer-events: none;
        cursor: not-allowed;
      }
    `
  }

  render() {
    return html`
        <button class="${ this.disabled ? 'disabled' : '' } ">
            <slot></slot>
        </button>
    `
  }
}
