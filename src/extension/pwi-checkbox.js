import { Checkbox } from '@material/mwc-checkbox';
// import TwoWayCheckedBinding from './two-way-checked-binding.js';

/**
 * extention of mwc-switch emiting a value-changed event when
 * value changes
 */
class PwiCheckbox extends Checkbox {
  
  // Note(cg): checkbox has _changehandler (unlike switch and radio).
  _changeHandler(e) {
    super._changeHandler(...arguments);
    this.dispatchEvent(new CustomEvent('checked-changed', { detail: { value: this.checked }, bubbles: true, composed: true }));
  }  

}

customElements.define('pwi-checkbox', PwiCheckbox);

export { PwiCheckbox };
