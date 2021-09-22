import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html'
import { Document } from '../../../interface/game-data-interface'

@customElement('dog-document-item-overlay')
export class DocumentItemCard extends LitElement {
  @property()
  document!: Document

  static get styles() {
    return css`
      div {
        display: flex;
        flex-direction: column;
      }

      .document-container {
        background-color: var(--background-color);
      }
    `
  }

  render() {
    return html`
        <div>
            <h3>${ this.document.name }</h3>
            <div class="document-container">
                ${ unsafeHTML(this.document.content) }
            </div>
        </div>
    `
  }
}
