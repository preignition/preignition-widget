import { TextField } from '@material/mwc-textfield';
import TwoWayBinding from './two-way-binding.js';
import TextFieldOverride from './text-field-override.js';

/**
 * extension of mwc-textfield emiting a value-changed event when
 * value changes
 */
class PwiTextField extends TwoWayBinding(TextFieldOverride(TextField)) {
  
}

customElements.define('pwi-textfield', PwiTextField);

export { PwiTextField };
