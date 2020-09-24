/**
 * small mixin to allow Polymer two-way-binding with mwc-se;ect
 * 
 */

export const TwoSelectBinding = (baseElement) => class extends baseElement {
  constructor() {
    super();
    this.addEventListener('change', e => {
      this.dispatchValueChanged();
    });
  }

  dispatchValueChanged() {
    this.dispatchEvent(new CustomEvent('value-changed', { detail: { value: this.value }, bubbles: true, composed: true }));
  }
};

export default TwoSelectBinding;
