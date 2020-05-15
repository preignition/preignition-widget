import { LitElement, html, css } from 'lit-element';
import { parse } from '../util/markdown.js';

class PwiMd extends LitElement {

  static get properties() {
    return {

      /*
       * `md` markdown to render
       */
      md: {
        type: String,
      }
    };

  }
  

  render() {
    return html `<div class="markdown">${parse(this.md)}</div>`;
  }

  // Note(cg): we want to render value in light dom so that 
  // textContent work on parent elements.
  createRenderRoot() {
    return this;
  }
}

export default PwiMd;
customElements.define('pwi-md', PwiMd);
