import { PwiAccessibleTextfield } from './pwi-accessible-textfield.js';

class PwiAccessibleTel extends PwiAccessibleTextfield {

  constructor() {
    super();
    this.type = 'tel';
  }
}

customElements.define('pwi-accessible-tel', PwiAccessibleTel);
