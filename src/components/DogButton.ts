import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('dog-button')
export class DogButton extends LitElement {
  render() {
    return html`
      <button>Click me</button>
    `;
  }
}
