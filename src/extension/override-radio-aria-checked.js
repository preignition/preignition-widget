import { html } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { classMap } from 'lit-html/directives/class-map';
/**
 * mixin overriding checkbox 
 *
 * Related issue:
 * https://github.com/material-components/material-components-web-components/issues/1913
 *
 */

export const OverrideRadio = (baseElement) => class extends baseElement {
  /**
   * Overriding render
   */
    render() {
        /** @classMap */
        const ariaChecked = this.checked ? 'true' : 'false';
        const classes = {
            'mdc-radio--touch': !this.reducedTouchTarget,
            'mdc-radio--disabled': this.disabled,
        };
        return html `
      <div class="mdc-radio ${classMap(classes)}">
        <input
          class="mdc-radio__native-control"
          type="radio"
          name="${this.name}"
          .checked="${this.checked}"
          aria-checked="${ariaChecked}"
          .value="${this.value}"
          ?disabled="${this.disabled}"
          @change="${this.changeHandler}"
          @focus="${this.handleFocus}"
          @click="${this.handleClick}"
          @blur="${this.handleBlur}"
          @mousedown="${this.handleRippleMouseDown}"
          @mouseenter="${this.handleRippleMouseEnter}"
          @mouseleave="${this.handleRippleMouseLeave}"
          @touchstart="${this.handleRippleTouchStart}"
          @touchend="${this.handleRippleDeactivate}"
          @touchcancel="${this.handleRippleDeactivate}">
        <div class="mdc-radio__background">
          <div class="mdc-radio__outer-circle"></div>
          <div class="mdc-radio__inner-circle"></div>
        </div>
        ${this.renderRipple()}
      </div>`;
    }
};

export default OverrideRadio;
