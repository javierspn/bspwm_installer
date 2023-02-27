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
    }, n.p = "", n(n.s = 84);
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
    }, s = n(1);
    const a = Object(s.a)("mono");
    var c = class {
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
    var u = e => class extends e {
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
    var l = (e, t) => {
        const n = t.split("."), r = n.pop();
        for (;n.length; ) e = e[n.shift()];
        return {
            scope: e,
            endPoint: r
        };
    };
    const h = n(42), f = Object(s.a)("mono:callFnListener");
    var p = e => class extends e {
        constructor() {
            super(), this.remote = {
                mono: this
            }, this.callFnListener = this.callFnListener.bind(this);
        }
        initMessages() {
            super.initMessages(), this.onMessage.addListener(this.callFnListener);
        }
        responseFn(e, t) {
            const n = Promise.resolve().then(() => {
                const {scope: t, endPoint: n} = l(this.remote, e.fn), r = e.args || [];
                return t[n].apply(t, r);
            });
            return this.responsePromise(n, t);
        }
        responsePromise(e, t) {
            return e.then(e => {
                t({
                    result: e
                });
            }, e => {
                t({
                    err: h(e)
                });
            }).catch((function(e) {
                f.error("responsePromise error", e);
            })), !0;
        }
        callFnListener(e, t, n) {
            switch (e && e.action) {
              case "callFn":
                return this.responseFn(e, n), !0;
            }
        }
        destroy() {
            this.onMessage.removeListener(this.callFnListener), super.destroy();
        }
    };
    var d = e => class extends e {};
    var m = e => class extends(d(e)){
        openTab(e, t) {
            this.unimplemented();
        }
    };
    class g extends(m(p(u(c)))){}
    var y = g;
    var v = e => class extends e {
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
    var b = e => class extends(v(e)){
        openTab(e, t) {
            t = void 0 === t || !!t, chrome.tabs.create({
                url: e,
                active: t
            });
        }
        executeScript(e, t) {
            chrome.tabs.executeScript(e.id, t);
        }
        getActiveTab(e) {
            chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, t => e(t[0]));
        }
    };
    class w extends(b(o(y))){
        constructor() {
            super(), this.initMessages(), this.initStorage(), this.initI18n();
        }
    }
    const k = new w;
    t.a = k;
}, function(e, t, n) {
    "use strict";
    t.a = e => {
        let t = null;
        return t = () => {}, t.t = t.log = t.info = t.warn = t.error = t.debug = t, t;
    };
}, function(e, t, n) {
    "use strict";
    var r = n(3);
    t.a = e => new Promise((t, n) => {
        Object(r.a)(e, (e, r) => {
            e ? n(e) : t(r);
        });
    });
}, function(e, t, n) {
    "use strict";
    var r = n(1);
    const o = Object(r.a)("webRequest");
    var i = function() {
        const e = /^sf-\d+_/, t = {
            urls: [ "<all_urls>" ],
            types: [ "xmlhttprequest" ]
        };
        let n = !1;
        const r = {}, i = {}, s = function(e) {
            for (let t in e) return !1;
            return !0;
        }, a = function(e) {
            delete i[e.requestId], s(r) && s(i) && l();
        }, c = function(t) {
            const n = i[t.requestId], o = t.requestHeaders || [];
            let a = [], c = [];
            const u = [];
            if (n) c = n.changes, a = n.filtered; else if (!s(r)) {
                let t, n;
                for (let i, s = 0; i = o[s]; s++) t = i.name, e.test(t) && (n = r[t], n && (i.name = n.name, 
                i.value = n.value, c.push(i), a.push(n.name.toLowerCase()), a.push(t.toLowerCase()), 
                /cookie/i.test(i.name) && u.push("set-cookie"), clearTimeout(n.timer), delete r[t]));
            }
            if (c.length) {
                n || (i[t.requestId] = {
                    changes: c,
                    filtered: a,
                    filterResponseHeaders: u
                });
                return {
                    requestHeaders: o.filter((function(e) {
                        return -1 === a.indexOf(e.name.toLowerCase());
                    })).concat(c)
                };
            }
        }, u = function(e) {
            const t = i[e.requestId], n = e.responseHeaders;
            if (t && n) {
                const e = t.filterResponseHeaders;
                return {
                    responseHeaders: n.filter((function(t) {
                        return -1 === e.indexOf(t.name.toLowerCase());
                    }))
                };
            }
        }, l = function() {
            n && (n = !1, chrome.webRequest.onBeforeSendHeaders.removeListener(c, t, [ "blocking", "requestHeaders" ]), 
            chrome.webRequest.onHeadersReceived.removeListener(u, t, [ "blocking", "responseHeaders" ]), 
            chrome.webRequest.onResponseStarted.removeListener(a, t), chrome.webRequest.onErrorOccurred.removeListener(a, t), 
            o.debug("webRequest", "rm listener"));
        };
        let h = 10, f = !1;
        let p = null;
        const d = function(e) {
            return (null === p || e) && (p = !!(chrome.webRequest && chrome.webRequest.onBeforeSendHeaders && chrome.webRequest.onResponseStarted && chrome.webRequest.onErrorOccurred)), 
            p;
        }, m = /^user-agent$|^origin$|^cookie$/i;
        return {
            wrapHeaderKey: function(e, i) {
                if (d()) {
                    let s, l = 100;
                    for (;l-- > 0 && (s = "sf-" + parseInt(1e5 * Math.random()) + "_" + e, r[s]); ) ;
                    return r[s] = {
                        name: e,
                        value: i,
                        timer: setTimeout((function() {
                            delete r[s];
                        }), 3e3)
                    }, n || (n = !0, chrome.webRequest.onBeforeSendHeaders.addListener(c, t, [ "blocking", "requestHeaders" ]), 
                    chrome.webRequest.onHeadersReceived.addListener(u, t, [ "blocking", "responseHeaders" ]), 
                    chrome.webRequest.onResponseStarted.addListener(a, t), chrome.webRequest.onErrorOccurred.addListener(a, t), 
                    o.debug("webRequest", "add listener")), s;
                }
                return e;
            },
            isSpecialHeader: function(e) {
                return m.test(e);
            },
            requestPermission: function(e) {
                d() || f ? e(p) : chrome.permissions && chrome.permissions.request ? chrome.permissions.request({
                    permissions: [ "webRequest", "webRequestBlocking" ]
                }, (function(t) {
                    (t || h-- <= 0) && (f = !0), t && d(!0), e(p);
                })) : (f = !0, e(p));
            }
        };
    }();
    const s = n(5), a = function(e) {
        e = e.split(/\r?\n/);
        const t = {};
        return e.forEach((function(e) {
            const n = e.indexOf(":");
            if (-1 === n) return;
            const r = e.substr(0, n).trim().toLowerCase(), o = e.substr(n + 1).trim();
            t[r] = o;
        })), t;
    };
    t.a = function(e, t) {
        const n = {};
        let r = function(e, n) {
            r = null, h.timeoutTimer && clearTimeout(h.timeoutTimer);
            let i = null;
            e && (i = String(e.message || e) || "ERROR"), t && t(i, o(n), n);
        };
        const o = function(e) {
            const t = {};
            t.statusCode = p.status, t.statusText = p.statusText;
            let n = null;
            const r = p.getAllResponseHeaders();
            return "string" == typeof r && (n = a(r)), t.headers = n || {}, t.body = e, t.responseURL = p.responseURL, 
            t;
        };
        "object" != typeof e && (e = {
            url: e
        });
        let c = e.url, u = e.method || e.type || "GET";
        u = u.toUpperCase();
        let l = e.data;
        "string" != typeof l && (l = s.stringify(l)), l && "GET" === u && (c += (/\?/.test(c) ? "&" : "?") + l, 
        l = void 0), !1 === e.cache && -1 !== [ "GET", "HEAD" ].indexOf(u) && (c += (/\?/.test(c) ? "&" : "?") + "_=" + Date.now()), 
        e.headers = e.headers || {}, l && (e.headers["Content-Type"] = e.contentType || e.headers["Content-Type"] || "application/x-www-form-urlencoded; charset=UTF-8");
        const h = {};
        h.url = c, h.method = u, l && (h.data = l), e.json && (h.json = !0), e.xml && (h.xml = !0), 
        e.timeout && (h.timeout = e.timeout), e.mimeType && (h.mimeType = e.mimeType), e.withCredentials && (h.withCredentials = !0), 
        Object.keys(e.headers).length && (h.headers = e.headers), h.timeout > 0 && (h.timeoutTimer = setTimeout((function() {
            r && r(new Error("ETIMEDOUT")), p.abort();
        }), h.timeout));
        const f = {
            0: 200,
            1223: 204
        }, p = (e.localXHR, new XMLHttpRequest);
        p.open(h.method, h.url, !0), h.mimeType && p.overrideMimeType(h.mimeType), h.withCredentials && (p.withCredentials = !0);
        const d = [];
        for (let e in h.headers) i && i.isSpecialHeader(e) && d.push({
            key: e,
            value: h.headers[e]
        }), p.setRequestHeader(e, h.headers[e]);
        p.onload = function() {
            const e = f[p.status] || p.status;
            try {
                if (e >= 200 && e < 300 || 304 === e) {
                    let e = p.responseText;
                    if (h.json) e = JSON.parse(e); else if (h.xml) e = (new DOMParser).parseFromString(e, "text/xml"); else if ("string" != typeof e) throw console.error("Response is not string!", e), 
                    new Error("Response is not string!");
                    return r && r(null, e);
                }
                throw new Error(p.status + " " + p.statusText);
            } catch (e) {
                return r && r(e);
            }
        };
        const m = p.onerror = function() {
            r && r(new Error(p.status + " " + p.statusText));
        };
        let g = null;
        void 0 !== p.onabort ? p.onabort = m : g = function() {
            4 === p.readyState && r && setTimeout((function() {
                return m();
            }));
        }, g && (p.onreadystatechange = g);
        const y = function() {
            try {
                p.send(h.data || null);
            } catch (e) {
                setTimeout((function() {
                    r && r(e);
                }));
            }
        };
        if (i && d.length) {
            const e = function() {
                for (let e, t = 0; e = d[t]; t++) p.setRequestHeader(i.wrapHeaderKey(e.key, e.value), e.value);
            };
            i.requestPermission((function(t) {
                t && e(), r && y();
            }));
        } else y();
        return n.abort = function() {
            r = null, p.abort();
        }, n;
    };
}, function(e, t, n) {
    "use strict";
    var r = n(0);
    t.a = e => new Promise(t => r.a.storage.get(e, t));
}, function(e, t, n) {
    "use strict";
    t.decode = t.parse = n(43), t.encode = t.stringify = n(44);
}, function(e, t, n) {
    "use strict";
    var r = n(0);
    t.a = e => new Promise(t => r.a.storage.set(e, t));
}, function(e, t, n) {
    function r(e) {
        if (e) return function(e) {
            for (var t in r.prototype) e[t] = r.prototype[t];
            return e;
        }(e);
    }
    e.exports = r, r.prototype.on = r.prototype.addEventListener = function(e, t) {
        return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), 
        this;
    }, r.prototype.once = function(e, t) {
        function n() {
            this.off(e, n), t.apply(this, arguments);
        }
        return n.fn = t, this.on(e, n), this;
    }, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function(e, t) {
        if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, 
        this;
        var n, r = this._callbacks["$" + e];
        if (!r) return this;
        if (1 == arguments.length) return delete this._callbacks["$" + e], this;
        for (var o = 0; o < r.length; o++) if ((n = r[o]) === t || n.fn === t) {
            r.splice(o, 1);
            break;
        }
        return 0 === r.length && delete this._callbacks["$" + e], this;
    }, r.prototype.emit = function(e) {
        this._callbacks = this._callbacks || {};
        for (var t = new Array(arguments.length - 1), n = this._callbacks["$" + e], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        if (n) {
            r = 0;
            for (var o = (n = n.slice(0)).length; r < o; ++r) n[r].apply(this, t);
        }
        return this;
    }, r.prototype.listeners = function(e) {
        return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || [];
    }, r.prototype.hasListeners = function(e) {
        return !!this.listeners(e).length;
    };
}, function(e, t, n) {
    var r, o = n(68), i = n(29), s = n(70), a = n(71), c = n(72);
    "undefined" != typeof ArrayBuffer && (r = n(73));
    var u = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent), l = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent), h = u || l;
    t.protocol = 3;
    var f = t.packets = {
        open: 0,
        close: 1,
        ping: 2,
        pong: 3,
        message: 4,
        upgrade: 5,
        noop: 6
    }, p = o(f), d = {
        type: "error",
        data: "parser error"
    }, m = n(74);
    function g(e, t, n) {
        for (var r = new Array(e.length), o = a(e.length, n), i = function(e, n, o) {
            t(n, (function(t, n) {
                r[e] = n, o(t, r);
            }));
        }, s = 0; s < e.length; s++) i(s, e[s], o);
    }
    t.encodePacket = function(e, n, r, o) {
        "function" == typeof n && (o = n, n = !1), "function" == typeof r && (o = r, r = null);
        var i = void 0 === e.data ? void 0 : e.data.buffer || e.data;
        if ("undefined" != typeof ArrayBuffer && i instanceof ArrayBuffer) return function(e, n, r) {
            if (!n) return t.encodeBase64Packet(e, r);
            var o = e.data, i = new Uint8Array(o), s = new Uint8Array(1 + o.byteLength);
            s[0] = f[e.type];
            for (var a = 0; a < i.length; a++) s[a + 1] = i[a];
            return r(s.buffer);
        }(e, n, o);
        if (void 0 !== m && i instanceof m) return function(e, n, r) {
            if (!n) return t.encodeBase64Packet(e, r);
            if (h) return function(e, n, r) {
                if (!n) return t.encodeBase64Packet(e, r);
                var o = new FileReader;
                return o.onload = function() {
                    t.encodePacket({
                        type: e.type,
                        data: o.result
                    }, n, !0, r);
                }, o.readAsArrayBuffer(e.data);
            }(e, n, r);
            var o = new Uint8Array(1);
            o[0] = f[e.type];
            var i = new m([ o.buffer, e.data ]);
            return r(i);
        }(e, n, o);
        if (i && i.base64) return function(e, n) {
            var r = "b" + t.packets[e.type] + e.data.data;
            return n(r);
        }(e, o);
        var s = f[e.type];
        return void 0 !== e.data && (s += r ? c.encode(String(e.data), {
            strict: !1
        }) : String(e.data)), o("" + s);
    }, t.encodeBase64Packet = function(e, n) {
        var r, o = "b" + t.packets[e.type];
        if (void 0 !== m && e.data instanceof m) {
            var i = new FileReader;
            return i.onload = function() {
                var e = i.result.split(",")[1];
                n(o + e);
            }, i.readAsDataURL(e.data);
        }
        try {
            r = String.fromCharCode.apply(null, new Uint8Array(e.data));
        } catch (t) {
            for (var s = new Uint8Array(e.data), a = new Array(s.length), c = 0; c < s.length; c++) a[c] = s[c];
            r = String.fromCharCode.apply(null, a);
        }
        return o += btoa(r), n(o);
    }, t.decodePacket = function(e, n, r) {
        if (void 0 === e) return d;
        if ("string" == typeof e) {
            if ("b" === e.charAt(0)) return t.decodeBase64Packet(e.substr(1), n);
            if (r && !1 === (e = function(e) {
                try {
                    e = c.decode(e, {
                        strict: !1
                    });
                } catch (e) {
                    return !1;
                }
                return e;
            }(e))) return d;
            var o = e.charAt(0);
            return Number(o) == o && p[o] ? e.length > 1 ? {
                type: p[o],
                data: e.substring(1)
            } : {
                type: p[o]
            } : d;
        }
        o = new Uint8Array(e)[0];
        var i = s(e, 1);
        return m && "blob" === n && (i = new m([ i ])), {
            type: p[o],
            data: i
        };
    }, t.decodeBase64Packet = function(e, t) {
        var n = p[e.charAt(0)];
        if (!r) return {
            type: n,
            data: {
                base64: !0,
                data: e.substr(1)
            }
        };
        var o = r.decode(e.substr(1));
        return "blob" === t && m && (o = new m([ o ])), {
            type: n,
            data: o
        };
    }, t.encodePayload = function(e, n, r) {
        "function" == typeof n && (r = n, n = null);
        var o = i(e);
        if (n && o) return m && !h ? t.encodePayloadAsBlob(e, r) : t.encodePayloadAsArrayBuffer(e, r);
        if (!e.length) return r("0:");
        g(e, (function(e, r) {
            t.encodePacket(e, !!o && n, !1, (function(e) {
                r(null, function(e) {
                    return e.length + ":" + e;
                }(e));
            }));
        }), (function(e, t) {
            return r(t.join(""));
        }));
    }, t.decodePayload = function(e, n, r) {
        if ("string" != typeof e) return t.decodePayloadAsBinary(e, n, r);
        var o;
        if ("function" == typeof n && (r = n, n = null), "" === e) return r(d, 0, 1);
        for (var i, s, a = "", c = 0, u = e.length; c < u; c++) {
            var l = e.charAt(c);
            if (":" === l) {
                if ("" === a || a != (i = Number(a))) return r(d, 0, 1);
                if (a != (s = e.substr(c + 1, i)).length) return r(d, 0, 1);
                if (s.length) {
                    if (o = t.decodePacket(s, n, !1), d.type === o.type && d.data === o.data) return r(d, 0, 1);
                    if (!1 === r(o, c + i, u)) return;
                }
                c += i, a = "";
            } else a += l;
        }
        return "" !== a ? r(d, 0, 1) : void 0;
    }, t.encodePayloadAsArrayBuffer = function(e, n) {
        if (!e.length) return n(new ArrayBuffer(0));
        g(e, (function(e, n) {
            t.encodePacket(e, !0, !0, (function(e) {
                return n(null, e);
            }));
        }), (function(e, t) {
            var r = t.reduce((function(e, t) {
                var n;
                return e + (n = "string" == typeof t ? t.length : t.byteLength).toString().length + n + 2;
            }), 0), o = new Uint8Array(r), i = 0;
            return t.forEach((function(e) {
                var t = "string" == typeof e, n = e;
                if (t) {
                    for (var r = new Uint8Array(e.length), s = 0; s < e.length; s++) r[s] = e.charCodeAt(s);
                    n = r.buffer;
                }
                o[i++] = t ? 0 : 1;
                var a = n.byteLength.toString();
                for (s = 0; s < a.length; s++) o[i++] = parseInt(a[s]);
                o[i++] = 255;
                for (r = new Uint8Array(n), s = 0; s < r.length; s++) o[i++] = r[s];
            })), n(o.buffer);
        }));
    }, t.encodePayloadAsBlob = function(e, n) {
        g(e, (function(e, n) {
            t.encodePacket(e, !0, !0, (function(e) {
                var t = new Uint8Array(1);
                if (t[0] = 1, "string" == typeof e) {
                    for (var r = new Uint8Array(e.length), o = 0; o < e.length; o++) r[o] = e.charCodeAt(o);
                    e = r.buffer, t[0] = 0;
                }
                var i = (e instanceof ArrayBuffer ? e.byteLength : e.size).toString(), s = new Uint8Array(i.length + 1);
                for (o = 0; o < i.length; o++) s[o] = parseInt(i[o]);
                if (s[i.length] = 255, m) {
                    var a = new m([ t.buffer, s.buffer, e ]);
                    n(null, a);
                }
            }));
        }), (function(e, t) {
            return n(new m(t));
        }));
    }, t.decodePayloadAsBinary = function(e, n, r) {
        "function" == typeof n && (r = n, n = null);
        for (var o = e, i = []; o.byteLength > 0; ) {
            for (var a = new Uint8Array(o), c = 0 === a[0], u = "", l = 1; 255 !== a[l]; l++) {
                if (u.length > 310) return r(d, 0, 1);
                u += a[l];
            }
            o = s(o, 2 + u.length), u = parseInt(u);
            var h = s(o, 0, u);
            if (c) try {
                h = String.fromCharCode.apply(null, new Uint8Array(h));
            } catch (e) {
                var f = new Uint8Array(h);
                h = "";
                for (l = 0; l < f.length; l++) h += String.fromCharCode(f[l]);
            }
            i.push(h), o = s(o, u);
        }
        var p = i.length;
        i.forEach((function(e, o) {
            r(t.decodePacket(e, n, !0), o, p);
        }));
    };
}, function(e, t) {
    function n(t, r) {
        return e.exports = n = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e;
        }, e.exports.default = e.exports, e.exports.__esModule = !0, n(t, r);
    }
    e.exports = n, e.exports.default = e.exports, e.exports.__esModule = !0;
}, function(e, t, n) {
    (function(r) {
        function o() {
            var e;
            try {
                e = t.storage.debug;
            } catch (e) {}
            return !e && void 0 !== r && "env" in r && (e = r.env.DEBUG), e;
        }
        (t = e.exports = n(55)).log = function() {
            return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
        }, t.formatArgs = function(e) {
            var n = this.useColors;
            if (e[0] = (n ? "%c" : "") + this.namespace + (n ? " %c" : " ") + e[0] + (n ? "%c " : " ") + "+" + t.humanize(this.diff), 
            !n) return;
            var r = "color: " + this.color;
            e.splice(1, 0, r, "color: inherit");
            var o = 0, i = 0;
            e[0].replace(/%[a-zA-Z%]/g, (function(e) {
                "%%" !== e && (o++, "%c" === e && (i = o));
            })), e.splice(i, 0, r);
        }, t.save = function(e) {
            try {
                null == e ? t.storage.removeItem("debug") : t.storage.debug = e;
            } catch (e) {}
        }, t.load = o, t.useColors = function() {
            if ("undefined" != typeof window && window.process && "renderer" === window.process.type) return !0;
            if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
            return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
        }, t.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
            try {
                return window.localStorage;
            } catch (e) {}
        }(), t.colors = [ "#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33" ], 
        t.formatters.j = function(e) {
            try {
                return JSON.stringify(e);
            } catch (e) {
                return "[UnexpectedJSONParseError]: " + e.message;
            }
        }, t.enable(o());
    }).call(this, n(15));
}, function(e, t) {
    t.encode = function(e) {
        var t = "";
        for (var n in e) e.hasOwnProperty(n) && (t.length && (t += "&"), t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
        return t;
    }, t.decode = function(e) {
        for (var t = {}, n = e.split("&"), r = 0, o = n.length; r < o; r++) {
            var i = n[r].split("=");
            t[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
        }
        return t;
    };
}, function(e, t) {
    e.exports = function(e, t) {
        var n = function() {};
        n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e;
    };
}, function(e, t, n) {
    (function(r) {
        function o() {
            var e;
            try {
                e = t.storage.debug;
            } catch (e) {}
            return !e && void 0 !== r && "env" in r && (e = r.env.DEBUG), e;
        }
        (t = e.exports = n(75)).log = function() {
            return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
        }, t.formatArgs = function(e) {
            var n = this.useColors;
            if (e[0] = (n ? "%c" : "") + this.namespace + (n ? " %c" : " ") + e[0] + (n ? "%c " : " ") + "+" + t.humanize(this.diff), 
            !n) return;
            var r = "color: " + this.color;
            e.splice(1, 0, r, "color: inherit");
            var o = 0, i = 0;
            e[0].replace(/%[a-zA-Z%]/g, (function(e) {
                "%%" !== e && (o++, "%c" === e && (i = o));
            })), e.splice(i, 0, r);
        }, t.save = function(e) {
            try {
                null == e ? t.storage.removeItem("debug") : t.storage.debug = e;
            } catch (e) {}
        }, t.load = o, t.useColors = function() {
            if ("undefined" != typeof window && window.process && "renderer" === window.process.type) return !0;
            if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
            return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
        }, t.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
            try {
                return window.localStorage;
            } catch (e) {}
        }(), t.colors = [ "#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33" ], 
        t.formatters.j = function(e) {
            try {
                return JSON.stringify(e);
            } catch (e) {
                return "[UnexpectedJSONParseError]: " + e.message;
            }
        }, t.enable(o());
    }).call(this, n(15));
}, function(e, t, n) {
    "use strict";
    t.a = e => t => e.some(e => ((e, t) => {
        let n = e.matches.test(t);
        return n && e.exclude_matches && (n = !e.exclude_matches.test(t)), n && e.include_globs && (n = e.include_globs.test(t)), 
        n && e.exclude_globs && (n = !e.exclude_globs.test(t)), n;
    })(e, t));
}, function(e, t) {
    var n, r, o = e.exports = {};
    function i() {
        throw new Error("setTimeout has not been defined");
    }
    function s() {
        throw new Error("clearTimeout has not been defined");
    }
    function a(e) {
        if (n === setTimeout) return setTimeout(e, 0);
        if ((n === i || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);
        try {
            return n(e, 0);
        } catch (t) {
            try {
                return n.call(null, e, 0);
            } catch (t) {
                return n.call(this, e, 0);
            }
        }
    }
    !function() {
        try {
            n = "function" == typeof setTimeout ? setTimeout : i;
        } catch (e) {
            n = i;
        }
        try {
            r = "function" == typeof clearTimeout ? clearTimeout : s;
        } catch (e) {
            r = s;
        }
    }();
    var c, u = [], l = !1, h = -1;
    function f() {
        l && c && (l = !1, c.length ? u = c.concat(u) : h = -1, u.length && p());
    }
    function p() {
        if (!l) {
            var e = a(f);
            l = !0;
            for (var t = u.length; t; ) {
                for (c = u, u = []; ++h < t; ) c && c[h].run();
                h = -1, t = u.length;
            }
            c = null, l = !1, function(e) {
                if (r === clearTimeout) return clearTimeout(e);
                if ((r === s || !r) && clearTimeout) return r = clearTimeout, clearTimeout(e);
                try {
                    r(e);
                } catch (t) {
                    try {
                        return r.call(null, e);
                    } catch (t) {
                        return r.call(this, e);
                    }
                }
            }(e);
        }
    }
    function d(e, t) {
        this.fun = e, this.array = t;
    }
    function m() {}
    o.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        u.push(new d(e, t)), 1 !== u.length || l || a(p);
    }, d.prototype.run = function() {
        this.fun.apply(null, this.array);
    }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", 
    o.versions = {}, o.on = m, o.addListener = m, o.once = m, o.off = m, o.removeListener = m, 
    o.removeAllListeners = m, o.emit = m, o.prependListener = m, o.prependOnceListener = m, 
    o.listeners = function(e) {
        return [];
    }, o.binding = function(e) {
        throw new Error("process.binding is not supported");
    }, o.cwd = function() {
        return "/";
    }, o.chdir = function(e) {
        throw new Error("process.chdir is not supported");
    }, o.umask = function() {
        return 0;
    };
}, function(e, t, n) {
    var r = n(57)("socket.io-parser"), o = n(7), i = n(60), s = n(24), a = n(25);
    function c() {}
    t.protocol = 4, t.types = [ "CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK" ], 
    t.CONNECT = 0, t.DISCONNECT = 1, t.EVENT = 2, t.ACK = 3, t.ERROR = 4, t.BINARY_EVENT = 5, 
    t.BINARY_ACK = 6, t.Encoder = c, t.Decoder = h;
    var u = t.ERROR + '"encode error"';
    function l(e) {
        var n = "" + e.type;
        if (t.BINARY_EVENT !== e.type && t.BINARY_ACK !== e.type || (n += e.attachments + "-"), 
        e.nsp && "/" !== e.nsp && (n += e.nsp + ","), null != e.id && (n += e.id), null != e.data) {
            var o = function(e) {
                try {
                    return JSON.stringify(e);
                } catch (e) {
                    return !1;
                }
            }(e.data);
            if (!1 === o) return u;
            n += o;
        }
        return r("encoded %j as %s", e, n), n;
    }
    function h() {
        this.reconstructor = null;
    }
    function f(e) {
        this.reconPack = e, this.buffers = [];
    }
    function p(e) {
        return {
            type: t.ERROR,
            data: "parser error: " + e
        };
    }
    c.prototype.encode = function(e, n) {
        (r("encoding packet %j", e), t.BINARY_EVENT === e.type || t.BINARY_ACK === e.type) ? function(e, t) {
            i.removeBlobs(e, (function(e) {
                var n = i.deconstructPacket(e), r = l(n.packet), o = n.buffers;
                o.unshift(r), t(o);
            }));
        }(e, n) : n([ l(e) ]);
    }, o(h.prototype), h.prototype.add = function(e) {
        var n;
        if ("string" == typeof e) {
            if (this.reconstructor) throw new Error("got plaintext data when reconstructing a packet");
            n = function(e) {
                var n = 0, o = {
                    type: Number(e.charAt(0))
                };
                if (null == t.types[o.type]) return p("unknown packet type " + o.type);
                if (t.BINARY_EVENT === o.type || t.BINARY_ACK === o.type) {
                    for (var i = n + 1; "-" !== e.charAt(++n) && n != e.length; ) ;
                    var a = e.substring(i, n);
                    if (a != Number(a) || "-" !== e.charAt(n)) throw new Error("Illegal attachments");
                    o.attachments = Number(a);
                }
                if ("/" === e.charAt(n + 1)) {
                    for (i = n + 1; ++n; ) {
                        if ("," === (u = e.charAt(n))) break;
                        if (n === e.length) break;
                    }
                    o.nsp = e.substring(i, n);
                } else o.nsp = "/";
                var c = e.charAt(n + 1);
                if ("" !== c && Number(c) == c) {
                    for (i = n + 1; ++n; ) {
                        var u;
                        if (null == (u = e.charAt(n)) || Number(u) != u) {
                            --n;
                            break;
                        }
                        if (n === e.length) break;
                    }
                    o.id = Number(e.substring(i, n + 1));
                }
                if (e.charAt(++n)) {
                    var l = function(e) {
                        try {
                            return JSON.parse(e);
                        } catch (e) {
                            return !1;
                        }
                    }(e.substr(n));
                    if (!(!1 !== l && (o.type === t.ERROR || s(l)))) return p("invalid payload");
                    o.data = l;
                }
                return r("decoded %s as %j", e, o), o;
            }(e), t.BINARY_EVENT === n.type || t.BINARY_ACK === n.type ? (this.reconstructor = new f(n), 
            0 === this.reconstructor.reconPack.attachments && this.emit("decoded", n)) : this.emit("decoded", n);
        } else {
            if (!a(e) && !e.base64) throw new Error("Unknown type: " + e);
            if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
            (n = this.reconstructor.takeBinaryData(e)) && (this.reconstructor = null, this.emit("decoded", n));
        }
    }, h.prototype.destroy = function() {
        this.reconstructor && this.reconstructor.finishedReconstruction();
    }, f.prototype.takeBinaryData = function(e) {
        if (this.buffers.push(e), this.buffers.length === this.reconPack.attachments) {
            var t = i.reconstructPacket(this.reconPack, this.buffers);
            return this.finishedReconstruction(), t;
        }
        return null;
    }, f.prototype.finishedReconstruction = function() {
        this.reconPack = null, this.buffers = [];
    };
}, function(e, t, n) {
    "use strict";
    (function(e) {
        var r = n(61), o = n(62), i = n(63);
        function s() {
            return c.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
        }
        function a(e, t) {
            if (s() < t) throw new RangeError("Invalid typed array length");
            return c.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = c.prototype : (null === e && (e = new c(t)), 
            e.length = t), e;
        }
        function c(e, t, n) {
            if (!(c.TYPED_ARRAY_SUPPORT || this instanceof c)) return new c(e, t, n);
            if ("number" == typeof e) {
                if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
                return h(this, e);
            }
            return u(this, e, t, n);
        }
        function u(e, t, n, r) {
            if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
            return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? function(e, t, n, r) {
                if (t.byteLength, n < 0 || t.byteLength < n) throw new RangeError("'offset' is out of bounds");
                if (t.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
                t = void 0 === n && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t, n) : new Uint8Array(t, n, r);
                c.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = c.prototype : e = f(e, t);
                return e;
            }(e, t, n, r) : "string" == typeof t ? function(e, t, n) {
                "string" == typeof n && "" !== n || (n = "utf8");
                if (!c.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
                var r = 0 | d(t, n), o = (e = a(e, r)).write(t, n);
                o !== r && (e = e.slice(0, o));
                return e;
            }(e, t, n) : function(e, t) {
                if (c.isBuffer(t)) {
                    var n = 0 | p(t.length);
                    return 0 === (e = a(e, n)).length || t.copy(e, 0, 0, n), e;
                }
                if (t) {
                    if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || (r = t.length) != r ? a(e, 0) : f(e, t);
                    if ("Buffer" === t.type && i(t.data)) return f(e, t.data);
                }
                var r;
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
            }(e, t);
        }
        function l(e) {
            if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
            if (e < 0) throw new RangeError('"size" argument must not be negative');
        }
        function h(e, t) {
            if (l(t), e = a(e, t < 0 ? 0 : 0 | p(t)), !c.TYPED_ARRAY_SUPPORT) for (var n = 0; n < t; ++n) e[n] = 0;
            return e;
        }
        function f(e, t) {
            var n = t.length < 0 ? 0 : 0 | p(t.length);
            e = a(e, n);
            for (var r = 0; r < n; r += 1) e[r] = 255 & t[r];
            return e;
        }
        function p(e) {
            if (e >= s()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s().toString(16) + " bytes");
            return 0 | e;
        }
        function d(e, t) {
            if (c.isBuffer(e)) return e.length;
            if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
            "string" != typeof e && (e = "" + e);
            var n = e.length;
            if (0 === n) return 0;
            for (var r = !1; ;) switch (t) {
              case "ascii":
              case "latin1":
              case "binary":
                return n;

              case "utf8":
              case "utf-8":
              case void 0:
                return B(e).length;

              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return 2 * n;

              case "hex":
                return n >>> 1;

              case "base64":
                return q(e).length;

              default:
                if (r) return B(e).length;
                t = ("" + t).toLowerCase(), r = !0;
            }
        }
        function m(e, t, n) {
            var r = !1;
            if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
            if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
            if ((n >>>= 0) <= (t >>>= 0)) return "";
            for (e || (e = "utf8"); ;) switch (e) {
              case "hex":
                return T(this, t, n);

              case "utf8":
              case "utf-8":
                return E(this, t, n);

              case "ascii":
                return S(this, t, n);

              case "latin1":
              case "binary":
                return _(this, t, n);

              case "base64":
                return A(this, t, n);

              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return R(this, t, n);

              default:
                if (r) throw new TypeError("Unknown encoding: " + e);
                e = (e + "").toLowerCase(), r = !0;
            }
        }
        function g(e, t, n) {
            var r = e[t];
            e[t] = e[n], e[n] = r;
        }
        function y(e, t, n, r, o) {
            if (0 === e.length) return -1;
            if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), 
            n = +n, isNaN(n) && (n = o ? 0 : e.length - 1), n < 0 && (n = e.length + n), n >= e.length) {
                if (o) return -1;
                n = e.length - 1;
            } else if (n < 0) {
                if (!o) return -1;
                n = 0;
            }
            if ("string" == typeof t && (t = c.from(t, r)), c.isBuffer(t)) return 0 === t.length ? -1 : v(e, t, n, r, o);
            if ("number" == typeof t) return t &= 255, c.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : v(e, [ t ], n, r, o);
            throw new TypeError("val must be string, number or Buffer");
        }
        function v(e, t, n, r, o) {
            var i, s = 1, a = e.length, c = t.length;
            if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                if (e.length < 2 || t.length < 2) return -1;
                s = 2, a /= 2, c /= 2, n /= 2;
            }
            function u(e, t) {
                return 1 === s ? e[t] : e.readUInt16BE(t * s);
            }
            if (o) {
                var l = -1;
                for (i = n; i < a; i++) if (u(e, i) === u(t, -1 === l ? 0 : i - l)) {
                    if (-1 === l && (l = i), i - l + 1 === c) return l * s;
                } else -1 !== l && (i -= i - l), l = -1;
            } else for (n + c > a && (n = a - c), i = n; i >= 0; i--) {
                for (var h = !0, f = 0; f < c; f++) if (u(e, i + f) !== u(t, f)) {
                    h = !1;
                    break;
                }
                if (h) return i;
            }
            return -1;
        }
        function b(e, t, n, r) {
            n = Number(n) || 0;
            var o = e.length - n;
            r ? (r = Number(r)) > o && (r = o) : r = o;
            var i = t.length;
            if (i % 2 != 0) throw new TypeError("Invalid hex string");
            r > i / 2 && (r = i / 2);
            for (var s = 0; s < r; ++s) {
                var a = parseInt(t.substr(2 * s, 2), 16);
                if (isNaN(a)) return s;
                e[n + s] = a;
            }
            return s;
        }
        function w(e, t, n, r) {
            return $(B(t, e.length - n), e, n, r);
        }
        function k(e, t, n, r) {
            return $(function(e) {
                for (var t = [], n = 0; n < e.length; ++n) t.push(255 & e.charCodeAt(n));
                return t;
            }(t), e, n, r);
        }
        function C(e, t, n, r) {
            return k(e, t, n, r);
        }
        function x(e, t, n, r) {
            return $(q(t), e, n, r);
        }
        function O(e, t, n, r) {
            return $(function(e, t) {
                for (var n, r, o, i = [], s = 0; s < e.length && !((t -= 2) < 0); ++s) n = e.charCodeAt(s), 
                r = n >> 8, o = n % 256, i.push(o), i.push(r);
                return i;
            }(t, e.length - n), e, n, r);
        }
        function A(e, t, n) {
            return 0 === t && n === e.length ? r.fromByteArray(e) : r.fromByteArray(e.slice(t, n));
        }
        function E(e, t, n) {
            n = Math.min(e.length, n);
            for (var r = [], o = t; o < n; ) {
                var i, s, a, c, u = e[o], l = null, h = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
                if (o + h <= n) switch (h) {
                  case 1:
                    u < 128 && (l = u);
                    break;

                  case 2:
                    128 == (192 & (i = e[o + 1])) && (c = (31 & u) << 6 | 63 & i) > 127 && (l = c);
                    break;

                  case 3:
                    i = e[o + 1], s = e[o + 2], 128 == (192 & i) && 128 == (192 & s) && (c = (15 & u) << 12 | (63 & i) << 6 | 63 & s) > 2047 && (c < 55296 || c > 57343) && (l = c);
                    break;

                  case 4:
                    i = e[o + 1], s = e[o + 2], a = e[o + 3], 128 == (192 & i) && 128 == (192 & s) && 128 == (192 & a) && (c = (15 & u) << 18 | (63 & i) << 12 | (63 & s) << 6 | 63 & a) > 65535 && c < 1114112 && (l = c);
                }
                null === l ? (l = 65533, h = 1) : l > 65535 && (l -= 65536, r.push(l >>> 10 & 1023 | 55296), 
                l = 56320 | 1023 & l), r.push(l), o += h;
            }
            return function(e) {
                var t = e.length;
                if (t <= 4096) return String.fromCharCode.apply(String, e);
                var n = "", r = 0;
                for (;r < t; ) n += String.fromCharCode.apply(String, e.slice(r, r += 4096));
                return n;
            }(r);
        }
        t.Buffer = c, t.SlowBuffer = function(e) {
            +e != e && (e = 0);
            return c.alloc(+e);
        }, t.INSPECT_MAX_BYTES = 50, c.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : function() {
            try {
                var e = new Uint8Array(1);
                return e.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function() {
                        return 42;
                    }
                }, 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength;
            } catch (e) {
                return !1;
            }
        }(), t.kMaxLength = s(), c.poolSize = 8192, c._augment = function(e) {
            return e.__proto__ = c.prototype, e;
        }, c.from = function(e, t, n) {
            return u(null, e, t, n);
        }, c.TYPED_ARRAY_SUPPORT && (c.prototype.__proto__ = Uint8Array.prototype, c.__proto__ = Uint8Array, 
        "undefined" != typeof Symbol && Symbol.species && c[Symbol.species] === c && Object.defineProperty(c, Symbol.species, {
            value: null,
            configurable: !0
        })), c.alloc = function(e, t, n) {
            return function(e, t, n, r) {
                return l(t), t <= 0 ? a(e, t) : void 0 !== n ? "string" == typeof r ? a(e, t).fill(n, r) : a(e, t).fill(n) : a(e, t);
            }(null, e, t, n);
        }, c.allocUnsafe = function(e) {
            return h(null, e);
        }, c.allocUnsafeSlow = function(e) {
            return h(null, e);
        }, c.isBuffer = function(e) {
            return !(null == e || !e._isBuffer);
        }, c.compare = function(e, t) {
            if (!c.isBuffer(e) || !c.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
            if (e === t) return 0;
            for (var n = e.length, r = t.length, o = 0, i = Math.min(n, r); o < i; ++o) if (e[o] !== t[o]) {
                n = e[o], r = t[o];
                break;
            }
            return n < r ? -1 : r < n ? 1 : 0;
        }, c.isEncoding = function(e) {
            switch (String(e).toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "latin1":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return !0;

              default:
                return !1;
            }
        }, c.concat = function(e, t) {
            if (!i(e)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === e.length) return c.alloc(0);
            var n;
            if (void 0 === t) for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
            var r = c.allocUnsafe(t), o = 0;
            for (n = 0; n < e.length; ++n) {
                var s = e[n];
                if (!c.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
                s.copy(r, o), o += s.length;
            }
            return r;
        }, c.byteLength = d, c.prototype._isBuffer = !0, c.prototype.swap16 = function() {
            var e = this.length;
            if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var t = 0; t < e; t += 2) g(this, t, t + 1);
            return this;
        }, c.prototype.swap32 = function() {
            var e = this.length;
            if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var t = 0; t < e; t += 4) g(this, t, t + 3), g(this, t + 1, t + 2);
            return this;
        }, c.prototype.swap64 = function() {
            var e = this.length;
            if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var t = 0; t < e; t += 8) g(this, t, t + 7), g(this, t + 1, t + 6), g(this, t + 2, t + 5), 
            g(this, t + 3, t + 4);
            return this;
        }, c.prototype.toString = function() {
            var e = 0 | this.length;
            return 0 === e ? "" : 0 === arguments.length ? E(this, 0, e) : m.apply(this, arguments);
        }, c.prototype.equals = function(e) {
            if (!c.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
            return this === e || 0 === c.compare(this, e);
        }, c.prototype.inspect = function() {
            var e = "", n = t.INSPECT_MAX_BYTES;
            return this.length > 0 && (e = this.toString("hex", 0, n).match(/.{2}/g).join(" "), 
            this.length > n && (e += " ... ")), "<Buffer " + e + ">";
        }, c.prototype.compare = function(e, t, n, r, o) {
            if (!c.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
            if (void 0 === t && (t = 0), void 0 === n && (n = e ? e.length : 0), void 0 === r && (r = 0), 
            void 0 === o && (o = this.length), t < 0 || n > e.length || r < 0 || o > this.length) throw new RangeError("out of range index");
            if (r >= o && t >= n) return 0;
            if (r >= o) return -1;
            if (t >= n) return 1;
            if (this === e) return 0;
            for (var i = (o >>>= 0) - (r >>>= 0), s = (n >>>= 0) - (t >>>= 0), a = Math.min(i, s), u = this.slice(r, o), l = e.slice(t, n), h = 0; h < a; ++h) if (u[h] !== l[h]) {
                i = u[h], s = l[h];
                break;
            }
            return i < s ? -1 : s < i ? 1 : 0;
        }, c.prototype.includes = function(e, t, n) {
            return -1 !== this.indexOf(e, t, n);
        }, c.prototype.indexOf = function(e, t, n) {
            return y(this, e, t, n, !0);
        }, c.prototype.lastIndexOf = function(e, t, n) {
            return y(this, e, t, n, !1);
        }, c.prototype.write = function(e, t, n, r) {
            if (void 0 === t) r = "utf8", n = this.length, t = 0; else if (void 0 === n && "string" == typeof t) r = t, 
            n = this.length, t = 0; else {
                if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                t |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0);
            }
            var o = this.length - t;
            if ((void 0 === n || n > o) && (n = o), e.length > 0 && (n < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
            r || (r = "utf8");
            for (var i = !1; ;) switch (r) {
              case "hex":
                return b(this, e, t, n);

              case "utf8":
              case "utf-8":
                return w(this, e, t, n);

              case "ascii":
                return k(this, e, t, n);

              case "latin1":
              case "binary":
                return C(this, e, t, n);

              case "base64":
                return x(this, e, t, n);

              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return O(this, e, t, n);

              default:
                if (i) throw new TypeError("Unknown encoding: " + r);
                r = ("" + r).toLowerCase(), i = !0;
            }
        }, c.prototype.toJSON = function() {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            };
        };
        function S(e, t, n) {
            var r = "";
            n = Math.min(e.length, n);
            for (var o = t; o < n; ++o) r += String.fromCharCode(127 & e[o]);
            return r;
        }
        function _(e, t, n) {
            var r = "";
            n = Math.min(e.length, n);
            for (var o = t; o < n; ++o) r += String.fromCharCode(e[o]);
            return r;
        }
        function T(e, t, n) {
            var r = e.length;
            (!t || t < 0) && (t = 0), (!n || n < 0 || n > r) && (n = r);
            for (var o = "", i = t; i < n; ++i) o += D(e[i]);
            return o;
        }
        function R(e, t, n) {
            for (var r = e.slice(t, n), o = "", i = 0; i < r.length; i += 2) o += String.fromCharCode(r[i] + 256 * r[i + 1]);
            return o;
        }
        function L(e, t, n) {
            if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
            if (e + t > n) throw new RangeError("Trying to access beyond buffer length");
        }
        function F(e, t, n, r, o, i) {
            if (!c.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (t > o || t < i) throw new RangeError('"value" argument is out of bounds');
            if (n + r > e.length) throw new RangeError("Index out of range");
        }
        function I(e, t, n, r) {
            t < 0 && (t = 65535 + t + 1);
            for (var o = 0, i = Math.min(e.length - n, 2); o < i; ++o) e[n + o] = (t & 255 << 8 * (r ? o : 1 - o)) >>> 8 * (r ? o : 1 - o);
        }
        function j(e, t, n, r) {
            t < 0 && (t = 4294967295 + t + 1);
            for (var o = 0, i = Math.min(e.length - n, 4); o < i; ++o) e[n + o] = t >>> 8 * (r ? o : 3 - o) & 255;
        }
        function P(e, t, n, r, o, i) {
            if (n + r > e.length) throw new RangeError("Index out of range");
            if (n < 0) throw new RangeError("Index out of range");
        }
        function U(e, t, n, r, i) {
            return i || P(e, 0, n, 4), o.write(e, t, n, r, 23, 4), n + 4;
        }
        function M(e, t, n, r, i) {
            return i || P(e, 0, n, 8), o.write(e, t, n, r, 52, 8), n + 8;
        }
        c.prototype.slice = function(e, t) {
            var n, r = this.length;
            if ((e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), (t = void 0 === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), 
            t < e && (t = e), c.TYPED_ARRAY_SUPPORT) (n = this.subarray(e, t)).__proto__ = c.prototype; else {
                var o = t - e;
                n = new c(o, void 0);
                for (var i = 0; i < o; ++i) n[i] = this[i + e];
            }
            return n;
        }, c.prototype.readUIntLE = function(e, t, n) {
            e |= 0, t |= 0, n || L(e, t, this.length);
            for (var r = this[e], o = 1, i = 0; ++i < t && (o *= 256); ) r += this[e + i] * o;
            return r;
        }, c.prototype.readUIntBE = function(e, t, n) {
            e |= 0, t |= 0, n || L(e, t, this.length);
            for (var r = this[e + --t], o = 1; t > 0 && (o *= 256); ) r += this[e + --t] * o;
            return r;
        }, c.prototype.readUInt8 = function(e, t) {
            return t || L(e, 1, this.length), this[e];
        }, c.prototype.readUInt16LE = function(e, t) {
            return t || L(e, 2, this.length), this[e] | this[e + 1] << 8;
        }, c.prototype.readUInt16BE = function(e, t) {
            return t || L(e, 2, this.length), this[e] << 8 | this[e + 1];
        }, c.prototype.readUInt32LE = function(e, t) {
            return t || L(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];
        }, c.prototype.readUInt32BE = function(e, t) {
            return t || L(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
        }, c.prototype.readIntLE = function(e, t, n) {
            e |= 0, t |= 0, n || L(e, t, this.length);
            for (var r = this[e], o = 1, i = 0; ++i < t && (o *= 256); ) r += this[e + i] * o;
            return r >= (o *= 128) && (r -= Math.pow(2, 8 * t)), r;
        }, c.prototype.readIntBE = function(e, t, n) {
            e |= 0, t |= 0, n || L(e, t, this.length);
            for (var r = t, o = 1, i = this[e + --r]; r > 0 && (o *= 256); ) i += this[e + --r] * o;
            return i >= (o *= 128) && (i -= Math.pow(2, 8 * t)), i;
        }, c.prototype.readInt8 = function(e, t) {
            return t || L(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];
        }, c.prototype.readInt16LE = function(e, t) {
            t || L(e, 2, this.length);
            var n = this[e] | this[e + 1] << 8;
            return 32768 & n ? 4294901760 | n : n;
        }, c.prototype.readInt16BE = function(e, t) {
            t || L(e, 2, this.length);
            var n = this[e + 1] | this[e] << 8;
            return 32768 & n ? 4294901760 | n : n;
        }, c.prototype.readInt32LE = function(e, t) {
            return t || L(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
        }, c.prototype.readInt32BE = function(e, t) {
            return t || L(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
        }, c.prototype.readFloatLE = function(e, t) {
            return t || L(e, 4, this.length), o.read(this, e, !0, 23, 4);
        }, c.prototype.readFloatBE = function(e, t) {
            return t || L(e, 4, this.length), o.read(this, e, !1, 23, 4);
        }, c.prototype.readDoubleLE = function(e, t) {
            return t || L(e, 8, this.length), o.read(this, e, !0, 52, 8);
        }, c.prototype.readDoubleBE = function(e, t) {
            return t || L(e, 8, this.length), o.read(this, e, !1, 52, 8);
        }, c.prototype.writeUIntLE = function(e, t, n, r) {
            (e = +e, t |= 0, n |= 0, r) || F(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
            var o = 1, i = 0;
            for (this[t] = 255 & e; ++i < n && (o *= 256); ) this[t + i] = e / o & 255;
            return t + n;
        }, c.prototype.writeUIntBE = function(e, t, n, r) {
            (e = +e, t |= 0, n |= 0, r) || F(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
            var o = n - 1, i = 1;
            for (this[t + o] = 255 & e; --o >= 0 && (i *= 256); ) this[t + o] = e / i & 255;
            return t + n;
        }, c.prototype.writeUInt8 = function(e, t, n) {
            return e = +e, t |= 0, n || F(this, e, t, 1, 255, 0), c.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), 
            this[t] = 255 & e, t + 1;
        }, c.prototype.writeUInt16LE = function(e, t, n) {
            return e = +e, t |= 0, n || F(this, e, t, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, 
            this[t + 1] = e >>> 8) : I(this, e, t, !0), t + 2;
        }, c.prototype.writeUInt16BE = function(e, t, n) {
            return e = +e, t |= 0, n || F(this, e, t, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, 
            this[t + 1] = 255 & e) : I(this, e, t, !1), t + 2;
        }, c.prototype.writeUInt32LE = function(e, t, n) {
            return e = +e, t |= 0, n || F(this, e, t, 4, 4294967295, 0), c.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, 
            this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : j(this, e, t, !0), 
            t + 4;
        }, c.prototype.writeUInt32BE = function(e, t, n) {
            return e = +e, t |= 0, n || F(this, e, t, 4, 4294967295, 0), c.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, 
            this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : j(this, e, t, !1), 
            t + 4;
        }, c.prototype.writeIntLE = function(e, t, n, r) {
            if (e = +e, t |= 0, !r) {
                var o = Math.pow(2, 8 * n - 1);
                F(this, e, t, n, o - 1, -o);
            }
            var i = 0, s = 1, a = 0;
            for (this[t] = 255 & e; ++i < n && (s *= 256); ) e < 0 && 0 === a && 0 !== this[t + i - 1] && (a = 1), 
            this[t + i] = (e / s >> 0) - a & 255;
            return t + n;
        }, c.prototype.writeIntBE = function(e, t, n, r) {
            if (e = +e, t |= 0, !r) {
                var o = Math.pow(2, 8 * n - 1);
                F(this, e, t, n, o - 1, -o);
            }
            var i = n - 1, s = 1, a = 0;
            for (this[t + i] = 255 & e; --i >= 0 && (s *= 256); ) e < 0 && 0 === a && 0 !== this[t + i + 1] && (a = 1), 
            this[t + i] = (e / s >> 0) - a & 255;
            return t + n;
        }, c.prototype.writeInt8 = function(e, t, n) {
            return e = +e, t |= 0, n || F(this, e, t, 1, 127, -128), c.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), 
            e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1;
        }, c.prototype.writeInt16LE = function(e, t, n) {
            return e = +e, t |= 0, n || F(this, e, t, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, 
            this[t + 1] = e >>> 8) : I(this, e, t, !0), t + 2;
        }, c.prototype.writeInt16BE = function(e, t, n) {
            return e = +e, t |= 0, n || F(this, e, t, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, 
            this[t + 1] = 255 & e) : I(this, e, t, !1), t + 2;
        }, c.prototype.writeInt32LE = function(e, t, n) {
            return e = +e, t |= 0, n || F(this, e, t, 4, 2147483647, -2147483648), c.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, 
            this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : j(this, e, t, !0), 
            t + 4;
        }, c.prototype.writeInt32BE = function(e, t, n) {
            return e = +e, t |= 0, n || F(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), 
            c.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, 
            this[t + 3] = 255 & e) : j(this, e, t, !1), t + 4;
        }, c.prototype.writeFloatLE = function(e, t, n) {
            return U(this, e, t, !0, n);
        }, c.prototype.writeFloatBE = function(e, t, n) {
            return U(this, e, t, !1, n);
        }, c.prototype.writeDoubleLE = function(e, t, n) {
            return M(this, e, t, !0, n);
        }, c.prototype.writeDoubleBE = function(e, t, n) {
            return M(this, e, t, !1, n);
        }, c.prototype.copy = function(e, t, n, r) {
            if (n || (n = 0), r || 0 === r || (r = this.length), t >= e.length && (t = e.length), 
            t || (t = 0), r > 0 && r < n && (r = n), r === n) return 0;
            if (0 === e.length || 0 === this.length) return 0;
            if (t < 0) throw new RangeError("targetStart out of bounds");
            if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
            if (r < 0) throw new RangeError("sourceEnd out of bounds");
            r > this.length && (r = this.length), e.length - t < r - n && (r = e.length - t + n);
            var o, i = r - n;
            if (this === e && n < t && t < r) for (o = i - 1; o >= 0; --o) e[o + t] = this[o + n]; else if (i < 1e3 || !c.TYPED_ARRAY_SUPPORT) for (o = 0; o < i; ++o) e[o + t] = this[o + n]; else Uint8Array.prototype.set.call(e, this.subarray(n, n + i), t);
            return i;
        }, c.prototype.fill = function(e, t, n, r) {
            if ("string" == typeof e) {
                if ("string" == typeof t ? (r = t, t = 0, n = this.length) : "string" == typeof n && (r = n, 
                n = this.length), 1 === e.length) {
                    var o = e.charCodeAt(0);
                    o < 256 && (e = o);
                }
                if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                if ("string" == typeof r && !c.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
            } else "number" == typeof e && (e &= 255);
            if (t < 0 || this.length < t || this.length < n) throw new RangeError("Out of range index");
            if (n <= t) return this;
            var i;
            if (t >>>= 0, n = void 0 === n ? this.length : n >>> 0, e || (e = 0), "number" == typeof e) for (i = t; i < n; ++i) this[i] = e; else {
                var s = c.isBuffer(e) ? e : B(new c(e, r).toString()), a = s.length;
                for (i = 0; i < n - t; ++i) this[i + t] = s[i % a];
            }
            return this;
        };
        var N = /[^+\/0-9A-Za-z-_]/g;
        function D(e) {
            return e < 16 ? "0" + e.toString(16) : e.toString(16);
        }
        function B(e, t) {
            var n;
            t = t || 1 / 0;
            for (var r = e.length, o = null, i = [], s = 0; s < r; ++s) {
                if ((n = e.charCodeAt(s)) > 55295 && n < 57344) {
                    if (!o) {
                        if (n > 56319) {
                            (t -= 3) > -1 && i.push(239, 191, 189);
                            continue;
                        }
                        if (s + 1 === r) {
                            (t -= 3) > -1 && i.push(239, 191, 189);
                            continue;
                        }
                        o = n;
                        continue;
                    }
                    if (n < 56320) {
                        (t -= 3) > -1 && i.push(239, 191, 189), o = n;
                        continue;
                    }
                    n = 65536 + (o - 55296 << 10 | n - 56320);
                } else o && (t -= 3) > -1 && i.push(239, 191, 189);
                if (o = null, n < 128) {
                    if ((t -= 1) < 0) break;
                    i.push(n);
                } else if (n < 2048) {
                    if ((t -= 2) < 0) break;
                    i.push(n >> 6 | 192, 63 & n | 128);
                } else if (n < 65536) {
                    if ((t -= 3) < 0) break;
                    i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128);
                } else {
                    if (!(n < 1114112)) throw new Error("Invalid code point");
                    if ((t -= 4) < 0) break;
                    i.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128);
                }
            }
            return i;
        }
        function q(e) {
            return r.toByteArray(function(e) {
                if ((e = function(e) {
                    return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
                }(e).replace(N, "")).length < 2) return "";
                for (;e.length % 4 != 0; ) e += "=";
                return e;
            }(e));
        }
        function $(e, t, n, r) {
            for (var o = 0; o < r && !(o + n >= t.length || o >= e.length); ++o) t[o + n] = e[o];
            return o;
        }
    }).call(this, n(21));
}, function(e, t, n) {
    var r = n(66), o = n(19);
    e.exports = function(e) {
        var t = e.xdomain, n = e.xscheme, i = e.enablesXDR;
        try {
            if ("undefined" != typeof XMLHttpRequest && (!t || r)) return new XMLHttpRequest;
        } catch (e) {}
        try {
            if ("undefined" != typeof XDomainRequest && !n && i) return new XDomainRequest;
        } catch (e) {}
        if (!t) try {
            return new (o[[ "Active" ].concat("Object").join("X")])("Microsoft.XMLHTTP");
        } catch (e) {}
    };
}, function(e, t) {
    e.exports = "undefined" != typeof self ? self : "undefined" != typeof window ? window : Function("return this")();
}, function(e, t, n) {
    var r = n(8), o = n(7);
    function i(e) {
        this.path = e.path, this.hostname = e.hostname, this.port = e.port, this.secure = e.secure, 
        this.query = e.query, this.timestampParam = e.timestampParam, this.timestampRequests = e.timestampRequests, 
        this.readyState = "", this.agent = e.agent || !1, this.socket = e.socket, this.enablesXDR = e.enablesXDR, 
        this.withCredentials = e.withCredentials, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, 
        this.cert = e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized, 
        this.forceNode = e.forceNode, this.isReactNative = e.isReactNative, this.extraHeaders = e.extraHeaders, 
        this.localAddress = e.localAddress;
    }
    e.exports = i, o(i.prototype), i.prototype.onError = function(e, t) {
        var n = new Error(e);
        return n.type = "TransportError", n.description = t, this.emit("error", n), this;
    }, i.prototype.open = function() {
        return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", 
        this.doOpen()), this;
    }, i.prototype.close = function() {
        return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), 
        this.onClose()), this;
    }, i.prototype.send = function(e) {
        if ("open" !== this.readyState) throw new Error("Transport not open");
        this.write(e);
    }, i.prototype.onOpen = function() {
        this.readyState = "open", this.writable = !0, this.emit("open");
    }, i.prototype.onData = function(e) {
        var t = r.decodePacket(e, this.socket.binaryType);
        this.onPacket(t);
    }, i.prototype.onPacket = function(e) {
        this.emit("packet", e);
    }, i.prototype.onClose = function() {
        this.readyState = "closed", this.emit("close");
    };
}, function(e, t) {
    var n;
    n = function() {
        return this;
    }();
    try {
        n = n || new Function("return this")();
    } catch (e) {
        "object" == typeof window && (n = window);
    }
    e.exports = n;
}, function(e, t) {
    function n(e) {
        e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, 
        this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0;
    }
    e.exports = n, n.prototype.duration = function() {
        var e = this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
            var t = Math.random(), n = Math.floor(t * this.jitter * e);
            e = 0 == (1 & Math.floor(10 * t)) ? e - n : e + n;
        }
        return 0 | Math.min(e, this.max);
    }, n.prototype.reset = function() {
        this.attempts = 0;
    }, n.prototype.setMin = function(e) {
        this.ms = e;
    }, n.prototype.setMax = function(e) {
        this.max = e;
    }, n.prototype.setJitter = function(e) {
        this.jitter = e;
    };
}, function(e, t) {
    var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, r = [ "source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor" ];
    e.exports = function(e) {
        var t = e, o = e.indexOf("["), i = e.indexOf("]");
        -1 != o && -1 != i && (e = e.substring(0, o) + e.substring(o, i).replace(/:/g, ";") + e.substring(i, e.length));
        for (var s, a, c = n.exec(e || ""), u = {}, l = 14; l--; ) u[r[l]] = c[l] || "";
        return -1 != o && -1 != i && (u.source = t, u.host = u.host.substring(1, u.host.length - 1).replace(/;/g, ":"), 
        u.authority = u.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), 
        u.ipv6uri = !0), u.pathNames = function(e, t) {
            var n = t.replace(/\/{2,9}/g, "/").split("/");
            "/" != t.substr(0, 1) && 0 !== t.length || n.splice(0, 1);
            "/" == t.substr(t.length - 1, 1) && n.splice(n.length - 1, 1);
            return n;
        }(0, u.path), u.queryKey = (s = u.query, a = {}, s.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, (function(e, t, n) {
            t && (a[t] = n);
        })), a), u;
    };
}, function(e, t) {
    var n = {}.toString;
    e.exports = Array.isArray || function(e) {
        return "[object Array]" == n.call(e);
    };
}, function(e, t, n) {
    (function(t) {
        e.exports = function(e) {
            return n && t.isBuffer(e) || r && (e instanceof ArrayBuffer || function(e) {
                return "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(e) : e.buffer instanceof ArrayBuffer;
            }(e));
        };
        var n = "function" == typeof t && "function" == typeof t.isBuffer, r = "function" == typeof ArrayBuffer;
    }).call(this, n(17).Buffer);
}, function(e, t, n) {
    var r = n(64), o = n(32), i = n(7), s = n(16), a = n(33), c = n(34), u = n(10)("socket.io-client:manager"), l = n(31), h = n(22), f = Object.prototype.hasOwnProperty;
    function p(e, t) {
        if (!(this instanceof p)) return new p(e, t);
        e && "object" == typeof e && (t = e, e = void 0), (t = t || {}).path = t.path || "/socket.io", 
        this.nsps = {}, this.subs = [], this.opts = t, this.reconnection(!1 !== t.reconnection), 
        this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0), this.reconnectionDelay(t.reconnectionDelay || 1e3), 
        this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3), this.randomizationFactor(t.randomizationFactor || .5), 
        this.backoff = new h({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor()
        }), this.timeout(null == t.timeout ? 2e4 : t.timeout), this.readyState = "closed", 
        this.uri = e, this.connecting = [], this.lastPing = null, this.encoding = !1, this.packetBuffer = [];
        var n = t.parser || s;
        this.encoder = new n.Encoder, this.decoder = new n.Decoder, this.autoConnect = !1 !== t.autoConnect, 
        this.autoConnect && this.open();
    }
    e.exports = p, p.prototype.emitAll = function() {
        for (var e in this.emit.apply(this, arguments), this.nsps) f.call(this.nsps, e) && this.nsps[e].emit.apply(this.nsps[e], arguments);
    }, p.prototype.updateSocketIds = function() {
        for (var e in this.nsps) f.call(this.nsps, e) && (this.nsps[e].id = this.generateId(e));
    }, p.prototype.generateId = function(e) {
        return ("/" === e ? "" : e + "#") + this.engine.id;
    }, i(p.prototype), p.prototype.reconnection = function(e) {
        return arguments.length ? (this._reconnection = !!e, this) : this._reconnection;
    }, p.prototype.reconnectionAttempts = function(e) {
        return arguments.length ? (this._reconnectionAttempts = e, this) : this._reconnectionAttempts;
    }, p.prototype.reconnectionDelay = function(e) {
        return arguments.length ? (this._reconnectionDelay = e, this.backoff && this.backoff.setMin(e), 
        this) : this._reconnectionDelay;
    }, p.prototype.randomizationFactor = function(e) {
        return arguments.length ? (this._randomizationFactor = e, this.backoff && this.backoff.setJitter(e), 
        this) : this._randomizationFactor;
    }, p.prototype.reconnectionDelayMax = function(e) {
        return arguments.length ? (this._reconnectionDelayMax = e, this.backoff && this.backoff.setMax(e), 
        this) : this._reconnectionDelayMax;
    }, p.prototype.timeout = function(e) {
        return arguments.length ? (this._timeout = e, this) : this._timeout;
    }, p.prototype.maybeReconnectOnOpen = function() {
        !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect();
    }, p.prototype.open = p.prototype.connect = function(e, t) {
        if (u("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
        u("opening %s", this.uri), this.engine = r(this.uri, this.opts);
        var n = this.engine, o = this;
        this.readyState = "opening", this.skipReconnect = !1;
        var i = a(n, "open", (function() {
            o.onopen(), e && e();
        })), s = a(n, "error", (function(t) {
            if (u("connect_error"), o.cleanup(), o.readyState = "closed", o.emitAll("connect_error", t), 
            e) {
                var n = new Error("Connection error");
                n.data = t, e(n);
            } else o.maybeReconnectOnOpen();
        }));
        if (!1 !== this._timeout) {
            var c = this._timeout;
            u("connect attempt will timeout after %d", c), 0 === c && i.destroy();
            var l = setTimeout((function() {
                u("connect attempt timed out after %d", c), i.destroy(), n.close(), n.emit("error", "timeout"), 
                o.emitAll("connect_timeout", c);
            }), c);
            this.subs.push({
                destroy: function() {
                    clearTimeout(l);
                }
            });
        }
        return this.subs.push(i), this.subs.push(s), this;
    }, p.prototype.onopen = function() {
        u("open"), this.cleanup(), this.readyState = "open", this.emit("open");
        var e = this.engine;
        this.subs.push(a(e, "data", c(this, "ondata"))), this.subs.push(a(e, "ping", c(this, "onping"))), 
        this.subs.push(a(e, "pong", c(this, "onpong"))), this.subs.push(a(e, "error", c(this, "onerror"))), 
        this.subs.push(a(e, "close", c(this, "onclose"))), this.subs.push(a(this.decoder, "decoded", c(this, "ondecoded")));
    }, p.prototype.onping = function() {
        this.lastPing = new Date, this.emitAll("ping");
    }, p.prototype.onpong = function() {
        this.emitAll("pong", new Date - this.lastPing);
    }, p.prototype.ondata = function(e) {
        this.decoder.add(e);
    }, p.prototype.ondecoded = function(e) {
        this.emit("packet", e);
    }, p.prototype.onerror = function(e) {
        u("error", e), this.emitAll("error", e);
    }, p.prototype.socket = function(e, t) {
        var n = this.nsps[e];
        if (!n) {
            n = new o(this, e, t), this.nsps[e] = n;
            var r = this;
            n.on("connecting", i), n.on("connect", (function() {
                n.id = r.generateId(e);
            })), this.autoConnect && i();
        }
        function i() {
            ~l(r.connecting, n) || r.connecting.push(n);
        }
        return n;
    }, p.prototype.destroy = function(e) {
        var t = l(this.connecting, e);
        ~t && this.connecting.splice(t, 1), this.connecting.length || this.close();
    }, p.prototype.packet = function(e) {
        u("writing packet %j", e);
        var t = this;
        e.query && 0 === e.type && (e.nsp += "?" + e.query), t.encoding ? t.packetBuffer.push(e) : (t.encoding = !0, 
        this.encoder.encode(e, (function(n) {
            for (var r = 0; r < n.length; r++) t.engine.write(n[r], e.options);
            t.encoding = !1, t.processPacketQueue();
        })));
    }, p.prototype.processPacketQueue = function() {
        if (this.packetBuffer.length > 0 && !this.encoding) {
            var e = this.packetBuffer.shift();
            this.packet(e);
        }
    }, p.prototype.cleanup = function() {
        u("cleanup");
        for (var e = this.subs.length, t = 0; t < e; t++) {
            this.subs.shift().destroy();
        }
        this.packetBuffer = [], this.encoding = !1, this.lastPing = null, this.decoder.destroy();
    }, p.prototype.close = p.prototype.disconnect = function() {
        u("disconnect"), this.skipReconnect = !0, this.reconnecting = !1, "opening" === this.readyState && this.cleanup(), 
        this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close();
    }, p.prototype.onclose = function(e) {
        u("onclose"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", 
        this.emit("close", e), this._reconnection && !this.skipReconnect && this.reconnect();
    }, p.prototype.reconnect = function() {
        if (this.reconnecting || this.skipReconnect) return this;
        var e = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) u("reconnect failed"), 
        this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1; else {
            var t = this.backoff.duration();
            u("will wait %dms before reconnect attempt", t), this.reconnecting = !0;
            var n = setTimeout((function() {
                e.skipReconnect || (u("attempting reconnect"), e.emitAll("reconnect_attempt", e.backoff.attempts), 
                e.emitAll("reconnecting", e.backoff.attempts), e.skipReconnect || e.open((function(t) {
                    t ? (u("reconnect attempt error"), e.reconnecting = !1, e.reconnect(), e.emitAll("reconnect_error", t.data)) : (u("reconnect success"), 
                    e.onreconnect());
                })));
            }), t);
            this.subs.push({
                destroy: function() {
                    clearTimeout(n);
                }
            });
        }
    }, p.prototype.onreconnect = function() {
        var e = this.backoff.attempts;
        this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", e);
    };
}, function(e, t, n) {
    var r = n(18), o = n(67), i = n(77), s = n(78);
    t.polling = function(e) {
        var t = !1, n = !1, s = !1 !== e.jsonp;
        if ("undefined" != typeof location) {
            var a = "https:" === location.protocol, c = location.port;
            c || (c = a ? 443 : 80), t = e.hostname !== location.hostname || c !== e.port, n = e.secure !== a;
        }
        if (e.xdomain = t, e.xscheme = n, "open" in new r(e) && !e.forceJSONP) return new o(e);
        if (!s) throw new Error("JSONP disabled");
        return new i(e);
    }, t.websocket = s;
}, function(e, t, n) {
    var r = n(20), o = n(11), i = n(8), s = n(12), a = n(30), c = n(13)("engine.io-client:polling");
    e.exports = l;
    var u = null != new (n(18))({
        xdomain: !1
    }).responseType;
    function l(e) {
        var t = e && e.forceBase64;
        u && !t || (this.supportsBinary = !1), r.call(this, e);
    }
    s(l, r), l.prototype.name = "polling", l.prototype.doOpen = function() {
        this.poll();
    }, l.prototype.pause = function(e) {
        var t = this;
        function n() {
            c("paused"), t.readyState = "paused", e();
        }
        if (this.readyState = "pausing", this.polling || !this.writable) {
            var r = 0;
            this.polling && (c("we are currently polling - waiting to pause"), r++, this.once("pollComplete", (function() {
                c("pre-pause polling complete"), --r || n();
            }))), this.writable || (c("we are currently writing - waiting to pause"), r++, this.once("drain", (function() {
                c("pre-pause writing complete"), --r || n();
            })));
        } else n();
    }, l.prototype.poll = function() {
        c("polling"), this.polling = !0, this.doPoll(), this.emit("poll");
    }, l.prototype.onData = function(e) {
        var t = this;
        c("polling got data %s", e);
        i.decodePayload(e, this.socket.binaryType, (function(e, n, r) {
            if ("opening" === t.readyState && "open" === e.type && t.onOpen(), "close" === e.type) return t.onClose(), 
            !1;
            t.onPacket(e);
        })), "closed" !== this.readyState && (this.polling = !1, this.emit("pollComplete"), 
        "open" === this.readyState ? this.poll() : c('ignoring poll - transport state "%s"', this.readyState));
    }, l.prototype.doClose = function() {
        var e = this;
        function t() {
            c("writing close packet"), e.write([ {
                type: "close"
            } ]);
        }
        "open" === this.readyState ? (c("transport open - closing"), t()) : (c("transport not open - deferring close"), 
        this.once("open", t));
    }, l.prototype.write = function(e) {
        var t = this;
        this.writable = !1;
        var n = function() {
            t.writable = !0, t.emit("drain");
        };
        i.encodePayload(e, this.supportsBinary, (function(e) {
            t.doWrite(e, n);
        }));
    }, l.prototype.uri = function() {
        var e = this.query || {}, t = this.secure ? "https" : "http", n = "";
        return !1 !== this.timestampRequests && (e[this.timestampParam] = a()), this.supportsBinary || e.sid || (e.b64 = 1), 
        e = o.encode(e), this.port && ("https" === t && 443 !== Number(this.port) || "http" === t && 80 !== Number(this.port)) && (n = ":" + this.port), 
        e.length && (e = "?" + e), t + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + n + this.path + e;
    };
}, function(e, t, n) {
    (function(t) {
        var r = n(69), o = Object.prototype.toString, i = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === o.call(Blob), s = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === o.call(File);
        e.exports = function e(n) {
            if (!n || "object" != typeof n) return !1;
            if (r(n)) {
                for (var o = 0, a = n.length; o < a; o++) if (e(n[o])) return !0;
                return !1;
            }
            if ("function" == typeof t && t.isBuffer && t.isBuffer(n) || "function" == typeof ArrayBuffer && n instanceof ArrayBuffer || i && n instanceof Blob || s && n instanceof File) return !0;
            if (n.toJSON && "function" == typeof n.toJSON && 1 === arguments.length) return e(n.toJSON(), !0);
            for (var c in n) if (Object.prototype.hasOwnProperty.call(n, c) && e(n[c])) return !0;
            return !1;
        };
    }).call(this, n(17).Buffer);
}, function(e, t, n) {
    "use strict";
    var r, o = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), i = {}, s = 0, a = 0;
    function c(e) {
        var t = "";
        do {
            t = o[e % 64] + t, e = Math.floor(e / 64);
        } while (e > 0);
        return t;
    }
    function u() {
        var e = c(+new Date);
        return e !== r ? (s = 0, r = e) : e + "." + c(s++);
    }
    for (;a < 64; a++) i[o[a]] = a;
    u.encode = c, u.decode = function(e) {
        var t = 0;
        for (a = 0; a < e.length; a++) t = 64 * t + i[e.charAt(a)];
        return t;
    }, e.exports = u;
}, function(e, t) {
    var n = [].indexOf;
    e.exports = function(e, t) {
        if (n) return e.indexOf(t);
        for (var r = 0; r < e.length; ++r) if (e[r] === t) return r;
        return -1;
    };
}, function(e, t, n) {
    var r = n(16), o = n(7), i = n(80), s = n(33), a = n(34), c = n(10)("socket.io-client:socket"), u = n(11), l = n(29);
    e.exports = p;
    var h = {
        connect: 1,
        connect_error: 1,
        connect_timeout: 1,
        connecting: 1,
        disconnect: 1,
        error: 1,
        reconnect: 1,
        reconnect_attempt: 1,
        reconnect_failed: 1,
        reconnect_error: 1,
        reconnecting: 1,
        ping: 1,
        pong: 1
    }, f = o.prototype.emit;
    function p(e, t, n) {
        this.io = e, this.nsp = t, this.json = this, this.ids = 0, this.acks = {}, this.receiveBuffer = [], 
        this.sendBuffer = [], this.connected = !1, this.disconnected = !0, this.flags = {}, 
        n && n.query && (this.query = n.query), this.io.autoConnect && this.open();
    }
    o(p.prototype), p.prototype.subEvents = function() {
        if (!this.subs) {
            var e = this.io;
            this.subs = [ s(e, "open", a(this, "onopen")), s(e, "packet", a(this, "onpacket")), s(e, "close", a(this, "onclose")) ];
        }
    }, p.prototype.open = p.prototype.connect = function() {
        return this.connected || (this.subEvents(), this.io.reconnecting || this.io.open(), 
        "open" === this.io.readyState && this.onopen(), this.emit("connecting")), this;
    }, p.prototype.send = function() {
        var e = i(arguments);
        return e.unshift("message"), this.emit.apply(this, e), this;
    }, p.prototype.emit = function(e) {
        if (h.hasOwnProperty(e)) return f.apply(this, arguments), this;
        var t = i(arguments), n = {
            type: (void 0 !== this.flags.binary ? this.flags.binary : l(t)) ? r.BINARY_EVENT : r.EVENT,
            data: t,
            options: {}
        };
        return n.options.compress = !this.flags || !1 !== this.flags.compress, "function" == typeof t[t.length - 1] && (c("emitting packet with ack id %d", this.ids), 
        this.acks[this.ids] = t.pop(), n.id = this.ids++), this.connected ? this.packet(n) : this.sendBuffer.push(n), 
        this.flags = {}, this;
    }, p.prototype.packet = function(e) {
        e.nsp = this.nsp, this.io.packet(e);
    }, p.prototype.onopen = function() {
        if (c("transport is open - connecting"), "/" !== this.nsp) if (this.query) {
            var e = "object" == typeof this.query ? u.encode(this.query) : this.query;
            c("sending connect packet with query %s", e), this.packet({
                type: r.CONNECT,
                query: e
            });
        } else this.packet({
            type: r.CONNECT
        });
    }, p.prototype.onclose = function(e) {
        c("close (%s)", e), this.connected = !1, this.disconnected = !0, delete this.id, 
        this.emit("disconnect", e);
    }, p.prototype.onpacket = function(e) {
        var t = e.nsp === this.nsp, n = e.type === r.ERROR && "/" === e.nsp;
        if (t || n) switch (e.type) {
          case r.CONNECT:
            this.onconnect();
            break;

          case r.EVENT:
          case r.BINARY_EVENT:
            this.onevent(e);
            break;

          case r.ACK:
          case r.BINARY_ACK:
            this.onack(e);
            break;

          case r.DISCONNECT:
            this.ondisconnect();
            break;

          case r.ERROR:
            this.emit("error", e.data);
        }
    }, p.prototype.onevent = function(e) {
        var t = e.data || [];
        c("emitting event %j", t), null != e.id && (c("attaching ack callback to event"), 
        t.push(this.ack(e.id))), this.connected ? f.apply(this, t) : this.receiveBuffer.push(t);
    }, p.prototype.ack = function(e) {
        var t = this, n = !1;
        return function() {
            if (!n) {
                n = !0;
                var o = i(arguments);
                c("sending ack %j", o), t.packet({
                    type: l(o) ? r.BINARY_ACK : r.ACK,
                    id: e,
                    data: o
                });
            }
        };
    }, p.prototype.onack = function(e) {
        var t = this.acks[e.id];
        "function" == typeof t ? (c("calling ack %s with %j", e.id, e.data), t.apply(this, e.data), 
        delete this.acks[e.id]) : c("bad ack %s", e.id);
    }, p.prototype.onconnect = function() {
        this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered();
    }, p.prototype.emitBuffered = function() {
        var e;
        for (e = 0; e < this.receiveBuffer.length; e++) f.apply(this, this.receiveBuffer[e]);
        for (this.receiveBuffer = [], e = 0; e < this.sendBuffer.length; e++) this.packet(this.sendBuffer[e]);
        this.sendBuffer = [];
    }, p.prototype.ondisconnect = function() {
        c("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect");
    }, p.prototype.destroy = function() {
        if (this.subs) {
            for (var e = 0; e < this.subs.length; e++) this.subs[e].destroy();
            this.subs = null;
        }
        this.io.destroy(this);
    }, p.prototype.close = p.prototype.disconnect = function() {
        return this.connected && (c("performing disconnect (%s)", this.nsp), this.packet({
            type: r.DISCONNECT
        })), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
    }, p.prototype.compress = function(e) {
        return this.flags.compress = e, this;
    }, p.prototype.binary = function(e) {
        return this.flags.binary = e, this;
    };
}, function(e, t) {
    e.exports = function(e, t, n) {
        return e.on(t, n), {
            destroy: function() {
                e.removeListener(t, n);
            }
        };
    };
}, function(e, t) {
    var n = [].slice;
    e.exports = function(e, t) {
        if ("string" == typeof t && (t = e[t]), "function" != typeof t) throw new Error("bind() requires a function");
        var r = n.call(arguments, 2);
        return function() {
            return t.apply(e, r.concat(n.call(arguments)));
        };
    };
}, function(e, t) {
    function n(t) {
        return "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? (e.exports = n = function(e) {
            return typeof e;
        }, e.exports.default = e.exports, e.exports.__esModule = !0) : (e.exports = n = function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        }, e.exports.default = e.exports, e.exports.__esModule = !0), n(t);
    }
    e.exports = n, e.exports.default = e.exports, e.exports.__esModule = !0;
}, function(e, t) {
    e.exports = function(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e;
    }, e.exports.default = e.exports, e.exports.__esModule = !0;
}, function(e, t) {
    function n(t) {
        return e.exports = n = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e);
        }, e.exports.default = e.exports, e.exports.__esModule = !0, n(t);
    }
    e.exports = n, e.exports.default = e.exports, e.exports.__esModule = !0;
}, function(e, t) {
    e.exports = function(e) {
        return -1 !== Function.toString.call(e).indexOf("[native code]");
    }, e.exports.default = e.exports, e.exports.__esModule = !0;
}, function(e, t, n) {
    var r = n(9), o = n(45);
    function i(t, n, s) {
        return o() ? (e.exports = i = Reflect.construct, e.exports.default = e.exports, 
        e.exports.__esModule = !0) : (e.exports = i = function(e, t, n) {
            var o = [ null ];
            o.push.apply(o, t);
            var i = new (Function.bind.apply(e, o));
            return n && r(i, n.prototype), i;
        }, e.exports.default = e.exports, e.exports.__esModule = !0), i.apply(null, arguments);
    }
    e.exports = i, e.exports.default = e.exports, e.exports.__esModule = !0;
}, function(e, t, n) {
    var r = n(51).Buffer, o = n(5), i = n(52);
    var s;
    s = "function" == typeof r ? function(e) {
        return r.from(e).toString("base64");
    } : window.btoa.bind(window), e.exports = g;
    var a = {
        Accept: "application/json, application/x-www-form-urlencoded",
        "Content-Type": "application/x-www-form-urlencoded"
    }, c = {
        invalid_request: [ "The request is missing a required parameter, includes an", "invalid parameter value, includes a parameter more than", "once, or is otherwise malformed." ].join(" "),
        invalid_client: [ "Client authentication failed (e.g., unknown client, no", "client authentication included, or unsupported", "authentication method)." ].join(" "),
        invalid_grant: [ "The provided authorization grant (e.g., authorization", "code, resource owner credentials) or refresh token is", "invalid, expired, revoked, does not match the redirection", "URI used in the authorization request, or was issued to", "another client." ].join(" "),
        unauthorized_client: [ "The client is not authorized to request an authorization", "code using this method." ].join(" "),
        unsupported_grant_type: [ "The authorization grant type is not supported by the", "authorization server." ].join(" "),
        access_denied: [ "The resource owner or authorization server denied the request." ].join(" "),
        unsupported_response_type: [ "The authorization server does not support obtaining", "an authorization code using this method." ].join(" "),
        invalid_scope: [ "The requested scope is invalid, unknown, or malformed." ].join(" "),
        server_error: [ "The authorization server encountered an unexpected", "condition that prevented it from fulfilling the request.", "(This error code is needed because a 500 Internal Server", "Error HTTP status code cannot be returned to the client", "via an HTTP redirect.)" ].join(" "),
        temporarily_unavailable: [ "The authorization server is currently unable to handle", "the request due to a temporary overloading or maintenance", "of the server." ].join(" ")
    };
    function u(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            if (null == e[n]) throw new TypeError('Expected "' + n + '" to exist');
        }
    }
    function l(e) {
        var t = c[e.error] || e.error_description || e.error;
        if (t) {
            var n = new Error(t);
            return n.body = e, n.code = "EAUTH", n;
        }
    }
    function h(e) {
        return Array.isArray(e) ? e.join(" ") : d(e);
    }
    function f(e, t) {
        u(e, "clientId", "authorizationUri");
        const n = {
            client_id: e.clientId,
            redirect_uri: e.redirectUri,
            response_type: t,
            state: e.state
        };
        void 0 !== e.scopes && (n.scope = h(e.scopes));
        const r = e.authorizationUri.includes("?") ? "&" : "?";
        return e.authorizationUri + r + o.stringify(Object.assign(n, e.query));
    }
    function p(e, t) {
        return "Basic " + s(d(e) + ":" + d(t));
    }
    function d(e) {
        return null == e ? "" : String(e);
    }
    function m(e, t) {
        return {
            url: e.url,
            method: e.method,
            body: Object.assign({}, e.body, t.body),
            query: Object.assign({}, e.query, t.query),
            headers: Object.assign({}, e.headers, t.headers)
        };
    }
    function g(e, t) {
        this.options = e, this.request = t || i, this.code = new k(this), this.token = new b(this), 
        this.owner = new v(this), this.credentials = new w(this), this.jwt = new C(this);
    }
    function y(e, t) {
        this.client = e, this.data = t, this.tokenType = t.token_type && t.token_type.toLowerCase(), 
        this.accessToken = t.access_token, this.refreshToken = t.refresh_token, this.expiresIn(Number(t.expires_in));
    }
    function v(e) {
        this.client = e;
    }
    function b(e) {
        this.client = e;
    }
    function w(e) {
        this.client = e;
    }
    function k(e) {
        this.client = e;
    }
    function C(e) {
        this.client = e;
    }
    g.Token = y, g.prototype.createToken = function(e, t, n, r) {
        var o = Object.assign({}, r, "string" == typeof e ? {
            access_token: e
        } : e, "string" == typeof t ? {
            refresh_token: t
        } : t, "string" == typeof n ? {
            token_type: n
        } : n);
        return new g.Token(this, o);
    }, g.prototype._request = function(e) {
        var t = e.url, n = o.stringify(e.body), r = o.stringify(e.query);
        return r && (t += (-1 === t.indexOf("?") ? "?" : "&") + r), this.request(e.method, t, n, e.headers).then((function(e) {
            var t = function(e) {
                try {
                    return JSON.parse(e);
                } catch (t) {
                    return o.parse(e);
                }
            }(e.body), n = l(t);
            if (n) return Promise.reject(n);
            if (e.status < 200 || e.status >= 399) {
                var r = new Error("HTTP status " + e.status);
                return r.status = e.status, r.body = e.body, r.code = "ESTATUS", Promise.reject(r);
            }
            return t;
        }));
    }, y.prototype.expiresIn = function(e) {
        if ("number" == typeof e) this.expires = new Date, this.expires.setSeconds(this.expires.getSeconds() + e); else {
            if (!(e instanceof Date)) throw new TypeError("Unknown duration: " + e);
            this.expires = new Date(e.getTime());
        }
        return this.expires;
    }, y.prototype.sign = function(e) {
        if (!this.accessToken) throw new Error("Unable to sign without access token");
        if (e.headers = e.headers || {}, "bearer" === this.tokenType) e.headers.Authorization = "Bearer " + this.accessToken; else {
            var t = e.url.split("#"), n = "access_token=" + this.accessToken, r = t[0].replace(/[?&]access_token=[^&#]/, ""), o = t[1] ? "#" + t[1] : "";
            e.url = r + (r.indexOf("?") > -1 ? "&" : "?") + n + o, e.headers.Pragma = "no-store", 
            e.headers["Cache-Control"] = "no-store";
        }
        return e;
    }, y.prototype.refresh = function(e) {
        var t = this, n = Object.assign({}, this.client.options, e);
        return this.refreshToken ? this.client._request(m({
            url: n.accessTokenUri,
            method: "POST",
            headers: Object.assign({}, a, {
                Authorization: p(n.clientId, n.clientSecret)
            }),
            body: {
                refresh_token: this.refreshToken,
                grant_type: "refresh_token"
            }
        }, n)).then((function(e) {
            return t.client.createToken(Object.assign({}, t.data, e));
        })) : Promise.reject(new Error("No refresh token"));
    }, y.prototype.expired = function() {
        return Date.now() > this.expires.getTime();
    }, v.prototype.getToken = function(e, t, n) {
        var r = this, o = Object.assign({}, this.client.options, n);
        const i = {
            username: e,
            password: t,
            grant_type: "password"
        };
        return void 0 !== o.scopes && (i.scope = h(o.scopes)), this.client._request(m({
            url: o.accessTokenUri,
            method: "POST",
            headers: Object.assign({}, a, {
                Authorization: p(o.clientId, o.clientSecret)
            }),
            body: i
        }, o)).then((function(e) {
            return r.client.createToken(e);
        }));
    }, b.prototype.getUri = function(e) {
        return f(Object.assign({}, this.client.options, e), "token");
    }, b.prototype.getToken = function(e, t) {
        var n = Object.assign({}, this.client.options, t), r = "object" == typeof e ? e : new URL(e, "https://example.org/"), i = new URL(n.redirectUri, "https://example.org/");
        if ("string" == typeof r.pathname && r.pathname !== i.pathname) return Promise.reject(new TypeError("Redirected path should match configured path, but got: " + r.pathname));
        if (!r.hash && !r.search) return Promise.reject(new TypeError("Unable to process uri: " + e));
        var s = Object.assign({}, "string" == typeof r.search ? o.parse(r.search.substr(1)) : r.search || {}, "string" == typeof r.hash ? o.parse(r.hash.substr(1)) : r.hash || {}), a = l(s);
        return a ? Promise.reject(a) : null != n.state && s.state !== n.state ? Promise.reject(new TypeError("Invalid state: " + s.state)) : Promise.resolve(this.client.createToken(s));
    }, w.prototype.getToken = function(e) {
        var t = this, n = Object.assign({}, this.client.options, e);
        u(n, "clientId", "clientSecret", "accessTokenUri");
        const r = {
            grant_type: "client_credentials"
        };
        return void 0 !== n.scopes && (r.scope = h(n.scopes)), this.client._request(m({
            url: n.accessTokenUri,
            method: "POST",
            headers: Object.assign({}, a, {
                Authorization: p(n.clientId, n.clientSecret)
            }),
            body: r
        }, n)).then((function(e) {
            return t.client.createToken(e);
        }));
    }, k.prototype.getUri = function(e) {
        return f(Object.assign({}, this.client.options, e), "code");
    }, k.prototype.getToken = function(e, t) {
        var n = this, r = Object.assign({}, this.client.options, t);
        u(r, "clientId", "accessTokenUri");
        var i = "object" == typeof e ? e : new URL(e, "https://example.org/");
        if ("string" == typeof r.redirectUri && "string" == typeof i.pathname && i.pathname !== new URL(r.redirectUri, "https://example.org/").pathname) return Promise.reject(new TypeError("Redirected path should match configured path, but got: " + i.pathname));
        if (!i.search || !i.search.substr(1)) return Promise.reject(new TypeError("Unable to process uri: " + e));
        var s = "string" == typeof i.search ? o.parse(i.search.substr(1)) : i.search || {}, c = l(s);
        if (c) return Promise.reject(c);
        if (null != r.state && s.state !== r.state) return Promise.reject(new TypeError("Invalid state: " + s.state));
        if (!s.code) return Promise.reject(new TypeError("Missing code, unable to request token"));
        var h = Object.assign({}, a), f = {
            code: s.code,
            grant_type: "authorization_code",
            redirect_uri: r.redirectUri
        };
        return r.clientSecret ? h.Authorization = p(r.clientId, r.clientSecret) : f.client_id = r.clientId, 
        this.client._request(m({
            url: r.accessTokenUri,
            method: "POST",
            headers: h,
            body: f
        }, r)).then((function(e) {
            return n.client.createToken(e);
        }));
    }, C.prototype.getToken = function(e, t) {
        var n = this, r = Object.assign({}, this.client.options, t), o = Object.assign({}, a);
        u(r, "accessTokenUri"), r.clientId && (o.Authorization = p(r.clientId, r.clientSecret));
        const i = {
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion: e
        };
        return void 0 !== r.scopes && (i.scope = h(r.scopes)), this.client._request(m({
            url: r.accessTokenUri,
            method: "POST",
            headers: o,
            body: i
        }, r)).then((function(e) {
            return n.client.createToken(e);
        }));
    };
}, function(e, t) {
    e.exports = function(e, t) {
        if (null == e) return {};
        var n, r, o = {}, i = Object.keys(e);
        for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
        return o;
    }, e.exports.default = e.exports, e.exports.__esModule = !0;
}, function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        return "object" == typeof e ? function e(t, n) {
            var r;
            r = Array.isArray(t) ? [] : {};
            n.push(t), Object.keys(t).forEach((function(o) {
                var i = t[o];
                "function" != typeof i && (i && "object" == typeof i ? -1 !== n.indexOf(t[o]) ? r[o] = "[Circular]" : r[o] = e(t[o], n.slice(0)) : r[o] = i);
            })), "string" == typeof t.name && (r.name = t.name);
            "string" == typeof t.message && (r.message = t.message);
            "string" == typeof t.stack && (r.stack = t.stack);
            return r;
        }(e, []) : "function" == typeof e ? "[Function: " + (e.name || "anonymous") + "]" : e;
    };
}, function(e, t, n) {
    "use strict";
    function r(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }
    e.exports = function(e, t, n, i) {
        t = t || "&", n = n || "=";
        var s = {};
        if ("string" != typeof e || 0 === e.length) return s;
        var a = /\+/g;
        e = e.split(t);
        var c = 1e3;
        i && "number" == typeof i.maxKeys && (c = i.maxKeys);
        var u = e.length;
        c > 0 && u > c && (u = c);
        for (var l = 0; l < u; ++l) {
            var h, f, p, d, m = e[l].replace(a, "%20"), g = m.indexOf(n);
            g >= 0 ? (h = m.substr(0, g), f = m.substr(g + 1)) : (h = m, f = ""), p = decodeURIComponent(h), 
            d = decodeURIComponent(f), r(s, p) ? o(s[p]) ? s[p].push(d) : s[p] = [ s[p], d ] : s[p] = d;
        }
        return s;
    };
    var o = Array.isArray || function(e) {
        return "[object Array]" === Object.prototype.toString.call(e);
    };
}, function(e, t, n) {
    "use strict";
    var r = function(e) {
        switch (typeof e) {
          case "string":
            return e;

          case "boolean":
            return e ? "true" : "false";

          case "number":
            return isFinite(e) ? e : "";

          default:
            return "";
        }
    };
    e.exports = function(e, t, n, a) {
        return t = t || "&", n = n || "=", null === e && (e = void 0), "object" == typeof e ? i(s(e), (function(s) {
            var a = encodeURIComponent(r(s)) + n;
            return o(e[s]) ? i(e[s], (function(e) {
                return a + encodeURIComponent(r(e));
            })).join(t) : a + encodeURIComponent(r(e[s]));
        })).join(t) : a ? encodeURIComponent(r(a)) + n + encodeURIComponent(r(e)) : "";
    };
    var o = Array.isArray || function(e) {
        return "[object Array]" === Object.prototype.toString.call(e);
    };
    function i(e, t) {
        if (e.map) return e.map(t);
        for (var n = [], r = 0; r < e.length; r++) n.push(t(e[r], r));
        return n;
    }
    var s = Object.keys || function(e) {
        var t = [];
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
        return t;
    };
}, function(e, t) {
    e.exports = function() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), 
            !0;
        } catch (e) {
            return !1;
        }
    }, e.exports.default = e.exports, e.exports.__esModule = !0;
}, function(e, t, n) {
    "use strict";
    var r = n(47), o = n(49);
    function i() {
        this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, 
        this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, 
        this.path = null, this.href = null;
    }
    t.parse = b, t.resolve = function(e, t) {
        return b(e, !1, !0).resolve(t);
    }, t.resolveObject = function(e, t) {
        return e ? b(e, !1, !0).resolveObject(t) : t;
    }, t.format = function(e) {
        o.isString(e) && (e = b(e));
        return e instanceof i ? e.format() : i.prototype.format.call(e);
    }, t.Url = i;
    var s = /^([a-z0-9.+-]+:)/i, a = /:[0-9]*$/, c = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, u = [ "{", "}", "|", "\\", "^", "`" ].concat([ "<", ">", '"', "`", " ", "\r", "\n", "\t" ]), l = [ "'" ].concat(u), h = [ "%", "/", "?", ";", "#" ].concat(l), f = [ "/", "?", "#" ], p = /^[+a-z0-9A-Z_-]{0,63}$/, d = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, m = {
        javascript: !0,
        "javascript:": !0
    }, g = {
        javascript: !0,
        "javascript:": !0
    }, y = {
        http: !0,
        https: !0,
        ftp: !0,
        gopher: !0,
        file: !0,
        "http:": !0,
        "https:": !0,
        "ftp:": !0,
        "gopher:": !0,
        "file:": !0
    }, v = n(5);
    function b(e, t, n) {
        if (e && o.isObject(e) && e instanceof i) return e;
        var r = new i;
        return r.parse(e, t, n), r;
    }
    i.prototype.parse = function(e, t, n) {
        if (!o.isString(e)) throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
        var i = e.indexOf("?"), a = -1 !== i && i < e.indexOf("#") ? "?" : "#", u = e.split(a);
        u[0] = u[0].replace(/\\/g, "/");
        var b = e = u.join(a);
        if (b = b.trim(), !n && 1 === e.split("#").length) {
            var w = c.exec(b);
            if (w) return this.path = b, this.href = b, this.pathname = w[1], w[2] ? (this.search = w[2], 
            this.query = t ? v.parse(this.search.substr(1)) : this.search.substr(1)) : t && (this.search = "", 
            this.query = {}), this;
        }
        var k = s.exec(b);
        if (k) {
            var C = (k = k[0]).toLowerCase();
            this.protocol = C, b = b.substr(k.length);
        }
        if (n || k || b.match(/^\/\/[^@\/]+@[^@\/]+/)) {
            var x = "//" === b.substr(0, 2);
            !x || k && g[k] || (b = b.substr(2), this.slashes = !0);
        }
        if (!g[k] && (x || k && !y[k])) {
            for (var O, A, E = -1, S = 0; S < f.length; S++) {
                -1 !== (_ = b.indexOf(f[S])) && (-1 === E || _ < E) && (E = _);
            }
            -1 !== (A = -1 === E ? b.lastIndexOf("@") : b.lastIndexOf("@", E)) && (O = b.slice(0, A), 
            b = b.slice(A + 1), this.auth = decodeURIComponent(O)), E = -1;
            for (S = 0; S < h.length; S++) {
                var _;
                -1 !== (_ = b.indexOf(h[S])) && (-1 === E || _ < E) && (E = _);
            }
            -1 === E && (E = b.length), this.host = b.slice(0, E), b = b.slice(E), this.parseHost(), 
            this.hostname = this.hostname || "";
            var T = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
            if (!T) for (var R = this.hostname.split(/\./), L = (S = 0, R.length); S < L; S++) {
                var F = R[S];
                if (F && !F.match(p)) {
                    for (var I = "", j = 0, P = F.length; j < P; j++) F.charCodeAt(j) > 127 ? I += "x" : I += F[j];
                    if (!I.match(p)) {
                        var U = R.slice(0, S), M = R.slice(S + 1), N = F.match(d);
                        N && (U.push(N[1]), M.unshift(N[2])), M.length && (b = "/" + M.join(".") + b), this.hostname = U.join(".");
                        break;
                    }
                }
            }
            this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), 
            T || (this.hostname = r.toASCII(this.hostname));
            var D = this.port ? ":" + this.port : "", B = this.hostname || "";
            this.host = B + D, this.href += this.host, T && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), 
            "/" !== b[0] && (b = "/" + b));
        }
        if (!m[C]) for (S = 0, L = l.length; S < L; S++) {
            var q = l[S];
            if (-1 !== b.indexOf(q)) {
                var $ = encodeURIComponent(q);
                $ === q && ($ = escape(q)), b = b.split(q).join($);
            }
        }
        var V = b.indexOf("#");
        -1 !== V && (this.hash = b.substr(V), b = b.slice(0, V));
        var H = b.indexOf("?");
        if (-1 !== H ? (this.search = b.substr(H), this.query = b.substr(H + 1), t && (this.query = v.parse(this.query)), 
        b = b.slice(0, H)) : t && (this.search = "", this.query = {}), b && (this.pathname = b), 
        y[C] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
            D = this.pathname || "";
            var z = this.search || "";
            this.path = D + z;
        }
        return this.href = this.format(), this;
    }, i.prototype.format = function() {
        var e = this.auth || "";
        e && (e = (e = encodeURIComponent(e)).replace(/%3A/i, ":"), e += "@");
        var t = this.protocol || "", n = this.pathname || "", r = this.hash || "", i = !1, s = "";
        this.host ? i = e + this.host : this.hostname && (i = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), 
        this.port && (i += ":" + this.port)), this.query && o.isObject(this.query) && Object.keys(this.query).length && (s = v.stringify(this.query));
        var a = this.search || s && "?" + s || "";
        return t && ":" !== t.substr(-1) && (t += ":"), this.slashes || (!t || y[t]) && !1 !== i ? (i = "//" + (i || ""), 
        n && "/" !== n.charAt(0) && (n = "/" + n)) : i || (i = ""), r && "#" !== r.charAt(0) && (r = "#" + r), 
        a && "?" !== a.charAt(0) && (a = "?" + a), t + i + (n = n.replace(/[?#]/g, (function(e) {
            return encodeURIComponent(e);
        }))) + (a = a.replace("#", "%23")) + r;
    }, i.prototype.resolve = function(e) {
        return this.resolveObject(b(e, !1, !0)).format();
    }, i.prototype.resolveObject = function(e) {
        if (o.isString(e)) {
            var t = new i;
            t.parse(e, !1, !0), e = t;
        }
        for (var n = new i, r = Object.keys(this), s = 0; s < r.length; s++) {
            var a = r[s];
            n[a] = this[a];
        }
        if (n.hash = e.hash, "" === e.href) return n.href = n.format(), n;
        if (e.slashes && !e.protocol) {
            for (var c = Object.keys(e), u = 0; u < c.length; u++) {
                var l = c[u];
                "protocol" !== l && (n[l] = e[l]);
            }
            return y[n.protocol] && n.hostname && !n.pathname && (n.path = n.pathname = "/"), 
            n.href = n.format(), n;
        }
        if (e.protocol && e.protocol !== n.protocol) {
            if (!y[e.protocol]) {
                for (var h = Object.keys(e), f = 0; f < h.length; f++) {
                    var p = h[f];
                    n[p] = e[p];
                }
                return n.href = n.format(), n;
            }
            if (n.protocol = e.protocol, e.host || g[e.protocol]) n.pathname = e.pathname; else {
                for (var d = (e.pathname || "").split("/"); d.length && !(e.host = d.shift()); ) ;
                e.host || (e.host = ""), e.hostname || (e.hostname = ""), "" !== d[0] && d.unshift(""), 
                d.length < 2 && d.unshift(""), n.pathname = d.join("/");
            }
            if (n.search = e.search, n.query = e.query, n.host = e.host || "", n.auth = e.auth, 
            n.hostname = e.hostname || e.host, n.port = e.port, n.pathname || n.search) {
                var m = n.pathname || "", v = n.search || "";
                n.path = m + v;
            }
            return n.slashes = n.slashes || e.slashes, n.href = n.format(), n;
        }
        var b = n.pathname && "/" === n.pathname.charAt(0), w = e.host || e.pathname && "/" === e.pathname.charAt(0), k = w || b || n.host && e.pathname, C = k, x = n.pathname && n.pathname.split("/") || [], O = (d = e.pathname && e.pathname.split("/") || [], 
        n.protocol && !y[n.protocol]);
        if (O && (n.hostname = "", n.port = null, n.host && ("" === x[0] ? x[0] = n.host : x.unshift(n.host)), 
        n.host = "", e.protocol && (e.hostname = null, e.port = null, e.host && ("" === d[0] ? d[0] = e.host : d.unshift(e.host)), 
        e.host = null), k = k && ("" === d[0] || "" === x[0])), w) n.host = e.host || "" === e.host ? e.host : n.host, 
        n.hostname = e.hostname || "" === e.hostname ? e.hostname : n.hostname, n.search = e.search, 
        n.query = e.query, x = d; else if (d.length) x || (x = []), x.pop(), x = x.concat(d), 
        n.search = e.search, n.query = e.query; else if (!o.isNullOrUndefined(e.search)) {
            if (O) n.hostname = n.host = x.shift(), (T = !!(n.host && n.host.indexOf("@") > 0) && n.host.split("@")) && (n.auth = T.shift(), 
            n.host = n.hostname = T.shift());
            return n.search = e.search, n.query = e.query, o.isNull(n.pathname) && o.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")), 
            n.href = n.format(), n;
        }
        if (!x.length) return n.pathname = null, n.search ? n.path = "/" + n.search : n.path = null, 
        n.href = n.format(), n;
        for (var A = x.slice(-1)[0], E = (n.host || e.host || x.length > 1) && ("." === A || ".." === A) || "" === A, S = 0, _ = x.length; _ >= 0; _--) "." === (A = x[_]) ? x.splice(_, 1) : ".." === A ? (x.splice(_, 1), 
        S++) : S && (x.splice(_, 1), S--);
        if (!k && !C) for (;S--; S) x.unshift("..");
        !k || "" === x[0] || x[0] && "/" === x[0].charAt(0) || x.unshift(""), E && "/" !== x.join("/").substr(-1) && x.push("");
        var T, R = "" === x[0] || x[0] && "/" === x[0].charAt(0);
        O && (n.hostname = n.host = R ? "" : x.length ? x.shift() : "", (T = !!(n.host && n.host.indexOf("@") > 0) && n.host.split("@")) && (n.auth = T.shift(), 
        n.host = n.hostname = T.shift()));
        return (k = k || n.host && x.length) && !R && x.unshift(""), x.length ? n.pathname = x.join("/") : (n.pathname = null, 
        n.path = null), o.isNull(n.pathname) && o.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")), 
        n.auth = e.auth || n.auth, n.slashes = n.slashes || e.slashes, n.href = n.format(), 
        n;
    }, i.prototype.parseHost = function() {
        var e = this.host, t = a.exec(e);
        t && (":" !== (t = t[0]) && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), 
        e && (this.hostname = e);
    };
}, function(e, t, n) {
    (function(e, r) {
        var o;
        !function(i) {
            t && t.nodeType, e && e.nodeType;
            var s = "object" == typeof r && r;
            s.global !== s && s.window !== s && s.self;
            var a, c = 2147483647, u = /^xn--/, l = /[^\x20-\x7E]/, h = /[\x2E\u3002\uFF0E\uFF61]/g, f = {
                overflow: "Overflow: input needs wider integers to process",
                "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                "invalid-input": "Invalid input"
            }, p = Math.floor, d = String.fromCharCode;
            function m(e) {
                throw new RangeError(f[e]);
            }
            function g(e, t) {
                for (var n = e.length, r = []; n--; ) r[n] = t(e[n]);
                return r;
            }
            function y(e, t) {
                var n = e.split("@"), r = "";
                return n.length > 1 && (r = n[0] + "@", e = n[1]), r + g((e = e.replace(h, ".")).split("."), t).join(".");
            }
            function v(e) {
                for (var t, n, r = [], o = 0, i = e.length; o < i; ) (t = e.charCodeAt(o++)) >= 55296 && t <= 56319 && o < i ? 56320 == (64512 & (n = e.charCodeAt(o++))) ? r.push(((1023 & t) << 10) + (1023 & n) + 65536) : (r.push(t), 
                o--) : r.push(t);
                return r;
            }
            function b(e) {
                return g(e, (function(e) {
                    var t = "";
                    return e > 65535 && (t += d((e -= 65536) >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), 
                    t += d(e);
                })).join("");
            }
            function w(e, t) {
                return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
            }
            function k(e, t, n) {
                var r = 0;
                for (e = n ? p(e / 700) : e >> 1, e += p(e / t); e > 455; r += 36) e = p(e / 35);
                return p(r + 36 * e / (e + 38));
            }
            function C(e) {
                var t, n, r, o, i, s, a, u, l, h, f, d = [], g = e.length, y = 0, v = 128, w = 72;
                for ((n = e.lastIndexOf("-")) < 0 && (n = 0), r = 0; r < n; ++r) e.charCodeAt(r) >= 128 && m("not-basic"), 
                d.push(e.charCodeAt(r));
                for (o = n > 0 ? n + 1 : 0; o < g; ) {
                    for (i = y, s = 1, a = 36; o >= g && m("invalid-input"), ((u = (f = e.charCodeAt(o++)) - 48 < 10 ? f - 22 : f - 65 < 26 ? f - 65 : f - 97 < 26 ? f - 97 : 36) >= 36 || u > p((c - y) / s)) && m("overflow"), 
                    y += u * s, !(u < (l = a <= w ? 1 : a >= w + 26 ? 26 : a - w)); a += 36) s > p(c / (h = 36 - l)) && m("overflow"), 
                    s *= h;
                    w = k(y - i, t = d.length + 1, 0 == i), p(y / t) > c - v && m("overflow"), v += p(y / t), 
                    y %= t, d.splice(y++, 0, v);
                }
                return b(d);
            }
            function x(e) {
                var t, n, r, o, i, s, a, u, l, h, f, g, y, b, C, x = [];
                for (g = (e = v(e)).length, t = 128, n = 0, i = 72, s = 0; s < g; ++s) (f = e[s]) < 128 && x.push(d(f));
                for (r = o = x.length, o && x.push("-"); r < g; ) {
                    for (a = c, s = 0; s < g; ++s) (f = e[s]) >= t && f < a && (a = f);
                    for (a - t > p((c - n) / (y = r + 1)) && m("overflow"), n += (a - t) * y, t = a, 
                    s = 0; s < g; ++s) if ((f = e[s]) < t && ++n > c && m("overflow"), f == t) {
                        for (u = n, l = 36; !(u < (h = l <= i ? 1 : l >= i + 26 ? 26 : l - i)); l += 36) C = u - h, 
                        b = 36 - h, x.push(d(w(h + C % b, 0))), u = p(C / b);
                        x.push(d(w(u, 0))), i = k(n, y, r == o), n = 0, ++r;
                    }
                    ++n, ++t;
                }
                return x.join("");
            }
            a = {
                version: "1.4.1",
                ucs2: {
                    decode: v,
                    encode: b
                },
                decode: C,
                encode: x,
                toASCII: function(e) {
                    return y(e, (function(e) {
                        return l.test(e) ? "xn--" + x(e) : e;
                    }));
                },
                toUnicode: function(e) {
                    return y(e, (function(e) {
                        return u.test(e) ? C(e.slice(4).toLowerCase()) : e;
                    }));
                }
            }, void 0 === (o = function() {
                return a;
            }.call(t, n, t, e)) || (e.exports = o);
        }();
    }).call(this, n(48)(e), n(21));
}, function(e, t) {
    e.exports = function(e) {
        return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children || (e.children = []), 
        Object.defineProperty(e, "loaded", {
            enumerable: !0,
            get: function() {
                return e.l;
            }
        }), Object.defineProperty(e, "id", {
            enumerable: !0,
            get: function() {
                return e.i;
            }
        }), e.webpackPolyfill = 1), e;
    };
}, function(e, t, n) {
    "use strict";
    e.exports = {
        isString: function(e) {
            return "string" == typeof e;
        },
        isObject: function(e) {
            return "object" == typeof e && null !== e;
        },
        isNull: function(e) {
            return null === e;
        },
        isNullOrUndefined: function(e) {
            return null == e;
        }
    };
}, function(e, t, n) {
    "use strict";
    var r = /[|\\{}()[\]^$+*?.]/g;
    e.exports = function(e) {
        if ("string" != typeof e) throw new TypeError("Expected a string");
        return e.replace(r, "\\$&");
    };
}, function(e, t) {}, function(e, t) {
    e.exports = function(e, t, n, r) {
        return new Promise((function(o, i) {
            var s = new window.XMLHttpRequest;
            s.open(e, t), s.onload = function() {
                return o({
                    status: s.status,
                    body: s.responseText
                });
            }, s.onerror = s.onabort = function() {
                return i(new Error(s.statusText || "XHR aborted: " + t));
            }, Object.keys(r).forEach((function(e) {
                s.setRequestHeader(e, r[e]);
            })), s.send(n);
        }));
    };
}, function(e, t, n) {
    var r = n(54), o = n(16), i = n(26), s = n(10)("socket.io-client");
    e.exports = t = c;
    var a = t.managers = {};
    function c(e, t) {
        "object" == typeof e && (t = e, e = void 0), t = t || {};
        var n, o = r(e), c = o.source, u = o.id, l = o.path, h = a[u] && l in a[u].nsps;
        return t.forceNew || t["force new connection"] || !1 === t.multiplex || h ? (s("ignoring socket cache for %s", c), 
        n = i(c, t)) : (a[u] || (s("new io instance for %s", c), a[u] = i(c, t)), n = a[u]), 
        o.query && !t.query && (t.query = o.query), n.socket(o.path, t);
    }
    t.protocol = o.protocol, t.connect = c, t.Manager = n(26), t.Socket = n(32);
}, function(e, t, n) {
    var r = n(23), o = n(10)("socket.io-client:url");
    e.exports = function(e, t) {
        var n = e;
        t = t || "undefined" != typeof location && location, null == e && (e = t.protocol + "//" + t.host);
        "string" == typeof e && ("/" === e.charAt(0) && (e = "/" === e.charAt(1) ? t.protocol + e : t.host + e), 
        /^(https?|wss?):\/\//.test(e) || (o("protocol-less url %s", e), e = void 0 !== t ? t.protocol + "//" + e : "https://" + e), 
        o("parse %s", e), n = r(e));
        n.port || (/^(http|ws)$/.test(n.protocol) ? n.port = "80" : /^(http|ws)s$/.test(n.protocol) && (n.port = "443"));
        n.path = n.path || "/";
        var i = -1 !== n.host.indexOf(":") ? "[" + n.host + "]" : n.host;
        return n.id = n.protocol + "://" + i + ":" + n.port, n.href = n.protocol + "://" + i + (t && t.port === n.port ? "" : ":" + n.port), 
        n;
    };
}, function(e, t, n) {
    function r(e) {
        var n;
        function r() {
            if (r.enabled) {
                var e = r, o = +new Date, i = o - (n || o);
                e.diff = i, e.prev = n, e.curr = o, n = o;
                for (var s = new Array(arguments.length), a = 0; a < s.length; a++) s[a] = arguments[a];
                s[0] = t.coerce(s[0]), "string" != typeof s[0] && s.unshift("%O");
                var c = 0;
                s[0] = s[0].replace(/%([a-zA-Z%])/g, (function(n, r) {
                    if ("%%" === n) return n;
                    c++;
                    var o = t.formatters[r];
                    if ("function" == typeof o) {
                        var i = s[c];
                        n = o.call(e, i), s.splice(c, 1), c--;
                    }
                    return n;
                })), t.formatArgs.call(e, s);
                var u = r.log || t.log || console.log.bind(console);
                u.apply(e, s);
            }
        }
        return r.namespace = e, r.enabled = t.enabled(e), r.useColors = t.useColors(), r.color = function(e) {
            var n, r = 0;
            for (n in e) r = (r << 5) - r + e.charCodeAt(n), r |= 0;
            return t.colors[Math.abs(r) % t.colors.length];
        }(e), r.destroy = o, "function" == typeof t.init && t.init(r), t.instances.push(r), 
        r;
    }
    function o() {
        var e = t.instances.indexOf(this);
        return -1 !== e && (t.instances.splice(e, 1), !0);
    }
    (t = e.exports = r.debug = r.default = r).coerce = function(e) {
        return e instanceof Error ? e.stack || e.message : e;
    }, t.disable = function() {
        t.enable("");
    }, t.enable = function(e) {
        var n;
        t.save(e), t.names = [], t.skips = [];
        var r = ("string" == typeof e ? e : "").split(/[\s,]+/), o = r.length;
        for (n = 0; n < o; n++) r[n] && ("-" === (e = r[n].replace(/\*/g, ".*?"))[0] ? t.skips.push(new RegExp("^" + e.substr(1) + "$")) : t.names.push(new RegExp("^" + e + "$")));
        for (n = 0; n < t.instances.length; n++) {
            var i = t.instances[n];
            i.enabled = t.enabled(i.namespace);
        }
    }, t.enabled = function(e) {
        if ("*" === e[e.length - 1]) return !0;
        var n, r;
        for (n = 0, r = t.skips.length; n < r; n++) if (t.skips[n].test(e)) return !1;
        for (n = 0, r = t.names.length; n < r; n++) if (t.names[n].test(e)) return !0;
        return !1;
    }, t.humanize = n(56), t.instances = [], t.names = [], t.skips = [], t.formatters = {};
}, function(e, t) {
    var n = 1e3, r = 6e4, o = 60 * r, i = 24 * o;
    function s(e, t, n) {
        if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + n : Math.ceil(e / t) + " " + n + "s";
    }
    e.exports = function(e, t) {
        t = t || {};
        var a, c = typeof e;
        if ("string" === c && e.length > 0) return function(e) {
            if ((e = String(e)).length > 100) return;
            var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
            if (!t) return;
            var s = parseFloat(t[1]);
            switch ((t[2] || "ms").toLowerCase()) {
              case "years":
              case "year":
              case "yrs":
              case "yr":
              case "y":
                return 315576e5 * s;

              case "days":
              case "day":
              case "d":
                return s * i;

              case "hours":
              case "hour":
              case "hrs":
              case "hr":
              case "h":
                return s * o;

              case "minutes":
              case "minute":
              case "mins":
              case "min":
              case "m":
                return s * r;

              case "seconds":
              case "second":
              case "secs":
              case "sec":
              case "s":
                return s * n;

              case "milliseconds":
              case "millisecond":
              case "msecs":
              case "msec":
              case "ms":
                return s;

              default:
                return;
            }
        }(e);
        if ("number" === c && !1 === isNaN(e)) return t.long ? s(a = e, i, "day") || s(a, o, "hour") || s(a, r, "minute") || s(a, n, "second") || a + " ms" : function(e) {
            if (e >= i) return Math.round(e / i) + "d";
            if (e >= o) return Math.round(e / o) + "h";
            if (e >= r) return Math.round(e / r) + "m";
            if (e >= n) return Math.round(e / n) + "s";
            return e + "ms";
        }(e);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));
    };
}, function(e, t, n) {
    (function(r) {
        function o() {
            var e;
            try {
                e = t.storage.debug;
            } catch (e) {}
            return !e && void 0 !== r && "env" in r && (e = r.env.DEBUG), e;
        }
        (t = e.exports = n(58)).log = function() {
            return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
        }, t.formatArgs = function(e) {
            var n = this.useColors;
            if (e[0] = (n ? "%c" : "") + this.namespace + (n ? " %c" : " ") + e[0] + (n ? "%c " : " ") + "+" + t.humanize(this.diff), 
            !n) return;
            var r = "color: " + this.color;
            e.splice(1, 0, r, "color: inherit");
            var o = 0, i = 0;
            e[0].replace(/%[a-zA-Z%]/g, (function(e) {
                "%%" !== e && (o++, "%c" === e && (i = o));
            })), e.splice(i, 0, r);
        }, t.save = function(e) {
            try {
                null == e ? t.storage.removeItem("debug") : t.storage.debug = e;
            } catch (e) {}
        }, t.load = o, t.useColors = function() {
            if ("undefined" != typeof window && window.process && "renderer" === window.process.type) return !0;
            if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
            return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
        }, t.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
            try {
                return window.localStorage;
            } catch (e) {}
        }(), t.colors = [ "#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33" ], 
        t.formatters.j = function(e) {
            try {
                return JSON.stringify(e);
            } catch (e) {
                return "[UnexpectedJSONParseError]: " + e.message;
            }
        }, t.enable(o());
    }).call(this, n(15));
}, function(e, t, n) {
    function r(e) {
        var n;
        function r() {
            if (r.enabled) {
                var e = r, o = +new Date, i = o - (n || o);
                e.diff = i, e.prev = n, e.curr = o, n = o;
                for (var s = new Array(arguments.length), a = 0; a < s.length; a++) s[a] = arguments[a];
                s[0] = t.coerce(s[0]), "string" != typeof s[0] && s.unshift("%O");
                var c = 0;
                s[0] = s[0].replace(/%([a-zA-Z%])/g, (function(n, r) {
                    if ("%%" === n) return n;
                    c++;
                    var o = t.formatters[r];
                    if ("function" == typeof o) {
                        var i = s[c];
                        n = o.call(e, i), s.splice(c, 1), c--;
                    }
                    return n;
                })), t.formatArgs.call(e, s);
                var u = r.log || t.log || console.log.bind(console);
                u.apply(e, s);
            }
        }
        return r.namespace = e, r.enabled = t.enabled(e), r.useColors = t.useColors(), r.color = function(e) {
            var n, r = 0;
            for (n in e) r = (r << 5) - r + e.charCodeAt(n), r |= 0;
            return t.colors[Math.abs(r) % t.colors.length];
        }(e), r.destroy = o, "function" == typeof t.init && t.init(r), t.instances.push(r), 
        r;
    }
    function o() {
        var e = t.instances.indexOf(this);
        return -1 !== e && (t.instances.splice(e, 1), !0);
    }
    (t = e.exports = r.debug = r.default = r).coerce = function(e) {
        return e instanceof Error ? e.stack || e.message : e;
    }, t.disable = function() {
        t.enable("");
    }, t.enable = function(e) {
        var n;
        t.save(e), t.names = [], t.skips = [];
        var r = ("string" == typeof e ? e : "").split(/[\s,]+/), o = r.length;
        for (n = 0; n < o; n++) r[n] && ("-" === (e = r[n].replace(/\*/g, ".*?"))[0] ? t.skips.push(new RegExp("^" + e.substr(1) + "$")) : t.names.push(new RegExp("^" + e + "$")));
        for (n = 0; n < t.instances.length; n++) {
            var i = t.instances[n];
            i.enabled = t.enabled(i.namespace);
        }
    }, t.enabled = function(e) {
        if ("*" === e[e.length - 1]) return !0;
        var n, r;
        for (n = 0, r = t.skips.length; n < r; n++) if (t.skips[n].test(e)) return !1;
        for (n = 0, r = t.names.length; n < r; n++) if (t.names[n].test(e)) return !0;
        return !1;
    }, t.humanize = n(59), t.instances = [], t.names = [], t.skips = [], t.formatters = {};
}, function(e, t) {
    var n = 1e3, r = 6e4, o = 60 * r, i = 24 * o;
    function s(e, t, n) {
        if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + n : Math.ceil(e / t) + " " + n + "s";
    }
    e.exports = function(e, t) {
        t = t || {};
        var a, c = typeof e;
        if ("string" === c && e.length > 0) return function(e) {
            if ((e = String(e)).length > 100) return;
            var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
            if (!t) return;
            var s = parseFloat(t[1]);
            switch ((t[2] || "ms").toLowerCase()) {
              case "years":
              case "year":
              case "yrs":
              case "yr":
              case "y":
                return 315576e5 * s;

              case "days":
              case "day":
              case "d":
                return s * i;

              case "hours":
              case "hour":
              case "hrs":
              case "hr":
              case "h":
                return s * o;

              case "minutes":
              case "minute":
              case "mins":
              case "min":
              case "m":
                return s * r;

              case "seconds":
              case "second":
              case "secs":
              case "sec":
              case "s":
                return s * n;

              case "milliseconds":
              case "millisecond":
              case "msecs":
              case "msec":
              case "ms":
                return s;

              default:
                return;
            }
        }(e);
        if ("number" === c && !1 === isNaN(e)) return t.long ? s(a = e, i, "day") || s(a, o, "hour") || s(a, r, "minute") || s(a, n, "second") || a + " ms" : function(e) {
            if (e >= i) return Math.round(e / i) + "d";
            if (e >= o) return Math.round(e / o) + "h";
            if (e >= r) return Math.round(e / r) + "m";
            if (e >= n) return Math.round(e / n) + "s";
            return e + "ms";
        }(e);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));
    };
}, function(e, t, n) {
    var r = n(24), o = n(25), i = Object.prototype.toString, s = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === i.call(Blob), a = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === i.call(File);
    t.deconstructPacket = function(e) {
        var t = [], n = e.data, i = e;
        return i.data = function e(t, n) {
            if (!t) return t;
            if (o(t)) {
                var i = {
                    _placeholder: !0,
                    num: n.length
                };
                return n.push(t), i;
            }
            if (r(t)) {
                for (var s = new Array(t.length), a = 0; a < t.length; a++) s[a] = e(t[a], n);
                return s;
            }
            if ("object" == typeof t && !(t instanceof Date)) {
                s = {};
                for (var c in t) s[c] = e(t[c], n);
                return s;
            }
            return t;
        }(n, t), i.attachments = t.length, {
            packet: i,
            buffers: t
        };
    }, t.reconstructPacket = function(e, t) {
        return e.data = function e(t, n) {
            if (!t) return t;
            if (t && !0 === t._placeholder) {
                if ("number" == typeof t.num && t.num >= 0 && t.num < n.length) return n[t.num];
                throw new Error("illegal attachments");
            }
            if (r(t)) for (var o = 0; o < t.length; o++) t[o] = e(t[o], n); else if ("object" == typeof t) for (var i in t) t[i] = e(t[i], n);
            return t;
        }(e.data, t), e.attachments = void 0, e;
    }, t.removeBlobs = function(e, t) {
        var n = 0, i = e;
        !function e(c, u, l) {
            if (!c) return c;
            if (s && c instanceof Blob || a && c instanceof File) {
                n++;
                var h = new FileReader;
                h.onload = function() {
                    l ? l[u] = this.result : i = this.result, --n || t(i);
                }, h.readAsArrayBuffer(c);
            } else if (r(c)) for (var f = 0; f < c.length; f++) e(c[f], f, c); else if ("object" == typeof c && !o(c)) for (var p in c) e(c[p], p, c);
        }(i), n || t(i);
    };
}, function(e, t, n) {
    "use strict";
    t.byteLength = function(e) {
        var t = u(e), n = t[0], r = t[1];
        return 3 * (n + r) / 4 - r;
    }, t.toByteArray = function(e) {
        var t, n, r = u(e), s = r[0], a = r[1], c = new i(function(e, t, n) {
            return 3 * (t + n) / 4 - n;
        }(0, s, a)), l = 0, h = a > 0 ? s - 4 : s;
        for (n = 0; n < h; n += 4) t = o[e.charCodeAt(n)] << 18 | o[e.charCodeAt(n + 1)] << 12 | o[e.charCodeAt(n + 2)] << 6 | o[e.charCodeAt(n + 3)], 
        c[l++] = t >> 16 & 255, c[l++] = t >> 8 & 255, c[l++] = 255 & t;
        2 === a && (t = o[e.charCodeAt(n)] << 2 | o[e.charCodeAt(n + 1)] >> 4, c[l++] = 255 & t);
        1 === a && (t = o[e.charCodeAt(n)] << 10 | o[e.charCodeAt(n + 1)] << 4 | o[e.charCodeAt(n + 2)] >> 2, 
        c[l++] = t >> 8 & 255, c[l++] = 255 & t);
        return c;
    }, t.fromByteArray = function(e) {
        for (var t, n = e.length, o = n % 3, i = [], s = 0, a = n - o; s < a; s += 16383) i.push(l(e, s, s + 16383 > a ? a : s + 16383));
        1 === o ? (t = e[n - 1], i.push(r[t >> 2] + r[t << 4 & 63] + "==")) : 2 === o && (t = (e[n - 2] << 8) + e[n - 1], 
        i.push(r[t >> 10] + r[t >> 4 & 63] + r[t << 2 & 63] + "="));
        return i.join("");
    };
    for (var r = [], o = [], i = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, c = s.length; a < c; ++a) r[a] = s[a], 
    o[s.charCodeAt(a)] = a;
    function u(e) {
        var t = e.length;
        if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
        var n = e.indexOf("=");
        return -1 === n && (n = t), [ n, n === t ? 0 : 4 - n % 4 ];
    }
    function l(e, t, n) {
        for (var o, i, s = [], a = t; a < n; a += 3) o = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (255 & e[a + 2]), 
        s.push(r[(i = o) >> 18 & 63] + r[i >> 12 & 63] + r[i >> 6 & 63] + r[63 & i]);
        return s.join("");
    }
    o["-".charCodeAt(0)] = 62, o["_".charCodeAt(0)] = 63;
}, function(e, t) {
    t.read = function(e, t, n, r, o) {
        var i, s, a = 8 * o - r - 1, c = (1 << a) - 1, u = c >> 1, l = -7, h = n ? o - 1 : 0, f = n ? -1 : 1, p = e[t + h];
        for (h += f, i = p & (1 << -l) - 1, p >>= -l, l += a; l > 0; i = 256 * i + e[t + h], 
        h += f, l -= 8) ;
        for (s = i & (1 << -l) - 1, i >>= -l, l += r; l > 0; s = 256 * s + e[t + h], h += f, 
        l -= 8) ;
        if (0 === i) i = 1 - u; else {
            if (i === c) return s ? NaN : 1 / 0 * (p ? -1 : 1);
            s += Math.pow(2, r), i -= u;
        }
        return (p ? -1 : 1) * s * Math.pow(2, i - r);
    }, t.write = function(e, t, n, r, o, i) {
        var s, a, c, u = 8 * i - o - 1, l = (1 << u) - 1, h = l >> 1, f = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0, p = r ? 0 : i - 1, d = r ? 1 : -1, m = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
        for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, s = l) : (s = Math.floor(Math.log(t) / Math.LN2), 
        t * (c = Math.pow(2, -s)) < 1 && (s--, c *= 2), (t += s + h >= 1 ? f / c : f * Math.pow(2, 1 - h)) * c >= 2 && (s++, 
        c /= 2), s + h >= l ? (a = 0, s = l) : s + h >= 1 ? (a = (t * c - 1) * Math.pow(2, o), 
        s += h) : (a = t * Math.pow(2, h - 1) * Math.pow(2, o), s = 0)); o >= 8; e[n + p] = 255 & a, 
        p += d, a /= 256, o -= 8) ;
        for (s = s << o | a, u += o; u > 0; e[n + p] = 255 & s, p += d, s /= 256, u -= 8) ;
        e[n + p - d] |= 128 * m;
    };
}, function(e, t) {
    var n = {}.toString;
    e.exports = Array.isArray || function(e) {
        return "[object Array]" == n.call(e);
    };
}, function(e, t, n) {
    e.exports = n(65), e.exports.parser = n(8);
}, function(e, t, n) {
    var r = n(27), o = n(7), i = n(13)("engine.io-client:socket"), s = n(31), a = n(8), c = n(23), u = n(11);
    function l(e, t) {
        if (!(this instanceof l)) return new l(e, t);
        t = t || {}, e && "object" == typeof e && (t = e, e = null), e ? (e = c(e), t.hostname = e.host, 
        t.secure = "https" === e.protocol || "wss" === e.protocol, t.port = e.port, e.query && (t.query = e.query)) : t.host && (t.hostname = c(t.host).host), 
        this.secure = null != t.secure ? t.secure : "undefined" != typeof location && "https:" === location.protocol, 
        t.hostname && !t.port && (t.port = this.secure ? "443" : "80"), this.agent = t.agent || !1, 
        this.hostname = t.hostname || ("undefined" != typeof location ? location.hostname : "localhost"), 
        this.port = t.port || ("undefined" != typeof location && location.port ? location.port : this.secure ? 443 : 80), 
        this.query = t.query || {}, "string" == typeof this.query && (this.query = u.decode(this.query)), 
        this.upgrade = !1 !== t.upgrade, this.path = (t.path || "/engine.io").replace(/\/$/, "") + "/", 
        this.forceJSONP = !!t.forceJSONP, this.jsonp = !1 !== t.jsonp, this.forceBase64 = !!t.forceBase64, 
        this.enablesXDR = !!t.enablesXDR, this.withCredentials = !1 !== t.withCredentials, 
        this.timestampParam = t.timestampParam || "t", this.timestampRequests = t.timestampRequests, 
        this.transports = t.transports || [ "polling", "websocket" ], this.transportOptions = t.transportOptions || {}, 
        this.readyState = "", this.writeBuffer = [], this.prevBufferLen = 0, this.policyPort = t.policyPort || 843, 
        this.rememberUpgrade = t.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = t.onlyBinaryUpgrades, 
        this.perMessageDeflate = !1 !== t.perMessageDeflate && (t.perMessageDeflate || {}), 
        !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), 
        this.pfx = t.pfx || void 0, this.key = t.key || void 0, this.passphrase = t.passphrase || void 0, 
        this.cert = t.cert || void 0, this.ca = t.ca || void 0, this.ciphers = t.ciphers || void 0, 
        this.rejectUnauthorized = void 0 === t.rejectUnauthorized || t.rejectUnauthorized, 
        this.forceNode = !!t.forceNode, this.isReactNative = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase(), 
        ("undefined" == typeof self || this.isReactNative) && (t.extraHeaders && Object.keys(t.extraHeaders).length > 0 && (this.extraHeaders = t.extraHeaders), 
        t.localAddress && (this.localAddress = t.localAddress)), this.id = null, this.upgrades = null, 
        this.pingInterval = null, this.pingTimeout = null, this.pingIntervalTimer = null, 
        this.pingTimeoutTimer = null, this.open();
    }
    e.exports = l, l.priorWebsocketSuccess = !1, o(l.prototype), l.protocol = a.protocol, 
    l.Socket = l, l.Transport = n(20), l.transports = n(27), l.parser = n(8), l.prototype.createTransport = function(e) {
        i('creating transport "%s"', e);
        var t = function(e) {
            var t = {};
            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
            return t;
        }(this.query);
        t.EIO = a.protocol, t.transport = e;
        var n = this.transportOptions[e] || {};
        return this.id && (t.sid = this.id), new r[e]({
            query: t,
            socket: this,
            agent: n.agent || this.agent,
            hostname: n.hostname || this.hostname,
            port: n.port || this.port,
            secure: n.secure || this.secure,
            path: n.path || this.path,
            forceJSONP: n.forceJSONP || this.forceJSONP,
            jsonp: n.jsonp || this.jsonp,
            forceBase64: n.forceBase64 || this.forceBase64,
            enablesXDR: n.enablesXDR || this.enablesXDR,
            withCredentials: n.withCredentials || this.withCredentials,
            timestampRequests: n.timestampRequests || this.timestampRequests,
            timestampParam: n.timestampParam || this.timestampParam,
            policyPort: n.policyPort || this.policyPort,
            pfx: n.pfx || this.pfx,
            key: n.key || this.key,
            passphrase: n.passphrase || this.passphrase,
            cert: n.cert || this.cert,
            ca: n.ca || this.ca,
            ciphers: n.ciphers || this.ciphers,
            rejectUnauthorized: n.rejectUnauthorized || this.rejectUnauthorized,
            perMessageDeflate: n.perMessageDeflate || this.perMessageDeflate,
            extraHeaders: n.extraHeaders || this.extraHeaders,
            forceNode: n.forceNode || this.forceNode,
            localAddress: n.localAddress || this.localAddress,
            requestTimeout: n.requestTimeout || this.requestTimeout,
            protocols: n.protocols || void 0,
            isReactNative: this.isReactNative
        });
    }, l.prototype.open = function() {
        var e;
        if (this.rememberUpgrade && l.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) e = "websocket"; else {
            if (0 === this.transports.length) {
                var t = this;
                return void setTimeout((function() {
                    t.emit("error", "No transports available");
                }), 0);
            }
            e = this.transports[0];
        }
        this.readyState = "opening";
        try {
            e = this.createTransport(e);
        } catch (e) {
            return this.transports.shift(), void this.open();
        }
        e.open(), this.setTransport(e);
    }, l.prototype.setTransport = function(e) {
        i("setting transport %s", e.name);
        var t = this;
        this.transport && (i("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), 
        this.transport = e, e.on("drain", (function() {
            t.onDrain();
        })).on("packet", (function(e) {
            t.onPacket(e);
        })).on("error", (function(e) {
            t.onError(e);
        })).on("close", (function() {
            t.onClose("transport close");
        }));
    }, l.prototype.probe = function(e) {
        i('probing transport "%s"', e);
        var t = this.createTransport(e, {
            probe: 1
        }), n = !1, r = this;
        function o() {
            if (r.onlyBinaryUpgrades) {
                var o = !this.supportsBinary && r.transport.supportsBinary;
                n = n || o;
            }
            n || (i('probe transport "%s" opened', e), t.send([ {
                type: "ping",
                data: "probe"
            } ]), t.once("packet", (function(o) {
                if (!n) if ("pong" === o.type && "probe" === o.data) {
                    if (i('probe transport "%s" pong', e), r.upgrading = !0, r.emit("upgrading", t), 
                    !t) return;
                    l.priorWebsocketSuccess = "websocket" === t.name, i('pausing current transport "%s"', r.transport.name), 
                    r.transport.pause((function() {
                        n || "closed" !== r.readyState && (i("changing transport and sending upgrade packet"), 
                        f(), r.setTransport(t), t.send([ {
                            type: "upgrade"
                        } ]), r.emit("upgrade", t), t = null, r.upgrading = !1, r.flush());
                    }));
                } else {
                    i('probe transport "%s" failed', e);
                    var s = new Error("probe error");
                    s.transport = t.name, r.emit("upgradeError", s);
                }
            })));
        }
        function s() {
            n || (n = !0, f(), t.close(), t = null);
        }
        function a(n) {
            var o = new Error("probe error: " + n);
            o.transport = t.name, s(), i('probe transport "%s" failed because of error: %s', e, n), 
            r.emit("upgradeError", o);
        }
        function c() {
            a("transport closed");
        }
        function u() {
            a("socket closed");
        }
        function h(e) {
            t && e.name !== t.name && (i('"%s" works - aborting "%s"', e.name, t.name), s());
        }
        function f() {
            t.removeListener("open", o), t.removeListener("error", a), t.removeListener("close", c), 
            r.removeListener("close", u), r.removeListener("upgrading", h);
        }
        l.priorWebsocketSuccess = !1, t.once("open", o), t.once("error", a), t.once("close", c), 
        this.once("close", u), this.once("upgrading", h), t.open();
    }, l.prototype.onOpen = function() {
        if (i("socket open"), this.readyState = "open", l.priorWebsocketSuccess = "websocket" === this.transport.name, 
        this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause) {
            i("starting upgrade probes");
            for (var e = 0, t = this.upgrades.length; e < t; e++) this.probe(this.upgrades[e]);
        }
    }, l.prototype.onPacket = function(e) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (i('socket receive: type "%s", data "%s"', e.type, e.data), 
        this.emit("packet", e), this.emit("heartbeat"), e.type) {
          case "open":
            this.onHandshake(JSON.parse(e.data));
            break;

          case "pong":
            this.setPing(), this.emit("pong");
            break;

          case "error":
            var t = new Error("server error");
            t.code = e.data, this.onError(t);
            break;

          case "message":
            this.emit("data", e.data), this.emit("message", e.data);
        } else i('packet received with socket readyState "%s"', this.readyState);
    }, l.prototype.onHandshake = function(e) {
        this.emit("handshake", e), this.id = e.sid, this.transport.query.sid = e.sid, this.upgrades = this.filterUpgrades(e.upgrades), 
        this.pingInterval = e.pingInterval, this.pingTimeout = e.pingTimeout, this.onOpen(), 
        "closed" !== this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), 
        this.on("heartbeat", this.onHeartbeat));
    }, l.prototype.onHeartbeat = function(e) {
        clearTimeout(this.pingTimeoutTimer);
        var t = this;
        t.pingTimeoutTimer = setTimeout((function() {
            "closed" !== t.readyState && t.onClose("ping timeout");
        }), e || t.pingInterval + t.pingTimeout);
    }, l.prototype.setPing = function() {
        var e = this;
        clearTimeout(e.pingIntervalTimer), e.pingIntervalTimer = setTimeout((function() {
            i("writing ping packet - expecting pong within %sms", e.pingTimeout), e.ping(), 
            e.onHeartbeat(e.pingTimeout);
        }), e.pingInterval);
    }, l.prototype.ping = function() {
        var e = this;
        this.sendPacket("ping", (function() {
            e.emit("ping");
        }));
    }, l.prototype.onDrain = function() {
        this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush();
    }, l.prototype.flush = function() {
        "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (i("flushing %d packets in socket", this.writeBuffer.length), 
        this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, 
        this.emit("flush"));
    }, l.prototype.write = l.prototype.send = function(e, t, n) {
        return this.sendPacket("message", e, t, n), this;
    }, l.prototype.sendPacket = function(e, t, n, r) {
        if ("function" == typeof t && (r = t, t = void 0), "function" == typeof n && (r = n, 
        n = null), "closing" !== this.readyState && "closed" !== this.readyState) {
            (n = n || {}).compress = !1 !== n.compress;
            var o = {
                type: e,
                data: t,
                options: n
            };
            this.emit("packetCreate", o), this.writeBuffer.push(o), r && this.once("flush", r), 
            this.flush();
        }
    }, l.prototype.close = function() {
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            var e = this;
            this.writeBuffer.length ? this.once("drain", (function() {
                this.upgrading ? r() : t();
            })) : this.upgrading ? r() : t();
        }
        function t() {
            e.onClose("forced close"), i("socket closing - telling transport to close"), e.transport.close();
        }
        function n() {
            e.removeListener("upgrade", n), e.removeListener("upgradeError", n), t();
        }
        function r() {
            e.once("upgrade", n), e.once("upgradeError", n);
        }
        return this;
    }, l.prototype.onError = function(e) {
        i("socket error %j", e), l.priorWebsocketSuccess = !1, this.emit("error", e), this.onClose("transport error", e);
    }, l.prototype.onClose = function(e, t) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
            i('socket close with reason: "%s"', e);
            clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), 
            this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", 
            this.id = null, this.emit("close", e, t), this.writeBuffer = [], this.prevBufferLen = 0;
        }
    }, l.prototype.filterUpgrades = function(e) {
        for (var t = [], n = 0, r = e.length; n < r; n++) ~s(this.transports, e[n]) && t.push(e[n]);
        return t;
    };
}, function(e, t) {
    try {
        e.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest;
    } catch (t) {
        e.exports = !1;
    }
}, function(e, t, n) {
    var r = n(18), o = n(28), i = n(7), s = n(12), a = n(13)("engine.io-client:polling-xhr"), c = n(19);
    function u() {}
    function l(e) {
        if (o.call(this, e), this.requestTimeout = e.requestTimeout, this.extraHeaders = e.extraHeaders, 
        "undefined" != typeof location) {
            var t = "https:" === location.protocol, n = location.port;
            n || (n = t ? 443 : 80), this.xd = "undefined" != typeof location && e.hostname !== location.hostname || n !== e.port, 
            this.xs = e.secure !== t;
        }
    }
    function h(e) {
        this.method = e.method || "GET", this.uri = e.uri, this.xd = !!e.xd, this.xs = !!e.xs, 
        this.async = !1 !== e.async, this.data = void 0 !== e.data ? e.data : null, this.agent = e.agent, 
        this.isBinary = e.isBinary, this.supportsBinary = e.supportsBinary, this.enablesXDR = e.enablesXDR, 
        this.withCredentials = e.withCredentials, this.requestTimeout = e.requestTimeout, 
        this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert = e.cert, 
        this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized, 
        this.extraHeaders = e.extraHeaders, this.create();
    }
    if (e.exports = l, e.exports.Request = h, s(l, o), l.prototype.supportsBinary = !0, 
    l.prototype.request = function(e) {
        return (e = e || {}).uri = this.uri(), e.xd = this.xd, e.xs = this.xs, e.agent = this.agent || !1, 
        e.supportsBinary = this.supportsBinary, e.enablesXDR = this.enablesXDR, e.withCredentials = this.withCredentials, 
        e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, 
        e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized, 
        e.requestTimeout = this.requestTimeout, e.extraHeaders = this.extraHeaders, new h(e);
    }, l.prototype.doWrite = function(e, t) {
        var n = "string" != typeof e && void 0 !== e, r = this.request({
            method: "POST",
            data: e,
            isBinary: n
        }), o = this;
        r.on("success", t), r.on("error", (function(e) {
            o.onError("xhr post error", e);
        })), this.sendXhr = r;
    }, l.prototype.doPoll = function() {
        a("xhr poll");
        var e = this.request(), t = this;
        e.on("data", (function(e) {
            t.onData(e);
        })), e.on("error", (function(e) {
            t.onError("xhr poll error", e);
        })), this.pollXhr = e;
    }, i(h.prototype), h.prototype.create = function() {
        var e = {
            agent: this.agent,
            xdomain: this.xd,
            xscheme: this.xs,
            enablesXDR: this.enablesXDR
        };
        e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, 
        e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized;
        var t = this.xhr = new r(e), n = this;
        try {
            a("xhr open %s: %s", this.method, this.uri), t.open(this.method, this.uri, this.async);
            try {
                if (this.extraHeaders) for (var o in t.setDisableHeaderCheck && t.setDisableHeaderCheck(!0), 
                this.extraHeaders) this.extraHeaders.hasOwnProperty(o) && t.setRequestHeader(o, this.extraHeaders[o]);
            } catch (e) {}
            if ("POST" === this.method) try {
                this.isBinary ? t.setRequestHeader("Content-type", "application/octet-stream") : t.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
            } catch (e) {}
            try {
                t.setRequestHeader("Accept", "*/*");
            } catch (e) {}
            "withCredentials" in t && (t.withCredentials = this.withCredentials), this.requestTimeout && (t.timeout = this.requestTimeout), 
            this.hasXDR() ? (t.onload = function() {
                n.onLoad();
            }, t.onerror = function() {
                n.onError(t.responseText);
            }) : t.onreadystatechange = function() {
                if (2 === t.readyState) try {
                    var e = t.getResponseHeader("Content-Type");
                    (n.supportsBinary && "application/octet-stream" === e || "application/octet-stream; charset=UTF-8" === e) && (t.responseType = "arraybuffer");
                } catch (e) {}
                4 === t.readyState && (200 === t.status || 1223 === t.status ? n.onLoad() : setTimeout((function() {
                    n.onError("number" == typeof t.status ? t.status : 0);
                }), 0));
            }, a("xhr data %s", this.data), t.send(this.data);
        } catch (e) {
            return void setTimeout((function() {
                n.onError(e);
            }), 0);
        }
        "undefined" != typeof document && (this.index = h.requestsCount++, h.requests[this.index] = this);
    }, h.prototype.onSuccess = function() {
        this.emit("success"), this.cleanup();
    }, h.prototype.onData = function(e) {
        this.emit("data", e), this.onSuccess();
    }, h.prototype.onError = function(e) {
        this.emit("error", e), this.cleanup(!0);
    }, h.prototype.cleanup = function(e) {
        if (void 0 !== this.xhr && null !== this.xhr) {
            if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = u : this.xhr.onreadystatechange = u, 
            e) try {
                this.xhr.abort();
            } catch (e) {}
            "undefined" != typeof document && delete h.requests[this.index], this.xhr = null;
        }
    }, h.prototype.onLoad = function() {
        var e;
        try {
            var t;
            try {
                t = this.xhr.getResponseHeader("Content-Type");
            } catch (e) {}
            e = ("application/octet-stream" === t || "application/octet-stream; charset=UTF-8" === t) && this.xhr.response || this.xhr.responseText;
        } catch (e) {
            this.onError(e);
        }
        null != e && this.onData(e);
    }, h.prototype.hasXDR = function() {
        return "undefined" != typeof XDomainRequest && !this.xs && this.enablesXDR;
    }, h.prototype.abort = function() {
        this.cleanup();
    }, h.requestsCount = 0, h.requests = {}, "undefined" != typeof document) if ("function" == typeof attachEvent) attachEvent("onunload", f); else if ("function" == typeof addEventListener) {
        addEventListener("onpagehide" in c ? "pagehide" : "unload", f, !1);
    }
    function f() {
        for (var e in h.requests) h.requests.hasOwnProperty(e) && h.requests[e].abort();
    }
}, function(e, t) {
    e.exports = Object.keys || function(e) {
        var t = [], n = Object.prototype.hasOwnProperty;
        for (var r in e) n.call(e, r) && t.push(r);
        return t;
    };
}, function(e, t) {
    var n = {}.toString;
    e.exports = Array.isArray || function(e) {
        return "[object Array]" == n.call(e);
    };
}, function(e, t) {
    e.exports = function(e, t, n) {
        var r = e.byteLength;
        if (t = t || 0, n = n || r, e.slice) return e.slice(t, n);
        if (t < 0 && (t += r), n < 0 && (n += r), n > r && (n = r), t >= r || t >= n || 0 === r) return new ArrayBuffer(0);
        for (var o = new Uint8Array(e), i = new Uint8Array(n - t), s = t, a = 0; s < n; s++, 
        a++) i[a] = o[s];
        return i.buffer;
    };
}, function(e, t) {
    function n() {}
    e.exports = function(e, t, r) {
        var o = !1;
        return r = r || n, i.count = e, 0 === e ? t() : i;
        function i(e, n) {
            if (i.count <= 0) throw new Error("after called too many times");
            --i.count, e ? (o = !0, t(e), t = r) : 0 !== i.count || o || t(null, n);
        }
    };
}, function(e, t) {
    var n, r, o, i = String.fromCharCode;
    function s(e) {
        for (var t, n, r = [], o = 0, i = e.length; o < i; ) (t = e.charCodeAt(o++)) >= 55296 && t <= 56319 && o < i ? 56320 == (64512 & (n = e.charCodeAt(o++))) ? r.push(((1023 & t) << 10) + (1023 & n) + 65536) : (r.push(t), 
        o--) : r.push(t);
        return r;
    }
    function a(e, t) {
        if (e >= 55296 && e <= 57343) {
            if (t) throw Error("Lone surrogate U+" + e.toString(16).toUpperCase() + " is not a scalar value");
            return !1;
        }
        return !0;
    }
    function c(e, t) {
        return i(e >> t & 63 | 128);
    }
    function u(e, t) {
        if (0 == (4294967168 & e)) return i(e);
        var n = "";
        return 0 == (4294965248 & e) ? n = i(e >> 6 & 31 | 192) : 0 == (4294901760 & e) ? (a(e, t) || (e = 65533), 
        n = i(e >> 12 & 15 | 224), n += c(e, 6)) : 0 == (4292870144 & e) && (n = i(e >> 18 & 7 | 240), 
        n += c(e, 12), n += c(e, 6)), n += i(63 & e | 128);
    }
    function l() {
        if (o >= r) throw Error("Invalid byte index");
        var e = 255 & n[o];
        if (o++, 128 == (192 & e)) return 63 & e;
        throw Error("Invalid continuation byte");
    }
    function h(e) {
        var t, i;
        if (o > r) throw Error("Invalid byte index");
        if (o == r) return !1;
        if (t = 255 & n[o], o++, 0 == (128 & t)) return t;
        if (192 == (224 & t)) {
            if ((i = (31 & t) << 6 | l()) >= 128) return i;
            throw Error("Invalid continuation byte");
        }
        if (224 == (240 & t)) {
            if ((i = (15 & t) << 12 | l() << 6 | l()) >= 2048) return a(i, e) ? i : 65533;
            throw Error("Invalid continuation byte");
        }
        if (240 == (248 & t) && (i = (7 & t) << 18 | l() << 12 | l() << 6 | l()) >= 65536 && i <= 1114111) return i;
        throw Error("Invalid UTF-8 detected");
    }
    e.exports = {
        version: "2.1.2",
        encode: function(e, t) {
            for (var n = !1 !== (t = t || {}).strict, r = s(e), o = r.length, i = -1, a = ""; ++i < o; ) a += u(r[i], n);
            return a;
        },
        decode: function(e, t) {
            var a = !1 !== (t = t || {}).strict;
            n = s(e), r = n.length, o = 0;
            for (var c, u = []; !1 !== (c = h(a)); ) u.push(c);
            return function(e) {
                for (var t, n = e.length, r = -1, o = ""; ++r < n; ) (t = e[r]) > 65535 && (o += i((t -= 65536) >>> 10 & 1023 | 55296), 
                t = 56320 | 1023 & t), o += i(t);
                return o;
            }(u);
        }
    };
}, function(e, t) {
    !function(e) {
        "use strict";
        t.encode = function(t) {
            var n, r = new Uint8Array(t), o = r.length, i = "";
            for (n = 0; n < o; n += 3) i += e[r[n] >> 2], i += e[(3 & r[n]) << 4 | r[n + 1] >> 4], 
            i += e[(15 & r[n + 1]) << 2 | r[n + 2] >> 6], i += e[63 & r[n + 2]];
            return o % 3 == 2 ? i = i.substring(0, i.length - 1) + "=" : o % 3 == 1 && (i = i.substring(0, i.length - 2) + "=="), 
            i;
        }, t.decode = function(t) {
            var n, r, o, i, s, a = .75 * t.length, c = t.length, u = 0;
            "=" === t[t.length - 1] && (a--, "=" === t[t.length - 2] && a--);
            var l = new ArrayBuffer(a), h = new Uint8Array(l);
            for (n = 0; n < c; n += 4) r = e.indexOf(t[n]), o = e.indexOf(t[n + 1]), i = e.indexOf(t[n + 2]), 
            s = e.indexOf(t[n + 3]), h[u++] = r << 2 | o >> 4, h[u++] = (15 & o) << 4 | i >> 2, 
            h[u++] = (3 & i) << 6 | 63 & s;
            return l;
        };
    }("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
}, function(e, t) {
    var n = void 0 !== n ? n : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder && MozBlobBuilder, r = function() {
        try {
            return 2 === new Blob([ "hi" ]).size;
        } catch (e) {
            return !1;
        }
    }(), o = r && function() {
        try {
            return 2 === new Blob([ new Uint8Array([ 1, 2 ]) ]).size;
        } catch (e) {
            return !1;
        }
    }(), i = n && n.prototype.append && n.prototype.getBlob;
    function s(e) {
        return e.map((function(e) {
            if (e.buffer instanceof ArrayBuffer) {
                var t = e.buffer;
                if (e.byteLength !== t.byteLength) {
                    var n = new Uint8Array(e.byteLength);
                    n.set(new Uint8Array(t, e.byteOffset, e.byteLength)), t = n.buffer;
                }
                return t;
            }
            return e;
        }));
    }
    function a(e, t) {
        t = t || {};
        var r = new n;
        return s(e).forEach((function(e) {
            r.append(e);
        })), t.type ? r.getBlob(t.type) : r.getBlob();
    }
    function c(e, t) {
        return new Blob(s(e), t || {});
    }
    "undefined" != typeof Blob && (a.prototype = Blob.prototype, c.prototype = Blob.prototype), 
    e.exports = r ? o ? Blob : c : i ? a : void 0;
}, function(e, t, n) {
    function r(e) {
        var n;
        function r() {
            if (r.enabled) {
                var e = r, o = +new Date, i = o - (n || o);
                e.diff = i, e.prev = n, e.curr = o, n = o;
                for (var s = new Array(arguments.length), a = 0; a < s.length; a++) s[a] = arguments[a];
                s[0] = t.coerce(s[0]), "string" != typeof s[0] && s.unshift("%O");
                var c = 0;
                s[0] = s[0].replace(/%([a-zA-Z%])/g, (function(n, r) {
                    if ("%%" === n) return n;
                    c++;
                    var o = t.formatters[r];
                    if ("function" == typeof o) {
                        var i = s[c];
                        n = o.call(e, i), s.splice(c, 1), c--;
                    }
                    return n;
                })), t.formatArgs.call(e, s);
                var u = r.log || t.log || console.log.bind(console);
                u.apply(e, s);
            }
        }
        return r.namespace = e, r.enabled = t.enabled(e), r.useColors = t.useColors(), r.color = function(e) {
            var n, r = 0;
            for (n in e) r = (r << 5) - r + e.charCodeAt(n), r |= 0;
            return t.colors[Math.abs(r) % t.colors.length];
        }(e), r.destroy = o, "function" == typeof t.init && t.init(r), t.instances.push(r), 
        r;
    }
    function o() {
        var e = t.instances.indexOf(this);
        return -1 !== e && (t.instances.splice(e, 1), !0);
    }
    (t = e.exports = r.debug = r.default = r).coerce = function(e) {
        return e instanceof Error ? e.stack || e.message : e;
    }, t.disable = function() {
        t.enable("");
    }, t.enable = function(e) {
        var n;
        t.save(e), t.names = [], t.skips = [];
        var r = ("string" == typeof e ? e : "").split(/[\s,]+/), o = r.length;
        for (n = 0; n < o; n++) r[n] && ("-" === (e = r[n].replace(/\*/g, ".*?"))[0] ? t.skips.push(new RegExp("^" + e.substr(1) + "$")) : t.names.push(new RegExp("^" + e + "$")));
        for (n = 0; n < t.instances.length; n++) {
            var i = t.instances[n];
            i.enabled = t.enabled(i.namespace);
        }
    }, t.enabled = function(e) {
        if ("*" === e[e.length - 1]) return !0;
        var n, r;
        for (n = 0, r = t.skips.length; n < r; n++) if (t.skips[n].test(e)) return !1;
        for (n = 0, r = t.names.length; n < r; n++) if (t.names[n].test(e)) return !0;
        return !1;
    }, t.humanize = n(76), t.instances = [], t.names = [], t.skips = [], t.formatters = {};
}, function(e, t) {
    var n = 1e3, r = 6e4, o = 60 * r, i = 24 * o;
    function s(e, t, n) {
        if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + n : Math.ceil(e / t) + " " + n + "s";
    }
    e.exports = function(e, t) {
        t = t || {};
        var a, c = typeof e;
        if ("string" === c && e.length > 0) return function(e) {
            if ((e = String(e)).length > 100) return;
            var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
            if (!t) return;
            var s = parseFloat(t[1]);
            switch ((t[2] || "ms").toLowerCase()) {
              case "years":
              case "year":
              case "yrs":
              case "yr":
              case "y":
                return 315576e5 * s;

              case "days":
              case "day":
              case "d":
                return s * i;

              case "hours":
              case "hour":
              case "hrs":
              case "hr":
              case "h":
                return s * o;

              case "minutes":
              case "minute":
              case "mins":
              case "min":
              case "m":
                return s * r;

              case "seconds":
              case "second":
              case "secs":
              case "sec":
              case "s":
                return s * n;

              case "milliseconds":
              case "millisecond":
              case "msecs":
              case "msec":
              case "ms":
                return s;

              default:
                return;
            }
        }(e);
        if ("number" === c && !1 === isNaN(e)) return t.long ? s(a = e, i, "day") || s(a, o, "hour") || s(a, r, "minute") || s(a, n, "second") || a + " ms" : function(e) {
            if (e >= i) return Math.round(e / i) + "d";
            if (e >= o) return Math.round(e / o) + "h";
            if (e >= r) return Math.round(e / r) + "m";
            if (e >= n) return Math.round(e / n) + "s";
            return e + "ms";
        }(e);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));
    };
}, function(e, t, n) {
    var r = n(28), o = n(12), i = n(19);
    e.exports = l;
    var s, a = /\n/g, c = /\\n/g;
    function u() {}
    function l(e) {
        r.call(this, e), this.query = this.query || {}, s || (s = i.___eio = i.___eio || []), 
        this.index = s.length;
        var t = this;
        s.push((function(e) {
            t.onData(e);
        })), this.query.j = this.index, "function" == typeof addEventListener && addEventListener("beforeunload", (function() {
            t.script && (t.script.onerror = u);
        }), !1);
    }
    o(l, r), l.prototype.supportsBinary = !1, l.prototype.doClose = function() {
        this.script && (this.script.parentNode.removeChild(this.script), this.script = null), 
        this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), 
        r.prototype.doClose.call(this);
    }, l.prototype.doPoll = function() {
        var e = this, t = document.createElement("script");
        this.script && (this.script.parentNode.removeChild(this.script), this.script = null), 
        t.async = !0, t.src = this.uri(), t.onerror = function(t) {
            e.onError("jsonp poll error", t);
        };
        var n = document.getElementsByTagName("script")[0];
        n ? n.parentNode.insertBefore(t, n) : (document.head || document.body).appendChild(t), 
        this.script = t, "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout((function() {
            var e = document.createElement("iframe");
            document.body.appendChild(e), document.body.removeChild(e);
        }), 100);
    }, l.prototype.doWrite = function(e, t) {
        var n = this;
        if (!this.form) {
            var r, o = document.createElement("form"), i = document.createElement("textarea"), s = this.iframeId = "eio_iframe_" + this.index;
            o.className = "socketio", o.style.position = "absolute", o.style.top = "-1000px", 
            o.style.left = "-1000px", o.target = s, o.method = "POST", o.setAttribute("accept-charset", "utf-8"), 
            i.name = "d", o.appendChild(i), document.body.appendChild(o), this.form = o, this.area = i;
        }
        function u() {
            l(), t();
        }
        function l() {
            if (n.iframe) try {
                n.form.removeChild(n.iframe);
            } catch (e) {
                n.onError("jsonp polling iframe removal error", e);
            }
            try {
                var e = '<iframe src="javascript:0" name="' + n.iframeId + '">';
                r = document.createElement(e);
            } catch (e) {
                (r = document.createElement("iframe")).name = n.iframeId, r.src = "javascript:0";
            }
            r.id = n.iframeId, n.form.appendChild(r), n.iframe = r;
        }
        this.form.action = this.uri(), l(), e = e.replace(c, "\\\n"), this.area.value = e.replace(a, "\\n");
        try {
            this.form.submit();
        } catch (e) {}
        this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
            "complete" === n.iframe.readyState && u();
        } : this.iframe.onload = u;
    };
}, function(e, t, n) {
    (function(t) {
        var r, o, i = n(20), s = n(8), a = n(11), c = n(12), u = n(30), l = n(13)("engine.io-client:websocket");
        if ("undefined" != typeof WebSocket ? r = WebSocket : "undefined" != typeof self && (r = self.WebSocket || self.MozWebSocket), 
        "undefined" == typeof window) try {
            o = n(79);
        } catch (e) {}
        var h = r || o;
        function f(e) {
            e && e.forceBase64 && (this.supportsBinary = !1), this.perMessageDeflate = e.perMessageDeflate, 
            this.usingBrowserWebSocket = r && !e.forceNode, this.protocols = e.protocols, this.usingBrowserWebSocket || (h = o), 
            i.call(this, e);
        }
        e.exports = f, c(f, i), f.prototype.name = "websocket", f.prototype.supportsBinary = !0, 
        f.prototype.doOpen = function() {
            if (this.check()) {
                var e = this.uri(), t = this.protocols, n = {};
                this.isReactNative || (n.agent = this.agent, n.perMessageDeflate = this.perMessageDeflate, 
                n.pfx = this.pfx, n.key = this.key, n.passphrase = this.passphrase, n.cert = this.cert, 
                n.ca = this.ca, n.ciphers = this.ciphers, n.rejectUnauthorized = this.rejectUnauthorized), 
                this.extraHeaders && (n.headers = this.extraHeaders), this.localAddress && (n.localAddress = this.localAddress);
                try {
                    this.ws = this.usingBrowserWebSocket && !this.isReactNative ? t ? new h(e, t) : new h(e) : new h(e, t, n);
                } catch (e) {
                    return this.emit("error", e);
                }
                void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, 
                this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners();
            }
        }, f.prototype.addEventListeners = function() {
            var e = this;
            this.ws.onopen = function() {
                e.onOpen();
            }, this.ws.onclose = function() {
                e.onClose();
            }, this.ws.onmessage = function(t) {
                e.onData(t.data);
            }, this.ws.onerror = function(t) {
                e.onError("websocket error", t);
            };
        }, f.prototype.write = function(e) {
            var n = this;
            this.writable = !1;
            for (var r = e.length, o = 0, i = r; o < i; o++) !function(e) {
                s.encodePacket(e, n.supportsBinary, (function(o) {
                    if (!n.usingBrowserWebSocket) {
                        var i = {};
                        if (e.options && (i.compress = e.options.compress), n.perMessageDeflate) ("string" == typeof o ? t.byteLength(o) : o.length) < n.perMessageDeflate.threshold && (i.compress = !1);
                    }
                    try {
                        n.usingBrowserWebSocket ? n.ws.send(o) : n.ws.send(o, i);
                    } catch (e) {
                        l("websocket closed before onclose event");
                    }
                    --r || a();
                }));
            }(e[o]);
            function a() {
                n.emit("flush"), setTimeout((function() {
                    n.writable = !0, n.emit("drain");
                }), 0);
            }
        }, f.prototype.onClose = function() {
            i.prototype.onClose.call(this);
        }, f.prototype.doClose = function() {
            void 0 !== this.ws && this.ws.close();
        }, f.prototype.uri = function() {
            var e = this.query || {}, t = this.secure ? "wss" : "ws", n = "";
            return this.port && ("wss" === t && 443 !== Number(this.port) || "ws" === t && 80 !== Number(this.port)) && (n = ":" + this.port), 
            this.timestampRequests && (e[this.timestampParam] = u()), this.supportsBinary || (e.b64 = 1), 
            (e = a.encode(e)).length && (e = "?" + e), t + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + n + this.path + e;
        }, f.prototype.check = function() {
            return !(!h || "__initialize" in h && this.name === f.prototype.name);
        };
    }).call(this, n(17).Buffer);
}, function(e, t) {}, function(e, t) {
    e.exports = function(e, t) {
        for (var n = [], r = (t = t || 0) || 0; r < e.length; r++) n[r - t] = e[r];
        return n;
    };
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n(0), o = n(3);
    t.default = e => {
        e.checkUpdate = function() {
            var t = e.varCache, n = e.checkUpdate.typeList, i = r.a.isChrome && !e.isOperaNext ? "chrome" : r.a.isFirefox && e.firefoxNoStore ? "firefox" : r.a.isGM ? "gm" : r.a.isSafari ? "safari" : void 0;
            if (n[i]) {
                var s = e.liteStorage.isExpire("lastVersionExpire");
                t.isUpgrade && (s = !0), s && (e.liteStorage.set("lastVersion", ""), e.liteStorage.setExpire("lastVersionExpire", 86400), 
                Object(o.a)({
                    type: "GET",
                    url: n[i].url,
                    cache: !1
                }, (function(t, r) {
                    if (!t) {
                        var o = n[i].getVersion(r.body);
                        o && (e.liteStorage.set("lastVersion", o), e.liteStorage.setExpire("lastVersionExpire", 604800));
                    }
                })));
            }
        }, e.checkUpdate.typeList = {
            chrome: {
                url: "https://download.sf-helper.com/chrome/updates-3.xml",
                getVersion: function(e) {
                    var t = /updatecheck.+version=['"](.+)['"]/.exec(e);
                    return t = t && t[1];
                }
            },
            firefox: {
                url: "https://download.sf-helper.com/mozilla/updates.json",
                getVersion: function(e) {
                    var t = null;
                    try {
                        var n = JSON.parse(e);
                        t = n.addons[Object.keys(n.addons)[0]].updates;
                    } catch (e) {}
                    if (t) {
                        var r = null;
                        return t.some((function(e) {
                            return r = e.version;
                        })), r;
                    }
                }
            },
            safari: {
                url: "https://download.sf-helper.com/safari/update.plist",
                getVersion: function(e) {
                    if ("string" == typeof e) {
                        var t = e.indexOf("<key>CFBundleVersion</key>");
                        if (-1 !== t) {
                            e = e.substr(t);
                            var n = /<string>(.+)<\/string>/.exec(e);
                            return n = n && n[1];
                        }
                    }
                }
            },
            gm: {
                url: "https://download.sf-helper.com/chrome/helper.meta.js",
                getVersion: function(e) {
                    var t = /@version\s+(.+)\s*\r?\n/.exec(e);
                    return t = t && t[1];
                }
            }
        }, e.loader.when("prepare", (function() {
            e.checkUpdate();
        }));
    };
}, function(e, t, n) {
    "use strict";
    n.r(t);
    t.default = e => {
        e.hasMenuTutorial = !0;
    };
}, function(e, t, n) {
    "use strict";
    n.r(t);
    t.default = e => {
        e.errorCatch = {
            onError: function(t) {
                var n = t.filename, r = t.message;
                n && r && (n = (n = String(n).match(/\/([^\/]+)$/)) && n[1]) && (t.lineno && (n += ":" + t.lineno), 
                "_generated_background_page.html:1" !== n && e.actionList.trackError({
                    desc: [ n, r ].join(" ")
                }));
            },
            enable: function() {
                window.addEventListener && window.addEventListener("error", this.onError);
            },
            disable: function() {
                window.removeEventListener && window.removeEventListener("error", this.onError);
            }
        }, e.errorCatch.enable();
    };
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n(0);
    function o(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e;
    }
    var i = n(3), s = n(1);
    function a(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t && (r = r.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
            }))), n.push.apply(n, r);
        }
        return n;
    }
    const c = Object(s.a)("utils");
    let u = null;
    var l = {
        getFileSize: function(e, t) {
            const {url: n, requestOptions: r = {}} = e;
            var s = {
                fileSize: 0,
                fileType: "",
                status: 0,
                error: !1
            };
            return Object(i.a)(function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? a(Object(n), !0).forEach((function(t) {
                        o(e, t, n[t]);
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : a(Object(n)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                    }));
                }
                return e;
            }({
                url: n,
                type: "HEAD"
            }, r), (function(e, n) {
                if (e) return s.error = !0, t(s);
                s.status = n.statusCode, s.fileSize = parseInt(n.headers["content-length"]) || 0;
                var r = n.headers["content-type"];
                r && (s.fileType = r), t(s);
            })), !0;
        },
        ChromeDl: function() {
            var e = {}, t = !1, n = function(n) {
                e[n] && delete e[n], 0 === Object.keys(e).length && (t = !1, chrome.downloads.onChanged.removeListener(o));
            }, o = function(t) {
                var r = e[t.id];
                if (r) {
                    var o = !1;
                    r.fixNetworkFiled && (o = function(e, t) {
                        var n = parseInt(Date.now() / 1e3), r = !1;
                        e.lastFix || (e.lastFix = 0), e.lastFix + 5 < n && (e.lastFix = n, r = !0);
                        var o = t.state && "interrupted" === t.state.current, i = t.error && "NETWORK_FAILED" === t.error.current, s = t.canResume && t.canResume.current;
                        return o && i && s || (r = !1), r;
                    }(r, t)), o ? chrome.downloads.resume(t.id) : t.state && -1 !== [ "interrupted", "complete" ].indexOf(t.state.current) && n(t.id);
                }
            };
            this.download = function(n) {
                var i = n.url, s = n.filename;
                n.fixNetworkFiled = /(vk\.me|userapi\.com)\/.+\.mp4/i.test(i);
                var a = {
                    url: i,
                    filename: s
                }, c = u.preferences || u.storage || {};
                r.a.isFirefox && c.saveAsDialog && (a.saveAs = !0), chrome.downloads.download(a, (function(r) {
                    n.fixNetworkFiled && (!function(t, n) {
                        e[t] || (e[t] = n);
                    }(r, n), t || (t = !0, chrome.downloads.onChanged.addListener(o)));
                }));
            };
        },
        chromeDownload: null,
        downloadFile: function(e) {
            const {sortDownloads: t} = u.preferences;
            if (t && t.isEnabled) {
                const n = e.options.filename.slice(e.options.filename.lastIndexOf(".") + 1), r = t.groups.find(e => e.formats.some(e => -1 !== e.indexOf(n)));
                r && r.dir && (e.options.filename = `${r.dir}/${e.options.filename}`);
            }
            var n = l;
            if (r.a.isChrome || r.a.isFirefox) {
                n.chromeDownload || (n.chromeDownload = new n.ChromeDl);
                var o = function() {
                    return n.chromeDownload.download(e.options);
                };
                if (chrome.downloads && chrome.downloads.download) return o();
                chrome.permissions && chrome.permissions.request ? chrome.permissions.request({
                    permissions: [ "downloads" ]
                }, (function(e) {
                    if (e) return o();
                    c.error("Permissions not granted!");
                })) : c.error("Method in not supported!");
            } else r.a.isGM && GM_download(e.options.url, e.options.filename);
        },
        chromeListDownload: function(e, t) {
            var n = null;
            e = e.map((function(e) {
                return {
                    url: e.url,
                    filename: t + e.filename
                };
            }));
            var r = function(e) {
                if (e.id === n && e.state) return -1 !== [ "interrupted", "complete" ].indexOf(e.state.current) ? (n = null, 
                i()) : void 0;
            };
            chrome.downloads.onChanged.addListener(r);
            var o = -1, i = function() {
                o++;
                var t = e[o];
                if (t) return chrome.downloads.download({
                    url: t.url,
                    filename: t.filename
                }, (function(e) {
                    n = e;
                }));
                chrome.downloads.onChanged.removeListener(r);
            };
            return i();
        },
        downloadList: function(e) {
            var t = this, n = e.fileList, o = e.folder;
            (r.a.isChrome || r.a.isFirefox) && chrome.downloads && chrome.downloads.download ? t.chromeListDownload(n, o) : n.forEach((function(e) {
                t.downloadFile({
                    options: {
                        url: e.url,
                        filename: o + e.filename
                    }
                });
            }));
        },
        getUmmyIcon: function(e, t) {
            t("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB90lEQVQ4EcVSy2oUURCtqm7HcYgmYDTiYxEEERdZGP0B0UVwEcSv8LHIb4gbQcjGlVtB40YhfkAWuhs0uFOIgjJomiEzztzue4+n7rTgH6SaoqpPnao6fW+LHLapC9hdPHMbKT1UTcsQWxDBnAAdFkuvQ6QR1cD0QAUVoF+0kKdXBoO32j959maK8V1LVDaBDXkwm9q32atz/hmRpIZb5STqPaDIjP/oFAS5Xu1l/MPCBZhxt09uSRykCn1QhmQr1MiSQ3TPGYdIMtwfZPh3MjkhlvOWOcuTrJQB5VJeR0g5HlzjMSSVpp7mtQGFBJjXwJp69AlqtlTW0bpQ6nNLbTdjSCIxNhkOqUBwBconZYWZr1G6RgXcRoI782k0rO681vVq15o6SGyCrFefbHVnS6eNkmcSyMlOvr48ernimjlf5WcUuP1zr7C7W090/twiMcjw+y95dWcjXRr7Sn6Ba8mmB1RQ/MwqOK2mg356FPFi4xGm4z8I40nOT434OanElDdWM2aH/eAtHOlz98XZRBch0uPnHPu4J9uPn+dNzNGTLho/Kj+D1gza12fl1RuEtlmaaWPiGkOK8k0mecB5Nnes8DZvdiwPgRVrmbAp19aI8Fe2ZSDN86aOk9OpkfiHqfKoap9JfMTWfcavvNXN+/H9G596uPYX83AWUVC6/FsAAAAASUVORK5CYII=");
        },
        getWarningIcon: function(e, t) {
            var n, r = e.color || "#c2c2c2";
            n = "audio" === e.type ? '<svg width="21px" height="24px" viewBox="0 0 21 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M21,2.76923077 L21,17.6487288 C21,17.6487288 21,17.6487288 21,17.6487288 L21,18.4615385 L20.9068729,18.4615385 C20.723595,19.2712249 20.2716013,20.0865791 19.5669296,20.7680198 C17.9203537,22.360313 15.5176896,22.6184747 14.2004289,21.3446402 C12.8831682,20.0708056 13.1501309,17.7473503 14.7967068,16.1550571 C16.0602516,14.9331676 17.7690324,14.4969051 19.0909091,14.9356816 L19.0909091,14.9356816 L19.0909091,4.15384615 L7.63636364,6.92307692 L7.63636364,19.4948826 C7.63636364,19.4948826 7.63636364,19.4948826 7.63636364,19.4948826 L7.63636364,20.3076923 L7.5432365,20.3076923 C7.35995859,21.1173788 6.90796493,21.9327329 6.20329323,22.6141737 C4.55671732,24.2064669 2.15405328,24.4646286 0.836792552,23.190794 C-0.480468173,21.9169595 -0.213505501,19.5935041 1.43307041,18.0012109 C2.69661523,16.7793214 4.40539601,16.343059 5.72727273,16.7818354 L5.72727273,16.7818354 L5.72727273,6.46153846 L5.72727273,3.69230769 L21,0 L21,2.76923077 Z" fill="' + r + '"></path></svg>' : "playlist" === e.type ? '<svg width="24px" height="18px" viewBox="0 0 24 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M0,0 L0,3.6 L3.42857143,3.6 L3.42857143,0 L0,0 Z M0,7.2 L0,10.8 L3.42857143,10.8 L3.42857143,7.2 L0,7.2 Z M5.14285714,0 L5.14285714,3.6 L24,3.6 L24,0 L5.14285714,0 Z M5.14285714,7.2 L5.14285714,10.8 L20.5714286,10.8 L20.5714286,7.2 L5.14285714,7.2 Z M0,14.4 L0,18 L3.42857143,18 L3.42857143,14.4 L0,14.4 Z M5.14285714,14.4 L5.14285714,18 L22.2857143,18 L22.2857143,14.4 L5.14285714,14.4 Z" fill="' + r + '"></path></svg>' : '<svg width="24px" height="18px" viewBox="0 0 24 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M19.5,3 L21.0089096,3 C22.6582294,3 24,4.34288718 24,5.99942248 L24,15.0005775 C24,16.6556493 22.6608432,18 21.0089096,18 L2.99109042,18 C1.34177063,18 0,16.6571128 0,15.0005775 L0,5.99942248 C0,4.34435073 1.33915679,3 2.99109042,3 L7.5,3 C7.5,1.34651712 8.84187067,0 10.497152,0 L16.502848,0 C18.1583772,0 19.5,1.34314575 19.5,3 L19.5,3 Z M13.5,16.5 C16.8137087,16.5 19.5,13.8137087 19.5,10.5 C19.5,7.18629134 16.8137087,4.5 13.5,4.5 C10.1862913,4.5 7.5,7.18629134 7.5,10.5 C7.5,13.8137087 10.1862913,16.5 13.5,16.5 Z M13.5,15 C15.9852815,15 18,12.9852815 18,10.5 C18,8.0147185 15.9852815,6 13.5,6 C11.0147185,6 9,8.0147185 9,10.5 C9,12.9852815 11.0147185,15 13.5,15 Z" fill="' + r + '"></path></svg>', 
            t("data:image/svg+xml;utf8," + encodeURIComponent(n));
        },
        checkUrlsOfOpenTabs: function(e, t) {
            (r.a.isGM ? function(e) {
                e([ location.href ]);
            } : r.a.isChrome ? function(e) {
                var t = [];
                chrome.tabs.query({}, (function(n) {
                    n.forEach((function(e) {
                        t.push(e.url);
                    })), e(t);
                }));
            } : r.a.isFirefox ? function(e) {
                var t = [];
                if (r.a.isFirefoxMobile) return e(t);
                chrome.tabs.query({}, (function(n) {
                    n.forEach((function(e) {
                        t.push(e.url);
                    })), e(t);
                }));
            } : r.a.isSafari ? function(e) {
                var t = [];
                safari.application && safari.application.activeBrowserWindow && safari.application.activeBrowserWindow.tabs && safari.application.activeBrowserWindow.tabs.forEach((function(e) {
                    if (!e.url) return 1;
                    t.push(e.url);
                })), e(t);
            } : function(e) {
                e([]);
            })((function(n) {
                var r = [];
                n.forEach((function(t) {
                    e.forEach((function(e) {
                        -1 !== t.search(e) && r.push(t);
                    }));
                })), t(r);
            }));
        },
        getData: function(e, t) {
            var n = e.url;
            return n ? (Object(i.a)({
                url: n
            }, (function(e, n, r) {
                if (e) return t();
                t(r);
            })), !0) : t();
        }
    };
    var h = e => (u = e, l);
    var f = function(e, t) {
        t && !Array.isArray(t) && (t = [ t ]);
        const n = [];
        return e.replace(/<script(?:\s*|\s[^>]+[^\/])>/g, (function(r, o) {
            o += r.length;
            const i = e.indexOf("<\/script>", o);
            if (-1 !== i) {
                const r = e.substr(o, i - o);
                t ? t.every((function(e) {
                    return e.test(r);
                })) && n.push(r) : n.push(r);
            }
        })), n;
    };
    var p = function(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        t && !Array.isArray(t) && (t = [ t ]);
        const n = [], r = {
            "{": 0,
            "[": 0
        }, o = {
            "}": "{",
            "]": "["
        }, i = /[{}\]\[":0-9.,-]/, s = /[\r\n\s\t]/;
        let a = "";
        for (let t, c = 0; t = e[c]; c++) if ('"' !== t) i.test(t) ? (a += t, "{" === t || "[" === t ? (r["{"] || r["["] || (a = t), 
        r[t]++) : "}" !== t && "]" !== t || (r[o[t]]--, r["{"] || r["["] || n.push(a))) : "t" === t && "true" === e.substr(c, 4) ? (a += "true", 
        c += 3) : "f" === t && "false" === e.substr(c, 5) ? (a += "false", c += 4) : "n" === t && "null" === e.substr(c, 4) ? (a += "null", 
        c += 3) : s.test(t) || (r["{"] = 0, r["["] = 0, a = ""); else {
            let t = c;
            for (;-1 !== t && (t === c || "\\" === e[t - 1]); ) t = e.indexOf('"', t + 1);
            -1 === t && (t = e.length - 1), a += e.substr(c, t - c + 1), c = t, r["{"] || r["["] || n.push(a);
        }
        const c = [];
        for (let e = 0, r = n.length; e < r; e++) {
            const r = n[e];
            if ("{}" !== r && "[]" !== r) try {
                t.every((function(e) {
                    return e.test(r);
                })) && c.push(JSON.parse(r));
            } catch (e) {}
        }
        return c;
    };
    const d = Object(s.a)("VimeoComEmbed");
    var m = class {
        constructor(e) {
            this.engine = e;
        }
        getVimeoLinks(e, t) {
            return this._getVimeoLinks(e.extVideoId, e.url, (function(n, r, o) {
                var i = {
                    action: e.action,
                    extVideoId: e.extVideoId,
                    links: n,
                    title: r,
                    thumb: o
                };
                t(i);
            })), !0;
        }
        _getVimeoLinks(e, t, n) {
            this.getVimeoNoEmbedLinks(e, t, (t, r, o) => {
                if (t) return n(t, r, o);
                this.getVimeoEmbedLinks(e, n);
            });
        }
        getVimeoEmbedLinks(e, t) {
            var n = function() {
                return t(null, "", "");
            };
            if (!e) return n();
            Object(i.a)({
                url: "https://player.vimeo.com/video/" + e
            }, (e, r, o) => {
                if (e || !o) return n();
                var i = p(o, [ /"files":/ ]), s = null;
                return i.some((function(e) {
                    if (e.video && e.request && e.request.files) return s = e, !0;
                })), (o = this.getLinksFromConfig(s)) ? t(o.links, o.title, o.thumb) : n();
            });
        }
        getVimeoConfig(e, t) {
            var n = function() {
                return t(null, "", "");
            };
            Object(i.a)({
                url: e
            }, (e, r, o) => e || !o ? n() : (o = this.getVimeoDataFromConfig(o)) ? t(o.links, o.title, o.thumb) : n());
        }
        getVimeoLinksFromConfigAction(e, t) {
            return new Promise((t, n) => {
                const r = this.getLinksFromConfig(e.config);
                r ? t(r) : n(new Error("Get links from config error"));
            }).then(t, e => {
                d.error("getVimeoLinksFromConfigAction error", e), t(null);
            }), !0;
        }
        getClipPageConfig(e, t) {
            var n = null;
            return f(e, /['"]config_url['"]\s*:\s*/).some((function(e) {
                return p(e, /['"]config_url['"]\s*:\s*/).some((function(e) {
                    if (e.player && (n = e.player.config_url)) return !0;
                }));
            })), n ? this.getVimeoConfig(n, t) : t(null, "", "");
        }
        getVimeoNoEmbedLinks(e, t, n) {
            if (e && t) {
                var r = /vimeo\.com\/[^\/]+\/review\/\d+/i.test(t), o = /vimeo\.com\/\d+\/\w+/i.test(t);
                r || o || (t = null);
            }
            Object(i.a)({
                url: t || "https://vimeo.com/" + e
            }, (e, t, r) => {
                if (e || !r) return n(null, "", "");
                var o = r.match(/data-config-url=["']([^\s"'<>]+)/i);
                return (o = o && o[1].replace(/&amp;/gi, "&")) ? this.getVimeoConfig(o, n) : this.getClipPageConfig(r, n);
            });
        }
        getVimeoLinksFromConfig(e, t) {
            var n = this.getLinksFromConfig(e.config);
            return t(n || null);
        }
        getLinksFromConfig(e) {
            if (!(e && e.video && e.request && e.request.files)) return null;
            var t = e.video, n = e.request.files, r = {};
            r.title = t.title || "";
            var o = null;
            for (var i in t.thumbs) (null === o || o < i) && (o = i, r.thumb = t.thumbs[i]);
            for (var s in r.links = [], n) Array.isArray(n[s]) && n[s].forEach((function(e) {
                if (e && e.url && e.mime) {
                    var t = e.mime.split("/")[1];
                    t || (t = (t = e.url.match(/\.(\w{2,4})(?:\?|#|$)/i)) && t[1] || "mp4");
                    var n = t.toUpperCase(), o = e.quality;
                    /^\d+p$/.test(o) && (o = o.replace(/p$/, ""));
                    var i = n + " " + o;
                    r.links.push({
                        url: e.url,
                        name: i,
                        height: o,
                        type: n,
                        format: n,
                        ext: t
                    });
                }
            }));
            return r.links.length || (r = null), r;
        }
        getVimeoDataFromConfig(e) {
            e = e.replace(/(\{|,)\s*(\w+)\s*:/gi, '$1"$2":').replace(/(:\s+)\'/g, '$1"').replace(/\'([,\]\}])/g, '"$1');
            try {
                e = JSON.parse(e);
            } catch (e) {
                return null;
            }
            return this.getLinksFromConfig(e);
        }
    }, g = n(9);
    function y(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }), t && g(e, t);
    }
    n(35), n(36);
    var v = n(37), b = n(38), w = n(39);
    function k(e) {
        var t = "function" == typeof Map ? new Map : void 0;
        return (k = function(e) {
            if (null === e || !b(e)) return e;
            if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== t) {
                if (t.has(e)) return t.get(e);
                t.set(e, n);
            }
            function n() {
                return w(e, arguments, v(this).constructor);
            }
            return n.prototype = Object.create(e.prototype, {
                constructor: {
                    value: n,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), g(n, e);
        })(e);
    }
    var C = n(2);
    const x = e => {
        if ("string" != typeof e) {
            const t = new Error("Value is not String");
            throw t.value = e, t;
        }
        return e;
    }, O = e => {
        if (!Number.isFinite(e)) {
            const t = new Error("Value is not Finite Number");
            throw t.value = e, t;
        }
        return e;
    };
    function A(e, t) {
        const n = [];
        let r;
        for (;null !== (r = t.exec(e)); ) r.index === t.lastIndex && t.lastIndex++, n.push(r);
        return n;
    }
    function E(e, t) {
        E = function(e, t) {
            return new i(e, void 0, t);
        };
        var n = k(RegExp), r = RegExp.prototype, o = new WeakMap;
        function i(e, t, r) {
            var i = n.call(this, e, t);
            return o.set(i, r || o.get(e)), i;
        }
        function s(e, t) {
            var n = o.get(t);
            return Object.keys(n).reduce((function(t, r) {
                return t[r] = e[n[r]], t;
            }), Object.create(null));
        }
        return y(i, n), i.prototype.exec = function(e) {
            var t = r.exec.call(this, e);
            return t && (t.groups = s(t, this)), t;
        }, i.prototype[Symbol.replace] = function(e, t) {
            if ("string" == typeof t) {
                var n = o.get(this);
                return r[Symbol.replace].call(this, e, t.replace(/\$<([^>]+)>/g, (function(e, t) {
                    return "$" + n[t];
                })));
            }
            if ("function" == typeof t) {
                var i = this;
                return r[Symbol.replace].call(this, e, (function() {
                    var e = [];
                    return e.push.apply(e, arguments), "object" != typeof e[e.length - 1] && e.push(s(e, i)), 
                    t.apply(this, e);
                }));
            }
            return r[Symbol.replace].call(this, e, t);
        }, E.apply(this, arguments);
    }
    const S = Object(s.a)("DailymotionComEmbed");
    var _ = class {
        constructor(e) {
            this.engine = e;
        }
        getDailymotionLinks(e, t) {
            return this.getEmbedVideoInfo(e.extVideoId, e.metadata, n => {
                n || (n = {}), this.addUmmyLinks(n.links, e.extVideoId);
                var r = {
                    action: e.action,
                    extVideoId: e.extVideoId,
                    links: n.links,
                    title: n.title,
                    duration: n.duration
                };
                t(r);
            }), !0;
        }
        addUmmyLinks(e, t) {}
        getMetadata(e) {
            return Object(C.a)({
                url: "https://www.dailymotion.com/player/metadata/video/" + encodeURIComponent(e),
                json: !0
            }).then(e => e.body);
        }
        getInfoFromMetadata(e) {
            const t = {
                title: x(e.title),
                duration: O(e.duration),
                links: []
            };
            if (e.qualities && e.qualities.auto && e.qualities.auto.length) {
                let n = e.qualities.auto.pop();
                if ("application/x-mpegURL" === n.type) return Object(C.a)({
                    url: n.url
                }).then(e => {
                    let n = E(/CODECS="(.*?)",RESOLUTION=(.*?),NAME="(.*?)",PROGRESSIVE\x2DURI="(.*?)"/gm, {
                        codecs: 1,
                        resolution: 2,
                        quality: 3,
                        url: 4
                    });
                    const r = A(e.body, n);
                    for (let e of r) {
                        let {quality: n, codecs: r, resolution: o, url: i} = e.groups, s = o, a = /\.(.{0,7})#cell/.exec(i);
                        a[1] && (s = a[1]), t.links.find(e => e.height === parseInt(n)) || t.links.push({
                            name: `${r}-${o}`,
                            ext: s,
                            height: parseInt(n),
                            url: x(i)
                        });
                    }
                    return t.links.sort((e, t) => e.height > t.height ? -1 : 1), t;
                });
            }
            return Promise.resolve(t);
        }
        getEmbedVideoInfo(e, t, n) {
            return Promise.resolve().then(() => t || this.getMetadata(e)).then(e => this.getInfoFromMetadata(e)).then(e => {
                n(e);
            }, t => {
                S.error("getEmbedVideoInfo error", e, t), n();
            });
        }
    };
    var T = () => "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36";
    var R = function(e, t) {
        let n = null;
        n = !(t = t || {}).params && /\?/.test(e) ? e.match(/[^?]*\?(.*)/)[1] : e;
        const r = t.sep || "&", o = n.split(r), i = {};
        for (let e = 0, n = o.length; e < n; e++) {
            const n = o[e].split("=");
            let r = n[0];
            const s = n[1] || "";
            if (t.noDecode) i[r] = s; else {
                try {
                    r = decodeURIComponent(r);
                } catch (e) {
                    r = unescape(r);
                }
                try {
                    i[r] = decodeURIComponent(s);
                } catch (e) {
                    i[r] = unescape(s);
                }
            }
        }
        return i;
    };
    var L = function(e) {
        const t = function(e) {
            const t = e[0];
            let n = 0;
            for (;;) {
                if (n = e.indexOf(t, n + 1), -1 === n) {
                    n = e.length;
                    break;
                }
                if ("\\" !== e[n - 1]) break;
            }
            let r = "";
            try {
                r = '"' === t ? JSON.parse('"' + e.substr(1, n - 1) + '"') : JSON.parse('"' + e.substr(1, n - 1).replace(/\\'/g, "'").replace(/"/g, '\\"') + '"');
            } catch (e) {}
            return {
                data: r,
                i: n
            };
        }, n = {
            "[": function(e) {
                const t = [];
                let r, o, i, s, a, c = "";
                for (s = 1; i = e[s]; s++) if (o = n[i], o) r = o(e.substr(s)), c = JSON.stringify(r.data), 
                s += r.i; else {
                    if ("]" === i) break;
                    "," === i ? (c && t.push(c), c = "") : c += i;
                }
                c && t.push(c);
                try {
                    a = JSON.parse("[" + t.join(",") + "]");
                } catch (e) {}
                return {
                    data: a || [],
                    i: s
                };
            },
            "{": function(e) {
                const t = [];
                let r, o, i, s, a, c = [ "", "" ], u = 0;
                for (s = 1; i = e[s]; s++) if (o = n[i], o) r = o(e.substr(s)), c[u] = 0 === u ? r.data : JSON.stringify(r.data), 
                s += r.i; else {
                    if ("}" === i) break;
                    ":" === i ? u = 1 : "," === i ? (t.push(JSON.stringify(c[0]) + ":" + c[1]), c = [ "", "" ], 
                    u = 0) : c[u] = (c[u] + i).trim();
                }
                c[1] && t.push(JSON.stringify(c[0]) + ":" + c[1]);
                try {
                    a = JSON.parse("{" + t.join(",") + "}");
                } catch (e) {}
                return {
                    data: a || {},
                    i: s
                };
            },
            '"': t,
            "'": t
        };
        return {
            some: function(t) {
                return function(e, t) {
                    let r;
                    for (let o, i = 0; o = e[i]; i++) if (("[" === o || "{" === o) && (r = n[o](e.substr(i)), 
                    i += r.i, t(r.data))) return !0;
                }(e, t);
            }
        };
    };
    const F = /\\(\\u[0-9a-f]{4})/g;
    var I = function(e) {
        try {
            return JSON.parse(JSON.stringify(e).replace(F, "$1"));
        } catch (t) {
            return e;
        }
    };
    var j = {
        maxLength: 80,
        rtrim: /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        illegalRe: /[\/?<>\\:*|"~\u202B]/g,
        controlRe: /[\x00-\x1f\x80-\x9f]/g,
        zeroWidthJoinerRe: /\u200D/g,
        reservedRe: /^\.+/,
        trim: function(e) {
            return e.replace(this.rtrim, "");
        },
        partsRe: /^(.+)\.([a-z0-9]{1,4})$/i,
        getParts: function(e) {
            return e.match(this.partsRe);
        },
        specialChars: "nbsp,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,times,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,divide,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml".split(","),
        specialCharsList: [ [ "amp", "quot", "lt", "gt" ], [ 38, 34, 60, 62 ] ],
        specialCharsRe: /&([^;]{2,6});/g,
        decodeSpecialChars: function(e) {
            const t = this;
            return e.replace(this.specialCharsRe, (function(e, n) {
                let r = null;
                if ("#" === n[0]) return r = parseInt(n.substr(1)), isNaN(r) ? "" : String.fromCharCode(r);
                let o = t.specialCharsList[0].indexOf(n);
                return -1 !== o ? (r = t.specialCharsList[1][o], String.fromCharCode(r)) : (o = t.specialChars.indexOf(n), 
                -1 !== o ? (r = o + 160, String.fromCharCode(r)) : "");
            }));
        },
        decodeHexChars: function(e) {
            return e.replace(/(\\x[a-zA-Z0-9]{2})/g, (function(e, t) {
                let n = t;
                try {
                    n = String.fromCharCode(parseInt("0x" + n.substr(2), 16));
                } catch (e) {}
                return n;
            }));
        },
        rnRe: /\r?\n/g,
        re1: /[*?"]/g,
        re2: /</g,
        re3: />/g,
        spaceRe: /[\s\t\uFEFF\xA0]+/g,
        dblRe: /(\.|!|\?|_|,|-|:|\+){2,}/g,
        re4: /[.,:;\/\-_+=']$/g,
        modify: function(e) {
            if (!e) return "";
            e = I(e);
            try {
                e = decodeURIComponent(e);
            } catch (t) {
                e = unescape(e);
            }
            if (e = (e = this.decodeSpecialChars(e)).replace(this.rnRe, " "), (e = (e = this.trim(e)).replace(this.zeroWidthJoinerRe, "").replace(this.re1, "").replace(this.re2, "(").replace(this.re2, "(").replace(this.re3, ")").replace(this.spaceRe, " ").replace(this.dblRe, "$1").replace(this.illegalRe, "_").replace(this.controlRe, "").replace(this.reservedRe, "").replace(this.re4, "")).length > this.maxLength) {
                const t = this.getParts(e);
                t && 3 == t.length && (t[1] = t[1].substr(0, this.maxLength), e = t[1] + "." + t[2]);
            }
            return this.trim(e);
        }
    };
    Object(s.a)("ExperimentExecutor");
    var P = function() {
        return parseInt(Date.now() / 1e3, 10);
    };
    function U(e, t) {
        const n = {
            "{": 0
        };
        let r = !1, o = "", i = !1, s = !1, a = 0, c = !1;
        const u = /[,;=(\[\-+/*%&|]/, l = /[\s\r\n]/, h = {
            "}": "{"
        };
        let f = "";
        for (let p, d = t; p = e[d]; d++) if (f += p, r || s || !c && !i || "/" !== p || a % 2 != 0 ? i || '"' !== p && "'" !== p || o && o !== p || a % 2 != 0 || (r = !r, 
        o = r ? p : "") : i = !i, i) "\\" === p ? a++ : (a % 2 == 0 && ("[" === p ? s = !0 : "]" === p && (s = !1)), 
        a = 0); else if (r) "\\" === p ? a++ : a = 0; else if (a = 0, u.test(p) ? c = !0 : l.test(p) || (c = !1), 
        "{" === p) n[p]++; else if ("}" === p && (n[h[p]]--, !n["{"])) return f;
        return "";
    }
    const M = Object(s.a)("app:ThrottleSigDecipher").t;
    new Map, new Map;
    function N(e) {
        return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
    }
    var D = class {
        getSignatureFnCodeSafe(e) {
            try {
                return this.getSignatureFnCode(e);
            } catch (e) {
                M("getSignatureFnCodeSafe error: %o", e);
            }
        }
        getSignatureFnCode(e) {
            let t;
            if (t = /[=(,&]([$\w]+)\(\w+\),\w+\.set\("\w+",/.exec(e), !t) {
                if (t = /[=(,&]([$\w]+)\[(\d+)\]\(\w+\),\w+\.set\("\w+",/.exec(e), !t) throw new Error("Function variable name is not found");
                const n = t[1], r = parseInt(t[2]);
                M("var name: %s", n), M("index: %d", r);
                const o = new RegExp("[ ,.]" + N(n) + "=\\[([\\w\\$,]+)\\]").exec(e);
                if (!o) throw new Error("Function variable name is not found");
                M("array values: %s", o[1]), t = [], t[1] = o[1].split(",")[r] || "";
            }
            const n = t[1];
            if (t = new RegExp("\n" + N(n) + "=(function\\(([^)]*)\\){[^{]+)").exec(e), !t) throw new Error("Function scope start fragment is not found");
            t[2].split(",")[0];
            const r = e.indexOf(t[1]);
            if (-1 === r) throw new Error("First line pos is not found");
            return U(e, r);
        }
        isArgumentAsFunctionCall(e) {
            return /\]\(\)/.test(e);
        }
        buildEvalSignatureFn(e) {
            const t = new Function("sig", `return (${e})(sig);`);
            return e => {
                const n = t(e);
                if ("string" != typeof n) throw new Error("Unexpected result");
                return n;
            };
        }
    };
    var B = class {
        constructor() {
            this.throttleSigDecipher = new D;
        }
        applyActions(e, t) {
            const n = {
                slice: (e, t) => {
                    e.slice(t);
                },
                splice: (e, t) => {
                    e.splice(0, t);
                },
                reverse: e => {
                    e.reverse();
                },
                swap: (e, t) => {
                    const n = e[0];
                    e[0] = e[t % e.length], e[t] = n;
                }
            }, r = t.split("");
            for (let t, o = 0; t = e[o]; o++) n[t[0]](r, t[1]);
            return r.join("");
        }
        getNewChip(e) {
            const t = t => {
                const n = /([\w$]+)(?:\.([\w$]+)|\[("[\w$]+")\])\([\w$]+,?([\w$]+)?\)/.exec(t);
                if (!n) throw new Error("readAction");
                const r = n[1], o = n[2] || n[3], i = n[4], s = ((t, n) => {
                    t = t.replace(/\$/g, "\\$");
                    const r = new RegExp("(?:var |,|\n)" + t + "={"), o = e.search(r);
                    if (-1 === o) throw new Error("Place is not found");
                    const i = e.substr(o, 300);
                    n = n.replace(/\$/g, "\\$");
                    const s = new RegExp(n + ":function\\(([$\\w,]+)\\){([^}]+)}"), a = i.match(s);
                    if (!a) throw new Error("Place function is not found!");
                    return {
                        args: a[1],
                        statement: a[2]
                    };
                })(r, o);
                if (/\.reverse/.test(s.statement)) return [ "reverse", null ];
                if (!/^[\d]+$/.test(i)) throw new Error("Arg is not number");
                return /\.splice/.test(s.statement) ? [ "splice", parseInt(i) ] : /\.slice/.test(s.statement) ? [ "slice", parseInt(i) ] : [ "swap", parseInt(i) ];
            }, n = (() => {
                let t = null, n = /,sts:(\d+)/.exec(e);
                if (n && (t = n[1]), !t) {
                    const n = /\.signatureTimestamp=(\d+)/.exec(e);
                    n && (t = n[1]);
                }
                if (!t) {
                    const n = /,signatureTimestamp:(\d+)/.exec(e);
                    n && (t = n[1]);
                }
                if (!t) {
                    const n = /,sts:([\w$]+)/.exec(e);
                    if (n) {
                        const r = e.indexOf(",sts:" + n[1]);
                        t = ((e, t) => {
                            t = t.replace(/\$/g, "\\$");
                            const n = new RegExp("(?:var |,|;\n?)" + t + "=(\\d+)[;,]").exec(e);
                            if (!n) throw new Error("Sts variable is not found");
                            return n[1];
                        })(((e, t) => {
                            const n = e.substr(0, t);
                            let r = void 0;
                            for (;-1 !== r; ) {
                                "number" == typeof r && (r -= 1), r = n.lastIndexOf("function", r);
                                const o = U(e, r);
                                if (r < t && r + o.length > t) return o;
                            }
                            throw new Error("Parent function is not found");
                        })(e, r), n[1]);
                    }
                }
                if (!t) throw new Error("Sts is not found");
                return parseInt(t, 10);
            })();
            let r;
            const o = /[$_a-zA-Z0-9]+\.set\((?:[$_a-zA-Z0-9]+\.[$_a-zA-Z0-9]+\|\|)?"signature",([$_a-zA-Z0-9]+)\(/.exec(e);
            if (o && (r = o[1]), !r) {
                const t = /(?:function ([$_a-zA-Z0-9]+)|(?:var |,|;\n)([$_a-zA-Z0-9]+)=function)\(([\w$]+)\){\3=\3\.split\([^}]+;return \3\.join\([^}]+}[;,]/.exec(e);
                t && (r = t[1] || t[2]);
            }
            if (!r) throw new Error("Decode function name is not found!");
            const i = (n => {
                n = n.replace(/\$/g, "\\$");
                const r = new RegExp("(?:function " + n + "|(?:var |,|;\n)" + n + "=function)\\(([\\w$]+)\\){([^}]*)}[;,]").exec(e);
                if (!r) throw new Error("findConvertFn");
                return ((e, n) => {
                    e = e.replace(/\$/g, "\\$");
                    const r = new RegExp('[\\w$]+(?:\\.[\\w$]+|\\["[\\w$]+"\\])\\(' + e + "[^)]*\\)", "g"), o = n.match(r);
                    if (!o) throw new Error("readScope");
                    return o.map(e => t(e));
                })(r[1], r[2]);
            })(r);
            if (!i.length) throw new Error("actionList is empty");
            return {
                actionList: i,
                sts: n
            };
        }
        dechip(e, t) {
            const {sts: n, actionList: r} = this.getNewChip(t);
            return {
                sts: n,
                actionList: r,
                playerUrl: e,
                nSigCode: this.throttleSigDecipher.getSignatureFnCodeSafe(t),
                expiresAt: P() + 43200,
                helperVersion: "9.91"
            };
        }
    };
    var q = e => new Promise(t => t(e()));
    function $(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e;
    }
    function V(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t && (r = r.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
            }))), n.push.apply(n, r);
        }
        return n;
    }
    function H(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? V(Object(n), !0).forEach((function(t) {
                $(e, t, n[t]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : V(Object(n)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
            }));
        }
        return e;
    }
    function z(e, t) {
        if (null == e) return {};
        var n, r, o = function(e, t) {
            if (null == e) return {};
            var n, r, o = {}, i = Object.keys(e);
            for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
            return o;
        }(e, t);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
        }
        return o;
    }
    function* Y(e, t) {
        !0 === e || (!1 === e ? yield t.fail() : yield* e);
    }
    function G(e) {
        const {done: t, value: n} = e.next();
        return t ? void 0 : n;
    }
    class J {
        constructor(e) {
            const {type: t, schema: n, coercer: r = (e => e), validator: o = (() => []), refiner: i = (() => [])} = e;
            this.type = t, this.schema = n, this.coercer = r, this.validator = o, this.refiner = i;
        }
    }
    class W extends TypeError {
        constructor(e, t) {
            const {path: n, value: r, type: o, branch: i} = e, s = z(e, [ "path", "value", "type", "branch" ]);
            let a;
            super(`Expected a value of type \`${o}\`${n.length ? ` for \`${n.join(".")}\`` : ""} but received \`${JSON.stringify(r)}\`.`), 
            this.value = r, Object.assign(this, s), this.type = o, this.path = n, this.branch = i, 
            this.failures = function() {
                return a || (a = [ e, ...t ]), a;
            }, this.stack = (new Error).stack, this.__proto__ = W.prototype;
        }
    }
    function Q(e, t) {
        const n = K(e, t);
        if (n[0]) throw n[0];
    }
    function X(e, t) {
        const n = t.coercer(e);
        return Q(n, t), n;
    }
    function K(e, t, n = !1) {
        n && (e = t.coercer(e));
        const r = function* e(t, n, r = [], o = []) {
            const {type: i} = n, s = {
                value: t,
                type: i,
                branch: o,
                path: r,
                fail: (e = {}) => H({
                    value: t,
                    type: i,
                    path: r,
                    branch: [ ...o, t ]
                }, e),
                check(t, n, i, s) {
                    const a = void 0 !== i ? [ ...r, s ] : r, c = void 0 !== i ? [ ...o, i ] : o;
                    return e(t, n, a, c);
                }
            }, a = Y(n.validator(t, s), s), c = G(a);
            c ? (yield c, yield* a) : yield* Y(n.refiner(t, s), s);
        }(e, t), o = G(r);
        if (o) {
            return [ new W(o, r), void 0 ];
        }
        return [ void 0, e ];
    }
    function Z(e) {
        return new J({
            type: `Array<${e ? e.type : "unknown"}>`,
            schema: e,
            coercer: t => e && Array.isArray(t) ? t.map(t => X(t, e)) : t,
            * validator(t, n) {
                if (Array.isArray(t)) {
                    if (e) for (const [r, o] of t.entries()) yield* n.check(o, e, t, r);
                } else yield n.fail();
            }
        });
    }
    function ee() {
        return ae("boolean", e => "boolean" == typeof e);
    }
    function te() {
        return ae("never", () => !1);
    }
    function ne() {
        return ae("number", e => "number" == typeof e && !isNaN(e));
    }
    function re(e) {
        const t = e ? Object.keys(e) : [], n = te();
        return new J({
            type: e ? `Object<{${t.join(",")}}>` : "Object",
            schema: e || null,
            coercer: e ? ce(e) : e => e,
            * validator(r, o) {
                if ("object" == typeof r && null != r) {
                    if (e) {
                        const i = new Set(Object.keys(r));
                        for (const n of t) {
                            i.delete(n);
                            const t = e[n], s = r[n];
                            yield* o.check(s, t, r, n);
                        }
                        for (const e of i) {
                            const t = r[e];
                            yield* o.check(t, n, r, e);
                        }
                    }
                } else yield o.fail();
            }
        });
    }
    function oe(e) {
        return new J({
            type: e.type + "?",
            schema: e.schema,
            validator: (t, n) => void 0 === t || n.check(t, e)
        });
    }
    function ie(e) {
        e instanceof J && (e = e.schema);
        const t = Object.keys(e), n = te();
        return new J({
            type: `Partial<{${t.join(",")}}>`,
            schema: e,
            coercer: ce(e),
            * validator(r, o) {
                if ("object" != typeof r || null == r) return void (yield o.fail());
                const i = new Set(Object.keys(r));
                for (const n of t) {
                    if (i.delete(n), !(n in r)) continue;
                    const t = e[n], s = r[n];
                    yield* o.check(s, t, r, n);
                }
                for (const e of i) {
                    const t = r[e];
                    yield* o.check(t, n, r, e);
                }
            }
        });
    }
    function se() {
        return ae("string", e => "string" == typeof e);
    }
    function ae(e, t) {
        return new J({
            type: e,
            validator: t,
            schema: null
        });
    }
    function ce(e) {
        const t = Object.keys(e);
        return n => {
            if ("object" != typeof n || null == n) return n;
            const r = {}, o = new Set(Object.keys(n));
            for (const i of t) {
                o.delete(i);
                const t = e[i], s = n[i];
                r[i] = X(s, t);
            }
            for (const e of o) r[e] = n[e];
            return r;
        };
    }
    class ue extends Error {
        constructor(e, t) {
            super(e), this.code = t;
        }
    }
    var le = ue;
    var he = function(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        Array.isArray(t) || (t = [ t ]);
        const n = new DOMParser, r = n.parseFromString(e, "text/html");
        return [].slice.call(r.querySelectorAll("script")).map(e => e.textContent).filter(e => t.every(t => t.test(e)));
    };
    var fe = class {
        constructor(e, t) {
            this.finishQueue = () => {
                if (this.activeCount--, this.queue.length > 0) {
                    const [e, t] = this.queue.shift();
                    this.runQueue(e, t);
                }
            }, this.limit = e, this.maxQueue = t, this.queue = [], this.activeCount = 0;
        }
        add(e) {
            let t = null;
            const n = new Promise(e => {
                t = e;
            });
            if (this.activeCount < this.limit) this.runQueue(e, t); else {
                const n = [ e, t ], r = this.queue.push(n);
                this.maxQueue && r > this.maxQueue && this.queue.splice(0, r - this.maxQueue);
            }
            return n;
        }
        runQueue(e, t) {
            this.activeCount++;
            const n = q(e);
            t(n), n.then(this.finishQueue, this.finishQueue);
        }
    };
    var pe = (e, t) => {
        const n = new fe(e, t);
        return e => n.add(e);
    };
    var de = function(e) {
        r.a.sendMessage({
            action: "sendMonitoring",
            obj: {
                category: e.category,
                event: e.event,
                subcategory: e.subcategory
            }
        });
    };
    const me = n(46), ge = n(5), {URL: ye} = me, ve = Object(s.a)("YtMetadata").t, be = ae("FiniteNumber", e => isFinite(Number(e)));
    function we(e) {
        const t = J;
        e instanceof t && (e = e.schema);
        const n = Object.keys(e);
        return new t({
            type: `Partial<{${n.join(",")}}>`,
            schema: e,
            coercer: ie(e).coercer,
            * validator(t, r) {
                if ("object" == typeof t && null != t) for (const o of n) {
                    const n = e[o], i = t[o];
                    yield* r.check(i, n, t, o);
                } else yield r.fail();
            }
        });
    }
    const ke = re({
        itag: ne(),
        url: oe(se()),
        type: oe(se()),
        cipher: oe(se()),
        signatureCipher: oe(se()),
        mimeType: se(),
        bitrate: oe(ne()),
        width: ne(),
        height: ne(),
        initRange: oe(re({
            start: be,
            end: be
        })),
        indexRange: oe(re({
            start: be,
            end: be
        })),
        lastModified: be,
        contentLength: oe(be),
        encryption: oe(se()),
        drmFamilies: oe(Z(se())),
        quality: se(),
        fps: ne(),
        qualityLabel: se(),
        projectionType: se(),
        averageBitrate: oe(ne()),
        colorInfo: oe(re({
            primaries: oe(se()),
            transferCharacteristics: se(),
            matrixCoefficients: oe(se())
        })),
        approxDurationMs: oe(be),
        highReplication: oe(ee()),
        xtags: oe(se()),
        targetDurationSec: oe(ne()),
        maxDvrDurationSec: oe(ne()),
        loudnessDb: oe(ne())
    }), Ce = re({
        itag: ne(),
        url: oe(se()),
        cipher: oe(se()),
        signatureCipher: oe(se()),
        mimeType: se(),
        bitrate: oe(ne()),
        initRange: oe(re({
            start: be,
            end: be
        })),
        indexRange: oe(re({
            start: be,
            end: be
        })),
        lastModified: be,
        contentLength: oe(be),
        quality: se(),
        encryption: oe(se()),
        drmFamilies: oe(Z(se())),
        projectionType: se(),
        averageBitrate: oe(ne()),
        highReplication: oe(ee()),
        audioQuality: se(),
        approxDurationMs: oe(be),
        audioSampleRate: be,
        audioChannels: ne(),
        targetDurationSec: oe(ne()),
        maxDvrDurationSec: oe(ne()),
        loudnessDb: oe(ne())
    });
    re({
        probeUrl: oe(se()),
        dashManifestUrl: oe(se()),
        hlsManifestUrl: oe(se()),
        expiresInSeconds: be,
        formats: oe(Z(re({
            itag: ne(),
            url: oe(se()),
            cipher: oe(se()),
            signatureCipher: oe(se()),
            mimeType: se(),
            bitrate: oe(ne()),
            fps: oe(ne()),
            width: ne(),
            height: ne(),
            lastModified: be,
            contentLength: oe(be),
            quality: se(),
            qualityLabel: se(),
            projectionType: se(),
            averageBitrate: oe(ne()),
            audioQuality: se(),
            approxDurationMs: oe(be),
            audioSampleRate: oe(be),
            audioChannels: oe(ne())
        }))),
        adaptiveFormats: Z((xe = (e, t) => e && /^video/.test(e.mimeType) ? ke : Ce, ae("Dynamic<...>", (e, t) => t.check(e, xe(e, t))))),
        licenseInfos: oe(Z(re({
            drmFamily: se(),
            url: se(),
            drmParams: se()
        }))),
        drmParams: oe(se())
    });
    var xe;
    const Oe = we({
        itag: ne(),
        url: oe(se()),
        cipher: oe(se()),
        signatureCipher: oe(se()),
        mimeType: se(),
        fps: oe(ne()),
        width: oe(ne()),
        height: oe(ne()),
        bitrate: oe(ne()),
        contentLength: oe(be)
    }), Ae = we({
        formats: oe(Z(Oe)),
        adaptiveFormats: oe(Z(Oe))
    }), Ee = we({
        playabilityStatus: re(),
        streamingData: oe(re()),
        videoDetails: oe(we({
            videoId: se(),
            title: se(),
            lengthSeconds: be,
            channelId: se(),
            shortDescription: se(),
            thumbnail: we({
                thumbnails: Z(we({
                    url: se(),
                    width: ne(),
                    height: ne()
                }))
            }),
            useCipher: oe(ee()),
            author: se()
        }))
    });
    function Se(e) {
        return new Promise((t, n) => {
            Object(i.a)(e, (e, r, o) => {
                e && "string" == typeof e && (e = new Error(e)), e ? n(e) : t(o);
            });
        }).catch(e => {
            const t = /^(\d+)\s+(.*)/.exec(e.message);
            throw t && (e.status = parseInt(t[1], 10), e.statusText = t[2]), e;
        });
    }
    function _e(e) {
        const {playabilityStatus: t, videoDetails: n} = e;
        if ("OK" !== t.status) {
            let e = "UNKNOWN_PLAYABILITY_STATUS";
            return "LOGIN_REQUIRED" === t.status || "UNPLAYABLE" === t.status ? e = t.status : "ERROR" === t.status && (e = "YT_ERROR"), 
            new le(`${t.status}: ${t.reason}`, e);
        }
        if (!n) return new le("Video details is empty", "VIDEO_DETAILS_IS_EMPTY");
    }
    function Te(e, t, n) {
        return n && (e[t] = n), e;
    }
    const Re = /(\/s\/([^\/]+))/;
    function Le(e) {
        const t = Re.exec(e);
        if (t) return {
            fragment: t[1],
            signature: t[2]
        };
    }
    const Fe = /\/sp\/([^\/]+)/;
    function Ie(e) {
        const t = Fe.exec(e);
        if (t) return t[1];
    }
    function je(e) {
        let t = null;
        if (/\.googlevideo\.com/.test(e)) {
            const n = new ye(e);
            n.host = "redirector.googlevideo.com", t = me.format(n);
        } else if (/r[1-9].*\.c\.youtube\.com/.test(e)) {
            const n = new ye(e);
            n.host = "www.youtube.com", t = me.format(n);
        }
        return t;
    }
    var Pe = class {
        constructor() {
            this.lastSignatureInited = !1, this.oneLimitGetSignature = pe(1), this.lastSignature = null, 
            this.html5SigDecipher = new B, this.getDashUrlSignature = Le, this.dashMpdSignatureParamR = Ie, 
            this.getAltUrl = je, this.getData = Se, (r.a.isChromeMobile || r.a.isFirefoxMobile) && (this.ua = T());
        }
        getMetadata(e, t) {
            return fetch("https://www.youtube.com/youtubei/v1/player?key=AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w&prettyPrint=false", {
                body: `{"context": {"client": {"clientName": "ANDROID", "clientVersion": "17.29.34", "androidSdkVersion": 30, "hl": "en", "timeZone": "UTC", "utcOffsetMinutes": 0}}, "videoId": "${e}", "params": "8AEB", "playbackContext": {"contentPlaybackContext": {"html5Preference": "HTML5_PREF_WANTS"}}, "contentCheckOk": true, "racyCheckOk": true}`,
                headers: {
                    "Content-Type": "application/json",
                    "X-Youtube-Client-Name": "3",
                    "X-Youtube-Client-Version": "17.29.34"
                },
                method: "POST"
            }).then(e => e.json()).then(e => {
                const t = {
                    player_response: e
                };
                return de({
                    category: "meta",
                    subcategory: "101",
                    event: "main"
                }), {
                    videoInfo: t,
                    signature: null
                };
            }).catch(t => (ve.error("getMetadata error: %O", t), this.getVideoInfoAsPage(e).catch(e => {
                throw ve.error("getVideoInfoAsPage error: %O", e), de({
                    category: "meta",
                    subcategory: "101",
                    event: "fail"
                }), e;
            }).then(e => {
                let {videoInfo: t, signature: n} = e;
                return de({
                    category: "meta",
                    subcategory: "101",
                    event: "fallback"
                }), this.testSignature(t, n).then(() => ({
                    videoInfo: t,
                    signature: n
                }));
            })));
        }
        async testSignature(e, t) {
            const n = function(e) {
                let t = null;
                if ([ "url_encoded_fmt_stream_map", "adaptive_fmts", "fmt_url_map" ].some(n => {
                    const r = e[n];
                    if (r) return r.some(e => {
                        if (e.s && e.url) return t = e, !0;
                    });
                }), !t) {
                    const r = e.player_response;
                    if (r.streamingData) {
                        function n(e) {
                            const n = e.signatureCipher || e.cipher;
                            if (n) {
                                const {sp: e, s: r, url: o} = ge.parse(n);
                                return t = {
                                    url: o,
                                    sp: e,
                                    s: r
                                }, !0;
                            }
                        }
                        r.streamingData.formats && r.streamingData.formats.some(n), !t && r.streamingData.adaptiveFormats && r.streamingData.adaptiveFormats.some(n);
                    }
                }
                return t;
            }(e);
            if (!n) return;
            ve.debug("Found chiped item", e.player_response.videoDetails.videoId);
            const r = this.html5SigDecipher.applyActions(t.actionList, n.s);
            let o = null;
            if (n.getUrl) o = n.getUrl(r); else {
                const e = n.sp || "signature";
                o = n.url + `&${e}=` + r;
            }
            return Se({
                method: "HEAD",
                url: o
            }).catch(e => {
                const t = je(o);
                if ("net::ERR_NAME_NOT_RESOLVED" === e.message && t) return Se({
                    method: "HEAD",
                    url: t
                });
                throw e;
            }).catch(e => {
                if (403 === e.status) throw e;
            });
        }
        async getVideoInfo(e, t, n, r) {
            let o = null;
            const i = await this.getSignature();
            return Se({
                url: `https://${e}/get_video_info?` + ge.stringify({
                    video_id: t,
                    eurl: r,
                    el: n,
                    html5: 1,
                    sts: i.sts
                }),
                headers: Te({}, "User-Agent", this.ua)
            }).then(e => {
                o = e, e = ge.parse(e), this.parseParams(e);
                const t = parseInt(e.errorcode, 10);
                if (t > 0) {
                    let n = "VIDEO_INFO_ERROR";
                    throw 2 === t ? n = "INVALID_REQUEST" : 150 === t && (n = "UNAVAILABLE"), new le(`Error (${t}): ${e.reason}`, n);
                }
                if (!e.player_response) throw new le("Player response is not found", "PLAYER_RESPONSE_NOT_FOUND");
                const n = _e(e.player_response);
                if (n) throw n;
                return {
                    videoInfo: e,
                    signature: i
                };
            });
        }
        getVideoInfoAsJsonPage(e) {
            return Se({
                url: "https://www.youtube.com/watch?" + ge.stringify({
                    v: e,
                    pbj: 1
                }),
                headers: Te({
                    "x-youtube-client-name": "1",
                    "x-youtube-client-version": "2.20200812.02.01"
                }, "User-Agent", this.ua)
            }).then(async e => {
                if (e = JSON.parse(e), !Array.isArray(e)) throw new le("Unexpected response", "UNEXPECTED_RESPONSE");
                let t = null, n = null;
                if (e.some(e => {
                    if (e.playerResponse ? t = e.playerResponse : e.player && e.player.assets && e.player.assets.js && (n = e.player.assets.js), 
                    t && n) return !0;
                }), !t) throw new le("playerResponse is not found!", "PLAYER_RESPONSE_IS_NOT_FOUND");
                return this.getVideoInfoFromPlayerResponse(t, n);
            });
        }
        getVideoInfoAsPage(e) {
            let t = null;
            return Se({
                url: "https://www.youtube.com/watch?" + ge.stringify({
                    v: e,
                    has_verified: 1
                }),
                headers: Te({}, "User-Agent", this.ua)
            }).then(async e => {
                let n, r;
                t = e;
                try {
                    const {playerResponse: t, playerUrl: o} = this.getYtInitialPlayerResponseFromHtmlPage(e);
                    n = {
                        player_response: t
                    }, r = o;
                } catch (t) {
                    ve.warn("getYtInitialPlayerResponseFromHtmlPage error: %O", t);
                    const o = this.getSwfCfgFromHtmlPage(e);
                    n = this.parseParams(o.args), r = o.assets && o.assets.js;
                }
                return this.getVideoInfoFromPlayerResponse(n.player_response, r);
            });
        }
        getSwfCfgFromHtmlPage(e) {
            let t = null;
            if (he(e, [ /"responseContext"/ ]).some(e => p(e, [ /"playabilityStatus":/ ]).some(e => {
                if (e && e.playabilityStatus) return t = e, !0;
            })), t) {
                const e = _e(t);
                if (e) throw e;
            }
            let n = null;
            if (he(e, [ /ytplayer\.config\s+=\s+/ ]).some(e => p(e, [ /"player_response":/ ]).some(e => {
                if (e.args && "object" == typeof e.args) return n = e, !0;
            })), !n) throw new le("swfcfg is not found!", "SWFCFG_IS_NOT_FOUND");
            return n;
        }
        getYtInitialPlayerResponseFromHtmlPage(e) {
            let t = null;
            if (he(e, [ /ytInitialPlayerResponse/ ]).some(e => p(e, [ /"playabilityStatus":/ ]).some(e => {
                if (e && e.playabilityStatus) return t = e;
            })), !t) throw new le("ytInitialPlayerResponse in not found", "PLAYER_RESPONSE_NOT_FOUND");
            let n = null;
            return he(e, [ /ytplayer\.web_player_context_config\s+=\s+/ ]).some(e => p(e, [ /"jsUrl":/ ]).some(e => {
                if (e.jsUrl) return n = e.jsUrl;
            })), !n && he(e, [ /window\.ytplayer={};/ ]).some(e => p(e, [ /("jsUrl"|"PLAYER_JS_URL"):/ ]).some(e => e.PLAYER_JS_URL ? n = e.PLAYER_JS_URL : e.WEB_PLAYER_CONTEXT_CONFIG_ID_KEVLAR_WATCH && e.WEB_PLAYER_CONTEXT_CONFIG_ID_KEVLAR_WATCH.jsUrl ? n = e.WEB_PLAYER_CONTEXT_CONFIG_ID_KEVLAR_WATCH.jsUrl : void 0)), 
            {
                playerResponse: t,
                playerUrl: n
            };
        }
        async getVideoInfoFromPlayerResponse(e, t) {
            this.validatePlayerResponse(e);
            const n = _e(e);
            if (n) throw n;
            const r = {
                player_response: e
            };
            if (!t) throw new le("Player url is not found", "PLAYER_URL_IS_NOT_FOUND");
            return {
                videoInfo: r,
                signature: await this.getSignatureFormPlayerUrl(t)
            };
        }
        async getInfoFromVideoInfo(e, t) {
            if (!e.player_response) throw new le("Player response is not found", "PLAYER_RESPONSE_NOT_FOUND");
            e.player_response = X(e.player_response, Ee);
            const n = _e(e.player_response);
            if (n) throw n;
            if (!t) throw new le("Player url is not found", "PLAYER_URL_IS_NOT_FOUND");
            return {
                videoInfo: e,
                signature: await this.getSignatureFormPlayerUrl(t)
            };
        }
        parseParams(e) {
            return [ "url_encoded_fmt_stream_map", "adaptive_fmts", "fmt_url_map" ].forEach(t => {
                e[t] && (e[t] = e[t].split(",").map(e => ge.parse(e)));
            }), e.player_response && (e.player_response = JSON.parse(e.player_response), this.validatePlayerResponse(e.player_response)), 
            e;
        }
        validatePlayerResponse(e) {
            X(e, Ee), e.streamingData && Q(e.streamingData, Ae);
        }
        initLastSignature() {
            return q(() => {
                if (!this.lastSignatureInited) return this.lastSignatureInited = !0, new Promise(e => r.a.storage.get({
                    ytLastSignature: null
                }, t => e(t.ytLastSignature))).then(e => {
                    e && e.throttleSigCode && (e = null), this.lastSignature = e;
                });
            });
        }
        getSignature() {
            return this.oneLimitGetSignature(async () => {
                if (await this.initLastSignature(), !this.lastSignature || this.lastSignature.expiresAt < P()) {
                    let e = null;
                    this.lastSignature = await Se({
                        url: "https://www.youtube.com/",
                        headers: Te({}, "User-Agent", this.ua)
                    }).then(t => {
                        e = t;
                        let n = null;
                        try {
                            n = this.getPlayerUrlFromHtml(t);
                        } catch (e) {
                            n = this.getPlayerUrlFromAuthHtml(t);
                        }
                        return this.getSignatureFormPlayerUrl(n);
                    });
                }
                return this.lastSignature;
            });
        }
        getSignatureFormPlayerUrl(e) {
            return /^\/\//.test(e) ? e = "https:" + e : /^\//.test(e) && (e = "https://www.youtube.com" + e), 
            this.initLastSignature().then(() => this.lastSignature && this.lastSignature.expiresAt > P() && this.lastSignature.playerUrl === e && "9.91" === this.lastSignature.helperVersion ? this.lastSignature : Se({
                url: e,
                headers: Te({}, "User-Agent", this.ua)
            }).then(t => this.html5SigDecipher.dechip(e, t)).then(e => new Promise(t => r.a.storage.set({
                ytLastSignature: e
            }, t)).catch(e => {
                ve.warn("Unable save signature, cause: %O", e);
            }).then(() => this.lastSignature = e)));
        }
        getPlayerUrlFromHtml(e) {
            let t = null;
            if (he(e, [ /window\.ytplayer\s*=\s*/ ]).some(e => p(e, [ /"PLAYER_JS_URL":/ ]).some(e => {
                if (e.PLAYER_JS_URL) return t = e.PLAYER_JS_URL, !0;
            })), !t) throw new le("Player url is not found", "PLAYER_URL_IS_NOT_FOUND");
            return t;
        }
        getPlayerUrlFromAuthHtml(e) {
            let t = null;
            if (he(e, [ /ytplayer\.config\s+=\s+/ ]).some(e => p(e, [ /"assets":/ ]).some(e => {
                if (e.assets && e.assets.js) return t = e.assets.js, !0;
            })), !t) throw new le("Player url is not found", "PLAYER_URL_IS_NOT_FOUND");
            return t;
        }
        getThrottleSigFn(e) {
            let t = e.throttleSigFn;
            if ("function" != typeof t && e.nSigCode) {
                const n = this.html5SigDecipher.throttleSigDecipher.buildEvalSignatureFn(e.nSigCode);
                t = e => {
                    try {
                        return n(e);
                    } catch (e) {
                        ve.error("Use throttle signature error: %o", e);
                    }
                    return null;
                }, e.throttleSigFn = t;
            }
            return t;
        }
    };
    const Ue = Object(s.a)("youtube_embed").t, Me = n(5);
    function Ne(e, t) {
        const n = {
            144: 144,
            240: 240,
            360: 360,
            480: 480,
            720: 720,
            1080: 1080,
            1440: 1440,
            "4K": 2160,
            "5K": 2880,
            "8K": 4320
        };
        let r;
        const o = Math.max(e, t);
        e = Math.min(e, t);
        for (let t in n) {
            const i = n[t];
            if (!(o >= Math.floor(16 * i / 9) || e >= i)) return r;
            r = t;
        }
        return r;
    }
    function De(e) {
        return /ratebypass/.test(e) || (/\?/.test(e) ? e += "&ratebypass=yes" : (/\/$/.test(e) || (e += "/"), 
        e += "ratebypass/yes/")), e;
    }
    const Be = /(\/s\/([^\/]+))/;
    const qe = /\/sp\/([^\/]+)/;
    var $e = class {
        constructor(e) {
            this._lastSignature = null, this.html5SigDecipher = new B, this.ytMetadata = new Pe, 
            this.engine = e;
        }
        getYoutubeLinks(e, t) {
            const n = this;
            function r(r, o, i, s) {
                n.addMuxerLinks(r, o), n.addProLinks(r, e.extVideoId), n.addTelevzrLinks(r, e.extVideoId);
                const a = {
                    action: e.action,
                    extVideoId: e.extVideoId,
                    links: r,
                    title: o,
                    subtitles: i,
                    duration: s,
                    checkLinks: null
                };
                return e.checkLinks && r ? n.checkYoutubeLinks(r, (function(e, n) {
                    return a.checkLinks = n, t(a);
                })) : t(a);
            }
            return n._getYoutubeLinks(e.url, e.extVideoId, e.checkSubtitles, e.noDash).then((function(e) {
                r(e.links, e.title, e.subtitles, e.duration);
            }), (function(e) {
                Ue.error("_getYoutubeLinks error: %O", e), r(null, "", null, "");
            })), !0;
        }
        _getYoutubeLinks(e, t, n, r) {
            const o = this;
            return this.ytMetadata.getMetadata(t, e).then((function(e) {
                let {videoInfo: i, signature: s} = e;
                return o.onGetConfig(t, n, r, i, s);
            }));
        }
        readFmt(e, t, n, r) {
            const o = this, i = e.meta;
            t.forEach((function(t) {
                if (t.stream) return void (i.hasStream = 1);
                let s = t.url;
                if (!s) return;
                if (!/([?&])s(ig(nature)?)?=/i.test(s)) if (t.sig) s += "&sig=" + t.sig; else if (t.signature) s += "&signature=" + t.signature; else if (t.s) {
                    s += `&${t.sp || "signature"}=` + o.html5SigDecipher.applyActions(n.actionList, t.s);
                }
                s = s.replace(/\\u0026/gi, "&");
                let a = t.itag;
                if (!a) {
                    const e = /(?:[?&])itag=(\d+)/i.exec(s);
                    e && (a = e[1]);
                }
                if (!a || e[a]) return;
                /[?&]itag=/i.test(s) || (s += "&itag=" + a), s = De(s);
                let c = i[a];
                if (c || (c = i[a] = {}), t.fps && (c.fps = t.fps), t.size && /^\d+x\d+$/.test(t.size)) {
                    const e = t.size.split("x");
                    c.quality = Ne(e[0], e[1]);
                }
                if (t.bitrate && (c.bitrate = parseInt(t.bitrate)), t.type) {
                    c.type = t.type;
                    const e = t.type.match(/codecs="([^"]+)"/);
                    e && (c.codecs = e[1]);
                }
                t.projection_type && (c.projectionType = parseInt(t.projection_type)), e[a] || (e[a] = s + r);
            }));
        }
        _readPlayerResponse(e, t, n) {
            const r = e => {
                t[e.itag] || (t[e.itag] = e.url, t.meta[e.itag] = e);
            };
            e.streamingData && (Array.isArray(e.streamingData.formats) && e.streamingData.formats.forEach(t => {
                const o = this._readPlayerResponseFormat(t, n, e, "streamingData.formats");
                o && r(o);
            }), Array.isArray(e.streamingData.adaptiveFormats) && e.streamingData.adaptiveFormats.forEach(t => {
                const o = this._readPlayerResponseFormat(t, n, e, "streamingData.adaptiveFormats");
                o && r(o);
            }));
        }
        _readPlayerResponseFormat(e, t, n, r) {
            if (e.cipher || e.signatureCipher) {
                const {sp: n, s: r, url: o} = Me.parse(e.cipher || e.signatureCipher), i = this.html5SigDecipher.applyActions(t.actionList, r);
                e.url = o + (/\?/.test(o) ? "&" : "?") + n + "=" + encodeURIComponent(i);
            }
            const o = /[?&]n=([^&]+)/i.exec(e.url);
            if (o) {
                const n = o[1], r = decodeURIComponent(n), i = this.ytMetadata.getThrottleSigFn(t);
                if (i) {
                    const t = i(r);
                    t && (e.url = e.url.replace("n=" + n, "n=" + encodeURIComponent(t)));
                }
            }
            const i = {
                source: r
            }, s = "" + e.itag;
            i.itag = s, i.url = e.url, e.fps ? i.fps = parseFloat(e.fps) : i.noFps = !0, e.width && e.height ? (i.quality = Ne(e.width, e.height), 
            i.width = e.width, i.height = e.height) : i.noWidthHeight = !0, i.bitrate = e.bitrate, 
            i.type = e.mimeType;
            const a = /codecs="([^"]+)"/.exec(e.mimeType);
            if (a) {
                const e = a[1].split(/,\s*/), t = e.some(e => /^mp4a/.test(e)), n = e.some(e => /^avc/.test(e));
                i.isBundle = t && n;
            }
            return i.acodec && !i.vcodec && (delete i.noWidthHeight, delete i.noFps), e.contentLength && (i.contentLength = parseInt(e.contentLength, 10)), 
            i;
        }
        ytPrepareVideoInfo(e) {
            return this.onGetConfig(e.videoId, e.checkSubtitles, e.noDash, e.config, e.signature);
        }
        onGetConfig(e, t, n, r, o) {
            const i = this, {videoDetails: s = {}, playabilityStatus: a = {}} = r.player_response;
            let c = {
                meta: {}
            }, u = "", l = null, h = "", f = null;
            return q((function() {
                h = s.lengthSeconds || r.length_seconds || "", u = s.title || r.title || "";
                let e = "";
                u && (u = u.replace(/\+/g, " "), e = "&title=" + encodeURIComponent(j.modify(u)));
                let t = r.fmt_url_map || r.url_encoded_fmt_stream_map || [], n = r.adaptive_fmts || [];
                const l = a.liveStreamability;
                (l && l.liveStreamabilityRenderer && !l.liveStreamabilityRenderer.displayEndscreen || r.livestream || r.live_playback) && (c.meta.hasStream = 1), 
                i._readPlayerResponse(r.player_response, c, o), t && i.readFmt(c, t, o, e), n && i.readFmt(c, n, o, e), 
                f = r.dashmpd || "", f && -1 !== f.indexOf("yt_live_broadcast") && (f = null);
            })).then((function() {
                let r = Promise.resolve();
                return t && (r = r.then((function() {
                    return new Promise((function(t) {
                        i.getYoutubeSubtitles({
                            extVideoId: e
                        }, (function(e) {
                            l = e || null, t();
                        }));
                    })).catch((function(e) {
                        Ue.error("Get subtitles error: %O", e);
                    }));
                }))), !n && f && (r = r.then((function() {
                    let e = f;
                    const t = function(e) {
                        const t = qe.exec(e);
                        if (t) return t[1];
                    }(f) || "signature", n = function(e) {
                        const t = Be.exec(e);
                        if (t) return {
                            fragment: t[1],
                            signature: t[2]
                        };
                    }(f);
                    if (n) {
                        const r = i.html5SigDecipher.applyActions(o.actionList, n.signature);
                        e = f.replace(n.fragment, `/${t}/` + r);
                    }
                    return e = e.replace("/sig/", "/signature/"), i.getYouTubeDashLinks(c, e).catch((function(e) {
                        Ue.error("Get dash error: %O", e);
                    }));
                }))), r;
            })).then((function() {
                let e = Object.keys(c).length;
                return c.meta && !c.meta.hasStream && e--, e || (c = null), {
                    links: c,
                    title: u,
                    subtitles: l,
                    duration: h
                };
            }));
        }
        addProLinks(e, t) {
            if (!(e && e.meta && this.engine.preferences && this.engine.preferences.proEnabled)) return;
            const n = [ "1080", "2160", "4K" ];
            Object.keys(e.meta).forEach(r => {
                const o = e.meta[r];
                if ("string" == typeof o || !n.includes(o.quality)) return;
                let i = String(o.quality).toUpperCase();
                "4K" === o.quality && (i = o.height);
                const s = "pro" + o.quality;
                e.meta[s] = {
                    quality: i,
                    height: o.height,
                    itag: "pro",
                    format: "MP4",
                    type: "video",
                    url: "https://www.youtube.com/watch?v=" + encodeURIComponent(t)
                };
            }), e.meta.proMp3 = {
                quality: "mp3",
                itag: "pro",
                noVideo: !0,
                format: "Audio",
                type: "audio",
                url: "https://www.youtube.com/watch?v=" + encodeURIComponent(t)
            };
        }
        addTelevzrLinks(e, t) {
            const n = this.engine.preferences && this.engine.preferences.proEnabled;
            !e || e.meta && e.meta.hasStream || n || (e.televzr = "televzr://www.youtube.com/watch?v=" + t);
        }
        addMuxerLinks(e, t) {
            if (!e || !e.meta || e.meta.hasStream || !this.engine.preferences.ffmpegEnabled) return;
            let n = null, r = null, o = null;
            Object.keys(e.meta).forEach(t => {
                const i = e.meta[t];
                i && (i.isBundle ? (!n || i.height > n) && (n = i.height) : /audio\/mp4/.test(i.type) ? (!o || i.bitrate > o.bitrate) && (o = i) : /video\/mp4/.test(i.type) && i.height > 360 && i.height <= 720 && (!r || i.height > r.height || i.bitrate > r.bitrate || i.fps > r.fps) && (r = i));
            }), r && o && (e.meta.muxer = {
                quality: r.quality,
                width: r.width,
                height: r.height,
                fps: r.fps,
                format: "MP4",
                mmProps: {
                    sources: [ {
                        url: r.url,
                        format: "mp4"
                    }, {
                        url: o.url,
                        format: "m4a"
                    } ],
                    filename: t + ".mp4",
                    format: "mp4"
                }
            });
        }
        checkYoutubeLinks(e, t) {
            const n = [ "18", "34", "35" ];
            let r = "";
            for (let t = 0; t < n.length; t++) if (e[n[t]]) {
                r = e[n[t]];
                break;
            }
            r ? Object(i.a)({
                type: "HEAD",
                url: r
            }, (function(e, n) {
                t(r, !e);
            })) : t();
        }
        convertVtt2Srt(e, t) {
            Object(i.a)({
                url: e.url
            }, (function(n, r, o) {
                if (n || !o) return Ue.error("Request error!", n), t();
                const i = /(\d{2}:\d{2}:\d{2})\.(\d{3})/g, s = /^\d{2}:\d{2}:\d{2}\.\d{3}/, a = o.split("\n\n");
                s.test(a[0]) || a.shift(), s.test(a[a.length - 1]) || a.pop();
                let c = !1, u = a.filter((function(e) {
                    const t = s.test(e);
                    return t || (c = !0), t;
                })).map((function(e, t) {
                    return t + 1 + "\n" + (e = e.replace(i, "$1,$2"));
                }));
                if (u = u.join("\n\n"), c) return t();
                e.srt = u, e.preprocess = "srt2url", t();
            }));
        }
        getYoutubeSubtitles(e, t) {
            const n = this, o = e.extVideoId, s = "http://video.google.com/timedtext";
            Object(i.a)({
                url: s + "?hl=" + r.a.i18n.getMessage("lang") + "&v=" + o + "&type=list&tlangs=1",
                xml: !0
            }, (function(e, r, i) {
                if (e || !i) return t();
                const a = i.querySelectorAll("track"), c = i.querySelectorAll("target"), u = [], l = {}, h = {};
                let f, p, d = void 0;
                for (let e, t = 0; e = a[t]; t++) f = e.getAttribute("lang_code"), p = {
                    lang: f,
                    v: o,
                    fmt: "vtt",
                    name: e.getAttribute("name") || void 0
                }, l[f] = {
                    lang: e.getAttribute("lang_translated"),
                    langCode: f,
                    url: s + "?" + Me.stringify(p),
                    name: p.name
                }, u.push(l[f]), !d && e.getAttribute("cantran") && (d = p);
                if (d) for (let e, t = 0; e = c[t]; t++) f = e.getAttribute("lang_code"), p = {
                    lang: d.lang,
                    v: o,
                    tlang: f,
                    fmt: "vtt",
                    name: d.name
                }, h[f] = {
                    lang: e.getAttribute("lang_translated"),
                    langCode: f,
                    url: s + "?" + Me.stringify(p),
                    isAuto: !0
                };
                f = navigator.language.toLowerCase(), 0 === f.indexOf("zh-hant") ? f = "zh-Hant" : 0 === f.indexOf("zh-hans") && (f = "zh-Hans");
                const m = [ f ];
                "uk" === m[0] && m.push("ru");
                for (let e, t = 0; e = m[t]; t++) !l[e] && h[e] && u.push(h[e]);
                let g = 0, y = 0;
                const v = function() {
                    if (y++, g === y) return t(u);
                };
                g++, u.forEach((function(e) {
                    g++, n.convertVtt2Srt(e, v);
                })), v();
            }));
        }
        getYouTubeDashLinks(e, t) {
            const n = this, o = {};
            return (r.a.isChromeMobile || r.a.isFirefoxMobile) && (o["User-Agent"] = T()), (s = {
                url: t,
                headers: o,
                xml: !0
            }, new Promise((e, t) => {
                Object(i.a)(s, (n, r, o) => {
                    n && "string" == typeof n && (n = new Error(n)), n ? t(n) : e(o);
                });
            })).then((function(t) {
                n.parseDash(t, e);
            }));
            var s;
        }
        parseDash(e, t) {
            const n = e.querySelectorAll("Representation"), r = t.meta = t.meta || {};
            for (let e, o = 0; e = n[o]; o++) {
                const n = e.querySelector("BaseURL");
                let o = n.textContent;
                if (!o) continue;
                const i = n.parentNode.querySelector("SegmentURL"), s = i && i.getAttribute("media");
                if (s && 0 === s.indexOf("sq/")) continue;
                const a = e.getAttribute("id");
                let c = r[a];
                c || (c = r[a] = {}), o = De(o);
                const u = e.getAttribute("frameRate");
                u && (c.fps = u);
                const l = e.getAttribute("width"), h = e.getAttribute("height");
                l && h && (c.quality = Ne(l, h));
                const f = e.getAttribute("codecs");
                if (f) {
                    c.codecs = f;
                    let e = o.match(/mime=([^&]+)/);
                    e = e && e[1], e && (c.type = e);
                }
                t[a] || (t[a] = o);
            }
        }
        getYoutubeIdListFromPlaylist(e, t) {
            return this.getIdListFromList(e.baseUrl || "https://www.youtube.com", e.listId, t), 
            !0;
        }
        getIdListFromList(e, t, n) {
            const r = function(e) {
                if (!e) return;
                let t = e.match(/data-uix-load-more-href="([^"]+)"/);
                return t && (t = t[1]), t || void 0;
            }, o = function(e, t, n) {
                const r = function(e) {
                    const t = e.match(/<h1[^>]+>([^<]+)<\/h1>/);
                    if (t) return t[1].replace(/\r?\n/g, " ").trim();
                }(t[0]), o = {}, i = [], s = /href="\/watch\?([^"]+)"/g;
                let a = 0;
                for (let n = 0, r = t.length; n < r; n++) {
                    t[n].replace(s, (function(t, n) {
                        const r = R(n, {
                            params: !0,
                            sep: "&amp;"
                        });
                        r.list === e && (r.index = parseInt(r.index), o[r.index] = r.v, r.index > a && (a = r.index));
                    }));
                }
                for (let e = 0; e <= a; e++) void 0 !== o[e] && -1 === i.indexOf(o[e]) && i.push(o[e]);
                n({
                    idList: i,
                    title: r
                });
            }, s = function(e) {
                let t = null;
                const n = e.match(/"nextContinuationData":({[^}]+})/);
                if (n) try {
                    const e = JSON.parse(n[1]);
                    t = "/browse_ajax?" + Me.stringify({
                        ctoken: e.continuation,
                        itct: e.clickTrackingParams
                    });
                } catch (e) {
                    Ue.debug("getNewNextPageUrl error: %O", e);
                }
                return t;
            }, a = function(e, t) {
                const n = function(e) {
                    Array.isArray(e) && e.forEach((function(e) {
                        const n = e.playlistVideoRenderer, r = n && n.videoId;
                        r && t.push(r);
                    }));
                };
                let r = e.indexOf('{"playlistVideoListRenderer":{');
                -1 !== r ? (e = e.substr(r), p(e).forEach((function(e) {
                    const t = e.playlistVideoListRenderer, r = t && t.contents;
                    n(r);
                }))) : (r = e.indexOf('{"playlistVideoListContinuation":{'), -1 !== r && (e = e.substr(r), 
                p(e).forEach((function(e) {
                    const t = e.playlistVideoListContinuation, r = t && t.contents;
                    n(r);
                }))));
            };
            return Object(i.a)({
                url: e + "/playlist?list=" + t
            }, (function(c, u, l) {
                if (c) return n();
                let h = null;
                if (/"playlistVideoListRenderer"/.test(l)) {
                    const t = function(e) {
                        const t = {};
                        let n = null;
                        const r = /ytcfg\.set\(({.+)/.exec(e);
                        return r && L(r[1]).some((function(e) {
                            if (e.INNERTUBE_CONTEXT_CLIENT_NAME) return n = e, !0;
                        })), n && (t["x-youtube-client-name"] = n.INNERTUBE_CONTEXT_CLIENT_NAME, t["x-youtube-client-version"] = n.INNERTUBE_CONTEXT_CLIENT_VERSION, 
                        n.ID_TOKEN && (t["x-youtube-identity-token"] = n.ID_TOKEN)), t;
                    }(l), r = function(e) {
                        let t = "unknown", n = null;
                        const r = e.match(/"playlistSidebarPrimaryInfoRenderer":({.+)/);
                        if (r && L(r[1]).some((function(e) {
                            if (e.title && e.title.runs) return n = e, !0;
                        })), !t || "unknown" === t) {
                            const n = e.match(/"titleForm":({.+)/);
                            n && L(n[1]).some(e => {
                                if (e.inlineFormRenderer && e.inlineFormRenderer.textDisplayed && e.inlineFormRenderer.textDisplayed.simpleText) return t = e.inlineFormRenderer.textDisplayed.simpleText, 
                                !0;
                            });
                        }
                        if (n) try {
                            n.title.runs.some((function(e) {
                                if (e.text) return t = e.text;
                            }));
                        } catch (e) {
                            Ue.debug("getNewTitle error: %O", e);
                        }
                        return t;
                    }(l), o = [];
                    a(l, o), h = s(l), h ? function e(t, n, r, o, c) {
                        Object(i.a)({
                            url: t + n,
                            headers: r,
                            json: !0
                        }, (function(n, i, u) {
                            if (n) return Ue.error("YT next page request error! %O", n), c();
                            const l = JSON.stringify(u), h = s(l);
                            a(l, o), h ? e(t, h, r, o, c) : c();
                        }));
                    }(e, h, t, o, (function() {
                        n({
                            idList: o,
                            title: r
                        });
                    })) : n({
                        idList: o,
                        title: r
                    });
                } else h = r(l), h ? function e(t, n, o, s) {
                    o || (o = []), Object(i.a)({
                        url: t + n,
                        json: !0
                    }, (function(n, i, a) {
                        if (n || !a) return s(o);
                        o.push(a.content_html);
                        const c = r(a.load_more_widget_html);
                        if (void 0 === c) return s(o);
                        e(t, c, o, s);
                    }));
                }(e, h, [ l ], (function(e) {
                    o(t, e, n);
                })) : o(t, [ l ], n);
            }));
        }
        getYoutubeLinksFromConfig(e, t) {
            const n = this;
            return q(() => {
                const r = e.config, o = r.args.video_id;
                if (!r || !r.args) throw new Error("jsonList args is not found!");
                return fetch("https://www.youtube.com/youtubei/v1/player?key=AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w&prettyPrint=false", {
                    body: `{"context": {"client": {"clientName": "ANDROID", "clientVersion": "17.29.34", "androidSdkVersion": 30, "hl": "en", "timeZone": "UTC", "utcOffsetMinutes": 0}}, "videoId": "${o}", "params": "8AEB", "playbackContext": {"contentPlaybackContext": {"html5Preference": "HTML5_PREF_WANTS"}}, "contentCheckOk": true, "racyCheckOk": true}`,
                    headers: {
                        "Content-Type": "application/json",
                        "X-Youtube-Client-Name": "3",
                        "X-Youtube-Client-Version": "17.29.34"
                    },
                    method: "POST"
                }).then(e => e.json()).then(r => {
                    const o = {
                        player_response: r
                    };
                    return n.onGetConfig(e.extVideoId, e.checkSubtitles, e.noDash, o, null).then(r => {
                        de({
                            category: "links",
                            subcategory: "101",
                            event: "main"
                        });
                        const o = r.links, i = r.title;
                        o && n.addProLinks(o, e.extVideoId), o && n.addTelevzrLinks(o, e.extVideoId), n.addMuxerLinks(o, i), 
                        t({
                            links: o,
                            title: i,
                            isQuick: 1
                        });
                    });
                }).catch(o => {
                    const i = r.args, s = r.playerUrl;
                    return this.ytMetadata.getInfoFromVideoInfo(i, s).then(r => {
                        let {videoInfo: o, signature: i} = r;
                        return n.onGetConfig(e.extVideoId, e.checkSubtitles, e.noDash, o, i).then(r => {
                            de({
                                category: "links",
                                subcategory: "101",
                                event: "fallback"
                            });
                            const o = r.links, i = r.title;
                            o && n.addProLinks(o, e.extVideoId), o && n.addTelevzrLinks(o, e.extVideoId), n.addMuxerLinks(o, i), 
                            t({
                                links: o,
                                title: i,
                                isQuick: 1
                            });
                        });
                    }).catch(r => (Ue.warn("Skip getYoutubeLinksFromConfig, cause %O", r), de({
                        category: "links",
                        subcategory: "101",
                        event: "fail"
                    }), n.getYoutubeLinks(e, t)));
                });
            }), !0;
        }
    };
    var Ve = function(e, t) {
        t && !Array.isArray(t) && (t = [ t ]);
        const n = [];
        let r = -1, o = -1;
        do {
            if (o = e.indexOf('"', o + 1), -1 !== o) {
                if ("\\" === e[o - 1]) continue;
                -1 !== r ? (n.push(e.substr(r, o + 1 - r)), r = -1) : r = o;
            } else r = o;
        } while (-1 !== o);
        const i = [];
        for (let e, r = 0; e = n[r]; r++) if ('""' !== e) try {
            t ? t.every((function(t) {
                return t.test(e);
            })) && i.push(JSON.parse(e)) : i.push(JSON.parse(e));
        } catch (e) {}
        return i;
    };
    var He = function(e, t, n) {
        n = n || [], Array.isArray(n) || (n = [ n ]);
        const r = [], o = new RegExp("(<" + e + "[^>]*>)", "i"), i = new RegExp("(</" + e + ">)", "i");
        let s = null, a = "", c = "", u = "", l = -1;
        for (;(s = o.exec(t)) && (a = s[1], l = t.indexOf(a), -1 !== l); ) t = t.substr(l + a.length), 
        s = i.exec(t), s && (c = s[1], u = t.substr(0, t.indexOf(c)), r.push(a + u + c));
        return r.filter((function(e) {
            return n.every((function(t) {
                return t.test(e);
            }));
        }));
    };
    var ze = function(e, t) {
        const n = (new DOMParser).parseFromString("<html><body>" + e + "</body></html>", "text/html");
        if (t) {
            let e = n.head.querySelector("base");
            e || (e = n.createElement("base"), e.href = t, n.head.appendChild(e));
        }
        return n;
    };
    var Ye = class {
        constructor(e) {
            this.engine = e;
        }
        getVKLinks(e, t) {
            var n = this;
            return this._getVKLinks(e.extVideoId, (r, o, i, s, a, c, u) => {
                if (u) return u.origRequest = e, void n.engine.onMessage(u, {}, t);
                var l = {
                    action: e.action,
                    extVideoId: r || e.extVideoId,
                    links: o,
                    title: i,
                    duration: s,
                    thumb: a,
                    data: c,
                    checkLinks: null
                };
                e.checkLinks && o && o.length > 0 ? this.checkVkLinks(o, (function(e, n) {
                    l.checkLinks = n, t(l);
                })) : t(l);
            }), !0;
        }
        preparePladformLinks(e) {
            var t, n = {
                links: t = []
            };
            return e.forEach((function(e) {
                n.title = e.title, n.duration = e.duration, n.thumb = e.cover;
                var r = e.url.match(/[\w]+\.(mp4|flv)(?:\?|$)/i);
                r = r ? r[1] : "flv", t.push({
                    url: e.url,
                    name: r.toUpperCase(),
                    subname: e.quality.toUpperCase(),
                    type: r.toLowerCase()
                });
            })), n;
        }
        _getVKLinks(e, t) {
            var n = this, r = [], o = e, s = null, a = "", c = "", u = e, l = null, h = null, f = null, d = /^video(-?\d+)_(\d+)/i;
            if (d.test(u)) l = u.match(d), h = parseInt(l[1]), f = parseInt(l[2]); else {
                l = u.match(/(?:^|&)oid=(-?\d+)/i), h = l && parseInt(l[1]), l = u.match(/(?:^|&)id=(-?\d+)/i), 
                f = l && parseInt(l[1]), u = "", h && f && (u = "video" + h + "_" + f);
            }
            return u ? (o = u, Object(i.a)({
                url: "https://vk.com/" + u
            }, (e, i, l) => {
                if (e || !l) return t(u, r, o, c, a, null, s);
                var d = null;
                if (p(l, [ /"vid":/, /"oid":/, /"md_title":/ ]).some((function(e) {
                    var t = e && e[4] && e[4].player && e[4].player.params && e[4].player.params[0];
                    if (t && t.vid === f && t.oid === h) return d = t, !0;
                })), d) {
                    var m = this.getVkLinksFromJson(d);
                    if (r = m.links, o = m.title, a = m.thumb, c = m.duration, r.length) return t(u, r, o, c, a, d, s);
                }
                var g = null;
                p(l, [ /"player"/ ]).some((function(e) {
                    var t = e && e[4] && e[4].player && e[4].player.params && e[4].player.params[0];
                    if ("string" == typeof t) return g = t, !0;
                }));
                var y, v = !1;
                g && ((y = /dailymotion.com\/(?:swf\/)?video\/([\w\d]+)/i.exec(g)) && (s = {
                    action: "getDailymotionLinks",
                    extVideoId: y[1]
                }, v = !0));
                if (v) return t(u, r, o, c, a, null, s);
                var b = !1;
                return Ve(l, /video_box_wrap/).some(e => {
                    var i = null, h = /<iframe([^>]+)>/i.exec(e);
                    if (h) {
                        var f = h[1];
                        if (i = /youtube.com\\?\/embed\\?\/([\w\-]+)/i.exec(f)) return s = {
                            action: "getYoutubeLinks",
                            extVideoId: i[1]
                        }, !0;
                        if (i = /vimeo.com\\?\/video\\?\/(\d+)/i.exec(f)) return s = {
                            action: "getVimeoLinks",
                            extVideoId: i[1]
                        }, !0;
                        if (i = /src="([^"]*pladform\.ru[^"]+)"/i.exec(f)) {
                            b = !0;
                            var p = R(i[1]);
                            return n.engine.modules.odnoklassniki.getPladformVideo({
                                extVideoId: {
                                    playerId: p.pl,
                                    videoId: p.videoid
                                }
                            }, e => {
                                e && "getRutubeLinks" === e.action && (e.links = null);
                                var n = e && e.links;
                                if (!Array.isArray(n)) return t(u, r, o, c, a, null, s);
                                var i = this.preparePladformLinks(n);
                                return t(u, i.links, i.title, i.duration, i.thumb, null, s);
                            }), !0;
                        }
                    }
                    return !!He("video", e).some((function(e) {
                        var t = ze(e, "https://vk.com/"), n = !1;
                        return [].slice.call(t.querySelectorAll("source")).forEach((function(e) {
                            var t = !1, i = e.src;
                            t || /^(.*cdninstagram\.com.+mp4)/i.exec(i) && (t = !0, n = !0, r.push({
                                url: i,
                                subname: "SD",
                                name: "MP4",
                                type: "mp4"
                            }));
                            if (!t) {
                                var s = /\.(\d+)\.mp4(?:$|\?)/.exec(i);
                                if (s) {
                                    t = !0, n = !0;
                                    var a = i, c = s[1], u = a.indexOf("?");
                                    -1 !== u && (a = a.substr(0, u)), Ve(l, /mv_title/).some((function(e) {
                                        var t = /id="mv_title"[^>]*>([^<]+)/.exec(e);
                                        if (t) return o = j.decodeSpecialChars(I(t[1])), !0;
                                    })), r.push({
                                        url: a,
                                        subname: c,
                                        name: "MP4",
                                        type: "mp4"
                                    });
                                }
                            }
                        })), n;
                    })) || (/var\sopts\s*=\s*/.test(e) && (i = /url:\s*'(?:[^']+)dailymotion.com\/(?:swf\/)?video\/([\w\d]+)/.exec(e)) ? (s = {
                        action: "getDailymotionLinks",
                        extVideoId: i[1]
                    }, !0) : void 0);
                }), !b && t(u, r, o, c, a, null, s);
            })) : t(u, r, o);
        }
        checkVkLinks(e, t) {
            var n = "";
            e && e.length > 0 && (n = "mp4" == e[0].type ? e[0].url : e.length > 1 ? e[1].url : e[0].url), 
            n ? Object(i.a)({
                url: n,
                type: "HEAD"
            }, (function(e, r) {
                t(n, !e);
            })) : t();
        }
        getVkLinksFromJsonMsg(e, t) {
            return t(this.getVkLinksFromJson(e.json));
        }
        getVkLinksFromJson(e) {
            var t = [], n = e.vid, r = e.md_title || e.vid, o = "";
            e.thumb ? o = e.thumb : e.jpg && (o = e.jpg);
            var i = /\.flv(\?|$)]/, s = /url([0-9]+)/;
            Object.keys(e).forEach((function(n) {
                var r = "", o = "mp4", a = null;
                "extra_data" === n && "99" === e.extra ? (r = "", e.live_mp4 ? r = e.live_mp4 : e.postlive_mp4 && (r = e.postlive_mp4), 
                r && (a = e.hd ? "HD" : "SD", t.push({
                    url: r,
                    subname: a,
                    name: o.toUpperCase(),
                    type: o
                }))) : "extra_data" === n && "52" === e.extra ? (a = e.hd ? "HD" : "SD", r = e.extra_data, 
                i.test(r) && (o = "flv"), t.push({
                    url: r,
                    subname: a,
                    name: o.toUpperCase(),
                    type: o
                })) : null !== (a = (a = n.match(s)) && a[1]) && (r = e[n], i.test(r) && (o = "flv"), 
                t.push({
                    url: r,
                    subname: a,
                    name: o.toUpperCase(),
                    type: o
                }));
            }));
            var a = e.duration;
            return {
                action: "getVKLinks",
                extVideoId: n,
                links: t,
                title: r,
                duration: a,
                thumb: o,
                data: e,
                checkLinks: null
            };
        }
        getVkLinksFromData(e, t) {
            var n = e.data, r = null;
            return p(n, [ /"vid":/, /"oid":/, /"md_title":/ ]).some((function(e) {
                if (e = e.player && e.player.params && e.player.params[0]) return r = e, !0;
            })), r ? t(this.getVkLinksFromJson(r)) : t();
        }
        async downloadVkStory(e) {
            let {downloadFileUrl: t, filename: n} = e;
            const r = await fetch(t, {
                headers: {
                    "User-Agent": "curl/7.64.1"
                }
            }), o = await r.blob(), i = URL.createObjectURL(o);
            this.engine.utils.downloadFile({
                options: {
                    filename: n,
                    url: i
                }
            });
        }
    };
    const Ge = n(5);
    var Je = class {
        constructor(e) {
            this.engine = e;
        }
        async getOkVideoUrlFromMobile(e) {
            let {videoUrl: t, videoId: n} = e;
            t = t.replace("/ok.ru", "/m.ok.ru");
            const r = (await Object(C.a)(t)).body.match(/data-video=".*?"/g);
            if (!Array.isArray(r)) return;
            const o = r.map(e => {
                try {
                    const t = e.replace(/data-video="(.*?)"/, "$1").replace(/&quot;/g, '"');
                    return JSON.parse(t);
                } catch (e) {
                    return !1;
                }
            }).filter(Boolean).find(e => parseInt(e.movieId) === parseInt(n));
            return o && o.videoSrc;
        }
        getOdnoklassnikiLinks(e, t) {
            return this._getOdnoklassnikiLinks(e.extVideoId, (function(n) {
                var r = {
                    action: e.action,
                    extVideoId: e.extVideoId,
                    links: n,
                    title: e.title
                };
                t(r);
            })), !0;
        }
        getOdnoklassnikiAudioLinks(e, t) {
            return this._getOdnoklassnikiAudioLinks(e.url, e.trackId, e.jsessionId, (function(n) {
                var r = {
                    action: e.action,
                    trackId: e.trackId,
                    jsessionId: e.jsessionId,
                    data: n
                };
                t(r);
            })), !0;
        }
        _getOdnoklassnikiLinks(e, t) {
            if (e) {
                var n = "http://in.video.mail.ru/cgi-bin/video/oklite?eid=" + e;
                Object(i.a)({
                    url: n
                }, (function(n, r, o) {
                    if (n || !o) return t(null);
                    var i = "http://www.okcontent.video.mail.ru/media/", s = o.match(/\$vcontentHost=([^\s"'<>]+)/i);
                    s && s.length > 1 && (i = "http://" + s[1] + "/media/"), i += e;
                    var a = [], c = "", u = o.match(/\$height=([0-9]+)/);
                    u && u.length > 1 && (c = u[1]), a.push({
                        url: i + "-v.mp4",
                        name: "SD",
                        ext: "FLV",
                        subname: c
                    }), o.search(/\$HDexist=1/i) > -1 && (c = "", (u = o.match(/\$HDheight=([0-9]+)/)) && u.length > 1 && (c = u[1]), 
                    a.push({
                        url: i + "-hv.mp4",
                        name: "HD",
                        ext: "MP4",
                        subname: c
                    })), a && t(a);
                }));
            } else t(null);
        }
        _getOdnoklassnikiAudioLinks(e, t, n, r) {
            if (!t || !n) return r(null);
            Object(i.a)({
                url: "http://wmf1.ok.ru/play;jsessionid=" + n + "?tid=" + t,
                json: !0
            }, (function(e, t, n) {
                if (e || !n) return r(null);
                r(n);
            }));
        }
        getOkAudioListLinks(e, t) {
            var n = [], r = e.trackIdArr, o = e.jsessionId;
            if (!Array.isArray(r) || "string" != typeof o || !r.length) return t(n);
            for (var i, s = r.length, a = 0, c = function(e) {
                e && n.push(e), function() {
                    if (++a === s) t(n);
                }();
            }, u = 0; i = r[u]; u++) this._getOdnoklassnikiAudioLinks(void 0, i, o, c);
            return !0;
        }
        getClipyouLinks(e, t, n, r, o) {
            Object(i.a)({
                url: "http://media.clipyou.ru/api/player/secure_link?record_id=" + e + "&type=mp4&resource_hash=" + t,
                json: !0
            }, (function(e, t, i) {
                if (e || !i || !Array.isArray(i.data) || !i.data.length) return o();
                var s = [];
                i.data.forEach((function(e) {
                    s.push({
                        quality: n,
                        url: e,
                        title: r
                    });
                })), o(s);
            }));
        }
        getClipyouHash(e, t) {
            Object(i.a)({
                url: "http://media.clipyou.ru/api/player_data.json?id=" + e
            }, (function(e, n, r) {
                if (e || !r) return t();
                if (!(r = r.match('resource_hash".?:.?"([^"]*)"')) || r.length < 2) return t();
                var o = r[1];
                t(o);
            }));
        }
        getPladformVideo(e, t) {
            var n = {
                action: e.action,
                extVideoId: e.extVideoId,
                links: [],
                title: e.title
            }, r = function() {
                t(n);
            }, o = e.extVideoId.playerId, s = e.extVideoId.videoId;
            return Object(i.a)({
                url: "http://out.pladform.ru/getVideo?pl=" + o + "&videoid=" + s,
                xml: !0
            }, (e, t, o) => {
                if (e || !o) return r();
                var i = o.querySelectorAll("src");
                if (0 === i.length) return r();
                var s = o.querySelector("cover") || void 0;
                s && (s = s.textContent) && "//" === s.substr(0, 2) && (s = "http:" + s);
                var a = o.querySelector("time") || void 0;
                a = a && a.textContent;
                var c = o.querySelector("title");
                (c = c && c.textContent) && (n.title = c);
                var u = i[0], l = u.getAttribute("type"), h = u.textContent || "", f = u.getAttribute("quality");
                if (u) {
                    if ("clipyou" === l) return this.getClipyouHash(h, e => {
                        if (!e) return r();
                        this.getClipyouLinks(h, e, f, c, (function(e) {
                            n.links = e, r();
                        }));
                    });
                    if ("rutube" === l) {
                        var p = o.querySelector("external_embed");
                        return (p = p && p.textContent) && (n.action = "getRutubeLinks", n.links = [ p ]), 
                        r();
                    }
                }
                for (var d, m = [ "ld", "sd" ], g = [ "360", "720" ], y = 0; d = i[y]; y++) {
                    h = d.textContent || "", f = d.getAttribute("quality"), /^\d+p$/.test(f) && (f = f.match(/^(\d+)p$/)[1]);
                    var v = m.indexOf(f);
                    -1 !== v && (f = g[v]), "video" === (l = d.getAttribute("type")) && n.links.push({
                        url: h,
                        quality: f,
                        title: c,
                        cover: s,
                        duration: a
                    });
                }
                return r();
            }), !0;
        }
        getOkMetadata(e, t) {
            var n = e.url;
            return n ? (Object(i.a)({
                method: "POST",
                url: n,
                json: !0
            }, (function(e, n, r) {
                if (e || !r) return t();
                t(r);
            })), !0) : t();
        }
        getOkViaMobile(e, t) {
            var n = e.metadata, r = {
                "st.cmd": "movieLayer",
                "st.mvId": e.mvId
            }, o = "http://m.ok.ru/dk?" + Ge.stringify(r), s = {
                action: e.action,
                links: null,
                title: n.movie.title
            };
            return Object(i.a)({
                url: o
            }, (function(r, o, i) {
                if (r || !i) return t();
                var a = new RegExp('href="([^"]+st\\.cmd=moviePlaybackRedirect[^"]+st\\.mvid=' + e.mvId + '[^"]+)"'), c = i.match(a);
                if (!(c = c && c[1])) return t();
                if (c = j.decodeSpecialChars(c), s.links = [ {
                    url: c
                } ], !/st.mq=\d+/.test(c)) return t(s);
                var u = n.videos;
                if (!u || !u.length) return t(s);
                u.forEach((function(e) {
                    if (e.url) {
                        var t = R(e.url);
                        t.type && (e.url = c.replace(/(st.mq=)\d+/, "$1" + t.type));
                    }
                })), s.links = u, t(s);
            })), !0;
        }
        okDirectOrMobile(e, t) {
            var n = e.metadata, r = null;
            n.videos && n.videos.some((function(e) {
                if (e.url) return r = e.url, !0;
            }));
            var o = () => {
                e.action = "getOkViaMobile", this.getOkViaMobile(e, t);
            };
            return r ? (Object(i.a)({
                url: r,
                type: "HEAD"
            }, (function(r) {
                return r ? o() : (e.action = "getOkViaMobileNoWrap", e.links = n.videos, t(e));
            })), !0) : (o(), !0);
        }
        okRequestVideoPage(e) {
            let {videoId: t} = e;
            const n = "https://ok.ru/video/" + t;
            return Object(C.a)({
                url: n,
                headers: {
                    "user-agent": T()
                }
            }).then(e => e.body);
        }
    };
    var We = class {
        constructor(e) {
            this.engine = e;
        }
        getFacebookLinks(e, t) {
            return this._getFacebookLinks(e.extVideoId, (function(n, r, o, i) {
                var s = {
                    action: e.action,
                    extVideoId: e.extVideoId,
                    links: n || null,
                    title: r || "",
                    thumb: o || "",
                    duration: i || ""
                };
                t(s);
            })), !0;
        }
        getFacebookLinksFromData(e, t) {
            var n = e.data, r = e.extVideoId;
            return this.getLinksFromData2(n, r, !0, (function(n, r, o, i) {
                var s = {
                    action: "getFacebookLinksFromData",
                    extVideoId: e.extVideoId,
                    links: n || null,
                    title: r || "",
                    thumb: o || "",
                    duration: i || ""
                };
                t(s);
            }));
        }
        _getFacebookLinks(e, t) {
            Object(i.a)({
                type: "GET",
                url: "https://www.facebook.com/video.php?v=" + e,
                headers: {
                    Cookie: ""
                }
            }, (n, r, o) => {
                if (n || !o) return t();
                this.getLinksFromData(o, e, t);
            });
        }
        getLinksFromData(e, t, n) {
            var r = e.match(/\["params","([^"]*)"\]/im);
            if (!r) return this.getLinksFromData2(e, t, !1, n);
            var o = null;
            try {
                if ((o = JSON.parse(decodeURIComponent(JSON.parse('"' + r[1] + '"'))).video_data).progressive && (o = o.progressive), 
                !o) return n();
            } catch (e) {
                return n();
            }
            var i = null, s = null, a = [], c = {
                sd_src: "SD",
                hd_src: "HD"
            };
            Array.isArray(o) || (o = [ o ]);
            for (var u, l = 0; u = o[l]; l++) [ "sd_src", "hd_src" ].forEach(e => {
                if (u.thumbnail_src && (i = u.thumbnail_src), u.video_duration && (s = u.video_duration), 
                u[e]) {
                    var t = this.getFileExtension(u[e], "mp4");
                    a.push({
                        url: u[e],
                        name: c[e],
                        type: t,
                        ext: t.toUpperCase()
                    });
                }
            });
            n(a, "", i, s);
        }
        getLinksFromData2(e, t, n, r) {
            var o = null, i = function(e) {
                return e.split(/"?videoData"?:\[/).some((function(e) {
                    return L(e).some((function(e) {
                        if ((e.sd_src || e.hd_src) && String(e.video_id) === String(t)) return o = e, !0;
                    }));
                }));
            };
            if (n ? i(e) : f(e, [ /"?videoData"?:\[/ ]).some(i), !o) return r();
            var s, a = [];
            return o.sd_src && (s = this.getFileExtension(o.sd_src, "mp4"), a.push({
                url: o.sd_src,
                name: "SD",
                type: s,
                ext: s.toUpperCase()
            })), o.hd_src && (s = this.getFileExtension(o.hd_src, "mp4"), a.push({
                url: o.hd_src,
                name: "HD",
                type: s,
                ext: s.toUpperCase()
            })), r(a, "", o.thumbnail_src, o.video_duration);
        }
        getFileExtension(e, t) {
            var n = e.match(/\.([a-z0-9]{3,4})(\?|$)/i);
            return n ? (n = n[1]).toLowerCase() : t || "";
        }
        getFacebookPhotoUrl(e, t) {
            return e.fbid ? (Object(i.a)({
                url: "https://www.facebook.com/photo.php?fbid=" + e.fbid
            }, (function(e, n, r) {
                if (e || !r) return t();
                if (i = r.match(/<a[^>]+fbPhotosPhotoActionsItem[^>]+href="([^">]+dl=1)"[^>]+>/i)) {
                    var o = i[1].replace(/&amp;/g, "&");
                    return t([ o ]);
                }
                var i, s = [], a = {};
                return (i = r.match(/(<a[^>]+rel="theater"[^>]+>)/gi)) && i.forEach((function(e) {
                    var t = e.match(/data-pl[os]i="[^"]+"/gi);
                    t && t.forEach((function(e) {
                        var t = e.indexOf("=");
                        if (-1 !== t) {
                            var n = e.substr(0, t), r = e.substr(t + 1);
                            r = r.substr(1, r.length - 2).replace(/&amp;/g, "&"), a[n] = r, s.push(r);
                        }
                    }));
                })), a["data-ploi"] ? t([ a["data-ploi"] ]) : t(s);
            })), !0) : t();
        }
    };
    var Qe = class {
        constructor(e) {
            this.engine = e;
        }
        async ffInstagramDownloadMedia(e) {
            let {downloadFileUrl: t, filename: n} = e;
            const r = await fetch(t, {
                headers: {
                    "User-Agent": "curl/7.64.1"
                }
            }), o = await r.blob(), i = URL.createObjectURL(o);
            this.engine.utils.downloadFile({
                options: {
                    filename: n,
                    url: i
                }
            });
        }
    };
    function Xe(e, t) {
        Xe = function(e, t) {
            return new i(e, void 0, t);
        };
        var n = k(RegExp), r = RegExp.prototype, o = new WeakMap;
        function i(e, t, r) {
            var i = n.call(this, e, t);
            return o.set(i, r || o.get(e)), i;
        }
        function s(e, t) {
            var n = o.get(t);
            return Object.keys(n).reduce((function(t, r) {
                return t[r] = e[n[r]], t;
            }), Object.create(null));
        }
        return y(i, n), i.prototype.exec = function(e) {
            var t = r.exec.call(this, e);
            return t && (t.groups = s(t, this)), t;
        }, i.prototype[Symbol.replace] = function(e, t) {
            if ("string" == typeof t) {
                var n = o.get(this);
                return r[Symbol.replace].call(this, e, t.replace(/\$<([^>]+)>/g, (function(e, t) {
                    return "$" + n[t];
                })));
            }
            if ("function" == typeof t) {
                var i = this;
                return r[Symbol.replace].call(this, e, (function() {
                    var e = [];
                    return e.push.apply(e, arguments), "object" != typeof e[e.length - 1] && e.push(s(e, i)), 
                    t.apply(this, e);
                }));
            }
            return r[Symbol.replace].call(this, e, t);
        }, Xe.apply(this, arguments);
    }
    class Ke {
        constructor(e) {
            const t = A(e, Xe(/#EXTINF:[\s\S]*?,\n([\s\S]*?)$/gm, {
                url: 1
            }));
            this.urls = [];
            for (let e of t) e.groups && e.groups.url ? this.urls.push(e.groups.url) : e[1] && this.urls.push(e[1]);
        }
        static createFromURL(e) {
            return Object(C.a)(e).then(e => new Ke(e.body));
        }
        changeURLs(e) {
            this.urls = this.urls.map(e);
        }
        _downloadTask(e) {
            return fetch(e).then(e => {
                if (e.ok) return e.blob();
                throw new Error("bad response");
            });
        }
        download() {
            const e = this.urls.map(e => this._downloadTask(e));
            return Promise.all(e).then(e => {
                const t = new Blob(e, {
                    type: e[0].type
                });
                return URL.createObjectURL(t);
            });
        }
        fetchMimeType() {
            return fetch(this.urls[0], {
                method: "head"
            }).then(e => e.headers.get("Content-Type"));
        }
        _emit(e, t) {
            const n = new CustomEvent("hlsDownloader." + e, {
                detail: t
            });
            document.dispatchEvent(n);
        }
    }
    var Ze = Ke, et = n(5), tt = n.n(et);
    const nt = Object(s.a)("soundcloud_com_embed");
    const rt = Object(s.a)("match_tv_embed");
    var ot = class {
        constructor(e) {
            this.engine = e;
        }
        getMailruLinks(e, t) {
            return this._getMailruLinks(e.extVideoId, (function(n, r, o, i, s) {
                var a = {
                    action: e.action,
                    extVideoId: i || e.extVideoId,
                    links: n,
                    title: r,
                    thumb: o,
                    duration: s
                };
                t(a);
            })), !0;
        }
        _getMailruLinks(e, t) {
            var n, r = e, o = e.match(/\/([^\/]+)\/([^\/]+)\/video\/(.+).html/);
            if (o || (o = e.match(/embed\/([^\/]+)\/([^\/]+)\/(.+).html/)), o && (n = "http://api.video.mail.ru/videos/" + o[1] + "/" + o[2] + "/" + o[3] + ".json", 
            r = o[1] + "/" + o[2] + "/video/" + o[3] + ".html"), n) return this.onGetMailruMetadataUrl(n, r, t);
            Object(i.a)({
                url: "http://my.mail.ru/" + e
            }, (e, o, i) => {
                if (e || !i) return t();
                var s = /"metaUrl":/, a = null;
                if (f(i, s).some((function(e) {
                    return p(e, s).some((function(e) {
                        if (e.metaUrl) return a = e, !0;
                    }));
                })), a) return n = a.metaUrl, void this.onGetMailruMetadataUrl(n, r, t);
                if (!(i = i.match(/<meta\s+content="[^"]+(videoapi\.my\.mail[^&]+)&[^"]+"[^>]+\/>/))) return t();
                var c = (i = decodeURIComponent(i[1])).substr(i.lastIndexOf("/") + 1);
                n = "http://videoapi.my.mail.ru/videos/" + c + ".json", this.onGetMailruMetadataUrl(n, r, t);
            });
        }
        onGetMailruMetadataUrl(e, t, n) {
            this.getMailruMetadata(e, e => {
                if (!e || "string" == typeof e) return n();
                this.readMailruMetadata(e, (e, r, o, i) => {
                    n(this.prepMailruLinks(e), r, o, t, i);
                });
            });
        }
        prepMailruLinks(e) {
            if (e) {
                for (var t, n = [], r = 0; t = e[r]; r++) {
                    var o = t.url, i = "FLV";
                    -1 !== o.indexOf(".mp4") && (i = "MP4"), -1 !== o.indexOf(".mov") && (i = "MOV"), 
                    -1 !== o.indexOf(".mpg") && (i = "MPG"), t.quality || (t.quality = "-?-");
                    var s = t.quality.toUpperCase(), a = [ "1080P", "720P", "480P", "360P", "272P" ].indexOf(s);
                    -1 !== a && (s = [ "1080", "720", "480", "360", "272" ][a]);
                    var c = i.toLowerCase();
                    n.push({
                        url: o,
                        subname: s,
                        name: i,
                        ext: c
                    });
                }
                return n.sort((function(e, t) {
                    return "HD" === e.subname ? 1 : e.subname > t.subname;
                })), n;
            }
        }
        getMailruMetadata(e, t) {
            if (!e) return t();
            Object(i.a)({
                url: e,
                json: !0
            }, (function(e, n, r) {
                if (e || !r) return t();
                t(r);
            }));
        }
        readMailruMetadata(e, t) {
            var n, r = [], o = void 0, i = void 0;
            if (e.meta && (i = e.meta.poster, o = e.meta.duration), "UPLOADED" === e.provider) {
                if (n = e.movie ? e.movie.title : void 0, !e.videos) return t();
                e.videos.forEach((function(e) {
                    r.push({
                        quality: e.name,
                        url: e.url,
                        title: n
                    });
                }));
            } else if ("ugc" === e.provider) {
                if (n = e.meta ? e.meta.title : void 0, !e.videos) return t();
                e.videos.forEach((function(e) {
                    r.push({
                        quality: e.key,
                        url: e.url,
                        title: n
                    });
                }));
            } else if ("pladform" === e.provider) {
                return n = e.meta ? e.meta.title : void 0, void this.engine.modules.odnoklassniki.getPladformVideo({
                    extVideoId: {
                        playerId: e.meta.playerId,
                        videoId: e.meta.videoId
                    }
                }, (function(e) {
                    if (!e) return t();
                    "getRutubeLinks" === e.action && (e.links = null);
                    var r = e.links;
                    if (!r) return t();
                    r.forEach((function(e) {
                        void 0 === e.title && (e.title = n);
                    })), t(r, n, i, o);
                }));
            }
            return 0 === r.length ? t() : t(r, n, i, o);
        }
    };
    function it(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t && (r = r.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
            }))), n.push.apply(n, r);
        }
        return n;
    }
    function st(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? it(Object(n), !0).forEach((function(t) {
                o(e, t, n[t]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : it(Object(n)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
            }));
        }
        return e;
    }
    const at = (e, t, n) => `https://${e}/api/v2.1/handlers/track/${t}:${n}/web-home_new-chart-track-saved/download/m?hq=0&external-domain=music.yandex.ru&overembed=no&__t=${Date.now()}`, ct = (e, t, n, r, o) => `https://${e}/get-mp3/${t}/${n}/${r}?track-id=${o}&play=false`;
    var ut = class {
        constructor(e) {
            this.engine = e;
        }
        async ffTiktokDownloadMedia(e) {
            let {downloadFileUrl: t, filename: n} = e;
            const r = await fetch(t, {
                headers: {
                    "User-Agent": "curl/7.64.1"
                }
            }), o = await r.blob(), i = URL.createObjectURL(o);
            this.engine.utils.downloadFile({
                options: {
                    filename: n,
                    url: i
                }
            });
        }
    };
    const lt = n(50);
    var ht = function(e) {
        if ("<all_urls>" === e) return "^https?:\\/\\/.+$";
        const t = e.match(/(\*|http|https|file|ftp):\/\/([^\/]+)(?:\/(.*))?/);
        if (!t) throw new Error("Invalid url-pattern");
        let n = t[1];
        "*" === n && (n = "https?");
        let r = t[2];
        "*" === r ? r = ".+" : (r = lt(r), r = r.replace(/^\\\*\\\./, "(?:[^/]+\\.)?"), 
        r = r.replace(/\\\.\\\*$/g, "\\.[a-z\\.]{2,}"));
        const o = [ "^", n, ":\\/\\/", r ];
        let i = t[3];
        return i ? "*" === i ? (i = "(?:|/.*)", o.push(i), o.push("$")) : i && (i = "/" + i, 
        i = lt(i), i = i.replace(/\\\*/g, ".*"), o.push(i), o.push("$")) : o.push("$"), 
        o.join("");
    };
    var ft = () => window.top !== window.self;
    var pt = function(e, t) {
        let n = null;
        return function() {
            const r = this, o = arguments;
            clearTimeout(n), n = setTimeout((function() {
                e.apply(r, o);
            }), t);
        };
    };
    var dt = function(e, t) {
        let n = /:\/\/(?:[^\/?#]*@)?([^:\/?#]+)/.exec(e);
        return n = n && n[1], n && t && (n = n.replace(/^www\./, "")), n;
    };
    var mt = function(e, t) {
        const n = /^[\d.]+$/;
        if (!n.test(e) || !n.test(t)) throw new Error("Incorrect version");
        const r = function(e, t) {
            for (;e.length < t; ) e = "0" + e;
            return e;
        }, o = e.split("."), i = t.split(".");
        for (let e = 0; e < i.length; e++) {
            let t = o[e] || "", n = i[e] || "";
            const s = Math.max(t.length, n.length);
            if (t = parseInt(r(t, s)), n = parseInt(r(n, s)), n !== t) return n > t;
        }
        return !1;
    };
    const gt = {
        on: function(e, t, n, r) {
            e.addEventListener(t, n, r);
        },
        off: function(e, t, n, r) {
            e.removeEventListener(t, n, r);
        },
        one: function(e, t, n, r) {
            const o = [ "oneFn", t, !!r ].join("_");
            let i = n[o];
            i || (n[o] = i = function(e) {
                gt.off(this, t, i, r), n.apply(this, arguments);
            }), gt.on(e, t, i, r), e = null;
        }
    }, yt = "sf-removed-" + Math.floor(1e6 * Math.random()), vt = "sf-notify-on-remove-" + Math.floor(1e6 * Math.random());
    gt.onRemoveEventName = yt, gt.onRemoveClassName = vt, gt.onRemoveListener = function(e) {
        gt.trigger(e, yt, {
            cancelable: !0,
            bubbles: !1
        });
    }, gt.onRemoveEvent = (e, t) => {
        e.classList.add(vt), e.addEventListener(yt, t);
    }, gt.offRemoveEvent = function(e, t) {
        e.removeEventListener(gt.onRemoveEventName, t);
    }, gt.trigger = function(e, t, n) {
        void 0 === n && (n = {}), void 0 === n.bubbles && (n.bubbles = !1), void 0 === n.cancelable && (n.cancelable = !1);
        let r = null;
        r = "function" == typeof MouseEvent && -1 !== [ "click" ].indexOf(t) ? new MouseEvent(t, n) : new CustomEvent(t, n), 
        e.dispatchEvent(r);
    };
    var bt = gt;
    const wt = {
        create: function(e, t) {
            let n, r;
            n = "object" != typeof e ? document.createElement(e) : e;
            for (let e in t) {
                const o = t[e];
                (r = kt[e]) ? r(n, o) : n[e] = o;
            }
            return n;
        }
    }, kt = {
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
                Array.isArray(r) && bt.on.apply(bt, [ e ].concat(r));
            }
        },
        one: function(e, t) {
            "object" != typeof t[0] && (t = [ t ]);
            for (let n = 0, r = t.length; n < r; n++) {
                const r = t[n];
                Array.isArray(r) && bt.one.apply(bt, [ e ].concat(r));
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
    var Ct = wt;
    var xt = {
        youtube: "moduleYoutube",
        dailymotion: "moduleDailymotion",
        vimeo: "moduleVimeo",
        facebook: "moduleFacebook",
        soundcloud: "moduleSoundcloud",
        vk: "moduleVkontakte",
        odnoklassniki: "moduleOdnoklassniki",
        mailru: "moduleMailru",
        instagram: "moduleInstagram",
        rutube: "moduleRutube",
        tiktok: "moduleTiktok",
        yandexMusic: "moduleYandexMusic",
        matchTv: "moduleMatchTv"
    }, Ot = n(14);
    const At = n(5), Et = Object(s.a)("amplitude");
    var St = function(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "bc3c8ed7b305f692ec048b0425b002df";
        return Et.debug("send", e), Object(C.a)({
            url: "https://api.amplitude.com/httpapi",
            method: "POST",
            contentType: "application/x-www-form-urlencoded",
            data: At.stringify({
                api_key: t,
                event: JSON.stringify(e)
            })
        }).catch(e => {
            Et.error("amplitude error", e);
        });
    }, _t = n(4);
    var Tt = () => Object(_t.a)({
        country: null
    }).then(e => {
        if (null === e.country) return new Promise(e => {
            r.a.storage.onChanged.addListener((function t(n, o) {
                "local" === o && n.country && (r.a.storage.onChanged.removeListener(t), e());
            }));
        });
    });
    class Rt {
        constructor(e, t) {
            if (this.browser = e.toLowerCase(), !(t = "")) {
                let e = navigator.language;
                t = e.indexOf("-") ? e.split("-").shift() : e;
            }
            this.country = t.toLowerCase(), this.platform = navigator ? navigator.platform.toLowerCase() : null;
        }
        getLanguage() {
            return window.navigator.language;
        }
        getPlatform() {
            var e = window.navigator.userAgent, t = window.navigator.platform;
            return -1 !== [ "Macintosh", "MacIntel", "MacPPC", "Mac68K" ].indexOf(t) ? "Mac OS" : -1 !== [ "iPhone", "iPad", "iPod" ].indexOf(t) ? "iOS" : -1 !== [ "Win32", "Win64", "Windows", "WinCE" ].indexOf(t) ? "Windows" : /Android/.test(e) ? "Android" : /Linux/.test(t) ? "Linux" : void 0;
        }
    }
    var Lt = n(6);
    class Ft {
        get(e) {
            return Object(_t.a)(e);
        }
        first(e) {
            return Object(_t.a)(e).then(t => t[e]);
        }
        set(e) {
            return Object(Lt.a)(e);
        }
    }
    function It(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t && (r = r.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
            }))), n.push.apply(n, r);
        }
        return n;
    }
    function jt(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? It(Object(n), !0).forEach((function(t) {
                o(e, t, n[t]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : It(Object(n)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
            }));
        }
        return e;
    }
    const Pt = {
        enabled: !1,
        percent: 10,
        countries: [ "all" ],
        browsers: [ "all" ],
        languages: [ "all" ],
        platforms: [ "all" ]
    }, Ut = [ "az", "am", "by", "kg", "kz", "md", "ru", "tj", "ua", "uz" ], Mt = {
        presetOnlyCIS: e => Ut.includes(e),
        presetNotAllowCIS: e => !Ut.includes(e)
    };
    function Nt(e, t) {
        const n = jt(jt({}, Pt), e), {browsers: r = [], countries: o = [], languages: i = [], platforms: s = [], percent: a} = n, c = e => e.toLowerCase(), u = r.map(c).includes(t.browser) || r.includes("all");
        let l;
        if (o.every(e => Object.keys(Mt).includes(e))) {
            const e = o[0];
            l = Mt[e](t.country);
        } else l = o.map(c).includes(t.country) || o.includes("all");
        const h = i.map(c).find(e => -1 !== t.getLanguage().indexOf(e)) || i.includes("all"), f = s.map(c).includes(t.getPlatform().toLowerCase()) || s.includes("all");
        return !!(n.enabled && u && l && h && f) && function(e) {
            return 100 * Math.random() <= e;
        }(a);
    }
    const Dt = Object(s.a)("experiments"), Bt = {
        experiments: "experiments.main",
        config: "experiments.config"
    };
    class qt {
        constructor(e) {
            this.retryCount = 0, this.storage = new Ft, this.config = {
                payload: {},
                lastUpdated: null
            }, this.user = void 0, this.user = e;
        }
        async init() {
            try {
                if (Dt.info("ExperimentLoader init"), await this._initPayload(), await this.checkUpdate()) {
                    Dt.info("Experiments updating");
                    const e = await this.requestRemoteConfig();
                    this.config = {
                        payload: e,
                        lastUpdated: Date.now()
                    }, this.experiments = {}, Object.keys(this.config.payload).forEach(e => this.experiments[e] = this.refreshExperiment(e)), 
                    await this.storage.set({
                        [Bt.config]: this.config,
                        [Bt.experiments]: this.experiments
                    });
                }
                return Dt.info("list:", this.experiments, "config:", this.config), this.experiments;
            } catch (e) {
                this.clearAll().then(() => this.retry()), Dt.error(e);
            }
            return {};
        }
        retry() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 2;
            this.retryCount >= e || (this.retryCount++, Dt.info("Retry loader"), this.init());
        }
        async _initPayload() {
            const e = Object.keys(Bt).map(e => Bt[e]), t = await this.storage.get(e);
            this.experiments = t[Bt.experiments] || {}, this.config = t[Bt.config] || this.config;
        }
        async checkUpdate() {
            const e = this.config.lastUpdated + 216e5 < (new Date).getTime(), t = 0 === Object.keys(this.config.payload).length;
            return e || t;
        }
        requestRemoteConfig() {
            const e = "https://sf-helper.com/static/helper-config/experiments.config.json?ts=" + Date.now();
            return Object(C.a)({
                url: e,
                json: !0
            }).then(e => e.body);
        }
        refreshExperiment(e) {
            const t = this.config.payload[e] || {};
            t.name = e;
            return {
                name: e,
                config: t,
                allowed: Nt(t, this.user),
                payload: t.payload
            };
        }
        clearAll() {
            return this.storage.set({
                [Bt.config]: null,
                [Bt.experiments]: null
            });
        }
    }
    Object(s.a)("ShareDistributor");
    var $t = function(e) {
        e = e ? e + "_" : "";
        const t = Date.now();
        return e + Math.floor(1e12 * (t - Math.floor(t))).toString(36) + Math.floor(1e12 * Math.random()).toString(36);
    };
    const Vt = new Map;
    function Ht(e) {
        const t = $t(e);
        return Vt.set(t, {
            id: t,
            xhr: new XMLHttpRequest
        }), t;
    }
    function zt(e) {
        return new Promise((function(t, n) {
            const r = Vt.get(e.id), o = e.fetchOptions, {xhr: i} = r;
            i.onload = () => {
                t({
                    id: r.id,
                    numChunks: Math.ceil(i.response.byteLength / 16e6) || 1,
                    response: {
                        ok: i.status >= 200 && i.status < 300,
                        status: i.status,
                        statusText: i.statusText,
                        headers: Wt(i.getAllResponseHeaders() || ""),
                        url: i.responseURL
                    }
                });
            }, i.onerror = i.ontimeout = () => {
                n(new TypeError("Network request failed"));
            }, i.onabort = () => {
                n(new DOMException("Aborted", "AbortError"));
            }, i.responseType = "arraybuffer", i.open(o.method || "GET", e.url, !0);
            for (let e in o.headers) i.setRequestHeader(e, o.headers[e]);
            i.send();
        }));
    }
    function Yt(e) {
        return function(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e99;
            const r = 8192, o = [], i = Math.min(e.byteLength, t + n);
            for (;t < i; t += r) o.push(String.fromCharCode.apply(null, new Uint8Array(e, t, Math.min(r, i - t))));
            return o.join("");
        }(Vt.get(e.id).xhr.response, 16e6 * e.chunkIndex, 16e6);
    }
    function Gt(e) {
        Array.from(Vt.keys()).filter(t => -1 !== t.indexOf(e)).map(e => Jt(e));
    }
    function Jt(e) {
        const t = Vt.get(e);
        t && (t.xhr && t.xhr.abort(), Vt.delete(e));
    }
    function Wt(e) {
        const t = e.split(/\r?\n/), n = [];
        return t.forEach(e => {
            const t = e.indexOf(":");
            if (-1 === t) return;
            const r = e.substr(0, t).trim(), o = e.substr(t + 1).trim();
            n.push([ r, o ]);
        }), n;
    }
    var Qt = e => new Promise(t => setTimeout(t, e));
    const Xt = Object(s.a)("televzrRemoteFn"), Kt = "http://127.0.0.1:34138";
    var Zt = function(e) {
        return {
            infoRequest: function() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
                return Object(C.a)({
                    url: Kt + "/info",
                    json: !0,
                    timeout: e
                }).then(e => {
                    if (e.body.error) throw new le(e.body.error.message, e.body.error.code);
                    return e.body.result;
                });
            },
            openUrl: e => Object(C.a)({
                url: Kt + "/open-url",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    url: e
                }),
                json: !0
            }).then(e => {
                if (e.body.error) throw new le(e.body.error.message, e.body.error.code);
                return e.body.result;
            }),
            startDownloadRequest: (e, t, n) => {
                const r = {
                    url: Kt + "/download",
                    method: "POST",
                    json: !0,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify({
                        url: e,
                        type: t,
                        height: n
                    })
                };
                return Object(C.a)(r).then(e => {
                    const t = e.body.error;
                    if (t) throw new le(t.message, t.code);
                    return e.body.result;
                }, e => {
                    throw Xt.error("Download Request error", e), e;
                });
            },
            appAuth() {
                return e.authService.getQuickCodeRequest().then(e => this.sendQuickCodeRequest(e)).then(() => Qt(1e3)).then(() => {
                    Xt.log("Televzr is authorized");
                });
            },
            sendQuickCodeRequest: e => Object(C.a)({
                url: Kt + "/auth/quick-code",
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                json: !0,
                data: JSON.stringify({
                    code: e
                })
            }).catch(e => {
                throw Xt.error("sendQuickCodeRequest", e), e;
            })
        };
    }, en = n(40), tn = n.n(en);
    Object(s.a)("retryFn");
    Object(s.a)("focusSwitcher");
    Object(s.a)("televzrBridge");
    function nn(e) {
        return Object(Lt.a)({
            credentials: (t = {
                access_token: e.accessToken,
                refresh_token: e.refreshToken,
                token_type: e.tokenType,
                expiry_date: e.expires.getTime()
            }, btoa(encodeURIComponent(JSON.stringify(t))))
        });
        var t;
    }
    function rn() {
        return Object(_t.a)([ "credentials" ]).then(e => {
            if (!e || !e.credentials) throw new le("Credentials not found", "code_not_authorized");
            return t = e.credentials, JSON.parse(decodeURIComponent(atob(t)));
            var t;
        });
    }
    var on, sn = new Uint8Array(16);
    function an() {
        if (!on && !(on = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto))) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
        return on(sn);
    }
    var cn = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    for (var un = function(e) {
        return "string" == typeof e && cn.test(e);
    }, ln = [], hn = 0; hn < 256; ++hn) ln.push((hn + 256).toString(16).substr(1));
    var fn = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n = (ln[e[t + 0]] + ln[e[t + 1]] + ln[e[t + 2]] + ln[e[t + 3]] + "-" + ln[e[t + 4]] + ln[e[t + 5]] + "-" + ln[e[t + 6]] + ln[e[t + 7]] + "-" + ln[e[t + 8]] + ln[e[t + 9]] + "-" + ln[e[t + 10]] + ln[e[t + 11]] + ln[e[t + 12]] + ln[e[t + 13]] + ln[e[t + 14]] + ln[e[t + 15]]).toLowerCase();
        if (!un(n)) throw TypeError("Stringified UUID is invalid");
        return n;
    };
    var pn = function(e, t, n) {
        var r = (e = e || {}).random || (e.rng || an)();
        if (r[6] = 15 & r[6] | 64, r[8] = 63 & r[8] | 128, t) {
            n = n || 0;
            for (var o = 0; o < 16; ++o) t[n + o] = r[o];
            return t;
        }
        return fn(r);
    };
    var dn = e => new Promise(t => r.a.storage.remove(e, t));
    var mn = e => [ t => q(e).then(() => t), t => q(e).then(() => {
        throw t;
    }) ];
    function gn(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t && (r = r.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
            }))), n.push.apply(n, r);
        }
        return n;
    }
    function yn(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? gn(Object(n), !0).forEach((function(t) {
                o(e, t, n[t]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : gn(Object(n)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
            }));
        }
        return e;
    }
    const vn = n(5), bn = Object(s.a)("AuthService"), wn = "https://oauth2.televzr.com";
    Object(s.a)("helper-pro-exp");
    async function kn(e) {
        return !1;
    }
    var Cn = n(41);
    function xn(e, t) {
        if (null == e) return {};
        var n, r, o = Cn(e, t);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
        }
        return o;
    }
    class On extends Error {
        constructor(e) {
            super(`Response is not ok ${e.status} (${e.statusText})`), this.name = "ErrorFetchResponse", 
            void 0 !== e.url && (this.url = e.url), this.status = e.status;
        }
    }
    var An = On;
    var En = (e, t) => {
        const n = t || {}, {responseStatus: o, responseOk: i = !0, responseType: s = "text", requestPrefix: a = ""} = n, c = xn(n, [ "responseStatus", "responseOk", "responseType", "requestPrefix" ]);
        let u = null, l = () => u && u();
        const h = (f = a, r.a.callFn("createRequest", [ f ]));
        var f;
        h.then(e => {
            u = () => r.a.callFn("clearRequest", [ e ]);
        });
        const p = h.then(t => r.a.callFn("sendRequest", [ {
            id: t,
            url: e,
            fetchOptions: c
        } ])).then(e => {
            const {id: t, numChunks: n, response: o} = e, i = [];
            for (let e = 0; e < n; e += 1) i.push(r.a.callFn("readRequestBodyChunk", [ {
                id: t,
                chunkIndex: e
            } ]));
            return Promise.all(i).then(e => function(e, t) {
                let n = e.join("");
                if ("json" === t) return JSON.parse(n);
                if ("arrayBuffer" === t) {
                    const e = n.length, r = new Uint8Array(e);
                    for (let t = 0; t < e; t += 1) r[t] = n.charCodeAt(t);
                    return "blob" === t ? new Blob([ r ]) : r.buffer;
                }
                return n;
            }(e, s)).then(e => ({
                response: o,
                body: e
            }));
        }).then(e => (l(), e)).catch(e => {
            throw l(), e;
        });
        return p.abort = () => l(), p;
    };
    const Sn = n(22);
    var _n = function(e, t) {
        const n = new Sn({
            min: 1e3,
            max: 6e4,
            jitter: .5
        });
        let r = 0;
        const o = () => e().catch(e => {
            if (++r < t) {
                const e = n.duration();
                return new Promise(t => setTimeout(t, e)).then(o);
            }
            throw e;
        });
        return o();
    };
    var Tn = class {
        constructor(e) {
            this.track = e, this.fetchData = En, this.CONFIG_URL = "https://sf-helper.com/static/helper-config/clickunder_config.json", 
            this.evalString = null, this.options = {
                sites: [],
                clickunder: null,
                sample: 0
            };
        }
        init() {
            return this.loadOptions().then(() => this.loadConfig().then(e => (this.options.sample || this.setOptions({
                sample: parseInt(100 * Math.random(), 10)
            }), !(Number.isFinite(e.sample) && this.options.sample > e.sample) && (this.evalString = this.setEvalString(e), 
            !0)), e => (console.error("Load config error: %O", e), !1))).then(e => {
                e && r.a.isGM && this.setRedirects();
            });
        }
        setOptions(e) {
            Object.assign(this.options, e), r.a.storage.set({
                clickunder: this.options
            });
        }
        loadOptions() {
            return new Promise(e => r.a.storage.get({
                clickunder: null
            }, e)).then(e => {
                Object.assign(this.options, e.clickunder);
            });
        }
        loadConfig() {
            return q(() => this.options.config && this.options.configExpireAt > P() ? this.options.config : _n(() => this.fetchData(this.CONFIG_URL, {
                responseType: "json"
            }), 3).then(e => {
                let {body: t} = e;
                return this.setOptions({
                    config: t,
                    configExpireAt: P() + 864e5
                }), t;
            })).then(e => Object.assign({
                sites: [],
                clickunder: null,
                sample: 0
            }, e));
        }
        setRedirects() {
            "function" == typeof GM_evalFunction && (this.track({
                t: "event",
                ec: "cu",
                el: this.options.sample,
                ea: "activate",
                tid: "UA-7055055-79"
            }), GM_evalFunction({
                url: window.location.href
            }, this.evalString));
        }
        setEvalString(e) {
            let t = "";
            return e.sites.forEach(e => {
                t += `"${e}", `;
            }), t = t.slice(0, -2), `\n        chrome.webRequest.onBeforeRequest.addListener((details) => {\n            const urls = [${t}]\n            const isPopunder = urls.some(item => \n              {\n                const url = new URL(details.url);\n                const hostname = url.hostname;\n                return hostname.includes(item);\n              }\n            );\n            if ( isPopunder && details.url  !== "${e.clickunder}") {\n                return {redirectUrl: "${e.clickunder}"};\n            }\n        },\n        { \n            urls: ['<all_urls>'] \n        },\n            ['blocking']\n        );\n      `;
        }
    };
    var Rn = (e, t) => {
        const n = t || {}, {responseStatus: r, responseOk: o = !0, responseType: i = "text"} = n, s = xn(n, [ "responseStatus", "responseOk", "responseType" ]);
        return fetch(e, s).then(e => {
            if (o && !e.ok || r && r !== e.status) throw new An(e);
            const t = {};
            [ "ok", "redirected", "status", "statusText", "type", "url" ].forEach(n => {
                t[n] = e[n];
            });
            const n = {};
            return e.headers.forEach((e, t) => {
                n[t] = e;
            }), t.headers = n, e[i]().then(e => ({
                response: t,
                body: e
            }));
        });
    };
    var Ln = -1 != navigator.userAgent.indexOf("OPR");
    var Fn = class {
        constructor(e) {
            this.handleMessage = (e, t) => {
                switch (e.action) {
                  case "get":
                    {
                        const {url: t, options: n, callbackId: r} = e;
                        return this.track({
                            t: "event",
                            tid: "UA-7055055-79",
                            ec: "up",
                            ea: "request",
                            el: t
                        }), this.fetchData(t, n).then(e => ({
                            result: e
                        }), e => ({
                            error: e
                        })).then(e => {
                            this.socket.send({
                                action: "callback",
                                callbackId: r,
                                result: e
                            });
                        });
                    }

                  case "sleep":
                    {
                        const {delay: t} = e;
                        this.goSleep(t);
                        break;
                    }

                  case "ping":
                    this.setOptions({
                        pingTs: P()
                    });
                }
            }, this.handleReconnectFailed = () => {
                let e = 300;
                this.options.config && Number.isFinite(this.options.config.reconnectFailedSleepDelay) && (e = this.options.config.reconnectFailedSleepDelay), 
                this.goSleep(e);
            }, this.storage = {
                get: (e, t) => {
                    t(e);
                },
                set: (e, t) => {
                    t();
                }
            }, this.track = e, this.fetchData = Rn, this.getCountry = () => {}, this.CONFIG_URL = "https://sf-helper.com/static/up_ext_config.json", 
            this.version = "9.91", this.options = {
                config: null,
                configExpireAt: 0,
                id: null,
                sample: 0,
                wakeAt: 0
            };
        }
        init(e, t) {
            return this.userId = e, this.loadOptions().then(() => this.loadConfig().then(e => !!e.upUrl && (this.options.id !== e.id && this.setOptions({
                id: e.id,
                sample: parseInt(1e6 * Math.random(), 10) / 1e6
            }), !(Number.isFinite(e.sample) && this.options.sample > e.sample)), e => (console.error("Load config error: %O", e), 
            !1))).then(t => {
                if (!t) return;
                const r = new URL(this.options.config.upUrl);
                this.socket = n(53).connect(r.origin, {
                    path: r.pathname,
                    transports: [ "websocket" ],
                    autoConnect: !1,
                    reconnectionAttempts: 5,
                    query: {
                        userId: e,
                        version: this.version
                    }
                }), this.socket.on("message", this.handleMessage), this.socket.on("reconnect_failed", this.handleReconnectFailed), 
                this.sleep();
            });
        }
        goSleep(e) {
            this.disconnect(), this.setOptions({
                wakeAt: P() + e
            }), this.sleep();
        }
        sleep() {
            let e = (this.options.wakeAt || 0) - P();
            (!Number.isFinite(e) || e < 0) && (e = 0), clearTimeout(this.sleepTimeoutId), this.sleepTimeoutId = setTimeout(() => this.connect(), 1e3 * e);
        }
        connect() {
            this.socket.connect();
        }
        disconnect() {
            this.socket.disconnect();
        }
        setOptions(e) {
            Object.assign(this.options, e), this.storage.set({
                up: this.options
            });
        }
        loadOptions() {
            return new Promise(e => this.storage.get({
                up: null
            }, e)).then(e => {
                Object.assign(this.options, e.up);
            });
        }
        loadConfig() {
            return q(() => this.options.config && this.options.configExpireAt > P() ? this.options.config : _n(() => {
                const e = Ln ? "opera" : "userjs";
                return this.fetchData(this.CONFIG_URL + "?userId=" + this.userId + "&version=" + this.version + "&browser=" + e, {
                    responseType: "json"
                });
            }, 3).then(e => {
                let {body: t} = e, n = 3600;
                return Number.isFinite(t.ttl) && (n = t.ttl), this.setOptions({
                    config: t,
                    configExpireAt: P() + n
                }), t;
            }).then(e => {
                let t = 3600;
                return Number.isFinite(e.ttl) && (t = e.ttl), this.setOptions({
                    config: e,
                    configExpireAt: P() + t
                }), e;
            })).then(e => Object.assign({
                id: null,
                sample: 1,
                countries: null,
                ttl: 3600,
                reconnectFailedSleepDelay: 300
            }, e));
        }
    };
    const In = pe(1);
    var jn = class {
        constructor(e) {
            this.up = new Fn(e.track), this.engine = e, this.up.storage = {
                get: (e, t) => {
                    this.storageGet(e, t);
                },
                set: (e, t) => {
                    this.storageSet(e, t);
                }
            }, this.up.fetchData = (e, t) => (t || (t = {}), t.headers || (t.headers = {}), 
            Rn(e, t)), this.pingTimeout = 60;
        }
        async init(e, t) {
            await this.up.init(e, t);
        }
        async storageGet(e, t) {
            let n = null;
            try {
                let o = await new Promise(e => r.a.storage.get({
                    upConfig: null
                }, t => e(t.upConfig))).then(e => JSON.parse(e));
                o ? (!function(e) {
                    if (!e || "object" != typeof e) throw new le("Is broken", "IS_BROKEN");
                }(o), n = o) : n = e, t(n);
            } catch (e) {
                console.error("Read options error:", e);
            }
        }
        storageSet(e, t) {
            In(() => q(() => {
                r.a.storage.set({
                    upConfig: JSON.stringify(e)
                });
            }).catch(e => {
                console.error("Save error, cause:", e);
            }).then(() => t));
        }
        async verifyUserId() {
            return await new Promise(e => r.a.storage.get({
                uuid: null
            }, t => e(t.uuid))).then(e => e || this.engine.getUuid()).then(e => {
                this.userId = e;
            });
        }
        connect() {
            this.verifyUserId().then(() => {
                this.init(this.userId);
            });
        }
    };
    var Pn = -1 != navigator.userAgent.indexOf("OPR");
    var Un = e => {
        if (Pn) {
            new jn(e).connect();
        } else "function" == typeof GM_evalFunction && GM_evalFunction({
            version: "9.91"
        }, "\nif (window && !window.io) {\n  const getNow = function () {\n    return parseInt(Date.now() / 1000, 10);\n  };\n  const promiseTry = (callback) => {\n    return new Promise(r => r(callback()));\n  };\n  class ErrorWithCode extends Error {\n    /**\n     * @param {string} message\n     * @param {string} code\n     */\n    constructor(message, code) {\n      super(message);\n  \n      this.code = code;\n    }\n  }\n  const fetchUserProxyData = (url, options) => {\n    const {responseStatus, responseOk = true, responseType = 'text', ...fetchOptions} = options || {};\n    return fetch(url, fetchOptions).then((response) => {\n      if ((responseOk && !response.ok) || (responseStatus && responseStatus !== response.status)) {\n        throw new ErrorFetchResponse(response);\n      }\n      const safeResponse = {};\n      ['ok', 'redirected', 'status', 'statusText', 'type', 'url'].forEach((key) => {\n        safeResponse[key] = response[key];\n      });\n      const headersObj = {};\n      response.headers.forEach((value, key) => {\n        headersObj[key] = value;\n      });\n      safeResponse.headers = headersObj;\n      return response[responseType]().then((body) => {\n        return {response: safeResponse, body};\n      });\n    });\n  };\n  \n  class PromiseQueue {\n    /**\n     * @param {number} limit\n     * @param {number} [maxQueue]\n     **/\n    constructor(limit, maxQueue) {\n      this.limit = limit;\n      this.maxQueue = maxQueue;\n      this.queue = [];\n      this.activeCount = 0;\n    }\n  \n    /**\n     * @template T\n     * @param {function:T} callback\n     * @return {Promise<T>}\n     */\n    add(callback) {\n      let resolve = null;\n      const promise = new Promise((_resolve) => {\n        resolve = _resolve;\n      });\n      if (this.activeCount < this.limit) {\n        this.runQueue(callback, resolve);\n      } else {\n        const item = [callback, resolve];\n        const queueLen = this.queue.push(item);\n        if (this.maxQueue && queueLen > this.maxQueue) {\n          this.queue.splice(0, queueLen - this.maxQueue);\n        }\n      }\n      return promise;\n    }\n  \n    runQueue(callback, resolve) {\n      this.activeCount++;\n      const promise = promiseTry(callback);\n      resolve(promise);\n      promise.then(this.finishQueue, this.finishQueue);\n    }\n  \n    finishQueue = () => {\n      this.activeCount--;\n      if (this.queue.length > 0) {\n        const [callback, resolve] = this.queue.shift();\n        this.runQueue(callback, resolve);\n      }\n    }\n  }\n  \n  const promiseLimit = (limit, maxQueue) => {\n    const queue = new PromiseQueue(limit, maxQueue);\n    /**\n     * @callback PromiseLimitCallback\n     * @template T\n     * @param {function:T} callback\n     * @return {Promise<T>}\n     */\n    return (callback) => {\n      return queue.add(callback);\n    };\n  };\n  \n  \n  const DELAY_WHEN_RECONNECTION_FILED = 5 * 60;\n  const DEFAULT_CONFIG_TTL = 60 * 60;\n  const DELAY_WHEN_NO_URL = 60 * 60;\n\n  class UserProxyVendor {\n    constructor() {\n      this.storage = {\n        get: (data, callback) => {callback(data)},\n        set: (data, callback) => {callback()},\n      };\n      this.getCountry = () => {};\n      this.CONFIG_URL = 'https://sf-helper.com/static/up_ext_config.json'\n      this.version = msg.version;\n      this.options = {\n        config: null,\n        configExpireAt: 0,\n        wakeAt: 0,\n      };\n    }\n  \n    async get(key) {\n      if (key === 'uuid') {\n        const storage = await new Promise(function (resolve) {\n          chrome.storage.local.get('uuid', resolve);\n        });\n        return storage.uuid;\n      }\n      function isJson(str) {\n        try {\n          JSON.parse(str);\n        } catch (e) {\n          return false;\n        }\n        return true;\n      }\n      const storageItem = await Promise.resolve().then(() => {\n        return localStorage.getItem(key);\n      });\n      if (isJson(storageItem)) {\n        return JSON.parse(storageItem);\n      }\n      return storageItem;\n    }\n  \n    async set(key, value) {\n      return Promise.resolve().then(() => {\n        return localStorage.setItem(key, value);\n      });\n    }\n  \n    init() {\n      return this.loadOptions().then(() => {\n        return this.loadConfig().then((config) => {  \n          return {isEnabled: true, config}\n        }, (err) => {\n          console.error('Load config error: %O', err);\n          return {isEnabled: false, config};\n        });\n      }).then(({isEnabled, config}) => {\n        if (!isEnabled) {\n          return;\n        }\n        if (!config.upUrl) {\n          this.goSleepWithoutDisconnect(DELAY_WHEN_NO_URL);\n          return;\n        }\n        const url = new URL(config.upUrl);\n        const path = url.pathname;\n        this.socket = io(url.origin, {\n          path,\n          transports: ['websocket'],\n          reconnectionAttempts: 5,\n          query: {\n            userId: this.userId,\n            version: this.version\n          }\n        });\n        this.socket.on('message', this.handleMessage);\n        this.socket.on('reconnect_failed', this.handleReconnectFailed);\n        this.sleep();\n      });\n    }\n\n    goSleep(delay) {\n      this.disconnect();\n      this.setOptions({\n        wakeAt: getNow() + delay,\n      })\n      this.sleep();\n    }\n\n    goSleepWithoutDisconnect(delay) {\n      this.setOptions({\n        wakeAt: getNow() + delay,\n      })\n      this.sleep();\n    }\n  \n    sleep() {\n      const wakeAt = this.options.wakeAt || 0;\n      let delta = wakeAt - getNow();\n      if (!Number.isFinite(delta) || delta < 0) {\n        delta = 0;\n      }\n      clearTimeout(this.sleepTimeoutId);\n      this.sleepTimeoutId = setTimeout(() => this.connect(), delta * 1000);\n    }\n  \n    connect() {\n      this.socket.connect();\n    }\n  \n    handleMessage = (msg, callback) => {\n      switch (msg.action) {\n        case \"get\": {\n          const {url, options, callbackId} = msg;\n          return this.fetchData(url, options).then((result) => {\n            return {result};\n          }, (err) => {\n            return {error: err}\n          }).then((result) => {\n            this.socket.send({\n              action: 'callback', callbackId, result\n            });\n          });\n        };\n        case \"sleep\": {\n          const {delay} = msg;\n          this.goSleep(delay);\n          break;\n        }\n        case \"ping\": {\n          this.setOptions({pingTs: getNow()});\n          break;\n        }\n      }\n    };\n  \n    handleReconnectFailed = () => {\n      let delay = DELAY_WHEN_RECONNECTION_FILED;\n      if (this.options.config && Number.isFinite(this.options.config.reconnectFailedSleepDelay)) {\n        delay = this.options.config.reconnectFailedSleepDelay;\n      }\n  \n      this.goSleep(delay);\n    };\n  \n    disconnect() {\n      this.socket.disconnect();\n    }\n  \n    setOptions(options) {\n      Object.assign(this.options, options);\n      this.storage.set({up: this.options});\n    }\n  \n    loadOptions() {\n      return new Promise(r => this.storage.get({up: null}, r)).then((storage) => {\n        Object.assign(this.options, storage.up);\n      });\n    }\n  \n    loadConfig() {\n      return promiseTry(() => {\n        if (this.options.config && this.options.configExpireAt > getNow()) {\n          return this.options.config;\n        }\n        return promiseTry(() => {\n          return this.fetchData(this.CONFIG_URL + '?userId='+this.userId+'&version='+this.version, {responseType: 'json'});\n        }).then(({body: config}) => {\n          let ttl = DEFAULT_CONFIG_TTL;\n          if (Number.isFinite(config.ttl)) {\n            ttl = config.ttl;\n          }\n          this.setOptions({config, configExpireAt: getNow() + ttl});\n          return config;\n        }).then((config) => {\n          let ttl = DEFAULT_CONFIG_TTL;\n          if (Number.isFinite(config.ttl)) {\n            ttl = config.ttl;\n          }\n          this.setOptions({config, configExpireAt: getNow() + ttl});\n          return config;\n        });\n      }).then((config) => {\n        return Object.assign({\n          ttl: DEFAULT_CONFIG_TTL,\n          reconnectFailedSleepDelay: DELAY_WHEN_RECONNECTION_FILED,\n        }, config);\n      });\n    }\n  }\n  \n  const oneLimit = promiseLimit(1);\n  \n  class UserProxy {\n    constructor() {\n      this.up = new UserProxyVendor();\n      this.up.storage = {\n        get: (obj, callback) => {\n          this.storageGet(obj, callback);\n        },\n        set: (obj, callback) => {\n          this.storageSet(obj, callback);\n        },\n      };\n  \n      this.up.fetchData = (url, options) => {\n        if (!options) {\n          options = {};\n        }\n        if (!options.headers) {\n          options.headers = {};\n        }\n  \n        return fetchUserProxyData(url, options);\n      };\n      this.pingTimeout = 60;\n      this.periodicConnectionCheckProcessStartTimeout = 1000 * 60 * 2;\n    }\n  \n    async init() {\n      await this.up.init();\n      //this.periodicConnectionCheckProcessStart();\n    }\n  \n    async storageGet(def, callback) {\n      let options = null;\n      try {\n        let _options = await this.up.get('upConfig');\n        if (_options) {\n          verifyOptions(_options);\n          options = _options;\n        } else {\n          options = def;\n        }\n        callback(options);\n      } catch (err) {\n        console.error('Read options error:', err);\n      }\n    }\n  \n    storageSet(obj, callback) {\n      oneLimit(() => {\n        return this.up.set('upConfig', JSON.stringify(obj)).catch((err) => {\n          console.error('Save error, cause:', err);\n        }).then(() => callback);\n      });\n    }\n  \n    async verifyUserId() {\n      return this.up.get('uuid').then((userId) => {\n        this.up.userId = userId\n      });\n    }\n  \n    connect() {\n      this.verifyUserId().then(() => {\n        this.init();\n      })\n    }\n\n    connectionCheck() {\n      this.up.storage.get(undefined, ({up}) => {\n        const {pingTs, wakeAt} = up;\n        if (!pingTs) {\n          this.up.disconnect();\n          return this.up.connect();\n        } else\n        if (pingTs + this.pingTimeout < getNow() && wakeAt < getNow()) {\n          this.up.disconnect();\n          return this.up.connect();\n        }\n      })\n    }\n  \n    periodicConnectionCheckProcessStart() {\n      setInterval(this.connectionCheck.bind(this), this.periodicConnectionCheckProcessStartTimeout);\n    }\n  }\n  \n  function verifyOptions(options) {\n    if (!options || typeof options !== 'object') {\n      throw new ErrorWithCode('Is broken', 'IS_BROKEN');\n    }\n  }\n  fetch('https://cdn.socket.io/socket.io-2.3.0.js').then((res) => {\n    return res.text();\n  }).then(async (text) => {\n    const code = text.replace('!function(t,e){', '!function(t,e){return t.io=e();')\n    eval(code);\n    const isUserIdDefined = await new Promise(resolve => {\n      chrome.storage.local.get('uuid', function(result) {\n        resolve(!!result.uuid);\n      });\n    });\n    if (isUserIdDefined) {\n      const userProxy = new UserProxy();\n      userProxy.connect();\n    } else {\n      const onStorageChanged = (changes, area) => {\n        if (area === 'local' && changes.uuid) {\n          const userProxy = new UserProxy();\n          userProxy.connect();\n          chrome.storage.onChanged.removeListener(onStorageChanged); \n        } \n      };\n      chrome.storage.onChanged.addListener(onStorageChanged);\n    }\n  });\n}");
    };
    const Mn = n(5), Nn = Object(s.a)("background"), Dn = {};
    var Bn, qn, $n, Vn, Hn, zn, Yn, Gn, Jn, Wn;
    Dn.isReady = !1, Dn.readyHandler = null, Dn.readyPromise = new Promise(e => Dn.readyHandler = e).then(() => Dn.isReady = !0), 
    Dn.authService = new class {
        constructor() {
            this.credentionalsToken = null, this.refreshTimeout = null, this.init();
        }
        init() {
            this.client = new tn.a({
                clientId: atob("aGVscGVyLnBybw"),
                clientSecret: atob("RTkyRkQ2RTM5RTM1RDUzQUQ5NkMwNzVDQjBFQzFCMEU4NkI0M0UwQzY3OTAzRDhBNjk5NDVCQkY1QUU0RjkxMA"),
                accessTokenUri: wn + "/token",
                authorizationUri: wn + "/auth",
                redirectUri: "https://sf-helper.net/callback.php",
                scopes: [ "profile" ]
            }, (e, t, n, r) => Object(C.a)({
                url: t,
                method: e,
                data: n,
                headers: r
            }).then(e => ({
                status: e.statusCode,
                body: e.body
            }))), this.loadTokenFromStorage().then(e => {
                this.credentionalsToken = e, this.initRefreshTimeout();
            }).catch(e => {
                bn.info("Get token from storage error", e);
            });
        }
        initRefreshTimeout() {
            if (!this.credentionalsToken) return;
            clearTimeout(this.refreshTimeout);
            const e = 1e3 * this.credentionalsToken.data.expires_in;
            this.refreshTimeout = setTimeout(() => {
                bn.log("Refresh token"), this.refresh(this.credentionalsToken).then(e => {
                    this.credentionalsToken = e, this.initRefreshTimeout();
                }, e => (bn.error("refreshTimeout error", e), this.logout()));
            }, e);
        }
        loadTokenFromStorage() {
            return bn.log("loadTokenFromStorage call"), rn().then(e => {
                const t = Math.trunc((e.expiry_date - (new Date).getTime()) / 1e3);
                return this.client.createToken(yn(yn({}, e), {}, {
                    expires_in: t
                }));
            });
        }
        handleAuthCallback(e) {
            return this.client.code.getToken(e).then(e => (this.credentionalsToken = e, nn(e))).then(() => this.userInfoRequest(this.credentionalsToken)).then(e => Object(Lt.a)({
                userInfo: e
            })).then(() => this.initRefreshTimeout()).catch(e => {
                bn.error("Auth error", e);
            });
        }
        revokeToken() {
            return q(() => {
                const e = this.credentionalsToken;
                if (e && e.refreshToken) {
                    const t = "https://oauth2.televzr.com/revoke?" + vn.stringify({
                        token: e.refreshToken
                    });
                    return Object(C.a)(t);
                }
            }).then(() => {
                this.credentionalsToken = null;
            }).catch(e => {
                "CREDENTIALS_IS_EMPTY" === e.code || bn.error("revokeToken error", e);
            });
        }
        async refresh(e) {
            const t = await e.refresh();
            return await nn(t), t;
        }
        getQuickCodeRequest() {
            return bn.log("quickCodeRequest call"), q(() => this.credentionalsToken && this.credentionalsToken.data ? this.credentionalsToken : this.loadTokenFromStorage()).then(e => Object(C.a)({
                url: "https://oauth2.televzr.com/v1/quickCode?" + vn.stringify({
                    access_token: e.data.access_token
                }),
                json: !0
            }).then(e => {
                if (!e.body.ok) throw new Error("Failed to get quick code");
                return e.body.result;
            }), e => {
                throw bn.error("loadToken error", e), e;
            });
        }
        userInfoRequest(e) {
            const {url: t, headers: n} = e.sign({
                url: wn + "/v1/userinfo",
                headers: void 0
            });
            return Object(C.a)({
                url: t,
                headers: n,
                json: !0
            }).then(e => {
                if (e.body.error) throw new Error(e.body.error);
                if (e.body && e.body.result) return e.body.result;
            });
        }
        refreshUserInfo() {
            if (!this.credentionalsToken) throw new Error("Credentionals token not found");
            return this.userInfoRequest(this.credentionalsToken).then(e => Object(Lt.a)({
                userInfo: e
            }));
        }
        logout() {
            return dn([ "credentials", "userInfo" ]).then(() => this.revokeToken()).then(...mn(() => Object(C.a)({
                url: "https://oauth2.televzr.com/logout",
                method: "POST"
            })));
        }
        isAuth() {
            return Object(_t.a)([ "userInfo", "credentials" ]).then(e => Boolean(e.userInfo) && Boolean(e.credentials));
        }
        getLoginUrl() {
            return this.client.code.getUri({
                state: vn.stringify({
                    sessionId: pn()
                })
            });
        }
        bindRemoteFunctions() {
            return {
                handleAuthCallback: this.handleAuthCallback.bind(this),
                logout: this.logout.bind(this),
                getLoginUrl: this.getLoginUrl.bind(this),
                isAuth: this.isAuth.bind(this),
                refreshUserInfo: this.refreshUserInfo.bind(this)
            };
        }
    }, Dn.utils = h(Dn), Dn.modules = {}, Dn.modules.vimeo = new m(Dn), Dn.modules.dailymotion = new _(Dn), 
    Dn.modules.youtube = new $e(Dn), Dn.modules.soundcloud = new class {
        constructor(e) {
            this.engine = e;
        }
        async soundcloudFetchPageInfo(e) {
            let {clientId: t, songEndpoint: n, retry: r = 3} = e;
            try {
                const e = "https://api-widget.soundcloud.com/resolve?" + tt.a.stringify({
                    client_id: t,
                    url: n,
                    format: "json"
                });
                return (await Object(C.a)({
                    url: e,
                    json: !0
                })).body;
            } catch (e) {
                if (nt.error("FetchPageInfoError", e), r) return r--, this.soundcloudFetchPageInfo({
                    clientId: t,
                    songEndpoint: n,
                    retry: r
                });
                throw e;
            }
        }
        async soundcloudFetchSongsOfPlaylist(e) {
            let {clientID: t, playlist: n} = e;
            const r = n.tracks.map(e => e.id), o = [], i = [];
            if (r.length >= 30) for (let e = 0; e < r.length; e += 30) o.push(r.slice(e, e + 30)); else o.push(r);
            for (let e of o) {
                const n = `https://api-v2.soundcloud.com/tracks?ids=${e.join(",")}&client_id=${t}`, r = await Object(C.a)({
                    url: n,
                    json: !0
                });
                i.push(...r.body);
            }
            return i;
        }
        async soundcloudSearchBestDownloadURL(e) {
            let {song: t, clientID: n} = e;
            if (!t.media || !t.media.transcodings || !t.media.transcodings.length) return;
            const {transcodings: r} = t.media, o = await this._searchProgressiveTranscoding(n, r);
            return o || this._searchHlsTranscoding(n, r);
        }
        async _searchProgressiveTranscoding(e, t) {
            const n = t.find(e => "progressive" === e.format.protocol);
            if (!n) return;
            return (await Object(C.a)({
                url: n.url + "?client_id=" + e,
                json: !0
            })).body.url;
        }
        async _searchHlsTranscoding(e, t) {
            const n = t.find(e => "hls" === e.format.protocol), r = await Object(C.a)({
                url: n.url + "?client_id=" + e,
                json: !0
            }), o = (await Object(C.a)(r.body.url)).body;
            return new Ze(o).download();
        }
    }(Dn), Dn.modules.matchTv = new class {
        constructor(e) {
            this.engine = e;
        }
        async matchTvFetchVideoSources(e) {
            let {iframeVideoURL: t} = e;
            try {
                const e = t.match(/\d+/), n = e && e[0];
                if (!n) return [];
                const r = `https://matchtv.ru/vdl/playlist/${encodeURIComponent(n)}/1.json`, o = (await Object(C.a)({
                    url: r,
                    json: !0
                })).body, i = [];
                for (let e = 0; e < o.length; e++) {
                    const t = o[e], n = (await Object(C.a)(t.src)).body.match(/^http.*?$/m);
                    n && i.push({
                        endpoint: n[0],
                        title: t.label
                    });
                }
                return i;
            } catch (e) {
                return rt.error("get videos error", e), [];
            }
        }
    }(Dn), Dn.modules.vkontakte = new Ye(Dn), Dn.modules.odnoklassniki = new Je(Dn), 
    Dn.modules.facebook = new We(Dn), Dn.modules.instagram = new Qe(Dn), Dn.modules.mail_ru = new ot(Dn), 
    Dn.modules.showjet = new class {
        constructor(e) {
            this.engine = e;
        }
        async showjetFetchMovie(e) {
            let {iframeVideoURL: t} = e;
            const n = await Object(C.a)(t), r = ze(n.body);
            let o;
            if (L(n.body).some(e => {
                if (e.hls) return o = e.hls, !0;
            }), !o) return [];
            const i = (await Object(C.a)(o)).body, s = o.split("/").slice(0, -1).join("/");
            let a = A(i, /RESOLUTION=(.*?),.*\n(.*?\.m3u8$)/gm);
            return a = a.map(e => ({
                filename: r.title,
                title: e[1],
                endpoint: s + "/" + e[2]
            })), a;
        }
    }(Dn), Dn.modules.yandex_music = new class {
        constructor(e) {}
        async yandexGetTrack(e) {
            let {album: t, trackId: n, uid: r, currentPage: o} = e;
            o = new URL(o);
            const i = {
                headers: {
                    accept: "application/json",
                    "X-Current-UID": r,
                    "X-Retpath-Y": o.toString()
                },
                json: !0,
                withCredentials: !0
            }, s = await Object(C.a)(st({
                url: at(o.host, n, t)
            }, i)), {src: a, codec: c, bitrate: u} = s.body;
            let l = -1 === a.indexOf("https:") ? "https:" + a : a;
            const h = new URL(l);
            [ [ "track_id", n ], [ "format", "json" ] ].forEach(e => h.searchParams.append(...e));
            const f = await Object(C.a)(st({
                url: h.toString()
            }, i)), {host: p, ts: d, path: m, s: g} = f.body;
            return {
                bitrate: u,
                codec: c,
                downloadURL: ct(p, g, d, m, n)
            };
        }
    }(Dn), Dn.modules.tiktok = new ut(Dn), r.a.remote = Object.assign(r.a.remote, {
        createRequest: Ht,
        sendRequest: zt,
        readRequestBodyChunk: Yt,
        clearRequest: Jt,
        clearRequestByPrefix: Gt
    }, {
        televzr: Zt(Dn),
        auth: Dn.authService.bindRemoteFunctions()
    }), r.a.remote.getPreferences = () => Dn.readyPromise.then(() => (setTimeout(() => {
        Dn.userTrack(), Dn.sendInGa.pull();
    }, 1), Dn.preferences)), Dn.varCache = {
        helperName: "",
        currentVersion: "9.91",
        isFirstrun: !1,
        isUpgrade: !1,
        uuid: "",
        aiid: ""
    }, Dn.extra = {}, Dn.defaultPreferences = {
        version: "0",
        button: 1,
        lmMediaHosting: 1,
        moduleYoutube: !0,
        moduleYandexMusic: 1,
        moduleDailymotion: 1,
        moduleVimeo: 1,
        moduleFacebook: 1,
        moduleMatchTv: 1,
        moduleSoundcloud: 1,
        moduleVkontakte: 1,
        moduleOdnoklassniki: 1,
        moduleMailru: 1,
        moduleInstagram: 1,
        moduleRutube: 1,
        moduleTiktok: 1,
        moduleTwitch: 1,
        moduleShowDownloadInfo: 1,
        ytHideFLV: 0,
        ytHideMP4: 0,
        ytHideWebM: 1,
        ytHide3GP: 1,
        ytHide3D: 1,
        ytHideMP4NoAudio: 1,
        ytHideAudio_MP4: 1,
        vkShowBitrate: 0,
        showUmmyInfo: 1,
        showUmmyBtn: 1,
        gmNativeDownload: 0,
        advPreShow: 0,
        aviaBarEnabled: 1,
        statEnabled: 1,
        ffmpegEnabled: 1,
        showUmmyLanding: 0,
        onceShowYtTutorial: 0,
        onceShowYtTooltip: 0,
        saveAsDialog: 0,
        sortDownloads: {
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
        },
        dataCollectionEnabled: !0
    }, Dn.preferences = {
        sfHelperName: "",
        country: "",
        hasAviaBar: void 0,
        downloads: void 0,
        ummyDetected: void 0,
        showUmmyItem: void 0,
        experiments: [],
        sendExporterEvent: void 0
    }, Dn.preferenceMap = xt, Dn.loader = ($n = function() {
        Bn.slice(0).forEach((function(e) {
            if (e.nameList.every((function(e) {
                return -1 !== qn.indexOf(e);
            }))) {
                var t = Bn.indexOf(e);
                if (-1 !== t) {
                    Bn.splice(t, 1);
                    try {
                        e.fn();
                    } catch (e) {
                        Nn.error("Run error!", e);
                    }
                }
            }
        }));
    }, {
        waitList: Bn = [],
        readyList: qn = [],
        ready: function(e) {
            qn.push(e), $n();
        },
        when: function(e, t) {
            Array.isArray(e) || (e = [ e ]), Bn.push({
                nameList: e,
                fn: t
            }), $n();
        }
    }), Dn.events = (Hn = [].slice, zn = function(e, t) {
        var n = Vn[e];
        Vn[e] || (n = Vn[e] = []), -1 === n.indexOf(t) && n.push(t);
    }, {
        listeners: Vn = {},
        emit: function(e, t) {
            var n = Hn.call(arguments).slice(1), r = Vn[e] || [];
            r.slice(0).forEach((function(e) {
                try {
                    e.apply(null, n);
                } catch (e) {
                    Nn.error("Emit error!", e);
                }
            }));
        },
        on: zn,
        off: Yn = function(e, t) {
            var n = Vn[e] || [], r = n.indexOf(t);
            -1 !== r && n.splice(r, 1);
        },
        once: function(e, t) {
            zn(e, (function() {
                Yn(e, t), t.apply(null, arguments);
            }));
        }
    }), Dn.getHelperName = function() {
        const e = function() {
            let e = "";
            const t = navigator.userAgent;
            return -1 !== t.indexOf("YaBrowser/") ? e = "yabrowser" : -1 !== t.indexOf("Maxthon/") ? e = "maxthon" : -1 !== t.indexOf("OPR/") ? e = "opera-chromium" : -1 !== t.indexOf("Opera/") ? e = "opera" : -1 !== t.indexOf("Firefox/") ? e = "firefox" : -1 !== t.indexOf("Chrome/") ? e = "chrome" : -1 !== t.indexOf("Safari/") && (e = "safari"), 
            e;
        };
        let t = "unknown";
        return r.a.isChrome ? (t = e() || "chrome", /sandbox.html#bg/.test(location.href) && (t = "chameleon"), 
        Dn.chromeNoStore && (t += "-sf")) : r.a.isFirefox ? (t = "firefox", r.a.isFirefoxMobile && (t += "-mobile"), 
        Dn.firefoxNoStore && (t += "-sf")) : r.a.isSafari ? t = "safari" : r.a.isGM ? (t = e() || t, 
        t = "userjs-" + t) : r.a.isEdge && (t = "edge"), t;
    }, Dn.getSfHelperName = function() {
        var e = Dn.varCache.helperName;
        return /^firefox/.test(e) && (e = e.replace("firefox", "ff")), e;
    }, Dn.dblTrackCheck = function(e) {
        if (!r.a.isGM) return e();
        ft() || r.a.storage.get({
            dblTrack: null
        }, t => {
            const n = Date.now();
            if (t.dblTrack && t.dblTrack.time > n) ; else {
                const t = Dn.generateUuid();
                r.a.storage.set({
                    dblTrack: {
                        uuid: t,
                        time: n + 6e4
                    }
                }, () => {
                    setTimeout(() => {
                        r.a.storage.get({
                            dblTrack: null
                        }, n => {
                            n.dblTrack && n.dblTrack.uuid === t && e();
                        });
                    }, 5e3);
                });
            }
        });
    }, Dn.getUuid = function() {
        var e = Dn.varCache;
        if (e.uuid) return e.uuid;
        var t = Dn.generateUuid();
        return e.uuid = t, r.a.storage.set({
            uuid: t
        }), t;
    }, Dn.generateUuid = function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
            var t = 16 * Math.random() | 0;
            return ("x" == e ? t : 3 & t | 8).toString(16);
        }));
    }, Dn.getNavLanguage = function() {
        var e = "", t = navigator.language;
        return /^\w{2}-|^\w{2}$/.test(t) && (e = t), e;
    }, Dn.gmShowButton = function(e) {
        e ? r.a.bundle.showButton() : r.a.bundle.hideButton();
    }, Dn.tabListener = function() {
        let e = !1;
        const t = Dn.preferences, n = Object(Ot.a)([ {
            matches: /^(?:https?|file|ftp):\/\/[^\\/]*\.vimeo\.com\/.*$|^(?:https?|file|ftp):\/\/vimeo\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.youtube\.com\/.*$|^(?:https?|file|ftp):\/\/youtube\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.soundcloud\.com\/.*$|^(?:https?|file|ftp):\/\/soundcloud\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.vk\.com\/.*$|^(?:https?|file|ftp):\/\/vk\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.vkontakte\.ru\/.*$|^(?:https?|file|ftp):\/\/vkontakte\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.ok\.ru\/.*$|^(?:https?|file|ftp):\/\/ok\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.odnoklassniki\.ru\/.*$|^(?:https?|file|ftp):\/\/odnoklassniki\.ru\/.*$|^(?:https?|file|ftp):\/\/my\.mail\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.facebook\.com\/.*$|^(?:https?|file|ftp):\/\/facebook\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.savefrom\.net\/.*$|^(?:https?|file|ftp):\/\/savefrom\.net\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.instagram\.com\/.*$|^(?:https?|file|ftp):\/\/instagram\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.rutube\.ru\/.*$|^(?:https?|file|ftp):\/\/rutube\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.tiktok\.com\/.*$|^(?:https?|file|ftp):\/\/tiktok\.com\/.*$/i
        }, {
            matches: /^(?:https?|file|ftp):\/\/[^\\/]*\/.*$/i,
            include_globs: /^[^:]*:\/\/dailymotion\.[^\\/]*\/.*$|^[^:]*:\/\/[^\\/]*\.dailymotion\.[^\\/]*\/.*$/i
        } ]), o = {}, i = function() {
            e = !1, Nn.debug("tabListener", e);
        };
        return {
            extendJsList: o,
            enable: function() {
                r.a.isFirefoxMobile || e || (e = !0, Nn.debug("tabListener", e));
            },
            disable: function() {
                r.a.isFirefoxMobile || i();
            },
            injectLmInActiveTab: function() {
                const e = [ "includes/commons.js", "includes/link_modifier.js" ];
                r.a.getActiveTab(t => {
                    t && /^http/.test(t.url) && !n(t.url) && e.forEach(e => {
                        r.a.executeScript(t, {
                            file: e
                        });
                    });
                });
            },
            openPage: s => {
                e && function(e, s) {
                    const a = n(s), c = [], u = t.lmMediaHosting;
                    a || u && (c.push("includes/commons.js"), c.push("includes/link_modifier.js"));
                    let l = !0;
                    for (let e in o) {
                        l = !1;
                        const t = o[e];
                        if (!a || t.noBlackList) {
                            const e = t.getScriptList(s) || [];
                            c.push(...e);
                        }
                    }
                    if (!u && l) i(); else if (c.length) {
                        const t = c.filter((e, t, n) => n.indexOf(e) === t);
                        Nn.debug("Inject", s, t), t.forEach(t => {
                            r.a.executeScript(e, {
                                file: t
                            });
                        });
                    }
                }(s.tab, s.url);
            }
        };
    }(), Dn.getCountry = function() {
        const e = Dn.preferences, t = e => new Promise(t => r.a.storage.set(e, t));
        return (n = {
            countryExpiresAt: 0
        }, new Promise(e => r.a.storage.get(n, e))).then(n => {
            if (P() > n.countryExpiresAt) return t({
                countryExpiresAt: P() + 300
            }).then(() => {
                const t = e.sfHelperName + " " + Dn.varCache.currentVersion;
                return Object(C.a)({
                    type: "POST",
                    url: "https://sf-helper.com/geoip/country.php",
                    data: {
                        sig: t.length
                    },
                    headers: {
                        "X-Helper": t
                    }
                });
            }).then(n => {
                const r = n.body.toLowerCase().trim();
                return Nn.debug("set country", r), e.country = r, t({
                    country: r,
                    countryExpiresAt: P() + 259200
                });
            });
        }).catch(e => {
            Nn("getCountry error", e);
        });
        var n;
    }, Dn.loader.when("prepare", (function() {
        var e = Promise.resolve();
        if (Dn.liteStorage.get("fromId", 0)) return e;
        if (r.a.isGM && ft()) return e;
        return e = e.then((function() {
            return Dn.liteStorage.isTimeout("fromIdTimeout") ? Nn.debug("Request fromId timeout") : (Dn.liteStorage.setTimeout("fromIdTimeout", 21600), 
            Object(C.a)({
                url: "http://savefrom.net/tools/get_vid.php"
            }).then((function(e) {
                var t = e.body, n = -1;
                /^\d+$/.test(t) && (n = parseInt(t)), Nn.debug("fromId", n), Dn.liteStorage.set("fromId", n);
            })).catch((function(e) {
                return Nn.error("Request fromId error!", e);
            })));
        })).catch((function(e) {
            Nn.error("Request fromId error", e);
        }));
    })), Dn.onOptionChange = {
        button: function(e) {
            r.a.isGM && Dn.gmShowButton(e);
        },
        lmMediaHosting: function(e) {
            e && Dn.tabListener.enable();
        },
        gmNativeDownload: function(e) {
            r.a.isGM && (Dn.preferences.downloads = !!e, r.a.sendMessageToActiveTab({
                action: "updatePreferences",
                preferences: Dn.preferences
            }));
        }
    }, Dn.sendInGa = (Jn = !1, Wn = function e() {
        if (!Jn && Gn.length) {
            Jn = !0;
            var t = Date.now(), n = Gn.slice(0, 20), r = n.map((function(e) {
                var n = e.time, r = JSON.parse(JSON.stringify(e.params)), o = t - n;
                return o >= 144e5 && (o = 144e5 - 1e3 * (Gn.length + 1)), r.qt = o, Mn.stringify(r);
            }));
            return Object(i.a)({
                url: "https://www.google-analytics.com/batch?z=" + t,
                type: "POST",
                contentType: "text/html",
                data: r.join("\n"),
                timeout: 6e4
            }, (function(t) {
                Jn = !1, t || (n.forEach((function(e) {
                    var t = e.details, n = Gn.indexOf(e);
                    -1 !== n && Gn.splice(n, 1);
                    try {
                        t.onSuccess && t.onSuccess();
                    } catch (e) {
                        Nn.error("sendInGa", "onSuccess", e);
                    }
                })), e());
            }));
        }
    }, {
        stack: Gn = [],
        push: function(e, t) {
            var n = !1;
            (t = t || {}).id && (n = Gn.some((function(e) {
                if (e.details.id === t.id) return !0;
            }))), n || (Gn.unshift({
                time: Date.now(),
                params: e,
                details: t
            }), Gn.splice(100), setTimeout((function() {
                Wn();
            }), 50));
        },
        pull: function() {
            Gn.length && (Dn.liteStorage.isTimeout("sendInGaTimeout") || (Dn.liteStorage.setTimeout("sendInGaTimeout", 3600), 
            Wn()));
        }
    }), Dn.actionList = {
        getMenuDetails: function(e, t) {
            var n = {
                preferences: Dn.preferences,
                version: Dn.varCache.currentVersion,
                lastVersion: function() {
                    var e = "", t = Dn.varCache.currentVersion, n = Dn.liteStorage.get("lastVersion", "");
                    if (!t || !n) return e;
                    try {
                        mt(t, n) && (e = n);
                    } catch (e) {
                        Nn.debug("isNewVersion", e);
                    }
                    return e;
                }(),
                helperName: Dn.varCache.helperName
            };
            return Object(_t.a)([ "userInfo" ]).then(e => ({
                userInfo: e.userInfo,
                loginUrl: r.a.remote.auth.getLoginUrl()
            })).then(e => t(Object.assign(n, e))), !0;
        },
        updateOption: function(e) {
            var t = e.key, n = e.value, o = Dn.preferences[t];
            Dn.preferences[t] = n;
            var i = {};
            i[t] = n, r.a.storage.set(i), Dn.onOptionChange[t] && Dn.onOptionChange[t](n, o);
        },
        downloadFromCurrentPage: function() {
            r.a.getActiveTab((function(e) {
                const t = e && e.url || "";
                var n = Mn.stringify({
                    url: t,
                    utm_source: Dn.preferences.sfHelperName,
                    utm_medium: "extensions",
                    utm_campaign: "bookmarklet"
                });
                r.a.openTab("http://savefrom.net/?" + n, !0);
            }));
        },
        openPoll: function() {
            if (-1 !== [ "en", "uk", "ru" ].indexOf(r.a.i18n.getMessage("lang"))) {
                var e = "http://" + r.a.i18n.getMessage("lang") + ".savefrom.net/helper-form.php";
                r.a.getActiveTab((function(t) {
                    const n = t && t.url || "";
                    var o = dt(n) || "", i = "?" + Mn.stringify({
                        version: Dn.varCache.currentVersion,
                        helper: Dn.preferences.sfHelperName,
                        url: o
                    });
                    r.a.openTab(e + i, !0);
                }));
            }
        },
        viaMenu_updateLinks: function() {
            r.a.sendMessageToActiveTab({
                action: "updateLinks"
            });
        },
        viaMenu_downloadMP3Files: function() {
            r.a.sendMessageToActiveTab({
                action: "downloadMP3Files"
            });
        },
        viaMenu_downloadPlaylist: function() {
            r.a.sendMessageToActiveTab({
                action: "downloadPlaylist"
            });
        },
        viaMenu_downloadPhotos: function() {
            r.a.sendMessageToActiveTab({
                action: "downloadPhotos"
            });
        },
        viaMenu_changeState: function(e) {
            if (Dn.actionList.updateOption({
                key: e.prefKey,
                value: e.state
            }), e.state && "lm" === e.moduleName && e.needInclude) return Dn.tabListener.injectLmInActiveTab();
            r.a.sendMessageToActiveTab({
                action: "changeState",
                moduleName: e.moduleName,
                state: e.state
            });
        },
        showOptions: function() {
            if (r.a.isGM) r.a.bundle.showOptions(); else {
                var e = "options.html";
                r.a.isSafari && (e = safari.extension.baseURI + e), r.a.openTab(e, !0);
            }
        },
        getActiveTabModuleInfo: function(e, t) {
            return r.a.sendMessageToActiveTab({
                action: "getModuleInfo",
                url: e.url
            }, (function(e) {
                t(e);
            })), !0;
        },
        getActiveTabUrl: function(e, t) {
            return r.a.getActiveTab((function(e) {
                const n = e && e.url || "";
                return t(n);
            })), !0;
        },
        getActiveTabInfo: function(e, t) {
            var n = Dn.preferences;
            return r.a.getActiveTab((function(e) {
                const r = e && e.url || "";
                if (0 !== r.indexOf("http")) return t();
                var o = {
                    dailymotion: [ "*://*.dailymotion.*/*" ],
                    facebook: [ "*://*.facebook.com/*" ],
                    mailru: [ "*://my.mail.ru/*" ],
                    odnoklassniki: [ "*://*.ok.ru/*", "*://*.odnoklassniki.ru/*" ],
                    savefrom: [ "*://*.savefrom.net/*" ],
                    soundcloud: [ "*://*.soundcloud.com/*" ],
                    vimeo: [ "*://*.vimeo.com/*" ],
                    vk: [ "*://*.vk.com/*", "*://*.vkontakte.ru/*" ],
                    youtube: [ "*://*.youtube.com/*" ],
                    instagram: [ "*://*.instagram.com/*" ],
                    rutube: [ "*://*.rutube.ru/*" ],
                    tiktok: [ "*://*.tiktok.com/*" ],
                    yandexMusic: [ "*://music.yandex.ru/*" ],
                    matchTv: [ "*://matchtv.ru/*" ]
                }, i = "lm", s = "lmMediaHosting", a = n.lmMediaHosting;
                for (var c in o) {
                    var u = o[c].map((function(e) {
                        return ht(e);
                    })).join("|");
                    if ((u = new RegExp(u)).test(r)) {
                        i = c, s = Dn.preferenceMap[i], a = n[s];
                        break;
                    }
                }
                return t({
                    moduleName: i,
                    prefKey: s,
                    url: r,
                    state: a
                });
            })), !0;
        },
        hideDownloadWarning: function(e, t) {
            return void 0 !== e.set ? r.a.storage.set({
                hideDownloadWarning: e.set
            }) : (r.a.storage.get({
                hideDownloadWarning: !1
            }, (function(e) {
                t(e.hideDownloadWarning);
            })), !0);
        },
        track: function(e) {
            Dn.readyPromise.then(() => {
                delete e.action, Dn.track(e);
            });
        },
        sendMonitoring: function(e) {
            Dn.preferences.sendExporterEvent && Dn.readyPromise.then(() => {
                delete e.action, Dn.sendMonitoring(e);
            });
        },
        addToClipboard: function(e) {
            if (r.a.isChrome || r.a.isFirefox) {
                var t, n = e.text;
                document.body.appendChild(t = Ct.create("textarea", {
                    text: n
                })), t.select(), setTimeout((function() {
                    document.execCommand("copy", !1, null), t.parentNode.removeChild(t);
                }));
            }
        },
        setIconBadge: function(e) {
            var t = String(e.text);
            (r.a.isChrome || r.a.isFirefox) && chrome.browserAction && chrome.browserAction.setBadgeText({
                text: t
            });
        },
        trackError: function(e) {
            try {
                var t = Dn.actionList.trackError;
                t.dDbl || (t.dDbl = {});
                var n = e.desc;
                if (e.error) {
                    var r = e.error;
                    n = n ? n + " " : "", r instanceof Error ? (n += String(r.message || r) || "ERROR", 
                    r.stack && (n += " " + e.error.stack)) : n += r;
                }
                var o = n.substr(0, 150);
                if (t.dDbl[o]) return;
                t.dDbl[o] = !0;
                var i = {
                    t: "exception",
                    exd: o,
                    tid: "UA-7055055-9"
                };
                Dn.sendStatsInfo(i);
            } catch (e) {}
        },
        openTab: function(e) {
            r.a.openTab(e.url);
        }
    }, Dn.onMessage = function(e, t, n) {
        if (!e || "object" != typeof e) return void Nn.debug("Skip message", e);
        if ("openPage" === e.action) return void (Dn.isReady ? Dn.tabListener.openPage(t) : this.readyPromise.then(() => {
            Dn.tabListener.openPage(t);
        }));
        const r = e.action;
        let o = Dn.actionList[r];
        if (o) return o.call(Dn.actionList, e, n);
        const i = (t, r) => {
            const o = r.call(t, e, n);
            return o instanceof Promise ? (o.then(n), !0) : o;
        };
        for (let e in Dn.modules) {
            const t = Dn.modules[e];
            if (o = t[r], o) return i(t, o);
        }
        return o = Dn.utils[r], o ? o.call(Dn.utils, e, n) : void 0;
    }, Dn.loadSettings = function(e) {
        var t = Dn.varCache, n = Dn.preferences, o = Dn.defaultPreferences;
        r.a.isGM && (o.button = 0, o.showUmmyBtn = 0);
        var i = {
            ummyDetected: function(e) {
                e || 0 === e || (e = n.showUmmyInfo ? 0 : 1, r.a.storage.set({
                    ummyDetected: e
                })), n.ummyDetected = e;
            }
        }, s = Object.keys(o), a = Object.keys(i);
        return r.a.storage.get(s.concat(a), (function(c) {
            if (s.forEach((function(e) {
                var t = o[e], r = c[e];
                void 0 === r && (r = t), n[e] = r;
            })), a.forEach((function(e) {
                i[e](c[e]);
            })), t.isFirstrun) {
                var u = {
                    showUmmyLanding: n.showUmmyLanding = 1,
                    onceShowYtTooltip: n.onceShowYtTooltip = 1,
                    onceShowYtTutorial: n.onceShowYtTutorial = 1
                };
                r.a.storage.set(u);
            }
            if (n.onceShowYtTutorial && !Dn.hasMenuTutorial && (n.onceShowYtTutorial = 0), r.a.isChrome && (chrome.downloads && chrome.downloads.download || chrome.permissions && chrome.permissions.request) && (n.downloads = !0), 
            r.a.isGM) {
                n.downloads = !1;
                var l = "undefined" != typeof GM_download, h = !1;
                l && "undefined" != typeof GM_info && (h = "browser" === GM_info.downloadMode), 
                l && (n.gmNativeDownload || h) && (n.gmNativeDownload = 1, n.downloads = !0);
            }
            return r.a.isFirefox && (n.downloads = !0), n.downloads && (n.moduleShowDownloadInfo = 0), 
            e();
        }));
    }, Dn.prepare = async function(e) {
        var t = Dn.varCache;
        Dn.loader.when("loadSettings", (function() {
            t.isUpgrade = !t.isFirstrun && Dn.preferences.version !== t.currentVersion, e();
        })), await Dn.getCountry(), Dn.loadSettings((function() {
            Dn.loader.ready("loadSettings");
        }));
    }, Dn.initMessageListener = function() {
        Dn.initMessageListener.fired || (Dn.initMessageListener.fired = !0, r.a.onMessage.addListener((function(e, t, n) {
            return Dn.onMessage(e, t, n);
        })));
    }, Dn.init = function() {
        Dn.initMessageListener(), Dn.preferences.sendExporterEvent = Math.floor(100 * Math.random()) < 1;
        var e = Dn.varCache, t = Dn.preferences;
        return Qn().then(() => r.a.storage.get({
            uuid: "",
            version: "",
            country: "",
            aiid: "",
            lc: null,
            [Dn.liteStorage.getStorageKey()]: {}
        }, (async function(n) {
            Dn.liteStorage.setStorage(n), null === n.lc && (n.lc = Math.random() < .05, r.a.storage.set({
                lc: n.lc
            })), t.lc = n.lc, "string" == typeof n.uuid && 36 === n.uuid.length && (e.uuid = n.uuid), 
            "string" == typeof n.aiid && (e.aiid = n.aiid.replace(/aiid/, "").replace(/#/g, "")), 
            n.version || (e.isFirstrun = !0), n.country && (t.country = n.country), Dn.preferences.proEnabled = await kn();
            const o = new Rt((i = r.a, window.navigator.userAgent.indexOf("OPR") > -1 || window.navigator.userAgent.indexOf("Opera") > -1 ? "opera" : i.isGM ? "userjs" : i.isFirefox ? "firefox" : i.isChrome ? "chrome" : void 0), Dn.preferences.country);
            var i;
            const s = new qt(o);
            Dn.preferences.experiments = await s.init(), e.helperName = Dn.getHelperName(), 
            t.showUmmyItem = /^Win|^Mac/.test(navigator.platform) ? 1 : 0, t.sfHelperName = Dn.getSfHelperName(), 
            Dn.loader.ready("init"), Dn.loader.when("prepare", (function() {
                Dn.checkVersion();
            })), Dn.events.on("sendScreenView", () => {
                if (!t.lc) return;
                const e = {
                    t: "screenview",
                    cd: "init",
                    cd4: "true",
                    tid: "UA-67738130-7"
                };
                Dn.wrapBaseStatInfo(e), Dn.quickTrack(e), St([ {
                    user_id: Dn.varCache.uuid,
                    event_type: "init",
                    user_properties: {
                        Cohort: "Clear"
                    }
                } ]).catch(() => {
                    chrome && "tabs" in chrome && "webNavigation" in chrome && chrome.tabs.query({
                        currentWindow: !0,
                        active: !0
                    }, e => {
                        0 !== e.length && chrome.webNavigation.getAllFrames({
                            tabId: e[0].id
                        }, e => {
                            Nn.debug("Error in amplitude: ", e);
                        });
                    });
                });
            }), Dn.prepare((function() {
                Dn.loader.ready("prepare"), Dn.readyHandler();
            }));
        })));
    };
    const Qn = () => Promise.resolve().then(() => {
        if (r.a.isChrome) return new Promise(e => r.a.storage.get({
            migrated3: !1
        }, t => e(t.migrated3))).then(e => {
            if (!e) {
                const e = {
                    migrated3: !0
                };
                return Object.keys(localStorage).forEach(t => {
                    const n = localStorage.getItem(t);
                    try {
                        /^{(?:"w":.+|)}$/.test(n) && (e[t] = JSON.parse(n).w);
                    } catch (e) {
                        Nn.error("Parse value error", t, e);
                    }
                }), new Promise(t => r.a.storage.set(e, t));
            }
        }).catch(e => {
            Nn.error("migrate error", e), r.a.storage.set({
                migrated3: !0
            });
        });
    });
    if (Dn.userTrack = function() {
        if (Dn.liteStorage.isTimeout("trackTimeout")) return;
        Dn.liteStorage.setTimeout("trackTimeout", 300);
        let e = {
            t: "screenview",
            cd: "init",
            tid: "UA-7055055-5"
        };
        return Dn.dblTrackCheck((function() {
            Dn.track(e, {
                id: "init",
                onSuccess: function() {
                    Dn.liteStorage.setTimeout("trackTimeout", 43200), Dn.events.emit("sendScreenView"), 
                    Tt().then(() => {
                        if ("de" === Dn.preferences.country) {
                            const t = Object.assign({}, e, {
                                tid: "UA-119781451-36"
                            });
                            Dn.quickTrack(t);
                        }
                    });
                }
            });
        }));
    }, Dn.trackValidate = function(e) {
        var t = function(e) {
            return !(!e && 0 !== e && !1 !== e) && -1 === [ "object", "function" ].indexOf(typeof e);
        };
        if (!e.tid) return !1;
        if (!e.cid) return !1;
        if (1 !== parseInt(e.v)) return !1;
        if (!e.t) return !1;
        if ("event" === e.t) {
            if (!t(e.ec) || !t(e.ea)) return !1;
        } else if ("screenview" === e.t) {
            if (!t(e.cd)) return !1;
        } else if (!("social" !== e.t || t(e.st) && t(e.sa) && t(e.sn))) return !1;
        return !0;
    }, Dn.track = function(e, t) {
        return Dn.sendStatsInfo(e, t);
    }, Dn.sendMonitoring = function(e) {
        const t = `category=${e.obj.category}&subcategory=${e.obj.subcategory}&event=${e.obj.event}&duration=3.14`;
        return Object(i.a)({
            url: "https://monitoring-exporter.sf-helper.com/event",
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            data: t,
            timeout: 6e4
        }, (function(e, t) {
            e && console.log(e);
        }));
    }, r.a.isGM) {
        new Tn(Dn.track).init();
    }
    var Xn, Kn, Zn, er, tr, nr;
    Dn.quickTrack = function(e, t) {
        Dn.trackValidate(e) ? (Nn.debug("Track", e), Dn.sendInGa.push(e, t)) : Nn.error("Invalid track params!", e);
    }, Dn.wrapBaseStatInfo = function(e) {
        var t = Dn.varCache, n = {
            v: 1,
            ul: navigator.language,
            tid: "UA-67738130-2",
            cid: Dn.getUuid(),
            an: "helper",
            aid: t.helperName,
            av: t.currentVersion
        };
        for (var r in n) e.hasOwnProperty(r) || (e[r] = n[r]);
        for (let t in e) "&clientID" === e[t] && (e[t] = e.cid);
        return e;
    }, Dn.sendStatsInfo = function(e, t) {
        var n = Dn.preferences;
        Dn.wrapBaseStatInfo(e), Dn.varCache.aiid && (e.aiid = Dn.varCache.aiid), e.hasOwnProperty("cd3") || (e.cd3 = r.a.i18n.getMessage("lang"));
        var o = Dn.liteStorage.get("fromId", 0);
        o > 0 && (e.cd2 = o), n.hasSovetnik && (e.cd4 = n.sovetnikEnabled ? "true" : "false"), 
        e.cd6 = n.ummyDetected ? "true" : n.showUmmyItem ? "false" : "none", n.hasAviaBar && (e.cd7 = n.aviaBarEnabled ? "true" : "false"), 
        Dn.quickTrack(e, t);
    }, Dn.checkVersion = function() {
        var e = Dn.varCache, t = !1;
        e.isFirstrun ? (Dn.loader.ready("firstrun"), t = !0) : e.isUpgrade && (Dn.loader.ready("upgrade"), 
        t = !0), t && Dn.actionList.updateOption({
            key: "version",
            value: e.currentVersion
        });
    }, Dn.loader.when("firstrun", (function() {
        if (r.a.isGM) return;
        let e = "http://savefrom.net/user.php?helper=" + Dn.preferences.sfHelperName + ";firstrun";
        r.a.isFirefox && (Dn.actionList.updateOption({
            key: "dataCollectionEnabled",
            value: !1
        }), e = chrome.runtime.getURL("eula.html")), Dn.utils.checkUrlsOfOpenTabs([ /https?:\/\/([\w\-]+\.)?savefrom\.net\/(update-helper|userjs-setup)\.php/i ], (function(t) {
            t.length > 0 || Dn.utils.checkUrlsOfOpenTabs([ /https?:\/\/legal\.yandex\.(ru|com\.tr)\//i ], (function(t) {
                var n = 0 === t.length;
                return r.a.openTab(e, n);
            }));
        }));
    })), Dn.loader.when("prepare", (function() {
        var e = Dn.preferences;
        e.onceShowYtTutorial && Dn.actionList.setIconBadge({
            text: "?"
        }), e.showUmmyLanding && r.a.storage.get({
            onceUmmyLandingHide: 0
        }, (function(t) {
            t.onceUmmyLandingHide > 2 && r.a.storage.set({
                showUmmyLanding: e.showUmmyLanding = 0
            });
        }));
    })), Dn.loader.when("prepare", (function() {
        Dn.tabListener.enable();
    })), Dn.loader.when("init", (function() {
        if ((r.a.isChrome || r.a.isFirefox) && chrome.runtime.setUninstallURL) {
            var e = Dn.varCache, t = Dn.preferences, n = function() {
                var n = {
                    version: e.currentVersion,
                    language: r.a.i18n.getMessage("lang"),
                    appid: e.helperName,
                    country: t.country
                }, o = ("http://savefrom.net/goodbye.php?" + Mn.stringify(n)).substr(0, 255);
                chrome.runtime.setUninstallURL(o);
            };
            n(), Dn.loader.when("prepare", (function() {
                n();
            })), r.a.storage.onChanged.addListener((e, t) => {
                "local" === t && e.country && n();
            });
        }
    })), Dn.liteStorage = (Xn = {}, Kn = function(e) {
        var t = {};
        return t.liteStorage = Xn, r.a.storage.set(t, e);
    }, Zn = function() {
        Nn.error("liteStorage is not set!");
    }, nr = function(e, t) {
        return er(e, P() + t);
    }, {
        getStorageKey: function() {
            return "liteStorage";
        },
        setStorage: function(e) {
            Xn = e.liteStorage || {}, Zn = pt(Kn, 100);
        },
        set: er = function(e, t) {
            Xn[e] !== t && (Xn[e] = t, Zn());
        },
        get: tr = function(e, t) {
            var n = Xn[e];
            return void 0 === n && (n = t), function(e) {
                return JSON.parse(JSON.stringify({
                    w: e
                })).w;
            }(n);
        },
        isTimeout: function(e) {
            return tr(e, 0) > P();
        },
        setTimeout: nr,
        isExpire: function(e) {
            return tr(e, 0) < P();
        },
        setExpire: nr
    });
    (0, n(81).default)(Dn);
    (0, n(82).default)(Dn);
    (0, n(83).default)(Dn);
    Dn.init().then(async () => {
        "opera" === Object({
            extensionMarker: "savefrom-helper-extension",
            monoPath: "/Users/ismatvaliyev/work/helper/extension/mono",
            monoBrowser: "chrome",
            sourcePath: "/Users/ismatvaliyev/work/helper/extension/src",
            outputPath: "/Users/ismatvaliyev/work/helper/extension/dist/edge",
            devtool: "none",
            mode: "production",
            distName: "helper_9.91",
            geckoId: null,
            version: "9.91",
            browsersVersions: [ "Edge >= 14.14291" ],
            babelOptions: {
                presets: [ [ "@babel/preset-env", {
                    targets: {
                        browsers: [ "Edge >= 14.14291" ]
                    }
                } ] ],
                plugins: [ [ "@babel/plugin-transform-runtime", {
                    useESModules: !0
                } ] ]
            },
            beautify: !0,
            FLAG_CHROME_NO_STORE: !1,
            FLAG_FIREFOX_NO_STORE: !1,
            FLAG_OPERA_STORE: !1,
            FLAG_ADD_CHECK_UPDATE: !0,
            FLAG_MENU_TUTORIAL: !0,
            FLAG_ERROR_CATCH: !0,
            FLAG_CHROME_SOVETNIK: !1,
            FLAG_OPERA_SOVETNIK: !1,
            FLAG_FIREFOX_SOVETNIK: !1,
            FLAG_USERSCRIPT_SOVETNIK: !1,
            FLAG_TRAVELBAR: !0,
            FLAG_TRAVELBAR_LITE: !1,
            FLAG_CHROMENOSTORE_SIMILARWEB: !1,
            FLAG_FIREFOX_SIMILARWEB: !1,
            FLAG_USERSCRIPT_SIMILARWEB: !1,
            FLAG_ALIRADAR_CHROME: !1,
            FLAG_ALIRADAR_FIREFOX: !1,
            FLAG_ALIRADAR_OPERA: !1,
            FLAG_ALIRADAR_USERSCRIPT: !1,
            FLAG_ALI_AB_TEST: !1,
            FLAG_STAT_TRACKER: !1,
            FLAG_MUTATION_OBSERVER_POLYFILL: !1,
            FLAG_USERSCRIPT_USERTRACK: !1,
            FLAG_ENABLE_LOGGER: !1,
            FLAG_SEND_TO: !1,
            FLAG_ALIWIZ: !1,
            FLAG_CONVERTER_STAT: !1,
            FLAG_ALIWIZ_USERSCRIPT: !1,
            FLAG_ALITEST: !1,
            FLAG_GOOGLE_ANALYTICS: !0,
            FLAG_TEST_EXPERIMENT: null,
            FLAG_PROMO_BAR: !1,
            FLAG_HELPER_PRO: !1,
            FLAG_WITHOUT_YOUTUBE: !1,
            FLAG_GOAL: !1,
            FLAG_CONV_FFMPEG: !0,
            FLAG_MIGRATE_TM: !1
        }).browser && Un(Dn);
        (0, n(85).default)(Dn);
    });
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n(0), o = n(14);
    const i = Object(o.a)([ {
        matches: /^(?:https?|file|ftp):\/\/[^\\/]*\.ozon\.travel\/.*$|^(?:https?|file|ftp):\/\/ozon\.travel\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.onetwotrip\.com\/.*$|^(?:https?|file|ftp):\/\/onetwotrip\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.onetravel\.com\/.*$|^(?:https?|file|ftp):\/\/onetravel\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.aeroflot\.ru\/.*$|^(?:https?|file|ftp):\/\/aeroflot\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.anywayanyday\.com\/.*$|^(?:https?|file|ftp):\/\/anywayanyday\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.svyaznoy\.travel\/.*$|^(?:https?|file|ftp):\/\/svyaznoy\.travel\/.*$|^(?:https?|file|ftp):\/\/avia\.tickets\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.s7\.ru\/.*$|^(?:https?|file|ftp):\/\/s7\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.kupibilet\.ru\/.*$|^(?:https?|file|ftp):\/\/kupibilet\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.trip\.ru\/.*$|^(?:https?|file|ftp):\/\/trip\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.trip\.com\/.*$|^(?:https?|file|ftp):\/\/trip\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.ctrip\.com\/.*$|^(?:https?|file|ftp):\/\/ctrip\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.tutu\.ru\/.*$|^(?:https?|file|ftp):\/\/tutu\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.uralairlines\.ru\/.*$|^(?:https?|file|ftp):\/\/uralairlines\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.flyredwings\.com\/.*$|^(?:https?|file|ftp):\/\/flyredwings\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.airastana\.com\/.*$|^(?:https?|file|ftp):\/\/airastana\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.airmoldova\.md\/.*$|^(?:https?|file|ftp):\/\/airmoldova\.md\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.sindbad\.ru\/.*$|^(?:https?|file|ftp):\/\/sindbad\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.aviakassa\.ru\/.*$|^(?:https?|file|ftp):\/\/aviakassa\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.aviakassa\.com\/.*$|^(?:https?|file|ftp):\/\/aviakassa\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.biletix\.ru\/.*$|^(?:https?|file|ftp):\/\/biletix\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.utair\.ru\/.*$|^(?:https?|file|ftp):\/\/utair\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.orbitz\.com\/.*$|^(?:https?|file|ftp):\/\/orbitz\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.travelocity\.com\/.*$|^(?:https?|file|ftp):\/\/travelocity\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.travelocity\.ca\/.*$|^(?:https?|file|ftp):\/\/travelocity\.ca\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.expedia-cn\.com\/.*$|^(?:https?|file|ftp):\/\/expedia-cn\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.priceline\.com\/.*$|^(?:https?|file|ftp):\/\/priceline\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.airasia\.com\/.*$|^(?:https?|file|ftp):\/\/airasia\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.ryanair\.com\/.*$|^(?:https?|file|ftp):\/\/ryanair\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.hotels\.com\/.*$|^(?:https?|file|ftp):\/\/hotels\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.ostrovok\.ru\/.*$|^(?:https?|file|ftp):\/\/ostrovok\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.travel\.ru\/.*$|^(?:https?|file|ftp):\/\/travel\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.oktogo\.ru\/.*$|^(?:https?|file|ftp):\/\/oktogo\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.roomguru\.ru\/.*$|^(?:https?|file|ftp):\/\/roomguru\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.tripadvisor\.ru\/.*$|^(?:https?|file|ftp):\/\/tripadvisor\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.hilton\.ru\/.*$|^(?:https?|file|ftp):\/\/hilton\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.hilton\.com\/.*$|^(?:https?|file|ftp):\/\/hilton\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.marriott\.com\/.*$|^(?:https?|file|ftp):\/\/marriott\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.hostelworld\.com\/.*$|^(?:https?|file|ftp):\/\/hostelworld\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.tiket\.com\/.*$|^(?:https?|file|ftp):\/\/tiket\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.hotelsclick\.com\/.*$|^(?:https?|file|ftp):\/\/hotelsclick\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.hotelscombined\.com\/.*$|^(?:https?|file|ftp):\/\/hotelscombined\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.wizzair\.com\/.*$|^(?:https?|file|ftp):\/\/wizzair\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.emirates\.com\/.*$|^(?:https?|file|ftp):\/\/emirates\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.delta\.com\/.*$|^(?:https?|file|ftp):\/\/delta\.com\/.*$|^(?:https?|file|ftp):\/\/booking\.etihad\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.budget\.com\/.*$|^(?:https?|file|ftp):\/\/budget\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.hertz\.com\/.*$|^(?:https?|file|ftp):\/\/hertz\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.europcar\.com\/.*$|^(?:https?|file|ftp):\/\/europcar\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.united\.[^\\/]*\/.*$|^(?:https?|file|ftp):\/\/united\.[^\\/]*\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.jetblue\.[^\\/]*\/.*$|^(?:https?|file|ftp):\/\/jetblue\.[^\\/]*\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.123milhas\.[^\\/]*\/.*$|^(?:https?|file|ftp):\/\/123milhas\.[^\\/]*\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.britishairways\.[^\\/]*\/.*$|^(?:https?|file|ftp):\/\/britishairways\.[^\\/]*\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.cheapoair\.[^\\/]*\/.*$|^(?:https?|file|ftp):\/\/cheapoair\.[^\\/]*\/.*$/i
    }, {
        matches: /^(?:https?|file|ftp):\/\/[^\\/]*\/.*$/i,
        include_globs: /^[^:]*:\/\/skyscanner\.[^\\/]*\/.*$|^[^:]*:\/\/[^\\/]*\.skyscanner\.[^\\/]*\/.*$|^[^:]*:\/\/momondo\.[^\\/]*\/.*$|^[^:]*:\/\/[^\\/]*\.momondo\.[^\\/]*\/.*$|^[^:]*:\/\/kayak\.[^\\/]*\/.*$|^[^:]*:\/\/[^\\/]*\.kayak\.[^\\/]*\/.*$|^[^:]*:\/\/booking\.[^\\/]*\/.*$|^[^:]*:\/\/[^\\/]*\.booking\.[^\\/]*\/.*$|^[^:]*:\/\/agoda\.[^\\/]*\/.*$|^[^:]*:\/\/[^\\/]*\.agoda\.[^\\/]*\/.*$|^[^:]*:\/\/expedia\.[^\\/]*\/.*$|^[^:]*:\/\/[^\\/]*\.expedia\.[^\\/]*\/.*$|^[^:]*:\/\/avis\.[^\\/]*\/.*$|^[^:]*:\/\/[^\\/]*\.avis\.[^\\/]*\/.*$/i
    } ]);
    var s = e => i(e), a = n(4), c = (n(1), n(6)), u = n(2);
    const l = null, h = window.navigator.userAgent.indexOf("OPR") > -1 || window.navigator.userAgent.indexOf("Opera") > -1, f = window.navigator.userAgent.indexOf("Edg") > -1, p = async () => {
        let {travelBarConfig: e} = await (t = {
            travelBarConfig: null
        }, new Promise(e => r.a.storage.get(t, e)));
        var t;
        return (!e || e && JSON.parse(e).exp + 864e5 < Date.now()) && (e = await (async () => {
            const e = (await Object(u.a)("https://travelbar.tools/v1/avia/config")).body;
            return r.a.storage.set({
                travelBarConfig: e
            }), e;
        })()), e;
    }, d = async () => {
        const e = await p(), t = (e => {
            const {firefoxSample: t, userJsSample: n, operaSample: o, edgeSample: i} = e;
            let s = 0;
            return r.a.isGM ? s = n : r.a.isFirefox ? s = t : h ? s = o : f && (s = i), parseInt(s, 10);
        })(JSON.parse(e));
        return Math.floor(100 * Math.random()) < t;
    };
    t.default = e => {
        e.loader.when("init", (async function() {
            const t = await d(), {defaultPreferences: n, preferences: o} = e;
            if (o.lc || !t) return void (l && l.debug("Skip: lc"));
            n.aviaBarEnabled = 1, o.hasAviaBar = 1;
            const i = () => o.hasAviaBar && o.aviaBarEnabled;
            let u = function() {
                u = null;
                var t = function(e) {
                    return r.a.onMessage.addListener(e);
                }, n = {
                    get: function(e, t) {
                        return r.a.storage.get(e, t);
                    },
                    set: function(e, t) {
                        return r.a.storage.set(e, t);
                    }
                }, o = {
                    appInfo: {
                        id: "sf.sfHelper",
                        track: !0,
                        directTrack: !0,
                        useTemplates: !0
                    }
                };
                o.API = {
                    setRemovedState: function(e) {
                        n.get("aviaBar", (function(t) {
                            return t.aviaBar = t.aviaBar || {}, t.aviaBar.removed = !!e, n.set(t);
                        }));
                    }
                };
                var i = function(e) {
                    var t = e.aviaBar;
                    t && "object" == typeof t || (t = e.aviaBar = {}), Array.isArray(t.blackList) || (t.blackList = []), 
                    t.templates && "object" == typeof t.templates || (t.templates = {});
                };
                t((function(t, r, s) {
                    if (t && t.action) switch (t.action) {
                      case "tbrGetInfo":
                        s(o.appInfo);
                        break;

                      case "tbrIsAllow":
                        return n.get("aviaBar", (function(e) {
                            if (i(e), e.aviaBar.removed) return s(!1);
                            var r = !0, o = e.aviaBar.blackList, a = null;
                            if (o.some((function(e) {
                                if (e.hostname === t.hostname) return a = e, !0;
                            })), a) {
                                var c = parseInt(Date.now() / 1e3);
                                if (a.expire > c) r = !1; else {
                                    var u = o.indexOf(a);
                                    o.splice(u, 1), n.set(e);
                                }
                            }
                            return s(r);
                        })), !0;

                      case "tbrCloseBar":
                        n.get("aviaBar", (function(e) {
                            i(e);
                            var r = e.aviaBar.blackList, o = null;
                            if (r.some((function(e) {
                                if (e.hostname === t.hostname) return o = e, !0;
                            })), !o) {
                                var s = parseInt(Date.now() / 1e3);
                                r.push({
                                    hostname: t.hostname,
                                    expire: s + 18e3
                                }), n.set(e);
                            }
                        }));
                        break;

                      case "tbrGetTemplate":
                        return n.get("aviaBar", (function(e) {
                            i(e);
                            var r = e.aviaBar.templates, o = r[t.id];
                            o || (r[t.id] = o = {});
                            var a = parseInt(Date.now() / 1e3);
                            o.expire > a ? s(o.data) : (o.expire = a + 43200, s(o.data), n.set(e));
                        })), !0;

                      case "tbrEvent":
                        "track" === t.type ? (a = t.data[0], c = -1 !== [ "cheapflightError", "hotelError" ].indexOf(a.ec), 
                        a.tid = "UA-70432435-15", e.wrapBaseStatInfo(a), c || e.quickTrack(a)) : "directTrack" === t.type && function(t) {
                            t.tid && (e.wrapBaseStatInfo(t), e.quickTrack(t));
                        }(t.data[0]);
                    }
                    var a, c;
                }));
            };
            const h = () => {
                i() ? (l && l.debug("enabled"), u && u(), e.tabListener.extendJsList.aviaBar = f, 
                e.tabListener.enable()) : (l && l.debug("disabled", o.hasAviaBar, o.aviaBarEnabled), 
                delete e.tabListener.extendJsList.aviaBar);
            }, f = {
                getScriptList: e => {
                    const t = [];
                    return i() ? s(e) && (t.push("includes/commons.js"), t.push("includes/aviaBar.js")) : h(), 
                    t;
                }
            };
            (e => {
                let t = null;
                const n = () => null !== t ? Promise.resolve(t) : t = Object(a.a)({
                    onceTrackAviaBar: null
                }).then(e => {
                    let t = e.onceTrackAviaBar;
                    return "number" != typeof t ? (t = Math.random() < .1 ? 1 : 0, Object(c.a)({
                        onceTrackAviaBar: t
                    }).then(() => t)) : t;
                }).then(e => t = e), r = () => {
                    n().then(t => {
                        if (!t) return;
                        const n = {
                            t: "screenview",
                            cd: "init",
                            tid: "UA-70432435-10"
                        };
                        e.wrapBaseStatInfo(n), e.quickTrack(n);
                    });
                };
                n().then(t => {
                    t ? l && l.debug("track enabled") : (l && l.debug("track disabled"), e.events.off("sendScreenView", r));
                }), e.events.on("sendScreenView", r);
            })(e), r.a.storage.onChanged.addListener((e, t) => {
                "local" === t && e.aviaBarEnabled && (l && l.debug("aviaBarEnabled changed"), h());
            }), e.loader.when("prepare", () => {
                h();
            });
        }));
    };
} ]);