import { html, css } from 'lit-element';
import { DemoBase, } from '@preignition/preignition-demo';

export default class WidgetDemo extends DemoBase {

  static get properties() {
    return {
      
      /*
       * location of web-content-analyzer json output
       */
      src: {
        type: String,
        value: '/docs/widget.json'

      },

      readme: {
        type: String,
        value: '/src/widget/README.md'
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

        <pwi-expansion-panel >
              <div slot="header">pwi-log-in</div>
              <mwc-tab-bar class="tab-bar" .activeIndex="${this.tabs.indexOf(this.activeTab)}" theme="centered">
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'intro'} label="intro"></mwc-tab>
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'api'} label="api"></mwc-tab>
            </mwc-tab-bar >
            ${this.activeTab === 'intro' ? html `
              <h2>Example</h2>
              <pwi-log-in></pwi-log-in>` : ''}
            ${this.activeTab === 'api' ? html `
              <h2>API</h2>
              <demo-api-viewer selected="pwi-log-in"  src="/docs/pwi-log-in.json">` : ''}
          </pwi-expansion-panel>  
                        

          <pwi-expansion-panel >
              <div slot="header">pwi-error-panel</div>
              <mwc-tab-bar class="tab-bar" .activeIndex="${this.tabs.indexOf(this.activeTab)}" theme="centered">
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'intro'} label="intro"></mwc-tab>
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'api'} label="api"></mwc-tab>
            </mwc-tab-bar >
            ${this.activeTab === 'intro' ? html `
              <h2>Example</h2>
              <pwi-error-panel  message="ooups there was an error" action="correct it"></pwi-error-panel>` : ''}
            ${this.activeTab === 'api' ? html `
              <h2>API</h2>
              <demo-api-viewer selected="pwi-error-panel"  src="/docs/pwi-cron-builder.json">` : ''}
          </pwi-expansion-panel>

         <pwi-expansion-panel >
              <div slot="header">pwi-user-img</div>
              <mwc-tab-bar class="tab-bar" .activeIndex="${this.tabs.indexOf(this.activeTab)}" theme="centered">
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'intro'} label="intro"></mwc-tab>
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'api'} label="api"></mwc-tab>
            </mwc-tab-bar >
            ${this.activeTab === 'intro' ? html `
              <h2>Example</h2>
              <pwi-user-img uid="google:105167708400387617467"></pwi-user-img>` : ''}
            ${this.activeTab === 'api' ? html `
              <h2>API</h2>
              <demo-api-viewer selected="pwi-user-img"  src="/docs/pwi-cron-builder.json">` : ''}
          </pwi-expansion-panel>


         <pwi-expansion-panel opened>
              <div slot="header">pwi-copy</div>
              <mwc-tab-bar class="tab-bar" .activeIndex="${this.tabs.indexOf(this.activeTab)}" theme="centered">
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'intro'} label="intro"></mwc-tab>
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'api'} label="api"></mwc-tab>
            </mwc-tab-bar >
            ${this.activeTab === 'intro' ? html `
              <h2>Example</h2>
              <pwi-copy><span>copied Text</span>2nd line<div>3rd line</div></pwi-copy>` : ''}
            ${this.activeTab === 'api' ? html `
              <h2>API</h2>
              <demo-api-viewer selected="pwi-user-img"  src="/docs/pwi-cron-builder.json">` : ''}
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

customElements.define('widget-demo', WidgetDemo);
