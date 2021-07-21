import { customElement } from 'lit/decorators'
import { html } from 'lit'
import { property } from 'lit/decorators.js'
import { Observation } from '../../game-data/game-data-interface'
import { EvidenceScreen } from './EvidenceScreen'

@customElement('dog-observations-screen')
export class ObservationsScreen extends EvidenceScreen {
  @property()
  observations!: Observation[]

  render() {
    return html`
        <div class="container">
            ${ this.observations.map(observation => html`
                <li><img src="${ observation.imageUrl }"
                         alt="${ observation.description }"/>${ observation.description } found at
                    ${ observation.location }
                </li>`) }
        </div>`
  }

}
