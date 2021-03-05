import { LitElement, html, css } from 'lit-element';

/**
 * # preignition-semantic-layout
 *
 * A responsive layout using semantic tag,
 *
 * Do not use this - better import semanticLayout css
 *
 * @element preignition-semantic-layout
 * @slot header - header slot
 * @slot aside - aside slot
 * @slot footer - footer slot
 */
export class SemanticLayout extends LitElement {
  static get styles() {
    return css `
     :host {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        margin: 0;
        color: var(--primary-text-color, #212121);
        --sl-header-height: 20vh;
        --sl-footer-height: 20vh;
        --sl-aside-max-width: 380px;
      }
     
      footer {
        height: var(--sl-footer-height);
      }

      header {
        text-align: center;
        height: var(--sl-header-height);
      }

      header ::slotted(h1) {
        margin-top: 20px;
        font-size: 60px;
      }

      header ::slotted(h2),
      header ::slotted(h3) {
        color: var(--secondary-text-color);
      }
      
      header, footer, article, nav, aside, section {
        padding: 1em;
      }

      /* we used <div id="main"> instead of <main> 
       * because we want to keep main at appliction level.
       */
      #main {
        display: flex;
        flex: 1;
        box-sizing: border-box;
      }

      #main > * {
        box-sizing: border-box;
      }
      
      #main-slot {
        flex: 1;
      }
      
      #main ::slotted(nav), 
      #main ::slotted(aside) {
        flex: 0 0 20vw;
        max-width: var(--sl-aside-max-width);  
      }
      
      #main ::slotted(nav) {
        order: -1;
      }
      
      #actions {
        position: fixed;
        right: 24px;
        bottom: 24px;
        --mdc-theme-secondary: var(--accent-color);
        -webkit-box-align: end;
        align-items: flex-end;
        display: flex;
        flex-direction: column;
        position: fixed;
        z-index: 100;
      }

      #actions ::slotted(*)  {
        margin-top: 20px;
      }
      
      @media screen and (max-width: 992px) {
        #main {
          display: block;
        }
        #main ::slotted(nav), 
        #main ::slotted(aside) {
          max-width: initial;  
        }
      }
    `;
  }
  render() {
    return html `
    ${!this.noHeader ? html `
      <header part="header">
        <slot name="header"></slot>
      </header>` : ''}
      
      <div id="main">
        <article id="main-slot" part="main">
          <slot></slot>
        </article>
        ${!this.noAside ? html `
          <aside part="aside">
             <slot name="aside"></slot>
          </aside> ` : ''}
      </div>

      <div id="actions" part="actions">
        <slot name="action"></slot>
      </div>

      ${!this.noFooter ? html `
      <footer part="footer">
        <slot name="footer"></slot>
      </footer>` : ''}
    `;
  }

  static get properties() {
    return {

      /**
       * true to hide header
       * @type {Boolean}
       */
      noHeader: {
        type: Boolean,
        attribute: 'no-header'
      },

      /**
       * true to hide footer
       * @type {Boolean}
       */
      noFooter: {
        type: Boolean,
        attribute: 'no-footer'
      },

      /**
       * true to hide aside
       * @type {Boolean}
       */
      noAside: {
        type: Boolean,
        attribute: 'no-aside'
      }
    };
  }
}

// Register the new element with the browser.
// customElements.define('pwi-semantic-layout', SemanticLayout);

export default SemanticLayout;
