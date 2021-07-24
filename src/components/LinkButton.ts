import { css, html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('dog-link-button')
export class LinkButton extends LitElement {
  static get styles() {
    return css`
      button {
        color: var(--text-color);
        border: none;
        background: none;
        outline: none;
        font-size: var(--font-size-medium);
        cursor: pointer;
      }
      
      button:hover {
        color: var(--primary)
      }

      :host(.active) button {
        text-decoration: underline;
        text-decoration-color: var(--primary);
        text-decoration-style: double;
      }

      :host(.large) button {
        font-size: var(--font-size-large);
      }

      :host(.small) button {
        font-size: var(--font-size-small);
      }
      
      :host(.block) button {
        width: 100%;
      }
      
      :host(.align-left) button {
        text-align: left;
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
