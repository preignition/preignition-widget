/**
 * mixin overrideing som methods not playin well with Polymer
 * 
 */

export const TextFieldOverride = (baseElement) => class extends baseElement {

  update(changedProperties) {
    if (changedProperties.has('value') && this.value === undefined) {
      this.value = '';
    }
    super.update(changedProperties);
  }
};

export default TextFieldOverride;
