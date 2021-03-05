/**
 * mixin overriding how mdc-textfiel handle validation message
 * It gets native input validation message when
 * no default validatationMessage is set.
 *
 * Related issue:
 * https://github.com/material-components/material-components-web-components/issues/971
 *
 */

export const OverrideTextfielValidityMessage = (baseElement) => class extends baseElement {
  firstUpdated(props) {
    if (this.validationMessage) {
      this._initialValidationMessage = this.validationMessage;
    }
    super.firstUpdated(props);
  }

  reportValidity() {
    const isValid = super.reportValidity();
    // Note(cg): override validationMessage only if no initial message set.
    if (!this._initialValidationMessage && !isValid) {
      this.validationMessage = (this._validity && this._validity.customError) || this.nativeValidationMessage;
    }
    return isValid;
  }

  get nativeValidationMessage() {
    return this.formElement.validationMessage;
  }
};

export default OverrideTextfielValidityMessage;
