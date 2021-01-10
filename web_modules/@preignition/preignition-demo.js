import { d as isPrimitive, h as html, n as nothing, N as NodePart } from '../common/lit-html-f57783b7.js';
import { css, LitElement, property, query, customElement } from '../lit-element.js';
import { d as directive } from '../common/directive-651fd9cf.js';
import { __decorate, __assign } from '../tslib.js';
import { styleMap } from '../lit-html/directives/style-map.js';
import { unsafeHTML } from '../lit-html/directives/unsafe-html.js';
import purify from '../dompurify.js';
import { d as defaultValue, a as doNotSetUndefinedValue } from '../common/defaultValueMixin-cb2ff445.js';
import { Router } from '../@vaadin/router.js';
import { m as marked_1 } from '../common/marked.esm-eb3fcce2.js';
import { cache } from '../lit-html/directives/cache.js';

var demoStyle = [
  css `
       :host {
          display: block;
        }

       .example {
        max-width: 700px;
        margin: auto;
      }


        #header {
          display: flex;
        }

        a {
          text-decoration: none;
        }

        a:visited {
          color: #217FF9;
        }
        .tab-bar {
          width: 500px;
          margin: auto;
        }

        .nav { 
          margin-bottom: 20px; 
        }
        
        .footer { 
          text-align: center; color: #a8a8a8;
        }

       demo-api-viewer {
         margin: auto;
         --ave-primary-color: var(--primary-color);
         --ave-link-color: var(--primary-color);
         --ave-accent-color: var(--accent-color);
       } 
           
      demo-api-viewer::part(docs-description) {
        font-family: 'Roboto', 'Noto', sans-serif;
        -webkit-font-smoothing: antialiased;  /* OS X subpixel AA bleed bug */
      }
      `
];

var mdStyle = [
  css `

/* [paper-font=display2] */
h1 {
  font-size: 45px;
  font-weight: 400;
  letter-spacing: -.018em;
  line-height: 48px;
}

/* [paper-font=display1] */
h2 {
  font-size: 34px;
  font-weight: 400;
  letter-spacing: -.01em;
  line-height: 40px;
}

/* [paper-font=headline] */
h3 {
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -.012em;
  line-height: 32px;
}

/* [paper-font=subhead] */
h4 {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

/* [paper-font=body2] */
h5, h6 {
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
}

      `
];

// import { BaseMixin } from './src/demo-base-mixin.js';


class BaseDemo extends defaultValue(doNotSetUndefinedValue(LitElement)) {
  static get styles() {
    return [
        demoStyle,
        mdStyle
    ];
  }

  static get properties() {
    return {
       /*
       * location of web-content-analyzer json output
       */
      src: {
        type: String,
        value: '/docs/helper.json'

      },

      readme: {
        type: String,
        value: '/src/helper/README.md'
      },

      header: {
        type: String,
      },

      /**
       * the selected item to display in the api
       * @type {Object}
       */
      selected: {
        type: String
      },

      /**
       * the active subtab (in expansion panel)
       * @type {Object}
       */
      activeTab: {
        type: String
      }
    };
  }


  firstUpdated() {
    this.addEventListener('rendered', this.applyConfig);
    this.addEventListener('click', e => {
      const panel = e.composedPath().find(el => el.localName === 'expansion-panel');
      if (panel && panel.dataset.name) {
        this.selected = panel.dataset.name;
      }
    });
    super.firstUpdated(...arguments);
  }


  applyConfig(e) {
    const config = this.config || {};
    const {component} = e.detail;

    if (component && config[component.localName]) {
      Object.keys(config[component.localName]).forEach(k => {
        component[k] = config[component.localName][k];
      });
    }
  }
}

/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/**
  Utility method that calls a callback whenever a media-query matches in response
  to the viewport size changing. The callback should take a boolean parameter
  (with `true` meaning the media query is matched).

  Example:

      import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';

      installMediaQueryWatcher(`(min-width: 600px)`, (matches) => {
        console.log(matches ? 'wide screen' : 'narrow sreen');
      });
*/
const installMediaQueryWatcher = (mediaQuery, layoutChangedCallback) => {
    let mql = window.matchMedia(mediaQuery);
    mql.addListener((e) => layoutChangedCallback(e.matches));
    layoutChangedCallback(mql.matches);
};

/**
 * Root Demo element
 */

class DemoRoot extends LitElement {
  static get styles() {
    return [
      css `
        :host {
          display: block;
          margin: 20px ;
          color: var(--primary-text-color);
        }

        h2 {
          font-size: 20px;
          color: var(--primary-color);
        }

        h1 {
          align-self: center;
          margin: 0;
          color: var(--primary-color);
          font-size: 60px;
          font-weight: 400;
          letter-spacing: -.018em;
          line-height: 55px;
        }

        #header {
          display: flex;
        }

        a {
          text-decoration: none;
        }

        a:visited {
          color: #217FF9;
        }

        .tab-bar {
          width: 500px;
          margin: auto;
        }


        #header h1 { 
          flex: 1; 
          padding-left: 50px;
        }

        .github {
          transform: scale(1.2, 1.2);
          align-self: center;
        }
        
        .nav { margin-bottom: 20px; }
        .footer { text-align: center; color: #a8a8a8;}
      `,
    ];
  }
  constructor() {
    super();
   
    installMediaQueryWatcher(`(min-width: 600px)`, (matches) => {
      this.smallScreen = !matches;
    });
  }

  static get properties() {
    return {
      activeTab: { type: String },
      tabs: { type: Array },
      smallScreen: { type: Boolean }
    };
  }


  switchRoute(route) {
    this.activeTab = route;
    Router.go(`/${route}`);
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

var defaultSource = Math.random;

var randomUniform = (function sourceRandomUniform(source) {
  function randomUniform(min, max) {
    min = min == null ? 0 : +min;
    max = max == null ? 1 : +max;
    if (arguments.length === 1) max = min, min = 0;
    else max -= min;
    return function() {
      return source() * max + min;
    };
  }

  randomUniform.source = sourceRandomUniform;

  return randomUniform;
})(defaultSource);

function range(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

  var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
}

var t0 = new Date,
    t1 = new Date;

function newInterval(floori, offseti, count, field) {

  function interval(date) {
    return floori(date = arguments.length === 0 ? new Date : new Date(+date)), date;
  }

  interval.floor = function(date) {
    return floori(date = new Date(+date)), date;
  };

  interval.ceil = function(date) {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };

  interval.round = function(date) {
    var d0 = interval(date),
        d1 = interval.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };

  interval.offset = function(date, step) {
    return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };

  interval.range = function(start, stop, step) {
    var range = [], previous;
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
    do range.push(previous = new Date(+start)), offseti(start, step), floori(start);
    while (previous < start && start < stop);
    return range;
  };

  interval.filter = function(test) {
    return newInterval(function(date) {
      if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
    }, function(date, step) {
      if (date >= date) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty
        } else while (--step >= 0) {
          while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty
        }
      }
    });
  };

  if (count) {
    interval.count = function(start, end) {
      t0.setTime(+start), t1.setTime(+end);
      floori(t0), floori(t1);
      return Math.floor(count(t0, t1));
    };

    interval.every = function(step) {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null
          : !(step > 1) ? interval
          : interval.filter(field
              ? function(d) { return field(d) % step === 0; }
              : function(d) { return interval.count(0, d) % step === 0; });
    };
  }

  return interval;
}

var durationMinute = 6e4;
var durationDay = 864e5;

var day = newInterval(
  date => date.setHours(0, 0, 0, 0),
  (date, step) => date.setDate(date.getDate() + step),
  (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay,
  date => date.getDate() - 1
);

const rnd = (keys, max) => {
  var r = randomUniform(max);
  return keys.map(function(d, i) {
    return { key: d, value: { count: r() } };
  });
};

const multipleRnd = (keys, max, size = 7) => {
  return range(size).map(function(d, i) {
    var value = {};
    var r = randomUniform(max);
    keys.forEach(function(k) {
      value[k] = r().toFixed(1) * 1;
    });
    return { key: i, value: value };
  });
};

const timeData = (nbDays) => {
    const now = new Date();
    const range = day.range(day.offset(now, -nbDays), now, 1);
    return rnd(range, 10);
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const _state = new WeakMap();
// Effectively infinity, but a SMI.
const _infinity = 0x7fffffff;
/**
 * Renders one of a series of values, including Promises, to a Part.
 *
 * Values are rendered in priority order, with the first argument having the
 * highest priority and the last argument having the lowest priority. If a
 * value is a Promise, low-priority values will be rendered until it resolves.
 *
 * The priority of values can be used to create placeholder content for async
 * data. For example, a Promise with pending content can be the first,
 * highest-priority, argument, and a non_promise loading indicator template can
 * be used as the second, lower-priority, argument. The loading indicator will
 * render immediately, and the primary content will render when the Promise
 * resolves.
 *
 * Example:
 *
 *     const content = fetch('./content.txt').then(r => r.text());
 *     html`${until(content, html`<span>Loading...</span>`)}`
 */
const until = directive((...args) => (part) => {
    let state = _state.get(part);
    if (state === undefined) {
        state = {
            lastRenderedIndex: _infinity,
            values: [],
        };
        _state.set(part, state);
    }
    const previousValues = state.values;
    let previousLength = previousValues.length;
    state.values = args;
    for (let i = 0; i < args.length; i++) {
        // If we've rendered a higher-priority value already, stop.
        if (i > state.lastRenderedIndex) {
            break;
        }
        const value = args[i];
        // Render non-Promise values immediately
        if (isPrimitive(value) ||
            typeof value.then !== 'function') {
            part.setValue(value);
            state.lastRenderedIndex = i;
            // Since a lower-priority value will never overwrite a higher-priority
            // synchronous value, we can stop processing now.
            break;
        }
        // If this is a Promise we've already handled, skip it.
        if (i < previousLength && value === previousValues[i]) {
            continue;
        }
        // We have a Promise that we haven't seen before, so priorities may have
        // changed. Forget what we rendered before.
        state.lastRenderedIndex = _infinity;
        previousLength = 0;
        Promise.resolve(value).then((resolvedValue) => {
            const index = state.values.indexOf(value);
            // If state.values doesn't contain the value, we've re-rendered without
            // the value, so don't render it. Then, only render if the value is
            // higher-priority than what's already been rendered.
            if (index > -1 && index < state.lastRenderedIndex) {
                state.lastRenderedIndex = index;
                part.setValue(resolvedValue);
                part.commit();
            }
        });
    }
});

const parse = (markdown) => {
  if (!markdown) {
    return html`
      ${nothing}
    `;
  }

  return html`
    ${unsafeHTML(purify.sanitize(marked_1(markdown)))}
  `;
};

function responseText(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.text();
}

function text(input, init) {
  return fetch(input, init).then(responseText);
}

/**
 * # demo-readme
 * @element demo-readme
 */
class DemoReadme extends defaultValue(doNotSetUndefinedValue(LitElement)) {

  static get styles() {
    return [
      mdStyle,
      css `
      :host {
         display: block;
         margin: 20px auto;
         width: 75vw;
      }

      @media screen and (max-width: 992px) {
      }
    `
    ];
  }

  static get properties() {
    return {
      /*
       * location of web-content-analyzer json output
       */
      src: {
        type: String,
        value: 'README.md'
      },

      md: {
        type: String
      }
    };
  }


  render() {

    const { src } = this;
    let md;

    if (src && this.lastSrc !== src) {
      this.lastSrc = src;
      md = text(src)
          .then(text => parse(text))
          .catch(e => html `<span>Error while loading ${src}</span>`);
    }

    return html `
      ${until(md, html`<span>Loading...</span>`)}
    `;
  }

}

customElements.define('demo-readme', DemoReadme);

/**
 * A custom element similar to the HTML5 `<details>` element.
 *
 * @element expansion-panel
 *
 * @slot - Slot fot panel content
 * @slot header - Slot for panel header
 *
 * @attr {boolean} focused - State attribute set when element has focus.
 * @attr {boolean} focus-ring - State attribute set when focused from keyboard.
 *
 * @cssprop --panel-header-background - Default panel header background color.
 * @cssprop --panel-header-min-height - Panel header minimum height.
 * @cssprop --panel-ripple-background - Active toggle button ripple background.
 *
 * @csspart header - An element wrapping the `header` slot.
 * @csspart toggle - A toggle button, child of the header part.
 * @csspart content - An element wrapping the `content` slot.
 *
 * @fires opened-changed - Event fired when expanding / collapsing
 */
let ExpansionPanel = class ExpansionPanel extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * When true, the panel content is expanded and visible
         */
        this.opened = false;
        /**
         * Disabled panel can not be expanded or collapsed
         */
        this.disabled = false;
        this._isShiftTabbing = false;
        this._tabPressed = false;
        this._boundBodyKeydown = this._onBodyKeydown.bind(this);
        this._boundBodyKeyup = this._onBodyKeyup.bind(this);
    }
    static get styles() {
        return css `
      :host {
        display: block;
        outline: none;
        color: rgba(0, 0, 0, 0.87);
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
          0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);

        --panel-header-background: #fff;
        --panel-header-min-height: 48px;
        --panel-ripple-background: rgba(0, 0, 0, 0.38);
      }

      :host([hidden]) {
        display: none !important;
      }

      [part='content'] {
        display: none;
        overflow: hidden;
        padding: 16px 24px 24px;
      }

      [part='header'] {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        position: relative;
        outline: none;
        min-height: var(--panel-header-min-height);
        padding: 0 24px;
        box-sizing: border-box;
        font-weight: 500;
        font-size: 13px;
        background-color: var(--panel-header-background);
        color: inherit;
        cursor: default;
        -webkit-tap-highlight-color: transparent;
      }

      :host([disabled]) [part='header'] {
        filter: brightness(75%);
        opacity: 0.75;
        pointer-events: none;
      }

      :host([opened]) [part='content'] {
        display: block;
        overflow: visible;
      }

      :host([focus-ring]) [part='header'] {
        filter: brightness(90%);
      }

      [part='header'] ::slotted(*) {
        margin: 12px 0;
      }

      [part='toggle'] {
        position: absolute;
        order: 1;
        right: 8px;
        width: 24px;
        height: 24px;
        padding: 4px;
        text-align: center;
        transform: rotate(45deg);
        transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 0.1);
      }

      [part='toggle']::before {
        width: 7px;
        position: absolute;
        height: 7px;
        left: 50%;
        top: 50%;
        content: '';
        border-width: 0 2px 2px 0;
        transform: translateX(-60%) translateY(-60%);
        border-style: solid;
        border-color: currentColor;
      }

      [part='toggle']::after {
        display: inline-block;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: var(--panel-ripple-background);
        transform: scale(0);
        opacity: 0;
        transition: transform 0s 0.8s, opacity 0.8s;
        will-change: transform, opacity;
      }

      :host(:not([disabled])) [part='header']:active [part='toggle']::after {
        transition-duration: 0.08s, 0.01s;
        transition-delay: 0s, 0s;
        transform: scale(1.25);
        opacity: 0.15;
      }

      :host([opened]) [part='toggle'] {
        transform: rotate(225deg);
      }
    `;
    }
    render() {
        return html `
      <div role="heading">
        <div
          role="button"
          part="header"
          @click="${this._onToggleClick}"
          @keydown="${this._onToggleKeyDown}"
          aria-expanded="${this.opened ? 'true' : 'false'}"
          tabindex="0"
        >
          <span part="toggle"></span>
          <slot name="header"></slot>
        </div>
      </div>
      <div
        part="content"
        style="${styleMap({ maxHeight: this.opened ? '' : '0px' })}"
        aria-hidden="${this.opened ? 'false' : 'true'}"
      >
        <slot></slot>
      </div>
    `;
    }
    connectedCallback() {
        super.connectedCallback();
        document.body.addEventListener('keydown', this._boundBodyKeydown, true);
        document.body.addEventListener('keyup', this._boundBodyKeyup, true);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.body.removeEventListener('keydown', this._boundBodyKeydown, true);
        document.body.removeEventListener('keyup', this._boundBodyKeyup, true);
    }
    focus() {
        if (this.header) {
            this.header.focus();
        }
    }
    firstUpdated() {
        this.setAttribute('tabindex', '0');
        this.addEventListener('focusin', e => {
            if (e.composedPath()[0] === this) {
                if (this._isShiftTabbing) {
                    return;
                }
                this._setFocused(true);
                this.focus();
            }
            else if (this.header &&
                e.composedPath().indexOf(this.header) !== -1 &&
                !this.disabled) {
                this._setFocused(true);
            }
        });
        this.addEventListener('focusout', () => this._setFocused(false));
        this.addEventListener('keydown', e => {
            if (e.shiftKey && e.keyCode === 9) {
                this._isShiftTabbing = true;
                HTMLElement.prototype.focus.apply(this);
                this._setFocused(false);
                setTimeout(() => {
                    this._isShiftTabbing = false;
                }, 0);
            }
        });
    }
    updated(props) {
        if (props.has('opened')) {
            this.dispatchEvent(new CustomEvent('opened-changed', {
                detail: { value: this.opened }
            }));
        }
        if (props.has('disabled') && this.header) {
            if (this.disabled) {
                this.removeAttribute('tabindex');
                this.header.setAttribute('tabindex', '-1');
            }
            else if (props.get('disabled')) {
                this.setAttribute('tabindex', '0');
                this.header.setAttribute('tabindex', '0');
            }
        }
    }
    _setFocused(focused) {
        if (focused) {
            this.setAttribute('focused', '');
        }
        else {
            this.removeAttribute('focused');
        }
        if (focused && this._tabPressed) {
            this.setAttribute('focus-ring', '');
        }
        else {
            this.removeAttribute('focus-ring');
        }
    }
    _onToggleClick() {
        this.opened = !this.opened;
    }
    _onToggleKeyDown(e) {
        if ([13, 32].indexOf(e.keyCode) > -1) {
            e.preventDefault();
            this.opened = !this.opened;
        }
    }
    _onBodyKeydown(e) {
        this._tabPressed = e.keyCode === 9;
    }
    _onBodyKeyup() {
        this._tabPressed = false;
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], ExpansionPanel.prototype, "opened", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ExpansionPanel.prototype, "disabled", void 0);
__decorate([
    query('[part="header"]')
], ExpansionPanel.prototype, "header", void 0);
ExpansionPanel = __decorate([
    customElement('expansion-panel')
], ExpansionPanel);

/**
 * A custom element implementing the accordion widget: a vertically stacked set of expandable panels
 * that wraps several instances of the `<expansion-panel>` element. Only one panel can be opened
 * (expanded) at a time.
 *
 * Panel headings function as controls that enable users to open (expand) or hide (collapse) their
 * associated sections of content. The user can toggle panels by mouse click, Enter and Space keys.
 *
 * The component supports keyboard navigation and is aligned with the
 * [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion).
 *
 * @element fancy-accordion
 *
 * @slot - Slot fot panel elements.
 *
 * @fires opened-index-changed - Event fired when changing currently opened panel.
 */
let FancyAccordion = class FancyAccordion extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Index of the currently opened panel. By default all the panels are closed.
         * Only one panel can be opened at the same time. Setting `null` or `undefined`
         * closes all the accordion panels.
         */
        this.openedIndex = null;
        this._items = [];
        this._boundOnOpened = this._onOpened.bind(this);
    }
    static get styles() {
        return css `
      :host {
        display: block;
      }

      :host([hidden]) {
        display: none !important;
      }

      ::slotted([opened]:not(:first-child)) {
        margin-top: 16px;
      }

      ::slotted([opened]:not(:last-child)) {
        margin-bottom: 16px;
      }

      ::slotted(:not([opened])) {
        position: relative;
      }

      ::slotted(:not([opened]))::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 1px;
        opacity: 1;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.12);
      }
    `;
    }
    render() {
        return html `
      <slot></slot>
    `;
    }
    firstUpdated() {
        this.addEventListener('keydown', e => this._onKeydown(e));
        Array.from(this.children).forEach(node => {
            if (node instanceof ExpansionPanel) {
                this._items.push(node);
                node.addEventListener('opened-changed', this._boundOnOpened);
            }
        });
    }
    update(props) {
        if (props.has('openedIndex') && this._items) {
            const item = this.openedIndex == null ? null : this._items[this.openedIndex];
            this._items.forEach(el => {
                el.opened = el === item;
            });
        }
        super.update(props);
    }
    get focused() {
        const root = this.getRootNode();
        return root.activeElement;
    }
    _onKeydown(event) {
        const target = event.composedPath()[0];
        if (target.getAttribute('part') !== 'header') {
            return;
        }
        const key = event.key.replace(/^Arrow/, '');
        const currentIdx = this._items.indexOf(this.focused);
        let idx;
        let increment;
        switch (key) {
            case 'Up':
                increment = -1;
                idx = currentIdx - 1;
                break;
            case 'Down':
                increment = 1;
                idx = currentIdx + 1;
                break;
            case 'Home':
                increment = 1;
                idx = 0;
                break;
            case 'End':
                increment = -1;
                idx = this._items.length - 1;
                break;
        }
        idx = this._getAvailableIndex(idx, increment);
        if (idx >= 0) {
            this._items[idx].focus();
            this._items[idx].setAttribute('focus-ring', '');
            event.preventDefault();
        }
    }
    _getAvailableIndex(index, increment) {
        const total = this._items.length;
        let idx = index;
        for (let i = 0; typeof idx === 'number' && i < total; i++, idx += increment || 1) {
            if (idx < 0) {
                idx = total - 1;
            }
            else if (idx >= total) {
                idx = 0;
            }
            const item = this._items[idx];
            if (!item.disabled) {
                return idx;
            }
        }
        return -1;
    }
    _onOpened(e) {
        const target = e.composedPath()[0];
        const idx = this._items.indexOf(target);
        if (e.detail.value) {
            if (target.disabled || idx === -1) {
                return;
            }
            this.openedIndex = idx;
            this._notifyOpen();
            this._items.forEach(item => {
                if (item !== target && item.opened) {
                    item.opened = false;
                }
            });
        }
        else if (!this._items.some(item => item.opened)) {
            this.openedIndex = undefined;
            this._notifyOpen();
        }
    }
    _notifyOpen() {
        this.dispatchEvent(new CustomEvent('opened-index-changed', {
            detail: {
                value: this.openedIndex
            }
        }));
    }
};
__decorate([
    property({ type: Number, attribute: 'opened-index' })
], FancyAccordion.prototype, "openedIndex", void 0);
FancyAccordion = __decorate([
    customElement('fancy-accordion')
], FancyAccordion);

class DemoFancyList extends LitElement {
  static get styles() {
    return css `
      :host {
        display: block;
      }

     
      expansion-panel {
        cursor: pointer;
      }

      .md {  
        scale: 0.9;
        transform-origin: left;
      }
      /* [paper-font=display2] */
      .md h1 {
        font-size: 45px;
        font-weight: 400;
        letter-spacing: -.018em;
        line-height: 48px;
      }

      /* [paper-font=display1] */
      .md h2 {
        font-size: 34px;
        font-weight: 400;
        letter-spacing: -.01em;
        line-height: 40px;
      }

      /* [paper-font=headline] */
      .md h3 {
        font-size: 24px;
        font-weight: 400;
        letter-spacing: -.012em;
        line-height: 32px;
      }

      /* [paper-font=subhead] */
      .md h4 {
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
      }

      /* [paper-font=body2] */
      .md h5, .md h6 {
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
      }

    `;
  }

  static get properties() {
    return {

      /*
       * location of web-content-analyzer json output
       */
      src: {
        type: String
      },

      /**
       * list of elements (output of web-component-analyzer)
       */
      list: {
        type: Array
      }

    };
  }


  render() {
    return html `
     <d3-fetch .url="${this.src}" @data-changed="${this.onDataChanged}"></d3-fetch>
     <fancy-accordion .openedIndex="${this.openedIndex}">
       ${(this.list || []).filter(l => l.name).map((l, i) => {
         return html `<expansion-panel .opened="${i === 0}" data-name="${l.name}">
           <div slot="header">${l.name}</div>
           <div class="md">${parse(l.description)}</div>
         </expansion-panel>`;
       })}
     </fancy-accordion>

    `;
  }

  onDataChanged(e) {
    if (e.detail.value) {
      this.list = e.detail.value.tags;
    }
  }
}

customElements.define('demo-fancy-list', DemoFancyList);

// import 'api-viewer-element';
// import './demo-api-viewer.js';


class DemoContainer extends LitElement {
  static get styles() {
    return css `
      :host {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        margin: 0;
      }

      #main {
        display: flex;
        flex: 1;
        margin: 10px 30px;
        box-sizing: border-box;
      }

      #main > * {
        box-sizing: border-box;
      }
      
      header {
        margin: 20px 30px;
        width: 70vw;
        min-width: 600px;
      }

      #main > div {
        width: 700px;
        margin: auto;
        margin-top: 0;
        min-height: auto;
      }
      
      aside {
        flex: auto;
        margin-left: 20px;
      }

      @media screen and (max-width: 992px) {
        #main {
          display: block;
        }
        aside {
          max-width: initial;  
        }
      }
    `;
  }

  static get properties() {
    return {

    };
  }


  render() {
    return html `
     <header>
        <slot name="header"></slot>
      </header>
      <div id="main">
        <div>
          <slot name="list"></slot>
        </div>
        
        <aside>
          <slot name="aside"></slot>
        </aside>
      </div>
    `;
  }

}

customElements.define('demo-container', DemoContainer);

const getSlotTitle = (name) => {
    return name === '' ? 'Default' : name[0].toUpperCase() + name.slice(1);
};
let templates = [];
const queryTemplates = (node) => {
    templates = Array.from(node.querySelectorAll('template'));
};
const isTemplate = (tpl, name) => {
    return tpl.dataset.element === name;
};
const isHostTemplate = (tpl) => {
    return tpl.dataset.target === 'host';
};
const getSlotTemplate = (name) => {
    return templates.find(t => isTemplate(t, name) && !isHostTemplate(t));
};
const hasSlotTemplate = (name) => {
    return templates.some(t => isTemplate(t, name) && !isHostTemplate(t));
};
const getHostTemplateNode = (name) => {
    const tpl = templates.find(t => isTemplate(t, name) && isHostTemplate(t));
    return tpl && tpl.content.firstElementChild;
};
const hasHostTemplate = (name) => {
    return templates.some(tpl => isTemplate(tpl, name) && isHostTemplate(tpl));
};
const isEmptyArray = (array) => array.length === 0;
const normalizeType = (type = '') => type.replace(' | undefined', '').replace(' | null', '');

const EMPTY_ELEMENT = {
    name: '',
    description: '',
    slots: [],
    attributes: [],
    properties: [],
    events: [],
    cssParts: [],
    cssProperties: []
};

const parse$1 = (markdown) => {
    if (!markdown) {
        return html `
      ${nothing}
    `;
    }
    return html `
    ${unsafeHTML(purify.sanitize(marked_1(markdown)))}
  `;
};

let panelIdCounter = 0;
let ApiViewerPanel = class ApiViewerPanel extends LitElement {
    static get styles() {
        return css `
      :host {
        display: block;
        box-sizing: border-box;
        width: 100%;
      }

      :host([hidden]) {
        display: none !important;
      }
    `;
    }
    render() {
        return html `
      <slot></slot>
    `;
    }
    firstUpdated() {
        this.setAttribute('role', 'tabpanel');
        if (!this.id) {
            this.id = `api-viewer-panel-${panelIdCounter++}`;
        }
    }
};
ApiViewerPanel = __decorate([
    customElement('api-viewer-panel')
], ApiViewerPanel);

let tabIdCounter = 0;
let ApiViewerTab = class ApiViewerTab extends LitElement {
    constructor() {
        super(...arguments);
        this.selected = false;
        this.heading = '';
        this.active = false;
        this._mousedown = false;
    }
    static get styles() {
        return css `
      :host {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        box-sizing: border-box;
        position: relative;
        max-width: 150px;
        overflow: hidden;
        min-height: 3rem;
        padding: 0 1rem;
        color: var(--ave-tab-color);
        font-size: 0.875rem;
        line-height: 1.2;
        font-weight: 500;
        text-transform: uppercase;
        outline: none;
        cursor: pointer;
        -webkit-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
      }

      :host([hidden]) {
        display: none !important;
      }

      :host::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: var(--ave-tab-indicator-size);
        background-color: var(--ave-primary-color);
        opacity: 0;
      }

      :host([selected]) {
        color: var(--ave-primary-color);
      }

      :host([selected])::before {
        opacity: 1;
      }

      :host::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: var(--ave-primary-color);
        opacity: 0;
        transition: opacity 0.1s linear;
      }

      :host(:hover)::after {
        opacity: 0.08;
      }

      :host([focus-ring])::after {
        opacity: 0.12;
      }

      :host([active])::after {
        opacity: 0.16;
      }

      @media (max-width: 600px) {
        :host {
          justify-content: center;
          text-align: center;
        }

        :host::before {
          top: auto;
          right: 0;
          width: 100%;
          height: var(--ave-tab-indicator-size);
        }
      }
    `;
    }
    render() {
        return html `
      ${this.heading}
    `;
    }
    firstUpdated() {
        this.setAttribute('role', 'tab');
        if (!this.id) {
            this.id = `api-viewer-tab-${tabIdCounter++}`;
        }
        this.addEventListener('focus', () => this._setFocused(true), true);
        this.addEventListener('blur', () => {
            this._setFocused(false);
            this._setActive(false);
        }, true);
        this.addEventListener('mousedown', () => {
            this._setActive((this._mousedown = true));
            const mouseUpListener = () => {
                this._setActive((this._mousedown = false));
                document.removeEventListener('mouseup', mouseUpListener);
            };
            document.addEventListener('mouseup', mouseUpListener);
        });
    }
    updated(props) {
        if (props.has('selected')) {
            this.setAttribute('aria-selected', String(this.selected));
            this.setAttribute('tabindex', this.selected ? '0' : '-1');
        }
    }
    _setActive(active) {
        this.toggleAttribute('active', active);
    }
    _setFocused(focused) {
        this.toggleAttribute('focused', focused);
        this.toggleAttribute('focus-ring', focused && !this._mousedown);
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], ApiViewerTab.prototype, "selected", void 0);
__decorate([
    property({ type: String })
], ApiViewerTab.prototype, "heading", void 0);
__decorate([
    property({ type: Boolean })
], ApiViewerTab.prototype, "active", void 0);
ApiViewerTab = __decorate([
    customElement('api-viewer-tab')
], ApiViewerTab);

const KEYCODE = {
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    HOME: 36,
    END: 35
};
let ApiViewerTabs = class ApiViewerTabs extends LitElement {
    constructor() {
        super(...arguments);
        this._boundSlotChange = this._onSlotChange.bind(this);
    }
    static get styles() {
        return css `
      :host {
        display: flex;
      }

      .tabs {
        display: block;
      }

      @media (max-width: 600px) {
        :host {
          flex-direction: column;
        }

        .tabs {
          flex-grow: 1;
          display: flex;
          align-self: stretch;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
      }
    `;
    }
    render() {
        return html `
      <div class="tabs">
        <slot name="tab"></slot>
      </div>
      <slot name="panel"></slot>
    `;
    }
    firstUpdated() {
        this.setAttribute('role', 'tablist');
        this.addEventListener('keydown', this._onKeyDown);
        this.addEventListener('click', this._onClick);
        const [tabSlot, panelSlot] = Array.from(this.renderRoot.querySelectorAll('slot'));
        if (tabSlot && panelSlot) {
            tabSlot.addEventListener('slotchange', this._boundSlotChange);
            panelSlot.addEventListener('slotchange', this._boundSlotChange);
        }
        Promise.all([...this._allTabs(), ...this._allPanels()].map(el => el.updateComplete)).then(() => {
            this._linkPanels();
        });
    }
    _onSlotChange() {
        this._linkPanels();
    }
    _linkPanels() {
        const tabs = this._allTabs();
        tabs.forEach(tab => {
            const panel = tab.nextElementSibling;
            tab.setAttribute('aria-controls', panel.id);
            panel.setAttribute('aria-labelledby', tab.id);
        });
        const selectedTab = tabs.find(tab => tab.selected) || tabs[0];
        this._selectTab(selectedTab);
    }
    _allPanels() {
        return Array.from(this.querySelectorAll('api-viewer-panel'));
    }
    _allTabs() {
        return Array.from(this.querySelectorAll('api-viewer-tab'));
    }
    _getAvailableIndex(idx, increment) {
        const tabs = this._allTabs();
        const total = tabs.length;
        for (let i = 0; typeof idx === 'number' && i < total; i++, idx += increment || 1) {
            if (idx < 0) {
                idx = total - 1;
            }
            else if (idx >= total) {
                idx = 0;
            }
            const tab = tabs[idx];
            if (!tab.hasAttribute('hidden')) {
                return idx;
            }
        }
        return -1;
    }
    _panelForTab(tab) {
        const panelId = tab.getAttribute('aria-controls');
        return this.querySelector(`#${panelId}`);
    }
    _prevTab() {
        const tabs = this._allTabs();
        const newIdx = this._getAvailableIndex(tabs.findIndex(tab => tab.selected) - 1, -1);
        return tabs[(newIdx + tabs.length) % tabs.length];
    }
    _firstTab() {
        const tabs = this._allTabs();
        return tabs[0];
    }
    _lastTab() {
        const tabs = this._allTabs();
        return tabs[tabs.length - 1];
    }
    _nextTab() {
        const tabs = this._allTabs();
        const newIdx = this._getAvailableIndex(tabs.findIndex(tab => tab.selected) + 1, 1);
        return tabs[newIdx % tabs.length];
    }
    /**
     * `reset()` marks all tabs as deselected and hides all the panels.
     */
    reset() {
        const tabs = this._allTabs();
        const panels = this._allPanels();
        tabs.forEach(tab => {
            tab.selected = false;
        });
        panels.forEach(panel => {
            panel.hidden = true;
        });
    }
    /**
     * `selectFirst()` automatically selects first non-hidden tab.
     */
    selectFirst() {
        const tabs = this._allTabs();
        const idx = this._getAvailableIndex(0, 1);
        this._selectTab(tabs[idx % tabs.length]);
    }
    _selectTab(newTab) {
        this.reset();
        const newPanel = this._panelForTab(newTab);
        if (!newPanel) {
            throw new Error('No panel with for tab');
        }
        newTab.selected = true;
        newPanel.hidden = false;
    }
    _onKeyDown(event) {
        const { target } = event;
        if ((target && target instanceof ApiViewerTab) === false) {
            return;
        }
        if (event.altKey) {
            return;
        }
        let newTab;
        switch (event.keyCode) {
            case KEYCODE.LEFT:
            case KEYCODE.UP:
                newTab = this._prevTab();
                break;
            case KEYCODE.RIGHT:
            case KEYCODE.DOWN:
                newTab = this._nextTab();
                break;
            case KEYCODE.HOME:
                newTab = this._firstTab();
                break;
            case KEYCODE.END:
                newTab = this._lastTab();
                break;
            default:
                return;
        }
        event.preventDefault();
        this._selectTab(newTab);
        newTab.focus();
    }
    _onClick(event) {
        const { target } = event;
        if (target && target instanceof ApiViewerTab) {
            this._selectTab(target);
            target.focus();
        }
    }
};
ApiViewerTabs = __decorate([
    customElement('api-viewer-tabs')
], ApiViewerTabs);

/* eslint-enable import/no-duplicates */
const processAttrs = (attrs, props) => {
    return attrs.filter(({ name }) => !props.some(prop => prop.attribute === name || prop.name === name));
};
const renderItem = (name, description, valueType, attribute, value) => {
    return html `
    <div part="docs-item">
      <div part="docs-row">
        <div part="docs-column">
          <div part="docs-label">Name</div>
          <div part="docs-value" class="accent">${name}</div>
        </div>
        ${attribute === undefined
        ? nothing
        : html `
              <div part="docs-column">
                <div part="docs-label">Attribute</div>
                <div part="docs-value">${attribute}</div>
              </div>
            `}
        ${valueType === undefined
        ? nothing
        : html `
              <div part="docs-column" class="column-type">
                <div part="docs-label">Type</div>
                <div part="docs-value">
                  ${valueType}
                  ${value === undefined
            ? nothing
            : html `
                        = <span class="accent">${value}</span>
                      `}
                </div>
              </div>
            `}
      </div>
      <div ?hidden="${description === undefined}">
        <div part="docs-label">Description</div>
        <div part="docs-markdown">${parse$1(description)}</div>
      </div>
    </div>
  `;
};
const renderTab = (heading, count, content) => {
    const hidden = count === 0;
    return html `
    <api-viewer-tab
      heading="${heading}"
      slot="tab"
      part="tab"
      ?hidden="${hidden}"
    ></api-viewer-tab>
    <api-viewer-panel slot="panel" part="tab-panel" ?hidden="${hidden}">
      ${content}
    </api-viewer-panel>
  `;
};
let ApiViewerDocs = class ApiViewerDocs extends LitElement {
    constructor() {
        super(...arguments);
        this.name = '';
        this.props = [];
        this.attrs = [];
        this.slots = [];
        this.events = [];
        this.cssParts = [];
        this.cssProps = [];
    }
    createRenderRoot() {
        return this;
    }
    render() {
        const { slots, props, attrs, events, cssParts, cssProps } = this;
        const properties = props || [];
        const attributes = processAttrs(attrs || [], properties);
        const emptyDocs = [
            properties,
            attributes,
            slots,
            events,
            cssProps,
            cssParts
        ].every(isEmptyArray);
        return emptyDocs
            ? html `
          <div part="warning">
            The element &lt;${this.name}&gt; does not provide any documented
            API.
          </div>
        `
            : html `
          <api-viewer-tabs>
            ${renderTab('Properties', properties.length, html `
                ${properties.map(prop => {
                const { name, description, type, attribute } = prop;
                return renderItem(name, description, type, attribute, prop.default);
            })}
              `)}
            ${renderTab('Attributes', attributes.length, html `
                ${attributes.map(({ name, description, type }) => renderItem(name, description, type))}
              `)}
            ${renderTab('Slots', slots.length, html `
                ${slots.map(({ name, description }) => renderItem(name, description))}
              `)}
            ${renderTab('Events', events.length, html `
                ${events.map(({ name, description }) => renderItem(name, description))}
              `)}
            ${renderTab('CSS Custom Properties', cssProps.length, html `
                ${cssProps.map(({ name, description }) => renderItem(name, description))}
              `)}
            ${renderTab('CSS Shadow Parts', cssParts.length, html `
                ${cssParts.map(({ name, description }) => renderItem(name, description))}
              `)}
          </api-viewer-tabs>
        `;
    }
    updated(props) {
        if (props.has('name') && props.get('name')) {
            const tabs = this.renderRoot.querySelector('api-viewer-tabs');
            if (tabs instanceof ApiViewerTabs) {
                tabs.selectFirst();
            }
        }
    }
};
__decorate([
    property({ type: String })
], ApiViewerDocs.prototype, "name", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDocs.prototype, "props", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDocs.prototype, "attrs", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDocs.prototype, "slots", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDocs.prototype, "events", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDocs.prototype, "cssParts", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDocs.prototype, "cssProps", void 0);
ApiViewerDocs = __decorate([
    customElement('api-viewer-docs')
], ApiViewerDocs);

const caches = new WeakMap();
const applyKnobs = (component, knobs) => {
    Object.keys(knobs).forEach((key) => {
        const { type, attribute, value } = knobs[key];
        if (normalizeType(type) === 'boolean') {
            component.toggleAttribute(attribute || key, Boolean(value));
        }
        else {
            component[key] = value;
        }
    });
};
const applySlots = (component, slots) => {
    while (component.firstChild) {
        component.removeChild(component.firstChild);
    }
    slots.forEach(slot => {
        const div = document.createElement('div');
        const { name, content } = slot;
        if (name) {
            div.setAttribute('slot', name);
        }
        div.textContent = content;
        component.appendChild(div);
    });
};
const applyCssProps = (component, cssProps) => {
    cssProps.forEach(prop => {
        const { name, value } = prop;
        if (value) {
            if (value === prop.defaultValue) {
                component.style.removeProperty(name);
            }
            else {
                component.style.setProperty(name, value);
            }
        }
    });
};
const isDefinedPromise = (action) => typeof action === 'object' && Promise.resolve(action) === action;
/**
 * Awaits for "update complete promises" of elements
 * - for [lit-element](https://github.com/polymer/lit-element) that is `el.updateComplete`;
 * - for [stencil](https://github.com/ionic-team/stencil/) that is `el.componentOnReady()`;
 *
 * If none of those Promise hooks are found, it will wait for `setTimeout`.
 */
async function elementUpdated(element) {
    let hasSpecificAwait = false;
    const el = element;
    const litPromise = el.updateComplete;
    if (isDefinedPromise(litPromise)) {
        await litPromise;
        hasSpecificAwait = true;
    }
    const stencilPromise = el.componentOnReady ? el.componentOnReady() : false;
    if (isDefinedPromise(stencilPromise)) {
        await stencilPromise;
        hasSpecificAwait = true;
    }
    if (!hasSpecificAwait) {
        await new Promise(resolve => setTimeout(() => resolve()));
    }
    return el;
}
const renderer = directive((tag, knobs, slots, cssProps) => (part) => {
    if (!(part instanceof NodePart)) {
        throw new Error('renderer can only be used in text bindings');
    }
    let component = caches.get(part);
    if (component === undefined || component.tagName.toLowerCase() !== tag) {
        const node = getHostTemplateNode(tag);
        if (node) {
            component = node.cloneNode(true);
        }
        else {
            component = document.createElement(tag);
        }
        part.setValue(component);
        part.commit();
        const template = getSlotTemplate(tag);
        if (template instanceof HTMLTemplateElement) {
            const clone = document.importNode(template.content, true);
            component.appendChild(clone);
        }
        caches.set(part, component);
        const instance = part.value;
        // wait for rendering
        elementUpdated(instance).then(() => {
            instance.dispatchEvent(new CustomEvent('rendered', {
                detail: {
                    component
                },
                bubbles: true,
                composed: true
            }));
        });
    }
    applyKnobs(component, knobs);
    if (!hasSlotTemplate(tag) && slots.length) {
        applySlots(component, slots);
    }
    if (cssProps.length) {
        applyCssProps(component, cssProps);
    }
});

const getInputType = (type) => {
    switch (normalizeType(type)) {
        case 'boolean':
            return 'checkbox';
        case 'number':
            return 'number';
        default:
            return 'text';
    }
};
const cssPropRenderer = (knob, id) => {
    const { name, value } = knob;
    return html `
    <input
      id="${id}"
      type="text"
      .value="${String(value)}"
      data-name="${name}"
      part="input"
    />
  `;
};
const propRenderer = (knob, id) => {
    const { name, type, value } = knob;
    const inputType = getInputType(type);
    let input;
    if (value === undefined) {
        input = html `
      <input
        id="${id}"
        type="${inputType}"
        data-name="${name}"
        data-type="${type}"
        part="input"
      />
    `;
    }
    else if (normalizeType(type) === 'boolean') {
        input = html `
      <input
        id="${id}"
        type="checkbox"
        .checked="${Boolean(value)}"
        data-name="${name}"
        data-type="${type}"
        part="checkbox"
      />
    `;
    }
    else {
        input = html `
      <input
        id="${id}"
        type="${inputType}"
        .value="${String(value)}"
        data-name="${name}"
        data-type="${type}"
        part="input"
      />
    `;
    }
    return input;
};
const slotRenderer = (knob, id) => {
    const { name, content } = knob;
    return html `
    <input
      id="${id}"
      type="text"
      .value="${content}"
      data-type="slot"
      data-slot="${name}"
      part="input"
    />
  `;
};
const renderKnobs = (items, type, renderer) => {
    const rows = items.map((item) => {
        const { name } = item;
        const id = `${type}-${name || 'default'}`;
        const label = type === 'slot' ? getSlotTitle(name) : name;
        return html `
      <tr>
        <td>
          <label for="${id}" part="knob-label">${label}</label>
        </td>
        <td>${renderer(item, id)}</td>
      </tr>
    `;
    });
    return html `
    <table>
      ${rows}
    </table>
  `;
};

function escape(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
var htmlRender = {
    text: function (chunk) { return escape(chunk); },
    join: function (chunks) { return chunks.join(''); },
    wrap: function (className, chunk) { return "<span class=\"" + className + "\">" + chunk + "</span>"; }
};

function reStr(re) {
    return (re && re.source) || re;
}
var noneRe = { exec: function ( /*s*/) { return null; } };
function langRe(language, value, global) {
    return new RegExp(reStr(value), 'm' + (language.case_insensitive ? 'i' : '') + (global ? 'g' : ''));
}
function compileLanguage(language) {
    var cached_modes = [];
    function getCompiled(sub) {
        for (var _i = 0, cached_modes_1 = cached_modes; _i < cached_modes_1.length; _i++) {
            var _a = cached_modes_1[_i], mode = _a[0], compiled_1 = _a[1];
            if (sub === mode) {
                return compiled_1;
            }
        }
    }
    var cached_variants = [];
    function getVariants(mode) {
        if (!mode.variants || !mode.variants.length) {
            return undefined;
        }
        for (var _i = 0, cached_variants_1 = cached_variants; _i < cached_variants_1.length; _i++) {
            var _a = cached_variants_1[_i], mode_ = _a[0], variants_1 = _a[1];
            if (mode === mode_) {
                return variants_1;
            }
        }
        var variants = mode.variants.map(function (variant) { return (__assign({}, mode, { variants: undefined }, variant)); });
        cached_variants.push([mode, variants]);
        return variants;
    }
    function compileMode(mode, parent, parent_terminator_end) {
        var already_compiled = getCompiled(mode);
        if (already_compiled) {
            return already_compiled;
        }
        var compiled = {
            lexemesRe: langRe(language, mode.lexemes || /\w+/, true),
            relevance: mode.relevance == null ? 1 : mode.relevance,
            contains: [],
            terminators: noneRe,
            subLanguage: mode.subLanguage == null ? undefined :
                typeof mode.subLanguage == 'string' ? [mode.subLanguage] :
                    mode.subLanguage
        };
        cached_modes.push([mode, compiled]);
        if (mode.className) {
            compiled.className = mode.className;
        }
        if (mode.illegal) {
            compiled.illegalRe = langRe(language, mode.illegal);
        }
        for (var _i = 0, _a = ['endsParent', 'endsWithParent', 'skip', 'excludeBegin', 'excludeEnd', 'returnBegin', 'returnEnd']; _i < _a.length; _i++) {
            var key = _a[_i];
            if (mode[key]) {
                compiled[key] = true;
            }
        }
        // compile parenthes
        var compiled_terminator_end;
        if (parent) {
            var begin = mode.beginKeywords ?
                ("\\b(" + mode.beginKeywords.split(/\s+/).join('|') + ")\\b") :
                (mode.begin || /\B|\b/);
            mode.begin = begin;
            compiled.beginRe = langRe(language, begin);
            var end = !mode.end && !mode.endsWithParent ? /\B|\b/ : mode.end;
            if (end) {
                mode.end = end;
                compiled.endRe = langRe(language, end);
            }
            compiled_terminator_end = reStr(end) || '';
            if (mode.endsWithParent && parent_terminator_end) {
                compiled_terminator_end += (end ? '|' : '') + parent_terminator_end;
            }
        }
        // compile keywords
        var keywords = mode.keywords || mode.beginKeywords;
        if (keywords) {
            var compiled_keywords_1 = {};
            var flatten = function (className, str) {
                if (language.case_insensitive) {
                    str = str.toLowerCase();
                }
                var kws = str.split(/\s+/);
                for (var _i = 0, kws_1 = kws; _i < kws_1.length; _i++) {
                    var kw = kws_1[_i];
                    var _a = kw.split(/\|/), key = _a[0], rel = _a[1];
                    compiled_keywords_1[key] = [className, rel ? Number(rel) : 1];
                }
            };
            if (typeof keywords == 'string') { // string
                flatten('keyword', keywords);
            }
            else {
                for (var className in keywords) {
                    flatten(className, keywords[className]);
                }
            }
            compiled.keywords = compiled_keywords_1;
        }
        // compile contains
        var contains = [];
        if (mode.contains && mode.contains.length) {
            // expand mode
            for (var _b = 0, _c = mode.contains; _b < _c.length; _b++) {
                var child = _c[_b];
                var sub = child === 'self' ? mode : child;
                var variants = getVariants(sub) || (sub.endsWithParent && [__assign({}, sub)]) || [sub];
                for (var _d = 0, variants_2 = variants; _d < variants_2.length; _d++) {
                    var variant = variants_2[_d];
                    contains.push(variant);
                }
            }
            compiled.contains = contains.map(function (child) { return compileMode(child, compiled, compiled_terminator_end); });
        }
        if (mode.starts) {
            compiled.starts = compileMode(mode.starts, parent, parent_terminator_end);
        }
        var terminators = contains.map(function (child) { return child.beginKeywords ? "\\.?(" + child.begin + ")\\.?" : child.begin; }).concat([
            compiled_terminator_end,
            mode.illegal
        ]).map(reStr).filter(Boolean);
        if (terminators.length)
            compiled.terminators = langRe(language, terminators.join('|'), true);
        return compiled;
    }
    var compiled = compileMode(language);
    if (language.case_insensitive)
        compiled.case_insensitive = true;
    return compiled;
}

// Global internal variables used within the highlight.js library.
var languages = {};
var aliases = {};
function compiledLanguage(language) {
    return 'lexemesRe' in language;
}
function registerLanguage(language) {
    languages[language.name] = language;
    if (language.aliases) {
        for (var _i = 0, _a = language.aliases; _i < _a.length; _i++) {
            var alias = _a[_i];
            aliases[alias] = language.name;
        }
    }
}
function registerLanguages() {
    var languages = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        languages[_i] = arguments[_i];
    }
    for (var _a = 0, languages_1 = languages; _a < languages_1.length; _a++) {
        var language = languages_1[_a];
        registerLanguage(language);
    }
}
function listLanguages() {
    return Object.keys(languages);
}
function getLanguage(name) {
    name = (name || '').toLowerCase();
    name = aliases[name] || name;
    var language = languages[name];
    if (!language) {
        return undefined;
    }
    if (compiledLanguage(language)) {
        return language;
    }
    return languages[name] = compileLanguage(language);
}

var NUMBER_RE = '\\b\\d+(\\.\\d+)?';
// Common modes
var BACKSLASH_ESCAPE = {
    begin: '\\\\[\\s\\S]',
    relevance: 0
};
var APOS_STRING_MODE = {
    className: 'string',
    begin: '\'', end: '\'',
    illegal: '\\n',
    contains: [BACKSLASH_ESCAPE]
};
var QUOTE_STRING_MODE = {
    className: 'string',
    begin: '"', end: '"',
    illegal: '\\n',
    contains: [BACKSLASH_ESCAPE]
};
var PHRASAL_WORDS_MODE = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
};
function COMMENT(begin, end, inherits) {
    if (inherits === void 0) { inherits = {}; }
    var mode = __assign({ className: 'comment', begin: begin, end: end, contains: [] }, inherits);
    var contains = mode.contains;
    if (contains) {
        contains.push(PHRASAL_WORDS_MODE);
        contains.push({
            className: 'doctag',
            begin: '(?:TODO|FIXME|NOTE|BUG|XXX):',
            relevance: 0
        });
    }
    return mode;
}
var C_LINE_COMMENT_MODE = COMMENT('//', '$');
var C_BLOCK_COMMENT_MODE = COMMENT('/\\*', '\\*/');
var HASH_COMMENT_MODE = COMMENT('#', '$');
var CSS_NUMBER_MODE = {
    className: 'number',
    begin: NUMBER_RE + '(' +
        '%|em|ex|ch|rem' +
        '|vw|vh|vmin|vmax' +
        '|cm|mm|in|pt|pc|px' +
        '|deg|grad|rad|turn' +
        '|s|ms' +
        '|Hz|kHz' +
        '|dpi|dpcm|dppx' +
        ')?',
    relevance: 0
};

/*
Language: HTML, XML
Category: common
*/
var XML_IDENT_RE = '[A-Za-z0-9\\._:-]+';
var TAG_INTERNALS = {
    endsWithParent: true,
    illegal: /</,
    relevance: 0,
    contains: [
        {
            className: 'attr',
            begin: XML_IDENT_RE,
            relevance: 0
        },
        {
            begin: /=\s*/,
            relevance: 0,
            contains: [
                {
                    className: 'string',
                    endsParent: true,
                    variants: [
                        { begin: /"/, end: /"/ },
                        { begin: /'/, end: /'/ },
                        { begin: /[^\s"'=<>`]+/ }
                    ]
                }
            ]
        }
    ]
};
var XML = {
    name: 'xml',
    aliases: ['html', 'xhtml', 'rss', 'atom', 'xjb', 'xsd', 'xsl', 'plist'],
    case_insensitive: true,
    contains: [
        {
            className: 'meta',
            begin: '<!DOCTYPE', end: '>',
            relevance: 10,
            contains: [{ begin: '\\[', end: '\\]' }]
        },
        COMMENT('<!--', '-->', {
            relevance: 10
        }),
        {
            begin: '<\\!\\[CDATA\\[', end: '\\]\\]>',
            relevance: 10
        },
        {
            className: 'meta',
            begin: /<\?xml/, end: /\?>/, relevance: 10
        },
        {
            begin: /<\?(php)?/, end: /\?>/,
            subLanguage: 'php',
            contains: [{ begin: '/\\*', end: '\\*/', skip: true }]
        },
        {
            className: 'tag',
            /*
            The lookahead pattern (?=...) ensures that 'begin' only matches
            '<style' as a single word, followed by a whitespace or an
            ending braket. The '$' is needed for the lexeme to be recognized
            by subMode() that tests lexemes outside the stream.
            */
            begin: '<style(?=\\s|>|$)', end: '>',
            keywords: { name: 'style' },
            contains: [TAG_INTERNALS],
            starts: {
                end: '</style>', returnEnd: true,
                subLanguage: ['css', 'xml']
            }
        },
        {
            className: 'tag',
            // See the comment in the <style tag about the lookahead pattern
            begin: '<script(?=\\s|>|$)', end: '>',
            keywords: { name: 'script' },
            contains: [TAG_INTERNALS],
            starts: {
                end: '\<\/script\>', returnEnd: true,
                subLanguage: ['actionscript', 'javascript', 'handlebars', 'xml']
            }
        },
        {
            className: 'tag',
            begin: '</?', end: '/?>',
            contains: [
                {
                    className: 'name', begin: /[^\/><\s]+/, relevance: 0
                },
                TAG_INTERNALS
            ]
        }
    ]
};

/* Utility functions */
function testRe(re, lexeme) {
    var match = re && re.exec(lexeme);
    return match && match.index === 0 || false;
}
/*
Core highlighting function. Accepts a language name, or an alias, and a
string with the code to highlight. Returns an object with the following
properties:
- relevance (int)
- value (an HTML string with highlighting markup)
*/
function highlight(options, render, lang, value, ignore_illegals, continuation) {
    var output = [{ content: [] }];
    function outContent(content) {
        var cont = output[0].content;
        // optimization for sequential strings outputs
        if (typeof content == 'string' && cont.length &&
            typeof cont[cont.length - 1] == 'string') {
            cont[cont.length - 1] += content;
        }
        else {
            cont.push(content);
        }
    }
    function outText(text) {
        outContent(render.text(text));
    }
    function openSpan(className, noPrefix) {
        if (!noPrefix)
            className = options.classPrefix + className;
        output.unshift({ className: className, content: [] });
    }
    function wrapSpan(className) {
        className = options.classPrefix + className;
        output.push({ className: className, content: [] });
    }
    function closeSpan() {
        if (output.length < 2)
            throw "unbalanced";
        var _a = output.shift(), className = _a.className, content = _a.content;
        var output_ = render.join(content);
        outContent(className ? render.wrap(className, output_) : output_);
    }
    function endOfMode(mode, lexeme) {
        if (testRe(mode.endRe, lexeme)) {
            for (; mode.endsParent && mode.parent; mode = mode.parent)
                ;
            return mode;
        }
        if (mode.endsWithParent && mode.parent) {
            return endOfMode(mode.parent, lexeme);
        }
    }
    function processKeywords() {
        if (!top.keywords) {
            outText(mode_buffer);
            return;
        }
        var last_index = 0;
        top.lexemesRe.lastIndex = 0;
        var match = top.lexemesRe.exec(mode_buffer);
        while (match) {
            outText(mode_buffer.substring(last_index, match.index));
            // match keyword
            var match_str = language.case_insensitive ?
                match[0].toLowerCase() : match[0];
            var keyword_match = top.keywords.hasOwnProperty(match_str) &&
                top.keywords[match_str];
            if (keyword_match) {
                relevance += keyword_match[1];
                openSpan(keyword_match[0], false);
                outText(match[0]);
                closeSpan();
            }
            else {
                outText(match[0]);
            }
            last_index = top.lexemesRe.lastIndex;
            match = top.lexemesRe.exec(mode_buffer);
        }
        outText(mode_buffer.substr(last_index));
    }
    function processSubLanguage(subLanguage) {
        var explicitLanguage = subLanguage.length == 1 && subLanguage[0];
        if (explicitLanguage && !getLanguage(explicitLanguage)) {
            outText(mode_buffer);
            return;
        }
        var result = explicitLanguage ?
            highlight(options, render, explicitLanguage, mode_buffer, true, continuations[explicitLanguage]) :
            highlightAuto(options, render, mode_buffer, subLanguage.length ? top.subLanguage : undefined);
        // Counting embedded language score towards the host language may be disabled
        // with zeroing the containing mode relevance. Usecase in point is Markdown that
        // allows XML everywhere and makes every XML snippet to have a much larger Markdown
        // score.
        if (top.relevance > 0) {
            relevance += result.relevance;
        }
        if (explicitLanguage && result.top) {
            continuations[explicitLanguage] = result.top;
        }
        openSpan(result.language, true);
        outContent(result.value);
        closeSpan();
    }
    function processBuffer() {
        if (top.subLanguage != null)
            processSubLanguage(top.subLanguage);
        else
            processKeywords();
        mode_buffer = '';
    }
    function startNewMode(mode) {
        if (mode.className) {
            openSpan(mode.className, false);
        }
        top = Object.create(mode, { parent: { value: top } });
    }
    function processLexeme(buffer, lexeme) {
        mode_buffer += buffer;
        if (lexeme == null) {
            processBuffer();
            return 0;
        }
        var new_mode;
        // subMode(top, lexeme)
        for (var _i = 0, _a = top.contains; _i < _a.length; _i++) {
            var sub = _a[_i];
            if (testRe(sub.beginRe, lexeme)) {
                new_mode = sub;
                break;
            }
        }
        if (new_mode) {
            if (new_mode.skip) {
                mode_buffer += lexeme;
            }
            else {
                if (new_mode.excludeBegin) {
                    mode_buffer += lexeme;
                }
                processBuffer();
                if (!new_mode.returnBegin && !new_mode.excludeBegin) {
                    mode_buffer = lexeme;
                }
            }
            startNewMode(new_mode /*, lexeme*/);
            return new_mode.returnBegin ? 0 : lexeme.length;
        }
        var end_mode = endOfMode(top, lexeme);
        if (end_mode) {
            var origin_1 = top;
            if (origin_1.skip) {
                mode_buffer += lexeme;
            }
            else {
                if (!(origin_1.returnEnd || origin_1.excludeEnd)) {
                    mode_buffer += lexeme;
                }
                processBuffer();
                if (origin_1.excludeEnd) {
                    mode_buffer = lexeme;
                }
            }
            do {
                if (top.className) {
                    closeSpan();
                }
                if (!top.skip && !top.subLanguage) {
                    relevance += top.relevance;
                }
                top = top.parent;
            } while (top !== end_mode.parent);
            if (end_mode.starts) {
                startNewMode(end_mode.starts /*, ''*/);
            }
            return origin_1.returnEnd ? 0 : lexeme.length;
        }
        // is illegal
        if (!ignore_illegals && testRe(top.illegalRe, lexeme)) {
            throw new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.className || '<unnamed>') + '"');
        }
        /*
        Parser should not reach this point as all types of lexemes should be caught
        earlier, but if it does due to some bug make sure it advances at least one
        character forward to prevent infinite looping.
        */
        mode_buffer += lexeme;
        return lexeme.length || 1;
    }
    var language = getLanguage(lang);
    if (!language)
        throw new Error("Unknown language: \"" + lang + "\"");
    var top = continuation || language;
    var continuations = {}; // keep continuations for sub-languages
    var current;
    for (current = top; current && current !== language; current = current.parent) {
        if (current.className) {
            wrapSpan(current.className);
        }
    }
    var mode_buffer = '';
    var relevance = 0;
    try {
        var match = void 0, count = void 0, index = 0;
        while (true) {
            top.terminators.lastIndex = index;
            match = top.terminators.exec(value);
            if (!match)
                break;
            count = processLexeme(value.substring(index, match.index), match[0]);
            index = match.index + count;
        }
        processLexeme(value.substr(index));
        for (current = top; current.parent; current = current.parent) { // close dangling modes
            if (current.className) {
                closeSpan();
            }
        }
        if (output.length != 1)
            throw "unbalanced";
        var _a = output[0], className = _a.className, content = _a.content;
        var output_ = render.join(content);
        var result = className ? render.wrap(className, output_) : output_;
        return {
            language: lang,
            relevance: relevance,
            value: result,
            top: top
        };
    }
    catch (e) {
        if (e.message && e.message.indexOf('Illegal') !== -1) {
            return {
                language: lang,
                relevance: 0,
                value: render.text(value)
            };
        }
        else {
            throw e;
        }
    }
}
/*
Highlighting with language detection. Accepts a string with the code to
highlight. Returns an object with the following properties:
- language (detected language)
- relevance (int)
- value (an HTML string with highlighting markup)
- second_best (object with the same structure for second-best heuristically
  detected language, may be absent)
*/
function highlightAuto(options, render, text, languageSubset) {
    if (languageSubset === void 0) { languageSubset = options.languages || listLanguages(); }
    var result = {
        language: '',
        relevance: 0,
        value: render.text(text)
    };
    if (text != '') {
        var second_best = result;
        var languages = languageSubset.filter(getLanguage);
        for (var _i = 0, languages_1 = languages; _i < languages_1.length; _i++) {
            var lang = languages_1[_i];
            var current = highlight(options, render, lang, text, false);
            if (current.relevance > second_best.relevance) {
                second_best = current;
            }
            if (current.relevance > result.relevance) {
                second_best = result;
                result = current;
            }
        }
        if (second_best.language) {
            result.second_best = second_best;
        }
    }
    return result;
}
var defaults = {
    classPrefix: 'hljs-',
    //tabReplace: undefined,
    useBr: false,
};
function init(render, options) {
    if (options === void 0) { options = {}; }
    return {
        render: render,
        options: __assign({}, defaults, options)
    };
}
function process(_a, source, lang) {
    var render = _a.render, options = _a.options;
    return typeof lang == 'string' ? highlight(options, render, lang, source, false) :
        highlightAuto(options, render, source, lang);
}

const FUNCTION_LIKE = {
    begin: /[\w-]+\(/,
    returnBegin: true,
    contains: [
        {
            className: 'built_in',
            begin: /[\w-]+/
        },
        {
            begin: /\(/,
            end: /\)/,
            contains: [APOS_STRING_MODE, QUOTE_STRING_MODE, CSS_NUMBER_MODE]
        }
    ]
};
const ATTRIBUTE = {
    className: 'attribute',
    begin: /\S/,
    end: ':',
    excludeEnd: true,
    starts: {
        endsWithParent: true,
        excludeEnd: true,
        contains: [
            FUNCTION_LIKE,
            CSS_NUMBER_MODE,
            QUOTE_STRING_MODE,
            APOS_STRING_MODE,
            C_BLOCK_COMMENT_MODE,
            {
                className: 'number',
                begin: '#[0-9A-Fa-f]+'
            },
            {
                className: 'meta',
                begin: '!important'
            }
        ]
    }
};
const IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
const RULE = {
    begin: /(?:[A-Z_.-]+|--[a-zA-Z0-9_-]+)\s*:/,
    returnBegin: true,
    end: ';',
    endsWithParent: true,
    contains: [ATTRIBUTE]
};
const CSS = {
    name: 'css',
    case_insensitive: true,
    illegal: /[=/|'$]/,
    contains: [
        C_BLOCK_COMMENT_MODE,
        {
            className: 'selector-attr',
            begin: /\[/,
            end: /\]/,
            illegal: '$',
            contains: [APOS_STRING_MODE, QUOTE_STRING_MODE]
        },
        {
            className: 'selector-tag',
            begin: IDENT_RE,
            relevance: 0
        },
        {
            begin: '{',
            end: '}',
            illegal: /\S/,
            contains: [C_BLOCK_COMMENT_MODE, RULE]
        }
    ]
};

var highlightTheme = css `
  pre {
    margin: 0;
    color: black;
    background: none;
    font-family: var(--ave-monospace-font);
    font-size: 0.875rem;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    tab-size: 4;
    hyphens: none;
    text-shadow: none;
  }

  code {
    font-family: inherit;
  }

  .comment {
    color: slategray;
  }

  .attr,
  .selector-tag {
    color: #690;
  }

  .css {
    color: #333;
  }

  .built_in {
    color: #dd4a68;
  }

  .meta {
    color: #e90;
    font-weight: bold;
  }

  .string {
    color: #07a;
  }

  .tag {
    color: #999;
  }

  .attribute,
  .name,
  .number {
    color: #905;
  }
`;

// register languages
registerLanguages(CSS, XML);
// initialize highlighter
const highlighter = init(htmlRender, {
    classPrefix: ''
});
const INDENT = '  ';
const unindent = (text) => {
    if (!text)
        return text;
    const lines = text.replace(/\t/g, INDENT).split('\n');
    const indent = lines.reduce((prev, line) => {
        if (/^\s*$/.test(line))
            return prev; // Completely ignore blank lines.
        const match = line.match(/^(\s*)/);
        const lineIndent = match && match[0].length;
        if (prev === null)
            return lineIndent;
        return lineIndent < prev ? lineIndent : prev;
    }, null);
    return lines.map(l => INDENT + l.substr(indent)).join('\n');
};
const renderSnippet = (tag, values, slots, cssProps) => {
    let markup = `<${tag}`;
    Object.keys(values)
        .sort((a, b) => (a > b ? 1 : -1))
        .forEach((key) => {
        const knob = values[key];
        const attr = knob.attribute || key;
        switch (normalizeType(knob.type)) {
            case 'boolean':
                markup += knob.value ? ` ${attr}` : '';
                break;
            default:
                markup += knob.value != null ? ` ${attr}="${knob.value}"` : '';
                break;
        }
    });
    markup += `>`;
    const template = getSlotTemplate(tag);
    if (template instanceof HTMLTemplateElement) {
        const tpl = template.innerHTML.replace(/\s+$/, '').replace(/(="")/g, '');
        markup += unindent(tpl);
        markup += `\n`;
    }
    else if (slots.length) {
        slots.forEach(slot => {
            const { name, content } = slot;
            const div = name ? `<div slot="${name}">` : '<div>';
            markup += `\n${INDENT}${div}${content}</div>`;
        });
        markup += `\n`;
    }
    markup += `</${tag}>`;
    const cssValues = cssProps.filter(p => p.value !== p.defaultValue);
    if (cssValues.length) {
        markup += `\n<style>\n${INDENT}${tag} {\n`;
        cssValues.forEach(prop => {
            if (prop.value) {
                markup += `${INDENT}${INDENT}${prop.name}: ${prop.value};\n`;
            }
        });
        markup += `${INDENT}}\n</style>`;
    }
    const { value } = process(highlighter, markup, ['xml', 'css']);
    return html `
    <pre><code>${unsafeHTML(value)}</code></pre>
  `;
};
let ApiViewerDemoSnippet = class ApiViewerDemoSnippet extends LitElement {
    constructor() {
        super(...arguments);
        this.tag = '';
        this.knobs = {};
        this.slots = [];
        this.cssProps = [];
    }
    static get styles() {
        return [
            highlightTheme,
            css `
        :host {
          display: block;
          padding: 0.75rem 1rem;
        }
      `
        ];
    }
    render() {
        return html `
      ${renderSnippet(this.tag, this.knobs, this.slots, this.cssProps)}
    `;
    }
    get source() {
        return this.renderRoot.querySelector('code');
    }
};
__decorate([
    property({ type: String })
], ApiViewerDemoSnippet.prototype, "tag", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemoSnippet.prototype, "knobs", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemoSnippet.prototype, "slots", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemoSnippet.prototype, "cssProps", void 0);
ApiViewerDemoSnippet = __decorate([
    customElement('api-viewer-demo-snippet')
], ApiViewerDemoSnippet);

const renderDetail = (detail) => {
    const result = detail;
    if ('value' in detail && detail.value === undefined) {
        result.value = 'undefined';
    }
    return JSON.stringify(detail).replace('"undefined"', 'undefined');
};
const renderEvents = (log) => {
    return html `
    ${log.map(e => {
        return html `
        <p part="event-record">
          event: "${e.type}". detail: ${renderDetail(e.detail)}
        </p>
      `;
    })}
  `;
};
let ApiViewerDemoEvents = class ApiViewerDemoEvents extends LitElement {
    constructor() {
        super(...arguments);
        this.log = [];
    }
    createRenderRoot() {
        return this;
    }
    render() {
        const { log } = this;
        return html `
      <button
        @click="${this._onClearClick}"
        ?hidden="${!log.length}"
        part="button"
      >
        Clear
      </button>
      ${cache(log.length
            ? renderEvents(log)
            : html `
              <p part="event-record">
                Interact with component to see the event log.
              </p>
            `)}
    `;
    }
    _onClearClick() {
        this.dispatchEvent(new CustomEvent('clear'));
    }
};
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemoEvents.prototype, "log", void 0);
ApiViewerDemoEvents = __decorate([
    customElement('api-viewer-demo-events')
], ApiViewerDemoEvents);

const getDefault = (prop) => {
    switch (normalizeType(prop.type)) {
        case 'boolean':
            return prop.default !== 'false';
        case 'number':
            return Number(prop.default);
        default:
            return prop.default;
    }
};
// TODO: remove when analyzer outputs "readOnly" to JSON
const isGetter = (element, prop) => {
    function getDescriptor(obj) {
        return obj === HTMLElement
            ? undefined
            : Object.getOwnPropertyDescriptor(obj.prototype, prop) ||
                getDescriptor(Object.getPrototypeOf(obj));
    }
    if (element) {
        const descriptor = getDescriptor(element.constructor);
        return Boolean(descriptor && descriptor.get && descriptor.set === undefined);
    }
    return false;
};
let ApiViewerDemoLayout = class ApiViewerDemoLayout extends LitElement {
    constructor() {
        super(...arguments);
        this.tag = '';
        this.props = [];
        this.slots = [];
        this.events = [];
        this.cssProps = [];
        this.processedSlots = [];
        this.processedCss = [];
        this.eventLog = [];
        this.knobs = {};
        this.copyBtnText = 'copy';
    }
    createRenderRoot() {
        return this;
    }
    render() {
        const noEvents = isEmptyArray(this.events);
        const noCss = isEmptyArray(this.cssProps);
        const noSlots = isEmptyArray(this.slots);
        const noKnobs = isEmptyArray(this.props) && noSlots;
        return html `
      <div part="demo-output" @rendered="${this._onRendered}">
        ${renderer(this.tag, this.knobs, this.processedSlots, this.processedCss)}
      </div>
      <api-viewer-tabs part="demo-tabs">
        <api-viewer-tab heading="Source" slot="tab" part="tab"></api-viewer-tab>
        <api-viewer-panel slot="panel" part="tab-panel">
          <button @click="${this._onCopyClick}" part="button">
            ${this.copyBtnText}
          </button>
          <api-viewer-demo-snippet
            .tag="${this.tag}"
            .knobs="${this.knobs}"
            .slots="${this.processedSlots}"
            .cssProps="${this.processedCss}"
          ></api-viewer-demo-snippet>
        </api-viewer-panel>
        <api-viewer-tab
          heading="Knobs"
          slot="tab"
          part="tab"
          ?hidden="${noKnobs}"
        ></api-viewer-tab>
        <api-viewer-panel slot="panel" part="tab-panel">
          <div part="knobs" ?hidden="${noKnobs}">
            <section part="knobs-column" @change="${this._onPropChanged}">
              <h3 part="knobs-header">Properties</h3>
              ${renderKnobs(this.props, 'prop', propRenderer)}
            </section>
            <section
              ?hidden="${hasSlotTemplate(this.tag) || noSlots}"
              part="knobs-column"
              @change="${this._onSlotChanged}"
            >
              <h3 part="knobs-header">Slots</h3>
              ${renderKnobs(this.processedSlots, 'slot', slotRenderer)}
            </section>
          </div>
        </api-viewer-panel>
        <api-viewer-tab
          heading="Styles"
          slot="tab"
          part="tab"
          ?hidden="${noCss}"
        ></api-viewer-tab>
        <api-viewer-panel slot="panel" part="tab-panel">
          <div part="knobs" ?hidden="${noCss}">
            <section part="knobs-column" @change="${this._onCssChanged}">
              <h3 part="knobs-header">Custom CSS Properties</h3>
              ${renderKnobs(this.cssProps, 'css-prop', cssPropRenderer)}
            </section>
          </div>
        </api-viewer-panel>
        <api-viewer-tab
          id="events"
          heading="Events"
          slot="tab"
          part="tab"
          ?hidden="${noEvents}"
        ></api-viewer-tab>
        <api-viewer-panel slot="panel" part="tab-panel">
          <api-viewer-demo-events
            ?hidden="${noEvents}"
            .log="${this.eventLog}"
            @clear="${this._onLogClear}"
            part="event-log"
          ></api-viewer-demo-events>
        </api-viewer-panel>
      </api-viewer-tabs>
    `;
    }
    firstUpdated(props) {
        if (props.has('props')) {
            const element = document.createElement(this.tag);
            // Apply default property values from analyzer
            // Do not include getters to prevent exception
            this.props = this.props
                .filter(({ name }) => !isGetter(element, name))
                .map((prop) => {
                return typeof prop.default === 'string'
                    ? {
                        ...prop,
                        value: getDefault(prop)
                    }
                    : prop;
            });
        }
    }
    updated(props) {
        if (props.has('slots') && this.slots) {
            this.processedSlots = this.slots
                .sort((a, b) => {
                if (a.name === '') {
                    return 1;
                }
                if (b.name === '') {
                    return -1;
                }
                return a.name.localeCompare(b.name);
            })
                .map((slot) => {
                return {
                    ...slot,
                    content: getSlotTitle(slot.name)
                };
            });
        }
    }
    _getProp(name) {
        return this.props.find(p => p.attribute === name || p.name === name);
    }
    _onLogClear() {
        this.eventLog = [];
        const tab = this.renderRoot.querySelector('#events');
        if (tab) {
            tab.focus();
        }
    }
    _onCopyClick() {
        const snippet = this.renderRoot.querySelector('api-viewer-demo-snippet');
        if (snippet && snippet.source) {
            const range = document.createRange();
            range.selectNodeContents(snippet.source);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            try {
                document.execCommand('copy');
                this.copyBtnText = 'done';
            }
            catch (err) {
                // Copy command is not available
                console.error(err);
                this.copyBtnText = 'error';
            }
            // Return to the copy button after a second.
            setTimeout(() => {
                this.copyBtnText = 'copy';
            }, 1000);
            selection.removeAllRanges();
        }
    }
    _onCssChanged(e) {
        const target = e.composedPath()[0];
        const { value, dataset } = target;
        const { name } = dataset;
        this.processedCss = this.processedCss.map(prop => {
            return prop.name === name
                ? {
                    ...prop,
                    value
                }
                : prop;
        });
    }
    _onPropChanged(e) {
        const target = e.composedPath()[0];
        const { name, type } = target.dataset;
        let value;
        switch (normalizeType(type)) {
            case 'boolean':
                value = target.checked;
                break;
            case 'number':
                value = target.value === '' ? null : Number(target.value);
                break;
            default:
                value = target.value;
        }
        const { attribute } = this._getProp(name);
        this.knobs = Object.assign(this.knobs, {
            [name]: { type, value, attribute }
        });
    }
    _onSlotChanged(e) {
        const target = e.composedPath()[0];
        const name = target.dataset.slot;
        const content = target.value;
        this.processedSlots = this.processedSlots.map(slot => {
            return slot.name === name
                ? {
                    ...slot,
                    content
                }
                : slot;
        });
    }
    _onRendered(e) {
        const { component } = e.detail;
        if (hasHostTemplate(this.tag)) {
            // Apply property values from template
            this.props
                .filter(prop => {
                const { name, type } = prop;
                const defaultValue = getDefault(prop);
                return (component[name] !== defaultValue ||
                    (normalizeType(type) === 'boolean' && defaultValue));
            })
                .forEach(prop => {
                this._syncKnob(component, prop);
            });
        }
        this.events.forEach(event => {
            this._listen(component, event.name);
        });
        if (this.cssProps.length) {
            const style = getComputedStyle(component);
            this.processedCss = this.cssProps.map(cssProp => {
                let value = style.getPropertyValue(cssProp.name);
                const result = cssProp;
                if (value) {
                    value = value.trim();
                    result.defaultValue = value;
                    result.value = value;
                }
                return result;
            });
        }
    }
    _listen(component, event) {
        component.addEventListener(event, ((e) => {
            const s = '-changed';
            if (event.endsWith(s)) {
                const prop = this._getProp(event.replace(s, ''));
                if (prop) {
                    this._syncKnob(component, prop);
                }
            }
            this.eventLog.push(e);
        }));
    }
    _syncKnob(component, changed) {
        const { name, type, attribute } = changed;
        const value = component[name];
        // update knobs to avoid duplicate event
        this.knobs = Object.assign(this.knobs, {
            [name]: { type, value, attribute }
        });
        this.props = this.props.map(prop => {
            return prop.name === name
                ? {
                    ...prop,
                    value
                }
                : prop;
        });
    }
};
__decorate([
    property({ type: String })
], ApiViewerDemoLayout.prototype, "tag", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemoLayout.prototype, "props", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemoLayout.prototype, "slots", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemoLayout.prototype, "events", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemoLayout.prototype, "cssProps", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemoLayout.prototype, "processedSlots", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemoLayout.prototype, "processedCss", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemoLayout.prototype, "eventLog", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemoLayout.prototype, "knobs", void 0);
__decorate([
    property({ type: String })
], ApiViewerDemoLayout.prototype, "copyBtnText", void 0);
ApiViewerDemoLayout = __decorate([
    customElement('api-viewer-demo-layout')
], ApiViewerDemoLayout);

let ApiViewerDemo = class ApiViewerDemo extends LitElement {
    constructor() {
        super(...arguments);
        this.name = '';
        this.props = [];
        this.slots = [];
        this.events = [];
        this.cssProps = [];
        this.whenDefined = Promise.resolve();
    }
    async renderDemoLayout(whenDefined) {
        await whenDefined;
        return html `
      <api-viewer-demo-layout
        .tag="${this.name}"
        .props="${this.props}"
        .slots="${this.slots}"
        .events="${this.events}"
        .cssProps="${this.cssProps}"
      ></api-viewer-demo-layout>
    `;
    }
    createRenderRoot() {
        return this;
    }
    render() {
        const { name } = this;
        if (name && this.lastName !== name) {
            this.lastName = name;
            this.whenDefined = customElements.whenDefined(name);
        }
        return html `
      ${until(this.renderDemoLayout(this.whenDefined), html `
          <div part="warning">
            Element "${this.name}" is not defined. Have you imported it?
          </div>
        `)}
    `;
    }
};
__decorate([
    property({ type: String })
], ApiViewerDemo.prototype, "name", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemo.prototype, "props", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemo.prototype, "slots", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemo.prototype, "events", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemo.prototype, "cssProps", void 0);
ApiViewerDemo = __decorate([
    customElement('api-viewer-demo')
], ApiViewerDemo);

let radioId = 0;
let ApiViewerContent = class ApiViewerContent extends LitElement {
    constructor() {
        super();
        this.elements = [];
        this.selected = 0;
        this.section = 'docs';
        this._id = ++radioId;
    }
    createRenderRoot() {
        return this;
    }
    render() {
        const { elements, selected, section } = this;
        const { name, description, properties, attributes, slots, events, cssParts, cssProperties } = { ...EMPTY_ELEMENT, ...(elements[selected] || {}) };
        // TODO: analyzer should sort CSS custom properties
        const cssProps = (cssProperties || []).sort((a, b) => a.name > b.name ? 1 : -1);
        return html `
      <header part="header">
        <div class="tag-name">&lt;${name}&gt;</div>
        <nav>
          <input
            id="docs"
            type="radio"
            name="section-${this._id}"
            value="docs"
            ?checked="${section === 'docs'}"
            @change="${this._onToggle}"
            part="radio-button"
          />
          <label part="radio-label" for="docs">Docs</label>
          <input
            id="demo"
            type="radio"
            name="section-${this._id}"
            value="demo"
            ?checked="${section === 'demo'}"
            @change="${this._onToggle}"
            part="radio-button"
          />
          <label part="radio-label" for="demo">Demo</label>
          <label part="select-label">
            <select
              @change="${this._onSelect}"
              .value="${String(selected)}"
              ?hidden="${elements.length === 1}"
              part="select"
            >
              ${elements.map((tag, idx) => {
            return html `
                  <option value="${idx}">${tag.name}</option>
                `;
        })}
            </select>
          </label>
        </nav>
      </header>
      ${cache(section === 'docs'
            ? html `
              <div ?hidden="${description === ''}" part="docs-description">
                ${parse$1(description)}
              </div>
              <api-viewer-docs
                .name="${name}"
                .props="${properties}"
                .attrs="${attributes}"
                .events="${events}"
                .slots="${slots}"
                .cssParts="${cssParts}"
                .cssProps="${cssProps}"
              ></api-viewer-docs>
            `
            : html `
              <api-viewer-demo
                .name="${name}"
                .props="${properties}"
                .slots="${slots}"
                .events="${events}"
                .cssProps="${cssProps}"
              ></api-viewer-demo>
            `)}
    `;
    }
    _onSelect(e) {
        this.selected = Number(e.target.value);
    }
    _onToggle(e) {
        this.section = e.target.value;
    }
};
__decorate([
    property({ attribute: false })
], ApiViewerContent.prototype, "elements", void 0);
__decorate([
    property({ type: Number })
], ApiViewerContent.prototype, "selected", void 0);
__decorate([
    property({ type: String })
], ApiViewerContent.prototype, "section", void 0);
ApiViewerContent = __decorate([
    customElement('api-viewer-content')
], ApiViewerContent);

async function fetchJson(src) {
    let result = [];
    try {
        const file = await fetch(src);
        const json = (await file.json());
        if (Array.isArray(json.tags) && json.tags.length) {
            result = json.tags;
        }
        else {
            console.error(`No element definitions found at ${src}`);
        }
    }
    catch (e) {
        console.error(e);
    }
    return result;
}
async function renderDocs(jsonFetched, section, selected) {
    const elements = await jsonFetched;
    const index = elements.findIndex(el => el.name === selected);
    return elements.length
        ? html `
        <api-viewer-content
          .elements="${elements}"
          .section="${section}"
          .selected="${index >= 0 ? index : 0}"
        ></api-viewer-content>
      `
        : html `
        <div part="warning">
          No custom elements found in the JSON file.
        </div>
      `;
}
class ApiViewerBase extends LitElement {
    constructor() {
        super(...arguments);
        this.section = 'docs';
        this.jsonFetched = Promise.resolve([]);
    }
    render() {
        const { src } = this;
        if (src && this.lastSrc !== src) {
            this.lastSrc = src;
            this.jsonFetched = fetchJson(src);
        }
        return html `
      ${until(renderDocs(this.jsonFetched, this.section, this.selected))}
    `;
    }
    firstUpdated() {
        queryTemplates(this);
    }
}
__decorate([
    property({ type: String })
], ApiViewerBase.prototype, "src", void 0);
__decorate([
    property({ type: String })
], ApiViewerBase.prototype, "section", void 0);
__decorate([
    property({ type: String })
], ApiViewerBase.prototype, "selected", void 0);

var styles = css `
  :host {
    display: block;
    text-align: left;
    box-sizing: border-box;
    max-width: 800px;
    min-width: 360px;
    font-size: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Oxygen-Sans', Ubuntu, Cantarell, sans-serif;
    border: 1px solid var(--ave-border-color);
    border-radius: var(--ave-border-radius);

    --ave-primary-color: #01579b;
    --ave-accent-color: #d63200;
    --ave-border-color: rgba(0, 0, 0, 0.12);
    --ave-border-radius: 4px;
    --ave-header-color: #fff;
    --ave-item-color: rgba(0, 0, 0, 0.87);
    --ave-label-color: #424242;
    --ave-link-color: #01579b;
    --ave-link-hover-color: #d63200;
    --ave-tab-indicator-size: 2px;
    --ave-tab-color: rgba(0, 0, 0, 0.54);
    --ave-monospace-font: Menlo, 'DejaVu Sans Mono', 'Liberation Mono', Consolas,
      'Courier New', monospace;
  }

  [hidden] {
    display: none !important;
  }

  p,
  ul,
  ol {
    margin: 1rem 0;
    font-size: 0.9375rem;
    line-height: 1.5;
  }

  pre {
    white-space: pre-wrap;
  }

  a {
    color: var(--ave-link-color);
  }

  a:hover {
    color: var(--ave-link-hover-color);
  }

  button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    text-transform: uppercase;
    border: none;
    border-radius: 0.25em;
    cursor: pointer;
    background: var(--ave-button-background, rgba(0, 0, 0, 0.3));
    color: var(--ave-button-color, #fff);
  }

  button:focus,
  button:hover {
    background: var(--ave-button-active-background, rgba(0, 0, 0, 0.6));
  }

  api-viewer-content,
  api-viewer-docs,
  api-viewer-demo,
  api-viewer-demo-layout {
    display: block;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem;
    background: var(--ave-primary-color);
    border-top-left-radius: var(--ave-border-radius);
    border-top-right-radius: var(--ave-border-radius);
  }

  .tag-name {
    color: var(--ave-header-color);
    font-family: var(--ave-monospace-font);
    font-size: 0.875rem;
    line-height: 1.5rem;
  }

  nav {
    display: flex;
    align-items: center;
  }

  [part='warning'] {
    padding: 1rem;
  }

  [part='radio-label'] {
    margin: 0 0.75rem 0 0.25rem;
    color: var(--ave-header-color);
    font-size: 0.875rem;
  }

  [part='select-label'] {
    margin-left: 0.5rem;
  }

  /* Docs styles */
  [part='tab'][heading^='CSS'] {
    font-size: 0.8125rem;
  }

  [part='docs-item'] {
    display: block;
    padding: 0.5rem;
    color: var(--ave-item-color);
  }

  [part='docs-description'] {
    display: block;
    padding: 0 1rem;
    border-bottom: solid 1px var(--ave-border-color);
  }

  [part='docs-row'] {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  [part='docs-column'] {
    box-sizing: border-box;
    flex-basis: 25%;
    padding-right: 0.5rem;
  }

  [part='docs-column']:only-child {
    flex-basis: 100%;
  }

  .column-type {
    flex-basis: 50%;
  }

  [part='docs-label'] {
    color: var(--ave-label-color);
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: 0.1rem;
  }

  [part='docs-value'] {
    font-family: var(--ave-monospace-font);
    font-size: 0.875rem;
    line-height: 1.5rem;
  }

  [part='docs-markdown'] p,
  [part='docs-markdown'] ul,
  [part='docs-markdown'] ol {
    margin: 0.5rem 0;
  }

  .accent {
    color: var(--ave-accent-color);
  }

  /* Demo styles */
  [part='docs-item']:not(:first-of-type),
  [part='demo-tabs'],
  [part='demo-output'] {
    border-top: solid 1px var(--ave-border-color);
  }

  [part='demo-tabs'] [part='tab-panel'] {
    box-sizing: border-box;
    position: relative;
    background: #fafafa;
  }

  [part='demo-output'] {
    padding: 1.5rem;
    text-align: initial;
    transform: translateZ(0);
    overflow: hidden;
  }

  .source {
    position: relative;
  }

  [part='knobs'] {
    display: flex;
    padding: 1rem;
  }

  [part='knobs-column'] {
    width: 50%;
  }

  [part='knobs-header'] {
    font-size: 1rem;
    font-weight: bold;
    margin: 0 0 0.25rem;
  }

  td {
    padding: 0.25rem 0.25rem 0.25rem 0;
    font-size: 0.9375rem;
    white-space: nowrap;
  }

  [part='event-log'] {
    display: block;
    padding: 0 1rem;
    min-height: 50px;
    max-height: 200px;
    overflow: auto;
  }

  [part='event-record'] {
    margin: 0 0 0.25rem;
    font-family: var(--ave-monospace-font);
    font-size: 0.875rem;
  }

  [part='event-record']:first-of-type {
    margin-top: 1rem;
  }

  [part='event-record']:last-of-type {
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    header {
      flex-direction: column;
    }

    nav {
      margin-top: 0.5rem;
    }

    .api-col-type {
      flex-basis: 100%;
      margin-top: 1rem;
    }

    .columns {
      flex-direction: column;
    }

    [part='knobs-column']:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

let ApiViewer = class ApiViewer extends ApiViewerBase {
    static get styles() {
        return styles;
    }
};
ApiViewer = __decorate([
    customElement('api-viewer')
], ApiViewer);

class DemoApiViewer extends ApiViewer {

  static get styles() {
    return [
      super.styles,
      css `
      
       [part='docs-description'] h1 {
          font-size: 45px;
          font-weight: 400;
          letter-spacing: -.018em;
          line-height: 48px;
        }

        [part='docs-description'] h2 {
          font-size: 34px;
          font-weight: 400;
          letter-spacing: -.01em;
          line-height: 40px;
        }

        [part='docs-description'] h3 {
          font-size: 24px;
          font-weight: 400;
          letter-spacing: -.012em;
          line-height: 32px;
        }

        [part='docs-description'] h4 {
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
        }

        [part='docs-description'] h5, [part='docs-description'] h6 {
          font-size: 14px;
          font-weight: 500;
          line-height: 24px;
        }
   `
    ];
  }
}

customElements.define('demo-api-viewer', DemoApiViewer);

const github = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`;

const preignition = html `
<svg  xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 -100 934 934" >
    <style>
  .logo-light {
    opacity: .6;
  }
  
  .logo-text {
    fill: #fff;
  }
  
  .logo-icon,
  logo-full-icon {
    fill: #00b8d4;
    /* fill: #80CBC4 */
  }
  
  .logo-icon path {
    opacity: .6;
  }
  
  .icon-circle {
    /*fill: #80808;*/
    fill: #004c8c;
    opacity: .7;
  }
  
  .icon-shadow-circle, .text {
    /*fill: #80808;*/
    fill: #004c8c;
    opacity: .1
  }
  </style>
  <g class="logo above2 style-scope pre-ignition-testing">
    <path class="icon-circle style-scope pre-ignition-testing" d="M934.968 367.484a467.484 467.484 0 1 1-934.968 0 467.484 467.484 0 1 1 934.968 0z"></path>
    <path class="icon-shadow-circle style-scope pre-ignition-testing" d="M365.74 40.355s.33.894.407 1.094l.125-.75-.53-.345zm.532.344c.408.263 1.45.967 3.094 2.06l-3.063-2.28-.03.22zm3.094 2.06l53.968 40c-24.383-19.903-45.892-34.626-53.968-40zm53.968 40c40.552 33.104 88.11 79.965 91 119.658 8.97 123.205-168.348 160.776-179.406 283.812-4.95 55.087 31.875 148.594 31.875 148.594-28.556-15.74-57.057-34.733-74.97-48.188 5.465 22.817 15.34 59.93 27.908 91.282l230.844 149.687c190.97-34.26 341.694-184.504 376.688-375.22L423.334 82.762z"></path>
    <g class="logo-color style-scope pre-ignition-testing">
      <g class="logo-icon icon-3 style-scope pre-ignition-testing">
        <path d="M318.56 11.056S479.585 99.398 485.292 177.79c10.064 138.22-188.875 195.44-201.28 333.47-5.556 61.8 35.745 166.735 35.745 166.735S155.533 591.397 149.425 512.46c-10.773-139.21 192.02-195.637 204.88-334.67 5.714-61.785-35.747-166.734-35.747-166.734z" class="style-scope pre-ignition-testing"></path>
        <path d="M365.725 40.35s143.535 92.18 148.622 162.056c8.97 123.205-168.357 160.773-179.415 283.81-4.95 55.085 31.863 148.62 31.863 148.62s-146.385-77.19-151.83-147.552C205.363 363.197 386.125 312.9 397.59 188.97c5.092-55.072-31.864-148.62-31.864-148.62z" class="style-scope pre-ignition-testing"></path>
        <path d="M270.77 54.767s143.535 78.746 148.622 148.622c8.97 123.204-168.357 174.207-179.415 297.243-4.952 55.086 31.862 148.622 31.862 148.622S125.454 558.63 120.01 488.267c-9.603-124.087 171.16-160.95 182.623-284.878 5.094-55.075-31.863-148.623-31.863-148.623z" class="style-scope pre-ignition-testing"></path>
      </g>
      <g class="logo-text logo-light style-scope pre-ignition-testing">
        <path d="M499.218 390.013c7.453 2.53 14.32 3.797 20.602 3.797 19.078 0 28.617-10.617 28.617-31.852 0-18.89-9.492-28.336-28.477-28.336-6.562 0-13.476.563-20.742 1.688v54.703m-7.383-59.977c8.39-2.015 17.813-3.023 28.266-3.023 23.673 0 35.51 11.695 35.51 35.086 0 25.827-11.908 38.74-35.72 38.74-5.906 0-12.797-1.17-20.672-3.515v30.156h-7.383v-97.444" class="style-scope pre-ignition-testing"></path>
        <path d="M567.683 400.84v-73.827h5.273l.914 12.234c7.407-8.156 15.657-12.234 24.75-12.234v5.906c-8.812 0-16.664 4.288-23.554 12.866v55.055h-7.383" class="style-scope pre-ignition-testing"></path>
        <path d="M633.304 327.013c20.203 0 30.304 11.18 30.305 33.54-.002 1.593-.048 3.257-.142 4.99h-56.04c0 19.314 10.22 28.97 30.657 28.97 8.39 0 15.844-1.172 22.36-3.516v6.33c-6.516 2.342-13.97 3.514-22.36 3.514-25.36 0-38.04-12.585-38.04-37.757 0-24.046 11.087-36.07 33.26-36.07m-25.876 31.922h49.077c-.28-17.156-8.016-25.734-23.203-25.734-16.407 0-25.032 8.58-25.875 25.735" class="style-scope pre-ignition-testing"></path>
      </g>
      <g class="logo-text style-scope pre-ignition-testing">
        <path class="small-i style-scope pre-ignition-testing" d="M400.307 439.3v73.84h-7.383V439.3h7.383"></path>
        <path class="big-i style-scope pre-ignition-testing" d="M400.307 444.593v68.547h-7.383v-68.547h7.383"></path>
        <path d="M470.99 447.61c-6.796-1.126-13.476-1.69-20.04-1.69-19.92 0-29.88 9.915-29.88 29.744 0 20.296 9.303 30.445 27.913 30.445 6.75 0 14.086-1.267 22.008-3.798V447.61m7.383 65.53c0 17.813-10.85 26.72-32.554 26.72-9.095 0-17.158-1.173-24.19-3.517v-6.328c7.173 2.344 15.282 3.516 24.33 3.516 16.687 0 25.03-6.796 25.03-20.39v-3.515c-8.343 2.343-15.703 3.515-22.078 3.515-23.344 0-35.015-12.445-35.015-37.336 0-24.328 12.54-36.492 37.617-36.492 9.515 0 18.47 1.008 26.86 3.023v70.805" class="style-scope pre-ignition-testing"></path>
        <path d="M492.104 513.14v-73.828h5.273l.914 9.422c9.423-6.28 18.657-9.422 27.704-9.422 17.953 0 26.93 7.758 26.93 23.273v50.555h-7.383v-50.765c0-10.97-6.632-16.454-19.897-16.454-8.86.002-17.578 3.12-26.157 9.353v57.867h-7.382" class="style-scope pre-ignition-testing"></path>
        <path d="M575.303 439.312v73.828h-7.383v-73.828h7.383" class="style-scope pre-ignition-testing"></path>
        <path d="M590.017 427.36h5.203l1.336 11.952h22.15v6.328h-21.517v46.617c0 9.703 3.562 14.555 10.687 14.555h10.828v6.328h-10.688c-12 0-18-6.633-18-19.898V427.36" class="style-scope pre-ignition-testing"></path>
        <path d="M634.404 439.312v73.828h-7.383v-73.828h7.384" class="style-scope pre-ignition-testing"></path>
        <path d="M653.267 475.945c0 21.047 9.023 31.57 27.07 31.57s27.07-10.523 27.07-31.57c0-20.672-9.023-31.008-27.07-31.008s-27.07 10.336-27.07 31.008m-7.383.28c0-25.077 11.485-37.616 34.453-37.616 22.97 0 34.453 12.538 34.453 37.616 0 25.03-11.484 37.547-34.453 37.547-22.875 0-34.36-12.516-34.453-37.547" class="style-scope pre-ignition-testing"></path>
        <path d="M724.935 513.14v-73.828h5.273l.914 9.422c9.422-6.28 18.657-9.422 27.703-9.422 17.953 0 26.93 7.758 26.93 23.273v50.555h-7.383v-50.765c0-10.97-6.633-16.454-19.898-16.454-8.86.002-17.578 3.12-26.156 9.353v57.867h-7.383" class="style-scope pre-ignition-testing"></path>
      </g>
    </g>
  </g>
</svg>

` ;


// html`
// <svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
//     <defs>
//         <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
//             <stop stop-color="#9B00FF" offset="0%"></stop>
//             <stop stop-color="#0077FF" offset="100%"></stop>
//         </linearGradient>
//     </defs>
//     <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
//         <path d="M25.0367111,21.5923493 C25.2517064,21.266068 25.4512007,20.9286755 25.6341461,20.5812193 M26.1734608,19.4069179 C26.3262184,19.0203648 26.4594745,18.6239822 26.5720168,18.2189821 M26.8386352,17.0249022 C26.9078323,16.6178655 26.9565245,16.2038484 26.9836122,15.7839503 M27,14.5357247 C26.9832647,14.0959703 26.9428567,13.6622772 26.8800136,13.2358825 M26.6262385,11.9830038 C26.5201899,11.5736276 26.393067,11.1727323 26.2460959,10.7815439 M25.7459381,9.6364735 C25.5548806,9.25486681 25.3440717,8.88485949 25.114851,8.52779079 M24.3816616,7.50717954 C22.1818148,4.75967766 18.7986851,3 15.0044097,3 C8.37455729,3 3,8.372583 3,15 C3,21.627417 8.37455729,27 15.0044097,27 C18.7097602,27 22.0230108,25.3218375 24.2250509,22.6843592" id="Shape" stroke="url(#linearGradient-1)" stroke-width="5.04965609"></path>
//     </g>
// </svg>`;

var demoChartStyle = [
  css `
       :host {
          display: block;
        }

        code {
          font-size: smaller;
          line-height: 10px;
        }

        label {
          display: block;
          min-width: 150px;
          padding-right: 10px;
        }

        #chart {
          margin-top: 30px;
          min-height: 350px
        }

      `
];

export { BaseDemo as DemoBase, DemoRoot, ExpansionPanel, FancyAccordion, demoChartStyle as chartStyle, demoStyle, github, mdStyle, multipleRnd, preignition, rnd, timeData };
