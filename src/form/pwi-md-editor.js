import { LitElement, html, css } from 'lit-element';
import { cache } from 'lit-html/directives/cache.js';
import { parse } from '../util/markdown.js';
import { default as styleTypogrtaphy } from '../style/typography.js';

import '@material/mwc-tab';
import '@material/mwc-tab-bar';
import '@material/mwc-textarea';

/**
 * ## PwiMdEditr
 *
 * `<pwi-md-editor>` is a markdown text editor with a priview tab, similar to gitlab edit
 * 
 * @fires md-changes - evend fired when `md` changes
 */
class PwiMdEditor extends LitElement {

  static get styles() {
    return [
    styleTypogrtaphy,
    css `
    :host {
      display: block;
      width: auto;
      box-sizing: border-box;

      --mdc-tab-horizontal-padding: 12px;
      --mdc-tab-height: var(--pwi-md-editor-tab-height, 1.5rem);
      --mdc-typography-button-text-transform: none;
      --mdc-typography-button-letter-spacing: 0px;
    }

    #container {
      min-height: 10rem;
      display: flex;
    }

    #container > * {
      flex: 1;
    }

    mwc-tab-bar {
      width: 140px;
      margin-left: 0px;
      margin-right: auto;
    }

    .toolbar {
      color: var(--pwi-md-editor-toolbar-color, var(--secondary-text-color));
    }
    .toolbar a {
      color: var(--primary-color); 
      text-decoration: none;
    }

    #markdown {
      padding: 0px 16px;
      margin: 8px 0px 1px;
    }

    `];
  }

  static get properties() {

    return {

      ...super.properties,

      /**
       * mardown text
       * @type {String}
       */
      md: {
        type: String
      },

      /**
       * label for this field
       * @type {Object}
       */
      label: {
        type: String,
      },

      _selected: {
        type: Number
      },

      /**
       * textarea placeholder
       * @type {String}
       */
      placeholder: {
        type: String
      }

    };
  }

  render() {
    return html `
       <mwc-tab-bar @MDCTabBar:activated=${e => this._selected = e.detail.index} .activeIndex="${this._selected}" theme="centered">
          <mwc-tab isMinWidthIndicator label="Write"></mwc-tab>
          <mwc-tab isMinWidthIndicator label="Preview"></mwc-tab>
      </mwc-tab-bar>
      <div id="container"> 
      ${cache(
        this._selected === 0
          ? html`<div><mwc-textarea 
              fullwidth
              .cols=${this.cols}
              .rows=${this.rows}
              .helper=${this.helper}
              .value=${this.md} 
              @input=${this.onValueChanged} 
              placeholder=${this.placeholder}></mwc-textarea>
             <small class="toolbar"><a tabindex="-1" rel="noopener" href="https://en.wikipedia.org/wiki/Markdown" target="blank">Markdown</a> is supported.</small>
             </div>
              `
          : html`<div id="markdown">${parse(this.md)}</div>`
          )}
      </div>
    `;
  }

  constructor() {
    super();
    this.placeholder = '';
    this.md = '';
    this.helper = '';
    this.rows = 5;
    this._selected = 0;
  }

  onValueChanged(e) {
    console.info('changed', e)
    this.md = e.target.value;
    this.dispatchEvent(new CustomEvent('md-changed', {detail: {value: this.md}, bubbles: true, composed: true})); 
  }
}

// Register the new element with the browser.
customElements.define('pwi-md-editor', PwiMdEditor);
