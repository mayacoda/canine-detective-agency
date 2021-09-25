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
        display: inline-block;
      }

      button:hover {
        color: var(--primary-color)
      }

      :host(.active) button {
        text-decoration: underline;
        text-decoration-color: var(--primary-color);
        text-decoration-style: double;
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

      :host(.block) button {
        width: 100%;
      }

      :host(.align-left) button {
        text-align: left;
      }

      :host(.align-right) button {
        text-align: right;
      }

      :host(.inverse) button {
        color: var(--background-color);
      }
    `
  }

  render() {
    return html`
        <button>
            <span part="content">
                <slot></slot>    
            </span>
        </button>
    `
  }
}
