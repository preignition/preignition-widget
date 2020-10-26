import { html } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
/**
 * mixin overriding checkbox 
 *
 * Related issue:
 * https://github.com/material-components/material-components-web-components/issues/1913
 *
 */

export const OverrideCheckbox = (baseElement) => class extends baseElement {
  /**
   * Overriding render
   */
  render() {
    const selected = this.indeterminate || this.checked;
    /* eslint-disable eqeqeq */
    // tslint:disable:triple-equals
    /** @classMap */
    const classes = {
      'mdc-checkbox--disabled': this.disabled,
      'mdc-checkbox--selected': selected,
      'mdc-checkbox--touch': !this.reducedTouchTarget,
      'mdc-checkbox--focused': this.focused,
      // transition animiation classes
      'mdc-checkbox--anim-checked-indeterminate': this.animationClass == 'checked-indeterminate',
      'mdc-checkbox--anim-checked-unchecked': this.animationClass == 'checked-unchecked',
      'mdc-checkbox--anim-indeterminate-checked': this.animationClass == 'indeterminate-checked',
      'mdc-checkbox--anim-indeterminate-unchecked': this.animationClass == 'indeterminate-unchecked',
      'mdc-checkbox--anim-unchecked-checked': this.animationClass == 'unchecked-checked',
      'mdc-checkbox--anim-unchecked-indeterminate': this.animationClass == 'unchecked-indeterminate',
    };
    // tslint:enable:triple-equals
    /* eslint-enable eqeqeq */
    const ariaChecked = this.indeterminate ? 'mixed' : this.checked ? 'true' : 'false';
    return html `
    <div class="mdc-checkbox mdc-checkbox--upgraded ${classMap(classes)}">
      <input type="checkbox"
            class="mdc-checkbox__native-control"
            aria-checked="${ariaChecked}"
            data-indeterminate="${this.indeterminate ? 'true' : 'false'}"
            ?disabled="${this.disabled}"
            .indeterminate="${this.indeterminate}"
            .checked="${this.checked}"
            .value="${this.value}"
            @change="${this._changeHandler}"
            @focus="${this._handleFocus}"
            @blur="${this._handleBlur}"
            @mousedown="${this.handleRippleMouseDown}"
            @mouseenter="${this.handleRippleMouseEnter}"
            @mouseleave="${this.handleRippleMouseLeave}"
            @touchstart="${this.handleRippleTouchStart}"
            @touchend="${this.handleRippleDeactivate}"
            @touchcancel="${this.handleRippleDeactivate}">
      <div class="mdc-checkbox__background"
        @animationend="${this.resetAnimationClass}">
        <svg class="mdc-checkbox__checkmark"
            viewBox="0 0 24 24">
          <path class="mdc-checkbox__checkmark-path"
                fill="none"
                d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
        </svg>
        <div class="mdc-checkbox__mixedmark"></div>
      </div>
      ${this.renderRipple()}
    </div>`;
  }


};

export default OverrideCheckbox;