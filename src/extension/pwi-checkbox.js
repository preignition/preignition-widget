import { Checkbox } from '@material/mwc-checkbox';

/**
 * extention of mwc-switch emiting a value-changed event when
 * value changes
 */
class PwiCheckbox extends Checkbox {
  // Note(cg): checkbox has handleChange (unlike switch and radio).
  handleChange(e) {
    super.handleChange(...arguments);
    this.dispatchEvent(new CustomEvent('checked-changed', { detail: { value: this.checked }, bubbles: true, composed: true }));
  }
}

customElements.define('pwi-checkbox', PwiCheckbox);

export { PwiCheckbox };
