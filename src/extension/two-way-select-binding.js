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
    // Note(cg): only notify change if the field is still connected. 
    // Othewise, this can lead to values being changed when the field if removed 
    // For instance: https://gitlab.com/christophe-g/ida-ta/-/issues/383
    if (this.isConnected) {
      this.dispatchEvent(new CustomEvent('value-changed', { detail: { value: this.value }, bubbles: true, composed: true }));
    }
  }
};

export default TwoSelectBinding;
