!function(e) {
    var t = {};
    function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
    }
    n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        });
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var o in e) n.d(r, o, function(t) {
            return e[t];
        }.bind(null, o));
        return r;
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return n.d(t, "a", t), t;
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, n.p = "", n(n.s = 14);
}([ function(e, t, n) {
    "use strict";
    var r = class {
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
        callback(e, t, n) {
            this.mono.lastError = chrome.runtime.lastError, (n || e) && e(t), this.mono.clearLastError();
        }
        get(e, t) {
            chrome.storage.local.get(e, e => this.callback(t, e, !0));
        }
        set(e, t) {
            chrome.storage.local.set(e, () => this.callback(t));
        }
        remove(e, t) {
            chrome.storage.local.remove(e, () => this.callback(t));
        }
        clear(e) {
            chrome.storage.local.clear(() => this.callback(e));
        }
    };
    var o = e => class extends e {
        initI18n() {
            this.i18n = {
                getMessage: chrome.i18n.getMessage.bind(chrome.i18n)
            };
        }
        initMessages() {
            this.transport = {
                sendMessage: (e, t) => {
                    t ? chrome.runtime.sendMessage(e, e => {
                        this.lastError = chrome.runtime.lastError, t(e), this.clearLastError();
                    }) : chrome.runtime.sendMessage(e);
                },
                sendMessageToActiveTab: (e, t) => {
                    chrome.tabs.query({
                        active: !0,
                        currentWindow: !0
                    }, n => {
                        const r = n[0];
                        r && r.id >= 0 ? t ? chrome.tabs.sendMessage(r.id, e, e => {
                            this.lastError = chrome.runtime.lastError, t(e), this.clearLastError();
                        }) : chrome.tabs.sendMessage(r.id, e) : (this.lastError = new Error("Active tab is not found"), 
                        t && t(), this.clearLastError());
                    });
                },
                addListener: e => {
                    chrome.runtime.onMessage.addListener(e);
                },
                hasListener: e => chrome.runtime.onMessage.hasListener(e),
                hasListeners: () => chrome.runtime.onMessage.hasListeners(),
                removeListener: e => {
                    chrome.runtime.onMessage.removeListener(e);
                },
                onBeforeRequest: (e, t, n) => {
                    chrome.webRequest.onBeforeRequest.addListener(e, t, n);
                },
                removeOnBeforeRequestListener: e => {
                    chrome.webRequest.onBeforeRequest.removeListener(e);
                }
            }, super.initMessages();
        }
        initStorage() {
            this.storage = new r(this);
        }
    };
    var i = class {
        constructor() {
            this.listeners = [];
        }
        addListener(e) {
            -1 === this.listeners.indexOf(e) && this.listeners.push(e);
        }
        dispatch() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            this.listeners.forEach(e => {
                e(...t);
            });
        }
        hasListener(e) {
            return -1 !== this.listeners.indexOf(e);
        }
        hasListeners() {
            return this.listeners.length > 0;
        }
        removeListener(e) {
            const t = this.listeners.indexOf(e);
            -1 !== t && this.listeners.splice(t, 1);
        }
    };
    const s = (e => {
        let t = null;
        return t = () => {}, t.t = t.log = t.info = t.warn = t.error = t.debug = t, t;
    })("mono");
    var a = class {
        constructor() {
            this.onDestroy = new i, this._lastErrorFired = !1, this._lastError = null;
        }
        get lastError() {
            return this._lastErrorFired = !0, this._lastError;
        }
        set lastError(e) {
            this._lastErrorFired = !e, this._lastError = e;
        }
        clearLastError() {
            this._lastError && !this._lastErrorFired && s.error("Unhandled mono.lastError error:", this.lastError), 
            this._lastError = null;
        }
        unimplemented() {
            throw new Error("Unimplemented");
        }
        destroy() {
            this.onDestroy.dispatch();
        }
    };
    var l = e => class extends e {
        initMessages() {
            this.sendMessage = this.transport.sendMessage.bind(this.transport), this.sendMessageToActiveTab = this.transport.sendMessageToActiveTab.bind(this.transport), 
            this.onMessage = {
                addListener: this.transport.addListener.bind(this.transport),
                hasListener: this.transport.hasListener.bind(this.transport),
                hasListeners: this.transport.hasListeners.bind(this.transport),
                removeListener: this.transport.removeListener.bind(this.transport)
            }, this.transport.onBeforeRequest && this.transport.removeOnBeforeRequestListener && (this.onBeforeRequest = this.transport.onBeforeRequest.bind(this.transport), 
            this.removeOnBeforeRequestListener = this.transport.removeOnBeforeRequestListener.bind(this.transport));
        }
    };
    const c = n(5);
    var u = e => class extends e {
        callFn(e, t) {
            return this.waitPromise({
                action: "callFn",
                fn: e,
                args: t
            });
        }
        waitPromise(e) {
            return new Promise((t, n) => {
                this.sendMessage(e, e => {
                    if (e) {
                        if (e.err) {
                            const t = c(e.err);
                            return n(t);
                        }
                        return t(e.result);
                    }
                    {
                        const e = this.lastError || new Error("Unexpected response");
                        return n(e);
                    }
                });
            });
        }
    };
    var f = e => class extends e {};
    var _ = e => class extends(f(e)){};
    class d extends(_(u(l(a)))){}
    var p = d;
    var h = e => class extends e {
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
    var m = e => class extends(h(e)){};
    class v extends(m(o(p))){
        constructor() {
            super(), this.initMessages(), this.initStorage(), this.initI18n();
        }
    }
    const b = new v;
    t.a = b;
}, function(e, t, n) {
    "use strict";
    const r = {
        on: function(e, t, n, r) {
            e.addEventListener(t, n, r);
        },
        off: function(e, t, n, r) {
            e.removeEventListener(t, n, r);
        },
        one: function(e, t, n, o) {
            const i = [ "oneFn", t, !!o ].join("_");
            let s = n[i];
            s || (n[i] = s = function(e) {
                r.off(this, t, s, o), n.apply(this, arguments);
            }), r.on(e, t, s, o), e = null;
        }
    }, o = "sf-removed-" + Math.floor(1e6 * Math.random()), i = "sf-notify-on-remove-" + Math.floor(1e6 * Math.random());
    r.onRemoveEventName = o, r.onRemoveClassName = i, r.onRemoveListener = function(e) {
        r.trigger(e, o, {
            cancelable: !0,
            bubbles: !1
        });
    }, r.onRemoveEvent = (e, t) => {
        e.classList.add(i), e.addEventListener(o, t);
    }, r.offRemoveEvent = function(e, t) {
        e.removeEventListener(r.onRemoveEventName, t);
    }, r.trigger = function(e, t, n) {
        void 0 === n && (n = {}), void 0 === n.bubbles && (n.bubbles = !1), void 0 === n.cancelable && (n.cancelable = !1);
        let r = null;
        r = "function" == typeof MouseEvent && -1 !== [ "click" ].indexOf(t) ? new MouseEvent(t, n) : new CustomEvent(t, n), 
        e.dispatchEvent(r);
    };
    var s = r;
    const a = {
        create: function(e, t) {
            let n, r;
            n = "object" != typeof e ? document.createElement(e) : e;
            for (let e in t) {
                const o = t[e];
                (r = l[e]) ? r(n, o) : n[e] = o;
            }
            return n;
        }
    }, l = {
        text: function(e, t) {
            e.textContent = t;
        },
        data: function(e, t) {
            for (let n in t) e.dataset[n] = t[n];
        },
        class: function(e, t) {
            if (Array.isArray(t)) for (let n = 0, r = t.length; n < r; n++) e.classList.add(t[n]); else e.setAttribute("class", t);
        },
        style: function(e, t) {
            if ("object" == typeof t) for (let n in t) {
                let r = n;
                "float" === r && (r = "cssFloat");
                const o = t[n];
                if (Array.isArray(o)) for (let t = 0, n = o.length; t < n; t++) e.style[r] = o[t]; else e.style[r] = o;
            } else e.setAttribute("style", t);
        },
        append: function(e, t) {
            Array.isArray(t) || (t = [ t ]);
            for (let n = 0, r = t.length; n < r; n++) {
                let r = t[n];
                (r || 0 === r) && ("object" != typeof r && (r = document.createTextNode(r)), e.appendChild(r));
            }
        },
        on: function(e, t) {
            "object" != typeof t[0] && (t = [ t ]);
            for (let n = 0, r = t.length; n < r; n++) {
                const r = t[n];
                Array.isArray(r) && s.on.apply(s, [ e ].concat(r));
            }
        },
        one: function(e, t) {
            "object" != typeof t[0] && (t = [ t ]);
            for (let n = 0, r = t.length; n < r; n++) {
                const r = t[n];
                Array.isArray(r) && s.one.apply(s, [ e ].concat(r));
            }
        },
        onCreate: function(e, t) {
            t.call(e, e);
        },
        attr: function(e, t) {
            let n, r;
            for (n in t) r = t[n], e.setAttribute(n, r);
        }
    };
    t.a = a;
}, function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        var t = [];
        return t.toString = function() {
            return this.map((function(t) {
                var n = function(e, t) {
                    var n = e[1] || "", r = e[3];
                    if (!r) return n;
                    if (t && "function" == typeof btoa) {
                        var o = (s = r, a = btoa(unescape(encodeURIComponent(JSON.stringify(s)))), l = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a), 
                        "/*# ".concat(l, " */")), i = r.sources.map((function(e) {
                            return "/*# sourceURL=".concat(r.sourceRoot || "").concat(e, " */");
                        }));
                        return [ n ].concat(i).concat([ o ]).join("\n");
                    }
                    var s, a, l;
                    return [ n ].join("\n");
                }(t, e);
                return t[2] ? "@media ".concat(t[2], " {").concat(n, "}") : n;
            })).join("");
        }, t.i = function(e, n, r) {
            "string" == typeof e && (e = [ [ null, e, "" ] ]);
            var o = {};
            if (r) for (var i = 0; i < this.length; i++) {
                var s = this[i][0];
                null != s && (o[s] = !0);
            }
            for (var a = 0; a < e.length; a++) {
                var l = [].concat(e[a]);
                r && o[l[0]] || (n && (l[2] ? l[2] = "".concat(n, " and ").concat(l[2]) : l[2] = n), 
                t.push(l));
            }
        }, t;
    };
}, function(e, t, n) {
    var r;
    !function() {
        "use strict";
        var n = {}.hasOwnProperty;
        function o() {
            for (var e = [], t = 0; t < arguments.length; t++) {
                var r = arguments[t];
                if (r) {
                    var i = typeof r;
                    if ("string" === i || "number" === i) e.push(r); else if (Array.isArray(r) && r.length) {
                        var s = o.apply(null, r);
                        s && e.push(s);
                    } else if ("object" === i) for (var a in r) n.call(r, a) && r[a] && e.push(a);
                }
            }
            return e.join(" ");
        }
        e.exports ? (o.default = o, e.exports = o) : void 0 === (r = function() {
            return o;
        }.apply(t, [])) || (e.exports = r);
    }();
}, function(e, t, n) {
    "use strict";
    var r, o = function() {
        return void 0 === r && (r = Boolean(window && document && document.all && !window.atob)), 
        r;
    }, i = function() {
        var e = {};
        return function(t) {
            if (void 0 === e[t]) {
                var n = document.querySelector(t);
                if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement) try {
                    n = n.contentDocument.head;
                } catch (e) {
                    n = null;
                }
                e[t] = n;
            }
            return e[t];
        };
    }(), s = [];
    function a(e) {
        for (var t = -1, n = 0; n < s.length; n++) if (s[n].identifier === e) {
            t = n;
            break;
        }
        return t;
    }
    function l(e, t) {
        for (var n = {}, r = [], o = 0; o < e.length; o++) {
            var i = e[o], l = t.base ? i[0] + t.base : i[0], c = n[l] || 0, u = "".concat(l, " ").concat(c);
            n[l] = c + 1;
            var f = a(u), _ = {
                css: i[1],
                media: i[2],
                sourceMap: i[3]
            };
            -1 !== f ? (s[f].references++, s[f].updater(_)) : s.push({
                identifier: u,
                updater: m(_, t),
                references: 1
            }), r.push(u);
        }
        return r;
    }
    function c(e) {
        var t = document.createElement("style"), r = e.attributes || {};
        if (void 0 === r.nonce) {
            var o = n.nc;
            o && (r.nonce = o);
        }
        if (Object.keys(r).forEach((function(e) {
            t.setAttribute(e, r[e]);
        })), "function" == typeof e.insert) e.insert(t); else {
            var s = i(e.insert || "head");
            if (!s) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
            s.appendChild(t);
        }
        return t;
    }
    var u, f = (u = [], function(e, t) {
        return u[e] = t, u.filter(Boolean).join("\n");
    });
    function _(e, t, n, r) {
        var o = n ? "" : r.media ? "@media ".concat(r.media, " {").concat(r.css, "}") : r.css;
        if (e.styleSheet) e.styleSheet.cssText = f(t, o); else {
            var i = document.createTextNode(o), s = e.childNodes;
            s[t] && e.removeChild(s[t]), s.length ? e.insertBefore(i, s[t]) : e.appendChild(i);
        }
    }
    function d(e, t, n) {
        var r = n.css, o = n.media, i = n.sourceMap;
        if (o ? e.setAttribute("media", o) : e.removeAttribute("media"), i && "undefined" != typeof btoa && (r += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i)))), " */")), 
        e.styleSheet) e.styleSheet.cssText = r; else {
            for (;e.firstChild; ) e.removeChild(e.firstChild);
            e.appendChild(document.createTextNode(r));
        }
    }
    var p = null, h = 0;
    function m(e, t) {
        var n, r, o;
        if (t.singleton) {
            var i = h++;
            n = p || (p = c(t)), r = _.bind(null, n, i, !1), o = _.bind(null, n, i, !0);
        } else n = c(t), r = d.bind(null, n, t), o = function() {
            !function(e) {
                if (null === e.parentNode) return !1;
                e.parentNode.removeChild(e);
            }(n);
        };
        return r(e), function(t) {
            if (t) {
                if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                r(e = t);
            } else o();
        };
    }
    e.exports = function(e, t) {
        (t = t || {}).singleton || "boolean" == typeof t.singleton || (t.singleton = o());
        var n = l(e = e || [], t);
        return function(e) {
            if (e = e || [], "[object Array]" === Object.prototype.toString.call(e)) {
                for (var r = 0; r < n.length; r++) {
                    var o = a(n[r]);
                    s[o].references--;
                }
                for (var i = l(e, t), c = 0; c < n.length; c++) {
                    var u = a(n[c]);
                    0 === s[u].references && (s[u].updater(), s.splice(u, 1));
                }
                n = i;
            }
        };
    };
}, function(e, t, n) {
    var r = n(6).default;
    e.exports = r;
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e;
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e;
    };
    function o(e) {
        return e && "object" === (void 0 === e ? "undefined" : r(e)) && "string" == typeof e.name && "string" == typeof e.message;
    }
    t.default = function(e) {
        return o(e) ? Object.assign(new Error, {
            stack: void 0
        }, e) : e;
    }, t.isSerializedError = o;
}, , function(e, t, n) {
    var r = n(4), o = n(12);
    "string" == typeof (o = o.__esModule ? o.default : o) && (o = [ [ e.i, o, "" ] ]);
    var i, s = 0, a = {
        injectType: "lazyStyleTag",
        insert: "head",
        singleton: !1
    }, l = {};
    l.locals = o.locals || {}, l.use = function() {
        return s++ || (i = r(o, a)), l;
    }, l.unuse = function() {
        s > 0 && !--s && (i(), i = null);
    }, e.exports = l;
}, function(e, t, n) {
    var r = n(4), o = n(13);
    "string" == typeof (o = o.__esModule ? o.default : o) && (o = [ [ e.i, o, "" ] ]);
    var i, s = 0, a = {
        injectType: "lazyStyleTag",
        insert: "head",
        singleton: !1
    }, l = {};
    l.locals = o.locals || {}, l.use = function() {
        return s++ || (i = r(o, a)), l;
    }, l.unuse = function() {
        s > 0 && !--s && (i(), i = null);
    }, e.exports = l;
}, function(e, t) {
    e.exports = function(e, t) {
        if (null == e) return {};
        var n, r, o = {}, i = Object.keys(e);
        for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
        return o;
    }, e.exports.default = e.exports, e.exports.__esModule = !0;
}, , function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n(2), o = n.n(r)()(!1);
    o.push([ e.i, ".sf-options-body{background-color:#e9eaf0;font-family:sans-serif;font-size:small}.sf-options-body.loading>*{visibility:hidden}.sf-options-body .sf-options-container{background-color:#f6f6f9;border:1px solid #cacdd9;border-radius:7px;width:700px;margin:12px auto;padding:15px}.sf-options-body .sf-options-container h1{font-family:sans-serif;font-size:1.3em;margin:0 0 1.3em 0}.sf-options-body .sf-options-container div{display:block}.sf-options-body .sf-options-container form{margin:0;padding:0}.sf-options-body .sf-options-container label{display:block;margin:.2em 0;padding:0}.sf-options-body .sf-options-container .sf-inline label{display:inline}.sf-options-body .sf-options-container .sf-clear{clear:both;height:0;font-size:0;line-height:0}.sf-options-body .sf-options-container .sf-block{border-top:1px solid #dfe1e8;padding:1.5em 0 0 0;margin:1.5em 0 0 0;min-width:160px}.sf-options-body .sf-options-container .sf-browser{display:none}.sf-options-body .sf-options-container .sf-title{font-weight:700;margin-bottom:.5em}.sf-options-body .sf-options-container .sf-module{font-weight:700;margin-top:1em}.sf-options-body .sf-options-container .sf-module:first-child{margin-top:0}.sf-options-body .sf-options-container .sf-module_options{font-weight:400;margin-left:2em}.sf-options-popup{z-index:9999;display:block;float:none;position:fixed;margin:0;padding:0;visibility:hidden;color:#000;background:#fff;border:3px solid #c0cad5;border-radius:7px;overflow:auto}.sf-options-popup .sf-options-body{display:block;float:none;position:relative;overflow:auto;margin:0;padding:10px 15px;background:#fff}.sf-options-popup .sf-options-body .sf-options-container{background-color:#fff;border:none;font:13px/1 Arial,Helvetica,sans-serif;width:580px;margin:0;padding:9px;text-align:left}.sf-options-popup img.sf-close{position:absolute;top:10px;right:15px;opacity:.5;cursor:pointer}.sf-options-popup img.sf-close:hover{opacity:.9}", "" ]), 
    t.default = o;
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n(2), o = n.n(r)()(!1);
    o.push([ e.i, '.sf-block div.sf-table{display:table!important;width:100%}.sf-block div.sf-table-row,.sf-block div.sf-table-row-head,.sf-block form.sf-table-row{display:table-row!important}.sf-block .sf-table-row:hover{display:table-row!important;background:#ebffe8}.sf-block div.sf-table-row-head{background:#00bf80;color:#fff}.sf-block div.sf-table-row-head .sf-table-cell{border:1px solid #01ab73}.sf-block div.sf-table-cell{display:table-cell!important;border:1px solid #e8e9eb;padding:10px;width:25%;word-break:break-all;vertical-align:middle}.sf-block div.sf-table-body{display:table-row-group!important}.sf-block .sf-group-buttons{margin-top:15px;margin-bottom:65px}.sf-block .sf-btn{float:left;padding:5px;cursor:pointer;font-weight:700;font-size:12px;background:#e9eaf0;border:1px solid #c1c1c7;border-radius:4px;margin-right:5px}.sf-block .sf-badge{padding:3px;float:left;margin-right:7px;background:#536760;border-radius:4px;color:#fff;margin-bottom:4px}.sf-block .sf-input{padding:4px;border:1px solid #d0c6c6;border-radius:4px;width:90%}.sf-block .sf-disabled{opacity:.4;pointer-events:none}.sf-block .text-muted{opacity:.6}.sf-block .div-hover{position:absolute;bottom:45px;background:#484444;padding:5px;border-radius:6px;min-width:32px;text-align:center;font-size:12px;word-break:break-word}.sf-block .div-hover::after{content:" ";position:absolute;top:100%;left:50%;margin-left:-10px;border-width:6px;border-style:solid;border-color:#2d2b2b transparent transparent transparent}.sf-block .hide{display:none!important}.sf-block .show{display:block!important}', "" ]), 
    t.default = o;
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var r, o, i, s, a, l = n(8), c = n.n(l), u = n(0), f = n(1), _ = {}, d = [], p = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
    function h(e, t) {
        for (var n in t) e[n] = t[n];
        return e;
    }
    function m(e) {
        var t = e.parentNode;
        t && t.removeChild(e);
    }
    function v(e, t, n) {
        var r, o, i, s = arguments, a = {};
        for (i in t) "key" == i ? r = t[i] : "ref" == i ? o = t[i] : a[i] = t[i];
        if (arguments.length > 3) for (n = [ n ], i = 3; i < arguments.length; i++) n.push(s[i]);
        if (null != n && (a.children = n), "function" == typeof e && null != e.defaultProps) for (i in e.defaultProps) void 0 === a[i] && (a[i] = e.defaultProps[i]);
        return b(e, a, r, o, null);
    }
    function b(e, t, n, o, i) {
        var s = {
            type: e,
            props: t,
            key: n,
            ref: o,
            __k: null,
            __: null,
            __b: 0,
            __e: null,
            __d: void 0,
            __c: null,
            __h: null,
            constructor: void 0,
            __v: null == i ? ++r.__v : i
        };
        return null != r.vnode && r.vnode(s), s;
    }
    function y(e) {
        return e.children;
    }
    function g(e, t) {
        this.props = e, this.context = t;
    }
    function k(e, t) {
        if (null == t) return e.__ ? k(e.__, e.__.__k.indexOf(e) + 1) : null;
        for (var n; t < e.__k.length; t++) if (null != (n = e.__k[t]) && null != n.__e) return n.__e;
        return "function" == typeof e.type ? k(e) : null;
    }
    function E(e) {
        var t, n;
        if (null != (e = e.__) && null != e.__c) {
            for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++) if (null != (n = e.__k[t]) && null != n.__e) {
                e.__e = e.__c.base = n.__e;
                break;
            }
            return E(e);
        }
    }
    function x(e) {
        (!e.__d && (e.__d = !0) && o.push(e) && !w.__r++ || s !== r.debounceRendering) && ((s = r.debounceRendering) || i)(w);
    }
    function w() {
        for (var e; w.__r = o.length; ) e = o.sort((function(e, t) {
            return e.__v.__b - t.__v.__b;
        })), o = [], e.some((function(e) {
            var t, n, r, o, i, s;
            e.__d && (i = (o = (t = e).__v).__e, (s = t.__P) && (n = [], (r = h({}, o)).__v = o.__v + 1, 
            j(s, o, r, t.__n, void 0 !== s.ownerSVGElement, null != o.__h ? [ i ] : null, n, null == i ? k(o) : i, o.__h), 
            D(n, o), o.__e != i && E(o)));
        }));
    }
    function C(e, t, n, r, o, i, s, a, l, c) {
        var u, f, p, h, m, v, g, E = r && r.__k || d, x = E.length;
        for (n.__k = [], u = 0; u < t.length; u++) if (null != (h = n.__k[u] = null == (h = t[u]) || "boolean" == typeof h ? null : "string" == typeof h || "number" == typeof h ? b(null, h, null, null, h) : Array.isArray(h) ? b(y, {
            children: h
        }, null, null, null) : h.__b > 0 ? b(h.type, h.props, h.key, null, h.__v) : h)) {
            if (h.__ = n, h.__b = n.__b + 1, null === (p = E[u]) || p && h.key == p.key && h.type === p.type) E[u] = void 0; else for (f = 0; f < x; f++) {
                if ((p = E[f]) && h.key == p.key && h.type === p.type) {
                    E[f] = void 0;
                    break;
                }
                p = null;
            }
            j(e, h, p = p || _, o, i, s, a, l, c), m = h.__e, (f = h.ref) && p.ref != f && (g || (g = []), 
            p.ref && g.push(p.ref, null, h), g.push(f, h.__c || m, h)), null != m ? (null == v && (v = m), 
            "function" == typeof h.type && null != h.__k && h.__k === p.__k ? h.__d = l = S(h, l, e) : l = M(e, h, p, E, m, l), 
            c || "option" !== n.type ? "function" == typeof n.type && (n.__d = l) : e.value = "") : l && p.__e == l && l.parentNode != e && (l = k(p));
        }
        for (n.__e = v, u = x; u--; ) null != E[u] && ("function" == typeof n.type && null != E[u].__e && E[u].__e == n.__d && (n.__d = k(r, u + 1)), 
        U(E[u], E[u]));
        if (g) for (u = 0; u < g.length; u++) T(g[u], g[++u], g[++u]);
    }
    function S(e, t, n) {
        var r, o;
        for (r = 0; r < e.__k.length; r++) (o = e.__k[r]) && (o.__ = e, t = "function" == typeof o.type ? S(o, t, n) : M(n, o, o, e.__k, o.__e, t));
        return t;
    }
    function O(e, t) {
        return t = t || [], null == e || "boolean" == typeof e || (Array.isArray(e) ? e.some((function(e) {
            O(e, t);
        })) : t.push(e)), t;
    }
    function M(e, t, n, r, o, i) {
        var s, a, l;
        if (void 0 !== t.__d) s = t.__d, t.__d = void 0; else if (null == n || o != i || null == o.parentNode) e: if (null == i || i.parentNode !== e) e.appendChild(o), 
        s = null; else {
            for (a = i, l = 0; (a = a.nextSibling) && l < r.length; l += 2) if (a == o) break e;
            e.insertBefore(o, i), s = i;
        }
        return void 0 !== s ? s : o.nextSibling;
    }
    function L(e, t, n) {
        "-" === t[0] ? e.setProperty(t, n) : e[t] = null == n ? "" : "number" != typeof n || p.test(t) ? n : n + "px";
    }
    function N(e, t, n, r, o) {
        var i;
        e: if ("style" === t) if ("string" == typeof n) e.style.cssText = n; else {
            if ("string" == typeof r && (e.style.cssText = r = ""), r) for (t in r) n && t in n || L(e.style, t, "");
            if (n) for (t in n) r && n[t] === r[t] || L(e.style, t, n[t]);
        } else if ("o" === t[0] && "n" === t[1]) i = t !== (t = t.replace(/Capture$/, "")), 
        t = t.toLowerCase() in e ? t.toLowerCase().slice(2) : t.slice(2), e.l || (e.l = {}), 
        e.l[t + i] = n, n ? r || e.addEventListener(t, i ? A : P, i) : e.removeEventListener(t, i ? A : P, i); else if ("dangerouslySetInnerHTML" !== t) {
            if (o) t = t.replace(/xlink[H:h]/, "h").replace(/sName$/, "s"); else if ("href" !== t && "list" !== t && "form" !== t && "download" !== t && t in e) try {
                e[t] = null == n ? "" : n;
                break e;
            } catch (e) {}
            "function" == typeof n || (null != n && (!1 !== n || "a" === t[0] && "r" === t[1]) ? e.setAttribute(t, n) : e.removeAttribute(t));
        }
    }
    function P(e) {
        this.l[e.type + !1](r.event ? r.event(e) : e);
    }
    function A(e) {
        this.l[e.type + !0](r.event ? r.event(e) : e);
    }
    function j(e, t, n, o, i, s, a, l, c) {
        var u, f, _, d, p, m, v, b, k, E, x, w = t.type;
        if (void 0 !== t.constructor) return null;
        null != n.__h && (c = n.__h, l = t.__e = n.__e, t.__h = null, s = [ l ]), (u = r.__b) && u(t);
        try {
            e: if ("function" == typeof w) {
                if (b = t.props, k = (u = w.contextType) && o[u.__c], E = u ? k ? k.props.value : u.__ : o, 
                n.__c ? v = (f = t.__c = n.__c).__ = f.__E : ("prototype" in w && w.prototype.render ? t.__c = f = new w(b, E) : (t.__c = f = new g(b, E), 
                f.constructor = w, f.render = H), k && k.sub(f), f.props = b, f.state || (f.state = {}), 
                f.context = E, f.__n = o, _ = f.__d = !0, f.__h = []), null == f.__s && (f.__s = f.state), 
                null != w.getDerivedStateFromProps && (f.__s == f.state && (f.__s = h({}, f.__s)), 
                h(f.__s, w.getDerivedStateFromProps(b, f.__s))), d = f.props, p = f.state, _) null == w.getDerivedStateFromProps && null != f.componentWillMount && f.componentWillMount(), 
                null != f.componentDidMount && f.__h.push(f.componentDidMount); else {
                    if (null == w.getDerivedStateFromProps && b !== d && null != f.componentWillReceiveProps && f.componentWillReceiveProps(b, E), 
                    !f.__e && null != f.shouldComponentUpdate && !1 === f.shouldComponentUpdate(b, f.__s, E) || t.__v === n.__v) {
                        f.props = b, f.state = f.__s, t.__v !== n.__v && (f.__d = !1), f.__v = t, t.__e = n.__e, 
                        t.__k = n.__k, f.__h.length && a.push(f);
                        break e;
                    }
                    null != f.componentWillUpdate && f.componentWillUpdate(b, f.__s, E), null != f.componentDidUpdate && f.__h.push((function() {
                        f.componentDidUpdate(d, p, m);
                    }));
                }
                f.context = E, f.props = b, f.state = f.__s, (u = r.__r) && u(t), f.__d = !1, f.__v = t, 
                f.__P = e, u = f.render(f.props, f.state, f.context), f.state = f.__s, null != f.getChildContext && (o = h(h({}, o), f.getChildContext())), 
                _ || null == f.getSnapshotBeforeUpdate || (m = f.getSnapshotBeforeUpdate(d, p)), 
                x = null != u && u.type === y && null == u.key ? u.props.children : u, C(e, Array.isArray(x) ? x : [ x ], t, n, o, i, s, a, l, c), 
                f.base = t.__e, t.__h = null, f.__h.length && a.push(f), v && (f.__E = f.__ = null), 
                f.__e = !1;
            } else null == s && t.__v === n.__v ? (t.__k = n.__k, t.__e = n.__e) : t.__e = R(n.__e, t, n, o, i, s, a, c);
            (u = r.diffed) && u(t);
        } catch (e) {
            t.__v = null, (c || null != s) && (t.__e = l, t.__h = !!c, s[s.indexOf(l)] = null), 
            r.__e(e, t, n);
        }
    }
    function D(e, t) {
        r.__c && r.__c(t, e), e.some((function(t) {
            try {
                e = t.__h, t.__h = [], e.some((function(e) {
                    e.call(t);
                }));
            } catch (e) {
                r.__e(e, t.__v);
            }
        }));
    }
    function R(e, t, n, r, o, i, s, a) {
        var l, c, u, f, p = n.props, h = t.props, v = t.type, b = 0;
        if ("svg" === v && (o = !0), null != i) for (;b < i.length; b++) if ((l = i[b]) && (l === e || (v ? l.localName == v : 3 == l.nodeType))) {
            e = l, i[b] = null;
            break;
        }
        if (null == e) {
            if (null === v) return document.createTextNode(h);
            e = o ? document.createElementNS("http://www.w3.org/2000/svg", v) : document.createElement(v, h.is && h), 
            i = null, a = !1;
        }
        if (null === v) p === h || a && e.data === h || (e.data = h); else {
            if (i = i && d.slice.call(e.childNodes), c = (p = n.props || _).dangerouslySetInnerHTML, 
            u = h.dangerouslySetInnerHTML, !a) {
                if (null != i) for (p = {}, f = 0; f < e.attributes.length; f++) p[e.attributes[f].name] = e.attributes[f].value;
                (u || c) && (u && (c && u.__html == c.__html || u.__html === e.innerHTML) || (e.innerHTML = u && u.__html || ""));
            }
            if (function(e, t, n, r, o) {
                var i;
                for (i in n) "children" === i || "key" === i || i in t || N(e, i, null, n[i], r);
                for (i in t) o && "function" != typeof t[i] || "children" === i || "key" === i || "value" === i || "checked" === i || n[i] === t[i] || N(e, i, t[i], n[i], r);
            }(e, h, p, o, a), u) t.__k = []; else if (b = t.props.children, C(e, Array.isArray(b) ? b : [ b ], t, n, r, o && "foreignObject" !== v, i, s, e.firstChild, a), 
            null != i) for (b = i.length; b--; ) null != i[b] && m(i[b]);
            a || ("value" in h && void 0 !== (b = h.value) && (b !== e.value || "progress" === v && !b) && N(e, "value", b, p.value, !1), 
            "checked" in h && void 0 !== (b = h.checked) && b !== e.checked && N(e, "checked", b, p.checked, !1));
        }
        return e;
    }
    function T(e, t, n) {
        try {
            "function" == typeof e ? e(t) : e.current = t;
        } catch (e) {
            r.__e(e, n);
        }
    }
    function U(e, t, n) {
        var o, i, s;
        if (r.unmount && r.unmount(e), (o = e.ref) && (o.current && o.current !== e.__e || T(o, null, t)), 
        n || "function" == typeof e.type || (n = null != (i = e.__e)), e.__e = e.__d = void 0, 
        null != (o = e.__c)) {
            if (o.componentWillUnmount) try {
                o.componentWillUnmount();
            } catch (e) {
                r.__e(e, t);
            }
            o.base = o.__P = null;
        }
        if (o = e.__k) for (s = 0; s < o.length; s++) o[s] && U(o[s], t, n);
        null != i && m(i);
    }
    function H(e, t, n) {
        return this.constructor(e, n);
    }
    function F(e, t, n) {
        var o, i, s;
        r.__ && r.__(e, t), i = (o = "function" == typeof n) ? null : n && n.__k || t.__k, 
        s = [], j(t, e = (!o && n || t).__k = v(y, null, [ e ]), i || _, _, void 0 !== t.ownerSVGElement, !o && n ? [ n ] : i ? null : t.firstChild ? d.slice.call(t.childNodes) : null, s, !o && n ? n : i ? i.__e : t.firstChild, o), 
        D(s, e);
    }
    function B(e, t) {
        F(e, t, B);
    }
    function q(e, t, n) {
        var r, o, i, s = arguments, a = h({}, e.props);
        for (i in t) "key" == i ? r = t[i] : "ref" == i ? o = t[i] : a[i] = t[i];
        if (arguments.length > 3) for (n = [ n ], i = 3; i < arguments.length; i++) n.push(s[i]);
        return null != n && (a.children = n), b(e.type, a, r || e.key, o || e.ref, null);
    }
    r = {
        __e: function(e, t) {
            for (var n, r, o; t = t.__; ) if ((n = t.__c) && !n.__) try {
                if ((r = n.constructor) && null != r.getDerivedStateFromError && (n.setState(r.getDerivedStateFromError(e)), 
                o = n.__d), null != n.componentDidCatch && (n.componentDidCatch(e), o = n.__d), 
                o) return n.__E = n;
            } catch (t) {
                e = t;
            }
            throw e;
        },
        __v: 0
    }, g.prototype.setState = function(e, t) {
        var n;
        n = null != this.__s && this.__s !== this.state ? this.__s : this.__s = h({}, this.state), 
        "function" == typeof e && (e = e(h({}, n), this.props)), e && h(n, e), null != e && this.__v && (t && this.__h.push(t), 
        x(this));
    }, g.prototype.forceUpdate = function(e) {
        this.__v && (this.__e = !0, e && this.__h.push(e), x(this));
    }, g.prototype.render = y, o = [], i = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, 
    w.__r = 0, a = 0;
    var I, W, z, $ = 0, V = [], G = r.__b, J = r.__r, Y = r.diffed, Z = r.__c, X = r.unmount;
    function K(e, t) {
        r.__h && r.__h(W, e, $ || t), $ = 0;
        var n = W.__H || (W.__H = {
            __: [],
            __h: []
        });
        return e >= n.__.length && n.__.push({}), n.__[e];
    }
    function Q(e) {
        return $ = 1, ee(le, e);
    }
    function ee(e, t, n) {
        var r = K(I++, 2);
        return r.t = e, r.__c || (r.__ = [ n ? n(t) : le(void 0, t), function(e) {
            var t = r.t(r.__[0], e);
            r.__[0] !== t && (r.__ = [ t, r.__[1] ], r.__c.setState({}));
        } ], r.__c = W), r.__;
    }
    function te(e, t) {
        var n = K(I++, 4);
        !r.__s && ae(n.__H, t) && (n.__ = e, n.__H = t, W.__h.push(n));
    }
    function ne(e, t) {
        var n = K(I++, 7);
        return ae(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
    }
    function re() {
        V.forEach((function(e) {
            if (e.__P) try {
                e.__H.__h.forEach(ie), e.__H.__h.forEach(se), e.__H.__h = [];
            } catch (t) {
                e.__H.__h = [], r.__e(t, e.__v);
            }
        })), V = [];
    }
    r.__b = function(e) {
        W = null, G && G(e);
    }, r.__r = function(e) {
        J && J(e), I = 0;
        var t = (W = e.__c).__H;
        t && (t.__h.forEach(ie), t.__h.forEach(se), t.__h = []);
    }, r.diffed = function(e) {
        Y && Y(e);
        var t = e.__c;
        t && t.__H && t.__H.__h.length && (1 !== V.push(t) && z === r.requestAnimationFrame || ((z = r.requestAnimationFrame) || function(e) {
            var t, n = function() {
                clearTimeout(r), oe && cancelAnimationFrame(t), setTimeout(e);
            }, r = setTimeout(n, 100);
            oe && (t = requestAnimationFrame(n));
        })(re)), W = void 0;
    }, r.__c = function(e, t) {
        t.some((function(e) {
            try {
                e.__h.forEach(ie), e.__h = e.__h.filter((function(e) {
                    return !e.__ || se(e);
                }));
            } catch (n) {
                t.some((function(e) {
                    e.__h && (e.__h = []);
                })), t = [], r.__e(n, e.__v);
            }
        })), Z && Z(e, t);
    }, r.unmount = function(e) {
        X && X(e);
        var t = e.__c;
        if (t && t.__H) try {
            t.__H.__.forEach(ie);
        } catch (e) {
            r.__e(e, t.__v);
        }
    };
    var oe = "function" == typeof requestAnimationFrame;
    function ie(e) {
        var t = W;
        "function" == typeof e.__c && e.__c(), W = t;
    }
    function se(e) {
        var t = W;
        e.__c = e.__(), W = t;
    }
    function ae(e, t) {
        return !e || e.length !== t.length || t.some((function(t, n) {
            return t !== e[n];
        }));
    }
    function le(e, t) {
        return "function" == typeof t ? t(e) : t;
    }
    function ce(e, t) {
        for (var n in t) e[n] = t[n];
        return e;
    }
    function ue(e, t) {
        for (var n in e) if ("__source" !== n && !(n in t)) return !0;
        for (var r in t) if ("__source" !== r && e[r] !== t[r]) return !0;
        return !1;
    }
    function fe(e) {
        this.props = e;
    }
    (fe.prototype = new g).isPureReactComponent = !0, fe.prototype.shouldComponentUpdate = function(e, t) {
        return ue(this.props, e) || ue(this.state, t);
    };
    var _e = r.__b;
    r.__b = function(e) {
        e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), _e && _e(e);
    };
    var de = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
    var pe = function(e, t) {
        return null == e ? null : O(O(e).map(t));
    }, he = {
        map: pe,
        forEach: pe,
        count: function(e) {
            return e ? O(e).length : 0;
        },
        only: function(e) {
            var t = O(e);
            if (1 !== t.length) throw "Children.only";
            return t[0];
        },
        toArray: O
    }, me = r.__e;
    function ve() {
        this.__u = 0, this.t = null, this.__b = null;
    }
    function be(e) {
        var t = e.__.__c;
        return t && t.__e && t.__e(e);
    }
    function ye() {
        this.u = null, this.o = null;
    }
    r.__e = function(e, t, n) {
        if (e.then) for (var r, o = t; o = o.__; ) if ((r = o.__c) && r.__c) return null == t.__e && (t.__e = n.__e, 
        t.__k = n.__k), r.__c(e, t);
        me(e, t, n);
    }, (ve.prototype = new g).__c = function(e, t) {
        var n = t.__c, r = this;
        null == r.t && (r.t = []), r.t.push(n);
        var o = be(r.__v), i = !1, s = function() {
            i || (i = !0, n.componentWillUnmount = n.__c, o ? o(a) : a());
        };
        n.__c = n.componentWillUnmount, n.componentWillUnmount = function() {
            s(), n.__c && n.__c();
        };
        var a = function() {
            if (!--r.__u) {
                if (r.state.__e) {
                    var e = r.state.__e;
                    r.__v.__k[0] = function e(t, n, r) {
                        return t && (t.__v = null, t.__k = t.__k && t.__k.map((function(t) {
                            return e(t, n, r);
                        })), t.__c && t.__c.__P === n && (t.__e && r.insertBefore(t.__e, t.__d), t.__c.__e = !0, 
                        t.__c.__P = r)), t;
                    }(e, e.__c.__P, e.__c.__O);
                }
                var t;
                for (r.setState({
                    __e: r.__b = null
                }); t = r.t.pop(); ) t.forceUpdate();
            }
        }, l = !0 === t.__h;
        r.__u++ || l || r.setState({
            __e: r.__b = r.__v.__k[0]
        }), e.then(s, s);
    }, ve.prototype.componentWillUnmount = function() {
        this.t = [];
    }, ve.prototype.render = function(e, t) {
        if (this.__b) {
            if (this.__v.__k) {
                var n = document.createElement("div"), r = this.__v.__k[0].__c;
                this.__v.__k[0] = function e(t, n, r) {
                    return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach((function(e) {
                        "function" == typeof e.__c && e.__c();
                    })), t.__c.__H = null), null != (t = ce({}, t)).__c && (t.__c.__P === r && (t.__c.__P = n), 
                    t.__c = null), t.__k = t.__k && t.__k.map((function(t) {
                        return e(t, n, r);
                    }))), t;
                }(this.__b, n, r.__O = r.__P);
            }
            this.__b = null;
        }
        var o = t.__e && v(y, null, e.fallback);
        return o && (o.__h = null), [ v(y, null, t.__e ? null : e.children), o ];
    };
    var ge = function(e, t, n) {
        if (++n[1] === n[0] && e.o.delete(t), e.props.revealOrder && ("t" !== e.props.revealOrder[0] || !e.o.size)) for (n = e.u; n; ) {
            for (;n.length > 3; ) n.pop()();
            if (n[1] < n[0]) break;
            e.u = n = n[2];
        }
    };
    function ke(e) {
        return this.getChildContext = function() {
            return e.context;
        }, e.children;
    }
    function Ee(e) {
        var t = this, n = e.i;
        t.componentWillUnmount = function() {
            F(null, t.l), t.l = null, t.i = null;
        }, t.i && t.i !== n && t.componentWillUnmount(), e.__v ? (t.l || (t.i = n, t.l = {
            nodeType: 1,
            parentNode: n,
            childNodes: [],
            appendChild: function(e) {
                this.childNodes.push(e), t.i.appendChild(e);
            },
            insertBefore: function(e, n) {
                this.childNodes.push(e), t.i.appendChild(e);
            },
            removeChild: function(e) {
                this.childNodes.splice(this.childNodes.indexOf(e) >>> 1, 1), t.i.removeChild(e);
            }
        }), F(v(ke, {
            context: t.context
        }, e.__v), t.l)) : t.l && t.componentWillUnmount();
    }
    function xe(e, t) {
        return v(Ee, {
            __v: e,
            i: t
        });
    }
    (ye.prototype = new g).__e = function(e) {
        var t = this, n = be(t.__v), r = t.o.get(e);
        return r[0]++, function(o) {
            var i = function() {
                t.props.revealOrder ? (r.push(o), ge(t, e, r)) : o();
            };
            n ? n(i) : i();
        };
    }, ye.prototype.render = function(e) {
        this.u = null, this.o = new Map;
        var t = O(e.children);
        e.revealOrder && "b" === e.revealOrder[0] && t.reverse();
        for (var n = t.length; n--; ) this.o.set(t[n], this.u = [ 1, 0, this.u ]);
        return e.children;
    }, ye.prototype.componentDidUpdate = ye.prototype.componentDidMount = function() {
        var e = this;
        this.o.forEach((function(t, n) {
            ge(e, n, t);
        }));
    };
    var we = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, Ce = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Se = function(e) {
        return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i).test(e);
    };
    g.prototype.isReactComponent = {}, [ "componentWillMount", "componentWillReceiveProps", "componentWillUpdate" ].forEach((function(e) {
        Object.defineProperty(g.prototype, e, {
            configurable: !0,
            get: function() {
                return this["UNSAFE_" + e];
            },
            set: function(t) {
                Object.defineProperty(this, e, {
                    configurable: !0,
                    writable: !0,
                    value: t
                });
            }
        });
    }));
    var Oe = r.event;
    function Me() {}
    function Le() {
        return this.cancelBubble;
    }
    function Ne() {
        return this.defaultPrevented;
    }
    r.event = function(e) {
        return Oe && (e = Oe(e)), e.persist = Me, e.isPropagationStopped = Le, e.isDefaultPrevented = Ne, 
        e.nativeEvent = e;
    };
    var Pe, Ae = {
        configurable: !0,
        get: function() {
            return this.class;
        }
    }, je = r.vnode;
    r.vnode = function(e) {
        var t = e.type, n = e.props, r = n;
        if ("string" == typeof t) {
            for (var o in r = {}, n) {
                var i = n[o];
                "value" === o && "defaultValue" in n && null == i || ("defaultValue" === o && "value" in n && null == n.value ? o = "value" : "download" === o && !0 === i ? i = "" : /ondoubleclick/i.test(o) ? o = "ondblclick" : /^onchange(textarea|input)/i.test(o + t) && !Se(n.type) ? o = "oninput" : /^on(Ani|Tra|Tou|BeforeInp)/.test(o) ? o = o.toLowerCase() : Ce.test(o) ? o = o.replace(/[A-Z0-9]/, "-$&").toLowerCase() : null === i && (i = void 0), 
                r[o] = i);
            }
            "select" == t && r.multiple && Array.isArray(r.value) && (r.value = O(n.children).forEach((function(e) {
                e.props.selected = -1 != r.value.indexOf(e.props.value);
            }))), "select" == t && null != r.defaultValue && (r.value = O(n.children).forEach((function(e) {
                e.props.selected = r.multiple ? -1 != r.defaultValue.indexOf(e.props.value) : r.defaultValue == e.props.value;
            }))), e.props = r;
        }
        t && n.class != n.className && (Ae.enumerable = "className" in n, null != n.className && (r.class = n.className), 
        Object.defineProperty(r, "className", Ae)), e.$$typeof = we, je && je(e);
    };
    var De = r.__r;
    r.__r = function(e) {
        De && De(e), Pe = e.__c;
    };
    var Re = {
        ReactCurrentDispatcher: {
            current: {
                readContext: function(e) {
                    return Pe.__n[e.__c].props.value;
                }
            }
        }
    };
    "object" == typeof performance && "function" == typeof performance.now && performance.now.bind(performance);
    function Te(e) {
        return !!e && e.$$typeof === we;
    }
    function Ue(e) {
        return Te(e) ? q.apply(null, arguments) : e;
    }
    function He(e) {
        return !!e.__k && (F(null, e), !0);
    }
    var Fe = {
        useState: Q,
        useReducer: ee,
        useEffect: function(e, t) {
            var n = K(I++, 3);
            !r.__s && ae(n.__H, t) && (n.__ = e, n.__H = t, W.__H.__h.push(n));
        },
        useLayoutEffect: te,
        useRef: function(e) {
            return $ = 5, ne((function() {
                return {
                    current: e
                };
            }), []);
        },
        useImperativeHandle: function(e, t, n) {
            $ = 6, te((function() {
                "function" == typeof e ? e(t()) : e && (e.current = t());
            }), null == n ? n : n.concat(e));
        },
        useMemo: ne,
        useCallback: function(e, t) {
            return $ = 8, ne((function() {
                return e;
            }), t);
        },
        useContext: function(e) {
            var t = W.context[e.__c], n = K(I++, 9);
            return n.__c = e, t ? (null == n.__ && (n.__ = !0, t.sub(W)), t.props.value) : e.__;
        },
        useDebugValue: function(e, t) {
            r.useDebugValue && r.useDebugValue(t ? t(e) : e);
        },
        version: "16.8.0",
        Children: he,
        render: function(e, t, n) {
            return null == t.__k && (t.textContent = ""), F(e, t), "function" == typeof n && n(), 
            e ? e.__c : null;
        },
        hydrate: function(e, t, n) {
            return B(e, t), "function" == typeof n && n(), e ? e.__c : null;
        },
        unmountComponentAtNode: He,
        createPortal: xe,
        createElement: v,
        createContext: function(e, t) {
            var n = {
                __c: t = "__cC" + a++,
                __: e,
                Consumer: function(e, t) {
                    return e.children(t);
                },
                Provider: function(e) {
                    var n, r;
                    return this.getChildContext || (n = [], (r = {})[t] = this, this.getChildContext = function() {
                        return r;
                    }, this.shouldComponentUpdate = function(e) {
                        this.props.value !== e.value && n.some(x);
                    }, this.sub = function(e) {
                        n.push(e);
                        var t = e.componentWillUnmount;
                        e.componentWillUnmount = function() {
                            n.splice(n.indexOf(e), 1), t && t.call(e);
                        };
                    }), e.children;
                }
            };
            return n.Provider.__ = n.Consumer.contextType = n;
        },
        createFactory: function(e) {
            return v.bind(null, e);
        },
        cloneElement: Ue,
        createRef: function() {
            return {
                current: null
            };
        },
        Fragment: y,
        isValidElement: Te,
        findDOMNode: function(e) {
            return e && (e.base || 1 === e.nodeType && e) || null;
        },
        Component: g,
        PureComponent: fe,
        memo: function(e, t) {
            function n(e) {
                var n = this.props.ref, r = n == e.ref;
                return !r && n && (n.call ? n(null) : n.current = null), t ? !t(this.props, e) || !r : ue(this.props, e);
            }
            function r(t) {
                return this.shouldComponentUpdate = n, v(e, t);
            }
            return r.displayName = "Memo(" + (e.displayName || e.name) + ")", r.prototype.isReactComponent = !0, 
            r.__f = !0, r;
        },
        forwardRef: function(e) {
            function t(t, n) {
                var r = ce({}, t);
                return delete r.ref, e(r, (n = t.ref || n) && ("object" != typeof n || "current" in n) ? n : null);
            }
            return t.$$typeof = de, t.render = t, t.prototype.isReactComponent = t.__f = !0, 
            t.displayName = "ForwardRef(" + (e.displayName || e.name) + ")", t;
        },
        unstable_batchedUpdates: function(e, t) {
            return e(t);
        },
        StrictMode: y,
        Suspense: ve,
        SuspenseList: ye,
        lazy: function(e) {
            var t, n, r;
            function o(o) {
                if (t || (t = e()).then((function(e) {
                    n = e.default || e;
                }), (function(e) {
                    r = e;
                })), r) throw r;
                if (!n) throw t;
                return v(n, o);
            }
            return o.displayName = "Lazy", o.__f = !0, o;
        },
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Re
    };
    var Be = (e, t) => {
        let n = document.createElement("div");
        if ("string" == typeof t) if (document.getElementById(t)) t = document.getElementById(t); else {
            const e = document.createElement("div");
            e.setAttribute("id", t), (t = e).style.position = "fixed", t.style.bottom = "20px", 
            t.style.right = "30px", t.style.display = "flex", t.style.flexDirection = "column-reverse", 
            t.style.overflowX = "hidden", t.style.overflowY = "scroll", t.style.zIndex = "100000", 
            t.style.maxHeight = "95%", document.body.appendChild(t);
        }
        function r() {
            n && (He(n), n = null);
        }
        return F(xe(Ue(e, {
            unmountLayer: r
        }), t), n), r;
    }, qe = n(9), Ie = n.n(qe), We = n(3), ze = n.n(We), $e = n(10);
    function Ve() {
        return (Ve = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
        }).apply(this, arguments);
    }
    const Ge = {
        position: "relative"
    };
    var Je = Fe.memo(e => {
        let {hoverText: t, children: n} = e, r = function(e, t) {
            if (null == e) return {};
            var n, r, o = $e(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
            }
            return o;
        }(e, [ "hoverText", "children" ]);
        const o = Fe.useRef(), [i, s] = Fe.useState(!1), a = Fe.useCallback(() => s(!0), []), l = Fe.useCallback(() => s(!1), []);
        return Fe.createElement("div", Ve({
            onmouseenter: a,
            onmouseout: l,
            style: Ge
        }, r), Fe.createElement("div", {
            ref: o,
            className: ze()("div-hover", i ? "show" : "hide")
        }, t), n);
    });
    function Ye(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e;
    }
    const Ze = {
        isEnabled: !1,
        groups: [ {
            dir: "pictures",
            formats: [ "jpg", "jpeg", "png", "gif", "svg", "bmp", "ico", "webp" ]
        }, {
            dir: "music",
            formats: [ "mp3", "aac", "wav", "ogg", "flac", "wma", "m4a", "m4p" ]
        }, {
            dir: "videos",
            formats: [ "mkv", "avi", "3gp", "3g2", "mov", "flv", "mp4", "m4v", "mpg", "mpeg", "webm", "ogv" ]
        } ]
    };
    function Xe(e, t, n) {
        u.a.sendMessage({
            action: "track",
            t: "event",
            ec: e,
            ea: t,
            el: n,
            tid: "UA-181742122-1"
        });
    }
    function Ke(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t && (r = r.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
            }))), n.push.apply(n, r);
        }
        return n;
    }
    function Qe(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? Ke(Object(n), !0).forEach((function(t) {
                Ye(e, t, n[t]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ke(Object(n)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
            }));
        }
        return e;
    }
    const et = {
        groups: [],
        isEnabled: !1
    }, tt = "initOption", nt = [ tt, "startEdit" ];
    function rt(e, t) {
        const n = function(e, t) {
            switch (t.type) {
              case tt:
                return Xe("menu", "click", "settings"), {
                    groups: t.groups,
                    isEnabled: t.isEnabled
                };

              case "toggleEnable":
                return Xe("settings", "sort_downloads", t.isEnabled ? "check" : "uncheck"), Qe(Qe({}, e), {}, {
                    isEnabled: t.isEnabled
                });

              case "resetOption":
                return Xe("sort_downloads", "click", "reset"), Qe(Qe({}, Ze), {}, {
                    isEnabled: e.isEnabled
                });

              case "addItem":
                return Xe("sort_downloads", "click", "add"), Qe(Qe({}, e), {}, {
                    groups: [ ...e.groups, {
                        dir: "my-folder",
                        formats: []
                    } ]
                });

              case "removeItem":
                return e.groups[t.id] && Xe("sort_downloads", "delete", e.groups[t.id].dir), Qe(Qe({}, e), {}, {
                    groups: [ ...e.groups.filter((e, n) => n !== t.id) ]
                });

              case "startEdit":
                return e.groups[t.id] && Xe("sort_downloads", "edit", e.groups[t.id].dir), Qe({}, e);

              case "saveItem":
                {
                    const n = e.groups.map((e, n) => {
                        if (t.id === n) {
                            t.dir !== e.dir && Xe("sort_downloads", "rename_folder", `${e.dir} ${t.dir}`);
                            const n = () => !t.formats.every(t => e.formats.includes(t));
                            if (t.formats.length !== e.formats.length || n()) {
                                Xe("sort_downloads", "add_format", `${t.dir}, ${e.formats.join(" ")}, ${t.formats.join(" ")}`);
                            }
                            return {
                                formats: t.formats,
                                dir: t.dir
                            };
                        }
                        return Qe({}, e);
                    });
                    return Qe(Qe({}, e), {}, {
                        groups: n
                    });
                }

              default:
                return e;
            }
        }(e, t);
        var r, o;
        return nt.includes(t.type) || (r = n.isEnabled, o = n.groups, u.a.sendMessage({
            action: "updateOption",
            key: "sortDownloads",
            value: {
                isEnabled: r,
                groups: o
            }
        })), n;
    }
    var ot = e => {
        let {locals: t, use: n, unuse: r} = e;
        return Fe.useMemo(n, []), Fe.useEffect(() => r, []), t;
    };
    const it = Fe.createContext(), st = {
        marginBottom: 15
    }, at = Fe.memo(e => {
        let {options: t} = e;
        ot(Ie.a);
        const [n, r] = Fe.useReducer(rt, et), o = Fe.useCallback(e => {
            e.preventDefault(), r({
                type: "addItem"
            });
        }, []), i = Fe.useCallback(e => {
            e.preventDefault(), r({
                type: "resetOption"
            });
        }, []), s = Fe.useCallback(e => {
            r({
                type: "toggleEnable",
                isEnabled: e.target.checked
            });
        }, []);
        return Fe.useMemo(() => {
            r({
                type: tt,
                groups: t.groups,
                isEnabled: t.isEnabled
            });
        }, []), Fe.createElement(it.Provider, {
            value: {
                state: n,
                dispatch: r
            }
        }, Fe.createElement("div", {
            style: st
        }, Fe.createElement("label", null, Fe.createElement("input", {
            type: "checkbox",
            onClick: s,
            checked: n.isEnabled ? 1 : 0
        }), Fe.createElement("span", null, "Save Management (Sort files by directories)"))), Fe.createElement("div", {
            className: ze()("sf-table", !n.isEnabled && "sf-disabled")
        }, Fe.createElement("div", {
            className: "sf-table-row-head"
        }, Fe.createElement(Je, {
            className: "sf-table-cell",
            hoverText: u.a.i18n.getMessage("optionsDirectory")
        }, "Directory"), Fe.createElement(Je, {
            className: "sf-table-cell",
            hoverText: u.a.i18n.getMessage("optionsFormats")
        }, "Formats"), Fe.createElement("div", {
            className: "sf-table-cell"
        }, "Actions")), Fe.createElement("div", {
            className: "sf-table-body"
        }, n.groups.map((e, t) => Fe.createElement(lt, {
            group: e,
            id: t,
            key: t.toString()
        })))), Fe.createElement("div", {
            className: ze()("sf-group-buttons", !n.isEnabled && "sf-disabled")
        }, Fe.createElement("button", {
            className: "sf-btn",
            onClick: o
        }, "Add"), Fe.createElement("button", {
            className: "sf-btn",
            onClick: i
        }, "Reset")));
    }), lt = Fe.memo(e => {
        let {id: t, group: n} = e;
        const {dispatch: r} = Fe.useContext(it), [o, i] = Fe.useState(!1), s = Fe.useCallback(e => {
            e.preventDefault(), e.stopPropagation(), r({
                type: "removeItem",
                id: t
            });
        }, []), a = Fe.useCallback(e => {
            e.preventDefault(), e.stopPropagation(), i(!1);
        }, []), l = Fe.useCallback(e => {
            e.preventDefault(), e.stopPropagation(), r({
                type: "startEdit",
                id: t
            }), i(!0);
        }, []), c = Fe.useCallback(e => {
            e.preventDefault(), e.stopPropagation();
            const n = e.target, o = /[.,!:;\/_+=']/g;
            let s = n.elements.dir.value, a = n.elements.formats.value;
            s = s.replace(o, ""), a = a.replace(o, "").split(" ").filter(Boolean), r({
                type: "saveItem",
                id: t,
                dir: s,
                formats: a
            }), i(!1);
        }, []), u = Fe.useMemo(() => 0 === n.formats.length, [ n ]);
        return Fe.createElement("form", {
            className: "sf-table-row",
            onSubmit: c
        }, Fe.createElement("div", {
            className: "sf-table-cell"
        }, Fe.createElement(ct, {
            name: "dir",
            input: n.dir,
            editable: o,
            type: 1
        })), Fe.createElement("div", {
            className: "sf-table-cell"
        }, (o || !u) && Fe.createElement(ct, {
            name: "formats",
            input: n.formats,
            editable: o,
            type: 0
        }), !o && u && Fe.createElement("span", {
            className: "text-muted"
        }, "No types assigned")), Fe.createElement("div", {
            className: "sf-table-cell"
        }, !o && Fe.createElement("div", null, Fe.createElement("button", {
            className: "sf-btn",
            onClick: l
        }, "Edit"), Fe.createElement("button", {
            className: "sf-btn",
            onClick: s
        }, "Delete")), o && Fe.createElement("div", null, Fe.createElement("button", {
            className: "sf-btn",
            type: "submit"
        }, "Save"), Fe.createElement("button", {
            className: "sf-btn",
            onClick: a
        }, "Cancel"))));
    }), ct = Fe.memo(e => {
        let {name: t, input: n, editable: r, type: o} = e;
        return Fe.createElement("div", null, r && Fe.createElement("input", {
            type: "text",
            name: t,
            className: "sf-input",
            value: 0 === o ? n.join(" ") : n
        }), !r && 0 === o && n.map(e => Fe.createElement("div", {
            className: "sf-badge"
        }, e)), !r && 1 === o && Fe.createElement("div", null, n));
    });
    var ut = at;
    c.a.use();
    const ft = [];
    u.a.onDestroy.addListener(() => {
        c.a.unuse(), ft.forEach(e => e());
    }), function(e) {
        e = e || document.body;
        var t = {};
        var n = function(t, n) {
            var r = e.querySelector("#" + t);
            r && (r.style.display = n ? "none" : "");
        }, r = function(e) {
            var t = e.target;
            u.a.sendMessage({
                action: "updateOption",
                key: t.id,
                value: t.checked ? 1 : 0
            });
        }, o = function() {
            var o, i, s, a;
            for (i = 0, s = (a = e.querySelectorAll("*[data-i18n]")).length; i < s; i++) (o = a[i]).textContent = u.a.i18n.getMessage(o.dataset.i18n);
            t.hasSovetnik || n("blockSovetnikEnabled", !0), t.hasAviaBar || n("blockAviaBar", !0), 
            t.showUmmyItem || n("blockUmmyInfo", !0);
            {
                const t = f.a.create("div", {
                    id: "blockFfmpegEnabled",
                    class: "sf-block",
                    append: [ f.a.create("label", {
                        append: [ f.a.create("input", {
                            type: "checkbox",
                            id: "ffmpegEnabled",
                            checked: !1
                        }), String.fromCharCode(160), f.a.create("span", {
                            text: "Converter for ffmpeg (alpha version)"
                        }) ]
                    }) ]
                }), n = e.querySelector(".sf-options-container .sf-clear");
                n.parentNode.insertBefore(t, n);
            }
            for (u.a.isFirefox && function() {
                var t = "blockSaveAsDialogEnabled";
                if (!e.querySelector("#" + t)) {
                    var n = f.a.create("div", {
                        id: t,
                        class: "sf-block",
                        append: [ f.a.create("label", {
                            append: [ f.a.create("input", {
                                type: "checkbox",
                                id: "saveAsDialog",
                                checked: !1
                            }), String.fromCharCode(160), f.a.create("span", {
                                text: u.a.i18n.getMessage("optionsSaveAsDialog")
                            }) ]
                        }) ]
                    }), r = e.querySelector(".sf-options-container .sf-block");
                    r.parentNode.insertBefore(n, r);
                }
            }(), i = 0, s = (a = e.querySelectorAll('form input[type="checkbox"]')).length; i < s; i++) (o = a[i]).id && void 0 !== t[o.id] && (o.checked = !!t[o.id], 
            o.addEventListener("change", r, !1));
            if (u.a.isGM) {
                for (i = 0, s = (a = e.querySelectorAll(".sf-browser.sf-userscript")).length; i < s; i++) (o = a[i]).style.display = "block";
                if ("undefined" != typeof GM_download) {
                    const t = e.querySelector("#blockGmNativeDownload");
                    t && (t.style.display = "block");
                }
            }
            if (t.sortDownloads) {
                const n = Be(v(ut, {
                    options: t.sortDownloads
                }), e.querySelector("#sortDownloads"));
                ft.push(n);
            }
        };
        u.a.callFn("getPreferences").then(n => {
            t = n, o(), e.classList.remove("loading");
        }), setTimeout((function() {
            e.classList.remove("loading");
        }), 1e3);
    }(u.a.container);
} ]);