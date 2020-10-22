import { TextArea } from '@material/mwc-textarea';
import TwoWayBinding from './two-way-binding.js';
import OverrideTextfield from './override-textfield.js';
import OverrideTextfieldReadonly from './override-textfield-readonly.js';
import {css} from 'lit-element';

/**
 * extenstion of mwc-textfield emiting a value-changed event when
 * value changes
 */
class PwiTextArea extends 
  TwoWayBinding(
    OverrideTextfield(
      OverrideTextfieldReadonly(
        TextArea))) {

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
      },

      /*
       * `resize` {'vertical' | 'horizontal' | 'auto'}
       * apply resize css to text area
       * Should be removed when https://github.com/material-components/material-components-web-components/issues/1305 lands
       */
      resize: {
        type: String,
      }
    };
  }

  updated(props) {
    if (props.has('resize')) {
      this.setResize(this.resize);
    }
    super.updated(props);
  }

  setResize(resize) {
    const style = this.renderRoot.querySelector('textarea').style;
    if (resize) {
      style.resize = resize;
    } else {
      style.resize = null;
    }
  }
}

customElements.define('pwi-textarea', PwiTextArea);

export { PwiTextArea };
