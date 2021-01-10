import { TopAppBar } from '@material/mwc-top-app-bar';
import { css } from 'lit-element';

/**
 * extenstion of mwc-top-app-bar as unfixed is not yet supported.
 * https://github.com/material-components/material-components-web-components/issues/1064
 */
class PwiTopAppBar extends TopAppBar {
  static get styles() {
    return [
      super.styles,
      css `
        :host([unfixed]) .mdc-top-app-bar {
          position: sticky;
        }

       :host([unfixed]) .mdc-top-app-bar--fixed-adjust {
         padding-top: 0;
       }

      `
      ];
  }

  static get properties() {
    return {
      ...super.properties,

      /*
       * `unfixed`
       */
      unfixed: {
        type: Boolean,
        reflect: true
      }
    };
  }
}

customElements.define('pwi-top-app-bar', PwiTopAppBar);

export { PwiTopAppBar };
