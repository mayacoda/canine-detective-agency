import { customElement } from 'lit/decorators'
import { html } from 'lit'
import { property } from 'lit/decorators.js'
import { Photo } from '../../game-data/game-data-interface'
import { EvidenceScreen } from './EvidenceScreen'

@customElement('dog-photos-screen')
export class PhotosScreen extends EvidenceScreen {
  @property()
  photos!: Photo[]

  render() {
    return html`
        <div class="container">
            ${ this.photos.map(photo => html`
                <li><img src="${ photo.imageUrl }" alt="${ photo.description }"/> --
                    ${ photo.description }
                </li>`) }
        </div>`
  }
}
