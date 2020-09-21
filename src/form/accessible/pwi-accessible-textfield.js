import { PwiTextField } from '../../extension/pwi-textfield.js';
import AccessibleLabel from './accessible-label.js';
import AccessibleLabelStyle from './accessible-label-style.js';

class PwiAccessibleTextfield extends AccessibleLabel(PwiTextField) {

  static get styles() {
    return [super.styles, AccessibleLabelStyle];
  }
}

// Register the new element with the browser.
customElements.define('pwi-accessible-textfield', PwiAccessibleTextfield);

export { PwiAccessibleTextfield };
