"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/react/cjs/react.development.js
  var require_react_development = __commonJS({
    "node_modules/react/cjs/react.development.js"(exports, module) {
      "use strict";
      (function() {
        function defineDeprecationWarning(methodName, info) {
          Object.defineProperty(Component.prototype, methodName, {
            get: function() {
              console.warn(
                "%s(...) is deprecated in plain JavaScript React classes. %s",
                info[0],
                info[1]
              );
            }
          });
        }
        function getIteratorFn(maybeIterable) {
          if (null === maybeIterable || "object" !== typeof maybeIterable)
            return null;
          maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
          return "function" === typeof maybeIterable ? maybeIterable : null;
        }
        function warnNoop(publicInstance, callerName) {
          publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
          var warningKey = publicInstance + "." + callerName;
          didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error(
            "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
            callerName,
            publicInstance
          ), didWarnStateUpdateForUnmountedComponent[warningKey] = true);
        }
        function Component(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        function ComponentDummy() {
        }
        function PureComponent(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          try {
            testStringCoercion(value);
            var JSCompiler_inline_result = false;
          } catch (e) {
            JSCompiler_inline_result = true;
          }
          if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(
              JSCompiler_inline_result,
              "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
              JSCompiler_inline_result$jscomp$0
            );
            return testStringCoercion(value);
          }
        }
        function getComponentNameFromType(type) {
          if (null == type) return null;
          if ("function" === typeof type)
            return type.$$typeof === REACT_CLIENT_REFERENCE$2 ? null : type.displayName || type.name || null;
          if ("string" === typeof type) return type;
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if ("object" === typeof type)
            switch ("number" === typeof type.tag && console.error(
              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
            ), type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                return (type.displayName || "Context") + ".Provider";
              case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
              case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
              case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                  return getComponentNameFromType(type(innerType));
                } catch (x) {
                }
            }
          return null;
        }
        function isValidElementType(type) {
          return "string" === typeof type || "function" === typeof type || type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_OFFSCREEN_TYPE || "object" === typeof type && null !== type && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_CONSUMER_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_CLIENT_REFERENCE$1 || void 0 !== type.getModuleId) ? true : false;
        }
        function disabledLog() {
        }
        function disableLogs() {
          if (0 === disabledDepth) {
            prevLog = console.log;
            prevInfo = console.info;
            prevWarn = console.warn;
            prevError = console.error;
            prevGroup = console.group;
            prevGroupCollapsed = console.groupCollapsed;
            prevGroupEnd = console.groupEnd;
            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
        function reenableLogs() {
          disabledDepth--;
          if (0 === disabledDepth) {
            var props = { configurable: true, enumerable: true, writable: true };
            Object.defineProperties(console, {
              log: assign({}, props, { value: prevLog }),
              info: assign({}, props, { value: prevInfo }),
              warn: assign({}, props, { value: prevWarn }),
              error: assign({}, props, { value: prevError }),
              group: assign({}, props, { value: prevGroup }),
              groupCollapsed: assign({}, props, { value: prevGroupCollapsed }),
              groupEnd: assign({}, props, { value: prevGroupEnd })
            });
          }
          0 > disabledDepth && console.error(
            "disabledDepth fell below zero. This is a bug in React. Please file an issue."
          );
        }
        function describeBuiltInComponentFrame(name) {
          if (void 0 === prefix)
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
              suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
            }
          return "\n" + prefix + name + suffix;
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) return "";
          var frame = componentFrameCache.get(fn);
          if (void 0 !== frame) return frame;
          reentry = true;
          frame = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher = null;
          previousDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = null;
          disableLogs();
          try {
            var RunInRootFrame = {
              DetermineComponentFrameRoot: function() {
                try {
                  if (construct) {
                    var Fake = function() {
                      throw Error();
                    };
                    Object.defineProperty(Fake.prototype, "props", {
                      set: function() {
                        throw Error();
                      }
                    });
                    if ("object" === typeof Reflect && Reflect.construct) {
                      try {
                        Reflect.construct(Fake, []);
                      } catch (x) {
                        var control = x;
                      }
                      Reflect.construct(fn, [], Fake);
                    } else {
                      try {
                        Fake.call();
                      } catch (x$0) {
                        control = x$0;
                      }
                      fn.call(Fake.prototype);
                    }
                  } else {
                    try {
                      throw Error();
                    } catch (x$1) {
                      control = x$1;
                    }
                    (Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {
                    });
                  }
                } catch (sample) {
                  if (sample && control && "string" === typeof sample.stack)
                    return [sample.stack, control.stack];
                }
                return [null, null];
              }
            };
            RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
            var namePropDescriptor = Object.getOwnPropertyDescriptor(
              RunInRootFrame.DetermineComponentFrameRoot,
              "name"
            );
            namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(
              RunInRootFrame.DetermineComponentFrameRoot,
              "name",
              { value: "DetermineComponentFrameRoot" }
            );
            var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
            if (sampleStack && controlStack) {
              var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
              for (_RunInRootFrame$Deter = namePropDescriptor = 0; namePropDescriptor < sampleLines.length && !sampleLines[namePropDescriptor].includes(
                "DetermineComponentFrameRoot"
              ); )
                namePropDescriptor++;
              for (; _RunInRootFrame$Deter < controlLines.length && !controlLines[_RunInRootFrame$Deter].includes(
                "DetermineComponentFrameRoot"
              ); )
                _RunInRootFrame$Deter++;
              if (namePropDescriptor === sampleLines.length || _RunInRootFrame$Deter === controlLines.length)
                for (namePropDescriptor = sampleLines.length - 1, _RunInRootFrame$Deter = controlLines.length - 1; 1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter && sampleLines[namePropDescriptor] !== controlLines[_RunInRootFrame$Deter]; )
                  _RunInRootFrame$Deter--;
              for (; 1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter; namePropDescriptor--, _RunInRootFrame$Deter--)
                if (sampleLines[namePropDescriptor] !== controlLines[_RunInRootFrame$Deter]) {
                  if (1 !== namePropDescriptor || 1 !== _RunInRootFrame$Deter) {
                    do
                      if (namePropDescriptor--, _RunInRootFrame$Deter--, 0 > _RunInRootFrame$Deter || sampleLines[namePropDescriptor] !== controlLines[_RunInRootFrame$Deter]) {
                        var _frame = "\n" + sampleLines[namePropDescriptor].replace(
                          " at new ",
                          " at "
                        );
                        fn.displayName && _frame.includes("<anonymous>") && (_frame = _frame.replace("<anonymous>", fn.displayName));
                        "function" === typeof fn && componentFrameCache.set(fn, _frame);
                        return _frame;
                      }
                    while (1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter);
                  }
                  break;
                }
            }
          } finally {
            reentry = false, ReactSharedInternals.H = previousDispatcher, reenableLogs(), Error.prepareStackTrace = frame;
          }
          sampleLines = (sampleLines = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(sampleLines) : "";
          "function" === typeof fn && componentFrameCache.set(fn, sampleLines);
          return sampleLines;
        }
        function describeUnknownElementTypeFrameInDEV(type) {
          if (null == type) return "";
          if ("function" === typeof type) {
            var prototype = type.prototype;
            return describeNativeComponentFrame(
              type,
              !(!prototype || !prototype.isReactComponent)
            );
          }
          if ("string" === typeof type) return describeBuiltInComponentFrame(type);
          switch (type) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if ("object" === typeof type)
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return type = describeNativeComponentFrame(type.render, false), type;
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type);
              case REACT_LAZY_TYPE:
                prototype = type._payload;
                type = type._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(type(prototype));
                } catch (x) {
                }
            }
          return "";
        }
        function getOwner() {
          var dispatcher = ReactSharedInternals.A;
          return null === dispatcher ? null : dispatcher.getOwner();
        }
        function hasValidKey(config) {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return false;
          }
          return void 0 !== config.key;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
              "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
              displayName
            ));
          }
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function elementRefGetterWithDeprecationWarning() {
          var componentName = getComponentNameFromType(this.type);
          didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
            "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
          ));
          componentName = this.props.ref;
          return void 0 !== componentName ? componentName : null;
        }
        function ReactElement(type, key, self, source, owner, props) {
          self = props.ref;
          type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            props,
            _owner: owner
          };
          null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
            enumerable: false,
            get: elementRefGetterWithDeprecationWarning
          }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
          type._store = {};
          Object.defineProperty(type._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: 0
          });
          Object.defineProperty(type, "_debugInfo", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: null
          });
          Object.freeze && (Object.freeze(type.props), Object.freeze(type));
          return type;
        }
        function cloneAndReplaceKey(oldElement, newKey) {
          newKey = ReactElement(
            oldElement.type,
            newKey,
            void 0,
            void 0,
            oldElement._owner,
            oldElement.props
          );
          newKey._store.validated = oldElement._store.validated;
          return newKey;
        }
        function validateChildKeys(node, parentType) {
          if ("object" === typeof node && node && node.$$typeof !== REACT_CLIENT_REFERENCE) {
            if (isArrayImpl(node))
              for (var i = 0; i < node.length; i++) {
                var child = node[i];
                isValidElement(child) && validateExplicitKey(child, parentType);
              }
            else if (isValidElement(node))
              node._store && (node._store.validated = 1);
            else if (i = getIteratorFn(node), "function" === typeof i && i !== node.entries && (i = i.call(node), i !== node))
              for (; !(node = i.next()).done; )
                isValidElement(node.value) && validateExplicitKey(node.value, parentType);
          }
        }
        function isValidElement(object) {
          return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function validateExplicitKey(element, parentType) {
          if (element._store && !element._store.validated && null == element.key && (element._store.validated = 1, parentType = getCurrentComponentErrorInfo(parentType), !ownerHasKeyUseWarning[parentType])) {
            ownerHasKeyUseWarning[parentType] = true;
            var childOwner = "";
            element && null != element._owner && element._owner !== getOwner() && (childOwner = null, "number" === typeof element._owner.tag ? childOwner = getComponentNameFromType(element._owner.type) : "string" === typeof element._owner.name && (childOwner = element._owner.name), childOwner = " It was passed a child from " + childOwner + ".");
            var prevGetCurrentStack = ReactSharedInternals.getCurrentStack;
            ReactSharedInternals.getCurrentStack = function() {
              var stack = describeUnknownElementTypeFrameInDEV(element.type);
              prevGetCurrentStack && (stack += prevGetCurrentStack() || "");
              return stack;
            };
            console.error(
              'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
              parentType,
              childOwner
            );
            ReactSharedInternals.getCurrentStack = prevGetCurrentStack;
          }
        }
        function getCurrentComponentErrorInfo(parentType) {
          var info = "", owner = getOwner();
          owner && (owner = getComponentNameFromType(owner.type)) && (info = "\n\nCheck the render method of `" + owner + "`.");
          info || (parentType = getComponentNameFromType(parentType)) && (info = "\n\nCheck the top-level render call using <" + parentType + ">.");
          return info;
        }
        function escape(key) {
          var escaperLookup = { "=": "=0", ":": "=2" };
          return "$" + key.replace(/[=:]/g, function(match) {
            return escaperLookup[match];
          });
        }
        function getElementKey(element, index) {
          return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
        }
        function noop$1() {
        }
        function resolveThenable(thenable) {
          switch (thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
            default:
              switch ("string" === typeof thenable.status ? thenable.then(noop$1, noop$1) : (thenable.status = "pending", thenable.then(
                function(fulfilledValue) {
                  "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
                },
                function(error) {
                  "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
                }
              )), thenable.status) {
                case "fulfilled":
                  return thenable.value;
                case "rejected":
                  throw thenable.reason;
              }
          }
          throw thenable;
        }
        function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
          var type = typeof children;
          if ("undefined" === type || "boolean" === type) children = null;
          var invokeCallback = false;
          if (null === children) invokeCallback = true;
          else
            switch (type) {
              case "bigint":
              case "string":
              case "number":
                invokeCallback = true;
                break;
              case "object":
                switch (children.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                  case REACT_PORTAL_TYPE:
                    invokeCallback = true;
                    break;
                  case REACT_LAZY_TYPE:
                    return invokeCallback = children._init, mapIntoArray(
                      invokeCallback(children._payload),
                      array,
                      escapedPrefix,
                      nameSoFar,
                      callback
                    );
                }
            }
          if (invokeCallback) {
            invokeCallback = children;
            callback = callback(invokeCallback);
            var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
            isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
              return c;
            })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(
              callback,
              escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(
                userProvidedKeyEscapeRegex,
                "$&/"
              ) + "/") + childKey
            ), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
            return 1;
          }
          invokeCallback = 0;
          childKey = "" === nameSoFar ? "." : nameSoFar + ":";
          if (isArrayImpl(children))
            for (var i = 0; i < children.length; i++)
              nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
                nameSoFar,
                array,
                escapedPrefix,
                type,
                callback
              );
          else if (i = getIteratorFn(children), "function" === typeof i)
            for (i === children.entries && (didWarnAboutMaps || console.warn(
              "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
            ), didWarnAboutMaps = true), children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
              nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
                nameSoFar,
                array,
                escapedPrefix,
                type,
                callback
              );
          else if ("object" === type) {
            if ("function" === typeof children.then)
              return mapIntoArray(
                resolveThenable(children),
                array,
                escapedPrefix,
                nameSoFar,
                callback
              );
            array = String(children);
            throw Error(
              "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
            );
          }
          return invokeCallback;
        }
        function mapChildren(children, func, context) {
          if (null == children) return children;
          var result = [], count = 0;
          mapIntoArray(children, result, "", "", function(child) {
            return func.call(context, child, count++);
          });
          return result;
        }
        function lazyInitializer(payload) {
          if (-1 === payload._status) {
            var ctor = payload._result;
            ctor = ctor();
            ctor.then(
              function(moduleObject) {
                if (0 === payload._status || -1 === payload._status)
                  payload._status = 1, payload._result = moduleObject;
              },
              function(error) {
                if (0 === payload._status || -1 === payload._status)
                  payload._status = 2, payload._result = error;
              }
            );
            -1 === payload._status && (payload._status = 0, payload._result = ctor);
          }
          if (1 === payload._status)
            return ctor = payload._result, void 0 === ctor && console.error(
              "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
              ctor
            ), "default" in ctor || console.error(
              "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
              ctor
            ), ctor.default;
          throw payload._result;
        }
        function resolveDispatcher() {
          var dispatcher = ReactSharedInternals.H;
          null === dispatcher && console.error(
            "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
          );
          return dispatcher;
        }
        function noop() {
        }
        function enqueueTask(task) {
          if (null === enqueueTaskImpl)
            try {
              var requireString = ("require" + Math.random()).slice(0, 7);
              enqueueTaskImpl = (module && module[requireString]).call(
                module,
                "timers"
              ).setImmediate;
            } catch (_err) {
              enqueueTaskImpl = function(callback) {
                false === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = true, "undefined" === typeof MessageChannel && console.error(
                  "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
                ));
                var channel = new MessageChannel();
                channel.port1.onmessage = callback;
                channel.port2.postMessage(void 0);
              };
            }
          return enqueueTaskImpl(task);
        }
        function aggregateErrors(errors) {
          return 1 < errors.length && "function" === typeof AggregateError ? new AggregateError(errors) : errors[0];
        }
        function popActScope(prevActQueue, prevActScopeDepth) {
          prevActScopeDepth !== actScopeDepth - 1 && console.error(
            "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
          );
          actScopeDepth = prevActScopeDepth;
        }
        function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
          var queue = ReactSharedInternals.actQueue;
          if (null !== queue)
            if (0 !== queue.length)
              try {
                flushActQueue(queue);
                enqueueTask(function() {
                  return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                });
                return;
              } catch (error) {
                ReactSharedInternals.thrownErrors.push(error);
              }
            else ReactSharedInternals.actQueue = null;
          0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
        }
        function flushActQueue(queue) {
          if (!isFlushing) {
            isFlushing = true;
            var i = 0;
            try {
              for (; i < queue.length; i++) {
                var callback = queue[i];
                do {
                  ReactSharedInternals.didUsePromise = false;
                  var continuation = callback(false);
                  if (null !== continuation) {
                    if (ReactSharedInternals.didUsePromise) {
                      queue[i] = callback;
                      queue.splice(0, i);
                      return;
                    }
                    callback = continuation;
                  } else break;
                } while (1);
              }
              queue.length = 0;
            } catch (error) {
              queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
            } finally {
              isFlushing = false;
            }
          }
        }
        "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
        var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        Symbol.for("react.provider");
        var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
          isMounted: function() {
            return false;
          },
          enqueueForceUpdate: function(publicInstance) {
            warnNoop(publicInstance, "forceUpdate");
          },
          enqueueReplaceState: function(publicInstance) {
            warnNoop(publicInstance, "replaceState");
          },
          enqueueSetState: function(publicInstance) {
            warnNoop(publicInstance, "setState");
          }
        }, assign = Object.assign, emptyObject = {};
        Object.freeze(emptyObject);
        Component.prototype.isReactComponent = {};
        Component.prototype.setState = function(partialState, callback) {
          if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
            throw Error(
              "takes an object of state variables to update or a function which returns an object of state variables."
            );
          this.updater.enqueueSetState(this, partialState, callback, "setState");
        };
        Component.prototype.forceUpdate = function(callback) {
          this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
        };
        var deprecatedAPIs = {
          isMounted: [
            "isMounted",
            "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
          ],
          replaceState: [
            "replaceState",
            "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
          ]
        }, fnName;
        for (fnName in deprecatedAPIs)
          deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        ComponentDummy.prototype = Component.prototype;
        deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
        deprecatedAPIs.constructor = PureComponent;
        assign(deprecatedAPIs, Component.prototype);
        deprecatedAPIs.isPureReactComponent = true;
        var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE$2 = Symbol.for("react.client.reference"), ReactSharedInternals = {
          H: null,
          A: null,
          T: null,
          S: null,
          actQueue: null,
          isBatchingLegacy: false,
          didScheduleLegacyUpdate: false,
          didUsePromise: false,
          thrownErrors: [],
          getCurrentStack: null
        }, hasOwnProperty = Object.prototype.hasOwnProperty, REACT_CLIENT_REFERENCE$1 = Symbol.for("react.client.reference"), disabledDepth = 0, prevLog, prevInfo, prevWarn, prevError, prevGroup, prevGroupCollapsed, prevGroupEnd;
        disabledLog.__reactDisabledLog = true;
        var prefix, suffix, reentry = false;
        var componentFrameCache = new ("function" === typeof WeakMap ? WeakMap : Map)();
        var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
        var didWarnAboutElementRef = {};
        var ownerHasKeyUseWarning = {}, didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
          if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
            var event = new window.ErrorEvent("error", {
              bubbles: true,
              cancelable: true,
              message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
              error
            });
            if (!window.dispatchEvent(event)) return;
          } else if ("object" === typeof process && "function" === typeof process.emit) {
            process.emit("uncaughtException", error);
            return;
          }
          console.error(error);
        }, didWarnAboutMessageChannel = false, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = false, isFlushing = false, queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function(callback) {
          queueMicrotask(function() {
            return queueMicrotask(callback);
          });
        } : enqueueTask;
        exports.Children = {
          map: mapChildren,
          forEach: function(children, forEachFunc, forEachContext) {
            mapChildren(
              children,
              function() {
                forEachFunc.apply(this, arguments);
              },
              forEachContext
            );
          },
          count: function(children) {
            var n = 0;
            mapChildren(children, function() {
              n++;
            });
            return n;
          },
          toArray: function(children) {
            return mapChildren(children, function(child) {
              return child;
            }) || [];
          },
          only: function(children) {
            if (!isValidElement(children))
              throw Error(
                "React.Children.only expected to receive a single React element child."
              );
            return children;
          }
        };
        exports.Component = Component;
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.Profiler = REACT_PROFILER_TYPE;
        exports.PureComponent = PureComponent;
        exports.StrictMode = REACT_STRICT_MODE_TYPE;
        exports.Suspense = REACT_SUSPENSE_TYPE;
        exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
        exports.act = function(callback) {
          var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
          actScopeDepth++;
          var queue = ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [], didAwaitActCall = false;
          try {
            var result = callback();
          } catch (error) {
            ReactSharedInternals.thrownErrors.push(error);
          }
          if (0 < ReactSharedInternals.thrownErrors.length)
            throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
          if (null !== result && "object" === typeof result && "function" === typeof result.then) {
            var thenable = result;
            queueSeveralMicrotasks(function() {
              didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
                "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
              ));
            });
            return {
              then: function(resolve, reject) {
                didAwaitActCall = true;
                thenable.then(
                  function(returnValue) {
                    popActScope(prevActQueue, prevActScopeDepth);
                    if (0 === prevActScopeDepth) {
                      try {
                        flushActQueue(queue), enqueueTask(function() {
                          return recursivelyFlushAsyncActWork(
                            returnValue,
                            resolve,
                            reject
                          );
                        });
                      } catch (error$2) {
                        ReactSharedInternals.thrownErrors.push(error$2);
                      }
                      if (0 < ReactSharedInternals.thrownErrors.length) {
                        var _thrownError = aggregateErrors(
                          ReactSharedInternals.thrownErrors
                        );
                        ReactSharedInternals.thrownErrors.length = 0;
                        reject(_thrownError);
                      }
                    } else resolve(returnValue);
                  },
                  function(error) {
                    popActScope(prevActQueue, prevActScopeDepth);
                    0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(
                      ReactSharedInternals.thrownErrors
                    ), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
                  }
                );
              }
            };
          }
          var returnValue$jscomp$0 = result;
          popActScope(prevActQueue, prevActScopeDepth);
          0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function() {
            didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
              "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
            ));
          }), ReactSharedInternals.actQueue = null);
          if (0 < ReactSharedInternals.thrownErrors.length)
            throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
          return {
            then: function(resolve, reject) {
              didAwaitActCall = true;
              0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
                return recursivelyFlushAsyncActWork(
                  returnValue$jscomp$0,
                  resolve,
                  reject
                );
              })) : resolve(returnValue$jscomp$0);
            }
          };
        };
        exports.cache = function(fn) {
          return function() {
            return fn.apply(null, arguments);
          };
        };
        exports.cloneElement = function(element, config, children) {
          if (null === element || void 0 === element)
            throw Error(
              "The argument must be a React element, but you passed " + element + "."
            );
          var props = assign({}, element.props), key = element.key, owner = element._owner;
          if (null != config) {
            var JSCompiler_inline_result;
            a: {
              if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(
                config,
                "ref"
              ).get) && JSCompiler_inline_result.isReactWarning) {
                JSCompiler_inline_result = false;
                break a;
              }
              JSCompiler_inline_result = void 0 !== config.ref;
            }
            JSCompiler_inline_result && (owner = getOwner());
            hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
            for (propName in config)
              !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
          }
          var propName = arguments.length - 2;
          if (1 === propName) props.children = children;
          else if (1 < propName) {
            JSCompiler_inline_result = Array(propName);
            for (var i = 0; i < propName; i++)
              JSCompiler_inline_result[i] = arguments[i + 2];
            props.children = JSCompiler_inline_result;
          }
          props = ReactElement(element.type, key, void 0, void 0, owner, props);
          for (key = 2; key < arguments.length; key++)
            validateChildKeys(arguments[key], props.type);
          return props;
        };
        exports.createContext = function(defaultValue) {
          defaultValue = {
            $$typeof: REACT_CONTEXT_TYPE,
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            _threadCount: 0,
            Provider: null,
            Consumer: null
          };
          defaultValue.Provider = defaultValue;
          defaultValue.Consumer = {
            $$typeof: REACT_CONSUMER_TYPE,
            _context: defaultValue
          };
          defaultValue._currentRenderer = null;
          defaultValue._currentRenderer2 = null;
          return defaultValue;
        };
        exports.createElement = function(type, config, children) {
          if (isValidElementType(type))
            for (var i = 2; i < arguments.length; i++)
              validateChildKeys(arguments[i], type);
          else {
            i = "";
            if (void 0 === type || "object" === typeof type && null !== type && 0 === Object.keys(type).length)
              i += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            if (null === type) var typeString = "null";
            else
              isArrayImpl(type) ? typeString = "array" : void 0 !== type && type.$$typeof === REACT_ELEMENT_TYPE ? (typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />", i = " Did you accidentally export a JSX literal instead of a component?") : typeString = typeof type;
            console.error(
              "React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
              typeString,
              i
            );
          }
          var propName;
          i = {};
          typeString = null;
          if (null != config)
            for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = true, console.warn(
              "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
            )), hasValidKey(config) && (checkKeyStringCoercion(config.key), typeString = "" + config.key), config)
              hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
          var childrenLength = arguments.length - 2;
          if (1 === childrenLength) i.children = children;
          else if (1 < childrenLength) {
            for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)
              childArray[_i] = arguments[_i + 2];
            Object.freeze && Object.freeze(childArray);
            i.children = childArray;
          }
          if (type && type.defaultProps)
            for (propName in childrenLength = type.defaultProps, childrenLength)
              void 0 === i[propName] && (i[propName] = childrenLength[propName]);
          typeString && defineKeyPropWarningGetter(
            i,
            "function" === typeof type ? type.displayName || type.name || "Unknown" : type
          );
          return ReactElement(type, typeString, void 0, void 0, getOwner(), i);
        };
        exports.createRef = function() {
          var refObject = { current: null };
          Object.seal(refObject);
          return refObject;
        };
        exports.forwardRef = function(render) {
          null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error(
            "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
          ) : "function" !== typeof render ? console.error(
            "forwardRef requires a render function but was given %s.",
            null === render ? "null" : typeof render
          ) : 0 !== render.length && 2 !== render.length && console.error(
            "forwardRef render functions accept exactly two parameters: props and ref. %s",
            1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
          );
          null != render && null != render.defaultProps && console.error(
            "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
          );
          var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render }, ownName;
          Object.defineProperty(elementType, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name;
              render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
            }
          });
          return elementType;
        };
        exports.isValidElement = isValidElement;
        exports.lazy = function(ctor) {
          return {
            $$typeof: REACT_LAZY_TYPE,
            _payload: { _status: -1, _result: ctor },
            _init: lazyInitializer
          };
        };
        exports.memo = function(type, compare) {
          isValidElementType(type) || console.error(
            "memo: The first argument must be a component. Instead received: %s",
            null === type ? "null" : typeof type
          );
          compare = {
            $$typeof: REACT_MEMO_TYPE,
            type,
            compare: void 0 === compare ? null : compare
          };
          var ownName;
          Object.defineProperty(compare, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name;
              type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
            }
          });
          return compare;
        };
        exports.startTransition = function(scope) {
          var prevTransition = ReactSharedInternals.T, currentTransition = {};
          ReactSharedInternals.T = currentTransition;
          currentTransition._updatedFibers = /* @__PURE__ */ new Set();
          try {
            var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
            null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
            "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
          } catch (error) {
            reportGlobalError(error);
          } finally {
            null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn(
              "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
            )), ReactSharedInternals.T = prevTransition;
          }
        };
        exports.unstable_useCacheRefresh = function() {
          return resolveDispatcher().useCacheRefresh();
        };
        exports.use = function(usable) {
          return resolveDispatcher().use(usable);
        };
        exports.useActionState = function(action, initialState, permalink) {
          return resolveDispatcher().useActionState(
            action,
            initialState,
            permalink
          );
        };
        exports.useCallback = function(callback, deps) {
          return resolveDispatcher().useCallback(callback, deps);
        };
        exports.useContext = function(Context) {
          var dispatcher = resolveDispatcher();
          Context.$$typeof === REACT_CONSUMER_TYPE && console.error(
            "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
          );
          return dispatcher.useContext(Context);
        };
        exports.useDebugValue = function(value, formatterFn) {
          return resolveDispatcher().useDebugValue(value, formatterFn);
        };
        exports.useDeferredValue = function(value, initialValue) {
          return resolveDispatcher().useDeferredValue(value, initialValue);
        };
        exports.useEffect = function(create, deps) {
          return resolveDispatcher().useEffect(create, deps);
        };
        exports.useId = function() {
          return resolveDispatcher().useId();
        };
        exports.useImperativeHandle = function(ref, create, deps) {
          return resolveDispatcher().useImperativeHandle(ref, create, deps);
        };
        exports.useInsertionEffect = function(create, deps) {
          return resolveDispatcher().useInsertionEffect(create, deps);
        };
        exports.useLayoutEffect = function(create, deps) {
          return resolveDispatcher().useLayoutEffect(create, deps);
        };
        exports.useMemo = function(create, deps) {
          return resolveDispatcher().useMemo(create, deps);
        };
        exports.useOptimistic = function(passthrough, reducer) {
          return resolveDispatcher().useOptimistic(passthrough, reducer);
        };
        exports.useReducer = function(reducer, initialArg, init) {
          return resolveDispatcher().useReducer(reducer, initialArg, init);
        };
        exports.useRef = function(initialValue) {
          return resolveDispatcher().useRef(initialValue);
        };
        exports.useState = function(initialState) {
          return resolveDispatcher().useState(initialState);
        };
        exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
          return resolveDispatcher().useSyncExternalStore(
            subscribe,
            getSnapshot,
            getServerSnapshot
          );
        };
        exports.useTransition = function() {
          return resolveDispatcher().useTransition();
        };
        exports.version = "19.0.0-rc-66855b96-20241106";
        "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
      })();
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_development();
      }
    }
  });

  // node_modules/react/cjs/react-jsx-runtime.development.js
  var require_react_jsx_runtime_development = __commonJS({
    "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
      "use strict";
      (function() {
        function getComponentNameFromType(type) {
          if (null == type) return null;
          if ("function" === typeof type)
            return type.$$typeof === REACT_CLIENT_REFERENCE$2 ? null : type.displayName || type.name || null;
          if ("string" === typeof type) return type;
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if ("object" === typeof type)
            switch ("number" === typeof type.tag && console.error(
              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
            ), type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                return (type.displayName || "Context") + ".Provider";
              case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
              case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
              case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                  return getComponentNameFromType(type(innerType));
                } catch (x) {
                }
            }
          return null;
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          try {
            testStringCoercion(value);
            var JSCompiler_inline_result = false;
          } catch (e) {
            JSCompiler_inline_result = true;
          }
          if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(
              JSCompiler_inline_result,
              "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
              JSCompiler_inline_result$jscomp$0
            );
            return testStringCoercion(value);
          }
        }
        function disabledLog() {
        }
        function disableLogs() {
          if (0 === disabledDepth) {
            prevLog = console.log;
            prevInfo = console.info;
            prevWarn = console.warn;
            prevError = console.error;
            prevGroup = console.group;
            prevGroupCollapsed = console.groupCollapsed;
            prevGroupEnd = console.groupEnd;
            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
        function reenableLogs() {
          disabledDepth--;
          if (0 === disabledDepth) {
            var props = { configurable: true, enumerable: true, writable: true };
            Object.defineProperties(console, {
              log: assign({}, props, { value: prevLog }),
              info: assign({}, props, { value: prevInfo }),
              warn: assign({}, props, { value: prevWarn }),
              error: assign({}, props, { value: prevError }),
              group: assign({}, props, { value: prevGroup }),
              groupCollapsed: assign({}, props, { value: prevGroupCollapsed }),
              groupEnd: assign({}, props, { value: prevGroupEnd })
            });
          }
          0 > disabledDepth && console.error(
            "disabledDepth fell below zero. This is a bug in React. Please file an issue."
          );
        }
        function describeBuiltInComponentFrame(name) {
          if (void 0 === prefix)
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
              suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
            }
          return "\n" + prefix + name + suffix;
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) return "";
          var frame = componentFrameCache.get(fn);
          if (void 0 !== frame) return frame;
          reentry = true;
          frame = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher = null;
          previousDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = null;
          disableLogs();
          try {
            var RunInRootFrame = {
              DetermineComponentFrameRoot: function() {
                try {
                  if (construct) {
                    var Fake = function() {
                      throw Error();
                    };
                    Object.defineProperty(Fake.prototype, "props", {
                      set: function() {
                        throw Error();
                      }
                    });
                    if ("object" === typeof Reflect && Reflect.construct) {
                      try {
                        Reflect.construct(Fake, []);
                      } catch (x) {
                        var control = x;
                      }
                      Reflect.construct(fn, [], Fake);
                    } else {
                      try {
                        Fake.call();
                      } catch (x$0) {
                        control = x$0;
                      }
                      fn.call(Fake.prototype);
                    }
                  } else {
                    try {
                      throw Error();
                    } catch (x$1) {
                      control = x$1;
                    }
                    (Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {
                    });
                  }
                } catch (sample) {
                  if (sample && control && "string" === typeof sample.stack)
                    return [sample.stack, control.stack];
                }
                return [null, null];
              }
            };
            RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
            var namePropDescriptor = Object.getOwnPropertyDescriptor(
              RunInRootFrame.DetermineComponentFrameRoot,
              "name"
            );
            namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(
              RunInRootFrame.DetermineComponentFrameRoot,
              "name",
              { value: "DetermineComponentFrameRoot" }
            );
            var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
            if (sampleStack && controlStack) {
              var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
              for (_RunInRootFrame$Deter = namePropDescriptor = 0; namePropDescriptor < sampleLines.length && !sampleLines[namePropDescriptor].includes(
                "DetermineComponentFrameRoot"
              ); )
                namePropDescriptor++;
              for (; _RunInRootFrame$Deter < controlLines.length && !controlLines[_RunInRootFrame$Deter].includes(
                "DetermineComponentFrameRoot"
              ); )
                _RunInRootFrame$Deter++;
              if (namePropDescriptor === sampleLines.length || _RunInRootFrame$Deter === controlLines.length)
                for (namePropDescriptor = sampleLines.length - 1, _RunInRootFrame$Deter = controlLines.length - 1; 1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter && sampleLines[namePropDescriptor] !== controlLines[_RunInRootFrame$Deter]; )
                  _RunInRootFrame$Deter--;
              for (; 1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter; namePropDescriptor--, _RunInRootFrame$Deter--)
                if (sampleLines[namePropDescriptor] !== controlLines[_RunInRootFrame$Deter]) {
                  if (1 !== namePropDescriptor || 1 !== _RunInRootFrame$Deter) {
                    do
                      if (namePropDescriptor--, _RunInRootFrame$Deter--, 0 > _RunInRootFrame$Deter || sampleLines[namePropDescriptor] !== controlLines[_RunInRootFrame$Deter]) {
                        var _frame = "\n" + sampleLines[namePropDescriptor].replace(
                          " at new ",
                          " at "
                        );
                        fn.displayName && _frame.includes("<anonymous>") && (_frame = _frame.replace("<anonymous>", fn.displayName));
                        "function" === typeof fn && componentFrameCache.set(fn, _frame);
                        return _frame;
                      }
                    while (1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter);
                  }
                  break;
                }
            }
          } finally {
            reentry = false, ReactSharedInternals.H = previousDispatcher, reenableLogs(), Error.prepareStackTrace = frame;
          }
          sampleLines = (sampleLines = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(sampleLines) : "";
          "function" === typeof fn && componentFrameCache.set(fn, sampleLines);
          return sampleLines;
        }
        function describeUnknownElementTypeFrameInDEV(type) {
          if (null == type) return "";
          if ("function" === typeof type) {
            var prototype = type.prototype;
            return describeNativeComponentFrame(
              type,
              !(!prototype || !prototype.isReactComponent)
            );
          }
          if ("string" === typeof type) return describeBuiltInComponentFrame(type);
          switch (type) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if ("object" === typeof type)
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return type = describeNativeComponentFrame(type.render, false), type;
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type);
              case REACT_LAZY_TYPE:
                prototype = type._payload;
                type = type._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(type(prototype));
                } catch (x) {
                }
            }
          return "";
        }
        function getOwner() {
          var dispatcher = ReactSharedInternals.A;
          return null === dispatcher ? null : dispatcher.getOwner();
        }
        function hasValidKey(config) {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return false;
          }
          return void 0 !== config.key;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
              "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
              displayName
            ));
          }
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function elementRefGetterWithDeprecationWarning() {
          var componentName = getComponentNameFromType(this.type);
          didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
            "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
          ));
          componentName = this.props.ref;
          return void 0 !== componentName ? componentName : null;
        }
        function ReactElement(type, key, self, source, owner, props) {
          self = props.ref;
          type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            props,
            _owner: owner
          };
          null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
            enumerable: false,
            get: elementRefGetterWithDeprecationWarning
          }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
          type._store = {};
          Object.defineProperty(type._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: 0
          });
          Object.defineProperty(type, "_debugInfo", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: null
          });
          Object.freeze && (Object.freeze(type.props), Object.freeze(type));
          return type;
        }
        function jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self) {
          if ("string" === typeof type || "function" === typeof type || type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_OFFSCREEN_TYPE || "object" === typeof type && null !== type && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_CONSUMER_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_CLIENT_REFERENCE$1 || void 0 !== type.getModuleId)) {
            var children = config.children;
            if (void 0 !== children)
              if (isStaticChildren)
                if (isArrayImpl(children)) {
                  for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
                    validateChildKeys(children[isStaticChildren], type);
                  Object.freeze && Object.freeze(children);
                } else
                  console.error(
                    "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
                  );
              else validateChildKeys(children, type);
          } else {
            children = "";
            if (void 0 === type || "object" === typeof type && null !== type && 0 === Object.keys(type).length)
              children += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            null === type ? isStaticChildren = "null" : isArrayImpl(type) ? isStaticChildren = "array" : void 0 !== type && type.$$typeof === REACT_ELEMENT_TYPE ? (isStaticChildren = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />", children = " Did you accidentally export a JSX literal instead of a component?") : isStaticChildren = typeof type;
            console.error(
              "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
              isStaticChildren,
              children
            );
          }
          if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
              return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(
              'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
              isStaticChildren,
              children,
              keys,
              children
            ), didWarnAboutKeySpread[children + isStaticChildren] = true);
          }
          children = null;
          void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
          hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
          if ("key" in config) {
            maybeKey = {};
            for (var propName in config)
              "key" !== propName && (maybeKey[propName] = config[propName]);
          } else maybeKey = config;
          children && defineKeyPropWarningGetter(
            maybeKey,
            "function" === typeof type ? type.displayName || type.name || "Unknown" : type
          );
          return ReactElement(type, children, self, source, getOwner(), maybeKey);
        }
        function validateChildKeys(node, parentType) {
          if ("object" === typeof node && node && node.$$typeof !== REACT_CLIENT_REFERENCE) {
            if (isArrayImpl(node))
              for (var i = 0; i < node.length; i++) {
                var child = node[i];
                isValidElement(child) && validateExplicitKey(child, parentType);
              }
            else if (isValidElement(node))
              node._store && (node._store.validated = 1);
            else if (null === node || "object" !== typeof node ? i = null : (i = MAYBE_ITERATOR_SYMBOL && node[MAYBE_ITERATOR_SYMBOL] || node["@@iterator"], i = "function" === typeof i ? i : null), "function" === typeof i && i !== node.entries && (i = i.call(node), i !== node))
              for (; !(node = i.next()).done; )
                isValidElement(node.value) && validateExplicitKey(node.value, parentType);
          }
        }
        function isValidElement(object) {
          return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function validateExplicitKey(element, parentType) {
          if (element._store && !element._store.validated && null == element.key && (element._store.validated = 1, parentType = getCurrentComponentErrorInfo(parentType), !ownerHasKeyUseWarning[parentType])) {
            ownerHasKeyUseWarning[parentType] = true;
            var childOwner = "";
            element && null != element._owner && element._owner !== getOwner() && (childOwner = null, "number" === typeof element._owner.tag ? childOwner = getComponentNameFromType(element._owner.type) : "string" === typeof element._owner.name && (childOwner = element._owner.name), childOwner = " It was passed a child from " + childOwner + ".");
            var prevGetCurrentStack = ReactSharedInternals.getCurrentStack;
            ReactSharedInternals.getCurrentStack = function() {
              var stack = describeUnknownElementTypeFrameInDEV(element.type);
              prevGetCurrentStack && (stack += prevGetCurrentStack() || "");
              return stack;
            };
            console.error(
              'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
              parentType,
              childOwner
            );
            ReactSharedInternals.getCurrentStack = prevGetCurrentStack;
          }
        }
        function getCurrentComponentErrorInfo(parentType) {
          var info = "", owner = getOwner();
          owner && (owner = getComponentNameFromType(owner.type)) && (info = "\n\nCheck the render method of `" + owner + "`.");
          info || (parentType = getComponentNameFromType(parentType)) && (info = "\n\nCheck the top-level render call using <" + parentType + ">.");
          return info;
        }
        var React = require_react(), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        Symbol.for("react.provider");
        var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, REACT_CLIENT_REFERENCE$2 = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, assign = Object.assign, REACT_CLIENT_REFERENCE$1 = Symbol.for("react.client.reference"), isArrayImpl = Array.isArray, disabledDepth = 0, prevLog, prevInfo, prevWarn, prevError, prevGroup, prevGroupCollapsed, prevGroupEnd;
        disabledLog.__reactDisabledLog = true;
        var prefix, suffix, reentry = false;
        var componentFrameCache = new ("function" === typeof WeakMap ? WeakMap : Map)();
        var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), specialPropKeyWarningShown;
        var didWarnAboutElementRef = {};
        var didWarnAboutKeySpread = {}, ownerHasKeyUseWarning = {};
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.jsx = function(type, config, maybeKey, source, self) {
          return jsxDEVImpl(type, config, maybeKey, false, source, self);
        };
        exports.jsxs = function(type, config, maybeKey, source, self) {
          return jsxDEVImpl(type, config, maybeKey, true, source, self);
        };
      })();
    }
  });

  // node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "node_modules/react/jsx-runtime.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_jsx_runtime_development();
      }
    }
  });

  // node_modules/@bhashaime/core/dist/index.esm.js
  var import_react = __toESM(require_react(), 1);
  var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
  var LANGUAGES = {
    gujarati: {
      name: "Gujarati",
      nativeName: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0",
      code: "gujarati",
      script: "Gujarati",
      direction: "ltr"
    },
    hindi: {
      name: "Hindi",
      nativeName: "\u0939\u093F\u0902\u0926\u0940",
      code: "hindi",
      script: "Devanagari",
      direction: "ltr"
    },
    english: {
      name: "English",
      nativeName: "English",
      code: "english",
      script: "Latin",
      direction: "ltr"
    }
  };
  var isSupportedLanguage = (code) => {
    return code in LANGUAGES;
  };
  var BhaSha = class {
    constructor() {
      this.currentLanguage = "english";
      this.supportedLanguages = [
        "english",
        "hindi",
        "gujarati"
      ];
      this.languageConfigs = {};
      this.initializeLanguageConfigs();
    }
    initializeLanguageConfigs() {
      this.languageConfigs.gujarati = {
        vowels: {
          a: { standalone: "\u0A85", matra: "" },
          // inherent vowel
          aa: { standalone: "\u0A86", matra: "\u0ABE" },
          A: { standalone: "\u0A86", matra: "\u0ABE" },
          i: { standalone: "\u0A87", matra: "\u0ABF" },
          ee: { standalone: "\u0A88", matra: "\u0AC0" },
          I: { standalone: "\u0A88", matra: "\u0AC0" },
          u: { standalone: "\u0A89", matra: "\u0AC1" },
          oo: { standalone: "\u0A8A", matra: "\u0AC2" },
          U: { standalone: "\u0A8A", matra: "\u0AC2" },
          Ru: { standalone: "\u0A8B", matra: "\u0AC3" },
          Ri: { standalone: "\u0A8B", matra: "\u0AC3" },
          RU: { standalone: "\u0AE0", matra: "\u0AC4" },
          RI: { standalone: "\u0AE0", matra: "\u0AC4" },
          "Lu-": { standalone: "\u0A8C", matra: "\u0AE2" },
          "Li-": { standalone: "\u0A8C", matra: "\u0AE2" },
          "LU-": { standalone: "\u0AE1", matra: "\u0AE3" },
          "LI-": { standalone: "\u0AE1", matra: "\u0AE3" },
          // R should only be used as matra, not standalone
          R: { standalone: "", matra: "\u0AC3" },
          // For kR → કૃ (matra only)
          E: { standalone: "\u0A8D", matra: "\u0AC5" },
          // Chandra E
          e: { standalone: "\u0A8F", matra: "\u0AC7" },
          ai: { standalone: "\u0A90", matra: "\u0AC8" },
          O: { standalone: "\u0A91", matra: "\u0AC9" },
          // Chandra O
          o: { standalone: "\u0A93", matra: "\u0ACB" },
          au: { standalone: "\u0A94", matra: "\u0ACC" },
          ou: { standalone: "\u0A94", matra: "\u0ACC" }
        },
        consonants: {
          // Special combinations MUST come first (longest first)
          chh: "\u0A9B",
          Ch: "\u0A9B",
          kh: "\u0A96",
          gh: "\u0A98",
          jh: "\u0A9D",
          Th: "\u0AA0",
          Dh: "\u0AA2",
          th: "\u0AA5",
          dh: "\u0AA7",
          ph: "\u0AAB",
          bh: "\u0AAD",
          sh: "\u0AB6",
          Sh: "\u0AB7",
          NG: "\u0A99",
          NY: "\u0A9E",
          ch: "\u0A9A",
          // Single consonants (both cases)
          K: "\u0A95",
          // uppercase K
          k: "\u0A95",
          G: "\u0A97",
          // uppercase G
          g: "\u0A97",
          C: "\u0A9A",
          J: "\u0A9C",
          // uppercase J
          j: "\u0A9C",
          z: "\u0A9D",
          // alternate for jh
          T: "\u0A9F",
          D: "\u0AA1",
          N: "\u0AA3",
          t: "\u0AA4",
          d: "\u0AA6",
          n: "\u0AA8",
          P: "\u0AAA",
          // uppercase P
          p: "\u0AAA",
          F: "\u0AAB",
          // uppercase F
          f: "\u0AAB",
          B: "\u0AAC",
          // uppercase B
          b: "\u0AAC",
          m: "\u0AAE",
          // lowercase m for consonant (not anusvara)
          Y: "\u0AAF",
          // uppercase Y
          y: "\u0AAF",
          R: "\u0AB0",
          r: "\u0AB0",
          L: "\u0AB3",
          // retroflex L
          l: "\u0AB2",
          V: "\u0AB5",
          // uppercase V
          v: "\u0AB5",
          W: "\u0AB5",
          // uppercase W
          w: "\u0AB5",
          S: "\u0AB6",
          s: "\u0AB8",
          h: "\u0AB9"
          // h for consonant (H is handled as visarga),
        },
        numbers: {
          "0": "\u0AE6",
          "1": "\u0AE7",
          "2": "\u0AE8",
          "3": "\u0AE9",
          "4": "\u0AEA",
          "5": "\u0AEB",
          "6": "\u0AEC",
          "7": "\u0AED",
          "8": "\u0AEE",
          "9": "\u0AEF"
        },
        specialChars: {
          // ZWJ/ZWNJ must come before single/double dashes
          "---": "\u200C",
          // ZWNJ (Zero Width Non-Joiner)
          "--": "\u200D",
          // ZWJ (Zero Width Joiner)
          // Special combinations
          kSh: "\u0A95\u0ACD\u0AB7",
          x: "\u0A95\u0ACD\u0AB7",
          Gn: "\u0A9C\u0ACD\u0A9E",
          Gy: "\u0A9C\u0ACD\u0A9E",
          Sr: "\u0AB6\u0ACD\u0AB0",
          // श्र combination
          // Compound vowel + anusvara/visarga patterns
          aM: "\u0A85\u0A82",
          // a + anusvara
          "a.n": "\u0A85\u0A82",
          // a + explicit anusvara
          "a.m": "\u0A85\u0A82",
          // a + explicit anusvara
          aH: "\u0A85\u0A83",
          // a + visarga
          "a:": "\u0A85\u0A83",
          // a + visarga
          // Other special chars (explicit patterns only)
          "aM-": "\u0A81",
          "M-": "\u0A81",
          M: "\u0A82",
          // standalone anusvara
          ".M": "\u0A82",
          // explicit anusvara
          ".n": "\u0A82",
          ".m": "\u0A82",
          H: "\u0A83",
          // standalone visarga
          ".H": "\u0A83",
          // explicit visarga
          ":": "\u0A83",
          "*": "\u0ABC",
          // nukta
          "*-": "*",
          ".a": "\u0ABD",
          // avagrah
          "||": "\u0965",
          "|": "\u0964",
          "Rs-": "\u0AF1",
          Rs: "\u20B9",
          OM: "\u0AD0",
          "+-": "\u5350",
          "|-": "|",
          ":-": ":"
          // Note: '.' should remain as '.' (purna viram), not '।' (danda)
          // Only '|' should be converted to '।'
        },
        virama: "\u0ACD",
        anusvara: "\u0A82",
        chandrabindu: "\u0A81",
        visarga: "\u0A83",
        nukta: "\u0ABC",
        avagrah: "\u0ABD",
        zwj: "\u200D",
        zwnj: "\u200C",
        inherentVowel: "a"
      };
      this.languageConfigs.hindi = {
        vowels: {
          a: { standalone: "\u0905", matra: "" },
          aa: { standalone: "\u0906", matra: "\u093E" },
          A: { standalone: "\u0906", matra: "\u093E" },
          i: { standalone: "\u0907", matra: "\u093F" },
          ee: { standalone: "\u0908", matra: "\u0940" },
          I: { standalone: "\u0908", matra: "\u0940" },
          u: { standalone: "\u0909", matra: "\u0941" },
          oo: { standalone: "\u090A", matra: "\u0942" },
          U: { standalone: "\u090A", matra: "\u0942" },
          e: { standalone: "\u090F", matra: "\u0947" },
          ai: { standalone: "\u0910", matra: "\u0948" },
          o: { standalone: "\u0913", matra: "\u094B" },
          au: { standalone: "\u0914", matra: "\u094C" },
          Ri: { standalone: "\u090B", matra: "\u0943" }
        },
        consonants: {
          chh: "\u091B",
          kh: "\u0916",
          gh: "\u0918",
          jh: "\u091D",
          Th: "\u0920",
          Dh: "\u0922",
          th: "\u0925",
          dh: "\u0927",
          ph: "\u092B",
          bh: "\u092D",
          sh: "\u0936",
          Sh: "\u0937",
          NG: "\u0919",
          NY: "\u091E",
          ch: "\u091A",
          k: "\u0915",
          g: "\u0917",
          j: "\u091C",
          T: "\u091F",
          D: "\u0921",
          N: "\u0923",
          t: "\u0924",
          d: "\u0926",
          n: "\u0928",
          p: "\u092A",
          b: "\u092C",
          m: "\u092E",
          y: "\u092F",
          r: "\u0930",
          l: "\u0932",
          v: "\u0935",
          w: "\u0935",
          s: "\u0938",
          h: "\u0939"
        },
        numbers: {
          "0": "\u0966",
          "1": "\u0967",
          "2": "\u0968",
          "3": "\u0969",
          "4": "\u096A",
          "5": "\u096B",
          "6": "\u096C",
          "7": "\u096D",
          "8": "\u096E",
          "9": "\u096F"
        },
        specialChars: {
          x: "\u0915\u094D\u0937",
          Gy: "\u091C\u094D\u091E",
          M: "\u0902",
          ".n": "\u0902",
          ".m": "\u0902",
          H: "\u0903",
          ":": "\u0903",
          "|": "\u0964",
          "||": "\u0965",
          Rs: "\u20B9",
          OM: "\u0950",
          "--": "\u200D",
          "---": "\u200C"
        },
        virama: "\u094D",
        anusvara: "\u0902",
        chandrabindu: "\u0901",
        visarga: "\u0903",
        nukta: "\u093C",
        avagrah: "\u093D",
        zwj: "\u200D",
        zwnj: "\u200C",
        inherentVowel: "a"
      };
    }
    // Pattern arrays (longest first for proper matching)
    getConsonantPatterns() {
      const config = this.getConfig();
      if (!config)
        return [];
      return Object.keys(config.consonants).sort((a, b) => b.length - a.length);
    }
    getVowelPatterns() {
      const config = this.getConfig();
      if (!config)
        return [];
      return Object.keys(config.vowels).sort((a, b) => b.length - a.length);
    }
    getSpecialPatterns() {
      const config = this.getConfig();
      if (!config)
        return [];
      return Object.keys(config.specialChars).sort((a, b) => b.length - a.length);
    }
    supports(lang) {
      return isSupportedLanguage(lang) && this.supportedLanguages.includes(lang);
    }
    setLanguage(lang) {
      if (this.supports(lang)) {
        this.currentLanguage = lang;
      } else {
        throw new Error(`Language '${lang}' is not supported.`);
      }
    }
    getLanguage() {
      return this.currentLanguage;
    }
    getConfig() {
      return this.languageConfigs[this.currentLanguage];
    }
    isVowel(pattern) {
      if (this.currentLanguage === "english")
        return false;
      const config = this.getConfig();
      return config && config.vowels[pattern] !== void 0;
    }
    isConsonant(pattern) {
      if (this.currentLanguage === "english")
        return false;
      const config = this.getConfig();
      return config && config.consonants[pattern] !== void 0;
    }
    getConsonant(pattern) {
      if (this.currentLanguage === "english")
        return null;
      const config = this.getConfig();
      return (config === null || config === void 0 ? void 0 : config.consonants[pattern]) || null;
    }
    getVowel(pattern, isStandalone = false) {
      if (this.currentLanguage === "english")
        return null;
      const config = this.getConfig();
      const vowelData = config === null || config === void 0 ? void 0 : config.vowels[pattern];
      if (!vowelData)
        return null;
      return isStandalone ? vowelData.standalone : vowelData.matra;
    }
    getNumber(pattern) {
      if (this.currentLanguage === "english")
        return null;
      const config = this.getConfig();
      return (config === null || config === void 0 ? void 0 : config.numbers[pattern]) || null;
    }
    getSpecialChar(pattern) {
      if (this.currentLanguage === "english")
        return null;
      const config = this.getConfig();
      return (config === null || config === void 0 ? void 0 : config.specialChars[pattern]) || null;
    }
    // Check if n/m should convert to anusvara based on following character
    shouldConvertToAnusvara(char, nextChars) {
      if (this.currentLanguage === "english")
        return false;
      const config = this.getConfig();
      if (!config)
        return false;
      if (nextChars.startsWith("-") || nextChars.startsWith("M") || nextChars.startsWith(".n") || nextChars.startsWith(".m")) {
        return false;
      }
      if (char === "n") {
        const patterns = [
          "k",
          "kh",
          "g",
          "gh",
          "ch",
          "chh",
          "Ch",
          "j",
          "jh",
          "z",
          "T",
          "Th",
          "D",
          "Dh",
          "t",
          "th",
          "d",
          "dh",
          "l",
          "sh",
          "Sh",
          "S",
          "s"
        ];
        return patterns.some((pattern) => nextChars.startsWith(pattern));
      } else if (char === "m") {
        if (nextChars.startsWith("b") || nextChars.startsWith("bh")) {
          const bPattern = nextChars.startsWith("bh") ? "bh" : "b";
          const afterB = nextChars.substring(bPattern.length);
          const isAtWordEnd = afterB === "" || /^[\s.,!?;:()]/.test(afterB);
          return isAtWordEnd;
        }
        const patterns = ["p", "ph", "f", "v", "w"];
        return patterns.some((pattern) => nextChars.startsWith(pattern));
      }
      return false;
    }
    // Main transliteration function
    transliterateText(text) {
      if (this.currentLanguage === "english")
        return text;
      const config = this.getConfig();
      if (!config)
        return text;
      let result = "";
      let i = 0;
      let hyphenBreak = false;
      while (i < text.length) {
        let found = false;
        let consumed = 0;
        for (const pattern of this.getSpecialPatterns()) {
          if (i + pattern.length <= text.length) {
            const substr = text.substring(i, i + pattern.length);
            if (substr === pattern) {
              const specialChar = this.getSpecialChar(pattern);
              if (specialChar) {
                result += specialChar;
                consumed = pattern.length;
                found = true;
                break;
              }
            }
          }
        }
        if (!found) {
          if ((text[i] === "n" || text[i] === "m") && i + 1 < text.length) {
            const remainingText = text.substring(i + 1);
            if (this.shouldConvertToAnusvara(text[i], remainingText)) {
              result += config.anusvara;
              consumed = 1;
              found = true;
            }
          }
        }
        if (!found) {
          const number = this.getNumber(text[i]);
          if (number) {
            result += number;
            consumed = 1;
            found = true;
          }
        }
        if (!found) {
          for (const pattern of this.getVowelPatterns()) {
            if (i + pattern.length <= text.length) {
              const substr = text.substring(i, i + pattern.length);
              if (substr === pattern) {
                const isVocalicConsonant = [
                  "Ru",
                  "Ri",
                  "RU",
                  "RI",
                  "Lu-",
                  "Li-",
                  "LU-",
                  "LI-"
                ].includes(pattern);
                if (isVocalicConsonant) {
                  const standaloneVowel = this.getVowel(pattern, true);
                  if (standaloneVowel) {
                    result += standaloneVowel;
                    consumed = pattern.length;
                    found = true;
                    break;
                  }
                }
              }
            }
          }
        }
        if (!found) {
          for (const pattern of this.getConsonantPatterns()) {
            if (i + pattern.length <= text.length) {
              const substr = text.substring(i, i + pattern.length);
              if (substr === pattern) {
                const consonant = this.getConsonant(pattern);
                if (consonant) {
                  result += consonant;
                  consumed = pattern.length;
                  let vowelConsumed = 0;
                  let vowelFound = false;
                  if (hyphenBreak) {
                    hyphenBreak = false;
                  } else {
                    for (const vowelPattern of this.getVowelPatterns()) {
                      if (i + consumed + vowelPattern.length <= text.length) {
                        const vowelSubstr = text.substring(i + consumed, i + consumed + vowelPattern.length);
                        if (vowelSubstr === vowelPattern) {
                          if (vowelPattern === config.inherentVowel) {
                            vowelConsumed = vowelPattern.length;
                          } else {
                            const vowelMatra = this.getVowel(vowelPattern, false);
                            if (vowelMatra) {
                              result += vowelMatra;
                              vowelConsumed = vowelPattern.length;
                            }
                          }
                          vowelFound = true;
                          break;
                        }
                      }
                    }
                  }
                  if (!vowelFound && !hyphenBreak) {
                    let nextIsConsonant = false;
                    let hasZWJ = false;
                    let hasZWNJ = false;
                    let checkPos = i + consumed;
                    if (checkPos + 3 <= text.length && text.substring(checkPos, checkPos + 3) === "---") {
                      hasZWNJ = true;
                      checkPos += 3;
                    } else if (checkPos + 2 <= text.length && text.substring(checkPos, checkPos + 2) === "--") {
                      hasZWJ = true;
                      checkPos += 2;
                    }
                    for (const nextPattern of this.getConsonantPatterns()) {
                      if (checkPos + nextPattern.length <= text.length) {
                        const nextSubstr = text.substring(checkPos, checkPos + nextPattern.length);
                        if (nextSubstr === nextPattern && this.isConsonant(nextPattern)) {
                          nextIsConsonant = true;
                          break;
                        }
                      }
                    }
                    if (nextIsConsonant && checkPos < text.length && !/[\s.,!?;-]/.test(text[checkPos])) {
                      result += config.virama;
                      if (hasZWJ) {
                        result += config.zwj;
                        consumed += 2;
                      } else if (hasZWNJ) {
                        result += config.zwnj;
                        consumed += 3;
                      }
                    }
                  }
                  consumed += vowelConsumed;
                  found = true;
                  break;
                }
              }
            }
          }
        }
        if (!found) {
          const isWordStart = i === 0 || /[\s.,!?;:()]/.test(text[i - 1]);
          const isWordEnd = i + 1 >= text.length || /[\s.,!?;:()]/.test(text[i + 1]);
          const isAfterHyphen = hyphenBreak;
          for (const pattern of this.getVowelPatterns()) {
            if (i + pattern.length <= text.length) {
              const substr = text.substring(i, i + pattern.length);
              if (substr === pattern) {
                const isVocalicConsonant = [
                  "Ru",
                  "Ri",
                  "RU",
                  "RI",
                  "Lu-",
                  "Li-",
                  "LU-",
                  "LI-"
                ].includes(pattern);
                if (isWordStart || isAfterHyphen || isWordEnd || isVocalicConsonant) {
                  const standaloneVowel = this.getVowel(pattern, true);
                  if (standaloneVowel) {
                    result += standaloneVowel;
                    consumed = pattern.length;
                    hyphenBreak = false;
                    found = true;
                    break;
                  }
                }
              }
            }
          }
        }
        if (!found) {
          if (text[i] === "-") {
            if (i === text.length - 1) {
              result += config.virama;
              consumed = 1;
              found = true;
            } else {
              const nextChar = text[i + 1];
              if (this.isVowel(nextChar) || /[aeiouAEIOU]/.test(nextChar)) {
                hyphenBreak = true;
                consumed = 1;
                found = true;
              } else if (/[\s.,!?;:()]/.test(nextChar)) {
                result += config.virama;
                consumed = 1;
                if (nextChar === " " && (i + 2 >= text.length || /[.,!?;:()]/.test(text[i + 2]))) {
                  consumed = 2;
                }
                found = true;
              } else {
                result += "-";
                consumed = 1;
                found = true;
              }
            }
          }
        }
        if (!found) {
          if (text[i] === " ") {
            result += " ";
            hyphenBreak = false;
          } else if (/[.,!?;:()]/.test(text[i])) {
            result += text[i];
            hyphenBreak = false;
          } else {
            result += text[i];
          }
          consumed = 1;
        }
        i += consumed || 1;
      }
      return result;
    }
    processInput(char) {
      if (char.length === 0)
        return { valid: false, output: "" };
      const output = this.transliterateText(char);
      return { valid: true, output };
    }
  };
  function useBhaShaIME(options = {}) {
    const { language = "gujarati", autoTransliterate = true, onTransliterationChange } = options;
    const [bhaSha] = (0, import_react.useState)(() => new BhaSha());
    const [input, setInputState] = (0, import_react.useState)("");
    const [output, setOutput] = (0, import_react.useState)("");
    const [currentLanguage, setCurrentLanguage] = (0, import_react.useState)(language);
    (0, import_react.useEffect)(() => {
      bhaSha.setLanguage(currentLanguage);
    }, [bhaSha, currentLanguage]);
    (0, import_react.useEffect)(() => {
      if (autoTransliterate && input !== "") {
        const transliterated = bhaSha.transliterateText(input);
        setOutput(transliterated);
        onTransliterationChange === null || onTransliterationChange === void 0 ? void 0 : onTransliterationChange(input, transliterated);
      } else if (input === "") {
        setOutput("");
        onTransliterationChange === null || onTransliterationChange === void 0 ? void 0 : onTransliterationChange("", "");
      }
    }, [input, autoTransliterate, bhaSha, onTransliterationChange]);
    const setInput = (0, import_react.useCallback)((text) => {
      setInputState(text);
    }, []);
    const setLanguage = (0, import_react.useCallback)((lang) => {
      setCurrentLanguage(lang);
      bhaSha.setLanguage(lang);
    }, [bhaSha]);
    const transliterate = (0, import_react.useCallback)((text) => {
      return bhaSha.transliterateText(text);
    }, [bhaSha]);
    const clear = (0, import_react.useCallback)(() => {
      setInputState("");
      setOutput("");
    }, []);
    return {
      input,
      output,
      language: currentLanguage,
      setInput,
      setLanguage,
      transliterate,
      clear,
      bhaSha
    };
  }
  var BhaShaInput = (0, import_react.forwardRef)(({ placeholder = "Type in English...", className = "", style, disabled = false, readOnly = false, showOutput = true, outputClassName = "", outputStyle, onInputChange, onOutputChange, onKeyDown, onKeyUp, onFocus, onBlur, ...hookOptions }, ref) => {
    const inputRef = (0, import_react.useRef)(null);
    const { input, output, setInput, clear: clearHook } = useBhaShaIME({
      ...hookOptions,
      onTransliterationChange: (input2, output2) => {
        onInputChange === null || onInputChange === void 0 ? void 0 : onInputChange(input2);
        onOutputChange === null || onOutputChange === void 0 ? void 0 : onOutputChange(output2);
      }
    });
    (0, import_react.useImperativeHandle)(ref, () => ({
      focus: () => {
        var _a;
        return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
      },
      blur: () => {
        var _a;
        return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
      },
      select: () => {
        var _a;
        return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.select();
      },
      setInput,
      clear: clearHook,
      getInput: () => input,
      getOutput: () => output
    }));
    const handleInputChange = (e) => {
      const value = e.target.value;
      setInput(value);
    };
    return (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: "8px" }, children: [(0, import_jsx_runtime.jsx)("input", { ref: inputRef, type: "text", value: input, onChange: handleInputChange, placeholder, className, style, disabled, readOnly, onKeyDown, onKeyUp, onFocus, onBlur }), showOutput && output && (0, import_jsx_runtime.jsx)("div", { className: outputClassName, style: {
      padding: "8px",
      border: "1px solid #e0e0e0",
      borderRadius: "4px",
      backgroundColor: "#f9f9f9",
      minHeight: "20px",
      ...outputStyle
    }, children: output })] });
  });
  BhaShaInput.displayName = "BhaShaInput";
  var BhaShaTextarea = (0, import_react.forwardRef)(({ placeholder = "Type in English...", className = "", style, disabled = false, readOnly = false, showOutput = true, outputClassName = "", outputStyle, rows = 4, cols, onInputChange, onOutputChange, onKeyDown, onKeyUp, onFocus, onBlur, ...hookOptions }, ref) => {
    const textareaRef = (0, import_react.useRef)(null);
    const { input, output, setInput, clear: clearHook } = useBhaShaIME({
      ...hookOptions,
      onTransliterationChange: (input2, output2) => {
        onInputChange === null || onInputChange === void 0 ? void 0 : onInputChange(input2);
        onOutputChange === null || onOutputChange === void 0 ? void 0 : onOutputChange(output2);
      }
    });
    (0, import_react.useImperativeHandle)(ref, () => ({
      focus: () => {
        var _a;
        return (_a = textareaRef.current) === null || _a === void 0 ? void 0 : _a.focus();
      },
      blur: () => {
        var _a;
        return (_a = textareaRef.current) === null || _a === void 0 ? void 0 : _a.blur();
      },
      select: () => {
        var _a;
        return (_a = textareaRef.current) === null || _a === void 0 ? void 0 : _a.select();
      },
      setInput,
      clear: clearHook,
      getInput: () => input,
      getOutput: () => output
    }));
    const handleInputChange = (e) => {
      const value = e.target.value;
      setInput(value);
    };
    return (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: "8px" }, children: [(0, import_jsx_runtime.jsx)("textarea", { ref: textareaRef, value: input, onChange: handleInputChange, placeholder, className, style, disabled, readOnly, rows, cols, onKeyDown, onKeyUp, onFocus, onBlur }), showOutput && output && (0, import_jsx_runtime.jsx)("div", { className: outputClassName, style: {
      padding: "8px",
      border: "1px solid #e0e0e0",
      borderRadius: "4px",
      backgroundColor: "#f9f9f9",
      minHeight: "20px",
      whiteSpace: "pre-wrap",
      ...outputStyle
    }, children: output })] });
  });
  BhaShaTextarea.displayName = "BhaShaTextarea";

  // src/lib/bhasha-ime-injector.ts
  var elementRawInputMap = /* @__PURE__ */ new WeakMap();
  var BhashaIMEInjector = class {
    constructor() {
      this.currentLanguage = "gujarati";
      this.setLanguage = (language) => {
        if (this.bhaSha.supports(language)) {
          this.currentLanguage = language;
          this.bhaSha.setLanguage(language);
          console.log(`BhaShaIME language changed to: ${language}`);
        } else {
          console.error(`BhaShaIME does not support language: ${language}`);
        }
      };
      this.handleKeyDown = (event) => {
        if (!this.isEditableElement(event.target)) return;
        const element = event.target;
        const { key } = event;
        const { selectionStart, selectionEnd } = element;
        if (selectionStart === null || selectionEnd === null) return;
        const rawInput = elementRawInputMap.get(element) || "";
        const rawStart = this.findRawPos(rawInput, selectionStart);
        const rawEnd = selectionStart === selectionEnd ? rawStart : this.findRawPos(rawInput, selectionEnd);
        if (key === "Backspace") {
          event.preventDefault();
          if (rawStart === rawEnd && rawStart > 0) {
            const newRawInput = rawInput.slice(0, rawStart - 1) + rawInput.slice(rawEnd);
            elementRawInputMap.set(element, newRawInput);
            this.handleTransliteration(element, rawStart - 1, rawStart - 1);
          } else if (rawStart < rawEnd) {
            const newRawInput = rawInput.slice(0, rawStart) + rawInput.slice(rawEnd);
            elementRawInputMap.set(element, newRawInput);
            this.handleTransliteration(element, rawStart, rawStart);
          }
        } else if (key === "Delete") {
          event.preventDefault();
          if (rawStart === rawEnd && rawEnd < rawInput.length) {
            const newRawInput = rawInput.slice(0, rawStart) + rawInput.slice(rawEnd + 1);
            elementRawInputMap.set(element, newRawInput);
            this.handleTransliteration(element, rawStart, rawStart);
          } else if (rawStart < rawEnd) {
            const newRawInput = rawInput.slice(0, rawStart) + rawInput.slice(rawEnd);
            elementRawInputMap.set(element, newRawInput);
            this.handleTransliteration(element, rawStart, rawStart);
          }
        } else if (key.length === 1 && !event.ctrlKey && !event.metaKey) {
          event.preventDefault();
          const newRawInput = rawInput.slice(0, rawStart) + key + rawInput.slice(rawEnd);
          elementRawInputMap.set(element, newRawInput);
          this.handleTransliteration(
            element,
            rawStart + key.length,
            rawStart + key.length
          );
        }
      };
      this.handlePaste = (event) => {
        if (!this.isEditableElement(event.target)) return;
        event.preventDefault();
        const element = event.target;
        const pastedText = event.clipboardData?.getData("text") || "";
        const { selectionStart, selectionEnd } = element;
        if (selectionStart === null || selectionEnd === null) return;
        const rawInput = elementRawInputMap.get(element) || "";
        const rawStart = this.findRawPos(rawInput, selectionStart);
        const rawEnd = selectionStart === selectionEnd ? rawStart : this.findRawPos(rawInput, selectionEnd);
        const newRawInput = rawInput.slice(0, rawStart) + pastedText + rawInput.slice(rawEnd);
        elementRawInputMap.set(element, newRawInput);
        this.handleTransliteration(
          element,
          rawStart + pastedText.length,
          rawStart + pastedText.length
        );
      };
      this.handleCut = (event) => {
        if (!this.isEditableElement(event.target)) return;
        event.preventDefault();
        const element = event.target;
        const { selectionStart, selectionEnd } = element;
        if (selectionStart === null || selectionEnd === null || selectionStart === selectionEnd) {
          return;
        }
        const rawInput = elementRawInputMap.get(element) || "";
        const rawStart = this.findRawPos(rawInput, selectionStart);
        const rawEnd = this.findRawPos(rawInput, selectionEnd);
        const textToCut = element.value.substring(selectionStart, selectionEnd);
        event.clipboardData?.setData("text/plain", textToCut);
        const newRawInput = rawInput.slice(0, rawStart) + rawInput.slice(rawEnd);
        elementRawInputMap.set(element, newRawInput);
        this.handleTransliteration(element, rawStart, rawStart);
      };
      this.handleTransliteration = (element, rawCursorStart = null, rawCursorEnd = null) => {
        const rawInput = elementRawInputMap.get(element) || "";
        const transliterated = this.bhaSha.transliterateText(rawInput);
        element.value = transliterated;
        if (rawCursorStart !== null) {
          const rawBeforeCursor = rawInput.slice(0, rawCursorStart);
          const transliteratedBeforeCursor = this.bhaSha.transliterateText(rawBeforeCursor);
          const transliteratedCursorPos = transliteratedBeforeCursor.length;
          const endPos = rawCursorEnd !== null && rawCursorEnd !== rawCursorStart ? this.bhaSha.transliterateText(rawInput.slice(0, rawCursorEnd)).length : transliteratedCursorPos;
          element.setSelectionRange(transliteratedCursorPos, endPos);
        }
      };
      this.bhaSha = new BhaSha();
      this.bhaSha.setLanguage(this.currentLanguage);
      this.attachEventListeners();
      console.log("BhaShaIME Injector has been initialized.");
    }
    findRawPos(rawInput, translitPos) {
      if (translitPos === 0) return 0;
      let bestPos = 0;
      for (let i = 1; i <= rawInput.length; i++) {
        const rawPrefix = rawInput.slice(0, i);
        const translitLen = this.bhaSha.transliterateText(rawPrefix).length;
        if (translitLen <= translitPos) {
          bestPos = i;
        } else {
          break;
        }
      }
      return bestPos;
    }
    attachEventListeners() {
      document.addEventListener("keydown", this.handleKeyDown, true);
      document.addEventListener("paste", this.handlePaste, true);
      document.addEventListener("cut", this.handleCut, true);
    }
    isEditableElement(element) {
      return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement;
    }
  };
  if (typeof window !== "undefined") {
    window.bhashaIME = new BhashaIMEInjector();
  }
})();
/*! Bundled license information:

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=bhasha-ime-injector.bundle.js.map
