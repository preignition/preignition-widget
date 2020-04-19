import { html, css } from 'lit-element';
import { DemoBase, } from '@preignition/preignition-demo';

class FormDemo extends DemoBase {

  static get styles() {
    return [
    super.styles, 
    css `

      #toolbar {
        position: relative;
        margin-top: var(--space-xx-small, 4px);
      }
      mwc-linear-progress {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;

      }`];
  }

  static get properties() {
    return {
      
      /*
       * location of web-content-analyzer json output
       */
      src: {
        type: String,
        value: '/docs/forms.json'

      },

      readme: {
        type: String,
        value: '/src/form/README.md'
      },

      uploadStatus: {
        type: String
      },

      loading: {
        type: Boolean
      }



    };
  }


  render() {
    return html `
    <demos-container>
      <div slot="header">
        <demo-readme src="${this.readme}"></demo-readme>
      </div>
      <fancy-accordion >
          
          <expansion-panel >
              <div slot="header">pwi-textfield</div>
              <mwc-tab-bar class="tab-bar" .activeIndex="${this.tabs.indexOf(this.activeTab)}" theme="centered">
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'intro'} label="intro"></mwc-tab>
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'api'} label="api"></mwc-tab>
            </mwc-tab-bar >
            ${this.activeTab === 'intro' ? html `
              <h2>Example</h2>
              <pwi-textfield label="text"></pwi-textfield>
              
              <h2>API</h2>
              <demo-api-viewer selected="pwi-textfield"  src="/docs/pwi-cron-builder.json">` : ''}
          </expansion-panel>

          <expansion-panel >
              <div slot="header">pwi-cron-builder</div>
              <mwc-tab-bar class="tab-bar" .activeIndex="${this.tabs.indexOf(this.activeTab)}" theme="centered">
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'intro'} label="intro"></mwc-tab>
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'api'} label="api"></mwc-tab>
            </mwc-tab-bar >
            ${this.activeTab === 'intro' ? html `
              <h2>Example</h2>
              <!--mwc-textfield label="text"></mwc-textfield-->
              <pwi-cron-builder  write-label="Write your own terms" class="example"></pwi-cron-builder>` : ''}
            ${this.activeTab === 'api' ? html `
              <h2>API</h2>
              <demo-api-viewer selected="pwi-cron-builder"  src="/docs/pwi-cron-builder.json">` : ''}
          </expansion-panel>

          <expansion-panel opened>
              <div slot="header">pwi-md-editor</div>
              <mwc-tab-bar class="tab-bar" .activeIndex="${this.tabs.indexOf(this.activeTab)}" theme="centered">
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'intro'} label="intro"></mwc-tab>
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'api'} label="api"></mwc-tab>
            </mwc-tab-bar >
            ${this.activeTab === 'intro' ? html `
              <h2>Example</h2>
              
              <pwi-md-droppable-editor 
                id="editor" 
                md="## test"  
                max-file-size="50000"
                path="/blogData/PAC1cc5j9EN99ZG5A33mZS4Pf5i1/image/upload" 
                write-label="Write your own terms" class="example">
                
              </pwi-md-droppable-editor>` : ''}
            ${this.activeTab === 'api' ? html `
              <h2>API</h2>
              <demo-api-viewer selected="pwi-md-editor"  src="/docs/pwi-md-editor.json">` : ''}
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

  // get upload() {
  //   return this.renderRoot.querySelector('#upload')
  // }

  

}

customElements.define('form-demo', FormDemo);
