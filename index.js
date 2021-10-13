var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/parseuri/index.js
var require_parseuri = __commonJS({
  "node_modules/parseuri/index.js"(exports, module2) {
    var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
    var parts = [
      "source",
      "protocol",
      "authority",
      "userInfo",
      "user",
      "password",
      "host",
      "port",
      "relative",
      "path",
      "directory",
      "file",
      "query",
      "anchor"
    ];
    module2.exports = function parseuri(str) {
      var src = str, b = str.indexOf("["), e = str.indexOf("]");
      if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length);
      }
      var m = re.exec(str || ""), uri = {}, i = 14;
      while (i--) {
        uri[parts[i]] = m[i] || "";
      }
      if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
        uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
        uri.ipv6uri = true;
      }
      uri.pathNames = pathNames(uri, uri["path"]);
      uri.queryKey = queryKey(uri, uri["query"]);
      return uri;
    };
    function pathNames(obj, path) {
      var regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
      if (path.substr(0, 1) == "/" || path.length === 0) {
        names.splice(0, 1);
      }
      if (path.substr(path.length - 1, 1) == "/") {
        names.splice(names.length - 1, 1);
      }
      return names;
    }
    function queryKey(uri, query) {
      var data = {};
      query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
        if ($1) {
          data[$1] = $2;
        }
      });
      return data;
    }
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse2(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
    };
    function parse2(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self = debug;
          const curr = Number(new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module2) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/has-flag/index.js"(exports, module2) {
    "use strict";
    module2.exports = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/supports-color/index.js"(exports, module2) {
    "use strict";
    var os = require("os");
    var tty = require("tty");
    var hasFlag = require_has_flag();
    var { env } = process;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream, stream && stream.isTTY);
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports, module2) {
    var tty = require("tty");
    var util = require("util");
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(() => {
    }, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} [0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return new Date().toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.format(...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports, module2) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/socket.io-client/build/url.js
var require_url = __commonJS({
  "node_modules/socket.io-client/build/url.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.url = void 0;
    var parseuri = require_parseuri();
    var debug = require_src()("socket.io-client:url");
    function url(uri, path = "", loc) {
      let obj = uri;
      loc = loc || typeof location !== "undefined" && location;
      if (uri == null)
        uri = loc.protocol + "//" + loc.host;
      if (typeof uri === "string") {
        if (uri.charAt(0) === "/") {
          if (uri.charAt(1) === "/") {
            uri = loc.protocol + uri;
          } else {
            uri = loc.host + uri;
          }
        }
        if (!/^(https?|wss?):\/\//.test(uri)) {
          debug("protocol-less url %s", uri);
          if (typeof loc !== "undefined") {
            uri = loc.protocol + "//" + uri;
          } else {
            uri = "https://" + uri;
          }
        }
        debug("parse %s", uri);
        obj = parseuri(uri);
      }
      if (!obj.port) {
        if (/^(http|ws)$/.test(obj.protocol)) {
          obj.port = "80";
        } else if (/^(http|ws)s$/.test(obj.protocol)) {
          obj.port = "443";
        }
      }
      obj.path = obj.path || "/";
      const ipv6 = obj.host.indexOf(":") !== -1;
      const host = ipv6 ? "[" + obj.host + "]" : obj.host;
      obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
      obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
      return obj;
    }
    exports.url = url;
  }
});

// node_modules/xmlhttprequest-ssl/lib/XMLHttpRequest.js
var require_XMLHttpRequest = __commonJS({
  "node_modules/xmlhttprequest-ssl/lib/XMLHttpRequest.js"(exports, module2) {
    var fs2 = require("fs");
    var Url = require("url");
    var spawn = require("child_process").spawn;
    module2.exports = XMLHttpRequest;
    XMLHttpRequest.XMLHttpRequest = XMLHttpRequest;
    function XMLHttpRequest(opts) {
      "use strict";
      opts = opts || {};
      var self = this;
      var http = require("http");
      var https = require("https");
      var request;
      var response;
      var settings = {};
      var disableHeaderCheck = false;
      var defaultHeaders = {
        "User-Agent": "node-XMLHttpRequest",
        "Accept": "*/*"
      };
      var headers = Object.assign({}, defaultHeaders);
      var forbiddenRequestHeaders = [
        "accept-charset",
        "accept-encoding",
        "access-control-request-headers",
        "access-control-request-method",
        "connection",
        "content-length",
        "content-transfer-encoding",
        "cookie",
        "cookie2",
        "date",
        "expect",
        "host",
        "keep-alive",
        "origin",
        "referer",
        "te",
        "trailer",
        "transfer-encoding",
        "upgrade",
        "via"
      ];
      var forbiddenRequestMethods = [
        "TRACE",
        "TRACK",
        "CONNECT"
      ];
      var sendFlag = false;
      var errorFlag = false;
      var abortedFlag = false;
      var listeners = {};
      this.UNSENT = 0;
      this.OPENED = 1;
      this.HEADERS_RECEIVED = 2;
      this.LOADING = 3;
      this.DONE = 4;
      this.readyState = this.UNSENT;
      this.onreadystatechange = null;
      this.responseText = "";
      this.responseXML = "";
      this.status = null;
      this.statusText = null;
      var isAllowedHttpHeader = function(header) {
        return disableHeaderCheck || header && forbiddenRequestHeaders.indexOf(header.toLowerCase()) === -1;
      };
      var isAllowedHttpMethod = function(method) {
        return method && forbiddenRequestMethods.indexOf(method) === -1;
      };
      this.open = function(method, url, async, user, password) {
        this.abort();
        errorFlag = false;
        abortedFlag = false;
        if (!isAllowedHttpMethod(method)) {
          throw new Error("SecurityError: Request method not allowed");
        }
        settings = {
          "method": method,
          "url": url.toString(),
          "async": typeof async !== "boolean" ? true : async,
          "user": user || null,
          "password": password || null
        };
        setState(this.OPENED);
      };
      this.setDisableHeaderCheck = function(state) {
        disableHeaderCheck = state;
      };
      this.setRequestHeader = function(header, value) {
        if (this.readyState != this.OPENED) {
          throw new Error("INVALID_STATE_ERR: setRequestHeader can only be called when state is OPEN");
        }
        if (!isAllowedHttpHeader(header)) {
          console.warn('Refused to set unsafe header "' + header + '"');
          return false;
        }
        if (sendFlag) {
          throw new Error("INVALID_STATE_ERR: send flag is true");
        }
        headers[header] = value;
        return true;
      };
      this.getResponseHeader = function(header) {
        if (typeof header === "string" && this.readyState > this.OPENED && response.headers[header.toLowerCase()] && !errorFlag) {
          return response.headers[header.toLowerCase()];
        }
        return null;
      };
      this.getAllResponseHeaders = function() {
        if (this.readyState < this.HEADERS_RECEIVED || errorFlag) {
          return "";
        }
        var result = "";
        for (var i in response.headers) {
          if (i !== "set-cookie" && i !== "set-cookie2") {
            result += i + ": " + response.headers[i] + "\r\n";
          }
        }
        return result.substr(0, result.length - 2);
      };
      this.getRequestHeader = function(name) {
        if (typeof name === "string" && headers[name]) {
          return headers[name];
        }
        return "";
      };
      this.send = function(data) {
        if (this.readyState != this.OPENED) {
          throw new Error("INVALID_STATE_ERR: connection must be opened before send() is called");
        }
        if (sendFlag) {
          throw new Error("INVALID_STATE_ERR: send has already been called");
        }
        var ssl = false, local = false;
        var url = Url.parse(settings.url);
        var host;
        switch (url.protocol) {
          case "https:":
            ssl = true;
          case "http:":
            host = url.hostname;
            break;
          case "file:":
            local = true;
            break;
          case void 0:
          case "":
            host = "localhost";
            break;
          default:
            throw new Error("Protocol not supported.");
        }
        if (local) {
          if (settings.method !== "GET") {
            throw new Error("XMLHttpRequest: Only GET method is supported");
          }
          if (settings.async) {
            fs2.readFile(unescape(url.pathname), "utf8", function(error, data2) {
              if (error) {
                self.handleError(error, error.errno || -1);
              } else {
                self.status = 200;
                self.responseText = data2;
                setState(self.DONE);
              }
            });
          } else {
            try {
              this.responseText = fs2.readFileSync(unescape(url.pathname), "utf8");
              this.status = 200;
              setState(self.DONE);
            } catch (e) {
              this.handleError(e, e.errno || -1);
            }
          }
          return;
        }
        var port = url.port || (ssl ? 443 : 80);
        var uri = url.pathname + (url.search ? url.search : "");
        headers["Host"] = host;
        if (!(ssl && port === 443 || port === 80)) {
          headers["Host"] += ":" + url.port;
        }
        if (settings.user) {
          if (typeof settings.password == "undefined") {
            settings.password = "";
          }
          var authBuf = new Buffer(settings.user + ":" + settings.password);
          headers["Authorization"] = "Basic " + authBuf.toString("base64");
        }
        if (settings.method === "GET" || settings.method === "HEAD") {
          data = null;
        } else if (data) {
          headers["Content-Length"] = Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data);
          if (!headers["Content-Type"]) {
            headers["Content-Type"] = "text/plain;charset=UTF-8";
          }
        } else if (settings.method === "POST") {
          headers["Content-Length"] = 0;
        }
        var agent = opts.agent || false;
        var options = {
          host,
          port,
          path: uri,
          method: settings.method,
          headers,
          agent
        };
        if (ssl) {
          options.pfx = opts.pfx;
          options.key = opts.key;
          options.passphrase = opts.passphrase;
          options.cert = opts.cert;
          options.ca = opts.ca;
          options.ciphers = opts.ciphers;
          options.rejectUnauthorized = opts.rejectUnauthorized === false ? false : true;
        }
        errorFlag = false;
        if (settings.async) {
          var doRequest = ssl ? https.request : http.request;
          sendFlag = true;
          self.dispatchEvent("readystatechange");
          var responseHandler = function(resp) {
            response = resp;
            if (response.statusCode === 302 || response.statusCode === 303 || response.statusCode === 307) {
              settings.url = response.headers.location;
              var url2 = Url.parse(settings.url);
              host = url2.hostname;
              var newOptions = {
                hostname: url2.hostname,
                port: url2.port,
                path: url2.path,
                method: response.statusCode === 303 ? "GET" : settings.method,
                headers
              };
              if (ssl) {
                newOptions.pfx = opts.pfx;
                newOptions.key = opts.key;
                newOptions.passphrase = opts.passphrase;
                newOptions.cert = opts.cert;
                newOptions.ca = opts.ca;
                newOptions.ciphers = opts.ciphers;
                newOptions.rejectUnauthorized = opts.rejectUnauthorized === false ? false : true;
              }
              request = doRequest(newOptions, responseHandler).on("error", errorHandler);
              request.end();
              return;
            }
            if (response && response.setEncoding) {
              response.setEncoding("utf8");
            }
            setState(self.HEADERS_RECEIVED);
            self.status = response.statusCode;
            response.on("data", function(chunk) {
              if (chunk) {
                self.responseText += chunk;
              }
              if (sendFlag) {
                setState(self.LOADING);
              }
            });
            response.on("end", function() {
              if (sendFlag) {
                sendFlag = false;
                setState(self.DONE);
              }
            });
            response.on("error", function(error) {
              self.handleError(error);
            });
          };
          var errorHandler = function(error) {
            self.handleError(error);
          };
          request = doRequest(options, responseHandler).on("error", errorHandler);
          if (opts.autoUnref) {
            request.on("socket", (socket) => {
              socket.unref();
            });
          }
          if (data) {
            request.write(data);
          }
          request.end();
          self.dispatchEvent("loadstart");
        } else {
          var contentFile = ".node-xmlhttprequest-content-" + process.pid;
          var syncFile = ".node-xmlhttprequest-sync-" + process.pid;
          fs2.writeFileSync(syncFile, "", "utf8");
          var execString = "var http = require('http'), https = require('https'), fs = require('fs');var doRequest = http" + (ssl ? "s" : "") + ".request;var options = " + JSON.stringify(options) + ";var responseText = '';var req = doRequest(options, function(response) {response.setEncoding('utf8');response.on('data', function(chunk) {  responseText += chunk;});response.on('end', function() {fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-STATUS:' + response.statusCode + ',' + responseText, 'utf8');fs.unlinkSync('" + syncFile + "');});response.on('error', function(error) {fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-ERROR:' + JSON.stringify(error), 'utf8');fs.unlinkSync('" + syncFile + "');});}).on('error', function(error) {fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-ERROR:' + JSON.stringify(error), 'utf8');fs.unlinkSync('" + syncFile + "');});" + (data ? "req.write('" + JSON.stringify(data).slice(1, -1).replace(/'/g, "\\'") + "');" : "") + "req.end();";
          var syncProc = spawn(process.argv[0], ["-e", execString]);
          var statusText;
          while (fs2.existsSync(syncFile)) {
          }
          self.responseText = fs2.readFileSync(contentFile, "utf8");
          syncProc.stdin.end();
          fs2.unlinkSync(contentFile);
          if (self.responseText.match(/^NODE-XMLHTTPREQUEST-ERROR:/)) {
            var errorObj = self.responseText.replace(/^NODE-XMLHTTPREQUEST-ERROR:/, "");
            self.handleError(errorObj, 503);
          } else {
            self.status = self.responseText.replace(/^NODE-XMLHTTPREQUEST-STATUS:([0-9]*),.*/, "$1");
            self.responseText = self.responseText.replace(/^NODE-XMLHTTPREQUEST-STATUS:[0-9]*,(.*)/, "$1");
            setState(self.DONE);
          }
        }
      };
      this.handleError = function(error, status) {
        this.status = status || 0;
        this.statusText = error;
        this.responseText = error.stack;
        errorFlag = true;
        setState(this.DONE);
      };
      this.abort = function() {
        if (request) {
          request.abort();
          request = null;
        }
        headers = Object.assign({}, defaultHeaders);
        this.responseText = "";
        this.responseXML = "";
        errorFlag = abortedFlag = true;
        if (this.readyState !== this.UNSENT && (this.readyState !== this.OPENED || sendFlag) && this.readyState !== this.DONE) {
          sendFlag = false;
          setState(this.DONE);
        }
        this.readyState = this.UNSENT;
      };
      this.addEventListener = function(event, callback) {
        if (!(event in listeners)) {
          listeners[event] = [];
        }
        listeners[event].push(callback);
      };
      this.removeEventListener = function(event, callback) {
        if (event in listeners) {
          listeners[event] = listeners[event].filter(function(ev) {
            return ev !== callback;
          });
        }
      };
      this.dispatchEvent = function(event) {
        if (typeof self["on" + event] === "function") {
          if (this.readyState === this.DONE)
            setImmediate(function() {
              self["on" + event]();
            });
          else
            self["on" + event]();
        }
        if (event in listeners) {
          for (let i = 0, len = listeners[event].length; i < len; i++) {
            if (this.readyState === this.DONE)
              setImmediate(function() {
                listeners[event][i].call(self);
              });
            else
              listeners[event][i].call(self);
          }
        }
      };
      var setState = function(state) {
        if (self.readyState === state || self.readyState === self.UNSENT && abortedFlag)
          return;
        self.readyState = state;
        if (settings.async || self.readyState < self.OPENED || self.readyState === self.DONE) {
          self.dispatchEvent("readystatechange");
        }
        if (self.readyState === self.DONE) {
          let fire;
          if (abortedFlag)
            fire = "abort";
          else if (errorFlag)
            fire = "error";
          else
            fire = "load";
          self.dispatchEvent(fire);
          self.dispatchEvent("loadend");
        }
      };
    }
  }
});

// node_modules/engine.io-parser/lib/commons.js
var require_commons = __commonJS({
  "node_modules/engine.io-parser/lib/commons.js"(exports, module2) {
    var PACKET_TYPES = Object.create(null);
    PACKET_TYPES["open"] = "0";
    PACKET_TYPES["close"] = "1";
    PACKET_TYPES["ping"] = "2";
    PACKET_TYPES["pong"] = "3";
    PACKET_TYPES["message"] = "4";
    PACKET_TYPES["upgrade"] = "5";
    PACKET_TYPES["noop"] = "6";
    var PACKET_TYPES_REVERSE = Object.create(null);
    Object.keys(PACKET_TYPES).forEach((key) => {
      PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
    });
    var ERROR_PACKET = { type: "error", data: "parser error" };
    module2.exports = {
      PACKET_TYPES,
      PACKET_TYPES_REVERSE,
      ERROR_PACKET
    };
  }
});

// node_modules/engine.io-parser/lib/encodePacket.js
var require_encodePacket = __commonJS({
  "node_modules/engine.io-parser/lib/encodePacket.js"(exports, module2) {
    var { PACKET_TYPES } = require_commons();
    var encodePacket = ({ type, data }, supportsBinary, callback) => {
      if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
        const buffer = toBuffer(data);
        return callback(encodeBuffer(buffer, supportsBinary));
      }
      return callback(PACKET_TYPES[type] + (data || ""));
    };
    var toBuffer = (data) => {
      if (Buffer.isBuffer(data)) {
        return data;
      } else if (data instanceof ArrayBuffer) {
        return Buffer.from(data);
      } else {
        return Buffer.from(data.buffer, data.byteOffset, data.byteLength);
      }
    };
    var encodeBuffer = (data, supportsBinary) => {
      return supportsBinary ? data : "b" + data.toString("base64");
    };
    module2.exports = encodePacket;
  }
});

// node_modules/engine.io-parser/lib/decodePacket.js
var require_decodePacket = __commonJS({
  "node_modules/engine.io-parser/lib/decodePacket.js"(exports, module2) {
    var { PACKET_TYPES_REVERSE, ERROR_PACKET } = require_commons();
    var decodePacket = (encodedPacket, binaryType) => {
      if (typeof encodedPacket !== "string") {
        return {
          type: "message",
          data: mapBinary(encodedPacket, binaryType)
        };
      }
      const type = encodedPacket.charAt(0);
      if (type === "b") {
        const buffer = Buffer.from(encodedPacket.substring(1), "base64");
        return {
          type: "message",
          data: mapBinary(buffer, binaryType)
        };
      }
      if (!PACKET_TYPES_REVERSE[type]) {
        return ERROR_PACKET;
      }
      return encodedPacket.length > 1 ? {
        type: PACKET_TYPES_REVERSE[type],
        data: encodedPacket.substring(1)
      } : {
        type: PACKET_TYPES_REVERSE[type]
      };
    };
    var mapBinary = (data, binaryType) => {
      const isBuffer = Buffer.isBuffer(data);
      switch (binaryType) {
        case "arraybuffer":
          return isBuffer ? toArrayBuffer(data) : data;
        case "nodebuffer":
        default:
          return data;
      }
    };
    var toArrayBuffer = (buffer) => {
      const arrayBuffer = new ArrayBuffer(buffer.length);
      const view = new Uint8Array(arrayBuffer);
      for (let i = 0; i < buffer.length; i++) {
        view[i] = buffer[i];
      }
      return arrayBuffer;
    };
    module2.exports = decodePacket;
  }
});

// node_modules/engine.io-parser/lib/index.js
var require_lib = __commonJS({
  "node_modules/engine.io-parser/lib/index.js"(exports, module2) {
    var encodePacket = require_encodePacket();
    var decodePacket = require_decodePacket();
    var SEPARATOR = String.fromCharCode(30);
    var encodePayload = (packets, callback) => {
      const length = packets.length;
      const encodedPackets = new Array(length);
      let count = 0;
      packets.forEach((packet, i) => {
        encodePacket(packet, false, (encodedPacket) => {
          encodedPackets[i] = encodedPacket;
          if (++count === length) {
            callback(encodedPackets.join(SEPARATOR));
          }
        });
      });
    };
    var decodePayload = (encodedPayload, binaryType) => {
      const encodedPackets = encodedPayload.split(SEPARATOR);
      const packets = [];
      for (let i = 0; i < encodedPackets.length; i++) {
        const decodedPacket = decodePacket(encodedPackets[i], binaryType);
        packets.push(decodedPacket);
        if (decodedPacket.type === "error") {
          break;
        }
      }
      return packets;
    };
    module2.exports = {
      protocol: 4,
      encodePacket,
      encodePayload,
      decodePacket,
      decodePayload
    };
  }
});

// node_modules/component-emitter/index.js
var require_component_emitter = __commonJS({
  "node_modules/component-emitter/index.js"(exports, module2) {
    if (typeof module2 !== "undefined") {
      module2.exports = Emitter;
    }
    function Emitter(obj) {
      if (obj)
        return mixin(obj);
    }
    function mixin(obj) {
      for (var key in Emitter.prototype) {
        obj[key] = Emitter.prototype[key];
      }
      return obj;
    }
    Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
      this._callbacks = this._callbacks || {};
      (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
      return this;
    };
    Emitter.prototype.once = function(event, fn) {
      function on() {
        this.off(event, on);
        fn.apply(this, arguments);
      }
      on.fn = fn;
      this.on(event, on);
      return this;
    };
    Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
      this._callbacks = this._callbacks || {};
      if (arguments.length == 0) {
        this._callbacks = {};
        return this;
      }
      var callbacks = this._callbacks["$" + event];
      if (!callbacks)
        return this;
      if (arguments.length == 1) {
        delete this._callbacks["$" + event];
        return this;
      }
      var cb;
      for (var i = 0; i < callbacks.length; i++) {
        cb = callbacks[i];
        if (cb === fn || cb.fn === fn) {
          callbacks.splice(i, 1);
          break;
        }
      }
      if (callbacks.length === 0) {
        delete this._callbacks["$" + event];
      }
      return this;
    };
    Emitter.prototype.emit = function(event) {
      this._callbacks = this._callbacks || {};
      var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
      if (callbacks) {
        callbacks = callbacks.slice(0);
        for (var i = 0, len = callbacks.length; i < len; ++i) {
          callbacks[i].apply(this, args);
        }
      }
      return this;
    };
    Emitter.prototype.listeners = function(event) {
      this._callbacks = this._callbacks || {};
      return this._callbacks["$" + event] || [];
    };
    Emitter.prototype.hasListeners = function(event) {
      return !!this.listeners(event).length;
    };
  }
});

// node_modules/engine.io-client/lib/globalThis.js
var require_globalThis = __commonJS({
  "node_modules/engine.io-client/lib/globalThis.js"(exports, module2) {
    module2.exports = global;
  }
});

// node_modules/engine.io-client/lib/util.js
var require_util = __commonJS({
  "node_modules/engine.io-client/lib/util.js"(exports, module2) {
    var globalThis = require_globalThis();
    module2.exports.pick = (obj, ...attr) => {
      return attr.reduce((acc, k) => {
        if (obj.hasOwnProperty(k)) {
          acc[k] = obj[k];
        }
        return acc;
      }, {});
    };
    var NATIVE_SET_TIMEOUT = setTimeout;
    var NATIVE_CLEAR_TIMEOUT = clearTimeout;
    module2.exports.installTimerFunctions = (obj, opts) => {
      if (opts.useNativeTimers) {
        obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThis);
        obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThis);
      } else {
        obj.setTimeoutFn = setTimeout.bind(globalThis);
        obj.clearTimeoutFn = clearTimeout.bind(globalThis);
      }
    };
  }
});

// node_modules/engine.io-client/lib/transport.js
var require_transport = __commonJS({
  "node_modules/engine.io-client/lib/transport.js"(exports, module2) {
    var parser = require_lib();
    var Emitter = require_component_emitter();
    var { installTimerFunctions } = require_util();
    var debug = require_src()("engine.io-client:transport");
    var Transport = class extends Emitter {
      constructor(opts) {
        super();
        installTimerFunctions(this, opts);
        this.opts = opts;
        this.query = opts.query;
        this.readyState = "";
        this.socket = opts.socket;
      }
      onError(msg, desc) {
        const err = new Error(msg);
        err.type = "TransportError";
        err.description = desc;
        this.emit("error", err);
        return this;
      }
      open() {
        if (this.readyState === "closed" || this.readyState === "") {
          this.readyState = "opening";
          this.doOpen();
        }
        return this;
      }
      close() {
        if (this.readyState === "opening" || this.readyState === "open") {
          this.doClose();
          this.onClose();
        }
        return this;
      }
      send(packets) {
        if (this.readyState === "open") {
          this.write(packets);
        } else {
          debug("transport is not open, discarding packets");
        }
      }
      onOpen() {
        this.readyState = "open";
        this.writable = true;
        this.emit("open");
      }
      onData(data) {
        const packet = parser.decodePacket(data, this.socket.binaryType);
        this.onPacket(packet);
      }
      onPacket(packet) {
        this.emit("packet", packet);
      }
      onClose() {
        this.readyState = "closed";
        this.emit("close");
      }
    };
    module2.exports = Transport;
  }
});

// node_modules/parseqs/index.js
var require_parseqs = __commonJS({
  "node_modules/parseqs/index.js"(exports) {
    exports.encode = function(obj) {
      var str = "";
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          if (str.length)
            str += "&";
          str += encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]);
        }
      }
      return str;
    };
    exports.decode = function(qs) {
      var qry = {};
      var pairs = qs.split("&");
      for (var i = 0, l = pairs.length; i < l; i++) {
        var pair = pairs[i].split("=");
        qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }
      return qry;
    };
  }
});

// node_modules/yeast/index.js
var require_yeast = __commonJS({
  "node_modules/yeast/index.js"(exports, module2) {
    "use strict";
    var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split("");
    var length = 64;
    var map = {};
    var seed = 0;
    var i = 0;
    var prev;
    function encode(num) {
      var encoded = "";
      do {
        encoded = alphabet[num % length] + encoded;
        num = Math.floor(num / length);
      } while (num > 0);
      return encoded;
    }
    function decode(str) {
      var decoded = 0;
      for (i = 0; i < str.length; i++) {
        decoded = decoded * length + map[str.charAt(i)];
      }
      return decoded;
    }
    function yeast() {
      var now = encode(+new Date());
      if (now !== prev)
        return seed = 0, prev = now;
      return now + "." + encode(seed++);
    }
    for (; i < length; i++)
      map[alphabet[i]] = i;
    yeast.encode = encode;
    yeast.decode = decode;
    module2.exports = yeast;
  }
});

// node_modules/engine.io-client/lib/transports/polling.js
var require_polling = __commonJS({
  "node_modules/engine.io-client/lib/transports/polling.js"(exports, module2) {
    var Transport = require_transport();
    var parseqs = require_parseqs();
    var parser = require_lib();
    var yeast = require_yeast();
    var debug = require_src()("engine.io-client:polling");
    var Polling = class extends Transport {
      get name() {
        return "polling";
      }
      doOpen() {
        this.poll();
      }
      pause(onPause) {
        this.readyState = "pausing";
        const pause = () => {
          debug("paused");
          this.readyState = "paused";
          onPause();
        };
        if (this.polling || !this.writable) {
          let total = 0;
          if (this.polling) {
            debug("we are currently polling - waiting to pause");
            total++;
            this.once("pollComplete", function() {
              debug("pre-pause polling complete");
              --total || pause();
            });
          }
          if (!this.writable) {
            debug("we are currently writing - waiting to pause");
            total++;
            this.once("drain", function() {
              debug("pre-pause writing complete");
              --total || pause();
            });
          }
        } else {
          pause();
        }
      }
      poll() {
        debug("polling");
        this.polling = true;
        this.doPoll();
        this.emit("poll");
      }
      onData(data) {
        debug("polling got data %s", data);
        const callback = (packet) => {
          if (this.readyState === "opening" && packet.type === "open") {
            this.onOpen();
          }
          if (packet.type === "close") {
            this.onClose();
            return false;
          }
          this.onPacket(packet);
        };
        parser.decodePayload(data, this.socket.binaryType).forEach(callback);
        if (this.readyState !== "closed") {
          this.polling = false;
          this.emit("pollComplete");
          if (this.readyState === "open") {
            this.poll();
          } else {
            debug('ignoring poll - transport state "%s"', this.readyState);
          }
        }
      }
      doClose() {
        const close = () => {
          debug("writing close packet");
          this.write([{ type: "close" }]);
        };
        if (this.readyState === "open") {
          debug("transport open - closing");
          close();
        } else {
          debug("transport not open - deferring close");
          this.once("open", close);
        }
      }
      write(packets) {
        this.writable = false;
        parser.encodePayload(packets, (data) => {
          this.doWrite(data, () => {
            this.writable = true;
            this.emit("drain");
          });
        });
      }
      uri() {
        let query = this.query || {};
        const schema = this.opts.secure ? "https" : "http";
        let port = "";
        if (this.opts.timestampRequests !== false) {
          query[this.opts.timestampParam] = yeast();
        }
        if (!this.supportsBinary && !query.sid) {
          query.b64 = 1;
        }
        query = parseqs.encode(query);
        if (this.opts.port && (schema === "https" && Number(this.opts.port) !== 443 || schema === "http" && Number(this.opts.port) !== 80)) {
          port = ":" + this.opts.port;
        }
        if (query.length) {
          query = "?" + query;
        }
        const ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + query;
      }
    };
    module2.exports = Polling;
  }
});

// node_modules/engine.io-client/lib/transports/polling-xhr.js
var require_polling_xhr = __commonJS({
  "node_modules/engine.io-client/lib/transports/polling-xhr.js"(exports, module2) {
    var XMLHttpRequest = require_XMLHttpRequest();
    var Polling = require_polling();
    var Emitter = require_component_emitter();
    var { pick, installTimerFunctions } = require_util();
    var globalThis = require_globalThis();
    var debug = require_src()("engine.io-client:polling-xhr");
    function empty() {
    }
    var hasXHR2 = function() {
      const xhr = new XMLHttpRequest({ xdomain: false });
      return xhr.responseType != null;
    }();
    var XHR = class extends Polling {
      constructor(opts) {
        super(opts);
        if (typeof location !== "undefined") {
          const isSSL = location.protocol === "https:";
          let port = location.port;
          if (!port) {
            port = isSSL ? 443 : 80;
          }
          this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
          this.xs = opts.secure !== isSSL;
        }
        const forceBase64 = opts && opts.forceBase64;
        this.supportsBinary = hasXHR2 && !forceBase64;
      }
      request(opts = {}) {
        Object.assign(opts, { xd: this.xd, xs: this.xs }, this.opts);
        return new Request(this.uri(), opts);
      }
      doWrite(data, fn) {
        const req = this.request({
          method: "POST",
          data
        });
        req.on("success", fn);
        req.on("error", (err) => {
          this.onError("xhr post error", err);
        });
      }
      doPoll() {
        debug("xhr poll");
        const req = this.request();
        req.on("data", this.onData.bind(this));
        req.on("error", (err) => {
          this.onError("xhr poll error", err);
        });
        this.pollXhr = req;
      }
    };
    var Request = class extends Emitter {
      constructor(uri, opts) {
        super();
        installTimerFunctions(this, opts);
        this.opts = opts;
        this.method = opts.method || "GET";
        this.uri = uri;
        this.async = opts.async !== false;
        this.data = opts.data !== void 0 ? opts.data : null;
        this.create();
      }
      create() {
        const opts = pick(this.opts, "agent", "enablesXDR", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
        opts.xdomain = !!this.opts.xd;
        opts.xscheme = !!this.opts.xs;
        const xhr = this.xhr = new XMLHttpRequest(opts);
        try {
          debug("xhr open %s: %s", this.method, this.uri);
          xhr.open(this.method, this.uri, this.async);
          try {
            if (this.opts.extraHeaders) {
              xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
              for (let i in this.opts.extraHeaders) {
                if (this.opts.extraHeaders.hasOwnProperty(i)) {
                  xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
                }
              }
            }
          } catch (e) {
          }
          if (this.method === "POST") {
            try {
              xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
            } catch (e) {
            }
          }
          try {
            xhr.setRequestHeader("Accept", "*/*");
          } catch (e) {
          }
          if ("withCredentials" in xhr) {
            xhr.withCredentials = this.opts.withCredentials;
          }
          if (this.opts.requestTimeout) {
            xhr.timeout = this.opts.requestTimeout;
          }
          if (this.hasXDR()) {
            xhr.onload = () => {
              this.onLoad();
            };
            xhr.onerror = () => {
              this.onError(xhr.responseText);
            };
          } else {
            xhr.onreadystatechange = () => {
              if (xhr.readyState !== 4)
                return;
              if (xhr.status === 200 || xhr.status === 1223) {
                this.onLoad();
              } else {
                this.setTimeoutFn(() => {
                  this.onError(typeof xhr.status === "number" ? xhr.status : 0);
                }, 0);
              }
            };
          }
          debug("xhr data %s", this.data);
          xhr.send(this.data);
        } catch (e) {
          this.setTimeoutFn(() => {
            this.onError(e);
          }, 0);
          return;
        }
        if (typeof document !== "undefined") {
          this.index = Request.requestsCount++;
          Request.requests[this.index] = this;
        }
      }
      onSuccess() {
        this.emit("success");
        this.cleanup();
      }
      onData(data) {
        this.emit("data", data);
        this.onSuccess();
      }
      onError(err) {
        this.emit("error", err);
        this.cleanup(true);
      }
      cleanup(fromError) {
        if (typeof this.xhr === "undefined" || this.xhr === null) {
          return;
        }
        if (this.hasXDR()) {
          this.xhr.onload = this.xhr.onerror = empty;
        } else {
          this.xhr.onreadystatechange = empty;
        }
        if (fromError) {
          try {
            this.xhr.abort();
          } catch (e) {
          }
        }
        if (typeof document !== "undefined") {
          delete Request.requests[this.index];
        }
        this.xhr = null;
      }
      onLoad() {
        const data = this.xhr.responseText;
        if (data !== null) {
          this.onData(data);
        }
      }
      hasXDR() {
        return typeof XDomainRequest !== "undefined" && !this.xs && this.enablesXDR;
      }
      abort() {
        this.cleanup();
      }
    };
    Request.requestsCount = 0;
    Request.requests = {};
    if (typeof document !== "undefined") {
      if (typeof attachEvent === "function") {
        attachEvent("onunload", unloadHandler);
      } else if (typeof addEventListener === "function") {
        const terminationEvent = "onpagehide" in globalThis ? "pagehide" : "unload";
        addEventListener(terminationEvent, unloadHandler, false);
      }
    }
    function unloadHandler() {
      for (let i in Request.requests) {
        if (Request.requests.hasOwnProperty(i)) {
          Request.requests[i].abort();
        }
      }
    }
    module2.exports = XHR;
    module2.exports.Request = Request;
  }
});

// node_modules/engine.io-client/lib/transports/polling-jsonp.js
var require_polling_jsonp = __commonJS({
  "node_modules/engine.io-client/lib/transports/polling-jsonp.js"(exports, module2) {
    var Polling = require_polling();
    var globalThis = require_globalThis();
    var rNewline = /\n/g;
    var rEscapedNewline = /\\n/g;
    var callbacks;
    var JSONPPolling = class extends Polling {
      constructor(opts) {
        super(opts);
        this.query = this.query || {};
        if (!callbacks) {
          callbacks = globalThis.___eio = globalThis.___eio || [];
        }
        this.index = callbacks.length;
        callbacks.push(this.onData.bind(this));
        this.query.j = this.index;
      }
      get supportsBinary() {
        return false;
      }
      doClose() {
        if (this.script) {
          this.script.onerror = () => {
          };
          this.script.parentNode.removeChild(this.script);
          this.script = null;
        }
        if (this.form) {
          this.form.parentNode.removeChild(this.form);
          this.form = null;
          this.iframe = null;
        }
        super.doClose();
      }
      doPoll() {
        const script = document.createElement("script");
        if (this.script) {
          this.script.parentNode.removeChild(this.script);
          this.script = null;
        }
        script.async = true;
        script.src = this.uri();
        script.onerror = (e) => {
          this.onError("jsonp poll error", e);
        };
        const insertAt = document.getElementsByTagName("script")[0];
        if (insertAt) {
          insertAt.parentNode.insertBefore(script, insertAt);
        } else {
          (document.head || document.body).appendChild(script);
        }
        this.script = script;
        const isUAgecko = typeof navigator !== "undefined" && /gecko/i.test(navigator.userAgent);
        if (isUAgecko) {
          this.setTimeoutFn(function() {
            const iframe = document.createElement("iframe");
            document.body.appendChild(iframe);
            document.body.removeChild(iframe);
          }, 100);
        }
      }
      doWrite(data, fn) {
        let iframe;
        if (!this.form) {
          const form = document.createElement("form");
          const area = document.createElement("textarea");
          const id = this.iframeId = "eio_iframe_" + this.index;
          form.className = "socketio";
          form.style.position = "absolute";
          form.style.top = "-1000px";
          form.style.left = "-1000px";
          form.target = id;
          form.method = "POST";
          form.setAttribute("accept-charset", "utf-8");
          area.name = "d";
          form.appendChild(area);
          document.body.appendChild(form);
          this.form = form;
          this.area = area;
        }
        this.form.action = this.uri();
        function complete() {
          initIframe();
          fn();
        }
        const initIframe = () => {
          if (this.iframe) {
            try {
              this.form.removeChild(this.iframe);
            } catch (e) {
              this.onError("jsonp polling iframe removal error", e);
            }
          }
          try {
            const html = '<iframe src="javascript:0" name="' + this.iframeId + '">';
            iframe = document.createElement(html);
          } catch (e) {
            iframe = document.createElement("iframe");
            iframe.name = this.iframeId;
            iframe.src = "javascript:0";
          }
          iframe.id = this.iframeId;
          this.form.appendChild(iframe);
          this.iframe = iframe;
        };
        initIframe();
        data = data.replace(rEscapedNewline, "\\\n");
        this.area.value = data.replace(rNewline, "\\n");
        try {
          this.form.submit();
        } catch (e) {
        }
        if (this.iframe.attachEvent) {
          this.iframe.onreadystatechange = () => {
            if (this.iframe.readyState === "complete") {
              complete();
            }
          };
        } else {
          this.iframe.onload = complete;
        }
      }
    };
    module2.exports = JSONPPolling;
  }
});

// node_modules/engine.io-client/node_modules/ws/lib/constants.js
var require_constants = __commonJS({
  "node_modules/engine.io-client/node_modules/ws/lib/constants.js"(exports, module2) {
    "use strict";
    module2.exports = {
      BINARY_TYPES: ["nodebuffer", "arraybuffer", "fragments"],
      GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
      kStatusCode: Symbol("status-code"),
      kWebSocket: Symbol("websocket"),
      EMPTY_BUFFER: Buffer.alloc(0),
      NOOP: () => {
      }
    };
  }
});

// node_modules/engine.io-client/node_modules/ws/lib/buffer-util.js
var require_buffer_util = __commonJS({
  "node_modules/engine.io-client/node_modules/ws/lib/buffer-util.js"(exports, module2) {
    "use strict";
    var { EMPTY_BUFFER } = require_constants();
    function concat(list, totalLength) {
      if (list.length === 0)
        return EMPTY_BUFFER;
      if (list.length === 1)
        return list[0];
      const target = Buffer.allocUnsafe(totalLength);
      let offset = 0;
      for (let i = 0; i < list.length; i++) {
        const buf = list[i];
        target.set(buf, offset);
        offset += buf.length;
      }
      if (offset < totalLength)
        return target.slice(0, offset);
      return target;
    }
    function _mask(source, mask, output, offset, length) {
      for (let i = 0; i < length; i++) {
        output[offset + i] = source[i] ^ mask[i & 3];
      }
    }
    function _unmask(buffer, mask) {
      const length = buffer.length;
      for (let i = 0; i < length; i++) {
        buffer[i] ^= mask[i & 3];
      }
    }
    function toArrayBuffer(buf) {
      if (buf.byteLength === buf.buffer.byteLength) {
        return buf.buffer;
      }
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    }
    function toBuffer(data) {
      toBuffer.readOnly = true;
      if (Buffer.isBuffer(data))
        return data;
      let buf;
      if (data instanceof ArrayBuffer) {
        buf = Buffer.from(data);
      } else if (ArrayBuffer.isView(data)) {
        buf = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
      } else {
        buf = Buffer.from(data);
        toBuffer.readOnly = false;
      }
      return buf;
    }
    try {
      const bufferUtil = require("bufferutil");
      const bu = bufferUtil.BufferUtil || bufferUtil;
      module2.exports = {
        concat,
        mask(source, mask, output, offset, length) {
          if (length < 48)
            _mask(source, mask, output, offset, length);
          else
            bu.mask(source, mask, output, offset, length);
        },
        toArrayBuffer,
        toBuffer,
        unmask(buffer, mask) {
          if (buffer.length < 32)
            _unmask(buffer, mask);
          else
            bu.unmask(buffer, mask);
        }
      };
    } catch (e) {
      module2.exports = {
        concat,
        mask: _mask,
        toArrayBuffer,
        toBuffer,
        unmask: _unmask
      };
    }
  }
});

// node_modules/engine.io-client/node_modules/ws/lib/limiter.js
var require_limiter = __commonJS({
  "node_modules/engine.io-client/node_modules/ws/lib/limiter.js"(exports, module2) {
    "use strict";
    var kDone = Symbol("kDone");
    var kRun = Symbol("kRun");
    var Limiter = class {
      constructor(concurrency) {
        this[kDone] = () => {
          this.pending--;
          this[kRun]();
        };
        this.concurrency = concurrency || Infinity;
        this.jobs = [];
        this.pending = 0;
      }
      add(job) {
        this.jobs.push(job);
        this[kRun]();
      }
      [kRun]() {
        if (this.pending === this.concurrency)
          return;
        if (this.jobs.length) {
          const job = this.jobs.shift();
          this.pending++;
          job(this[kDone]);
        }
      }
    };
    module2.exports = Limiter;
  }
});

// node_modules/engine.io-client/node_modules/ws/lib/permessage-deflate.js
var require_permessage_deflate = __commonJS({
  "node_modules/engine.io-client/node_modules/ws/lib/permessage-deflate.js"(exports, module2) {
    "use strict";
    var zlib = require("zlib");
    var bufferUtil = require_buffer_util();
    var Limiter = require_limiter();
    var { kStatusCode, NOOP } = require_constants();
    var TRAILER = Buffer.from([0, 0, 255, 255]);
    var kPerMessageDeflate = Symbol("permessage-deflate");
    var kTotalLength = Symbol("total-length");
    var kCallback = Symbol("callback");
    var kBuffers = Symbol("buffers");
    var kError = Symbol("error");
    var zlibLimiter;
    var PerMessageDeflate = class {
      constructor(options, isServer, maxPayload) {
        this._maxPayload = maxPayload | 0;
        this._options = options || {};
        this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024;
        this._isServer = !!isServer;
        this._deflate = null;
        this._inflate = null;
        this.params = null;
        if (!zlibLimiter) {
          const concurrency = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
          zlibLimiter = new Limiter(concurrency);
        }
      }
      static get extensionName() {
        return "permessage-deflate";
      }
      offer() {
        const params = {};
        if (this._options.serverNoContextTakeover) {
          params.server_no_context_takeover = true;
        }
        if (this._options.clientNoContextTakeover) {
          params.client_no_context_takeover = true;
        }
        if (this._options.serverMaxWindowBits) {
          params.server_max_window_bits = this._options.serverMaxWindowBits;
        }
        if (this._options.clientMaxWindowBits) {
          params.client_max_window_bits = this._options.clientMaxWindowBits;
        } else if (this._options.clientMaxWindowBits == null) {
          params.client_max_window_bits = true;
        }
        return params;
      }
      accept(configurations) {
        configurations = this.normalizeParams(configurations);
        this.params = this._isServer ? this.acceptAsServer(configurations) : this.acceptAsClient(configurations);
        return this.params;
      }
      cleanup() {
        if (this._inflate) {
          this._inflate.close();
          this._inflate = null;
        }
        if (this._deflate) {
          const callback = this._deflate[kCallback];
          this._deflate.close();
          this._deflate = null;
          if (callback) {
            callback(new Error("The deflate stream was closed while data was being processed"));
          }
        }
      }
      acceptAsServer(offers) {
        const opts = this._options;
        const accepted = offers.find((params) => {
          if (opts.serverNoContextTakeover === false && params.server_no_context_takeover || params.server_max_window_bits && (opts.serverMaxWindowBits === false || typeof opts.serverMaxWindowBits === "number" && opts.serverMaxWindowBits > params.server_max_window_bits) || typeof opts.clientMaxWindowBits === "number" && !params.client_max_window_bits) {
            return false;
          }
          return true;
        });
        if (!accepted) {
          throw new Error("None of the extension offers can be accepted");
        }
        if (opts.serverNoContextTakeover) {
          accepted.server_no_context_takeover = true;
        }
        if (opts.clientNoContextTakeover) {
          accepted.client_no_context_takeover = true;
        }
        if (typeof opts.serverMaxWindowBits === "number") {
          accepted.server_max_window_bits = opts.serverMaxWindowBits;
        }
        if (typeof opts.clientMaxWindowBits === "number") {
          accepted.client_max_window_bits = opts.clientMaxWindowBits;
        } else if (accepted.client_max_window_bits === true || opts.clientMaxWindowBits === false) {
          delete accepted.client_max_window_bits;
        }
        return accepted;
      }
      acceptAsClient(response) {
        const params = response[0];
        if (this._options.clientNoContextTakeover === false && params.client_no_context_takeover) {
          throw new Error('Unexpected parameter "client_no_context_takeover"');
        }
        if (!params.client_max_window_bits) {
          if (typeof this._options.clientMaxWindowBits === "number") {
            params.client_max_window_bits = this._options.clientMaxWindowBits;
          }
        } else if (this._options.clientMaxWindowBits === false || typeof this._options.clientMaxWindowBits === "number" && params.client_max_window_bits > this._options.clientMaxWindowBits) {
          throw new Error('Unexpected or invalid parameter "client_max_window_bits"');
        }
        return params;
      }
      normalizeParams(configurations) {
        configurations.forEach((params) => {
          Object.keys(params).forEach((key) => {
            let value = params[key];
            if (value.length > 1) {
              throw new Error(`Parameter "${key}" must have only a single value`);
            }
            value = value[0];
            if (key === "client_max_window_bits") {
              if (value !== true) {
                const num = +value;
                if (!Number.isInteger(num) || num < 8 || num > 15) {
                  throw new TypeError(`Invalid value for parameter "${key}": ${value}`);
                }
                value = num;
              } else if (!this._isServer) {
                throw new TypeError(`Invalid value for parameter "${key}": ${value}`);
              }
            } else if (key === "server_max_window_bits") {
              const num = +value;
              if (!Number.isInteger(num) || num < 8 || num > 15) {
                throw new TypeError(`Invalid value for parameter "${key}": ${value}`);
              }
              value = num;
            } else if (key === "client_no_context_takeover" || key === "server_no_context_takeover") {
              if (value !== true) {
                throw new TypeError(`Invalid value for parameter "${key}": ${value}`);
              }
            } else {
              throw new Error(`Unknown parameter "${key}"`);
            }
            params[key] = value;
          });
        });
        return configurations;
      }
      decompress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._decompress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      compress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._compress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      _decompress(data, fin, callback) {
        const endpoint = this._isServer ? "client" : "server";
        if (!this._inflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._inflate = zlib.createInflateRaw({
            ...this._options.zlibInflateOptions,
            windowBits
          });
          this._inflate[kPerMessageDeflate] = this;
          this._inflate[kTotalLength] = 0;
          this._inflate[kBuffers] = [];
          this._inflate.on("error", inflateOnError);
          this._inflate.on("data", inflateOnData);
        }
        this._inflate[kCallback] = callback;
        this._inflate.write(data);
        if (fin)
          this._inflate.write(TRAILER);
        this._inflate.flush(() => {
          const err = this._inflate[kError];
          if (err) {
            this._inflate.close();
            this._inflate = null;
            callback(err);
            return;
          }
          const data2 = bufferUtil.concat(this._inflate[kBuffers], this._inflate[kTotalLength]);
          if (this._inflate._readableState.endEmitted) {
            this._inflate.close();
            this._inflate = null;
          } else {
            this._inflate[kTotalLength] = 0;
            this._inflate[kBuffers] = [];
            if (fin && this.params[`${endpoint}_no_context_takeover`]) {
              this._inflate.reset();
            }
          }
          callback(null, data2);
        });
      }
      _compress(data, fin, callback) {
        const endpoint = this._isServer ? "server" : "client";
        if (!this._deflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._deflate = zlib.createDeflateRaw({
            ...this._options.zlibDeflateOptions,
            windowBits
          });
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          this._deflate.on("error", NOOP);
          this._deflate.on("data", deflateOnData);
        }
        this._deflate[kCallback] = callback;
        this._deflate.write(data);
        this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
          if (!this._deflate) {
            return;
          }
          let data2 = bufferUtil.concat(this._deflate[kBuffers], this._deflate[kTotalLength]);
          if (fin)
            data2 = data2.slice(0, data2.length - 4);
          this._deflate[kCallback] = null;
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          if (fin && this.params[`${endpoint}_no_context_takeover`]) {
            this._deflate.reset();
          }
          callback(null, data2);
        });
      }
    };
    module2.exports = PerMessageDeflate;
    function deflateOnData(chunk) {
      this[kBuffers].push(chunk);
      this[kTotalLength] += chunk.length;
    }
    function inflateOnData(chunk) {
      this[kTotalLength] += chunk.length;
      if (this[kPerMessageDeflate]._maxPayload < 1 || this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload) {
        this[kBuffers].push(chunk);
        return;
      }
      this[kError] = new RangeError("Max payload size exceeded");
      this[kError][kStatusCode] = 1009;
      this.removeListener("data", inflateOnData);
      this.reset();
    }
    function inflateOnError(err) {
      this[kPerMessageDeflate]._inflate = null;
      err[kStatusCode] = 1007;
      this[kCallback](err);
    }
  }
});

// node_modules/engine.io-client/node_modules/ws/lib/validation.js
var require_validation = __commonJS({
  "node_modules/engine.io-client/node_modules/ws/lib/validation.js"(exports, module2) {
    "use strict";
    function isValidStatusCode(code) {
      return code >= 1e3 && code <= 1014 && code !== 1004 && code !== 1005 && code !== 1006 || code >= 3e3 && code <= 4999;
    }
    function _isValidUTF8(buf) {
      const len = buf.length;
      let i = 0;
      while (i < len) {
        if ((buf[i] & 128) === 0) {
          i++;
        } else if ((buf[i] & 224) === 192) {
          if (i + 1 === len || (buf[i + 1] & 192) !== 128 || (buf[i] & 254) === 192) {
            return false;
          }
          i += 2;
        } else if ((buf[i] & 240) === 224) {
          if (i + 2 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || buf[i] === 224 && (buf[i + 1] & 224) === 128 || buf[i] === 237 && (buf[i + 1] & 224) === 160) {
            return false;
          }
          i += 3;
        } else if ((buf[i] & 248) === 240) {
          if (i + 3 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || (buf[i + 3] & 192) !== 128 || buf[i] === 240 && (buf[i + 1] & 240) === 128 || buf[i] === 244 && buf[i + 1] > 143 || buf[i] > 244) {
            return false;
          }
          i += 4;
        } else {
          return false;
        }
      }
      return true;
    }
    try {
      let isValidUTF8 = require("utf-8-validate");
      if (typeof isValidUTF8 === "object") {
        isValidUTF8 = isValidUTF8.Validation.isValidUTF8;
      }
      module2.exports = {
        isValidStatusCode,
        isValidUTF8(buf) {
          return buf.length < 150 ? _isValidUTF8(buf) : isValidUTF8(buf);
        }
      };
    } catch (e) {
      module2.exports = {
        isValidStatusCode,
        isValidUTF8: _isValidUTF8
      };
    }
  }
});

// node_modules/engine.io-client/node_modules/ws/lib/receiver.js
var require_receiver = __commonJS({
  "node_modules/engine.io-client/node_modules/ws/lib/receiver.js"(exports, module2) {
    "use strict";
    var { Writable } = require("stream");
    var PerMessageDeflate = require_permessage_deflate();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER,
      kStatusCode,
      kWebSocket
    } = require_constants();
    var { concat, toArrayBuffer, unmask } = require_buffer_util();
    var { isValidStatusCode, isValidUTF8 } = require_validation();
    var GET_INFO = 0;
    var GET_PAYLOAD_LENGTH_16 = 1;
    var GET_PAYLOAD_LENGTH_64 = 2;
    var GET_MASK = 3;
    var GET_DATA = 4;
    var INFLATING = 5;
    var Receiver = class extends Writable {
      constructor(binaryType, extensions, isServer, maxPayload) {
        super();
        this._binaryType = binaryType || BINARY_TYPES[0];
        this[kWebSocket] = void 0;
        this._extensions = extensions || {};
        this._isServer = !!isServer;
        this._maxPayload = maxPayload | 0;
        this._bufferedBytes = 0;
        this._buffers = [];
        this._compressed = false;
        this._payloadLength = 0;
        this._mask = void 0;
        this._fragmented = 0;
        this._masked = false;
        this._fin = false;
        this._opcode = 0;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragments = [];
        this._state = GET_INFO;
        this._loop = false;
      }
      _write(chunk, encoding, cb) {
        if (this._opcode === 8 && this._state == GET_INFO)
          return cb();
        this._bufferedBytes += chunk.length;
        this._buffers.push(chunk);
        this.startLoop(cb);
      }
      consume(n) {
        this._bufferedBytes -= n;
        if (n === this._buffers[0].length)
          return this._buffers.shift();
        if (n < this._buffers[0].length) {
          const buf = this._buffers[0];
          this._buffers[0] = buf.slice(n);
          return buf.slice(0, n);
        }
        const dst = Buffer.allocUnsafe(n);
        do {
          const buf = this._buffers[0];
          const offset = dst.length - n;
          if (n >= buf.length) {
            dst.set(this._buffers.shift(), offset);
          } else {
            dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
            this._buffers[0] = buf.slice(n);
          }
          n -= buf.length;
        } while (n > 0);
        return dst;
      }
      startLoop(cb) {
        let err;
        this._loop = true;
        do {
          switch (this._state) {
            case GET_INFO:
              err = this.getInfo();
              break;
            case GET_PAYLOAD_LENGTH_16:
              err = this.getPayloadLength16();
              break;
            case GET_PAYLOAD_LENGTH_64:
              err = this.getPayloadLength64();
              break;
            case GET_MASK:
              this.getMask();
              break;
            case GET_DATA:
              err = this.getData(cb);
              break;
            default:
              this._loop = false;
              return;
          }
        } while (this._loop);
        cb(err);
      }
      getInfo() {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        const buf = this.consume(2);
        if ((buf[0] & 48) !== 0) {
          this._loop = false;
          return error(RangeError, "RSV2 and RSV3 must be clear", true, 1002);
        }
        const compressed = (buf[0] & 64) === 64;
        if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
          this._loop = false;
          return error(RangeError, "RSV1 must be clear", true, 1002);
        }
        this._fin = (buf[0] & 128) === 128;
        this._opcode = buf[0] & 15;
        this._payloadLength = buf[1] & 127;
        if (this._opcode === 0) {
          if (compressed) {
            this._loop = false;
            return error(RangeError, "RSV1 must be clear", true, 1002);
          }
          if (!this._fragmented) {
            this._loop = false;
            return error(RangeError, "invalid opcode 0", true, 1002);
          }
          this._opcode = this._fragmented;
        } else if (this._opcode === 1 || this._opcode === 2) {
          if (this._fragmented) {
            this._loop = false;
            return error(RangeError, `invalid opcode ${this._opcode}`, true, 1002);
          }
          this._compressed = compressed;
        } else if (this._opcode > 7 && this._opcode < 11) {
          if (!this._fin) {
            this._loop = false;
            return error(RangeError, "FIN must be set", true, 1002);
          }
          if (compressed) {
            this._loop = false;
            return error(RangeError, "RSV1 must be clear", true, 1002);
          }
          if (this._payloadLength > 125) {
            this._loop = false;
            return error(RangeError, `invalid payload length ${this._payloadLength}`, true, 1002);
          }
        } else {
          this._loop = false;
          return error(RangeError, `invalid opcode ${this._opcode}`, true, 1002);
        }
        if (!this._fin && !this._fragmented)
          this._fragmented = this._opcode;
        this._masked = (buf[1] & 128) === 128;
        if (this._isServer) {
          if (!this._masked) {
            this._loop = false;
            return error(RangeError, "MASK must be set", true, 1002);
          }
        } else if (this._masked) {
          this._loop = false;
          return error(RangeError, "MASK must be clear", true, 1002);
        }
        if (this._payloadLength === 126)
          this._state = GET_PAYLOAD_LENGTH_16;
        else if (this._payloadLength === 127)
          this._state = GET_PAYLOAD_LENGTH_64;
        else
          return this.haveLength();
      }
      getPayloadLength16() {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        this._payloadLength = this.consume(2).readUInt16BE(0);
        return this.haveLength();
      }
      getPayloadLength64() {
        if (this._bufferedBytes < 8) {
          this._loop = false;
          return;
        }
        const buf = this.consume(8);
        const num = buf.readUInt32BE(0);
        if (num > Math.pow(2, 53 - 32) - 1) {
          this._loop = false;
          return error(RangeError, "Unsupported WebSocket frame: payload length > 2^53 - 1", false, 1009);
        }
        this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
        return this.haveLength();
      }
      haveLength() {
        if (this._payloadLength && this._opcode < 8) {
          this._totalPayloadLength += this._payloadLength;
          if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
            this._loop = false;
            return error(RangeError, "Max payload size exceeded", false, 1009);
          }
        }
        if (this._masked)
          this._state = GET_MASK;
        else
          this._state = GET_DATA;
      }
      getMask() {
        if (this._bufferedBytes < 4) {
          this._loop = false;
          return;
        }
        this._mask = this.consume(4);
        this._state = GET_DATA;
      }
      getData(cb) {
        let data = EMPTY_BUFFER;
        if (this._payloadLength) {
          if (this._bufferedBytes < this._payloadLength) {
            this._loop = false;
            return;
          }
          data = this.consume(this._payloadLength);
          if (this._masked)
            unmask(data, this._mask);
        }
        if (this._opcode > 7)
          return this.controlMessage(data);
        if (this._compressed) {
          this._state = INFLATING;
          this.decompress(data, cb);
          return;
        }
        if (data.length) {
          this._messageLength = this._totalPayloadLength;
          this._fragments.push(data);
        }
        return this.dataMessage();
      }
      decompress(data, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        perMessageDeflate.decompress(data, this._fin, (err, buf) => {
          if (err)
            return cb(err);
          if (buf.length) {
            this._messageLength += buf.length;
            if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
              return cb(error(RangeError, "Max payload size exceeded", false, 1009));
            }
            this._fragments.push(buf);
          }
          const er = this.dataMessage();
          if (er)
            return cb(er);
          this.startLoop(cb);
        });
      }
      dataMessage() {
        if (this._fin) {
          const messageLength = this._messageLength;
          const fragments = this._fragments;
          this._totalPayloadLength = 0;
          this._messageLength = 0;
          this._fragmented = 0;
          this._fragments = [];
          if (this._opcode === 2) {
            let data;
            if (this._binaryType === "nodebuffer") {
              data = concat(fragments, messageLength);
            } else if (this._binaryType === "arraybuffer") {
              data = toArrayBuffer(concat(fragments, messageLength));
            } else {
              data = fragments;
            }
            this.emit("message", data);
          } else {
            const buf = concat(fragments, messageLength);
            if (!isValidUTF8(buf)) {
              this._loop = false;
              return error(Error, "invalid UTF-8 sequence", true, 1007);
            }
            this.emit("message", buf.toString());
          }
        }
        this._state = GET_INFO;
      }
      controlMessage(data) {
        if (this._opcode === 8) {
          this._loop = false;
          if (data.length === 0) {
            this.emit("conclude", 1005, "");
            this.end();
          } else if (data.length === 1) {
            return error(RangeError, "invalid payload length 1", true, 1002);
          } else {
            const code = data.readUInt16BE(0);
            if (!isValidStatusCode(code)) {
              return error(RangeError, `invalid status code ${code}`, true, 1002);
            }
            const buf = data.slice(2);
            if (!isValidUTF8(buf)) {
              return error(Error, "invalid UTF-8 sequence", true, 1007);
            }
            this.emit("conclude", code, buf.toString());
            this.end();
          }
        } else if (this._opcode === 9) {
          this.emit("ping", data);
        } else {
          this.emit("pong", data);
        }
        this._state = GET_INFO;
      }
    };
    module2.exports = Receiver;
    function error(ErrorCtor, message, prefix, statusCode) {
      const err = new ErrorCtor(prefix ? `Invalid WebSocket frame: ${message}` : message);
      Error.captureStackTrace(err, error);
      err[kStatusCode] = statusCode;
      return err;
    }
  }
});

// node_modules/engine.io-client/node_modules/ws/lib/sender.js
var require_sender = __commonJS({
  "node_modules/engine.io-client/node_modules/ws/lib/sender.js"(exports, module2) {
    "use strict";
    var { randomFillSync } = require("crypto");
    var PerMessageDeflate = require_permessage_deflate();
    var { EMPTY_BUFFER } = require_constants();
    var { isValidStatusCode } = require_validation();
    var { mask: applyMask, toBuffer } = require_buffer_util();
    var mask = Buffer.alloc(4);
    var Sender = class {
      constructor(socket, extensions) {
        this._extensions = extensions || {};
        this._socket = socket;
        this._firstFragment = true;
        this._compress = false;
        this._bufferedBytes = 0;
        this._deflating = false;
        this._queue = [];
      }
      static frame(data, options) {
        const merge = options.mask && options.readOnly;
        let offset = options.mask ? 6 : 2;
        let payloadLength = data.length;
        if (data.length >= 65536) {
          offset += 8;
          payloadLength = 127;
        } else if (data.length > 125) {
          offset += 2;
          payloadLength = 126;
        }
        const target = Buffer.allocUnsafe(merge ? data.length + offset : offset);
        target[0] = options.fin ? options.opcode | 128 : options.opcode;
        if (options.rsv1)
          target[0] |= 64;
        target[1] = payloadLength;
        if (payloadLength === 126) {
          target.writeUInt16BE(data.length, 2);
        } else if (payloadLength === 127) {
          target.writeUInt32BE(0, 2);
          target.writeUInt32BE(data.length, 6);
        }
        if (!options.mask)
          return [target, data];
        randomFillSync(mask, 0, 4);
        target[1] |= 128;
        target[offset - 4] = mask[0];
        target[offset - 3] = mask[1];
        target[offset - 2] = mask[2];
        target[offset - 1] = mask[3];
        if (merge) {
          applyMask(data, mask, target, offset, data.length);
          return [target];
        }
        applyMask(data, mask, data, 0, data.length);
        return [target, data];
      }
      close(code, data, mask2, cb) {
        let buf;
        if (code === void 0) {
          buf = EMPTY_BUFFER;
        } else if (typeof code !== "number" || !isValidStatusCode(code)) {
          throw new TypeError("First argument must be a valid error code number");
        } else if (data === void 0 || data === "") {
          buf = Buffer.allocUnsafe(2);
          buf.writeUInt16BE(code, 0);
        } else {
          const length = Buffer.byteLength(data);
          if (length > 123) {
            throw new RangeError("The message must not be greater than 123 bytes");
          }
          buf = Buffer.allocUnsafe(2 + length);
          buf.writeUInt16BE(code, 0);
          buf.write(data, 2);
        }
        if (this._deflating) {
          this.enqueue([this.doClose, buf, mask2, cb]);
        } else {
          this.doClose(buf, mask2, cb);
        }
      }
      doClose(data, mask2, cb) {
        this.sendFrame(Sender.frame(data, {
          fin: true,
          rsv1: false,
          opcode: 8,
          mask: mask2,
          readOnly: false
        }), cb);
      }
      ping(data, mask2, cb) {
        const buf = toBuffer(data);
        if (buf.length > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        if (this._deflating) {
          this.enqueue([this.doPing, buf, mask2, toBuffer.readOnly, cb]);
        } else {
          this.doPing(buf, mask2, toBuffer.readOnly, cb);
        }
      }
      doPing(data, mask2, readOnly, cb) {
        this.sendFrame(Sender.frame(data, {
          fin: true,
          rsv1: false,
          opcode: 9,
          mask: mask2,
          readOnly
        }), cb);
      }
      pong(data, mask2, cb) {
        const buf = toBuffer(data);
        if (buf.length > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        if (this._deflating) {
          this.enqueue([this.doPong, buf, mask2, toBuffer.readOnly, cb]);
        } else {
          this.doPong(buf, mask2, toBuffer.readOnly, cb);
        }
      }
      doPong(data, mask2, readOnly, cb) {
        this.sendFrame(Sender.frame(data, {
          fin: true,
          rsv1: false,
          opcode: 10,
          mask: mask2,
          readOnly
        }), cb);
      }
      send(data, options, cb) {
        const buf = toBuffer(data);
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        let opcode = options.binary ? 2 : 1;
        let rsv1 = options.compress;
        if (this._firstFragment) {
          this._firstFragment = false;
          if (rsv1 && perMessageDeflate) {
            rsv1 = buf.length >= perMessageDeflate._threshold;
          }
          this._compress = rsv1;
        } else {
          rsv1 = false;
          opcode = 0;
        }
        if (options.fin)
          this._firstFragment = true;
        if (perMessageDeflate) {
          const opts = {
            fin: options.fin,
            rsv1,
            opcode,
            mask: options.mask,
            readOnly: toBuffer.readOnly
          };
          if (this._deflating) {
            this.enqueue([this.dispatch, buf, this._compress, opts, cb]);
          } else {
            this.dispatch(buf, this._compress, opts, cb);
          }
        } else {
          this.sendFrame(Sender.frame(buf, {
            fin: options.fin,
            rsv1: false,
            opcode,
            mask: options.mask,
            readOnly: toBuffer.readOnly
          }), cb);
        }
      }
      dispatch(data, compress, options, cb) {
        if (!compress) {
          this.sendFrame(Sender.frame(data, options), cb);
          return;
        }
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        this._bufferedBytes += data.length;
        this._deflating = true;
        perMessageDeflate.compress(data, options.fin, (_, buf) => {
          if (this._socket.destroyed) {
            const err = new Error("The socket was closed while data was being compressed");
            if (typeof cb === "function")
              cb(err);
            for (let i = 0; i < this._queue.length; i++) {
              const callback = this._queue[i][4];
              if (typeof callback === "function")
                callback(err);
            }
            return;
          }
          this._bufferedBytes -= data.length;
          this._deflating = false;
          options.readOnly = false;
          this.sendFrame(Sender.frame(buf, options), cb);
          this.dequeue();
        });
      }
      dequeue() {
        while (!this._deflating && this._queue.length) {
          const params = this._queue.shift();
          this._bufferedBytes -= params[1].length;
          Reflect.apply(params[0], this, params.slice(1));
        }
      }
      enqueue(params) {
        this._bufferedBytes += params[1].length;
        this._queue.push(params);
      }
      sendFrame(list, cb) {
        if (list.length === 2) {
          this._socket.cork();
          this._socket.write(list[0]);
          this._socket.write(list[1], cb);
          this._socket.uncork();
        } else {
          this._socket.write(list[0], cb);
        }
      }
    };
    module2.exports = Sender;
  }
});

// node_modules/engine.io-client/node_modules/ws/lib/event-target.js
var require_event_target = __commonJS({
  "node_modules/engine.io-client/node_modules/ws/lib/event-target.js"(exports, module2) {
    "use strict";
    var Event = class {
      constructor(type, target) {
        this.target = target;
        this.type = type;
      }
    };
    var MessageEvent = class extends Event {
      constructor(data, target) {
        super("message", target);
        this.data = data;
      }
    };
    var CloseEvent = class extends Event {
      constructor(code, reason, target) {
        super("close", target);
        this.wasClean = target._closeFrameReceived && target._closeFrameSent;
        this.reason = reason;
        this.code = code;
      }
    };
    var OpenEvent = class extends Event {
      constructor(target) {
        super("open", target);
      }
    };
    var ErrorEvent = class extends Event {
      constructor(error, target) {
        super("error", target);
        this.message = error.message;
        this.error = error;
      }
    };
    var EventTarget = {
      addEventListener(type, listener, options) {
        if (typeof listener !== "function")
          return;
        function onMessage(data) {
          listener.call(this, new MessageEvent(data, this));
        }
        function onClose(code, message) {
          listener.call(this, new CloseEvent(code, message, this));
        }
        function onError(error) {
          listener.call(this, new ErrorEvent(error, this));
        }
        function onOpen() {
          listener.call(this, new OpenEvent(this));
        }
        const method = options && options.once ? "once" : "on";
        if (type === "message") {
          onMessage._listener = listener;
          this[method](type, onMessage);
        } else if (type === "close") {
          onClose._listener = listener;
          this[method](type, onClose);
        } else if (type === "error") {
          onError._listener = listener;
          this[method](type, onError);
        } else if (type === "open") {
          onOpen._listener = listener;
          this[method](type, onOpen);
        } else {
          this[method](type, listener);
        }
      },
      removeEventListener(type, listener) {
        const listeners = this.listeners(type);
        for (let i = 0; i < listeners.length; i++) {
          if (listeners[i] === listener || listeners[i]._listener === listener) {
            this.removeListener(type, listeners[i]);
          }
        }
      }
    };
    module2.exports = EventTarget;
  }
});

// node_modules/engine.io-client/node_modules/ws/lib/extension.js
var require_extension = __commonJS({
  "node_modules/engine.io-client/node_modules/ws/lib/extension.js"(exports, module2) {
    "use strict";
    var tokenChars = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0
    ];
    function push(dest, name, elem) {
      if (dest[name] === void 0)
        dest[name] = [elem];
      else
        dest[name].push(elem);
    }
    function parse2(header) {
      const offers = Object.create(null);
      if (header === void 0 || header === "")
        return offers;
      let params = Object.create(null);
      let mustUnescape = false;
      let isEscaping = false;
      let inQuotes = false;
      let extensionName;
      let paramName;
      let start = -1;
      let end = -1;
      let i = 0;
      for (; i < header.length; i++) {
        const code = header.charCodeAt(i);
        if (extensionName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i;
          } else if (code === 32 || code === 9) {
            if (end === -1 && start !== -1)
              end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1)
              end = i;
            const name = header.slice(start, end);
            if (code === 44) {
              push(offers, name, params);
              params = Object.create(null);
            } else {
              extensionName = name;
            }
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else if (paramName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i;
          } else if (code === 32 || code === 9) {
            if (end === -1 && start !== -1)
              end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1)
              end = i;
            push(params, header.slice(start, end), true);
            if (code === 44) {
              push(offers, extensionName, params);
              params = Object.create(null);
              extensionName = void 0;
            }
            start = end = -1;
          } else if (code === 61 && start !== -1 && end === -1) {
            paramName = header.slice(start, i);
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else {
          if (isEscaping) {
            if (tokenChars[code] !== 1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (start === -1)
              start = i;
            else if (!mustUnescape)
              mustUnescape = true;
            isEscaping = false;
          } else if (inQuotes) {
            if (tokenChars[code] === 1) {
              if (start === -1)
                start = i;
            } else if (code === 34 && start !== -1) {
              inQuotes = false;
              end = i;
            } else if (code === 92) {
              isEscaping = true;
            } else {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
          } else if (code === 34 && header.charCodeAt(i - 1) === 61) {
            inQuotes = true;
          } else if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i;
          } else if (start !== -1 && (code === 32 || code === 9)) {
            if (end === -1)
              end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1)
              end = i;
            let value = header.slice(start, end);
            if (mustUnescape) {
              value = value.replace(/\\/g, "");
              mustUnescape = false;
            }
            push(params, paramName, value);
            if (code === 44) {
              push(offers, extensionName, params);
              params = Object.create(null);
              extensionName = void 0;
            }
            paramName = void 0;
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        }
      }
      if (start === -1 || inQuotes) {
        throw new SyntaxError("Unexpected end of input");
      }
      if (end === -1)
        end = i;
      const token = header.slice(start, end);
      if (extensionName === void 0) {
        push(offers, token, params);
      } else {
        if (paramName === void 0) {
          push(params, token, true);
        } else if (mustUnescape) {
          push(params, paramName, token.replace(/\\/g, ""));
        } else {
          push(params, paramName, token);
        }
        push(offers, extensionName, params);
      }
      return offers;
    }
    function format(extensions) {
      return Object.keys(extensions).map((extension) => {
        let configurations = extensions[extension];
        if (!Array.isArray(configurations))
          configurations = [configurations];
        return configurations.map((params) => {
          return [extension].concat(Object.keys(params).map((k) => {
            let values = params[k];
            if (!Array.isArray(values))
              values = [values];
            return values.map((v) => v === true ? k : `${k}=${v}`).join("; ");
          })).join("; ");
        }).join(", ");
      }).join(", ");
    }
    module2.exports = { format, parse: parse2 };
  }
});

// node_modules/engine.io-client/node_modules/ws/lib/websocket.js
var require_websocket = __commonJS({
  "node_modules/engine.io-client/node_modules/ws/lib/websocket.js"(exports, module2) {
    "use strict";
    var EventEmitter = require("events");
    var https = require("https");
    var http = require("http");
    var net = require("net");
    var tls = require("tls");
    var { randomBytes, createHash } = require("crypto");
    var { URL } = require("url");
    var PerMessageDeflate = require_permessage_deflate();
    var Receiver = require_receiver();
    var Sender = require_sender();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER,
      GUID,
      kStatusCode,
      kWebSocket,
      NOOP
    } = require_constants();
    var { addEventListener: addEventListener2, removeEventListener: removeEventListener2 } = require_event_target();
    var { format, parse: parse2 } = require_extension();
    var { toBuffer } = require_buffer_util();
    var readyStates = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
    var protocolVersions = [8, 13];
    var closeTimeout = 30 * 1e3;
    var WebSocket = class extends EventEmitter {
      constructor(address, protocols, options) {
        super();
        this._binaryType = BINARY_TYPES[0];
        this._closeCode = 1006;
        this._closeFrameReceived = false;
        this._closeFrameSent = false;
        this._closeMessage = "";
        this._closeTimer = null;
        this._extensions = {};
        this._protocol = "";
        this._readyState = WebSocket.CONNECTING;
        this._receiver = null;
        this._sender = null;
        this._socket = null;
        if (address !== null) {
          this._bufferedAmount = 0;
          this._isServer = false;
          this._redirects = 0;
          if (Array.isArray(protocols)) {
            protocols = protocols.join(", ");
          } else if (typeof protocols === "object" && protocols !== null) {
            options = protocols;
            protocols = void 0;
          }
          initAsClient(this, address, protocols, options);
        } else {
          this._isServer = true;
        }
      }
      get binaryType() {
        return this._binaryType;
      }
      set binaryType(type) {
        if (!BINARY_TYPES.includes(type))
          return;
        this._binaryType = type;
        if (this._receiver)
          this._receiver._binaryType = type;
      }
      get bufferedAmount() {
        if (!this._socket)
          return this._bufferedAmount;
        return this._socket._writableState.length + this._sender._bufferedBytes;
      }
      get extensions() {
        return Object.keys(this._extensions).join();
      }
      get protocol() {
        return this._protocol;
      }
      get readyState() {
        return this._readyState;
      }
      get url() {
        return this._url;
      }
      setSocket(socket, head, maxPayload) {
        const receiver = new Receiver(this.binaryType, this._extensions, this._isServer, maxPayload);
        this._sender = new Sender(socket, this._extensions);
        this._receiver = receiver;
        this._socket = socket;
        receiver[kWebSocket] = this;
        socket[kWebSocket] = this;
        receiver.on("conclude", receiverOnConclude);
        receiver.on("drain", receiverOnDrain);
        receiver.on("error", receiverOnError);
        receiver.on("message", receiverOnMessage);
        receiver.on("ping", receiverOnPing);
        receiver.on("pong", receiverOnPong);
        socket.setTimeout(0);
        socket.setNoDelay();
        if (head.length > 0)
          socket.unshift(head);
        socket.on("close", socketOnClose);
        socket.on("data", socketOnData);
        socket.on("end", socketOnEnd);
        socket.on("error", socketOnError);
        this._readyState = WebSocket.OPEN;
        this.emit("open");
      }
      emitClose() {
        if (!this._socket) {
          this._readyState = WebSocket.CLOSED;
          this.emit("close", this._closeCode, this._closeMessage);
          return;
        }
        if (this._extensions[PerMessageDeflate.extensionName]) {
          this._extensions[PerMessageDeflate.extensionName].cleanup();
        }
        this._receiver.removeAllListeners();
        this._readyState = WebSocket.CLOSED;
        this.emit("close", this._closeCode, this._closeMessage);
      }
      close(code, data) {
        if (this.readyState === WebSocket.CLOSED)
          return;
        if (this.readyState === WebSocket.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          return abortHandshake(this, this._req, msg);
        }
        if (this.readyState === WebSocket.CLOSING) {
          if (this._closeFrameSent && this._closeFrameReceived)
            this._socket.end();
          return;
        }
        this._readyState = WebSocket.CLOSING;
        this._sender.close(code, data, !this._isServer, (err) => {
          if (err)
            return;
          this._closeFrameSent = true;
          if (this._closeFrameReceived)
            this._socket.end();
        });
        this._closeTimer = setTimeout(this._socket.destroy.bind(this._socket), closeTimeout);
      }
      ping(data, mask, cb) {
        if (this.readyState === WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number")
          data = data.toString();
        if (this.readyState !== WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0)
          mask = !this._isServer;
        this._sender.ping(data || EMPTY_BUFFER, mask, cb);
      }
      pong(data, mask, cb) {
        if (this.readyState === WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number")
          data = data.toString();
        if (this.readyState !== WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0)
          mask = !this._isServer;
        this._sender.pong(data || EMPTY_BUFFER, mask, cb);
      }
      send(data, options, cb) {
        if (this.readyState === WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof options === "function") {
          cb = options;
          options = {};
        }
        if (typeof data === "number")
          data = data.toString();
        if (this.readyState !== WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        const opts = {
          binary: typeof data !== "string",
          mask: !this._isServer,
          compress: true,
          fin: true,
          ...options
        };
        if (!this._extensions[PerMessageDeflate.extensionName]) {
          opts.compress = false;
        }
        this._sender.send(data || EMPTY_BUFFER, opts, cb);
      }
      terminate() {
        if (this.readyState === WebSocket.CLOSED)
          return;
        if (this.readyState === WebSocket.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          return abortHandshake(this, this._req, msg);
        }
        if (this._socket) {
          this._readyState = WebSocket.CLOSING;
          this._socket.destroy();
        }
      }
    };
    readyStates.forEach((readyState, i) => {
      const descriptor = { enumerable: true, value: i };
      Object.defineProperty(WebSocket.prototype, readyState, descriptor);
      Object.defineProperty(WebSocket, readyState, descriptor);
    });
    [
      "binaryType",
      "bufferedAmount",
      "extensions",
      "protocol",
      "readyState",
      "url"
    ].forEach((property) => {
      Object.defineProperty(WebSocket.prototype, property, { enumerable: true });
    });
    ["open", "error", "close", "message"].forEach((method) => {
      Object.defineProperty(WebSocket.prototype, `on${method}`, {
        configurable: true,
        enumerable: true,
        get() {
          const listeners = this.listeners(method);
          for (let i = 0; i < listeners.length; i++) {
            if (listeners[i]._listener)
              return listeners[i]._listener;
          }
          return void 0;
        },
        set(listener) {
          const listeners = this.listeners(method);
          for (let i = 0; i < listeners.length; i++) {
            if (listeners[i]._listener)
              this.removeListener(method, listeners[i]);
          }
          this.addEventListener(method, listener);
        }
      });
    });
    WebSocket.prototype.addEventListener = addEventListener2;
    WebSocket.prototype.removeEventListener = removeEventListener2;
    module2.exports = WebSocket;
    function initAsClient(websocket, address, protocols, options) {
      const opts = {
        protocolVersion: protocolVersions[1],
        maxPayload: 100 * 1024 * 1024,
        perMessageDeflate: true,
        followRedirects: false,
        maxRedirects: 10,
        ...options,
        createConnection: void 0,
        socketPath: void 0,
        hostname: void 0,
        protocol: void 0,
        timeout: void 0,
        method: void 0,
        host: void 0,
        path: void 0,
        port: void 0
      };
      if (!protocolVersions.includes(opts.protocolVersion)) {
        throw new RangeError(`Unsupported protocol version: ${opts.protocolVersion} (supported versions: ${protocolVersions.join(", ")})`);
      }
      let parsedUrl;
      if (address instanceof URL) {
        parsedUrl = address;
        websocket._url = address.href;
      } else {
        parsedUrl = new URL(address);
        websocket._url = address;
      }
      const isUnixSocket = parsedUrl.protocol === "ws+unix:";
      if (!parsedUrl.host && (!isUnixSocket || !parsedUrl.pathname)) {
        throw new Error(`Invalid URL: ${websocket.url}`);
      }
      const isSecure = parsedUrl.protocol === "wss:" || parsedUrl.protocol === "https:";
      const defaultPort = isSecure ? 443 : 80;
      const key = randomBytes(16).toString("base64");
      const get = isSecure ? https.get : http.get;
      let perMessageDeflate;
      opts.createConnection = isSecure ? tlsConnect : netConnect;
      opts.defaultPort = opts.defaultPort || defaultPort;
      opts.port = parsedUrl.port || defaultPort;
      opts.host = parsedUrl.hostname.startsWith("[") ? parsedUrl.hostname.slice(1, -1) : parsedUrl.hostname;
      opts.headers = {
        "Sec-WebSocket-Version": opts.protocolVersion,
        "Sec-WebSocket-Key": key,
        Connection: "Upgrade",
        Upgrade: "websocket",
        ...opts.headers
      };
      opts.path = parsedUrl.pathname + parsedUrl.search;
      opts.timeout = opts.handshakeTimeout;
      if (opts.perMessageDeflate) {
        perMessageDeflate = new PerMessageDeflate(opts.perMessageDeflate !== true ? opts.perMessageDeflate : {}, false, opts.maxPayload);
        opts.headers["Sec-WebSocket-Extensions"] = format({
          [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
        });
      }
      if (protocols) {
        opts.headers["Sec-WebSocket-Protocol"] = protocols;
      }
      if (opts.origin) {
        if (opts.protocolVersion < 13) {
          opts.headers["Sec-WebSocket-Origin"] = opts.origin;
        } else {
          opts.headers.Origin = opts.origin;
        }
      }
      if (parsedUrl.username || parsedUrl.password) {
        opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
      }
      if (isUnixSocket) {
        const parts = opts.path.split(":");
        opts.socketPath = parts[0];
        opts.path = parts[1];
      }
      let req = websocket._req = get(opts);
      if (opts.timeout) {
        req.on("timeout", () => {
          abortHandshake(websocket, req, "Opening handshake has timed out");
        });
      }
      req.on("error", (err) => {
        if (req === null || req.aborted)
          return;
        req = websocket._req = null;
        websocket._readyState = WebSocket.CLOSING;
        websocket.emit("error", err);
        websocket.emitClose();
      });
      req.on("response", (res) => {
        const location2 = res.headers.location;
        const statusCode = res.statusCode;
        if (location2 && opts.followRedirects && statusCode >= 300 && statusCode < 400) {
          if (++websocket._redirects > opts.maxRedirects) {
            abortHandshake(websocket, req, "Maximum redirects exceeded");
            return;
          }
          req.abort();
          const addr = new URL(location2, address);
          initAsClient(websocket, addr, protocols, options);
        } else if (!websocket.emit("unexpected-response", req, res)) {
          abortHandshake(websocket, req, `Unexpected server response: ${res.statusCode}`);
        }
      });
      req.on("upgrade", (res, socket, head) => {
        websocket.emit("upgrade", res);
        if (websocket.readyState !== WebSocket.CONNECTING)
          return;
        req = websocket._req = null;
        const digest = createHash("sha1").update(key + GUID).digest("base64");
        if (res.headers["sec-websocket-accept"] !== digest) {
          abortHandshake(websocket, socket, "Invalid Sec-WebSocket-Accept header");
          return;
        }
        const serverProt = res.headers["sec-websocket-protocol"];
        const protList = (protocols || "").split(/, */);
        let protError;
        if (!protocols && serverProt) {
          protError = "Server sent a subprotocol but none was requested";
        } else if (protocols && !serverProt) {
          protError = "Server sent no subprotocol";
        } else if (serverProt && !protList.includes(serverProt)) {
          protError = "Server sent an invalid subprotocol";
        }
        if (protError) {
          abortHandshake(websocket, socket, protError);
          return;
        }
        if (serverProt)
          websocket._protocol = serverProt;
        if (perMessageDeflate) {
          try {
            const extensions = parse2(res.headers["sec-websocket-extensions"]);
            if (extensions[PerMessageDeflate.extensionName]) {
              perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
              websocket._extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
            }
          } catch (err) {
            abortHandshake(websocket, socket, "Invalid Sec-WebSocket-Extensions header");
            return;
          }
        }
        websocket.setSocket(socket, head, opts.maxPayload);
      });
    }
    function netConnect(options) {
      options.path = options.socketPath;
      return net.connect(options);
    }
    function tlsConnect(options) {
      options.path = void 0;
      if (!options.servername && options.servername !== "") {
        options.servername = net.isIP(options.host) ? "" : options.host;
      }
      return tls.connect(options);
    }
    function abortHandshake(websocket, stream, message) {
      websocket._readyState = WebSocket.CLOSING;
      const err = new Error(message);
      Error.captureStackTrace(err, abortHandshake);
      if (stream.setHeader) {
        stream.abort();
        if (stream.socket && !stream.socket.destroyed) {
          stream.socket.destroy();
        }
        stream.once("abort", websocket.emitClose.bind(websocket));
        websocket.emit("error", err);
      } else {
        stream.destroy(err);
        stream.once("error", websocket.emit.bind(websocket, "error"));
        stream.once("close", websocket.emitClose.bind(websocket));
      }
    }
    function sendAfterClose(websocket, data, cb) {
      if (data) {
        const length = toBuffer(data).length;
        if (websocket._socket)
          websocket._sender._bufferedBytes += length;
        else
          websocket._bufferedAmount += length;
      }
      if (cb) {
        const err = new Error(`WebSocket is not open: readyState ${websocket.readyState} (${readyStates[websocket.readyState]})`);
        cb(err);
      }
    }
    function receiverOnConclude(code, reason) {
      const websocket = this[kWebSocket];
      websocket._socket.removeListener("data", socketOnData);
      websocket._socket.resume();
      websocket._closeFrameReceived = true;
      websocket._closeMessage = reason;
      websocket._closeCode = code;
      if (code === 1005)
        websocket.close();
      else
        websocket.close(code, reason);
    }
    function receiverOnDrain() {
      this[kWebSocket]._socket.resume();
    }
    function receiverOnError(err) {
      const websocket = this[kWebSocket];
      websocket._socket.removeListener("data", socketOnData);
      websocket._readyState = WebSocket.CLOSING;
      websocket._closeCode = err[kStatusCode];
      websocket.emit("error", err);
      websocket._socket.destroy();
    }
    function receiverOnFinish() {
      this[kWebSocket].emitClose();
    }
    function receiverOnMessage(data) {
      this[kWebSocket].emit("message", data);
    }
    function receiverOnPing(data) {
      const websocket = this[kWebSocket];
      websocket.pong(data, !websocket._isServer, NOOP);
      websocket.emit("ping", data);
    }
    function receiverOnPong(data) {
      this[kWebSocket].emit("pong", data);
    }
    function socketOnClose() {
      const websocket = this[kWebSocket];
      this.removeListener("close", socketOnClose);
      this.removeListener("end", socketOnEnd);
      websocket._readyState = WebSocket.CLOSING;
      websocket._socket.read();
      websocket._receiver.end();
      this.removeListener("data", socketOnData);
      this[kWebSocket] = void 0;
      clearTimeout(websocket._closeTimer);
      if (websocket._receiver._writableState.finished || websocket._receiver._writableState.errorEmitted) {
        websocket.emitClose();
      } else {
        websocket._receiver.on("error", receiverOnFinish);
        websocket._receiver.on("finish", receiverOnFinish);
      }
    }
    function socketOnData(chunk) {
      if (!this[kWebSocket]._receiver.write(chunk)) {
        this.pause();
      }
    }
    function socketOnEnd() {
      const websocket = this[kWebSocket];
      websocket._readyState = WebSocket.CLOSING;
      websocket._receiver.end();
      this.end();
    }
    function socketOnError() {
      const websocket = this[kWebSocket];
      this.removeListener("error", socketOnError);
      this.on("error", NOOP);
      if (websocket) {
        websocket._readyState = WebSocket.CLOSING;
        this.destroy();
      }
    }
  }
});

// node_modules/engine.io-client/node_modules/ws/lib/stream.js
var require_stream = __commonJS({
  "node_modules/engine.io-client/node_modules/ws/lib/stream.js"(exports, module2) {
    "use strict";
    var { Duplex } = require("stream");
    function emitClose(stream) {
      stream.emit("close");
    }
    function duplexOnEnd() {
      if (!this.destroyed && this._writableState.finished) {
        this.destroy();
      }
    }
    function duplexOnError(err) {
      this.removeListener("error", duplexOnError);
      this.destroy();
      if (this.listenerCount("error") === 0) {
        this.emit("error", err);
      }
    }
    function createWebSocketStream(ws, options) {
      let resumeOnReceiverDrain = true;
      function receiverOnDrain() {
        if (resumeOnReceiverDrain)
          ws._socket.resume();
      }
      if (ws.readyState === ws.CONNECTING) {
        ws.once("open", function open() {
          ws._receiver.removeAllListeners("drain");
          ws._receiver.on("drain", receiverOnDrain);
        });
      } else {
        ws._receiver.removeAllListeners("drain");
        ws._receiver.on("drain", receiverOnDrain);
      }
      const duplex = new Duplex({
        ...options,
        autoDestroy: false,
        emitClose: false,
        objectMode: false,
        writableObjectMode: false
      });
      ws.on("message", function message(msg) {
        if (!duplex.push(msg)) {
          resumeOnReceiverDrain = false;
          ws._socket.pause();
        }
      });
      ws.once("error", function error(err) {
        if (duplex.destroyed)
          return;
        duplex.destroy(err);
      });
      ws.once("close", function close() {
        if (duplex.destroyed)
          return;
        duplex.push(null);
      });
      duplex._destroy = function(err, callback) {
        if (ws.readyState === ws.CLOSED) {
          callback(err);
          process.nextTick(emitClose, duplex);
          return;
        }
        let called = false;
        ws.once("error", function error(err2) {
          called = true;
          callback(err2);
        });
        ws.once("close", function close() {
          if (!called)
            callback(err);
          process.nextTick(emitClose, duplex);
        });
        ws.terminate();
      };
      duplex._final = function(callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._final(callback);
          });
          return;
        }
        if (ws._socket === null)
          return;
        if (ws._socket._writableState.finished) {
          callback();
          if (duplex._readableState.endEmitted)
            duplex.destroy();
        } else {
          ws._socket.once("finish", function finish() {
            callback();
          });
          ws.close();
        }
      };
      duplex._read = function() {
        if (ws.readyState === ws.OPEN && !resumeOnReceiverDrain) {
          resumeOnReceiverDrain = true;
          if (!ws._receiver._writableState.needDrain)
            ws._socket.resume();
        }
      };
      duplex._write = function(chunk, encoding, callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._write(chunk, encoding, callback);
          });
          return;
        }
        ws.send(chunk, callback);
      };
      duplex.on("end", duplexOnEnd);
      duplex.on("error", duplexOnError);
      return duplex;
    }
    module2.exports = createWebSocketStream;
  }
});

// node_modules/engine.io-client/node_modules/ws/lib/websocket-server.js
var require_websocket_server = __commonJS({
  "node_modules/engine.io-client/node_modules/ws/lib/websocket-server.js"(exports, module2) {
    "use strict";
    var EventEmitter = require("events");
    var { createHash } = require("crypto");
    var { createServer, STATUS_CODES } = require("http");
    var PerMessageDeflate = require_permessage_deflate();
    var WebSocket = require_websocket();
    var { format, parse: parse2 } = require_extension();
    var { GUID, kWebSocket } = require_constants();
    var keyRegex = /^[+/0-9A-Za-z]{22}==$/;
    var WebSocketServer = class extends EventEmitter {
      constructor(options, callback) {
        super();
        options = {
          maxPayload: 100 * 1024 * 1024,
          perMessageDeflate: false,
          handleProtocols: null,
          clientTracking: true,
          verifyClient: null,
          noServer: false,
          backlog: null,
          server: null,
          host: null,
          path: null,
          port: null,
          ...options
        };
        if (options.port == null && !options.server && !options.noServer) {
          throw new TypeError('One of the "port", "server", or "noServer" options must be specified');
        }
        if (options.port != null) {
          this._server = createServer((req, res) => {
            const body = STATUS_CODES[426];
            res.writeHead(426, {
              "Content-Length": body.length,
              "Content-Type": "text/plain"
            });
            res.end(body);
          });
          this._server.listen(options.port, options.host, options.backlog, callback);
        } else if (options.server) {
          this._server = options.server;
        }
        if (this._server) {
          const emitConnection = this.emit.bind(this, "connection");
          this._removeListeners = addListeners(this._server, {
            listening: this.emit.bind(this, "listening"),
            error: this.emit.bind(this, "error"),
            upgrade: (req, socket, head) => {
              this.handleUpgrade(req, socket, head, emitConnection);
            }
          });
        }
        if (options.perMessageDeflate === true)
          options.perMessageDeflate = {};
        if (options.clientTracking)
          this.clients = new Set();
        this.options = options;
      }
      address() {
        if (this.options.noServer) {
          throw new Error('The server is operating in "noServer" mode');
        }
        if (!this._server)
          return null;
        return this._server.address();
      }
      close(cb) {
        if (cb)
          this.once("close", cb);
        if (this.clients) {
          for (const client of this.clients)
            client.terminate();
        }
        const server = this._server;
        if (server) {
          this._removeListeners();
          this._removeListeners = this._server = null;
          if (this.options.port != null) {
            server.close(() => this.emit("close"));
            return;
          }
        }
        process.nextTick(emitClose, this);
      }
      shouldHandle(req) {
        if (this.options.path) {
          const index = req.url.indexOf("?");
          const pathname = index !== -1 ? req.url.slice(0, index) : req.url;
          if (pathname !== this.options.path)
            return false;
        }
        return true;
      }
      handleUpgrade(req, socket, head, cb) {
        socket.on("error", socketOnError);
        const key = req.headers["sec-websocket-key"] !== void 0 ? req.headers["sec-websocket-key"].trim() : false;
        const version = +req.headers["sec-websocket-version"];
        const extensions = {};
        if (req.method !== "GET" || req.headers.upgrade.toLowerCase() !== "websocket" || !key || !keyRegex.test(key) || version !== 8 && version !== 13 || !this.shouldHandle(req)) {
          return abortHandshake(socket, 400);
        }
        if (this.options.perMessageDeflate) {
          const perMessageDeflate = new PerMessageDeflate(this.options.perMessageDeflate, true, this.options.maxPayload);
          try {
            const offers = parse2(req.headers["sec-websocket-extensions"]);
            if (offers[PerMessageDeflate.extensionName]) {
              perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
              extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
            }
          } catch (err) {
            return abortHandshake(socket, 400);
          }
        }
        if (this.options.verifyClient) {
          const info = {
            origin: req.headers[`${version === 8 ? "sec-websocket-origin" : "origin"}`],
            secure: !!(req.socket.authorized || req.socket.encrypted),
            req
          };
          if (this.options.verifyClient.length === 2) {
            this.options.verifyClient(info, (verified, code, message, headers) => {
              if (!verified) {
                return abortHandshake(socket, code || 401, message, headers);
              }
              this.completeUpgrade(key, extensions, req, socket, head, cb);
            });
            return;
          }
          if (!this.options.verifyClient(info))
            return abortHandshake(socket, 401);
        }
        this.completeUpgrade(key, extensions, req, socket, head, cb);
      }
      completeUpgrade(key, extensions, req, socket, head, cb) {
        if (!socket.readable || !socket.writable)
          return socket.destroy();
        if (socket[kWebSocket]) {
          throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");
        }
        const digest = createHash("sha1").update(key + GUID).digest("base64");
        const headers = [
          "HTTP/1.1 101 Switching Protocols",
          "Upgrade: websocket",
          "Connection: Upgrade",
          `Sec-WebSocket-Accept: ${digest}`
        ];
        const ws = new WebSocket(null);
        let protocol = req.headers["sec-websocket-protocol"];
        if (protocol) {
          protocol = protocol.split(",").map(trim);
          if (this.options.handleProtocols) {
            protocol = this.options.handleProtocols(protocol, req);
          } else {
            protocol = protocol[0];
          }
          if (protocol) {
            headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
            ws._protocol = protocol;
          }
        }
        if (extensions[PerMessageDeflate.extensionName]) {
          const params = extensions[PerMessageDeflate.extensionName].params;
          const value = format({
            [PerMessageDeflate.extensionName]: [params]
          });
          headers.push(`Sec-WebSocket-Extensions: ${value}`);
          ws._extensions = extensions;
        }
        this.emit("headers", headers, req);
        socket.write(headers.concat("\r\n").join("\r\n"));
        socket.removeListener("error", socketOnError);
        ws.setSocket(socket, head, this.options.maxPayload);
        if (this.clients) {
          this.clients.add(ws);
          ws.on("close", () => this.clients.delete(ws));
        }
        cb(ws, req);
      }
    };
    module2.exports = WebSocketServer;
    function addListeners(server, map) {
      for (const event of Object.keys(map))
        server.on(event, map[event]);
      return function removeListeners() {
        for (const event of Object.keys(map)) {
          server.removeListener(event, map[event]);
        }
      };
    }
    function emitClose(server) {
      server.emit("close");
    }
    function socketOnError() {
      this.destroy();
    }
    function abortHandshake(socket, code, message, headers) {
      if (socket.writable) {
        message = message || STATUS_CODES[code];
        headers = {
          Connection: "close",
          "Content-Type": "text/html",
          "Content-Length": Buffer.byteLength(message),
          ...headers
        };
        socket.write(`HTTP/1.1 ${code} ${STATUS_CODES[code]}\r
` + Object.keys(headers).map((h) => `${h}: ${headers[h]}`).join("\r\n") + "\r\n\r\n" + message);
      }
      socket.removeListener("error", socketOnError);
      socket.destroy();
    }
    function trim(str) {
      return str.trim();
    }
  }
});

// node_modules/engine.io-client/node_modules/ws/index.js
var require_ws = __commonJS({
  "node_modules/engine.io-client/node_modules/ws/index.js"(exports, module2) {
    "use strict";
    var WebSocket = require_websocket();
    WebSocket.createWebSocketStream = require_stream();
    WebSocket.Server = require_websocket_server();
    WebSocket.Receiver = require_receiver();
    WebSocket.Sender = require_sender();
    module2.exports = WebSocket;
  }
});

// node_modules/engine.io-client/lib/transports/websocket-constructor.js
var require_websocket_constructor = __commonJS({
  "node_modules/engine.io-client/lib/transports/websocket-constructor.js"(exports, module2) {
    module2.exports = {
      WebSocket: require_ws(),
      usingBrowserWebSocket: false,
      defaultBinaryType: "nodebuffer",
      nextTick: process.nextTick
    };
  }
});

// node_modules/engine.io-client/lib/transports/websocket.js
var require_websocket2 = __commonJS({
  "node_modules/engine.io-client/lib/transports/websocket.js"(exports, module2) {
    var Transport = require_transport();
    var parser = require_lib();
    var parseqs = require_parseqs();
    var yeast = require_yeast();
    var { pick } = require_util();
    var {
      WebSocket,
      usingBrowserWebSocket,
      defaultBinaryType,
      nextTick
    } = require_websocket_constructor();
    var debug = require_src()("engine.io-client:websocket");
    var isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
    var WS = class extends Transport {
      constructor(opts) {
        super(opts);
        this.supportsBinary = !opts.forceBase64;
      }
      get name() {
        return "websocket";
      }
      doOpen() {
        if (!this.check()) {
          return;
        }
        const uri = this.uri();
        const protocols = this.opts.protocols;
        const opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
        if (this.opts.extraHeaders) {
          opts.headers = this.opts.extraHeaders;
        }
        try {
          this.ws = usingBrowserWebSocket && !isReactNative ? protocols ? new WebSocket(uri, protocols) : new WebSocket(uri) : new WebSocket(uri, protocols, opts);
        } catch (err) {
          return this.emit("error", err);
        }
        this.ws.binaryType = this.socket.binaryType || defaultBinaryType;
        this.addEventListeners();
      }
      addEventListeners() {
        this.ws.onopen = () => {
          if (this.opts.autoUnref) {
            this.ws._socket.unref();
          }
          this.onOpen();
        };
        this.ws.onclose = this.onClose.bind(this);
        this.ws.onmessage = (ev) => this.onData(ev.data);
        this.ws.onerror = (e) => this.onError("websocket error", e);
      }
      write(packets) {
        this.writable = false;
        for (let i = 0; i < packets.length; i++) {
          const packet = packets[i];
          const lastPacket = i === packets.length - 1;
          parser.encodePacket(packet, this.supportsBinary, (data) => {
            const opts = {};
            if (!usingBrowserWebSocket) {
              if (packet.options) {
                opts.compress = packet.options.compress;
              }
              if (this.opts.perMessageDeflate) {
                const len = typeof data === "string" ? Buffer.byteLength(data) : data.length;
                if (len < this.opts.perMessageDeflate.threshold) {
                  opts.compress = false;
                }
              }
            }
            try {
              if (usingBrowserWebSocket) {
                this.ws.send(data);
              } else {
                this.ws.send(data, opts);
              }
            } catch (e) {
              debug("websocket closed before onclose event");
            }
            if (lastPacket) {
              nextTick(() => {
                this.writable = true;
                this.emit("drain");
              }, this.setTimeoutFn);
            }
          });
        }
      }
      onClose() {
        Transport.prototype.onClose.call(this);
      }
      doClose() {
        if (typeof this.ws !== "undefined") {
          this.ws.close();
          this.ws = null;
        }
      }
      uri() {
        let query = this.query || {};
        const schema = this.opts.secure ? "wss" : "ws";
        let port = "";
        if (this.opts.port && (schema === "wss" && Number(this.opts.port) !== 443 || schema === "ws" && Number(this.opts.port) !== 80)) {
          port = ":" + this.opts.port;
        }
        if (this.opts.timestampRequests) {
          query[this.opts.timestampParam] = yeast();
        }
        if (!this.supportsBinary) {
          query.b64 = 1;
        }
        query = parseqs.encode(query);
        if (query.length) {
          query = "?" + query;
        }
        const ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + query;
      }
      check() {
        return !!WebSocket && !("__initialize" in WebSocket && this.name === WS.prototype.name);
      }
    };
    module2.exports = WS;
  }
});

// node_modules/engine.io-client/lib/transports/index.js
var require_transports = __commonJS({
  "node_modules/engine.io-client/lib/transports/index.js"(exports) {
    var XMLHttpRequest = require_XMLHttpRequest();
    var XHR = require_polling_xhr();
    var JSONP = require_polling_jsonp();
    var websocket = require_websocket2();
    exports.polling = polling;
    exports.websocket = websocket;
    function polling(opts) {
      let xhr;
      let xd = false;
      let xs = false;
      const jsonp = opts.jsonp !== false;
      if (typeof location !== "undefined") {
        const isSSL = location.protocol === "https:";
        let port = location.port;
        if (!port) {
          port = isSSL ? 443 : 80;
        }
        xd = opts.hostname !== location.hostname || port !== opts.port;
        xs = opts.secure !== isSSL;
      }
      opts.xdomain = xd;
      opts.xscheme = xs;
      xhr = new XMLHttpRequest(opts);
      if ("open" in xhr && !opts.forceJSONP) {
        return new XHR(opts);
      } else {
        if (!jsonp)
          throw new Error("JSONP disabled");
        return new JSONP(opts);
      }
    }
  }
});

// node_modules/engine.io-client/lib/socket.js
var require_socket = __commonJS({
  "node_modules/engine.io-client/lib/socket.js"(exports, module2) {
    var transports = require_transports();
    var Emitter = require_component_emitter();
    var debug = require_src()("engine.io-client:socket");
    var parser = require_lib();
    var parseuri = require_parseuri();
    var parseqs = require_parseqs();
    var { installTimerFunctions } = require_util();
    var Socket2 = class extends Emitter {
      constructor(uri, opts = {}) {
        super();
        if (uri && typeof uri === "object") {
          opts = uri;
          uri = null;
        }
        if (uri) {
          uri = parseuri(uri);
          opts.hostname = uri.host;
          opts.secure = uri.protocol === "https" || uri.protocol === "wss";
          opts.port = uri.port;
          if (uri.query)
            opts.query = uri.query;
        } else if (opts.host) {
          opts.hostname = parseuri(opts.host).host;
        }
        installTimerFunctions(this, opts);
        this.secure = opts.secure != null ? opts.secure : typeof location !== "undefined" && location.protocol === "https:";
        if (opts.hostname && !opts.port) {
          opts.port = this.secure ? "443" : "80";
        }
        this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
        this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? 443 : 80);
        this.transports = opts.transports || ["polling", "websocket"];
        this.readyState = "";
        this.writeBuffer = [];
        this.prevBufferLen = 0;
        this.opts = Object.assign({
          path: "/engine.io",
          agent: false,
          withCredentials: false,
          upgrade: true,
          jsonp: true,
          timestampParam: "t",
          rememberUpgrade: false,
          rejectUnauthorized: true,
          perMessageDeflate: {
            threshold: 1024
          },
          transportOptions: {},
          closeOnBeforeunload: true
        }, opts);
        this.opts.path = this.opts.path.replace(/\/$/, "") + "/";
        if (typeof this.opts.query === "string") {
          this.opts.query = parseqs.decode(this.opts.query);
        }
        this.id = null;
        this.upgrades = null;
        this.pingInterval = null;
        this.pingTimeout = null;
        this.pingTimeoutTimer = null;
        if (typeof addEventListener === "function") {
          if (this.opts.closeOnBeforeunload) {
            addEventListener("beforeunload", () => {
              if (this.transport) {
                this.transport.removeAllListeners();
                this.transport.close();
              }
            }, false);
          }
          if (this.hostname !== "localhost") {
            this.offlineEventListener = () => {
              this.onClose("transport close");
            };
            addEventListener("offline", this.offlineEventListener, false);
          }
        }
        this.open();
      }
      createTransport(name) {
        debug('creating transport "%s"', name);
        const query = clone(this.opts.query);
        query.EIO = parser.protocol;
        query.transport = name;
        if (this.id)
          query.sid = this.id;
        const opts = Object.assign({}, this.opts.transportOptions[name], this.opts, {
          query,
          socket: this,
          hostname: this.hostname,
          secure: this.secure,
          port: this.port
        });
        debug("options: %j", opts);
        return new transports[name](opts);
      }
      open() {
        let transport;
        if (this.opts.rememberUpgrade && Socket2.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
          transport = "websocket";
        } else if (this.transports.length === 0) {
          this.setTimeoutFn(() => {
            this.emit("error", "No transports available");
          }, 0);
          return;
        } else {
          transport = this.transports[0];
        }
        this.readyState = "opening";
        try {
          transport = this.createTransport(transport);
        } catch (e) {
          debug("error while creating transport: %s", e);
          this.transports.shift();
          this.open();
          return;
        }
        transport.open();
        this.setTransport(transport);
      }
      setTransport(transport) {
        debug("setting transport %s", transport.name);
        if (this.transport) {
          debug("clearing existing transport %s", this.transport.name);
          this.transport.removeAllListeners();
        }
        this.transport = transport;
        transport.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", () => {
          this.onClose("transport close");
        });
      }
      probe(name) {
        debug('probing transport "%s"', name);
        let transport = this.createTransport(name, { probe: 1 });
        let failed = false;
        Socket2.priorWebsocketSuccess = false;
        const onTransportOpen = () => {
          if (failed)
            return;
          debug('probe transport "%s" opened', name);
          transport.send([{ type: "ping", data: "probe" }]);
          transport.once("packet", (msg) => {
            if (failed)
              return;
            if (msg.type === "pong" && msg.data === "probe") {
              debug('probe transport "%s" pong', name);
              this.upgrading = true;
              this.emit("upgrading", transport);
              if (!transport)
                return;
              Socket2.priorWebsocketSuccess = transport.name === "websocket";
              debug('pausing current transport "%s"', this.transport.name);
              this.transport.pause(() => {
                if (failed)
                  return;
                if (this.readyState === "closed")
                  return;
                debug("changing transport and sending upgrade packet");
                cleanup();
                this.setTransport(transport);
                transport.send([{ type: "upgrade" }]);
                this.emit("upgrade", transport);
                transport = null;
                this.upgrading = false;
                this.flush();
              });
            } else {
              debug('probe transport "%s" failed', name);
              const err = new Error("probe error");
              err.transport = transport.name;
              this.emit("upgradeError", err);
            }
          });
        };
        function freezeTransport() {
          if (failed)
            return;
          failed = true;
          cleanup();
          transport.close();
          transport = null;
        }
        const onerror = (err) => {
          const error = new Error("probe error: " + err);
          error.transport = transport.name;
          freezeTransport();
          debug('probe transport "%s" failed because of error: %s', name, err);
          this.emit("upgradeError", error);
        };
        function onTransportClose() {
          onerror("transport closed");
        }
        function onclose() {
          onerror("socket closed");
        }
        function onupgrade(to) {
          if (transport && to.name !== transport.name) {
            debug('"%s" works - aborting "%s"', to.name, transport.name);
            freezeTransport();
          }
        }
        const cleanup = () => {
          transport.removeListener("open", onTransportOpen);
          transport.removeListener("error", onerror);
          transport.removeListener("close", onTransportClose);
          this.removeListener("close", onclose);
          this.removeListener("upgrading", onupgrade);
        };
        transport.once("open", onTransportOpen);
        transport.once("error", onerror);
        transport.once("close", onTransportClose);
        this.once("close", onclose);
        this.once("upgrading", onupgrade);
        transport.open();
      }
      onOpen() {
        debug("socket open");
        this.readyState = "open";
        Socket2.priorWebsocketSuccess = this.transport.name === "websocket";
        this.emit("open");
        this.flush();
        if (this.readyState === "open" && this.opts.upgrade && this.transport.pause) {
          debug("starting upgrade probes");
          let i = 0;
          const l = this.upgrades.length;
          for (; i < l; i++) {
            this.probe(this.upgrades[i]);
          }
        }
      }
      onPacket(packet) {
        if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") {
          debug('socket receive: type "%s", data "%s"', packet.type, packet.data);
          this.emit("packet", packet);
          this.emit("heartbeat");
          switch (packet.type) {
            case "open":
              this.onHandshake(JSON.parse(packet.data));
              break;
            case "ping":
              this.resetPingTimeout();
              this.sendPacket("pong");
              this.emit("ping");
              this.emit("pong");
              break;
            case "error":
              const err = new Error("server error");
              err.code = packet.data;
              this.onError(err);
              break;
            case "message":
              this.emit("data", packet.data);
              this.emit("message", packet.data);
              break;
          }
        } else {
          debug('packet received with socket readyState "%s"', this.readyState);
        }
      }
      onHandshake(data) {
        this.emit("handshake", data);
        this.id = data.sid;
        this.transport.query.sid = data.sid;
        this.upgrades = this.filterUpgrades(data.upgrades);
        this.pingInterval = data.pingInterval;
        this.pingTimeout = data.pingTimeout;
        this.onOpen();
        if (this.readyState === "closed")
          return;
        this.resetPingTimeout();
      }
      resetPingTimeout() {
        this.clearTimeoutFn(this.pingTimeoutTimer);
        this.pingTimeoutTimer = this.setTimeoutFn(() => {
          this.onClose("ping timeout");
        }, this.pingInterval + this.pingTimeout);
        if (this.opts.autoUnref) {
          this.pingTimeoutTimer.unref();
        }
      }
      onDrain() {
        this.writeBuffer.splice(0, this.prevBufferLen);
        this.prevBufferLen = 0;
        if (this.writeBuffer.length === 0) {
          this.emit("drain");
        } else {
          this.flush();
        }
      }
      flush() {
        if (this.readyState !== "closed" && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
          debug("flushing %d packets in socket", this.writeBuffer.length);
          this.transport.send(this.writeBuffer);
          this.prevBufferLen = this.writeBuffer.length;
          this.emit("flush");
        }
      }
      write(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
      }
      send(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
      }
      sendPacket(type, data, options, fn) {
        if (typeof data === "function") {
          fn = data;
          data = void 0;
        }
        if (typeof options === "function") {
          fn = options;
          options = null;
        }
        if (this.readyState === "closing" || this.readyState === "closed") {
          return;
        }
        options = options || {};
        options.compress = options.compress !== false;
        const packet = {
          type,
          data,
          options
        };
        this.emit("packetCreate", packet);
        this.writeBuffer.push(packet);
        if (fn)
          this.once("flush", fn);
        this.flush();
      }
      close() {
        const close = () => {
          this.onClose("forced close");
          debug("socket closing - telling transport to close");
          this.transport.close();
        };
        const cleanupAndClose = () => {
          this.removeListener("upgrade", cleanupAndClose);
          this.removeListener("upgradeError", cleanupAndClose);
          close();
        };
        const waitForUpgrade = () => {
          this.once("upgrade", cleanupAndClose);
          this.once("upgradeError", cleanupAndClose);
        };
        if (this.readyState === "opening" || this.readyState === "open") {
          this.readyState = "closing";
          if (this.writeBuffer.length) {
            this.once("drain", () => {
              if (this.upgrading) {
                waitForUpgrade();
              } else {
                close();
              }
            });
          } else if (this.upgrading) {
            waitForUpgrade();
          } else {
            close();
          }
        }
        return this;
      }
      onError(err) {
        debug("socket error %j", err);
        Socket2.priorWebsocketSuccess = false;
        this.emit("error", err);
        this.onClose("transport error", err);
      }
      onClose(reason, desc) {
        if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") {
          debug('socket close with reason: "%s"', reason);
          this.clearTimeoutFn(this.pingIntervalTimer);
          this.clearTimeoutFn(this.pingTimeoutTimer);
          this.transport.removeAllListeners("close");
          this.transport.close();
          this.transport.removeAllListeners();
          if (typeof removeEventListener === "function") {
            removeEventListener("offline", this.offlineEventListener, false);
          }
          this.readyState = "closed";
          this.id = null;
          this.emit("close", reason, desc);
          this.writeBuffer = [];
          this.prevBufferLen = 0;
        }
      }
      filterUpgrades(upgrades) {
        const filteredUpgrades = [];
        let i = 0;
        const j = upgrades.length;
        for (; i < j; i++) {
          if (~this.transports.indexOf(upgrades[i]))
            filteredUpgrades.push(upgrades[i]);
        }
        return filteredUpgrades;
      }
    };
    Socket2.priorWebsocketSuccess = false;
    Socket2.protocol = parser.protocol;
    function clone(obj) {
      const o = {};
      for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
          o[i] = obj[i];
        }
      }
      return o;
    }
    module2.exports = Socket2;
  }
});

// node_modules/engine.io-client/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/engine.io-client/lib/index.js"(exports, module2) {
    var Socket2 = require_socket();
    module2.exports = (uri, opts) => new Socket2(uri, opts);
    module2.exports.Socket = Socket2;
    module2.exports.protocol = Socket2.protocol;
    module2.exports.Transport = require_transport();
    module2.exports.transports = require_transports();
    module2.exports.parser = require_lib();
  }
});

// node_modules/socket.io-parser/dist/is-binary.js
var require_is_binary = __commonJS({
  "node_modules/socket.io-parser/dist/is-binary.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hasBinary = exports.isBinary = void 0;
    var withNativeArrayBuffer = typeof ArrayBuffer === "function";
    var isView = (obj) => {
      return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
    };
    var toString = Object.prototype.toString;
    var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
    var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
    function isBinary(obj) {
      return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
    }
    exports.isBinary = isBinary;
    function hasBinary(obj, toJSON) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      if (Array.isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++) {
          if (hasBinary(obj[i])) {
            return true;
          }
        }
        return false;
      }
      if (isBinary(obj)) {
        return true;
      }
      if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
        return hasBinary(obj.toJSON(), true);
      }
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
          return true;
        }
      }
      return false;
    }
    exports.hasBinary = hasBinary;
  }
});

// node_modules/socket.io-parser/dist/binary.js
var require_binary = __commonJS({
  "node_modules/socket.io-parser/dist/binary.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.reconstructPacket = exports.deconstructPacket = void 0;
    var is_binary_1 = require_is_binary();
    function deconstructPacket(packet) {
      const buffers = [];
      const packetData = packet.data;
      const pack = packet;
      pack.data = _deconstructPacket(packetData, buffers);
      pack.attachments = buffers.length;
      return { packet: pack, buffers };
    }
    exports.deconstructPacket = deconstructPacket;
    function _deconstructPacket(data, buffers) {
      if (!data)
        return data;
      if (is_binary_1.isBinary(data)) {
        const placeholder = { _placeholder: true, num: buffers.length };
        buffers.push(data);
        return placeholder;
      } else if (Array.isArray(data)) {
        const newData = new Array(data.length);
        for (let i = 0; i < data.length; i++) {
          newData[i] = _deconstructPacket(data[i], buffers);
        }
        return newData;
      } else if (typeof data === "object" && !(data instanceof Date)) {
        const newData = {};
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            newData[key] = _deconstructPacket(data[key], buffers);
          }
        }
        return newData;
      }
      return data;
    }
    function reconstructPacket(packet, buffers) {
      packet.data = _reconstructPacket(packet.data, buffers);
      packet.attachments = void 0;
      return packet;
    }
    exports.reconstructPacket = reconstructPacket;
    function _reconstructPacket(data, buffers) {
      if (!data)
        return data;
      if (data && data._placeholder) {
        return buffers[data.num];
      } else if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          data[i] = _reconstructPacket(data[i], buffers);
        }
      } else if (typeof data === "object") {
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            data[key] = _reconstructPacket(data[key], buffers);
          }
        }
      }
      return data;
    }
  }
});

// node_modules/socket.io-parser/dist/index.js
var require_dist = __commonJS({
  "node_modules/socket.io-parser/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Decoder = exports.Encoder = exports.PacketType = exports.protocol = void 0;
    var Emitter = require_component_emitter();
    var binary_1 = require_binary();
    var is_binary_1 = require_is_binary();
    var debug = require_src()("socket.io-parser");
    exports.protocol = 5;
    var PacketType;
    (function(PacketType2) {
      PacketType2[PacketType2["CONNECT"] = 0] = "CONNECT";
      PacketType2[PacketType2["DISCONNECT"] = 1] = "DISCONNECT";
      PacketType2[PacketType2["EVENT"] = 2] = "EVENT";
      PacketType2[PacketType2["ACK"] = 3] = "ACK";
      PacketType2[PacketType2["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
      PacketType2[PacketType2["BINARY_EVENT"] = 5] = "BINARY_EVENT";
      PacketType2[PacketType2["BINARY_ACK"] = 6] = "BINARY_ACK";
    })(PacketType = exports.PacketType || (exports.PacketType = {}));
    var Encoder = class {
      encode(obj) {
        debug("encoding packet %j", obj);
        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
          if (is_binary_1.hasBinary(obj)) {
            obj.type = obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK;
            return this.encodeAsBinary(obj);
          }
        }
        return [this.encodeAsString(obj)];
      }
      encodeAsString(obj) {
        let str = "" + obj.type;
        if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
          str += obj.attachments + "-";
        }
        if (obj.nsp && obj.nsp !== "/") {
          str += obj.nsp + ",";
        }
        if (obj.id != null) {
          str += obj.id;
        }
        if (obj.data != null) {
          str += JSON.stringify(obj.data);
        }
        debug("encoded %j as %s", obj, str);
        return str;
      }
      encodeAsBinary(obj) {
        const deconstruction = binary_1.deconstructPacket(obj);
        const pack = this.encodeAsString(deconstruction.packet);
        const buffers = deconstruction.buffers;
        buffers.unshift(pack);
        return buffers;
      }
    };
    exports.Encoder = Encoder;
    var Decoder = class extends Emitter {
      constructor() {
        super();
      }
      add(obj) {
        let packet;
        if (typeof obj === "string") {
          packet = this.decodeString(obj);
          if (packet.type === PacketType.BINARY_EVENT || packet.type === PacketType.BINARY_ACK) {
            this.reconstructor = new BinaryReconstructor(packet);
            if (packet.attachments === 0) {
              super.emit("decoded", packet);
            }
          } else {
            super.emit("decoded", packet);
          }
        } else if (is_binary_1.isBinary(obj) || obj.base64) {
          if (!this.reconstructor) {
            throw new Error("got binary data when not reconstructing a packet");
          } else {
            packet = this.reconstructor.takeBinaryData(obj);
            if (packet) {
              this.reconstructor = null;
              super.emit("decoded", packet);
            }
          }
        } else {
          throw new Error("Unknown type: " + obj);
        }
      }
      decodeString(str) {
        let i = 0;
        const p = {
          type: Number(str.charAt(0))
        };
        if (PacketType[p.type] === void 0) {
          throw new Error("unknown packet type " + p.type);
        }
        if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
          const start = i + 1;
          while (str.charAt(++i) !== "-" && i != str.length) {
          }
          const buf = str.substring(start, i);
          if (buf != Number(buf) || str.charAt(i) !== "-") {
            throw new Error("Illegal attachments");
          }
          p.attachments = Number(buf);
        }
        if (str.charAt(i + 1) === "/") {
          const start = i + 1;
          while (++i) {
            const c = str.charAt(i);
            if (c === ",")
              break;
            if (i === str.length)
              break;
          }
          p.nsp = str.substring(start, i);
        } else {
          p.nsp = "/";
        }
        const next = str.charAt(i + 1);
        if (next !== "" && Number(next) == next) {
          const start = i + 1;
          while (++i) {
            const c = str.charAt(i);
            if (c == null || Number(c) != c) {
              --i;
              break;
            }
            if (i === str.length)
              break;
          }
          p.id = Number(str.substring(start, i + 1));
        }
        if (str.charAt(++i)) {
          const payload = tryParse(str.substr(i));
          if (Decoder.isPayloadValid(p.type, payload)) {
            p.data = payload;
          } else {
            throw new Error("invalid payload");
          }
        }
        debug("decoded %s as %j", str, p);
        return p;
      }
      static isPayloadValid(type, payload) {
        switch (type) {
          case PacketType.CONNECT:
            return typeof payload === "object";
          case PacketType.DISCONNECT:
            return payload === void 0;
          case PacketType.CONNECT_ERROR:
            return typeof payload === "string" || typeof payload === "object";
          case PacketType.EVENT:
          case PacketType.BINARY_EVENT:
            return Array.isArray(payload) && payload.length > 0;
          case PacketType.ACK:
          case PacketType.BINARY_ACK:
            return Array.isArray(payload);
        }
      }
      destroy() {
        if (this.reconstructor) {
          this.reconstructor.finishedReconstruction();
        }
      }
    };
    exports.Decoder = Decoder;
    function tryParse(str) {
      try {
        return JSON.parse(str);
      } catch (e) {
        return false;
      }
    }
    var BinaryReconstructor = class {
      constructor(packet) {
        this.packet = packet;
        this.buffers = [];
        this.reconPack = packet;
      }
      takeBinaryData(binData) {
        this.buffers.push(binData);
        if (this.buffers.length === this.reconPack.attachments) {
          const packet = binary_1.reconstructPacket(this.reconPack, this.buffers);
          this.finishedReconstruction();
          return packet;
        }
        return null;
      }
      finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
      }
    };
  }
});

// node_modules/socket.io-client/build/on.js
var require_on = __commonJS({
  "node_modules/socket.io-client/build/on.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.on = void 0;
    function on(obj, ev, fn) {
      obj.on(ev, fn);
      return function subDestroy() {
        obj.off(ev, fn);
      };
    }
    exports.on = on;
  }
});

// node_modules/socket.io-client/build/typed-events.js
var require_typed_events = __commonJS({
  "node_modules/socket.io-client/build/typed-events.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StrictEventEmitter = void 0;
    var Emitter = require_component_emitter();
    var StrictEventEmitter = class extends Emitter {
      on(ev, listener) {
        super.on(ev, listener);
        return this;
      }
      once(ev, listener) {
        super.once(ev, listener);
        return this;
      }
      emit(ev, ...args) {
        super.emit(ev, ...args);
        return this;
      }
      emitReserved(ev, ...args) {
        super.emit(ev, ...args);
        return this;
      }
      listeners(event) {
        return super.listeners(event);
      }
    };
    exports.StrictEventEmitter = StrictEventEmitter;
  }
});

// node_modules/socket.io-client/build/socket.js
var require_socket2 = __commonJS({
  "node_modules/socket.io-client/build/socket.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Socket = void 0;
    var socket_io_parser_1 = require_dist();
    var on_1 = require_on();
    var typed_events_1 = require_typed_events();
    var debug = require_src()("socket.io-client:socket");
    var RESERVED_EVENTS = Object.freeze({
      connect: 1,
      connect_error: 1,
      disconnect: 1,
      disconnecting: 1,
      newListener: 1,
      removeListener: 1
    });
    var Socket2 = class extends typed_events_1.StrictEventEmitter {
      constructor(io2, nsp, opts) {
        super();
        this.connected = false;
        this.disconnected = true;
        this.receiveBuffer = [];
        this.sendBuffer = [];
        this.ids = 0;
        this.acks = {};
        this.flags = {};
        this.io = io2;
        this.nsp = nsp;
        if (opts && opts.auth) {
          this.auth = opts.auth;
        }
        if (this.io._autoConnect)
          this.open();
      }
      subEvents() {
        if (this.subs)
          return;
        const io2 = this.io;
        this.subs = [
          (0, on_1.on)(io2, "open", this.onopen.bind(this)),
          (0, on_1.on)(io2, "packet", this.onpacket.bind(this)),
          (0, on_1.on)(io2, "error", this.onerror.bind(this)),
          (0, on_1.on)(io2, "close", this.onclose.bind(this))
        ];
      }
      get active() {
        return !!this.subs;
      }
      connect() {
        if (this.connected)
          return this;
        this.subEvents();
        if (!this.io["_reconnecting"])
          this.io.open();
        if (this.io._readyState === "open")
          this.onopen();
        return this;
      }
      open() {
        return this.connect();
      }
      send(...args) {
        args.unshift("message");
        this.emit.apply(this, args);
        return this;
      }
      emit(ev, ...args) {
        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
          throw new Error('"' + ev + '" is a reserved event name');
        }
        args.unshift(ev);
        const packet = {
          type: socket_io_parser_1.PacketType.EVENT,
          data: args
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false;
        if (typeof args[args.length - 1] === "function") {
          debug("emitting packet with ack id %d", this.ids);
          this.acks[this.ids] = args.pop();
          packet.id = this.ids++;
        }
        const isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
        const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
        if (discardPacket) {
          debug("discard packet as the transport is not currently writable");
        } else if (this.connected) {
          this.packet(packet);
        } else {
          this.sendBuffer.push(packet);
        }
        this.flags = {};
        return this;
      }
      packet(packet) {
        packet.nsp = this.nsp;
        this.io._packet(packet);
      }
      onopen() {
        debug("transport is open - connecting");
        if (typeof this.auth == "function") {
          this.auth((data) => {
            this.packet({ type: socket_io_parser_1.PacketType.CONNECT, data });
          });
        } else {
          this.packet({ type: socket_io_parser_1.PacketType.CONNECT, data: this.auth });
        }
      }
      onerror(err) {
        if (!this.connected) {
          this.emitReserved("connect_error", err);
        }
      }
      onclose(reason) {
        debug("close (%s)", reason);
        this.connected = false;
        this.disconnected = true;
        delete this.id;
        this.emitReserved("disconnect", reason);
      }
      onpacket(packet) {
        const sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace)
          return;
        switch (packet.type) {
          case socket_io_parser_1.PacketType.CONNECT:
            if (packet.data && packet.data.sid) {
              const id = packet.data.sid;
              this.onconnect(id);
            } else {
              this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
            }
            break;
          case socket_io_parser_1.PacketType.EVENT:
            this.onevent(packet);
            break;
          case socket_io_parser_1.PacketType.BINARY_EVENT:
            this.onevent(packet);
            break;
          case socket_io_parser_1.PacketType.ACK:
            this.onack(packet);
            break;
          case socket_io_parser_1.PacketType.BINARY_ACK:
            this.onack(packet);
            break;
          case socket_io_parser_1.PacketType.DISCONNECT:
            this.ondisconnect();
            break;
          case socket_io_parser_1.PacketType.CONNECT_ERROR:
            const err = new Error(packet.data.message);
            err.data = packet.data.data;
            this.emitReserved("connect_error", err);
            break;
        }
      }
      onevent(packet) {
        const args = packet.data || [];
        debug("emitting event %j", args);
        if (packet.id != null) {
          debug("attaching ack callback to event");
          args.push(this.ack(packet.id));
        }
        if (this.connected) {
          this.emitEvent(args);
        } else {
          this.receiveBuffer.push(Object.freeze(args));
        }
      }
      emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
          const listeners = this._anyListeners.slice();
          for (const listener of listeners) {
            listener.apply(this, args);
          }
        }
        super.emit.apply(this, args);
      }
      ack(id) {
        const self = this;
        let sent = false;
        return function(...args) {
          if (sent)
            return;
          sent = true;
          debug("sending ack %j", args);
          self.packet({
            type: socket_io_parser_1.PacketType.ACK,
            id,
            data: args
          });
        };
      }
      onack(packet) {
        const ack = this.acks[packet.id];
        if (typeof ack === "function") {
          debug("calling ack %s with %j", packet.id, packet.data);
          ack.apply(this, packet.data);
          delete this.acks[packet.id];
        } else {
          debug("bad ack %s", packet.id);
        }
      }
      onconnect(id) {
        debug("socket connected with id %s", id);
        this.id = id;
        this.connected = true;
        this.disconnected = false;
        this.emitBuffered();
        this.emitReserved("connect");
      }
      emitBuffered() {
        this.receiveBuffer.forEach((args) => this.emitEvent(args));
        this.receiveBuffer = [];
        this.sendBuffer.forEach((packet) => this.packet(packet));
        this.sendBuffer = [];
      }
      ondisconnect() {
        debug("server disconnect (%s)", this.nsp);
        this.destroy();
        this.onclose("io server disconnect");
      }
      destroy() {
        if (this.subs) {
          this.subs.forEach((subDestroy) => subDestroy());
          this.subs = void 0;
        }
        this.io["_destroy"](this);
      }
      disconnect() {
        if (this.connected) {
          debug("performing disconnect (%s)", this.nsp);
          this.packet({ type: socket_io_parser_1.PacketType.DISCONNECT });
        }
        this.destroy();
        if (this.connected) {
          this.onclose("io client disconnect");
        }
        return this;
      }
      close() {
        return this.disconnect();
      }
      compress(compress) {
        this.flags.compress = compress;
        return this;
      }
      get volatile() {
        this.flags.volatile = true;
        return this;
      }
      onAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.push(listener);
        return this;
      }
      prependAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.unshift(listener);
        return this;
      }
      offAny(listener) {
        if (!this._anyListeners) {
          return this;
        }
        if (listener) {
          const listeners = this._anyListeners;
          for (let i = 0; i < listeners.length; i++) {
            if (listener === listeners[i]) {
              listeners.splice(i, 1);
              return this;
            }
          }
        } else {
          this._anyListeners = [];
        }
        return this;
      }
      listenersAny() {
        return this._anyListeners || [];
      }
    };
    exports.Socket = Socket2;
  }
});

// node_modules/backo2/index.js
var require_backo2 = __commonJS({
  "node_modules/backo2/index.js"(exports, module2) {
    module2.exports = Backoff;
    function Backoff(opts) {
      opts = opts || {};
      this.ms = opts.min || 100;
      this.max = opts.max || 1e4;
      this.factor = opts.factor || 2;
      this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
      this.attempts = 0;
    }
    Backoff.prototype.duration = function() {
      var ms = this.ms * Math.pow(this.factor, this.attempts++);
      if (this.jitter) {
        var rand = Math.random();
        var deviation = Math.floor(rand * this.jitter * ms);
        ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
      }
      return Math.min(ms, this.max) | 0;
    };
    Backoff.prototype.reset = function() {
      this.attempts = 0;
    };
    Backoff.prototype.setMin = function(min) {
      this.ms = min;
    };
    Backoff.prototype.setMax = function(max) {
      this.max = max;
    };
    Backoff.prototype.setJitter = function(jitter) {
      this.jitter = jitter;
    };
  }
});

// node_modules/socket.io-client/build/manager.js
var require_manager = __commonJS({
  "node_modules/socket.io-client/build/manager.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Manager = void 0;
    var eio = require_lib2();
    var util_1 = require_util();
    var socket_1 = require_socket2();
    var parser = require_dist();
    var on_1 = require_on();
    var Backoff = require_backo2();
    var typed_events_1 = require_typed_events();
    var debug = require_src()("socket.io-client:manager");
    var Manager2 = class extends typed_events_1.StrictEventEmitter {
      constructor(uri, opts) {
        var _a;
        super();
        this.nsps = {};
        this.subs = [];
        if (uri && typeof uri === "object") {
          opts = uri;
          uri = void 0;
        }
        opts = opts || {};
        opts.path = opts.path || "/socket.io";
        this.opts = opts;
        (0, util_1.installTimerFunctions)(this, opts);
        this.reconnection(opts.reconnection !== false);
        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
        this.reconnectionDelay(opts.reconnectionDelay || 1e3);
        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
        this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
        this.backoff = new Backoff({
          min: this.reconnectionDelay(),
          max: this.reconnectionDelayMax(),
          jitter: this.randomizationFactor()
        });
        this.timeout(opts.timeout == null ? 2e4 : opts.timeout);
        this._readyState = "closed";
        this.uri = uri;
        const _parser = opts.parser || parser;
        this.encoder = new _parser.Encoder();
        this.decoder = new _parser.Decoder();
        this._autoConnect = opts.autoConnect !== false;
        if (this._autoConnect)
          this.open();
      }
      reconnection(v) {
        if (!arguments.length)
          return this._reconnection;
        this._reconnection = !!v;
        return this;
      }
      reconnectionAttempts(v) {
        if (v === void 0)
          return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
      }
      reconnectionDelay(v) {
        var _a;
        if (v === void 0)
          return this._reconnectionDelay;
        this._reconnectionDelay = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
        return this;
      }
      randomizationFactor(v) {
        var _a;
        if (v === void 0)
          return this._randomizationFactor;
        this._randomizationFactor = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
        return this;
      }
      reconnectionDelayMax(v) {
        var _a;
        if (v === void 0)
          return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
        return this;
      }
      timeout(v) {
        if (!arguments.length)
          return this._timeout;
        this._timeout = v;
        return this;
      }
      maybeReconnectOnOpen() {
        if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
          this.reconnect();
        }
      }
      open(fn) {
        debug("readyState %s", this._readyState);
        if (~this._readyState.indexOf("open"))
          return this;
        debug("opening %s", this.uri);
        this.engine = eio(this.uri, this.opts);
        const socket = this.engine;
        const self = this;
        this._readyState = "opening";
        this.skipReconnect = false;
        const openSubDestroy = (0, on_1.on)(socket, "open", function() {
          self.onopen();
          fn && fn();
        });
        const errorSub = (0, on_1.on)(socket, "error", (err) => {
          debug("error");
          self.cleanup();
          self._readyState = "closed";
          this.emitReserved("error", err);
          if (fn) {
            fn(err);
          } else {
            self.maybeReconnectOnOpen();
          }
        });
        if (this._timeout !== false) {
          const timeout = this._timeout;
          debug("connect attempt will timeout after %d", timeout);
          if (timeout === 0) {
            openSubDestroy();
          }
          const timer = this.setTimeoutFn(() => {
            debug("connect attempt timed out after %d", timeout);
            openSubDestroy();
            socket.close();
            socket.emit("error", new Error("timeout"));
          }, timeout);
          if (this.opts.autoUnref) {
            timer.unref();
          }
          this.subs.push(function subDestroy() {
            clearTimeout(timer);
          });
        }
        this.subs.push(openSubDestroy);
        this.subs.push(errorSub);
        return this;
      }
      connect(fn) {
        return this.open(fn);
      }
      onopen() {
        debug("open");
        this.cleanup();
        this._readyState = "open";
        this.emitReserved("open");
        const socket = this.engine;
        this.subs.push((0, on_1.on)(socket, "ping", this.onping.bind(this)), (0, on_1.on)(socket, "data", this.ondata.bind(this)), (0, on_1.on)(socket, "error", this.onerror.bind(this)), (0, on_1.on)(socket, "close", this.onclose.bind(this)), (0, on_1.on)(this.decoder, "decoded", this.ondecoded.bind(this)));
      }
      onping() {
        this.emitReserved("ping");
      }
      ondata(data) {
        this.decoder.add(data);
      }
      ondecoded(packet) {
        this.emitReserved("packet", packet);
      }
      onerror(err) {
        debug("error", err);
        this.emitReserved("error", err);
      }
      socket(nsp, opts) {
        let socket = this.nsps[nsp];
        if (!socket) {
          socket = new socket_1.Socket(this, nsp, opts);
          this.nsps[nsp] = socket;
        }
        return socket;
      }
      _destroy(socket) {
        const nsps = Object.keys(this.nsps);
        for (const nsp of nsps) {
          const socket2 = this.nsps[nsp];
          if (socket2.active) {
            debug("socket %s is still active, skipping close", nsp);
            return;
          }
        }
        this._close();
      }
      _packet(packet) {
        debug("writing packet %j", packet);
        const encodedPackets = this.encoder.encode(packet);
        for (let i = 0; i < encodedPackets.length; i++) {
          this.engine.write(encodedPackets[i], packet.options);
        }
      }
      cleanup() {
        debug("cleanup");
        this.subs.forEach((subDestroy) => subDestroy());
        this.subs.length = 0;
        this.decoder.destroy();
      }
      _close() {
        debug("disconnect");
        this.skipReconnect = true;
        this._reconnecting = false;
        if (this._readyState === "opening") {
          this.cleanup();
        }
        this.backoff.reset();
        this._readyState = "closed";
        if (this.engine)
          this.engine.close();
      }
      disconnect() {
        return this._close();
      }
      onclose(reason) {
        debug("onclose");
        this.cleanup();
        this.backoff.reset();
        this._readyState = "closed";
        this.emitReserved("close", reason);
        if (this._reconnection && !this.skipReconnect) {
          this.reconnect();
        }
      }
      reconnect() {
        if (this._reconnecting || this.skipReconnect)
          return this;
        const self = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) {
          debug("reconnect failed");
          this.backoff.reset();
          this.emitReserved("reconnect_failed");
          this._reconnecting = false;
        } else {
          const delay = this.backoff.duration();
          debug("will wait %dms before reconnect attempt", delay);
          this._reconnecting = true;
          const timer = this.setTimeoutFn(() => {
            if (self.skipReconnect)
              return;
            debug("attempting reconnect");
            this.emitReserved("reconnect_attempt", self.backoff.attempts);
            if (self.skipReconnect)
              return;
            self.open((err) => {
              if (err) {
                debug("reconnect attempt error");
                self._reconnecting = false;
                self.reconnect();
                this.emitReserved("reconnect_error", err);
              } else {
                debug("reconnect success");
                self.onreconnect();
              }
            });
          }, delay);
          if (this.opts.autoUnref) {
            timer.unref();
          }
          this.subs.push(function subDestroy() {
            clearTimeout(timer);
          });
        }
      }
      onreconnect() {
        const attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();
        this.emitReserved("reconnect", attempt);
      }
    };
    exports.Manager = Manager2;
  }
});

// node_modules/socket.io-client/build/index.js
var require_build = __commonJS({
  "node_modules/socket.io-client/build/index.js"(exports, module2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.io = exports.Socket = exports.Manager = exports.protocol = void 0;
    var url_1 = require_url();
    var manager_1 = require_manager();
    var debug = require_src()("socket.io-client");
    module2.exports = exports = lookup;
    var cache = exports.managers = {};
    function lookup(uri, opts) {
      if (typeof uri === "object") {
        opts = uri;
        uri = void 0;
      }
      opts = opts || {};
      const parsed = (0, url_1.url)(uri, opts.path || "/socket.io");
      const source = parsed.source;
      const id = parsed.id;
      const path = parsed.path;
      const sameNamespace = cache[id] && path in cache[id]["nsps"];
      const newConnection = opts.forceNew || opts["force new connection"] || opts.multiplex === false || sameNamespace;
      let io2;
      if (newConnection) {
        debug("ignoring socket cache for %s", source);
        io2 = new manager_1.Manager(source, opts);
      } else {
        if (!cache[id]) {
          debug("new io instance for %s", source);
          cache[id] = new manager_1.Manager(source, opts);
        }
        io2 = cache[id];
      }
      if (parsed.query && !opts.query) {
        opts.query = parsed.queryKey;
      }
      return io2.socket(parsed.path, opts);
    }
    exports.io = lookup;
    var socket_io_parser_1 = require_dist();
    Object.defineProperty(exports, "protocol", { enumerable: true, get: function() {
      return socket_io_parser_1.protocol;
    } });
    exports.connect = lookup;
    var manager_2 = require_manager();
    Object.defineProperty(exports, "Manager", { enumerable: true, get: function() {
      return manager_2.Manager;
    } });
    var socket_1 = require_socket2();
    Object.defineProperty(exports, "Socket", { enumerable: true, get: function() {
      return socket_1.Socket;
    } });
    exports.default = lookup;
  }
});

// node_modules/is-docker/index.js
var require_is_docker = __commonJS({
  "node_modules/is-docker/index.js"(exports, module2) {
    "use strict";
    var fs2 = require("fs");
    var isDocker;
    function hasDockerEnv() {
      try {
        fs2.statSync("/.dockerenv");
        return true;
      } catch (_) {
        return false;
      }
    }
    function hasDockerCGroup() {
      try {
        return fs2.readFileSync("/proc/self/cgroup", "utf8").includes("docker");
      } catch (_) {
        return false;
      }
    }
    module2.exports = () => {
      if (isDocker === void 0) {
        isDocker = hasDockerEnv() || hasDockerCGroup();
      }
      return isDocker;
    };
  }
});

// node_modules/is-wsl/index.js
var require_is_wsl = __commonJS({
  "node_modules/is-wsl/index.js"(exports, module2) {
    "use strict";
    var os = require("os");
    var fs2 = require("fs");
    var isDocker = require_is_docker();
    var isWsl = () => {
      if (process.platform !== "linux") {
        return false;
      }
      if (os.release().toLowerCase().includes("microsoft")) {
        if (isDocker()) {
          return false;
        }
        return true;
      }
      try {
        return fs2.readFileSync("/proc/version", "utf8").toLowerCase().includes("microsoft") ? !isDocker() : false;
      } catch (_) {
        return false;
      }
    };
    if (process.env.__IS_WSL_TEST__) {
      module2.exports = isWsl;
    } else {
      module2.exports = isWsl();
    }
  }
});

// node_modules/nice-try/src/index.js
var require_src2 = __commonJS({
  "node_modules/nice-try/src/index.js"(exports, module2) {
    "use strict";
    module2.exports = function(fn) {
      try {
        return fn();
      } catch (e) {
      }
    };
  }
});

// node_modules/isexe/windows.js
var require_windows = __commonJS({
  "node_modules/isexe/windows.js"(exports, module2) {
    module2.exports = isexe;
    isexe.sync = sync;
    var fs2 = require("fs");
    function checkPathExt(path, options) {
      var pathext = options.pathExt !== void 0 ? options.pathExt : process.env.PATHEXT;
      if (!pathext) {
        return true;
      }
      pathext = pathext.split(";");
      if (pathext.indexOf("") !== -1) {
        return true;
      }
      for (var i = 0; i < pathext.length; i++) {
        var p = pathext[i].toLowerCase();
        if (p && path.substr(-p.length).toLowerCase() === p) {
          return true;
        }
      }
      return false;
    }
    function checkStat(stat, path, options) {
      if (!stat.isSymbolicLink() && !stat.isFile()) {
        return false;
      }
      return checkPathExt(path, options);
    }
    function isexe(path, options, cb) {
      fs2.stat(path, function(er, stat) {
        cb(er, er ? false : checkStat(stat, path, options));
      });
    }
    function sync(path, options) {
      return checkStat(fs2.statSync(path), path, options);
    }
  }
});

// node_modules/isexe/mode.js
var require_mode = __commonJS({
  "node_modules/isexe/mode.js"(exports, module2) {
    module2.exports = isexe;
    isexe.sync = sync;
    var fs2 = require("fs");
    function isexe(path, options, cb) {
      fs2.stat(path, function(er, stat) {
        cb(er, er ? false : checkStat(stat, options));
      });
    }
    function sync(path, options) {
      return checkStat(fs2.statSync(path), options);
    }
    function checkStat(stat, options) {
      return stat.isFile() && checkMode(stat, options);
    }
    function checkMode(stat, options) {
      var mod = stat.mode;
      var uid = stat.uid;
      var gid = stat.gid;
      var myUid = options.uid !== void 0 ? options.uid : process.getuid && process.getuid();
      var myGid = options.gid !== void 0 ? options.gid : process.getgid && process.getgid();
      var u = parseInt("100", 8);
      var g = parseInt("010", 8);
      var o = parseInt("001", 8);
      var ug = u | g;
      var ret = mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;
      return ret;
    }
  }
});

// node_modules/isexe/index.js
var require_isexe = __commonJS({
  "node_modules/isexe/index.js"(exports, module2) {
    var fs2 = require("fs");
    var core;
    if (process.platform === "win32" || global.TESTING_WINDOWS) {
      core = require_windows();
    } else {
      core = require_mode();
    }
    module2.exports = isexe;
    isexe.sync = sync;
    function isexe(path, options, cb) {
      if (typeof options === "function") {
        cb = options;
        options = {};
      }
      if (!cb) {
        if (typeof Promise !== "function") {
          throw new TypeError("callback not provided");
        }
        return new Promise(function(resolve, reject) {
          isexe(path, options || {}, function(er, is) {
            if (er) {
              reject(er);
            } else {
              resolve(is);
            }
          });
        });
      }
      core(path, options || {}, function(er, is) {
        if (er) {
          if (er.code === "EACCES" || options && options.ignoreErrors) {
            er = null;
            is = false;
          }
        }
        cb(er, is);
      });
    }
    function sync(path, options) {
      try {
        return core.sync(path, options || {});
      } catch (er) {
        if (options && options.ignoreErrors || er.code === "EACCES") {
          return false;
        } else {
          throw er;
        }
      }
    }
  }
});

// node_modules/which/which.js
var require_which = __commonJS({
  "node_modules/which/which.js"(exports, module2) {
    module2.exports = which;
    which.sync = whichSync;
    var isWindows = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";
    var path = require("path");
    var COLON = isWindows ? ";" : ":";
    var isexe = require_isexe();
    function getNotFoundError(cmd) {
      var er = new Error("not found: " + cmd);
      er.code = "ENOENT";
      return er;
    }
    function getPathInfo(cmd, opt) {
      var colon = opt.colon || COLON;
      var pathEnv = opt.path || process.env.PATH || "";
      var pathExt = [""];
      pathEnv = pathEnv.split(colon);
      var pathExtExe = "";
      if (isWindows) {
        pathEnv.unshift(process.cwd());
        pathExtExe = opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM";
        pathExt = pathExtExe.split(colon);
        if (cmd.indexOf(".") !== -1 && pathExt[0] !== "")
          pathExt.unshift("");
      }
      if (cmd.match(/\//) || isWindows && cmd.match(/\\/))
        pathEnv = [""];
      return {
        env: pathEnv,
        ext: pathExt,
        extExe: pathExtExe
      };
    }
    function which(cmd, opt, cb) {
      if (typeof opt === "function") {
        cb = opt;
        opt = {};
      }
      var info = getPathInfo(cmd, opt);
      var pathEnv = info.env;
      var pathExt = info.ext;
      var pathExtExe = info.extExe;
      var found = [];
      (function F(i, l) {
        if (i === l) {
          if (opt.all && found.length)
            return cb(null, found);
          else
            return cb(getNotFoundError(cmd));
        }
        var pathPart = pathEnv[i];
        if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"')
          pathPart = pathPart.slice(1, -1);
        var p = path.join(pathPart, cmd);
        if (!pathPart && /^\.[\\\/]/.test(cmd)) {
          p = cmd.slice(0, 2) + p;
        }
        ;
        (function E(ii, ll) {
          if (ii === ll)
            return F(i + 1, l);
          var ext = pathExt[ii];
          isexe(p + ext, { pathExt: pathExtExe }, function(er, is) {
            if (!er && is) {
              if (opt.all)
                found.push(p + ext);
              else
                return cb(null, p + ext);
            }
            return E(ii + 1, ll);
          });
        })(0, pathExt.length);
      })(0, pathEnv.length);
    }
    function whichSync(cmd, opt) {
      opt = opt || {};
      var info = getPathInfo(cmd, opt);
      var pathEnv = info.env;
      var pathExt = info.ext;
      var pathExtExe = info.extExe;
      var found = [];
      for (var i = 0, l = pathEnv.length; i < l; i++) {
        var pathPart = pathEnv[i];
        if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"')
          pathPart = pathPart.slice(1, -1);
        var p = path.join(pathPart, cmd);
        if (!pathPart && /^\.[\\\/]/.test(cmd)) {
          p = cmd.slice(0, 2) + p;
        }
        for (var j = 0, ll = pathExt.length; j < ll; j++) {
          var cur = p + pathExt[j];
          var is;
          try {
            is = isexe.sync(cur, { pathExt: pathExtExe });
            if (is) {
              if (opt.all)
                found.push(cur);
              else
                return cur;
            }
          } catch (ex) {
          }
        }
      }
      if (opt.all && found.length)
        return found;
      if (opt.nothrow)
        return null;
      throw getNotFoundError(cmd);
    }
  }
});

// node_modules/path-key/index.js
var require_path_key = __commonJS({
  "node_modules/path-key/index.js"(exports, module2) {
    "use strict";
    module2.exports = (opts) => {
      opts = opts || {};
      const env = opts.env || process.env;
      const platform = opts.platform || process.platform;
      if (platform !== "win32") {
        return "PATH";
      }
      return Object.keys(env).find((x) => x.toUpperCase() === "PATH") || "Path";
    };
  }
});

// node_modules/cross-spawn/lib/util/resolveCommand.js
var require_resolveCommand = __commonJS({
  "node_modules/cross-spawn/lib/util/resolveCommand.js"(exports, module2) {
    "use strict";
    var path = require("path");
    var which = require_which();
    var pathKey = require_path_key()();
    function resolveCommandAttempt(parsed, withoutPathExt) {
      const cwd = process.cwd();
      const hasCustomCwd = parsed.options.cwd != null;
      if (hasCustomCwd) {
        try {
          process.chdir(parsed.options.cwd);
        } catch (err) {
        }
      }
      let resolved;
      try {
        resolved = which.sync(parsed.command, {
          path: (parsed.options.env || process.env)[pathKey],
          pathExt: withoutPathExt ? path.delimiter : void 0
        });
      } catch (e) {
      } finally {
        process.chdir(cwd);
      }
      if (resolved) {
        resolved = path.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved);
      }
      return resolved;
    }
    function resolveCommand(parsed) {
      return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
    }
    module2.exports = resolveCommand;
  }
});

// node_modules/cross-spawn/lib/util/escape.js
var require_escape = __commonJS({
  "node_modules/cross-spawn/lib/util/escape.js"(exports, module2) {
    "use strict";
    var metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
    function escapeCommand(arg) {
      arg = arg.replace(metaCharsRegExp, "^$1");
      return arg;
    }
    function escapeArgument(arg, doubleEscapeMetaChars) {
      arg = `${arg}`;
      arg = arg.replace(/(\\*)"/g, '$1$1\\"');
      arg = arg.replace(/(\\*)$/, "$1$1");
      arg = `"${arg}"`;
      arg = arg.replace(metaCharsRegExp, "^$1");
      if (doubleEscapeMetaChars) {
        arg = arg.replace(metaCharsRegExp, "^$1");
      }
      return arg;
    }
    module2.exports.command = escapeCommand;
    module2.exports.argument = escapeArgument;
  }
});

// node_modules/shebang-regex/index.js
var require_shebang_regex = __commonJS({
  "node_modules/shebang-regex/index.js"(exports, module2) {
    "use strict";
    module2.exports = /^#!.*/;
  }
});

// node_modules/shebang-command/index.js
var require_shebang_command = __commonJS({
  "node_modules/shebang-command/index.js"(exports, module2) {
    "use strict";
    var shebangRegex = require_shebang_regex();
    module2.exports = function(str) {
      var match = str.match(shebangRegex);
      if (!match) {
        return null;
      }
      var arr = match[0].replace(/#! ?/, "").split(" ");
      var bin = arr[0].split("/").pop();
      var arg = arr[1];
      return bin === "env" ? arg : bin + (arg ? " " + arg : "");
    };
  }
});

// node_modules/cross-spawn/lib/util/readShebang.js
var require_readShebang = __commonJS({
  "node_modules/cross-spawn/lib/util/readShebang.js"(exports, module2) {
    "use strict";
    var fs2 = require("fs");
    var shebangCommand = require_shebang_command();
    function readShebang(command) {
      const size = 150;
      let buffer;
      if (Buffer.alloc) {
        buffer = Buffer.alloc(size);
      } else {
        buffer = new Buffer(size);
        buffer.fill(0);
      }
      let fd;
      try {
        fd = fs2.openSync(command, "r");
        fs2.readSync(fd, buffer, 0, size, 0);
        fs2.closeSync(fd);
      } catch (e) {
      }
      return shebangCommand(buffer.toString());
    }
    module2.exports = readShebang;
  }
});

// node_modules/semver/semver.js
var require_semver = __commonJS({
  "node_modules/semver/semver.js"(exports, module2) {
    exports = module2.exports = SemVer;
    var debug;
    if (typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
      debug = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift("SEMVER");
        console.log.apply(console, args);
      };
    } else {
      debug = function() {
      };
    }
    exports.SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var re = exports.re = [];
    var src = exports.src = [];
    var R = 0;
    var NUMERICIDENTIFIER = R++;
    src[NUMERICIDENTIFIER] = "0|[1-9]\\d*";
    var NUMERICIDENTIFIERLOOSE = R++;
    src[NUMERICIDENTIFIERLOOSE] = "[0-9]+";
    var NONNUMERICIDENTIFIER = R++;
    src[NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
    var MAINVERSION = R++;
    src[MAINVERSION] = "(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")";
    var MAINVERSIONLOOSE = R++;
    src[MAINVERSIONLOOSE] = "(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")";
    var PRERELEASEIDENTIFIER = R++;
    src[PRERELEASEIDENTIFIER] = "(?:" + src[NUMERICIDENTIFIER] + "|" + src[NONNUMERICIDENTIFIER] + ")";
    var PRERELEASEIDENTIFIERLOOSE = R++;
    src[PRERELEASEIDENTIFIERLOOSE] = "(?:" + src[NUMERICIDENTIFIERLOOSE] + "|" + src[NONNUMERICIDENTIFIER] + ")";
    var PRERELEASE = R++;
    src[PRERELEASE] = "(?:-(" + src[PRERELEASEIDENTIFIER] + "(?:\\." + src[PRERELEASEIDENTIFIER] + ")*))";
    var PRERELEASELOOSE = R++;
    src[PRERELEASELOOSE] = "(?:-?(" + src[PRERELEASEIDENTIFIERLOOSE] + "(?:\\." + src[PRERELEASEIDENTIFIERLOOSE] + ")*))";
    var BUILDIDENTIFIER = R++;
    src[BUILDIDENTIFIER] = "[0-9A-Za-z-]+";
    var BUILD = R++;
    src[BUILD] = "(?:\\+(" + src[BUILDIDENTIFIER] + "(?:\\." + src[BUILDIDENTIFIER] + ")*))";
    var FULL = R++;
    var FULLPLAIN = "v?" + src[MAINVERSION] + src[PRERELEASE] + "?" + src[BUILD] + "?";
    src[FULL] = "^" + FULLPLAIN + "$";
    var LOOSEPLAIN = "[v=\\s]*" + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + "?" + src[BUILD] + "?";
    var LOOSE = R++;
    src[LOOSE] = "^" + LOOSEPLAIN + "$";
    var GTLT = R++;
    src[GTLT] = "((?:<|>)?=?)";
    var XRANGEIDENTIFIERLOOSE = R++;
    src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + "|x|X|\\*";
    var XRANGEIDENTIFIER = R++;
    src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + "|x|X|\\*";
    var XRANGEPLAIN = R++;
    src[XRANGEPLAIN] = "[v=\\s]*(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:" + src[PRERELEASE] + ")?" + src[BUILD] + "?)?)?";
    var XRANGEPLAINLOOSE = R++;
    src[XRANGEPLAINLOOSE] = "[v=\\s]*(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:" + src[PRERELEASELOOSE] + ")?" + src[BUILD] + "?)?)?";
    var XRANGE = R++;
    src[XRANGE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAIN] + "$";
    var XRANGELOOSE = R++;
    src[XRANGELOOSE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAINLOOSE] + "$";
    var COERCE = R++;
    src[COERCE] = "(?:^|[^\\d])(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "})(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:$|[^\\d])";
    var LONETILDE = R++;
    src[LONETILDE] = "(?:~>?)";
    var TILDETRIM = R++;
    src[TILDETRIM] = "(\\s*)" + src[LONETILDE] + "\\s+";
    re[TILDETRIM] = new RegExp(src[TILDETRIM], "g");
    var tildeTrimReplace = "$1~";
    var TILDE = R++;
    src[TILDE] = "^" + src[LONETILDE] + src[XRANGEPLAIN] + "$";
    var TILDELOOSE = R++;
    src[TILDELOOSE] = "^" + src[LONETILDE] + src[XRANGEPLAINLOOSE] + "$";
    var LONECARET = R++;
    src[LONECARET] = "(?:\\^)";
    var CARETTRIM = R++;
    src[CARETTRIM] = "(\\s*)" + src[LONECARET] + "\\s+";
    re[CARETTRIM] = new RegExp(src[CARETTRIM], "g");
    var caretTrimReplace = "$1^";
    var CARET = R++;
    src[CARET] = "^" + src[LONECARET] + src[XRANGEPLAIN] + "$";
    var CARETLOOSE = R++;
    src[CARETLOOSE] = "^" + src[LONECARET] + src[XRANGEPLAINLOOSE] + "$";
    var COMPARATORLOOSE = R++;
    src[COMPARATORLOOSE] = "^" + src[GTLT] + "\\s*(" + LOOSEPLAIN + ")$|^$";
    var COMPARATOR = R++;
    src[COMPARATOR] = "^" + src[GTLT] + "\\s*(" + FULLPLAIN + ")$|^$";
    var COMPARATORTRIM = R++;
    src[COMPARATORTRIM] = "(\\s*)" + src[GTLT] + "\\s*(" + LOOSEPLAIN + "|" + src[XRANGEPLAIN] + ")";
    re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], "g");
    var comparatorTrimReplace = "$1$2$3";
    var HYPHENRANGE = R++;
    src[HYPHENRANGE] = "^\\s*(" + src[XRANGEPLAIN] + ")\\s+-\\s+(" + src[XRANGEPLAIN] + ")\\s*$";
    var HYPHENRANGELOOSE = R++;
    src[HYPHENRANGELOOSE] = "^\\s*(" + src[XRANGEPLAINLOOSE] + ")\\s+-\\s+(" + src[XRANGEPLAINLOOSE] + ")\\s*$";
    var STAR = R++;
    src[STAR] = "(<|>)?=?\\s*\\*";
    for (i = 0; i < R; i++) {
      debug(i, src[i]);
      if (!re[i]) {
        re[i] = new RegExp(src[i]);
      }
    }
    var i;
    exports.parse = parse2;
    function parse2(version, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version !== "string") {
        return null;
      }
      if (version.length > MAX_LENGTH) {
        return null;
      }
      var r = options.loose ? re[LOOSE] : re[FULL];
      if (!r.test(version)) {
        return null;
      }
      try {
        return new SemVer(version, options);
      } catch (er) {
        return null;
      }
    }
    exports.valid = valid;
    function valid(version, options) {
      var v = parse2(version, options);
      return v ? v.version : null;
    }
    exports.clean = clean;
    function clean(version, options) {
      var s = parse2(version.trim().replace(/^[=v]+/, ""), options);
      return s ? s.version : null;
    }
    exports.SemVer = SemVer;
    function SemVer(version, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (version instanceof SemVer) {
        if (version.loose === options.loose) {
          return version;
        } else {
          version = version.version;
        }
      } else if (typeof version !== "string") {
        throw new TypeError("Invalid Version: " + version);
      }
      if (version.length > MAX_LENGTH) {
        throw new TypeError("version is longer than " + MAX_LENGTH + " characters");
      }
      if (!(this instanceof SemVer)) {
        return new SemVer(version, options);
      }
      debug("SemVer", version, options);
      this.options = options;
      this.loose = !!options.loose;
      var m = version.trim().match(options.loose ? re[LOOSE] : re[FULL]);
      if (!m) {
        throw new TypeError("Invalid Version: " + version);
      }
      this.raw = version;
      this.major = +m[1];
      this.minor = +m[2];
      this.patch = +m[3];
      if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
        throw new TypeError("Invalid major version");
      }
      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
        throw new TypeError("Invalid minor version");
      }
      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
        throw new TypeError("Invalid patch version");
      }
      if (!m[4]) {
        this.prerelease = [];
      } else {
        this.prerelease = m[4].split(".").map(function(id) {
          if (/^[0-9]+$/.test(id)) {
            var num = +id;
            if (num >= 0 && num < MAX_SAFE_INTEGER) {
              return num;
            }
          }
          return id;
        });
      }
      this.build = m[5] ? m[5].split(".") : [];
      this.format();
    }
    SemVer.prototype.format = function() {
      this.version = this.major + "." + this.minor + "." + this.patch;
      if (this.prerelease.length) {
        this.version += "-" + this.prerelease.join(".");
      }
      return this.version;
    };
    SemVer.prototype.toString = function() {
      return this.version;
    };
    SemVer.prototype.compare = function(other) {
      debug("SemVer.compare", this.version, this.options, other);
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return this.compareMain(other) || this.comparePre(other);
    };
    SemVer.prototype.compareMain = function(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
    };
    SemVer.prototype.comparePre = function(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      if (this.prerelease.length && !other.prerelease.length) {
        return -1;
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1;
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0;
      }
      var i2 = 0;
      do {
        var a = this.prerelease[i2];
        var b = other.prerelease[i2];
        debug("prerelease compare", i2, a, b);
        if (a === void 0 && b === void 0) {
          return 0;
        } else if (b === void 0) {
          return 1;
        } else if (a === void 0) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i2);
    };
    SemVer.prototype.inc = function(release, identifier) {
      switch (release) {
        case "premajor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc("pre", identifier);
          break;
        case "preminor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc("pre", identifier);
          break;
        case "prepatch":
          this.prerelease.length = 0;
          this.inc("patch", identifier);
          this.inc("pre", identifier);
          break;
        case "prerelease":
          if (this.prerelease.length === 0) {
            this.inc("patch", identifier);
          }
          this.inc("pre", identifier);
          break;
        case "major":
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
            this.major++;
          }
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;
        case "minor":
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++;
          }
          this.patch = 0;
          this.prerelease = [];
          break;
        case "patch":
          if (this.prerelease.length === 0) {
            this.patch++;
          }
          this.prerelease = [];
          break;
        case "pre":
          if (this.prerelease.length === 0) {
            this.prerelease = [0];
          } else {
            var i2 = this.prerelease.length;
            while (--i2 >= 0) {
              if (typeof this.prerelease[i2] === "number") {
                this.prerelease[i2]++;
                i2 = -2;
              }
            }
            if (i2 === -1) {
              this.prerelease.push(0);
            }
          }
          if (identifier) {
            if (this.prerelease[0] === identifier) {
              if (isNaN(this.prerelease[1])) {
                this.prerelease = [identifier, 0];
              }
            } else {
              this.prerelease = [identifier, 0];
            }
          }
          break;
        default:
          throw new Error("invalid increment argument: " + release);
      }
      this.format();
      this.raw = this.version;
      return this;
    };
    exports.inc = inc;
    function inc(version, release, loose, identifier) {
      if (typeof loose === "string") {
        identifier = loose;
        loose = void 0;
      }
      try {
        return new SemVer(version, loose).inc(release, identifier).version;
      } catch (er) {
        return null;
      }
    }
    exports.diff = diff;
    function diff(version1, version2) {
      if (eq(version1, version2)) {
        return null;
      } else {
        var v1 = parse2(version1);
        var v2 = parse2(version2);
        var prefix = "";
        if (v1.prerelease.length || v2.prerelease.length) {
          prefix = "pre";
          var defaultResult = "prerelease";
        }
        for (var key in v1) {
          if (key === "major" || key === "minor" || key === "patch") {
            if (v1[key] !== v2[key]) {
              return prefix + key;
            }
          }
        }
        return defaultResult;
      }
    }
    exports.compareIdentifiers = compareIdentifiers;
    var numeric = /^[0-9]+$/;
    function compareIdentifiers(a, b) {
      var anum = numeric.test(a);
      var bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    }
    exports.rcompareIdentifiers = rcompareIdentifiers;
    function rcompareIdentifiers(a, b) {
      return compareIdentifiers(b, a);
    }
    exports.major = major;
    function major(a, loose) {
      return new SemVer(a, loose).major;
    }
    exports.minor = minor;
    function minor(a, loose) {
      return new SemVer(a, loose).minor;
    }
    exports.patch = patch;
    function patch(a, loose) {
      return new SemVer(a, loose).patch;
    }
    exports.compare = compare;
    function compare(a, b, loose) {
      return new SemVer(a, loose).compare(new SemVer(b, loose));
    }
    exports.compareLoose = compareLoose;
    function compareLoose(a, b) {
      return compare(a, b, true);
    }
    exports.rcompare = rcompare;
    function rcompare(a, b, loose) {
      return compare(b, a, loose);
    }
    exports.sort = sort;
    function sort(list, loose) {
      return list.sort(function(a, b) {
        return exports.compare(a, b, loose);
      });
    }
    exports.rsort = rsort;
    function rsort(list, loose) {
      return list.sort(function(a, b) {
        return exports.rcompare(a, b, loose);
      });
    }
    exports.gt = gt;
    function gt(a, b, loose) {
      return compare(a, b, loose) > 0;
    }
    exports.lt = lt;
    function lt(a, b, loose) {
      return compare(a, b, loose) < 0;
    }
    exports.eq = eq;
    function eq(a, b, loose) {
      return compare(a, b, loose) === 0;
    }
    exports.neq = neq;
    function neq(a, b, loose) {
      return compare(a, b, loose) !== 0;
    }
    exports.gte = gte;
    function gte(a, b, loose) {
      return compare(a, b, loose) >= 0;
    }
    exports.lte = lte;
    function lte(a, b, loose) {
      return compare(a, b, loose) <= 0;
    }
    exports.cmp = cmp;
    function cmp(a, op, b, loose) {
      switch (op) {
        case "===":
          if (typeof a === "object")
            a = a.version;
          if (typeof b === "object")
            b = b.version;
          return a === b;
        case "!==":
          if (typeof a === "object")
            a = a.version;
          if (typeof b === "object")
            b = b.version;
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError("Invalid operator: " + op);
      }
    }
    exports.Comparator = Comparator;
    function Comparator(comp, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (comp instanceof Comparator) {
        if (comp.loose === !!options.loose) {
          return comp;
        } else {
          comp = comp.value;
        }
      }
      if (!(this instanceof Comparator)) {
        return new Comparator(comp, options);
      }
      debug("comparator", comp, options);
      this.options = options;
      this.loose = !!options.loose;
      this.parse(comp);
      if (this.semver === ANY) {
        this.value = "";
      } else {
        this.value = this.operator + this.semver.version;
      }
      debug("comp", this);
    }
    var ANY = {};
    Comparator.prototype.parse = function(comp) {
      var r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
      var m = comp.match(r);
      if (!m) {
        throw new TypeError("Invalid comparator: " + comp);
      }
      this.operator = m[1];
      if (this.operator === "=") {
        this.operator = "";
      }
      if (!m[2]) {
        this.semver = ANY;
      } else {
        this.semver = new SemVer(m[2], this.options.loose);
      }
    };
    Comparator.prototype.toString = function() {
      return this.value;
    };
    Comparator.prototype.test = function(version) {
      debug("Comparator.test", version, this.options.loose);
      if (this.semver === ANY) {
        return true;
      }
      if (typeof version === "string") {
        version = new SemVer(version, this.options);
      }
      return cmp(version, this.operator, this.semver, this.options);
    };
    Comparator.prototype.intersects = function(comp, options) {
      if (!(comp instanceof Comparator)) {
        throw new TypeError("a Comparator is required");
      }
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      var rangeTmp;
      if (this.operator === "") {
        rangeTmp = new Range(comp.value, options);
        return satisfies(this.value, rangeTmp, options);
      } else if (comp.operator === "") {
        rangeTmp = new Range(this.value, options);
        return satisfies(comp.semver, rangeTmp, options);
      }
      var sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
      var sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
      var sameSemVer = this.semver.version === comp.semver.version;
      var differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
      var oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && ((this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<"));
      var oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && ((this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">"));
      return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
    };
    exports.Range = Range;
    function Range(range, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (range instanceof Range) {
        if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
          return range;
        } else {
          return new Range(range.raw, options);
        }
      }
      if (range instanceof Comparator) {
        return new Range(range.value, options);
      }
      if (!(this instanceof Range)) {
        return new Range(range, options);
      }
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      this.raw = range;
      this.set = range.split(/\s*\|\|\s*/).map(function(range2) {
        return this.parseRange(range2.trim());
      }, this).filter(function(c) {
        return c.length;
      });
      if (!this.set.length) {
        throw new TypeError("Invalid SemVer Range: " + range);
      }
      this.format();
    }
    Range.prototype.format = function() {
      this.range = this.set.map(function(comps) {
        return comps.join(" ").trim();
      }).join("||").trim();
      return this.range;
    };
    Range.prototype.toString = function() {
      return this.range;
    };
    Range.prototype.parseRange = function(range) {
      var loose = this.options.loose;
      range = range.trim();
      var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
      range = range.replace(hr, hyphenReplace);
      debug("hyphen replace", range);
      range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
      debug("comparator trim", range, re[COMPARATORTRIM]);
      range = range.replace(re[TILDETRIM], tildeTrimReplace);
      range = range.replace(re[CARETTRIM], caretTrimReplace);
      range = range.split(/\s+/).join(" ");
      var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
      var set = range.split(" ").map(function(comp) {
        return parseComparator(comp, this.options);
      }, this).join(" ").split(/\s+/);
      if (this.options.loose) {
        set = set.filter(function(comp) {
          return !!comp.match(compRe);
        });
      }
      set = set.map(function(comp) {
        return new Comparator(comp, this.options);
      }, this);
      return set;
    };
    Range.prototype.intersects = function(range, options) {
      if (!(range instanceof Range)) {
        throw new TypeError("a Range is required");
      }
      return this.set.some(function(thisComparators) {
        return thisComparators.every(function(thisComparator) {
          return range.set.some(function(rangeComparators) {
            return rangeComparators.every(function(rangeComparator) {
              return thisComparator.intersects(rangeComparator, options);
            });
          });
        });
      });
    };
    exports.toComparators = toComparators;
    function toComparators(range, options) {
      return new Range(range, options).set.map(function(comp) {
        return comp.map(function(c) {
          return c.value;
        }).join(" ").trim().split(" ");
      });
    }
    function parseComparator(comp, options) {
      debug("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug("caret", comp);
      comp = replaceTildes(comp, options);
      debug("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug("xrange", comp);
      comp = replaceStars(comp, options);
      debug("stars", comp);
      return comp;
    }
    function isX(id) {
      return !id || id.toLowerCase() === "x" || id === "*";
    }
    function replaceTildes(comp, options) {
      return comp.trim().split(/\s+/).map(function(comp2) {
        return replaceTilde(comp2, options);
      }).join(" ");
    }
    function replaceTilde(comp, options) {
      var r = options.loose ? re[TILDELOOSE] : re[TILDE];
      return comp.replace(r, function(_, M, m, p, pr) {
        debug("tilde", comp, _, M, m, p, pr);
        var ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (isX(p)) {
          ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        } else if (pr) {
          debug("replaceTilde pr", pr);
          ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
        } else {
          ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
        }
        debug("tilde return", ret);
        return ret;
      });
    }
    function replaceCarets(comp, options) {
      return comp.trim().split(/\s+/).map(function(comp2) {
        return replaceCaret(comp2, options);
      }).join(" ");
    }
    function replaceCaret(comp, options) {
      debug("caret", comp, options);
      var r = options.loose ? re[CARETLOOSE] : re[CARET];
      return comp.replace(r, function(_, M, m, p, pr) {
        debug("caret", comp, _, M, m, p, pr);
        var ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (isX(p)) {
          if (M === "0") {
            ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
          } else {
            ret = ">=" + M + "." + m + ".0 <" + (+M + 1) + ".0.0";
          }
        } else if (pr) {
          debug("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + m + "." + (+p + 1);
            } else {
              ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
            }
          } else {
            ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + (+M + 1) + ".0.0";
          }
        } else {
          debug("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = ">=" + M + "." + m + "." + p + " <" + M + "." + m + "." + (+p + 1);
            } else {
              ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
            }
          } else {
            ret = ">=" + M + "." + m + "." + p + " <" + (+M + 1) + ".0.0";
          }
        }
        debug("caret return", ret);
        return ret;
      });
    }
    function replaceXRanges(comp, options) {
      debug("replaceXRanges", comp, options);
      return comp.split(/\s+/).map(function(comp2) {
        return replaceXRange(comp2, options);
      }).join(" ");
    }
    function replaceXRange(comp, options) {
      comp = comp.trim();
      var r = options.loose ? re[XRANGELOOSE] : re[XRANGE];
      return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
        debug("xRange", comp, ret, gtlt, M, m, p, pr);
        var xM = isX(M);
        var xm = xM || isX(m);
        var xp = xm || isX(p);
        var anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          ret = gtlt + M + "." + m + "." + p;
        } else if (xm) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (xp) {
          ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        }
        debug("xRange return", ret);
        return ret;
      });
    }
    function replaceStars(comp, options) {
      debug("replaceStars", comp, options);
      return comp.trim().replace(re[STAR], "");
    }
    function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = ">=" + fM + ".0.0";
      } else if (isX(fp)) {
        from = ">=" + fM + "." + fm + ".0";
      } else {
        from = ">=" + from;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = "<" + (+tM + 1) + ".0.0";
      } else if (isX(tp)) {
        to = "<" + tM + "." + (+tm + 1) + ".0";
      } else if (tpr) {
        to = "<=" + tM + "." + tm + "." + tp + "-" + tpr;
      } else {
        to = "<=" + to;
      }
      return (from + " " + to).trim();
    }
    Range.prototype.test = function(version) {
      if (!version) {
        return false;
      }
      if (typeof version === "string") {
        version = new SemVer(version, this.options);
      }
      for (var i2 = 0; i2 < this.set.length; i2++) {
        if (testSet(this.set[i2], version, this.options)) {
          return true;
        }
      }
      return false;
    };
    function testSet(set, version, options) {
      for (var i2 = 0; i2 < set.length; i2++) {
        if (!set[i2].test(version)) {
          return false;
        }
      }
      if (version.prerelease.length && !options.includePrerelease) {
        for (i2 = 0; i2 < set.length; i2++) {
          debug(set[i2].semver);
          if (set[i2].semver === ANY) {
            continue;
          }
          if (set[i2].semver.prerelease.length > 0) {
            var allowed = set[i2].semver;
            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    }
    exports.satisfies = satisfies;
    function satisfies(version, range, options) {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }
      return range.test(version);
    }
    exports.maxSatisfying = maxSatisfying;
    function maxSatisfying(versions, range, options) {
      var max = null;
      var maxSV = null;
      try {
        var rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach(function(v) {
        if (rangeObj.test(v)) {
          if (!max || maxSV.compare(v) === -1) {
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    }
    exports.minSatisfying = minSatisfying;
    function minSatisfying(versions, range, options) {
      var min = null;
      var minSV = null;
      try {
        var rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach(function(v) {
        if (rangeObj.test(v)) {
          if (!min || minSV.compare(v) === 1) {
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min;
    }
    exports.minVersion = minVersion;
    function minVersion(range, loose) {
      range = new Range(range, loose);
      var minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (var i2 = 0; i2 < range.set.length; ++i2) {
        var comparators = range.set[i2];
        comparators.forEach(function(comparator) {
          var compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            case "":
            case ">=":
              if (!minver || gt(minver, compver)) {
                minver = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            default:
              throw new Error("Unexpected operation: " + comparator.operator);
          }
        });
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    }
    exports.validRange = validRange;
    function validRange(range, options) {
      try {
        return new Range(range, options).range || "*";
      } catch (er) {
        return null;
      }
    }
    exports.ltr = ltr;
    function ltr(version, range, options) {
      return outside(version, range, "<", options);
    }
    exports.gtr = gtr;
    function gtr(version, range, options) {
      return outside(version, range, ">", options);
    }
    exports.outside = outside;
    function outside(version, range, hilo, options) {
      version = new SemVer(version, options);
      range = new Range(range, options);
      var gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies(version, range, options)) {
        return false;
      }
      for (var i2 = 0; i2 < range.set.length; ++i2) {
        var comparators = range.set[i2];
        var high = null;
        var low = null;
        comparators.forEach(function(comparator) {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }
      return true;
    }
    exports.prerelease = prerelease;
    function prerelease(version, options) {
      var parsed = parse2(version, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    }
    exports.intersects = intersects;
    function intersects(r1, r2, options) {
      r1 = new Range(r1, options);
      r2 = new Range(r2, options);
      return r1.intersects(r2);
    }
    exports.coerce = coerce;
    function coerce(version) {
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version !== "string") {
        return null;
      }
      var match = version.match(re[COERCE]);
      if (match == null) {
        return null;
      }
      return parse2(match[1] + "." + (match[2] || "0") + "." + (match[3] || "0"));
    }
  }
});

// node_modules/cross-spawn/lib/parse.js
var require_parse = __commonJS({
  "node_modules/cross-spawn/lib/parse.js"(exports, module2) {
    "use strict";
    var path = require("path");
    var niceTry = require_src2();
    var resolveCommand = require_resolveCommand();
    var escape = require_escape();
    var readShebang = require_readShebang();
    var semver = require_semver();
    var isWin = process.platform === "win32";
    var isExecutableRegExp = /\.(?:com|exe)$/i;
    var isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
    var supportsShellOption = niceTry(() => semver.satisfies(process.version, "^4.8.0 || ^5.7.0 || >= 6.0.0", true)) || false;
    function detectShebang(parsed) {
      parsed.file = resolveCommand(parsed);
      const shebang = parsed.file && readShebang(parsed.file);
      if (shebang) {
        parsed.args.unshift(parsed.file);
        parsed.command = shebang;
        return resolveCommand(parsed);
      }
      return parsed.file;
    }
    function parseNonShell(parsed) {
      if (!isWin) {
        return parsed;
      }
      const commandFile = detectShebang(parsed);
      const needsShell = !isExecutableRegExp.test(commandFile);
      if (parsed.options.forceShell || needsShell) {
        const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
        parsed.command = path.normalize(parsed.command);
        parsed.command = escape.command(parsed.command);
        parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));
        const shellCommand = [parsed.command].concat(parsed.args).join(" ");
        parsed.args = ["/d", "/s", "/c", `"${shellCommand}"`];
        parsed.command = process.env.comspec || "cmd.exe";
        parsed.options.windowsVerbatimArguments = true;
      }
      return parsed;
    }
    function parseShell(parsed) {
      if (supportsShellOption) {
        return parsed;
      }
      const shellCommand = [parsed.command].concat(parsed.args).join(" ");
      if (isWin) {
        parsed.command = typeof parsed.options.shell === "string" ? parsed.options.shell : process.env.comspec || "cmd.exe";
        parsed.args = ["/d", "/s", "/c", `"${shellCommand}"`];
        parsed.options.windowsVerbatimArguments = true;
      } else {
        if (typeof parsed.options.shell === "string") {
          parsed.command = parsed.options.shell;
        } else if (process.platform === "android") {
          parsed.command = "/system/bin/sh";
        } else {
          parsed.command = "/bin/sh";
        }
        parsed.args = ["-c", shellCommand];
      }
      return parsed;
    }
    function parse2(command, args, options) {
      if (args && !Array.isArray(args)) {
        options = args;
        args = null;
      }
      args = args ? args.slice(0) : [];
      options = Object.assign({}, options);
      const parsed = {
        command,
        args,
        options,
        file: void 0,
        original: {
          command,
          args
        }
      };
      return options.shell ? parseShell(parsed) : parseNonShell(parsed);
    }
    module2.exports = parse2;
  }
});

// node_modules/cross-spawn/lib/enoent.js
var require_enoent = __commonJS({
  "node_modules/cross-spawn/lib/enoent.js"(exports, module2) {
    "use strict";
    var isWin = process.platform === "win32";
    function notFoundError(original, syscall) {
      return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
        code: "ENOENT",
        errno: "ENOENT",
        syscall: `${syscall} ${original.command}`,
        path: original.command,
        spawnargs: original.args
      });
    }
    function hookChildProcess(cp, parsed) {
      if (!isWin) {
        return;
      }
      const originalEmit = cp.emit;
      cp.emit = function(name, arg1) {
        if (name === "exit") {
          const err = verifyENOENT(arg1, parsed, "spawn");
          if (err) {
            return originalEmit.call(cp, "error", err);
          }
        }
        return originalEmit.apply(cp, arguments);
      };
    }
    function verifyENOENT(status, parsed) {
      if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, "spawn");
      }
      return null;
    }
    function verifyENOENTSync(status, parsed) {
      if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, "spawnSync");
      }
      return null;
    }
    module2.exports = {
      hookChildProcess,
      verifyENOENT,
      verifyENOENTSync,
      notFoundError
    };
  }
});

// node_modules/cross-spawn/index.js
var require_cross_spawn = __commonJS({
  "node_modules/cross-spawn/index.js"(exports, module2) {
    "use strict";
    var cp = require("child_process");
    var parse2 = require_parse();
    var enoent = require_enoent();
    function spawn(command, args, options) {
      const parsed = parse2(command, args, options);
      const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
      enoent.hookChildProcess(spawned, parsed);
      return spawned;
    }
    function spawnSync(command, args, options) {
      const parsed = parse2(command, args, options);
      const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
      result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
      return result;
    }
    module2.exports = spawn;
    module2.exports.spawn = spawn;
    module2.exports.sync = spawnSync;
    module2.exports._parse = parse2;
    module2.exports._enoent = enoent;
  }
});

// node_modules/strip-eof/index.js
var require_strip_eof = __commonJS({
  "node_modules/strip-eof/index.js"(exports, module2) {
    "use strict";
    module2.exports = function(x) {
      var lf = typeof x === "string" ? "\n" : "\n".charCodeAt();
      var cr = typeof x === "string" ? "\r" : "\r".charCodeAt();
      if (x[x.length - 1] === lf) {
        x = x.slice(0, x.length - 1);
      }
      if (x[x.length - 1] === cr) {
        x = x.slice(0, x.length - 1);
      }
      return x;
    };
  }
});

// node_modules/npm-run-path/index.js
var require_npm_run_path = __commonJS({
  "node_modules/npm-run-path/index.js"(exports, module2) {
    "use strict";
    var path = require("path");
    var pathKey = require_path_key();
    module2.exports = (opts) => {
      opts = Object.assign({
        cwd: process.cwd(),
        path: process.env[pathKey()]
      }, opts);
      let prev;
      let pth = path.resolve(opts.cwd);
      const ret = [];
      while (prev !== pth) {
        ret.push(path.join(pth, "node_modules/.bin"));
        prev = pth;
        pth = path.resolve(pth, "..");
      }
      ret.push(path.dirname(process.execPath));
      return ret.concat(opts.path).join(path.delimiter);
    };
    module2.exports.env = (opts) => {
      opts = Object.assign({
        env: process.env
      }, opts);
      const env = Object.assign({}, opts.env);
      const path2 = pathKey({ env });
      opts.path = env[path2];
      env[path2] = module2.exports(opts);
      return env;
    };
  }
});

// node_modules/is-stream/index.js
var require_is_stream = __commonJS({
  "node_modules/is-stream/index.js"(exports, module2) {
    "use strict";
    var isStream = module2.exports = function(stream) {
      return stream !== null && typeof stream === "object" && typeof stream.pipe === "function";
    };
    isStream.writable = function(stream) {
      return isStream(stream) && stream.writable !== false && typeof stream._write === "function" && typeof stream._writableState === "object";
    };
    isStream.readable = function(stream) {
      return isStream(stream) && stream.readable !== false && typeof stream._read === "function" && typeof stream._readableState === "object";
    };
    isStream.duplex = function(stream) {
      return isStream.writable(stream) && isStream.readable(stream);
    };
    isStream.transform = function(stream) {
      return isStream.duplex(stream) && typeof stream._transform === "function" && typeof stream._transformState === "object";
    };
  }
});

// node_modules/wrappy/wrappy.js
var require_wrappy = __commonJS({
  "node_modules/wrappy/wrappy.js"(exports, module2) {
    module2.exports = wrappy;
    function wrappy(fn, cb) {
      if (fn && cb)
        return wrappy(fn)(cb);
      if (typeof fn !== "function")
        throw new TypeError("need wrapper function");
      Object.keys(fn).forEach(function(k) {
        wrapper[k] = fn[k];
      });
      return wrapper;
      function wrapper() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        var ret = fn.apply(this, args);
        var cb2 = args[args.length - 1];
        if (typeof ret === "function" && ret !== cb2) {
          Object.keys(cb2).forEach(function(k) {
            ret[k] = cb2[k];
          });
        }
        return ret;
      }
    }
  }
});

// node_modules/once/once.js
var require_once = __commonJS({
  "node_modules/once/once.js"(exports, module2) {
    var wrappy = require_wrappy();
    module2.exports = wrappy(once);
    module2.exports.strict = wrappy(onceStrict);
    once.proto = once(function() {
      Object.defineProperty(Function.prototype, "once", {
        value: function() {
          return once(this);
        },
        configurable: true
      });
      Object.defineProperty(Function.prototype, "onceStrict", {
        value: function() {
          return onceStrict(this);
        },
        configurable: true
      });
    });
    function once(fn) {
      var f = function() {
        if (f.called)
          return f.value;
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      f.called = false;
      return f;
    }
    function onceStrict(fn) {
      var f = function() {
        if (f.called)
          throw new Error(f.onceError);
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      var name = fn.name || "Function wrapped with `once`";
      f.onceError = name + " shouldn't be called more than once";
      f.called = false;
      return f;
    }
  }
});

// node_modules/end-of-stream/index.js
var require_end_of_stream = __commonJS({
  "node_modules/end-of-stream/index.js"(exports, module2) {
    var once = require_once();
    var noop = function() {
    };
    var isRequest = function(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    };
    var isChildProcess = function(stream) {
      return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3;
    };
    var eos = function(stream, opts, callback) {
      if (typeof opts === "function")
        return eos(stream, null, opts);
      if (!opts)
        opts = {};
      callback = once(callback || noop);
      var ws = stream._writableState;
      var rs = stream._readableState;
      var readable = opts.readable || opts.readable !== false && stream.readable;
      var writable = opts.writable || opts.writable !== false && stream.writable;
      var cancelled = false;
      var onlegacyfinish = function() {
        if (!stream.writable)
          onfinish();
      };
      var onfinish = function() {
        writable = false;
        if (!readable)
          callback.call(stream);
      };
      var onend = function() {
        readable = false;
        if (!writable)
          callback.call(stream);
      };
      var onexit = function(exitCode) {
        callback.call(stream, exitCode ? new Error("exited with error code: " + exitCode) : null);
      };
      var onerror = function(err) {
        callback.call(stream, err);
      };
      var onclose = function() {
        process.nextTick(onclosenexttick);
      };
      var onclosenexttick = function() {
        if (cancelled)
          return;
        if (readable && !(rs && (rs.ended && !rs.destroyed)))
          return callback.call(stream, new Error("premature close"));
        if (writable && !(ws && (ws.ended && !ws.destroyed)))
          return callback.call(stream, new Error("premature close"));
      };
      var onrequest = function() {
        stream.req.on("finish", onfinish);
      };
      if (isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req)
          onrequest();
        else
          stream.on("request", onrequest);
      } else if (writable && !ws) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      if (isChildProcess(stream))
        stream.on("exit", onexit);
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (opts.error !== false)
        stream.on("error", onerror);
      stream.on("close", onclose);
      return function() {
        cancelled = true;
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req)
          stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("exit", onexit);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
    };
    module2.exports = eos;
  }
});

// node_modules/pump/index.js
var require_pump = __commonJS({
  "node_modules/pump/index.js"(exports, module2) {
    var once = require_once();
    var eos = require_end_of_stream();
    var fs2 = require("fs");
    var noop = function() {
    };
    var ancient = /^v?\.0/.test(process.version);
    var isFn = function(fn) {
      return typeof fn === "function";
    };
    var isFS = function(stream) {
      if (!ancient)
        return false;
      if (!fs2)
        return false;
      return (stream instanceof (fs2.ReadStream || noop) || stream instanceof (fs2.WriteStream || noop)) && isFn(stream.close);
    };
    var isRequest = function(stream) {
      return stream.setHeader && isFn(stream.abort);
    };
    var destroyer = function(stream, reading, writing, callback) {
      callback = once(callback);
      var closed = false;
      stream.on("close", function() {
        closed = true;
      });
      eos(stream, { readable: reading, writable: writing }, function(err) {
        if (err)
          return callback(err);
        closed = true;
        callback();
      });
      var destroyed = false;
      return function(err) {
        if (closed)
          return;
        if (destroyed)
          return;
        destroyed = true;
        if (isFS(stream))
          return stream.close(noop);
        if (isRequest(stream))
          return stream.abort();
        if (isFn(stream.destroy))
          return stream.destroy();
        callback(err || new Error("stream was destroyed"));
      };
    };
    var call = function(fn) {
      fn();
    };
    var pipe = function(from, to) {
      return from.pipe(to);
    };
    var pump = function() {
      var streams = Array.prototype.slice.call(arguments);
      var callback = isFn(streams[streams.length - 1] || noop) && streams.pop() || noop;
      if (Array.isArray(streams[0]))
        streams = streams[0];
      if (streams.length < 2)
        throw new Error("pump requires two streams per minimum");
      var error;
      var destroys = streams.map(function(stream, i) {
        var reading = i < streams.length - 1;
        var writing = i > 0;
        return destroyer(stream, reading, writing, function(err) {
          if (!error)
            error = err;
          if (err)
            destroys.forEach(call);
          if (reading)
            return;
          destroys.forEach(call);
          callback(error);
        });
      });
      return streams.reduce(pipe);
    };
    module2.exports = pump;
  }
});

// node_modules/get-stream/buffer-stream.js
var require_buffer_stream = __commonJS({
  "node_modules/get-stream/buffer-stream.js"(exports, module2) {
    "use strict";
    var { PassThrough } = require("stream");
    module2.exports = (options) => {
      options = Object.assign({}, options);
      const { array } = options;
      let { encoding } = options;
      const buffer = encoding === "buffer";
      let objectMode = false;
      if (array) {
        objectMode = !(encoding || buffer);
      } else {
        encoding = encoding || "utf8";
      }
      if (buffer) {
        encoding = null;
      }
      let len = 0;
      const ret = [];
      const stream = new PassThrough({ objectMode });
      if (encoding) {
        stream.setEncoding(encoding);
      }
      stream.on("data", (chunk) => {
        ret.push(chunk);
        if (objectMode) {
          len = ret.length;
        } else {
          len += chunk.length;
        }
      });
      stream.getBufferedValue = () => {
        if (array) {
          return ret;
        }
        return buffer ? Buffer.concat(ret, len) : ret.join("");
      };
      stream.getBufferedLength = () => len;
      return stream;
    };
  }
});

// node_modules/get-stream/index.js
var require_get_stream = __commonJS({
  "node_modules/get-stream/index.js"(exports, module2) {
    "use strict";
    var pump = require_pump();
    var bufferStream = require_buffer_stream();
    var MaxBufferError = class extends Error {
      constructor() {
        super("maxBuffer exceeded");
        this.name = "MaxBufferError";
      }
    };
    function getStream(inputStream, options) {
      if (!inputStream) {
        return Promise.reject(new Error("Expected a stream"));
      }
      options = Object.assign({ maxBuffer: Infinity }, options);
      const { maxBuffer } = options;
      let stream;
      return new Promise((resolve, reject) => {
        const rejectPromise = (error) => {
          if (error) {
            error.bufferedData = stream.getBufferedValue();
          }
          reject(error);
        };
        stream = pump(inputStream, bufferStream(options), (error) => {
          if (error) {
            rejectPromise(error);
            return;
          }
          resolve();
        });
        stream.on("data", () => {
          if (stream.getBufferedLength() > maxBuffer) {
            rejectPromise(new MaxBufferError());
          }
        });
      }).then(() => stream.getBufferedValue());
    }
    module2.exports = getStream;
    module2.exports.buffer = (stream, options) => getStream(stream, Object.assign({}, options, { encoding: "buffer" }));
    module2.exports.array = (stream, options) => getStream(stream, Object.assign({}, options, { array: true }));
    module2.exports.MaxBufferError = MaxBufferError;
  }
});

// node_modules/p-finally/index.js
var require_p_finally = __commonJS({
  "node_modules/p-finally/index.js"(exports, module2) {
    "use strict";
    module2.exports = (promise, onFinally) => {
      onFinally = onFinally || (() => {
      });
      return promise.then((val) => new Promise((resolve) => {
        resolve(onFinally());
      }).then(() => val), (err) => new Promise((resolve) => {
        resolve(onFinally());
      }).then(() => {
        throw err;
      }));
    };
  }
});

// node_modules/signal-exit/signals.js
var require_signals = __commonJS({
  "node_modules/signal-exit/signals.js"(exports, module2) {
    module2.exports = [
      "SIGABRT",
      "SIGALRM",
      "SIGHUP",
      "SIGINT",
      "SIGTERM"
    ];
    if (process.platform !== "win32") {
      module2.exports.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
    }
    if (process.platform === "linux") {
      module2.exports.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
    }
  }
});

// node_modules/signal-exit/index.js
var require_signal_exit = __commonJS({
  "node_modules/signal-exit/index.js"(exports, module2) {
    var process2 = global.process;
    if (typeof process2 !== "object" || !process2) {
      module2.exports = function() {
      };
    } else {
      assert = require("assert");
      signals = require_signals();
      isWin = /^win/i.test(process2.platform);
      EE = require("events");
      if (typeof EE !== "function") {
        EE = EE.EventEmitter;
      }
      if (process2.__signal_exit_emitter__) {
        emitter = process2.__signal_exit_emitter__;
      } else {
        emitter = process2.__signal_exit_emitter__ = new EE();
        emitter.count = 0;
        emitter.emitted = {};
      }
      if (!emitter.infinite) {
        emitter.setMaxListeners(Infinity);
        emitter.infinite = true;
      }
      module2.exports = function(cb, opts) {
        if (global.process !== process2) {
          return;
        }
        assert.equal(typeof cb, "function", "a callback must be provided for exit handler");
        if (loaded === false) {
          load();
        }
        var ev = "exit";
        if (opts && opts.alwaysLast) {
          ev = "afterexit";
        }
        var remove = function() {
          emitter.removeListener(ev, cb);
          if (emitter.listeners("exit").length === 0 && emitter.listeners("afterexit").length === 0) {
            unload();
          }
        };
        emitter.on(ev, cb);
        return remove;
      };
      unload = function unload2() {
        if (!loaded || global.process !== process2) {
          return;
        }
        loaded = false;
        signals.forEach(function(sig) {
          try {
            process2.removeListener(sig, sigListeners[sig]);
          } catch (er) {
          }
        });
        process2.emit = originalProcessEmit;
        process2.reallyExit = originalProcessReallyExit;
        emitter.count -= 1;
      };
      module2.exports.unload = unload;
      emit = function emit2(event, code, signal) {
        if (emitter.emitted[event]) {
          return;
        }
        emitter.emitted[event] = true;
        emitter.emit(event, code, signal);
      };
      sigListeners = {};
      signals.forEach(function(sig) {
        sigListeners[sig] = function listener() {
          if (process2 !== global.process) {
            return;
          }
          var listeners = process2.listeners(sig);
          if (listeners.length === emitter.count) {
            unload();
            emit("exit", null, sig);
            emit("afterexit", null, sig);
            if (isWin && sig === "SIGHUP") {
              sig = "SIGINT";
            }
            process2.kill(process2.pid, sig);
          }
        };
      });
      module2.exports.signals = function() {
        return signals;
      };
      loaded = false;
      load = function load2() {
        if (loaded || process2 !== global.process) {
          return;
        }
        loaded = true;
        emitter.count += 1;
        signals = signals.filter(function(sig) {
          try {
            process2.on(sig, sigListeners[sig]);
            return true;
          } catch (er) {
            return false;
          }
        });
        process2.emit = processEmit;
        process2.reallyExit = processReallyExit;
      };
      module2.exports.load = load;
      originalProcessReallyExit = process2.reallyExit;
      processReallyExit = function processReallyExit2(code) {
        if (process2 !== global.process) {
          return;
        }
        process2.exitCode = code || 0;
        emit("exit", process2.exitCode, null);
        emit("afterexit", process2.exitCode, null);
        originalProcessReallyExit.call(process2, process2.exitCode);
      };
      originalProcessEmit = process2.emit;
      processEmit = function processEmit2(ev, arg) {
        if (ev === "exit" && process2 === global.process) {
          if (arg !== void 0) {
            process2.exitCode = arg;
          }
          var ret = originalProcessEmit.apply(this, arguments);
          emit("exit", process2.exitCode, null);
          emit("afterexit", process2.exitCode, null);
          return ret;
        } else {
          return originalProcessEmit.apply(this, arguments);
        }
      };
    }
    var assert;
    var signals;
    var isWin;
    var EE;
    var emitter;
    var unload;
    var emit;
    var sigListeners;
    var loaded;
    var load;
    var originalProcessReallyExit;
    var processReallyExit;
    var originalProcessEmit;
    var processEmit;
  }
});

// node_modules/execa/lib/errname.js
var require_errname = __commonJS({
  "node_modules/execa/lib/errname.js"(exports, module2) {
    "use strict";
    var util = require("util");
    var uv;
    if (typeof util.getSystemErrorName === "function") {
      module2.exports = util.getSystemErrorName;
    } else {
      try {
        uv = process.binding("uv");
        if (typeof uv.errname !== "function") {
          throw new TypeError("uv.errname is not a function");
        }
      } catch (err) {
        console.error("execa/lib/errname: unable to establish process.binding('uv')", err);
        uv = null;
      }
      module2.exports = (code) => errname(uv, code);
    }
    module2.exports.__test__ = errname;
    function errname(uv2, code) {
      if (uv2) {
        return uv2.errname(code);
      }
      if (!(code < 0)) {
        throw new Error("err >= 0");
      }
      return `Unknown system error ${code}`;
    }
  }
});

// node_modules/execa/lib/stdio.js
var require_stdio = __commonJS({
  "node_modules/execa/lib/stdio.js"(exports, module2) {
    "use strict";
    var alias = ["stdin", "stdout", "stderr"];
    var hasAlias = (opts) => alias.some((x) => Boolean(opts[x]));
    module2.exports = (opts) => {
      if (!opts) {
        return null;
      }
      if (opts.stdio && hasAlias(opts)) {
        throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${alias.map((x) => `\`${x}\``).join(", ")}`);
      }
      if (typeof opts.stdio === "string") {
        return opts.stdio;
      }
      const stdio = opts.stdio || [];
      if (!Array.isArray(stdio)) {
        throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
      }
      const result = [];
      const len = Math.max(stdio.length, alias.length);
      for (let i = 0; i < len; i++) {
        let value = null;
        if (stdio[i] !== void 0) {
          value = stdio[i];
        } else if (opts[alias[i]] !== void 0) {
          value = opts[alias[i]];
        }
        result[i] = value;
      }
      return result;
    };
  }
});

// node_modules/execa/index.js
var require_execa = __commonJS({
  "node_modules/execa/index.js"(exports, module2) {
    "use strict";
    var path = require("path");
    var childProcess = require("child_process");
    var crossSpawn = require_cross_spawn();
    var stripEof = require_strip_eof();
    var npmRunPath = require_npm_run_path();
    var isStream = require_is_stream();
    var _getStream = require_get_stream();
    var pFinally = require_p_finally();
    var onExit = require_signal_exit();
    var errname = require_errname();
    var stdio = require_stdio();
    var TEN_MEGABYTES = 1e3 * 1e3 * 10;
    function handleArgs(cmd, args, opts) {
      let parsed;
      opts = Object.assign({
        extendEnv: true,
        env: {}
      }, opts);
      if (opts.extendEnv) {
        opts.env = Object.assign({}, process.env, opts.env);
      }
      if (opts.__winShell === true) {
        delete opts.__winShell;
        parsed = {
          command: cmd,
          args,
          options: opts,
          file: cmd,
          original: {
            cmd,
            args
          }
        };
      } else {
        parsed = crossSpawn._parse(cmd, args, opts);
      }
      opts = Object.assign({
        maxBuffer: TEN_MEGABYTES,
        buffer: true,
        stripEof: true,
        preferLocal: true,
        localDir: parsed.options.cwd || process.cwd(),
        encoding: "utf8",
        reject: true,
        cleanup: true
      }, parsed.options);
      opts.stdio = stdio(opts);
      if (opts.preferLocal) {
        opts.env = npmRunPath.env(Object.assign({}, opts, { cwd: opts.localDir }));
      }
      if (opts.detached) {
        opts.cleanup = false;
      }
      if (process.platform === "win32" && path.basename(parsed.command) === "cmd.exe") {
        parsed.args.unshift("/q");
      }
      return {
        cmd: parsed.command,
        args: parsed.args,
        opts,
        parsed
      };
    }
    function handleInput(spawned, input) {
      if (input === null || input === void 0) {
        return;
      }
      if (isStream(input)) {
        input.pipe(spawned.stdin);
      } else {
        spawned.stdin.end(input);
      }
    }
    function handleOutput(opts, val) {
      if (val && opts.stripEof) {
        val = stripEof(val);
      }
      return val;
    }
    function handleShell(fn, cmd, opts) {
      let file = "/bin/sh";
      let args = ["-c", cmd];
      opts = Object.assign({}, opts);
      if (process.platform === "win32") {
        opts.__winShell = true;
        file = process.env.comspec || "cmd.exe";
        args = ["/s", "/c", `"${cmd}"`];
        opts.windowsVerbatimArguments = true;
      }
      if (opts.shell) {
        file = opts.shell;
        delete opts.shell;
      }
      return fn(file, args, opts);
    }
    function getStream(process2, stream, { encoding, buffer, maxBuffer }) {
      if (!process2[stream]) {
        return null;
      }
      let ret;
      if (!buffer) {
        ret = new Promise((resolve, reject) => {
          process2[stream].once("end", resolve).once("error", reject);
        });
      } else if (encoding) {
        ret = _getStream(process2[stream], {
          encoding,
          maxBuffer
        });
      } else {
        ret = _getStream.buffer(process2[stream], { maxBuffer });
      }
      return ret.catch((err) => {
        err.stream = stream;
        err.message = `${stream} ${err.message}`;
        throw err;
      });
    }
    function makeError(result, options) {
      const { stdout, stderr } = result;
      let err = result.error;
      const { code, signal } = result;
      const { parsed, joinedCmd } = options;
      const timedOut = options.timedOut || false;
      if (!err) {
        let output = "";
        if (Array.isArray(parsed.opts.stdio)) {
          if (parsed.opts.stdio[2] !== "inherit") {
            output += output.length > 0 ? stderr : `
${stderr}`;
          }
          if (parsed.opts.stdio[1] !== "inherit") {
            output += `
${stdout}`;
          }
        } else if (parsed.opts.stdio !== "inherit") {
          output = `
${stderr}${stdout}`;
        }
        err = new Error(`Command failed: ${joinedCmd}${output}`);
        err.code = code < 0 ? errname(code) : code;
      }
      err.stdout = stdout;
      err.stderr = stderr;
      err.failed = true;
      err.signal = signal || null;
      err.cmd = joinedCmd;
      err.timedOut = timedOut;
      return err;
    }
    function joinCmd(cmd, args) {
      let joinedCmd = cmd;
      if (Array.isArray(args) && args.length > 0) {
        joinedCmd += " " + args.join(" ");
      }
      return joinedCmd;
    }
    module2.exports = (cmd, args, opts) => {
      const parsed = handleArgs(cmd, args, opts);
      const { encoding, buffer, maxBuffer } = parsed.opts;
      const joinedCmd = joinCmd(cmd, args);
      let spawned;
      try {
        spawned = childProcess.spawn(parsed.cmd, parsed.args, parsed.opts);
      } catch (err) {
        return Promise.reject(err);
      }
      let removeExitHandler;
      if (parsed.opts.cleanup) {
        removeExitHandler = onExit(() => {
          spawned.kill();
        });
      }
      let timeoutId = null;
      let timedOut = false;
      const cleanup = () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        if (removeExitHandler) {
          removeExitHandler();
        }
      };
      if (parsed.opts.timeout > 0) {
        timeoutId = setTimeout(() => {
          timeoutId = null;
          timedOut = true;
          spawned.kill(parsed.opts.killSignal);
        }, parsed.opts.timeout);
      }
      const processDone = new Promise((resolve) => {
        spawned.on("exit", (code, signal) => {
          cleanup();
          resolve({ code, signal });
        });
        spawned.on("error", (err) => {
          cleanup();
          resolve({ error: err });
        });
        if (spawned.stdin) {
          spawned.stdin.on("error", (err) => {
            cleanup();
            resolve({ error: err });
          });
        }
      });
      function destroy() {
        if (spawned.stdout) {
          spawned.stdout.destroy();
        }
        if (spawned.stderr) {
          spawned.stderr.destroy();
        }
      }
      const handlePromise = () => pFinally(Promise.all([
        processDone,
        getStream(spawned, "stdout", { encoding, buffer, maxBuffer }),
        getStream(spawned, "stderr", { encoding, buffer, maxBuffer })
      ]).then((arr) => {
        const result = arr[0];
        result.stdout = arr[1];
        result.stderr = arr[2];
        if (result.error || result.code !== 0 || result.signal !== null) {
          const err = makeError(result, {
            joinedCmd,
            parsed,
            timedOut
          });
          err.killed = err.killed || spawned.killed;
          if (!parsed.opts.reject) {
            return err;
          }
          throw err;
        }
        return {
          stdout: handleOutput(parsed.opts, result.stdout),
          stderr: handleOutput(parsed.opts, result.stderr),
          code: 0,
          failed: false,
          killed: false,
          signal: null,
          cmd: joinedCmd,
          timedOut: false
        };
      }), destroy);
      crossSpawn._enoent.hookChildProcess(spawned, parsed.parsed);
      handleInput(spawned, parsed.opts.input);
      spawned.then = (onfulfilled, onrejected) => handlePromise().then(onfulfilled, onrejected);
      spawned.catch = (onrejected) => handlePromise().catch(onrejected);
      return spawned;
    };
    module2.exports.stdout = (...args) => module2.exports(...args).then((x) => x.stdout);
    module2.exports.stderr = (...args) => module2.exports(...args).then((x) => x.stderr);
    module2.exports.shell = (cmd, opts) => handleShell(module2.exports, cmd, opts);
    module2.exports.sync = (cmd, args, opts) => {
      const parsed = handleArgs(cmd, args, opts);
      const joinedCmd = joinCmd(cmd, args);
      if (isStream(parsed.opts.input)) {
        throw new TypeError("The `input` option cannot be a stream in sync mode");
      }
      const result = childProcess.spawnSync(parsed.cmd, parsed.args, parsed.opts);
      result.code = result.status;
      if (result.error || result.status !== 0 || result.signal !== null) {
        const err = makeError(result, {
          joinedCmd,
          parsed
        });
        if (!parsed.opts.reject) {
          return err;
        }
        throw err;
      }
      return {
        stdout: handleOutput(parsed.opts, result.stdout),
        stderr: handleOutput(parsed.opts, result.stderr),
        code: 0,
        failed: false,
        signal: null,
        cmd: joinedCmd,
        timedOut: false
      };
    };
    module2.exports.shellSync = (cmd, opts) => handleShell(module2.exports.sync, cmd, opts);
  }
});

// node_modules/clipboardy/lib/termux.js
var require_termux = __commonJS({
  "node_modules/clipboardy/lib/termux.js"(exports, module2) {
    "use strict";
    var execa = require_execa();
    var handler = (error) => {
      if (error.code === "ENOENT") {
        throw new Error("Couldn't find the termux-api scripts. You can install them with: apt install termux-api");
      }
      throw error;
    };
    module2.exports = {
      copy: async (options) => {
        try {
          await execa("termux-clipboard-set", options);
        } catch (error) {
          handler(error);
        }
      },
      paste: async (options) => {
        try {
          return await execa.stdout("termux-clipboard-get", options);
        } catch (error) {
          handler(error);
        }
      },
      copySync: (options) => {
        try {
          execa.sync("termux-clipboard-set", options);
        } catch (error) {
          handler(error);
        }
      },
      pasteSync: (options) => {
        try {
          return execa.sync("termux-clipboard-get", options);
        } catch (error) {
          handler(error);
        }
      }
    };
  }
});

// node_modules/clipboardy/lib/linux.js
var require_linux = __commonJS({
  "node_modules/clipboardy/lib/linux.js"(exports, module2) {
    "use strict";
    var path = require("path");
    var execa = require_execa();
    var xsel = "xsel";
    var xselFallback = path.join(__dirname, "../fallbacks/linux/xsel");
    var copyArguments = ["--clipboard", "--input"];
    var pasteArguments = ["--clipboard", "--output"];
    var makeError = (xselError, fallbackError) => {
      let error;
      if (xselError.code === "ENOENT") {
        error = new Error("Couldn't find the `xsel` binary and fallback didn't work. On Debian/Ubuntu you can install xsel with: sudo apt install xsel");
      } else {
        error = new Error("Both xsel and fallback failed");
        error.xselError = xselError;
      }
      error.fallbackError = fallbackError;
      return error;
    };
    var xselWithFallback = async (argumentList, options) => {
      try {
        return await execa.stdout(xsel, argumentList, options);
      } catch (xselError) {
        try {
          return await execa.stdout(xselFallback, argumentList, options);
        } catch (fallbackError) {
          throw makeError(xselError, fallbackError);
        }
      }
    };
    var xselWithFallbackSync = (argumentList, options) => {
      try {
        return execa.sync(xsel, argumentList, options);
      } catch (xselError) {
        try {
          return execa.sync(xselFallback, argumentList, options);
        } catch (fallbackError) {
          throw makeError(xselError, fallbackError);
        }
      }
    };
    module2.exports = {
      copy: async (options) => {
        await xselWithFallback(copyArguments, options);
      },
      copySync: (options) => {
        xselWithFallbackSync(copyArguments, options);
      },
      paste: (options) => xselWithFallback(pasteArguments, options),
      pasteSync: (options) => xselWithFallbackSync(pasteArguments, options)
    };
  }
});

// node_modules/clipboardy/lib/macos.js
var require_macos = __commonJS({
  "node_modules/clipboardy/lib/macos.js"(exports, module2) {
    "use strict";
    var execa = require_execa();
    var env = {
      ...process.env,
      LC_CTYPE: "UTF-8"
    };
    module2.exports = {
      copy: async (options) => execa("pbcopy", { ...options, env }),
      paste: async (options) => execa.stdout("pbpaste", { ...options, env }),
      copySync: (options) => execa.sync("pbcopy", { ...options, env }),
      pasteSync: (options) => execa.sync("pbpaste", { ...options, env })
    };
  }
});

// node_modules/arch/index.js
var require_arch = __commonJS({
  "node_modules/arch/index.js"(exports, module2) {
    var cp = require("child_process");
    var fs2 = require("fs");
    var path = require("path");
    module2.exports = function arch() {
      if (process.arch === "x64") {
        return "x64";
      }
      if (process.platform === "darwin") {
        return "x64";
      }
      if (process.platform === "win32") {
        var useEnv = false;
        try {
          useEnv = !!(process.env.SYSTEMROOT && fs2.statSync(process.env.SYSTEMROOT));
        } catch (err) {
        }
        var sysRoot = useEnv ? process.env.SYSTEMROOT : "C:\\Windows";
        var isWOW64 = false;
        try {
          isWOW64 = !!fs2.statSync(path.join(sysRoot, "sysnative"));
        } catch (err) {
        }
        return isWOW64 ? "x64" : "x86";
      }
      if (process.platform === "linux") {
        var output = cp.execSync("getconf LONG_BIT", { encoding: "utf8" });
        return output === "64\n" ? "x64" : "x86";
      }
      return "x86";
    };
  }
});

// node_modules/clipboardy/lib/windows.js
var require_windows2 = __commonJS({
  "node_modules/clipboardy/lib/windows.js"(exports, module2) {
    "use strict";
    var path = require("path");
    var execa = require_execa();
    var arch = require_arch();
    var windowBinaryPath = arch() === "x64" ? path.join(__dirname, "../fallbacks/windows/clipboard_x86_64.exe") : path.join(__dirname, "../fallbacks/windows/clipboard_i686.exe");
    module2.exports = {
      copy: async (options) => execa(windowBinaryPath, ["--copy"], options),
      paste: async (options) => execa.stdout(windowBinaryPath, ["--paste"], options),
      copySync: (options) => execa.sync(windowBinaryPath, ["--copy"], options),
      pasteSync: (options) => execa.sync(windowBinaryPath, ["--paste"], options)
    };
  }
});

// node_modules/clipboardy/index.js
var require_clipboardy = __commonJS({
  "node_modules/clipboardy/index.js"(exports) {
    "use strict";
    var isWSL = require_is_wsl();
    var termux = require_termux();
    var linux = require_linux();
    var macos = require_macos();
    var windows = require_windows2();
    var platformLib = (() => {
      switch (process.platform) {
        case "darwin":
          return macos;
        case "win32":
          return windows;
        case "android":
          if (process.env.PREFIX !== "/data/data/com.termux/files/usr") {
            throw new Error("You need to install Termux for this module to work on Android: https://termux.com");
          }
          return termux;
        default:
          if (isWSL) {
            return windows;
          }
          return linux;
      }
    })();
    exports.write = async (text) => {
      if (typeof text !== "string") {
        throw new TypeError(`Expected a string, got ${typeof text}`);
      }
      await platformLib.copy({ input: text });
    };
    exports.read = async () => platformLib.paste({ stripEof: false });
    exports.writeSync = (text) => {
      if (typeof text !== "string") {
        throw new TypeError(`Expected a string, got ${typeof text}`);
      }
      platformLib.copySync({ input: text });
    };
    exports.readSync = () => platformLib.pasteSync({ stripEof: false }).stdout;
  }
});

// node_modules/color-name/index.js
var require_color_name = __commonJS({
  "node_modules/color-name/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      "aliceblue": [240, 248, 255],
      "antiquewhite": [250, 235, 215],
      "aqua": [0, 255, 255],
      "aquamarine": [127, 255, 212],
      "azure": [240, 255, 255],
      "beige": [245, 245, 220],
      "bisque": [255, 228, 196],
      "black": [0, 0, 0],
      "blanchedalmond": [255, 235, 205],
      "blue": [0, 0, 255],
      "blueviolet": [138, 43, 226],
      "brown": [165, 42, 42],
      "burlywood": [222, 184, 135],
      "cadetblue": [95, 158, 160],
      "chartreuse": [127, 255, 0],
      "chocolate": [210, 105, 30],
      "coral": [255, 127, 80],
      "cornflowerblue": [100, 149, 237],
      "cornsilk": [255, 248, 220],
      "crimson": [220, 20, 60],
      "cyan": [0, 255, 255],
      "darkblue": [0, 0, 139],
      "darkcyan": [0, 139, 139],
      "darkgoldenrod": [184, 134, 11],
      "darkgray": [169, 169, 169],
      "darkgreen": [0, 100, 0],
      "darkgrey": [169, 169, 169],
      "darkkhaki": [189, 183, 107],
      "darkmagenta": [139, 0, 139],
      "darkolivegreen": [85, 107, 47],
      "darkorange": [255, 140, 0],
      "darkorchid": [153, 50, 204],
      "darkred": [139, 0, 0],
      "darksalmon": [233, 150, 122],
      "darkseagreen": [143, 188, 143],
      "darkslateblue": [72, 61, 139],
      "darkslategray": [47, 79, 79],
      "darkslategrey": [47, 79, 79],
      "darkturquoise": [0, 206, 209],
      "darkviolet": [148, 0, 211],
      "deeppink": [255, 20, 147],
      "deepskyblue": [0, 191, 255],
      "dimgray": [105, 105, 105],
      "dimgrey": [105, 105, 105],
      "dodgerblue": [30, 144, 255],
      "firebrick": [178, 34, 34],
      "floralwhite": [255, 250, 240],
      "forestgreen": [34, 139, 34],
      "fuchsia": [255, 0, 255],
      "gainsboro": [220, 220, 220],
      "ghostwhite": [248, 248, 255],
      "gold": [255, 215, 0],
      "goldenrod": [218, 165, 32],
      "gray": [128, 128, 128],
      "green": [0, 128, 0],
      "greenyellow": [173, 255, 47],
      "grey": [128, 128, 128],
      "honeydew": [240, 255, 240],
      "hotpink": [255, 105, 180],
      "indianred": [205, 92, 92],
      "indigo": [75, 0, 130],
      "ivory": [255, 255, 240],
      "khaki": [240, 230, 140],
      "lavender": [230, 230, 250],
      "lavenderblush": [255, 240, 245],
      "lawngreen": [124, 252, 0],
      "lemonchiffon": [255, 250, 205],
      "lightblue": [173, 216, 230],
      "lightcoral": [240, 128, 128],
      "lightcyan": [224, 255, 255],
      "lightgoldenrodyellow": [250, 250, 210],
      "lightgray": [211, 211, 211],
      "lightgreen": [144, 238, 144],
      "lightgrey": [211, 211, 211],
      "lightpink": [255, 182, 193],
      "lightsalmon": [255, 160, 122],
      "lightseagreen": [32, 178, 170],
      "lightskyblue": [135, 206, 250],
      "lightslategray": [119, 136, 153],
      "lightslategrey": [119, 136, 153],
      "lightsteelblue": [176, 196, 222],
      "lightyellow": [255, 255, 224],
      "lime": [0, 255, 0],
      "limegreen": [50, 205, 50],
      "linen": [250, 240, 230],
      "magenta": [255, 0, 255],
      "maroon": [128, 0, 0],
      "mediumaquamarine": [102, 205, 170],
      "mediumblue": [0, 0, 205],
      "mediumorchid": [186, 85, 211],
      "mediumpurple": [147, 112, 219],
      "mediumseagreen": [60, 179, 113],
      "mediumslateblue": [123, 104, 238],
      "mediumspringgreen": [0, 250, 154],
      "mediumturquoise": [72, 209, 204],
      "mediumvioletred": [199, 21, 133],
      "midnightblue": [25, 25, 112],
      "mintcream": [245, 255, 250],
      "mistyrose": [255, 228, 225],
      "moccasin": [255, 228, 181],
      "navajowhite": [255, 222, 173],
      "navy": [0, 0, 128],
      "oldlace": [253, 245, 230],
      "olive": [128, 128, 0],
      "olivedrab": [107, 142, 35],
      "orange": [255, 165, 0],
      "orangered": [255, 69, 0],
      "orchid": [218, 112, 214],
      "palegoldenrod": [238, 232, 170],
      "palegreen": [152, 251, 152],
      "paleturquoise": [175, 238, 238],
      "palevioletred": [219, 112, 147],
      "papayawhip": [255, 239, 213],
      "peachpuff": [255, 218, 185],
      "peru": [205, 133, 63],
      "pink": [255, 192, 203],
      "plum": [221, 160, 221],
      "powderblue": [176, 224, 230],
      "purple": [128, 0, 128],
      "rebeccapurple": [102, 51, 153],
      "red": [255, 0, 0],
      "rosybrown": [188, 143, 143],
      "royalblue": [65, 105, 225],
      "saddlebrown": [139, 69, 19],
      "salmon": [250, 128, 114],
      "sandybrown": [244, 164, 96],
      "seagreen": [46, 139, 87],
      "seashell": [255, 245, 238],
      "sienna": [160, 82, 45],
      "silver": [192, 192, 192],
      "skyblue": [135, 206, 235],
      "slateblue": [106, 90, 205],
      "slategray": [112, 128, 144],
      "slategrey": [112, 128, 144],
      "snow": [255, 250, 250],
      "springgreen": [0, 255, 127],
      "steelblue": [70, 130, 180],
      "tan": [210, 180, 140],
      "teal": [0, 128, 128],
      "thistle": [216, 191, 216],
      "tomato": [255, 99, 71],
      "turquoise": [64, 224, 208],
      "violet": [238, 130, 238],
      "wheat": [245, 222, 179],
      "white": [255, 255, 255],
      "whitesmoke": [245, 245, 245],
      "yellow": [255, 255, 0],
      "yellowgreen": [154, 205, 50]
    };
  }
});

// node_modules/color-convert/conversions.js
var require_conversions = __commonJS({
  "node_modules/color-convert/conversions.js"(exports, module2) {
    var cssKeywords = require_color_name();
    var reverseKeywords = {};
    for (const key of Object.keys(cssKeywords)) {
      reverseKeywords[cssKeywords[key]] = key;
    }
    var convert = {
      rgb: { channels: 3, labels: "rgb" },
      hsl: { channels: 3, labels: "hsl" },
      hsv: { channels: 3, labels: "hsv" },
      hwb: { channels: 3, labels: "hwb" },
      cmyk: { channels: 4, labels: "cmyk" },
      xyz: { channels: 3, labels: "xyz" },
      lab: { channels: 3, labels: "lab" },
      lch: { channels: 3, labels: "lch" },
      hex: { channels: 1, labels: ["hex"] },
      keyword: { channels: 1, labels: ["keyword"] },
      ansi16: { channels: 1, labels: ["ansi16"] },
      ansi256: { channels: 1, labels: ["ansi256"] },
      hcg: { channels: 3, labels: ["h", "c", "g"] },
      apple: { channels: 3, labels: ["r16", "g16", "b16"] },
      gray: { channels: 1, labels: ["gray"] }
    };
    module2.exports = convert;
    for (const model of Object.keys(convert)) {
      if (!("channels" in convert[model])) {
        throw new Error("missing channels property: " + model);
      }
      if (!("labels" in convert[model])) {
        throw new Error("missing channel labels property: " + model);
      }
      if (convert[model].labels.length !== convert[model].channels) {
        throw new Error("channel and label counts mismatch: " + model);
      }
      const { channels, labels } = convert[model];
      delete convert[model].channels;
      delete convert[model].labels;
      Object.defineProperty(convert[model], "channels", { value: channels });
      Object.defineProperty(convert[model], "labels", { value: labels });
    }
    convert.rgb.hsl = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      const delta = max - min;
      let h;
      let s;
      if (max === min) {
        h = 0;
      } else if (r === max) {
        h = (g - b) / delta;
      } else if (g === max) {
        h = 2 + (b - r) / delta;
      } else if (b === max) {
        h = 4 + (r - g) / delta;
      }
      h = Math.min(h * 60, 360);
      if (h < 0) {
        h += 360;
      }
      const l = (min + max) / 2;
      if (max === min) {
        s = 0;
      } else if (l <= 0.5) {
        s = delta / (max + min);
      } else {
        s = delta / (2 - max - min);
      }
      return [h, s * 100, l * 100];
    };
    convert.rgb.hsv = function(rgb) {
      let rdif;
      let gdif;
      let bdif;
      let h;
      let s;
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const v = Math.max(r, g, b);
      const diff = v - Math.min(r, g, b);
      const diffc = function(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };
      if (diff === 0) {
        h = 0;
        s = 0;
      } else {
        s = diff / v;
        rdif = diffc(r);
        gdif = diffc(g);
        bdif = diffc(b);
        if (r === v) {
          h = bdif - gdif;
        } else if (g === v) {
          h = 1 / 3 + rdif - bdif;
        } else if (b === v) {
          h = 2 / 3 + gdif - rdif;
        }
        if (h < 0) {
          h += 1;
        } else if (h > 1) {
          h -= 1;
        }
      }
      return [
        h * 360,
        s * 100,
        v * 100
      ];
    };
    convert.rgb.hwb = function(rgb) {
      const r = rgb[0];
      const g = rgb[1];
      let b = rgb[2];
      const h = convert.rgb.hsl(rgb)[0];
      const w = 1 / 255 * Math.min(r, Math.min(g, b));
      b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
      return [h, w * 100, b * 100];
    };
    convert.rgb.cmyk = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const k = Math.min(1 - r, 1 - g, 1 - b);
      const c = (1 - r - k) / (1 - k) || 0;
      const m = (1 - g - k) / (1 - k) || 0;
      const y = (1 - b - k) / (1 - k) || 0;
      return [c * 100, m * 100, y * 100, k * 100];
    };
    function comparativeDistance(x, y) {
      return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
    }
    convert.rgb.keyword = function(rgb) {
      const reversed = reverseKeywords[rgb];
      if (reversed) {
        return reversed;
      }
      let currentClosestDistance = Infinity;
      let currentClosestKeyword;
      for (const keyword of Object.keys(cssKeywords)) {
        const value = cssKeywords[keyword];
        const distance = comparativeDistance(rgb, value);
        if (distance < currentClosestDistance) {
          currentClosestDistance = distance;
          currentClosestKeyword = keyword;
        }
      }
      return currentClosestKeyword;
    };
    convert.keyword.rgb = function(keyword) {
      return cssKeywords[keyword];
    };
    convert.rgb.xyz = function(rgb) {
      let r = rgb[0] / 255;
      let g = rgb[1] / 255;
      let b = rgb[2] / 255;
      r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
      g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
      b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
      const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
      const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
      const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
      return [x * 100, y * 100, z * 100];
    };
    convert.rgb.lab = function(rgb) {
      const xyz = convert.rgb.xyz(rgb);
      let x = xyz[0];
      let y = xyz[1];
      let z = xyz[2];
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
      const l = 116 * y - 16;
      const a = 500 * (x - y);
      const b = 200 * (y - z);
      return [l, a, b];
    };
    convert.hsl.rgb = function(hsl) {
      const h = hsl[0] / 360;
      const s = hsl[1] / 100;
      const l = hsl[2] / 100;
      let t2;
      let t3;
      let val;
      if (s === 0) {
        val = l * 255;
        return [val, val, val];
      }
      if (l < 0.5) {
        t2 = l * (1 + s);
      } else {
        t2 = l + s - l * s;
      }
      const t1 = 2 * l - t2;
      const rgb = [0, 0, 0];
      for (let i = 0; i < 3; i++) {
        t3 = h + 1 / 3 * -(i - 1);
        if (t3 < 0) {
          t3++;
        }
        if (t3 > 1) {
          t3--;
        }
        if (6 * t3 < 1) {
          val = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
          val = t2;
        } else if (3 * t3 < 2) {
          val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
          val = t1;
        }
        rgb[i] = val * 255;
      }
      return rgb;
    };
    convert.hsl.hsv = function(hsl) {
      const h = hsl[0];
      let s = hsl[1] / 100;
      let l = hsl[2] / 100;
      let smin = s;
      const lmin = Math.max(l, 0.01);
      l *= 2;
      s *= l <= 1 ? l : 2 - l;
      smin *= lmin <= 1 ? lmin : 2 - lmin;
      const v = (l + s) / 2;
      const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
      return [h, sv * 100, v * 100];
    };
    convert.hsv.rgb = function(hsv) {
      const h = hsv[0] / 60;
      const s = hsv[1] / 100;
      let v = hsv[2] / 100;
      const hi = Math.floor(h) % 6;
      const f = h - Math.floor(h);
      const p = 255 * v * (1 - s);
      const q = 255 * v * (1 - s * f);
      const t = 255 * v * (1 - s * (1 - f));
      v *= 255;
      switch (hi) {
        case 0:
          return [v, t, p];
        case 1:
          return [q, v, p];
        case 2:
          return [p, v, t];
        case 3:
          return [p, q, v];
        case 4:
          return [t, p, v];
        case 5:
          return [v, p, q];
      }
    };
    convert.hsv.hsl = function(hsv) {
      const h = hsv[0];
      const s = hsv[1] / 100;
      const v = hsv[2] / 100;
      const vmin = Math.max(v, 0.01);
      let sl;
      let l;
      l = (2 - s) * v;
      const lmin = (2 - s) * vmin;
      sl = s * vmin;
      sl /= lmin <= 1 ? lmin : 2 - lmin;
      sl = sl || 0;
      l /= 2;
      return [h, sl * 100, l * 100];
    };
    convert.hwb.rgb = function(hwb) {
      const h = hwb[0] / 360;
      let wh = hwb[1] / 100;
      let bl = hwb[2] / 100;
      const ratio = wh + bl;
      let f;
      if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
      }
      const i = Math.floor(6 * h);
      const v = 1 - bl;
      f = 6 * h - i;
      if ((i & 1) !== 0) {
        f = 1 - f;
      }
      const n = wh + f * (v - wh);
      let r;
      let g;
      let b;
      switch (i) {
        default:
        case 6:
        case 0:
          r = v;
          g = n;
          b = wh;
          break;
        case 1:
          r = n;
          g = v;
          b = wh;
          break;
        case 2:
          r = wh;
          g = v;
          b = n;
          break;
        case 3:
          r = wh;
          g = n;
          b = v;
          break;
        case 4:
          r = n;
          g = wh;
          b = v;
          break;
        case 5:
          r = v;
          g = wh;
          b = n;
          break;
      }
      return [r * 255, g * 255, b * 255];
    };
    convert.cmyk.rgb = function(cmyk) {
      const c = cmyk[0] / 100;
      const m = cmyk[1] / 100;
      const y = cmyk[2] / 100;
      const k = cmyk[3] / 100;
      const r = 1 - Math.min(1, c * (1 - k) + k);
      const g = 1 - Math.min(1, m * (1 - k) + k);
      const b = 1 - Math.min(1, y * (1 - k) + k);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.rgb = function(xyz) {
      const x = xyz[0] / 100;
      const y = xyz[1] / 100;
      const z = xyz[2] / 100;
      let r;
      let g;
      let b;
      r = x * 3.2406 + y * -1.5372 + z * -0.4986;
      g = x * -0.9689 + y * 1.8758 + z * 0.0415;
      b = x * 0.0557 + y * -0.204 + z * 1.057;
      r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
      g = g > 31308e-7 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
      b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
      r = Math.min(Math.max(0, r), 1);
      g = Math.min(Math.max(0, g), 1);
      b = Math.min(Math.max(0, b), 1);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.lab = function(xyz) {
      let x = xyz[0];
      let y = xyz[1];
      let z = xyz[2];
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
      const l = 116 * y - 16;
      const a = 500 * (x - y);
      const b = 200 * (y - z);
      return [l, a, b];
    };
    convert.lab.xyz = function(lab) {
      const l = lab[0];
      const a = lab[1];
      const b = lab[2];
      let x;
      let y;
      let z;
      y = (l + 16) / 116;
      x = a / 500 + y;
      z = y - b / 200;
      const y2 = y ** 3;
      const x2 = x ** 3;
      const z2 = z ** 3;
      y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
      x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
      z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
      x *= 95.047;
      y *= 100;
      z *= 108.883;
      return [x, y, z];
    };
    convert.lab.lch = function(lab) {
      const l = lab[0];
      const a = lab[1];
      const b = lab[2];
      let h;
      const hr = Math.atan2(b, a);
      h = hr * 360 / 2 / Math.PI;
      if (h < 0) {
        h += 360;
      }
      const c = Math.sqrt(a * a + b * b);
      return [l, c, h];
    };
    convert.lch.lab = function(lch) {
      const l = lch[0];
      const c = lch[1];
      const h = lch[2];
      const hr = h / 360 * 2 * Math.PI;
      const a = c * Math.cos(hr);
      const b = c * Math.sin(hr);
      return [l, a, b];
    };
    convert.rgb.ansi16 = function(args, saturation = null) {
      const [r, g, b] = args;
      let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
      value = Math.round(value / 50);
      if (value === 0) {
        return 30;
      }
      let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
      if (value === 2) {
        ansi += 60;
      }
      return ansi;
    };
    convert.hsv.ansi16 = function(args) {
      return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
    };
    convert.rgb.ansi256 = function(args) {
      const r = args[0];
      const g = args[1];
      const b = args[2];
      if (r === g && g === b) {
        if (r < 8) {
          return 16;
        }
        if (r > 248) {
          return 231;
        }
        return Math.round((r - 8) / 247 * 24) + 232;
      }
      const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
      return ansi;
    };
    convert.ansi16.rgb = function(args) {
      let color = args % 10;
      if (color === 0 || color === 7) {
        if (args > 50) {
          color += 3.5;
        }
        color = color / 10.5 * 255;
        return [color, color, color];
      }
      const mult = (~~(args > 50) + 1) * 0.5;
      const r = (color & 1) * mult * 255;
      const g = (color >> 1 & 1) * mult * 255;
      const b = (color >> 2 & 1) * mult * 255;
      return [r, g, b];
    };
    convert.ansi256.rgb = function(args) {
      if (args >= 232) {
        const c = (args - 232) * 10 + 8;
        return [c, c, c];
      }
      args -= 16;
      let rem;
      const r = Math.floor(args / 36) / 5 * 255;
      const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
      const b = rem % 6 / 5 * 255;
      return [r, g, b];
    };
    convert.rgb.hex = function(args) {
      const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
      const string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.hex.rgb = function(args) {
      const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
      if (!match) {
        return [0, 0, 0];
      }
      let colorString = match[0];
      if (match[0].length === 3) {
        colorString = colorString.split("").map((char) => {
          return char + char;
        }).join("");
      }
      const integer = parseInt(colorString, 16);
      const r = integer >> 16 & 255;
      const g = integer >> 8 & 255;
      const b = integer & 255;
      return [r, g, b];
    };
    convert.rgb.hcg = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const max = Math.max(Math.max(r, g), b);
      const min = Math.min(Math.min(r, g), b);
      const chroma = max - min;
      let grayscale;
      let hue;
      if (chroma < 1) {
        grayscale = min / (1 - chroma);
      } else {
        grayscale = 0;
      }
      if (chroma <= 0) {
        hue = 0;
      } else if (max === r) {
        hue = (g - b) / chroma % 6;
      } else if (max === g) {
        hue = 2 + (b - r) / chroma;
      } else {
        hue = 4 + (r - g) / chroma;
      }
      hue /= 6;
      hue %= 1;
      return [hue * 360, chroma * 100, grayscale * 100];
    };
    convert.hsl.hcg = function(hsl) {
      const s = hsl[1] / 100;
      const l = hsl[2] / 100;
      const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
      let f = 0;
      if (c < 1) {
        f = (l - 0.5 * c) / (1 - c);
      }
      return [hsl[0], c * 100, f * 100];
    };
    convert.hsv.hcg = function(hsv) {
      const s = hsv[1] / 100;
      const v = hsv[2] / 100;
      const c = s * v;
      let f = 0;
      if (c < 1) {
        f = (v - c) / (1 - c);
      }
      return [hsv[0], c * 100, f * 100];
    };
    convert.hcg.rgb = function(hcg) {
      const h = hcg[0] / 360;
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      if (c === 0) {
        return [g * 255, g * 255, g * 255];
      }
      const pure = [0, 0, 0];
      const hi = h % 1 * 6;
      const v = hi % 1;
      const w = 1 - v;
      let mg = 0;
      switch (Math.floor(hi)) {
        case 0:
          pure[0] = 1;
          pure[1] = v;
          pure[2] = 0;
          break;
        case 1:
          pure[0] = w;
          pure[1] = 1;
          pure[2] = 0;
          break;
        case 2:
          pure[0] = 0;
          pure[1] = 1;
          pure[2] = v;
          break;
        case 3:
          pure[0] = 0;
          pure[1] = w;
          pure[2] = 1;
          break;
        case 4:
          pure[0] = v;
          pure[1] = 0;
          pure[2] = 1;
          break;
        default:
          pure[0] = 1;
          pure[1] = 0;
          pure[2] = w;
      }
      mg = (1 - c) * g;
      return [
        (c * pure[0] + mg) * 255,
        (c * pure[1] + mg) * 255,
        (c * pure[2] + mg) * 255
      ];
    };
    convert.hcg.hsv = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const v = c + g * (1 - c);
      let f = 0;
      if (v > 0) {
        f = c / v;
      }
      return [hcg[0], f * 100, v * 100];
    };
    convert.hcg.hsl = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const l = g * (1 - c) + 0.5 * c;
      let s = 0;
      if (l > 0 && l < 0.5) {
        s = c / (2 * l);
      } else if (l >= 0.5 && l < 1) {
        s = c / (2 * (1 - l));
      }
      return [hcg[0], s * 100, l * 100];
    };
    convert.hcg.hwb = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const v = c + g * (1 - c);
      return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };
    convert.hwb.hcg = function(hwb) {
      const w = hwb[1] / 100;
      const b = hwb[2] / 100;
      const v = 1 - b;
      const c = v - w;
      let g = 0;
      if (c < 1) {
        g = (v - c) / (1 - c);
      }
      return [hwb[0], c * 100, g * 100];
    };
    convert.apple.rgb = function(apple) {
      return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
    };
    convert.rgb.apple = function(rgb) {
      return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
    };
    convert.gray.rgb = function(args) {
      return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
    };
    convert.gray.hsl = function(args) {
      return [0, 0, args[0]];
    };
    convert.gray.hsv = convert.gray.hsl;
    convert.gray.hwb = function(gray) {
      return [0, 100, gray[0]];
    };
    convert.gray.cmyk = function(gray) {
      return [0, 0, 0, gray[0]];
    };
    convert.gray.lab = function(gray) {
      return [gray[0], 0, 0];
    };
    convert.gray.hex = function(gray) {
      const val = Math.round(gray[0] / 100 * 255) & 255;
      const integer = (val << 16) + (val << 8) + val;
      const string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.rgb.gray = function(rgb) {
      const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
      return [val / 255 * 100];
    };
  }
});

// node_modules/color-convert/route.js
var require_route = __commonJS({
  "node_modules/color-convert/route.js"(exports, module2) {
    var conversions = require_conversions();
    function buildGraph() {
      const graph = {};
      const models = Object.keys(conversions);
      for (let len = models.length, i = 0; i < len; i++) {
        graph[models[i]] = {
          distance: -1,
          parent: null
        };
      }
      return graph;
    }
    function deriveBFS(fromModel) {
      const graph = buildGraph();
      const queue = [fromModel];
      graph[fromModel].distance = 0;
      while (queue.length) {
        const current = queue.pop();
        const adjacents = Object.keys(conversions[current]);
        for (let len = adjacents.length, i = 0; i < len; i++) {
          const adjacent = adjacents[i];
          const node = graph[adjacent];
          if (node.distance === -1) {
            node.distance = graph[current].distance + 1;
            node.parent = current;
            queue.unshift(adjacent);
          }
        }
      }
      return graph;
    }
    function link(from, to) {
      return function(args) {
        return to(from(args));
      };
    }
    function wrapConversion(toModel, graph) {
      const path = [graph[toModel].parent, toModel];
      let fn = conversions[graph[toModel].parent][toModel];
      let cur = graph[toModel].parent;
      while (graph[cur].parent) {
        path.unshift(graph[cur].parent);
        fn = link(conversions[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
      }
      fn.conversion = path;
      return fn;
    }
    module2.exports = function(fromModel) {
      const graph = deriveBFS(fromModel);
      const conversion = {};
      const models = Object.keys(graph);
      for (let len = models.length, i = 0; i < len; i++) {
        const toModel = models[i];
        const node = graph[toModel];
        if (node.parent === null) {
          continue;
        }
        conversion[toModel] = wrapConversion(toModel, graph);
      }
      return conversion;
    };
  }
});

// node_modules/color-convert/index.js
var require_color_convert = __commonJS({
  "node_modules/color-convert/index.js"(exports, module2) {
    var conversions = require_conversions();
    var route = require_route();
    var convert = {};
    var models = Object.keys(conversions);
    function wrapRaw(fn) {
      const wrappedFn = function(...args) {
        const arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args = arg0;
        }
        return fn(args);
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    function wrapRounded(fn) {
      const wrappedFn = function(...args) {
        const arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args = arg0;
        }
        const result = fn(args);
        if (typeof result === "object") {
          for (let len = result.length, i = 0; i < len; i++) {
            result[i] = Math.round(result[i]);
          }
        }
        return result;
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    models.forEach((fromModel) => {
      convert[fromModel] = {};
      Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
      Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
      const routes = route(fromModel);
      const routeModels = Object.keys(routes);
      routeModels.forEach((toModel) => {
        const fn = routes[toModel];
        convert[fromModel][toModel] = wrapRounded(fn);
        convert[fromModel][toModel].raw = wrapRaw(fn);
      });
    });
    module2.exports = convert;
  }
});

// node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS({
  "node_modules/ansi-styles/index.js"(exports, module2) {
    "use strict";
    var wrapAnsi16 = (fn, offset) => (...args) => {
      const code = fn(...args);
      return `[${code + offset}m`;
    };
    var wrapAnsi256 = (fn, offset) => (...args) => {
      const code = fn(...args);
      return `[${38 + offset};5;${code}m`;
    };
    var wrapAnsi16m = (fn, offset) => (...args) => {
      const rgb = fn(...args);
      return `[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
    };
    var ansi2ansi = (n) => n;
    var rgb2rgb = (r, g, b) => [r, g, b];
    var setLazyProperty = (object, property, get) => {
      Object.defineProperty(object, property, {
        get: () => {
          const value = get();
          Object.defineProperty(object, property, {
            value,
            enumerable: true,
            configurable: true
          });
          return value;
        },
        enumerable: true,
        configurable: true
      });
    };
    var colorConvert;
    var makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
      if (colorConvert === void 0) {
        colorConvert = require_color_convert();
      }
      const offset = isBackground ? 10 : 0;
      const styles = {};
      for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
        const name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
        if (sourceSpace === targetSpace) {
          styles[name] = wrap(identity, offset);
        } else if (typeof suite === "object") {
          styles[name] = wrap(suite[targetSpace], offset);
        }
      }
      return styles;
    };
    function assembleStyles() {
      const codes = new Map();
      const styles = {
        modifier: {
          reset: [0, 0],
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      styles.color.gray = styles.color.blackBright;
      styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
      styles.color.grey = styles.color.blackBright;
      styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
      for (const [groupName, group] of Object.entries(styles)) {
        for (const [styleName, style] of Object.entries(group)) {
          styles[styleName] = {
            open: `[${style[0]}m`,
            close: `[${style[1]}m`
          };
          group[styleName] = styles[styleName];
          codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles, groupName, {
          value: group,
          enumerable: false
        });
      }
      Object.defineProperty(styles, "codes", {
        value: codes,
        enumerable: false
      });
      styles.color.close = "[39m";
      styles.bgColor.close = "[49m";
      setLazyProperty(styles.color, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, false));
      setLazyProperty(styles.color, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, false));
      setLazyProperty(styles.color, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, false));
      setLazyProperty(styles.bgColor, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, true));
      setLazyProperty(styles.bgColor, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, true));
      setLazyProperty(styles.bgColor, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, true));
      return styles;
    }
    Object.defineProperty(module2, "exports", {
      enumerable: true,
      get: assembleStyles
    });
  }
});

// node_modules/chalk/source/util.js
var require_util2 = __commonJS({
  "node_modules/chalk/source/util.js"(exports, module2) {
    "use strict";
    var stringReplaceAll = (string, substring, replacer) => {
      let index = string.indexOf(substring);
      if (index === -1) {
        return string;
      }
      const substringLength = substring.length;
      let endIndex = 0;
      let returnValue = "";
      do {
        returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
        endIndex = index + substringLength;
        index = string.indexOf(substring, endIndex);
      } while (index !== -1);
      returnValue += string.substr(endIndex);
      return returnValue;
    };
    var stringEncaseCRLFWithFirstIndex = (string, prefix, postfix, index) => {
      let endIndex = 0;
      let returnValue = "";
      do {
        const gotCR = string[index - 1] === "\r";
        returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
        endIndex = index + 1;
        index = string.indexOf("\n", endIndex);
      } while (index !== -1);
      returnValue += string.substr(endIndex);
      return returnValue;
    };
    module2.exports = {
      stringReplaceAll,
      stringEncaseCRLFWithFirstIndex
    };
  }
});

// node_modules/chalk/source/templates.js
var require_templates = __commonJS({
  "node_modules/chalk/source/templates.js"(exports, module2) {
    "use strict";
    var TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
    var STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
    var STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
    var ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;
    var ESCAPES = new Map([
      ["n", "\n"],
      ["r", "\r"],
      ["t", "	"],
      ["b", "\b"],
      ["f", "\f"],
      ["v", "\v"],
      ["0", "\0"],
      ["\\", "\\"],
      ["e", ""],
      ["a", "\x07"]
    ]);
    function unescape2(c) {
      const u = c[0] === "u";
      const bracket = c[1] === "{";
      if (u && !bracket && c.length === 5 || c[0] === "x" && c.length === 3) {
        return String.fromCharCode(parseInt(c.slice(1), 16));
      }
      if (u && bracket) {
        return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
      }
      return ESCAPES.get(c) || c;
    }
    function parseArguments(name, arguments_) {
      const results = [];
      const chunks = arguments_.trim().split(/\s*,\s*/g);
      let matches;
      for (const chunk of chunks) {
        const number = Number(chunk);
        if (!Number.isNaN(number)) {
          results.push(number);
        } else if (matches = chunk.match(STRING_REGEX)) {
          results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, character) => escape ? unescape2(escape) : character));
        } else {
          throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
        }
      }
      return results;
    }
    function parseStyle(style) {
      STYLE_REGEX.lastIndex = 0;
      const results = [];
      let matches;
      while ((matches = STYLE_REGEX.exec(style)) !== null) {
        const name = matches[1];
        if (matches[2]) {
          const args = parseArguments(name, matches[2]);
          results.push([name].concat(args));
        } else {
          results.push([name]);
        }
      }
      return results;
    }
    function buildStyle(chalk2, styles) {
      const enabled = {};
      for (const layer of styles) {
        for (const style of layer.styles) {
          enabled[style[0]] = layer.inverse ? null : style.slice(1);
        }
      }
      let current = chalk2;
      for (const [styleName, styles2] of Object.entries(enabled)) {
        if (!Array.isArray(styles2)) {
          continue;
        }
        if (!(styleName in current)) {
          throw new Error(`Unknown Chalk style: ${styleName}`);
        }
        current = styles2.length > 0 ? current[styleName](...styles2) : current[styleName];
      }
      return current;
    }
    module2.exports = (chalk2, temporary) => {
      const styles = [];
      const chunks = [];
      let chunk = [];
      temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style, close, character) => {
        if (escapeCharacter) {
          chunk.push(unescape2(escapeCharacter));
        } else if (style) {
          const string = chunk.join("");
          chunk = [];
          chunks.push(styles.length === 0 ? string : buildStyle(chalk2, styles)(string));
          styles.push({ inverse, styles: parseStyle(style) });
        } else if (close) {
          if (styles.length === 0) {
            throw new Error("Found extraneous } in Chalk template literal");
          }
          chunks.push(buildStyle(chalk2, styles)(chunk.join("")));
          chunk = [];
          styles.pop();
        } else {
          chunk.push(character);
        }
      });
      chunks.push(chunk.join(""));
      if (styles.length > 0) {
        const errMessage = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? "" : "s"} (\`}\`)`;
        throw new Error(errMessage);
      }
      return chunks.join("");
    };
  }
});

// node_modules/chalk/source/index.js
var require_source = __commonJS({
  "node_modules/chalk/source/index.js"(exports, module2) {
    "use strict";
    var ansiStyles = require_ansi_styles();
    var { stdout: stdoutColor, stderr: stderrColor } = require_supports_color();
    var {
      stringReplaceAll,
      stringEncaseCRLFWithFirstIndex
    } = require_util2();
    var { isArray } = Array;
    var levelMapping = [
      "ansi",
      "ansi",
      "ansi256",
      "ansi16m"
    ];
    var styles = Object.create(null);
    var applyOptions = (object, options = {}) => {
      if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
        throw new Error("The `level` option should be an integer from 0 to 3");
      }
      const colorLevel = stdoutColor ? stdoutColor.level : 0;
      object.level = options.level === void 0 ? colorLevel : options.level;
    };
    var ChalkClass = class {
      constructor(options) {
        return chalkFactory(options);
      }
    };
    var chalkFactory = (options) => {
      const chalk3 = {};
      applyOptions(chalk3, options);
      chalk3.template = (...arguments_) => chalkTag(chalk3.template, ...arguments_);
      Object.setPrototypeOf(chalk3, Chalk.prototype);
      Object.setPrototypeOf(chalk3.template, chalk3);
      chalk3.template.constructor = () => {
        throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
      };
      chalk3.template.Instance = ChalkClass;
      return chalk3.template;
    };
    function Chalk(options) {
      return chalkFactory(options);
    }
    for (const [styleName, style] of Object.entries(ansiStyles)) {
      styles[styleName] = {
        get() {
          const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
          Object.defineProperty(this, styleName, { value: builder });
          return builder;
        }
      };
    }
    styles.visible = {
      get() {
        const builder = createBuilder(this, this._styler, true);
        Object.defineProperty(this, "visible", { value: builder });
        return builder;
      }
    };
    var usedModels = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
    for (const model of usedModels) {
      styles[model] = {
        get() {
          const { level } = this;
          return function(...arguments_) {
            const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
            return createBuilder(this, styler, this._isEmpty);
          };
        }
      };
    }
    for (const model of usedModels) {
      const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
      styles[bgModel] = {
        get() {
          const { level } = this;
          return function(...arguments_) {
            const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
            return createBuilder(this, styler, this._isEmpty);
          };
        }
      };
    }
    var proto = Object.defineProperties(() => {
    }, {
      ...styles,
      level: {
        enumerable: true,
        get() {
          return this._generator.level;
        },
        set(level) {
          this._generator.level = level;
        }
      }
    });
    var createStyler = (open, close, parent) => {
      let openAll;
      let closeAll;
      if (parent === void 0) {
        openAll = open;
        closeAll = close;
      } else {
        openAll = parent.openAll + open;
        closeAll = close + parent.closeAll;
      }
      return {
        open,
        close,
        openAll,
        closeAll,
        parent
      };
    };
    var createBuilder = (self, _styler, _isEmpty) => {
      const builder = (...arguments_) => {
        if (isArray(arguments_[0]) && isArray(arguments_[0].raw)) {
          return applyStyle(builder, chalkTag(builder, ...arguments_));
        }
        return applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
      };
      Object.setPrototypeOf(builder, proto);
      builder._generator = self;
      builder._styler = _styler;
      builder._isEmpty = _isEmpty;
      return builder;
    };
    var applyStyle = (self, string) => {
      if (self.level <= 0 || !string) {
        return self._isEmpty ? "" : string;
      }
      let styler = self._styler;
      if (styler === void 0) {
        return string;
      }
      const { openAll, closeAll } = styler;
      if (string.indexOf("") !== -1) {
        while (styler !== void 0) {
          string = stringReplaceAll(string, styler.close, styler.open);
          styler = styler.parent;
        }
      }
      const lfIndex = string.indexOf("\n");
      if (lfIndex !== -1) {
        string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
      }
      return openAll + string + closeAll;
    };
    var template;
    var chalkTag = (chalk3, ...strings) => {
      const [firstString] = strings;
      if (!isArray(firstString) || !isArray(firstString.raw)) {
        return strings.join(" ");
      }
      const arguments_ = strings.slice(1);
      const parts = [firstString.raw[0]];
      for (let i = 1; i < firstString.length; i++) {
        parts.push(String(arguments_[i - 1]).replace(/[{}\\]/g, "\\$&"), String(firstString.raw[i]));
      }
      if (template === void 0) {
        template = require_templates();
      }
      return template(chalk3, parts.join(""));
    };
    Object.defineProperties(Chalk.prototype, styles);
    var chalk2 = Chalk();
    chalk2.supportsColor = stdoutColor;
    chalk2.stderr = Chalk({ level: stderrColor ? stderrColor.level : 0 });
    chalk2.stderr.supportsColor = stderrColor;
    module2.exports = chalk2;
  }
});

// node_modules/keypress/index.js
var require_keypress = __commonJS({
  "node_modules/keypress/index.js"(exports, module2) {
    var EventEmitter = require("events").EventEmitter;
    var exports = module2.exports = keypress;
    function keypress(stream) {
      if (isEmittingKeypress(stream))
        return;
      var StringDecoder = require("string_decoder").StringDecoder;
      stream._keypressDecoder = new StringDecoder("utf8");
      function onData(b) {
        if (listenerCount(stream, "keypress") > 0) {
          var r = stream._keypressDecoder.write(b);
          if (r)
            emitKey(stream, r);
        } else {
          stream.removeListener("data", onData);
          stream.on("newListener", onNewListener);
        }
      }
      function onNewListener(event) {
        if (event == "keypress") {
          stream.on("data", onData);
          stream.removeListener("newListener", onNewListener);
        }
      }
      if (listenerCount(stream, "keypress") > 0) {
        stream.on("data", onData);
      } else {
        stream.on("newListener", onNewListener);
      }
    }
    function isEmittingKeypress(stream) {
      var rtn = !!stream._keypressDecoder;
      if (!rtn) {
        stream.listeners("data").slice(0).forEach(function(l) {
          if (l.name == "onData" && /emitKey/.test(l.toString())) {
            stream.removeListener("data", l);
          }
        });
        stream.listeners("newListener").slice(0).forEach(function(l) {
          if (l.name == "onNewListener" && /keypress/.test(l.toString())) {
            stream.removeListener("newListener", l);
          }
        });
      }
      return rtn;
    }
    exports.enableMouse = function(stream) {
      stream.write("[?1000h");
    };
    exports.disableMouse = function(stream) {
      stream.write("[?1000l");
    };
    var listenerCount = EventEmitter.listenerCount;
    if (!listenerCount) {
      listenerCount = function(emitter, event) {
        return emitter.listeners(event).length;
      };
    }
    var metaKeyCodeRe = /^(?:\x1b)([a-zA-Z0-9])$/;
    var functionKeyCodeRe = /^(?:\x1b+)(O|N|\[|\[\[)(?:(\d+)(?:;(\d+))?([~^$])|(?:1;)?(\d+)?([a-zA-Z]))/;
    function emitKey(stream, s) {
      var ch, key = {
        name: void 0,
        ctrl: false,
        meta: false,
        shift: false
      }, parts;
      if (Buffer.isBuffer(s)) {
        if (s[0] > 127 && s[1] === void 0) {
          s[0] -= 128;
          s = "" + s.toString(stream.encoding || "utf-8");
        } else {
          s = s.toString(stream.encoding || "utf-8");
        }
      }
      key.sequence = s;
      if (s === "\r") {
        key.name = "return";
      } else if (s === "\n") {
        key.name = "enter";
      } else if (s === "	") {
        key.name = "tab";
      } else if (s === "\b" || s === "\x7F" || s === "\x7F" || s === "\b") {
        key.name = "backspace";
        key.meta = s.charAt(0) === "";
      } else if (s === "" || s === "") {
        key.name = "escape";
        key.meta = s.length === 2;
      } else if (s === " " || s === " ") {
        key.name = "space";
        key.meta = s.length === 2;
      } else if (s <= "") {
        key.name = String.fromCharCode(s.charCodeAt(0) + "a".charCodeAt(0) - 1);
        key.ctrl = true;
      } else if (s.length === 1 && s >= "a" && s <= "z") {
        key.name = s;
      } else if (s.length === 1 && s >= "A" && s <= "Z") {
        key.name = s.toLowerCase();
        key.shift = true;
      } else if (parts = metaKeyCodeRe.exec(s)) {
        key.name = parts[1].toLowerCase();
        key.meta = true;
        key.shift = /^[A-Z]$/.test(parts[1]);
      } else if (parts = functionKeyCodeRe.exec(s)) {
        var code = (parts[1] || "") + (parts[2] || "") + (parts[4] || "") + (parts[6] || ""), modifier = (parts[3] || parts[5] || 1) - 1;
        key.ctrl = !!(modifier & 4);
        key.meta = !!(modifier & 10);
        key.shift = !!(modifier & 1);
        key.code = code;
        switch (code) {
          case "OP":
            key.name = "f1";
            break;
          case "OQ":
            key.name = "f2";
            break;
          case "OR":
            key.name = "f3";
            break;
          case "OS":
            key.name = "f4";
            break;
          case "[11~":
            key.name = "f1";
            break;
          case "[12~":
            key.name = "f2";
            break;
          case "[13~":
            key.name = "f3";
            break;
          case "[14~":
            key.name = "f4";
            break;
          case "[[A":
            key.name = "f1";
            break;
          case "[[B":
            key.name = "f2";
            break;
          case "[[C":
            key.name = "f3";
            break;
          case "[[D":
            key.name = "f4";
            break;
          case "[[E":
            key.name = "f5";
            break;
          case "[15~":
            key.name = "f5";
            break;
          case "[17~":
            key.name = "f6";
            break;
          case "[18~":
            key.name = "f7";
            break;
          case "[19~":
            key.name = "f8";
            break;
          case "[20~":
            key.name = "f9";
            break;
          case "[21~":
            key.name = "f10";
            break;
          case "[23~":
            key.name = "f11";
            break;
          case "[24~":
            key.name = "f12";
            break;
          case "[A":
            key.name = "up";
            break;
          case "[B":
            key.name = "down";
            break;
          case "[C":
            key.name = "right";
            break;
          case "[D":
            key.name = "left";
            break;
          case "[E":
            key.name = "clear";
            break;
          case "[F":
            key.name = "end";
            break;
          case "[H":
            key.name = "home";
            break;
          case "OA":
            key.name = "up";
            break;
          case "OB":
            key.name = "down";
            break;
          case "OC":
            key.name = "right";
            break;
          case "OD":
            key.name = "left";
            break;
          case "OE":
            key.name = "clear";
            break;
          case "OF":
            key.name = "end";
            break;
          case "OH":
            key.name = "home";
            break;
          case "[1~":
            key.name = "home";
            break;
          case "[2~":
            key.name = "insert";
            break;
          case "[3~":
            key.name = "delete";
            break;
          case "[4~":
            key.name = "end";
            break;
          case "[5~":
            key.name = "pageup";
            break;
          case "[6~":
            key.name = "pagedown";
            break;
          case "[[5~":
            key.name = "pageup";
            break;
          case "[[6~":
            key.name = "pagedown";
            break;
          case "[7~":
            key.name = "home";
            break;
          case "[8~":
            key.name = "end";
            break;
          case "[a":
            key.name = "up";
            key.shift = true;
            break;
          case "[b":
            key.name = "down";
            key.shift = true;
            break;
          case "[c":
            key.name = "right";
            key.shift = true;
            break;
          case "[d":
            key.name = "left";
            key.shift = true;
            break;
          case "[e":
            key.name = "clear";
            key.shift = true;
            break;
          case "[2$":
            key.name = "insert";
            key.shift = true;
            break;
          case "[3$":
            key.name = "delete";
            key.shift = true;
            break;
          case "[5$":
            key.name = "pageup";
            key.shift = true;
            break;
          case "[6$":
            key.name = "pagedown";
            key.shift = true;
            break;
          case "[7$":
            key.name = "home";
            key.shift = true;
            break;
          case "[8$":
            key.name = "end";
            key.shift = true;
            break;
          case "Oa":
            key.name = "up";
            key.ctrl = true;
            break;
          case "Ob":
            key.name = "down";
            key.ctrl = true;
            break;
          case "Oc":
            key.name = "right";
            key.ctrl = true;
            break;
          case "Od":
            key.name = "left";
            key.ctrl = true;
            break;
          case "Oe":
            key.name = "clear";
            key.ctrl = true;
            break;
          case "[2^":
            key.name = "insert";
            key.ctrl = true;
            break;
          case "[3^":
            key.name = "delete";
            key.ctrl = true;
            break;
          case "[5^":
            key.name = "pageup";
            key.ctrl = true;
            break;
          case "[6^":
            key.name = "pagedown";
            key.ctrl = true;
            break;
          case "[7^":
            key.name = "home";
            key.ctrl = true;
            break;
          case "[8^":
            key.name = "end";
            key.ctrl = true;
            break;
          case "[Z":
            key.name = "tab";
            key.shift = true;
            break;
          default:
            key.name = "undefined";
            break;
        }
      } else if (s.length > 1 && s[0] !== "") {
        Array.prototype.forEach.call(s, function(c) {
          emitKey(stream, c);
        });
        return;
      }
      if (key.code == "[M") {
        key.name = "mouse";
        var s = key.sequence;
        var b = s.charCodeAt(3);
        key.x = s.charCodeAt(4) - 32;
        key.y = s.charCodeAt(5) - 32;
        key.scroll = 0;
        key.ctrl = !!(1 << 4 & b);
        key.meta = !!(1 << 3 & b);
        key.shift = !!(1 << 2 & b);
        key.release = (3 & b) === 3;
        if (1 << 6 & b) {
          key.scroll = 1 & b ? 1 : -1;
        }
        if (!key.release && !key.scroll) {
          key.button = b & 3;
        }
      }
      if (key.name === void 0) {
        key = void 0;
      }
      if (s.length === 1) {
        ch = s;
      }
      if (key && key.name == "mouse") {
        stream.emit("mousepress", key);
      } else if (key || ch) {
        stream.emit("keypress", ch, key);
      }
    }
  }
});

// src/index.ts
__export(exports, {
  channelman: () => channelman,
  historyman: () => historyman,
  messageman: () => messageman,
  scrollman: () => scrollman,
  serverman: () => serverman,
  socketman: () => socketman
});
var import_fs = __toModule(require("fs"));
var import_readline = __toModule(require("readline"));

// node_modules/socket.io-client/wrapper.mjs
var import_build = __toModule(require_build());
var Manager = import_build.default.Manager;
var Socket = import_build.default.Socket;
var wrapper_default = import_build.default;

// src/util/setTitle.ts
function setTitle(text) {
  process.stdout.write(String.fromCharCode(27) + "]0;" + text + String.fromCharCode(7));
}

// src/config.ts
var config = {
  prefix: "v!",
  guild: "832290972880470117",
  productName: "TDSClient",
  keyListMap: "123456789abcdefghijklmnopqrstuvwxyz".split(""),
  qwerty: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_-+={[}]|\\\"':;<,>.?/~`\n ",
  loading: [".  ", ".. ", "...", " ..", "  .", " ..", "...", ".. "],
  mentionPatterns: {
    user: /<@!?(\d{17,19})>/g,
    role: /<@&(\d{17,19})>/g,
    channel: /<#(\d{17,19})>/g,
    emoji: /<a?:(.*):(\d{17,19})>/g
  }
};
var config_default = config;

// src/pages/0-BootMenu.ts
var page0 = {
  text: `Press 1 to view channels.
         Press x to get key hex codes.
         Press space to reload.
         Or press CTRL+C to exit.`,
  title: `Boot Menu - ${config_default.productName}`,
  onload: () => {
    setHexMode(false);
  },
  keyPress: (k) => {
    switch (k) {
      case "1":
        loadPage(2);
        break;
      case "x":
        loadPage(1);
        break;
      case " ":
        console.log("Restarting...");
        require("child_process").spawnSync(process.argv[0], process.argv.slice(1), {
          env: { process_restarting: 1 },
          stdio: "inherit"
        });
        process.exit(0);
        break;
      case "":
        process.exit(0);
    }
  }
};
var BootMenu_default = page0;

// src/pages/1-HexCodes.ts
var page1 = {
  text: `Press any key to see it's hex code.
         Or press CTRL+C to go back.`,
  title: `Hex Codes - ${config_default.productName}`,
  onload: () => {
    process.stdin.setEncoding("hex");
    setHexMode(true);
  },
  keyPress: (k) => {
    if (k == "03")
      return loadPage(0);
    console.log(`Code: '${k}'`);
  }
};
var HexCodes_default = page1;

// src/util/chatDisabled.ts
var chatDisabled = false;
function disableChat(val) {
  chatDisabled = val;
}

// src/pages/2-ChannelList.ts
var ciMap = {};
var page2 = {
  text: `Press a key to view/join a channel below.
     Or press CTRL+C to go back.`,
  title: `Channel List - ${config_default.productName}`,
  onload: () => {
    let channels = serverman.server.channels.filter((c) => c.type == "GUILD_TEXT" || c.type == "GUILD_NEWS");
    let ci = 0;
    let category = "";
    ciMap = {};
    channels.sort((c1, c2) => {
      return c1.rawPosition > c2.rawPosition ? 1 : -1;
    }).forEach((c) => {
      if (category !== c.parent?.name) {
        category = c.parent.name;
        console.log(`
${category}`);
      }
      console.log(`${config_default.keyListMap[ci]}> #${c.name}`);
      ciMap[config_default.keyListMap[ci]] = c.id;
      ci++;
    });
    channels = serverman.server.channels.filter((c) => c.type == "GUILD_VOICE");
    category = "";
    channels.sort((c1, c2) => {
      return c1.rawPosition > c2.rawPosition ? 1 : -1;
    }).forEach((c) => {
      if (category == "") {
        console.log("\n-- Voice Channels --");
        category = "vc";
      }
      console.log(`${config_default.keyListMap[ci]}> ${c.name}`);
      ciMap[config_default.keyListMap[ci]] = c.id;
      ci++;
    });
  },
  keyPress: (k) => {
    if (k == "")
      return loadPage(0);
    if (ciMap[k]) {
      channelman.data(serverman.server.channels.find((c) => c.id == ciMap[k]));
      if (channelman.channel.type == "GUILD_VOICE")
        return;
      if (!channelman.channel.canSend) {
        disableChat(true);
        messageman.set("READ ONLY");
      } else {
        disableChat(false);
        messageman.set("");
        historyman.reset();
      }
      scrollman.reset();
      loadPage(3);
    }
  }
};
var ChannelList_default = page2;

// src/keymap.ts
var keymap = {
  "20": " ",
  "21": "!",
  "22": '"',
  "23": "#",
  "24": "$",
  "25": "%",
  "26": "&",
  "27": "'",
  "28": "(",
  "29": ")",
  "2a": "*",
  "2b": "+",
  "2c": ",",
  "2d": "-",
  "2e": ".",
  "2f": "/",
  "30": "0",
  "31": "1",
  "32": "2",
  "33": "3",
  "34": "4",
  "35": "5",
  "36": "6",
  "37": "7",
  "38": "8",
  "39": "9",
  "3a": ":",
  "3b": ";",
  "3c": "<",
  "3d": "=",
  "3e": ">",
  "3f": "?",
  "40": "@",
  "41": "A",
  "42": "B",
  "43": "C",
  "44": "D",
  "45": "E",
  "46": "F",
  "47": "G",
  "48": "H",
  "49": "I",
  "4a": "J",
  "4b": "K",
  "4c": "L",
  "4d": "M",
  "4e": "N",
  "4f": "O",
  "50": "P",
  "51": "Q",
  "52": "R",
  "53": "S",
  "54": "T",
  "55": "U",
  "56": "V",
  "57": "W",
  "58": "X",
  "59": "Y",
  "5a": "Z",
  "5b": "[",
  "5c": "\\",
  "5d": "]",
  "5e": "^",
  "5f": "_",
  "60": "`",
  "61": "a",
  "62": "b",
  "63": "c",
  "64": "d",
  "65": "e",
  "66": "f",
  "67": "g",
  "68": "h",
  "69": "i",
  "6a": "j",
  "6b": "k",
  "6c": "l",
  "6d": "m",
  "6e": "n",
  "6f": "o",
  "70": "p",
  "71": "q",
  "72": "r",
  "73": "s",
  "74": "t",
  "75": "u",
  "76": "v",
  "77": "w",
  "78": "x",
  "79": "y",
  "7a": "z",
  "7b": "{",
  "7c": "|",
  "7d": "}",
  "7e": "~"
};
var keymap_default = keymap;

// src/util/termSize.ts
var create = (columns, rows) => ({
  columns: Number.parseInt(columns, 10),
  rows: Number.parseInt(rows, 10)
});
function termSize() {
  const { env, stdout, stderr } = process;
  if (stdout && stdout.columns && stdout.rows) {
    return create(stdout.columns, stdout.rows);
  }
  if (stderr && stderr.columns && stderr.rows) {
    return create(stderr.columns, stderr.rows);
  }
  if (env.COLUMNS && env.LINES) {
    return create(env.COLUMNS, env.LINES);
  }
  return create(80, 24);
}

// src/util/loader.ts
var loader;
function showLoader() {
  if (loader)
    clearInterval(loader);
  let loadNum = 0;
  loader = setInterval(() => {
    let loading = config_default.loading[loadNum];
    let padTop = (" ".repeat(termSize().columns) + "\n").repeat(Math.floor(termSize().rows / 2) - 2);
    let padLeft = " ".repeat(Math.ceil((termSize().columns - loading.length / 2) / 2) + 2);
    process.stdout.write(`${padTop}
${padLeft}${loading}${padTop}`);
    loadNum++;
    if (loadNum == config_default.loading.length)
      loadNum = 0;
  }, 200);
}
function stopLoader() {
  if (loader)
    clearInterval(loader);
}

// src/pages/3-Chat.ts
var import_clipboardy = __toModule(require_clipboardy());

// src/util/parse.ts
var import_chalk = __toModule(require_source());
function parse(content) {
  let cont = [...content].map((c) => config_default.qwerty.includes(c) ? c : "?").join("").replace(/\*\*\*(.*)\*\*\*/gim, import_chalk.default.bold.italic("$1")).replace(/\*\*(.*)\*\*/gim, import_chalk.default.bold("$1")).replace(/\*(.*)\*/gim, import_chalk.default.italic("$1")).replace(/\_\_(.*)\_\_/gim, import_chalk.default.underline("$1")).replace(/\~\~(.*)\~\~/gim, import_chalk.default.strikethrough("$1"));
  function doUserMention() {
    let mention = cont.match(config_default.mentionPatterns.user);
    if (!mention)
      return;
    mention = mention[0];
    let id = mention.slice(2, -1);
    if (id.startsWith("!"))
      id = id.substring(1);
    let mem = serverman.server.members.find((m) => m.userId == id);
    cont = cont.replace(new RegExp(mention, "g"), import_chalk.default.blueBright(`@${mem?.displayName || "Unknown"}`));
    doUserMention();
  }
  doUserMention();
  function doChannelMention() {
    let mention = cont.match(config_default.mentionPatterns.channel);
    if (!mention)
      return;
    mention = mention[0];
    let id = mention.slice(2, -1);
    let ch = serverman.server.channels.find((c) => c.id == id);
    cont = cont.replace(new RegExp(mention, "g"), import_chalk.default.blueBright(`#${ch?.name || "unknown"}`));
    doChannelMention();
  }
  doChannelMention();
  function doRoleMention() {
    let mention = cont.match(config_default.mentionPatterns.role);
    if (!mention)
      return;
    mention = mention[0];
    let id = mention.slice(3, -1);
    let role = serverman.server.roles.find((r) => r.id == id);
    cont = cont.replace(new RegExp(mention, "g"), import_chalk.default.blueBright(`@${role?.name || "Unknown"}`));
    doRoleMention();
  }
  doRoleMention();
  function doEmojiMention() {
    let mention = cont.match(config_default.mentionPatterns.emoji);
    if (!mention)
      return;
    mention = mention[0];
    let id = mention.slice(1, -1);
    if (id.startsWith("a"))
      id = id.substring(1);
    id = id.substring(1);
    id = id.split(":")[0];
    cont = cont.replace(new RegExp(mention, "g"), import_chalk.default.magentaBright(`:${id}:`));
    doEmojiMention();
  }
  doEmojiMention();
  return cont;
}

// src/util/fetchMessages.ts
async function fetchMessages(id) {
  return new Promise((res) => {
    socketman.socket.emit("fetchMessages", id);
    socketman.socket.once("messages", (cid, messages) => {
      try {
        serverman.server.channels.forEach((c, i) => {
          if (c.id == cid) {
            let ch = serverman.server.channels[i];
            ch.messages = messages;
            serverman.server.channels[i] = ch;
          }
        });
        if (channelman.channel.id == cid)
          channelman.channel.messages = messages;
      } catch (e) {
      }
      res(void 0);
    });
  });
}

// src/pages/3-Chat.ts
var fetched = [];
var chatHigh = null;
var hadMessage = false;
var typing = false;
var lastMessage = "";
var page3 = {
  text: "",
  title: "",
  onload: async () => {
    process.stdin.setEncoding("hex");
    setHexMode(true);
    setTitle(`#${channelman.channel.name || "unknown"} - ${config_default.productName}`);
    let chatLines = [];
    let maxChatLines = termSize().rows - 4;
    console.log("TOP");
    if (!fetched.includes(channelman.channel.id)) {
      showLoader();
      await fetchMessages(channelman.channel.id);
      stopLoader();
      fetched.push(channelman.channel.id);
    }
    console.log(channelman.channel.messages[0].content);
    let msgs = channelman.channel.messages.filter((m) => m.content).sort((m1, m2) => {
      return m1.createdTimestamp > m2.createdTimestamp ? 1 : -1;
    });
    msgs.forEach((message) => {
      chatLines.push(...`${message.member?.nickname || message.author.username}: ${parse(message.content)}${message.editedAt ? " (edited)" : ""}`.split("\n"));
    });
    let min = Math.max(0, chatLines.length - maxChatLines - 1 - scrollman.value);
    let max = chatLines.length - scrollman.value;
    chatLines = chatLines.slice(min, max);
    if (min == 0)
      chatHigh = true;
    else
      chatHigh = false;
    let pad = "";
    if (chatLines.length - 1 < maxChatLines)
      pad = "\n".repeat(maxChatLines - (chatLines.length - 1));
    process.stdout.write(`${chatLines.join("\n")}${pad}

${"\u2014".repeat(termSize().columns)}
> ${messageman.message}`);
  },
  keyPress: (k) => {
    if (k == "03")
      return loadPage(2);
    if (k == "1b5b357e" && chatHigh !== true)
      scrollman.up();
    if (k == "1b5b367e" && scrollman.value > 0)
      scrollman.down();
    if (!chatDisabled) {
      if (k == "08")
        messageman.set(messageman.message.substr(0, messageman.message.length - 1));
      else if (k == "1a")
        messageman.set(historyman.undo());
      else if (k == "0d" && messageman.message) {
        if (messageman.message.trim()) {
          if (messageman.message.startsWith("/nick ")) {
            socketman.socket.emit("setNick", messageman.message.substring("/nick ".length));
          } else
            socketman.socket.emit("sendMessage", channelman.channel.id, messageman.message);
        }
        messageman.set("");
        lastMessage = historyman.undo();
        historyman.reset();
        typing = false;
      } else if (k == "16") {
        historyman.add(messageman.message);
        messageman.set(messageman.message + import_clipboardy.default.readSync().split("").filter((ct) => Object.values(keymap_default).includes(ct)).join(""));
      } else if (Object.keys(keymap_default).includes(k)) {
        historyman.add(messageman.message);
        messageman.set(messageman.message + keymap_default[k]);
      }
      if (messageman.message) {
        if (!hadMessage) {
          hadMessage = true;
          typing = true;
          socketman.socket.emit("type", channelman.channel.id);
        }
      } else {
        hadMessage = false;
        if (typing) {
          typing = false;
          socketman.socket.emit("stopType", channelman.channel.id);
        }
      }
    }
    loadPage(3);
  }
};
var Chat_default = page3;

// src/loadPage.ts
var pages = [BootMenu_default, HexCodes_default, ChannelList_default, Chat_default];
var hexMode = false;
var pageNum = 0;
var press;
function loadPage(num) {
  let page = pages[num];
  pageNum = num;
  if (page.title)
    setTitle(page.title);
  console.clear();
  process.stdin.setEncoding("utf8");
  hexMode = false;
  if (page.text)
    console.log(page.text.replace(new RegExp(" ".repeat(9), "g"), ""));
  page.onload();
  press = page.keyPress;
}
function setHexMode(val) {
  hexMode = val;
}

// src/managers/ServerManager.ts
var ServerManager = class {
  constructor() {
  }
  data(server) {
    this.server = server;
  }
};

// src/managers/ChannelManager.ts
var ChannelManager = class {
  constructor() {
  }
  data(channel) {
    this.channel = channel;
  }
};

// src/managers/ScrollManager.ts
var ScrollManager = class {
  constructor() {
    this.value = 0;
  }
  reset() {
    this.value = 0;
  }
  up() {
    this.value++;
  }
  down() {
    this.value--;
  }
};

// src/managers/HistoryManager.ts
var HistoryManager = class {
  constructor() {
    this.history = [];
  }
  reset() {
    this.history = [];
  }
  undo() {
    return this.history.pop();
  }
  add(text) {
    this.history.push(text);
  }
};

// src/managers/ChatMessageManager.ts
var ChatMessageManager = class {
  constructor() {
  }
  set(text) {
    this.message = text;
  }
};

// src/managers/SocketManager.ts
var SocketManager = class {
  constructor() {
  }
  set(sock) {
    this.socket = sock;
  }
};

// src/index.ts
console.clear();
console.log("Booting...");
var TOKEN = String(import_fs.default.readFileSync("TOKEN"));
var PROXY = String(import_fs.default.readFileSync("PROXY"));
var serverman = new ServerManager();
var channelman = new ChannelManager();
var messageman = new ChatMessageManager();
var scrollman = new ScrollManager();
var historyman = new HistoryManager();
var socketman = new SocketManager();
setTitle("Logging in...");
var inter = import_readline.default.createInterface({ input: process.stdin, output: process.stdout });
inter.question(`Enter proxy URL or press enter to use current. (${PROXY})
> `, (proxyUrl) => {
  proxyUrl = proxyUrl || PROXY;
  if (proxyUrl !== PROXY)
    import_fs.default.writeFileSync("PROXY", proxyUrl);
  inter.close();
  let socket = wrapper_default(proxyUrl);
  socketman.set(socket);
  require_keypress()(process.stdin);
  console.log(`Connecting to ${proxyUrl}...`);
  setTitle("Connecting...");
  socket.on("connect", () => {
    setTitle("Connected!");
    console.clear();
    console.log("Connected to proxy server.");
    process.stdin.setMaxListeners(Infinity);
    let hexKey = "";
    socket.on("botready", (bot) => {
      console.log(`${bot.tag} is online!`);
      console.log("Getting main guild...");
      socket.emit("guild", config_default.guild);
      socket.once("doneguild", (s) => {
        serverman.data(s);
        process.stdin.on("keypress", (k) => {
          if (!hexMode) {
            press(k);
            hexKey = "";
            return;
          }
          hexKey += k;
          if (hexKey.length >= 2) {
            if ((hexKey.startsWith("1b") || hexKey.startsWith("1b5") || hexKey.startsWith("1b5b")) && !hexKey.endsWith("7e") && !hexKey.endsWith("41") && !hexKey.endsWith("42") && !hexKey.endsWith("43") && !hexKey.endsWith("44") && hexKey.length < 8)
              return;
            press(hexKey);
            hexKey = "";
          }
        });
        loadPage(0);
      });
      socket.on("messageCreate", async (message) => {
        if (!message.content || !message.guild)
          return;
        let ind = serverman.server.channels.indexOf(serverman.server.channels.find((c) => c.id == message.channel.id));
        serverman.server.channels[ind].messages.push(message);
        if (message.author.id == bot.id)
          scrollman.reset();
        loadPage(3);
        if (message.author.bot || !message.content.startsWith(config_default.prefix))
          return;
        let args = message.content.substring(config_default.prefix.length).split(" ");
        let command = args.shift();
        switch (command) {
          case "xd":
            socket.emit("sendMessage", message.channel.id, "xd");
            break;
        }
      });
      socket.on("messageUpdate", async (message) => {
        if (!message.content || !message.guild)
          return;
        await fetchMessages(message.channel.id);
        if (channelman.channel.id == message.channel.id && pageNum == 3)
          loadPage(3);
      });
    });
    console.log("Logging in...");
    socket.emit("login", TOKEN);
  });
  process.stdin.setRawMode(true);
  process.stdin.setEncoding("utf8");
  process.stdin.resume();
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  channelman,
  historyman,
  messageman,
  scrollman,
  serverman,
  socketman
});
/*! arch. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/**
 * Wrapper for built-in http.js to emulate the browser XMLHttpRequest object.
 *
 * This can be used with JS designed for browsers to improve reuse of code and
 * allow the use of existing libraries.
 *
 * Usage: include("XMLHttpRequest.js") and use XMLHttpRequest per W3C specs.
 *
 * @author Dan DeFelippi <dan@driverdan.com>
 * @contributor David Ellis <d.f.ellis@ieee.org>
 * @license MIT
 */
