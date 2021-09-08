import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Photo } from '../../../interface/game-data-interface'

@customElement('dog-photo-item-overlay')
export class PhotoItemCard extends LitElement {
  @property()
  photo!: Photo

  static get styles() {
    return css`
      div {
        display: flex;
        flex-direction: column;
      }
    `
  }

  render() {
    return html`
        <div>
            <link rel="preload" as="image" href="${ this.photo.imageUrl }">
            <img src="${ this.photo.imageUrl }" alt="${ this.photo.description }"/>
            ${ this.photo.description }
        </div>
    `
  }
}
