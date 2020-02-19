import { LitElement, html, css } from 'lit-element';

class GridCellStatus extends LitElement {

  static get styles() {
    return css `
     :host {
      display: block;
      color: var(--cell-color, var(--paper-grey-400));
    }

     .online {
      color: var(--cell-online-color, var(--paper-green-400));
    }

     .idle {
      color: var(--cell-idle-color, var(--paper-orange-400));
    }
    `
  }
  render() {
    return html ` 
      <span class='${this.value}'>${this.computeValue(this.value)}<span>
    `;
  }

  static get properties() {
    return {
      /*
       * `value` value to display
       */
      value: {
        type: String
      }
    }
  }

  computeValue(d) {
    if (!d ||(Object(d) === d)) {
      return '';
    }
    var star = d === 'online' ? '★' : d === 'idle' ? '☆' : '';
    var value = d === 'signedout' ? 'signed-out' : d;
    return star + ' ' + value;
  }
}

// Register the new element with the browser.
customElements.define('grid-cell-status', GridCellStatus);