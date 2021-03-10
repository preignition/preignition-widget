import { LitElement, html, css } from 'lit-element';

import '@material/mwc-tab-bar';
import '@material/mwc-tab';
import '@material/mwc-button';
import '@material/mwc-formfield';
import '@material/mwc-radio';
import '@material/mwc-linear-progress';
// import 'api-viewer-element';


import './form-demo.js';
import './dom-demo.js';
import './widget-demo.js';

import { github, preignition, DemoRoot } from '@preignition/preignition-demo';

/**
 * This component combines all the examples to be displayed. See the basic/intermediate/advanced folders for the actual examples.
 */

const ROUTES = [
  { path: '/intro', component: () => import('./demo-readme)' },
  { path: '/form', component: () => import('./form-demo)' },
  { path: '/dom', component: () => import('./dom-demo)' },
  { path: '/widget', component: () => import('./widget-demo)' },
  {
    path: '**',
    redirectTo: 'intro'
  }
]

class WidgetDemo extends DemoRoot {

  constructor() {
    super();
    this.activeTab = location.pathname === '/' ? 'intro' : location.pathname.replace('/', '');
    this.tabs = ['intro', 'form'];

  }
  get routerSlot() {
    return this.shadowRoot.querySelector('router-slot')
  }

  firstUpdated(props) {
    this.routerSlot.add(ROUTES)
    super.firstUpdated(props)

  }

  render() {
    return html `
      <div id="header">
        <span class="logo"><a href="https://preignition.org">${preignition}</a></span>
        <h1>Preignition Widget - ${this.capitalize(this.activeTab)} API and demos</h1>
        <a class="github" href="https://www.github.com/preignition/preignition-widget" target="_blank">${github}</a>
      </div>

      <mwc-tab-bar class="tab-bar">
        <mwc-tab @click=${() => this.switchRoute('intro')} label="Intro"></mwc-tab>
        <mwc-tab @click=${() => this.switchRoute('form')} label="Form"></mwc-tab>
        <mwc-tab @click=${() => this.switchRoute('dom')} label="Dom"></mwc-tab>
        <mwc-tab @click=${() => this.switchRoute('widget')} label="Widget"></mwc-tab>
      </mwc-tab-bar>

      <div id="outlet">
      </div>
      <p class="footer">Made with love by <a target="_blank" href="https://preignition.org/">preignition</a>, with precious help of <a target="_blank" href="https://github.com/web-padawan/api-viewer-element">api-viewer-element</a> and <a target="_blank" href="https://github.com/runem/web-component-analyzer">web-component-analyzer</a></p>
    `;
  }

}

customElements.define('preignition-widget-demo', WidgetDemo);
