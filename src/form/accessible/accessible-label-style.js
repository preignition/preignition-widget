import { css } from 'lit-element';

export default css`
     /* By default, occupy all width*/
     :host {
       width: 100%;
     }  
    
     :host([label-above]) .mdc-text-field {
       flex-direction: column;
     }  
     :host([label-above]) input.mdc-text-field__input {
       padding: 1px 0px 4px;
     }

    :host([label-above]) .mdc-text-field--filled::before {
      height: 0;
    }
    
    :host([label-above]) .mdc-text-field .label-above {
     color: var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6));
    }

    :host([label-above]:hover) .mdc-text-field:not(.mdc-text-field--focused):not(.mdc-text-field--disabled):not(.mdc-text-field--invalid) .label-above {
     color: var(--mdc-theme-text-primary-on-background);
    }

    :host([label-above]) .mdc-text-field--focused .label-above {
      color: var(--mdc-theme-primary, #6200ee);
    }

    :host([label-above]) .mdc-text-field--disabled .label-above {
       color: var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38));
    }

    :host([label-above]) .mdc-text-field--invalid .label-above {
      color: var(--mdc-theme-error, #b00020);
    }

    :host([label-above]) .mdc-text-field--filled {
      height: unset;
    }

    /* TEXTAREA */
    :host([label-above]) .mdc-text-field--textarea .label-above {
       padding-right: 16px;
       padding-left: 16px;
       align-self: baseline;
     }

    :host([label-above]) .mdc-text-field--textarea.mdc-text-field--filled .mdc-text-field__input {
      margin-top: 9px;
    }

    /* ICON */
    :host([label-above]) .mdc-text-field--with-leading-icon .label-above {
      margin-left: 36px;
    }
    :host([label-above]) .mdc-text-field--with-leading-icon .mdc-text-field__icon--leading {
      left: -10px;
      top: 7px;
    }

    /* PREFIX - NOT YET WORKING */
    :host([label-above]) .mdc-text-field__affix {
      opacity: 0;
      position: absolute;
    }
}

`;

