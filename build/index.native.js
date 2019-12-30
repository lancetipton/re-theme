'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var jsutils = require('jsutils');
var reactNative = require('react-native');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var listeners = {};
var addThemeEvent = function addThemeEvent(event, listener) {
  if (!event || !jsutils.isFunc(listener)) return;
  listeners[event] = listeners[event] || [];
  listeners[event].push(listener);
  return listeners[event].length - 1;
};
var removeThemeEvent = function removeThemeEvent(event, removeListener) {
  if (!event || !listeners[event] || !removeListener && removeListener !== 0) return;
  isNum(removeListener)
  ? listeners[event].splice(removeListener, 1)
  : jsutils.isFunc(removeListener) && jsutils.isArr(listeners[event]) && (listeners[event] = listeners[event].filter(function (listener) {
    return listener !== removeListener;
  }));
};
var fireThemeEvent = function fireThemeEvent(event) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }
  jsutils.isArr(listeners[event]) && listeners[event].forEach(function (listener) {
    return listener.apply(void 0, params);
  });
};

var joinCache = {};
var checkMemoId = function checkMemoId(sources) {
  var memoId = sources.pop();
  return jsutils.isObj(memoId) ? sources.push(memoId) && false : jsutils.isStr(memoId) && memoId;
};
var hasManyFromTheme = function hasManyFromTheme(arg1, arg2) {
  return jsutils.isObj(arg1) && jsutils.isObj(arg1.RTMeta) && jsutils.isArr(arg2);
};
var joinRules = function joinRules(arg1, arg2) {
  if (jsutils.isStr(arg1)) return joinCache[arg1];
  for (var _len = arguments.length, sources = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    sources[_key - 2] = arguments[_key];
  }
  var memoId = checkMemoId(sources);
  if (memoId && joinCache[memoId]) return joinCache[memoId];
  var builtStyles = hasManyFromTheme(arg1, arg2) ? jsutils.deepMerge.apply(void 0, _toConsumableArray(arg2.map(function (arg) {
    return jsutils.isObj(arg) && arg || arg && jsutils.get(arg1, arg);
  })).concat(sources)) : jsutils.deepMerge.apply(void 0, [arg1, arg2].concat(sources));
  memoId && (joinCache[memoId] = builtStyles);
  return builtStyles;
};

var Constants = jsutils.deepFreeze({
  BUILD_EVENT: 'build',
  CHANGE_EVENT: 'change',
  RESIZE_EVENT: 'resize',
  ADD_EVENT: 'addEventListener',
  REMOVE_EVENT: 'removeEventListener',
  PLATFORM: {
    NATIVE: '$native',
    WEB: '$web',
    ALL: '$all'
  },
  CSS_UNITS: ['%', 'cm', 'ch', 'em', 'rem', 'ex', 'in', 'mm', 'pc', 'pt', 'px', 'vw', 'vh', 'vmin', 'vmax']
});

var sizeMap = {
  entries: [['xsmall', 1], ['small', 320], ['medium', 768], ['large', 1024], ['xlarge', 1366]],
  hash: {},
  indexes: {}
};
var buildSizeMapParts = function buildSizeMapParts() {
  sizeMap.indexes = sizeMap.entries.reduce(function (indexes, entry, index) {
    indexes[entry[0]] = index;
    indexes[index] = entry[0];
    sizeMap.hash[entry[0]] = entry[1];
    return indexes;
  }, {});
};
var setSizes = function setSizes(dims) {
  if (!jsutils.isObj(dims)) return jsutils.logData("setDimensions method requires an argument of type 'Object'.\nReceived: ", dims, 'error');
  jsutils.mapObj(dims, function (key, value) {
    var keyIndex = sizeMap.indexes[key];
    if (!jsutils.softFalsy(keyIndex)) return jsutils.logData("Invalid ".concat(key, " for theme size! Allowed keys are xsmall | small | medium | large | xlarge"), 'warn');
    var newSize = jsutils.toNum(dims[key]);
    if (!newSize || !sizeMap.entries[keyIndex]) return jsutils.logData("Invalid size entry. Size must be a number and the size entry must exist!", "Size: ".concat(newSize), "Entry: ".concat(sizeMap.entries[keyIndex]), 'warn');
    sizeMap.entries[keyIndex] = [key, newSize];
  });
  buildSizeMapParts();
  return sizeMap;
};
var getSize = function getSize(width) {
  var checkWidth = jsutils.isNum(width) && width || jsutils.toNum(width);
  var name = sizeMap.entries.reduce(function (updateSize, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
    checkWidth >= value
    ? updateSize
    ? value > sizeMap.hash[updateSize] && (updateSize = key)
    : updateSize = key : null;
    return updateSize;
  }, 'xsmall');
  return [name, sizeMap.hash[name]];
};
var getMergeSizes = function getMergeSizes(key) {
  return sizeMap.entries.slice(0, sizeMap.indexes[key] + 1).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        name = _ref4[0],
        size = _ref4[1];
    return name;
  });
};
buildSizeMapParts();
var getSizeMap = function getSizeMap() {
  return sizeMap;
};

var dims = reactNative.Dimensions.get("window");
var useDimensions = function useDimensions() {
  var _useState = React.useState(dims),
      _useState2 = _slicedToArray(_useState, 2),
      dimensions = _useState2[0],
      setDimensions = _useState2[1];
  var onChange = function onChange(_ref) {
    var win = _ref.window;
    var width = win.width,
        height = win.height,
        scale = win.scale,
        fontScale = win.fontScale;
    setDimensions({
      width: width,
      height: height,
      scale: scale,
      fontScale: fontScale
    });
  };
  React.useEffect(function () {
    reactNative.Dimensions.addEventListener("change", onChange);
    return function () {
      return reactNative.Dimensions.removeEventListener("change", onChange);
    };
  }, []);
  return dimensions;
};

var RePlatform = Constants.PLATFORM.NATIVE;

var noUnitRules = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};
var checkValueUnits = function checkValueUnits(key, value) {
  if (noUnitRules[key] || !jsutils.isNum(value)) return value;
  var strVal = jsutils.toStr(value);
  return Constants.CSS_UNITS.some(function (unit) {
    return strVal.indexOf(unit) !== -1;
  }) ? value : "".concat(value, "px");
};

var buildSizedThemes = function buildSizedThemes(theme, sizedTheme, size) {
  return jsutils.reduceObj(theme, function (name, value, sizedTheme) {
    if (!jsutils.isObj(value)) return sizedTheme;
    if (name === size) {
      var mergedSize = jsutils.deepMerge(sizedTheme, value);
      jsutils.unset(theme, [size]);
      return mergedSize;
    }
    var subSized = buildSizedThemes(value, sizedTheme[name] || {}, size);
    if (!jsutils.isEmpty(subSized)) sizedTheme[name] = subSized;
    return sizedTheme;
  }, sizedTheme);
};
var mergePlatformOS = function mergePlatformOS(key, theme) {
  var allTheme = theme[Constants.PLATFORM.ALL];
  var platformTheme = theme[RePlatform];
  var osTheme = theme['$' + reactNative.Platform.OS];
  return allTheme || osTheme || platformTheme ? jsutils.deepMerge({}, allTheme, platformTheme, osTheme) : theme;
};
var getPlatformTheme = function getPlatformTheme(theme) {
  if (!theme) return theme;
  return jsutils.reduceObj(theme, function (key, value, platformTheme) {
    platformTheme[key] = jsutils.isObj(value) ? getPlatformTheme(mergePlatformOS(key, value)) : checkValueUnits(key, value);
    return platformTheme;
  }, theme);
};
var restructureTheme = function restructureTheme(theme) {
  return Object.keys(getSizeMap().hash).reduce(function (updatedTheme, size) {
    var builtSize = buildSizedThemes(theme, theme[size] || {}, size);
    if (!jsutils.isEmpty(builtSize)) updatedTheme[size] = builtSize;
    return updatedTheme;
  }, getPlatformTheme(theme));
};

var joinThemeSizes = function joinThemeSizes(theme, sizeKey) {
  var extraTheme = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return jsutils.deepMerge.apply(void 0, [
  extraTheme].concat(_toConsumableArray(getMergeSizes(sizeKey).reduce(function (themes, key) {
    theme[key] && themes.push(theme[key]);
    return themes;
  }, []))));
};
var mergeWithDefault = function mergeWithDefault(theme, defaultTheme) {
  var mergedTheme = defaultTheme && theme !== defaultTheme ? jsutils.deepMerge(defaultTheme, theme) : theme;
  return restructureTheme(mergedTheme);
};
var buildTheme = function buildTheme(theme, width, height, defaultTheme) {
  if (!jsutils.isObj(theme)) return theme;
  var _getSize = getSize(width),
      _getSize2 = _slicedToArray(_getSize, 2),
      key = _getSize2[0],
      size = _getSize2[1];
  var mergedTheme = mergeWithDefault(theme, defaultTheme);
  var xsmall = mergedTheme.xsmall,
      small = mergedTheme.small,
      medium = mergedTheme.medium,
      large = mergedTheme.large,
      xlarge = mergedTheme.xlarge,
      extraTheme = _objectWithoutProperties(mergedTheme, ["xsmall", "small", "medium", "large", "xlarge"]);
  var builtTheme = size ? joinThemeSizes(theme, key, extraTheme) : extraTheme;
  builtTheme.RTMeta = {
    key: key,
    size: size,
    width: width,
    height: height,
    join: joinRules
  };
  builtTheme.join = builtTheme.join || joinRules;
  fireThemeEvent(Constants.BUILD_EVENT, builtTheme);
  return builtTheme;
};

var defaultTheme = {};
var dims$1 = reactNative.Dimensions.get("window");
var setDefaultTheme = function setDefaultTheme(theme) {
  var merge = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!jsutils.isObj(theme)) return console.warn("setDefaultTheme method requires an theme object as the first argument. Received: ", theme);
  defaultTheme = merge ? jsutils.deepMerge(defaultTheme, theme) : theme;
  var useTheme = buildTheme(defaultTheme, dims$1.width, dims$1.height);
  return useTheme;
};
var getDefaultTheme = function getDefaultTheme() {
  return defaultTheme;
};

var ReThemeContext = React__default.createContext(getDefaultTheme());

var withTheme = function withTheme(Component) {
  return function (props) {
    return React__default.createElement(ReThemeContext.Consumer, null, function (value) {
      return React__default.createElement(Component, _extends({
        theme: value
      }, props));
    });
  };
};

var dims$2 = reactNative.Dimensions.get("window");
var ReThemeProvider = function ReThemeProvider(props) {
  var children = props.children,
      theme = props.theme,
      doMerge = props.merge;
  var merge = Boolean(doMerge || !doMerge && doMerge !== false) || false;
  var _useState = React.useState(dims$2),
      _useState2 = _slicedToArray(_useState, 2),
      dimensions = _useState2[0],
      setDimensions = _useState2[1];
  var onChange = function onChange(_ref) {
    var win = _ref.window;
    var width = win.width,
        height = win.height,
        scale = win.scale,
        fontScale = win.fontScale;
    setDimensions({
      width: width,
      height: height,
      scale: scale,
      fontScale: fontScale
    });
  };
  React.useEffect(function () {
    reactNative.Dimensions.addEventListener("change", onChange);
    return function () {
      return reactNative.Dimensions.removeEventListener("change", onChange);
    };
  }, []);
  return React__default.createElement(ReThemeContext.Provider, {
    value: buildTheme(theme, dimensions.width, dimensions.height, merge && getDefaultTheme())
  }, children);
};

var useTheme = function useTheme() {
  return React.useContext(ReThemeContext);
};

var updateListeners = function updateListeners(element, type, events, methods) {
  if (!jsutils.isObj(element) || !jsutils.isFunc(element[type])) return null;
  element[type](events.on, methods.on);
  element[type](events.off, methods.off);
};
var createCBRef = function createCBRef(hookRef, events, methods, ref) {
  return React.useCallback(function (element) {
    hookRef.current && updateListeners(hookRef.current, Constants.REMOVE_EVENT, events, methods);
    hookRef.current = element;
    hookRef.current && updateListeners(hookRef.current, Constants.ADD_EVENT, events, methods);
    !hookRef.current && methods.cleanup();
  }, [methods.on, methods.off]);
};
var createMethods = function createMethods(offValue, onValue, setValue) {
  var cbWatchers = [onValue, offValue];
  return {
    off: React.useCallback(function () {
      return setValue(offValue);
    }, cbWatchers),
    on: React.useCallback(function () {
      return setValue(onValue);
    }, cbWatchers),
    cleanup: function cleanup(methods) {
      if (!methods) return;
      jsutils.isFunc(methods.on) && methods.on(undefined);
      jsutils.isFunc(methods.off) && methods.off(undefined);
      onValue = undefined;
      offValue = undefined;
      setValue = undefined;
      methods = undefined;
    }
  };
};
var getOptions = function getOptions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return options && !jsutils.isObj(options) ? {} : options;
};
var checkJoinValues = function checkJoinValues(offValue, onValue, valueOn, noMerge) {
  return noMerge || !jsutils.isColl(onValue) || !jsutils.isColl(offValue) ? valueOn : jsutils.deepMerge(offValue, onValue);
};
var hookFactory = function hookFactory(events) {
  return (
    function (offValue, onValue) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var _getOptions = getOptions(options),
          ref = _getOptions.ref,
          noMerge = _getOptions.noMerge;
      var hookRef = ref || React.useRef();
      var _useState = React.useState(offValue),
          _useState2 = _slicedToArray(_useState, 2),
          value = _useState2[0],
          setValue = _useState2[1];
      var _useState3 = React.useState(checkJoinValues(offValue, onValue, onValue, noMerge)),
          _useState4 = _slicedToArray(_useState3, 1),
          activeValue = _useState4[0];
      var elementRef = createCBRef(
      hookRef,
      events,
      createMethods(offValue, activeValue, setValue));
      if (jsutils.isFunc(ref)) {
        var useValue = offValue === value ? value
        : value === activeValue
        ? checkJoinValues(offValue, onValue, activeValue, noMerge) : offValue;
        var wrapRef = function wrapRef(element) {
          ref(element);
          elementRef(element);
        };
        return [wrapRef, useValue];
      }
      return [elementRef, value, setValue];
    }
  );
};

var useThemeHover = hookFactory({
  on: 'mouseenter',
  off: 'mouseleave'
});

var useThemeActive = hookFactory({
  on: 'mousedown',
  off: 'mouseup'
});

var useThemeFocus = hookFactory({
  on: 'focus',
  off: 'blur'
});

Object.defineProperty(exports, 'Dimensions', {
  enumerable: true,
  get: function () {
    return reactNative.Dimensions;
  }
});
exports.ReThemeContext = ReThemeContext;
exports.ReThemeProvider = ReThemeProvider;
exports.addThemeEvent = addThemeEvent;
exports.fireThemeEvent = fireThemeEvent;
exports.getDefaultTheme = getDefaultTheme;
exports.getMergeSizes = getMergeSizes;
exports.getSize = getSize;
exports.getSizeMap = getSizeMap;
exports.removeThemeEvent = removeThemeEvent;
exports.setDefaultTheme = setDefaultTheme;
exports.setSizes = setSizes;
exports.useDimensions = useDimensions;
exports.useTheme = useTheme;
exports.useThemeActive = useThemeActive;
exports.useThemeFocus = useThemeFocus;
exports.useThemeHover = useThemeHover;
exports.withTheme = withTheme;
