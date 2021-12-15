import { customElement } from 'lit/decorators'
import { css, html, LitElement } from 'lit'

@customElement('dog-ui-intro')
export class UIIntro extends LitElement {

  static get styles() {
    return [
      css`
        .container {
          padding: var(--spacer-6) var(--spacer-4) 0;
          margin: var(--spacer-6);
          background-color: var(--background-color);
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: row;
          pointer-events: all !important;
        }

        ol {
          margin-left: var(--spacer-6);
          max-width: 60%;
        }

        .close-button {
          position: absolute;
          top: var(--spacer-4);
          right: var(--spacer-4);
        }

        .close-button::part(content) {
          font-family: var(--heading-font-family);
        }

        * {
          font-size: var(--font-size-medium);
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: var(--heading-font-family) !important;
        }

        h1 {
          font-size: var(--font-size-larger);
        }

        h2 {
          font-size: var(--font-size-large);
        }

        h3 {
          font-size: 2rem;
        }

        h4 {
          font-size: var(--font-size-medium)
        }

        :host {
          width: 100%;
        }

        .scroll-zone {
          flex-grow: 1;
          overflow-y: auto;
          padding: 0 var(--spacer-5);
        }
      `
    ]
  }

  close() {
    this.dispatchEvent(new Event('close'))
  }

  render() {
    return html`
        <div class="container">
            <div class="scroll-zone">
                <h3>Hello dog detective!</h3>
                <p>It's such good fortune that you came! We have quite the case on our hands.</p>
                <p>On April 11th, 2014, the agency received a letter from Jane Robinson, a housewife
                    from Lingfarn. She
                    believed that she was being poisoned and that we should come quick.</p>
                <p>Unfortunately, by the time the weekend wrapped up and we got our boys on the
                    scene,
                    she had already been found dead!</p>
                <hr>
                <p>I know you're a seasoned veteran of sleuthing, but let's go over some rules and
                    advice first:</p>
                <ol>
                    <li>Use the keys <strong>W</strong>, <strong>A</strong>, <strong>S</strong>, and
                        <strong>D</strong> to move around.
                    </li>
                    <li>Interact with people and objects by clicking.</li>
                    <li>All evidence you and your party gather will go in your collective <strong>Evidence</strong>
                        file. You can access it from the <strong>Evidence</strong> button in the
                        lower
                        right.
                    </li>
                    <li>Jane's letter to the Agency, along with her autopsy and toxicology reports
                        have
                        already been filed under <strong>Evidence > Documents</strong></li>
                    <li>Return to witnesses you've already questioned when you find new clues. They
                        might
                        have something more to tell you.
                    </li>
                </ol>

                <p>I suggest talking to <strong>Maria, the mousemaid,</strong> first. She found the
                    victim's body. She's in the kitchen of the manor, the big house you're standing
                    in front of. Go right in.</p>

                <p>Good luck!</p>
            </div>
            <dog-link-button class="close-button outline" @click="${ this.close }">x
            </dog-link-button>
        </div>
    `
  }
}
