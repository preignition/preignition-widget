import { html, css } from 'lit-element';
import { DemoBase, } from '@preignition/preignition-demo';
import '@material/mwc-fab';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item.js';
import '@material/mwc-list/mwc-check-list-item.js';
import '@material/mwc-list/mwc-radio-list-item.js';



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

      .ct pwi-select {
        margin-right: 10px;
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

      checked : {
        type: Boolean, 
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
      },

      selectValue: {
        type: String
      },

      rv: {
        type: String
      },
      cv: {
        type: Array
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
              <div slot="header">Form Mix</div>
              <mwc-tab-bar class="tab-bar" .activeIndex="${this.tabs.indexOf(this.activeTab)}" theme="centered">
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'intro'} label="intro"></mwc-tab>
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'api'} label="api"></mwc-tab>
            </mwc-tab-bar >
            ${this.activeTab === 'intro' ? html `
              <h2>Example</h2>
              <h3>checkbox</h3>
              <pwi-form-checkbox label="checkbox label" .checked="${this.checked}" @checked-changed="${e=>this.checked = e.detail.value}" checkboxlabel="check me" helper="checkbox helper text"></pwi-form-checkbox>
              <pwi-form-switch label="switch label"  .checked="${this.checked}" @checked-changed="${e=>this.checked = e.detail.value}" checkboxlabel="switch me" helper="switch helper text"></pwi-form-switch>
              
              <h2>API</h2>
              <demo-api-viewer selected="pwi-textfield"  src="/docs/pwi-cron-builder.json">` : ''}
          </expansion-panel>
          
          <expansion-panel >
              <div slot="header">pwi-textfield</div>
              <mwc-tab-bar class="tab-bar" .activeIndex="${this.tabs.indexOf(this.activeTab)}" theme="centered">
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'intro'} label="intro"></mwc-tab>
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'api'} label="api"></mwc-tab>
            </mwc-tab-bar >
            ${this.activeTab === 'intro' ? html `
              <h2>Example</h2>
              <!--h3>text field - original</h3>
              <div class="ct">
                <mwc-textfield class="flex" label="text" helper="helper text" maxlength="100" charCounter></mwc-textfield>
                <!--mwc-textarea class="flex" label="textarea" helper="helper text for texarea"></mwc-textarea-->
              </div-->
              <h3>pwi text field - simple</h3>
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

          <expansion-panel>
              <div slot="header">pwi-select</div>
              <mwc-tab-bar class="tab-bar" .activeIndex="${this.tabs.indexOf(this.activeTab)}" theme="centered">
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'intro'} label="intro"></mwc-tab>
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'api'} label="api"></mwc-tab>
            </mwc-tab-bar >
            ${this.activeTab === 'intro' ? html `
              <h2>Example</h2>
              <div class="ct">
                <pwi-select label="select label" helper="help me out" @value-changed="${e => this.selectValue = e.detail.value}" .value="${this.selectValue}">
                  <mwc-list-item></mwc-list-item>
                  <mwc-list-item value="1">Option 1</mwc-list-item>
                  <mwc-list-item value="2">Option 2</mwc-list-item>
                  <mwc-list-item value="3">Option 3</mwc-list-item>
                </pwi-select>
                <pwi-select label="select label - bound" required @value-changed="${e => this.selectValue = e.detail.value}" .value="${this.selectValue}">
                  <mwc-list-item></mwc-list-item>
                  <mwc-list-item value="1">Option 1</mwc-list-item>
                  <mwc-list-item value="2">Option 2</mwc-list-item>
                  <mwc-list-item value="3">Option 3</mwc-list-item>
                </pwi-select>
                <pwi-accessible-number class="flex" label-above label="number"></pwi-accessible-number>
              </div>
              <div>SelectedValue : ${this.selectValue}</div>
              <div class="ct">
              <pwi-accessible-select class="flex" label="select accessible label">
                <mwc-list-item></mwc-list-item>
                <mwc-list-item value="1">Option 1</mwc-list-item>
                <mwc-list-item value="2">Option 2</mwc-list-item>
                <mwc-list-item value="3">Option 3</mwc-list-item>
              </pwi-accessible-select>
              <pwi-accessible-select label-above class="flex" label="label above variant">
                <mwc-list-item></mwc-list-item>
                <mwc-list-item value="1">Option 1</mwc-list-item>
                <mwc-list-item value="2">Option 2</mwc-list-item>
                <mwc-list-item value="3">Option 3</mwc-list-item>
              </pwi-accessible-select>
              </div>


              ` : ''}
            ${this.activeTab === 'api' ? html `
              <h2>API</h2>
              <demo-api-viewer selected="pwi-cron-builder"  src="/docs/pwi-cron-builder.json">` : ''}
          </expansion-panel>

          <expansion-panel>
              <div slot="header">pwi-field-wrapper</div>
              <mwc-tab-bar class="tab-bar" .activeIndex="${this.tabs.indexOf(this.activeTab)}" theme="centered">
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'intro'} label="intro"></mwc-tab>
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'api'} label="api"></mwc-tab>
            </mwc-tab-bar >
            ${this.activeTab === 'intro' ? html `
              <h2>Example</h2>
              <pwi-field-wrapper label="this is a label" helper="helper">
                <input></input>
                <p>coucou</p>
              </pwi-field-wrapper>
              <pwi-field-wrapper label="Label for checklist" helper="my helper" required>
                <mwc-list multi id="checklist">
                  <mwc-check-list-item selected>Item 0</mwc-check-list-item>
                  <mwc-check-list-item>Item 1</mwc-check-list-item>
                  <mwc-check-list-item left selected>Item 2 (left)</mwc-check-list-item>
                  <mwc-check-list-item left>Item 3 (left)</mwc-check-list-item>
                  <mwc-check-list-item disabled><span>disabled</span></mwc-check-list-item>
                </mwc-list>
              </pwi-field-wrapper>

              ` : ''}
            ${this.activeTab === 'api' ? html `
              <h2>API</h2>
              <demo-api-viewer selected="pwi-cron-builder"  src="/docs/pwi-cron-builder.json">` : ''}
          </expansion-panel>

           <expansion-panel>
              <div slot="header">pwi-radio-group</div>
              <mwc-tab-bar class="tab-bar" .activeIndex="${this.tabs.indexOf(this.activeTab)}" theme="centered">
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'intro'} label="intro"></mwc-tab>
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'api'} label="api"></mwc-tab>
            </mwc-tab-bar >
            ${this.activeTab === 'intro' ? html `
              <h2>Example</h2>
              <pwi-radio-group label="text" useShadow helper="this is a radio group">
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
              <pwi-radio-group label="initial value" selected="1" precise = 'i will precise' useShadow helper="this is a radio group"></pwi-radio-group>
              <pwi-checkbox-group label="checkbox" @precise-changed=${e => console.info('pp:',e.detail.value)} @selected-changed="${e => this.cv = e.detail.value}" useShadow helper="this is a checkbox group"></pwi-checkbox-group>
              <div> value: ${(this.cv || []).map(v => v)}</div>
              <pwi-radio-group label="initial value aligned column" @selected-changed="${e => this.rv = e.detail.value}"  class="column" selected="2" useShadow helper="this is a radio group"></pwi-radio-group>
              <div> value: ${this.rv || ''}</div>
              <pwi-checkbox-group label="checkbox aligned column"  class="column"    useShadow helper="this is a checkbox group"></pwi-checkbox-group>
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


          <expansion-panel >
              <div slot="header">pwi-form-upload</div>
              <mwc-tab-bar class="tab-bar" .activeIndex="${this.tabs.indexOf(this.activeTab)}" theme="centered">
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'intro'} label="intro"></mwc-tab>
                <mwc-tab isMinWidthIndicator @click=${() => this.activeTab = 'api'} label="api"></mwc-tab>
            </mwc-tab-bar >
            ${this.activeTab === 'intro' ? html `
              <h2>Example</h2>
              <pwi-form-upload label="upload file" useShadow helper="drag and drop file or press the upload button"></pwi-form-upload>
              ` : ''}
            ${this.activeTab === 'api' ? html `
              <h2>API</h2>
              <demo-api-viewer selected="pwi-cron-builder"  src="/docs/pwi-cron-builder.json">` : ''}
          </expansion-panel>

          <expansion-panel>
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
    this.selectValue = '2';
    this.checked = false;
  }

  // get upload() {
  //   return this.renderRoot.querySelector('#upload')
  // }

  

}

customElements.define('form-demo', FormDemo);
