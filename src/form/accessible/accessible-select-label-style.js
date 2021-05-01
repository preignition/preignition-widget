import { css } from 'lit-element';

export default css`
     /* By default, occupy all width*/
     :host([label-above]) {
       width: 100%;
       /* display: inline-flex; */
     }

     :host([label-above]) .mdc-select__anchor {
       flex-direction: column;
       overflow: visible; /* this is to allow tooltip */
     }

     :host([label-above]) .mdc-select__ripple {
       overflow: hidden; /* this is to allow tooltip */
     }

     :host([label-above]) span.mdc-select__selected-text {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: inline-block;
     }

     :host([label-above]) .mdc-select__selected-text-container {
       height: 33px;
       width: calc(100% - 48px); /*to avoid overflow */
       overflow-x: hidden;
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
       min-height: 56px;
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
     .mdc-text-field--filled .mdc-floating-label:dir(rtl) {
       right: 40px;
       left: initial;
     }


`;

