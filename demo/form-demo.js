import { html, css } from 'lit-element';
import { DemoBase, } from '@preignition/preignition-demo';
import '@material/mwc-fab';



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
      }
      .ct {
        display: flex;
        flex-direction: row;
      }

      .flex {
        flex: 1;
        margin-right: 10px;
      }
      `];
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
          
          <expansion-panel opened>
              <div slot="header">pwi-textfield</div>
              <mwc-tab-bar class="tab-bar" .activeIndex="${this.tabs.indexOf(this.activeTab)}" theme="centered">
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'intro'} label="intro"></mwc-tab>
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'api'} label="api"></mwc-tab>
            </mwc-tab-bar >
            ${this.activeTab === 'intro' ? html `
              <h2>Example</h2>
              <h3>text field - simple</h3>
              <div class="ct">
                <pwi-textfield class="flex" label="text" helper="helper text"></pwi-textfield>
                <pwi-textarea class="flex" label="textarea" helper="helper text for texarea"></pwi-textarea>
              </div>
              <h3>Text field - accessible version</h3>
              <div class="ct">
                <pwi-accessible-textfield class="flex" label-above label="looooooooooooog accessible laaaaaaaaaaaabel"></pwi-accessible-textfield>
                <pwi-accessible-textarea class="flex" label-above label="looooooooooooog accessible laaaaaaaaaaaabel"></pwi-accessible-textarea>
              </div>
              <h3>Text field - accessible version - alternate type</h3>
              <div class="ct">
                <pwi-accessible-number class="flex" label-above label="number"></pwi-accessible-number>
                <pwi-accessible-email class="flex" label-above label="email"></pwi-accessible-email>
                <pwi-accessible-locale class="flex" @value-changed=${this.onLocaleChange} value="30000" label="locale"></pwi-accessible-locale>
              </div>

              
              <h2>API</h2>
              <demo-api-viewer selected="pwi-textfield"  src="/docs/pwi-cron-builder.json">` : ''}
          </expansion-panel>

          <expansion-panel >
              <div slot="header">pwi-wrapper</div>
              <mwc-tab-bar class="tab-bar" .activeIndex="${this.tabs.indexOf(this.activeTab)}" theme="centered">
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'intro'} label="intro"></mwc-tab>
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'api'} label="api"></mwc-tab>
            </mwc-tab-bar >
            ${this.activeTab === 'intro' ? html `
              <h2>Example</h2>
              <pwi-wrapper label="this is a label">
                <p>coucou</p>
                <p>coucou2</p>

                <input/>
              </pwi-wrapper>` : ''}
            ${this.activeTab === 'api' ? html `
              <h2>API</h2>
              <demo-api-viewer selected="pwi-cron-builder"  src="/docs/pwi-cron-builder.json">` : ''}
          </expansion-panel>

           <expansion-panel >
              <div slot="header">pwi-radio-group</div>
              <mwc-tab-bar class="tab-bar" .activeIndex="${this.tabs.indexOf(this.activeTab)}" theme="centered">
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'intro'} label="intro"></mwc-tab>
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'api'} label="api"></mwc-tab>
            </mwc-tab-bar >
            ${this.activeTab === 'intro' ? html `
              <h2>Example</h2>
              <pwi-radio-group label="text">
                <mwc-formfield label="first">
                  <mwc-radio name="test" value="first"></mwc-radio>
                </mwc-formfield>
                <mwc-formfield label="second">
                  <mwc-radio name="test" value="second"></mwc-radio>
                </mwc-formfield>
                <mwc-formfield label="third">
                  <mwc-radio name="test" value="third"></mwc-radio>
                </mwc-formfield>
                
              </pwi-radio-group>
              
              <h2>API</h2>
              <demo-api-viewer selected="pwi-radio-group"  src="/docs/pwi-cron-builder.json">` : ''}
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
                helper="i should appear" 
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

  onLocaleChange(e) {
    console.info('LocaleChange', e.detail.value)
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
