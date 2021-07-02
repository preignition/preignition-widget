import { html } from 'lit-element';

import '@material/mwc-tab-bar';
import '@material/mwc-tab';
import '@material/mwc-button';
import 'router-slot';


// import './test-demo.js';
// import './dashboard-demo.js';
// import './widget-demo.js';
// import './dom-demo.js';

import { github, preignition, DemoRoot } from '@preignition/preignition-demo';
import '@preignition/pwi-expansion-panel'
import '@preignition/pwi-accordion'

import {importHref} from '@preignition/preignition-util';

importHref('/bower_components/form-engine/item-bind.html', () => console.info('success'), (e) => {throw e;});
importHref('/bower_components/form-logic/form-logic.html', () => console.info('success'), (e) => {throw e;});

const ROUTES = [{
    path: 'intro',
    component: () => document.createElement('demo-readme')
  },
  {
    path: 'dom',
    component: () => import('./dom-demo')
  },
  {
    path: 'form',
    component: () => import('./form-demo')
  }, {
    path: 'widget',
    component: () => import('./widget-demo')
  },{
    path: '**',
    redirectTo: 'widget'
  }
]

/**
 * This component combines all the examples to be displayed. See the basic/intermediate/advanced folders for the actual examples.
 */

class PreignitiontDemo extends DemoRoot {

  constructor() {
    super();
    this.activeTab = location.pathname === '/' ? 'intro' : location.pathname.replace('/', '');
    this.tabs = ['intro', 'form'];
    this.location = location.origin;
  }

  static get properties() {
    return {
      ...super.properties,

      /*
       * `location`
       */
      location: {
        type: String,
      },
    };
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
        <a class="github" href="https://www.github.com/preignition/preignition-analytics" target="_blank">${github}</a>
      </div>


      <mwc-tab-bar class="tab-bar">
        <mwc-tab @click=${() => history.pushState(null, null, '/intro')} label="Intro"></mwc-tab>
        <mwc-tab @click=${() => history.pushState(null, null, '/dom')} label="dom"></mwc-tab>
        <mwc-tab @click=${() => history.pushState(null, null, '/widget')} label="widget"></mwc-tab>
        <mwc-tab @click=${() => history.pushState(null, null, '/form')} label="form"></mwc-tab>
      </mwc-tab-bar>
      <router-slot></router-slot>
      
      <p class="footer">Made with love by <a target="_blank" href="https://preignition.org/">preignition</a>, with precious help of <a target="_blank" href="https://github.com/web-padawan/api-viewer-element">api-viewer-element</a> and <a target="_blank" href="https://github.com/runem/web-component-analyzer">web-component-analyzer</a></p>
    `;
  }
  go

}

customElements.define('preignition-demo', PreignitiontDemo);
