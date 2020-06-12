import { LitElement, html, css } from 'lit-element';
import { cache } from 'lit-html/directives/cache.js';
import { parse } from '../util/markdown.js';
import { default as styleTypography } from '../style/typography.js';

import '@material/mwc-tab';
import '@material/mwc-tab-bar';
import '@material/mwc-textarea';


/**
 * ## PwiMdEditr
 *
 * `<pwi-md-editor>` is a markdown text editor with a priview tab, similar to gitlab edit
 * 
 * @fires md-changes - eventfired when `md` changes
 * @fires md-paste - event fired when user paste on textarea. User to listed for image copy.
 */
class PwiMdEditor extends LitElement {

  static get styles() {
    return [
    styleTypography,
    css `
    :host {
      display: block;
      width: auto;
      box-sizing: border-box;

      --mdc-tab-horizontal-padding: 12px;
      --mdc-tab-height: var(--pwi-md-editor-tab-height, 1.5rem);
    }

    #container {
      min-height: 10rem;
      display: flex;
    }

    #container > * {
      flex: 1;
    }

    mwc-tab-bar {
      width: fit-content;
      margin-left: 0px;
      margin-right: auto;
      --mdc-typography-button-text-transform: none;
      --mdc-typography-button-letter-spacing: 0px;
    }

    .toolbar {
      color: var(--pwi-md-editor-toolbar-color, var(--secondary-text-color));
      display: flex;
      opacity: 0;
      will-change: opacity;
      transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
      padding-right: 16px;
      padding-left: 16px;
    }

    :host([hasfocus]) .toolbar {
      opacity: 1;
    }

    :host([helper-persistent]) .toolbar {
      opacity: 1;
    }

    .flex {
      flex: 1;
    }

    .toolbar a {
      color: var(--primary-color); 
      text-decoration: none;
    }

    #markdown {
      padding: 0px 16px;
      margin: 8px 0px 1px;
    }

    #markdown img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    
    `];
  }

  static get properties() {

    return {

      ...super.properties,

      hasFocus: {
        reflect: true,
        type: Boolean
      },

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
      },

      /*
       * label appering under write tab
       * @type {String} 'Write'
       */
      writeLabel: {
        type: String,
      },

      /*
       * label appering under preview tab
       * @type {String} 'Preview'
       */
      previewLabel: {
        type: String,
      },

      /**
       * rows to apply to textarea
       * @type {Number}
       */
      rows: {
        type: Number
      },

      /**
       * cols to apply to textarea
       * @type {Number}
       */
      cols: {
        type: Number
      },

      /**
       * textarea helper
       * @type {String}
       */
      helper: {
        type: String
      },

      /*
       * `helperPersistent` true to make helper persistant
       */
      helperPersistent: {
        type: Boolean,
        reflect: true
      },

      /**
       * true to make texarea readonly
       * @type {Boolean}
       */
      readOnly: {
        type: Boolean
      },

      /*
       * `maxLength` 
       */
      maxLength: {
        type: Number,
      },

      /*
       * `maxLength` 
       */
      minLength: {
        type: Number,
      },

      /*
       * `charCounter` 
       */
      charCounter: {
        type: Boolean,
        // attribute: 'char-counter'
      },

      /*
       * `resize` {'vertival' | 'horizontal' | 'auto'}
       * apply resize css to text area
       * Should be removed when https://github.com/material-components/material-components-web-components/issues/1305 lands
       */
      resize: {
        type: String,
      }


    };
  }

  render() {
    return html `
    
       <mwc-tab-bar @MDCTabBar:activated=${e => this._selected = e.detail.index} .activeIndex="${this._selected}" theme="centered">
          <mwc-tab isMinWidthIndicator .label=${this.writeLabel}></mwc-tab>
          <mwc-tab isMinWidthIndicator .label=${this.previewLabel}></mwc-tab>
      </mwc-tab-bar>
      <div id="container"> 
      ${cache(
        this._selected === 0
          ? html`<div>
              <pwi-textarea
                droppable 
                fullwidth
                .ripple=${this.dragoverValid}
                .cols=${this.cols}
                .rows=${this.rows}
                .readOnly=${this.readOnly}
                .value=${this.md} 
                .resize=${this.resize}
                .maxLength=${this.maxLength}
                .minLength=${this.minLength}
                .charCounter=${this.charCounter ? 'internal' : false}
                @input=${this.onValueChanged}
                @focus=${this.onFocus} 
                @blur=${this.onBlur} 
                placeholder=${this.placeholder}></pwi-textarea>
                ${this.renderToolbar()}
             </div>
              `
          : html`<div id="markdown">${parse(this.md)}</div>`
          )}
      </div>
    `;
  }

  renderToolbar() {
    return html `
     <small class="toolbar"><span class="flex">${this.helper} <a tabindex="-1" rel="noopener" href="https://en.wikipedia.org/wiki/Markdown" target="blank">Markdown</a> is supported. </span class="helper"></span></span><slot name="bottomToolbar">${this.renderSlotToolbar()}</slot></small>
    `;
  }

  onFocus(e) {
    this.hasFocus = true;
  }

  onBlur(e) {
    this.hasFocus = false;
  }

  renderSlotToolbar() {
    return '';
  }

  constructor() {
    super();
    this.placeholder = '';
    this.md = '';
    this.helper = '';
    this.minLength = -1;
    this.maxLength = -1;
    this.rows = 5;
    this._selected = 0;
    this.writeLabel = 'Write';
    this.previewLabel = 'Preview';
  }

  get pwitextarea() {
    return this.renderRoot.querySelector('pwi-textarea');
  }

  get textarea() {
    return this.pwitextarea.renderRoot.querySelector('textarea');
  }

  insertAtCaret(text) {
    const txtarea = this.textarea;
    const scrollPos = txtarea.scrollTop;
    let caretPos = txtarea.selectionStart;

    const front = (txtarea.value).substring(0, caretPos);
    const back = (txtarea.value).substring(txtarea.selectionEnd, txtarea.value.length);
    txtarea.value = front + text + back;
    caretPos = caretPos + text.length;
    txtarea.selectionStart = caretPos;
    txtarea.selectionEnd = caretPos;
    txtarea.focus();
    txtarea.scrollTop = scrollPos;
  }

  // onPaste(e) {
  //   console.info('Paste Editor', e);
  //   this.dispatchEvent(new CustomEvent('md-paste', {detail: null, clipboardData: e.clipboardData, bubbles: true, composed: true})); 
  // }

  onValueChanged(e) {
    // console.info('changed', e)
    this.md = e.target.value;
    this.dispatchEvent(new CustomEvent('md-changed', {detail: {value: this.md}, bubbles: true, composed: true})); 
  }
}

// Register the new element with the browser.
customElements.define('pwi-md-editor', PwiMdEditor);

export default PwiMdEditor;
