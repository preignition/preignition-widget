import { PwiAccessibleTextfield } from './pwi-accessible-textfield.js';

class PwiAccessibleDate extends PwiAccessibleTextfield {

  constructor() {
    super();
    this.type = 'date';
  }
}

customElements.define('pwi-accessible-date', PwiAccessibleDate);
