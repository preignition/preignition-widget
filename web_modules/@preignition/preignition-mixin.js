import '../common/lit-html-75774733.js';
import { unsafeCSS } from '../lit-element.js';
import '../common/directive-5915da03.js';
import '../common/index-b9380d54.js';
import { s as select } from '../common/select-373efd49.js';
export { d as DefaultValueMixin, a as DoNotSetUndefinedValue } from '../common/defaultValueMixin-78ffeba1.js';

const selectShadow = (selector, el) => {
  return select(el.renderRoot.querySelector(selector));
};
const queryShadow = (selector, el) => {
  return el.renderRoot.querySelector(selector);
};

/**
 * applies style to a already registered custom element
 * @param  {String } css      css to apply
 * @param  {String} element   element name
 */
const cssTheme = (css, element) => {
  const cls = customElements.get(element);
  if (!cls) {
    throw new Error(`custom element for ${element} is not yet registered`)
  }
  cls._styles.push(unsafeCSS(css));
};

const selectMixin = (superclass) => class extends superclass {
  
  selectShadow(selector) {
    return selectShadow(selector, this);
  }
  
  queryShadow(selector) {
    return queryShadow(selector, this);
  }
};

// import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/**
 * RelayTo mixin, used to automatically relay properties to child components
 */

const RelayTo = superClass => {

  return class extends superClass {
    
    shallRelayTo() {
      this.log && console.warn(`shallPassTo method has to be overriden`);
      return false;
      
    }

    relayTo(props, name) {
      if (!this[`__${name}`]) {
        this[`__${name}`] = this.queryShadow(`#${name}`);
        if (!this[`__${name}`]) {
          throw new Error(`Failed to get ${name} from shadowDom!`)
        }
      }
      props.forEach((value, key) => {
        if (this.shallRelayTo(key, name)) {
          this.log && console.log('Change', key);
          this[`__${name}`][key] = this[key];
        }
      });
    }
  }

};

/**
 * Cache template nodes with an id so that we can call this.$.id
 */

const CacheId = superClass => {

  return class extends superClass {

    constructor() {
      super();
      this.$ = {};
    }

    // Note(cg): stores all ids under this.$
    firstUpdated(props) {
      super.firstUpdated(props);
      [...this.renderRoot.querySelectorAll('[id]')].forEach(node => {
        this.$[node.id] = node;
      });
    }
  }
};

export { CacheId, RelayTo, selectMixin as SelectMixin, cssTheme, selectShadow };
