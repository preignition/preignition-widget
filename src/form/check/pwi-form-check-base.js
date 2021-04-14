import { html, css } from 'lit-element';
import { PwiAccessibleTextfield } from '../accessible/pwi-accessible-textfield.js';
import { DoNotSetUndefinedValue } from '@preignition/preignition-mixin';
import {Translate as translate} from '@preignition/preignition-util';
import locale from '../readaloud-locale';

// import { ifDefined } from 'lit-html/directives/if-defined.js';

/*
   # Checkbox for form (preignition form engine)

   It renders a checkbox within a pseudo-input field

   @fires checked-changed when status of chekbox changes
 */

class PwiFormCheckBase extends 
DoNotSetUndefinedValue(
  translate(PwiAccessibleTextfield, locale, 'readaloud')) {
  static get styles() {
    return [super.styles, css `
    :host {
      width: 100%;
    }

    :host(:hover:not([focused]):not([disabled]):not([invalid])) .mdc-text-field .label-above {
     color: var(--mdc-theme-text-primary-on-background);
    }

    /* Option container layout  */
    pwi-pseudo-input:focus {
      outline: none;
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

      /*
       * `checkboxlabel` label of checkbox
       */
      checkboxlabel: {
        type: String,
      },

      /*
       * `checked` status of check box
       */
      checked: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();
    this.labelAbove = true;
    this.addEventListener('focusin', this._onFocusin);
    this.addEventListener('focusout', this._onFocusout);
  }

  disconnectedCallback() {
    this.removeEventListener('focusin', this._onFocusin);
    this.removeEventListener('focusout', this._onFocusout);
    super.disconnectedCallback();
  }

  _onFocusout() {
    // console.info('out')
    this.focused = false;
  }

  _onFocusin() {
    // console.info('in')
    this.focused = true;
  }

  get formElement() {
    return this.renderRoot.querySelector('pwi-pseudo-input');
  }

  onChange(e) {
    // console.info('change', e, e.currentTarget.checked);
    this.checked = e.currentTarget.checked;
    this.dispatchEvent(new CustomEvent('checked-changed', {detail: {value: this.checked}}));
  }

  renderInput() {
    return html `need to be overriden`;
  }

    set value(v) {
      //Note(CG): do nothing, mostly for readalou stuff
    }
    get value() {
      return this.checked ? this.getTranslate('checked') :
       this.checked === false ? this.getTranslate('notChecked') :
       this.getTranslate('undetermined')
    }
}

export default PwiFormCheckBase;
