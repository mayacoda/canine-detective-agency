import { css, html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import './Button'

@customElement('dog-login-container')
export class LoginContainer extends LitElement {
  @state()
  roomId: string = ''

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

      h1, h3 {
        font-family: var(--heading-font-family);
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

      .join-room, .create-room {
        width: 40%;
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 0 var(--spacer-8);
        align-items: center;
        justify-content: center;
      }


      .login {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        width: 75%
      }

      label {
        margin-bottom: var(--spacer-4);
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
            <p>Welcome to the</p>
            <h1>Canine Detective Agency</h1>
            <div class="login">
                <div class="join-room">
                    <p>If your friends are already waiting for you, or you want to pick up where
                        you left off last time...</p>
                    <label for="room_id">
                        Enter your room id
                    </label id="room_id">
                    <input type="text" @keyup="${ this.updateValue }" value="${ this.roomId }"/>

                    ${ this.error ? html`
                        <p class="error">${ this.error }</p>
                    ` : '' }

                    <dog-button @click="${ this.joinRoom }"
                                .disabled="${ !this.roomId || this.isLoading }">
                        Join room
                    </dog-button>
                </div>
                <h3>OR</h3>

                <div class="create-room">
                    <dog-button @click="${ this.createRoom }" .disabled="${ this.isLoading }">
                        Create a new room
                    </dog-button>
                </div>
            </div>

        </div>
    `
  }
}
