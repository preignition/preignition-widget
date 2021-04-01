import { Select } from '@material/mwc-select';
import TwoWaySelectBinding from './two-way-select-binding.js';
import OverrideTextfield from './override-textfield.js';
import OverrideSelectAsync from './override-select-async.js';
import OverrideTextfieldValidityMessage from './override-textfield-validity-message.js';


/**
 * extension of mwc-textfield emiting a value-changed event when
 * value changes
 */
class PwiSelect extends
TwoWaySelectBinding(
  OverrideTextfield(
    OverrideSelectAsync(
      OverrideTextfieldValidityMessage(
        Select)))) {
  getReadAloud(readHelper) {
    return this.value ?
      `${this.selectedText} is the answer to the question ${this.label}` :
      (this.label + (readHelper && this.helper ? ('hint: ' + this.helper) + '.' : '') + this.getReadAloudOptions(readHelper));
  }

  getReadAloudOptions(readHelper) {
    if (!readHelper && this.items.length > 5) {
      return `There are ${this.items.length + 1} options to read. Click "read aloud" again to read them all.`;
    }
    const options = [...this.items].map((item, index) => `option ${index + 1}: ${item.text}.`);
    return `Choose your answers from the following options: ${options}`;
  }
}

customElements.define('pwi-select', PwiSelect);

export { PwiSelect };
