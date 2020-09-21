import { PwiTextArea } from '../../extension/pwi-textarea.js';
import AccessibleLabel from './accessible-label.js';
import AccessibleLabelStyle from './accessible-label-style.js';

class PwiAccessibleTextarea extends AccessibleLabel(PwiTextArea) {

  static get styles() {
    return [super.styles, AccessibleLabelStyle];
  }
}

// Register the new element with the browser.
customElements.define('pwi-accessible-textarea', PwiAccessibleTextarea);

export { PwiAccessibleTextarea };
