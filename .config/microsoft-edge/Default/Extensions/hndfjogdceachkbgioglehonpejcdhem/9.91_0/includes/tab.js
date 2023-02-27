!function(e) {
    var r = {};
    function t(s) {
        if (r[s]) return r[s].exports;
        var n = r[s] = {
            i: s,
            l: !1,
            exports: {}
        };
        return e[s].call(n.exports, n, n.exports, t), n.l = !0, n.exports;
    }
    t.m = e, t.c = r, t.d = function(e, r, s) {
        t.o(e, r) || Object.defineProperty(e, r, {
            enumerable: !0,
            get: s
        });
    }, t.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.t = function(e, r) {
        if (1 & r && (e = t(e)), 8 & r) return e;
        if (4 & r && "object" == typeof e && e && e.__esModule) return e;
        var s = Object.create(null);
        if (t.r(s), Object.defineProperty(s, "default", {
            enumerable: !0,
            value: e
        }), 2 & r && "string" != typeof e) for (var n in e) t.d(s, n, function(r) {
            return e[r];
        }.bind(null, n));
        return s;
    }, t.n = function(e) {
        var r = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(r, "a", r), r;
    }, t.o = function(e, r) {
        return Object.prototype.hasOwnProperty.call(e, r);
    }, t.p = "", t(t.s = 92);
}({
    0: function(e, r, t) {
        "use strict";
        var s = class {
            constructor() {
                this.listeners = [];
            }
            addListener(e) {
                -1 === this.listeners.indexOf(e) && this.listeners.push(e);
            }
            dispatch() {
                for (var e = arguments.length, r = new Array(e), t = 0; t < e; t++) r[t] = arguments[t];
                this.listeners.forEach(e => {
                    e(...r);
                });
            }
            hasListener(e) {
                return -1 !== this.listeners.indexOf(e);
            }
            hasListeners() {
                return this.listeners.length > 0;
            }
            removeListener(e) {
                const r = this.listeners.indexOf(e);
                -1 !== r && this.listeners.splice(r, 1);
            }
        }, n = t(6);
        const o = Object(n.a)("mono");
        var i = class {
            constructor() {
                this.onDestroy = new s, this._lastErrorFired = !1, this._lastError = null;
            }
            get lastError() {
                return this._lastErrorFired = !0, this._lastError;
            }
            set lastError(e) {
                this._lastErrorFired = !e, this._lastError = e;
            }
            clearLastError() {
                this._lastError && !this._lastErrorFired && o.error("Unhandled mono.lastError error:", this.lastError), 
                this._lastError = null;
            }
            unimplemented() {
                throw new Error("Unimplemented");
            }
            destroy() {
                this.onDestroy.dispatch();
            }
        };
        const a = t(50);
        var c = e => class extends e {
            callFn(e, r) {
                return this.waitPromise({
                    action: "callFn",
                    fn: e,
                    args: r
                });
            }
            waitPromise(e) {
                return new Promise((r, t) => {
                    this.sendMessage(e, e => {
                        if (e) {
                            if (e.err) {
                                const r = a(e.err);
                                return t(r);
                            }
                            return r(e.result);
                        }
                        {
                            const e = this.lastError || new Error("Unexpected response");
                            return t(e);
                        }
                    });
                });
            }
        };
        var l = e => class extends e {};
        var h = e => class extends(l(e)){};
        class u extends(h(c(i))){
            initMessages() {
                this.sendMessage = this.transport.sendMessage.bind(this.transport), this.onMessage = {
                    addListener: this.transport.addListener.bind(this.transport),
                    hasListener: this.transport.hasListener.bind(this.transport),
                    hasListeners: this.transport.hasListeners.bind(this.transport),
                    removeListener: this.transport.removeListener.bind(this.transport)
                };
            }
        }
        var d = u;
        var m = class {
            constructor(e) {
                this.mono = e, this.onChanged = {
                    addListener: e => {
                        chrome.storage.onChanged.addListener(e);
                    },
                    hasListener: e => chrome.storage.onChanged.hasListener(e),
                    hasListeners: () => chrome.storage.onChanged.hasListeners(),
                    removeListener: e => {
                        chrome.storage.onChanged.removeListener(e);
                    }
                };
            }
            callback(e, r, t) {
                this.mono.lastError = chrome.runtime.lastError, (t || e) && e(r), this.mono.clearLastError();
            }
            get(e, r) {
                chrome.storage.local.get(e, e => this.callback(r, e, !0));
            }
            set(e, r) {
                chrome.storage.local.set(e, () => this.callback(r));
            }
            remove(e, r) {
                chrome.storage.local.remove(e, () => this.callback(r));
            }
            clear(e) {
                chrome.storage.local.clear(() => this.callback(e));
            }
        };
        var f = e => class extends e {
            constructor() {
                super(), this.isChrome = !0;
            }
            get isChromeMobile() {
                return /Mobile Safari\/(\d+)|Android (\d+)/.test(navigator.userAgent);
            }
            get isOperaNext() {
                return /OPR\/(\d+)/.test(navigator.userAgent);
            }
        };
        var g = e => class extends(f(e)){};
        class p extends(g(d)){
            constructor() {
                super(), this.initMessages(), this.initStorage(), this.initI18n();
            }
            initI18n() {
                this.i18n = {
                    getMessage: chrome.i18n.getMessage.bind(chrome.i18n)
                };
            }
            initMessages() {
                this.transport = {
                    sendMessage: (e, r) => {
                        r ? chrome.runtime.sendMessage(e, e => {
                            this.lastError = chrome.runtime.lastError, r(e), this.clearLastError();
                        }) : chrome.runtime.sendMessage(e);
                    },
                    addListener: e => {
                        chrome.runtime.onMessage.addListener(e);
                    },
                    hasListener: e => chrome.runtime.onMessage.hasListener(e),
                    hasListeners: () => chrome.runtime.onMessage.hasListeners(),
                    removeListener: e => {
                        chrome.runtime.onMessage.removeListener(e);
                    }
                }, super.initMessages();
            }
            initStorage() {
                this.storage = new m(this);
            }
        }
        const b = new p;
        r.a = b;
    },
    10: function(e, r, t) {
        "use strict";
        t.d(r, "b", (function() {
            return i;
        }));
        var s = t(0);
        const n = [], o = (e, r, t) => Promise.resolve().then(() => !t || t()).then(t => {
            t && (-1 === n.indexOf(e) && n.push(e), r());
        }), i = (e, r, t) => o(e, () => s.a.callFn("getPreferences").then(t => {
            r(e, {
                preferences: t
            });
        }), t);
        r.a = o;
    },
    50: function(e, r, t) {
        var s = t(55).default;
        e.exports = s;
    },
    55: function(e, r, t) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        });
        var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e;
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e;
        };
        function n(e) {
            return e && "object" === (void 0 === e ? "undefined" : s(e)) && "string" == typeof e.name && "string" == typeof e.message;
        }
        r.default = function(e) {
            return n(e) ? Object.assign(new Error, {
                stack: void 0
            }, e) : e;
        }, r.isSerializedError = n;
    },
    6: function(e, r, t) {
        "use strict";
        r.a = e => {
            let r = null;
            return r = () => {}, r.t = r.log = r.info = r.warn = r.error = r.debug = r, r;
        };
    },
    92: function(e, r, t) {
        "use strict";
        t.r(r);
        var s = t(0), n = t(10);
        Object(n.a)("tab", () => {
            s.a.sendMessage({
                action: "openPage"
            });
        });
    }
});