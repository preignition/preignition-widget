import { Switch } from '@material/mwc-switch';
// import TwoWayBinding from './two-way-binding.js';

/**
 * extenstion of mwc-textfield emiting a value-changed event when
 * value changes
 */
class PwiSwitch extends Switch {
  changeHandler(e) {
    super.changeHandler(...arguments);
    this.dispatchEvent(new CustomEvent('checked-changed', { detail: { value: this.checked }, bubbles: true, composed: true }));
  }

}

customElements.define('pwi-switch', PwiSwitch);

export { PwiSwitch };

