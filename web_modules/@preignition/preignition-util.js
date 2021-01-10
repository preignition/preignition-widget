import { h as html, n as nothing, N as NodePart, A as AttributePart } from '../common/lit-html-f57783b7.js';
import '../lit-element.js';
import { d as directive } from '../common/directive-651fd9cf.js';
import { unsafeHTML } from '../lit-html/directives/unsafe-html.js';
import purify from '../dompurify.js';
import { m as marked_1 } from '../common/marked.esm-eb3fcce2.js';

var cfg = {
  ADD_ATTR: [
    'target',
    'width',
    'height',
    'videoid', /* lite-youtube */
    'playlabel', /* lite-youtube */
    'params', /* lite-youtube */
    'term', /* pwi-form-tooltip */
    'message', /* pwi-tooltip */
    'position', /* pwi-tooltip */
    'tipwidth', /* pwi-tooltip */
    ],
  ADD_TAGS: [
  'lite-youtube',
  'pwi-tooltip',
  'pwi-form-tooltip',
  'mwc-icon'
  ]
};

/**
 * safely parse markdown and render to lit-element template
 * @param  {String} markdown markdown string
 * @return {TemplateResult}          lit-element template result
 */
var parse = (markdown, config = cfg) => {
  if (!markdown) {
    return html`
      ${nothing}
    `;
  }

  return html`
    ${unsafeHTML(purify.sanitize(marked_1(markdown), config))}
  `;
};

/**
 * safely parse markdown and render to lit-element template
 * @param  {String} markdown markdown string
 * @return {TemplateResult}          lit-element template result
 */
var parseInline = (markdown, config = cfg) => {
  if (!markdown) {
    return html`
      ${nothing}
    `;
  }

  return html`
    ${unsafeHTML(purify.sanitize(marked_1.parseInline(markdown), config))}
  `;
};

var resizeTextarea = textarea => {
  textarea.style.height = 'inherit';

  // Get the computed styles for the element
  const computed = window.getComputedStyle(textarea);

  // Calculate the height
  var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
               + parseInt(computed.getPropertyValue('padding-top'), 10)
               + textarea.scrollHeight
               + parseInt(computed.getPropertyValue('padding-bottom'), 10)
               + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

  textarea.style.height = height + 'px';
};

var getter = db => {
  return async path => db.ref(path).once('value').then(snap => snap.val());
};

function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
}

/* global window */

var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = symbolObservablePonyfill(root);

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function.');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribelistener for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribelistener for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[result] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[result] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */

function isCrushed() {}

if ( typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}

/*
  get a redux store from app.getReduxStore()
  if not yet instantiated, sitll return a temp store.
  Thisis usefull when having mix exlements from 
  Polymer and litElement, where timing of  app store
  creation is not straightforward
 */

const INITIAL_STATE = {
  language: 'en'
};
let store;
// let store = {
//    dispatch: () => {console.info('dispatch dummy store')},
//    getState: () => {console.info('getState dummy store'); return INITIAL_STATE;},
//    subscribe: (fn) => {console.info('subscribt dummy store'); subscription.push(fn)}
// };

// Note(cg): only load redux moduls if not present globally
// This is to avoid loading it twice when Polymer Redux-mixin
// is loaded.


const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.language
      };
    default:
      return state;
  }
};


const getStore = () => {
  if (window.app && window.app.getReduxStore) {
    // console.info('ok, app using global redux store');
    return window.app.getReduxStore();
  }
  console.error('APP IS NOT USING GLOBAL STORE');

  if (!store) {
    store = createStore(
          reducer,
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        );
  }
  // if (!Redux) {
  //  import('redux')
  //     .then(module => {
  //       Redux = {
  //         createStore: module.createStore
  //       };
  //       // Note(cg): we try to get app.getReduxStore first.
  //       store = Redux.createStore(
  //         reducer,
  //         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  //       );
  //       subscription.forEach(fn => store.subscribe(fn));
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }
  return store;
};

// Note(cg): imported from https://github.com/albertopumar/lit-element-redux

var connect = (mapStateToProps, mapDispatchToProps) => UnconnectedComponent =>
  class extends UnconnectedComponent {
    static get properties() {
      // Declare all properties previously defined in 'mapStateToProps'
      // const componentStore = mapStateToProps(getStore().getState());

      // Note(cg): only need to have mapStateToProps keys. state is not 
      // necessary and might call store too early. 
      const componentStore = mapStateToProps({});
      return {...super.properties, ...Object.entries(componentStore).reduce((accumulator, [key]) => {
        return { ...accumulator, [key]: {} };
      }, {})};
    }

    constructor() {
      super();

      // Initialize previously defined variables in the component
      const componentStore = mapStateToProps(getStore().getState());
      Object.entries(componentStore).forEach(([key, value]) => {
        this[key] = value;
      });

      // Inject previously defined actions in the component

      // If 'mapDispatchToProps' is a function we will retrieve all the functions
      // calling it and passing the 'dispatch' function as the only argument
      if (typeof mapDispatchToProps === 'function') {
        const mapDispatchToPropsObject = mapDispatchToProps(getStore().dispatch);
        Object.entries(mapDispatchToPropsObject).forEach(([key, value]) => {
          this[key] = function(...args) {
            value(args);
          };
        });
      } else {
        Object.entries(mapDispatchToProps).forEach(([key, value]) => {
          // Check if the value is a HOF or a normal function
          this[key] =
            typeof value() === 'function'
              ? function(...args) {
                  value(args)(getStore().dispatch);
                }
              : function(...args) {
                  getStore().dispatch(value(args));
                };
        });
      }
    }

    connectedCallback() {
      if (super.connectedCallback) {
        super.connectedCallback();
      }

      // Subscribe to the store to listen changes and fires first 'stateChanged'
      this._storeUnsubscribe = getStore().subscribe(() => this.stateChanged());
      this.stateChanged();
    }

    disconnectedCallback() {
      // Unsubscribe from the store
      this._storeUnsubscribe();

      if (super.disconnectedCallback) {
        super.disconnectedCallback();
      }
    }

    // Update properties when store is updated
    stateChanged() {
      const componentStore = mapStateToProps(getStore().getState());
      Object.entries(componentStore).forEach(([key, value]) => {
        this[key] = value;
      });
    }
  };

const CLEANUP_PARTS_MS = 1000 * 60;
const LANG_CHANGED_EVENT = "langChanged";

/**
 * Interpolates the values into the string.
 * @param text
 * @param values
 * @param config
 */
function interpolate(text, values, config) {
    return Object.entries(extract(values || {})).reduce((text, [key, value]) => text.replace(new RegExp(`{{[  ]*${key}[  ]*}}`, `gm`), String(extract(value))), text);
}
/**
 * Returns a string based on a chain of keys using the dot notation.
 * @param key
 * @param config
 */
function lookup(key, config) {
    // Split the key in parts (example: hello.world)
    const parts = key.split(".");
    // Find the string by traversing through the strings matching the chain of keys
    let string = config.strings;
    // Shift through all of the parts of the key while matching with the strings.
    // Do not continue if the string is not defined or if we have traversed all of the key parts
    while (string != null && parts.length > 0) {
        string = string[parts.shift()];
    }
    // Make sure the string is in fact a string!
    return string != null ? string.toString() : null;
}
/**
 * Extracts either the value from the function or returns the value that was passed in.
 * @param obj
 */
function extract(obj) {
    return (typeof obj === "function") ? obj() : obj;
}

/**
 * Default configuration object.
 */
const defaultTranslateConfig = () => {
    return {
        loader: () => Promise.resolve({}),
        empty: key => `[${key}]`,
        lookup: lookup,
        interpolate: interpolate,
        translationCache: {}
    };
};
// The current configuration.
let translateConfig = defaultTranslateConfig();
/**
 * Registers a translation config.
 * @param config
 */
function registerTranslateConfig(config) {
    return (translateConfig = Object.assign(Object.assign({}, translateConfig), config));
}
/**
 * Dispatches a language changed event.
 * @param detail
 */
function dispatchLangChanged(detail) {
    window.dispatchEvent(new CustomEvent(LANG_CHANGED_EVENT, { detail }));
}
/**
 * Updates the configuration object with a new language and strings.
 * Then dispatches that the language has changed.
 * @param newLang
 * @param newStrings
 * @param config
 */
function updateLang(newLang, newStrings, config = translateConfig) {
    dispatchLangChanged({
        previousStrings: config.strings,
        previousLang: config.lang,
        lang: (config.lang = newLang),
        strings: (config.strings = newStrings)
    });
}
/**
 * Listens for changes in the language.
 * Returns a method for unsubscribing from the event.
 * @param callback
 * @param options
 */
function listenForLangChanged(callback, options) {
    const handler = (e) => callback(e.detail);
    window.addEventListener(LANG_CHANGED_EVENT, handler, options);
    return () => window.removeEventListener(LANG_CHANGED_EVENT, handler);
}
/**
 * Sets a new current language and dispatches a global language changed event.
 * @param lang
 * @param config
 */
async function use(lang, config = translateConfig) {
    // Load the translations and set the cache
    const strings = await config.loader(lang, config);
    config.translationCache = {};
    // Dispatch global language changed event while setting the new values
    updateLang(lang, strings, config);
}
/**
 * Translates a key and interpolates if values are defined.
 * Uses the current strings and translation cache to fetch the translation.
 * @param key (eg. "common.get_started")
 * @param values (eg. { count: 42 })
 * @param config
 */
function get(key, values, config = translateConfig) {
    // Either use the translation from the cache or get it and add it to the cache
    let translation = config.translationCache[key]
        || (config.translationCache[key] = config.lookup(key, config) || config.empty(key, config));
    // Extract the values
    values = values != null ? extract(values) : null;
    // Interpolate the values and return the translation
    return values != null ? config.interpolate(translation, values, config) : translation;
}

/** #################################################################################
 ** The purpose of this module is to provide an API to clean up the node parts cache.
 ** This is to avoid memory leaks from parts being added and removed to the template.
 ** This is necessary since lit-html currently do not provide a way of cleaning up after a directive.
 ** In the ideal world we would be able to cache the parts in a weakmap, however that makes
 ** us unable to loop over the map which is required for updating the translations when the lang changes.
 ** This module will be obsolete the day lit-html provides a way of cleaning up after a directive
 ** ##################################################################################

/**
 * Check whether the part is still connected / has been removed from the DOM.
 * @param part
 */
function isConnected(part) {
    if (part instanceof NodePart) {
        return part.startNode.isConnected;
    }
    else if (part instanceof AttributePart) {
        return part.committer.element.isConnected;
    }
    else {
        return part.element.isConnected;
    }
}
/**
 * Removes the disconnected parts from the cache.
 */
function removeDisconnectedParts(map) {
    for (const [part] of map) {
        if (!isConnected(part)) {
            map.delete(part);
        }
    }
}
/**
 * Invokes a callback when the browser is idle.
 * Fallback to setTimeout.
 * @param cb
 */
function whenIdle(cb) {
    "requestIdleCallback" in window ? window.requestIdleCallback(cb) : setTimeout(cb);
}
/**
 * Starts an interval that cleans up the part cache map each X ms.
 * @param map
 * @param ms
 */
function attachPartsGarbageCollector(map, ms) {
    setInterval(() => whenIdle(() => removeDisconnectedParts(map)), ms);
}

// Caches the parts and the translations.
// In the ideal world this would be a weakmap, but it is not possible to loop over weakmaps.
// This is the best solution until lit-html provides an API to clean up after directives.
const partCache = new Map();
/**
 * Listens for changes in the language and updates all of the cached parts if necessary
 */
function attachTranslateListener() {
    listenForLangChanged((e) => {
        for (const [part, cb] of partCache) {
            if (isConnected(part)) {
                updatePart(part, cb, e);
            }
        }
    });
}
attachTranslateListener();
attachPartsGarbageCollector(partCache, CLEANUP_PARTS_MS);
/**
 * Handles the translation.
 * @param part
 * @param cb
 * @param e
 */
function updatePart(part, cb, e) {
    // Grab the new value
    const newValue = cb(e);
    // Only set the value if it has changed
    if (part.value === newValue) {
        return;
    }
    // Set the new value
    part.setValue(newValue);
    part.commit();
}
/**
 * A lit directive that invokes the callback when the language changes.
 * @param key
 * @param values
 * @param listen
 */
const langChanged = directive((cb) => (part) => {
    partCache.set(part, cb);
    updatePart(part, cb);
});

/**
 * A lit directive that updates the translation when the language changes.
 * @param key
 * @param values
 * @param config
 */
const translate = (key, values, config) => langChanged(() => get(key, values, config));

/**
 * A lit directive that updates the translation and renders embedded HTML markup when the language changes.
 * @param key
 * @param values
 * @param config
 */
const translateUnsafeHTML = (key, values, config) => langChanged(() => unsafeHTML(get(key, values, config)));

const LANG = 'en';

const mapStateToProps = state => {
  return {
    language: state.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    set_language: ([lan]) => dispatch({ type: 'SET_LANGUAGE', language: lan }),
  };
};

let translateConfig$1;
registerTranslateConfig({
  // Note(cg): loader is injecting component-keyed additional objects 
  loader: async (lang, config) => {
    translateConfig$1 = config;
    // loading per component
    const strings = config.strings || {};
    config.strings = strings;
    config.loaders = config.loaders || {};
    config.needLoading = config.needLoading || {};
    config.currentLang = config.currentLang || {};
    return Promise.all(Object.keys(config.needLoading).map(async key => strings[key] = await config.loaders[key](lang, config)))
      .then(() => {
        return strings;
      });
  }
});
// Note(cg): we need to call use early as we need to inject `loaders`, `needLoading` ...
use(LANG);

/**
 * mixin enabling component-based translation
 * @param  {Class} baseElement base class
 * @param  {Object} locale      JSON object containing text for initial/defauld language
 * @return {Class}             extended class
 */
const EnableTranslation = (baseElement, locale, mapState, mapDispatch) => {

  const cls = class extends baseElement {

    static get properties() {
      return {

        ...super.properties,

        language: { type: String }
      };
    }

    static get locale() {
      return locale;
    }

    constructor() {
      super();
      // Note(cg): adding loader first time the class instantiated. .
      if (!translateConfig$1.strings[this.constructor.name]) {
        translateConfig$1.currentLang[this.constructor.name] = LANG;
        translateConfig$1.strings[this.constructor.name] = locale;
        translateConfig$1.loaders[this.constructor.name] = this.translationLoader();
      }
    }

    translationLoader() {
      const name = this.constructor.name;
      return async (lang, config) => {
        if (lang === LANG) {
          return locale;
        }
        // Note(cg): load localized resource on firebase.
        return await firebase.database().ref(`/appSettingsLocale/component/${lang}/${name}`).once('value')
          .then(snap => {
            delete translateConfig$1.needLoading[name];
            return snap.val();
          });
      };
    }

    updated(props) {
      if (props.has('language')) {
        const lang = translateConfig$1.currentLang[this.constructor.name];
        translateConfig$1.currentLang[this.constructor.name] = this.language;
        if (lang !== this.language) {
          translateConfig$1.needLoading[this.constructor.name] = true;
        }
        use(this.language);
      }
      super.updated(props);
    }

    translate(key, values) {
      return translate(`${this.constructor.name}.${key}`, values);
    }
    
    // Note(cg): avoid used getTranslate as it is not a directive
    // and will not react to language change in template.
    getTranslate(key, values) {
      return get(`${this.constructor.name}.${key}`, values);
    }

    translateUnsafeHTML(key, values) {
      return translateUnsafeHTML(`${this.constructor.name}.${key}`, values);
    }
  };
  return connect(
     mapState || mapStateToProps,
     mapDispatch || mapDispatchToProps
     // Object.assign({}, mapStateToProps, mapState),
     // Object.assign({}, mapDispatchToProps, mapDispatch)
    )(cls);
};

const mapStateToProps$1 = state => {
  return {
    token: state.token && state.token.string
  };
};

const mapDispatchToProps$1 = dispatch => {
  return {
    set_token: ([token]) => dispatch({ type: 'SET_TOKEN', token: token }),
  };
};


/**
 * mixin enabling
 *  <a href="href" download="download">
 *    <mwc-button @click=${this.checkDownload}>Download</mwc-button>
 *  </a>
 *
 * it will refresh the token when fetching href returen 401, with `auth/id-token-expired` or `auth/argument-error` code
 * 
 * @param  {Class} baseElement base class
 * @return {Class}             extended class
 */
const DownloadMixin = (baseElement, mapState, mapDispatch) => {

  const cls = class extends baseElement {

    checkDownload(e) {
      e.preventDefault(); // Note(cg): do not use default link as we want to catch auth/id-token-expired error
      const parent = e.currentTarget.parentElement;
      const url = parent.href + '&dryRun=yes';
      const download = () => {
        fetch(url)
          .then(response => {
            if (response.status === 200) {
              throw 'allGood';
            }
            console.log('Response:', response);
            if (response.status === 401) {
              return response.json();
            }
            return null;
          })
          .then(data => {
            console.log('Success:', data);
            if (data && (data.code === 'auth/id-token-expired' || data.code === 'auth/argument-error')) {
              console.log('Getting a new token');
              // Note(cg): we need a new token and restart the call.
              return firebase.auth().currentUser.getIdTokenResult(true)
                .then(token => {
                  this.set_token(token);
                })
                .then(() => {
                  parent.click();
                });
            }
          })
          .catch((e) => {
            if (e === 'allGood') {
              return parent.click();
            }
            console.error('Error:', e);
          });
      };
      download();
    }

  };
  return connect(
    mapState || mapStateToProps$1,
    mapDispatch || mapDispatchToProps$1
  )(cls);
};

var resizeObservers = [];

var hasActiveObservations = function () {
    return resizeObservers.some(function (ro) { return ro.activeTargets.length > 0; });
};

var hasSkippedObservations = function () {
    return resizeObservers.some(function (ro) { return ro.skippedTargets.length > 0; });
};

var msg = 'ResizeObserver loop completed with undelivered notifications.';
var deliverResizeLoopError = function () {
    var event;
    if (typeof ErrorEvent === 'function') {
        event = new ErrorEvent('error', {
            message: msg
        });
    }
    else {
        event = document.createEvent('Event');
        event.initEvent('error', false, false);
        event.message = msg;
    }
    window.dispatchEvent(event);
};

var ResizeObserverBoxOptions;
(function (ResizeObserverBoxOptions) {
    ResizeObserverBoxOptions["BORDER_BOX"] = "border-box";
    ResizeObserverBoxOptions["CONTENT_BOX"] = "content-box";
    ResizeObserverBoxOptions["DEVICE_PIXEL_CONTENT_BOX"] = "device-pixel-content-box";
})(ResizeObserverBoxOptions || (ResizeObserverBoxOptions = {}));

var DOMRectReadOnly = (function () {
    function DOMRectReadOnly(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.top = this.y;
        this.left = this.x;
        this.bottom = this.top + this.height;
        this.right = this.left + this.width;
        return Object.freeze(this);
    }
    DOMRectReadOnly.prototype.toJSON = function () {
        var _a = this, x = _a.x, y = _a.y, top = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left, width = _a.width, height = _a.height;
        return { x: x, y: y, top: top, right: right, bottom: bottom, left: left, width: width, height: height };
    };
    DOMRectReadOnly.fromRect = function (rectangle) {
        return new DOMRectReadOnly(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    };
    return DOMRectReadOnly;
}());

var isSVG = function (target) { return target instanceof SVGElement && 'getBBox' in target; };
var isHidden = function (target) {
    if (isSVG(target)) {
        var _a = target.getBBox(), width = _a.width, height = _a.height;
        return !width && !height;
    }
    var _b = target, offsetWidth = _b.offsetWidth, offsetHeight = _b.offsetHeight;
    return !(offsetWidth || offsetHeight || target.getClientRects().length);
};
var isElement = function (obj) {
    var _a, _b;
    var scope = (_b = (_a = obj) === null || _a === void 0 ? void 0 : _a.ownerDocument) === null || _b === void 0 ? void 0 : _b.defaultView;
    return !!(scope && obj instanceof scope.Element);
};
var isReplacedElement = function (target) {
    switch (target.tagName) {
        case 'INPUT':
            if (target.type !== 'image') {
                break;
            }
        case 'VIDEO':
        case 'AUDIO':
        case 'EMBED':
        case 'OBJECT':
        case 'CANVAS':
        case 'IFRAME':
        case 'IMG':
            return true;
    }
    return false;
};

var global$1 = typeof window !== 'undefined' ? window : {};

var cache = new WeakMap();
var scrollRegexp = /auto|scroll/;
var verticalRegexp = /^tb|vertical/;
var IE = (/msie|trident/i).test(global$1.navigator && global$1.navigator.userAgent);
var parseDimension = function (pixel) { return parseFloat(pixel || '0'); };
var size = function (inlineSize, blockSize, switchSizes) {
    if (inlineSize === void 0) { inlineSize = 0; }
    if (blockSize === void 0) { blockSize = 0; }
    if (switchSizes === void 0) { switchSizes = false; }
    return Object.freeze({
        inlineSize: (switchSizes ? blockSize : inlineSize) || 0,
        blockSize: (switchSizes ? inlineSize : blockSize) || 0
    });
};
var zeroBoxes = Object.freeze({
    devicePixelContentBoxSize: size(),
    borderBoxSize: size(),
    contentBoxSize: size(),
    contentRect: new DOMRectReadOnly(0, 0, 0, 0)
});
var calculateBoxSizes = function (target, forceRecalculation) {
    if (forceRecalculation === void 0) { forceRecalculation = false; }
    if (cache.has(target) && !forceRecalculation) {
        return cache.get(target);
    }
    if (isHidden(target)) {
        cache.set(target, zeroBoxes);
        return zeroBoxes;
    }
    var cs = getComputedStyle(target);
    var svg = isSVG(target) && target.ownerSVGElement && target.getBBox();
    var removePadding = !IE && cs.boxSizing === 'border-box';
    var switchSizes = verticalRegexp.test(cs.writingMode || '');
    var canScrollVertically = !svg && scrollRegexp.test(cs.overflowY || '');
    var canScrollHorizontally = !svg && scrollRegexp.test(cs.overflowX || '');
    var paddingTop = svg ? 0 : parseDimension(cs.paddingTop);
    var paddingRight = svg ? 0 : parseDimension(cs.paddingRight);
    var paddingBottom = svg ? 0 : parseDimension(cs.paddingBottom);
    var paddingLeft = svg ? 0 : parseDimension(cs.paddingLeft);
    var borderTop = svg ? 0 : parseDimension(cs.borderTopWidth);
    var borderRight = svg ? 0 : parseDimension(cs.borderRightWidth);
    var borderBottom = svg ? 0 : parseDimension(cs.borderBottomWidth);
    var borderLeft = svg ? 0 : parseDimension(cs.borderLeftWidth);
    var horizontalPadding = paddingLeft + paddingRight;
    var verticalPadding = paddingTop + paddingBottom;
    var horizontalBorderArea = borderLeft + borderRight;
    var verticalBorderArea = borderTop + borderBottom;
    var horizontalScrollbarThickness = !canScrollHorizontally ? 0 : target.offsetHeight - verticalBorderArea - target.clientHeight;
    var verticalScrollbarThickness = !canScrollVertically ? 0 : target.offsetWidth - horizontalBorderArea - target.clientWidth;
    var widthReduction = removePadding ? horizontalPadding + horizontalBorderArea : 0;
    var heightReduction = removePadding ? verticalPadding + verticalBorderArea : 0;
    var contentWidth = svg ? svg.width : parseDimension(cs.width) - widthReduction - verticalScrollbarThickness;
    var contentHeight = svg ? svg.height : parseDimension(cs.height) - heightReduction - horizontalScrollbarThickness;
    var borderBoxWidth = contentWidth + horizontalPadding + verticalScrollbarThickness + horizontalBorderArea;
    var borderBoxHeight = contentHeight + verticalPadding + horizontalScrollbarThickness + verticalBorderArea;
    var boxes = Object.freeze({
        devicePixelContentBoxSize: size(Math.round(contentWidth * devicePixelRatio), Math.round(contentHeight * devicePixelRatio), switchSizes),
        borderBoxSize: size(borderBoxWidth, borderBoxHeight, switchSizes),
        contentBoxSize: size(contentWidth, contentHeight, switchSizes),
        contentRect: new DOMRectReadOnly(paddingLeft, paddingTop, contentWidth, contentHeight)
    });
    cache.set(target, boxes);
    return boxes;
};
var calculateBoxSize = function (target, observedBox, forceRecalculation) {
    var _a = calculateBoxSizes(target, forceRecalculation), borderBoxSize = _a.borderBoxSize, contentBoxSize = _a.contentBoxSize, devicePixelContentBoxSize = _a.devicePixelContentBoxSize;
    switch (observedBox) {
        case ResizeObserverBoxOptions.DEVICE_PIXEL_CONTENT_BOX:
            return devicePixelContentBoxSize;
        case ResizeObserverBoxOptions.BORDER_BOX:
            return borderBoxSize;
        default:
            return contentBoxSize;
    }
};

var ResizeObserverEntry = (function () {
    function ResizeObserverEntry(target) {
        var boxes = calculateBoxSizes(target);
        this.target = target;
        this.contentRect = boxes.contentRect;
        this.borderBoxSize = [boxes.borderBoxSize];
        this.contentBoxSize = [boxes.contentBoxSize];
        this.devicePixelContentBoxSize = [boxes.devicePixelContentBoxSize];
    }
    return ResizeObserverEntry;
}());

var calculateDepthForNode = function (node) {
    if (isHidden(node)) {
        return Infinity;
    }
    var depth = 0;
    var parent = node.parentNode;
    while (parent) {
        depth += 1;
        parent = parent.parentNode;
    }
    return depth;
};

var broadcastActiveObservations = function () {
    var shallowestDepth = Infinity;
    var callbacks = [];
    resizeObservers.forEach(function processObserver(ro) {
        if (ro.activeTargets.length === 0) {
            return;
        }
        var entries = [];
        ro.activeTargets.forEach(function processTarget(ot) {
            var entry = new ResizeObserverEntry(ot.target);
            var targetDepth = calculateDepthForNode(ot.target);
            entries.push(entry);
            ot.lastReportedSize = calculateBoxSize(ot.target, ot.observedBox);
            if (targetDepth < shallowestDepth) {
                shallowestDepth = targetDepth;
            }
        });
        callbacks.push(function resizeObserverCallback() {
            ro.callback.call(ro.observer, entries, ro.observer);
        });
        ro.activeTargets.splice(0, ro.activeTargets.length);
    });
    for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
        var callback = callbacks_1[_i];
        callback();
    }
    return shallowestDepth;
};

var gatherActiveObservationsAtDepth = function (depth) {
    resizeObservers.forEach(function processObserver(ro) {
        ro.activeTargets.splice(0, ro.activeTargets.length);
        ro.skippedTargets.splice(0, ro.skippedTargets.length);
        ro.observationTargets.forEach(function processTarget(ot) {
            if (ot.isActive()) {
                if (calculateDepthForNode(ot.target) > depth) {
                    ro.activeTargets.push(ot);
                }
                else {
                    ro.skippedTargets.push(ot);
                }
            }
        });
    });
};

var process = function () {
    var depth = 0;
    gatherActiveObservationsAtDepth(depth);
    while (hasActiveObservations()) {
        depth = broadcastActiveObservations();
        gatherActiveObservationsAtDepth(depth);
    }
    if (hasSkippedObservations()) {
        deliverResizeLoopError();
    }
    return depth > 0;
};

var trigger;
var callbacks = [];
var notify = function () { return callbacks.splice(0).forEach(function (cb) { return cb(); }); };
var queueMicroTask = function (callback) {
    if (!trigger) {
        var toggle_1 = 0;
        var el_1 = document.createTextNode('');
        var config = { characterData: true };
        new MutationObserver(function () { return notify(); }).observe(el_1, config);
        trigger = function () { el_1.textContent = "" + (toggle_1 ? toggle_1-- : toggle_1++); };
    }
    callbacks.push(callback);
    trigger();
};

var queueResizeObserver = function (cb) {
    queueMicroTask(function ResizeObserver() {
        requestAnimationFrame(cb);
    });
};

var watching = 0;
var isWatching = function () { return !!watching; };
var CATCH_PERIOD = 250;
var observerConfig = { attributes: true, characterData: true, childList: true, subtree: true };
var events = [
    'resize',
    'load',
    'transitionend',
    'animationend',
    'animationstart',
    'animationiteration',
    'keyup',
    'keydown',
    'mouseup',
    'mousedown',
    'mouseover',
    'mouseout',
    'blur',
    'focus'
];
var time = function (timeout) {
    if (timeout === void 0) { timeout = 0; }
    return Date.now() + timeout;
};
var scheduled = false;
var Scheduler = (function () {
    function Scheduler() {
        var _this = this;
        this.stopped = true;
        this.listener = function () { return _this.schedule(); };
    }
    Scheduler.prototype.run = function (timeout) {
        var _this = this;
        if (timeout === void 0) { timeout = CATCH_PERIOD; }
        if (scheduled) {
            return;
        }
        scheduled = true;
        var until = time(timeout);
        queueResizeObserver(function () {
            var elementsHaveResized = false;
            try {
                elementsHaveResized = process();
            }
            finally {
                scheduled = false;
                timeout = until - time();
                if (!isWatching()) {
                    return;
                }
                if (elementsHaveResized) {
                    _this.run(1000);
                }
                else if (timeout > 0) {
                    _this.run(timeout);
                }
                else {
                    _this.start();
                }
            }
        });
    };
    Scheduler.prototype.schedule = function () {
        this.stop();
        this.run();
    };
    Scheduler.prototype.observe = function () {
        var _this = this;
        var cb = function () { return _this.observer && _this.observer.observe(document.body, observerConfig); };
        document.body ? cb() : global$1.addEventListener('DOMContentLoaded', cb);
    };
    Scheduler.prototype.start = function () {
        var _this = this;
        if (this.stopped) {
            this.stopped = false;
            this.observer = new MutationObserver(this.listener);
            this.observe();
            events.forEach(function (name) { return global$1.addEventListener(name, _this.listener, true); });
        }
    };
    Scheduler.prototype.stop = function () {
        var _this = this;
        if (!this.stopped) {
            this.observer && this.observer.disconnect();
            events.forEach(function (name) { return global$1.removeEventListener(name, _this.listener, true); });
            this.stopped = true;
        }
    };
    return Scheduler;
}());
var scheduler = new Scheduler();
var updateCount = function (n) {
    !watching && n > 0 && scheduler.start();
    watching += n;
    !watching && scheduler.stop();
};

var skipNotifyOnElement = function (target) {
    return !isSVG(target)
        && !isReplacedElement(target)
        && getComputedStyle(target).display === 'inline';
};
var ResizeObservation = (function () {
    function ResizeObservation(target, observedBox) {
        this.target = target;
        this.observedBox = observedBox || ResizeObserverBoxOptions.CONTENT_BOX;
        this.lastReportedSize = {
            inlineSize: 0,
            blockSize: 0
        };
    }
    ResizeObservation.prototype.isActive = function () {
        var size = calculateBoxSize(this.target, this.observedBox, true);
        if (skipNotifyOnElement(this.target)) {
            this.lastReportedSize = size;
        }
        if (this.lastReportedSize.inlineSize !== size.inlineSize
            || this.lastReportedSize.blockSize !== size.blockSize) {
            return true;
        }
        return false;
    };
    return ResizeObservation;
}());

var ResizeObserverDetail = (function () {
    function ResizeObserverDetail(resizeObserver, callback) {
        this.activeTargets = [];
        this.skippedTargets = [];
        this.observationTargets = [];
        this.observer = resizeObserver;
        this.callback = callback;
    }
    return ResizeObserverDetail;
}());

var observerMap = new WeakMap();
var getObservationIndex = function (observationTargets, target) {
    for (var i = 0; i < observationTargets.length; i += 1) {
        if (observationTargets[i].target === target) {
            return i;
        }
    }
    return -1;
};
var ResizeObserverController = (function () {
    function ResizeObserverController() {
    }
    ResizeObserverController.connect = function (resizeObserver, callback) {
        var detail = new ResizeObserverDetail(resizeObserver, callback);
        observerMap.set(resizeObserver, detail);
    };
    ResizeObserverController.observe = function (resizeObserver, target, options) {
        var detail = observerMap.get(resizeObserver);
        var firstObservation = detail.observationTargets.length === 0;
        if (getObservationIndex(detail.observationTargets, target) < 0) {
            firstObservation && resizeObservers.push(detail);
            detail.observationTargets.push(new ResizeObservation(target, options && options.box));
            updateCount(1);
            scheduler.schedule();
        }
    };
    ResizeObserverController.unobserve = function (resizeObserver, target) {
        var detail = observerMap.get(resizeObserver);
        var index = getObservationIndex(detail.observationTargets, target);
        var lastObservation = detail.observationTargets.length === 1;
        if (index >= 0) {
            lastObservation && resizeObservers.splice(resizeObservers.indexOf(detail), 1);
            detail.observationTargets.splice(index, 1);
            updateCount(-1);
        }
    };
    ResizeObserverController.disconnect = function (resizeObserver) {
        var _this = this;
        var detail = observerMap.get(resizeObserver);
        detail.observationTargets.slice().forEach(function (ot) { return _this.unobserve(resizeObserver, ot.target); });
        detail.activeTargets.splice(0, detail.activeTargets.length);
    };
    return ResizeObserverController;
}());

var ResizeObserver = (function () {
    function ResizeObserver(callback) {
        if (arguments.length === 0) {
            throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
        }
        if (typeof callback !== 'function') {
            throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
        }
        ResizeObserverController.connect(this, callback);
    }
    ResizeObserver.prototype.observe = function (target, options) {
        if (arguments.length === 0) {
            throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
        }
        if (!isElement(target)) {
            throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
        }
        ResizeObserverController.observe(this, target, options);
    };
    ResizeObserver.prototype.unobserve = function (target) {
        if (arguments.length === 0) {
            throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
        }
        if (!isElement(target)) {
            throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
        }
        ResizeObserverController.unobserve(this, target);
    };
    ResizeObserver.prototype.disconnect = function () {
        ResizeObserverController.disconnect(this);
    };
    ResizeObserver.toString = function () {
        return 'function ResizeObserver () { [polyfill code] }';
    };
    return ResizeObserver;
}());

// import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/**
 * ##  Resizable
 * 
 * handles size and resizing
 * 
 * @memberof MultiChart.mixin
 * @polymer
 * @mixinFunction
 */

const ResizeObserver$1 = window.ResizeObserver || ResizeObserver;
const ro = new ResizeObserver$1((entries, observer) => {
  entries.forEach((entry, index) => entry.target.onResize(entry, index));
});

const Resizable = superClass => {

  /*
   * @polymer
   * @mixinClass
   */
  class Mixin extends superClass {

    connectedCallback() {
      super.connectedCallback();
      ro.observe(this);
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      ro.unobserve(this);
    }

    onResize(entry, index) {
      throw new Error('on resize need to be overridden ')
    }

  }

  return Mixin;
};

const deep = (action, obj, keys, id, key) => {
  keys = keys.split('.');
  id = keys.splice(-1, 1);
  for (key in keys) obj = obj[keys[key]] = obj[keys[key]] || {};
  return action(obj, id);
};

const get$1 = (obj, prop) => obj[prop];
const set = n => (obj, prop) => (obj[prop] = n);

const GetSet = superClass => {

  /*
   * @polymer
   * @mixinClass
   */
  class Mixin extends superClass {

    getProp(path, defaultValue) {
      return deep(get$1, this, path) || defaultValue;
    }

    setProp(path, value) {
      return deep(set(value), this, path);
    }

    setInput(path, valPath = 'value') {
      return e => this.setProp(path, e.target[valPath]);
    }

  }

  return Mixin;
};

var dataroot = 'organisation';

/*
  Mixin injjected data root property. 
  This is usefull for libraries getting data either
  from `organisation`` (idata.tools) ot `program` ()preignition
 */

const DataRoot = superClass => {

  /*
   * @polymer
   * @mixinClass
   */
  class Mixin extends superClass {

    constructor() {
      super();
      this.dataroot = dataroot;
    }
  }

  return Mixin;
};

const generator = (name) => {
  return class E extends Error {
    constructor(message, context) {
      // Pass remaining arguments (including vendor specific ones) to parent constructor
      super(...arguments);

      this.name = name;
      if (context) {
        this.context = context;
      }
    }
  };
};

// Note(cg): to be used as generic errors.
const E = generator('E');

// Note(cg): to be used as missing stuff.
const EMissing = generator('Missing');

const formEngineVersion = 'v4';
const termsVersion = 'v1';

export { DataRoot, DownloadMixin as Download, E, EMissing, GetSet, Resizable, EnableTranslation as Translate, formEngineVersion, getter, parse, parseInline, connect as reduxConnect, getStore as reduxStore, resizeTextarea, termsVersion };
