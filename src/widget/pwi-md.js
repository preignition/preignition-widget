import { LitElement, html } from 'lit-element';
import { parse } from '@preignition/preignition-util';

class PwiMd extends LitElement {
  static get properties() {
    return {

      /*
       * `md` markdown to render
       */
      md: {
        type: String,
      },

      mdConfig: {
        type: Object
      }
    };
  }

  render() {
    return html `<div class="markdown">${parse(this.md, this.mdConfig)}</div>`;
  }

  // Used by readaloud to read text
  getReadAloud() {
    return this.innerText || 'this field is empty';
  }

  // Note(cg): we want to render value in light dom so that
  // textContent work on parent elements.
  createRenderRoot() {
    return this;
  }
}

export default PwiMd;
customElements.define('pwi-md', PwiMd);
