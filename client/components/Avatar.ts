import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('dog-avatar')
export class Avatar extends LitElement {
  @property()
  imageUrl!: string

  @property()
  selected!: boolean

  static get styles() {
    return css`
      div {
        border-radius: 50%;
        border: var(--spacer-2) solid transparent;
      }

      div.selected {
        border-color: var(--text-color);
      }
    `
  }

  render() {
    return html`
        <div class="${ this.selected ? 'selected' : '' }">
            <img src="${ this.imageUrl }" alt="Avatar for a dog">
        </div>`
  }
}
