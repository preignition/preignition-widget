import { TextField } from '@material/mwc-textfield';
import TwoWayBinding from './two-way-binding.js';
// import { ifDefined } from 'lit-html/directives/if-defined.js';
// import { html } from 'lit-element';

/**
 * extenstion of mwc-textfield emiting a value-changed event when
 * value changes
 */
class PwiTextField extends TwoWayBinding(TextField) {

}

customElements.define('pwi-textfield', PwiTextField);

export { PwiTextField };
