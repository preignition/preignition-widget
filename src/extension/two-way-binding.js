/**
 * small mixin to allow Polymer two-way-binding with mwc-textfield and mwc-textarea
 * 
 */

export const TwoWayBinding = (baseElement) => class extends baseElement {
  handleInputChange() {
    super.handleInputChange(...arguments);
    this.dispatchEvent(new CustomEvent('value-changed', { detail: { value: this.value }, bubbles: true, composed: true }));
  }


  // update(changedProperties) {
  //   if (changedProperties.has('value') && this.value === undefined) {
  //     this.value = '';
  //   }
  //   super.update(changedProperties);
  // }
   
  
  // updated(changedProperties) {
  //   const maxLength = changedProperties.get('maxLength');
  //   const maxLengthBecameDefined = maxLength === -1 && this.maxLength !== -1;
  //   const maxLengthBecameUndefined = maxLength !== undefined && maxLength !== -1 && this.maxLength === -1;
  //    We want to recreate the foundation if maxLength changes to defined or
  //    * undefined, because the textfield foundation needs to be instantiated with
  //    * the char counter's foundation, and the char counter's foundation needs
  //    * to have maxLength defined to be instantiated. Additionally, there is no
  //    * exposed API on the MdcTextFieldFoundation to dynamically add a char
  //    * counter foundation, so we must recreate it.
     
  //   if (maxLengthBecameDefined || maxLengthBecameUndefined) {
  //     this.createFoundation();
  //   }
  //   if (changedProperties.has('value')) {
  //     // this.value !== undefined) {
  //     // changedProperties.get('value') !== undefined) {
  //     this.mdcFoundation.setValue(this.value === undefined ? '' : this.value);
  //   }
  // }
};

export default TwoWayBinding;
