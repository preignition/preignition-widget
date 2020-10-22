import { html, css } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { live } from 'lit-html/directives/live.js';

/**
 * mixin overriding how mdc-textfiel. Add a11y.
 *
 * Related issue:
 * https://github.com/material-components/material-components-web-components/issues/1882
 *
 */

export const OverrideTextFielda11y = (baseElement) => class extends baseElement {

  static get styles() {
    return [super.styles, css `
    :host([readonly]) {
      --mdc-theme-primary: var(--disabled-text-color, rgba(0, 0, 0, 0.6));
    }
    `];
  }

  static get properties() {
    return {
      ...super.properties,

      readonly: {
        type: String,
        reflect: true
      }
    };
  }

  updated(props) {
    if (props.has('readonly')) {
      this.readOnly = this.readonly;
    }
    super.updated(props);
  }
  renderInput() {
    const minOrUndef = this.minLength === -1 ? undefined : this.minLength;
    const maxOrUndef = this.maxLength === -1 ? undefined : this.maxLength;
    const autocapitalizeOrUndef = this.autocapitalize ?
      this.autocapitalize :
      undefined;
    // TODO: live() directive needs casting for lit-analyzer
    // https://github.com/runem/lit-analyzer/pull/91/files
    // TODO: lit-analyzer labels min/max as (number|string) instead of string
    return html `
      <input
          aria-labelledby="label"
          class="mdc-text-field__input"
          type="${this.type}"
          .value="${live(this.value)}"
          ?disabled="${this.disabled}"
          placeholder="${this.placeholder}"
          ?required="${this.required}"
          ?readonly="${this.readOnly}"
          minlength="${ifDefined(minOrUndef)}"
          maxlength="${ifDefined(maxOrUndef)}"
          pattern="${ifDefined(this.pattern ? this.pattern : undefined)}"
          min="${ifDefined(this.min === '' ? undefined : this.min)}"
          max="${ifDefined(this.max === '' ? undefined : this.max)}"
          step="${ifDefined(this.step === null ? undefined : this.step)}"
          size="${ifDefined(this.size === null ? undefined : this.size)}"
          name="${ifDefined(this.name === '' ? undefined : this.name)}"
          inputmode="${ifDefined(this.inputMode)}"
          autocapitalize="${ifDefined(autocapitalizeOrUndef)}"
          @input="${this.handleInputChange}"
          @blur="${this.onInputBlur}">`;
  }



};

export default OverrideTextFielda11y;
