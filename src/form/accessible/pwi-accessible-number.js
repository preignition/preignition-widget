import { PwiAccessibleTextfield } from './pwi-accessible-textfield.js';

class PwiAccessibleNumber extends PwiAccessibleTextfield {

  constructor() {
    super();
    this.type = 'number';
  }
}

customElements.define('pwi-accessible-number', PwiAccessibleNumber);
