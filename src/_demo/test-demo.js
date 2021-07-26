import { LitElement, html, css } from 'lit-element';
import { DemoBase } from '@preignition/preignition-demo';
import './test/test-base'
import './test/test-inherit'
import './test/test-inherit-2'

export default class TestDemo extends DemoBase {

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
      <pwi-accordion >
          <pwi-expansion-panel opened>
              <div slot="header">Test @prop</div>
              <mwc-tab-bar class="tab-bar" .activeIndex="${this.tabs.indexOf(this.activeTab)}" theme="centered">
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'intro'} label="intro"></mwc-tab>
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'api'} label="api"></mwc-tab>
            </mwc-tab-bar >
            ${this.activeTab === 'intro' ? html `
              <h2>Example</h2>
            
              <test-base title="test base"></test-base>
              <test-inherit title="test inherit"></test-inherit>
              <test-inherit-2 title="test inherit 2"></test-inherit-2>` : ''}
            ${this.activeTab === 'api' ? html `
              <h2>API</h2>
              <demo-api-viewer selected="pwi-content-observer"  src="/docs/pwi-cron-builder.json">` : ''}
          </pwi-expansion-panel>
          
      </pwi-accordion>
    </demos-container>
    
    `;
  }

  constructor() {
    super();
    this.tabs = ['intro', 'api', 'demo2'];
    this.activeTab = 'intro';
  }

}

customElements.define('test-demo', TestDemo);
