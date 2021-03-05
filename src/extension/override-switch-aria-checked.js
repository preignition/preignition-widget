import { html } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
/**
 * mixin overriding checkbox
 *
 * Related issue:
 * https://github.com/material-components/material-components-web-components/issues/1913
 *
 */

export const OverrideSwitch = (baseElement) => class extends baseElement {
  /**
   * Overriding render
   */
   render() {
      const ariaChecked = this.checked ? 'true' : 'false';
        return html `
      <div class="mdc-switch">
        <div class="mdc-switch__track"></div>
        <div class="mdc-switch__thumb-underlay">
          ${this.renderRipple()}
          <div class="mdc-switch__thumb">
            <input
              type="checkbox"
              id="basic-switch"
              aria-checked="${ifDefined(ariaChecked)}"
              class="mdc-switch__native-control"
              role="switch"
              @change="${this.changeHandler}"
              @focus="${this.handleRippleFocus}"
              @blur="${this.handleRippleBlur}"
              @mousedown="${this.handleRippleMouseDown}"
              @mouseenter="${this.handleRippleMouseEnter}"
              @mouseleave="${this.handleRippleMouseLeave}"
              @touchstart="${this.handleRippleTouchStart}"
              @touchend="${this.handleRippleDeactivate}"
              @touchcancel="${this.handleRippleDeactivate}">
          </div>
        </div>
      </div>`;
    }
};

export default OverrideSwitch;
