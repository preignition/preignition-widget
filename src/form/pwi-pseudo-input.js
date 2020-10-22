import { LitElement} from 'lit-element';

class PwiPseudoInput extends LitElement {

  createRenderRoot() {
    return this;
    // return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  get properties() {
    return {
      validity: {
        type: Boolean
      }
    };
  }


  constructor() {
    super();
    this.value = '';
    this.validity = {
      badInput: false,
      valid: true,
    };
  }
}

// Register the new element with the browser.
customElements.define('pwi-pseudo-input', PwiPseudoInput);

