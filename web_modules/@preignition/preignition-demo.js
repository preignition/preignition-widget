import { __decorate, __assign } from '../tslib.js';
import { o as isPrimitive, h as html$3, j as nothing, N as NodePart } from '../common/lit-html-f37bf389.js';
import { css, LitElement, property, query, customElement } from '../lit-element.js';
import { d as directive } from '../common/directive-651fd9cf.js';
import { styleMap } from '../lit-html/directives/style-map.js';
import { unsafeHTML } from '../lit-html/directives/unsafe-html.js';
import { d as defaultValue, a as doNotSetUndefinedValue } from '../common/defaultValueMixin-cb2ff445.js';
import { Router } from '../@vaadin/router.js';
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

/**
 * marked - a markdown parser
 * Copyright (c) 2011-2020, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */

/**
 * DO NOT EDIT THIS FILE
 * The code in this file is generated from files in ./src/
 */

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var defaults = createCommonjsModule(function (module) {
function getDefaults() {
  return {
    baseUrl: null,
    breaks: false,
    gfm: true,
    headerIds: true,
    headerPrefix: '',
    highlight: null,
    langPrefix: 'language-',
    mangle: true,
    pedantic: false,
    renderer: null,
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartLists: false,
    smartypants: false,
    tokenizer: null,
    walkTokens: null,
    xhtml: false
  };
}

function changeDefaults(newDefaults) {
  module.exports.defaults = newDefaults;
}

module.exports = {
  defaults: getDefaults(),
  getDefaults,
  changeDefaults
};
});
var defaults_1 = defaults.defaults;
var defaults_2 = defaults.getDefaults;
var defaults_3 = defaults.changeDefaults;

/**
 * Helpers
 */
const escapeTest = /[&<>"']/;
const escapeReplace = /[&<>"']/g;
const escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
const escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
const escapeReplacements = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};
const getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape(html, encode) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }

  return html;
}

const unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;

function unescape(html) {
  // explicitly match decimal, hex, and named HTML entities
  return html.replace(unescapeTest, (_, n) => {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

const caret = /(^|[^\[])\^/g;
function edit(regex, opt) {
  regex = regex.source || regex;
  opt = opt || '';
  const obj = {
    replace: (name, val) => {
      val = val.source || val;
      val = val.replace(caret, '$1');
      regex = regex.replace(name, val);
      return obj;
    },
    getRegex: () => {
      return new RegExp(regex, opt);
    }
  };
  return obj;
}

const nonWordAndColonTest = /[^\w:]/g;
const originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
function cleanUrl(sanitize, base, href) {
  if (sanitize) {
    let prot;
    try {
      prot = decodeURIComponent(unescape(href))
        .replace(nonWordAndColonTest, '')
        .toLowerCase();
    } catch (e) {
      return null;
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return null;
    }
  }
  if (base && !originIndependentUrl.test(href)) {
    href = resolveUrl(base, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, '%');
  } catch (e) {
    return null;
  }
  return href;
}

const baseUrls = {};
const justDomain = /^[^:]+:\/*[^/]*$/;
const protocol = /^([^:]+:)[\s\S]*$/;
const domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;

function resolveUrl(base, href) {
  if (!baseUrls[' ' + base]) {
    // we can ignore everything in base after the last slash of its path component,
    // but we might need to add _that_
    // https://tools.ietf.org/html/rfc3986#section-3
    if (justDomain.test(base)) {
      baseUrls[' ' + base] = base + '/';
    } else {
      baseUrls[' ' + base] = rtrim(base, '/', true);
    }
  }
  base = baseUrls[' ' + base];
  const relativeBase = base.indexOf(':') === -1;

  if (href.substring(0, 2) === '//') {
    if (relativeBase) {
      return href;
    }
    return base.replace(protocol, '$1') + href;
  } else if (href.charAt(0) === '/') {
    if (relativeBase) {
      return href;
    }
    return base.replace(domain, '$1') + href;
  } else {
    return base + href;
  }
}

const noopTest = { exec: function noopTest() {} };

function merge(obj) {
  let i = 1,
    target,
    key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}

function splitCells(tableRow, count) {
  // ensure that every cell-delimiting pipe has a space
  // before it to distinguish it from an escaped pipe
  const row = tableRow.replace(/\|/g, (match, offset, str) => {
      let escaped = false,
        curr = offset;
      while (--curr >= 0 && str[curr] === '\\') escaped = !escaped;
      if (escaped) {
        // odd number of slashes means | is escaped
        // so we leave it alone
        return '|';
      } else {
        // add space before unescaped |
        return ' |';
      }
    }),
    cells = row.split(/ \|/);
  let i = 0;

  if (cells.length > count) {
    cells.splice(count);
  } else {
    while (cells.length < count) cells.push('');
  }

  for (; i < cells.length; i++) {
    // leading or trailing whitespace is ignored per the gfm spec
    cells[i] = cells[i].trim().replace(/\\\|/g, '|');
  }
  return cells;
}

// Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
// /c*$/ is vulnerable to REDOS.
// invert: Remove suffix of non-c chars instead. Default falsey.
function rtrim(str, c, invert) {
  const l = str.length;
  if (l === 0) {
    return '';
  }

  // Length of suffix matching the invert condition.
  let suffLen = 0;

  // Step left until we fail to match the invert condition.
  while (suffLen < l) {
    const currChar = str.charAt(l - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }

  return str.substr(0, l - suffLen);
}

function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  const l = str.length;
  let level = 0,
    i = 0;
  for (; i < l; i++) {
    if (str[i] === '\\') {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  return -1;
}

function checkSanitizeDeprecation(opt) {
  if (opt && opt.sanitize && !opt.silent) {
    console.warn('marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options');
  }
}

var helpers = {
  escape,
  unescape,
  edit,
  cleanUrl,
  resolveUrl,
  noopTest,
  merge,
  splitCells,
  rtrim,
  findClosingBracket,
  checkSanitizeDeprecation
};

const { defaults: defaults$1 } = defaults;
const {
  rtrim: rtrim$1,
  splitCells: splitCells$1,
  escape: escape$1,
  findClosingBracket: findClosingBracket$1
} = helpers;

function outputLink(cap, link, raw) {
  const href = link.href;
  const title = link.title ? escape$1(link.title) : null;
  const text = cap[1].replace(/\\([\[\]])/g, '$1');

  if (cap[0].charAt(0) !== '!') {
    return {
      type: 'link',
      raw,
      href,
      title,
      text
    };
  } else {
    return {
      type: 'image',
      raw,
      href,
      title,
      text: escape$1(text)
    };
  }
}

function indentCodeCompensation(raw, text) {
  const matchIndentToCode = raw.match(/^(\s+)(?:```)/);

  if (matchIndentToCode === null) {
    return text;
  }

  const indentToCode = matchIndentToCode[1];

  return text
    .split('\n')
    .map(node => {
      const matchIndentInNode = node.match(/^\s+/);
      if (matchIndentInNode === null) {
        return node;
      }

      const [indentInNode] = matchIndentInNode;

      if (indentInNode.length >= indentToCode.length) {
        return node.slice(indentToCode.length);
      }

      return node;
    })
    .join('\n');
}

/**
 * Tokenizer
 */
var Tokenizer_1 = class Tokenizer {
  constructor(options) {
    this.options = options || defaults$1;
  }

  space(src) {
    const cap = this.rules.block.newline.exec(src);
    if (cap) {
      if (cap[0].length > 1) {
        return {
          type: 'space',
          raw: cap[0]
        };
      }
      return { raw: '\n' };
    }
  }

  code(src, tokens) {
    const cap = this.rules.block.code.exec(src);
    if (cap) {
      const lastToken = tokens[tokens.length - 1];
      // An indented code block cannot interrupt a paragraph.
      if (lastToken && lastToken.type === 'paragraph') {
        return {
          raw: cap[0],
          text: cap[0].trimRight()
        };
      }

      const text = cap[0].replace(/^ {4}/gm, '');
      return {
        type: 'code',
        raw: cap[0],
        codeBlockStyle: 'indented',
        text: !this.options.pedantic
          ? rtrim$1(text, '\n')
          : text
      };
    }
  }

  fences(src) {
    const cap = this.rules.block.fences.exec(src);
    if (cap) {
      const raw = cap[0];
      const text = indentCodeCompensation(raw, cap[3] || '');

      return {
        type: 'code',
        raw,
        lang: cap[2] ? cap[2].trim() : cap[2],
        text
      };
    }
  }

  heading(src) {
    const cap = this.rules.block.heading.exec(src);
    if (cap) {
      return {
        type: 'heading',
        raw: cap[0],
        depth: cap[1].length,
        text: cap[2]
      };
    }
  }

  nptable(src) {
    const cap = this.rules.block.nptable.exec(src);
    if (cap) {
      const item = {
        type: 'table',
        header: splitCells$1(cap[1].replace(/^ *| *\| *$/g, '')),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : [],
        raw: cap[0]
      };

      if (item.header.length === item.align.length) {
        let l = item.align.length;
        let i;
        for (i = 0; i < l; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = 'right';
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = 'center';
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = 'left';
          } else {
            item.align[i] = null;
          }
        }

        l = item.cells.length;
        for (i = 0; i < l; i++) {
          item.cells[i] = splitCells$1(item.cells[i], item.header.length);
        }

        return item;
      }
    }
  }

  hr(src) {
    const cap = this.rules.block.hr.exec(src);
    if (cap) {
      return {
        type: 'hr',
        raw: cap[0]
      };
    }
  }

  blockquote(src) {
    const cap = this.rules.block.blockquote.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ *> ?/gm, '');

      return {
        type: 'blockquote',
        raw: cap[0],
        text
      };
    }
  }

  list(src) {
    const cap = this.rules.block.list.exec(src);
    if (cap) {
      let raw = cap[0];
      const bull = cap[2];
      const isordered = bull.length > 1;
      const isparen = bull[bull.length - 1] === ')';

      const list = {
        type: 'list',
        raw,
        ordered: isordered,
        start: isordered ? +bull.slice(0, -1) : '',
        loose: false,
        items: []
      };

      // Get each top-level item.
      const itemMatch = cap[0].match(this.rules.block.item);

      let next = false,
        item,
        space,
        b,
        addBack,
        loose,
        istask,
        ischecked;

      const l = itemMatch.length;
      for (let i = 0; i < l; i++) {
        item = itemMatch[i];
        raw = item;

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+[.)]) */, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (i !== l - 1) {
          b = this.rules.block.bullet.exec(itemMatch[i + 1])[0];
          if (isordered ? b.length === 1 || (!isparen && b[b.length - 1] === ')')
            : (b.length > 1 || (this.options.smartLists && b !== bull))) {
            addBack = itemMatch.slice(i + 1).join('\n');
            list.raw = list.raw.substring(0, list.raw.length - addBack.length);
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        if (loose) {
          list.loose = true;
        }

        // Check for task list items
        istask = /^\[[ xX]\] /.test(item);
        ischecked = undefined;
        if (istask) {
          ischecked = item[1] !== ' ';
          item = item.replace(/^\[[ xX]\] +/, '');
        }

        list.items.push({
          type: 'list_item',
          raw,
          task: istask,
          checked: ischecked,
          loose: loose,
          text: item
        });
      }

      return list;
    }
  }

  html(src) {
    const cap = this.rules.block.html.exec(src);
    if (cap) {
      return {
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        raw: cap[0],
        pre: !this.options.sanitizer
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
        text: this.options.sanitize ? (this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape$1(cap[0])) : cap[0]
      };
    }
  }

  def(src) {
    const cap = this.rules.block.def.exec(src);
    if (cap) {
      if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
      const tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
      return {
        tag,
        raw: cap[0],
        href: cap[2],
        title: cap[3]
      };
    }
  }

  table(src) {
    const cap = this.rules.block.table.exec(src);
    if (cap) {
      const item = {
        type: 'table',
        header: splitCells$1(cap[1].replace(/^ *| *\| *$/g, '')),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
      };

      if (item.header.length === item.align.length) {
        item.raw = cap[0];

        let l = item.align.length;
        let i;
        for (i = 0; i < l; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = 'right';
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = 'center';
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = 'left';
          } else {
            item.align[i] = null;
          }
        }

        l = item.cells.length;
        for (i = 0; i < l; i++) {
          item.cells[i] = splitCells$1(
            item.cells[i].replace(/^ *\| *| *\| *$/g, ''),
            item.header.length);
        }

        return item;
      }
    }
  }

  lheading(src) {
    const cap = this.rules.block.lheading.exec(src);
    if (cap) {
      return {
        type: 'heading',
        raw: cap[0],
        depth: cap[2].charAt(0) === '=' ? 1 : 2,
        text: cap[1]
      };
    }
  }

  paragraph(src) {
    const cap = this.rules.block.paragraph.exec(src);
    if (cap) {
      return {
        type: 'paragraph',
        raw: cap[0],
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      };
    }
  }

  text(src, tokens) {
    const cap = this.rules.block.text.exec(src);
    if (cap) {
      const lastToken = tokens[tokens.length - 1];
      if (lastToken && lastToken.type === 'text') {
        return {
          raw: cap[0],
          text: cap[0]
        };
      }

      return {
        type: 'text',
        raw: cap[0],
        text: cap[0]
      };
    }
  }

  escape(src) {
    const cap = this.rules.inline.escape.exec(src);
    if (cap) {
      return {
        type: 'escape',
        raw: cap[0],
        text: escape$1(cap[1])
      };
    }
  }

  tag(src, inLink, inRawBlock) {
    const cap = this.rules.inline.tag.exec(src);
    if (cap) {
      if (!inLink && /^<a /i.test(cap[0])) {
        inLink = true;
      } else if (inLink && /^<\/a>/i.test(cap[0])) {
        inLink = false;
      }
      if (!inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        inRawBlock = true;
      } else if (inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        inRawBlock = false;
      }

      return {
        type: this.options.sanitize
          ? 'text'
          : 'html',
        raw: cap[0],
        inLink,
        inRawBlock,
        text: this.options.sanitize
          ? (this.options.sanitizer
            ? this.options.sanitizer(cap[0])
            : escape$1(cap[0]))
          : cap[0]
      };
    }
  }

  link(src) {
    const cap = this.rules.inline.link.exec(src);
    if (cap) {
      const lastParenIndex = findClosingBracket$1(cap[2], '()');
      if (lastParenIndex > -1) {
        const start = cap[0].indexOf('!') === 0 ? 5 : 4;
        const linkLen = start + cap[1].length + lastParenIndex;
        cap[2] = cap[2].substring(0, lastParenIndex);
        cap[0] = cap[0].substring(0, linkLen).trim();
        cap[3] = '';
      }
      let href = cap[2];
      let title = '';
      if (this.options.pedantic) {
        const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

        if (link) {
          href = link[1];
          title = link[3];
        } else {
          title = '';
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : '';
      }
      href = href.trim().replace(/^<([\s\S]*)>$/, '$1');
      const token = outputLink(cap, {
        href: href ? href.replace(this.rules.inline._escapes, '$1') : href,
        title: title ? title.replace(this.rules.inline._escapes, '$1') : title
      }, cap[0]);
      return token;
    }
  }

  reflink(src, links) {
    let cap;
    if ((cap = this.rules.inline.reflink.exec(src))
        || (cap = this.rules.inline.nolink.exec(src))) {
      let link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = links[link.toLowerCase()];
      if (!link || !link.href) {
        const text = cap[0].charAt(0);
        return {
          type: 'text',
          raw: text,
          text
        };
      }
      const token = outputLink(cap, link, cap[0]);
      return token;
    }
  }

  strong(src, maskedSrc, prevChar = '') {
    let match = this.rules.inline.strong.start.exec(src);

    if (match && (!match[1] || (match[1] && (prevChar === '' || this.rules.inline.punctuation.exec(prevChar))))) {
      maskedSrc = maskedSrc.slice(-1 * src.length);
      const endReg = match[0] === '**' ? this.rules.inline.strong.endAst : this.rules.inline.strong.endUnd;

      endReg.lastIndex = 0;

      let cap;
      while ((match = endReg.exec(maskedSrc)) != null) {
        cap = this.rules.inline.strong.middle.exec(maskedSrc.slice(0, match.index + 3));
        if (cap) {
          return {
            type: 'strong',
            raw: src.slice(0, cap[0].length),
            text: src.slice(2, cap[0].length - 2)
          };
        }
      }
    }
  }

  em(src, maskedSrc, prevChar = '') {
    let match = this.rules.inline.em.start.exec(src);

    if (match && (!match[1] || (match[1] && (prevChar === '' || this.rules.inline.punctuation.exec(prevChar))))) {
      maskedSrc = maskedSrc.slice(-1 * src.length);
      const endReg = match[0] === '*' ? this.rules.inline.em.endAst : this.rules.inline.em.endUnd;

      endReg.lastIndex = 0;

      let cap;
      while ((match = endReg.exec(maskedSrc)) != null) {
        cap = this.rules.inline.em.middle.exec(maskedSrc.slice(0, match.index + 2));
        if (cap) {
          return {
            type: 'em',
            raw: src.slice(0, cap[0].length),
            text: src.slice(1, cap[0].length - 1)
          };
        }
      }
    }
  }

  codespan(src) {
    const cap = this.rules.inline.code.exec(src);
    if (cap) {
      let text = cap[2].replace(/\n/g, ' ');
      const hasNonSpaceChars = /[^ ]/.test(text);
      const hasSpaceCharsOnBothEnds = text.startsWith(' ') && text.endsWith(' ');
      if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
        text = text.substring(1, text.length - 1);
      }
      text = escape$1(text, true);
      return {
        type: 'codespan',
        raw: cap[0],
        text
      };
    }
  }

  br(src) {
    const cap = this.rules.inline.br.exec(src);
    if (cap) {
      return {
        type: 'br',
        raw: cap[0]
      };
    }
  }

  del(src) {
    const cap = this.rules.inline.del.exec(src);
    if (cap) {
      return {
        type: 'del',
        raw: cap[0],
        text: cap[1]
      };
    }
  }

  autolink(src, mangle) {
    const cap = this.rules.inline.autolink.exec(src);
    if (cap) {
      let text, href;
      if (cap[2] === '@') {
        text = escape$1(this.options.mangle ? mangle(cap[1]) : cap[1]);
        href = 'mailto:' + text;
      } else {
        text = escape$1(cap[1]);
        href = text;
      }

      return {
        type: 'link',
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: 'text',
            raw: text,
            text
          }
        ]
      };
    }
  }

  url(src, mangle) {
    let cap;
    if (cap = this.rules.inline.url.exec(src)) {
      let text, href;
      if (cap[2] === '@') {
        text = escape$1(this.options.mangle ? mangle(cap[0]) : cap[0]);
        href = 'mailto:' + text;
      } else {
        // do extended autolink path validation
        let prevCapZero;
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
        } while (prevCapZero !== cap[0]);
        text = escape$1(cap[0]);
        if (cap[1] === 'www.') {
          href = 'http://' + text;
        } else {
          href = text;
        }
      }
      return {
        type: 'link',
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: 'text',
            raw: text,
            text
          }
        ]
      };
    }
  }

  inlineText(src, inRawBlock, smartypants) {
    const cap = this.rules.inline.text.exec(src);
    if (cap) {
      let text;
      if (inRawBlock) {
        text = this.options.sanitize ? (this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape$1(cap[0])) : cap[0];
      } else {
        text = escape$1(this.options.smartypants ? smartypants(cap[0]) : cap[0]);
      }
      return {
        type: 'text',
        raw: cap[0],
        text
      };
    }
  }
};

const {
  noopTest: noopTest$1,
  edit: edit$1,
  merge: merge$1
} = helpers;

/**
 * Block-Level Grammar
 */
const block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
  hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: '^ {0,3}(?:' // optional indentation
    + '<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
    + '|comment[^\\n]*(\\n+|$)' // (2)
    + '|<\\?[\\s\\S]*?\\?>\\n*' // (3)
    + '|<![A-Z][\\s\\S]*?>\\n*' // (4)
    + '|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*' // (5)
    + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)' // (6)
    + '|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) open tag
    + '|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) closing tag
    + ')',
  def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
  nptable: noopTest$1,
  table: noopTest$1,
  lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
  // regex template, placeholders will be replaced according to different paragraph
  // interruption rules of commonmark and the original markdown spec:
  _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,
  text: /^[^\n]+/
};

block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block.def = edit$1(block.def)
  .replace('label', block._label)
  .replace('title', block._title)
  .getRegex();

block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
block.item = /^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/;
block.item = edit$1(block.item, 'gm')
  .replace(/bull/g, block.bullet)
  .getRegex();

block.list = edit$1(block.list)
  .replace(/bull/g, block.bullet)
  .replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))')
  .replace('def', '\\n+(?=' + block.def.source + ')')
  .getRegex();

block._tag = 'address|article|aside|base|basefont|blockquote|body|caption'
  + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption'
  + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe'
  + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option'
  + '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr'
  + '|track|ul';
block._comment = /<!--(?!-?>)[\s\S]*?-->/;
block.html = edit$1(block.html, 'i')
  .replace('comment', block._comment)
  .replace('tag', block._tag)
  .replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/)
  .getRegex();

block.paragraph = edit$1(block._paragraph)
  .replace('hr', block.hr)
  .replace('heading', ' {0,3}#{1,6} ')
  .replace('|lheading', '') // setex headings don't interrupt commonmark paragraphs
  .replace('blockquote', ' {0,3}>')
  .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
  .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
  .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)')
  .replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
  .getRegex();

block.blockquote = edit$1(block.blockquote)
  .replace('paragraph', block.paragraph)
  .getRegex();

/**
 * Normal Block Grammar
 */

block.normal = merge$1({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge$1({}, block.normal, {
  nptable: '^ *([^|\\n ].*\\|.*)\\n' // Header
    + ' *([-:]+ *\\|[-| :]*)' // Align
    + '(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)', // Cells
  table: '^ *\\|(.+)\\n' // Header
    + ' *\\|?( *[-:]+[-| :]*)' // Align
    + '(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)' // Cells
});

block.gfm.nptable = edit$1(block.gfm.nptable)
  .replace('hr', block.hr)
  .replace('heading', ' {0,3}#{1,6} ')
  .replace('blockquote', ' {0,3}>')
  .replace('code', ' {4}[^\\n]')
  .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
  .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
  .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)')
  .replace('tag', block._tag) // tables can be interrupted by type (6) html blocks
  .getRegex();

block.gfm.table = edit$1(block.gfm.table)
  .replace('hr', block.hr)
  .replace('heading', ' {0,3}#{1,6} ')
  .replace('blockquote', ' {0,3}>')
  .replace('code', ' {4}[^\\n]')
  .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
  .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
  .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)')
  .replace('tag', block._tag) // tables can be interrupted by type (6) html blocks
  .getRegex();

/**
 * Pedantic grammar (original John Gruber's loose markdown specification)
 */

block.pedantic = merge$1({}, block.normal, {
  html: edit$1(
    '^ *(?:comment *(?:\\n|\\s*$)'
    + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
    + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))')
    .replace('comment', block._comment)
    .replace(/tag/g, '(?!(?:'
      + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub'
      + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)'
      + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b')
    .getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
  fences: noopTest$1, // fences not supported
  paragraph: edit$1(block.normal._paragraph)
    .replace('hr', block.hr)
    .replace('heading', ' *#{1,6} *[^\n]')
    .replace('lheading', block.lheading)
    .replace('blockquote', ' {0,3}>')
    .replace('|fences', '')
    .replace('|list', '')
    .replace('|html', '')
    .getRegex()
});

/**
 * Inline-Level Grammar
 */
const inline = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noopTest$1,
  tag: '^comment'
    + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
    + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
    + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
    + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
    + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>', // CDATA section
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
  nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
  reflinkSearch: 'reflink|nolink(?!\\()',
  strong: {
    start: /^(?:(\*\*(?=[*punctuation]))|\*\*)(?![\s])|__/, // (1) returns if starts w/ punctuation
    middle: /^\*\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*\*$|^__(?![\s])((?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?)__$/,
    endAst: /[^punctuation\s]\*\*(?!\*)|[punctuation]\*\*(?!\*)(?:(?=[punctuation\s]|$))/, // last char can't be punct, or final * must also be followed by punct (or endline)
    endUnd: /[^\s]__(?!_)(?:(?=[punctuation\s])|$)/ // last char can't be a space, and final _ must preceed punct or \s (or endline)
  },
  em: {
    start: /^(?:(\*(?=[punctuation]))|\*)(?![*\s])|_/, // (1) returns if starts w/ punctuation
    middle: /^\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*$|^_(?![_\s])(?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?_$/,
    endAst: /[^punctuation\s]\*(?!\*)|[punctuation]\*(?!\*)(?:(?=[punctuation\s]|$))/, // last char can't be punct, or final * must also be followed by punct (or endline)
    endUnd: /[^\s]_(?!_)(?:(?=[punctuation\s])|$)/ // last char can't be a space, and final _ must preceed punct or \s (or endline)
  },
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: noopTest$1,
  text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/,
  punctuation: /^([\s*punctuation])/
};

// list of punctuation marks from common mark spec
// without * and _ to workaround cases with double emphasis
inline._punctuation = '!"#$%&\'()+\\-.,/:;<=>?@\\[\\]`^{|}~';
inline.punctuation = edit$1(inline.punctuation).replace(/punctuation/g, inline._punctuation).getRegex();

// sequences em should skip over [title](link), `code`, <html>
inline._blockSkip = '\\[[^\\]]*?\\]\\([^\\)]*?\\)|`[^`]*?`|<[^>]*?>';
inline._overlapSkip = '__[^_]*?__|\\*\\*\\[^\\*\\]*?\\*\\*';

inline.em.start = edit$1(inline.em.start)
  .replace(/punctuation/g, inline._punctuation)
  .getRegex();

inline.em.middle = edit$1(inline.em.middle)
  .replace(/punctuation/g, inline._punctuation)
  .replace(/overlapSkip/g, inline._overlapSkip)
  .getRegex();

inline.em.endAst = edit$1(inline.em.endAst, 'g')
  .replace(/punctuation/g, inline._punctuation)
  .getRegex();

inline.em.endUnd = edit$1(inline.em.endUnd, 'g')
  .replace(/punctuation/g, inline._punctuation)
  .getRegex();

inline.strong.start = edit$1(inline.strong.start)
  .replace(/punctuation/g, inline._punctuation)
  .getRegex();

inline.strong.middle = edit$1(inline.strong.middle)
  .replace(/punctuation/g, inline._punctuation)
  .replace(/blockSkip/g, inline._blockSkip)
  .getRegex();

inline.strong.endAst = edit$1(inline.strong.endAst, 'g')
  .replace(/punctuation/g, inline._punctuation)
  .getRegex();

inline.strong.endUnd = edit$1(inline.strong.endUnd, 'g')
  .replace(/punctuation/g, inline._punctuation)
  .getRegex();

inline.blockSkip = edit$1(inline._blockSkip, 'g')
  .getRegex();

inline.overlapSkip = edit$1(inline._overlapSkip, 'g')
  .getRegex();

inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;

inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline.autolink = edit$1(inline.autolink)
  .replace('scheme', inline._scheme)
  .replace('email', inline._email)
  .getRegex();

inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;

inline.tag = edit$1(inline.tag)
  .replace('comment', block._comment)
  .replace('attribute', inline._attribute)
  .getRegex();

inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
inline._href = /<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/;
inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;

inline.link = edit$1(inline.link)
  .replace('label', inline._label)
  .replace('href', inline._href)
  .replace('title', inline._title)
  .getRegex();

inline.reflink = edit$1(inline.reflink)
  .replace('label', inline._label)
  .getRegex();

inline.reflinkSearch = edit$1(inline.reflinkSearch, 'g')
  .replace('reflink', inline.reflink)
  .replace('nolink', inline.nolink)
  .getRegex();

/**
 * Normal Inline Grammar
 */

inline.normal = merge$1({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge$1({}, inline.normal, {
  strong: {
    start: /^__|\*\*/,
    middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    endAst: /\*\*(?!\*)/g,
    endUnd: /__(?!_)/g
  },
  em: {
    start: /^_|\*/,
    middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
    endAst: /\*(?!\*)/g,
    endUnd: /_(?!_)/g
  },
  link: edit$1(/^!?\[(label)\]\((.*?)\)/)
    .replace('label', inline._label)
    .getRegex(),
  reflink: edit$1(/^!?\[(label)\]\s*\[([^\]]*)\]/)
    .replace('label', inline._label)
    .getRegex()
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge$1({}, inline.normal, {
  escape: edit$1(inline.escape).replace('])', '~|])').getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
  del: /^~+(?=\S)([\s\S]*?\S)~+/,
  text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
});

inline.gfm.url = edit$1(inline.gfm.url, 'i')
  .replace('email', inline.gfm._extended_email)
  .getRegex();
/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge$1({}, inline.gfm, {
  br: edit$1(inline.br).replace('{2,}', '*').getRegex(),
  text: edit$1(inline.gfm.text)
    .replace('\\b_', '\\b_| {2,}\\n')
    .replace(/\{2,\}/g, '*')
    .getRegex()
});

var rules = {
  block,
  inline
};

const { defaults: defaults$2 } = defaults;
const { block: block$1, inline: inline$1 } = rules;

/**
 * smartypants text replacement
 */
function smartypants(text) {
  return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
}

/**
 * mangle email addresses
 */
function mangle(text) {
  let out = '',
    i,
    ch;

  const l = text.length;
  for (i = 0; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
}

/**
 * Block Lexer
 */
var Lexer_1 = class Lexer {
  constructor(options) {
    this.tokens = [];
    this.tokens.links = Object.create(null);
    this.options = options || defaults$2;
    this.options.tokenizer = this.options.tokenizer || new Tokenizer_1();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;

    const rules = {
      block: block$1.normal,
      inline: inline$1.normal
    };

    if (this.options.pedantic) {
      rules.block = block$1.pedantic;
      rules.inline = inline$1.pedantic;
    } else if (this.options.gfm) {
      rules.block = block$1.gfm;
      if (this.options.breaks) {
        rules.inline = inline$1.breaks;
      } else {
        rules.inline = inline$1.gfm;
      }
    }
    this.tokenizer.rules = rules;
  }

  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: block$1,
      inline: inline$1
    };
  }

  /**
   * Static Lex Method
   */
  static lex(src, options) {
    const lexer = new Lexer(options);
    return lexer.lex(src);
  }

  /**
   * Preprocessing
   */
  lex(src) {
    src = src
      .replace(/\r\n|\r/g, '\n')
      .replace(/\t/g, '    ');

    this.blockTokens(src, this.tokens, true);

    this.inline(this.tokens);

    return this.tokens;
  }

  /**
   * Lexing
   */
  blockTokens(src, tokens = [], top = true) {
    src = src.replace(/^ +$/gm, '');
    let token, i, l, lastToken;

    while (src) {
      // newline
      if (token = this.tokenizer.space(src)) {
        src = src.substring(token.raw.length);
        if (token.type) {
          tokens.push(token);
        }
        continue;
      }

      // code
      if (token = this.tokenizer.code(src, tokens)) {
        src = src.substring(token.raw.length);
        if (token.type) {
          tokens.push(token);
        } else {
          lastToken = tokens[tokens.length - 1];
          lastToken.raw += '\n' + token.raw;
          lastToken.text += '\n' + token.text;
        }
        continue;
      }

      // fences
      if (token = this.tokenizer.fences(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // heading
      if (token = this.tokenizer.heading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // table no leading pipe (gfm)
      if (token = this.tokenizer.nptable(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // hr
      if (token = this.tokenizer.hr(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // blockquote
      if (token = this.tokenizer.blockquote(src)) {
        src = src.substring(token.raw.length);
        token.tokens = this.blockTokens(token.text, [], top);
        tokens.push(token);
        continue;
      }

      // list
      if (token = this.tokenizer.list(src)) {
        src = src.substring(token.raw.length);
        l = token.items.length;
        for (i = 0; i < l; i++) {
          token.items[i].tokens = this.blockTokens(token.items[i].text, [], false);
        }
        tokens.push(token);
        continue;
      }

      // html
      if (token = this.tokenizer.html(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // def
      if (top && (token = this.tokenizer.def(src))) {
        src = src.substring(token.raw.length);
        if (!this.tokens.links[token.tag]) {
          this.tokens.links[token.tag] = {
            href: token.href,
            title: token.title
          };
        }
        continue;
      }

      // table (gfm)
      if (token = this.tokenizer.table(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // lheading
      if (token = this.tokenizer.lheading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // top-level paragraph
      if (top && (token = this.tokenizer.paragraph(src))) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // text
      if (token = this.tokenizer.text(src, tokens)) {
        src = src.substring(token.raw.length);
        if (token.type) {
          tokens.push(token);
        } else {
          lastToken = tokens[tokens.length - 1];
          lastToken.raw += '\n' + token.raw;
          lastToken.text += '\n' + token.text;
        }
        continue;
      }

      if (src) {
        const errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }

    return tokens;
  }

  inline(tokens) {
    let i,
      j,
      k,
      l2,
      row,
      token;

    const l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];
      switch (token.type) {
        case 'paragraph':
        case 'text':
        case 'heading': {
          token.tokens = [];
          this.inlineTokens(token.text, token.tokens);
          break;
        }
        case 'table': {
          token.tokens = {
            header: [],
            cells: []
          };

          // header
          l2 = token.header.length;
          for (j = 0; j < l2; j++) {
            token.tokens.header[j] = [];
            this.inlineTokens(token.header[j], token.tokens.header[j]);
          }

          // cells
          l2 = token.cells.length;
          for (j = 0; j < l2; j++) {
            row = token.cells[j];
            token.tokens.cells[j] = [];
            for (k = 0; k < row.length; k++) {
              token.tokens.cells[j][k] = [];
              this.inlineTokens(row[k], token.tokens.cells[j][k]);
            }
          }

          break;
        }
        case 'blockquote': {
          this.inline(token.tokens);
          break;
        }
        case 'list': {
          l2 = token.items.length;
          for (j = 0; j < l2; j++) {
            this.inline(token.items[j].tokens);
          }
          break;
        }
      }
    }

    return tokens;
  }

  /**
   * Lexing/Compiling
   */
  inlineTokens(src, tokens = [], inLink = false, inRawBlock = false, prevChar = '') {
    let token;

    // String with links masked to avoid interference with em and strong
    let maskedSrc = src;
    let match;

    // Mask out reflinks
    if (this.tokens.links) {
      const links = Object.keys(this.tokens.links);
      if (links.length > 0) {
        while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
          if (links.includes(match[0].slice(match[0].lastIndexOf('[') + 1, -1))) {
            maskedSrc = maskedSrc.slice(0, match.index) + '[' + 'a'.repeat(match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
          }
        }
      }
    }
    // Mask out other blocks
    while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + '[' + 'a'.repeat(match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    }

    while (src) {
      // escape
      if (token = this.tokenizer.escape(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // tag
      if (token = this.tokenizer.tag(src, inLink, inRawBlock)) {
        src = src.substring(token.raw.length);
        inLink = token.inLink;
        inRawBlock = token.inRawBlock;
        tokens.push(token);
        continue;
      }

      // link
      if (token = this.tokenizer.link(src)) {
        src = src.substring(token.raw.length);
        if (token.type === 'link') {
          token.tokens = this.inlineTokens(token.text, [], true, inRawBlock);
        }
        tokens.push(token);
        continue;
      }

      // reflink, nolink
      if (token = this.tokenizer.reflink(src, this.tokens.links)) {
        src = src.substring(token.raw.length);
        if (token.type === 'link') {
          token.tokens = this.inlineTokens(token.text, [], true, inRawBlock);
        }
        tokens.push(token);
        continue;
      }

      // strong
      if (token = this.tokenizer.strong(src, maskedSrc, prevChar)) {
        src = src.substring(token.raw.length);
        token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
        tokens.push(token);
        continue;
      }

      // em
      if (token = this.tokenizer.em(src, maskedSrc, prevChar)) {
        src = src.substring(token.raw.length);
        token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
        tokens.push(token);
        continue;
      }

      // code
      if (token = this.tokenizer.codespan(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // br
      if (token = this.tokenizer.br(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // del (gfm)
      if (token = this.tokenizer.del(src)) {
        src = src.substring(token.raw.length);
        token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
        tokens.push(token);
        continue;
      }

      // autolink
      if (token = this.tokenizer.autolink(src, mangle)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // url (gfm)
      if (!inLink && (token = this.tokenizer.url(src, mangle))) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // text
      if (token = this.tokenizer.inlineText(src, inRawBlock, smartypants)) {
        src = src.substring(token.raw.length);
        prevChar = token.raw.slice(-1);
        tokens.push(token);
        continue;
      }

      if (src) {
        const errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }

    return tokens;
  }
};

const { defaults: defaults$3 } = defaults;
const {
  cleanUrl: cleanUrl$1,
  escape: escape$2
} = helpers;

/**
 * Renderer
 */
var Renderer_1 = class Renderer {
  constructor(options) {
    this.options = options || defaults$3;
  }

  code(code, infostring, escaped) {
    const lang = (infostring || '').match(/\S*/)[0];
    if (this.options.highlight) {
      const out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }

    if (!lang) {
      return '<pre><code>'
        + (escaped ? code : escape$2(code, true))
        + '</code></pre>\n';
    }

    return '<pre><code class="'
      + this.options.langPrefix
      + escape$2(lang, true)
      + '">'
      + (escaped ? code : escape$2(code, true))
      + '</code></pre>\n';
  }

  blockquote(quote) {
    return '<blockquote>\n' + quote + '</blockquote>\n';
  }

  html(html) {
    return html;
  }

  heading(text, level, raw, slugger) {
    if (this.options.headerIds) {
      return '<h'
        + level
        + ' id="'
        + this.options.headerPrefix
        + slugger.slug(raw)
        + '">'
        + text
        + '</h'
        + level
        + '>\n';
    }
    // ignore IDs
    return '<h' + level + '>' + text + '</h' + level + '>\n';
  }

  hr() {
    return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
  }

  list(body, ordered, start) {
    const type = ordered ? 'ol' : 'ul',
      startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
    return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
  }

  listitem(text) {
    return '<li>' + text + '</li>\n';
  }

  checkbox(checked) {
    return '<input '
      + (checked ? 'checked="" ' : '')
      + 'disabled="" type="checkbox"'
      + (this.options.xhtml ? ' /' : '')
      + '> ';
  }

  paragraph(text) {
    return '<p>' + text + '</p>\n';
  }

  table(header, body) {
    if (body) body = '<tbody>' + body + '</tbody>';

    return '<table>\n'
      + '<thead>\n'
      + header
      + '</thead>\n'
      + body
      + '</table>\n';
  }

  tablerow(content) {
    return '<tr>\n' + content + '</tr>\n';
  }

  tablecell(content, flags) {
    const type = flags.header ? 'th' : 'td';
    const tag = flags.align
      ? '<' + type + ' align="' + flags.align + '">'
      : '<' + type + '>';
    return tag + content + '</' + type + '>\n';
  }

  // span level renderer
  strong(text) {
    return '<strong>' + text + '</strong>';
  }

  em(text) {
    return '<em>' + text + '</em>';
  }

  codespan(text) {
    return '<code>' + text + '</code>';
  }

  br() {
    return this.options.xhtml ? '<br/>' : '<br>';
  }

  del(text) {
    return '<del>' + text + '</del>';
  }

  link(href, title, text) {
    href = cleanUrl$1(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    let out = '<a href="' + escape$2(href) + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += '>' + text + '</a>';
    return out;
  }

  image(href, title, text) {
    href = cleanUrl$1(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }

    let out = '<img src="' + href + '" alt="' + text + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += this.options.xhtml ? '/>' : '>';
    return out;
  }

  text(text) {
    return text;
  }
};

/**
 * TextRenderer
 * returns only the textual part of the token
 */
var TextRenderer_1 = class TextRenderer {
  // no need for block level renderers
  strong(text) {
    return text;
  }

  em(text) {
    return text;
  }

  codespan(text) {
    return text;
  }

  del(text) {
    return text;
  }

  html(text) {
    return text;
  }

  text(text) {
    return text;
  }

  link(href, title, text) {
    return '' + text;
  }

  image(href, title, text) {
    return '' + text;
  }

  br() {
    return '';
  }
};

/**
 * Slugger generates header id
 */
var Slugger_1 = class Slugger {
  constructor() {
    this.seen = {};
  }

  /**
   * Convert string to unique id
   */
  slug(value) {
    let slug = value
      .toLowerCase()
      .trim()
      // remove html tags
      .replace(/<[!\/a-z].*?>/ig, '')
      // remove unwanted chars
      .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '')
      .replace(/\s/g, '-');

    if (this.seen.hasOwnProperty(slug)) {
      const originalSlug = slug;
      do {
        this.seen[originalSlug]++;
        slug = originalSlug + '-' + this.seen[originalSlug];
      } while (this.seen.hasOwnProperty(slug));
    }
    this.seen[slug] = 0;

    return slug;
  }
};

const { defaults: defaults$4 } = defaults;
const {
  unescape: unescape$1
} = helpers;

/**
 * Parsing & Compiling
 */
var Parser_1 = class Parser {
  constructor(options) {
    this.options = options || defaults$4;
    this.options.renderer = this.options.renderer || new Renderer_1();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.textRenderer = new TextRenderer_1();
    this.slugger = new Slugger_1();
  }

  /**
   * Static Parse Method
   */
  static parse(tokens, options) {
    const parser = new Parser(options);
    return parser.parse(tokens);
  }

  /**
   * Parse Loop
   */
  parse(tokens, top = true) {
    let out = '',
      i,
      j,
      k,
      l2,
      l3,
      row,
      cell,
      header,
      body,
      token,
      ordered,
      start,
      loose,
      itemBody,
      item,
      checked,
      task,
      checkbox;

    const l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];
      switch (token.type) {
        case 'space': {
          continue;
        }
        case 'hr': {
          out += this.renderer.hr();
          continue;
        }
        case 'heading': {
          out += this.renderer.heading(
            this.parseInline(token.tokens),
            token.depth,
            unescape$1(this.parseInline(token.tokens, this.textRenderer)),
            this.slugger);
          continue;
        }
        case 'code': {
          out += this.renderer.code(token.text,
            token.lang,
            token.escaped);
          continue;
        }
        case 'table': {
          header = '';

          // header
          cell = '';
          l2 = token.header.length;
          for (j = 0; j < l2; j++) {
            cell += this.renderer.tablecell(
              this.parseInline(token.tokens.header[j]),
              { header: true, align: token.align[j] }
            );
          }
          header += this.renderer.tablerow(cell);

          body = '';
          l2 = token.cells.length;
          for (j = 0; j < l2; j++) {
            row = token.tokens.cells[j];

            cell = '';
            l3 = row.length;
            for (k = 0; k < l3; k++) {
              cell += this.renderer.tablecell(
                this.parseInline(row[k]),
                { header: false, align: token.align[k] }
              );
            }

            body += this.renderer.tablerow(cell);
          }
          out += this.renderer.table(header, body);
          continue;
        }
        case 'blockquote': {
          body = this.parse(token.tokens);
          out += this.renderer.blockquote(body);
          continue;
        }
        case 'list': {
          ordered = token.ordered;
          start = token.start;
          loose = token.loose;
          l2 = token.items.length;

          body = '';
          for (j = 0; j < l2; j++) {
            item = token.items[j];
            checked = item.checked;
            task = item.task;

            itemBody = '';
            if (item.task) {
              checkbox = this.renderer.checkbox(checked);
              if (loose) {
                if (item.tokens.length > 0 && item.tokens[0].type === 'text') {
                  item.tokens[0].text = checkbox + ' ' + item.tokens[0].text;
                  if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === 'text') {
                    item.tokens[0].tokens[0].text = checkbox + ' ' + item.tokens[0].tokens[0].text;
                  }
                } else {
                  item.tokens.unshift({
                    type: 'text',
                    text: checkbox
                  });
                }
              } else {
                itemBody += checkbox;
              }
            }

            itemBody += this.parse(item.tokens, loose);
            body += this.renderer.listitem(itemBody, task, checked);
          }

          out += this.renderer.list(body, ordered, start);
          continue;
        }
        case 'html': {
          // TODO parse inline content if parameter markdown=1
          out += this.renderer.html(token.text);
          continue;
        }
        case 'paragraph': {
          out += this.renderer.paragraph(this.parseInline(token.tokens));
          continue;
        }
        case 'text': {
          body = token.tokens ? this.parseInline(token.tokens) : token.text;
          while (i + 1 < l && tokens[i + 1].type === 'text') {
            token = tokens[++i];
            body += '\n' + (token.tokens ? this.parseInline(token.tokens) : token.text);
          }
          out += top ? this.renderer.paragraph(body) : body;
          continue;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }

    return out;
  }

  /**
   * Parse Inline Tokens
   */
  parseInline(tokens, renderer) {
    renderer = renderer || this.renderer;
    let out = '',
      i,
      token;

    const l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];
      switch (token.type) {
        case 'escape': {
          out += renderer.text(token.text);
          break;
        }
        case 'html': {
          out += renderer.html(token.text);
          break;
        }
        case 'link': {
          out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
          break;
        }
        case 'image': {
          out += renderer.image(token.href, token.title, token.text);
          break;
        }
        case 'strong': {
          out += renderer.strong(this.parseInline(token.tokens, renderer));
          break;
        }
        case 'em': {
          out += renderer.em(this.parseInline(token.tokens, renderer));
          break;
        }
        case 'codespan': {
          out += renderer.codespan(token.text);
          break;
        }
        case 'br': {
          out += renderer.br();
          break;
        }
        case 'del': {
          out += renderer.del(this.parseInline(token.tokens, renderer));
          break;
        }
        case 'text': {
          out += renderer.text(token.text);
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
};

const {
  merge: merge$2,
  checkSanitizeDeprecation: checkSanitizeDeprecation$1,
  escape: escape$3
} = helpers;
const {
  getDefaults,
  changeDefaults,
  defaults: defaults$5
} = defaults;

/**
 * Marked
 */
function marked(src, opt, callback) {
  // throw error in case of non string input
  if (typeof src === 'undefined' || src === null) {
    throw new Error('marked(): input parameter is undefined or null');
  }
  if (typeof src !== 'string') {
    throw new Error('marked(): input parameter is of type '
      + Object.prototype.toString.call(src) + ', string expected');
  }

  if (typeof opt === 'function') {
    callback = opt;
    opt = null;
  }

  opt = merge$2({}, marked.defaults, opt || {});
  checkSanitizeDeprecation$1(opt);

  if (callback) {
    const highlight = opt.highlight;
    let tokens;

    try {
      tokens = Lexer_1.lex(src, opt);
    } catch (e) {
      return callback(e);
    }

    const done = function(err) {
      let out;

      if (!err) {
        try {
          out = Parser_1.parse(tokens, opt);
        } catch (e) {
          err = e;
        }
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!tokens.length) return done();

    let pending = 0;
    marked.walkTokens(tokens, function(token) {
      if (token.type === 'code') {
        pending++;
        setTimeout(() => {
          highlight(token.text, token.lang, function(err, code) {
            if (err) {
              return done(err);
            }
            if (code != null && code !== token.text) {
              token.text = code;
              token.escaped = true;
            }

            pending--;
            if (pending === 0) {
              done();
            }
          });
        }, 0);
      }
    });

    if (pending === 0) {
      done();
    }

    return;
  }

  try {
    const tokens = Lexer_1.lex(src, opt);
    if (opt.walkTokens) {
      marked.walkTokens(tokens, opt.walkTokens);
    }
    return Parser_1.parse(tokens, opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/markedjs/marked.';
    if (opt.silent) {
      return '<p>An error occurred:</p><pre>'
        + escape$3(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge$2(marked.defaults, opt);
  changeDefaults(marked.defaults);
  return marked;
};

marked.getDefaults = getDefaults;

marked.defaults = defaults$5;

/**
 * Use Extension
 */

marked.use = function(extension) {
  const opts = merge$2({}, extension);
  if (extension.renderer) {
    const renderer = marked.defaults.renderer || new Renderer_1();
    for (const prop in extension.renderer) {
      const prevRenderer = renderer[prop];
      renderer[prop] = (...args) => {
        let ret = extension.renderer[prop].apply(renderer, args);
        if (ret === false) {
          ret = prevRenderer.apply(renderer, args);
        }
        return ret;
      };
    }
    opts.renderer = renderer;
  }
  if (extension.tokenizer) {
    const tokenizer = marked.defaults.tokenizer || new Tokenizer_1();
    for (const prop in extension.tokenizer) {
      const prevTokenizer = tokenizer[prop];
      tokenizer[prop] = (...args) => {
        let ret = extension.tokenizer[prop].apply(tokenizer, args);
        if (ret === false) {
          ret = prevTokenizer.apply(tokenizer, args);
        }
        return ret;
      };
    }
    opts.tokenizer = tokenizer;
  }
  if (extension.walkTokens) {
    const walkTokens = marked.defaults.walkTokens;
    opts.walkTokens = (token) => {
      extension.walkTokens(token);
      if (walkTokens) {
        walkTokens(token);
      }
    };
  }
  marked.setOptions(opts);
};

/**
 * Run callback for every token
 */

marked.walkTokens = function(tokens, callback) {
  for (const token of tokens) {
    callback(token);
    switch (token.type) {
      case 'table': {
        for (const cell of token.tokens.header) {
          marked.walkTokens(cell, callback);
        }
        for (const row of token.tokens.cells) {
          for (const cell of row) {
            marked.walkTokens(cell, callback);
          }
        }
        break;
      }
      case 'list': {
        marked.walkTokens(token.items, callback);
        break;
      }
      default: {
        if (token.tokens) {
          marked.walkTokens(token.tokens, callback);
        }
      }
    }
  }
};

/**
 * Expose
 */

marked.Parser = Parser_1;
marked.parser = Parser_1.parse;

marked.Renderer = Renderer_1;
marked.TextRenderer = TextRenderer_1;

marked.Lexer = Lexer_1;
marked.lexer = Lexer_1.lex;

marked.Tokenizer = Tokenizer_1;

marked.Slugger = Slugger_1;

marked.parse = marked;

var marked_1 = marked;

/*! @license DOMPurify | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.0.8/LICENSE */

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var hasOwnProperty = Object.hasOwnProperty,
    setPrototypeOf = Object.setPrototypeOf,
    isFrozen = Object.isFrozen,
    objectKeys = Object.keys;
var freeze = Object.freeze,
    seal = Object.seal,
    create = Object.create; // eslint-disable-line import/no-mutable-exports

var _ref = typeof Reflect !== 'undefined' && Reflect,
    apply = _ref.apply,
    construct = _ref.construct;

if (!apply) {
  apply = function apply(fun, thisValue, args) {
    return fun.apply(thisValue, args);
  };
}

if (!freeze) {
  freeze = function freeze(x) {
    return x;
  };
}

if (!seal) {
  seal = function seal(x) {
    return x;
  };
}

if (!construct) {
  construct = function construct(Func, args) {
    return new (Function.prototype.bind.apply(Func, [null].concat(_toConsumableArray(args))))();
  };
}

var arrayForEach = unapply(Array.prototype.forEach);
var arrayIndexOf = unapply(Array.prototype.indexOf);
var arrayJoin = unapply(Array.prototype.join);
var arrayPop = unapply(Array.prototype.pop);
var arrayPush = unapply(Array.prototype.push);
var arraySlice = unapply(Array.prototype.slice);

var stringToLowerCase = unapply(String.prototype.toLowerCase);
var stringMatch = unapply(String.prototype.match);
var stringReplace = unapply(String.prototype.replace);
var stringIndexOf = unapply(String.prototype.indexOf);
var stringTrim = unapply(String.prototype.trim);

var regExpTest = unapply(RegExp.prototype.test);
var regExpCreate = unconstruct(RegExp);

var typeErrorCreate = unconstruct(TypeError);

function unapply(func) {
  return function (thisArg) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return apply(func, thisArg, args);
  };
}

function unconstruct(func) {
  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return construct(func, args);
  };
}

/* Add properties to a lookup table */
function addToSet(set, array) {
  if (setPrototypeOf) {
    // Make 'in' and truthy checks like Boolean(set.constructor)
    // independent of any properties defined on Object.prototype.
    // Prevent prototype setters from intercepting set as a this value.
    setPrototypeOf(set, null);
  }

  var l = array.length;
  while (l--) {
    var element = array[l];
    if (typeof element === 'string') {
      var lcElement = stringToLowerCase(element);
      if (lcElement !== element) {
        // Config presets (e.g. tags.js, attrs.js) are immutable.
        if (!isFrozen(array)) {
          array[l] = lcElement;
        }

        element = lcElement;
      }
    }

    set[element] = true;
  }

  return set;
}

/* Shallow clone an object */
function clone(object) {
  var newObject = create(null);

  var property = void 0;
  for (property in object) {
    if (apply(hasOwnProperty, object, [property])) {
      newObject[property] = object[property];
    }
  }

  return newObject;
}

var html = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']);

// SVG
var svg = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'audio', 'canvas', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'video', 'view', 'vkern']);

var svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']);

var mathMl = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover']);

var text = freeze(['#text']);

var html$1 = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'pattern', 'placeholder', 'playsinline', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'xmlns']);

var svg$1 = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'targetx', 'targety', 'transform', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);

var mathMl$1 = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);

var xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

// eslint-disable-next-line unicorn/better-regex
var MUSTACHE_EXPR = seal(/\{\{[\s\S]*|[\s\S]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode
var ERB_EXPR = seal(/<%[\s\S]*|[\s\S]*%>/gm);
var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/); // eslint-disable-line no-useless-escape
var ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape
var IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
);
var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
var ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray$1(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getGlobal = function getGlobal() {
  return typeof window === 'undefined' ? null : window;
};

/**
 * Creates a no-op policy for internal use only.
 * Don't export this function outside this module!
 * @param {?TrustedTypePolicyFactory} trustedTypes The policy factory.
 * @param {Document} document The document object (to determine policy name suffix)
 * @return {?TrustedTypePolicy} The policy created (or null, if Trusted Types
 * are not supported).
 */
var _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, document) {
  if ((typeof trustedTypes === 'undefined' ? 'undefined' : _typeof(trustedTypes)) !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
    return null;
  }

  // Allow the callers to control the unique policy name
  // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
  // Policy creation with duplicate names throws in Trusted Types.
  var suffix = null;
  var ATTR_NAME = 'data-tt-policy-suffix';
  if (document.currentScript && document.currentScript.hasAttribute(ATTR_NAME)) {
    suffix = document.currentScript.getAttribute(ATTR_NAME);
  }

  var policyName = 'dompurify' + (suffix ? '#' + suffix : '');

  try {
    return trustedTypes.createPolicy(policyName, {
      createHTML: function createHTML(html$$1) {
        return html$$1;
      }
    });
  } catch (_) {
    // Policy creation failed (most likely another DOMPurify script has
    // already run). Skip creating the policy, as this will only cause errors
    // if TT are enforced.
    console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
    return null;
  }
};

function createDOMPurify() {
  var window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();

  var DOMPurify = function DOMPurify(root) {
    return createDOMPurify(root);
  };

  /**
   * Version label, exposed for easier checks
   * if DOMPurify is up to date or not
   */
  DOMPurify.version = '2.0.15';

  /**
   * Array of elements that DOMPurify removed during sanitation.
   * Empty if nothing was removed.
   */
  DOMPurify.removed = [];

  if (!window || !window.document || window.document.nodeType !== 9) {
    // Not running in a browser, provide a factory function
    // so that you can pass your own Window
    DOMPurify.isSupported = false;

    return DOMPurify;
  }

  var originalDocument = window.document;
  var removeTitle = false;

  var document = window.document;
  var DocumentFragment = window.DocumentFragment,
      HTMLTemplateElement = window.HTMLTemplateElement,
      Node = window.Node,
      NodeFilter = window.NodeFilter,
      _window$NamedNodeMap = window.NamedNodeMap,
      NamedNodeMap = _window$NamedNodeMap === undefined ? window.NamedNodeMap || window.MozNamedAttrMap : _window$NamedNodeMap,
      Text = window.Text,
      Comment = window.Comment,
      DOMParser = window.DOMParser,
      trustedTypes = window.trustedTypes;

  // As per issue #47, the web-components registry is inherited by a
  // new document created via createHTMLDocument. As per the spec
  // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
  // a new empty registry is used when creating a template contents owner
  // document, so we use that as our parent document to ensure nothing
  // is inherited.

  if (typeof HTMLTemplateElement === 'function') {
    var template = document.createElement('template');
    if (template.content && template.content.ownerDocument) {
      document = template.content.ownerDocument;
    }
  }

  var trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, originalDocument);
  var emptyHTML = trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML('') : '';

  var _document = document,
      implementation = _document.implementation,
      createNodeIterator = _document.createNodeIterator,
      getElementsByTagName = _document.getElementsByTagName,
      createDocumentFragment = _document.createDocumentFragment;
  var importNode = originalDocument.importNode;


  var documentMode = clone(document).documentMode ? document.documentMode : {};

  var hooks = {};

  /**
   * Expose whether this browser supports running the full DOMPurify.
   */
  DOMPurify.isSupported = implementation && typeof implementation.createHTMLDocument !== 'undefined' && documentMode !== 9;

  var MUSTACHE_EXPR$$1 = MUSTACHE_EXPR,
      ERB_EXPR$$1 = ERB_EXPR,
      DATA_ATTR$$1 = DATA_ATTR,
      ARIA_ATTR$$1 = ARIA_ATTR,
      IS_SCRIPT_OR_DATA$$1 = IS_SCRIPT_OR_DATA,
      ATTR_WHITESPACE$$1 = ATTR_WHITESPACE;
  var IS_ALLOWED_URI$$1 = IS_ALLOWED_URI;

  /**
   * We consider the elements and attributes below to be safe. Ideally
   * don't add any new ones but feel free to remove unwanted ones.
   */

  /* allowed element names */

  var ALLOWED_TAGS = null;
  var DEFAULT_ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray$1(html), _toConsumableArray$1(svg), _toConsumableArray$1(svgFilters), _toConsumableArray$1(mathMl), _toConsumableArray$1(text)));

  /* Allowed attribute names */
  var ALLOWED_ATTR = null;
  var DEFAULT_ALLOWED_ATTR = addToSet({}, [].concat(_toConsumableArray$1(html$1), _toConsumableArray$1(svg$1), _toConsumableArray$1(mathMl$1), _toConsumableArray$1(xml)));

  /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */
  var FORBID_TAGS = null;

  /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */
  var FORBID_ATTR = null;

  /* Decide if ARIA attributes are okay */
  var ALLOW_ARIA_ATTR = true;

  /* Decide if custom data attributes are okay */
  var ALLOW_DATA_ATTR = true;

  /* Decide if unknown protocols are okay */
  var ALLOW_UNKNOWN_PROTOCOLS = false;

  /* Output should be safe for jQuery's $() factory? */
  var SAFE_FOR_JQUERY = false;

  /* Output should be safe for common template engines.
   * This means, DOMPurify removes data attributes, mustaches and ERB
   */
  var SAFE_FOR_TEMPLATES = false;

  /* Decide if document with <html>... should be returned */
  var WHOLE_DOCUMENT = false;

  /* Track whether config is already set on this instance of DOMPurify. */
  var SET_CONFIG = false;

  /* Decide if all elements (e.g. style, script) must be children of
   * document.body. By default, browsers might move them to document.head */
  var FORCE_BODY = false;

  /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
   * string (or a TrustedHTML object if Trusted Types are supported).
   * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
   */
  var RETURN_DOM = false;

  /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
   * string  (or a TrustedHTML object if Trusted Types are supported) */
  var RETURN_DOM_FRAGMENT = false;

  /* If `RETURN_DOM` or `RETURN_DOM_FRAGMENT` is enabled, decide if the returned DOM
   * `Node` is imported into the current `Document`. If this flag is not enabled the
   * `Node` will belong (its ownerDocument) to a fresh `HTMLDocument`, created by
   * DOMPurify. */
  var RETURN_DOM_IMPORT = false;

  /* Try to return a Trusted Type object instead of a string, return a string in
   * case Trusted Types are not supported  */
  var RETURN_TRUSTED_TYPE = false;

  /* Output should be free from DOM clobbering attacks? */
  var SANITIZE_DOM = true;

  /* Keep element content when removing element? */
  var KEEP_CONTENT = true;

  /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
   * of importing it into a new Document and returning a sanitized copy */
  var IN_PLACE = false;

  /* Allow usage of profiles like html, svg and mathMl */
  var USE_PROFILES = {};

  /* Tags to ignore content of when KEEP_CONTENT is true */
  var FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);

  /* Tags that are safe for data: URIs */
  var DATA_URI_TAGS = null;
  var DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);

  /* Attributes safe for values like "javascript:" */
  var URI_SAFE_ATTRIBUTES = null;
  var DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'summary', 'title', 'value', 'style', 'xmlns']);

  /* Keep a reference to config to pass to hooks */
  var CONFIG = null;

  /* Ideally, do not touch anything below this line */
  /* ______________________________________________ */

  var formElement = document.createElement('form');

  /**
   * _parseConfig
   *
   * @param  {Object} cfg optional config literal
   */
  // eslint-disable-next-line complexity
  var _parseConfig = function _parseConfig(cfg) {
    if (CONFIG && CONFIG === cfg) {
      return;
    }

    /* Shield configuration object from tampering */
    if (!cfg || (typeof cfg === 'undefined' ? 'undefined' : _typeof(cfg)) !== 'object') {
      cfg = {};
    }

    /* Shield configuration object from prototype pollution */
    cfg = clone(cfg);

    /* Set configuration parameters */
    ALLOWED_TAGS = 'ALLOWED_TAGS' in cfg ? addToSet({}, cfg.ALLOWED_TAGS) : DEFAULT_ALLOWED_TAGS;
    ALLOWED_ATTR = 'ALLOWED_ATTR' in cfg ? addToSet({}, cfg.ALLOWED_ATTR) : DEFAULT_ALLOWED_ATTR;
    URI_SAFE_ATTRIBUTES = 'ADD_URI_SAFE_ATTR' in cfg ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR) : DEFAULT_URI_SAFE_ATTRIBUTES;
    DATA_URI_TAGS = 'ADD_DATA_URI_TAGS' in cfg ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS) : DEFAULT_DATA_URI_TAGS;
    FORBID_TAGS = 'FORBID_TAGS' in cfg ? addToSet({}, cfg.FORBID_TAGS) : {};
    FORBID_ATTR = 'FORBID_ATTR' in cfg ? addToSet({}, cfg.FORBID_ATTR) : {};
    USE_PROFILES = 'USE_PROFILES' in cfg ? cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true
    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true
    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false
    SAFE_FOR_JQUERY = cfg.SAFE_FOR_JQUERY || false; // Default false
    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false
    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false
    RETURN_DOM = cfg.RETURN_DOM || false; // Default false
    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false
    RETURN_DOM_IMPORT = cfg.RETURN_DOM_IMPORT || false; // Default false
    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false
    FORCE_BODY = cfg.FORCE_BODY || false; // Default false
    SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true
    KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true
    IN_PLACE = cfg.IN_PLACE || false; // Default false
    IS_ALLOWED_URI$$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI$$1;
    if (SAFE_FOR_TEMPLATES) {
      ALLOW_DATA_ATTR = false;
    }

    if (RETURN_DOM_FRAGMENT) {
      RETURN_DOM = true;
    }

    /* Parse profile info */
    if (USE_PROFILES) {
      ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray$1(text)));
      ALLOWED_ATTR = [];
      if (USE_PROFILES.html === true) {
        addToSet(ALLOWED_TAGS, html);
        addToSet(ALLOWED_ATTR, html$1);
      }

      if (USE_PROFILES.svg === true) {
        addToSet(ALLOWED_TAGS, svg);
        addToSet(ALLOWED_ATTR, svg$1);
        addToSet(ALLOWED_ATTR, xml);
      }

      if (USE_PROFILES.svgFilters === true) {
        addToSet(ALLOWED_TAGS, svgFilters);
        addToSet(ALLOWED_ATTR, svg$1);
        addToSet(ALLOWED_ATTR, xml);
      }

      if (USE_PROFILES.mathMl === true) {
        addToSet(ALLOWED_TAGS, mathMl);
        addToSet(ALLOWED_ATTR, mathMl$1);
        addToSet(ALLOWED_ATTR, xml);
      }
    }

    /* Merge configuration parameters */
    if (cfg.ADD_TAGS) {
      if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
        ALLOWED_TAGS = clone(ALLOWED_TAGS);
      }

      addToSet(ALLOWED_TAGS, cfg.ADD_TAGS);
    }

    if (cfg.ADD_ATTR) {
      if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
        ALLOWED_ATTR = clone(ALLOWED_ATTR);
      }

      addToSet(ALLOWED_ATTR, cfg.ADD_ATTR);
    }

    if (cfg.ADD_URI_SAFE_ATTR) {
      addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR);
    }

    /* Add #text in case KEEP_CONTENT is set to true */
    if (KEEP_CONTENT) {
      ALLOWED_TAGS['#text'] = true;
    }

    /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */
    if (WHOLE_DOCUMENT) {
      addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
    }

    /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */
    if (ALLOWED_TAGS.table) {
      addToSet(ALLOWED_TAGS, ['tbody']);
      delete FORBID_TAGS.tbody;
    }

    // Prevent further manipulation of configuration.
    // Not available in IE8, Safari 5, etc.
    if (freeze) {
      freeze(cfg);
    }

    CONFIG = cfg;
  };

  /**
   * _forceRemove
   *
   * @param  {Node} node a DOM node
   */
  var _forceRemove = function _forceRemove(node) {
    arrayPush(DOMPurify.removed, { element: node });
    try {
      node.parentNode.removeChild(node);
    } catch (_) {
      node.outerHTML = emptyHTML;
    }
  };

  /**
   * _removeAttribute
   *
   * @param  {String} name an Attribute name
   * @param  {Node} node a DOM node
   */
  var _removeAttribute = function _removeAttribute(name, node) {
    try {
      arrayPush(DOMPurify.removed, {
        attribute: node.getAttributeNode(name),
        from: node
      });
    } catch (_) {
      arrayPush(DOMPurify.removed, {
        attribute: null,
        from: node
      });
    }

    node.removeAttribute(name);
  };

  /**
   * _initDocument
   *
   * @param  {String} dirty a string of dirty markup
   * @return {Document} a DOM, filled with the dirty markup
   */
  var _initDocument = function _initDocument(dirty) {
    /* Create a HTML document */
    var doc = void 0;
    var leadingWhitespace = void 0;

    if (FORCE_BODY) {
      dirty = '<remove></remove>' + dirty;
    } else {
      /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
      var matches = stringMatch(dirty, /^[\r\n\t ]+/);
      leadingWhitespace = matches && matches[0];
    }

    var dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
    /* Use the DOMParser API by default, fallback later if needs be */
    try {
      doc = new DOMParser().parseFromString(dirtyPayload, 'text/html');
    } catch (_) {}

    /* Remove title to fix a mXSS bug in older MS Edge */
    if (removeTitle) {
      addToSet(FORBID_TAGS, ['title']);
    }

    /* Use createHTMLDocument in case DOMParser is not available */
    if (!doc || !doc.documentElement) {
      doc = implementation.createHTMLDocument('');
      var _doc = doc,
          body = _doc.body;

      body.parentNode.removeChild(body.parentNode.firstElementChild);
      body.outerHTML = dirtyPayload;
    }

    if (dirty && leadingWhitespace) {
      doc.body.insertBefore(document.createTextNode(leadingWhitespace), doc.body.childNodes[0] || null);
    }

    /* Work on whole document or just its body */
    return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
  };

  /* Here we test for a broken feature in Edge that might cause mXSS */
  if (DOMPurify.isSupported) {
    (function () {
      try {
        var doc = _initDocument('<x/><title>&lt;/title&gt;&lt;img&gt;');
        if (regExpTest(/<\/title/, doc.querySelector('title').innerHTML)) {
          removeTitle = true;
        }
      } catch (_) {}
    })();
  }

  /**
   * _createIterator
   *
   * @param  {Document} root document/fragment to create iterator for
   * @return {Iterator} iterator instance
   */
  var _createIterator = function _createIterator(root) {
    return createNodeIterator.call(root.ownerDocument || root, root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT, function () {
      return NodeFilter.FILTER_ACCEPT;
    }, false);
  };

  /**
   * _isClobbered
   *
   * @param  {Node} elm element to check for clobbering attacks
   * @return {Boolean} true if clobbered, false if safe
   */
  var _isClobbered = function _isClobbered(elm) {
    if (elm instanceof Text || elm instanceof Comment) {
      return false;
    }

    if (typeof elm.nodeName !== 'string' || typeof elm.textContent !== 'string' || typeof elm.removeChild !== 'function' || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== 'function' || typeof elm.setAttribute !== 'function' || typeof elm.namespaceURI !== 'string') {
      return true;
    }

    return false;
  };

  /**
   * _isNode
   *
   * @param  {Node} obj object to check whether it's a DOM node
   * @return {Boolean} true is object is a DOM node
   */
  var _isNode = function _isNode(object) {
    return (typeof Node === 'undefined' ? 'undefined' : _typeof(Node)) === 'object' ? object instanceof Node : object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string';
  };

  /**
   * _executeHook
   * Execute user configurable hooks
   *
   * @param  {String} entryPoint  Name of the hook's entry point
   * @param  {Node} currentNode node to work on with the hook
   * @param  {Object} data additional hook parameters
   */
  var _executeHook = function _executeHook(entryPoint, currentNode, data) {
    if (!hooks[entryPoint]) {
      return;
    }

    arrayForEach(hooks[entryPoint], function (hook) {
      hook.call(DOMPurify, currentNode, data, CONFIG);
    });
  };

  /**
   * _sanitizeElements
   *
   * @protect nodeName
   * @protect textContent
   * @protect removeChild
   *
   * @param   {Node} currentNode to check for permission to exist
   * @return  {Boolean} true if node was killed, false if left alive
   */
  // eslint-disable-next-line complexity
  var _sanitizeElements = function _sanitizeElements(currentNode) {
    var content = void 0;

    /* Execute a hook if present */
    _executeHook('beforeSanitizeElements', currentNode, null);

    /* Check if element is clobbered or can clobber */
    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }

    /* Check if tagname contains Unicode */
    if (stringMatch(currentNode.nodeName, /[\u0080-\uFFFF]/)) {
      _forceRemove(currentNode);
      return true;
    }

    /* Now let's check the element's type and name */
    var tagName = stringToLowerCase(currentNode.nodeName);

    /* Execute a hook if present */
    _executeHook('uponSanitizeElement', currentNode, {
      tagName: tagName,
      allowedTags: ALLOWED_TAGS
    });

    /* Take care of an mXSS pattern using p, br inside svg, math */
    if ((tagName === 'svg' || tagName === 'math') && currentNode.querySelectorAll('p, br').length !== 0) {
      _forceRemove(currentNode);
      return true;
    }

    /* Remove element if anything forbids its presence */
    if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
      /* Keep content except for bad-listed elements */
      if (KEEP_CONTENT && !FORBID_CONTENTS[tagName] && typeof currentNode.insertAdjacentHTML === 'function') {
        try {
          var htmlToInsert = currentNode.innerHTML;
          currentNode.insertAdjacentHTML('AfterEnd', trustedTypesPolicy ? trustedTypesPolicy.createHTML(htmlToInsert) : htmlToInsert);
        } catch (_) {}
      }

      _forceRemove(currentNode);
      return true;
    }

    /* Remove in case a noscript/noembed XSS is suspected */
    if (tagName === 'noscript' && regExpTest(/<\/noscript/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }

    if (tagName === 'noembed' && regExpTest(/<\/noembed/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }

    /* Convert markup to cover jQuery behavior */
    if (SAFE_FOR_JQUERY && !_isNode(currentNode.firstElementChild) && (!_isNode(currentNode.content) || !_isNode(currentNode.content.firstElementChild)) && regExpTest(/</g, currentNode.textContent)) {
      arrayPush(DOMPurify.removed, { element: currentNode.cloneNode() });
      if (currentNode.innerHTML) {
        currentNode.innerHTML = stringReplace(currentNode.innerHTML, /</g, '&lt;');
      } else {
        currentNode.innerHTML = stringReplace(currentNode.textContent, /</g, '&lt;');
      }
    }

    /* Sanitize element content to be template-safe */
    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
      /* Get the element's text content */
      content = currentNode.textContent;
      content = stringReplace(content, MUSTACHE_EXPR$$1, ' ');
      content = stringReplace(content, ERB_EXPR$$1, ' ');
      if (currentNode.textContent !== content) {
        arrayPush(DOMPurify.removed, { element: currentNode.cloneNode() });
        currentNode.textContent = content;
      }
    }

    /* Execute a hook if present */
    _executeHook('afterSanitizeElements', currentNode, null);

    return false;
  };

  /**
   * _isValidAttribute
   *
   * @param  {string} lcTag Lowercase tag name of containing element.
   * @param  {string} lcName Lowercase attribute name.
   * @param  {string} value Attribute value.
   * @return {Boolean} Returns true if `value` is valid, otherwise false.
   */
  // eslint-disable-next-line complexity
  var _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
    /* Make sure attribute cannot clobber */
    if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
      return false;
    }

    /* Allow valid data-* attributes: At least one character after "-"
        (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
        XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
        We don't need to check the value; it's always URI safe. */
    if (ALLOW_DATA_ATTR && regExpTest(DATA_ATTR$$1, lcName)) ; else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$$1, lcName)) ; else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
      return false;

      /* Check value is safe. First, is attr inert? If so, is safe */
    } else if (URI_SAFE_ATTRIBUTES[lcName]) ; else if (regExpTest(IS_ALLOWED_URI$$1, stringReplace(value, ATTR_WHITESPACE$$1, ''))) ; else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ; else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$$1, stringReplace(value, ATTR_WHITESPACE$$1, ''))) ; else if (!value) ; else {
      return false;
    }

    return true;
  };

  /**
   * _sanitizeAttributes
   *
   * @protect attributes
   * @protect nodeName
   * @protect removeAttribute
   * @protect setAttribute
   *
   * @param  {Node} currentNode to sanitize
   */
  // eslint-disable-next-line complexity
  var _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
    var attr = void 0;
    var value = void 0;
    var lcName = void 0;
    var idAttr = void 0;
    var l = void 0;
    /* Execute a hook if present */
    _executeHook('beforeSanitizeAttributes', currentNode, null);

    var attributes = currentNode.attributes;

    /* Check if we have attributes; if not we might have a text node */

    if (!attributes) {
      return;
    }

    var hookEvent = {
      attrName: '',
      attrValue: '',
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR
    };
    l = attributes.length;

    /* Go backwards over all attributes; safely remove bad ones */
    while (l--) {
      attr = attributes[l];
      var _attr = attr,
          name = _attr.name,
          namespaceURI = _attr.namespaceURI;

      value = stringTrim(attr.value);
      lcName = stringToLowerCase(name);

      /* Execute a hook if present */
      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set
      _executeHook('uponSanitizeAttribute', currentNode, hookEvent);
      value = hookEvent.attrValue;
      /* Did the hooks approve of the attribute? */
      if (hookEvent.forceKeepAttr) {
        continue;
      }

      /* Remove attribute */
      // Safari (iOS + Mac), last tested v8.0.5, crashes if you try to
      // remove a "name" attribute from an <img> tag that has an "id"
      // attribute at the time.
      if (lcName === 'name' && currentNode.nodeName === 'IMG' && attributes.id) {
        idAttr = attributes.id;
        attributes = arraySlice(attributes, []);
        _removeAttribute('id', currentNode);
        _removeAttribute(name, currentNode);
        if (arrayIndexOf(attributes, idAttr) > l) {
          currentNode.setAttribute('id', idAttr.value);
        }
      } else if (
      // This works around a bug in Safari, where input[type=file]
      // cannot be dynamically set after type has been removed
      currentNode.nodeName === 'INPUT' && lcName === 'type' && value === 'file' && hookEvent.keepAttr && (ALLOWED_ATTR[lcName] || !FORBID_ATTR[lcName])) {
        continue;
      } else {
        // This avoids a crash in Safari v9.0 with double-ids.
        // The trick is to first set the id to be empty and then to
        // remove the attribute
        if (name === 'id') {
          currentNode.setAttribute(name, '');
        }

        _removeAttribute(name, currentNode);
      }

      /* Did the hooks approve of the attribute? */
      if (!hookEvent.keepAttr) {
        continue;
      }

      /* Work around a security issue in jQuery 3.0 */
      if (SAFE_FOR_JQUERY && regExpTest(/\/>/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }

      /* Take care of an mXSS pattern using namespace switches */
      if (regExpTest(/svg|math/i, currentNode.namespaceURI) && regExpTest(regExpCreate('</(' + arrayJoin(objectKeys(FORBID_CONTENTS), '|') + ')', 'i'), value)) {
        _removeAttribute(name, currentNode);
        continue;
      }

      /* Sanitize attribute content to be template-safe */
      if (SAFE_FOR_TEMPLATES) {
        value = stringReplace(value, MUSTACHE_EXPR$$1, ' ');
        value = stringReplace(value, ERB_EXPR$$1, ' ');
      }

      /* Is `value` valid for this attribute? */
      var lcTag = currentNode.nodeName.toLowerCase();
      if (!_isValidAttribute(lcTag, lcName, value)) {
        continue;
      }

      /* Handle invalid data-* attribute set by try-catching it */
      try {
        if (namespaceURI) {
          currentNode.setAttributeNS(namespaceURI, name, value);
        } else {
          /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
          currentNode.setAttribute(name, value);
        }

        arrayPop(DOMPurify.removed);
      } catch (_) {}
    }

    /* Execute a hook if present */
    _executeHook('afterSanitizeAttributes', currentNode, null);
  };

  /**
   * _sanitizeShadowDOM
   *
   * @param  {DocumentFragment} fragment to iterate over recursively
   */
  var _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
    var shadowNode = void 0;
    var shadowIterator = _createIterator(fragment);

    /* Execute a hook if present */
    _executeHook('beforeSanitizeShadowDOM', fragment, null);

    while (shadowNode = shadowIterator.nextNode()) {
      /* Execute a hook if present */
      _executeHook('uponSanitizeShadowNode', shadowNode, null);

      /* Sanitize tags and elements */
      if (_sanitizeElements(shadowNode)) {
        continue;
      }

      /* Deep shadow DOM detected */
      if (shadowNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(shadowNode.content);
      }

      /* Check attributes, sanitize if necessary */
      _sanitizeAttributes(shadowNode);
    }

    /* Execute a hook if present */
    _executeHook('afterSanitizeShadowDOM', fragment, null);
  };

  /**
   * Sanitize
   * Public method providing core sanitation functionality
   *
   * @param {String|Node} dirty string or DOM node
   * @param {Object} configuration object
   */
  // eslint-disable-next-line complexity
  DOMPurify.sanitize = function (dirty, cfg) {
    var body = void 0;
    var importedNode = void 0;
    var currentNode = void 0;
    var oldNode = void 0;
    var returnNode = void 0;
    /* Make sure we have a string to sanitize.
      DO NOT return early, as this will return the wrong type if
      the user has requested a DOM object rather than a string */
    if (!dirty) {
      dirty = '<!-->';
    }

    /* Stringify, in case dirty is an object */
    if (typeof dirty !== 'string' && !_isNode(dirty)) {
      // eslint-disable-next-line no-negated-condition
      if (typeof dirty.toString !== 'function') {
        throw typeErrorCreate('toString is not a function');
      } else {
        dirty = dirty.toString();
        if (typeof dirty !== 'string') {
          throw typeErrorCreate('dirty is not a string, aborting');
        }
      }
    }

    /* Check we can run. Otherwise fall back or ignore */
    if (!DOMPurify.isSupported) {
      if (_typeof(window.toStaticHTML) === 'object' || typeof window.toStaticHTML === 'function') {
        if (typeof dirty === 'string') {
          return window.toStaticHTML(dirty);
        }

        if (_isNode(dirty)) {
          return window.toStaticHTML(dirty.outerHTML);
        }
      }

      return dirty;
    }

    /* Assign config vars */
    if (!SET_CONFIG) {
      _parseConfig(cfg);
    }

    /* Clean up removed elements */
    DOMPurify.removed = [];

    /* Check if dirty is correctly typed for IN_PLACE */
    if (typeof dirty === 'string') {
      IN_PLACE = false;
    }

    if (IN_PLACE) ; else if (dirty instanceof Node) {
      /* If dirty is a DOM element, append to an empty document to avoid
         elements being stripped by the parser */
      body = _initDocument('<!-->');
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === 1 && importedNode.nodeName === 'BODY') {
        /* Node is already a body, use as is */
        body = importedNode;
      } else if (importedNode.nodeName === 'HTML') {
        body = importedNode;
      } else {
        // eslint-disable-next-line unicorn/prefer-node-append
        body.appendChild(importedNode);
      }
    } else {
      /* Exit directly if we have nothing to do */
      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT &&
      // eslint-disable-next-line unicorn/prefer-includes
      dirty.indexOf('<') === -1) {
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
      }

      /* Initialize the document to work on */
      body = _initDocument(dirty);

      /* Check we have a DOM node from the data */
      if (!body) {
        return RETURN_DOM ? null : emptyHTML;
      }
    }

    /* Remove first element node (ours) if FORCE_BODY is set */
    if (body && FORCE_BODY) {
      _forceRemove(body.firstChild);
    }

    /* Get node iterator */
    var nodeIterator = _createIterator(IN_PLACE ? dirty : body);

    /* Now start iterating over the created document */
    while (currentNode = nodeIterator.nextNode()) {
      /* Fix IE's strange behavior with manipulated textNodes #89 */
      if (currentNode.nodeType === 3 && currentNode === oldNode) {
        continue;
      }

      /* Sanitize tags and elements */
      if (_sanitizeElements(currentNode)) {
        continue;
      }

      /* Shadow DOM detected, sanitize it */
      if (currentNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(currentNode.content);
      }

      /* Check attributes, sanitize if necessary */
      _sanitizeAttributes(currentNode);

      oldNode = currentNode;
    }

    oldNode = null;

    /* If we sanitized `dirty` in-place, return it. */
    if (IN_PLACE) {
      return dirty;
    }

    /* Return sanitized string or DOM */
    if (RETURN_DOM) {
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);

        while (body.firstChild) {
          // eslint-disable-next-line unicorn/prefer-node-append
          returnNode.appendChild(body.firstChild);
        }
      } else {
        returnNode = body;
      }

      if (RETURN_DOM_IMPORT) {
        /*
          AdoptNode() is not used because internal state is not reset
          (e.g. the past names map of a HTMLFormElement), this is safe
          in theory but we would rather not risk another attack vector.
          The state that is cloned by importNode() is explicitly defined
          by the specs.
        */
        returnNode = importNode.call(originalDocument, returnNode, true);
      }

      return returnNode;
    }

    var serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;

    /* Sanitize final string template-safe */
    if (SAFE_FOR_TEMPLATES) {
      serializedHTML = stringReplace(serializedHTML, MUSTACHE_EXPR$$1, ' ');
      serializedHTML = stringReplace(serializedHTML, ERB_EXPR$$1, ' ');
    }

    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
  };

  /**
   * Public method to set the configuration once
   * setConfig
   *
   * @param {Object} cfg configuration object
   */
  DOMPurify.setConfig = function (cfg) {
    _parseConfig(cfg);
    SET_CONFIG = true;
  };

  /**
   * Public method to remove the configuration
   * clearConfig
   *
   */
  DOMPurify.clearConfig = function () {
    CONFIG = null;
    SET_CONFIG = false;
  };

  /**
   * Public method to check if an attribute value is valid.
   * Uses last set config, if any. Otherwise, uses config defaults.
   * isValidAttribute
   *
   * @param  {string} tag Tag name of containing element.
   * @param  {string} attr Attribute name.
   * @param  {string} value Attribute value.
   * @return {Boolean} Returns true if `value` is valid. Otherwise, returns false.
   */
  DOMPurify.isValidAttribute = function (tag, attr, value) {
    /* Initialize shared config vars if necessary. */
    if (!CONFIG) {
      _parseConfig({});
    }

    var lcTag = stringToLowerCase(tag);
    var lcName = stringToLowerCase(attr);
    return _isValidAttribute(lcTag, lcName, value);
  };

  /**
   * AddHook
   * Public method to add DOMPurify hooks
   *
   * @param {String} entryPoint entry point for the hook to add
   * @param {Function} hookFunction function to execute
   */
  DOMPurify.addHook = function (entryPoint, hookFunction) {
    if (typeof hookFunction !== 'function') {
      return;
    }

    hooks[entryPoint] = hooks[entryPoint] || [];
    arrayPush(hooks[entryPoint], hookFunction);
  };

  /**
   * RemoveHook
   * Public method to remove a DOMPurify hook at a given entryPoint
   * (pops it from the stack of hooks if more are present)
   *
   * @param {String} entryPoint entry point for the hook to remove
   */
  DOMPurify.removeHook = function (entryPoint) {
    if (hooks[entryPoint]) {
      arrayPop(hooks[entryPoint]);
    }
  };

  /**
   * RemoveHooks
   * Public method to remove all DOMPurify hooks at a given entryPoint
   *
   * @param  {String} entryPoint entry point for the hooks to remove
   */
  DOMPurify.removeHooks = function (entryPoint) {
    if (hooks[entryPoint]) {
      hooks[entryPoint] = [];
    }
  };

  /**
   * RemoveAllHooks
   * Public method to remove all DOMPurify hooks
   *
   */
  DOMPurify.removeAllHooks = function () {
    hooks = {};
  };

  return DOMPurify;
}

var purify = createDOMPurify();

const parse = (markdown) => {
  if (!markdown) {
    return html$3`
      ${nothing}
    `;
  }

  return html$3`
    ${unsafeHTML(purify.sanitize(marked_1(markdown)))}
  `;
};

function responseText(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.text();
}

function text$1(input, init) {
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
      md = text$1(src)
          .then(text => parse(text))
          .catch(e => html$3 `<span>Error while loading ${src}</span>`);
    }

    return html$3 `
      ${until(md, html$3`<span>Loading...</span>`)}
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
        return html$3 `
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
        return html$3 `
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
    return html$3 `
     <d3-fetch .url="${this.src}" @data-changed="${this.onDataChanged}"></d3-fetch>
     <fancy-accordion .openedIndex="${this.openedIndex}">
       ${(this.list || []).filter(l => l.name).map((l, i) => {
         return html$3 `<expansion-panel .opened="${i === 0}" data-name="${l.name}">
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
    return html$3 `
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

/**
 * marked - a markdown parser
 * Copyright (c) 2011-2019, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */

/**
 * DO NOT EDIT THIS FILE
 * The code in this file is generated from files in ./src/
 */

function createCommonjsModule$1(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var defaults$6 = createCommonjsModule$1(function (module) {
function getDefaults() {
  return {
    baseUrl: null,
    breaks: false,
    gfm: true,
    headerIds: true,
    headerPrefix: '',
    highlight: null,
    langPrefix: 'language-',
    mangle: true,
    pedantic: false,
    renderer: null,
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartLists: false,
    smartypants: false,
    xhtml: false
  };
}

function changeDefaults(newDefaults) {
  module.exports.defaults = newDefaults;
}

module.exports = {
  defaults: getDefaults(),
  getDefaults,
  changeDefaults
};
});
var defaults_1$1 = defaults$6.defaults;
var defaults_2$1 = defaults$6.getDefaults;
var defaults_3$1 = defaults$6.changeDefaults;

/**
 * Helpers
 */
const escapeTest$1 = /[&<>"']/;
const escapeReplace$1 = /[&<>"']/g;
const escapeTestNoEncode$1 = /[<>"']|&(?!#?\w+;)/;
const escapeReplaceNoEncode$1 = /[<>"']|&(?!#?\w+;)/g;
const escapeReplacements$1 = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};
const getEscapeReplacement$1 = (ch) => escapeReplacements$1[ch];
function escape$4(html, encode) {
  if (encode) {
    if (escapeTest$1.test(html)) {
      return html.replace(escapeReplace$1, getEscapeReplacement$1);
    }
  } else {
    if (escapeTestNoEncode$1.test(html)) {
      return html.replace(escapeReplaceNoEncode$1, getEscapeReplacement$1);
    }
  }

  return html;
}

const unescapeTest$1 = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;

function unescape$2(html) {
  // explicitly match decimal, hex, and named HTML entities
  return html.replace(unescapeTest$1, (_, n) => {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

const caret$1 = /(^|[^\[])\^/g;
function edit$2(regex, opt) {
  regex = regex.source || regex;
  opt = opt || '';
  const obj = {
    replace: (name, val) => {
      val = val.source || val;
      val = val.replace(caret$1, '$1');
      regex = regex.replace(name, val);
      return obj;
    },
    getRegex: () => {
      return new RegExp(regex, opt);
    }
  };
  return obj;
}

const nonWordAndColonTest$1 = /[^\w:]/g;
const originIndependentUrl$1 = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
function cleanUrl$2(sanitize, base, href) {
  if (sanitize) {
    let prot;
    try {
      prot = decodeURIComponent(unescape$2(href))
        .replace(nonWordAndColonTest$1, '')
        .toLowerCase();
    } catch (e) {
      return null;
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return null;
    }
  }
  if (base && !originIndependentUrl$1.test(href)) {
    href = resolveUrl$1(base, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, '%');
  } catch (e) {
    return null;
  }
  return href;
}

const baseUrls$1 = {};
const justDomain$1 = /^[^:]+:\/*[^/]*$/;
const protocol$1 = /^([^:]+:)[\s\S]*$/;
const domain$1 = /^([^:]+:\/*[^/]*)[\s\S]*$/;

function resolveUrl$1(base, href) {
  if (!baseUrls$1[' ' + base]) {
    // we can ignore everything in base after the last slash of its path component,
    // but we might need to add _that_
    // https://tools.ietf.org/html/rfc3986#section-3
    if (justDomain$1.test(base)) {
      baseUrls$1[' ' + base] = base + '/';
    } else {
      baseUrls$1[' ' + base] = rtrim$2(base, '/', true);
    }
  }
  base = baseUrls$1[' ' + base];
  const relativeBase = base.indexOf(':') === -1;

  if (href.substring(0, 2) === '//') {
    if (relativeBase) {
      return href;
    }
    return base.replace(protocol$1, '$1') + href;
  } else if (href.charAt(0) === '/') {
    if (relativeBase) {
      return href;
    }
    return base.replace(domain$1, '$1') + href;
  } else {
    return base + href;
  }
}

const noopTest$2 = { exec: function noopTest() {} };

function merge$3(obj) {
  let i = 1,
    target,
    key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}

function splitCells$2(tableRow, count) {
  // ensure that every cell-delimiting pipe has a space
  // before it to distinguish it from an escaped pipe
  const row = tableRow.replace(/\|/g, (match, offset, str) => {
      let escaped = false,
        curr = offset;
      while (--curr >= 0 && str[curr] === '\\') escaped = !escaped;
      if (escaped) {
        // odd number of slashes means | is escaped
        // so we leave it alone
        return '|';
      } else {
        // add space before unescaped |
        return ' |';
      }
    }),
    cells = row.split(/ \|/);
  let i = 0;

  if (cells.length > count) {
    cells.splice(count);
  } else {
    while (cells.length < count) cells.push('');
  }

  for (; i < cells.length; i++) {
    // leading or trailing whitespace is ignored per the gfm spec
    cells[i] = cells[i].trim().replace(/\\\|/g, '|');
  }
  return cells;
}

// Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
// /c*$/ is vulnerable to REDOS.
// invert: Remove suffix of non-c chars instead. Default falsey.
function rtrim$2(str, c, invert) {
  const l = str.length;
  if (l === 0) {
    return '';
  }

  // Length of suffix matching the invert condition.
  let suffLen = 0;

  // Step left until we fail to match the invert condition.
  while (suffLen < l) {
    const currChar = str.charAt(l - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }

  return str.substr(0, l - suffLen);
}

function findClosingBracket$2(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  const l = str.length;
  let level = 0,
    i = 0;
  for (; i < l; i++) {
    if (str[i] === '\\') {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  return -1;
}

function checkSanitizeDeprecation$2(opt) {
  if (opt && opt.sanitize && !opt.silent) {
    console.warn('marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options');
  }
}

var helpers$1 = {
  escape: escape$4,
  unescape: unescape$2,
  edit: edit$2,
  cleanUrl: cleanUrl$2,
  resolveUrl: resolveUrl$1,
  noopTest: noopTest$2,
  merge: merge$3,
  splitCells: splitCells$2,
  rtrim: rtrim$2,
  findClosingBracket: findClosingBracket$2,
  checkSanitizeDeprecation: checkSanitizeDeprecation$2
};

const {
  noopTest: noopTest$1$1,
  edit: edit$1$1,
  merge: merge$1$1
} = helpers$1;

/**
 * Block-Level Grammar
 */
const block$2 = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: /^ {0,3}(`{3,}|~{3,})([^`~\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
  hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: '^ {0,3}(?:' // optional indentation
    + '<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
    + '|comment[^\\n]*(\\n+|$)' // (2)
    + '|<\\?[\\s\\S]*?\\?>\\n*' // (3)
    + '|<![A-Z][\\s\\S]*?>\\n*' // (4)
    + '|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*' // (5)
    + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)' // (6)
    + '|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) open tag
    + '|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) closing tag
    + ')',
  def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
  nptable: noopTest$1$1,
  table: noopTest$1$1,
  lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
  // regex template, placeholders will be replaced according to different paragraph
  // interruption rules of commonmark and the original markdown spec:
  _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,
  text: /^[^\n]+/
};

block$2._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
block$2._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block$2.def = edit$1$1(block$2.def)
  .replace('label', block$2._label)
  .replace('title', block$2._title)
  .getRegex();

block$2.bullet = /(?:[*+-]|\d{1,9}\.)/;
block$2.item = /^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/;
block$2.item = edit$1$1(block$2.item, 'gm')
  .replace(/bull/g, block$2.bullet)
  .getRegex();

block$2.list = edit$1$1(block$2.list)
  .replace(/bull/g, block$2.bullet)
  .replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))')
  .replace('def', '\\n+(?=' + block$2.def.source + ')')
  .getRegex();

block$2._tag = 'address|article|aside|base|basefont|blockquote|body|caption'
  + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption'
  + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe'
  + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option'
  + '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr'
  + '|track|ul';
block$2._comment = /<!--(?!-?>)[\s\S]*?-->/;
block$2.html = edit$1$1(block$2.html, 'i')
  .replace('comment', block$2._comment)
  .replace('tag', block$2._tag)
  .replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/)
  .getRegex();

block$2.paragraph = edit$1$1(block$2._paragraph)
  .replace('hr', block$2.hr)
  .replace('heading', ' {0,3}#{1,6} +')
  .replace('|lheading', '') // setex headings don't interrupt commonmark paragraphs
  .replace('blockquote', ' {0,3}>')
  .replace('fences', ' {0,3}(?:`{3,}|~{3,})[^`\\n]*\\n')
  .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
  .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)')
  .replace('tag', block$2._tag) // pars can be interrupted by type (6) html blocks
  .getRegex();

block$2.blockquote = edit$1$1(block$2.blockquote)
  .replace('paragraph', block$2.paragraph)
  .getRegex();

/**
 * Normal Block Grammar
 */

block$2.normal = merge$1$1({}, block$2);

/**
 * GFM Block Grammar
 */

block$2.gfm = merge$1$1({}, block$2.normal, {
  nptable: /^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,
  table: /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/
});

/**
 * Pedantic grammar (original John Gruber's loose markdown specification)
 */

block$2.pedantic = merge$1$1({}, block$2.normal, {
  html: edit$1$1(
    '^ *(?:comment *(?:\\n|\\s*$)'
    + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
    + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))')
    .replace('comment', block$2._comment)
    .replace(/tag/g, '(?!(?:'
      + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub'
      + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)'
      + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b')
    .getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
  fences: noopTest$1$1, // fences not supported
  paragraph: edit$1$1(block$2.normal._paragraph)
    .replace('hr', block$2.hr)
    .replace('heading', ' *#{1,6} *[^\n]')
    .replace('lheading', block$2.lheading)
    .replace('blockquote', ' {0,3}>')
    .replace('|fences', '')
    .replace('|list', '')
    .replace('|html', '')
    .getRegex()
});

/**
 * Inline-Level Grammar
 */
const inline$2 = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noopTest$1$1,
  tag: '^comment'
    + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
    + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
    + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
    + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
    + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>', // CDATA section
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
  nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
  strong: /^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,
  em: /^_([^\s_])_(?!_)|^\*([^\s*<\[])\*(?!\*)|^_([^\s<][\s\S]*?[^\s_])_(?!_|[^\spunctuation])|^_([^\s_<][\s\S]*?[^\s])_(?!_|[^\spunctuation])|^\*([^\s<"][\s\S]*?[^\s\*])\*(?!\*|[^\spunctuation])|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: noopTest$1$1,
  text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/
};

// list of punctuation marks from common mark spec
// without ` and ] to workaround Rule 17 (inline code blocks/links)
inline$2._punctuation = '!"#$%&\'()*+,\\-./:;<=>?@\\[^_{|}~';
inline$2.em = edit$1$1(inline$2.em).replace(/punctuation/g, inline$2._punctuation).getRegex();

inline$2._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;

inline$2._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline$2._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline$2.autolink = edit$1$1(inline$2.autolink)
  .replace('scheme', inline$2._scheme)
  .replace('email', inline$2._email)
  .getRegex();

inline$2._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;

inline$2.tag = edit$1$1(inline$2.tag)
  .replace('comment', block$2._comment)
  .replace('attribute', inline$2._attribute)
  .getRegex();

inline$2._label = /(?:\[[^\[\]]*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
inline$2._href = /<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/;
inline$2._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;

inline$2.link = edit$1$1(inline$2.link)
  .replace('label', inline$2._label)
  .replace('href', inline$2._href)
  .replace('title', inline$2._title)
  .getRegex();

inline$2.reflink = edit$1$1(inline$2.reflink)
  .replace('label', inline$2._label)
  .getRegex();

/**
 * Normal Inline Grammar
 */

inline$2.normal = merge$1$1({}, inline$2);

/**
 * Pedantic Inline Grammar
 */

inline$2.pedantic = merge$1$1({}, inline$2.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
  link: edit$1$1(/^!?\[(label)\]\((.*?)\)/)
    .replace('label', inline$2._label)
    .getRegex(),
  reflink: edit$1$1(/^!?\[(label)\]\s*\[([^\]]*)\]/)
    .replace('label', inline$2._label)
    .getRegex()
});

/**
 * GFM Inline Grammar
 */

inline$2.gfm = merge$1$1({}, inline$2.normal, {
  escape: edit$1$1(inline$2.escape).replace('])', '~|])').getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
  del: /^~+(?=\S)([\s\S]*?\S)~+/,
  text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
});

inline$2.gfm.url = edit$1$1(inline$2.gfm.url, 'i')
  .replace('email', inline$2.gfm._extended_email)
  .getRegex();
/**
 * GFM + Line Breaks Inline Grammar
 */

inline$2.breaks = merge$1$1({}, inline$2.gfm, {
  br: edit$1$1(inline$2.br).replace('{2,}', '*').getRegex(),
  text: edit$1$1(inline$2.gfm.text)
    .replace('\\b_', '\\b_| {2,}\\n')
    .replace(/\{2,\}/g, '*')
    .getRegex()
});

var rules$1 = {
  block: block$2,
  inline: inline$2
};

const { defaults: defaults$1$1 } = defaults$6;
const { block: block$1$1 } = rules$1;
const {
  rtrim: rtrim$1$1,
  splitCells: splitCells$1$1,
  escape: escape$1$1
} = helpers$1;

/**
 * Block Lexer
 */
var Lexer_1$1 = class Lexer {
  constructor(options) {
    this.tokens = [];
    this.tokens.links = Object.create(null);
    this.options = options || defaults$1$1;
    this.rules = block$1$1.normal;

    if (this.options.pedantic) {
      this.rules = block$1$1.pedantic;
    } else if (this.options.gfm) {
      this.rules = block$1$1.gfm;
    }
  }

  /**
   * Expose Block Rules
   */
  static get rules() {
    return block$1$1;
  }

  /**
   * Static Lex Method
   */
  static lex(src, options) {
    const lexer = new Lexer(options);
    return lexer.lex(src);
  };

  /**
   * Preprocessing
   */
  lex(src) {
    src = src
      .replace(/\r\n|\r/g, '\n')
      .replace(/\t/g, '    ');

    return this.token(src, true);
  };

  /**
   * Lexing
   */
  token(src, top) {
    src = src.replace(/^ +$/gm, '');
    let next,
      loose,
      cap,
      bull,
      b,
      item,
      listStart,
      listItems,
      t,
      space,
      i,
      tag,
      l,
      isordered,
      istask,
      ischecked;

    while (src) {
      // newline
      if (cap = this.rules.newline.exec(src)) {
        src = src.substring(cap[0].length);
        if (cap[0].length > 1) {
          this.tokens.push({
            type: 'space'
          });
        }
      }

      // code
      if (cap = this.rules.code.exec(src)) {
        const lastToken = this.tokens[this.tokens.length - 1];
        src = src.substring(cap[0].length);
        // An indented code block cannot interrupt a paragraph.
        if (lastToken && lastToken.type === 'paragraph') {
          lastToken.text += '\n' + cap[0].trimRight();
        } else {
          cap = cap[0].replace(/^ {4}/gm, '');
          this.tokens.push({
            type: 'code',
            codeBlockStyle: 'indented',
            text: !this.options.pedantic
              ? rtrim$1$1(cap, '\n')
              : cap
          });
        }
        continue;
      }

      // fences
      if (cap = this.rules.fences.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'code',
          lang: cap[2] ? cap[2].trim() : cap[2],
          text: cap[3] || ''
        });
        continue;
      }

      // heading
      if (cap = this.rules.heading.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'heading',
          depth: cap[1].length,
          text: cap[2]
        });
        continue;
      }

      // table no leading pipe (gfm)
      if (cap = this.rules.nptable.exec(src)) {
        item = {
          type: 'table',
          header: splitCells$1$1(cap[1].replace(/^ *| *\| *$/g, '')),
          align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
          cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
        };

        if (item.header.length === item.align.length) {
          src = src.substring(cap[0].length);

          for (i = 0; i < item.align.length; i++) {
            if (/^ *-+: *$/.test(item.align[i])) {
              item.align[i] = 'right';
            } else if (/^ *:-+: *$/.test(item.align[i])) {
              item.align[i] = 'center';
            } else if (/^ *:-+ *$/.test(item.align[i])) {
              item.align[i] = 'left';
            } else {
              item.align[i] = null;
            }
          }

          for (i = 0; i < item.cells.length; i++) {
            item.cells[i] = splitCells$1$1(item.cells[i], item.header.length);
          }

          this.tokens.push(item);

          continue;
        }
      }

      // hr
      if (cap = this.rules.hr.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'hr'
        });
        continue;
      }

      // blockquote
      if (cap = this.rules.blockquote.exec(src)) {
        src = src.substring(cap[0].length);

        this.tokens.push({
          type: 'blockquote_start'
        });

        cap = cap[0].replace(/^ *> ?/gm, '');

        // Pass `top` to keep the current
        // "toplevel" state. This is exactly
        // how markdown.pl works.
        this.token(cap, top);

        this.tokens.push({
          type: 'blockquote_end'
        });

        continue;
      }

      // list
      if (cap = this.rules.list.exec(src)) {
        src = src.substring(cap[0].length);
        bull = cap[2];
        isordered = bull.length > 1;

        listStart = {
          type: 'list_start',
          ordered: isordered,
          start: isordered ? +bull : '',
          loose: false
        };

        this.tokens.push(listStart);

        // Get each top-level item.
        cap = cap[0].match(this.rules.item);

        listItems = [];
        next = false;
        l = cap.length;
        i = 0;

        for (; i < l; i++) {
          item = cap[i];

          // Remove the list item's bullet
          // so it is seen as the next token.
          space = item.length;
          item = item.replace(/^ *([*+-]|\d+\.) */, '');

          // Outdent whatever the
          // list item contains. Hacky.
          if (~item.indexOf('\n ')) {
            space -= item.length;
            item = !this.options.pedantic
              ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
              : item.replace(/^ {1,4}/gm, '');
          }

          // Determine whether the next list item belongs here.
          // Backpedal if it does not belong in this list.
          if (i !== l - 1) {
            b = block$1$1.bullet.exec(cap[i + 1])[0];
            if (bull.length > 1 ? b.length === 1
              : (b.length > 1 || (this.options.smartLists && b !== bull))) {
              src = cap.slice(i + 1).join('\n') + src;
              i = l - 1;
            }
          }

          // Determine whether item is loose or not.
          // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
          // for discount behavior.
          loose = next || /\n\n(?!\s*$)/.test(item);
          if (i !== l - 1) {
            next = item.charAt(item.length - 1) === '\n';
            if (!loose) loose = next;
          }

          if (loose) {
            listStart.loose = true;
          }

          // Check for task list items
          istask = /^\[[ xX]\] /.test(item);
          ischecked = undefined;
          if (istask) {
            ischecked = item[1] !== ' ';
            item = item.replace(/^\[[ xX]\] +/, '');
          }

          t = {
            type: 'list_item_start',
            task: istask,
            checked: ischecked,
            loose: loose
          };

          listItems.push(t);
          this.tokens.push(t);

          // Recurse.
          this.token(item, false);

          this.tokens.push({
            type: 'list_item_end'
          });
        }

        if (listStart.loose) {
          l = listItems.length;
          i = 0;
          for (; i < l; i++) {
            listItems[i].loose = true;
          }
        }

        this.tokens.push({
          type: 'list_end'
        });

        continue;
      }

      // html
      if (cap = this.rules.html.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: this.options.sanitize
            ? 'paragraph'
            : 'html',
          pre: !this.options.sanitizer
            && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
          text: this.options.sanitize ? (this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape$1$1(cap[0])) : cap[0]
        });
        continue;
      }

      // def
      if (top && (cap = this.rules.def.exec(src))) {
        src = src.substring(cap[0].length);
        if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
        tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
        if (!this.tokens.links[tag]) {
          this.tokens.links[tag] = {
            href: cap[2],
            title: cap[3]
          };
        }
        continue;
      }

      // table (gfm)
      if (cap = this.rules.table.exec(src)) {
        item = {
          type: 'table',
          header: splitCells$1$1(cap[1].replace(/^ *| *\| *$/g, '')),
          align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
          cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
        };

        if (item.header.length === item.align.length) {
          src = src.substring(cap[0].length);

          for (i = 0; i < item.align.length; i++) {
            if (/^ *-+: *$/.test(item.align[i])) {
              item.align[i] = 'right';
            } else if (/^ *:-+: *$/.test(item.align[i])) {
              item.align[i] = 'center';
            } else if (/^ *:-+ *$/.test(item.align[i])) {
              item.align[i] = 'left';
            } else {
              item.align[i] = null;
            }
          }

          for (i = 0; i < item.cells.length; i++) {
            item.cells[i] = splitCells$1$1(
              item.cells[i].replace(/^ *\| *| *\| *$/g, ''),
              item.header.length);
          }

          this.tokens.push(item);

          continue;
        }
      }

      // lheading
      if (cap = this.rules.lheading.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'heading',
          depth: cap[2].charAt(0) === '=' ? 1 : 2,
          text: cap[1]
        });
        continue;
      }

      // top-level paragraph
      if (top && (cap = this.rules.paragraph.exec(src))) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'paragraph',
          text: cap[1].charAt(cap[1].length - 1) === '\n'
            ? cap[1].slice(0, -1)
            : cap[1]
        });
        continue;
      }

      // text
      if (cap = this.rules.text.exec(src)) {
        // Top-level should never reach here.
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'text',
          text: cap[0]
        });
        continue;
      }

      if (src) {
        throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
      }
    }

    return this.tokens;
  };
};

const { defaults: defaults$2$1 } = defaults$6;
const {
  cleanUrl: cleanUrl$1$1,
  escape: escape$2$1
} = helpers$1;

/**
 * Renderer
 */
var Renderer_1$1 = class Renderer {
  constructor(options) {
    this.options = options || defaults$2$1;
  }

  code(code, infostring, escaped) {
    const lang = (infostring || '').match(/\S*/)[0];
    if (this.options.highlight) {
      const out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }

    if (!lang) {
      return '<pre><code>'
        + (escaped ? code : escape$2$1(code, true))
        + '</code></pre>';
    }

    return '<pre><code class="'
      + this.options.langPrefix
      + escape$2$1(lang, true)
      + '">'
      + (escaped ? code : escape$2$1(code, true))
      + '</code></pre>\n';
  };

  blockquote(quote) {
    return '<blockquote>\n' + quote + '</blockquote>\n';
  };

  html(html) {
    return html;
  };

  heading(text, level, raw, slugger) {
    if (this.options.headerIds) {
      return '<h'
        + level
        + ' id="'
        + this.options.headerPrefix
        + slugger.slug(raw)
        + '">'
        + text
        + '</h'
        + level
        + '>\n';
    }
    // ignore IDs
    return '<h' + level + '>' + text + '</h' + level + '>\n';
  };

  hr() {
    return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
  };

  list(body, ordered, start) {
    const type = ordered ? 'ol' : 'ul',
      startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
    return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
  };

  listitem(text) {
    return '<li>' + text + '</li>\n';
  };

  checkbox(checked) {
    return '<input '
      + (checked ? 'checked="" ' : '')
      + 'disabled="" type="checkbox"'
      + (this.options.xhtml ? ' /' : '')
      + '> ';
  };

  paragraph(text) {
    return '<p>' + text + '</p>\n';
  };

  table(header, body) {
    if (body) body = '<tbody>' + body + '</tbody>';

    return '<table>\n'
      + '<thead>\n'
      + header
      + '</thead>\n'
      + body
      + '</table>\n';
  };

  tablerow(content) {
    return '<tr>\n' + content + '</tr>\n';
  };

  tablecell(content, flags) {
    const type = flags.header ? 'th' : 'td';
    const tag = flags.align
      ? '<' + type + ' align="' + flags.align + '">'
      : '<' + type + '>';
    return tag + content + '</' + type + '>\n';
  };

  // span level renderer
  strong(text) {
    return '<strong>' + text + '</strong>';
  };

  em(text) {
    return '<em>' + text + '</em>';
  };

  codespan(text) {
    return '<code>' + text + '</code>';
  };

  br() {
    return this.options.xhtml ? '<br/>' : '<br>';
  };

  del(text) {
    return '<del>' + text + '</del>';
  };

  link(href, title, text) {
    href = cleanUrl$1$1(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    let out = '<a href="' + escape$2$1(href) + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += '>' + text + '</a>';
    return out;
  };

  image(href, title, text) {
    href = cleanUrl$1$1(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }

    let out = '<img src="' + href + '" alt="' + text + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += this.options.xhtml ? '/>' : '>';
    return out;
  };

  text(text) {
    return text;
  };
};

/**
 * Slugger generates header id
 */
var Slugger_1$1 = class Slugger {
  constructor() {
    this.seen = {};
  }

  /**
   * Convert string to unique id
   */
  slug(value) {
    let slug = value
      .toLowerCase()
      .trim()
      .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '')
      .replace(/\s/g, '-');

    if (this.seen.hasOwnProperty(slug)) {
      const originalSlug = slug;
      do {
        this.seen[originalSlug]++;
        slug = originalSlug + '-' + this.seen[originalSlug];
      } while (this.seen.hasOwnProperty(slug));
    }
    this.seen[slug] = 0;

    return slug;
  };
};

const { defaults: defaults$3$1 } = defaults$6;
const { inline: inline$1$1 } = rules$1;
const {
  findClosingBracket: findClosingBracket$1$1,
  escape: escape$3$1
} = helpers$1;

/**
 * Inline Lexer & Compiler
 */
var InlineLexer_1 = class InlineLexer {
  constructor(links, options) {
    this.options = options || defaults$3$1;
    this.links = links;
    this.rules = inline$1$1.normal;
    this.options.renderer = this.options.renderer || new Renderer_1$1();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;

    if (!this.links) {
      throw new Error('Tokens array requires a `links` property.');
    }

    if (this.options.pedantic) {
      this.rules = inline$1$1.pedantic;
    } else if (this.options.gfm) {
      if (this.options.breaks) {
        this.rules = inline$1$1.breaks;
      } else {
        this.rules = inline$1$1.gfm;
      }
    }
  }

  /**
   * Expose Inline Rules
   */
  static get rules() {
    return inline$1$1;
  }

  /**
   * Static Lexing/Compiling Method
   */
  static output(src, links, options) {
    const inline = new InlineLexer(links, options);
    return inline.output(src);
  }

  /**
   * Lexing/Compiling
   */
  output(src) {
    let out = '',
      link,
      text,
      href,
      title,
      cap,
      prevCapZero;

    while (src) {
      // escape
      if (cap = this.rules.escape.exec(src)) {
        src = src.substring(cap[0].length);
        out += escape$3$1(cap[1]);
        continue;
      }

      // tag
      if (cap = this.rules.tag.exec(src)) {
        if (!this.inLink && /^<a /i.test(cap[0])) {
          this.inLink = true;
        } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
          this.inLink = false;
        }
        if (!this.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          this.inRawBlock = true;
        } else if (this.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          this.inRawBlock = false;
        }

        src = src.substring(cap[0].length);
        out += this.options.sanitize
          ? this.options.sanitizer
            ? this.options.sanitizer(cap[0])
            : escape$3$1(cap[0])
          : cap[0];
        continue;
      }

      // link
      if (cap = this.rules.link.exec(src)) {
        const lastParenIndex = findClosingBracket$1$1(cap[2], '()');
        if (lastParenIndex > -1) {
          const start = cap[0].indexOf('!') === 0 ? 5 : 4;
          const linkLen = start + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = '';
        }
        src = src.substring(cap[0].length);
        this.inLink = true;
        href = cap[2];
        if (this.options.pedantic) {
          link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

          if (link) {
            href = link[1];
            title = link[3];
          } else {
            title = '';
          }
        } else {
          title = cap[3] ? cap[3].slice(1, -1) : '';
        }
        href = href.trim().replace(/^<([\s\S]*)>$/, '$1');
        out += this.outputLink(cap, {
          href: InlineLexer.escapes(href),
          title: InlineLexer.escapes(title)
        });
        this.inLink = false;
        continue;
      }

      // reflink, nolink
      if ((cap = this.rules.reflink.exec(src))
          || (cap = this.rules.nolink.exec(src))) {
        src = src.substring(cap[0].length);
        link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
        link = this.links[link.toLowerCase()];
        if (!link || !link.href) {
          out += cap[0].charAt(0);
          src = cap[0].substring(1) + src;
          continue;
        }
        this.inLink = true;
        out += this.outputLink(cap, link);
        this.inLink = false;
        continue;
      }

      // strong
      if (cap = this.rules.strong.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.strong(this.output(cap[4] || cap[3] || cap[2] || cap[1]));
        continue;
      }

      // em
      if (cap = this.rules.em.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.em(this.output(cap[6] || cap[5] || cap[4] || cap[3] || cap[2] || cap[1]));
        continue;
      }

      // code
      if (cap = this.rules.code.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.codespan(escape$3$1(cap[2].trim(), true));
        continue;
      }

      // br
      if (cap = this.rules.br.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.br();
        continue;
      }

      // del (gfm)
      if (cap = this.rules.del.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.del(this.output(cap[1]));
        continue;
      }

      // autolink
      if (cap = this.rules.autolink.exec(src)) {
        src = src.substring(cap[0].length);
        if (cap[2] === '@') {
          text = escape$3$1(this.mangle(cap[1]));
          href = 'mailto:' + text;
        } else {
          text = escape$3$1(cap[1]);
          href = text;
        }
        out += this.renderer.link(href, null, text);
        continue;
      }

      // url (gfm)
      if (!this.inLink && (cap = this.rules.url.exec(src))) {
        if (cap[2] === '@') {
          text = escape$3$1(cap[0]);
          href = 'mailto:' + text;
        } else {
          // do extended autolink path validation
          do {
            prevCapZero = cap[0];
            cap[0] = this.rules._backpedal.exec(cap[0])[0];
          } while (prevCapZero !== cap[0]);
          text = escape$3$1(cap[0]);
          if (cap[1] === 'www.') {
            href = 'http://' + text;
          } else {
            href = text;
          }
        }
        src = src.substring(cap[0].length);
        out += this.renderer.link(href, null, text);
        continue;
      }

      // text
      if (cap = this.rules.text.exec(src)) {
        src = src.substring(cap[0].length);
        if (this.inRawBlock) {
          out += this.renderer.text(this.options.sanitize ? (this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape$3$1(cap[0])) : cap[0]);
        } else {
          out += this.renderer.text(escape$3$1(this.smartypants(cap[0])));
        }
        continue;
      }

      if (src) {
        throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
      }
    }

    return out;
  }

  static escapes(text) {
    return text ? text.replace(InlineLexer.rules._escapes, '$1') : text;
  }

  /**
   * Compile Link
   */
  outputLink(cap, link) {
    const href = link.href,
      title = link.title ? escape$3$1(link.title) : null;

    return cap[0].charAt(0) !== '!'
      ? this.renderer.link(href, title, this.output(cap[1]))
      : this.renderer.image(href, title, escape$3$1(cap[1]));
  }

  /**
   * Smartypants Transformations
   */
  smartypants(text) {
    if (!this.options.smartypants) return text;
    return text
      // em-dashes
      .replace(/---/g, '\u2014')
      // en-dashes
      .replace(/--/g, '\u2013')
      // opening singles
      .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
      // closing singles & apostrophes
      .replace(/'/g, '\u2019')
      // opening doubles
      .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
      // closing doubles
      .replace(/"/g, '\u201d')
      // ellipses
      .replace(/\.{3}/g, '\u2026');
  }

  /**
   * Mangle Links
   */
  mangle(text) {
    if (!this.options.mangle) return text;
    const l = text.length;
    let out = '',
      i = 0,
      ch;

    for (; i < l; i++) {
      ch = text.charCodeAt(i);
      if (Math.random() > 0.5) {
        ch = 'x' + ch.toString(16);
      }
      out += '&#' + ch + ';';
    }

    return out;
  }
};

/**
 * TextRenderer
 * returns only the textual part of the token
 */
var TextRenderer_1$1 = class TextRenderer {
  // no need for block level renderers
  strong(text) {
    return text;
  }

  em(text) {
    return text;
  }

  codespan(text) {
    return text;
  }

  del(text) {
    return text;
  }

  text(text) {
    return text;
  }

  link(href, title, text) {
    return '' + text;
  }

  image(href, title, text) {
    return '' + text;
  }

  br() {
    return '';
  }
};

const { defaults: defaults$4$1 } = defaults$6;
const {
  merge: merge$2$1,
  unescape: unescape$1$1
} = helpers$1;

/**
 * Parsing & Compiling
 */
var Parser_1$1 = class Parser {
  constructor(options) {
    this.tokens = [];
    this.token = null;
    this.options = options || defaults$4$1;
    this.options.renderer = this.options.renderer || new Renderer_1$1();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.slugger = new Slugger_1$1();
  }

  /**
   * Static Parse Method
   */
  static parse(tokens, options) {
    const parser = new Parser(options);
    return parser.parse(tokens);
  };

  /**
   * Parse Loop
   */
  parse(tokens) {
    this.inline = new InlineLexer_1(tokens.links, this.options);
    // use an InlineLexer with a TextRenderer to extract pure text
    this.inlineText = new InlineLexer_1(
      tokens.links,
      merge$2$1({}, this.options, { renderer: new TextRenderer_1$1() })
    );
    this.tokens = tokens.reverse();

    let out = '';
    while (this.next()) {
      out += this.tok();
    }

    return out;
  };

  /**
   * Next Token
   */
  next() {
    this.token = this.tokens.pop();
    return this.token;
  };

  /**
   * Preview Next Token
   */
  peek() {
    return this.tokens[this.tokens.length - 1] || 0;
  };

  /**
   * Parse Text Tokens
   */
  parseText() {
    let body = this.token.text;

    while (this.peek().type === 'text') {
      body += '\n' + this.next().text;
    }

    return this.inline.output(body);
  };

  /**
   * Parse Current Token
   */
  tok() {
    let body = '';
    switch (this.token.type) {
      case 'space': {
        return '';
      }
      case 'hr': {
        return this.renderer.hr();
      }
      case 'heading': {
        return this.renderer.heading(
          this.inline.output(this.token.text),
          this.token.depth,
          unescape$1$1(this.inlineText.output(this.token.text)),
          this.slugger);
      }
      case 'code': {
        return this.renderer.code(this.token.text,
          this.token.lang,
          this.token.escaped);
      }
      case 'table': {
        let header = '',
          i,
          row,
          cell,
          j;

        // header
        cell = '';
        for (i = 0; i < this.token.header.length; i++) {
          cell += this.renderer.tablecell(
            this.inline.output(this.token.header[i]),
            { header: true, align: this.token.align[i] }
          );
        }
        header += this.renderer.tablerow(cell);

        for (i = 0; i < this.token.cells.length; i++) {
          row = this.token.cells[i];

          cell = '';
          for (j = 0; j < row.length; j++) {
            cell += this.renderer.tablecell(
              this.inline.output(row[j]),
              { header: false, align: this.token.align[j] }
            );
          }

          body += this.renderer.tablerow(cell);
        }
        return this.renderer.table(header, body);
      }
      case 'blockquote_start': {
        body = '';

        while (this.next().type !== 'blockquote_end') {
          body += this.tok();
        }

        return this.renderer.blockquote(body);
      }
      case 'list_start': {
        body = '';
        const ordered = this.token.ordered,
          start = this.token.start;

        while (this.next().type !== 'list_end') {
          body += this.tok();
        }

        return this.renderer.list(body, ordered, start);
      }
      case 'list_item_start': {
        body = '';
        const loose = this.token.loose;
        const checked = this.token.checked;
        const task = this.token.task;

        if (this.token.task) {
          if (loose) {
            if (this.peek().type === 'text') {
              const nextToken = this.peek();
              nextToken.text = this.renderer.checkbox(checked) + ' ' + nextToken.text;
            } else {
              this.tokens.push({
                type: 'text',
                text: this.renderer.checkbox(checked)
              });
            }
          } else {
            body += this.renderer.checkbox(checked);
          }
        }

        while (this.next().type !== 'list_item_end') {
          body += !loose && this.token.type === 'text'
            ? this.parseText()
            : this.tok();
        }
        return this.renderer.listitem(body, task, checked);
      }
      case 'html': {
        // TODO parse inline content if parameter markdown=1
        return this.renderer.html(this.token.text);
      }
      case 'paragraph': {
        return this.renderer.paragraph(this.inline.output(this.token.text));
      }
      case 'text': {
        return this.renderer.paragraph(this.parseText());
      }
      default: {
        const errMsg = 'Token with "' + this.token.type + '" type was not found.';
        if (this.options.silent) {
          console.log(errMsg);
        } else {
          throw new Error(errMsg);
        }
      }
    }
  };
};

const {
  merge: merge$3$1,
  checkSanitizeDeprecation: checkSanitizeDeprecation$1$1,
  escape: escape$4$1
} = helpers$1;
const {
  getDefaults: getDefaults$1,
  changeDefaults: changeDefaults$1,
  defaults: defaults$5$1
} = defaults$6;

/**
 * Marked
 */
function marked$1(src, opt, callback) {
  // throw error in case of non string input
  if (typeof src === 'undefined' || src === null) {
    throw new Error('marked(): input parameter is undefined or null');
  }
  if (typeof src !== 'string') {
    throw new Error('marked(): input parameter is of type '
      + Object.prototype.toString.call(src) + ', string expected');
  }

  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge$3$1({}, marked$1.defaults, opt || {});
    checkSanitizeDeprecation$1$1(opt);
    const highlight = opt.highlight;
    let tokens,
      pending,
      i = 0;

    try {
      tokens = Lexer_1$1.lex(src, opt);
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    const done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      let out;

      try {
        out = Parser_1$1.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    opt = merge$3$1({}, marked$1.defaults, opt || {});
    checkSanitizeDeprecation$1$1(opt);
    return Parser_1$1.parse(Lexer_1$1.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/markedjs/marked.';
    if ((opt || marked$1.defaults).silent) {
      return '<p>An error occurred:</p><pre>'
        + escape$4$1(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked$1.options =
marked$1.setOptions = function(opt) {
  merge$3$1(marked$1.defaults, opt);
  changeDefaults$1(marked$1.defaults);
  return marked$1;
};

marked$1.getDefaults = getDefaults$1;

marked$1.defaults = defaults$5$1;

/**
 * Expose
 */

marked$1.Parser = Parser_1$1;
marked$1.parser = Parser_1$1.parse;

marked$1.Renderer = Renderer_1$1;
marked$1.TextRenderer = TextRenderer_1$1;

marked$1.Lexer = Lexer_1$1;
marked$1.lexer = Lexer_1$1.lex;

marked$1.InlineLexer = InlineLexer_1;
marked$1.inlineLexer = InlineLexer_1.output;

marked$1.Slugger = Slugger_1$1;

marked$1.parse = marked$1;

var marked_1$1 = marked$1;

function _toConsumableArray$1$1(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var hasOwnProperty$1 = Object.hasOwnProperty;
var setPrototypeOf$1 = Object.setPrototypeOf;
var isFrozen$1 = Object.isFrozen;
var objectKeys$1 = Object.keys;
var freeze$1 = Object.freeze;
var seal$1 = Object.seal; // eslint-disable-line import/no-mutable-exports

var _ref$1 = typeof Reflect !== 'undefined' && Reflect;
var apply$1 = _ref$1.apply;
var construct$1 = _ref$1.construct;

if (!apply$1) {
  apply$1 = function apply(fun, thisValue, args) {
    return fun.apply(thisValue, args);
  };
}

if (!freeze$1) {
  freeze$1 = function freeze(x) {
    return x;
  };
}

if (!seal$1) {
  seal$1 = function seal(x) {
    return x;
  };
}

if (!construct$1) {
  construct$1 = function construct(Func, args) {
    return new (Function.prototype.bind.apply(Func, [null].concat(_toConsumableArray$1$1(args))))();
  };
}

var arrayForEach$1 = unapply$1(Array.prototype.forEach);
var arrayIndexOf$1 = unapply$1(Array.prototype.indexOf);
var arrayJoin$1 = unapply$1(Array.prototype.join);
var arrayPop$1 = unapply$1(Array.prototype.pop);
var arrayPush$1 = unapply$1(Array.prototype.push);
var arraySlice$1 = unapply$1(Array.prototype.slice);

var stringToLowerCase$1 = unapply$1(String.prototype.toLowerCase);
var stringMatch$1 = unapply$1(String.prototype.match);
var stringReplace$1 = unapply$1(String.prototype.replace);
var stringIndexOf$1 = unapply$1(String.prototype.indexOf);
var stringTrim$1 = unapply$1(String.prototype.trim);

var regExpTest$1 = unapply$1(RegExp.prototype.test);
var regExpCreate$1 = unconstruct$1(RegExp);

var typeErrorCreate$1 = unconstruct$1(TypeError);

function unapply$1(func) {
  return function (thisArg) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return apply$1(func, thisArg, args);
  };
}

function unconstruct$1(func) {
  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return construct$1(func, args);
  };
}

/* Add properties to a lookup table */
function addToSet$1(set, array) {
  if (setPrototypeOf$1) {
    // Make 'in' and truthy checks like Boolean(set.constructor)
    // independent of any properties defined on Object.prototype.
    // Prevent prototype setters from intercepting set as a this value.
    setPrototypeOf$1(set, null);
  }

  var l = array.length;
  while (l--) {
    var element = array[l];
    if (typeof element === 'string') {
      var lcElement = stringToLowerCase$1(element);
      if (lcElement !== element) {
        // Config presets (e.g. tags.js, attrs.js) are immutable.
        if (!isFrozen$1(array)) {
          array[l] = lcElement;
        }

        element = lcElement;
      }
    }

    set[element] = true;
  }

  return set;
}

/* Shallow clone an object */
function clone$1(object) {
  var newObject = {};

  var property = void 0;
  for (property in object) {
    if (apply$1(hasOwnProperty$1, object, [property])) {
      newObject[property] = object[property];
    }
  }

  return newObject;
}

var html$2 = freeze$1(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']);

// SVG
var svg$2 = freeze$1(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'audio', 'canvas', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'video', 'view', 'vkern']);

var svgFilters$1 = freeze$1(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']);

var mathMl$2 = freeze$1(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover']);

var text$2 = freeze$1(['#text']);

var html$1$1 = freeze$1(['accept', 'action', 'align', 'alt', 'autocomplete', 'background', 'bgcolor', 'border', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'coords', 'crossorigin', 'datetime', 'default', 'dir', 'disabled', 'download', 'enctype', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'integrity', 'ismap', 'label', 'lang', 'list', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'name', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'pattern', 'placeholder', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'type', 'usemap', 'valign', 'value', 'width', 'xmlns']);

var svg$1$1 = freeze$1(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'specularconstant', 'specularexponent', 'spreadmethod', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'tabindex', 'targetx', 'targety', 'transform', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);

var mathMl$1$1 = freeze$1(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);

var xml$1 = freeze$1(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

var MUSTACHE_EXPR$1 = seal$1(/\{\{[\s\S]*|[\s\S]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode
var ERB_EXPR$1 = seal$1(/<%[\s\S]*|[\s\S]*%>/gm);
var DATA_ATTR$1 = seal$1(/^data-[\-\w.\u00B7-\uFFFF]/); // eslint-disable-line no-useless-escape
var ARIA_ATTR$1 = seal$1(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape
var IS_ALLOWED_URI$1 = seal$1(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
);
var IS_SCRIPT_OR_DATA$1 = seal$1(/^(?:\w+script|data):/i);
var ATTR_WHITESPACE$1 = seal$1(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205f\u3000]/g // eslint-disable-line no-control-regex
);

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray$2(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getGlobal$1 = function getGlobal() {
  return typeof window === 'undefined' ? null : window;
};

/**
 * Creates a no-op policy for internal use only.
 * Don't export this function outside this module!
 * @param {?TrustedTypePolicyFactory} trustedTypes The policy factory.
 * @param {Document} document The document object (to determine policy name suffix)
 * @return {?TrustedTypePolicy} The policy created (or null, if Trusted Types
 * are not supported).
 */
var _createTrustedTypesPolicy$1 = function _createTrustedTypesPolicy(trustedTypes, document) {
  if ((typeof trustedTypes === 'undefined' ? 'undefined' : _typeof$1(trustedTypes)) !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
    return null;
  }

  // Allow the callers to control the unique policy name
  // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
  // Policy creation with duplicate names throws in Trusted Types.
  var suffix = null;
  var ATTR_NAME = 'data-tt-policy-suffix';
  if (document.currentScript && document.currentScript.hasAttribute(ATTR_NAME)) {
    suffix = document.currentScript.getAttribute(ATTR_NAME);
  }

  var policyName = 'dompurify' + (suffix ? '#' + suffix : '');

  try {
    return trustedTypes.createPolicy(policyName, {
      createHTML: function createHTML(html$$1) {
        return html$$1;
      }
    });
  } catch (error) {
    // Policy creation failed (most likely another DOMPurify script has
    // already run). Skip creating the policy, as this will only cause errors
    // if TT are enforced.
    console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
    return null;
  }
};

function createDOMPurify$1() {
  var window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal$1();

  var DOMPurify = function DOMPurify(root) {
    return createDOMPurify$1(root);
  };

  /**
   * Version label, exposed for easier checks
   * if DOMPurify is up to date or not
   */
  DOMPurify.version = '2.0.8';

  /**
   * Array of elements that DOMPurify removed during sanitation.
   * Empty if nothing was removed.
   */
  DOMPurify.removed = [];

  if (!window || !window.document || window.document.nodeType !== 9) {
    // Not running in a browser, provide a factory function
    // so that you can pass your own Window
    DOMPurify.isSupported = false;

    return DOMPurify;
  }

  var originalDocument = window.document;
  var useDOMParser = false;
  var removeTitle = false;

  var document = window.document;
  var DocumentFragment = window.DocumentFragment,
      HTMLTemplateElement = window.HTMLTemplateElement,
      Node = window.Node,
      NodeFilter = window.NodeFilter,
      _window$NamedNodeMap = window.NamedNodeMap,
      NamedNodeMap = _window$NamedNodeMap === undefined ? window.NamedNodeMap || window.MozNamedAttrMap : _window$NamedNodeMap,
      Text = window.Text,
      Comment = window.Comment,
      DOMParser = window.DOMParser,
      trustedTypes = window.trustedTypes;

  // As per issue #47, the web-components registry is inherited by a
  // new document created via createHTMLDocument. As per the spec
  // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
  // a new empty registry is used when creating a template contents owner
  // document, so we use that as our parent document to ensure nothing
  // is inherited.

  if (typeof HTMLTemplateElement === 'function') {
    var template = document.createElement('template');
    if (template.content && template.content.ownerDocument) {
      document = template.content.ownerDocument;
    }
  }

  var trustedTypesPolicy = _createTrustedTypesPolicy$1(trustedTypes, originalDocument);
  var emptyHTML = trustedTypesPolicy ? trustedTypesPolicy.createHTML('') : '';

  var _document = document,
      implementation = _document.implementation,
      createNodeIterator = _document.createNodeIterator,
      getElementsByTagName = _document.getElementsByTagName,
      createDocumentFragment = _document.createDocumentFragment;
  var importNode = originalDocument.importNode;


  var hooks = {};

  /**
   * Expose whether this browser supports running the full DOMPurify.
   */
  DOMPurify.isSupported = implementation && typeof implementation.createHTMLDocument !== 'undefined' && document.documentMode !== 9;

  var MUSTACHE_EXPR$$1 = MUSTACHE_EXPR$1,
      ERB_EXPR$$1 = ERB_EXPR$1,
      DATA_ATTR$$1 = DATA_ATTR$1,
      ARIA_ATTR$$1 = ARIA_ATTR$1,
      IS_SCRIPT_OR_DATA$$1 = IS_SCRIPT_OR_DATA$1,
      ATTR_WHITESPACE$$1 = ATTR_WHITESPACE$1;
  var IS_ALLOWED_URI$$1 = IS_ALLOWED_URI$1;

  /**
   * We consider the elements and attributes below to be safe. Ideally
   * don't add any new ones but feel free to remove unwanted ones.
   */

  /* allowed element names */

  var ALLOWED_TAGS = null;
  var DEFAULT_ALLOWED_TAGS = addToSet$1({}, [].concat(_toConsumableArray$2(html$2), _toConsumableArray$2(svg$2), _toConsumableArray$2(svgFilters$1), _toConsumableArray$2(mathMl$2), _toConsumableArray$2(text$2)));

  /* Allowed attribute names */
  var ALLOWED_ATTR = null;
  var DEFAULT_ALLOWED_ATTR = addToSet$1({}, [].concat(_toConsumableArray$2(html$1$1), _toConsumableArray$2(svg$1$1), _toConsumableArray$2(mathMl$1$1), _toConsumableArray$2(xml$1)));

  /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */
  var FORBID_TAGS = null;

  /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */
  var FORBID_ATTR = null;

  /* Decide if ARIA attributes are okay */
  var ALLOW_ARIA_ATTR = true;

  /* Decide if custom data attributes are okay */
  var ALLOW_DATA_ATTR = true;

  /* Decide if unknown protocols are okay */
  var ALLOW_UNKNOWN_PROTOCOLS = false;

  /* Output should be safe for jQuery's $() factory? */
  var SAFE_FOR_JQUERY = false;

  /* Output should be safe for common template engines.
   * This means, DOMPurify removes data attributes, mustaches and ERB
   */
  var SAFE_FOR_TEMPLATES = false;

  /* Decide if document with <html>... should be returned */
  var WHOLE_DOCUMENT = false;

  /* Track whether config is already set on this instance of DOMPurify. */
  var SET_CONFIG = false;

  /* Decide if all elements (e.g. style, script) must be children of
   * document.body. By default, browsers might move them to document.head */
  var FORCE_BODY = false;

  /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
   * string (or a TrustedHTML object if Trusted Types are supported).
   * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
   */
  var RETURN_DOM = false;

  /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
   * string  (or a TrustedHTML object if Trusted Types are supported) */
  var RETURN_DOM_FRAGMENT = false;

  /* If `RETURN_DOM` or `RETURN_DOM_FRAGMENT` is enabled, decide if the returned DOM
   * `Node` is imported into the current `Document`. If this flag is not enabled the
   * `Node` will belong (its ownerDocument) to a fresh `HTMLDocument`, created by
   * DOMPurify. */
  var RETURN_DOM_IMPORT = false;

  /* Try to return a Trusted Type object instead of a string, retrun a string in
   * case Trusted Types are not supported  */
  var RETURN_TRUSTED_TYPE = false;

  /* Output should be free from DOM clobbering attacks? */
  var SANITIZE_DOM = true;

  /* Keep element content when removing element? */
  var KEEP_CONTENT = true;

  /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
   * of importing it into a new Document and returning a sanitized copy */
  var IN_PLACE = false;

  /* Allow usage of profiles like html, svg and mathMl */
  var USE_PROFILES = {};

  /* Tags to ignore content of when KEEP_CONTENT is true */
  var FORBID_CONTENTS = addToSet$1({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);

  /* Tags that are safe for data: URIs */
  var DATA_URI_TAGS = addToSet$1({}, ['audio', 'video', 'img', 'source', 'image']);

  /* Attributes safe for values like "javascript:" */
  var URI_SAFE_ATTRIBUTES = null;
  var DEFAULT_URI_SAFE_ATTRIBUTES = addToSet$1({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'summary', 'title', 'value', 'style', 'xmlns']);

  /* Keep a reference to config to pass to hooks */
  var CONFIG = null;

  /* Ideally, do not touch anything below this line */
  /* ______________________________________________ */

  var formElement = document.createElement('form');

  /**
   * _parseConfig
   *
   * @param  {Object} cfg optional config literal
   */
  // eslint-disable-next-line complexity
  var _parseConfig = function _parseConfig(cfg) {
    if (CONFIG && CONFIG === cfg) {
      return;
    }

    /* Shield configuration object from tampering */
    if (!cfg || (typeof cfg === 'undefined' ? 'undefined' : _typeof$1(cfg)) !== 'object') {
      cfg = {};
    }

    /* Set configuration parameters */
    ALLOWED_TAGS = 'ALLOWED_TAGS' in cfg ? addToSet$1({}, cfg.ALLOWED_TAGS) : DEFAULT_ALLOWED_TAGS;
    ALLOWED_ATTR = 'ALLOWED_ATTR' in cfg ? addToSet$1({}, cfg.ALLOWED_ATTR) : DEFAULT_ALLOWED_ATTR;
    URI_SAFE_ATTRIBUTES = 'ADD_URI_SAFE_ATTR' in cfg ? addToSet$1(clone$1(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR) : DEFAULT_URI_SAFE_ATTRIBUTES;
    FORBID_TAGS = 'FORBID_TAGS' in cfg ? addToSet$1({}, cfg.FORBID_TAGS) : {};
    FORBID_ATTR = 'FORBID_ATTR' in cfg ? addToSet$1({}, cfg.FORBID_ATTR) : {};
    USE_PROFILES = 'USE_PROFILES' in cfg ? cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true
    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true
    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false
    SAFE_FOR_JQUERY = cfg.SAFE_FOR_JQUERY || false; // Default false
    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false
    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false
    RETURN_DOM = cfg.RETURN_DOM || false; // Default false
    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false
    RETURN_DOM_IMPORT = cfg.RETURN_DOM_IMPORT || false; // Default false
    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false
    FORCE_BODY = cfg.FORCE_BODY || false; // Default false
    SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true
    KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true
    IN_PLACE = cfg.IN_PLACE || false; // Default false
    IS_ALLOWED_URI$$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI$$1;
    if (SAFE_FOR_TEMPLATES) {
      ALLOW_DATA_ATTR = false;
    }

    if (RETURN_DOM_FRAGMENT) {
      RETURN_DOM = true;
    }

    /* Parse profile info */
    if (USE_PROFILES) {
      ALLOWED_TAGS = addToSet$1({}, [].concat(_toConsumableArray$2(text$2)));
      ALLOWED_ATTR = [];
      if (USE_PROFILES.html === true) {
        addToSet$1(ALLOWED_TAGS, html$2);
        addToSet$1(ALLOWED_ATTR, html$1$1);
      }

      if (USE_PROFILES.svg === true) {
        addToSet$1(ALLOWED_TAGS, svg$2);
        addToSet$1(ALLOWED_ATTR, svg$1$1);
        addToSet$1(ALLOWED_ATTR, xml$1);
      }

      if (USE_PROFILES.svgFilters === true) {
        addToSet$1(ALLOWED_TAGS, svgFilters$1);
        addToSet$1(ALLOWED_ATTR, svg$1$1);
        addToSet$1(ALLOWED_ATTR, xml$1);
      }

      if (USE_PROFILES.mathMl === true) {
        addToSet$1(ALLOWED_TAGS, mathMl$2);
        addToSet$1(ALLOWED_ATTR, mathMl$1$1);
        addToSet$1(ALLOWED_ATTR, xml$1);
      }
    }

    /* Merge configuration parameters */
    if (cfg.ADD_TAGS) {
      if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
        ALLOWED_TAGS = clone$1(ALLOWED_TAGS);
      }

      addToSet$1(ALLOWED_TAGS, cfg.ADD_TAGS);
    }

    if (cfg.ADD_ATTR) {
      if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
        ALLOWED_ATTR = clone$1(ALLOWED_ATTR);
      }

      addToSet$1(ALLOWED_ATTR, cfg.ADD_ATTR);
    }

    if (cfg.ADD_URI_SAFE_ATTR) {
      addToSet$1(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR);
    }

    /* Add #text in case KEEP_CONTENT is set to true */
    if (KEEP_CONTENT) {
      ALLOWED_TAGS['#text'] = true;
    }

    /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */
    if (WHOLE_DOCUMENT) {
      addToSet$1(ALLOWED_TAGS, ['html', 'head', 'body']);
    }

    /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */
    if (ALLOWED_TAGS.table) {
      addToSet$1(ALLOWED_TAGS, ['tbody']);
      delete FORBID_TAGS.tbody;
    }

    // Prevent further manipulation of configuration.
    // Not available in IE8, Safari 5, etc.
    if (freeze$1) {
      freeze$1(cfg);
    }

    CONFIG = cfg;
  };

  /**
   * _forceRemove
   *
   * @param  {Node} node a DOM node
   */
  var _forceRemove = function _forceRemove(node) {
    arrayPush$1(DOMPurify.removed, { element: node });
    try {
      node.parentNode.removeChild(node);
    } catch (error) {
      node.outerHTML = emptyHTML;
    }
  };

  /**
   * _removeAttribute
   *
   * @param  {String} name an Attribute name
   * @param  {Node} node a DOM node
   */
  var _removeAttribute = function _removeAttribute(name, node) {
    try {
      arrayPush$1(DOMPurify.removed, {
        attribute: node.getAttributeNode(name),
        from: node
      });
    } catch (error) {
      arrayPush$1(DOMPurify.removed, {
        attribute: null,
        from: node
      });
    }

    node.removeAttribute(name);
  };

  /**
   * _initDocument
   *
   * @param  {String} dirty a string of dirty markup
   * @return {Document} a DOM, filled with the dirty markup
   */
  var _initDocument = function _initDocument(dirty) {
    /* Create a HTML document */
    var doc = void 0;
    var leadingWhitespace = void 0;

    if (FORCE_BODY) {
      dirty = '<remove></remove>' + dirty;
    } else {
      /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
      var matches = stringMatch$1(dirty, /^[\s]+/);
      leadingWhitespace = matches && matches[0];
    }

    var dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
    /* Use DOMParser to workaround Firefox bug (see comment below) */
    if (useDOMParser) {
      try {
        doc = new DOMParser().parseFromString(dirtyPayload, 'text/html');
      } catch (error) {}
    }

    /* Remove title to fix a mXSS bug in older MS Edge */
    if (removeTitle) {
      addToSet$1(FORBID_TAGS, ['title']);
    }

    /* Otherwise use createHTMLDocument, because DOMParser is unsafe in
    Safari (see comment below) */
    if (!doc || !doc.documentElement) {
      doc = implementation.createHTMLDocument('');
      var _doc = doc,
          body = _doc.body;

      body.parentNode.removeChild(body.parentNode.firstElementChild);
      body.outerHTML = dirtyPayload;
    }

    if (dirty && leadingWhitespace) {
      doc.body.insertBefore(document.createTextNode(leadingWhitespace), doc.body.childNodes[0] || null);
    }

    /* Work on whole document or just its body */
    return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
  };

  // Firefox uses a different parser for innerHTML rather than
  // DOMParser (see https://bugzilla.mozilla.org/show_bug.cgi?id=1205631)
  // which means that you *must* use DOMParser, otherwise the output may
  // not be safe if used in a document.write context later.
  //
  // So we feature detect the Firefox bug and use the DOMParser if necessary.
  //
  // Chrome 77 and other versions ship an mXSS bug that caused a bypass to
  // happen. We now check for the mXSS trigger and react accordingly.
  if (DOMPurify.isSupported) {
    (function () {
      try {
        var doc = _initDocument('<svg><p><textarea><img src="</textarea><img src=x abc=1//">');
        if (doc.querySelector('svg img')) {
          useDOMParser = true;
        }
      } catch (error) {}
    })();

    (function () {
      try {
        var doc = _initDocument('<x/><title>&lt;/title&gt;&lt;img&gt;');
        if (regExpTest$1(/<\/title/, doc.querySelector('title').innerHTML)) {
          removeTitle = true;
        }
      } catch (error) {}
    })();
  }

  /**
   * _createIterator
   *
   * @param  {Document} root document/fragment to create iterator for
   * @return {Iterator} iterator instance
   */
  var _createIterator = function _createIterator(root) {
    return createNodeIterator.call(root.ownerDocument || root, root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT, function () {
      return NodeFilter.FILTER_ACCEPT;
    }, false);
  };

  /**
   * _isClobbered
   *
   * @param  {Node} elm element to check for clobbering attacks
   * @return {Boolean} true if clobbered, false if safe
   */
  var _isClobbered = function _isClobbered(elm) {
    if (elm instanceof Text || elm instanceof Comment) {
      return false;
    }

    if (typeof elm.nodeName !== 'string' || typeof elm.textContent !== 'string' || typeof elm.removeChild !== 'function' || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== 'function' || typeof elm.setAttribute !== 'function' || typeof elm.namespaceURI !== 'string') {
      return true;
    }

    return false;
  };

  /**
   * _isNode
   *
   * @param  {Node} obj object to check whether it's a DOM node
   * @return {Boolean} true is object is a DOM node
   */
  var _isNode = function _isNode(obj) {
    return (typeof Node === 'undefined' ? 'undefined' : _typeof$1(Node)) === 'object' ? obj instanceof Node : obj && (typeof obj === 'undefined' ? 'undefined' : _typeof$1(obj)) === 'object' && typeof obj.nodeType === 'number' && typeof obj.nodeName === 'string';
  };

  /**
   * _executeHook
   * Execute user configurable hooks
   *
   * @param  {String} entryPoint  Name of the hook's entry point
   * @param  {Node} currentNode node to work on with the hook
   * @param  {Object} data additional hook parameters
   */
  var _executeHook = function _executeHook(entryPoint, currentNode, data) {
    if (!hooks[entryPoint]) {
      return;
    }

    arrayForEach$1(hooks[entryPoint], function (hook) {
      hook.call(DOMPurify, currentNode, data, CONFIG);
    });
  };

  /**
   * _sanitizeElements
   *
   * @protect nodeName
   * @protect textContent
   * @protect removeChild
   *
   * @param   {Node} currentNode to check for permission to exist
   * @return  {Boolean} true if node was killed, false if left alive
   */
  // eslint-disable-next-line complexity
  var _sanitizeElements = function _sanitizeElements(currentNode) {
    var content = void 0;

    /* Execute a hook if present */
    _executeHook('beforeSanitizeElements', currentNode, null);

    /* Check if element is clobbered or can clobber */
    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }

    /* Now let's check the element's type and name */
    var tagName = stringToLowerCase$1(currentNode.nodeName);

    /* Execute a hook if present */
    _executeHook('uponSanitizeElement', currentNode, {
      tagName: tagName,
      allowedTags: ALLOWED_TAGS
    });

    /* Take care of an mXSS pattern using p, br inside svg, math */
    if ((tagName === 'svg' || tagName === 'math') && currentNode.querySelectorAll('p, br').length !== 0) {
      _forceRemove(currentNode);
      return true;
    }

    /* Remove element if anything forbids its presence */
    if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
      /* Keep content except for black-listed elements */
      if (KEEP_CONTENT && !FORBID_CONTENTS[tagName] && typeof currentNode.insertAdjacentHTML === 'function') {
        try {
          var htmlToInsert = currentNode.innerHTML;
          currentNode.insertAdjacentHTML('AfterEnd', trustedTypesPolicy ? trustedTypesPolicy.createHTML(htmlToInsert) : htmlToInsert);
        } catch (error) {}
      }

      _forceRemove(currentNode);
      return true;
    }

    /* Remove in case a noscript/noembed XSS is suspected */
    if (tagName === 'noscript' && regExpTest$1(/<\/noscript/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }

    if (tagName === 'noembed' && regExpTest$1(/<\/noembed/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }

    /* Convert markup to cover jQuery behavior */
    if (SAFE_FOR_JQUERY && !currentNode.firstElementChild && (!currentNode.content || !currentNode.content.firstElementChild) && regExpTest$1(/</g, currentNode.textContent)) {
      arrayPush$1(DOMPurify.removed, { element: currentNode.cloneNode() });
      if (currentNode.innerHTML) {
        currentNode.innerHTML = stringReplace$1(currentNode.innerHTML, /</g, '&lt;');
      } else {
        currentNode.innerHTML = stringReplace$1(currentNode.textContent, /</g, '&lt;');
      }
    }

    /* Sanitize element content to be template-safe */
    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
      /* Get the element's text content */
      content = currentNode.textContent;
      content = stringReplace$1(content, MUSTACHE_EXPR$$1, ' ');
      content = stringReplace$1(content, ERB_EXPR$$1, ' ');
      if (currentNode.textContent !== content) {
        arrayPush$1(DOMPurify.removed, { element: currentNode.cloneNode() });
        currentNode.textContent = content;
      }
    }

    /* Execute a hook if present */
    _executeHook('afterSanitizeElements', currentNode, null);

    return false;
  };

  /**
   * _isValidAttribute
   *
   * @param  {string} lcTag Lowercase tag name of containing element.
   * @param  {string} lcName Lowercase attribute name.
   * @param  {string} value Attribute value.
   * @return {Boolean} Returns true if `value` is valid, otherwise false.
   */
  // eslint-disable-next-line complexity
  var _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
    /* Make sure attribute cannot clobber */
    if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
      return false;
    }

    /* Allow valid data-* attributes: At least one character after "-"
        (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
        XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
        We don't need to check the value; it's always URI safe. */
    if (ALLOW_DATA_ATTR && regExpTest$1(DATA_ATTR$$1, lcName)) ; else if (ALLOW_ARIA_ATTR && regExpTest$1(ARIA_ATTR$$1, lcName)) ; else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
      return false;

      /* Check value is safe. First, is attr inert? If so, is safe */
    } else if (URI_SAFE_ATTRIBUTES[lcName]) ; else if (regExpTest$1(IS_ALLOWED_URI$$1, stringReplace$1(value, ATTR_WHITESPACE$$1, ''))) ; else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf$1(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ; else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest$1(IS_SCRIPT_OR_DATA$$1, stringReplace$1(value, ATTR_WHITESPACE$$1, ''))) ; else if (!value) ; else {
      return false;
    }

    return true;
  };

  /**
   * _sanitizeAttributes
   *
   * @protect attributes
   * @protect nodeName
   * @protect removeAttribute
   * @protect setAttribute
   *
   * @param  {Node} currentNode to sanitize
   */
  // eslint-disable-next-line complexity
  var _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
    var attr = void 0;
    var value = void 0;
    var lcName = void 0;
    var idAttr = void 0;
    var l = void 0;
    /* Execute a hook if present */
    _executeHook('beforeSanitizeAttributes', currentNode, null);

    var attributes = currentNode.attributes;

    /* Check if we have attributes; if not we might have a text node */

    if (!attributes) {
      return;
    }

    var hookEvent = {
      attrName: '',
      attrValue: '',
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR
    };
    l = attributes.length;

    /* Go backwards over all attributes; safely remove bad ones */
    while (l--) {
      attr = attributes[l];
      var _attr = attr,
          name = _attr.name,
          namespaceURI = _attr.namespaceURI;

      value = stringTrim$1(attr.value);
      lcName = stringToLowerCase$1(name);

      /* Execute a hook if present */
      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set
      _executeHook('uponSanitizeAttribute', currentNode, hookEvent);
      value = hookEvent.attrValue;
      /* Did the hooks approve of the attribute? */
      if (hookEvent.forceKeepAttr) {
        continue;
      }

      /* Remove attribute */
      // Safari (iOS + Mac), last tested v8.0.5, crashes if you try to
      // remove a "name" attribute from an <img> tag that has an "id"
      // attribute at the time.
      if (lcName === 'name' && currentNode.nodeName === 'IMG' && attributes.id) {
        idAttr = attributes.id;
        attributes = arraySlice$1(attributes, []);
        _removeAttribute('id', currentNode);
        _removeAttribute(name, currentNode);
        if (arrayIndexOf$1(attributes, idAttr) > l) {
          currentNode.setAttribute('id', idAttr.value);
        }
      } else if (
      // This works around a bug in Safari, where input[type=file]
      // cannot be dynamically set after type has been removed
      currentNode.nodeName === 'INPUT' && lcName === 'type' && value === 'file' && hookEvent.keepAttr && (ALLOWED_ATTR[lcName] || !FORBID_ATTR[lcName])) {
        continue;
      } else {
        // This avoids a crash in Safari v9.0 with double-ids.
        // The trick is to first set the id to be empty and then to
        // remove the attribute
        if (name === 'id') {
          currentNode.setAttribute(name, '');
        }

        _removeAttribute(name, currentNode);
      }

      /* Did the hooks approve of the attribute? */
      if (!hookEvent.keepAttr) {
        continue;
      }

      /* Work around a security issue in jQuery 3.0 */
      if (SAFE_FOR_JQUERY && regExpTest$1(/\/>/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }

      /* Take care of an mXSS pattern using namespace switches */
      if (regExpTest$1(/svg|math/i, currentNode.namespaceURI) && regExpTest$1(regExpCreate$1('</(' + arrayJoin$1(objectKeys$1(FORBID_CONTENTS), '|') + ')', 'i'), value)) {
        _removeAttribute(name, currentNode);
        continue;
      }

      /* Sanitize attribute content to be template-safe */
      if (SAFE_FOR_TEMPLATES) {
        value = stringReplace$1(value, MUSTACHE_EXPR$$1, ' ');
        value = stringReplace$1(value, ERB_EXPR$$1, ' ');
      }

      /* Is `value` valid for this attribute? */
      var lcTag = currentNode.nodeName.toLowerCase();
      if (!_isValidAttribute(lcTag, lcName, value)) {
        continue;
      }

      /* Handle invalid data-* attribute set by try-catching it */
      try {
        if (namespaceURI) {
          currentNode.setAttributeNS(namespaceURI, name, value);
        } else {
          /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
          currentNode.setAttribute(name, value);
        }

        arrayPop$1(DOMPurify.removed);
      } catch (error) {}
    }

    /* Execute a hook if present */
    _executeHook('afterSanitizeAttributes', currentNode, null);
  };

  /**
   * _sanitizeShadowDOM
   *
   * @param  {DocumentFragment} fragment to iterate over recursively
   */
  var _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
    var shadowNode = void 0;
    var shadowIterator = _createIterator(fragment);

    /* Execute a hook if present */
    _executeHook('beforeSanitizeShadowDOM', fragment, null);

    while (shadowNode = shadowIterator.nextNode()) {
      /* Execute a hook if present */
      _executeHook('uponSanitizeShadowNode', shadowNode, null);

      /* Sanitize tags and elements */
      if (_sanitizeElements(shadowNode)) {
        continue;
      }

      /* Deep shadow DOM detected */
      if (shadowNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(shadowNode.content);
      }

      /* Check attributes, sanitize if necessary */
      _sanitizeAttributes(shadowNode);
    }

    /* Execute a hook if present */
    _executeHook('afterSanitizeShadowDOM', fragment, null);
  };

  /**
   * Sanitize
   * Public method providing core sanitation functionality
   *
   * @param {String|Node} dirty string or DOM node
   * @param {Object} configuration object
   */
  // eslint-disable-next-line complexity
  DOMPurify.sanitize = function (dirty, cfg) {
    var body = void 0;
    var importedNode = void 0;
    var currentNode = void 0;
    var oldNode = void 0;
    var returnNode = void 0;
    /* Make sure we have a string to sanitize.
      DO NOT return early, as this will return the wrong type if
      the user has requested a DOM object rather than a string */
    if (!dirty) {
      dirty = '<!-->';
    }

    /* Stringify, in case dirty is an object */
    if (typeof dirty !== 'string' && !_isNode(dirty)) {
      // eslint-disable-next-line no-negated-condition
      if (typeof dirty.toString !== 'function') {
        throw typeErrorCreate$1('toString is not a function');
      } else {
        dirty = dirty.toString();
        if (typeof dirty !== 'string') {
          throw typeErrorCreate$1('dirty is not a string, aborting');
        }
      }
    }

    /* Check we can run. Otherwise fall back or ignore */
    if (!DOMPurify.isSupported) {
      if (_typeof$1(window.toStaticHTML) === 'object' || typeof window.toStaticHTML === 'function') {
        if (typeof dirty === 'string') {
          return window.toStaticHTML(dirty);
        }

        if (_isNode(dirty)) {
          return window.toStaticHTML(dirty.outerHTML);
        }
      }

      return dirty;
    }

    /* Assign config vars */
    if (!SET_CONFIG) {
      _parseConfig(cfg);
    }

    /* Clean up removed elements */
    DOMPurify.removed = [];

    /* Check if dirty is correctly typed for IN_PLACE */
    if (typeof dirty === 'string') {
      IN_PLACE = false;
    }

    if (IN_PLACE) ; else if (dirty instanceof Node) {
      /* If dirty is a DOM element, append to an empty document to avoid
         elements being stripped by the parser */
      body = _initDocument('<!-->');
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === 1 && importedNode.nodeName === 'BODY') {
        /* Node is already a body, use as is */
        body = importedNode;
      } else if (importedNode.nodeName === 'HTML') {
        body = importedNode;
      } else {
        // eslint-disable-next-line unicorn/prefer-node-append
        body.appendChild(importedNode);
      }
    } else {
      /* Exit directly if we have nothing to do */
      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && RETURN_TRUSTED_TYPE && dirty.indexOf('<') === -1) {
        return trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
      }

      /* Initialize the document to work on */
      body = _initDocument(dirty);

      /* Check we have a DOM node from the data */
      if (!body) {
        return RETURN_DOM ? null : emptyHTML;
      }
    }

    /* Remove first element node (ours) if FORCE_BODY is set */
    if (body && FORCE_BODY) {
      _forceRemove(body.firstChild);
    }

    /* Get node iterator */
    var nodeIterator = _createIterator(IN_PLACE ? dirty : body);

    /* Now start iterating over the created document */
    while (currentNode = nodeIterator.nextNode()) {
      /* Fix IE's strange behavior with manipulated textNodes #89 */
      if (currentNode.nodeType === 3 && currentNode === oldNode) {
        continue;
      }

      /* Sanitize tags and elements */
      if (_sanitizeElements(currentNode)) {
        continue;
      }

      /* Shadow DOM detected, sanitize it */
      if (currentNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(currentNode.content);
      }

      /* Check attributes, sanitize if necessary */
      _sanitizeAttributes(currentNode);

      oldNode = currentNode;
    }

    oldNode = null;

    /* If we sanitized `dirty` in-place, return it. */
    if (IN_PLACE) {
      return dirty;
    }

    /* Return sanitized string or DOM */
    if (RETURN_DOM) {
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);

        while (body.firstChild) {
          // eslint-disable-next-line unicorn/prefer-node-append
          returnNode.appendChild(body.firstChild);
        }
      } else {
        returnNode = body;
      }

      if (RETURN_DOM_IMPORT) {
        /* AdoptNode() is not used because internal state is not reset
               (e.g. the past names map of a HTMLFormElement), this is safe
               in theory but we would rather not risk another attack vector.
               The state that is cloned by importNode() is explicitly defined
               by the specs. */
        returnNode = importNode.call(originalDocument, returnNode, true);
      }

      return returnNode;
    }

    var serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;

    /* Sanitize final string template-safe */
    if (SAFE_FOR_TEMPLATES) {
      serializedHTML = stringReplace$1(serializedHTML, MUSTACHE_EXPR$$1, ' ');
      serializedHTML = stringReplace$1(serializedHTML, ERB_EXPR$$1, ' ');
    }

    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
  };

  /**
   * Public method to set the configuration once
   * setConfig
   *
   * @param {Object} cfg configuration object
   */
  DOMPurify.setConfig = function (cfg) {
    _parseConfig(cfg);
    SET_CONFIG = true;
  };

  /**
   * Public method to remove the configuration
   * clearConfig
   *
   */
  DOMPurify.clearConfig = function () {
    CONFIG = null;
    SET_CONFIG = false;
  };

  /**
   * Public method to check if an attribute value is valid.
   * Uses last set config, if any. Otherwise, uses config defaults.
   * isValidAttribute
   *
   * @param  {string} tag Tag name of containing element.
   * @param  {string} attr Attribute name.
   * @param  {string} value Attribute value.
   * @return {Boolean} Returns true if `value` is valid. Otherwise, returns false.
   */
  DOMPurify.isValidAttribute = function (tag, attr, value) {
    /* Initialize shared config vars if necessary. */
    if (!CONFIG) {
      _parseConfig({});
    }

    var lcTag = stringToLowerCase$1(tag);
    var lcName = stringToLowerCase$1(attr);
    return _isValidAttribute(lcTag, lcName, value);
  };

  /**
   * AddHook
   * Public method to add DOMPurify hooks
   *
   * @param {String} entryPoint entry point for the hook to add
   * @param {Function} hookFunction function to execute
   */
  DOMPurify.addHook = function (entryPoint, hookFunction) {
    if (typeof hookFunction !== 'function') {
      return;
    }

    hooks[entryPoint] = hooks[entryPoint] || [];
    arrayPush$1(hooks[entryPoint], hookFunction);
  };

  /**
   * RemoveHook
   * Public method to remove a DOMPurify hook at a given entryPoint
   * (pops it from the stack of hooks if more are present)
   *
   * @param {String} entryPoint entry point for the hook to remove
   */
  DOMPurify.removeHook = function (entryPoint) {
    if (hooks[entryPoint]) {
      arrayPop$1(hooks[entryPoint]);
    }
  };

  /**
   * RemoveHooks
   * Public method to remove all DOMPurify hooks at a given entryPoint
   *
   * @param  {String} entryPoint entry point for the hooks to remove
   */
  DOMPurify.removeHooks = function (entryPoint) {
    if (hooks[entryPoint]) {
      hooks[entryPoint] = [];
    }
  };

  /**
   * RemoveAllHooks
   * Public method to remove all DOMPurify hooks
   *
   */
  DOMPurify.removeAllHooks = function () {
    hooks = {};
  };

  return DOMPurify;
}

var purify$1 = createDOMPurify$1();

const parse$1 = (markdown) => {
    if (!markdown) {
        return html$3 `
      ${nothing}
    `;
    }
    return html$3 `
    ${unsafeHTML(purify$1.sanitize(marked_1$1(markdown)))}
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
        return html$3 `
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
        return html$3 `
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
        return html$3 `
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
    return html$3 `
    <div part="docs-item">
      <div part="docs-row">
        <div part="docs-column">
          <div part="docs-label">Name</div>
          <div part="docs-value" class="accent">${name}</div>
        </div>
        ${attribute === undefined
        ? nothing
        : html$3 `
              <div part="docs-column">
                <div part="docs-label">Attribute</div>
                <div part="docs-value">${attribute}</div>
              </div>
            `}
        ${valueType === undefined
        ? nothing
        : html$3 `
              <div part="docs-column" class="column-type">
                <div part="docs-label">Type</div>
                <div part="docs-value">
                  ${valueType}
                  ${value === undefined
            ? nothing
            : html$3 `
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
    return html$3 `
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
            ? html$3 `
          <div part="warning">
            The element &lt;${this.name}&gt; does not provide any documented
            API.
          </div>
        `
            : html$3 `
          <api-viewer-tabs>
            ${renderTab('Properties', properties.length, html$3 `
                ${properties.map(prop => {
                const { name, description, type, attribute } = prop;
                return renderItem(name, description, type, attribute, prop.default);
            })}
              `)}
            ${renderTab('Attributes', attributes.length, html$3 `
                ${attributes.map(({ name, description, type }) => renderItem(name, description, type))}
              `)}
            ${renderTab('Slots', slots.length, html$3 `
                ${slots.map(({ name, description }) => renderItem(name, description))}
              `)}
            ${renderTab('Events', events.length, html$3 `
                ${events.map(({ name, description }) => renderItem(name, description))}
              `)}
            ${renderTab('CSS Custom Properties', cssProps.length, html$3 `
                ${cssProps.map(({ name, description }) => renderItem(name, description))}
              `)}
            ${renderTab('CSS Shadow Parts', cssParts.length, html$3 `
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
    return html$3 `
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
        input = html$3 `
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
        input = html$3 `
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
        input = html$3 `
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
    return html$3 `
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
        return html$3 `
      <tr>
        <td>
          <label for="${id}" part="knob-label">${label}</label>
        </td>
        <td>${renderer(item, id)}</td>
      </tr>
    `;
    });
    return html$3 `
    <table>
      ${rows}
    </table>
  `;
};

function escape$5(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
var htmlRender = {
    text: function (chunk) { return escape$5(chunk); },
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
var defaults$7 = {
    classPrefix: 'hljs-',
    //tabReplace: undefined,
    useBr: false,
};
function init(render, options) {
    if (options === void 0) { options = {}; }
    return {
        render: render,
        options: __assign({}, defaults$7, options)
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
    return html$3 `
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
        return html$3 `
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
    return html$3 `
    ${log.map(e => {
        return html$3 `
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
        return html$3 `
      <button
        @click="${this._onClearClick}"
        ?hidden="${!log.length}"
        part="button"
      >
        Clear
      </button>
      ${cache(log.length
            ? renderEvents(log)
            : html$3 `
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
        return html$3 `
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
        return html$3 `
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
        return html$3 `
      ${until(this.renderDemoLayout(this.whenDefined), html$3 `
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
        return html$3 `
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
            return html$3 `
                  <option value="${idx}">${tag.name}</option>
                `;
        })}
            </select>
          </label>
        </nav>
      </header>
      ${cache(section === 'docs'
            ? html$3 `
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
            : html$3 `
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
        ? html$3 `
        <api-viewer-content
          .elements="${elements}"
          .section="${section}"
          .selected="${index >= 0 ? index : 0}"
        ></api-viewer-content>
      `
        : html$3 `
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
        return html$3 `
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

const github = html$3`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`;

const preignition = html$3 `
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
