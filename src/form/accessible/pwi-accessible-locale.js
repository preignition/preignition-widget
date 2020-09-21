import { PwiAccessibleTextfield } from './pwi-accessible-textfield.js';
import LocaleInput from './locale-input.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { html, css } from 'lit-element';

class PwiAccessibleLocale extends LocaleInput(PwiAccessibleTextfield) {
  static get styles() {
    return [super.styles, css`
      #validator {
        display: none;
      }
    `];
  }

  render() {
    return html `
     ${super.render()}  
     <input 
       .value="${this.__numValue}" 
       type="number" 
       id="validator" 
       ?required="${this.required}"
       min="${ifDefined(this.min === '' ? undefined : this.min)}"
       max="${ifDefined(this.max === '' ? undefined : this.max)}"></input>
    `;
  }

  constructor() {
    super();
    this.validityTransform = (value, validity) => {
      const val = this.validatorElement.validity;
      const customValidity = {};
      for (const propName in val) {
        customValidity[propName] = val[propName];
      }
      return customValidity;
    };
  }

  get validatorElement() {
    return this.renderRoot.querySelector('#validator');
  }

  // @override text-field-validity-message
  get nativeValidationMessage() {
    return this.validatorElement.validationMessage;
  }

}

customElements.define('pwi-accessible-locale', PwiAccessibleLocale);

export { PwiAccessibleLocale };
