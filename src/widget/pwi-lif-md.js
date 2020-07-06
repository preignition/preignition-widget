import { html } from 'lit-element';
import { LifSpan } from '@preignition/lit-firebase';
import { parse } from '@preignition/preignition-util';

/**
 * am element rendering marksown straight from firebase
 */

class PwiLifMd extends LifSpan {

  renderValue() {
    return html `<div class="value">${parse(this.format(this.value))}</div>`;
  }
}

customElements.define('pwi-lif-md', PwiLifMd);
