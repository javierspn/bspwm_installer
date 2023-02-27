!function(e) {
    var t = {};
    function n(i) {
        if (t[i]) return t[i].exports;
        var o = t[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
    }
    n.m = e, n.c = t, n.d = function(e, t, i) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: i
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
        var i = Object.create(null);
        if (n.r(i), Object.defineProperty(i, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var o in e) n.d(i, o, function(t) {
            return e[t];
        }.bind(null, o));
        return i;
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return n.d(t, "a", t), t;
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, n.p = "", n(n.s = 16);
}([ function(e, t, n) {
    "use strict";
    var i = class {
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
                        const i = n[0];
                        i && i.id >= 0 ? t ? chrome.tabs.sendMessage(i.id, e, e => {
                            this.lastError = chrome.runtime.lastError, t(e), this.clearLastError();
                        }) : chrome.tabs.sendMessage(i.id, e) : (this.lastError = new Error("Active tab is not found"), 
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
            this.storage = new i(this);
        }
    };
    var r = class {
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
    const a = (e => {
        let t = null;
        return t = () => {}, t.t = t.log = t.info = t.warn = t.error = t.debug = t, t;
    })("mono");
    var s = class {
        constructor() {
            this.onDestroy = new r, this._lastErrorFired = !1, this._lastError = null;
        }
        get lastError() {
            return this._lastErrorFired = !0, this._lastError;
        }
        set lastError(e) {
            this._lastErrorFired = !e, this._lastError = e;
        }
        clearLastError() {
            this._lastError && !this._lastErrorFired && a.error("Unhandled mono.lastError error:", this.lastError), 
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
    const A = n(5);
    var c = e => class extends e {
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
                            const t = A(e.err);
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
    var d = e => class extends e {};
    var u = e => class extends(d(e)){};
    class p extends(u(c(l(s)))){}
    var f = p;
    var g = e => class extends e {
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
    var h = e => class extends(g(e)){};
    class m extends(h(o(f))){
        constructor() {
            super(), this.initMessages(), this.initStorage(), this.initI18n();
        }
    }
    const b = new m;
    t.a = b;
}, function(e, t, n) {
    "use strict";
    const i = {
        on: function(e, t, n, i) {
            e.addEventListener(t, n, i);
        },
        off: function(e, t, n, i) {
            e.removeEventListener(t, n, i);
        },
        one: function(e, t, n, o) {
            const r = [ "oneFn", t, !!o ].join("_");
            let a = n[r];
            a || (n[r] = a = function(e) {
                i.off(this, t, a, o), n.apply(this, arguments);
            }), i.on(e, t, a, o), e = null;
        }
    }, o = "sf-removed-" + Math.floor(1e6 * Math.random()), r = "sf-notify-on-remove-" + Math.floor(1e6 * Math.random());
    i.onRemoveEventName = o, i.onRemoveClassName = r, i.onRemoveListener = function(e) {
        i.trigger(e, o, {
            cancelable: !0,
            bubbles: !1
        });
    }, i.onRemoveEvent = (e, t) => {
        e.classList.add(r), e.addEventListener(o, t);
    }, i.offRemoveEvent = function(e, t) {
        e.removeEventListener(i.onRemoveEventName, t);
    }, i.trigger = function(e, t, n) {
        void 0 === n && (n = {}), void 0 === n.bubbles && (n.bubbles = !1), void 0 === n.cancelable && (n.cancelable = !1);
        let i = null;
        i = "function" == typeof MouseEvent && -1 !== [ "click" ].indexOf(t) ? new MouseEvent(t, n) : new CustomEvent(t, n), 
        e.dispatchEvent(i);
    };
    var a = i;
    const s = {
        create: function(e, t) {
            let n, i;
            n = "object" != typeof e ? document.createElement(e) : e;
            for (let e in t) {
                const o = t[e];
                (i = l[e]) ? i(n, o) : n[e] = o;
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
            if (Array.isArray(t)) for (let n = 0, i = t.length; n < i; n++) e.classList.add(t[n]); else e.setAttribute("class", t);
        },
        style: function(e, t) {
            if ("object" == typeof t) for (let n in t) {
                let i = n;
                "float" === i && (i = "cssFloat");
                const o = t[n];
                if (Array.isArray(o)) for (let t = 0, n = o.length; t < n; t++) e.style[i] = o[t]; else e.style[i] = o;
            } else e.setAttribute("style", t);
        },
        append: function(e, t) {
            Array.isArray(t) || (t = [ t ]);
            for (let n = 0, i = t.length; n < i; n++) {
                let i = t[n];
                (i || 0 === i) && ("object" != typeof i && (i = document.createTextNode(i)), e.appendChild(i));
            }
        },
        on: function(e, t) {
            "object" != typeof t[0] && (t = [ t ]);
            for (let n = 0, i = t.length; n < i; n++) {
                const i = t[n];
                Array.isArray(i) && a.on.apply(a, [ e ].concat(i));
            }
        },
        one: function(e, t) {
            "object" != typeof t[0] && (t = [ t ]);
            for (let n = 0, i = t.length; n < i; n++) {
                const i = t[n];
                Array.isArray(i) && a.one.apply(a, [ e ].concat(i));
            }
        },
        onCreate: function(e, t) {
            t.call(e, e);
        },
        attr: function(e, t) {
            let n, i;
            for (n in t) i = t[n], e.setAttribute(n, i);
        }
    };
    t.a = s;
}, function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        var t = [];
        return t.toString = function() {
            return this.map((function(t) {
                var n = function(e, t) {
                    var n = e[1] || "", i = e[3];
                    if (!i) return n;
                    if (t && "function" == typeof btoa) {
                        var o = (a = i, s = btoa(unescape(encodeURIComponent(JSON.stringify(a)))), l = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s), 
                        "/*# ".concat(l, " */")), r = i.sources.map((function(e) {
                            return "/*# sourceURL=".concat(i.sourceRoot || "").concat(e, " */");
                        }));
                        return [ n ].concat(r).concat([ o ]).join("\n");
                    }
                    var a, s, l;
                    return [ n ].join("\n");
                }(t, e);
                return t[2] ? "@media ".concat(t[2], " {").concat(n, "}") : n;
            })).join("");
        }, t.i = function(e, n, i) {
            "string" == typeof e && (e = [ [ null, e, "" ] ]);
            var o = {};
            if (i) for (var r = 0; r < this.length; r++) {
                var a = this[r][0];
                null != a && (o[a] = !0);
            }
            for (var s = 0; s < e.length; s++) {
                var l = [].concat(e[s]);
                i && o[l[0]] || (n && (l[2] ? l[2] = "".concat(n, " and ").concat(l[2]) : l[2] = n), 
                t.push(l));
            }
        }, t;
    };
}, , function(e, t, n) {
    "use strict";
    var i, o = function() {
        return void 0 === i && (i = Boolean(window && document && document.all && !window.atob)), 
        i;
    }, r = function() {
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
    }(), a = [];
    function s(e) {
        for (var t = -1, n = 0; n < a.length; n++) if (a[n].identifier === e) {
            t = n;
            break;
        }
        return t;
    }
    function l(e, t) {
        for (var n = {}, i = [], o = 0; o < e.length; o++) {
            var r = e[o], l = t.base ? r[0] + t.base : r[0], A = n[l] || 0, c = "".concat(l, " ").concat(A);
            n[l] = A + 1;
            var d = s(c), u = {
                css: r[1],
                media: r[2],
                sourceMap: r[3]
            };
            -1 !== d ? (a[d].references++, a[d].updater(u)) : a.push({
                identifier: c,
                updater: h(u, t),
                references: 1
            }), i.push(c);
        }
        return i;
    }
    function A(e) {
        var t = document.createElement("style"), i = e.attributes || {};
        if (void 0 === i.nonce) {
            var o = n.nc;
            o && (i.nonce = o);
        }
        if (Object.keys(i).forEach((function(e) {
            t.setAttribute(e, i[e]);
        })), "function" == typeof e.insert) e.insert(t); else {
            var a = r(e.insert || "head");
            if (!a) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
            a.appendChild(t);
        }
        return t;
    }
    var c, d = (c = [], function(e, t) {
        return c[e] = t, c.filter(Boolean).join("\n");
    });
    function u(e, t, n, i) {
        var o = n ? "" : i.media ? "@media ".concat(i.media, " {").concat(i.css, "}") : i.css;
        if (e.styleSheet) e.styleSheet.cssText = d(t, o); else {
            var r = document.createTextNode(o), a = e.childNodes;
            a[t] && e.removeChild(a[t]), a.length ? e.insertBefore(r, a[t]) : e.appendChild(r);
        }
    }
    function p(e, t, n) {
        var i = n.css, o = n.media, r = n.sourceMap;
        if (o ? e.setAttribute("media", o) : e.removeAttribute("media"), r && "undefined" != typeof btoa && (i += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r)))), " */")), 
        e.styleSheet) e.styleSheet.cssText = i; else {
            for (;e.firstChild; ) e.removeChild(e.firstChild);
            e.appendChild(document.createTextNode(i));
        }
    }
    var f = null, g = 0;
    function h(e, t) {
        var n, i, o;
        if (t.singleton) {
            var r = g++;
            n = f || (f = A(t)), i = u.bind(null, n, r, !1), o = u.bind(null, n, r, !0);
        } else n = A(t), i = p.bind(null, n, t), o = function() {
            !function(e) {
                if (null === e.parentNode) return !1;
                e.parentNode.removeChild(e);
            }(n);
        };
        return i(e), function(t) {
            if (t) {
                if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                i(e = t);
            } else o();
        };
    }
    e.exports = function(e, t) {
        (t = t || {}).singleton || "boolean" == typeof t.singleton || (t.singleton = o());
        var n = l(e = e || [], t);
        return function(e) {
            if (e = e || [], "[object Array]" === Object.prototype.toString.call(e)) {
                for (var i = 0; i < n.length; i++) {
                    var o = s(n[i]);
                    a[o].references--;
                }
                for (var r = l(e, t), A = 0; A < n.length; A++) {
                    var c = s(n[A]);
                    0 === a[c].references && (a[c].updater(), a.splice(c, 1));
                }
                n = r;
            }
        };
    };
}, function(e, t, n) {
    var i = n(6).default;
    e.exports = i;
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e;
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e;
    };
    function o(e) {
        return e && "object" === (void 0 === e ? "undefined" : i(e)) && "string" == typeof e.name && "string" == typeof e.message;
    }
    t.default = function(e) {
        return o(e) ? Object.assign(new Error, {
            stack: void 0
        }, e) : e;
    }, t.isSerializedError = o;
}, function(e, t, n) {
    var i = n(4), o = n(11);
    "string" == typeof (o = o.__esModule ? o.default : o) && (o = [ [ e.i, o, "" ] ]);
    var r, a = 0, s = {
        injectType: "lazyStyleTag",
        insert: "head",
        singleton: !1
    }, l = {};
    l.locals = o.locals || {}, l.use = function() {
        return a++ || (r = i(o, s)), l;
    }, l.unuse = function() {
        a > 0 && !--a && (r(), r = null);
    }, e.exports = l;
}, , , , function(e, t, n) {
    "use strict";
    n.r(t);
    var i = n(2), o = n.n(i)()(!1);
    o.push([ e.i, ".sf-menu-container{width:482px;font:12px/17px Tahoma,Helvetica,OpenSans,sans-serif;color:#000;background-color:#fff;margin:0;box-sizing:inherit;overflow:hidden;flex-direction:initial}.sf-menu-container.loading>*{visibility:hidden}.sf-menu-container>*{box-sizing:inherit;flex-direction:initial}.sf-menu-container p{font-size:12px}.sf-menu-container div.sf-menu-desc,.sf-menu-container div.sf-menu-list{display:inline-block;vertical-align:top;float:left}.sf-menu-container div.sf-menu-desc{width:166px;padding:20px 30px;padding-bottom:36px;color:#6a6a6a}.sf-menu-container div.sf-menu-desc a{text-decoration:none;color:#4a90e2}.sf-menu-container div.sf-menu-desc a:not(.social-btn):hover{text-decoration:underline}.sf-menu-container .sf-menu-desc .icon{width:74px;height:74px;display:inline-block;background-size:74px;background-repeat:no-repeat;background-position:center;padding:0;margin:0}.sf-menu-container .sf-menu-desc .version{vertical-align:top;display:inline-block;float:right;margin-right:-30px;width:110px}.sf-menu-container .sf-menu-desc .version>a,.sf-menu-container .sf-menu-desc .version>span{display:block}.sf-menu-container .sf-menu-desc .icon path{fill:#ccc!important}.sf-menu-container .sf-menu-desc .title{font-size:20px;line-height:1.2;font-weight:400;margin-top:14px;margin-bottom:16px}.sf-menu-container .sf-menu-desc .more{position:absolute;bottom:40px}.sf-menu-container .sf-menu-list{height:348px;width:243px;font-size:14px;padding:14px 6px;border-left:1px solid #d8d8d8}.sf-menu-container .sf-menu-list .separator{border-top:1px solid #d8d8d8;margin-top:10px;margin-bottom:9px;margin-left:59px}.sf-menu-container .sf-menu-list .manual-container .label{font-size:12px!important}.sf-menu-container .sf-menu-list .manual-container a{color:#000}.sf-menu-container .sf-menu-list .manual-container a:hover{color:#fff}.sf-menu-container .sf-menu-list .manual-container .icon.rocket{margin-top:12px}.sf-menu-container .sf-menu-list .hidden{display:none!important}.sf-menu-container .sf-menu-list .login-container{display:flex;justify-content:flex-end;margin-bottom:10px;font-family:Roboto,sans-serif}.sf-menu-container .sf-menu-list .login-container .login-btn{display:flex;background:linear-gradient(89deg,#3fa444 73px,#68c66b 183px,rgba(55,158,60,.97) 103.98%) -57px;background-size:300px;padding-top:13px;padding-bottom:7px;color:#fff;cursor:pointer;transition:background-position .8s linear;letter-spacing:.8px;font-size:14px;line-height:.9;width:93%;margin:0 auto;border-radius:7px;font-weight:400}.sf-menu-container .sf-menu-list .login-container .login-btn:hover{background-position:0}.sf-menu-container .sf-menu-list .login-container .login-btn .logo{width:23px;height:20px;margin-right:19px;margin-top:-4px;margin-left:18px}.sf-menu-container .sf-menu-list .login-container .user-info{display:flex;justify-content:space-between;width:233px}.sf-menu-container .sf-menu-list .login-container .user-info--email{width:150px;font-size:12px;font-family:sans-serif;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.sf-menu-container .sf-menu-list .login-container .user-info--email .helper--label{display:flex;font-size:14px;line-height:1.5;font-weight:700}.sf-menu-container .sf-menu-list .login-container .user-info--email .helper--label svg{width:20px;height:20px;margin-right:7px}.sf-menu-container .sf-menu-list .login-container .user-info--logout{display:flex;justify-content:flex-end;cursor:pointer;width:71px;color:#db0000;font-size:13px;font-family:sans-serif;margin-top:-2px;line-height:1;margin-right:3px}.sf-menu-container .sf-menu-list .login-container .user-info--logout svg{width:14px;margin-right:4px}.sf-menu-container .sf-menu-list .item{height:40px;cursor:pointer;border-radius:5px;margin-top:-2px;margin-bottom:-2px;overflow:hidden;display:block}.sf-menu-container .sf-menu-list .item .icon{margin:0;margin-left:18px;width:24px;height:24px;margin-bottom:8px;margin-top:8px;float:left;display:block;padding:0}.sf-menu-container .sf-menu-list .item .label{padding-left:18px;padding-right:18px;line-height:40px;font-size:14px;white-space:nowrap;width:165px;display:inline-block;text-overflow:ellipsis;overflow:hidden}.sf-menu-container .sf-menu-list .item .label.dbl{line-height:normal;padding-top:2px;white-space:normal;height:40px}.sf-menu-container.no-poll .sf-menu-list div[data-action=openPoll]{display:none}.sf-menu-container.no-poll .sf-menu-list .item .icon{margin-bottom:10px;margin-top:10px}.sf-menu-container.no-poll .sf-menu-list .item{height:44px}.sf-menu-container.no-poll .sf-menu-list .item .label{line-height:44px}.sf-menu-container .sf-menu-list .item:hover{background-color:#597a9e;color:#fff}.sf-menu-container .sf-menu-list .item.inactive{opacity:.5;cursor:default}.sf-menu-container .sf-menu-list .item.inactive .icon path{fill:#c2c2c2!important}.sf-menu-container .sf-menu-list .item.inactive:hover{background-color:#fff;color:#000}.sf-menu-container .sf-menu-list .icon[data-type=showAboutPage]{visibility:hidden}.sf-menu-container .sf-menu-list .sBtn{text-decoration:none}.sf-menu-container .sf-menu-list .sBtn:hover{text-decoration:none}.sf-menu-container .social-block{position:absolute;bottom:20px;height:16px;cursor:default;flex-direction:initial}.sf-menu-container .social-block .social-btn{display:inline-block;width:16px;height:16px;background-position:center;background-repeat:no-repeat;float:initial;margin:initial;padding:initial;list-style:initial}.sf-menu-container .social-block .social-btn:hover{opacity:.8}.sf-menu-container .social-block .social-btn.vk{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAGWSURBVDhPnZDbK8NhGMfff0bGWpJSSi2HMkxCboTk1MghhwtiY2tNISJzaBeaaE65WEJIshvahSKTcm7MKUUOl1+/5+2nvW9ysX3rU8/z9PlevC8zuX36xmn/QbPbj0igDnVZ5YQvVDCwg2zHVkRQh7os176BLNt6VFCXZZq9ECkb3oZrM/CHusk9yfuFpXUsQ6TNtYv/0ju3L7kE07d5INLi3FR1YGzJh86JVbx/fvPdf3YnuQRLbXJDpHl0jcuUxmEvUkxTCFw98H1l91hyCZZicilSmIYhL5cpp9dPOL155nPw8RXp9U7JJVhy1ThE6vtXeIESuLzH/vEl3j6++L7tP5dcgiWVj0DE5FjkMqXGOgNdkRWtAwvqBSjt8Ug+SywZhEit3aOq4DPdbFPhf6m1z0s+Syjug0iNdVZVgZML5QlHV+oG3IZeoCu0ST7TFdqVY5hqi1vV5azvHSKzwiG5BNPmWyESZ+xGTEbTH2Kz2hGfZ5FcgmlyuoPxRguigbpMazQbNIbOkCanSzlEgNLRGs2GHzakmmoMvlqgAAAAAElFTkSuQmCC)}.sf-menu-container .social-block .social-btn.ok{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAILSURBVDhPldFPaNNQHAfwdxdaqxNBVKQO8aIgeBJl4GkMBNlwyI5eNxBByRhTh4iXHRRcxdlNJqNOUQZD3cSpPaTgxlA2UJzS2kMnbZOuabL8bZp8zYtV35un/eBDyI/v95FHiJXpbHMWzy86Sz3YkqBDu8QUzxSt98dhzR/+y/7QBU9Kw3eq8I0C3NworLdHuQzt0C6xXh+BNRcsmux3p+BZEuj4XiN80nHzKS4XCrrEnDkElv15OCxohQxWU2348fICvLoJv+HAenOay1LEfN4Klr46FR5QFoegPj2ISioOu5oLd/p8N5eliPk4DpacFsKwq+Rgi32oL9+md4FrKlCeBPfelCfGxH6wSvcPQMuL4SHsFF5dhvZwH5eliJHcC5Y5eQz5ByexNncVta+zqHyaQjbVA3niBIzxOJeliJ7YA5anFuAZMrSFEZRmLkKaFWB9ewEEf8RZustlKbJxZzdYysp086P5cfV1VKZ7uSxFNoZ3gZW91oLviQ7Ua8VmFVj/+AxfhlpRvNnCZSmi3dqJzYyFZLP6exqaBH2y678cRbQbO8CyM4mw5Nk6sve6UU6Phu++68AY6+CyFFGvbwerlhmHU/2J7Mg5lAZiyF2JQhIfwdVkKMmzXJYiyuC2NXUwij+ylyJY6YuiJPC75d4oyv3/dhTtElmItav9kaI6EMGWBB1ZiLX/Au4A8snC/izyAAAAAElFTkSuQmCC)}.sf-menu-container .social-block .social-btn.fb{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAFJSURBVDhPlYvBK4NxGMeff8VmCUnTettYvaWtJpmJmmJoOAlHB1syS3IQ0fYmjF5p28EOlKy0mVZ22GkXNxdZUQ7Kcb68P/1W9va+b/vU5/J8ni8Foo/iXKRcmo+W0YzKRtmSf7VYdS3k4Zy9a0plo2xJDGbRN32r6+BiDjfFVzw9f9b1LuehbMkxeQUjS5U3NOJbyrJGwvgl9LRPZFCrfbPR+8cXtg4LWD/IQZzJsE62sRT0FPxpNlZIXldgHT6B1ZeAbTTJOvWMyDCSc5Quqxp1Dx1DSz08wRT7oa4BCVrq4Q7I7Ic63fvQ0tIbYnIkuVC/dbj22A+19+/ASI50XkRjozZxG0Zy4vKDqpHFuQkjOfGze1WjVscGjOTETvOqRmYh/GK2r0FPTiyR+99+t2QSwp4WW6hqEkLQciVywfRO7dZvf5uw5wdeN3Dr307RWAAAAABJRU5ErkJggg==)}.sf-menu-container .social-block .social-btn.tw{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAHKSURBVDhPndDPSxRhHAbw9y+ZXTWXMImQhATJk2QGCR67COGlbp3s4tm7qWiJbmVJEkYeDDos+4NKwxQq/IHFbu1uqzIz6OzOvu/O7s7T+33d0cWWYP3CB96Z93nmHV52Z1N0DWw7qwM7DuoiO9Rl/d945vqGQPuXQl2oQ1127XMBV1fPh7qs7aMA6V4roGPleF2tT54UMctIchezqRIGvxdwV/L22ZUoB5lKONjMltH5Qahn0ib9zpdxdqbjpxl2OcRBhtYttXkgXIzIS+qKCdz+JNS76jFFCb0hU3UIa32fB+kLH+KAFysxwJEHZ/i/p2/oHJfeWapDWMtyHuTBWr4S+f+8jdsq72EXl2yQwGsdL7aPUHLdSrT23I8aKu9hgTc5eAZDRiVWe3ZMgcAr/SRPWPNCDp4LLw08jOzjT+70Lrwpll3cWkyfZD2saT4LcmPZxr0Yx/hXGzm6wapJZx30LybROGeqbDXWNCcX0s0lC8+3OH5ZRZi8hJTlIJywMSz/qOVxHI1BQ+XOYg3PLBD/rAHfZAra2E9oo7vQHv2ANpGA/8keGp4eqUwtTJs5TPmD8gPnQF2mBfUe37SV8c1YqIvsaEG95y/ECyN0UoUvcQAAAABJRU5ErkJggg==)}.sf-menu-container .social-block .social-btn.lj{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAF4SURBVDhPY/j//z8Dg0GYKItu+lIm/bQ/bAYZ/5n007czaSRKgOQIYQaQQqDG2x5exf/7kmv/T0ip/e/sVf6fSSfjBjGGMAA1b/QEagZpLE3v+2+Xu/5/UMOe/x7ZM4kyBGTAH5DNZem9/y1zN/0/euUlUPz//yt3X/xXCuwjaAgDk07azx6gAQ65a/9v2H/1//sPH//XLzr33712///8Rff++9VuxmsIA4tOxnw799L/7uWb/585c+Z/9sSD/10qd/2fceL3/5kn/4IxPkMYGDXDeIChfsw4rOX/jKWb/1sX7Phvkbv5f0j7IaIMARMwQxT9O/87lAFdUH0SbEhox2GChsBNghsSOBVsAF5D9DL2YhhAiiEOeUv/s+hlALWgGQDCYEN00g+jG+JYuvW/SfoaOMZpAAhjMwSk6f+FKXCM1wAQRjeEZANAGGQIi3bGHDm/iSgGTOxqAhsAig2sGtExSDE2DMq1WDUQwiCbmXQzdjFqxqoAAJTWdEqr5+cQAAAAAElFTkSuQmCC)}.sf-menu-container .social-block .social-btn.mailru{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAKISURBVDhPldJbSJNhHAbw9/vmYUTiRXQXhjhn3dhyblPxLLmZE6YoOzgdU5fTeZjZtCnZYUvSZZtUWOnIeSqjsiAIuigL6YBXXUTQTTeWeFN0wKibp/d9XZJ15cUPtv/7PP/3+9iIwr9YoDyz9Erpf45toR3WJXLvk9WEloeQNDzYFtZhXSJtuA+JbWELjXsEwWEjXo6n48W1AwgMmZHZGfwvx7pEYp3HHztt07gVKsGvmwTPxtIxeNqAEV8F3oT38tlMsBQ76mc38wyRmKbBxJsn8eiyGiuRRCjqjiHVegKmLidKXN2QGgLQNrfg04yIhdE8xJineIchYnUYTENPM79FZupFk8eB9RsEbyf28IWvx2VYCGbD3mHhmQp3N+8wRDSMgVm+IkPkbA4U9n4eKrY3QTzkQ5zuFK768vksrbYfdwMZuHM+i3cYIupDYNbnCGwuE4ZPHsbiaBrEsiE+F/VBJFV58G2WQG7pg7dHj7WpuOhZiC7Q0SD1lQbsbSYM9pVuLIjOmeSa4/hOL5AbPfB5tfg4Kd08I+wxmcehVNwezoC8shU/6eOWNTXyeUL5AObPqfgr7Kt2Y+miDHP+DH7GELF4AIyhvpqH8iyNKK+twlokBu8mdmM1Eo+noyn4cF2KewEFz+QbrbzDELHAC0bI7UZ44CC/vc5Rif1lVmhNVdAYjNhV6EBfZyHehxPR1VoEIc/DOwwRc+mXKEHdCv/RbPygP+HnafpnojcvX0rClxmCFK0dQuYRCFntm3mGCDld2ELlRHKREY7GEoR6VbjQo0KNRYv43PatuSgiqNtWhKwOuvkvmja+SFA6NrDP/2YY2iWxGqdOyHStCmoXHWwD7cRqnLrfWEQPCw6Z+WcAAAAASUVORK5CYII=)}.sf-menu-container .social-block .social-btn.gp{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAIfSURBVDhPldL/SxNhHAfw54+RqY0ck2CU7OZM2bm+LKNiEShNyoaxogTJvoAWVAYJBUX9EBRREoqlY4qa1krdpWzOuVW2llvLU2urOXVm2bu7B7x2yQofeB3P5/3w+fDccWTySpUuctXGCbBOnNhLQg0H+YkaE97YDOsi9oi95O3p/Zh+2o53Tcfw8fEdLH+NQVyp6U+Ie1yItN6Ev7pEkprlpX3AVgryYyGJwI0z8BzSY9jCYMC2C4uxz5jno+CObseIkI1VFUnEPL0m35NzeFWhhaeykHILDeN3r9FbzLzolvJVyamIrCbL83MYEQakc1mNdEAi/B7+84fpPtMi4mP8ghWuA1sknGUrPZxyOfHSrEHbDrUkEQ7Jajog7nNj0LwZA/s0lL+xFj+XluCsKZeyVYlwUFaTwcY6pOJfEHMPYfSUBb76asxyz9FzogK9pnw4d2+S+fZhQlYTuzEP94uV6CxnEbheT68+1HAcXdtU6N+pXuNhiVJWk16jCqKu0jx4m87RATHhlfrLNDT/H9JjVMN79giCty9hsqMZv1ZW6JBk8DWe7WXQbdj4T2QxGsao8NFa2HzcYxS4VahEX50VKeFnWoiE0FdWgM7iDRkRR+UePNAq0KHPhaMoF3ZBszYbrWYDvY3v4kmaZ0IeFWRF7bps/K1FGDrjHYbncu2asz+yosTBqth2RsELkM6uy6H//RMTI8vT8G36HPY3WFKiAfgR588AAAAASUVORK5CYII=)}.sf-menu-container .sf-checkbox{float:left;display:block;padding-top:12px;padding-left:16px;padding-bottom:12px;-webkit-user-select:none;-moz-user-select:none;user-select:none}.sf-menu-container.no-poll .sf-checkbox{padding-top:14px}.sf-menu-container .sf-checkbox>i{width:24px;height:14px;display:block;padding:0;border-width:1px;border-style:solid;border-radius:8px;position:relative;border-color:#78c435;background-color:#78c435}.sf-menu-container .sf-checkbox>i>i{display:block;background-color:#fff;border-width:1px;border-style:solid;border-radius:8px;height:12px;width:12px;border-color:#78c435;margin-left:10px}.sf-menu-container .sf-checkbox.sf-transition>i>i{transition:margin-left .2s;-o-transition:none}.sf-menu-container .inactive .sf-checkbox:not(.enableForce)>i,.sf-menu-container .sf-checkbox.disabled>i{border-color:#be3f2e;background-color:#fff}.sf-menu-container .inactive .sf-checkbox:not(.enableForce)>i>i,.sf-menu-container .sf-checkbox.disabled>i>i{height:14px;width:14px;border-color:#be3f2e;margin:-1px}", "" ]), 
    t.default = o;
}, , , , function(e, t, n) {
    "use strict";
    n.r(t);
    var i = n(0);
    var o = function(e, t) {
        let n = null;
        return function() {
            const i = this, o = arguments;
            clearTimeout(n), n = setTimeout((function() {
                e.apply(i, o);
            }), t);
        };
    };
    const r = (e, t) => {
        const n = [];
        Array.isArray(e) || (e = [ e ]), t && !Array.isArray(t) && (t = [ t ]);
        const i = function(e, t) {
            const n = [];
            for (let e in t) {
                const i = t[e];
                "cssFloat" === e && (e = "float");
                const o = e.replace(/([A-Z])/g, (function(e, t) {
                    return "-" + t.toLowerCase();
                }));
                n.push(o + ":" + i);
            }
            return n.length ? [ e.join(","), "{", n.join(";"), "}" ].join("") : "";
        }, o = function(e, n) {
            if (Array.isArray(n) || (n = [ n ]), t) {
                const i = [], o = e.join || "" === e.join ? e.join : " ";
                t.forEach((function(e) {
                    n.forEach((function(t) {
                        i.push(e + o + t);
                    }));
                })), n = i;
            }
            return n;
        };
        return e.forEach((function(e) {
            let a = null, s = e.media, l = e.selector, A = e.style, c = e.append;
            if (s && c) n.push([ s, "{", r(c, t), "}" ].join("")); else if (l || A) a = o(e, l), 
            n.push(i(a, A)), c && n.push(r(c, a)); else for (var d in e) -1 === [ "append", "join" ].indexOf(d) && (l = d, 
            A = e[d], c = A.append, c && delete A.append, a = o(e, l), n.push(i(a, A)), c && n.push(r(c, a)));
        })), n.join("");
    };
    var a = r, s = n(1);
    var l = function e(t, n) {
        if (n = n || {}, "string" == typeof t) {
            if ("[" !== t[0]) return document.createTextNode(t);
            try {
                t = t.replace(/"/g, "\\u0022").replace(/\\'/g, "\\u0027").replace(/'/g, '"').replace(/([{,])\s*([a-zA-Z0-9]+):/g, '$1"$2":'), 
                t = JSON.parse(t);
            } catch (e) {
                return document.createTextNode(t);
            }
        }
        if (!Array.isArray(t)) return document.createTextNode(t);
        const i = n.fragment || document.createDocumentFragment();
        for (let n = 0, o = t.length; n < o; n++) {
            const o = t[n];
            if ("object" == typeof o) for (let t in o) {
                const n = o[t], r = n.append;
                let a;
                delete n.append, i.appendChild(a = s.a.create(t, n)), void 0 !== r && e(r, {
                    fragment: a
                });
            } else i.appendChild(document.createTextNode(o));
        }
        return i;
    };
    t.default = e => {
        e.tutorialSlides = {
            getYtSlideList: function(e) {
                var t = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAGxUlEQVRo3tWaeVATVxzHd+UMggqKknDKEbSd6bQz9Zh2OmM7vWbaOq21nf7TP+uBMoxXrW1tV6ttqVfrxRG5DUoUKGAQuQ8RRVARlYrFi8NCgwIqIIS8vu9m46QUMFkSoMx8JpnN+32/31+S3fc2D4YQwvyfMWnQaSLXlpNgItChPxacaXRMFKd1QI7HTGhC++lr1NNiDRT3BT0p6Q8iAh2CmWq0DZQNyPXoglXQhLbBB54WayDvYUB3QXcA4ekJ0H8CA8EKCuHh30XzKe0X0MoV0IS2wQeeFmsgq232o5zO2SSni6dD/27Jd5b0yQko1QaJoqhXoE++E5rQhsdJ6gVPizVw/K5vZ6bGh2S18/ANFPbItxT2BBFQ3BcoivzHT9nCv1FUGx7wgqfFGki+4XU/7Z4XSf+Lp0P/tQrk8h4FElDYK47crgCeU52BHDShDQ94wdNiDcRdlmlS7siIqpGHbwCmpzphHkDyu8Vx8oG/Ab4BaMMDXvA0u4GstrlB5Y8/mHe2e8lCY6KqpK3JDR4k+dYswDegbvfnstv9Cch9JA61Zraev/UNQJv3oF7wHJwD2ZBx2AYS/nB9If66e0vyTe/m1KbnLqhbF5QWPHijWH3vtWsJ9bLehHp3kljvzjeQ1erP0RMNJ5vh5DabzFY/noxWP74BaMMDXvDkvWkGZEEmZEPGEb9Ce89Peym61q3p0NXpZBj4BjLu+XEUArI7xJHe4qunWd8AtIfzRSZkM+kcCC+QzD9QNe1u5CVXMgR8A6mNflxaky8B6vviSG00oG8A2kN5IgsymXUSb82WvLqnwuXWvqopZBB8A8fu+HAUArI04lDd1pNyy4dvANqD/ZABWURdhb5Nt10UXuJ0Y3eFMzGCb+BIgw93tMGbgIw2cRjqoQVNaBt7wRsZRnUZ3XDU9u1teY61v5Q6EQG+AeV1Ly65nl6v65/OD2ajrBegWtCEtsEHnvC2yDwQFs8s3nzCrmp7gQOh8A0k1XlxSXWe5HCdpy61xZOIgdbrEqlGQp2+AWjDA17wtNhEBlbFMJ9uTLWp4HLs+AbiamVc/BUZib8qGzjWJCNioPUD8bV00qJa0IQ2POBl0fsBAysimM/DEtgcPI+pkXEUElsj06bclRIxxF6SamMuSUnMRX0D0IaHxW9ojPliP/MZHhXVMk5RLSWKKqn2yG0PIoboKg9tdDWddas9OGNtqzZgIOKcBxdZ6UEo/Uo6/YsBtdCAluhbyuSbvhvSmufkZmsWpBd2vvn76ceL8870fHy5omfp7ZHIb3+nJeq8bIAG0CU1zCRiQC00oPUsP2RCNmREVmRGdoYjzKRD12YoEm/MJMYob3pqjjcGXz7R+nJZ/oPXi0oevl9R3rPkekXv0m4qSEBB+7tEUe2tG1xrKqiFhkEP2vCAFzzhjQzIMrgWmZGd/xg+UTE2ETWu0XSxRExAp/yTLvYa6WKvbX5JZvPCCybW/QfUQgNa0IS2KXXIisz/OgeWRTF2eytdomPrZpCJDM2oQNYhT+LQbMZh15nJh0ZYiY4ryIaMI16F1qgYyc/FTjF0+UomEsiEbCZdRjkV47wt3zEussZVRyHjjA5ZkMmseSD0MDNlS4594sGL0wYoZJwYQAZkETWRfaVkXL9X2yn3V0/VUsgYo4U3MoxqJl6XzMz4OsMuZV/llP595+lNxlhAveAJb8ssp5OZWRvTbFJ/Pevy5LdzLsSawANe8LToWmhNAuO5QcVm7j7j3LOH3i1ZA2jDA15WWcytUzK+64+yOTvKJF27yicTSwJNaMPDqqvR0HgmYK2SLQkvlmh2lDkRSwAtaEJ7TJbTYUlMcFgSW/ljvmNzeImEjAZoQAuaVtuhGfIWM555PjSevbI117HhpyIJEQNqoQEtq24xDUdIHPPi6li24Tu1/bXthY7EHFCDWmhYfY/sGU3MWxXLNn2TYXfxh3wHYgoYixrUjskm3zObiGZeCVGwmk2ptme35tqTkcAYjEXNmO1SmsJqBbMoJJrt+lJlU0Z/HiFDgdcwBmPHdJvVVJZHMm+tjGJ71iptijerbYkxOIbXMGbM94nNYeVB5r0VEWxfaCxbtPH4JALwHMfw2rhsdJsL/XHqo+UH2f6QKLYE4DmOjdtOvRjwI9WyA6wWiPnBatQN0D+WMoliS3GgSCiTKS6UKRQ3ijtFSvGm+FECKHLKHMrcD9czmwCeC8fkwhg/oUYqaLgJmi6Ch0TwtBUysKI/AaNGbARBO4q9UVNOgqmzEGAqxVUINV3ATTg2VRjjLNQ4GYV1ELRtBa8Rg1v9KzSh/ltlIvMPblac4QBdrRkAAAAASUVORK5CYII=", n = function(e, n) {
                    var i, o, r, a, s, l, A;
                    for (A = 0; s = n[A]; A++) {
                        for (i = s.querySelectorAll('img[src="#logo"]'), l = 0; r = i[l]; l++) r.src = t, 
                        r.width = 16, r.style.verticalAlign = "baseline";
                        for (i = s.querySelectorAll('img[src="#arrow"]'), l = 0; r = i[l]; l++) r.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAYAAAArdgcFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAV1JREFUeNpiZNgexQAEhkDcDsQ2QMzNQD74CsRHgLgSiM+zAAkjID4MxFwMlAOQw9yB2BaEmaAupobByABkXjsTNChoAWxYCLl6qX42Q5SkFYb4sufHGKIvTsXreiYGGoJRw4eZ4YzA7P8fXbBFNZTBXEAFzNbhkWGQYBfA0Pji5weGK1+egNknP9xhqLm9GkMNCzYbJz7cyXBW2pZBlkMYp6tAFoLwkx/vcKZ3rMHy+tcnBu+z3Qyf/nzH6+3Pf34weJ3tYngFVE9SmF/+/Jgh9tI0hr///2GVB4nHXJoKVkdWhG56dY6h/OZyrHIVt1aA5SlKLb0PtjHMfrwfRWzOk/0MPfe3Uicp5lxfwLDv7VUwG0RnX1tAdDr/RkjRr39/GMIuTGLY8eYiQ/jFyWA+EeAbKJ3vBDLcaJCHdjFB67tvVDYYZF4lyPBz0NpoFxUsAenfDcR2IHMBAgwACpV16b/HM30AAAAASUVORK5CYII=", 
                        r.width = 16, r.style.verticalAlign = "baseline";
                        for (o = s.querySelectorAll('a[href="#support"]'), l = 0; a = o[l]; l++) a.href = "http://savefrom.userecho.com", 
                        a.target = "_blank", a.style.color = "#1795b9";
                        for (o = s.querySelectorAll('a[href="#vk"]'), l = 0; a = o[l]; l++) a.href = "https://vk.com/savefrom_net", 
                        a.target = "_blank", a.style.color = "#1795b9";
                        for (o = s.querySelectorAll('a[href="#fb"]'), l = 0; a = o[l]; l++) a.href = "https://www.facebook.com/SaveFromNetEn", 
                        a.target = "_blank", a.style.color = "#1795b9";
                    }
                }.bind(null, i.a.i18n.getMessage("lang")), o = {
                    en: {
                        tutorialS1Main: {
                            margin: "0px 17px"
                        }
                    },
                    ru: {
                        tutorialS2Main: {
                            margin: "0px 18px",
                            width: "initial"
                        },
                        tutorialS4Main: {
                            top: "228px",
                            margin: "0px 16px",
                            width: "initial"
                        },
                        tutorialS5Main: {
                            margin: "0 10px"
                        }
                    },
                    de: {
                        tutorialS1Arrow: {
                            right: "28px"
                        },
                        tutorialS3Main: {
                            margin: 0,
                            width: "initial",
                            top: "228px"
                        },
                        tutorialS4Main: {
                            margin: 0,
                            width: "initial",
                            top: "228px"
                        }
                    },
                    id: {
                        tutorialS1Arrow: {
                            width: "175px"
                        },
                        tutorialS3Main: {
                            margin: "0 6px",
                            top: "228px",
                            width: "initial"
                        }
                    },
                    es: {
                        tutorialS1Arrow: {
                            width: "160px"
                        },
                        tutorialS3Main: {
                            top: "228px"
                        },
                        tutorialS4Main: {
                            margin: "0 14px",
                            width: "initial",
                            top: "228px"
                        }
                    },
                    tr: {
                        tutorialS1Title: {
                            fontSize: "32px",
                            marginTop: "40px"
                        },
                        tutorialS1Main: {
                            marginTop: "-14px"
                        },
                        tutorialS1Arrow: {
                            width: "187px"
                        },
                        tutorialS3Main: {
                            top: "228px"
                        },
                        tutorialS4Main: {
                            top: "228px"
                        },
                        tutorialS5Title: {
                            fontSize: "32px",
                            marginTop: "40px"
                        }
                    },
                    fr: {
                        tutorialS3Main: {
                            top: "228px"
                        },
                        tutorialS4Main: {
                            top: "228px",
                            margin: 0,
                            width: "initial"
                        },
                        tutorialS5Main: {
                            margin: "0 18px"
                        }
                    },
                    uk: {
                        tutorialS1Arrow: {
                            width: "175px"
                        },
                        tutorialS5Main: {
                            margin: "0 18px"
                        }
                    }
                };
                o = o[i.a.i18n.getMessage("lang")] || o.en;
                var r = [ s.a.create(document.createDocumentFragment(), {
                    append: [ s.a.create("span", {
                        style: {
                            display: "block",
                            color: "#a4a1a1",
                            fontSize: "20px",
                            textAlign: "center",
                            margin: "28px 0"
                        },
                        append: [ s.a.create("img", {
                            style: {
                                verticalAlign: "middle",
                                marginRight: "18px"
                            },
                            src: t,
                            width: 44
                        }), i.a.i18n.getMessage("extName") ]
                    }), s.a.create("span", {
                        style: Object.assign({
                            display: "block",
                            color: "#84bd07",
                            fontSize: "40px",
                            textAlign: "center",
                            marginBottom: "28px"
                        }, o.tutorialS1Title),
                        text: i.a.i18n.getMessage("tutorialS1Title")
                    }), s.a.create("span", {
                        style: Object.assign({
                            display: "block",
                            color: "#666",
                            fontSize: "25px",
                            textAlign: "center",
                            margin: "0 22px"
                        }, o.tutorialS1Main),
                        append: l(i.a.i18n.getMessage("tutorialS1Main"))
                    }), s.a.create("span", {
                        style: Object.assign({
                            position: "absolute",
                            display: "block",
                            textAlign: "center",
                            width: "145px",
                            fontSize: "15px",
                            color: "#666",
                            right: "48px",
                            bottom: "10px"
                        }, o.tutorialS1Arrow),
                        append: l(i.a.i18n.getMessage("tutorialS1Arrow"))
                    }), s.a.create("img", {
                        src: "black" !== e ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAjCAYAAAD48HgdAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAACBklEQVRYw83YTYhNYRgH8N/1MY2PNBtWGrGxkFFTrERZYGGjlNSrZzs2FmZpEvlaiJUasnqbk5TNiAVWLBSaMEgUpiwokQULX2Ms7pm6GaZJzT3nX6dz73ufOr+e99z3fDSKnDdjPToxF+P4hs/4iHd4jfcp4qc2ZV65/4IP+FXiOrEE3diGZWgUOb/FC9zDaIr4MluwxkwLi5yXoqfcNmBxibyGuyniayWwv0CXYwt2owNXMJgixiuF/YHsxX5sxECKuFQLWIlrYA0OYCmOpIiRymEtwHnYgcBVDKWIH5XDWoArcR6vUsS+2sBKXCdOYRH6U8SnWsBK3AIcQxf6/mdaZxt4rsj55Ezr57TRdhC9Rc57Z1I861PZmiLnbgwjpYhn09W2s2NSxBucwEA7jzvjFDlfLnLeOl1NWzvWkrPoryPsDt4VOe+qFay84RzCP68IVXUMbqO7yHlFrWBl14axp1awMhexvch5bq1gKeIhFmLKdFbdMXiq+RxRO9hjrK0jbBSr6wh7ghVFzvNbB9t6dzGZIufDWIXTKWK0yPmW5rLRhUMYqwrWofk034Mz6NX8E/RhBJsqgZW4XtzXfCUxme9YlyKeV7nyP9C8XrbmQop4TvUn/3FMlJ8ncHryh6pX/pe4WX59lCLGagErM1juj7YO1gF2Q/Pl4PWqIVNS5Lzzz7HfNv+X/HfgpHUAAAAASUVORK5CYII=" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAjCAYAAAD48HgdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAdNJREFUeNrM2EsoRFEcx/EZw4QkCiuRRylCTbFVFljIQlMeJVuTHSspETtZKDWkpJSVBbFSFhYKaTwXiLGjRBaUt/E9+t+axtDVjHvPrz7NLGamX+fce+ac6wyFQjUOh6MKyXDhHc+4xy2uEMQ13hwWJVFeH3CDDymnSqYjD/XIgROXOMEW9uV7/xInI2b2s9moENVIk5Ir2MSTXcUik4tatMCNJfjlUog9qlgceDCLM7TG4zdjGbFvo48y9Mi0D2HHjqn87YZqRCeWMYdXHYoZKcAUzuH765cT/nEpukCTrH0zyNRlxIykYAQZ6DI7rVYUMzKJO/TZPZWR6YcHHVauY2blIYBSK9cxs/GiGe26TKWRBSShTrdiKhPo1bHYhuzzvLoVe5O/Kp9uxVTWZSOar1sxNWqLaNOtmMo8GmQ7r1WxXaRGm067i6kcyTlCu2IHKNexmDoGluhY7FCusaRoB16rM4hCjMmIqSNflmwmB752vxZvewxu7OIdo1jDOJ6xAZcd2x4jatO4HbGGvaASx3ZeYwH5vwzPtCpl9Z4/WopxKodlVaRITle235VnWJX3e0YpXZYLv7wO23V8+ynqWVxQpvFRpxFTz9W6w0upfAowAMpXzPWPJzeOAAAAAElFTkSuQmCC",
                        style: {
                            position: "absolute",
                            right: "10px",
                            bottom: "2px"
                        },
                        width: 38,
                        height: 35
                    }) ]
                }), s.a.create(document.createDocumentFragment(), {
                    append: [ s.a.create("span", {
                        style: {
                            display: "inline-block",
                            marginTop: "37px",
                            width: "430px",
                            position: "relative"
                        },
                        append: [ s.a.create("img", {
                            src: "data:image/png;base64,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",
                            width: 430,
                            height: 219
                        }), s.a.create("span", {
                            text: i.a.i18n.getMessage("download"),
                            style: {
                                position: "absolute",
                                top: "184px",
                                left: "168px",
                                fontSize: "14px",
                                color: "#fff",
                                width: "84px"
                            }
                        }), s.a.create("span", {
                            text: i.a.i18n.getMessage("tutorialS2Main"),
                            style: Object.assign({
                                position: "absolute",
                                display: "block",
                                top: "238px",
                                left: "0px",
                                fontSize: "18px",
                                color: "#333",
                                margin: "0 -22px",
                                width: "474px"
                            }, o.tutorialS2Main)
                        }) ]
                    }) ]
                }), s.a.create(document.createDocumentFragment(), {
                    append: [ s.a.create("span", {
                        style: {
                            display: "inline-block",
                            marginTop: "37px",
                            width: "430px",
                            position: "relative"
                        },
                        append: [ s.a.create("img", {
                            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAa4AAADRCAYAAACU9lY6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAJ0dJREFUeNrsnQt0VPW9738T8n6RB5AHgUggQCgKWsCDRaW2S1NQPFatD9R23esp9mpXq3XVnrV6dV31tudy21qfp1iXPa0e9SjWqyjCuccDVbS9EBAQBQIJhkd4JRPIi7zIvvv73/Of2TPZk8wkM8lM8v2w9mLPf//3f+/5z+T/nd/v//v/tsvtdouH68ztfnNbaG6ZQgghhIw8rea2zdx+Y27voiDBc+Bxc3vH3L5O0SKEEBJDZHq0aZ1Hq8RlWlzXegoIIYSQWGcFLK4H2A+EEELihPshXAvYD4QQQuKEBRCuLPYDIYSQOCErgX1ACCEknqBwEUIIoXARQgghFC5CCCGEwkUIISTeSBwtb6S3pUW6Dx6Qrh3b1WujtVW6D1T3qddjluHYYBg3Y6YkZPknFknIypLEGeVWZxYWSeLMmZJUPpPfLEIIiRLInGHE+5s4++QT0v5vr8XM/YwzBSznf62WZAoYIYRQuAJxP/6onFv/bux1bEaWTHj2nyV5JsWLEEIiSVzPcbW9u07a33tXDFN6Y23rbW2Rxod+ym8YIYREmIjMcX366afe/fLycsnMzHQ8dvHFF0dWuNavVyIRq/Qcr5dzf9ksaVcu5TeNEEJiSbgefvhhaWtrU/uPPvqoLFmyxCtaP/nJT9R+RkaGrFsX2ST0HdurvPvj/+H7A4pI27sDuxQTi4slY/m1av/s758f8j12VldTuAghJNaEC0K1ceNGtf/xxx97hWvXrl1+dSIJBKHX9nr83f/Qf/0dO6QlBOEaV1TkbaspAsLVYV6XEEJIjAnX1772Na9w7dy501sOEdPMmzcvojdutLT4uQntApF6ySUeK+u42iyh2x+SW9FeJxJuyPPmfRJCCIlBiwuuQLgLT548KSdOnFDzXDU1NVGzuNq3V/kJS/2qVd79sm3b1P8t766Tpud/H54gRli4OvdX81tGCCGxJlxamLTVtWXLFiksLPSztgIDNuBGRBnOs9eF6B33WElFRUXqmFMZNGUgXVERfuFacrYzDH4/CCFk9AqX3V0IUYLlZT8GWltb5f777/ezxJ577jn56U9/KpWVler1hg0b5E9/+pPav+uuu+R73/ueY5kY/iLjLEL+dSY88ICkzJolLevWSbNnvmvymjXq/9O//rV0VVf7tYhzcU72tddJ54FqqX/wQeWi1GCNVv73V0nGlVdKtymsaNcdgXkxS3QNcblc/IYSQkgAEVvHpd2FAPNc9rku7SZ89tln/URLs3r1ar+w+dAso+BrqPpYXZ4tZeYsSbvkqzKuqNhbhtfYEjKz+pxf9KtfS85tt6u0Tqgz8f4HvHWQHaPkd2uUaIEk0xLM+/73ZdLDj/R7P6FC0SKEkCgLl12gMNelBaqgoMDrCtQWGQQOYfPXXHON99xPPvkkTJNkYOGC1TJQed8yX2HLpk1ycOlSad282RKnYp/g5ZsiBUFrq9ouX1x+hdR6IhGzr7tORSYOVbgIIYQMg3Bpl6CTmB08eNBbNmPGDFV+7733esvsx0PTLUN6g2x2q8xebjiUB9a168yZdeukp6VFOvbvV6+xxkufh30l0lVV0tvSKu2mgHV4AjFgnTndDyGEkKET0ezwTpGD2qpqcQgLtwdsDIZww9v7K3e2zHyipiwujyUFUjw5COHQ0149pHmyBK6IlhYhhMSDcAFEEOqFx3AJwrqKBiof4EDqEKyOQ7my4OAutFthgcolvvPGZWVZ73HhApmkO9MUtn6vSwghJLaFK1qiNViLq781Wk4WV28I10z/6lfVNph7I4QQEgPCNVyEto7LOWDeqdxwaNNncAVf24XgjDbPgmdN6/btnNkihBAKV1/pMowQ1nE51HEq1xGFgZGGfS01//NaTdE6+bs1/CYRQgiFa2CLqzcEs8ZexwhSrg/2BphcTrrY209Z+YsvqP8b/8/b4n5nHb9dhBASBUb0QZLIpDEU4TKC/AtWR6uSvdxmv/Up6/VsugQJc3Wd1qqqPm1lLPiq2pInFzu2RwghJI6Ey/4QSazZQqaMtWvXesvs+Qo1SBuFem+++WYw5XLe7BaWQ7mKCDRfT33s0T517TKThpB30+xKnTVLvT6H9VyetjqP1asydQwZOGbO8p7Xtm+/86QZIYSQITOsrkIsUMajTpBZQz9gUnP11Ver/+2RiMi0obNtBJK5cKH0Pjfw3JLdtdfTbK2zmnjHSrWd+c9NPuHyuArt7sHSxx+VtNk+QeowxUq3d/Klf5X861dIzlVfl4s/86W3OmeK1pkPfO2mzZrJbxkhhMSjxQUeeughmT59ep/yG2+80WuRBYbQI2WUU0YOK5DCeQtW5+SfXvZZc6bwHPzhjx3ravZ9779KyzbLJYgMGjhf12nfu0+d31lf762PujjH3pZe70UIISQyuNxud0SdWfZHkGSZg7bTWi5ke0c9gGwbgXX0Y0/gPsRxzIUFPtYEbPvKvJjv4OL/do9MvvcH/KYRQkisCtdw8tm3vyPt+/bH9D2WP/2E5H3jKn7TCCEkQiTE880X3rmyX5fhSG/JeNQJRYsQQihcmok3XC8TbljRb4DhSG145MnMZ37LbxghhESYxHh/AzN+8bgSieN/fDlm7illcrFUPPOkZFTM5jeMEEIiTFzPcdnpbm6Wtr375exWK28gFgu37dvXpx7q6LD4cMmomCWJ2f5RgommaKbPtgQq1RQsiFUmBYsQQihchBBCiDIY2AWEDI309HRJTk4Wl36iKCFkQBDA1tXVJe3t7WGfm8DuI2RoopWSkkLRIiRM8DeDv520tDQKFyHDCSwtQsjggXhRuAgZ5l+NhJDh/RuicBFCCIkrKFyEEEIoXIQQQgiFixBCCBGu4yIkqvR0d0uT2y2dnZ3sjGEEkWq5+fmSmMghjhYXISQs3I2NFK0RAH2OvicULkJImCAzABmhvucPBgoXIYQQQuEihBBCKFyEEEIoXIQQQgiFixBCCKFwEUIIoXARQgghscOwLSvftm2b+n/hwoXsdUJITNDWIbJ2m+F47LuXu+SDPYZkpYmUF7rknR2GVF7kkoLx/vVQpzjXJcnmaLqlOnhbdk6eFdmw25BFZS6pmOwr33tMpL7JkG/MdXnr3LTQJRmpvuP7jhvSfM56PTFLZFaRS6YXWK/fqjJkdpF/m7od3AOO63MDcXpvXT0ir/7VkPlTReaVurzXCLWNYHVRr7XD118r5sagcG3evFn2799vfVHa2mTp0qX8iyGExAxOg7ad3AyRklyRugbDrOfyE76jTSKXzxY50iiSbYrcDQtCf77U1lpDCnNcqv2B2FVnyN5688d/mU+oUIbBPy8ztDbs9/bHjwxZMtPXlhM1J633hOvOKx1cG4HirIFwaVFvagrv84q6q3DDhg1e0QLYRxkhhMQTF0x0Se0pywrRHDbFqqJYlLU1GCAKfz1gDFgP19x52F+0AKwgCIP9niLJodOGXDTF5RWxWCGqwgWBqqur61OOMooXISSegGCkJPkP4HDblU4Y/FOwLyt3yekWywXYH3D3pSSKo2UDa6Y/a3GwNLWJcvPhmmWTRL48bcTMZxE1V+Ebb7whbrc76HGIF+rcfPPNY/YPobe3V86fPy9JSUkcFQgZQTAHZCeY6xDzR7BCKiZbc1DZqf6igYEe7jM7cDFizsqJzBTLlbbrsCFT8139WlwptmEicG4OVt+i6db5cD9urR16nxxuMFS7oCjHJXvrDXVdPd8WKoH3E+g6RH+N+BxXW3ur/PnNt6S9vX3AuhC2l156Sb594w2SkZ455v5YXC4XRwxCYoCB5rjsVteuw5Y1gvkuuA/thDvHpS2mQ6dFPv3SkPws53Phiuzs9r2GeOiAj601/kIZKAw6OCNcMK/VqVyUvnOVa3RyeO0Em+PSxMQc1/r33g9JtDSoi3MIISTWgYDAbXbghKHmu/oLSgiHxeUuqTltuR6dgKhCRI4M05NacB1YeBAVvSGyMNj9DTcRt7i062/NmjXeslWrVvnV6e/YWMIwDI4EhMQZOjQelkSkQEQghAEBGNmpzoKJ631cbci8qT4LBnNjsIwieS+g+rgvKEMzo8ClrC9YcNGYUxtR4SKhQ1chIfGHDo13srac5rhAKK5IzJvV9hMAYYmVNcem54ywjmugcPRwwTwWAkYQ4m8H7kmnJQEjMna63e6o/OynxRWaxYXgDD5ePI4Hsdzcfo8fPXyYnTSClEydyk6IA5rCnORiyidaXIQQEldQuEYYWluEEELhIoQQMoqJ2hwXIWMBznHFNpzjig84x0UIISHS1tqqflycPXPGW4aMNvVHj0rDqVMhtdHZ0dHnBwrKTtTXBz2npblZmtzuAesRChchhAQVMLvoQLyGQkpqqhQWF0esHvGHkQGEkDFNcnKydHV1Sbe5JZn759rbJTXVtwoYlpEWNpRPmDRJWUwo6+npkfE5OV5LDVYa2khPT1fnQZRgjelr4P+8CRP8RFLXQ3tNnvyuqIfroMx+nazsbH5gtLgIIWN+EExIUELT4bG08H+KR7ggGIj8LS4pURuOQeA0mEODyACIFs7Lzcvrc400s33URVsQvUBwXYhWQWGhqgfxs1uBKKNo0eIihBAv2tKCiGVk+hJ+Q2ggKu6GBiVaWmRASmpqH/Gxi1qgcOlzcJ3AZTD6vJMnTnjLYN2leDZC4SKEED8gVipAw7RyYDFpkYJ1BKGZZFpC503ryy4sgcC1d8o8rgXQDspgMcE1mOSx0AKFE+dMNNuwH3eyzgiFixBClGholx+EQwsXrB6IB6IMcVxbYI6DqXkM4gQBDHQXQrhQjjZyzGN2N6C+PuawtDDq18QZruMiZAhwHdfg2NNRL/90aqNsa/9S2nu7Bt1OekKyLEy/QH426RqZm9o3Oi8W1nHhO4DgC2bJCU6467jYk4SQYeUzU7Ru/PJ3cq63e8htQfT+0lotW9sPyZsX3CMXpjK0fExYyOwCQshw8k+nNkREtOygPbQbi+hoQkLhIoTEKXAPxlO7JPbgzwBCyLAykLX1r/PulduLLutT/srxT2TlrmcH3S6hcBFCyOgRU0/Un06/hEhCnb9QZ7uAu8+eRQORg/Y1XwDn6BB2+3nhXIMMDF2FhJAxDcSosaHB+xrh7hAVncUCoekQKwgP1nKhLN8UGXtiXg3q6fNApyesPtRrkBixuPbu3St79uyRZs+vkOzsbJk7d65UVFSw9wkhI//r3bPwV+cJxGukd9LoBcHINQjB0UscAtdqIT2UvT6yZeiyUK9BRli4IFRvv/22tJu/Uuy4zQ/uww8/lKqqKrn++uuVkBFCyEiBhb7aMgoEqZhwDFkxYGFBcGAh6UefQJzsWTICM2boxcqhXoOE+GMjWqL16quvekWrtLRU7rhzpdqwD3AMdZqZ0oQQEoNAUGAhYe5JC5LOOYjXTlk0Al8HClko1yAjJFywtDTnz5+XyspKyUjPVBv2UeZUlxBCYgGICTZYQTpgItmTiBfABQiRsouNrqcT5sKK6k+MnK5BQiPivYU5Lbt7MCUlpU8dlGnfL+riHM55hY9hGOJyudgRJO55vPxmuTRnhtqfm1niWOeqvDnyfxf+o9r/f2cOys8PvBGVe4E46UAJuAMBogcxp4Vj9jmuQGGCRabzDUKM8gKiDkO5BhkB4UIghh0IlF2YsK9Fy34OhYuQscuTdRtl++TLZUpqftA6hSk5ajva4e53PddgsD+JWD87y4mB5qEgPMHEJ9RrkBEQLqc5KwRjaEFze6JqBjqHEDJ2ON3VLMu3/2/Zcukjkp2YFrReS0+HLNu+Wk51ccwYywzLbGCe+Qtk4sSJasujKUwIceCzliNy5+7n5Lzh/NgQlN+x+1lVj9DiiigIb9dWFSIIL79iiQrKsNPW3ioffbhF6urqvOcQQsg7p3bIQ/tflV/NXtnn2M+qX1PHnShOHC/1PWfZgbS4BgcWF4P09HRvNGEgOrow3RNaqs8hhJBff7lefn9kk1/ZC0c3ya8Ovdenbs6zn0nida/L39cUyjW7sqTHFrFMKFwhgyALCJKOFgyGjj5EXQZmEELs3Lf3X+Q/Gz9X+/j/3i/+pU+d5C7zR68UyBtvvCG3VCyVjT9bI9XV1ew8CtfgQEYMgKCMzZs3K9egBvsowzF7XRI+DIUn8UhaQtKAdbp6e+Q7O5+SDQ275JZdT6vXgZQ9slsSmrvUGHLFFVfI+PHj5cUXX+yzCJiMwrHP7XYb0Wg4WMonDSwtpnwi8U5ubm6/x/WaH+Jj5eEX5cPWA0Nu5/JdqbLlH/8gR44ckcmTJ8sDDzwgTzzxhBw0rS6socIYNGfuXBk3bpzU19dLR0eHTJkyRVpbWwf83Mjw0tTUNPIWF4Ag3XnnneqXECIJ8UVSC/LMfZThGEWLkLHHzyZVhmR1DcSeuYZKZvDSSy+pxfg/+tGPVPnPH35YLl28WG5buVJ++9vfKksMwvbLX/5Sbr/9djUGYariMH9U0OIihBYXLa6QRaejXn55aoN6avFQHgC56DdH5OjnNXLs2DH1ury8XA4ePCgff/yxXHbZZbJkyRL57LPPpLGxUU6fPi1Tp06V++67T6VvgujBClu9ejU/kDizuChchFC44lcA9+yRby1fLtu2bZMFCxbImjVr5Ac/+IESsqKiIvnDH/4gd999t1qiA6FatmyZKn/hhRfkwIEDyvuzY8cOKSsrY2fGkXAxHTEhUSSZz1mKKnPmzFGJDZ577jkVlHHHHXeo/IFPP/20On7TTTdJWlqaPP/885Kamir33HOPvP7661JbWysXXXSRXHrppfLII4+wI+MMChchUSQvP1+SHRJNkwgNYKZI3XbrrfLaa69Jd3e3ZGRkyJVXXinPPPOMOp6VlSXXXnut7N+/X73+5je/KStXrvRayrfccousXbuWHRln0FVIyBBgdNrI8+WXX8q0adNUFPOKFStkw4YN8q1vfUu2bt0qCxcu9Ksb+EQFRBtC6OBivOqqq9iZIwTnuAihcI0p8Hw/JDEoKCiQjz76SJUdOnRIiVko3HXXXSrKEPNkJD6Ei65CQkjccebMGfnxj38sOTk56knq8+fPl08++UROnjypjocqWuC2226Tffv2qfVdJD6gcBFC4o4JEybIK6+8ooIwEGSBkHeAuS64A8MBbsXp06crtyGJD+gqJGQI0FU4Mtx8880qvP3ll1/2liFCsKGhQWpqasJq67HHHlOpouBeJCMD57gIiSHh6unulia3Wzo7O9lZEaSmtlZuve02efjhh5XFhbD4jRs3Krff7t275cILLwy5LYTGw+LCuq4ZM2awc+NAuOgqJCSKuBsbKVpRYHpZmWx8/33Zvn27vPPOOzJv3jy59dZb1bEvvvgirLaw+LikpEQeffRRdmycQIuLkChaXMycEX26urpUMl24+5Diqbi4WOVFDRUEdCCy8KmnnpJZs2axQ2lxEUJIdEF2kh/+8IfS2NAgy5cvDzt5LgI8Nm3apMLpSXxA4SKExD0/MoXrWlO0YD1BhNavXx/yuXhSRU9PjwqnDzcikYwMiZFsDKvPQ2XVqlXsfUJI5AazpCR59ZVXVHonZNBoa2tTkYfBgGWGBcvIXQjBamlp4cNZx6JwEULISAHJmTVzphQWFCi33y9+8QsVKYj1XpqzZ89KVVWVWu/1/vvvy1e+8hXlKkS6KBJHn3UkgzO0xUVriowVGJwRm5w7d04OHzki11RWyueff66eu4Xowz//+c/quVxPPvmk3HjjjeyoGCHc4AxaXISQUQceZYKQ+aSkJCVQ1dXV8uCDD8qnn37qV+/kWZENu/1/u6eYo+K8qS6pmOwr6+oR2XrQkJrTwevY2XtMZNdhQzp7rNfTJ4osmW25IWtOimypNuS7l/u7JT/YY0hxrq9N1Nt/3JDTLdbriVkii8tdkpshfu04odvu7z76460qQ5rPSZ9++foclxSM7/99LprhkmSPsvzxo773t6jM9x718RVzw/t8oypcnPMihIwU48aNU8/hWrx48YALi29a6JKMVH9BSE50yfQCS7Te22mogVvXC6wTKIZbaw2pvMga5Ns6RP7dFKWtNYYsmh7aHNqRRqt9DPLL5ltlW/YZ8s4OQ1Zc4hOv7DSRGxY4tznU+7ALDMB5m74w5NbF1rm76gypNYV8YZnVB2j/L+Y9oq+Wz/eJ15KZvj7S/VaY43sPOB4ujCokhIxKEGiBiMFws2FgkMWgDWtHD7ad3SLfnOsTN9SZP9UStUDcrZZ1pC0TnDO7yCW1p0K/h6pDRh/hgKVUUSyy41BoszsD3QeEDRYPBCcUSie4lGWF+th2Hha5rNwnSmh/2XyfVRmsb0Frx9A+22EVLqRjKS0t5V8UISSmycsU5aKDMDW2GFKSK14LQjOv1NlVWJhjnQvXH6wSgHraUhmIpjZRbrqp+X2PFZmWytEmZ8EM9z4gaHApajEeiD1HLKsT9Q83Wtae3W2oKZsocui0s7hC0CCmU/KH9vkM6xxXdna2VFZWSnNzs1ozUVdXx78QQkjM0m0KBKyMrLTQz4ELDO68AycMZZXsPGyoQR7WiX2gd5r/Kc71iZKToGjx7PbUgcAFtgOR/cZcV8j3EQy4GbfW2sbvNGuOy/s6iODBfdrZ47snuAa3VPu3A4tNvz8cj6k5LkIIiUe0eCQlWqLV1R3e+RANzCMtmm619dE+a37o2wt9A79TcIZdnOyDu9N9aREINsc10H0kDzD6a1elDmCBm9EueM0dwfrOssw09jkuWJMbzbYOnjSUxaqPh0tEXYUIsOgvyAKWFh6rjQe/0doihMQq7lZDubQwuOdnOrvnEFH32l/7Wk1215wWor+bYc0PdYfg4oPYQJDgjgvk+Blnt6UTQ70PDcQK4gIL7IjnnuDGhLUHUQsEARvTJrqCvjf0a2fP0D6fYZ3jomARQmIdzMPAtXbhFGvwhbWQkiTyH3t8gQyog4EcIfGBXGAO2jgfwqb520HLTRfqfNKCaZZQ2NtAVOHeepFLpoVmoUTiPjToAwgmgkYg4DgfwSmfHDC84oW+Wb/T8NZ3AhYX5t3wY2Ao0FVICBnzrN3ms0wwsMNNZg8guHquSw36uh5cYYFRf/ZBvqvHpdY36TkiWBlLK0IfrHFtWDmIbLS3gdB2HUYOnOa4AOoNdB/aBWhfCtAfsNbw/vces9x82GDFwfVoX8d18QX+bsjAOS4Inl3YBjPHFdXHmnAdFxntMHNGbFMydSo7IQ6IqcwZFCNCCCGRhguQCSGEULgIIYQQChchhBAijCokhIxh2lpbpcnt9isbn5MjWdnZah9PRj5jHsdjUUBycrLkTZggiYn+Q2dLc7OcPXOmTxud5nlov7C42HsMr3G+Po7zurq61LHU1FTJyctTx3Hs9Km+CQ7R1nnzvtAO7g+kp6er+6JwEULIGABiMWHSJLXfbQoIxCIhIUEyMjOlwdyHiOjoRIgFhEzXB729vUp8CgoLJckUNt0G2u0PiE5jQ4O6ziTzXIDrYdNCh2vbRU/j9pwH8cP1cQ7EUwvuaIeuQkII8QDh0ZYQBAiiYBcpWFLY+gykptBpqwxtFJeUqP/741x7uxI3e3v6WjjW78BtXk/fH/YhfGNFtGhxEUKIgyhAEOC+Sw4QHxxLcCibaApOa2urnKivV5ZUoLsxcD0fjqPcSdxgZWlBCjxXW2BwC8LKg6WF+4SrEC5GnEPhMqmdM5/fZDLqKftiJzuBKLRoQLTs81YalEGU7CIBAco1hUMDAQNoI9Ddp+fUUN7tmduyA7HSbQdzFeK4/XrahTlW5rnoKiSEEA8QEswVpaSmKjGCQDTYAiSwDzeeXbTwGkJlFyFlmQ1g/aSZVhLci7ievX19rD9hhRWGwBL79VwJY2c4p6uQEDKmgXjY3XFw4yHwAWDOCYEQ+jgsKPuclxYZWEknT5zwlsF1hzY6O4I/6hfWFFyMsJa0ZWcPFNHWV6CbEefA2oLgaetNRzuOFQbMVUhXIRkLDNZVyFyFsQ1zFcYH4eYqpKuQEEJIXEHhIoQQQuEihBBCokXUgjNCnTPgHBohhJCYEC7jwy3iuuzvEDrjXKGnR4xP/sZPgBAy4iCkHZF9es2UPYchogPta6Y0OK5D0nEc9QJzFqIcofWITNT5CO2LkzWnTpzwy1dojywMvDf7NYLlTqRwDZJD99wnZS+9KJKWJrU33eZvja191fw0zqk6hBAykmgB0oO/PffgOLMMogLxsK+twmskukXUIvbRBoQL4esQJXsaJ7SFNWFIy6QT56KuXuelUzchTRT+x/XQDu7H6d4gXDovItZ94bhTGqrRTFTnuLpqDonMqRCXZ00EUPtmWceuz/gXQwgZ+UHQk7LJ/lrnGoRQYAu0aLo8YoPlDkiUq4VDL2BGOQQIdXBMW2xOKZ50ailcF9dJ9iTqHejegrVH4Roip14wLa62Npn2z09JcslktWEfbsKG117nXwwhZMQJZq1AgJARA2IyLkC4dFooWFwQElhGOr8hhAblsNDsWTG09YXrBWbVCMx6gbb6uzctkrDgxlJyXU1UHaNdR4/J0Ru+IyVvvS4l//6eVWgK2dFl16tjhBASq0AQsEFsIECBIqJdh9pSgtjYFzzrJLka+3O4AjE8QmU/tz8gWk2e3IQJCWMvODzq7xgC5f7v/8P7GvsULUJIrKJdgFp0nIQB7jz96BHU0xYYztPWkp6ngsjAckv2PDLFqS3tetRWW3/BFhCsJs8zwcZaUMawWFwgtXyG5D32iPc19rvqj0v7bs5xEUJi8Ne8J/O6PcN7YH5CBFdAuHRKr1zPI0VgldUfPWqNfZ7oQB1soQUHIEJQi46ep9LnIc9hsLkrXFNHMur6waIeRzNRzVWIOa2S9W87hsQfvXo5LS8SMzBX4eiEuQrjg5jKVTjp7v8SdB2XOkYIIYSEaxVHs/Hk6dMGdYwQQggZduHKqbxapD8z3Tym6hBCCCGxIFx5v1ktMrGfB5uZx1QdQgghJAyiFlXI5LmEEELiyuIihBBCKFyEEEIoXOwCQgghFC5CCCGEwkUIIYRQuAghhFC4CCGEkOgx4DquwSYfJYT4HllBRqDvU1LYCbS4CCHhkpefzwF0hEQLfU/GqMVFCBnCH1hSkkwqKGBHEEKLixBCCIWLEEIIoXARQgghFC5CCCFjmKgGZ7S1t8q2rVVy5MgRFRKM0OApU6bIwkULJCM9k71PCCEkbFxut9uIRsN79+6VDz/8MOjxK664QioqKvgJkLgmNze33+M93d3S5HZLZ2cnO2sYSUlJkdz8fElMZOB0PNDU1BRW/ai4CgcSLYDjqEfIaMbd2EjRGgHQ5+h7MjqJuHDBPegkWqtWrXIUL9QnZLTCrBkj2Pf8wUDhChXMaUWzPiGEEApXREEgRjTrE0IIGdtEfOayP9dIaWmp1NXVhVyfEEKiycmzIht2+8enpZij4rypLqmYHNlrtXWIrN1mSOVFLmk197dUG/Ldy11DbndrjSF7652PLSpzydbayFzHiT9+ZMiSmS6ZPsxZzSIuXAh57+np6VO+efNmqayslO7ubvnggw+8Aob6hBAykty00CUZqdZ+zUlLVJITozcgo93pBZERk0XTXeZm7X+wx5CsNKtMUzHZNeo+r4gLF9Zp7d+/v085ympqauS6666Ty69YInUv1XnrE0JIrABR6epxyf7jhhIXWEp/O2jIUU/EdrYpDEsrXGadvtYajl1W7nIsv3quT0C0OMISgsXU0GKVn27x1YWQwiLc9IUhnea1SnJF3QMstoLxob0Xp+ugreZzVnuXTHPJxt1W+7DOtJW5ZZ8hNaetfdT7xtzwxS/QEtSWmb4P3AOuOzFLZHHpCAsXFhc7CReAJfbWW29Jenq6X31CCIkl8jLNAbZWlDh9fswa2DH44/V7Ow35/IghS2a7/Fxw683yWUWWqDiV9wcEC4KUm2G1f/CkoSwliJZ2W2LAl6ahvS9cZ8UlLkkeZ7ktO3sM+bZpbULg4FKEUGMfAol6GSki/2Facbi23YoLRTBrT/ksWQjhNk/7+j4gZFPyrfbDJeLBGciIgcXF/dHe3q7+Rz1m0CCExCrdPZbbbdl8a8BNNn/qT861LAU7GJhRHuhaDFYeCKwaCJ5uHxbJEc8yNG0FzS8dussP14E4Qkxg2U2b6FLXzMv0vd9Dp03RLLbq4RhEFyIUrtV662Kf+7Uo1+XXZ7CyUEe3Hy5RWVauM2IwcwYhJB7p8gyySZ4RcledZXUda/K52TR7j1lCtiRAWIKVh3MPKUm+18lRGK2d2sQ97zyMzejzfmCVaQYK+ED9lg7LLXi6xf/YhCzffibErTcGhEuL19TSKcxVSAiJO9ythrIKMLAj4AGDOQZbzF8dOG54rQdYRfvM18vn+w/iwcrDFZXO7r5iGm0QVWmf7/Ib10MM9IBo7TKFr2ySZdVNm+gveg02IUOEZV6YMXpRTeQFcVq6dCn/CgghcQPmZ2BxXDXHGqSbzYG1zBx455Va8z8IWoDF1dQmUnXIUIEUdsslWHm4YP5nW60lAhCRnXXGsLx/CA1EtzDHmnPTwr0sDBGGpZXtiW5Ef2ze63/vsMAQeIL2EQQz4sEZhBASbyBQQaMG3DIrcABcNMWlIvPgOoMVhvkfzPkcOGEot6H9XGWVFItjOQIVwrW4vj7HCtBAoMjELF95NIFINprC8s4O6/5x3StnB7939M2Wav/3X17okmNNhlrnBQsOZfgxABHTbdqjJcMlatnhCRkLDJQd/ujhw+ykEaRk6tRR8160+w1RgMlxbHKo6EjxX2sWbnZ4WlyEEBKDYP3YX/YZ3sAGWIKwwJI5alO4CCEkFkEo+bL5oy/rRTjrwYKRwK8HIYSQeILCRQghhMJFyFjBMBjbFM+0tbaqAJpu21MqmtxuaWluDnpOZ0eH9zjOdUoqPhiCtYVr4Zje3A0NMdF3TveLe0X/RftviHNchAwBLKxPSUlhR8Tzr/eEBDXYTiosDPkz1wN2tKMWIQTn2tulwLy3JM+TNyBcKM/Kzo65vhzMPXUO4knVFC5ChoDOu4msMC6Xix0Sh+Czg3g5iQEEDVYZSE1NVcfPnjljDZ6JiWq/sLhYzpuCgroQFpTn5uWpOo0e66i3t1edP2HSJLXfcOqU91mE43Nygg74uKf8CROUaOlr2gXWfn8ZmZnqurAIA+8lxbw2rtlhHkMZ7gHt4h5wPuriPvC//f3ifnEe6qMu+gnnoT0AEUU52kRdiCzawDVxTP99OL1HWFo499y5c2F/ZlzHRQghJL6sZHYBIYQQChchhBBC4SKEEEIoXIQQQihchBBCCIWLEEIIoXARQgihcBFCCCFRF64WdgMhhJA4oRXCVcV+IIQQEidsg3A9wX4ghBASJzwB4Vpnbv+TfUEIISTGgVat08EZPze3681tk7m1sW8IIYTECG0ebVrh0Sr5/wIMAFbXbMLxu67tAAAAAElFTkSuQmCC",
                            width: 430,
                            height: 209
                        }), s.a.create("span", {
                            text: i.a.i18n.getMessage("tutorialS3History"),
                            style: {
                                position: "absolute",
                                top: "143px",
                                left: "55px",
                                fontSize: "14px",
                                color: "#fff"
                            }
                        }), s.a.create("span", {
                            append: l(i.a.i18n.getMessage("tutorialS3Main")),
                            style: Object.assign({
                                position: "absolute",
                                display: "block",
                                top: "238px",
                                left: "0px",
                                fontSize: "18px",
                                color: "#333",
                                margin: "0 -22px",
                                width: "474px"
                            }, o.tutorialS3Main)
                        }) ]
                    }) ]
                }), s.a.create(document.createDocumentFragment(), {
                    append: [ s.a.create("span", {
                        style: {
                            display: "inline-block",
                            marginTop: "37px",
                            width: "430px",
                            position: "relative"
                        },
                        append: [ s.a.create("img", {
                            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAa4AAADRCAYAAACU9lY6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpCMzdBMTc3MDJDM0NFNTExOUVBNEUxMTFGMUJDRTg1QyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCMEU3MDY3MzQwMjAxMUU1QkNGMEQyMjZDODREREUzNyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCMEU3MDY3MjQwMjAxMUU1QkNGMEQyMjZDODREREUzNyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ1OTAzRDM5RkYzRkU1MTE5REQyQUUwQ0M4QzA1OEE3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkIzN0ExNzcwMkMzQ0U1MTE5RUE0RTExMUYxQkNFODVDIi8+IDwvcmRmOkRlc2NyaXB0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",
                            width: 430,
                            height: 209
                        }), s.a.create("span", {
                            append: l(i.a.i18n.getMessage("tutorialS4Main")),
                            style: Object.assign({
                                position: "absolute",
                                display: "block",
                                top: "238px",
                                left: "0px",
                                fontSize: "18px",
                                color: "#333",
                                margin: "0 -22px",
                                width: "474px"
                            }, o.tutorialS4Main)
                        }) ]
                    }) ]
                }), s.a.create(document.createDocumentFragment(), {
                    append: [ s.a.create("span", {
                        style: {
                            display: "inline-block",
                            width: "430px",
                            position: "relative"
                        },
                        append: [ s.a.create("span", {
                            style: Object.assign({
                                display: "block",
                                color: "#84bd07",
                                fontSize: "40px",
                                margin: "67px 0 32px 0"
                            }, o.tutorialS5Title),
                            text: i.a.i18n.getMessage("tutorialS5Title")
                        }), s.a.create("span", {
                            style: Object.assign({
                                display: "block",
                                color: "#333",
                                fontSize: "18px"
                            }, o.tutorialS5Main),
                            append: l(i.a.i18n.getMessage("tutorialS5Main"))
                        }), s.a.create("span", {
                            style: {
                                display: "block",
                                color: "#666",
                                fontSize: "14px",
                                marginTop: "50px"
                            },
                            append: [ s.a.create("img", {
                                style: {
                                    verticalAlign: "middle",
                                    marginRight: "11px"
                                },
                                src: t,
                                width: 29
                            }), i.a.i18n.getMessage("extName") ]
                        }) ]
                    }) ]
                }) ];
                return n(r), r.filter(e => e);
            },
            getImage: function(e, t) {
                var n;
                t = t || "#A6A2A3";
                return "arrowLeft" === e ? n = '<svg height="512px" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon fill="' + t + '" points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/></svg>' : "arrowRight" === e && (n = '<svg height="512px" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon fill="' + t + '" points="160,128.4 192.3,96 352,256 352,256 352,256 192.3,416 160,383.6 287.3,256 "/></svg>'), 
                "data:image/svg+xml;base64," + btoa('<?xml version="1.0" encoding="UTF-8"?>' + n);
            },
            setSlide: function(e, t) {
                (t = parseInt(t)) < 0 && (t = 0);
                var n = e.slideList.length - 1;
                t > n && (t = n), 0 === t ? e.leftBtn.classList.add("hide") : e.leftBtn.classList.remove("hide"), 
                t === n ? e.rightBtn.classList.add("hide") : e.rightBtn.classList.remove("hide");
                var i = e.dotContainer.querySelector(".sf-dot.active"), o = e.dotContainer.querySelector('.sf-dot[data-index="' + t + '"]');
                i && i.classList.remove("active"), o.classList.add("active");
                var r = t * e.slide.width;
                e.slider.firstChild.style.marginLeft = -1 * r + "px", e.index = t;
            },
            switchSlide: function(e, t) {
                var n = e.index;
                t ? n++ : n--, this.setSlide(e, n);
            },
            onResize: function(e) {
                var t = window.innerHeight;
                e.box.style.paddingTop = parseInt((t - e.height - 2 * e.padding) / 2) + "px", e.box.style.height = t + "px";
            },
            onClose: function(e) {
                e.container.removeEventListener("click", e.onBodyClick), window.removeEventListener("resize", e._onResize), 
                e.withOpacity ? (e.box.style.opacity = 0, setTimeout((function() {
                    e.box.parentNode.removeChild(e.box);
                }), 500)) : e.box.parentNode.removeChild(e.box), e.onClose && e.onClose();
            },
            getContent: function(e) {
                var t = 0, n = s.a.create("div", {
                    class: "sf-slider-conteiner"
                });
                return e.slideList.forEach((function(i, o) {
                    var r = s.a.create("div", {
                        data: {
                            index: o
                        },
                        style: {
                            display: "inline-block",
                            height: e.slide.height + "px",
                            width: e.slide.width + "px",
                            position: "relative",
                            verticalAlign: "top",
                            textAlign: "center"
                        },
                        append: [ i ]
                    });
                    t += e.slide.width, n.appendChild(r);
                })), n.style.width = t + "px", [ n ];
            },
            getDotList: function(e) {
                for (var t = this, n = [], i = e.slideList.length, o = 0; o < i; o++) n.push(s.a.create("a", {
                    class: "sf-dot",
                    data: {
                        index: o
                    },
                    href: "#",
                    on: [ "click", function(n) {
                        n.preventDefault(), t.setSlide(e, this.dataset.index);
                    } ],
                    append: s.a.create("i")
                }));
                return n;
            },
            onBodyClick: function(e) {
                e.bodyClickCount++, e.bodyClickCount < 2 || e._onClose();
            },
            show: function(t) {
                var n = e.tutorialSlides, i = {
                    container: document.body,
                    width: 564,
                    height: 398,
                    padding: 8,
                    slide: {},
                    margin: 0
                };
                for (var r in t) i[r] = t[r];
                i.width -= 2 * i.padding, i.height -= 2 * i.padding, i.slide.width = i.width, i.slide.height = i.height - 34, 
                i._onResize = o((i.onResize || n.onResize).bind(n, i), 250), i._onClose = n.onClose.bind(n, i), 
                i.setSlide = n.setSlide.bind(n, i), i.onBodyClick = n.onBodyClick.bind(n, i), i.bodyClickCount = 0;
                var l = i.boxClassName || "sf-tutorial-box";
                i.box = s.a.create("div", {
                    class: l,
                    style: Object.assign({
                        position: "fixed",
                        width: "100%",
                        textAlign: "center",
                        display: "block",
                        zIndex: 9999999,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        top: 0
                    }, i.boxStyle),
                    append: [ s.a.create("div", {
                        class: "sf-tutorial-container",
                        style: Object.assign({
                            display: "inline-block",
                            width: i.width + "px",
                            height: i.height + "px",
                            backgroundColor: "#eee",
                            fontFamily: "Arial",
                            lineHeight: "normal",
                            borderRadius: "6px",
                            textAlign: "left",
                            position: "relative",
                            padding: i.padding + "px",
                            boxShadow: "0 0 25px rgba(0, 0, 0, 0.5)"
                        }, i.containerStyle),
                        on: [ "click", function(e) {
                            e.stopPropagation();
                        } ],
                        append: [ i.slider = s.a.create("div", {
                            class: "sf-slider",
                            style: Object.assign({
                                backgroundColor: "#fff",
                                borderRadius: "6px",
                                height: i.slide.height + "px",
                                width: i.slide.width + "px",
                                overflow: "hidden"
                            }, i.slideStyle),
                            append: n.getContent(i)
                        }), s.a.create("div", {
                            class: "sf-contorls",
                            style: {
                                position: "relative"
                            },
                            append: [ i.leftBtn = s.a.create("a", {
                                class: [ "sf-btn", "left" ],
                                href: "#",
                                style: Object.assign({
                                    position: "absolute",
                                    top: "8px",
                                    left: 0,
                                    width: "16px",
                                    height: "27px"
                                }, i.leftBtnStyle),
                                on: [ "click", function(e) {
                                    e.preventDefault(), n.switchSlide.call(n, i, 0);
                                } ]
                            }), i.dotContainer = s.a.create("div", {
                                class: [ "sf-dots" ],
                                append: n.getDotList(i)
                            }), i.rightBtn = s.a.create("a", {
                                class: [ "sf-btn", "right" ],
                                href: "#",
                                style: Object.assign({
                                    position: "absolute",
                                    top: "8px",
                                    right: 0,
                                    width: "16px",
                                    height: "27px"
                                }, i.rightBtnStyle),
                                on: [ "click", function(e) {
                                    e.preventDefault(), n.switchSlide.call(n, i, 1);
                                } ]
                            }) ]
                        }), s.a.create("a", {
                            class: [ "sf-btn", "close" ],
                            text: "x",
                            href: "#",
                            style: Object.assign({
                                display: "block",
                                position: "absolute",
                                borderRadius: "9px",
                                right: "10px",
                                top: "10px",
                                backgroundColor: "#ccc",
                                width: "18px",
                                height: "18px",
                                textAlign: "center",
                                textDecoration: "none",
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: "14px",
                                lineHeight: "16px"
                            }, i.closeBtnStyle),
                            on: [ "click", function(e) {
                                e.preventDefault(), i._onClose();
                            } ]
                        }) ]
                    }), s.a.create("style", {
                        text: a({
                            selector: "." + l + " .sf-tutorial-container",
                            style: {
                                WebkitUserSelect: "none",
                                MozUserSelect: "none",
                                OUserSelect: "none",
                                userSelect: "none"
                            },
                            append: Object.assign({
                                ".sf-slider .sf-slider-conteiner": {
                                    transition: "margin-left 0.5s"
                                },
                                ".sf-contorls .sf-btn.left": {
                                    backgroundImage: "url(" + this.getImage("arrowLeft", i.arrowColor) + ")",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "44px"
                                },
                                ".sf-contorls .sf-btn.left.hide": {
                                    display: "none"
                                },
                                ".sf-contorls .sf-btn.right": {
                                    backgroundImage: "url(" + this.getImage("arrowRight", i.arrowColor) + ")",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "44px"
                                },
                                ".sf-contorls .sf-btn.right.hide": {
                                    display: "none"
                                },
                                ".sf-contorls .sf-btn.left:hover": {
                                    backgroundImage: "url(" + this.getImage("arrowLeft", i.arrowColorActive || "#00b75a") + ")"
                                },
                                ".sf-contorls .sf-btn.right:hover": {
                                    backgroundImage: "url(" + this.getImage("arrowRight", i.arrowColorActive || "#00b75a") + ")"
                                },
                                ".sf-dots": {
                                    textAlign: "center",
                                    paddingTop: "5px"
                                },
                                ".sf-dot": {
                                    display: "inline-block",
                                    padding: "8px"
                                },
                                ".sf-dot i": {
                                    display: "inline-block",
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "4px",
                                    backgroundColor: "#a4a1a1"
                                },
                                ".sf-dot.active i": {
                                    backgroundColor: "#00b75a"
                                }
                            }, i.cssStyle)
                        })
                    }) ]
                }), i.setSlide(0), (i.onResize || n.onResize).call(n, i), setTimeout((function() {
                    i.withOpacity ? (i.box.style.transition = "opacity 0.5s", i.box.style.opacity = 0, 
                    i.container.appendChild(i.box), setTimeout((function() {
                        i.box.style.opacity = 1;
                    }), 50)) : i.container.appendChild(i.box), i.onShow && i.onShow();
                }), i.withDelay), window.addEventListener("resize", i._onResize), i.container.addEventListener("click", i.onBodyClick);
            }
        };
    };
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var i = n(7), o = n.n(i), r = n(0);
    var a = e => e.charAt(0).toUpperCase() + e.substr(1), s = n(1);
    o.a.use(), r.a.onDestroy.addListener(() => {
        o.a.unuse();
    }), function(e) {
        var t = {}, i = {
            icons: {},
            activeTabInfo: {},
            helperName: ""
        }, o = function(e) {
            if (!this.classList.contains("ignore-action")) {
                e.preventDefault(), e.stopPropagation();
                if (!this.classList.contains("inactive")) {
                    var n, o, a = this.dataset.action, s = this.classList.contains("module");
                    if ("enableModule" === a) return n = i.activeTabInfo, o = i.moduleTrigger.classList.contains("disabled") ? 1 : 0, 
                    n.state = o, v(o, 1), t[n.prefKey] = o, r.a.sendMessage({
                        action: "viaMenu_changeState",
                        state: o ? 1 : 0,
                        prefKey: n.prefKey,
                        moduleName: n.moduleName,
                        needInclude: n.isNotResponse
                    }), n.isNotResponse = !1, void g(n);
                    r.a.sendMessage({
                        action: (s ? "viaMenu_" : "") + a
                    }), r.a.isGM ? r.a.bundle.buttonUi && r.a.bundle.buttonUi.hideMenuItems() : r.a.isSafari ? safari.extension.popovers[0].hide() : window.close();
                }
            }
        }, l = function(t, n) {
            for (var i = e.querySelectorAll("div." + t), o = 0; o < i.length; o++) n ? i[o].classList.remove("inactive") : i[o].classList.add("inactive");
        }, A = function(t, n) {
            if (!n) return l("module", !1);
            for (var i = e.querySelectorAll("div.module"), o = 0; o < i.length; o++) i[o].classList.contains(t) ? i[o].classList.remove("inactive") : i[o].classList.add("inactive");
        }, c = function(e) {
            e.preventDefault(), r.a.openTab(this.href, !0);
        }, d = function() {
            for (var t = e.querySelectorAll('a[href][target="_blank"]'), n = 0, i = t.length; n < i; n++) t[n].removeEventListener("click", c), 
            t[n].addEventListener("click", c);
        }, u = function(e) {
            if (-1 !== [ "odnoklassniki" ].indexOf(e.moduleName) ? l("bookmarklet", !1) : l("bookmarklet", !0), 
            "vk" === e.moduleName && e.url.includes("m.vk.com")) return A(e.moduleName, 0);
            if (A(e.moduleName, e.state), e.state && "youtube" === e.moduleName) {
                var t = e.url, n = /\/playlist\?|[?&]list=/.test(t);
                n || (n = /(user|channel|c|show)\/[^\/]+(\/feed|\/featured|\/videos|$)/i.test(t)), 
                n || (n = /\/(feed)\/(trending|subscriptions|history)/i.test(t)), l("plYoutube", !!n);
            }
        }, p = function(e) {
            var t = !1, n = !1;
            -1 !== [ "savefrom" ].indexOf(e.moduleName) ? n = "force" : e.moduleName && (n = !!e.state, 
            t = !0), l("enableModule", t), v(n);
        }, f = function(e, t) {
            if (i.activeTabInfo = e = e || {}, p(e), u(e), !t) {
                var n = function(t) {
                    for (var n in clearTimeout(o), e.isNotResponse = !t, t) e[n] = t[n];
                    p(e), u(e);
                }, o = setTimeout(n, 250);
                r.a.sendMessage({
                    action: "getActiveTabModuleInfo",
                    url: e.url
                }, n);
            }
        }, g = function(e) {
            i.activeTabInfo = {}, e ? f(e, 1) : r.a.sendMessage({
                action: "getActiveTabInfo"
            }, f);
        }, h = function(e, t) {
            var n = e.querySelector("path");
            if ("hover" === t) n.setAttribute("fill", "#ffffff"); else if ("active" === t) n.setAttribute("fill", "#AAAAAA"); else {
                var i = e.getAttribute("data-type");
                "downloadMP3Files" === i ? n.setAttribute("fill", "#00CCFF") : "downloadPlaylist" === i ? n.setAttribute("fill", "#77D1FA") : "downloadPhotos" === i ? n.setAttribute("fill", "#88cb66") : "showAboutPage" === i ? n.setAttribute("fill", "#ADE61B") : "updateLinks" === i || "downloadFromCurrentPage" === i ? n.setAttribute("fill", "#CB7FBD") : "howActivateHelperPro" === i && n.setAttribute("fill", "#ADE61B");
            }
        }, m = function(e, t) {
            var n = i.desc, o = i.deskText, l = i.descTitel, A = i.descMore;
            n.dataset.page = e;
            var c = i.icons[e], u = n.querySelector(".icon");
            if (c) {
                var p = c.cloneNode(!0);
                h(p, "active"), u && u.parentNode.replaceChild(p, u), u.style.visibility = "visible";
            } else u.style.visibility = "hidden";
            "showAboutPage" === e ? (l.textContent = r.a.i18n.getMessage("aboutTitle"), o.textContent = "", 
            o.appendChild(s.a.create(document.createDocumentFragment(), {
                append: [ s.a.create("p", {
                    text: r.a.i18n.getMessage("aboutDescription")
                }), s.a.create("a", {
                    href: "http://savefrom.net/faq.php#supported_resourses",
                    target: "_blank",
                    text: r.a.i18n.getMessage("aboutSupported"),
                    style: {
                        display: "block"
                    }
                }), s.a.create("a", {
                    href: "http://savefrom.net/user.php?helper=" + i.helperName,
                    target: "_blank",
                    text: r.a.i18n.getMessage("homePage"),
                    style: {
                        display: "block"
                    }
                }) ]
            })), A.style.display = "none") : (l.textContent = t, o.textContent = r.a.i18n.getMessage("menu" + a(e)) || "", 
            A.style.display = "block"), r.a.isSafari && d();
        }, b = function() {
            !function() {
                for (var t = e.querySelectorAll("*[data-i18n]"), n = 0, i = t.length; n < i; n++) {
                    var o = t[n], a = o.dataset.i18n;
                    o.textContent = r.a.i18n.getMessage(a), o.classList.contains("label") && (o.title = r.a.i18n.getMessage(a));
                }
            }(), i.descMore.href = "http://savefrom.net/user.php?helper=" + i.helperName;
            for (var t = e.querySelectorAll("div[data-action]"), n = 0; n < t.length; n++) {
                var a = t[n].querySelector("svg");
                a && (i.icons[t[n].dataset.action] = a, h(a)), "none" !== t[n].style.display && s.a.create(t[n], {
                    on: [ [ "click", o ], [ "mouseenter", function() {
                        var e = this.dataset.action, t = i.icons[e];
                        t && h(t, "hover");
                        var n = this.querySelector("span"), o = n && n.textContent || "";
                        m(e, o);
                    } ], [ "mouseleave", function() {
                        var e = this.dataset.action, t = i.icons[e];
                        t && h(t);
                    } ] ]
                });
            }
            !function() {
                var t = "http://savefrom.net/user.php", n = encodeURIComponent(t), i = encodeURIComponent("http://savefrom.net/img/icon_100.png"), o = encodeURIComponent(r.a.i18n.getMessage("extName")), a = encodeURIComponent(r.a.i18n.getMessage("socialDesc")), s = {
                    vk: {
                        network: "vkontakte",
                        title: r.a.i18n.getMessage("shareIn").replace("%w", "VK"),
                        href: "http://vk.com/share.php?url=" + n + "&image=" + i + "&title=" + o + "&description=" + a
                    },
                    ok: {
                        network: "odnoklassniki",
                        title: r.a.i18n.getMessage("shareIn").replace("%w", "OK.ru"),
                        href: "http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl=" + n + "&st.comments=" + a
                    },
                    mailru: {
                        network: "mail.ru",
                        title: r.a.i18n.getMessage("shareIn").replace("%w", "Mail.ru"),
                        href: "http://connect.mail.ru/share?url=" + n + "&title=" + o + "&description=" + a + "&imageurl=" + i
                    },
                    tw: {
                        network: "twitter",
                        title: r.a.i18n.getMessage("shareIn").replace("%w", "Twitter"),
                        href: "https://twitter.com/intent/tweet?text=" + o + "&url=" + n
                    },
                    fb: {
                        network: "facebook",
                        title: r.a.i18n.getMessage("shareIn").replace("%w", "Facebook"),
                        href: "http://www.facebook.com/sharer.php?s=100&p[url]=" + n + "&p[title]=" + o + "&p[summary]=" + a + "&p[images][0]=" + i
                    },
                    gp: {
                        network: "google+",
                        title: r.a.i18n.getMessage("shareIn").replace("%w", "Google+"),
                        href: "https://plus.google.com/share?url=" + n
                    },
                    lj: {
                        network: "livejournal",
                        title: r.a.i18n.getMessage("shareIn").replace("%w", "Livejournal"),
                        href: "http://www.livejournal.com/update.bml?subject=" + o + "&event=" + a + " " + n
                    }
                };
                for (var l in s) {
                    var A = e.querySelector(".social-btn." + l);
                    A && (A.title = s[l].title, A.href = s[l].href, A.dataset.network = s[l].network);
                }
                A.parentNode.addEventListener("click", (function(e) {
                    var n = e.target;
                    if (n.classList.contains("social-btn")) {
                        var i = n.dataset.network;
                        r.a.sendMessage({
                            action: "track",
                            t: "social",
                            st: t,
                            sa: "share",
                            sn: i
                        });
                    }
                }));
            }(), r.a.isSafari && d(), m("showAboutPage"), g(), e.classList.remove("loading");
        }, v = function(e, t) {
            t && i.moduleTrigger.classList.add("sf-transition"), "force" === e ? i.moduleTrigger.classList.add("enableForce") : i.moduleTrigger.classList.remove("enableForce"), 
            e ? (i.moduleTrigger.classList.remove("disabled"), i.moduleTrigger.nextElementSibling.textContent = r.a.i18n.getMessage("disableModule")) : (i.moduleTrigger.classList.add("disabled"), 
            i.moduleTrigger.nextElementSibling.textContent = r.a.i18n.getMessage("enableModule")), 
            "showAboutPage" !== i.desc.dataset.page && m("enableModule", e ? r.a.i18n.getMessage("disableModule") : r.a.i18n.getMessage("enableModule"));
        }, x = {
            tutorialSlides: null,
            show: function() {
                if (t.onceShowYtTutorial) {
                    var n = function() {
                        r.a.sendMessage({
                            action: "updateOption",
                            key: "onceShowYtTutorial",
                            value: t.onceShowYtTutorial = 0
                        }), r.a.sendMessage({
                            action: "setIconBadge",
                            text: ""
                        });
                    };
                    return x.tutorialSlides ? x.tutorialSlides.show({
                        container: e,
                        width: 482,
                        height: 404 + (r.a.isGM ? 2 : 0),
                        padding: 4,
                        slideList: x.tutorialSlides.getYtSlideList("black"),
                        onClose: n,
                        trackId: "Menu",
                        boxStyle: {
                            backgroundColor: "transparent"
                        },
                        containerStyle: {
                            borderRadius: "3px",
                            backgroundColor: "rgba(0, 104, 255, 0.9)",
                            padding: 0,
                            margin: "4px",
                            boxShadow: "none"
                        },
                        slideStyle: {
                            backgroundColor: "transparent",
                            borderRadius: 0
                        },
                        leftBtnStyle: {
                            top: "4px",
                            left: "4px"
                        },
                        rightBtnStyle: {
                            top: "4px",
                            right: "4px"
                        },
                        closeBtnStyle: {
                            backgroundColor: "#fff",
                            color: "rgba(0, 104, 255, 0.9)"
                        },
                        cssStyle: {
                            " .sf-dots": {
                                paddingTop: "2px"
                            },
                            " .sf-dot i": {
                                backgroundColor: "#fff"
                            },
                            " .sf-dot.active i": {
                                backgroundColor: "transparent",
                                borderRadius: "6px",
                                margin: "-1px",
                                width: "6px",
                                height: "6px",
                                border: "2px solid #fff"
                            },
                            " .sf-slider-conteiner span": {
                                color: "#fff !important"
                            },
                            " .sf-slider-conteiner a": {
                                color: "#fff !important"
                            }
                        },
                        arrowColor: "#fff",
                        arrowColorActive: "#fff",
                        onResize: function(e) {
                            e.box.style.position = "absolute";
                        },
                        withOpacity: !0,
                        withDelay: 250,
                        onShow: function() {
                            r.a.isSafari && d(), r.a.sendMessage({
                                action: "setIconBadge",
                                text: "?"
                            });
                        }
                    }) : n();
                }
            }
        };
        const y = n => {
            if (t.proEnabled) {
                const e = document.querySelector(".login-container");
                e && e.classList.remove("hidden");
            }
            const i = n.userInfo, o = n.loginUrl, a = e.querySelector(".login-btn"), s = e.querySelector(".user-info"), l = e.querySelector(".user-info--logout"), A = s.querySelector(".helper--label"), c = document.querySelector(".manual-container"), d = e => {
                e.preventDefault();
                const t = document.createElement("a");
                t.target = "_blank", t.href = o, t.click(), setTimeout(() => t.remove());
            }, u = () => r.a.callFn("auth.logout").then(() => y({
                userInfo: void 0,
                loginUrl: o
            }));
            if (a.removeEventListener("click", d), l.removeEventListener("click", u), i || (a.querySelector(".text").textContent = r.a.i18n.getMessage("login"), 
            a.addEventListener("click", d), a.classList.remove("hidden"), s.classList.add("hidden"), 
            c.classList.add("hidden")), i && t && t.proEnabled) {
                if (c.classList.remove("hidden"), a.classList.add("hidden"), s.classList.remove("hidden"), 
                i.email ? A.classList.add("hidden") : A.classList.remove("hidden"), i.email) {
                    s.querySelector(".user-info--email").textContent = i.email;
                }
                l.addEventListener("click", u);
            }
        };
        (0, n(15).default)(x);
        setTimeout((function() {
            e.classList.remove("loading");
        }), 1e3), i.list = e.querySelector(".sf-menu-list"), i.desc = e.querySelector(".sf-menu-desc"), 
        i.moduleTrigger = e.querySelector(".sf-checkbox"), i.descTitel = i.desc.querySelector(".title"), 
        i.deskText = i.desc.querySelector(".desc"), i.descMore = i.desc.querySelector(".more"), 
        i.list.style.height = i.list.offsetHeight + "px", r.a.sendMessage({
            action: "getMenuDetails"
        }, (function(n) {
            var o, a, l;
            t = n.preferences, i.helperName = n.helperName, o = n.version, a = n.lastVersion, 
            (l = i.desc.querySelector(".version")).textContent = "", l.appendChild(s.a.create("span", {
                text: r.a.i18n.getMessage("aboutVersion") + " " + o
            })), a && a !== o && l.appendChild(s.a.create("a", {
                text: r.a.i18n.getMessage("updateTo").replace("%d", a),
                href: "http://savefrom.net/user.php?helper=" + i.helperName + "&update=" + o,
                target: "_blank"
            })), -1 === [ "en", "uk", "ru" ].indexOf(r.a.i18n.getMessage("lang")) && e.classList.add("no-poll"), 
            y({
                userInfo: n.userInfo,
                loginUrl: n.loginUrl
            }), x.show(), b();
        }));
    }(r.a.container || document.body);
} ]);