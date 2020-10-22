import { TextField } from '@material/mwc-textfield';
import TwoWayBinding from './two-way-binding.js';
import OverrideTextfield from './override-textfield.js';
import OverrideTextfieldValidityMessage from './override-textfield-validity-message.js';
import OverrideTextfieldReadonly from './override-textfield-readonly.js';

/**
 * extension of mwc-textfield emiting a value-changed event when
 * value changes
 */
class PwiTextField extends
  TwoWayBinding(
    OverrideTextfield(
        OverrideTextfieldValidityMessage(
          OverrideTextfieldReadonly(
            TextField)))) {
}

customElements.define('pwi-textfield', PwiTextField);

export { PwiTextField };
