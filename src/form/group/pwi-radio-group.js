import { html } from 'lit-element';
import { PwiGenericGroup } from './pwi-generic-group.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import '../pwi-pseudo-input.js';
import '../../extension/pwi-formfield';
import '@material/mwc-formfield';
import '@material/mwc-radio';

import locale from './pwi-radio-group-locale.js';
import { Translate } from '@preignition/preignition-util';
// const options = [{ code: 1, label: 'first option', specify: true }, { code: 2, label: 'second option' }, { code: 3, label: 'last' }];

class PwiRadioGroup extends Translate(PwiGenericGroup, locale) {
  static get isMulti() {
    return false;
  }

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

      selected: {
        type: String
      },

      // Note(cg): object containg values of 'plese specify fields'.
      specify: {
        type: String
      }


    };
  }

  set selected(value) {
    // const old = this._value;
    this._value = value;
    const selectedItem = this._queryItem(`[value="${value}"]`);
    if (selectedItem) {selectedItem.checked = true;}

    this.requestUpdate();
  }

  get selected() {
    return this._selectedValue;
  }

  get formElement() {
    return this.renderRoot.querySelector('pwi-pseudo-input');
  }

  constructor() {
    super();
    // this.options = options;
    this.name = '__';
    // Note(cg): see. https://github.com/material-components/material-components-web-components/tree/master/packages/textfield
    this.validityTransform = (value, validity) => {
      value = this.selected;
      if (this.required && (value === '' || value === undefined)) {
        validity.valid = false;
        validity.valueMissing = true;
        validity.customError = 'this field is required';
        return validity;
      }
      return validity;
    };
  }

  renderInput() {
    const showValidationMessage = this.validationMessage && !this.isUiValid;
    return html `
      <pwi-pseudo-input
        part="pwi-group-container"
        role="radiogroup"
        aria-labelledby="label"
        aria-invalid="${ifDefined(showValidationMessage ? 'true' : undefined)}"
        aria-errormessage="${ifDefined(showValidationMessage ? 'helper-text' : undefined)}"
        aria-describedby="${
        ifDefined(
            this.focused || this.helperPersistent || showValidationMessage ?
                'helper-text' :
                undefined)}"
        >${
          (this.options || []).map((option, index) => html`
            <div><pwi-formfield label="${option.label}">
              <pwi-radio 
                name="${option.name || this.name}" 
                value="${option.code}" 
                ?checked="${option.code + '' === this._value}"
                ?disabled="${this.disabled || this.readonly || option.disabled}"
                aria-controls=${ifDefined(option.specify ? `specify${index}` : undefined)} 
                ></pwi-radio>
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
          @value-changed="${e => {this.specify = e.detail.value; this.onSpecifyChange();}}" 
          .value="${this.specify}"></pwi-textfield>` :
      '';
  }

  isCodeSelected(value, code) {
    return value === code + '';
  }

  onSpecifyChange() {
    // console.info('specify change: ', this.specify);
    this.dispatchEvent(new CustomEvent('specify-changed', { detail: { value: this.specify } }));
  }
}

customElements.define('pwi-radio-group', PwiRadioGroup);
