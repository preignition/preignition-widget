import { Formfield } from '@material/mwc-formfield';
import { css } from 'lit-element';
// import TwoWayBinding from './two-way-binding.js';

/**
 * extenstion of mwc-textfield emiting a value-changed event when
 * value changes
 */
class PwiForm extends Formfield {
  static get styles() {
    return [
      super.styles,
      css `::slotted(pwi-switch){margin-right:10px}[dir=rtl] ::slotted(pwi-switch),::slotted(pwi-switch)[dir=rtl]{margin-left:10px}`
      ];
  }
}

customElements.define('pwi-formfield', PwiForm);

export { PwiForm };
