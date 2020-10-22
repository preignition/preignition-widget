import { Switch } from '@material/mwc-switch';
import TwoWayCheckedBinding from './two-way-checked-binding.js';

/**
 * extention of mwc-switch emiting a value-changed event when
 * value changes
 */
class PwiSwitch extends TwoWayCheckedBinding(Switch) {

}

customElements.define('pwi-switch', PwiSwitch);

export { PwiSwitch };
