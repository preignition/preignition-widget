import { LitElement, html, css } from 'lit-element';

const callback = (mutation, observer) => {
  mutation[0].target.dispatchEvent(new CustomEvent('content-observer-inner-change', { bubbles: true, composed: true }));
};
const contentObserver = new MutationObserver(callback);


/**
 * ## PwiContentObserver
 *
 * `<pwi-content-observer>` brings slottted text content and exposes it on content properties
 *
 * @fires content-changed - eventfired when slotted content changes
 * @slot - default slot
 */
class PwiContentObserver extends LitElement {
  static get properties() {
    return {

      ...super.properties,

      /*
       * title for the panel
       */
      content: {
        type: String,
      }
    };
  }

  render() {
    return html `<slot></slot>`;
  }

  constructor() {
    super();
    this.addEventListener('content-observer-inner-change', this.onContentChange);
  }

  disconnectedCallback() {
    this._observer && this._observer.disconnect();
    super.disconnectedCallback();
  }

  firstUpdated() {
    super.firstUpdated();
    this.onContentChange();
    this.content = this.innerText;
    this._observer = contentObserver.observe(this, { characterData: true, subtree: true, childList: true });
  }

  onContentChange(e) {
    e && e.stopPropagation();
    this.content = this.innerText;
    this.dispatchEvent(new CustomEvent('content-changed', { detail: {value: this.content}, bubbles: true, composed: true }));
  }
}

// Register the new element with the browser.
customElements.define('pwi-content-observer', PwiContentObserver);


