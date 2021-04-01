import {ListItem} from '@material/mwc-list/mwc-list-item';

import {html } from 'lit-element';

class PwiListItemNoRipple extends ListItem {
  // Note(CG): we want to override tipple
  // as it disturb d&d behavoir
  renderRipple() {
    if (this.activated) {
      return html`<div class="fake-activated-ripple"></div>`;
    } else {
      return '';
    }
  }
}
customElements.define('pwi-list-item-no-ripple', PwiListItemNoRipple);