import { Select } from '@material/mwc-select';
import TwoWaySelectBinding from './two-way-select-binding.js';
import TextFieldOverride from './text-field-override.js';
import TextFieldValidityMessageOverride from './text-field-validity-message-override.js';

/**
 * extension of mwc-textfield emiting a value-changed event when
 * value changes
 */
class PwiSelect extends 
  TwoWaySelectBinding(
    TextFieldOverride(
      TextFieldValidityMessageOverride(
        Select))) {
}

customElements.define('pwi-select', PwiSelect);

export { PwiSelect };
