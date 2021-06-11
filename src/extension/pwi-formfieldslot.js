import { PwiForm } from './pwi-formfield';
import {  html } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

/**
 * extenstion of pwi-form-field to allow slotted label
 * for instance to have rich-text label
 * arial label MUST be set in addition as text
 */
class PwiFormSlot extends PwiForm {
  render() {
    const classes = {
        'mdc-form-field--align-end': this.alignEnd,
        'mdc-form-field--space-between': this.spaceBetween,
        'mdc-form-field--nowrap': this.nowrap
    };
    return html `
  <div class="mdc-form-field ${classMap(classes)}">
    <slot></slot>
    <label class="mdc-label"
           @click="${this._labelClick}"><slot name="label">${this.label}</slot></label>
  </div>`;
}
}

customElements.define('pwi-formfieldslot', PwiFormSlot);

export { PwiFormSlot };
