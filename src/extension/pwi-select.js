import { Select } from '@material/mwc-select';
import TwoWaySelectBinding from './two-way-select-binding.js';
import OverrideTextfield from './override-textfield.js';
import OverrideTextfieldValidityMessage from './override-textfield-validity-message.js';

/**
 * extension of mwc-textfield emiting a value-changed event when
 * value changes
 */
class PwiSelect extends 
  TwoWaySelectBinding(
    OverrideTextfield(
      OverrideTextfieldValidityMessage(
        Select))) {
}

customElements.define('pwi-select', PwiSelect);

export { PwiSelect };
