import { LitElement, html, css } from 'lit-element';
import tooltip from '../style/tooltip.js';
import '@material/mwc-icon-button';

/**
 * An element that copies slotted text a text to clipboard.
 *
 * @fires content-copy - fired before copy. preventDefault to cancel copy
 * @fires content-copied  - after successful copy
 * @fires content-copied-error  - there was a problem
 *
 */
class PwiCopy extends LitElement {
  static get styles() {
    return [tooltip, css `
    :host {
    }
    mwc-icon-button {
      vertical-align: middle;
    }
    `];
  }

  static get properties() {
    return {

      _icon: {
        type: String
      },

      /*
       * `content` content to be copied.
       * If empty, will take textContent of slot.
       */
      content: {
        type: String,
      },

    };
  }

  render() {
    return html `
      <slot id="copy"></slot><mwc-icon-button part="button" data-title="Copy to clipboard" @click="${this.copy}" icon="${this._icon}" label="copy to clipboard"></mwc-icon-button>
    `;
  }

  constructor() {
    super();
    this._icon = 'content_copy';
  }

  _reset() {
    setTimeout(() => {
      this._icon = 'content_copy';
    }, 2000);
  }

  copy(e) {
    if (this.dispatchEvent(new CustomEvent('content-copy', { bubbles: true, composed: true}))) {
      const content = this.content ? [this.content] : this.renderRoot.querySelector('slot').assignedNodes().map(getContent);

      return copyText(content.join('\n'))
        .then(() => {
          this._icon = 'done';
          this._reset();
          this.dispatchEvent(new CustomEvent('content-copied', {detail: content, bubbles: true, composed: true}));
        })
        .catch(e => {
          this._icon = 'error';
          this._reset();
          this.dispatchEvent(new CustomEvent('content-copied-error', {detail: e, bubbles: true, composed: true}));
        });
      }
    }
}

function getContent(node) {
  if (node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement) {
    return node.value;
  } else if (node instanceof HTMLAnchorElement && node.hasAttribute('href')) {
    return node.href;
  } else {
    return node.textContent;
  }
}

function copyNode(node) {
  if ('clipboard' in navigator) {
    return navigator.clipboard.writeText(node.textContent);
  }

  const selection = getSelection();

  if (selection == null) {
    return Promise.reject(new Error());
  }

  selection.removeAllRanges();
  const range = document.createRange();
  range.selectNodeContents(node);
  selection.addRange(range);
  document.execCommand('copy');
  selection.removeAllRanges();
  return Promise.resolve();
}

function copyText(text) {
  if ('clipboard' in navigator) {
    return navigator.clipboard.writeText(text);
  }

  const body = document.body;

  if (!body) {
    return Promise.reject(new Error());
  }

  const node = createNode(text);
  body.appendChild(node);
  copyNode(node);
  body.removeChild(node);
  return Promise.resolve();
}

function createNode(text) {
  const node = document.createElement('pre');
  node.style.width = '1px';
  node.style.height = '1px';
  node.style.position = 'fixed';
  node.style.top = '5px';
  node.textContent = text;
  return node;
}


// Register the new element with the browser.
customElements.define('pwi-copy', PwiCopy);
