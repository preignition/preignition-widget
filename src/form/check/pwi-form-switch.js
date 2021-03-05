import { html, css } from 'lit-element';
import PwiCheckBase from './pwi-form-check-base.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

/*
   # Checkbox for form (preignition form engine)

   It renders a checkbox within a pseudo-input field

   @fires checked-changed when status of chekbox changes
 */

class PwiFormSwitch extends PwiCheckBase {
  static get styles() {
    return [super.styles, css `
      pwi-pseudo-input {
        height: 48px;
        display: flex;
      }
    `];
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
        ><pwi-formfield .label="${this.checkboxlabel}">
          <pwi-switch 
            ?checked="${this.checked}"
            @change="${this.onChange}"></pwi-switch>
        </pwi-formfield>
        </pwi-pseudo-input>`;
  }
}

customElements.define('pwi-form-switch', PwiFormSwitch);
