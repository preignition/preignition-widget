import { LitElement } from 'lit-element';

const validity = {
  badInput: false,
  valid: true,
};

class PwiPseudoInput extends LitElement {
  createRenderRoot() {
    return this;
    // return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  get properties() {
    return {
      validity: {
        type: Boolean
      },
    };
  }


  constructor() {
    super();
    this.value = '';
    this.validity = validity;
  }

  // // Note(cg): see. https://github.com/material-components/material-components-web-components/tree/master/packages/textfield
  // validityTransform(value, validity) {
  //   if (this.required && (value === '' || value === undefined)) {
  //     validity.valid = false;
  //     validity.valuMissing = true;
  //     return validity;
  //   }
  //   Object.assign({}, initValidity);
  // }
}

// Register the new element with the browser.
customElements.define('pwi-pseudo-input', PwiPseudoInput);
