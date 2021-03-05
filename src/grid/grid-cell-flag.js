import { LitElement, html, css } from 'lit-element';

class GridCellFlag extends LitElement {
  static get styles() {
    return css `
     :host {
        display: block;
        text-align: center;
        margin: 0 17px;
      }
    `;
  }
  render() {
    return html `
      ${this.flags.map(item => html `<iron-icon icon="flag"></iron-icon>`)}
    `;
  }

  static get properties() {
    return {
      /*
       * `flags` flags to repeat
       */
      flags: {
        type: Array,
      },
    };
  }
}

// Register the new element with the browser.
customElements.define('grid-cell-flag', GridCellFlag);
