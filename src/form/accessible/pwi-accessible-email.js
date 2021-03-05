import { PwiAccessibleTextfield } from './pwi-accessible-textfield.js';

class PwiAccessibleEmail extends PwiAccessibleTextfield {
  constructor() {
    super();
    this.type = 'email';
  }
}

customElements.define('pwi-accessible-email', PwiAccessibleEmail);
