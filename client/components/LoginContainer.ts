import { css, html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import './Button'

@customElement('dog-login-container')
export class LoginContainer extends LitElement {
  @state()
  roomId: string = 'neat-duck-28'

  @property()
  error: string = ''

  @property()
  isLoading: boolean = false

  static get styles() {
    return css`
      .container, .overlay {
        background: #fff;
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        font-size: var(--font-size-medium)
      }

      input {
        border: 2px solid var(--primary-color);
        background-image: none;
        background-color: transparent;
        width: 14em;
        box-shadow: none;
        padding: var(--spacer-4) 24px;
        font-size: var(--font-size-medium);
        margin-bottom: var(--spacer-4)
      }

      label {
        margin-bottom: var(--spacer-4)
      }

      .error {
        color: var(--warning-color);
        margin-top: 0;
      }
    `
  }

  joinRoom() {
    this.dispatchEvent(new CustomEvent('join-room', { detail: this.roomId }))
  }

  createRoom() {
    this.dispatchEvent(new CustomEvent('create-room'))
  }

  updateValue(ev: Event) {
    this.error = ''
    this.roomId = (ev.target as HTMLInputElement).value
  }

  render() {
    return html`
        <div class="container">
            <label for="room_id">
                Enter room id
            </label id="room_id">
            <input type="text" @keyup="${ this.updateValue }" value="${ this.roomId }"/>

            ${ this.error ? html`
                <p class="error">${ this.error }</p>
            ` : '' }

            <dog-button @click="${ this.joinRoom }" .disabled="${ !this.roomId || this.isLoading }">
                Join room
            </dog-button>
            <p>OR</p>
            <dog-button @click="${ this.createRoom }" .disabled="${ this.isLoading }">Create room
            </dog-button>
        </div>
    `
  }
}
