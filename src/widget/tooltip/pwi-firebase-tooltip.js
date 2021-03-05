import { LitElement, html, css } from 'lit-element';
import PwiTooltip from './pwi-tooltip.js';
import { parse } from '@preignition/preignition-util';
/*
  # tooltip loading its content from firebase


 */

class PwiFirebaseTooltip extends PwiTooltip {
  static get properties() {
    return {
      ...super.properties,

      /*
       * `path` database path
       */
      path: {
        type: String,
      },
      /*
       * `appName`
       */
      appName: {
        type: String,
        attribute: 'app-name'
      },

      /*
       * `loadingMessage` message appearing before
       * remote content was loaded
       */
      loadingMessage: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.loadingMessage = 'loading remote tooltip ...';
  }

  render() {
    return html `
      <lif-document path="${this.path}" .appName="${this.appName}" @data-changed="${e => this.message = parse(e.detail.value)}"></lif-document>
      ${super.render()}
    `;
  }

  firstUpdated(props) {
    if (!this.message && this.loadingMessage) {
      this.message = this.loadingMessage;
    }
    super.firstUpdated(props);
  }
}

// Register the new element with the browser.
customElements.define('pwi-firebase-tooltip', PwiFirebaseTooltip);

export default PwiFirebaseTooltip;
