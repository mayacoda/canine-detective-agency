import { css, html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import './Button'

@customElement('dog-login-container')
export class LoginContainer extends LitElement {
  @state()
  roomId: string = ''

  static get styles() {
    return css`
      .container, .overlay {
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
        box-shadow: none;
        padding: var(--spacer-4) 24px;
        font-size: var(--font-size-medium);
        margin-bottom: var(--spacer-4)
      }

      label {
        margin-bottom: var(--spacer-4)
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
    this.roomId = (ev.target as HTMLInputElement).value
  }


  render() {
    return html`
        <div class="container">
            <label for="room_id">
                Enter room id
            </label id="room_id">
            <input type="text" @change="${ this.updateValue }"/>

            <dog-button @click="${ this.joinRoom }" .disabled="${ !this.roomId }">Join room
            </dog-button>
            <p>OR</p>
            <dog-button @click="${ this.createRoom }">Create room</dog-button>
        </div>
    `
  }
}
