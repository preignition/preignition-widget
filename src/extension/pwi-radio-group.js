import { LitElement, html, css } from 'lit-element';


/**
 * PWIRadioGroup - a tentative to mimix paper-radio-group
 * This should not be used in producion - only test phase
 *
 * this also depends on resolution https://github.com/material-components/material-components-web-components/issues/289
 */
class PwiRadioGroup extends LitElement {

  render() {
    return html `<slot></slot>`;
  }

  set selected(value) {
    // console.info('set', value);
    this._value = value;
    const selectedItem = this.querySelector(`[value="${value}"]`);
    if (selectedItem) {selectedItem.checked = true;}
  }

  get selected() {
    // console.info('get');
    return this._selectedValue;
  }

  constructor() {
    super();
    this.addEventListener('change', this.onChange);
    
  }

  firstUpdated() {
    const slot = this.renderRoot.querySelector('slot');
    slot.addEventListener('slotchange', this.onSlotChange.bind(this));
  }

  get _selectedItem() {
    return this.querySelectorAll('[checked]')[0];
  }

  get _selectedValue() {
    return this._selectedItem && this._selectedItem.value;
  }

  onSlotChange(e) {
    if (this._value !== undefined) {
      this.selected = this._value;
    }
  }
  onChange(e) {
    // console.info('onChange', e);
    this._selected = this._selectedValue;
    this.dispatchEvent(new CustomEvent('selected-changed', {detail: {value: this._selected}})); 
  }
}

// Register the new element with the browser.
customElements.define('pwi-radio-group', PwiRadioGroup);