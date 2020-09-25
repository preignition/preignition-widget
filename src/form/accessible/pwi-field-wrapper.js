import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import AccessibleLabel from './accessible-label.js';
import { PwiTextField } from '../../extension/pwi-textfield.js';
// import { PwiAccessibleTextfield } from './accessible/pwi-accessible-textfield.js';
// import { findAssignedElement } from '@material/mwc-base/utils.js';

class PwiPseudoInput extends LitElement {

  render() {
    return html `<slot></slot>`;
  }

  get properties() {
    return {
      validity: {
        type: Boolean
      }
    };
  }

  constructor() {
    super();
    this.value = '';
    this.validity = {
      badInput: false,
      valid: true,
    };
  }
}

// Register the new element with the browser.
customElements.define('pwi-pseudo-input', PwiPseudoInput);

/**
 * a wrapper around form fields like checkbox and radio-buttons
 */

class PwiFieldWrapper extends AccessibleLabel(PwiTextField) {


  static get styles() {
    return [super.styles, css `
    :host {
      width: 100%;
    }

    .mdc-text-field .label-above {
     color: var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6));
    }

    :host(:hover:not([hasfocus]):not([disabled]):not([invalid])) .mdc-text-field .label-above {
     color: var(--mdc-theme-text-primary-on-background);
    }

    :host([hasfocus]) .mdc-text-field .label-above  {
      color: var(--mdc-theme-primary, #6200ee);
    }

    :host([hasfocus]) .mdc-text-field-helper-text, :host([invalid]) .mdc-text-field-helper-text {
      opacity: 1;
    }

    :host([disabled]) .mdc-text-field .label-above  {
       color: var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38));
    }

    :host([invalid]) .mdc-text-field  .label-above {
      color: var(--mdc-theme-error, #b00020);
    }

    :host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--outlined) {
        background-color: initial;
    }

    .mdc-text-field--filled:before {
      display: none;
    }

     .mdc-line-ripple:before {
       opacity: 0;
     }

     :host(:hover) .mdc-line-ripple:before {
       opacity: 1;
     }

    .mdc-text-field {
      height: initial;
      position: relative;
      display: inline-block;
    }
    `];
  }

  static get properties() {
    return {

      ...super.properties,

      hasfocus: {
        type: Boolean,
        reflect: true
      },

       invalid: {
        type: Boolean,
        reflect: true
      },
      disabled: {
        type: Boolean,
        reflect: true
      }
    };
  }

  constructor() {
    super();
    this.labelAbove = true;
    this.addEventListener('focusin', this._onFocusin.bind(this));
    this.addEventListener('focusout', this._onFocusout.bind(this));
  }

  _onFocusout() {
    // console.info('BLUr', this)
    this.hasfocus = false;
    // this.blur();
  }

  _onFocusin() {
    this.hasfocus = true;
    // this.focus();
    // console.info('Focus', this)
  }

  get formElement() {
    return this.renderRoot.querySelector('pwi-pseudo-input');
  }

  get slotEl() {
    return this.renderRoot.querySelector('slot');
  }

  render() {
    const classes = {
      'mdc-text-field--disabled': this.disabled,
      'mdc-text-field--no-label': !this.label,
      'mdc-text-field--filled': !this.outlined,
      'mdc-text-field--outlined': this.outlined,
      'mdc-text-field--with-leading-icon': this.icon,
      'mdc-text-field--with-trailing-icon': this.iconTrailing,
      'mdc-text-field--end-aligned': this.endAligned,
    };
    return html `
      <label class="mdc-text-field ${classMap(classes)}">
        ${this.renderRipple()}
        ${this.outlined ? this.renderOutline() : this.renderLabel()}
        ${this.renderInput()}
        ${this.renderLineRipple()}
      </label>
      ${this.renderHelperText(this.renderCharCounter())}
    `;
  }

  renderInput() {
    return html `
    <pwi-pseudo-input tabindex="0"
      aria-labelledby="label"
      class="mdc-text-field__input">
      <slot></slot>
    </pwi-pseudo-input>`;
  }

  // render() {
  //   return html`
  //     <p>A paragraph</p>
  //   `;
  // }
}

customElements.define('pwi-field-wrapper', PwiFieldWrapper);