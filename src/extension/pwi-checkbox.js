import { Checkbox } from '@material/mwc-checkbox';
import OverrideCheckboxAriaChecked from './override-checkbox-aria-checked.js' 
// import TwoWayCheckedBinding from './`t`wo-way-checked-binding.js';

/**
 * extention of mwc-switch emiting a value-changed event when
 * value changes
 */
class PwiCheckbox extends OverrideCheckboxAriaChecked(Checkbox) {
  
  // Note(cg): checkbox has _changehandler (unlike switch and radio).
  _changeHandler(e) {
    super._changeHandler(...arguments);
    this.dispatchEvent(new CustomEvent('checked-changed', { detail: { value: this.checked }, bubbles: true, composed: true }));
  }

}

customElements.define('pwi-checkbox', PwiCheckbox);

export { PwiCheckbox };
