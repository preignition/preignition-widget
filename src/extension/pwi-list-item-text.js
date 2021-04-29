import { ListItem } from '@material/mwc-list/mwc-list-item';

/**
 * Allow to display only a subset of the item as text value
 * for instance with multi-line list-items
 */

class PwiListItemText extends ListItem {
  get text() {
    return this.querySelector('[text]').textContent;
  }
}
customElements.define('pwi-list-item-text', PwiListItemText);