/**
 * small mixin to allow Polymer two-way-binding with checked-type
 * fields (switch, radio, checkbox)
 *
 */

export const TwoWayCheckedBinding = (baseElement) => class extends baseElement {
  changeHandler(e) {
    super.changeHandler(...arguments);
    this.dispatchEvent(new CustomEvent('checked-changed', { detail: { value: this.checked }, bubbles: true, composed: true }));
  }
};

export default TwoWayCheckedBinding;
