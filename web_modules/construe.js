import { c as createCommonjsModule } from './common/_commonjsHelpers-8b3ac8cb.js';

var event = createCommonjsModule(function (module, exports) {
(function (exports) {

  function getDefaultDescriptor() {
      return {
        '@propagationStopped': {
          writable: true,
          value: false
        },
        stopPropagation: {
          value: function () {
            this['@propagationStopped'] = true;
          }
        }
      };
  }

  exports.event = function (target) {
    if (typeof target === 'string') {
      target = {type: target};
    }
    if (!target['@propagationStopped']) { //the most characteristic property
      Object.defineProperties(target, getDefaultDescriptor());
    }
    return target;
  };

})( exports);
});

var dispatcher = createCommonjsModule(function (module, exports) {
(function (exports) {

  if (typeof finalEvents === 'undefined') { //node environment
    exports.event = event.event;
  }

  function initHandlersForEventType(eventType, target) {
    if (!target.hasEventListener(eventType)) {
      target['@eventListeners'][eventType] = [];
    }
  }

  function addEventListener(eventType, eventHandler, useCapture) {
    if (!(eventHandler instanceof Function)) {
      throw new TypeError('eventHandler is not a function');
    }
    initHandlersForEventType(eventType, this);
    this['@eventListeners'][eventType].push({
      handler: eventHandler,
      useCapture: useCapture,
      once: false
    });
    return this;
  }

  function addOnceEventListener(eventType, eventHandler, useCapture) {
    initHandlersForEventType(eventType, this);
    this['@eventListeners'][eventType].push({
      handler: eventHandler,
      useCapture: useCapture,
      once: true
    });
    return this;
  }

  function indexOfEventHandler(eventType, eventHandler, target) {
    var eventListeners = target['@eventListeners'][eventType];

    if (!eventListeners) {
      return -1;
    }

    for (var i = 0; i < eventListeners.length; i += 1) {
      if (eventListeners[i].handler === eventHandler) {
        return i;
      }
    }

    return -1;
  }

  function removeEventListener(eventType, eventHandler) {
    var eventListeners = this['@eventListeners'][eventType];
    var index = indexOfEventHandler(eventType, eventHandler, this);

    if (index !== -1) {
      eventListeners.splice(index, 1);
    }

    return this;
  }

  function removeEventListeners(eventType) {
    this['@eventListeners'][eventType] = [];
    return this;
  }

  function hasEventListener(eventType) {
    return this['@eventListeners'][eventType] !== undefined && this['@eventListeners'][eventType].length > 0;
  }

  function callListeners(event) {
    if (event.currentTarget.hasEventListener(event.type)) {
      event.currentTarget['@eventListeners'][event.type].forEach(function forEachEventListener(listener) {
        if (listener.useCapture && event.phase !== exports.CAPTURE_PHASE) {
          return;
        }
        if (!listener.useCapture && event.phase === exports.CAPTURE_PHASE) {
          return;
        }
        listener.handler.call(event.currentTarget, event);
        if (listener.once) {
          event.currentTarget.removeEventListener(event.type, listener.handler);
        }
      });
    }
  }

  function findParents(target) {
    var parents = [];
    while (target = target.parent) {
      parents.push(target);
    }
    return parents;
  }

  function capturePhase(event) {
    var parents = findParents(event.target);
    event.phase = exports.CAPTURE_PHASE;
    while (!event['@propagationStopped'] && parents.length > 0) {
      event.currentTarget = parents.pop();
      callListeners(event);
    }
  }
  
  function targetPhase(event) {
    if (!event['@propagationStopped']) {
      event.phase = exports.TARGET_PHASE;
      event.currentTarget = event.target;
      callListeners(event);
    }
  }
  
  function bubblingPhase(event) {
    event.phase = exports.BUBBLING_PHASE;
    while (!event['@propagationStopped'] && event.currentTarget.parent) {
      event.currentTarget = event.currentTarget.parent;
      callListeners(event);
    }
  }
  
  function dispatchEvent(event) {
    event = exports.event(event);
    event.target = this;

    capturePhase(event);
    targetPhase(event);
    bubblingPhase(event);

    return this;
  }

  function getDefaultDescriptor() {
    return {
      '@eventListeners': {value: {}},
      addEventListener: {value: addEventListener},
      on: {value: addEventListener},
      once: {value: addOnceEventListener},
      removeEventListener: {value: removeEventListener},
      off: {value: removeEventListener},
      removeEventListeners: {value: removeEventListeners},
      hasEventListener: {value: hasEventListener},
      dispatchEvent: {value: dispatchEvent},
      trigger: {value: dispatchEvent},
      emit: {value: dispatchEvent},
      fire: {value: dispatchEvent}
    };
  }

  exports.dispatcher = function (target) {
    if (!target['@eventListeners']) { //the most characteristic property
      Object.defineProperties(target, getDefaultDescriptor());
    }
    return target;
  };

  exports.CAPTURE_PHASE = 1;
  exports.TARGET_PHASE = 2;
  exports.BUBBLING_PHASE = 3;

})( exports);
});

var dispatcher$1 = dispatcher.dispatcher;
var event$1 = event.event;

var initNode = {
	dispatcher: dispatcher$1,
	event: event$1
};

/**
 * @license MIT
 */



var construe = function () {
  if (arguments.length === 1) {
    return construe.defineProperties(Object.create(null), arguments[0]);
  }
  if (arguments.length === 2) {
    return construe.defineProperties(arguments[0], arguments[1]);
  }

  if (arguments.length === 3) {
    return construe.defineProperty(arguments[0], arguments[1], arguments[2]);
  }

  throw new TypeError('Expected 2 or 3 arguments got', arguments.length);
};

construe.defineProperties = function (obj, descriptorsHash) {
  Object.keys(descriptorsHash).forEach(function (key) {
    construe.defineProperty(obj, key, descriptorsHash[key]);
  });
  return obj;
};

construe.defineProperty = function (obj, propertyName, dirtyDescriptor) {
  var pure = construe.purifyDescriptor(obj, propertyName, dirtyDescriptor);
  Object.defineProperty(obj, propertyName, pure);
  return obj;
};

construe.purifyDescriptor = function (obj, propertyName, dirtyDescriptor) {
  var pure = {};

  construe.descriptors.method(obj, propertyName, dirtyDescriptor, pure);
  construe.descriptors.bindable(obj, propertyName, dirtyDescriptor, pure);
  construe.descriptors.bind(obj, propertyName, dirtyDescriptor, pure);
  construe.descriptors.bind2Way(obj, propertyName, dirtyDescriptor, pure);
  construe.descriptors.onDemand(obj, propertyName, dirtyDescriptor, pure);

  if (!pure.value && !pure.get && !pure.set && !pure.writable) {
    pure = dirtyDescriptor;
  }

  return pure;
};

construe.bind = function (obj1, var1, obj2, var2) {
  var obj2Emitter = construe.helper(obj2).getEventEmitter();

  obj2Emitter.on('propertyChange', function (event) {
    if (event.propertyName === var2) {
      obj1[var1] = obj2[var2];
    }
  });

  obj1[var1] = obj2[var2];
};

construe.bind2Way = function (obj1, var1, obj2, var2) {
  construe.bind(obj1, var1, obj2, var2);
  construe.bind(obj2, var2, obj1, var1);
};

// -----------------------------------------
// Helpers
// -----------------------------------------
construe.helper = function (obj) {
  return new construe.Helper(obj);
};

construe.Helper = function (obj) {
  this.obj = obj;
};

construe.Helper.prototype = {
  getEventEmitter: function () {
    if (!this.obj['@eventEmitter']) {
      Object.defineProperty(this.obj, '@eventEmitter', {value: initNode.dispatcher({})});
      this.obj['@eventEmitter'].target = this.obj;
    }
    return this.obj['@eventEmitter'];
  },
  getPrivates: function () {
    if (!this.obj['@private']) {
      Object.defineProperty(this.obj, '@private', {value: Object.create(null)});
    }
    return this.obj['@private'];
  }
};

// ----------------------------------------------------------------------------------
//
// Descriptors
//
// ----------------------------------------------------------------------------------
construe.descriptors = {};

// -----------------------------------------
// Bindable descriptor
// -----------------------------------------
construe.descriptors.bindable = function (obj, propertyName, dirtyDescriptor, pure) {
  pure = pure || {};

  if (dirtyDescriptor.bindable) {
    var helper = construe.helper(obj);
    var eventEmitter = helper.getEventEmitter();
    var privates = helper.getPrivates();

    if (dirtyDescriptor.value) {
      privates[propertyName] = dirtyDescriptor.value;
    }

    pure.get = construe.descriptors.bindable.getGetter(privates, propertyName, dirtyDescriptor);
    pure.set = construe.descriptors.bindable.getSetter(obj, privates, eventEmitter, propertyName, dirtyDescriptor);
  }

  return pure;
};

construe.descriptors.bindable.getGetter = function (privates, propertyName, dirtyDescriptor) {
  return dirtyDescriptor.get ? dirtyDescriptor.get : function () {
    return privates[propertyName];
  }
};

construe.descriptors.bindable.getSetter = function (obj, privates, eventEmitter, propertyName, dirtyDescriptor) {
  if (dirtyDescriptor.set) {
    return function (newVal) {
      var oldVal = obj[propertyName];

      if (oldVal !== newVal) {
        dirtyDescriptor.set.call(obj, newVal);
        eventEmitter.emit({type: 'propertyChange', propertyName: propertyName, newValue: newVal, oldValue: oldVal});
      }
    }
  } else {
    return function (newVal) {
      var oldVal = obj[propertyName];

      if (oldVal !== newVal) {
        privates[propertyName] = newVal;
        eventEmitter.emit({type: 'propertyChange', propertyName: propertyName, newValue: newVal, oldValue: oldVal});
      }
    }
  }
};

// -----------------------------------------
// Bind descriptor
// -----------------------------------------
construe.descriptors.bind = function (obj, propertyName, dirtyDescriptor, pure) {
  if (dirtyDescriptor.bind) {
    if (dirtyDescriptor.bind.length !== 2) {
      throw new TypeError('bind descriptor should be array with 2 elements: [object, "variableName"]')
    }
    construe.bind(obj, propertyName, dirtyDescriptor.bind[0], dirtyDescriptor.bind[1]);
  }

  return pure;
};

// -----------------------------------------
// Bind2Way descriptor
// -----------------------------------------
construe.descriptors.bind2Way = function (obj, propertyName, dirtyDescriptor, pure) {
  if (dirtyDescriptor.bind2Way) {
    if (dirtyDescriptor.bind2Way.length !== 2) {
      throw new TypeError('bind descriptor should be array with 2 elements: [object, "variableName"]')
    }
    if (!dirtyDescriptor.bindable) {
      dirtyDescriptor.bindable = true;
      pure = construe.descriptors.bindable(obj, propertyName, dirtyDescriptor, pure);
    }
    construe.bind2Way(obj, propertyName, dirtyDescriptor.bind2Way[0], dirtyDescriptor.bind2Way[1]);
  }
  return pure;
};


// -----------------------------------------
// Method descriptor
// -----------------------------------------
construe.descriptors.method = function (obj, propertyName, dirtyDescriptor, pure) {
  pure = pure || {};

  if (dirtyDescriptor.method instanceof Function) {
    pure.value = dirtyDescriptor.method.bind(obj);
  }
  return pure;
};

// -----------------------------------------
// OnDemand descriptor
// -----------------------------------------
construe.descriptors.onDemand = function (obj, propertyName, dirtyDescriptor, pure) {
  pure = pure || {};

  if (dirtyDescriptor.onDemand instanceof Function) {
    pure.get = function () {
      if (!obj['@' + propertyName]) {
        Object.defineProperty(obj, '@' + propertyName, {value: dirtyDescriptor.onDemand.call(obj)});
      }
      return obj['@' + propertyName];
    };
  }

  return pure;
};

// ----------------------------------------------------------------------------------
//
// Export
//
// ----------------------------------------------------------------------------------

var construe_1 = construe;

export default construe_1;
