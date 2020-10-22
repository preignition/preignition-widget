import { Radio } from '@material/mwc-radio';
import TwoWayCheckedBinding from './two-way-checked-binding.js';

/**
 * extention of mwc-switch emiting a value-changed event when
 * value changes
 */
class PwiRadio extends TwoWayCheckedBinding(Radio) {

}

customElements.define('pwi-radio', PwiRadio);

export { PwiRadio };
