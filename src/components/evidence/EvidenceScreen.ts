import { css, LitElement } from 'lit'

export class EvidenceScreen extends LitElement {
  static get styles() {
    return css`
      * {
        font-size: var(--font-size-medium);
      }
      
      div.container {
        margin-top: var(--spacer-6);
      }
    `
  }
}
