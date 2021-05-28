import { css } from 'lit-element';


/**
 * mixin overrideing som methods not playin well with Polymer
 *
 */

export const OverrideTextfield = (baseElement) => class extends baseElement {
  static get styles() {
    return [super.styles, css`
   
      /* RTL */
      :host-context([dir=rtl]) .mdc-text-field--filled .mdc-floating-label {
        right: 16px;
        left: initial;
      }
      .mdc-text-field--filled .mdc-floating-label:dir(rtl) {
        right: 16px;
        left: initial;
        transform-origin: right;
      }
    `];
  }
  update(changedProperties) {
    if (changedProperties.has('value') && this.value === undefined) {
      this.value = '';
    }
    super.update(changedProperties);
  }
};

export default OverrideTextfield;
