import { PwiSelect } from '../../extension/pwi-select.js';
import AccessibleLabel from './accessible-label.js';
import AccessibleLabelStyle from './accessible-select-label-style.js';

class PwiAccessibleSelect extends AccessibleLabel(PwiSelect) {

  static get styles() {
    return [super.styles, AccessibleLabelStyle];
  }
}

customElements.define('pwi-accessible-select', PwiAccessibleSelect);

export { PwiAccessibleSelect };
