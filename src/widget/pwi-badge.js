import { LitElement, html, css } from 'lit-element';
import '@material/mwc-icon';

console.warn('pwi-bage is deprecated')

/**
 * DEPRECATED - used badge-style instead
 */

class PwiBadge extends LitElement {
  static get styles() {
    return css `
      :host {
        /* display: block;
        position: absolute; */
        outline: none;
        justify-content: center;
        align-items: center;
        display: flex;

        --pwi-badge-icon-size: 12px;
        
        font-weight: normal;
        font-size: 11px;
        border-radius: 50%;
        margin-left: var(--pwi-badge-margin-left, 0px);
        margin-bottom: var(--pwi-badge-margin-bottom, 0px);
        width: var(--pwi-badge-size, 20px);
        height: var(--pwi-badge-size, 20px);
        background-color: var(--pwi-badge-background, var(--accent-color));
        opacity: var(--pwi-badge-opacity, 1.0);
        color: var(--pwi-badge-text-color, var(--mdc-theme-on-primary));
      }

      :host([hidden]) {
        display: none !important;
      }

      mwc-icon {
        --iron-icon-size: var(--pwi-badge-icon-size);
      
      }

      /* div {

      } */

    `
  }

  static get properties() {
    return {
      icon: {
        type: String
      },
      label: {
        type: String
      },

    };
  }

  constructor() {
    super();
    this.setAttribute('role', 'status');
    this.setAttribute('tabindex', 0);
  }

  updated(props) {
    if (props.has('label')) {
      this.setAttribute('aria-label', this.label);
    }
    super.updated(props);
  }

  render() {
    return html `
      ${this.icon ?
        html`<mwc-icon>${this.icon}</mwc-icon>` :
        html`<span>${this.label}</span>`
      }
    
    `
  }
}

customElements.define('pwi-badge', PwiBadge);
