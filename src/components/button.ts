import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('cda-button')
export class CdaButton extends LitElement {
  render() {
    return html`
      <button>Click me</button>
    `;
  }
}
