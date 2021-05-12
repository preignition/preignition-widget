import { LitElement, html, css } from 'lit-element';
import { DemoBase } from '@preignition/preignition-demo';


export default class DomDemo extends DemoBase {

  static get properties() {
    return {
      
      /*
       * location of web-content-analyzer json output
       */
      src: {
        type: String,
        value: '/docs/dom.json'

      },

      readme: {
        type: String,
        value: '/src/dom/README.md'
      },


    };
  }


  render() {
    return html `
    <demos-container>
      <div slot="header">
        <demo-readme src="${this.readme}"></demo-readme>
      </div>
      <fancy-accordion >
          

          <expansion-panel opened>
              <div slot="header">pwi-content-observer</div>
              <mwc-tab-bar class="tab-bar" .activeIndex="${this.tabs.indexOf(this.activeTab)}" theme="centered">
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'intro'} label="intro"></mwc-tab>
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'api'} label="api"></mwc-tab>
            </mwc-tab-bar >
            ${this.activeTab === 'intro' ? html `
              <h2>Example</h2>
            </details>
              <pwi-content-observer @pwi-content-changed="${e => console.info(e.detail)}">I am a <span>span</span> <demo-test-dom></demo-test-dom> node<div>and a <span>div<span></div></pwi-content-observer>` : ''}
            ${this.activeTab === 'api' ? html `
              <h2>API</h2>
              <demo-api-viewer selected="pwi-content-observer"  src="/docs/pwi-cron-builder.json">` : ''}
          </expansion-panel>



          
      </fancy-accordion>

  
    </demos-container>
    
    `;
  }

  constructor() {
    super();
    this.tabs = ['intro', 'api', 'demo2'];
    this.activeTab = 'intro';
  }

}

customElements.define('dom-demo', DomDemo);
