import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import AccessibleLabel from './accessible-label.js';
import { PwiTextField } from '../../extension/pwi-textfield.js';

import '../pwi-pseudo-input.js';


/**
 * a wrapper around form fields like checkbox and radio-buttons
 * It is also used for displayinga label and show other fields, 
 * e.g. in the context of recursive form section
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
    
    .mdc-text-field__input {
      display: block;
      height: unset;
      padding-bottom: var(--space-x-small);
      padding-top: var(--space-x-small);
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
       opacity: 0.2;
     }

    .mdc-text-field {
      height: initial;
      position: relative;
      display: inline-block;
    }

    
    /* RECURSIVE */
    :host([is-recursive]) .mdc-text-field {
      padding-right: 0;
    }
    
    :host([is-recursive]) #label {
      margin-left: -16px;
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
      },
      /*
       * `isRecursive` true to indicate that field-wrapper is used in a recursive context
       * - hover style should not apply
       */
      isRecursive: {
        type: Boolean,
        attribute: 'is-recursive',
        reflect: true
      },



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

  updated(props) {
    if (props.has('label') && this.label) {
      this.addLightDom('label');
    }
    if (props.has('helper') && this.helper) {
      this.addLightDom('helper');
    }
  }

 addLightDom(id) {
   let el = this[id + '__'] || this.querySelector('#' + id);
   if (!el) {
     el = document.createElement('span');
     el.id = id;
     el.style.display = 'none';
     this[id + '__'] = el;
     this.appendChild(el);
   }
   el.innerText = this[id];
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
        ${this.isRecursive ? nothing : this.renderRipple() }
        ${this.outlined ? this.renderOutline() : this.renderLabel()}
        ${this.renderInput()}
        ${this.renderLineRipple()}
      </label>
      ${this.renderHelperText(this.renderCharCounter())}
    `;
  }

  renderInput() {
    return html `
    <pwi-pseudo-input 
      tabindex="${ifDefined(this.isRecursive || this.label ? '0' : undefined)}"
      role="group"
      aria-labelledby="label"
      aria-controls="helper"
      aria-describedby="helper"
      aria-errormessage="helper"
      aria-invalid="${ifDefined(this.isUiValid ? undefined : 'true')}"
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