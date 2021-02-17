const observeState = superclass => class extends superclass {

    constructor() {
        super();
        this._observers = [];
    }

    update(changedProperties) {
        stateRecorder.start();
        super.update(changedProperties);
        this._initStateObservers();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._clearStateObservers();
    }

    _initStateObservers() {
        this._clearStateObservers();
        if (!this.isConnected) return;
        this._addStateObservers(stateRecorder.finish());
    }

    _addStateObservers(stateVars) {
        for (let [state, keys] of stateVars) {
            const observer = () => this.requestUpdate();
            this._observers.push([state, observer]);
            state.addObserver(observer, keys);
        }
    }

    _clearStateObservers() {
        for (let [state, observer] of this._observers) {
            state.removeObserver(observer);
        }
        this._observers = [];
    }

};


class LitState {

    constructor() {
        this._observers = [];
        this._initStateVars();
    }

    addObserver(observer, keys) {
        this._observers.push({observer, keys});
    }

    removeObserver(observer) {
        this._observers = this._observers.filter(observerObj => observerObj.observer !== observer);
    }

    _initStateVars() {
        if (!this.constructor.stateVars) return;
        for (let [key, options] of Object.entries(this.constructor.stateVars)) {
            this._initStateVar(key, options);
        }
    }

    _initStateVar(key, options) {

        options = this._parseOptions(options);

        const stateVar = new options.handler({
            options: options,
            recordRead: () => this._recordRead(key),
            notifyChange: () => this._notifyChange(key)
        });

        Object.defineProperty(
            this,
            key,
            {
                get() {
                    return stateVar.get();
                },
                set(value) {
                    if (stateVar.shouldSetValue(value)) {
                        stateVar.set(value);
                    }
                },
                configurable: true,
                enumerable: true
            }
        );

    }

    _parseOptions(options) {

        if (!options.handler) {
            options.handler = StateVar;
        } else {

            // In case of a custom `StateVar` handler is provided, we offer a
            // second way of providing options to your custom handler class.
            //
            // You can decorate a *method* with `@stateVar()` instead of a
            // variable. The method must return an object, and that object will
            // be assigned to the `options` object.
            //
            // Within the method you have access to the `this` context. So you
            // can access other properties and methods from your state class.
            // And you can add arrow function callbacks where you can access
            // `this`. This provides a lot of possibilities for a custom
            // handler class.
            if (options.propertyMethod && options.propertyMethod.kind === 'method') {
                Object.assign(options, options.propertyMethod.descriptor.value.call(this));
            }

        }

        return options;

    }

    _recordRead(key) {
        stateRecorder.recordRead(this, key);
    }

    _notifyChange(key) {
        for (const observerObj of this._observers) {
            if (!observerObj.keys || observerObj.keys.includes(key)) {
                observerObj.observer(key);
            }
        }    }

}


class StateVar {

    constructor(args) {
        this.options = args.options; // The options given in the `stateVar` declaration
        this.recordRead = args.recordRead; // Callback to indicate the `stateVar` is read
        this.notifyChange = args.notifyChange; // Callback to indicate the `stateVar` value has changed
        this.value = undefined; // The initial value
    }

    // Called when the `stateVar` on the `State` class is read.
    get() {
        this.recordRead();
        return this.value;
    }

    // Returns whether the given `value` should be passed on to the `set()`
    // method. Can be used for validation and/or optimization.
    shouldSetValue(value) {
        return this.value !== value;
    }

    // Called when the `stateVar` on the `State` class is set.
    set(value) {
        this.value = value;
        this.notifyChange();
    }

}


class StateRecorder {

    constructor() {
        this._log = null;
    }

    start() {
        this._log = new Map();
    }

    recordRead(stateObj, key) {
        if (this._log === null) return;
        const keys = this._log.get(stateObj) || [];
        if (!keys.includes(key)) keys.push(key);
        this._log.set(stateObj, keys);
    }

    finish() {
        const stateVars = this._log;
        this._log = null;
        return stateVars;
    }

}

const stateRecorder = new StateRecorder();

const PREFIX = 'ida';
const FORM_ENGINE_VERSION = 'v4';
const TERMS_VERSION = 'v1';
const LANG = 'en';

/* eslint-disable max-len */

/**
 * query: key-value Object from location.search items
 * Used to fetch value for state vars with `urlParam`
 */
const query = window.location.search &&
  toQuery(window.location.search.substring(1)) || {};

/**
 * Return an object from location querystring
 * @param String queryString
 */
function toQuery(queryString) {

  // If the query does not contain anything, return an empty object.
  if (queryString.length === 0) {
    return {};
  }

  // Grab the atoms (["test=123", "hejsa=LOL", "wuhuu"])
  const atoms = queryString.split('&');

  // Split by the values ([["test", "123"], ["hejsa", "LOL"], ["wuhuu"]])
  const arrayMap = atoms.map(atom => atom.split('='));

  // Assign the values to an object ({ test: "123", hejsa: "LOL", wuhuu: "" })
  return Object.assign({}, ...arrayMap.map(arr => ({
    [decodeURIComponent(arr[0])]: (arr.length > 1 ? decodeURIComponent(arr[1]) : '')
  })));
}

/**
 * Local storate handler
 * The handler will store value to local Storate
 * options should contain `key`, used to store in localhost
 * options can also contain `urlParam` to fetch value from location search
 */
const localStorageHandlerFactory = prefix => {
  return class extends StateVar {
    constructor(args) {
      super(args);
      let value = (this.options.urlParam && query[this.options.urlParam]) ||
        localStorage.getItem(`${prefix}_${this.options.key}`);
      if (value && (
          this.options.type === Boolean ||
          this.options.type === Number ||
          this.options.type === Object)) {
        value = JSON.parse(value);
      }
      this.value = (
        (value || value === false || value === 0) ? value : this.options.initialValue
      );
    }

    set(value) {
      super.set(value);
      localStorage.setItem(`${prefix}_${this.options.key}`, value);
    }
  };
};

const LocalStorageHandler = localStorageHandlerFactory(PREFIX);

/**
 * Firebase Handler
 * This handler will synchronize state value with Firebase
 * SHould be used in conjuction with LitFirebaseState
 * which will handle state sync
 */
class FirebaseHandler extends LocalStorageHandler {

  set(value) {
    super.set(value);
    if (this.options._ref) {
      // set value at firebase level
      this.options._ref.set(value);
    } else {
      // we keep track of value being set before sync with firebase is completed
      this.options._skipSync = true;
    }
  }
}

class LitFirebaseState extends LitState {
  constructor() {
    super();
    this._ref = null;
  }

  get ref() {
    return this._ref;
  }

  set ref(value) {
    if (this._ref) {
      this._ref.off();
      this._reset();
    }
    if (value) {
      this._ref = value;
      this._ref.on('value', snap => {
        const {
          stateVars
        } = this.constructor;
        Object.keys(stateVars)
          .forEach(k => {
            const val = snap.child(k).val();
            if (val !== null) {
              if (!stateVars[k]._skipSync) {
                this[k] = val;
              }
              stateVars[k]._ref = this._ref.child(k);
              delete stateVars[k]._skipSync;
            }
          });
      });
    }
  }
  _reset() {
    const {
      stateVars
    } = this.constructor;
    Object.keys(stateVars)
      .forEach(k => {
        stateVars[k]._ref = null;
        this[k] = stateVars.initialValue;
        delete stateVars[k]._skipSync;
      });
  }
}

// register firebase ref when user are signed-in
window.firebase && window.firebase.auth().onAuthStateChanged(user => {
  console.info('USER', user);
  if (user) {
    appState.ref = firebase.database().ref(`/userData/appState/${user.uid}`);
    accessibilityState.ref = firebase.database().ref(`/userData/preference/${user.uid}/accessibility`);
    appState.uid = user.uid;
    appState.user = user;
  } else {
    appState.ref = null;
    accessibilityState.ref = null;
    appState.uid = null;
    appState.user = null;
  }
});

// we want stateVars to be the same object.
// Otherwise, FirebaseHandler approach does not work
const appStateVars = {
  language: {
    handler: FirebaseHandler,
    key: 'language',
    urlParam: 'language',
    initialValue: 'fr'
  },
  uid: {
    key: 'uid',
    initialValue: null
  },
  direction: {
    key: 'direction',
    initialValue: 'rtl'
  }
};

class AppState extends LitFirebaseState {
  static get stateVars() {
    return appStateVars;
  }
}
const appState = new AppState();

// we want stateVars to be the same object.
// Otherwise, FirebaseHandler approach does not work
const accessibilityStateVars = {
  signlanguage: {
    handler: FirebaseHandler,
    key: 'signlanguage',
    urlParam: 'signlanguage',
    type: Boolean,
    initialValue: false
  },
  readaloud: {
    handler: FirebaseHandler,
    key: 'readaloud',
    urlParam: 'readaloud',
    type: Boolean,
    initialValue: false
  },
  easyread: {
    handler: FirebaseHandler,
    key: 'easyread',
    urlParam: 'easyread',
    type: Boolean,
    initialValue: false
  },

};

class AccessibilityState extends LitFirebaseState {
  static get stateVars() {
    return accessibilityStateVars;
  }
}

const accessibilityState = new AccessibilityState();

//  set attribute at doc level
appState.addObserver(() => {
  const {
    language
  } = appState;
  document.documentElement.lang = language;
  appState.direction = (language === 'ar' || language === 'fa') ? 'rtl' : '';
}, ['language']);

// setter is not called when invoqued on constructor
// but we still need to have attribute in sync
document.documentElement.lang = appState.language;

//  set attribute at doc level
appState.addObserver(() => {
  const {
    direction
  } = appState;
  document.documentElement.dir = direction;
}, ['direction']);
document.documentElement.dir = appState.direction;

// For the time being, store appState globally
window._appState = appState;

export { FirebaseHandler as F, LitState as L, PREFIX as P, StateVar as S, TERMS_VERSION as T, appState as a, accessibilityState as b, LocalStorageHandler as c, LitFirebaseState as d, LANG as e, FORM_ENGINE_VERSION as f, localStorageHandlerFactory as l, observeState as o };
