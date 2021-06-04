import { html } from 'lit-element';
import { LifSpan } from '@preignition/lit-firebase';
import { parse } from '@preignition/preignition-util';
import { classMap } from 'lit-html/directives/class-map.js';
import {accessibilityState, observeState} from '@preignition/preignition-state';

/**
 * am element rendering marksown straight from firebase
 */

class PwiLifMd extends observeState(LifSpan) {
  renderValue() {
    const classes = {
      issignlanguage: accessibilityState.signlanguage,
      isreadaloud: accessibilityState.readaloud,
      iseasyread: accessibilityState.easyread
    };
    return html `<div class="value ${classMap(classes)}">${parse(this.format(this.value))}</div>`;
  }
}

customElements.define('pwi-lif-md', PwiLifMd);
