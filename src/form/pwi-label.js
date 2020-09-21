import { LitElement, html, css } from 'lit-element';

class PwiLabel extends LitElement {

  static get styles() {
    return css `
    
    :host {
      display: block;
      padding-top: 4px;
      font-size: var(--mdc-typography-subtitle1-font-size, 1rem);
    }

    :host([required])::after {
      margin-left: 1px;
      margin-right: 0px;
      content: "*";
    }
    `;
  }

  /**
   * render label with terminology 
   * @param  {String} label       [description]
   * @param  {Array} terminology  [{term: definition}]
   * @return {HTMLTemplate || string}             
   */
  renderLabel(label, terminology) {
    if (terminology) {
      // Note(cg): parse label to get terminolotgy.
      return this.label; 
    }
    return this.label; 
  }

  render() {
    return html `
      <label>${this.renderLabel(this.label, this.terminology)}</label>
    `;
  }

  static get properties() {
    return {

      required: {
        type: Boolean, 
        reflect: true
      },
      /*
       * `terminology` [{term: definition}]
       */
      terminology: {
        type: Array
      }

    };
  }
}

// Register the new element with the browser.
customElements.define('pwi-label', PwiLabel);

export { PwiLabel };
