import { LitElement, html, css } from 'lit-element';

import { styleTypography } from '@preignition/preignition-styles';
import '@material/mwc-button';

/**
 * ## PwiMdEditr
 *
 * `<pwi-error-panel>` is a simple panel do display error and possible remedy actions
 * 
 * @fires pwi-error-action - evend fired when `md` changes
 * @slot message - present when message property is not set
 * @slot action - present when action property is not set
 */
class PwiErrorPanel extends LitElement {

  static get styles() {
    return [
      styleTypography,
      css `
    :host {
      display: block;
    }

    :host([theme=center]) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
     :host([theme=center]) > div {
        padding: var(--space-xx-large, 48px);
    }

    [part=message] {
      margin-bottom: var(--space-medium, 16px);
      color: var(--color-danger);
    }

    `
    ];
  }

  static get properties() {

    return {

      ...super.properties,

      /*
       * the error message
       */
      message: {
        type: String,
      },

      /*
       * the label 
       */
      action: {
        type: String,
      },

      /*
       * title for the panel
       */
      title: {
        type: String,
      },

      /*
       * `type` type of error, will be fired when action is clicked
       */
      type: {
        type: String,
      },

      /*
       * `theme` 
       */
      theme: {
        type: String,
        reflect: true
      }

    };
  }

  render() {
    return this.message ? html `
      <div>
        <h3 part="title">${this.title}</h3>
        <div part="message">${this.message ? this.message : html `<slot name="message"></slot>`}</div>
        <div part="action">${this.action ? html `<mwc-button @click="${this.onAction}" raised label="${this.action}"></mwc-button>` : html `<slot name="action"></slot>`}</message>
      </div>
    ` : '';
  }

  constructor() {
    super();
    this.title = 'Ooops, something is not quite right!';
  }

  onAction(e) {
    this.dispatchEvent(new CustomEvent('pwi-error-action', {detail: {type: this.type}, bubbles: true, composed: true }));
  }
}

// Register the new element with the browser.
customElements.define('pwi-error-panel', PwiErrorPanel);
