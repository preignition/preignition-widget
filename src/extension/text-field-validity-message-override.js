/**
 * mixin overrideing how mdc-textfiel handle validation message
 * It gets native input validation message when 
 * no default validatationMessage is set.
 * 
 * Related issue: 
 * https://github.com/material-components/material-components-web-components/issues/971
 * 
 */

export const TextFielValidityMessagedOverride = (baseElement) => class extends baseElement {

  firstUpdated() {
    if (this.validationMessage) {
      this._initialValidationMessage = this.validationMessage;
    }
    super.firstUpdated();
  }

  reportValidity() {
    const isValid = super.reportValidity();
    // Note(cg): override validationMessage only if no initial message set.
    if (!this._initialValidationMessage && !isValid) {
      this.validationMessage = this.nativeValidationMessage;
    }
    return isValid;
  }

  get nativeValidationMessage() {
    return this.formElement.validationMessage;
  }
};

export default TextFielValidityMessagedOverride;
