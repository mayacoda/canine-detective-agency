import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('dog-name-tag')
export class NameTag extends LitElement {
  @property()
  name!: string

  static get styles() {
    return css`
      div {
        background-color: var(--text-color);
        color: var(--background-color);
        font-size: var(--font-size-small);
        padding: var(--spacer-3) var(--spacer-4);
        border-radius: var(--spacer-3);
      }
    `
  }

  render() {
    return html`
        <div>
            ${ this.name }
        </div>`
  }
}
