import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Observation } from '../../../interface/game-data-interface'

@customElement('dog-observation-item-overlay')
export class ObservationItemCard extends LitElement {
  @property()
  observation!: Observation

  static get styles() {
    return css`
      div {
        display: flex;
        flex-direction: row;
      }

      img {
        margin-right: var(--spacer-4);
        max-width: 250px;
      }
    `
  }

  render() {
    return html`
        <div>

            ${ this.observation.imageUrl ? html`
                <link rel="preload" as="image" href="${ this.observation.imageUrl }">
                <img src="${ this.observation.imageUrl }" alt="${ this.observation.description }"/>
            ` : '' }
            ${ this.observation.description }
        </div>
    `
  }
}
