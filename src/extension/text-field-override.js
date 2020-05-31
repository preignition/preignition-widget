import { html } from 'lit-element';

/**
 * mixin overrideing som methods not playin well with Polymer
 * 
 */


export const TextFieldOverride = (baseElement) => class extends baseElement {
 
   // Note(cg): override because of  https://github.com/material-components/material-components-web-components/issues/1377.
  renderCharCounter() {
    if (!this.charCounterVisible) {
        return undefined;
    }
    const length = Math.min(this.value && this.value.length || 0, this.maxLength);
    return html `<span class="mdc-text-field-character-counter">${length} / ${this.maxLength}</span>`;
  }
};

export default TextFieldOverride;
