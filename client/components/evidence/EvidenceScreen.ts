import { css, LitElement } from 'lit'

export class EvidenceScreen extends LitElement {
  static get styles() {
    return css`
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

      div.container {
        padding: var(--spacer-6) var(--spacer-4) 0;
        box-sizing: border-box;
        overflow: auto;
        height: 100%;
      }

      :host {
        width: 100%;
      }

      .list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }

      .card {
        margin-right: var(--spacer-6);
        cursor: pointer;
      }

      .card .image img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        overflow: hidden;
      }

      .card h4 {
        text-align: center;
        width: 256px;
      }

      .card:hover h4 {
        text-decoration: underline;
        text-decoration-style: double;
        text-decoration-color: var(--warning-color);
      }

      .image {
        height: 256px;
        width: 256px;
      }

      .back-button {
        margin: var(--spacer-4) 0;
      }

      .scroll-zone {
        flex-grow: 1;
        overflow-y: auto;
        padding-right: var(--spacer-5);
      }

      .detail-view {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .detail-view h1 {
        margin-top: 0;
      }

      .document {
        max-width: 70%;
      }
    `
  }
}
