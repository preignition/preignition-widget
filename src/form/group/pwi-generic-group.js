import { html, css } from 'lit-element';
import { PwiAccessibleTextfield } from '../accessible/pwi-accessible-textfield.js';
import { DoNotSetUndefinedValue } from '@preignition/preignition-mixin';
class PwiGenericGroup extends DoNotSetUndefinedValue(PwiAccessibleTextfield) {

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

    :host(:hover:not([focused]):not([disabled]):not([invalid])) .mdc-text-field .label-above {
     color: var(--mdc-theme-text-primary-on-background);
    }

    :host([focused]) .mdc-text-field .label-above  {
      color: var(--mdc-theme-primary, #6200ee);
    }

    :host([focused]) .mdc-text-field-helper-text, :host([invalid]) .mdc-text-field-helper-text {
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

    /* Option container layout  */
    pwi-pseudo-input {
    }
    
    :host(.column) pwi-pseudo-input {
      display:flex;
      flex-direction: column;
    }

    pwi-pseudo-input > div {
      display: inline-flex;
    }
    pwi-pseudo-input  pwi-textfield{
      padding-left: var(--space-medium);
    }

    `];
  }

  static get properties() {
    return {

      ...super.properties,

      focused: {
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

      useShadow: {
        type: Boolean
      },

    };
  }


  async onChange(e) {
    await this.updateCompleted;
    this.dispatchEvent(new CustomEvent('selected-changed', { detail: { value: this.selected } }));
    this._value = this.selected; // Note(cg): get _value from the actual selection (dom query).
    this.requestUpdate(); // Note(cg): this is required for instance to make please precise field to appear.
  }
 
  _queryItem(selector) {
    return this.useShadow ? this.renderRoot.querySelector(selector) : this.querySelector(selector);
  }
  _queryItems(selector) {
    return this.useShadow ? this.renderRoot.querySelectorAll(selector) : this.querySelectorAll(selector);
  }



  constructor() {
    super();
    this.labelAbove = true;
    // Note(cg): we assume to be using shadow-dom by default. .
    // if we have a valid slot element, it will be turned to false
    this.useShadow = true; 
    this.addEventListener('change', this.onChange);
    this.addEventListener('focusin', this._onFocusin);
    this.addEventListener('focusout', this._onFocusout);
  }

  disconnectedCallback() {
    this.removeEventListener('change', this.onChange);
    this.removeEventListener('focusin', this._onFocusin);
    this.removeEventListener('focusout', this._onFocusout);
    this.slotEl && this.slotEl.removeEventListener('slotchange', this._boundSlotChange);
    super.disconnectedCallback();
  }

  _onFocusout() {
    // console.info('focusout', this)
    this.focused = false;
    this.reportValidity();
  }

  _onFocusin() {
    // console.info('focusin', this)
    this.focused = true;
  }

  firstUpdated() {
    this._boundSlotChange = this.onSlotChange.bind(this);
    this.slotEl && this.slotEl.addEventListener('slotchange', this._boundSlotChange);
    super.firstUpdated();
  }

  get _selectedItem() {
    return this._queryItems('[checked]')[0];
  }

  get _selectedItems() {
    return this._queryItems('[checked]');
  }

  get _selectedValue() {
    return this._selectedItem && this._selectedItem.value;
  }

  get _selectedValues() {
    return [...this._selectedItems].map(item => item.value);
  }

  get formElement() {
    // Note(cg): will be overriden.
    return null;
  }

  get slotEl() {
    return this.renderRoot.querySelector('slot');
  }

  onSlotChange(e) {
    this.useShadow = false;
    // console.info('slotchange', this)
    if (this._value !== undefined) {
      this.selected = this._value;
    }
  }

  renderInput() {
    // Note(cg): will be overriden.
    return html `
        <div>This component is not suposed to be used directly</div>
      `;
  }
}

export { PwiGenericGroup };
