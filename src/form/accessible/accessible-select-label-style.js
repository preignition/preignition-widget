import { css } from 'lit-element';

export default css`
     /* By default, occupy all width*/
     :host([label-above]) {
       width: 100%;
     }

     :host([label-above]) .mdc-select__anchor {
       flex-direction: column;
     }

     :host([label-above]) span.mdc-select__selected-text {
       margin: 2px 0px 4px;
     }

     :host([label-above]) .mdc-select__selected-text-container {
       margin-bottom: 4px;
       margin-top: 1px;
     }

     :host([label-above]) .mdc-select--filled .mdc-select__anchor::before {
       height: 0;
       display: none;
     }

     :host([label-above]) .mdc-select .label-above {
       margin-right: 40px;
     }

     :host([label-above]) .mdc-select .label-above {
       color: var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6));
     }

     :host([label-above]:hover) .mdc-select:not(.mdc-select--focused):not(.mdc-select--disabled):not(.mdc-select--invalid) .label-above {
       color: var(--mdc-theme-text-primary-on-background);
     }

     :host([label-above]) .mdc-select--focused .label-above {
       color: var(--mdc-theme-primary, #6200ee);
     }

     :host([label-above]) .mdc-select--disabled .label-above {
       color: var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38));
     }

     :host([label-above]) .mdc-select--invalid .label-above {
       color: var(--mdc-theme-error, #b00020);
     }

     :host([label-above]) .mdc-select--filled .mdc-select__anchor {
       height: unset;
     }

     :host([label-above]) .mdc-select__dropdown-icon {
       position: absolute;
       right: 0px;
       bottom: 15px;
     }

     /* ICON */
     :host([label-above]) .mdc-select--with-leading-icon .label-above {
       margin-left: 36px;
     }

     :host([label-above]) .mdc-select--with-leading-icon .mdc-text-field__icon--leading {
       left: -10px;
       top: 7px;
     }

     /* PREFIX - NOT YET WORKING */

     /* RTL */
     :host-context([dir=rtl]) .mdc-select--filled .mdc-floating-label {
       right: 40px;
       left: initial;
     }

     :host-context([dir=rtl]) .mdc-select__selected-text-container {
       margin-right: 40px;
     }

     :host-context([dir=rtl]) .mdc-select__dropdown-icon {
       position: absolute;
       right: 0px;
       bottom: 15px;
     }

     .mdc-text-field--filled .mdc-floating-label:dir(rtl) {
       right: 40px;
       left: initial;
     }

     .mdc-select__selected-text-container:dir(rtl) {
       margin-right: 40px;
     }

     .mdc-select__dropdown-icon:dir(rtl) {
       position: absolute;
       right: 0px;
       bottom: 15px;
     }


`;

