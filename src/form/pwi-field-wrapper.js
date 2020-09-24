import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { PwiAccessibleTextfield } from './accessible/pwi-accessible-textfield.js';

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

class PwiFieldWrapper extends PwiAccessibleTextfield {


  static get styles() {
    return [super.styles, css`
    :host {
      width: 100%;
    }

    .mdc-text-field {
      height: initial;
      position: relative;
      display: inline-block;
    }
    `];
  }

  constructor() {
    super();
    this.labelAbove = true; 
  }

  get formElement() {
    return this.renderRoot.querySelector('pwi-pseudo-input');
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