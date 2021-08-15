import { css, html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { PropertyValues } from '@lit/reactive-element'
import { Dialog } from '../../../interface/dialog-interface'

@customElement('dog-dialog')
export class DialogBox extends LitElement {
  @property()
  dialog: Dialog | null = null

  @state()
  _dialogIndex: number = 0

  @state()
  _branchId: string | null = null

  @state()
  _isVisible: boolean = true

  static get styles() {
    return css`
      div {
        background-color: var(--text-color);
        color: var(--background-color);
        font-size: var(--font-size-small);
        padding: var(--spacer-5);
        width: 500px;
        display: flex;
        border-radius: var(--spacer-3);
        flex-direction: column;
      }

      .next-button {
        position: absolute;
        bottom: var(--spacer-4);
        right: var(--spacer-4);
      }

      dog-link-button span {
        font-family: var(--heading-font-family);
      }

      h3, p {
        margin-top: 0;
      }

      .visible {
        display: block;
      }

      .hidden {
        display: none;
      }
    `
  }

  get _branch() {
    return this.dialog?.branches.find(branch => branch.id === this._branchId)
  }

  get _nextButtonText() {
    return this._isLastDialogIndex ? 'x' : '>>'
  }

  get _showFork() {
    return this._branch?.fork && this._isLastDialogIndex
  }

  get _isLastDialogIndex() {
    return this._branch && this._dialogIndex === this._branch.dialog.length - 1
  }

  _switchToBranch(to: string) {
    this._branchId = to
    this._dialogIndex = 0
  }

  update(change: PropertyValues) {
    if (change.has('dialog') && change.get('dialog') !== this.dialog && this.dialog) {
      this._dialogIndex = 0
      this._branchId = this.dialog.start
    }
    super.update(change)
  }

  _advanceDialog() {
    if (!this.dialog) return
    if (this._branch && this._dialogIndex !== this._branch.dialog.length - 1) {
      return this._dialogIndex++
    }

    this.dispatchEvent(new CustomEvent('close'))
  }

  render() {
    return this._branch ?
      html`
          <div>
              <h3>${ this.dialog?.speaker }</h3>
              <p>${ this._branch.dialog[this._dialogIndex] }</p>

              ${ this._showFork ?
                      this._branch.fork!.map(question =>
                              html`
                                  <p>
                                      <dog-link-button class="inverse small"
                                                       @click="${ () => this._switchToBranch(
                                                               question.to) }">
                                          > ${ question.text }
                                      </dog-link-button>
                                  </p>
                              `)
                      : html`
                          <dog-link-button class="inverse small next-button"
                                           @click="${ this._advanceDialog }">
                              <span>${ this._nextButtonText }</span>
                          </dog-link-button>
                      ` }

          </div>
      `
      :
      ''
  }
}
