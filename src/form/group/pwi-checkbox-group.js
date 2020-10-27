import { html, css } from 'lit-element';
import { PwiGenericGroup } from './pwi-generic-group.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import '../pwi-pseudo-input.js';
import '@material/mwc-formfield';
import '@material/mwc-checkbox';

// const options = [{ code: 1, label: 'first option', precise: true }, { code: 2, label: 'second option' }, { code: 3, label: 'last' }];

class PwiCheckboxGroup extends PwiGenericGroup {

  // static get _styles() {
  //   return css `
  //   :host {
  //     display: block;
  //   }
  //   `;
  // }

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

      // Note(cg): object containg values of 'plese precise fields'.
      precise: {
        type: Object
      }

    };
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

  // get _selectedValue() {
  //   return [...this._selectedItems].map(item => item.value);
  // }

  get formElement() {
    return this.renderRoot.querySelector('pwi-pseudo-input');
  }

  constructor() {
    super();
    this.precise = {};
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
                aria-controls=${ifDefined(option.precise ? `precise${index}` : undefined)} 
                ></pwi-checkbox>
            </pwi-formfield>${this.renderPrecise(option, index)}</div>`)
        }<slot></slot></pwi-pseudo-input>
      `;
  }

  renderPrecise(option, index) {
    const code = option.code || index;
    return (option.precise === true) && (this.isCodeSelected(this._value, code)) ?
      html `<pwi-textfield 
          id="precise${index}" 
          class="precise"
          label="${option.preciseLabel || 'please precise'}" 
          @value-changed="${e => {this.precise[code] = e.detail.value; this.onPreciseChange();}}" 
          .value="${this.precise[code]}"></pwi-textfield>` :
      '';
  }

  onPreciseChange() {
    // console.info('precise change: ', this.precise);
    
    // Note(cg): we need precise as a new Object, otherwise change is not notified upstream
    // with Polymer.
    this.precise = Object.assign({}, this.precise);
    this.dispatchEvent(new CustomEvent('precise-changed', { detail: {value: this.precise}}));
  }

}

customElements.define('pwi-checkbox-group', PwiCheckboxGroup);
