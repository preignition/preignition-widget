import { LitElement, html } from 'lit-element';
import { parse } from '@preignition/preignition-util';
import { classMap } from 'lit-html/directives/class-map.js';
import {accessibilityState, observeState} from '@preignition/preignition-state';

class PwiMd extends observeState(LitElement) {
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
    const classes = {
      issignlanguage: accessibilityState.signlanguage,
      isreadaloud: accessibilityState.readaloud,
      iseasyread: accessibilityState.easyread
    };
    return html `<div class="markdown ${classMap(classes)}">${parse(this.md, this.mdConfig)}</div>`;
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
