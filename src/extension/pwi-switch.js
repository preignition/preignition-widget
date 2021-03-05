import { Switch } from '@material/mwc-switch';
import TwoWayCheckedBinding from './two-way-checked-binding.js';
// import OverrideSwitchAriaChecked from './override-switch-aria-checked.js'

/**
 * extention of mwc-switch emiting a value-changed event when
 * value changes
 */
class PwiSwitch extends TwoWayCheckedBinding(Switch) {


}

customElements.define('pwi-switch', PwiSwitch);

export { PwiSwitch };
