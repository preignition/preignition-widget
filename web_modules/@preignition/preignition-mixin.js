export { d as DefaultValueMixin, a as DoNotSetUndefinedValue } from '../common/defaultValueMixin-cb2ff445.js';

const queryShadow = (selector, el) => {
  return el.renderRoot.querySelector(selector);
};

const selectMixin = (superclass) => class extends superclass {
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

    async relayTo(props, name) {
      if (!this[`__${name}`]) {
        this[`__${name}`] = this.queryShadow(`#${name}`);
        if (!this[`__${name}`]) {
          console.warn(`Failed to get ${name} from shadowDom!`);
          await this.updateComplete;
          return this.relayTo(props, name);
          // throw new Error(`Failed to get ${name} from shadowDom!`)
        }
      }
      props.forEach((value, key) => {
        if (this.shallRelayTo(key, name)) {
          this.log && console.log('Change', key);
          this[`__${name}`][key] = this[key];
        }
      });
    }
  };

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
      [...this.renderRoot.querySelectorAll('[id]')].forEach(node => {
        this.$[node.id] = node;
      });
      super.firstUpdated(props);
    }
  };
};

/**
 * Returns the event name for the given property.
 * @param  {string}                       name    property name
 * @param  {PropertyDeclaration} options property declaration
 * @return                                event name to fire
 */
function eventNameForProperty(name, { notify, attribute } = {}) {
    if (notify && typeof notify === 'string') {
        return notify;
    } else if (attribute && typeof attribute === 'string') {
        return `${attribute}-changed`;
    } else {
        return `${name.toLowerCase()}-changed`;
    }
  }
  
  // eslint-disable-next-line valid-jsdoc
  /**
  * Enables the nofity option for properties to fire change notification events
  *
  * @template TBase
  * @param {Constructor<TBase>} baseElement
  */
  const LitNotify = (baseElement) => class NotifyingElement extends baseElement {
    /**
     * check for changed properties with notify option and fire the events
     */
    update(changedProps) {
        super.update(changedProps);
  
        for (const prop of changedProps.keys()) {
            const declaration = this.constructor._classProperties.get(prop);
            if (!declaration || !declaration.notify) continue;
            const type = eventNameForProperty(prop, declaration);
            const value = this[prop];
            this.dispatchEvent(new CustomEvent(type, { detail: { value } }));
        }
    }
  };

export { CacheId, LitNotify, RelayTo, selectMixin as SelectMixin };
