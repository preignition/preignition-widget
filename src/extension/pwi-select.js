import {css} from 'lit-element';
import { Select } from '@material/mwc-select';
import TwoWaySelectBinding from './two-way-select-binding.js';
import OverrideTextfield from './override-textfield.js';
import OverrideSelectAsync from './override-select-async.js';
import OverrideTextfieldValidityMessage from './override-textfield-validity-message.js';
import {getInnerText, Translate as translate} from '@preignition/preignition-util';
import locale from '../form/readaloud-locale.js';

const selectRtlStyles = css`
  /* RTL */
  :host-context([dir=rtl]) .mdc-select--filled .mdc-floating-label {
  right: 40px;
  left: initial;
  }

  :host-context([dir=rtl]) .mdc-select__selected-text-container {
  margin-right: 40px;
  }

  :host-context([dir=rtl]) .mdc-select__dropdown-icon {
  position: absolute;
  right: 0px;
  bottom: 15px;
  }

  .mdc-text-field--filled .mdc-floating-label:dir(rtl) {
  right: 40px;
  left: initial;
  }

  .mdc-select__selected-text-container:dir(rtl) {
  margin-right: 40px;
  }

  .mdc-select__dropdown-icon:dir(rtl) {
  position: absolute;
  right: 0px;
  bottom: 15px;
  }
`;


/**
 * extension of mwc-textfield emiting a value-changed event when
 * value changes
 */
class PwiSelect extends
TwoWaySelectBinding(
  OverrideTextfield(
    OverrideSelectAsync(
      OverrideTextfieldValidityMessage(
        translate(Select, locale, 'readaloud'))))) {

      static get styles() {

        return [super.styles, selectRtlStyles]
    }

  getReadAloud(readHelper) {
    return this.value ?
      `${this.selectedText} ${this.getTranslate('isTheAnswerTo')} ${getInnerText(this.label)}` :
      (getInnerText(this.label) + (readHelper && this.helper ? ('. ' + this.getTranslate('hint') + ': ' + this.helper) + '.' : '') + this.getReadAloudOptions(readHelper));
  }

  getReadAloudOptions(readHelper) {
    if (!readHelper && this.items.length > 5) {
      return this.getTranslate('countOptions', {count: this.items.length + 1});
    }
    const options = [...this.items].map((item, index) => `${this.getTranslate('option')} ${index + 1}: ${item.text}.`);
    return `${this.getTranslate('chooseOption')}: ${options}`;
  }
}

customElements.define('pwi-select', PwiSelect);

export { PwiSelect };
