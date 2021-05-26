import { html } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
/**
 * mixin overriding how mdc-textfiel handle icons
 *
 *
 * Related issue:
 * https://github.com/material-components/material-components-web-components/issues/2447
 *
 */

export const OverrideTextfielReadonly = (baseElement) => class extends baseElement {
  renderIcon(icon, isTrailingIcon) {
    const classes = {
      'mdc-text-field__icon--leading': !isTrailingIcon,
      'mdc-text-field__icon--trailing': isTrailingIcon
    };

    return html`<i class="material-icons mdc-text-field__icon ${classMap(classes)}" tabindex="0">${icon}</i>`;
  }
};

export default OverrideTextfielReadonly;
