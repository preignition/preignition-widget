import { h as html, n as nothing } from '../common/lit-html-f57783b7.js';
import { UpdatingElement, LitElement } from '../lit-element.js';
import '../common/directive-651fd9cf.js';
import { unsafeHTML } from '../lit-html/directives/unsafe-html.js';
import purify from '../dompurify.js';

/**
 * set firebase app from appName
 *
 * @param {LitElement} baseElement - the LitElement to extend
 */
const appMixin = (baseElement) => class extends baseElement {

  static get properties() {
    return {
      ...super.properties,

      app: {
        type: Object,
      },

      appName: {
        type: String,
        attribute: 'app-name'
      },

      /*
       * `log` true to enable logging
       */
      log: {
        type: Boolean,
      },
    }

  }

  constructor() {
    super();
    this.appName = '';
  }

  update(props) {
    super.update(props);
    if (props.has('appName') && (!this.app || this.app.name !== this.appName || (this.appName === '' && this.app.name !== '[DEFAULT]'))) {
      if(firebase) {
        this.app = firebase.app(this.appName);
      }
      else {
        window.addEventListener('firebase-app-initialized', () => {
           this.app = firebase.app(this.appName);   
        }, {once: true});
      }
    }
  }


  onError(err) {
    this.log && console.error(err);
    this.dispatchEvent(new CustomEvent('error', { detail: err, bubbles: true, composed: true }));
  }
};

/**
 * ##  Resizable
 * 
 * handles size and resizing
 * 
 * @memberof MultiChart.mixin
 * @polymer
 * @mixinFunction
 */


const networkStatusSubscribers = [];

function notifySubscribers() {
  for (let i = 0; i < networkStatusSubscribers.length; ++i) {
    networkStatusSubscribers[i].refreshNetworkStatus();
  }
}

window.addEventListener('online', notifySubscribers);
window.addEventListener('offline', notifySubscribers);

const AppNetworkStatusBehavior = superClass => {

  /*
   * @polymer
   * @mixinClass
   */
  class Mixin extends superClass {

    // static get properties() {

    //   return {

    //     ...super.properties,

    //     *
    //      * True if the browser is online, and false if the browser is offline
    //      * matching the HTML browser state spec.
    //      *
    //      * @type {Boolean}
         
    //     _online: {
    //       type: Boolean
    //     }

    //   };
    // }

    connectedCallback() {
      super.connectedCallback();
      networkStatusSubscribers.push(this);
      this.refreshNetworkStatus();
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      const index = networkStatusSubscribers.indexOf(this);
      if (index < 0) {
        return;
      }
      networkStatusSubscribers.splice(index, 1);
    }

    /**
     * Updates the `online` property to reflect the browser connection status.
     */
    refreshNetworkStatus() {
      this._online = window.navigator.onLine;
    }

  }

  return Mixin;
};

/**
 * common properties for firebase database
 *
 * @param {LitElement} baseElement - the LitElement to extend
 */


/**
 * cheks whether path is a valid path
 * @param  {String} path firebase database path
 * @return {Boolean}      true if path is valid
 */
const pathReady = (path) => path && path.split('/').slice(1).indexOf('') < 0;

const Mixin = (baseElement) => class extends AppNetworkStatusBehavior(appMixin(baseElement)) {

  static get properties() {
    return {

      ...super.properties,

      db: {
        type: Object,
      },

      ref: {
        type: Object
      },

      /**
       * Path to a Firebase root or endpoint. N.B. `path` is case sensitive.
       * @type {string|null}
       */
      path: {
        type: String
      },

      /**
       * When true, Firebase listeners won't be activated. This can be useful
       * in situations where elements are loaded into the DOM before they're
       * ready to be activated (e.g. navigation, initialization scenarios).
       */
      disabled: {
        type: Boolean,
        value: false
      }

    }

  }

  constructor() {
    super();
    this.appName = '';
  }

  update(props) {
    super.update(props);
    if (props.has('app')) {
      this.__computeDb(this.app);
    }
    if (props.has('db') || props.has('path') || props.has('disabled')) {
      this.__computeRef(this.db, this.path);
    }
  }

  __computeDb(app) {
    this.db = app ? app.database() : null;
  }

  __computeRef(db, path) {
    if (db == null ||
      path == null ||
      !pathReady(path) ||
      this.disabled) {
      this.ref = null;
      return;
    }

    this.ref = db.ref(path);
    this.dispatchLoading();
  }

  /**
   * called when we start loading data, i.e. when this.ref is set
   */
  dispatchLoading() {
    this.__dispatchChange(true);
  }

  /**
   * called when we we have received data 
   */
  dispatchValue() {
    this.__dispatchChange(false);
  }

  /**
   * @override
   * Updates the `online` property to reflect the browser connection status.
   */
  refreshNetworkStatus() {
    if (!this.ref) {
      return;
    }

    if (window.navigator.onLine) {
      this.db.goOnline();
    } else {
      this.db.goOffline();
    }
  }

  /**
   * notify outisde world about change 
   * we need to set path in event detail to make sure the value is read from detail and not form 
   * host property (see Polymer property-effects handleNotification)
   * @param  {Boolean} loading           true if we are loading data (just once this.ref is set)
   * @param  {Boolean} skipDispatchValue when true 
   * @return {[type]}                   [description]
   */
  __dispatchChange(loading) {

    if (!loading) {
      this.log && console.info('data-changed', this.__remote);

      /*
      
      Note(cg): we need this as we are dispatching event without path.
      Polymer handles notifications differently:
        if (fromPath) {
          toPath = Polymer.Path.translate(fromProp, toPath, fromPath);
          value = detail && detail.value;
        } else {
          value = event.currentTarget[fromProp];
        }

      */

      this.dispatchEvent(new CustomEvent('data-changed', { detail: { value: this.__remote } }));
    }
    this.dispatchEvent(new CustomEvent('loading-changed', { detail: { value: loading, path: 'loading' } }));
    this.dispatchEvent(new CustomEvent('exists-changed', { detail: { value: loading ? null : !(this.__remote === null || this.__remote === undefined), path: 'exists' } }));
  }
};

class LifDocument extends Mixin(UpdatingElement) {

  static get properties() {
    return {
      ...super.properties,
    }
  }

  get data() {
    return this.__remote;
  }

  set data(value) {
    if (value === undefined) { return }
    const setData = (val) => {
      if (val !== this.__remote || (val === Object(val) && JSON.stringify(val) !== JSON.stringify(this.__remote))) {
        this.log && console.info('settings value to remote', val);
        this.ref.set(val)
          .catch(e => this.onError(e));
      }
    };

    // Note(cg): only set data once __remote is known.
    if (this.__remote === undefined) {
      this.addEventListener('data-changed', () => { 
        // Note(cg): override persisted data only if remote is null.
        if(this._remote === null) {
          setData(value);
        }}, { once: true });
      return;
    }
    setData(value);
  }

  disconnectedCallback() {
    if (this.ref) {
      this.ref.off('value', this.onValue, this);
    }
    super.disconnectedCallback();
  }

  update(props) {
    if (this.log) {
      console.info('update query props');
      for (const item of props) console.info(item);
    }
    if (props.has('ref')) {
      this.__setRef(this.ref, props.get('ref'));
    }
    super.update(props);
  }

  __setRef(ref, old) {
    if (old) {
      this.__remote = undefined;
      old.off('value', this.onValue, this);
    }
    if (ref) {
      ref.on('value', this.onValue, this.onError, this);
    }
  }

  onValue(snap) {
    this.__remote = snap.val();
    this.log && console.info('read value', this.__remote);
    this.dispatchValue();

  }
}

// Register the new element with the browser.
customElements.define('lif-document', LifDocument);

const __valueWithKey = (key, value) => {
  const leaf = typeof value !== 'object';

  if (leaf) {
    return { $key: key, $val: value };
  }
  value.$key = key;
  return value;
};

const __snapshotToValue = (snapshot) => __valueWithKey(snapshot.key, snapshot.val());

class LifQuery extends Mixin(UpdatingElement) {

  static get properties() {
    return {
      ...super.properties,

      /*
       * `data` 
       */
      // data: {
      //   type: Array,
      // },

      /**
       * [`firebase.database.Query`](https://firebase.google.com/docs/reference/js/firebase.database.Query#property)
       * object computed by the following parameters.
       */
      query: {
        type: Object,
      },

      /**
       * The child key of each query result to order the query by.
       *
       * Changing this value generates a new `query` ordered by the
       * specified child key.
       */
      orderByChild: {
        type: String,
        attribute: 'order-by-child'
      },

      /**
       * Order this query by values. This is only applicable to leaf node queries
       * against data structures such as `{a: 1, b: 2, c: 3}`.
       */
      orderByValue: {
        type: Boolean,
        attribute: 'order-by-value'
      },

      /**
       * The value to start at in the query.
       *
       * Changing this value generates a new `query` with the specified
       * starting point. The generated `query` includes children which match
       * the specified starting point.
       */
      startAt: {
        type: String,
        attribute: 'start-at'
      },

      /**
       * The value to end at in the query.
       *
       * Changing this value generates a new `query` with the specified
       * ending point. The generated `query` includes children which match
       * the specified ending point.
       */
      endAt: {
        type: String,
        attribute: 'end-at'
      },

      /**
       * Specifies a child-key value that must be matched for each candidate result.
       *
       * Changing this value generates a new `query` which includes children
       * which match the specified value.
       */
      equalTo: {
        type: Object,
        attribute: 'equal-to'
      },

      /**
       * The maximum number of nodes to include in the query.
       *
       * Changing this value generates a new `query` limited to the first
       * number of children.
       */
      limitToFirst: {
        type: Number,
        attribute: 'limit-to-first'
      },

      /**
       * The maximum number of nodes to include in the query.
       *
       * Changing this value generates a new `query` limited to the last
       * number of children.
       */
      limitToLast: {
        type: Number,
        attribute: 'limit-to-last'
        // value: 0
      }
    }
  }

  get data() {
    return this.__remote;
  }

  set data(value) {
    // Note(cg): do nothing. But we need a setter
  }

  constructor() {
    super();
    this.__map = {};
    this.__remote = [];
  }

  disconnectedCallback() {
    if (this.query) {
      this.__removeListeners(this.query);
    }
    super.disconnectedCallback();
  }

  update(props) {
    if(this.log) {
      console.info('update query props');
      for (const item of props) console.log(item);
    } 
    if (props.has('ref') || props.has('orderByChild') || props.has('orderByValue') || props.has('limitToFirst') || props.has('limitToLast') || props.has('startAt') || props.has('endAt') || props.has('equalTo')) {
      this.__setQuery(this.ref, props.get('ref'));
    }
    if (props.has('query')) {
      this.__queryChanged(this.query, props.get('query'));
    }
    super.update(props);
  }

  __setRef(ref, old) {
    if (old) {
      old.off('value', this.onValue, this);
    }
    if (ref) {
      ref.on('value', this.onValue, this.onError, this);
    }
  }

  __setQuery(ref) {
    if (ref == null) {
      this.query = null;
      return
    }

    let query;

    if (this.orderByChild) {
      query = ref.orderByChild(this.orderByChild);
    } else if (this.orderByValue) {
      query = ref.orderByValue();
    } else {
      query = ref.orderByKey();
    }

    if (this.limitToFirst) {
      query = query.limitToFirst(this.limitToFirst);
    } else if (this.limitToLast) {
      query = query.limitToLast(this.limitToLast);
    }

    if (this.startAt !== undefined) {
      query = query.startAt(this.startAt);
    }

    if (this.endAt !== undefined) {
      query = query.endAt(this.endAt);
    }

    if (this.equalTo !== undefined) {
      query = query.equalTo(this.equalTo);
    }

    this.query = query;
  }

  __removeListeners(query) {
    query.off('value', this.__onFirebaseValue, this);
    query.off('child_added', this.__onFirebaseChildAdded, this);
    query.off('child_removed', this.__onFirebaseChildRemoved, this);
    query.off('child_changed', this.__onFirebaseChildChanged, this);
    query.off('child_moved', this.__onFirebaseChildMoved, this);

  }

  __queryChanged(query, oldQuery) {
    if (oldQuery) {
      this.__removeListeners(oldQuery);

      this.__remote = [];
      this.__map = {};
    }

    // this allows us to just call the addition of event listeners only once.
    // __queryChanged is being called thrice when firebase-query is created
    // 1 - 2. query property computed (null, undefined)
    // 3. when attached is called (this.query, this.query)
    // need help to fix this so that this function is only called once

    if (query) {
      query.on('value', this.__onFirebaseValue, this.onError, this);
    }
  }

  __indexFromKey(key) {
    return this.__remote.findIndex(item => item.$key === key);
  }

  __onFirebaseValue(snapshot) {
    if (snapshot.hasChildren()) {
      const data = [];
      snapshot.forEach((childSnapshot) => {
        const { key } = childSnapshot;
        const value = __valueWithKey(key, childSnapshot.val());

        this.__map[key] = value;
        data.push(value);
      });

      this.__remote = data;
    }
    this.dispatchValue();
    // this.dispatchChange(false, !!this._remote);
    this.log && console.info('set value', this.__remote);

    const { query } = this;

    query.on('child_added', this.__onFirebaseChildAdded, this.onError, this);
    query.on('child_removed', this.__onFirebaseChildRemoved, this.onError, this);
    query.on('child_changed', this.__onFirebaseChildChanged, this.onError, this);
    query.on('child_moved', this.__onFirebaseChildMoved, this.onError, this);
  }

  __onFirebaseChildAdded(snapshot, previousChildKey) {
    const key = snapshot.key;

    // check if the key-value pair already exists
    if (this.__indexFromKey(key) >= 0) return

    // const value = snapshot.val();
    const previousChildIndex = this.__indexFromKey(previousChildKey);


    const value = __snapshotToValue(snapshot);
    this.log && console.info('Firebase child_added:', key, value);

    this.__map[key] = value;
    this.__remote.splice(previousChildIndex + 1, 0, value);
    
    // Note(cg): we need a new Object, otherwise Polymer will not be notified of array mutation..
    this.__remote = [...this.__remote];
    this.dispatchValue();
  }

  __onFirebaseChildRemoved(snapshot) {

    const key = snapshot.key;
    const value = this.__map[key];

    this.log && console.info('Firebase child_removed:', key, value);

    if (value) {
      this.__map[key] = null;
      if (this.__indexFromKey(key) >= 0) {
        // Note(cg): we need a new Object, otherwise Polymer will not be notified of array mutation..
        this.__remote.splice(this.__indexFromKey(key), 1);
      }
     this.__remote = [...this.__remote];
     this.dispatchValue();
    }
  }

  __onFirebaseChildChanged(snapshot) {
    const key = snapshot.key;
    const prev = this.__map[key];

    this.log && console.info('Firebase child_changed:', key, prev);

    if (prev) {
      const index = this.__indexFromKey(key);
      const value = __snapshotToValue(snapshot);

      this.__map[key] = value;
      if (value instanceof Object) {
        for (const property in value) {
          this.__remote[index][property] = value[property];
        }
        for (const property in prev) {
          if (!value.hasOwnProperty(property)) {
            this.__remote[index][property] = null;
          }
        }
      } else {
        this.__remote[index] = value;
      }

    }
    this.__remote = [...this.__remote];
    this.dispatchValue();
  }

  __onFirebaseChildMoved(snapshot, previousChildKey) {
    const key = snapshot.key;
    const value = this.__map[key];
    const targetIndex = previousChildKey ? this.__indexFromKey(previousChildKey) + 1 : 0;

    this.log && console.info('Firebase child_moved:', key, value, 'to index', targetIndex);

    if (value) {
      const index = this.__indexFromKey(key);

      this.__map[key] = __snapshotToValue(snapshot);
      this.__remote.splice(index, 1);
      this.__remote.splice(targetIndex, 0, this.__map[key]);

      this.__remote = [...this.__remote];
      this.dispatchValue();

    }
  }

}

// Register the new element with the browser.
customElements.define('lif-query', LifQuery);

// import { default as FirebaseDatabase } from './lif-database-mixin.js';

/**
 * cheks whether path is a valid path
 * @param  {String} path firebase database path
 * @return {Boolean}      true if path is valid
 */
const pathReady$1 = (path) => {
  const split = path && path.split('/').slice(1);
  return split.indexOf('') < 0 && split.indexOf('undefined') < 0;
};


const decorate = (data, id, change) => {
  data.$id = id;
};

const getter = (doc, fieldPath) => {
  return fieldPath 
    ? (Array.isArray(fieldPath) 
      ? fieldPath.reduce((obj, key) => {
        obj[key] = doc.get(key) || {};
        return obj;
      }, {}) 
      : doc.get(fieldPath) || {})
        : doc.data();
      };

class LifStore extends appMixin(UpdatingElement) {

  static get properties() {
    return {
      ...super.properties,

      db: {
        type: Object,
      },

      ref: {
        type: Object
      },

      /**
       * Path to a Firebase root or endpoint. N.B. `path` is case sensitive.
       * @type {string|null}
       */
      path: {
        type: String
      },

      /*
       * `fieldPath` if set, will use DocumentSnapshot.get(fieldPath) instead of DocumentSnapshot.data().``
       *  WHen fieldPath is an Array, will collect all fields. 
       */
      fieldPath: {
        type: String,
      },

      /*
       * `where` the where query {field: 'field', op: '==', value: 123}
       */
      where: {
        type: Object
      },

      /*
       * `decorate` a function decorate collection data 
       */
      decorate: {
        type: Function,
      },
    }
  }

  constructor() {
    super();
    this.decorate = decorate;
  }

  get data() {
    return this.__remote;
  }

  set data(value) {
    if (value === undefined || this._refType === 'collection') { return }
    const setData = (val) => {
      if (val !== this.__remote || (val === Object(val) && JSON.stringify(val) !== JSON.stringify(this.__remote))) {
        this.log && console.info('settings value to remote', this.fieldPath, val);
        if(this.fieldPath) {
          if(Array.isArray(this.fieldPath)) {
            throw 'Document Store can only have String fieldPath'
          }
          this.ref.update({[this.fieldPath]: val})
            .catch(e => this.onError(e));  
        } else {
          this.ref.set(val)
            .catch(e => this.onError(e));
          }
      }
    };

    // Note(cg): only set data once __remote is known.
    if (this.__remote === undefined) {
      this.addEventListener('data-changed', () => { setData(value); }, { once: true });
      return;
    }
    setData(value);
  }


  save(data) {
    this.data = data;
  }

  disconnectedCallback() {
    if (this._unsubscribe) {
      this._unsubscribe();
    }
    super.disconnectedCallback();
  }

  update(props) {
    if (this.log) {
      console.info('update query props');
      for (const item of props) console.info(item);
    }
    if (props.has('app')) {
      this.__computeDb(this.app);
    }
    if (props.has('db') || props.has('path') || props.has('where')) {
      this.__computeRef(this.db, this.path);
    }
    if (props.has('ref')  ) {
      this.__setRef(this.ref, props.get('ref'));
    }
    if (props.has('decorate')) {
      if (this.refType === 'collection' && this.__remote && this.ref) {
        this.__readCollection(this.ref);
      }
    }
    super.update(props);
  }

  __computeDb(app) {
    this.db = app ? app.firestore() : null;
  }

  __computeRef(db, path) {
    if (db == null ||
      path == null ||
      !pathReady$1(path)) {
      this.ref = null;
      return;
    }

    const split = path.split('/').splice(1);
    this.ref = split.reduce((ref, name, index) => {
      let query = ref instanceof firebase.firestore.CollectionReference ? ref.doc(name) : ref.collection(name);
      if (query instanceof firebase.firestore.CollectionReference && index < 2 && this.where) {
        query.where(this.where.field, this.where.op, this.where.value);
      }
      return query;
    }, db);
    this.dispatchEvent(new CustomEvent('ref-changed', { detail: { value: this.ref } }));
  }

  async __setRef(ref, old) {
    if (old) {
      this.__remote = undefined;
      this.refType = null;
      this._unsubscribe();
    }
    if (ref) {
      if (ref instanceof firebase.firestore.CollectionReference) {
        this.log && console.info('collection ref');
        this.refType = 'collection';
        this.__subscribeCollection(ref);
      } else {
        this.log && console.info('document ref');
        this.refType = 'document';
        this.__subscribeDocument(ref);
      }
    }
  }

  __subscribeDocument(ref) {
    this._unsubscribe = ref.onSnapshot((doc) => {
      this.__remote = getter(doc, this.fieldPath); 
      this.log && console.info('document data', this.__remote);
      this.__dispatchChange();
    });
  }

  __subscribeCollection(ref) {
    
    this._unsubscribe = ref.onSnapshot((snapshot) => {
      // Note(cg): we do not react until the first get is complete.
      if (this._firstLoadCompleted) {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const data = getter(change.doc, this.fieldPath); 
            this.decorate(data, change.doc.id, change);
            this.__remote = this.__remote.concat([data]);
            this.dispatchEvent(new CustomEvent('firestore-added', { detail: change }));
          }
          if (change.type === 'modified') {
            const data = getter(change.doc, this.fieldPath); 
            this.decorate(data, change.doc.id, change);
            this.__remote[change.oldIndex] = data;
            this.__remote = this.__remote.concat();
            this.dispatchEvent(new CustomEvent('firestore-modified', { detail: change }));
          }
          if (change.type === 'removed') {
            const { id } = change.doc;
            this.__remote = this.__remote.filter(item => item.$id !== id);
            this.dispatchEvent(new CustomEvent('firestore-removed', { detail: change }));
          }
        });
        this.__dispatchChange();
      }
    }, this.onError);

    this.__readCollection(ref);
  }

  async __readCollection(ref) {
    [this.__remote] = await Promise.all([
      await ref.get().then(snap => {
        this._firstLoadCompleted = true;
        return snap.docs.map((doc) => {
          const data = getter(doc, this.fieldPath); 
          this.decorate(data, doc.id);
          return data;
        });
      })
    ]);
    this.__dispatchChange();
  }

  /**
   * notify outisde world about change 
   * we need to set path in event detail to make sure the value is read from detail and not form 
   * host property (see Polymer property-effects handleNotification)
   * @param  {Boolean} loading           true if we are loading data (just once this.ref is set)
   * @param  {Boolean} skipDispatchValue when true 
   * @return {[type]}                   [description]
   */
  __dispatchChange(loading) {

    if (!loading) {
      this.log && console.info('data-changed', this.__remote);

      /*
        
      Note(cg): we need this as we are dispatching event without path.
      Polymer handles notifications differently:
        if (fromPath) {
          toPath = Polymer.Path.translate(fromProp, toPath, fromPath);
          value = detail && detail.value;
        } else {
          value = event.currentTarget[fromProp];
        }

      */

      this.dispatchEvent(new CustomEvent('data-changed', { detail: { value: this.__remote } }));
    }
    this.dispatchEvent(new CustomEvent('loading-changed', { detail: { value: loading, path: 'loading' } }));
    this.dispatchEvent(new CustomEvent('exists-changed', { detail: { value: loading ? null : !(this.__remote === null || this.__remote === undefined), path: 'exists' } }));
  }
}

// Register the new element with the browser.
customElements.define('lif-store', LifStore);

const inner = (content) => {
  if (!content) {
    return html`
      ${nothing}
    `;
  }

  return html`
    ${unsafeHTML(purify.sanitize(content))}
  `;
};

class LifSpan extends Mixin(LitElement) {

  
  static get properties() {
    return {
      
      ...super.properties,

      /*
       * `defaultValue` value to display when no data
       */
      defaultValue: {
        type: String,
        attribute: 'default-value'
      },

      /*
       * `loadingValue` value to display when loading
       */
      loadingValue: {
        type: String,
        attribute: 'loading-value'
      },

      errorValue: {
        type: String, 
        attribute: 'error-value'
      },

      value: {
        type: String
      },

      exists: {
        type: Boolean
      },

      loading: {
        type: Boolean
      },

      /*
       * a `format` taking value as parameter
       */
      format: {
        type: Function
      },

      /*
       * `inner` when true, inject hml
       */
      inner: {
        type: Boolean,
      },

      /*
       * `asyncValue` event to dispach when value changes.
       * When true, dispatch a 'async-value' event
       * 
       * This is useful when lif-span is used in lists and the value 
       * changes async. We need a mechanism to reflect the change
       * on selected value
       */
      asyncValue: {
        type: Boolean,
        attribute: 'async-value'
      },


    }
  }

  // Note(cg): we want to render value in light dom so that 
  // textContent work on parent elements.
  createRenderRoot() {
    return this;
  }

  render() {
    return this.loading ? 
        html `<span part="loading">${this.loadingValue}</span>` :
        this.exists ?  this.renderValue() : html `<span part="default">${this.defaultValue}</span>`;
  }

  renderValue() {
    return this.inner ? inner(this.format(this.value)) : html `<span part="value">${this.format(this.value)}</span>`;
  }

  constructor() {
    super();
    this.format = (value) => value;
    this.defaultValue = '';
    this.errorValue = '⚠';
    this.inner = false;
    this.loadingValue = '...';
  }

  disconnectedCallback() {
    if (this.ref) {
      this.ref.off('value', this.onValue, this);
    }
    super.disconnectedCallback();
  }

  update(props) {
    this.log && console.info('update document props', props.keys());
    if (props.has('ref')) {
      this.__setRef(this.ref, props.get('ref'));
    }
    super.update(props);
  }

  __setRef(ref, old) {
    if (old) {
      this.__remote = undefined;
      this.value = undefined;
      old.off('value', this.onValue, this);
    }
    if (ref) {
      this.loading = true;
      this.exists = null;
      this.value = undefined;
      ref.on('value', this.onValue, this.onError, this);
    }
  }

  async onValue(snap) {
    this.__remote = snap.val();
    this.loading = false; 
    this.log && console.info('data from db', this.__remote); 
    if (Object(this.__remote) === this.__remote) {
      this.log && console.warn('expecting a primitive, got an object', this.path);
      this.value = this.errorValue;
      return;
    }
    this.value = this.__remote;
    this.exists = this.__remote !== null;
    this.dispatchValue();
    if (this.asyncValue) {
      await this.updateComplete;
      this.dispatchEvent(new CustomEvent('async-value', {bubbles: true, composed: true})); 
    }
  }
}
customElements.define('lif-span', LifSpan);

export { LifDocument, LifQuery, LifSpan, LifStore };
