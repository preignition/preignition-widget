import { html } from 'lit-element';
import { nothing } from 'lit-html';
import '../pwi-label.js';

/**
 * mixin overrideing som methods not playin well with Polymer
 * 
 */

export const AccessibleLabel = (baseElement) => class extends baseElement {

  static get properties() {
    return {
      ...super.properties,

      /*
       * `labelAbove` if true, label will be placed above the field, and avoid
       * all material floatin label stuff
       */
      labelAbove: {
        type: Boolean,
        reflect: true,
        attribute: 'label-above'
      },

      /*
       * `terminology` [{term: definition}]
       */
      terminology: {
        type: Array
      },
    };
  }

  renderLabelAbove() {
    return html `
     <pwi-label id="label" class="label-above" .label="${this.label}" .terminology="${this.terminology}" ?required="${this.required}" ></pwi-label>
    `;
  }

  renderLabel() {
    if (!this.label) {
      return nothing;
    }
    if (this.labelAbove) {
      return this.renderLabelAbove();
    }
    return super.renderLabel();
  }
};

export default AccessibleLabel;
