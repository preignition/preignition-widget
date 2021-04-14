import { html } from 'lit-element';
import { PwiGenericGroup } from './pwi-generic-group.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import '../pwi-pseudo-input.js';
import '../../extension/pwi-formfield';
import '@material/mwc-formfield';
import '@material/mwc-checkbox';

class PwiCheckboxGroup extends PwiGenericGroup {
  static get properties() {
    return {
      ...super.properties,

      /*
       * `options` the options to render
       */
      options: {
        type: Array,
      },

      /*
       * `name` name for radio
       */
      name: {
        type: String,
      },

      // Note(cg): an array containing all values.
      selected: {
        type: Array
      },

      // Note(cg): object containg values of 'plese specify fields'.
      specify: {
        type: Object
      }

    };
  }

  static get isMulti() {
    return true;
  }

  set selected(value) {
    const old = this._value;
    [...this._queryItems(['mwc-checkbox'])].forEach(check => check.checked = (value || []).indexOf(check.value) > -1);
    this._value = value;
    this.requestUpdate('selected', old);
  }

  get selected() {
    return this._selectedValues;
  }

  isCodeSelected(value, code) {
    return (value || []).indexOf(code + '') > -1;
  }


  get formElement() {
    return this.renderRoot.querySelector('pwi-pseudo-input');
  }

  constructor() {
    super();
    this.specify = {};
    // Note(cg): see. https://github.com/material-components/material-components-web-components/tree/master/packages/textfield
    this.validityTransform = (value, validity) => {
      value = this.selected;
      if (this.required && (!value || value.length === 0)) {
        validity.valid = false;
        validity.valueMissing = true;
        validity.customError = 'this field is required';
        return validity;
      }
      return validity;
    };
    // this.options = options;
    // this.name = '__';
  }

  renderInput() {
    const showValidationMessage = this.validationMessage && !this.isUiValid;
    return html `
      <pwi-pseudo-input
        part="pwi-group-container"
        role="group"
        aria-invalid="${ifDefined(showValidationMessage ? 'true' : undefined)}"
        aria-errormessage="${ifDefined(showValidationMessage ? 'helper-text' : undefined)}"
        aria-labelledby="label"
        aria-describedby="${
        ifDefined(
            this.focused || this.helperPersistent || showValidationMessage ?
                'helper-text' :
                undefined)}"
        >${
          (this.options || []).map((option, index) => html`
            <div><pwi-formfield label="${option.label}">
              <pwi-checkbox 
                value="${option.code}" 
                ?checked="${this.isCodeSelected(this._value, option.code)}"
                ?disabled="${this.disabled || this.readonly || option.disabled}"
                aria-controls=${ifDefined(option.specify ? `specify${index}` : undefined)} 
                ></pwi-checkbox>
            </pwi-formfield>${this.renderSpecify(option, index)}</div>`)
        }<slot></slot></pwi-pseudo-input>
      `;
  }

  renderSpecify(option, index) {
    const code = option.code || index;
    return (option.specify === true) &&
      (this.isCodeSelected(this._value, code)) ?
      html `<pwi-textfield 
          id="specify${index}" 
          class="specify"
          .label="${option.specifyLabel || this.translate('pleaseSpecify')}" 
          @value-changed="${e => {this.specify[code] = e.detail.value; this.onSpecifyChange();}}" 
          .value="${this.specify[code]}"></pwi-textfield>` :
      '';
  }

  onSpecifyChange() {
    // Note(cg): we need specify as a new Object, otherwise change is not notified upstream
    // with Polymer.
    this.specify = Object.assign({}, this.specify);
    this.dispatchEvent(new CustomEvent('specify-changed', { detail: { value: this.specify } }));
  }
}

customElements.define('pwi-checkbox-group', PwiCheckboxGroup);
