import { css, html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import './UIEvidence'
import './UIIntro'
import './UISolve'
import './UIFinished'
import { ClientSideGameData } from '../../interface/game-data-interface'

type ActiveState = 'evidence' | 'solve' | 'intro' | 'finished'

@customElement('dog-ui-container')
export class UIContainer extends LitElement {
  @property()
  gameData?: ClientSideGameData

  @property()
  roomId?: string

  @state()
  private activeState?: ActiveState = undefined

  @state()
  private solutionHasErrors: boolean = false

  @state()
  private message: string = ''

  solve(ev: CustomEvent) {
    this.dispatchEvent(new CustomEvent(
      'solve',
      { detail: { culprit: ev.detail?.culprit, reason: ev.detail?.reason } }
    ))
    this.solutionHasErrors = false
  }

  wrongSolution() {
    this.solutionHasErrors = true
  }

  setMessage(message: string) {
    this.message = message
  }

  setActiveState(state?: ActiveState) {
    this.activeState = state
    this.dispatchEvent(new CustomEvent('switchState', { detail: state }))
  }

  static get styles() {
    return css`
      .container, .overlay {
        position: absolute;
        width: 100%;
        height: 100%;
      }

      .container {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
      }

      .overlay {
        display: flex;
        backdrop-filter: blur(6px) brightness(70%);
        background: rgba(54, 50, 50, 0.77);
        z-index: 4;
      }

      .actions {
        pointer-events: all;
        padding: 20px;
        grid-column-end: end;
        grid-row-end: end;
      }

      .actions button {
        font-size: 2em
      }

      .header {
        font-size: var(--font-size-medium);
        margin-left: var(--spacer-5);
      }

      .highlight {
        pointer-events: all;
        color: var(--background-color);
        background-color: var(--primary-color);
        border-radius: var(--spacer-3);
        padding: var(--spacer-3) var(--spacer-4)
      }
    `
  }

  render() {
    return html`
        ${ this.activeState === 'evidence' ? html`
            <dog-ui-evidence class="overlay"
                             @close="${ () => this.setActiveState(undefined) }"
                             .gameData=${ this.gameData }></dog-ui-evidence>` : '' }

        ${ this.activeState === 'solve' ? html`
            <dog-ui-solve class="overlay" @close="${ () => this.setActiveState(undefined) }"
                          @solve="${ this.solve }"
                          .solutionHasErrors="${ this.solutionHasErrors }"></dog-ui-solve>` : '' }

        ${ this.activeState === 'intro' ? html`
            <dog-ui-intro class="overlay"
                          @close="${ () => this.setActiveState(undefined) }"></dog-ui-intro>` : '' }

        ${ this.activeState === 'finished' ? html`
            <dog-ui-finished class="overlay" .message="${ this.message }"
                             @close="${ () => this.setActiveState(undefined) }"></dog-ui-finished>` : '' }

        <div class="container">
            <div class="actions">
                <dog-button @click="${ () => this.setActiveState('evidence') }">Evidence
                </dog-button>
                <dog-button @click="${ () => this.setActiveState('solve') }">Solve</dog-button>
            </div>
            <div class="header">
                <h3>Room: <span class="highlight">${ this.roomId }</span></h3>
            </div>
        </div>
    `
  }
}
