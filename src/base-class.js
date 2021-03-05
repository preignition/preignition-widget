import { LitElement } from 'lit-element';
import { DefaultValueMixin, DoNotSetUndefinedValue, LitNotify } from '@preignition/preignition-mixin';

export class Base extends
DefaultValueMixin(
  LitNotify(
    DoNotSetUndefinedValue(
      LitElement))) {
  static get properties() {
    return {

      ...super.properties,

      /*
       * `log`  true to show log
       */
      log: {
        type: Boolean,
      }
    };
  }
}

export default Base;
