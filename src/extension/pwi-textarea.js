import { TextArea } from '@material/mwc-textarea';
import TwoWayBinding from './two-way-binding.js';
import TextFieldOverride from './text-field-override.js';
import {css} from 'lit-element';

/**
 * extenstion of mwc-textfield emiting a value-changed event when
 * value changes
 */
class PwiTextArea extends TwoWayBinding(TextFieldOverride(TextArea)) {

  static get styles() {
    return [
      super.styles,
      
      css `
        :host([ripple]) .mdc-text-field {
          background: transparent !important;
        }
      `
    ];
  }

  static get properties() {
    return {
      ...super.properties,

      ripple: {
        type: Boolean,
        reflect: true
      }
    };
  }
}

customElements.define('pwi-textarea', PwiTextArea);

export { PwiTextArea };
