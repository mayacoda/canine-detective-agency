import { customElement } from 'lit/decorators'
import { css, html } from 'lit'
import { property, state } from 'lit/decorators.js'
import { EvidenceScreen } from './EvidenceScreen'
import { Photo } from '../../../interface/game-data-interface'

@customElement('dog-photos-screen')
export class PhotosScreen extends EvidenceScreen {
  @property()
  photos!: Photo[]

  @state()
  activePhoto: Photo | null = null

  static get styles() {
    return [
      super.styles, css`
        .scroll-zone {
          margin-top: var(--spacer-6);
        }
      `
    ]
  }

  render() {
    return html`
        ${ this.activePhoto === null ? html`
            <div class="container">
                <ul class="list">
                    ${ this.photos.map(photo => html`
                        <li class="card" @click="${ () => this.activePhoto = photo }">
                            <img class="image" src="${ photo.imageUrl }"
                                 alt="${ photo.description }"/>
                            <h4>${ photo.description }</h4>
                        </li>`) }
                </ul>
            </div>` : html`
            <div class="detail-view">
                <div class="scroll-zone">
                    <img src="${ this.activePhoto.imageUrl }"
                         alt="${ this.activePhoto.description }">
                    <h3>${ this.activePhoto.description }</h3>
                </div>
                <dog-button class="outline back-button" @click="${ () => this.activePhoto = null }">
                    <-- Back
                </dog-button>
            </div>
        ` }

    `
  }
}
