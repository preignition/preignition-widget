import { html, css } from 'lit-element';
import { PwiAccessibleTextfield } from '../accessible/pwi-accessible-textfield.js';
import { DoNotSetUndefinedValue } from '@preignition/preignition-mixin';
import {getInnerText, Translate as translate} from '@preignition/preignition-util';
import locale from '../readaloud-locale';

class PwiGenericGroup extends DoNotSetUndefinedValue(translate(PwiAccessibleTextfield, locale, 'readaloud')) {
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
      display: var(--pwi-group-pseudo-input-display, block);
      flex-direction: var(--pwi-group-pseudo-input-flex-direction);
    }
    
    :host([one-line-per-option]){
      --pwi-group-pseudo-input-display :flex;
      --pwi-group-pseudo-input-flex-direction: column;
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

      /*
       * `oneLinePerOption` when true, show each option on their own line
       */
      oneLinePerOption: {
        type: Boolean,
        reflect: true,
        attribute: 'one-line-per-option'
      },

    };
  }

  static get isMulti() {
    return false;
  }

  async onChange(e) {
    await this.updateCompleted;
    this.dispatchEvent(new CustomEvent('selected-changed', { detail: { value: this.selected } }));
    this._value = this.selected; // Note(cg): get _value from the actual selection (dom query).
    this.requestUpdate(); // Note(cg): this is required for instance to make please specify field to appear.
  }

  _queryItem(selector) {
    return this.useShadow ?
      this.renderRoot.querySelector(selector) :
      this.querySelector(selector);
  }
  _queryItems(selector) {
    return this.useShadow ?
      this.renderRoot.querySelectorAll(selector) :
      this.querySelectorAll(selector);
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
  getReadAloud(readHelper) {
    const getOptionText = (item) => {
      const parent = item.parentElement;
      // Note(CG): read 'please specify answer'
      return parent.renderRoot.textContent + (parent.nextElementSibling ? (parent.nextElementSibling.value || '') : '');
    }

    return this._selectedItems.length ?
      `${[...this._selectedItems].map(getOptionText)} ${this.getTranslate('isTheAnswerTo')} ${getInnerText(this.label)} ` :
      (getInnerText(this.label) + (readHelper && this.helper ? ('. ' + this.getTranslate('hint') + ': ' + this.helper) + '.' : '') + this.getReadAloudOptions(readHelper));
  }

  getReadAloudOptions(readHelper) {
    const items = this._queryItems('pwi-formfield');
    if (!readHelper && items.length > 5) {
      return this.getTranslate('countOptions', {count: items.length + 1});
    }
    const options = [...items].map((item, index) => `${this.getTranslate('option')} ${index + 1}: ${item.label}.`);
    return this.constructor.isMulti ?
      (`${this.getTranslate('chooseOptions')}: ${options}`) :
      (`${this.getTranslate('chooseOption')}: ${options}`);
  }
}

export { PwiGenericGroup };
