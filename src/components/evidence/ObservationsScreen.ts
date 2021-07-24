import { customElement } from 'lit/decorators'
import { css, html } from 'lit'
import { property, state } from 'lit/decorators.js'
import { Observation } from '../../game-data/game-data-interface'
import { EvidenceScreen } from './EvidenceScreen'

@customElement('dog-observations-screen')
export class ObservationsScreen extends EvidenceScreen {
  @property()
  observations!: Observation[]

  @state()
  activeObservation: Observation | null = null

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
        ${ this.activeObservation === null ? html`
            <div class="container">
                <ul class="list">
                    ${ this.observations.map(observation => html`
                        <li class="card" @click="${ () => this.activeObservation = observation }">
                            <img class="image" src="${ observation.imageUrl }"
                                 alt="${ observation.description }"/>
                            <h4>${ observation.description }</h4>
                        </li>`) }
                </ul>
            </div>` : html`
            <div class="detail-view">
                <div class="scroll-zone">
                    ${ this.activeObservation.imageUrl ? html`<img
                            src="${ this.activeObservation.imageUrl }"
                            alt="${ this.activeObservation.description }">` : '' }
                    <h4>${ this.activeObservation.location }</h4>
                    <p>${ this.activeObservation.description }</p>
                </div>
                <dog-button class="outline back-button"
                            @click="${ () => this.activeObservation = null }">
                    <-- Back
                </dog-button>
            </div>
        ` }
    `
  }

}
