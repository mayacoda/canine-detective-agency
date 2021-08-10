import { css, html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('dog-button')
export class Button extends LitElement {
  static get styles() {
    return css`
      button {
        color: var(--background-color);
        border: 2px solid var(--primary);
        background: var(--primary);
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
        background: var(--primary-dark);
      }
      
      :host(.outline) button:hover {
        color: var(--primary)
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
    `
  }

  render() {
    return html`
        <button>
            <slot></slot>
        </button>
    `
  }
}
