import {html} from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { live } from 'lit-html/directives/live.js';
import { TextArea } from '@material/mwc-textarea';
import TwoWayBinding from './two-way-binding.js';
import OverrideTextfield from './override-textfield.js';
import OverrideTextfieldReadonly from './override-textfield-readonly.js';
import { css } from 'lit-element';

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

  // Note(cg): override to improve aria support.
  renderInput() {
    const minOrUndef = this.minLength === -1 ? undefined : this.minLength;
    const maxOrUndef = this.maxLength === -1 ? undefined : this.maxLength;
    const autocapitalizeOrUndef = this.autocapitalize ?
      this.autocapitalize :
      undefined;
    const showValidationMessage = this.validationMessage && !this.isUiValid;
    
    return html `
      <textarea
          aria-labelledby="label"
          aria-controls="${ifDefined(this.shouldRenderHelperText ? 'helper-text' : undefined)}"
          aria-describedby="${ifDefined(this.focused || this.helperPersistent || showValidationMessage ?
            'helper-text' :
            undefined)}"
         aria-errormessage="${ifDefined(showValidationMessage ? 'helper-text' : undefined)}"
         aria-invalid="${ifDefined(this.isUiValid ? undefined : 'true')}"
          class="mdc-text-field__input"
          .value="${live(this.value)}"
          rows="${this.rows}"
          cols="${this.cols}"
          ?disabled="${this.disabled}"
          placeholder="${this.placeholder}"
          ?required="${this.required}"
          ?readonly="${this.readOnly}"
          minlength="${ifDefined(minOrUndef)}"
          maxlength="${ifDefined(maxOrUndef)}"
          name="${ifDefined(this.name === '' ? undefined : this.name)}"
          inputmode="${ifDefined(this.inputMode)}"
          autocapitalize="${ifDefined(autocapitalizeOrUndef)}"
          @input="${this.handleInputChange}"
          @blur="${this.onInputBlur}">
      </textarea>`;
  }
}

customElements.define('pwi-textarea', PwiTextArea);

export { PwiTextArea };