import { css } from 'lit-element';

/**
 * mixin overriding how mdc-textfiel handle readonly
 * 
 * 
 * Related issue:
 * https://github.com/material-components/material-components-web-components/issues/1882
 *
 */

export const OverrideTextfielReadonly = (baseElement) => class extends baseElement {

  static get styles() {
    return [super.styles, css`
    :host([readonly]) {
      --mdc-theme-primary: var(--disabled-text-color, rgba(0, 0, 0, 0.6));
    }
    `];
  }

  static get properties() {
    return {
      ...super.properties,

      readonly: {
        type: Boolean,
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

};

export default OverrideTextfielReadonly;
