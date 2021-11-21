import { css, html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import './Button'
import './Avatar'

@customElement('dog-start-container')
export class StartContainer extends LitElement {
  @property()
  roomId!: string

  @property()
  isLoading: boolean = false

  @state()
  playerName: string = ''

  @state()
  playerAvatar: string = ''

  avatars = [ 'pug', 'shepherd', 'poodle', 'stafford' ]

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
        width: 14em;
        padding: var(--spacer-4) 24px;
        font-size: var(--font-size-medium)
      }

      label {
        margin-bottom: var(--spacer-4)
      }

      .avatar-container {
        display: flex;
        flex-direction: row;
        margin-bottom: var(--spacer-6)
      }

      .highlight {
        color: var(--background-color);
        background-color: var(--primary-color);
        border-radius: var(--spacer-3);
        padding: var(--spacer-3) var(--spacer-4)
      }
    `
  }

  startGame() {
    this.dispatchEvent(new CustomEvent(
      'start-game',
      { detail: { name: this.playerName, avatar: this.playerAvatar } }
    ))
  }

  updateValue(ev: Event) {
    this.playerName = (ev.target as HTMLInputElement).value
  }

  setAvatar(avatar: string) {
    this.playerAvatar = avatar
  }


  render() {
    return html`
        <div class="container">
            <h3>Joining room <span class="highlight">${ this.roomId }</span></h3>

            <label for="name_field">
                Enter your name
            </label>
            <input type="text" id="name_field" @keyup="${ this.updateValue }"
                   value="${ this.playerName }"/>

            <p>Choose your detective</p>
            <div class="avatar-container">
                ${ this.avatars.map(avatar => {
                    return html`
                        <dog-avatar imageUrl="images/${ avatar }.png"
                                    .selected="${ this.playerAvatar === avatar }"
                                    @click="${ () => this.setAvatar(avatar) }"></dog-avatar>
                    `
                }) }
            </div>
            <dog-button @click="${ this.startGame }"
                        .disabled="${ !this.playerAvatar || !this.playerName || this.isLoading }">Start investigating!
            </dog-button>
        </div>
    `
  }
}
