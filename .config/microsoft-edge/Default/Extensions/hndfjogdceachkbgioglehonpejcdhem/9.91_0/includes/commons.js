!window.savefromContentScriptWebpackJsonp && (window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || []).push([ [ 0 ], [ function(e, t, n) {
    "use strict";
    var o = class {
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
    }, r = n(6);
    const i = Object(r.a)("mono");
    var a = class {
        constructor() {
            this.onDestroy = new o, this._lastErrorFired = !1, this._lastError = null;
        }
        get lastError() {
            return this._lastErrorFired = !0, this._lastError;
        }
        set lastError(e) {
            this._lastErrorFired = !e, this._lastError = e;
        }
        clearLastError() {
            this._lastError && !this._lastErrorFired && i.error("Unhandled mono.lastError error:", this.lastError), 
            this._lastError = null;
        }
        unimplemented() {
            throw new Error("Unimplemented");
        }
        destroy() {
            this.onDestroy.dispatch();
        }
    };
    const s = n(50);
    var l = e => class extends e {
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
                            const t = s(e.err);
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
    var c = e => class extends e {};
    var u = e => class extends(c(e)){};
    class d extends(u(l(a))){
        initMessages() {
            this.sendMessage = this.transport.sendMessage.bind(this.transport), this.onMessage = {
                addListener: this.transport.addListener.bind(this.transport),
                hasListener: this.transport.hasListener.bind(this.transport),
                hasListeners: this.transport.hasListeners.bind(this.transport),
                removeListener: this.transport.removeListener.bind(this.transport)
            };
        }
    }
    var p = d;
    var A = class {
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
    class h extends(g(p)){
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
                sendMessage: (e, t) => {
                    t ? chrome.runtime.sendMessage(e, e => {
                        this.lastError = chrome.runtime.lastError, t(e), this.clearLastError();
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
            this.storage = new A(this);
        }
    }
    const m = new h;
    t.a = m;
}, function(e, t, n) {
    "use strict";
    var o = n(3);
    const r = {
        create: function(e, t) {
            let n, o;
            n = "object" != typeof e ? document.createElement(e) : e;
            for (let e in t) {
                const r = t[e];
                (o = i[e]) ? o(n, r) : n[e] = r;
            }
            return n;
        }
    }, i = {
        text: function(e, t) {
            e.textContent = t;
        },
        data: function(e, t) {
            for (let n in t) e.dataset[n] = t[n];
        },
        class: function(e, t) {
            if (Array.isArray(t)) for (let n = 0, o = t.length; n < o; n++) e.classList.add(t[n]); else e.setAttribute("class", t);
        },
        style: function(e, t) {
            if ("object" == typeof t) for (let n in t) {
                let o = n;
                "float" === o && (o = "cssFloat");
                const r = t[n];
                if (Array.isArray(r)) for (let t = 0, n = r.length; t < n; t++) e.style[o] = r[t]; else e.style[o] = r;
            } else e.setAttribute("style", t);
        },
        append: function(e, t) {
            Array.isArray(t) || (t = [ t ]);
            for (let n = 0, o = t.length; n < o; n++) {
                let o = t[n];
                (o || 0 === o) && ("object" != typeof o && (o = document.createTextNode(o)), e.appendChild(o));
            }
        },
        on: function(e, t) {
            "object" != typeof t[0] && (t = [ t ]);
            for (let n = 0, r = t.length; n < r; n++) {
                const r = t[n];
                Array.isArray(r) && o.a.on.apply(o.a, [ e ].concat(r));
            }
        },
        one: function(e, t) {
            "object" != typeof t[0] && (t = [ t ]);
            for (let n = 0, r = t.length; n < r; n++) {
                const r = t[n];
                Array.isArray(r) && o.a.one.apply(o.a, [ e ].concat(r));
            }
        },
        onCreate: function(e, t) {
            t.call(e, e);
        },
        attr: function(e, t) {
            let n, o;
            for (n in t) o = t[n], e.setAttribute(n, o);
        }
    };
    t.a = r;
}, function(e, t, n) {
    "use strict";
    n.d(t, "d", (function() {
        return ee;
    })), n.d(t, "b", (function() {
        return P;
    })), n.d(t, "a", (function() {
        return $;
    }));
    var o, r, i, a = n(4), s = 0, l = [], c = a.h.__b, u = a.h.__r, d = a.h.diffed, p = a.h.__c, A = a.h.unmount;
    function f(e, t) {
        a.h.__h && a.h.__h(r, e, s || t), s = 0;
        var n = r.__H || (r.__H = {
            __: [],
            __h: []
        });
        return e >= n.__.length && n.__.push({}), n.__[e];
    }
    function g(e) {
        return s = 1, h(I, e);
    }
    function h(e, t, n) {
        var i = f(o++, 2);
        return i.t = e, i.__c || (i.__ = [ n ? n(t) : I(void 0, t), function(e) {
            var t = i.t(i.__[0], e);
            i.__[0] !== t && (i.__ = [ t, i.__[1] ], i.__c.setState({}));
        } ], i.__c = r), i.__;
    }
    function m(e, t) {
        var n = f(o++, 4);
        !a.h.__s && w(n.__H, t) && (n.__ = e, n.__H = t, r.__h.push(n));
    }
    function v(e, t) {
        var n = f(o++, 7);
        return w(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
    }
    function b() {
        l.forEach((function(e) {
            if (e.__P) try {
                e.__H.__h.forEach(C), e.__H.__h.forEach(x), e.__H.__h = [];
            } catch (t) {
                e.__H.__h = [], a.h.__e(t, e.__v);
            }
        })), l = [];
    }
    a.h.__b = function(e) {
        r = null, c && c(e);
    }, a.h.__r = function(e) {
        u && u(e), o = 0;
        var t = (r = e.__c).__H;
        t && (t.__h.forEach(C), t.__h.forEach(x), t.__h = []);
    }, a.h.diffed = function(e) {
        d && d(e);
        var t = e.__c;
        t && t.__H && t.__H.__h.length && (1 !== l.push(t) && i === a.h.requestAnimationFrame || ((i = a.h.requestAnimationFrame) || function(e) {
            var t, n = function() {
                clearTimeout(o), y && cancelAnimationFrame(t), setTimeout(e);
            }, o = setTimeout(n, 100);
            y && (t = requestAnimationFrame(n));
        })(b)), r = void 0;
    }, a.h.__c = function(e, t) {
        t.some((function(e) {
            try {
                e.__h.forEach(C), e.__h = e.__h.filter((function(e) {
                    return !e.__ || x(e);
                }));
            } catch (n) {
                t.some((function(e) {
                    e.__h && (e.__h = []);
                })), t = [], a.h.__e(n, e.__v);
            }
        })), p && p(e, t);
    }, a.h.unmount = function(e) {
        A && A(e);
        var t = e.__c;
        if (t && t.__H) try {
            t.__H.__.forEach(C);
        } catch (e) {
            a.h.__e(e, t.__v);
        }
    };
    var y = "function" == typeof requestAnimationFrame;
    function C(e) {
        var t = r;
        "function" == typeof e.__c && e.__c(), r = t;
    }
    function x(e) {
        var t = r;
        e.__c = e.__(), r = t;
    }
    function w(e, t) {
        return !e || e.length !== t.length || t.some((function(t, n) {
            return t !== e[n];
        }));
    }
    function I(e, t) {
        return "function" == typeof t ? t(e) : t;
    }
    function _(e, t) {
        for (var n in t) e[n] = t[n];
        return e;
    }
    function k(e, t) {
        for (var n in e) if ("__source" !== n && !(n in t)) return !0;
        for (var o in t) if ("__source" !== o && e[o] !== t[o]) return !0;
        return !1;
    }
    function E(e) {
        this.props = e;
    }
    (E.prototype = new a.a).isPureReactComponent = !0, E.prototype.shouldComponentUpdate = function(e, t) {
        return k(this.props, e) || k(this.state, t);
    };
    var M = a.h.__b;
    a.h.__b = function(e) {
        e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), M && M(e);
    };
    var S = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
    var O = function(e, t) {
        return null == e ? null : Object(a.j)(Object(a.j)(e).map(t));
    }, z = {
        map: O,
        forEach: O,
        count: function(e) {
            return e ? Object(a.j)(e).length : 0;
        },
        only: function(e) {
            var t = Object(a.j)(e);
            if (1 !== t.length) throw "Children.only";
            return t[0];
        },
        toArray: a.j
    }, N = a.h.__e;
    function D() {
        this.__u = 0, this.t = null, this.__b = null;
    }
    function j(e) {
        var t = e.__.__c;
        return t && t.__e && t.__e(e);
    }
    function T() {
        this.u = null, this.o = null;
    }
    a.h.__e = function(e, t, n) {
        if (e.then) for (var o, r = t; r = r.__; ) if ((o = r.__c) && o.__c) return null == t.__e && (t.__e = n.__e, 
        t.__k = n.__k), o.__c(e, t);
        N(e, t, n);
    }, (D.prototype = new a.a).__c = function(e, t) {
        var n = t.__c, o = this;
        null == o.t && (o.t = []), o.t.push(n);
        var r = j(o.__v), i = !1, a = function() {
            i || (i = !0, n.componentWillUnmount = n.__c, r ? r(s) : s());
        };
        n.__c = n.componentWillUnmount, n.componentWillUnmount = function() {
            a(), n.__c && n.__c();
        };
        var s = function() {
            if (!--o.__u) {
                if (o.state.__e) {
                    var e = o.state.__e;
                    o.__v.__k[0] = function e(t, n, o) {
                        return t && (t.__v = null, t.__k = t.__k && t.__k.map((function(t) {
                            return e(t, n, o);
                        })), t.__c && t.__c.__P === n && (t.__e && o.insertBefore(t.__e, t.__d), t.__c.__e = !0, 
                        t.__c.__P = o)), t;
                    }(e, e.__c.__P, e.__c.__O);
                }
                var t;
                for (o.setState({
                    __e: o.__b = null
                }); t = o.t.pop(); ) t.forceUpdate();
            }
        }, l = !0 === t.__h;
        o.__u++ || l || o.setState({
            __e: o.__b = o.__v.__k[0]
        }), e.then(a, a);
    }, D.prototype.componentWillUnmount = function() {
        this.t = [];
    }, D.prototype.render = function(e, t) {
        if (this.__b) {
            if (this.__v.__k) {
                var n = document.createElement("div"), o = this.__v.__k[0].__c;
                this.__v.__k[0] = function e(t, n, o) {
                    return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach((function(e) {
                        "function" == typeof e.__c && e.__c();
                    })), t.__c.__H = null), null != (t = _({}, t)).__c && (t.__c.__P === o && (t.__c.__P = n), 
                    t.__c = null), t.__k = t.__k && t.__k.map((function(t) {
                        return e(t, n, o);
                    }))), t;
                }(this.__b, n, o.__O = o.__P);
            }
            this.__b = null;
        }
        var r = t.__e && Object(a.e)(a.b, null, e.fallback);
        return r && (r.__h = null), [ Object(a.e)(a.b, null, t.__e ? null : e.children), r ];
    };
    var L = function(e, t, n) {
        if (++n[1] === n[0] && e.o.delete(t), e.props.revealOrder && ("t" !== e.props.revealOrder[0] || !e.o.size)) for (n = e.u; n; ) {
            for (;n.length > 3; ) n.pop()();
            if (n[1] < n[0]) break;
            e.u = n = n[2];
        }
    };
    function R(e) {
        return this.getChildContext = function() {
            return e.context;
        }, e.children;
    }
    function B(e) {
        var t = this, n = e.i;
        t.componentWillUnmount = function() {
            Object(a.i)(null, t.l), t.l = null, t.i = null;
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
        }), Object(a.i)(Object(a.e)(R, {
            context: t.context
        }, e.__v), t.l)) : t.l && t.componentWillUnmount();
    }
    function P(e, t) {
        return Object(a.e)(B, {
            __v: e,
            i: t
        });
    }
    (T.prototype = new a.a).__e = function(e) {
        var t = this, n = j(t.__v), o = t.o.get(e);
        return o[0]++, function(r) {
            var i = function() {
                t.props.revealOrder ? (o.push(r), L(t, e, o)) : r();
            };
            n ? n(i) : i();
        };
    }, T.prototype.render = function(e) {
        this.u = null, this.o = new Map;
        var t = Object(a.j)(e.children);
        e.revealOrder && "b" === e.revealOrder[0] && t.reverse();
        for (var n = t.length; n--; ) this.o.set(t[n], this.u = [ 1, 0, this.u ]);
        return e.children;
    }, T.prototype.componentDidUpdate = T.prototype.componentDidMount = function() {
        var e = this;
        this.o.forEach((function(t, n) {
            L(e, n, t);
        }));
    };
    var F = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, q = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, W = function(e) {
        return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i).test(e);
    };
    a.a.prototype.isReactComponent = {}, [ "componentWillMount", "componentWillReceiveProps", "componentWillUpdate" ].forEach((function(e) {
        Object.defineProperty(a.a.prototype, e, {
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
    var Q = a.h.event;
    function H() {}
    function G() {
        return this.cancelBubble;
    }
    function V() {
        return this.defaultPrevented;
    }
    a.h.event = function(e) {
        return Q && (e = Q(e)), e.persist = H, e.isPropagationStopped = G, e.isDefaultPrevented = V, 
        e.nativeEvent = e;
    };
    var U, Y = {
        configurable: !0,
        get: function() {
            return this.class;
        }
    }, Z = a.h.vnode;
    a.h.vnode = function(e) {
        var t = e.type, n = e.props, o = n;
        if ("string" == typeof t) {
            for (var r in o = {}, n) {
                var i = n[r];
                "value" === r && "defaultValue" in n && null == i || ("defaultValue" === r && "value" in n && null == n.value ? r = "value" : "download" === r && !0 === i ? i = "" : /ondoubleclick/i.test(r) ? r = "ondblclick" : /^onchange(textarea|input)/i.test(r + t) && !W(n.type) ? r = "oninput" : /^on(Ani|Tra|Tou|BeforeInp)/.test(r) ? r = r.toLowerCase() : q.test(r) ? r = r.replace(/[A-Z0-9]/, "-$&").toLowerCase() : null === i && (i = void 0), 
                o[r] = i);
            }
            "select" == t && o.multiple && Array.isArray(o.value) && (o.value = Object(a.j)(n.children).forEach((function(e) {
                e.props.selected = -1 != o.value.indexOf(e.props.value);
            }))), "select" == t && null != o.defaultValue && (o.value = Object(a.j)(n.children).forEach((function(e) {
                e.props.selected = o.multiple ? -1 != o.defaultValue.indexOf(e.props.value) : o.defaultValue == e.props.value;
            }))), e.props = o;
        }
        t && n.class != n.className && (Y.enumerable = "className" in n, null != n.className && (o.class = n.className), 
        Object.defineProperty(o, "className", Y)), e.$$typeof = F, Z && Z(e);
    };
    var J = a.h.__r;
    a.h.__r = function(e) {
        J && J(e), U = e.__c;
    };
    var X = {
        ReactCurrentDispatcher: {
            current: {
                readContext: function(e) {
                    return U.__n[e.__c].props.value;
                }
            }
        }
    };
    "object" == typeof performance && "function" == typeof performance.now && performance.now.bind(performance);
    function K(e) {
        return !!e && e.$$typeof === F;
    }
    function $(e) {
        return K(e) ? a.c.apply(null, arguments) : e;
    }
    function ee(e) {
        return !!e.__k && (Object(a.i)(null, e), !0);
    }
    a.b, t.c = {
        useState: g,
        useReducer: h,
        useEffect: function(e, t) {
            var n = f(o++, 3);
            !a.h.__s && w(n.__H, t) && (n.__ = e, n.__H = t, r.__H.__h.push(n));
        },
        useLayoutEffect: m,
        useRef: function(e) {
            return s = 5, v((function() {
                return {
                    current: e
                };
            }), []);
        },
        useImperativeHandle: function(e, t, n) {
            s = 6, m((function() {
                "function" == typeof e ? e(t()) : e && (e.current = t());
            }), null == n ? n : n.concat(e));
        },
        useMemo: v,
        useCallback: function(e, t) {
            return s = 8, v((function() {
                return e;
            }), t);
        },
        useContext: function(e) {
            var t = r.context[e.__c], n = f(o++, 9);
            return n.__c = e, t ? (null == n.__ && (n.__ = !0, t.sub(r)), t.props.value) : e.__;
        },
        useDebugValue: function(e, t) {
            a.h.useDebugValue && a.h.useDebugValue(t ? t(e) : e);
        },
        version: "16.8.0",
        Children: z,
        render: function(e, t, n) {
            return null == t.__k && (t.textContent = ""), Object(a.i)(e, t), "function" == typeof n && n(), 
            e ? e.__c : null;
        },
        hydrate: function(e, t, n) {
            return Object(a.g)(e, t), "function" == typeof n && n(), e ? e.__c : null;
        },
        unmountComponentAtNode: ee,
        createPortal: P,
        createElement: a.e,
        createContext: a.d,
        createFactory: function(e) {
            return a.e.bind(null, e);
        },
        cloneElement: $,
        createRef: a.f,
        Fragment: a.b,
        isValidElement: K,
        findDOMNode: function(e) {
            return e && (e.base || 1 === e.nodeType && e) || null;
        },
        Component: a.a,
        PureComponent: E,
        memo: function(e, t) {
            function n(e) {
                var n = this.props.ref, o = n == e.ref;
                return !o && n && (n.call ? n(null) : n.current = null), t ? !t(this.props, e) || !o : k(this.props, e);
            }
            function o(t) {
                return this.shouldComponentUpdate = n, Object(a.e)(e, t);
            }
            return o.displayName = "Memo(" + (e.displayName || e.name) + ")", o.prototype.isReactComponent = !0, 
            o.__f = !0, o;
        },
        forwardRef: function(e) {
            function t(t, n) {
                var o = _({}, t);
                return delete o.ref, e(o, (n = t.ref || n) && ("object" != typeof n || "current" in n) ? n : null);
            }
            return t.$$typeof = S, t.render = t, t.prototype.isReactComponent = t.__f = !0, 
            t.displayName = "ForwardRef(" + (e.displayName || e.name) + ")", t;
        },
        unstable_batchedUpdates: function(e, t) {
            return e(t);
        },
        StrictMode: a.b,
        Suspense: D,
        SuspenseList: T,
        lazy: function(e) {
            var t, n, o;
            function r(r) {
                if (t || (t = e()).then((function(e) {
                    n = e.default || e;
                }), (function(e) {
                    o = e;
                })), o) throw o;
                if (!n) throw t;
                return Object(a.e)(n, r);
            }
            return r.displayName = "Lazy", r.__f = !0, r;
        },
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: X
    };
}, function(e, t, n) {
    "use strict";
    const o = {
        on: function(e, t, n, o) {
            e.addEventListener(t, n, o);
        },
        off: function(e, t, n, o) {
            e.removeEventListener(t, n, o);
        },
        one: function(e, t, n, r) {
            const i = [ "oneFn", t, !!r ].join("_");
            let a = n[i];
            a || (n[i] = a = function(e) {
                o.off(this, t, a, r), n.apply(this, arguments);
            }), o.on(e, t, a, r), e = null;
        }
    }, r = "sf-removed-" + Math.floor(1e6 * Math.random()), i = "sf-notify-on-remove-" + Math.floor(1e6 * Math.random());
    o.onRemoveEventName = r, o.onRemoveClassName = i, o.onRemoveListener = function(e) {
        o.trigger(e, r, {
            cancelable: !0,
            bubbles: !1
        });
    }, o.onRemoveEvent = (e, t) => {
        e.classList.add(i), e.addEventListener(r, t);
    }, o.offRemoveEvent = function(e, t) {
        e.removeEventListener(o.onRemoveEventName, t);
    }, o.trigger = function(e, t, n) {
        void 0 === n && (n = {}), void 0 === n.bubbles && (n.bubbles = !1), void 0 === n.cancelable && (n.cancelable = !1);
        let o = null;
        o = "function" == typeof MouseEvent && -1 !== [ "click" ].indexOf(t) ? new MouseEvent(t, n) : new CustomEvent(t, n), 
        e.dispatchEvent(o);
    }, t.a = o;
}, function(e, t, n) {
    "use strict";
    n.d(t, "i", (function() {
        return L;
    })), n.d(t, "g", (function() {
        return R;
    })), n.d(t, "e", (function() {
        return A;
    })), n.d(t, "b", (function() {
        return h;
    })), n.d(t, "f", (function() {
        return g;
    })), n.d(t, "a", (function() {
        return m;
    })), n.d(t, "c", (function() {
        return B;
    })), n.d(t, "d", (function() {
        return P;
    })), n.d(t, "j", (function() {
        return I;
    })), n.d(t, "h", (function() {
        return o;
    }));
    var o, r, i, a, s, l = {}, c = [], u = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
    function d(e, t) {
        for (var n in t) e[n] = t[n];
        return e;
    }
    function p(e) {
        var t = e.parentNode;
        t && t.removeChild(e);
    }
    function A(e, t, n) {
        var o, r, i, a = arguments, s = {};
        for (i in t) "key" == i ? o = t[i] : "ref" == i ? r = t[i] : s[i] = t[i];
        if (arguments.length > 3) for (n = [ n ], i = 3; i < arguments.length; i++) n.push(a[i]);
        if (null != n && (s.children = n), "function" == typeof e && null != e.defaultProps) for (i in e.defaultProps) void 0 === s[i] && (s[i] = e.defaultProps[i]);
        return f(e, s, o, r, null);
    }
    function f(e, t, n, r, i) {
        var a = {
            type: e,
            props: t,
            key: n,
            ref: r,
            __k: null,
            __: null,
            __b: 0,
            __e: null,
            __d: void 0,
            __c: null,
            __h: null,
            constructor: void 0,
            __v: null == i ? ++o.__v : i
        };
        return null != o.vnode && o.vnode(a), a;
    }
    function g() {
        return {
            current: null
        };
    }
    function h(e) {
        return e.children;
    }
    function m(e, t) {
        this.props = e, this.context = t;
    }
    function v(e, t) {
        if (null == t) return e.__ ? v(e.__, e.__.__k.indexOf(e) + 1) : null;
        for (var n; t < e.__k.length; t++) if (null != (n = e.__k[t]) && null != n.__e) return n.__e;
        return "function" == typeof e.type ? v(e) : null;
    }
    function b(e) {
        var t, n;
        if (null != (e = e.__) && null != e.__c) {
            for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++) if (null != (n = e.__k[t]) && null != n.__e) {
                e.__e = e.__c.base = n.__e;
                break;
            }
            return b(e);
        }
    }
    function y(e) {
        (!e.__d && (e.__d = !0) && r.push(e) && !C.__r++ || a !== o.debounceRendering) && ((a = o.debounceRendering) || i)(C);
    }
    function C() {
        for (var e; C.__r = r.length; ) e = r.sort((function(e, t) {
            return e.__v.__b - t.__v.__b;
        })), r = [], e.some((function(e) {
            var t, n, o, r, i, a;
            e.__d && (i = (r = (t = e).__v).__e, (a = t.__P) && (n = [], (o = d({}, r)).__v = r.__v + 1, 
            O(a, r, o, t.__n, void 0 !== a.ownerSVGElement, null != r.__h ? [ i ] : null, n, null == i ? v(r) : i, r.__h), 
            z(n, r), r.__e != i && b(r)));
        }));
    }
    function x(e, t, n, o, r, i, a, s, u, d) {
        var p, A, g, m, b, y, C, x = o && o.__k || c, I = x.length;
        for (n.__k = [], p = 0; p < t.length; p++) if (null != (m = n.__k[p] = null == (m = t[p]) || "boolean" == typeof m ? null : "string" == typeof m || "number" == typeof m ? f(null, m, null, null, m) : Array.isArray(m) ? f(h, {
            children: m
        }, null, null, null) : m.__b > 0 ? f(m.type, m.props, m.key, null, m.__v) : m)) {
            if (m.__ = n, m.__b = n.__b + 1, null === (g = x[p]) || g && m.key == g.key && m.type === g.type) x[p] = void 0; else for (A = 0; A < I; A++) {
                if ((g = x[A]) && m.key == g.key && m.type === g.type) {
                    x[A] = void 0;
                    break;
                }
                g = null;
            }
            O(e, m, g = g || l, r, i, a, s, u, d), b = m.__e, (A = m.ref) && g.ref != A && (C || (C = []), 
            g.ref && C.push(g.ref, null, m), C.push(A, m.__c || b, m)), null != b ? (null == y && (y = b), 
            "function" == typeof m.type && null != m.__k && m.__k === g.__k ? m.__d = u = w(m, u, e) : u = _(e, m, g, x, b, u), 
            d || "option" !== n.type ? "function" == typeof n.type && (n.__d = u) : e.value = "") : u && g.__e == u && u.parentNode != e && (u = v(g));
        }
        for (n.__e = y, p = I; p--; ) null != x[p] && ("function" == typeof n.type && null != x[p].__e && x[p].__e == n.__d && (n.__d = v(o, p + 1)), 
        j(x[p], x[p]));
        if (C) for (p = 0; p < C.length; p++) D(C[p], C[++p], C[++p]);
    }
    function w(e, t, n) {
        var o, r;
        for (o = 0; o < e.__k.length; o++) (r = e.__k[o]) && (r.__ = e, t = "function" == typeof r.type ? w(r, t, n) : _(n, r, r, e.__k, r.__e, t));
        return t;
    }
    function I(e, t) {
        return t = t || [], null == e || "boolean" == typeof e || (Array.isArray(e) ? e.some((function(e) {
            I(e, t);
        })) : t.push(e)), t;
    }
    function _(e, t, n, o, r, i) {
        var a, s, l;
        if (void 0 !== t.__d) a = t.__d, t.__d = void 0; else if (null == n || r != i || null == r.parentNode) e: if (null == i || i.parentNode !== e) e.appendChild(r), 
        a = null; else {
            for (s = i, l = 0; (s = s.nextSibling) && l < o.length; l += 2) if (s == r) break e;
            e.insertBefore(r, i), a = i;
        }
        return void 0 !== a ? a : r.nextSibling;
    }
    function k(e, t, n) {
        "-" === t[0] ? e.setProperty(t, n) : e[t] = null == n ? "" : "number" != typeof n || u.test(t) ? n : n + "px";
    }
    function E(e, t, n, o, r) {
        var i;
        e: if ("style" === t) if ("string" == typeof n) e.style.cssText = n; else {
            if ("string" == typeof o && (e.style.cssText = o = ""), o) for (t in o) n && t in n || k(e.style, t, "");
            if (n) for (t in n) o && n[t] === o[t] || k(e.style, t, n[t]);
        } else if ("o" === t[0] && "n" === t[1]) i = t !== (t = t.replace(/Capture$/, "")), 
        t = t.toLowerCase() in e ? t.toLowerCase().slice(2) : t.slice(2), e.l || (e.l = {}), 
        e.l[t + i] = n, n ? o || e.addEventListener(t, i ? S : M, i) : e.removeEventListener(t, i ? S : M, i); else if ("dangerouslySetInnerHTML" !== t) {
            if (r) t = t.replace(/xlink[H:h]/, "h").replace(/sName$/, "s"); else if ("href" !== t && "list" !== t && "form" !== t && "download" !== t && t in e) try {
                e[t] = null == n ? "" : n;
                break e;
            } catch (e) {}
            "function" == typeof n || (null != n && (!1 !== n || "a" === t[0] && "r" === t[1]) ? e.setAttribute(t, n) : e.removeAttribute(t));
        }
    }
    function M(e) {
        this.l[e.type + !1](o.event ? o.event(e) : e);
    }
    function S(e) {
        this.l[e.type + !0](o.event ? o.event(e) : e);
    }
    function O(e, t, n, r, i, a, s, l, c) {
        var u, p, A, f, g, v, b, y, C, w, I, _ = t.type;
        if (void 0 !== t.constructor) return null;
        null != n.__h && (c = n.__h, l = t.__e = n.__e, t.__h = null, a = [ l ]), (u = o.__b) && u(t);
        try {
            e: if ("function" == typeof _) {
                if (y = t.props, C = (u = _.contextType) && r[u.__c], w = u ? C ? C.props.value : u.__ : r, 
                n.__c ? b = (p = t.__c = n.__c).__ = p.__E : ("prototype" in _ && _.prototype.render ? t.__c = p = new _(y, w) : (t.__c = p = new m(y, w), 
                p.constructor = _, p.render = T), C && C.sub(p), p.props = y, p.state || (p.state = {}), 
                p.context = w, p.__n = r, A = p.__d = !0, p.__h = []), null == p.__s && (p.__s = p.state), 
                null != _.getDerivedStateFromProps && (p.__s == p.state && (p.__s = d({}, p.__s)), 
                d(p.__s, _.getDerivedStateFromProps(y, p.__s))), f = p.props, g = p.state, A) null == _.getDerivedStateFromProps && null != p.componentWillMount && p.componentWillMount(), 
                null != p.componentDidMount && p.__h.push(p.componentDidMount); else {
                    if (null == _.getDerivedStateFromProps && y !== f && null != p.componentWillReceiveProps && p.componentWillReceiveProps(y, w), 
                    !p.__e && null != p.shouldComponentUpdate && !1 === p.shouldComponentUpdate(y, p.__s, w) || t.__v === n.__v) {
                        p.props = y, p.state = p.__s, t.__v !== n.__v && (p.__d = !1), p.__v = t, t.__e = n.__e, 
                        t.__k = n.__k, p.__h.length && s.push(p);
                        break e;
                    }
                    null != p.componentWillUpdate && p.componentWillUpdate(y, p.__s, w), null != p.componentDidUpdate && p.__h.push((function() {
                        p.componentDidUpdate(f, g, v);
                    }));
                }
                p.context = w, p.props = y, p.state = p.__s, (u = o.__r) && u(t), p.__d = !1, p.__v = t, 
                p.__P = e, u = p.render(p.props, p.state, p.context), p.state = p.__s, null != p.getChildContext && (r = d(d({}, r), p.getChildContext())), 
                A || null == p.getSnapshotBeforeUpdate || (v = p.getSnapshotBeforeUpdate(f, g)), 
                I = null != u && u.type === h && null == u.key ? u.props.children : u, x(e, Array.isArray(I) ? I : [ I ], t, n, r, i, a, s, l, c), 
                p.base = t.__e, t.__h = null, p.__h.length && s.push(p), b && (p.__E = p.__ = null), 
                p.__e = !1;
            } else null == a && t.__v === n.__v ? (t.__k = n.__k, t.__e = n.__e) : t.__e = N(n.__e, t, n, r, i, a, s, c);
            (u = o.diffed) && u(t);
        } catch (e) {
            t.__v = null, (c || null != a) && (t.__e = l, t.__h = !!c, a[a.indexOf(l)] = null), 
            o.__e(e, t, n);
        }
    }
    function z(e, t) {
        o.__c && o.__c(t, e), e.some((function(t) {
            try {
                e = t.__h, t.__h = [], e.some((function(e) {
                    e.call(t);
                }));
            } catch (e) {
                o.__e(e, t.__v);
            }
        }));
    }
    function N(e, t, n, o, r, i, a, s) {
        var u, d, A, f, g = n.props, h = t.props, m = t.type, v = 0;
        if ("svg" === m && (r = !0), null != i) for (;v < i.length; v++) if ((u = i[v]) && (u === e || (m ? u.localName == m : 3 == u.nodeType))) {
            e = u, i[v] = null;
            break;
        }
        if (null == e) {
            if (null === m) return document.createTextNode(h);
            e = r ? document.createElementNS("http://www.w3.org/2000/svg", m) : document.createElement(m, h.is && h), 
            i = null, s = !1;
        }
        if (null === m) g === h || s && e.data === h || (e.data = h); else {
            if (i = i && c.slice.call(e.childNodes), d = (g = n.props || l).dangerouslySetInnerHTML, 
            A = h.dangerouslySetInnerHTML, !s) {
                if (null != i) for (g = {}, f = 0; f < e.attributes.length; f++) g[e.attributes[f].name] = e.attributes[f].value;
                (A || d) && (A && (d && A.__html == d.__html || A.__html === e.innerHTML) || (e.innerHTML = A && A.__html || ""));
            }
            if (function(e, t, n, o, r) {
                var i;
                for (i in n) "children" === i || "key" === i || i in t || E(e, i, null, n[i], o);
                for (i in t) r && "function" != typeof t[i] || "children" === i || "key" === i || "value" === i || "checked" === i || n[i] === t[i] || E(e, i, t[i], n[i], o);
            }(e, h, g, r, s), A) t.__k = []; else if (v = t.props.children, x(e, Array.isArray(v) ? v : [ v ], t, n, o, r && "foreignObject" !== m, i, a, e.firstChild, s), 
            null != i) for (v = i.length; v--; ) null != i[v] && p(i[v]);
            s || ("value" in h && void 0 !== (v = h.value) && (v !== e.value || "progress" === m && !v) && E(e, "value", v, g.value, !1), 
            "checked" in h && void 0 !== (v = h.checked) && v !== e.checked && E(e, "checked", v, g.checked, !1));
        }
        return e;
    }
    function D(e, t, n) {
        try {
            "function" == typeof e ? e(t) : e.current = t;
        } catch (e) {
            o.__e(e, n);
        }
    }
    function j(e, t, n) {
        var r, i, a;
        if (o.unmount && o.unmount(e), (r = e.ref) && (r.current && r.current !== e.__e || D(r, null, t)), 
        n || "function" == typeof e.type || (n = null != (i = e.__e)), e.__e = e.__d = void 0, 
        null != (r = e.__c)) {
            if (r.componentWillUnmount) try {
                r.componentWillUnmount();
            } catch (e) {
                o.__e(e, t);
            }
            r.base = r.__P = null;
        }
        if (r = e.__k) for (a = 0; a < r.length; a++) r[a] && j(r[a], t, n);
        null != i && p(i);
    }
    function T(e, t, n) {
        return this.constructor(e, n);
    }
    function L(e, t, n) {
        var r, i, a;
        o.__ && o.__(e, t), i = (r = "function" == typeof n) ? null : n && n.__k || t.__k, 
        a = [], O(t, e = (!r && n || t).__k = A(h, null, [ e ]), i || l, l, void 0 !== t.ownerSVGElement, !r && n ? [ n ] : i ? null : t.firstChild ? c.slice.call(t.childNodes) : null, a, !r && n ? n : i ? i.__e : t.firstChild, r), 
        z(a, e);
    }
    function R(e, t) {
        L(e, t, R);
    }
    function B(e, t, n) {
        var o, r, i, a = arguments, s = d({}, e.props);
        for (i in t) "key" == i ? o = t[i] : "ref" == i ? r = t[i] : s[i] = t[i];
        if (arguments.length > 3) for (n = [ n ], i = 3; i < arguments.length; i++) n.push(a[i]);
        return null != n && (s.children = n), f(e.type, s, o || e.key, r || e.ref, null);
    }
    function P(e, t) {
        var n = {
            __c: t = "__cC" + s++,
            __: e,
            Consumer: function(e, t) {
                return e.children(t);
            },
            Provider: function(e) {
                var n, o;
                return this.getChildContext || (n = [], (o = {})[t] = this, this.getChildContext = function() {
                    return o;
                }, this.shouldComponentUpdate = function(e) {
                    this.props.value !== e.value && n.some(y);
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
    }
    o = {
        __e: function(e, t) {
            for (var n, o, r; t = t.__; ) if ((n = t.__c) && !n.__) try {
                if ((o = n.constructor) && null != o.getDerivedStateFromError && (n.setState(o.getDerivedStateFromError(e)), 
                r = n.__d), null != n.componentDidCatch && (n.componentDidCatch(e), r = n.__d), 
                r) return n.__E = n;
            } catch (t) {
                e = t;
            }
            throw e;
        },
        __v: 0
    }, m.prototype.setState = function(e, t) {
        var n;
        n = null != this.__s && this.__s !== this.state ? this.__s : this.__s = d({}, this.state), 
        "function" == typeof e && (e = e(d({}, n), this.props)), e && d(n, e), null != e && this.__v && (t && this.__h.push(t), 
        y(this));
    }, m.prototype.forceUpdate = function(e) {
        this.__v && (this.__e = !0, e && this.__h.push(e), y(this));
    }, m.prototype.render = h, r = [], i = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, 
    C.__r = 0, s = 0;
}, function(e, t, n) {
    "use strict";
    var o = n(51);
    const r = {
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
                let o = null;
                if ("#" === n[0]) return o = parseInt(n.substr(1)), isNaN(o) ? "" : String.fromCharCode(o);
                let r = t.specialCharsList[0].indexOf(n);
                return -1 !== r ? (o = t.specialCharsList[1][r], String.fromCharCode(o)) : (r = t.specialChars.indexOf(n), 
                -1 !== r ? (o = r + 160, String.fromCharCode(o)) : "");
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
            e = Object(o.a)(e);
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
    t.a = r;
}, function(e, t, n) {
    "use strict";
    t.a = e => {
        let t = null;
        return t = () => {}, t.t = t.log = t.info = t.warn = t.error = t.debug = t, t;
    };
}, function(e, t, n) {
    "use strict";
    var o = n(0);
    t.a = function(e) {
        o.a.sendMessage({
            action: "sendMonitoring",
            obj: {
                category: e.category,
                event: e.event,
                subcategory: e.subcategory
            }
        });
    };
}, function(e, t, n) {
    "use strict";
    var o = n(33), r = n(45);
    const i = {
        addedNodes: "added",
        removedNodes: "removed"
    }, a = Object.keys(i);
    t.a = class {
        constructor(e) {
            this.target = e.target || document.body, this.options = e.options || {
                childList: !0,
                subtree: !0
            }, this.filterTarget = e.filterTarget || [], this.queries = e.queries, this.observer = null, 
            this.init();
        }
        init() {
            const e = Object(o.a)();
            this.observer = new e(e => {
                let t = null;
                for (;t = e.shift(); ) this._isAvailableTarget(t.target) && this._match(t);
            }), this.start();
        }
        start() {
            this._disconnect(), this._connect(), this.trigger(this.target);
        }
        trigger(e) {
            this._match({
                addedNodes: [ e ],
                removedNodes: []
            });
        }
        stop() {
            this._disconnect();
        }
        _match(e) {
            const t = this.queries;
            for (let n, o = 0; n = t[o]; o++) {
                const t = {
                    target: e.target,
                    added: [],
                    removed: []
                };
                for (let o, s = 0; o = a[s]; s++) {
                    const a = i[o];
                    if (void 0 !== n.is && n.is !== a) continue;
                    const s = t[a], l = e[o];
                    for (let e, t = 0; e = l[t]; t++) 1 === e.nodeType && (Object(r.a)(e, n.css) ? s.push(e) : s.push.apply(s, e.querySelectorAll(n.css)));
                }
                (t.added.length || t.removed.length) && n.callback(t);
            }
        }
        _isAvailableTarget(e) {
            const t = this.filterTarget;
            for (let n, o = 0; n = t[o]; o++) if (Object(r.a)(e, n.css)) return !1;
            return !0;
        }
        _connect() {
            this.observer.observe(this.target, this.options);
        }
        _disconnect() {
            this.observer.disconnect();
        }
        static isAvailable() {
            return !!Object(o.a)();
        }
    };
}, function(e, t, n) {
    "use strict";
    const o = (e, t) => {
        const n = [];
        Array.isArray(e) || (e = [ e ]), t && !Array.isArray(t) && (t = [ t ]);
        const r = function(e, t) {
            const n = [];
            for (let e in t) {
                const o = t[e];
                "cssFloat" === e && (e = "float");
                const r = e.replace(/([A-Z])/g, (function(e, t) {
                    return "-" + t.toLowerCase();
                }));
                n.push(r + ":" + o);
            }
            return n.length ? [ e.join(","), "{", n.join(";"), "}" ].join("") : "";
        }, i = function(e, n) {
            if (Array.isArray(n) || (n = [ n ]), t) {
                const o = [], r = e.join || "" === e.join ? e.join : " ";
                t.forEach((function(e) {
                    n.forEach((function(t) {
                        o.push(e + r + t);
                    }));
                })), n = o;
            }
            return n;
        };
        return e.forEach((function(e) {
            let a = null, s = e.media, l = e.selector, c = e.style, u = e.append;
            if (s && u) n.push([ s, "{", o(u, t), "}" ].join("")); else if (l || c) a = i(e, l), 
            n.push(r(a, c)), u && n.push(o(u, a)); else for (var d in e) -1 === [ "append", "join" ].indexOf(d) && (l = d, 
            c = e[d], u = c.append, u && delete c.append, a = i(e, l), n.push(r(a, c)), u && n.push(o(u, a)));
        })), n.join("");
    };
    t.a = o;
}, function(e, t, n) {
    "use strict";
    n.d(t, "b", (function() {
        return a;
    }));
    var o = n(0);
    const r = [], i = (e, t, n) => Promise.resolve().then(() => !n || n()).then(n => {
        n && (-1 === r.indexOf(e) && r.push(e), t());
    }), a = (e, t, n) => i(e, () => o.a.callFn("getPreferences").then(n => {
        t(e, {
            preferences: n
        });
    }), n);
    t.a = i;
}, function(e, t, n) {
    "use strict";
    var o = n(19), r = n(0);
    var i = function() {
        const e = arguments[0];
        for (let t = 1, n = arguments.length; t < n; t++) {
            const n = arguments[t];
            for (let t in n) void 0 !== n[t] && (delete e[t], e[t] = n[t]);
        }
        return e;
    };
    var a = function(e, t) {
        let n = null;
        return function() {
            const o = this, r = arguments;
            clearTimeout(n), n = setTimeout((function() {
                e.apply(o, r);
            }), t);
        };
    }, s = n(9), l = n(21), c = n(14), u = n(46), d = n(3);
    var p = {
        animation: "none 0s ease 0s 1 normal none running",
        backfaceVisibility: "visible",
        background: "transparent none repeat 0 0 / auto auto padding-box border-box scroll",
        border: "medium none currentColor",
        borderCollapse: "separate",
        borderImage: "none",
        borderRadius: "0",
        borderSpacing: "0",
        bottom: "auto",
        boxShadow: "none",
        boxSizing: "content-box",
        captionSide: "top",
        clear: "none",
        clip: "auto",
        color: "inherit",
        columns: "auto",
        columnCount: "auto",
        columnFill: "balance",
        columnGap: "normal",
        columnRule: "medium none currentColor",
        columnSpan: "1",
        columnWidth: "auto",
        content: "normal",
        counterIncrement: "none",
        counterReset: "none",
        cursor: "auto",
        direction: "ltr",
        display: "inline",
        emptyCells: "show",
        float: "none",
        font: "normal normal normal normal medium/normal inherit",
        height: "auto",
        hyphens: "none",
        left: "auto",
        letterSpacing: "normal",
        listStyle: "disc outside none",
        margin: "0",
        maxHeight: "none",
        maxWidth: "none",
        minHeight: "0",
        minWidth: "0",
        opacity: "1",
        orphans: "0",
        outline: "medium none invert",
        overflow: "visible",
        overflowX: "visible",
        overflowY: "visible",
        padding: "0",
        pageBreakAfter: "auto",
        pageBreakBefore: "auto",
        pageBreakInside: "auto",
        perspective: "none",
        perspectiveOrigin: "50% 50%",
        position: "static",
        right: "auto",
        tabSize: "8",
        tableLayout: "auto",
        textAlign: "inherit",
        textAlignLast: "auto",
        textDecoration: "none solid currentColor",
        textIndent: "0",
        textShadow: "none",
        textTransform: "none",
        top: "auto",
        transform: "none",
        transformOrigin: "50% 50% 0",
        transformStyle: "flat",
        transition: "none 0s ease 0s",
        unicodeBidi: "normal",
        verticalAlign: "baseline",
        visibility: "visible",
        whiteSpace: "normal",
        widows: "0",
        width: "auto",
        wordSpacing: "normal",
        zIndex: "auto",
        all: "initial"
    }, A = n(1), f = n(47), g = n(5), h = n(12), m = n(6), v = n(13), b = n(33), y = n(45), C = n(4), x = n(28), w = n(16), I = n(2), _ = n(25), k = n(60), E = n.n(k), M = n(53), S = n(31), O = n(34);
    const z = Object(m.a)("queueMuxer"), N = new O.a("Queue destroyed", "DESTROYED");
    var D = class {
        constructor(e, t) {
            this.onStartTask = e => {}, this.onStatus = (e, t) => {}, this.onProgress = (e, t) => {}, 
            this.onProgressStatus = e => {}, this.onError = e => {}, this.container = e, this.tasks = Object.assign([], t), 
            this._mediaMuxer = null, this.destroyed = !1;
        }
        start() {
            const e = this.tasks.shift();
            if (e && !this.destroyed) return this._runTask(e).then(...Object(S.a)(() => this.start()));
            if (this.destroyed) for (let e = 0; e <= this.tasks.length; e++) this.onError(N);
            return z.log("queue finished"), Promise.resolve();
        }
        destroy() {
            this.destroyed = !0, z.log("queue destroy"), this._muxerDestroy(), this.tasks = [];
        }
        _muxerDestroy() {
            this.destroyed || (this._mediaMuxer && this._mediaMuxer.destroy(), this._mediaMuxer = null);
        }
        _runTask(e) {
            return z.log("run task: ", e), this.onStartTask(e), this._mediaMuxer = new M.a(this.container), 
            this._mediaMuxer.onStatus = this.onStatus, this._mediaMuxer.onProgress = this.onProgress, 
            this._mediaMuxer.onProgressStatus = this.onProgressStatus, this._mediaMuxer.init().then(() => {
                if (this.destroyed) throw N;
                return "hls" === e.format ? this._mediaMuxer.hlsToMp3(e.sources, e.filename) : this._mediaMuxer.join(e.sources, e.filename);
            }).then(() => {
                if (this.destroyed) throw N;
                return this._mediaMuxer.download();
            }).then(...Object(S.a)(() => {
                this._muxerDestroy(), z.log("mediaMuxer destroy: ", e);
            })).catch(e => {
                z.error("Download error: ", e), this.onError(e);
            });
        }
    };
    const j = Object(m.a)("ConverterPopup"), T = I.c.memo(e => {
        let {files: t, onDone: n} = e;
        const o = I.c.useRef(), i = Object(_.a)(E.a), [a, s] = I.c.useState(0), [l, c] = I.c.useState(0), [u, d] = I.c.useState(0), [p, A] = I.c.useState("Prepare"), [f, g] = I.c.useState(null), [h, m] = I.c.useState(!1);
        return I.c.useEffect(() => {
            let e = !0;
            const r = new D(o.current, t);
            r.onStartTask = t => {
                e && (d(0), A("Prepare"), g(t), s(e => ++e));
            }, r.onProgress = t => {
                e && d(Math.trunc(100 * t));
            }, r.onError = t => {
                j.error("item download error: ", t), e && c(e => ++e);
            }, r.onProgressStatus = t => {
                e && A(t);
            };
            return r.start().then(...Object(S.a)(() => {
                e && (m(!0), n && n());
            })).catch(e => {
                j.error("queue error: ", e);
            }), () => {
                e = !1, r.destroy();
            };
        }, []), I.c.createElement("div", {
            ref: o
        }, f && !h && I.c.createElement("div", null, I.c.createElement("div", {
            className: i.information
        }, r.a.i18n.getMessage("someFilesNeedConverted")), I.c.createElement("div", {
            className: i.filesCount
        }, r.a.i18n.getMessage("files"), ": (", a, " / ", t.length, ")"), I.c.createElement(L, {
            styles: i,
            title: f.filename,
            status: p,
            progress: u
        })), h && I.c.createElement("div", null, I.c.createElement("div", {
            className: i.information
        }, r.a.i18n.getMessage("conversionCompleted")), I.c.createElement("div", null, r.a.i18n.getMessage("success"), ": ", t.length - l, ". ", r.a.i18n.getMessage("errors"), ": ", l, ".")));
    }), L = I.c.memo(e => {
        let {styles: t, title: n, status: o, progress: r} = e;
        const i = {
            width: r + "%"
        };
        return I.c.createElement("div", {
            className: t.progress
        }, I.c.createElement("div", {
            className: t.line,
            style: i
        }), I.c.createElement("div", {
            className: t.text
        }, I.c.createElement("div", {
            className: t.filename
        }, n), I.c.createElement("div", null, o)));
    });
    var R = T, B = n(61), P = n.n(B), F = n(43);
    const q = Object(m.a)("retryFn"), W = (e, t) => t().catch(n => {
        if (e.retries <= 1) throw q.error("The number of attempts has been exhausted", n.message), 
        n;
        return Object(F.a)(e.timeout).then(() => (q.warn("retry", n.message), W({
            timeout: e.timeout,
            retries: --e.retries
        }, t)));
    });
    var Q = W;
    const H = Object(m.a)("focusSwitcher");
    var G = function() {
        let e;
        const t = {
            waitFocus: null,
            removeListeners: null
        }, n = () => {
            H.info("focus out"), t.isFocus = !1;
        };
        return window.addEventListener("blur", n, {
            once: !0
        }), t.waitFocus = new Promise(t => {
            e = () => {
                H.info("focus in"), t();
            }, window.addEventListener("focus", e, {
                once: !0
            });
        }), t.removeListeners = () => {
            window.removeEventListener("focus", e), window.removeEventListener("blur", n);
        }, t;
    }, V = n(29);
    const U = Object(m.a)("televzrBridge");
    function Y() {
        U.log("Init Tz Bridge Server");
        const e = G(), t = document.createElement("iframe");
        return t.src = "televzr://bridgeInit", document.body.appendChild(t), Object(F.a)(1e3).then(() => !1 === document.hasFocus() ? e.waitFocus : null).then(() => {
            e.removeListeners(), t.remove();
        });
    }
    function Z(e) {
        return r.a.callFn("televzr.infoRequest", [ e ]).then(e => {
            let {app: t, user: n} = e;
            return U.log("Televzr Found", t, n), {
                app: t,
                user: n
            };
        }).catch(e => {
            if (U.error("Fetch televzr info error", e), e.code) throw e;
            throw new O.a("Televzr not found", "televzr_not_found");
        });
    }
    var J = {
        initBridgeServer: Y,
        checkAvailability: function() {
            const e = {
                timeout: 1e3,
                retries: 3
            }, t = e => {
                let {user: t} = e;
                return Object(V.a)([ "userInfo" ]).then(e => {
                    const n = e.userInfo;
                    if (!n) throw new O.a("Helper not auth", "code_not_authorized");
                    if (!t.isAuth || !t.isPremium && n.isPremium) return r.a.callFn("televzr.appAuth");
                });
            };
            return Z(2e3).then(t, n => {
                if ("televzr_not_found" === n.code) return Y().then(() => Q(e, () => Z(2e3))).then(t);
                throw n;
            });
        },
        startDownload: function(e, t, n) {
            return r.a.callFn("televzr.startDownloadRequest", [ e, t, n ]);
        },
        pingTelevzr: function() {
            const e = {
                timeout: 1e3,
                retries: 2
            };
            return Z(1e3).catch(t => {
                if ("televzr_not_found" === t.code) return Y().then(() => Q(e, () => Z(1e3)));
                throw t;
            });
        }
    }, X = n(20), K = n.n(X);
    const $ = (e, t) => I.c.useCallback(n => {
        let {label: o, action: i} = n;
        r.a.sendMessage({
            action: "track",
            t: "event",
            tid: e,
            ec: t,
            el: o || "",
            ea: i
        });
    }, []), ee = I.c.memo(e => {
        let {className: t, name: n} = e;
        return I.c.createElement("img", {
            className: t,
            src: te[n]
        });
    }), te = {
        televzr: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABN2lDQ1BBZG9iZSBSR0IgKDE5OTgpAAAokZWPv0rDUBSHvxtFxaFWCOLgcCdRUGzVwYxJW4ogWKtDkq1JQ5ViEm6uf/oQjm4dXNx9AidHwUHxCXwDxamDQ4QMBYvf9J3fORzOAaNi152GUYbzWKt205Gu58vZF2aYAoBOmKV2q3UAECdxxBjf7wiA10277jTG+38yH6ZKAyNguxtlIYgK0L/SqQYxBMygn2oQD4CpTto1EE9AqZf7G1AKcv8ASsr1fBBfgNlzPR+MOcAMcl8BTB1da4Bakg7UWe9Uy6plWdLuJkEkjweZjs4zuR+HiUoT1dFRF8jvA2AxH2w3HblWtay99X/+PRHX82Vun0cIQCw9F1lBeKEuf1UYO5PrYsdwGQ7vYXpUZLs3cLcBC7dFtlqF8hY8Dn8AwMZP/fNTP8gAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAXRaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0NSA3OS4xNjM0OTksIDIwMTgvMDgvMTMtMTY6NDA6MjIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMDMtMTBUMTQ6MDc6MzQrMDM6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIwLTAzLTEwVDE0OjE5OjIwKzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTAzLTEwVDE0OjE5OjIwKzAzOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4YmRjOTI1Yy0yZjM0LTYzNDEtYmYwYi00MzViNTYwMTQ3ODEiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1ZGExNzMyZi1kYjdkLWYxNGYtYjI5Mi1kYzY1M2Y0OTA2M2QiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0Njc5MTViOC1jYWVlLWIxNDgtODdhZi00NTJhMTNiZTMyNjAiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ2NzkxNWI4LWNhZWUtYjE0OC04N2FmLTQ1MmExM2JlMzI2MCIgc3RFdnQ6d2hlbj0iMjAyMC0wMy0xMFQxNDowNzozNCswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo4YmRjOTI1Yy0yZjM0LTYzNDEtYmYwYi00MzViNTYwMTQ3ODEiIHN0RXZ0OndoZW49IjIwMjAtMDMtMTBUMTQ6MTk6MjArMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1w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",
        check: "data:image/svg+xml,%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' fill='green' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath d='M497.36,69.995c-7.532-7.545-19.753-7.558-27.285-0.032L238.582,300.845l-83.522-90.713c-7.217-7.834-19.419-8.342-27.266-1.126c-7.841,7.217-8.343,19.425-1.126,27.266l97.126,105.481c3.557,3.866,8.535,6.111,13.784,6.22c0.141,0.006,0.277,0.006,0.412,0.006c5.101,0,10.008-2.026,13.623-5.628L497.322,97.286C504.873,89.761,504.886,77.54,497.36,69.995z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Cpath d='M492.703,236.703c-10.658,0-19.296,8.638-19.296,19.297c0,119.883-97.524,217.407-217.407,217.407c-119.876,0-217.407-97.524-217.407-217.407c0-119.876,97.531-217.407,217.407-217.407c10.658,0,19.297-8.638,19.297-19.296C275.297,8.638,266.658,0,256,0C114.84,0,0,114.84,0,256c0,141.154,114.84,256,256,256c141.154,0,256-114.846,256-256C512,245.342,503.362,236.703,492.703,236.703z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E",
        warning: "data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath d='M256,0C114.497,0,0,114.507,0,256c0,141.503,114.507,256,256,256c141.503,0,256-114.507,256-256C512,114.497,397.493,0,256,0z M256,472c-119.393,0-216-96.615-216-216c0-119.393,96.615-216,216-216c119.393,0,216,96.615,216,216C472,375.393,375.385,472,256,472z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Cpath d='M256,128.877c-11.046,0-20,8.954-20,20V277.67c0,11.046,8.954,20,20,20s20-8.954,20-20V148.877C276,137.831,267.046,128.877,256,128.877z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Ccircle cx='256' cy='349.16' r='27'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
        circleLoading: "data:image/svg+xml,%3Csvg enable-background='new 0 0 497 497' viewBox='0 0 497 497' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Ccircle cx='98' cy='376' fill='%23909ba6' r='53'/%3E%3Ccircle cx='439' cy='336' fill='%23c8d2dc' r='46'/%3E%3Ccircle cx='397' cy='112' fill='%23e9edf1' r='38'/%3E%3Cellipse cx='56.245' cy='244.754' fill='%237e8b96' rx='56.245' ry='54.874'/%3E%3Cellipse cx='217.821' cy='447.175' fill='%23a2abb8' rx='51.132' ry='49.825'/%3E%3Cellipse cx='349.229' cy='427.873' fill='%23b9c3cd' rx='48.575' ry='47.297'/%3E%3Cellipse cx='117.092' cy='114.794' fill='%235f6c75' rx='58.801' ry='57.397'/%3E%3Cellipse cx='453.538' cy='216.477' fill='%23dce6eb' rx='43.462' ry='42.656'/%3E%3Ccircle cx='263' cy='62' fill='%234e5a61' r='62'/%3E%3C/g%3E%3C/svg%3E"
    };
    var ne = ee;
    const oe = Object(m.a)("TzDownload"), re = "STATE_AUTH_CHECK", ie = "STATE_TELEVZR_SEARCH", ae = "STATE_DOWNLOAD_PREPARING", se = "STATE_DOWNLOAD_STARTED", le = "STATE_ERROR", ce = "https://sf-helper.net/helper-pro", ue = I.c.memo(e => {
        let {unmountLayer: t, link: n, positionStyle: o} = e;
        const i = I.c.useRef(), a = Object(_.a)(P.a), [s, l] = I.c.useState(null), [c, u] = I.c.useState(null), [d, p] = I.c.useState(null), A = $("UA-67738130-20", "helper-try-pro"), f = $("UA-181742122-2", "download"), g = I.c.useCallback(e => {
            const t = e.code || e.message;
            u(t), l(le), "EEXIST" === t && f({
                label: "download",
                action: "video-is-already"
            }), "televzr_not_found" === t && f({
                label: "download",
                action: "televzr_not_found"
            }), "quality_not_found" === t && f({
                label: "download",
                action: "quality_not_found"
            }), "data_invalid" === t && f({
                label: "download",
                action: "data_invalid"
            });
        }, []), h = I.c.useMemo(() => ({
            [re]: r.a.i18n.getMessage("authCheck"),
            [ie]: r.a.i18n.getMessage("tzSearchApp"),
            [ae]: r.a.i18n.getMessage("tzPreparingToDownload"),
            [se]: r.a.i18n.getMessage("tzDownloadStarted")
        }[s] || s), [ s ]), m = I.c.useMemo(() => ({
            code_not_authorized: r.a.i18n.getMessage("msg_not_authorized"),
            quality_not_found: r.a.i18n.getMessage("msg_quality_not_found"),
            video_not_found: r.a.i18n.getMessage("msg_quality_not_found"),
            televzr_not_found: r.a.i18n.getMessage("televzrNotFound"),
            data_invalid: r.a.i18n.getMessage("msg_data_invalid"),
            code_no_premium: r.a.i18n.getMessage("msg_no_premium"),
            EEXIST: r.a.i18n.getMessage("msg_video_exists")
        }[c] || c), [ c ]), v = I.c.useCallback(() => t(), []), b = I.c.useCallback(() => {
            if (A({
                label: "button",
                action: "button-click" + n.quality
            }), r.a.isFirefox) location.href = ce; else {
                const e = document.createElement("a");
                e.href = ce, e.target = "_blank", document.body.appendChild(e), e.click(), setTimeout(() => e.remove());
            }
            t();
        }, [ n ]), y = I.c.useCallback(() => t(), []), C = I.c.useCallback(() => {
            f({
                label: "download",
                action: "instructions-for-use"
            });
        }, []);
        return I.c.useEffect(() => {
            const e = e => {
                i && !i.current.contains(e.target) && [ le, se ].includes(s) && y();
            };
            return document.addEventListener("mousedown", e), () => {
                document.removeEventListener("mousedown", e);
            };
        }, [ s ]), I.c.useEffect(() => {
            let e;
            s === ie ? e = {
                label: "download",
                action: "search-televzr"
            } : s === ae ? e = {
                label: "download",
                action: "preparing-to-download"
            } : s === se && (e = {
                label: "download",
                action: "add-to-download"
            }), e && f(e);
        }, [ s ]), I.c.useEffect(() => {
            f({
                label: "download",
                action: "click-button"
            }), r.a.callFn("auth.getLoginUrl").then(e => p(e)).then(() => r.a.callFn("auth.isAuth")).then(e => {
                if (!e) throw new O.a("User not authorized", "code_not_authorized");
                l(ie);
            }).then(() => J.checkAvailability()).then(() => l(ae)).then(() => J.startDownload(n.url, n.type, n.height)).then(e => {
                oe.info("added download", e), l(se);
            }).catch(e => {
                if ("code_not_authorized" === e.code) return b();
                oe.error("Download error", e), g(e);
            });
        }, []), I.c.createElement("div", {
            ref: i,
            className: K()(a.popupContainer, a.flexColumn, !s && a.hidden),
            style: o
        }, I.c.createElement("button", {
            className: a.close,
            onClick: y
        }, "✖"), I.c.createElement("div", {
            className: a.popupBody
        }, I.c.createElement(de, {
            styles: a,
            state: s
        }), I.c.createElement("div", {
            className: a.textContainer
        }, m || h), "code_not_authorized" === c && I.c.createElement("a", {
            href: d,
            target: "_blank",
            onClick: v,
            className: a.btn
        }, r.a.i18n.getMessage("login")), "code_no_premium" === c && I.c.createElement("a", {
            href: ce,
            target: "_blank",
            className: a.btn
        }, r.a.i18n.getMessage("activate")), "televzr_not_found" === c && I.c.createElement("div", null, I.c.createElement("div", {
            className: a.subTextContainer
        }, r.a.i18n.getMessage("televzrNotFoundSubMessage")), I.c.createElement("a", {
            onClick: C,
            href: "https://sf-helper.net/helper-pro-manual.php",
            target: "_blank",
            className: a.btn
        }, r.a.i18n.getMessage("instruction")))));
    }), de = I.c.memo(e => {
        let {styles: t, state: n} = e;
        return I.c.createElement("div", {
            className: t.flexColumn
        }, n === le && I.c.createElement(ne, {
            className: K()(t.icon),
            name: "loading"
        }), [ ie, ae, re ].includes(n) && I.c.createElement(ne, {
            className: K()(t.icon, t.circleLoaderIcon),
            name: "circleLoading"
        }), n === se && I.c.createElement(ne, {
            className: K()(t.icon),
            name: "check"
        }));
    });
    var pe = ue, Ae = n(62), fe = n.n(Ae);
    var ge = I.c.createContext({});
    const he = function(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, n = e, o = 0, i = "", a = [ r.a.i18n.getMessage("vkFileSizeByte"), r.a.i18n.getMessage("vkFileSizeKByte"), r.a.i18n.getMessage("vkFileSizeMByte"), r.a.i18n.getMessage("vkFileSizeGByte"), r.a.i18n.getMessage("vkFileSizeTByte") ];
        for (n < 0 && (i = "-", n = Math.abs(n)); n >= 1e3; ) o++, n /= 1024;
        if (t >= 0) {
            const e = 10 * t;
            n = Math.round(n * e) / e;
        }
        return o < a.length ? i + n + " " + a[o] : e;
    };
    var me = e => Object(h.a)({
        action: "getFileSize",
        url: e
    }).then(e => {
        if (e.error) throw new Error("Get file size error");
        return he(e.fileSize);
    });
    const ve = I.c.memo(e => {
        let {item: t} = e;
        const {SaveFrom_Utils: n, styles: o} = I.c.useContext(ge), i = I.c.useMemo(() => !r.a.isGM && !r.a.isSafari || t.extra ? "" : r.a.i18n.getMessage("downloadTitle"), [ t ]), a = I.c.useMemo(() => {
            const e = (t.ext || t.format || "").toLowerCase(), n = t.title ? [ t.title, e ].filter(Boolean).join(".") : "";
            return g.a.modify(n);
        }, [ t ]), s = I.c.useCallback(e => {
            if (t.func) return t.func(e, t);
            t.forceDownload && !t.forceConverter && n.downloadOnClick(e, null, {
                el: e.target
            });
        }, [ t ]);
        return I.c.createElement("a", {
            href: t.href,
            download: a,
            className: o.dropdownItem,
            onClick: s,
            title: i,
            target: t.isBlank ? "_blank" : ""
        }, "SRT" === t.quality ? I.c.createElement(ye, {
            text: t.itemText
        }) : I.c.createElement(be, {
            item: t
        }));
    }), be = I.c.memo(e => {
        let {item: t} = e;
        const {styles: n, SaveFrom_Utils: o} = I.c.useContext(ge);
        return I.c.createElement("div", {
            className: n.dropdownContainer
        }, I.c.createElement("div", {
            className: n.dropdownFormat
        }, t.format || "???"), "SRT" !== t.quality && I.c.createElement("div", {
            className: n.dropdownQuality
        }, I.c.createElement("div", null, t.quality), I.c.createElement(Ce, {
            quality: t.quality
        })), "SRT" === t.quality && I.c.createElement("div", {
            className: K()(n.dropdownQuality, n.subtitles)
        }, t.itemText), I.c.createElement("div", {
            className: n.dropdownAction
        }, t.noAudio && I.c.createElement("img", {
            src: o.svg.getSrc("noSound", "#ff0000"),
            title: r.a.i18n.getMessage("withoutAudio")
        }), !t.noSize && I.c.createElement(xe, {
            src: o.svg.getSrc("info"),
            url: t.href
        })));
    }), ye = I.c.memo(e => {
        let {text: t} = e;
        const {styles: n} = I.c.useContext(ge);
        return I.c.createElement("div", {
            className: n.dropdownContainer
        }, I.c.createElement("div", null, t));
    }), Ce = I.c.memo(e => {
        let {quality: t} = e;
        const {styles: n} = I.c.useContext(ge), o = I.c.useMemo(() => {
            const e = String(t);
            if ([ "1080", "720", "1440" ].includes(e)) return "HD";
            return {
                2160: "4K",
                4320: "8K",
                hls: "HLS",
                1440: "QHD"
            }[e];
        }, [ t ]);
        return I.c.createElement("div", null, o && I.c.createElement("div", {
            className: n.qualityBadge
        }, o));
    }), xe = I.c.memo(e => {
        let {url: t, src: n} = e;
        const {styles: o} = I.c.useContext(ge), [r, i] = I.c.useState(null), a = I.c.useCallback(e => (e.stopPropagation(), 
        e.preventDefault(), me(t).then(e => i(e))), [ t ]);
        return r ? I.c.createElement("div", {
            className: o.sizeIcon
        }, r) : I.c.createElement("img", {
            src: n,
            onClick: a
        });
    });
    var we = ve;
    const Ie = "PRO_SECTION_LOGIN", _e = "PRO_SECTION_LANDING", ke = I.c.memo(e => {
        let {hiddenItems: t, SaveFrom_Utils: n} = e;
        const o = Object(_.a)(fe.a), [i, a] = I.c.useState(!1), [s, l] = I.c.useState(null), [c, u] = I.c.useState(null), [p, A] = I.c.useState(!1), f = I.c.useMemo(() => t.length > 0, [ t ]), g = I.c.useCallback(() => a(e => !e), []), h = $("UA-181742122-2", "download");
        I.c.useEffect(() => {
            r.a.callFn("getPreferences").then(e => A(e.proEnabled));
        }, []), function(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            I.c.useEffect(() => {
                const t = r.a.callFn("auth.isAuth"), n = Object(V.a)([ "userInfo" ]).then(e => Boolean(e.userInfo && e.userInfo.isPremium)), o = r.a.callFn("auth.getLoginUrl");
                Promise.all([ t, n, o ]).then(t => {
                    let [n, o, r] = t;
                    return e(n, o, r);
                });
            }, t);
        }((e, t, n) => {
            if (!p) return void u(null);
            let o = e && t ? "PRO_SECTION_INFO" : e ? _e : Ie;
            l(n), u(o);
        }, [ p ]);
        const m = I.c.useCallback(() => {
            h({
                label: "download",
                action: "login-to-helperpro-button"
            }), d.a.trigger(document, "mousedown");
        }, []), v = I.c.useCallback(() => {
            h({
                label: "download",
                action: "activated-pro-button"
            });
        }, []);
        return I.c.createElement(ge.Provider, {
            value: {
                SaveFrom_Utils: n,
                styles: o
            }
        }, I.c.createElement("div", null, i && I.c.createElement(Ee, {
            list: t
        }), [ _e, Ie, null ].includes(c) && I.c.createElement(Se, null), c === _e && I.c.createElement("a", {
            className: o.loginBtn,
            onClick: v,
            href: "https://sf-helper.net/helper-pro",
            target: "_blank"
        }, r.a.i18n.getMessage("activatePro")), c === Ie && I.c.createElement("a", {
            className: o.loginBtn,
            onClick: m,
            href: s,
            target: "_blank"
        }, r.a.i18n.getMessage("loginIfPro")), "PRO_SECTION_INFO" === c && I.c.createElement("div", null, I.c.createElement(Se, null), I.c.createElement("div", {
            className: o.proInformation
        }, I.c.createElement("div", {
            className: o.info
        }, I.c.createElement("img", {
            src: n.svg.getSrc("rocket", "#46aa4b")
        }), I.c.createElement("div", {
            className: o.proLabel
        }, "You are PRO")), f && I.c.createElement(Me, {
            onClick: g
        }))), null === c && f && I.c.createElement(Me, {
            onClick: g
        }), [ Ie, _e ].includes(c) && f && I.c.createElement("div", null, I.c.createElement(Se, null), I.c.createElement(Me, {
            onClick: g
        }))));
    }), Ee = I.c.memo(e => {
        let {list: t} = e;
        const n = I.c.useRef(), {styles: o} = I.c.useContext(ge);
        return ((e, t) => {
            I.c.useEffect(() => {
                let n = e.current;
                return n && n.addEventListener("scroll", t), () => n && n.removeEventListener("scroll", t);
            }, [ e ]);
        })(n, e => {
            const t = o.hiddenShadow, n = e.target;
            n && n.scrollTop > 0 ? !n.classList.contains(t) && n.classList.add(t) : n.classList.contains(t) && n.classList.remove(t);
        }), I.c.createElement("div", {
            ref: n,
            className: K()(t.length > 8 && o.hiddenViewer)
        }, t.map(e => I.c.createElement(we, {
            item: e
        })));
    }), Me = I.c.memo(e => {
        let {onClick: t} = e;
        const {styles: n} = I.c.useContext(ge), [o, i] = I.c.useState(!1), a = I.c.useCallback(e => {
            e.preventDefault(), t(e), i(e => !e);
        });
        return I.c.createElement("a", {
            href: "#",
            className: K()(n.dropdownItem, n.moreBtn),
            onClick: a
        }, o ? r.a.i18n.getMessage("more") + " " + String.fromCharCode(171) : r.a.i18n.getMessage("more") + " " + String.fromCharCode(187));
    }), Se = I.c.memo(() => {
        const {styles: e} = I.c.useContext(ge);
        return I.c.createElement("div", {
            className: e.separator
        });
    });
    var Oe = ke, ze = n(63), Ne = n.n(ze);
    const De = Object(m.a)("TryProButtonExp");
    var je = I.c.memo(e => {
        let {unmountLayer: t} = e;
        const n = Object(_.a)(Ne.a), o = $("UA-67738130-20", "helper-try-pro"), i = I.c.useCallback(() => o({
            label: "button",
            action: "button-click"
        }), []), [a, s] = I.c.useState(!1);
        return I.c.useEffect(() => {
            r.a.callFn("getPreferences").then(e => {
                if (!e.proEnabled) throw new Error("Helper pro exp is disabled");
                return Object(V.a)([ "userInfo" ]);
            }).then(e => {
                e.userInfo && e.userInfo.isPremium ? t() : s(!0);
            }).catch(e => {
                De.warn("Experiment error", e), t();
            });
        }, []), I.c.createElement("div", null, a && I.c.createElement("a", {
            href: "https://sf-helper.net/helper-pro",
            className: n.button,
            onClick: i,
            target: "_blank"
        }, "TRY PRO"));
    }), Te = n(64), Le = n.n(Te);
    var Re = I.c.memo(e => {
        let {state: t, installUrl: n, styles: o} = e;
        const i = $(Be, "install"), a = I.c.useCallback(() => i({
            action: "televzr",
            label: "televzr"
        }), []);
        return I.c.createElement("div", {
            className: o.televzrPopup
        }, I.c.createElement("div", {
            className: o.televzrPopupHeader
        }), t === Fe && I.c.createElement("div", null, I.c.createElement(ne, {
            name: "circleLoading",
            className: [ o.icon, o.circleLoaderIcon ].join(" ")
        }), I.c.createElement("div", null, r.a.i18n.getMessage("tzSearchApp"))), t === We && I.c.createElement("div", null, I.c.createElement("div", {
            className: o.televzrPopupBody
        }, I.c.createElement("a", {
            className: [ o.televzrPopupBtn, o.btnInvert ].join(" "),
            href: n,
            target: "_blank",
            onClick: a
        }, I.c.createElement("span", {
            className: o.btnOuter
        }, I.c.createElement("span", {
            className: o.btnInner
        }, "Install Now")))), I.c.createElement("div", {
            className: o.televzrPopupFooter
        }, 'Allows to download HD/MP3 by "Televzr" button')), t === qe && I.c.createElement("div", null, I.c.createElement(ne, {
            name: "check",
            className: [ o.icon ].join(" ")
        }), I.c.createElement("div", null, "Televzr launched")));
    });
    const Be = "UA-181742122-3", Pe = function(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        const n = document.createElement("a");
        n.href = e, t && (n.target = "_blank"), document.body.appendChild(n), n.click(), 
        setTimeout(() => n.remove());
    }, Fe = "pending", qe = "installed", We = "tz_not_installed", Qe = Object(m.a)("tz-hd-btn");
    var He = I.c.memo(e => {
        let {openUrl: t} = e;
        const n = $(Be, "download"), o = Object(_.a)(Le.a), i = I.c.useRef(), [s, l] = I.c.useState("idle"), [c, u] = I.c.useState(!1), [d, p] = I.c.useState(!1), [f, g] = I.c.useState(), [h] = I.c.useState(() => t.match(/v=(.*?)$/)[1]), m = I.c.useMemo(() => `https://desktop.televzr.com/download-in-hd.html?vid=693&video_id=yt-${h}&utm_source=helper&utm_medium=hd-mp3-button&utm_campaign=televzr&utm_content=televzr_integration`, [ h ]);
        I.c.useEffect(() => {
            const e = e => {
                f && !f.contains(e.target) && [ qe, We ].includes(s) && u(!1);
            };
            return document.addEventListener("mousedown", e), () => {
                document.removeEventListener("mousedown", e);
            };
        }, [ s, f ]), I.c.useEffect(() => {
            let e, t;
            return c && ([e, t] = ((e, t, n) => {
                let o = document.body.querySelector(":not(.ytd-browse[hidden]) #savefrom__yt_btn"), r = document.querySelector(".sf-televzr-popup-container");
                r && r.remove(), o && (r = A.a.create("div", {
                    class: "sf-televzr-popup-container",
                    style: {
                        zIndex: 99999,
                        position: "absolute",
                        top: "33px",
                        right: "9%",
                        width: "206px"
                    }
                }), o.appendChild(r));
                const i = Boolean(document.body.querySelector("#sfYtFrameBtn")), a = {
                    position: "absolute"
                };
                !r && i && (a.right = "0", r = document.body.querySelector(".sf-btn-ctr")), r || (a.position = "relative", 
                r = A.a.create("div", {
                    style: {
                        position: "fixed",
                        zIndex: 999999,
                        bottom: "30px",
                        right: "0",
                        width: "268px"
                    }
                }), document.body.appendChild(r));
                return [ Object(w.a)(Object(C.e)(Re, {
                    state: e,
                    installUrl: t,
                    styles: n
                }), r), r ];
            })(s, m, o), g(t)), () => e && e();
        }, [ s, c, m ]), I.c.useEffect(() => {
            let e = !1;
            const t = a(() => e && u(!1), 300), n = () => {
                e = !0, t();
            }, o = () => {
                e = !1;
            }, r = () => {
                i.current && i.current.removeEventListener("mouseleave", n), i.current && i.current.removeEventListener("mouseenter", o), 
                f && f.removeEventListener("mouseleave", n), f && f.removeEventListener("mouseenter", o);
            };
            return d && f ? (i.current && i.current.addEventListener("mouseleave", n), i.current && i.current.addEventListener("mouseenter", o), 
            f.addEventListener("mouseleave", n), f.addEventListener("mouseenter", o)) : r(), 
            () => r();
        }, [ f, d ]);
        const v = I.c.useCallback(e => {
            if (e.preventDefault(), e.stopPropagation(), p(!1), n({
                action: "click_televzr",
                label: "download"
            }), "idle" === s) return u(!0), l(Fe), J.pingTelevzr().then(() => {
                l(qe), localStorage.setItem("televzr_installed", "1"), r.a.callFn("televzr.openUrl", [ t.replace("televzr://", "https://") ]).catch(e => {
                    Qe.error("televzr.openUrl: ", e), Pe(t);
                });
            }, e => {
                l(We), localStorage.removeItem("televzr_installed"), Pe(m, !0), Qe.error(e);
            });
            [ We, qe ].includes(s) && u(!0);
        }, [ m ]), b = I.c.useCallback(() => {
            localStorage.getItem("televzr_installed") || c || (u(!0), p(!0), l(We));
        }, [ c ]);
        return I.c.createElement("div", {
            ref: i
        }, I.c.createElement("a", {
            href: "#",
            onClick: v,
            className: [ o.itemAnchor, "sf-menu-item" ].join(" "),
            onMouseEnter: b
        }, I.c.createElement("div", {
            className: o.itemContainer
        }, I.c.createElement("span", null, "HD/MP3 Televzr"), I.c.createElement(ne, {
            name: "televzr",
            className: o.logo
        }))));
    }), Ge = n(7), Ve = n(32), Ue = n(48);
    function Ye(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            t && (o = o.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
            }))), n.push.apply(n, o);
        }
        return n;
    }
    function Ze(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? Ye(Object(n), !0).forEach((function(t) {
                Object(o.a)(e, t, n[t]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ye(Object(n)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
            }));
        }
        return e;
    }
    n(42);
    const Je = Object(m.a)("components");
    let Xe = null;
    const Ke = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
    var $e = {
        downloadParam: "sfh--download",
        setStyle: function(e, t) {
            if (e && t) for (var n in t) e.style[n] = t[n];
        },
        getStyle: function(e, t) {
            return e && window.getComputedStyle && window.getComputedStyle(e, null).getPropertyValue(t);
        },
        addStyleRules: function(e, t, n) {
            var o = n ? document.querySelector("#savefrom-styles." + n) : document.getElementById("savefrom-styles");
            if (!o) {
                (o = document.createElement("style")).id = "savefrom-styles", n && o.classList.add(n);
                var r = document.querySelector("head style");
                r ? r.parentNode.insertBefore(o, r) : document.querySelector("head").appendChild(o);
            }
            if ("object" == typeof t) {
                var i = [];
                for (var a in t) i.push(a + ":" + t[a]);
                t = i.join(";");
            }
            o.textContent += e + "{" + t + "}";
        },
        getPosition: function(e, t) {
            var n = e.getBoundingClientRect();
            if (t) {
                var o = t.getBoundingClientRect();
                return {
                    top: Math.round(n.top - o.top),
                    left: Math.round(n.left - o.left),
                    width: n.width,
                    height: n.height
                };
            }
            return {
                top: Math.round(n.top + window.pageYOffset),
                left: Math.round(n.left + window.pageXOffset),
                width: n.width,
                height: n.height
            };
        },
        getSize: function(e) {
            return {
                width: e.offsetWidth,
                height: e.offsetHeight
            };
        },
        getMatchFirst: function(e, t) {
            var n = e.match(t);
            return n && n.length > 1 ? n[1] : "";
        },
        getElementByIds: function(e) {
            for (var t = 0; t < e.length; t++) {
                var n = document.getElementById(e[t]);
                if (n) return n;
            }
            return null;
        },
        getParentByClass: function(e, t) {
            if (!e || "" == t) return !1;
            var n;
            if ("object" == typeof t && t.length > 0) for (n = e; n; n = n.parentNode) {
                if (1 !== n.nodeType) return null;
                for (var o = 0; o < t.length; o++) if (n.classList.contains(t[o])) return n;
            } else for (n = e; n; n = n.parentNode) {
                if (1 !== n.nodeType) return null;
                if (n.classList.contains(t)) return n;
            }
            return null;
        },
        getParentByTagName: function(e, t) {
            if (!e || !t) return !1;
            for (var n = e; n; n = n.parentNode) {
                if (1 !== n.nodeType) return null;
                if (n.tagName === t) return n;
            }
            return null;
        },
        getParentById: function(e, t) {
            for (var n = e; n; n = n.parentNode) {
                if (1 !== n.nodeType) return null;
                if (n.id === t) return n;
            }
            return null;
        },
        hasChildrenTagName: function(e, t) {
            for (var n, o = 0; n = e.childNodes[o]; o++) if (1 === n.nodeType && n.tagName === t) return !0;
            return !1;
        },
        isParent: function(e, t) {
            return !(!t || -1 === [ 1, 9, 11 ].indexOf(t.nodeType)) && t.contains(e);
        },
        emptyNode: function(e) {
            for (;e.firstChild; ) e.removeChild(e.firstChild);
        },
        download: function(e, t, n, o) {
            if (!t) return !1;
            if (!(e = e || this.getFileName(t))) return !1;
            if (!Xe.preferences.downloads) return !1;
            var i = n || {};
            return i.url = t, i.filename = e.trim(), o = o || void 0, r.a.sendMessage({
                action: "downloadFile",
                options: i
            }, o), !0;
        },
        downloadList: {
            showDownloadWarningPopup: function(e, t) {
                var n = $e.playlist.getInfoPopupTemplate();
                r.a.sendMessage({
                    action: "getWarningIcon",
                    type: t
                }, (function(e) {
                    n.icon.style.backgroundImage = "url(" + e + ")";
                })), A.a.create(n.textContainer, {
                    append: [ A.a.create("p", {
                        text: r.a.i18n.getMessage("warningPopupTitle"),
                        style: {
                            color: "#0D0D0D",
                            fontSize: "20px",
                            marginBottom: "11px",
                            marginTop: "13px"
                        }
                    }), A.a.create("p", {
                        text: r.a.i18n.getMessage("warningPopupDesc") + " ",
                        style: {
                            color: "#868686",
                            fontSize: "14px",
                            marginBottom: "13px",
                            lineHeight: "24px",
                            marginTop: "0px"
                        },
                        append: A.a.create("a", {
                            href: "ru" === r.a.i18n.getMessage("lang") || "uk" === r.a.i18n.getMessage("lang") ? "http://vk.com/page-55689929_49003549" : "http://vk.com/page-55689929_49004259",
                            text: r.a.i18n.getMessage("readMore"),
                            target: "_blank",
                            style: {
                                color: "#4A90E2"
                            }
                        })
                    }), A.a.create("p", {
                        style: {
                            marginBottom: "13px"
                        },
                        append: [ A.a.create("label", {
                            style: {
                                color: "#868686",
                                cursor: "pointer",
                                fontSize: "14px",
                                lineHeight: "19px"
                            },
                            append: [ A.a.create("input", {
                                type: "checkbox",
                                style: {
                                    cssFloat: "left",
                                    marginLeft: "0px"
                                },
                                on: [ "click", function() {
                                    r.a.sendMessage({
                                        action: "hideDownloadWarning",
                                        set: this.checked ? 1 : 0
                                    });
                                } ]
                            }), r.a.i18n.getMessage("noWarning") ]
                        }) ]
                    }) ]
                });
                var o = void 0, i = void 0;
                A.a.create(n.buttonContainer, {
                    append: [ o = A.a.create("button", {
                        text: r.a.i18n.getMessage("cancel"),
                        style: {
                            height: "27px",
                            width: "118px",
                            backgroundColor: "#ffffff",
                            border: "1px solid #9e9e9e",
                            margin: "12px",
                            marginBottom: "11px",
                            marginRight: "4px",
                            borderRadius: "5px",
                            fontSize: "14px",
                            cursor: "pointer"
                        }
                    }), i = A.a.create("button", {
                        text: r.a.i18n.getMessage("continue"),
                        style: {
                            height: "27px",
                            width: "118px",
                            backgroundColor: "#ffffff",
                            border: "1px solid #9e9e9e",
                            margin: "12px",
                            marginBottom: "11px",
                            marginRight: "8px",
                            borderRadius: "5px",
                            fontSize: "14px",
                            cursor: "pointer"
                        }
                    }) ]
                }), o.addEventListener("click", (function(e) {
                    var t = n.body.parentNode;
                    d.a.trigger(t.lastChild, "click");
                })), i.addEventListener("click", (function(t) {
                    t.preventDefault(), t.stopPropagation(), e(), d.a.trigger(o, "click");
                })), $e.popupDiv(n.body, "dl_warning_box_popup");
            },
            startChromeDownloadList: function(e) {
                var t = e.folderName, n = e.list;
                return t && (t += "/"), r.a.sendMessage({
                    action: "downloadList",
                    fileList: n,
                    folder: t
                });
            },
            startOldChromeDownloadList: function(e, t) {
                var n = e.folderName, o = e.list, i = e.type;
                n && (n += "/");
                var a = 0, s = !1, l = 500, c = document.body;
                c.focus(), t || (c.onblur = function() {
                    s = !0;
                });
                !function e() {
                    var t = o[a];
                    if (a++, void 0 !== t) if (Xe.preferences.downloads ? $e.download(n + t.filename, t.url) : d.a.trigger(A.a.create("a", {
                        download: t.filename,
                        href: t.url,
                        on: [ "click", function(e) {
                            $e.downloadOnClick(e);
                        } ]
                    }), "click", {
                        cancelable: !0,
                        altKey: !0
                    }), s) $e.downloadList.showDownloadWarningPopup((function() {
                        s = !1, c.focus(), e();
                    }), i); else {
                        if (a > 5 && l && (l = void 0, c.onblur = void 0, s = !1, Xe.preferences.downloads)) return void r.a.sendMessage({
                            action: "downloadList",
                            fileList: o.slice(a),
                            folder: n
                        });
                        setTimeout((function() {
                            e();
                        }), l);
                    }
                }();
            },
            startDownload: function(e) {
                e.list.forEach((function(e) {
                    e.filename = g.a.modify(e.filename);
                })), e.folderName = g.a.modify(e.folderName);
                const t = Xe.preferences.sortDownloads;
                if (t && t.isEnabled) {
                    const n = e.list[0].filename, o = n.slice(n.lastIndexOf(".") + 1), r = t.groups.find(e => e.formats.some(e => -1 !== e.indexOf(o)));
                    r && r.dir && (e.folderName = `${g.a.modify(r.dir)}/${e.folderName}`);
                }
                return r.a.isGM && "undefined" != typeof GM_download || r.a.isChrome && Xe.preferences.downloads || r.a.isFirefox ? $e.downloadList.startChromeDownloadList(e) : r.a.isSafari ? r.a.sendMessage({
                    action: "hideDownloadWarning"
                }, (function(t) {
                    $e.downloadList.startOldChromeDownloadList(e, t);
                })) : void 0;
            },
            showBeforeDownloadPopup: function(e, t) {
                t && !t.count && (t.count = e.length), t.list = e.filter(e => !e.useConverter), 
                t.listConverter = e.filter(e => e.useConverter);
                var n = t.type, o = t.folderName, i = t.onContinue || $e.downloadList.startDownload, a = t.onShowList || $e.playlist.popupFilelist, s = t.count || e.length, l = $e.playlist.getInfoPopupTemplate();
                r.a.sendMessage({
                    action: "getWarningIcon",
                    color: "#00CCFF",
                    type: n
                }, (function(e) {
                    l.icon.style.backgroundImage = "url(" + e + ")";
                }));
                var c = [];
                a && (c = [ " (", A.a.create("a", {
                    href: "#",
                    text: r.a.i18n.getMessage("vkListOfLinks").toLowerCase()
                }), ")" ])[1].addEventListener("click", (function(e) {
                    e.preventDefault(), e.stopPropagation(), a(t.list), d.a.trigger(u, "click");
                })), A.a.create(l.textContainer, {
                    append: [ A.a.create("p", {
                        text: o || r.a.i18n.getMessage("playlistTitle"),
                        style: {
                            color: "#0D0D0D",
                            fontSize: "20px",
                            marginBottom: "11px",
                            marginTop: "13px"
                        }
                    }), A.a.create("p", {
                        text: r.a.i18n.getMessage("vkFoundFiles").replace("%d", s),
                        style: {
                            color: "#868686",
                            fontSize: "14px",
                            marginBottom: "13px",
                            lineHeight: "24px",
                            marginTop: "0px"
                        },
                        append: c
                    }), A.a.create("p", {
                        text: r.a.i18n.getMessage("beforeDownloadPopupWarn"),
                        style: {
                            color: "#868686",
                            fontSize: "14px",
                            marginBottom: "13px",
                            lineHeight: "24px",
                            marginTop: "0px"
                        }
                    }) ]
                });
                var u = void 0, p = void 0;
                let f;
                A.a.create(l.buttonContainer, {
                    append: [ u = A.a.create("button", {
                        text: r.a.i18n.getMessage("cancel"),
                        style: {
                            height: "27px",
                            width: "118px",
                            backgroundColor: "#ffffff",
                            border: "1px solid #9e9e9e",
                            margin: "12px",
                            marginBottom: "11px",
                            marginRight: "4px",
                            borderRadius: "5px",
                            fontSize: "14px",
                            cursor: "pointer"
                        }
                    }), p = A.a.create("button", {
                        text: r.a.i18n.getMessage("continue"),
                        style: {
                            height: "27px",
                            width: "118px",
                            backgroundColor: "#ffffff",
                            border: "1px solid #9e9e9e",
                            margin: "12px",
                            marginBottom: "11px",
                            marginRight: "8px",
                            borderRadius: "5px",
                            fontSize: "14px",
                            cursor: "pointer"
                        }
                    }) ]
                }), u.addEventListener("click", (function(e) {
                    var t = l.body.parentNode;
                    d.a.trigger(t.lastChild, "click");
                })), p.addEventListener("click", (function(e) {
                    e.preventDefault(), e.stopPropagation(), i(t), t.listConverter.length ? (f = Object(w.a)(Object(C.e)(R, {
                        files: t.listConverter,
                        onDone: () => {
                            u.textContent = r.a.i18n.getMessage("close"), p.style.display = "none", l.buttonContainer.style.display = "block";
                        }
                    }), l.textContainer), l.buttonContainer.style.display = "none") : d.a.trigger(u, "click");
                }));
                $e.popupDiv(l.body, "dl_confirm_box_popup", void 0, void 0, () => {
                    f && f();
                }, {
                    docCloseEnable: !t.listConverter.length
                });
            }
        },
        downloadLink: function(e, t) {
            if (!e.href) return !1;
            const n = e.getAttribute("download");
            return this.download(n, e.href, null, t);
        },
        safariDlLink: function(e) {
            if (!(e.button || e.ctrlKey || e.altKey || e.shitfKey)) {
                var t = null;
                try {
                    if ("function" != typeof MouseEvent) throw "legacy";
                    t = new MouseEvent("click", {
                        bubbles: !0,
                        cancelable: e.cancelable,
                        screenX: e.screenX,
                        screenY: e.screenY,
                        clientX: e.clientX,
                        clientY: e.clientY,
                        ctrlKey: !1,
                        altKey: !0,
                        shiftKey: !1,
                        metaKey: e.metaKey,
                        button: e.button,
                        relatedTarget: e.relatedTarget
                    });
                } catch (n) {
                    t = function(e) {
                        var t = document.createEvent("MouseEvents");
                        return t.initMouseEvent("click", !0, e.cancelable, window, 0, e.screenX, e.screenY, e.clientX, e.clientY, !1, !0, !1, e.metaKey, e.button, e.relatedTarget), 
                        t;
                    }(e);
                }
                e.preventDefault(), e.stopPropagation(), this.dispatchEvent(t);
            }
        },
        downloadOnClick: function(e, t, n) {
            var o = $e, i = (n = n || {}).el || e.target;
            if ("A" !== i.tagName && (i = Object(c.a)(i, "A")), !i) return;
            const a = r.a.isGM && navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome"), s = !(!r.a.isGM || "undefined" == typeof GM_info) && "Tampermonkey" === GM_info.scriptHandler && !Xe.preferences.downloads;
            if (r.a.isSafari || a || s) {
                if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void Object(v.b)(i, {
                    defaultWidth: 400,
                    defaultHeight: 60
                }, n);
                Object(v.a)(i);
            }
            if (r.a.isSafari) return o.safariDlLink.call(i, e);
            Xe.preferences.downloads && ((r.a.isFirefox || r.a.isGM) && /^blob:|^data:/.test(i.href) || 2 !== e.button && (e.preventDefault(), 
            !n.withoutPropagation && e.stopPropagation(), Object(Ge.a)({
                category: "download",
                subcategory: Object(Ve.a)(),
                event: Object(Ue.a)(n)
            }), o.downloadLink(i, t)));
        },
        getQueryString: function(e, t, n) {
            if (!e || "object" != typeof e) return "";
            void 0 === t && (t = ""), void 0 === n && (n = "");
            var o = "";
            for (var r in e) o.length && (o += "&"), e[r] instanceof Object ? (t || (t = ""), 
            n || (n = ""), o += $e.getQueryString(e[r], t + r + "[", "]" + n)) : o += t + escape(r) + n + "=" + escape(e[r]);
            return o;
        },
        decodeUnicodeEscapeSequence: function(e) {
            return e.replace(/\\u([0-9a-f]{4})/g, (function(e, t) {
                if (t = parseInt(t, 16), !isNaN(t)) return String.fromCharCode(t);
            }));
        },
        getFileExtension: function(e, t) {
            var n = this.getMatchFirst(e, /\.([a-z0-9]{3,4})(\?|$)/i);
            return n ? n.toLowerCase() : t || "";
        },
        getFileName: function(e) {
            var t = this.getMatchFirst(e, /\/([^\?#\/]+\.[a-z\d]{2,6})(?:\?|#|$)/i);
            return t ? g.a.modify(t) : t;
        },
        getTopLevelDomain: function(e) {
            if (!e) return "";
            if (!e.match(/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}/)) return e;
            var t = e.split("."), n = t.length;
            return 2 == n ? e : t[n - 2] + "." + t[n - 1];
        },
        dateToObj: function(e, t) {
            var n = null == e ? new Date : new Date(e);
            void 0 === t && (t = !0);
            var o = {
                year: n.getFullYear(),
                month: n.getMonth() + 1,
                day: n.getDate(),
                hour: n.getHours(),
                min: n.getMinutes(),
                sec: n.getSeconds()
            };
            if (t) for (var r in o) 1 == o[r].toString().length && (o[r] = "0" + o[r]);
            return o;
        },
        utf8Encode: function(e) {
            e = e.replace(/\r\n/g, "\n");
            for (var t = "", n = 0; n < e.length; n++) {
                var o = e.charCodeAt(n);
                o < 128 ? t += String.fromCharCode(o) : o > 127 && o < 2048 ? (t += String.fromCharCode(o >> 6 | 192), 
                t += String.fromCharCode(63 & o | 128)) : (t += String.fromCharCode(o >> 12 | 224), 
                t += String.fromCharCode(o >> 6 & 63 | 128), t += String.fromCharCode(63 & o | 128));
            }
            return t;
        },
        sizeHuman: function(e, t) {
            null != t && null != t || (t = 2);
            var n = e, o = 0, i = "", a = [ r.a.i18n.getMessage("vkFileSizeByte"), r.a.i18n.getMessage("vkFileSizeKByte"), r.a.i18n.getMessage("vkFileSizeMByte"), r.a.i18n.getMessage("vkFileSizeGByte"), r.a.i18n.getMessage("vkFileSizeTByte") ];
            for (n < 0 && (i = "-", n = Math.abs(n)); n >= 1e3; ) o++, n /= 1024;
            if (t >= 0) {
                var s = 10 * t;
                n = Math.round(n * s) / s;
            }
            return o < a.length ? i + n + " " + a[o] : e;
        },
        secondsToDuration: function(e) {
            if (!e || isNaN(e)) return "";
            function t(e) {
                return e < 10 ? "0" + e : e.toString();
            }
            var n = Math.floor(e / 3600);
            e %= 3600;
            var o = Math.floor(e / 60);
            return e %= 60, n > 0 ? n + ":" + t(o) + ":" + t(e) : o + ":" + t(e);
        },
        svg: {
            icon: {
                download: "M 4,0 4,8 0,8 8,16 16,8 12,8 12,0 4,0 z",
                info: "M 8,1.55 C 11.6,1.55 14.4,4.44 14.4,8 14.4,11.6 11.6,14.4 8,14.4 4.44,14.4 1.55,11.6 1.55,8 1.55,4.44 4.44,1.55 8,1.55 M 8,0 C 3.58,0 0,3.58 0,8 0,12.4 3.58,16 8,16 12.4,16 16,12.4 16,8 16,3.58 12.4,0 8,0 L 8,0 z M 9.16,12.3 H 6.92 V 7.01 H 9.16 V 12.3 z M 8.04,5.91 C 7.36,5.91 6.81,5.36 6.81,4.68 6.81,4 7.36,3.45 8.04,3.45 8.72,3.45 9.27,4 9.27,4.68 9.27,5.36 8.72,5.91 8.04,5.91 z",
                noSound: "M 11.4,5.05 13,6.65 14.6,5.05 16,6.35 14.4,7.95 16,9.55 14.6,11 13,9.35 11.4,11 10,9.55 11.6,7.95 10,6.35 z M 8,1.75 8,14.3 4,10.5 l -4,0 0,-4.75 4,0 z",
                rocket: "M 11.371094 7.625 C 13.507812 5.074219 14.054688 1.523438 13.996094 0.445312 C 13.996094 0.328125 13.9375 0.226562 13.863281 0.136719 C 13.789062 0.0625 13.6875 0.00390625 13.554688 0.00390625 C 12.476562 -0.0546875 8.925781 0.476562 6.390625 2.613281 L 5.800781 2.390625 C 4.769531 2.007812 3.605469 2.320312 2.894531 3.160156 L 1.261719 5.089844 C 1.023438 5.355469 1.140625 5.78125 1.480469 5.898438 L 3.234375 6.550781 C 2.851562 7.199219 2.585938 7.742188 2.410156 8.125 C 2.261719 8.4375 2.335938 8.804688 2.585938 9.054688 L 4.945312 11.429688 C 5.179688 11.664062 5.550781 11.738281 5.875 11.589844 C 6.257812 11.414062 6.800781 11.148438 7.449219 10.765625 L 8.085938 12.519531 C 8.203125 12.859375 8.628906 12.960938 8.894531 12.738281 L 10.8125 11.105469 C 11.652344 10.394531 11.960938 9.230469 11.578125 8.199219 Z M 10.265625 5.78125 C 9.707031 6.34375 8.792969 6.34375 8.21875 5.78125 C 7.65625 5.222656 7.65625 4.308594 8.21875 3.734375 C 8.777344 3.171875 9.691406 3.171875 10.265625 3.734375 C 10.828125 4.308594 10.828125 5.222656 10.265625 5.78125 Z M 10.265625 5.78125 M 3.929688 12.03125 L 2.867188 13.078125 C 2.660156 13.285156 2.660156 13.640625 2.867188 13.84375 C 3.074219 14.050781 3.425781 14.050781 3.632812 13.84375 L 4.695312 12.785156 C 4.902344 12.578125 4.902344 12.222656 4.695312 12.015625 C 4.472656 11.8125 4.136719 11.8125 3.929688 12.03125 Z M 3.929688 12.03125 M 3.324219 10.675781 C 3.117188 10.46875 2.765625 10.46875 2.558594 10.675781 L 0.878906 12.371094 C 0.671875 12.578125 0.671875 12.929688 0.878906 13.136719 C 1.082031 13.34375 1.4375 13.34375 1.644531 13.136719 L 3.324219 11.429688 C 3.546875 11.222656 3.546875 10.882812 3.324219 10.675781 Z M 3.324219 10.675781 M 1.984375 10.085938 C 2.1875 9.878906 2.1875 9.527344 1.984375 9.320312 C 1.777344 9.113281 1.421875 9.113281 1.214844 9.320312 L 0.15625 10.382812 C -0.0507812 10.585938 -0.0507812 10.941406 0.15625 11.148438 C 0.359375 11.355469 0.714844 11.355469 0.921875 11.148438 Z M 1.984375 10.085938"
            },
            cache: {},
            getSrc: function(e, t) {
                return this.icon[e] ? (this.cache[e] || (this.cache[e] = {}), this.cache[e][t] || (this.cache[e][t] = btoa('<?xml version="1.0" encoding="UTF-8"?><svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16" viewBox="0 0 16 16" id="svg2" xml:space="preserve"><path d="' + this.icon[e] + '" fill="' + t + '" /></svg>')), 
                this.cache[e][t] ? "data:image/svg+xml;base64," + this.cache[e][t] : "") : "";
            },
            getSvg: function(e, t, n, o) {
                var r = document.createElementNS("http://www.w3.org/2000/svg", "svg"), i = r.namespaceURI;
                r.setAttribute("width", n || "16"), r.setAttribute("height", o || n || "16"), r.setAttribute("viewBox", "0 0 16 16");
                var a = document.createElementNS(i, "path");
                return r.appendChild(a), a.setAttribute("d", this.icon[e]), t && a.setAttribute("fill", t), 
                r;
            }
        },
        appendDownloadInfo: function(e, t, n, o) {
            t || (t = "#a0a0a0");
            var i = document.createElement("span");
            i.appendChild(document.createTextNode(r.a.i18n.getMessage("downloadTitle"))), this.setStyle(i, {
                display: "inline-block",
                position: "relative",
                border: "1px solid " + t,
                borderRadius: "5px",
                fontSize: "13px",
                lineHeight: "17px",
                padding: "2px 19px 2px 5px",
                marginTop: "5px",
                opacity: .9
            }), n && this.setStyle(i, n);
            var a = document.createElement("span");
            a.textContent = String.fromCharCode(215), this.setStyle(a, {
                color: t,
                width: "14px",
                height: "14px",
                fontSize: "14px",
                fontWeight: "bold",
                lineHeight: "14px",
                position: "absolute",
                top: 0,
                right: 0,
                overflow: "hidden",
                cursor: "pointer"
            }), o && this.setStyle(a, o), a.addEventListener("click", (function() {
                i.parentNode.removeChild(i), r.a.sendMessage({
                    action: "updateOption",
                    key: "moduleShowDownloadInfo",
                    value: 0
                });
            }), !1), i.appendChild(a), e.appendChild(i);
        },
        getFileSizeIcon: function(e, t, n, o) {
            var i = this;
            o = o || {}, e = e || {}, t = t || {}, n = n || {};
            var a = function(e) {
                return A.a.create("div", {
                    style: t,
                    append: [ A.a.create($e.svg.getSvg("info", e), {
                        style: n
                    }) ]
                });
            }, s = A.a.create("div", {
                style: e,
                append: [ A.a.create(a("#333333"), {
                    title: r.a.i18n.getMessage("getFileSizeTitle"),
                    on: [ "click", function e(t) {
                        t.stopPropagation(), t.preventDefault(), s.textContent = "...";
                        var n = o.url;
                        n || (n = o.link && o.link.href), Object(h.a)({
                            action: "getFileSize",
                            url: n
                        }).then((function(e) {
                            if (e.error || !e.fileSize) throw new Error(JSON.stringify(e));
                            var t = e.fileType || "", n = i.sizeHuman(e.fileSize, 2), a = "";
                            if (o.link && /^audio\//i.test(t)) {
                                var l = parseInt(o.link.dataset.savefromHelperDuration);
                                l > 0 && (a += Math.floor(e.fileSize / l / 125), a += " " + r.a.i18n.getMessage("kbps"));
                            }
                            var c = "";
                            c += a ? n + " ~ " + a : n, o.brackets && (c = "(" + c + ")"), s.textContent = c, 
                            s.title = t;
                        })).catch((function(t) {
                            var n;
                            Je.error(t), "ZERO" === t.message ? (n = a("#ffac00")).title = r.a.i18n.getMessage("getFileSizeTitle") : (n = a("#ff0000")).title = r.a.i18n.getMessage("getFileSizeFailTitle"), 
                            n.addEventListener("click", e), s.textContent = "", s.appendChild(n);
                        }));
                    } ]
                }) ]
            });
            return {
                node: s
            };
        },
        appendFileSizeIcon: function(e, t, n, o, i, a) {
            t = t || {}, n = n || {};
            var s = "#333333";
            "0" === o ? s = "#ffac00" : o ? s = "#ff0000" : t.color && (s = t.color);
            var l = {
                width: "14px",
                height: "14px",
                marginLeft: "3px",
                verticalAlign: "middle",
                position: "relative",
                top: "-1px",
                cursor: "pointer"
            };
            Object.assign(l, t);
            var c = {
                fontSize: "75%",
                fontWeight: "normal",
                marginLeft: "3px",
                whiteSpace: "nowrap"
            };
            Object.assign(c, n);
            var u = A.a.create("img", {
                src: $e.svg.getSrc("info", s),
                title: o ? r.a.i18n.getMessage("getFileSizeFailTitle") : r.a.i18n.getMessage("getFileSizeTitle"),
                style: l
            }), d = this;
            return a ? a.appendChild(u) : e.nextSibling ? e.parentNode.insertBefore(u, e.nextSibling) : e.parentNode.appendChild(u), 
            u.addEventListener("click", (function(o) {
                o.preventDefault(), o.stopPropagation();
                var a = A.a.create("span", {
                    text: "...",
                    style: c
                });
                u.parentNode.replaceChild(a, u);
                const s = function(o) {
                    if (o.fileSize > 0) {
                        var s = o.fileType || "", l = d.sizeHuman(o.fileSize, 2), c = "";
                        if (/^audio\//i.test(s)) {
                            var u = e.getAttribute("data-savefrom-helper-duration");
                            (u = u && parseInt(u)) > 0 && (c = Math.floor(o.fileSize / u / 125), c += " " + r.a.i18n.getMessage("kbps"));
                        }
                        var p = "";
                        p = c ? l + " ~ " + c : l, i || (p = "(" + p + ")"), a.textContent = p, a.title = s;
                    } else if (o.error) {
                        var A = d.appendFileSizeIcon(e, t, n, !0, i, document.createDocumentFragment());
                        a.parentNode.replaceChild(A, a);
                    } else {
                        var f = d.appendFileSizeIcon(e, t, n, "0", i, document.createDocumentFragment());
                        a.parentNode.replaceChild(f, a);
                    }
                };
                return "ok.ru" === location.host ? fetch(e.href, {
                    method: "HEAD"
                }).then(e => ({
                    fileSize: e.headers.get("content-length"),
                    contentType: e.headers.get("content-type"),
                    status: e.status,
                    error: 200 !== e.status
                })).then(s).catch(() => s({
                    fileSize: 0,
                    error: !0
                })) : r.a.sendMessage({
                    action: "getFileSize",
                    url: e.href
                }, s);
            }), !1), u;
        },
        appendNoSoundIcon: function(e, t) {
            var n = "#ff0000";
            (t = t || {}).color && (n = t.color);
            var o = {
                width: "14px",
                height: "14px",
                marginLeft: "3px",
                verticalAlign: "middle",
                position: "relative",
                top: "-1px",
                cursor: "pointer"
            };
            Object.assign(o, t);
            var i = A.a.create("img", {
                src: $e.svg.getSrc("noSound", n),
                title: r.a.i18n.getMessage("withoutAudio"),
                style: o
            });
            e.nextSibling ? e.parentNode.insertBefore(i, e.nextSibling) : e.parentNode ? e.parentNode.appendChild(i) : e.appendChild(i);
        },
        video: {
            dataAttr: "data-savefrom-video-visible",
            yt: {
                inited: !1,
                show3D: !1,
                showMP4NoAudio: !1,
                showFormat: {
                    FLV: !0,
                    MP4: !0,
                    WebM: !1,
                    "3GP": !1,
                    "Audio AAC": !1,
                    "Audio Vorbis": !1,
                    "Audio Opus": !1
                },
                format: {
                    FLV: {
                        5: {
                            quality: "240"
                        },
                        6: {
                            quality: "270"
                        },
                        34: {
                            quality: "360"
                        },
                        35: {
                            quality: "480"
                        }
                    },
                    MP4: {
                        18: {
                            quality: "360"
                        },
                        22: {
                            quality: "720"
                        },
                        37: {
                            quality: "1080"
                        },
                        38: {
                            quality: "8K"
                        },
                        59: {
                            quality: "480"
                        },
                        78: {
                            quality: "480"
                        },
                        82: {
                            quality: "360",
                            "3d": !0
                        },
                        83: {
                            quality: "240",
                            "3d": !0
                        },
                        84: {
                            quality: "720",
                            "3d": !0
                        },
                        85: {
                            quality: "1080",
                            "3d": !0
                        },
                        160: {
                            quality: "144",
                            noAudio: !0
                        },
                        133: {
                            quality: "240",
                            noAudio: !0
                        },
                        134: {
                            quality: "360",
                            noAudio: !0
                        },
                        135: {
                            quality: "480",
                            noAudio: !0
                        },
                        136: {
                            quality: "720",
                            noAudio: !0
                        },
                        137: {
                            quality: "1080",
                            noAudio: !0
                        },
                        212: {
                            quality: "480",
                            noAudio: !0
                        },
                        213: {
                            quality: "480",
                            noAudio: !0
                        },
                        214: {
                            quality: "720",
                            noAudio: !0
                        },
                        215: {
                            quality: "720",
                            noAudio: !0
                        },
                        264: {
                            quality: "1440",
                            noAudio: !0
                        },
                        138: {
                            quality: "8K",
                            noAudio: !0
                        },
                        298: {
                            quality: "720",
                            noAudio: !0,
                            sFps: !0
                        },
                        299: {
                            quality: "1080",
                            noAudio: !0,
                            sFps: !0
                        },
                        266: {
                            quality: "4K",
                            noAudio: !0
                        }
                    },
                    WebM: {
                        43: {
                            quality: "360"
                        },
                        44: {
                            quality: "480"
                        },
                        45: {
                            quality: "720"
                        },
                        46: {
                            quality: "1080"
                        },
                        167: {
                            quality: "360",
                            noAudio: !0
                        },
                        168: {
                            quality: "480",
                            noAudio: !0
                        },
                        169: {
                            quality: "720",
                            noAudio: !0
                        },
                        170: {
                            quality: "1080",
                            noAudio: !0
                        },
                        218: {
                            quality: "480",
                            noAudio: !0
                        },
                        219: {
                            quality: "480",
                            noAudio: !0
                        },
                        242: {
                            quality: "240",
                            noAudio: !0
                        },
                        243: {
                            quality: "360",
                            noAudio: !0
                        },
                        244: {
                            quality: "480",
                            noAudio: !0
                        },
                        245: {
                            quality: "480",
                            noAudio: !0
                        },
                        246: {
                            quality: "480",
                            noAudio: !0
                        },
                        247: {
                            quality: "720",
                            noAudio: !0
                        },
                        248: {
                            quality: "1080",
                            noAudio: !0
                        },
                        271: {
                            quality: "1440",
                            noAudio: !0
                        },
                        272: {
                            quality: "8K",
                            noAudio: !0
                        },
                        278: {
                            quality: "144",
                            noAudio: !0
                        },
                        100: {
                            quality: "360",
                            "3d": !0
                        },
                        101: {
                            quality: "480",
                            "3d": !0
                        },
                        102: {
                            quality: "720",
                            "3d": !0
                        },
                        302: {
                            quality: "720",
                            noAudio: !0,
                            sFps: !0
                        },
                        303: {
                            quality: "1080",
                            noAudio: !0,
                            sFps: !0
                        },
                        308: {
                            quality: "1440",
                            noAudio: !0,
                            sFps: !0
                        },
                        313: {
                            quality: "4K",
                            noAudio: !0
                        },
                        315: {
                            quality: "4K",
                            noAudio: !0,
                            sFps: !0
                        },
                        330: {
                            quality: "144",
                            noAudio: !0,
                            sFps: !0
                        },
                        331: {
                            quality: "240",
                            noAudio: !0,
                            sFps: !0
                        },
                        332: {
                            quality: "360",
                            noAudio: !0,
                            sFps: !0
                        },
                        333: {
                            quality: "480",
                            noAudio: !0,
                            sFps: !0
                        },
                        334: {
                            quality: "720",
                            noAudio: !0,
                            sFps: !0
                        },
                        335: {
                            quality: "1080",
                            noAudio: !0,
                            sFps: !0
                        },
                        336: {
                            quality: "1440",
                            noAudio: !0,
                            sFps: !0
                        },
                        337: {
                            quality: "2160",
                            noAudio: !0,
                            sFps: !0
                        },
                        398: {
                            quality: "720",
                            noAudio: !0
                        },
                        397: {
                            quality: "480",
                            noAudio: !0
                        },
                        396: {
                            quality: "360",
                            noAudio: !0
                        },
                        395: {
                            quality: "240",
                            noAudio: !0
                        },
                        394: {
                            quality: "144",
                            noAudio: !0
                        }
                    },
                    "3GP": {
                        17: {
                            quality: "144"
                        },
                        36: {
                            quality: "240"
                        }
                    },
                    "Audio AAC": {
                        139: {
                            quality: "48",
                            ext: "m4a",
                            noVideo: !0
                        },
                        140: {
                            quality: "128",
                            ext: "m4a",
                            noVideo: !0
                        },
                        141: {
                            quality: "256",
                            ext: "m4a",
                            noVideo: !0
                        },
                        256: {
                            quality: "192",
                            ext: "m4a",
                            noVideo: !0
                        },
                        258: {
                            quality: "384",
                            ext: "m4a",
                            noVideo: !0
                        },
                        325: {
                            quality: "384",
                            ext: "m4a",
                            noVideo: !0
                        },
                        328: {
                            quality: "384",
                            ext: "m4a",
                            noVideo: !0
                        },
                        380: {
                            quality: "384",
                            ext: "m4a",
                            noVideo: !0
                        }
                    },
                    "Audio Vorbis": {
                        171: {
                            quality: "128",
                            ext: "webm",
                            noVideo: !0
                        },
                        172: {
                            quality: "192",
                            ext: "webm",
                            noVideo: !0
                        }
                    },
                    "Audio Opus": {
                        249: {
                            quality: "48",
                            ext: "opus",
                            noVideo: !0
                        },
                        250: {
                            quality: "128",
                            ext: "opus",
                            noVideo: !0
                        },
                        251: {
                            quality: "256",
                            ext: "opus",
                            noVideo: !0
                        }
                    }
                },
                init: function() {
                    if (!$e.video.yt.inited) {
                        [ "Audio AAC", "Audio Vorbis", "Audio Opus" ].forEach((function(e) {
                            var t = $e.video.yt.format[e];
                            for (var n in t) t[n].quality += " " + r.a.i18n.getMessage("kbps");
                        })), $e.video.yt.show3D = "0" == Xe.preferences.ytHide3D, $e.video.yt.showMP4NoAudio = "0" == Xe.preferences.ytHideMP4NoAudio;
                        var e = !1, t = !1;
                        for (var n in $e.video.yt.showFormat) {
                            var o = "ytHide" + n.replace(" ", "_");
                            "ytHideAudio_AAC" === o && (o = "ytHideAudio_MP4");
                            var i = "0" == Xe.preferences[o];
                            "Audio AAC" === n && (t = i), $e.video.yt.showFormat[n] = i, i && (e = !0);
                        }
                        $e.video.yt.showFormat["Audio Vorbis"] = t, $e.video.yt.showFormat["Audio Opus"] = t, 
                        e || ($e.video.yt.showFormat.FLV = !0), $e.video.yt.inited = !0;
                    }
                },
                show: function(e, t, n, o, i) {
                    o = o || {};
                    var a = document.createElement("div");
                    $e.setStyle(a, {
                        display: "inline-block",
                        margin: "0 auto"
                    }), t.appendChild(a);
                    var s = document.createElement("div");
                    $e.setStyle(s, {
                        display: "inline-block",
                        padding: "0 90px 0 0",
                        position: "relative"
                    }), a.appendChild(s);
                    var l = document.createElement("table");
                    $e.setStyle(l, {
                        emptyCells: "show",
                        borderCollapse: "collapse",
                        margin: "0 auto",
                        padding: "0",
                        width: "auto"
                    }), s.appendChild(l);
                    var c = !1;
                    for (var u in $e.video.yt.format) $e.video.yt.append(e, u, $e.video.yt.format[u], l, o, i) && (c = !0);
                    for (var u in e) if ("ummy" !== u && "ummyAudio" !== u && "meta" !== u) {
                        $e.video.yt.append(e, "", null, l, o, i) && (c = !0);
                        break;
                    }
                    if (l.firstChild) {
                        if (c) {
                            var d = document.createElement("span");
                            if (d.textContent = r.a.i18n.getMessage("more") + " " + String.fromCharCode(187), 
                            $e.setStyle(d, {
                                color: "#555",
                                border: "1px solid #a0a0a0",
                                borderRadius: "3px",
                                display: "block",
                                fontFamily: "Arial",
                                fontSize: "15px",
                                lineHeight: "17px",
                                padding: "1px 5px",
                                position: "absolute",
                                bottom: "3px",
                                right: "0",
                                cursor: "pointer"
                            }), o.btn && "object" == typeof o.btn && $e.setStyle(d, o.btn), s.appendChild(d), 
                            d.addEventListener("click", (function(e) {
                                e.preventDefault(), e.stopPropagation();
                                for (var n = t.querySelectorAll("*[" + $e.video.dataAttr + "]"), o = 0; o < n.length; o++) {
                                    var i = n[o].getAttribute($e.video.dataAttr), a = "none", s = String.fromCharCode(187);
                                    "0" == i ? (i = "1", a = "", s = String.fromCharCode(171)) : i = "0", n[o].style.display = a, 
                                    n[o].setAttribute($e.video.dataAttr, i), this.textContent = r.a.i18n.getMessage("more") + " " + s;
                                }
                                return !1;
                            }), !1), 1 === n) {
                                l.querySelector("td a");
                                a.appendChild(document.createElement("br")), $e.appendDownloadInfo(a, "#a0a0a0", null, {
                                    width: "16px",
                                    height: "16px",
                                    fontSize: "16px",
                                    lineHeight: "16px"
                                });
                            }
                        }
                    } else t.textContent = r.a.i18n.getMessage("noLinksFound");
                },
                append: function(e, t, n, o, i, a) {
                    var s = !1, l = {
                        whiteSpace: "nowrap"
                    }, c = {
                        fontSize: "75%",
                        fontWeight: "normal",
                        marginLeft: "3px",
                        whiteSpace: "nowrap"
                    }, u = document.createElement("tr"), d = document.createElement("td");
                    d.appendChild(document.createTextNode(t || "???")), t && $e.video.yt.showFormat[t] || (u.setAttribute($e.video.dataAttr, "0"), 
                    u.style.display = "none", s = !0), $e.setStyle(d, {
                        border: "none",
                        padding: "3px 15px 3px 0",
                        textAlign: "left",
                        verticalAlign: "middle"
                    }), u.appendChild(d), d = document.createElement("td"), $e.setStyle(d, {
                        border: "none",
                        padding: "3px 0",
                        textAlign: "left",
                        verticalAlign: "middle",
                        lineHeight: "17px"
                    }), u.appendChild(d);
                    var p = e.meta || {}, A = !1;
                    if (n) {
                        for (var f in n) if (e[f]) {
                            var h = n[f].quality;
                            A && (d.lastChild.style.marginRight = "15px", d.appendChild(document.createTextNode(" ")));
                            const o = document.createElement("span");
                            o.style.whiteSpace = "nowrap";
                            const u = document.createElement("a");
                            if (u.href = e[f], u.title = r.a.i18n.getMessage("downloadTitle"), p[f] && (p[f].quality && (h = p[f].quality), 
                            n[f].sFps && (h += " " + (p[f].fps || 60))), n[f]["3d"] ? u.textContent = "3D" : u.textContent = h, 
                            a) {
                                var m = n[f].ext;
                                m || (m = t.toLowerCase()), u.setAttribute("download", g.a.modify(a + "." + m)), 
                                u.addEventListener("click", (function(e) {
                                    $e.downloadOnClick(e);
                                }), !1);
                            }
                            if ($e.setStyle(u, l), i.link && "object" == typeof i.link && $e.setStyle(u, i.link), 
                            o.appendChild(u), $e.appendFileSizeIcon(u, i.fsIcon, i.fsText), n[f]["3d"]) {
                                $e.video.yt.show3D || (s = !0, o.setAttribute($e.video.dataAttr, "0"), o.style.display = "none");
                                var v = document.createElement("span");
                                v.textContent = h, $e.setStyle(v, c), i.text && "object" == typeof i.text && $e.setStyle(v, i.text), 
                                u.appendChild(v);
                            }
                            n[f].noAudio && ($e.video.yt.showMP4NoAudio || (s = !0, o.setAttribute($e.video.dataAttr, "0"), 
                            o.style.display = "none"), $e.appendNoSoundIcon(u, !!i && i.noSoundIcon)), d.appendChild(o), 
                            A = !0, delete e[f];
                        }
                    } else for (var f in e) {
                        A && (d.lastChild.style.marginRight = "15px", d.appendChild(document.createTextNode(" ")));
                        const t = document.createElement("span");
                        t.style.whiteSpace = "nowrap";
                        const n = document.createElement("a");
                        n.href = e[f], n.title = r.a.i18n.getMessage("downloadTitle"), n.textContent = f, 
                        $e.setStyle(n, l), i.link && "object" == typeof i.link && $e.setStyle(n, i.link), 
                        t.appendChild(n), $e.appendFileSizeIcon(n, i.fsIcon, i.fsText), d.appendChild(t), 
                        A = !0, delete e[f];
                    }
                    if (!1 !== A) return o.appendChild(u), s;
                }
            }
        },
        playlist: {
            btnStyle: {
                display: "block",
                fontWeight: "bold",
                border: "none",
                textDecoration: "underline"
            },
            getFilelistHtml: function(e) {
                if (e && 0 != e.length) {
                    for (var t, n = 0, o = "", i = 0; i < e.length; i++) e[i].url && (o += e[i].url + "\r\n", 
                    n++);
                    if (o) return n < 5 ? n = 5 : n > 14 && (n = 14), A.a.create(document.createDocumentFragment(), {
                        append: [ A.a.create("p", {
                            text: r.a.i18n.getMessage("filelistTitle"),
                            style: {
                                color: "#0D0D0D",
                                fontSize: "20px",
                                marginBottom: "11px",
                                marginTop: "5px"
                            }
                        }), A.a.create("p", {
                            style: {
                                marginBottom: "11px"
                            },
                            append: Object(f.a)(r.a.i18n.getMessage("filelistInstruction"))
                        }), A.a.create("p", {
                            text: r.a.i18n.getMessage("vkFoundFiles").replace("%d", e.length),
                            style: {
                                color: "#000",
                                marginBottom: "11px"
                            },
                            append: A.a.create("a", {
                                text: r.a.i18n.getMessage("playlist"),
                                href: "#",
                                class: "sf__playlist",
                                style: {
                                    display: "none",
                                    cssFloat: "right"
                                }
                            })
                        }), t = A.a.create("textarea", {
                            text: o,
                            rows: n,
                            cols: 60,
                            style: {
                                width: "100%",
                                whiteSpace: r.a.isFirefox || r.a.isGM && !r.a.isTM ? "normal" : "nowrap"
                            }
                        }), r.a.isChrome || r.a.isFirefox ? A.a.create("button", {
                            text: r.a.i18n.getMessage("copy"),
                            style: {
                                height: "27px",
                                backgroundColor: "#ffffff",
                                border: "1px solid #9e9e9e",
                                marginTop: "6px",
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                borderRadius: "5px",
                                fontSize: "14px",
                                cursor: "pointer",
                                cssFloat: "right"
                            },
                            on: [ "click", function(e) {
                                var n = this;
                                n.disabled = !0, r.a.isFirefox ? (t.select(), document.execCommand("copy")) : r.a.sendMessage({
                                    action: "addToClipboard",
                                    text: o
                                }), setTimeout((function() {
                                    n.disabled = !1;
                                }), 1e3);
                            } ],
                            append: A.a.create("style", {
                                text: Object(s.a)({
                                    "#savefrom_popup_box": {
                                        append: {
                                            "button:hover:not(:disabled)": {
                                                backgroundColor: "#597A9E !important",
                                                borderColor: "#597A9E !important",
                                                color: "#fff"
                                            },
                                            "button:active": {
                                                opacity: .9
                                            }
                                        }
                                    }
                                })
                            })
                        }) : void 0 ]
                    });
                }
            },
            popupFilelist: function(e, t, n, o) {
                var r = $e.playlist.getFilelistHtml(e);
                if (r) {
                    var i = $e.popupDiv(r, o);
                    if (n) {
                        var a = i.querySelector("a.sf__playlist");
                        a && (a.addEventListener("click", (function(n) {
                            return setTimeout((function() {
                                $e.playlist.popupPlaylist(e, t, !0, o);
                            }), 100), n.preventDefault(), !1;
                        }), !1), $e.setStyle(a, $e.playlist.btnStyle));
                    }
                }
            },
            getInfoPopupTemplate: function() {
                var e = A.a.create("div", {
                    class: "sf-infoPopupTemplate",
                    style: {
                        width: "400px",
                        minHeight: "40px"
                    }
                }), t = A.a.create("div", {
                    style: {
                        backgroundSize: "48px",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center top",
                        display: "inline-block",
                        width: "60px",
                        height: "60px",
                        cssFloat: "left",
                        marginTop: "16px",
                        marginRight: "10px"
                    }
                }), n = A.a.create("div", {
                    style: {
                        display: "inline-block",
                        width: "330px"
                    }
                }), o = A.a.create("div", {
                    style: {
                        textAlign: "right"
                    },
                    append: A.a.create("style", {
                        text: Object(s.a)({
                            ".sf-infoPopupTemplate": {
                                append: [ {
                                    "a.sf-button": {
                                        padding: "1px 6px",
                                        display: "inline-block",
                                        textAlign: "center",
                                        height: "23px",
                                        lineHeight: "23px",
                                        textDecoration: "none"
                                    }
                                }, {
                                    selector: [ "button:hover", "a.sf-button:hover" ],
                                    style: {
                                        backgroundColor: "#597A9E !important",
                                        borderColor: "#597A9E !important",
                                        color: "#fff"
                                    }
                                } ]
                            }
                        })
                    })
                });
                return e.appendChild(t), e.appendChild(n), e.appendChild(o), {
                    icon: t,
                    buttonContainer: o,
                    textContainer: n,
                    body: e
                };
            },
            getM3U: function(e) {
                for (var t = "#EXTM3U\r\n", n = 0; n < e.length; n++) e[n].duration || (e[n].duration = "-1"), 
                (e[n].title || e[n].duration) && (t += "#EXTINF:" + e[n].duration + "," + e[n].title + "\r\n"), 
                t += e[n].url + "\r\n";
                return t;
            },
            getPlaylistHtml: function(e, t) {
                if (e && 0 != e.length) {
                    var n = e.length, o = $e.dateToObj(), i = o.year + "-" + o.month + "-" + o.day + " " + o.hour + "-" + o.min, a = $e.playlist.getM3U(e);
                    a = a.replace(/\r\n/g, "\n");
                    var s = Object(u.a)(a, "audio/x-mpegurl"), l = $e.playlist.getInfoPopupTemplate();
                    return r.a.sendMessage({
                        action: "getWarningIcon",
                        color: "#00CCFF",
                        type: "playlist"
                    }, (function(e) {
                        l.icon.style.backgroundImage = "url(" + e + ")";
                    })), A.a.create(l.textContainer, {
                        append: [ A.a.create("p", {
                            text: t || r.a.i18n.getMessage("playlistTitle"),
                            style: {
                                color: "#0D0D0D",
                                fontSize: "20px",
                                marginBottom: "11px",
                                marginTop: "13px"
                            }
                        }), A.a.create("p", {
                            text: r.a.i18n.getMessage("playlistInstruction"),
                            style: {
                                color: "#868686",
                                fontSize: "14px",
                                marginBottom: "13px",
                                lineHeight: "24px",
                                marginTop: "0px"
                            }
                        }), A.a.create("a", {
                            text: r.a.i18n.getMessage("filelist") + " (" + n + ")",
                            href: "#",
                            class: "sf__playlist",
                            style: {
                                display: "none",
                                fontSize: "14px",
                                marginBottom: "13px",
                                lineHeight: "24px",
                                marginTop: "0px"
                            }
                        }) ]
                    }), t || (t = "playlist"), t += " " + i, A.a.create(l.buttonContainer, {
                        append: [ A.a.create("a", {
                            text: r.a.i18n.getMessage("download"),
                            href: s,
                            download: g.a.modify(t + ".m3u"),
                            class: "sf-button",
                            style: {
                                width: "118px",
                                backgroundColor: "#ffffff",
                                border: "1px solid #9e9e9e",
                                margin: "12px",
                                marginBottom: "11px",
                                marginRight: "8px",
                                borderRadius: "5px",
                                fontSize: "14px",
                                cursor: "pointer"
                            }
                        }) ]
                    }), l.body;
                }
            },
            popupPlaylist: function(e, t, n, o) {
                var r = $e.playlist.getPlaylistHtml(e, t);
                if (r) {
                    var i = $e.popupDiv(r, o);
                    if (n) {
                        var a = i.querySelector("a.sf__playlist");
                        a && (a.addEventListener("click", (function(n) {
                            return setTimeout((function() {
                                $e.playlist.popupFilelist(e, t, !0, o);
                            }), 100), n.preventDefault(), !1;
                        }), !1), a.style.display = "inline", a = null);
                    }
                    for (var s, l = i.querySelectorAll("a[download]"), c = 0; s = l[c]; c++) s.addEventListener("click", $e.downloadOnClick, !1);
                }
            }
        },
        popupCloseBtn: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAWUlEQVQ4y2NgGHHAH4j1sYjrQ+WIAvFA/B+I36MZpg8V+w9VQ9Al/5EwzDBkQ2AYr8uwaXiPQ0yfkKuwGUayIYQMI8kQqhlEFa9RLbCpFv1US5BUzSLDBAAARN9OlWGGF8kAAAAASUVORK5CYII=",
        popupDiv: function(e, t, n, o, r) {
            let i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {
                docCloseEnable: !0
            };
            t || (t = "savefrom_popup_box"), n || (n = 580), o || (o = 520);
            var a = document.getElementById(t);
            a && a.parentNode.removeChild(a), a = A.a.create("div", {
                id: t,
                style: {
                    zIndex: "9999",
                    display: "block",
                    cssFloat: "none",
                    position: "fixed",
                    margin: "0",
                    padding: "0",
                    visibility: "hidden",
                    color: "#000",
                    background: "#fff",
                    border: "3px solid #c0cad5",
                    borderRadius: "7px",
                    overflow: "auto"
                }
            });
            var s = A.a.create("div", {
                style: {
                    display: "block",
                    cssFloat: "none",
                    position: "relative",
                    overflow: "auto",
                    margin: "0",
                    padding: "10px 15px"
                }
            });
            "function" == typeof e ? e(s) : s.appendChild(e);
            var l = A.a.create("img", {
                src: $e.popupCloseBtn,
                alt: "x",
                width: 18,
                height: 18,
                style: {
                    position: "absolute",
                    top: "10px",
                    right: "15px",
                    opacity: "0.5",
                    cursor: "pointer"
                },
                on: [ [ "mouseenter", function() {
                    this.style.opacity = "0.9";
                } ], [ "mouseleave", function() {
                    this.style.opacity = "0.5";
                } ], [ "click", function() {
                    return a.parentNode && a.parentNode.removeChild(a), r && r(), !1;
                } ] ]
            });
            s.appendChild(l), a.appendChild(s), document.body.appendChild(a), a.offsetWidth > n && (a.style.width = n + "px"), 
            a.offsetHeight > o && (a.style.height = o + "px", a.style.width = n + 20 + "px"), 
            setTimeout((function() {
                var e = Math.floor((window.innerWidth - a.offsetWidth) / 2), t = Math.floor((window.innerHeight - a.offsetHeight) / 2);
                t < 0 && (t = 0), -1 !== location.host.indexOf("youtu") && t < 92 && (t = 92, a.style.height = a.offsetHeight - t - 10 + "px"), 
                e < 0 && (e = 0), $e.setStyle(a, {
                    top: t + "px",
                    left: e + "px",
                    visibility: "visible"
                });
            }));
            var c = function e(t) {
                if (i && !i.docCloseEnable) return !1;
                var n = t.target;
                n === a || $e.isParent(n, a) || (a.parentNode && a.parentNode.removeChild(a), document.removeEventListener("click", e, !1), 
                r && r());
            };
            return setTimeout((function() {
                document.addEventListener("click", c, !1);
            }), 100), a.addEventListener("close", (function() {
                a.parentNode && a.parentNode.removeChild(a), document.removeEventListener("click", c, !1), 
                r && r();
            })), a.addEventListener("kill", (function() {
                a.parentNode && a.parentNode.removeChild(a), document.removeEventListener("click", c, !1);
            })), a;
        },
        popupDiv2: function(e) {
            var t = {
                id: "savefrom_popup_box",
                containerStyle: null,
                bodyStyle: null,
                content: null,
                container: null,
                body: null,
                _onClose: function() {
                    document.removeEventListener("click", t._onClose), n.parentNode && n.parentNode.removeChild(n), 
                    t.onClose && t.onClose();
                }
            };
            Object.assign(t, e);
            var n = t.container = A.a.create("div", {
                id: t.id,
                style: {
                    zIndex: 9999,
                    display: "block",
                    position: "fixed",
                    background: "#fff",
                    border: "3px solid #c0cad5",
                    borderRadius: "7px"
                },
                append: [ A.a.create("style", {
                    text: Object(s.a)({
                        selector: "#" + t.id,
                        style: p
                    })
                }) ],
                on: [ [ "click", function(e) {
                    e.stopPropagation();
                } ] ]
            }), o = A.a.create("img", {
                src: $e.popupCloseBtn,
                alt: "x",
                width: 18,
                height: 18,
                style: {
                    position: "absolute",
                    top: "10px",
                    right: "15px",
                    opacity: "0.5",
                    cursor: "pointer"
                },
                on: [ [ "mouseenter", function() {
                    this.style.opacity = "0.9";
                } ], [ "mouseleave", function() {
                    this.style.opacity = "0.5";
                } ], [ "click", t._onClose ] ]
            });
            n.appendChild(o);
            var r = t.body = A.a.create("div", {
                style: i({
                    display: "block",
                    position: "relative",
                    padding: "10px 15px",
                    overflow: "auto"
                }, t.bodyStyle)
            });
            return "function" == typeof t.content ? t.content(r) : r.appendChild(t.content), 
            n.appendChild(r), document.body.appendChild(n), document.addEventListener("click", t._onClose), 
            t;
        },
        showTooltip: function(e, t, n, o) {
            if (e) {
                var r = document.querySelector(".savefrom-tooltip");
                r || ((r = document.createElement("div")).className = "savefrom-tooltip", $e.setStyle(r, {
                    position: "absolute",
                    opacity: 0,
                    zIndex: -1
                }), o && $e.setStyle(r, o)), r.textContent = t, r.lastNode && r.lastNode === e || (r.lastNode && (d.a.off(r.lastNode, "mouseleave", a), 
                d.a.off(r.lastNode, "mousemove", i), r.lastRow && d.a.off(r.lastRow, "mouseleave", a)), 
                r.lastNode = e, n && (r.lastRow = n), d.a.on(e, "mouseleave", a), d.a.on(e, "mousemove", i, !1), 
                n && d.a.on(n, "mouseleave", a), document.body.appendChild(r)), i();
            }
            function i(t) {
                void 0 !== t && t.stopPropagation();
                var n = $e.getPosition(e), o = $e.getSize(r);
                0 == n.top && 0 == n.left || (n.top = n.top - o.height - 10, n.left = n.left - o.width / 2 + $e.getSize(e).width / 2, 
                n.left = Math.min(n.left, document.body.clientWidth + document.body.scrollLeft - o.width), 
                n.top < document.body.scrollTop && (n.top = n.top + o.height + $e.getSize(e).height + 20), 
                n.top += "px", n.left += "px", n.zIndex = 9999, n.opacity = 1, $e.setStyle(r, n));
            }
            function a() {
                r.parentNode && document.body.removeChild(r), r.lastNode = null, r.lastRow = null, 
                $e.setStyle(r, {
                    zIndex: -1,
                    opacity: 0
                }), d.a.off(e, "mouseleave", a), d.a.off(e, "mousemove", i), n && d.a.off(n, "mouseleave", a);
            }
        },
        embedDownloader: {
            dataAttr: "data-savefrom-get-links",
            dataIdAttr: "data-savefrom-container-id",
            containerClass: "savefrom-links-container",
            linkClass: "savefrom-link",
            panel: null,
            lastLink: null,
            style: null,
            hostings: {
                youtube: {
                    re: [ /^https?:\/\/(?:[a-z]+\.)?youtube\.com\/(?:#!?\/)?watch\?.*v=([\w\-]+)/i, /^https?:\/\/(?:[a-z0-9]+\.)?youtube\.com\/(?:embed|v)\/([\w\-]+)/i, /^https?:\/\/(?:[a-z]+\.)?youtu\.be\/([\w\-]+)/i ],
                    action: "getYoutubeLinks",
                    prepareLinks: function(e) {
                        var t = [], n = $e.video.yt.format, o = e.meta || {};
                        for (var r in n) for (var i in n[r]) {
                            var a = o[i] || {};
                            if (e[i]) {
                                var s = r;
                                n[r][i].ext && (s = n[r][i].ext);
                                var l = n[r][i].quality;
                                a.quality && (l = a.quality), n[r][i].sFps && (l += " " + (a.fps || 60)), n[r][i]["3d"] && (l += " (3d)"), 
                                t.push({
                                    name: r + " " + l,
                                    type: s,
                                    url: e[i],
                                    noSound: n[r][i].noAudio
                                });
                            }
                        }
                        return t;
                    }
                },
                vimeo: {
                    re: [ /^https?:\/\/(?:[\w\-]+\.)?vimeo\.com\/(?:\w+\#)?(\d+)/i, /^https?:\/\/player\.vimeo\.com\/video\/(\d+)/i, /^https?:\/\/(?:[\w\-]+\.)?vimeo\.com\/channels\/(?:[^\/]+)\/(\d+)$/i, /^https?:\/\/vimeo\.com\/(?:.+)clip_id=(\d+)/i ],
                    action: "getVimeoLinks",
                    prepareLinks: function(e) {
                        return e.map((function(e) {
                            var t = e.ext;
                            return t || (t = "MP4", -1 != e.url.search(/\.flv($|\?)/i) && (t = "FLV")), e.name = e.name ? e.name : t, 
                            e.type = e.type ? e.type : t, e.ext = t, e;
                        }));
                    }
                },
                vk: {
                    re: [ /^https?:\/\/(?:[\w\-]+\.)?(?:vk\.com|vkontakte\.ru)\/(?:[^\/]+\/)*(?:[\w\-\.]+\?.*z=)?(video-?\d+_-?\d+\?list=[0-9a-z]+|video-?\d+_-?\d+)/i, /^https?:\/\/(?:[\w\-]+\.)?(?:vk\.com|vkontakte\.ru)\/video_ext\.php\?(.+)/i ],
                    action: "getVKLinks"
                },
                dailymotion: {
                    re: [ /^http:\/\/(?:www\.)?dai\.ly\/([a-z0-9]+)_?/i, /^https?:\/\/(?:[\w]+\.)?dailymotion\.com(?:\/embed|\/swf)?\/video\/([a-z0-9]+)_?/i ],
                    action: "getDailymotionLinks"
                },
                facebook: {
                    re: [ /^https?:\/\/(?:[\w]+\.)?facebook\.com(?:\/video)?\/video.php.*[?&]{1}v=([0-9]+).*/i, /^https?:\/\/(?:[\w]+\.)?facebook\.com\/.+\/videos(?:\/\w[^\/]+)?\/(\d+)/i ],
                    action: "getFacebookLinks"
                }
            },
            init: function(e) {
                this.style = e, this.panel && $e.popupMenu.removePanel(), this.panel = null, this.lastLink = null;
                var t, n = document.querySelectorAll("a[" + this.dataAttr + "]"), o = n.length;
                for (t = 0; t < o; t++) [ "savefrom.net", "sf-addon.com" ].indexOf($e.getTopLevelDomain(n[t].hostname)) > -1 && (n[t].removeEventListener("click", this.onClick, !1), 
                n[t].addEventListener("click", this.onClick, !1));
                document.body && (document.body.removeEventListener("click", this.onBodyClick, !0), 
                document.body.addEventListener("click", this.onBodyClick, !0));
            },
            checkUrl: function(e) {
                for (var t in this.hostings) for (var n = this.hostings[t], o = 0, r = n.re.length; o < r; o++) {
                    var i = e.match(n.re[o]);
                    if (i) return {
                        hosting: t,
                        action: n.action,
                        extVideoId: i[1]
                    };
                }
                return null;
            },
            reMapHosting: function(e) {
                return {
                    getYoutubeLinks: "youtube",
                    getVimeoLinks: "vimeo",
                    getDailymotionLinks: "dailymotion",
                    getFacebookLinks: "facebook",
                    getVKLinks: "vk"
                }[e];
            },
            onClick: function(e, t) {
                var n = $e.embedDownloader;
                if (!t) {
                    for (t = e.target; t.parentNode && "A" !== t.nodeName; ) t = t.parentNode;
                    if (!t) return;
                }
                var o = t.getAttribute("data-savefrom-get-links");
                if (o && 0 === e.button && !e.ctrlKey && !e.shiftKey) {
                    if (n.lastLink === t && n.panel && "none" != n.panel.style.display) return n.lastLink = null, 
                    n.panel.style.display = "none", e.preventDefault(), void e.stopPropagation();
                    n.lastLink = t;
                    var i = n.checkUrl(o);
                    if (i) {
                        e.preventDefault(), e.stopPropagation();
                        var a = {
                            action: i.action,
                            extVideoId: i.extVideoId
                        };
                        return n.showLinks(r.a.i18n.getMessage("download") + " ...", null, t), r.a.sendMessage(a, (function(e) {
                            var o = i.hosting;
                            e.action != a.action && (o = n.reMapHosting(e.action)), e.links ? n.showLinks(e.links, e.title, t, o, !0) : n.showLinks(r.a.i18n.getMessage("noLinksFound"), null, t, void 0, !0);
                        })), !1;
                    }
                }
            },
            onBodyClick: function(e) {
                var t = $e.embedDownloader, n = e.target;
                if (!t.panel || "none" == t.panel.style.display) {
                    if ("A" !== n.tagName && Object(l.a)(n, "A " + n.tagName)) for (;n.parentNode && "A" !== n.tagName; ) n = n.parentNode;
                    if ("A" !== n.nodeName) return;
                    return n.hasAttribute(t.dataAttr) && [ "savefrom.net", "sf-addon.com" ].indexOf($e.getTopLevelDomain(n.hostname)) > -1 ? t.onClick(e, n) : void 0;
                }
                t.panel === n || t.panel.contains(n) || (t.lastLink = null, t.panel.style.display = "none", 
                e.preventDefault(), e.stopPropagation());
            },
            hidePanel: function() {
                this.panel && (this.panel.style.display = "none");
            },
            createMenu: function(e, t, n, o, i) {
                var a = r.a.i18n.getMessage("noLinksFound");
                "string" == typeof e ? a = e : void 0 !== $e.popupMenu.prepareLinks[o] && e && (a = $e.popupMenu.prepareLinks[o](e, t));
                var s = {
                    links: a,
                    button: n,
                    popupId: void 0,
                    showFileSize: !0,
                    containerClass: this.containerClass,
                    linkClass: this.linkClass,
                    style: {
                        popup: this.style ? this.style.container : void 0,
                        item: this.style ? this.style.link : void 0
                    },
                    isUpdate: i
                };
                i && this.panel ? $e.popupMenu.update(this.panel, s) : this.panel = $e.popupMenu.create(s);
            },
            showLinks: function(e, t, n, o, i) {
                var a, s = n.getAttribute(this.dataIdAttr);
                if (s && (a = document.getElementById(s)), a) if (this.panel && (this.panel.style.display = "none"), 
                "string" == typeof e) a.textContent = e; else if (e && 0 != e.length) {
                    o && this.hostings[o] && this.hostings[o].prepareLinks && (e = this.hostings[o].prepareLinks(e)), 
                    a.textContent = "";
                    for (var l = 0; l < e.length; l++) if (e[l].url && e[l].name) {
                        (n = document.createElement("a")).href = e[l].url, n.title = r.a.i18n.getMessage("downloadTitle"), 
                        n.appendChild(document.createTextNode(e[l].name));
                        var c = document.createElement("span");
                        c.className = this.linkClass, c.appendChild(n), a.appendChild(c), $e.appendFileSizeIcon(n), 
                        e[l].noSound && $e.appendNoSoundIcon(n), t && !e[l].noTitle && e[l].type && (n.setAttribute("download", g.a.modify(t + "." + e[l].type.toLowerCase())), 
                        n.addEventListener("click", $e.downloadOnClick, !1));
                    }
                } else a.textContent = r.a.i18n.getMessage("noLinksFound"); else this.createMenu(e, t, n, o, i);
            }
        },
        popupMenu: {
            popupId: "sf_popupMenu",
            popup: void 0,
            popupStyle: void 0,
            dataArrtVisible: "data-isVisible",
            extStyleCache: void 0,
            ummyIcon: null,
            badgeQualityList: [ "8K", "4K", "2160", "1440", "1080", "720", "ummy", "mp3", "4320" ],
            createProBadge(e) {
                return Object(V.a)([ "userInfo" ]).then(e => e.userInfo && e.userInfo.isPremium).then(t => {
                    const n = A.a.create("div", {
                        style: {
                            display: "inline-block"
                        }
                    });
                    let o = {
                        display: "inline-block",
                        backgroundColor: "#505050",
                        lineHeight: "18px",
                        color: "#fff",
                        fontSize: "12px",
                        fontFamily: "'Roboto', sans-serif",
                        borderRadius: "2px",
                        verticalAlign: "middle",
                        textAlign: "center",
                        paddingRight: "2px",
                        paddingLeft: "2px",
                        fontWeight: "bold",
                        marginLeft: "3px",
                        borderBottomRightRadius: t ? "2px" : 0,
                        borderTopRightRadius: t ? "2px" : 0
                    };
                    const r = A.a.create("div", {
                        text: this.prepareQualityLabel(e),
                        style: o
                    });
                    if (n.appendChild(r), !t) {
                        const e = A.a.create("div", {
                            text: "PRO",
                            style: Ze(Ze({}, o), {}, {
                                width: "auto",
                                backgroundColor: "#54B85B",
                                marginLeft: 0,
                                borderBottomRightRadius: "3px",
                                borderTopRightRadius: "3px"
                            })
                        });
                        n.appendChild(e);
                    }
                    return n;
                });
            },
            prepareQualityLabel(e) {
                const t = String(e);
                if ([ "1080", "720", "1440" ].includes(t)) return "HD";
                return {
                    2160: "4K",
                    4320: "8K",
                    hls: "HLS",
                    1440: "QHD"
                }[t] || t.toUpperCase();
            },
            createBadge: function(e, t) {
                t = t || {};
                var n = {
                    display: "inline-block",
                    lineHeight: "18px",
                    width: "19px",
                    height: "17px",
                    color: "#fff",
                    fontSize: "12px",
                    borderRadius: "2px",
                    verticalAlign: "middle",
                    textAlign: "center",
                    paddingRight: "2px",
                    fontWeight: "bold",
                    marginLeft: "3px"
                };
                for (var o in t.containerStyle) n[o] = t.containerStyle[o];
                var r = A.a.create("div", {
                    style: n
                });
                return "HLS" === e ? (r.textContent = "HLS", r.style.width = "26px", r.style.paddingRight = "1px", 
                r.style.backgroundColor = "#505050") : "1080" === e || "2160" === e || "1440" === e || "720" === e ? (r.textContent = "HD", 
                r.style.backgroundColor = "#505050", r.style.paddingRight = "1px") : "8K" === e || "4K" === e ? (r.textContent = "HD", 
                r.style.paddingRight = "1px", r.style.backgroundColor = "rgb(247, 180, 6)") : "mp3" !== e && "MP3" !== e || (r.textContent = "MP3", 
                r.style.width = "26px", r.style.paddingRight = "1px", r.style.backgroundColor = "#505050"), 
                r;
            },
            getTitleNode: function(e) {
                var t = $e.popupMenu, n = A.a.create("span", {
                    style: {
                        cssFloat: "left"
                    }
                });
                if ("converter" === e.extra) {
                    var o = document.createDocumentFragment();
                    -1 !== [ "MP3", "8K", "4K", "1440", "1080", "720" ].indexOf(e.format) ? o.appendChild(t.createBadge(e.format, {
                        containerStyle: {
                            marginLeft: 0
                        }
                    })) : o.appendChild(document.createTextNode(e.format)), A.a.create(n, {
                        append: [ o, " ", e.quality ]
                    }), o = null;
                } else if (e.itemText) n.textContent = e.itemText; else {
                    let t = e.quality ? " " + e.quality : "";
                    "mp3" === e.quality && "pro" === e.itag && (t = "");
                    var r = e.format ? e.format : "???", i = e["3d"] ? "3D " : "", a = "";
                    e.sFps && (a += " " + (e.fps || 60)), n.textContent = i + r + t + a;
                }
                return "pro" === e.itag ? t.createProBadge(String(e.quality)).then(e => {
                    e && n.appendChild(e);
                }) : -1 !== t.badgeQualityList.indexOf(String(e.quality)) && n.appendChild(t.createBadge(String(e.quality))), 
                n;
            },
            createPopupItem: function(e, t) {
                var n, o = $e.popupMenu;
                if ("-" === (n = "string" == typeof e ? e : e.href)) return {
                    el: A.a.create("div", {
                        style: {
                            display: "block",
                            margin: "1px 0",
                            borderTop: "1px solid rgb(214, 214, 214)"
                        }
                    })
                };
                var i = document.createElement("-text-" === n ? "div" : "a");
                t.linkClass && i.classList.add(t.linkClass);
                var a = {
                    display: "block",
                    padding: "0 5px",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    overflow: "hidden"
                };
                if (e.isHidden && (i.setAttribute(o.dataArrtVisible, "0"), a.display = "none"), 
                $e.setStyle(i, a), "televzr" === e.itag) {
                    const t = document.createElement("div");
                    return Object(w.a)(Object(C.e)(He, {
                        openUrl: e.href
                    }), t), {
                        el: t,
                        prop: e
                    };
                }
                if ("-text-" === n) return i.style.lineHeight = "22px", {
                    el: i
                };
                if (i.href = n, "#" === n) return {
                    el: i
                };
                if ((r.a.isGM || r.a.isSafari) && (e.extra || (i.title = r.a.i18n.getMessage("downloadTitle"))), 
                e.forceDownload && !e.forceConverter) {
                    var s = "";
                    if (e.title) {
                        var l = (e.ext || e.format || "").toLowerCase();
                        l && (l = "." + l), s = e.title + l;
                    }
                    i.setAttribute("download", g.a.modify(s)), i.addEventListener("click", (function(e) {
                        $e.downloadOnClick(e, null, {
                            el: this
                        });
                    }), !1);
                }
                var c = [];
                e.func && (Array.isArray(e.func) ? c.push.apply(c, e.func) : c.push(e.func)), t.onItemClick && -1 === c.indexOf(t.onItemClick) && c.push(t.onItemClick), 
                c.length && i.addEventListener("click", (function(t) {
                    var n = this;
                    c.forEach((function(o) {
                        return o.call(n, t, e);
                    }));
                }), !1), e.isBlank && i.setAttribute("target", "_blank"), i.appendChild(o.getTitleNode(e));
                var u = A.a.create("span", {
                    style: {
                        cssFloat: "right",
                        lineHeight: "22px",
                        height: "22px"
                    }
                }), p = {
                    top: "5px",
                    verticalAlign: "top"
                };
                for (var f in t.sizeIconStyle) p[f] = t.sizeIconStyle[f];
                e.noAudio && $e.appendNoSoundIcon(u, p);
                var h = null;
                return e.noSize || (u.addEventListener("click", (function e(t) {
                    "IMG" === u.firstChild.tagName && (t.preventDefault(), t.stopPropagation(), d.a.trigger(u.firstChild, "click", {
                        cancelable: !0
                    })), this.removeEventListener("click", e);
                })), h = $e.appendFileSizeIcon(i, p, {
                    marginLeft: 0
                }, void 0, !0, u, e)), i.appendChild(u), {
                    el: i,
                    sizeIcon: h,
                    prop: e
                };
            },
            sortMenuItems: function(e, t) {
                void 0 === t && (t = {});
                var n = [ "HLS", "Audio Opus", "Audio Vorbis", "Audio AAC", "3GP", "WebM", "FLV", "MP4" ], o = {
                    Mobile: 280,
                    LD: 280,
                    SD: 360,
                    HD: 720,
                    ummy: 1
                };
                t.strQualityExtend && Object.assign(o, t.strQualityExtend);
                var r = {}, i = [], a = [], s = [], l = [], c = [], u = [], d = [], p = [];
                e.forEach((function(e) {
                    var n = e.prop;
                    t.noProp && (n = e);
                    var A = n.sort || {};
                    if (!n.format) return p.push(e), 1;
                    if (n.isOther) p.push(e); else if (n.isSubtitle) l.push(e); else if (n.noVideo) i[n.quality] = parseInt(n.quality), 
                    s.push(e); else {
                        var f = A.size || o[n.quality] || -1;
                        if (-1 === f && (f = "K" === String(n.quality).substr(-1) ? 1e3 * parseInt(n.quality) : parseInt(n.quality)), 
                        t.maxSize && f > t.maxSize) return 1;
                        if (t.minSize && f < t.minSize) return 1;
                        r[n.quality] = f, n.noAudio ? n.sFps ? c.push(e) : u.push(e) : n["3d"] ? d.push(e) : a.push(e);
                    }
                }));
                var A = function(e, t) {
                    return e.noVideo && t.noVideo ? function(e, t) {
                        return i[e.quality] > i[t.quality] ? -1 : i[e.quality] === i[t.quality] ? 0 : 1;
                    }(e, t) : e.noVideo ? 1 : t.noVideo || n.indexOf(e.format) > n.indexOf(t.format) ? -1 : n.indexOf(e.format) === n.indexOf(t.format) ? 0 : 1;
                }, f = function(e, n) {
                    var o = e.prop, i = n.prop;
                    t.noProp && (o = e, i = n);
                    var a = function(e, t) {
                        const n = r[e.quality], o = r[t.quality];
                        return isNaN(n) && isNaN(o) ? 0 : isNaN(n) ? -1 : isNaN(o) ? 1 : n > o ? -1 : n === o ? 0 : 1;
                    }(o, i);
                    return 0 !== a ? a : A(o, i);
                };
                a.sort(f), d.sort(f), s.sort(f), c.sort(f), u.sort(f);
                var g = null;
                return t.typeList ? (g = [], -1 !== t.typeList.indexOf("video") && (g = g.concat(a)), 
                -1 !== t.typeList.indexOf("3d") && (g = g.concat(d)), -1 !== t.typeList.indexOf("audio") && (g = g.concat(s)), 
                -1 !== t.typeList.indexOf("mute") && (g = g.concat(u)), -1 !== t.typeList.indexOf("mute60") && (g = g.concat(c)), 
                -1 !== t.typeList.indexOf("subtitles") && (g = g.concat(l)), -1 !== t.typeList.indexOf("other") && (g = g.concat(p))) : g = a.concat(d, s, l, c, u, p), 
                t.groupCompare && g.sort(f), g.sort((e, t) => {
                    const n = e.itag || e.prop && e.prop.itag, o = t.itag || t.prop && t.prop.itag;
                    return "pro" !== n && "pro" !== o || n === o ? 0 : "pro" === n ? -1 : 1;
                }), g;
            },
            removePanel: function() {
                null !== this.popup.parentNode && this.popup.parentNode.removeChild(this.popup), 
                void 0 !== this.popupStyle && null !== this.popupStyle.parentNode && this.popupStyle.parentNode.removeChild(this.popupStyle), 
                this.popup = void 0, this.popupStyle = void 0;
            },
            getContent: function(e) {
                var t = this, n = e.links, o = document.createDocumentFragment(), i = [];
                if (e.title) {
                    var a = t.createPopupItem("-text-", e).el;
                    a.textContent = e.title, a.style.color = "rgb(109, 104, 104)", a.fontStyle = "italic", 
                    o.appendChild(a);
                }
                if ("string" == typeof n) {
                    var s = t.createPopupItem("-text-", e).el;
                    s.textContent = n, o.appendChild(s);
                } else if (0 === n.length) {
                    var l = t.createPopupItem("-text-", e).el;
                    l.textContent = r.a.i18n.getMessage("noLinksFound"), o.appendChild(l);
                } else {
                    var c = [];
                    n.forEach((function(n) {
                        c.push(t.createPopupItem(n, e));
                    })), c = t.sortMenuItems(c, e.sortDetails), Object(w.a)(Object(C.e)(je), o);
                    const r = [];
                    c.forEach((function(t) {
                        if (t.prop.isHidden) return r.push(t.el), 1;
                        o.appendChild(t.el), e.showFileSize && t.sizeIcon && i.push(t.sizeIcon);
                    })), e.visibleCount = c.length - r.length, r.length > 0 && (e.getHiddenListFunc ? o.appendChild(e.getHiddenListFunc(r, e)) : Object(w.a)(Object(C.e)(Oe, {
                        SaveFrom_Utils: $e,
                        hiddenItems: c.filter(e => e.prop.isHidden).map(e => e.prop)
                    }), o));
                }
                return {
                    sizeIconList: i,
                    content: o
                };
            },
            create: function(e) {
                var t = e.button, n = $e.popupMenu;
                if (e.linkClass = e.linkClass || "sf-menu-item", e.offsetRight = e.offsetRight || 0, 
                e.offsetTop = e.offsetTop || 0, e.parent = e.parent || document.body, !e.isUpdate || void 0 !== n.popup && "none" !== n.popup.style.display) {
                    n.popup && n.removePanel();
                    var o = n.popup = document.createElement("div"), r = "#" + n.popupId;
                    e.popupId ? (r = "#" + e.popupId, o.id = e.popupId) : e.containerClass ? (r = "." + e.containerClass, 
                    o.classList.add(e.containerClass)) : o.id = n.popupId;
                    var i = {
                        display: "block",
                        position: "absolute",
                        minHeight: "24px",
                        cursor: "default",
                        textAlign: "left",
                        whiteSpace: "nowrap",
                        fontFamily: "arial, sans-serif"
                    };
                    e.extStyle && delete i.display;
                    var a = $e.getPosition(t, e.parent), l = $e.getSize(t);
                    i.top = a.top + e.offsetTop + l.height + "px", i.left = a.left + e.offsetRight + "px", 
                    $e.setStyle(o, i);
                    var c = {
                        "background-color": "#fff",
                        "z-index": "9999",
                        "box-shadow": "0 2px 10px 0 rgba(0,0,0,0.2)",
                        border: "1px solid #ccc",
                        "border-radius": "3px",
                        "font-size": "12px",
                        "font-weight": "bold",
                        "min-width": "190px"
                    };
                    if (e.style && e.style.popup) for (var u in e.style.popup) {
                        var p = e.style.popup[u];
                        c[u] = p;
                    }
                    $e.addStyleRules(r, c);
                    var f = {
                        "line-height": "24px",
                        color: "#3D3D3D"
                    };
                    if (e.style && e.style.item) for (var u in e.style.item) {
                        p = e.style.item[u];
                        f[u] = p;
                    }
                    $e.addStyleRules(r + " ." + e.linkClass, f);
                    var g = function(e) {
                        e.stopPropagation();
                    };
                    for (A.a.create(o, {
                        on: [ [ "click", g ], [ "mouseover", g ], [ "mouseup", g ], [ "mousedown", g ], [ "mouseout", g ] ]
                    }); null !== o.firstChild; ) o.removeChild(o.firstChild);
                    var h = n.getContent.call(n, e), m = h.sizeIconList;
                    h = h.content, o.appendChild(h);
                    var v = "#2F8AFF", b = "#fff";
                    e.style && e.style.hover && (v = e.style.hover.backgroundColor || v, b = e.style.hover.color || b);
                    var y = n.popupStyle = document.createElement("style");
                    if (y.textContent = Object(s.a)({
                        selector: r,
                        append: {
                            "a:hover": {
                                backgroundColor: v,
                                color: b
                            },
                            "> a:first-child": {
                                borderTopLeftRadius: "3px",
                                borderTopRightRadius: "3px"
                            },
                            "> a:last-child": {
                                borderBottomLeftRadius: "3px",
                                borderBottomRightRadius: "3px"
                            }
                        }
                    }), e.parent.appendChild(y), e.parent.appendChild(o), e.extStyle) {
                        void 0 !== $e.popupMenu.extStyleCache && null !== $e.popupMenu.extStyleCache.parentNode && $e.popupMenu.extStyleCache.parentNode.removeChild($e.popupMenu.extStyleCache);
                        var C = "sf-extElStyle_" + r.substr(1), x = "sf-extBodyStyle_" + r.substr(1);
                        null === document.querySelector("style." + x) && document.body.appendChild(A.a.create("style", {
                            class: x,
                            text: Object(s.a)({
                                selector: r,
                                style: {
                                    display: "none"
                                }
                            })
                        })), $e.popupMenu.extStyleCache = e.extStyle.appendChild(A.a.create("style", {
                            class: C,
                            text: Object(s.a)({
                                selector: "body " + r,
                                style: {
                                    display: "block"
                                }
                            })
                        }));
                    }
                    return setTimeout((function() {
                        m.forEach((function(e) {
                            d.a.trigger(e, "click", {
                                bubbles: !1,
                                cancelable: !0
                            });
                        }));
                    })), o;
                }
            },
            update: function(e, t) {
                for (var n = $e.popupMenu; null !== e.firstChild; ) e.removeChild(e.firstChild);
                var o = n.getContent.call(n, t), r = o.sizeIconList;
                o = o.content, e.appendChild(o), setTimeout((function() {
                    r.forEach((function(e) {
                        d.a.trigger(e, "click", {
                            bubbles: !1,
                            cancelable: !0
                        });
                    }));
                }));
            },
            preprocessItem: {
                srt2url: function(e, t) {
                    var n = e.srt, o = Object(u.a)(n, "text/plain");
                    t.ext = "srt", t.format = "SRT", t.href = o, t.noSize = !0;
                }
            },
            prepareLinks: {
                youtube(e, t, n, o) {
                    o = o || {}, n = n || [], e = Object.assign({}, e);
                    var i = $e.video.yt;
                    i.init();
                    var a = [], s = null, l = e.meta || {};
                    return Object.keys(i.format).forEach((function(n) {
                        var o = i.format[n];
                        return Object.keys(o).forEach((function(r) {
                            var c = e[r];
                            if (c) {
                                var u = !1;
                                i.showFormat[n] || (u = !0);
                                var d = o[r];
                                d["3d"] && !i.show3D && (u = !0), d.noAudio && !i.showMP4NoAudio && (u = !0), s = {
                                    href: c,
                                    isHidden: u,
                                    title: t,
                                    format: n,
                                    itag: r,
                                    forceDownload: !0
                                }, Object.assign(s, d);
                                var p = l[r];
                                p && (p.quality && (s.quality = p.quality), p.fps && (s.fps = p.fps)), a.push(s), 
                                delete e[r];
                            }
                        }));
                    })), e.televzr && (a.push({
                        itag: "televzr",
                        format: "televzr",
                        quality: "televzr",
                        href: e.televzr,
                        noSize: !0
                    }), delete e.televzr), Xe.preferences.ffmpegEnabled && l.muxer && (s = {
                        href: "#muxer",
                        fps: l.muxer.fps,
                        quality: l.muxer.quality,
                        format: l.muxer.format,
                        itag: "muxer",
                        uQuality: l.muxer.quality,
                        noSize: !0,
                        func: e => {
                            e.preventDefault(), e.stopPropagation(), Object(w.a)(Object(C.e)(x.a, l.muxer.mmProps), "sf-muxer-parent"), 
                            r.a.sendMessage({
                                action: "track",
                                t: "event",
                                tid: "UA-181742122-3",
                                el: `mp4_${l.muxer.quality}_conv`,
                                ec: "download",
                                ea: `mp4_${l.muxer.quality}_conv`
                            });
                        }
                    }, a.push(s)), Object.keys(e).forEach((function(n) {
                        "meta" !== n && (s = {
                            href: e[n],
                            isHidden: !0,
                            title: t,
                            quality: n,
                            itag: n,
                            forceDownload: !0
                        }, a.push(s), delete e[n]);
                    })), Object.keys(e.meta).forEach(t => {
                        if (-1 === t.indexOf("pro")) return;
                        const n = e.meta[t];
                        a.push({
                            href: "#pro",
                            isHidden: !1,
                            noSize: !0,
                            format: n.format,
                            noVideo: n.noVideo,
                            itag: "pro",
                            func: e => {
                                e.preventDefault(), d.a.trigger(document, "mousedown");
                                let t = document.body.querySelector("#savefrom__yt_btn");
                                const o = Boolean(document.body.querySelector("#sfYtFrameBtn")), r = {
                                    position: "absolute"
                                };
                                !t && o && (r.right = "0", t = document.body.querySelector(".sf-btn-ctr")), t || (r.position = "relative", 
                                t = A.a.create("div", {
                                    style: {
                                        position: "fixed",
                                        zIndex: 999999,
                                        bottom: "30px",
                                        right: "0"
                                    }
                                }), document.body.appendChild(t)), Object(w.a)(Object(C.e)(pe, {
                                    link: n,
                                    positionStyle: r
                                }), t);
                            },
                            quality: String(n.quality)
                        });
                    }), n.forEach((function(e) {
                        s = {
                            href: e.url,
                            isHidden: !0,
                            quality: "SRT" + (e.isAuto ? "A" : ""),
                            itemText: r.a.i18n.getMessage("subtitles") + " (" + e.lang + ")",
                            title: t + "-" + e.langCode,
                            ext: "vtt",
                            format: "VTT",
                            isSubtitle: !0,
                            langCode: e.langCode,
                            forceDownload: !0
                        }, "srt2url" === e.preprocess && $e.popupMenu.preprocessItem.srt2url(e, s), a.push(s);
                    })), l.extra && l.extra.forEach((function(e) {
                        s = {
                            href: "#" + e.extra,
                            noSize: !0,
                            isHidden: !1
                        }, Object.assign(s, e), e.itag && Object.keys(i.format).some((function(t) {
                            var n = i.format[t][e.itag];
                            if (n) return Object.assign(s, n), !0;
                        })), e.request && (s.func = function(t) {
                            return t.preventDefault(), r.a.sendMessage(e.request);
                        }), s.noAudio = !1, a.push(s);
                    })), a;
                },
                vimeo: function(e, t) {
                    var n, o = [];
                    return e.forEach((function(e) {
                        var r = e.ext;
                        r || (r = "mp4", -1 != e.url.search(/\.flv($|\?)/i) && (r = "flv"));
                        var i = e.height || "", a = e.type;
                        n = {
                            href: e.url,
                            title: t,
                            ext: r,
                            format: a,
                            quality: i,
                            forceDownload: !0
                        }, o.push(n);
                    })), o;
                },
                vk: function(e, t) {
                    var n, o = [];
                    return e.forEach((function(e) {
                        var r = e.name || e.ext;
                        r && (r = r.toLowerCase());
                        var i = r && r.toUpperCase() || "", a = e.subname || "";
                        n = {
                            href: e.url,
                            title: t,
                            ext: r,
                            format: i,
                            quality: a,
                            forceDownload: !0
                        }, o.push(n);
                    })), o;
                },
                dailymotion: function(e, t) {
                    var n = [];
                    return e.forEach((function(e) {
                        var o = null;
                        "ummy" === e.extra ? (o = {
                            href: e.url,
                            quality: "ummy",
                            noSize: !0,
                            format: "ummy",
                            videoId: e.videoId,
                            sort: {
                                size: 480
                            }
                        }, "ummyAudio" === e.type && (o.uQuality = "mp3", o.uIsAudio = !0)) : o = {
                            href: e.url,
                            title: t,
                            ext: e.ext,
                            format: e.ext,
                            quality: e.height || "",
                            forceDownload: !0
                        }, n.push(o);
                    })), n;
                },
                facebook: function(e, t) {
                    var n, o = [];
                    return e.forEach((function(e) {
                        var r = e.ext, i = r ? r.toUpperCase() : "", a = e.name;
                        n = {
                            href: e.url,
                            title: t,
                            ext: r,
                            format: i,
                            quality: a,
                            forceDownload: !0
                        }, o.push(n);
                    })), o;
                },
                rutube: function(e) {
                    if (Array.isArray(e) && (e = e[0]), "string" == typeof e) {
                        var t = e.match(/\/embed\/(\d+)/);
                        return (t = t && t[1] || void 0) || (t = (t = e.match(/\/video\/([0-9a-z]+)/)) && t[1] || void 0), 
                        /\/\/video\./.test(e) && (e = e.replace(/\/\/video\./, "//"), t || (t = (t = e.match(/\/(\d+)$/)) && t[1] || void 0)), 
                        t && (t = "rt-" + t), [];
                    }
                },
                mailru: function(e, t) {
                    var n, o = [];
                    return e.forEach((function(e) {
                        var r = e.ext, i = e.name, a = e.subname;
                        n = {
                            href: e.url,
                            title: t,
                            ext: r,
                            format: i,
                            quality: a,
                            forceDownload: !0
                        }, o.push(n);
                    })), o;
                }
            },
            quickInsert: function(e, t, n, o) {
                o = o || {};
                var r = {}, i = function t(n) {
                    n && (n.target === e || e.contains(n.target)) || r.isShow && (s.style.display = "none", 
                    d.a.off(document, "mousedown", t), r.isShow = !1, o.onHide && o.onHide(s));
                }, a = {
                    links: t,
                    button: e,
                    popupId: n,
                    showFileSize: !0
                };
                Object.assign(a, o);
                var s = $e.popupMenu.create(a);
                return o.onShow && o.onShow(s), d.a.off(document, "mousedown", i), d.a.on(document, "mousedown", i), 
                Object.assign(r, {
                    button: e,
                    isShow: !0,
                    el: s,
                    hide: i,
                    update(e, t) {
                        t && (a.title = t), a.links = e, $e.popupMenu.update(s, a);
                    }
                });
            }
        },
        frameMenu: {
            getBtn: function(e) {
                var t = {
                    verticalAlign: "middle",
                    position: "absolute",
                    zIndex: 999,
                    fontFamily: "arial, sans-serif"
                };
                for (var n in e.containerStyle) t[n] = e.containerStyle[n];
                var o = e.quickBtnStyleObj || {
                    display: "inline-block",
                    fontSize: "inherit",
                    height: "22px",
                    border: "1px solid rgba(255, 255, 255, 0.4)",
                    borderRadius: "3px",
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    paddingRight: 0,
                    paddingLeft: "28px",
                    cursor: "pointer",
                    verticalAlign: "middle",
                    position: "relative",
                    lineHeight: "22px",
                    textDecoration: "none",
                    zIndex: 1,
                    color: "#fff"
                };
                e.singleBtn && !e.quickBtnStyleObj && (delete o.borderTopRightRadius, delete o.borderBottomRightRadius);
                var r = {
                    position: "relative",
                    display: "inline-block",
                    fontSize: "inherit",
                    height: "24px",
                    padding: 0,
                    paddingRight: "21px",
                    border: "1px solid rgba(255, 255, 255, 0.4)",
                    borderLeft: 0,
                    borderRadius: "3px",
                    borderTopLeftRadius: "0",
                    borderBottomLeftRadius: "0",
                    cursor: "pointer",
                    color: "#fff",
                    zIndex: 0,
                    verticalAlign: "middle",
                    marginLeft: 0,
                    boxSizing: "border-box",
                    lineHeight: "22px"
                };
                for (var n in e.selectBtnStyle) r[n] = e.selectBtnStyle[n];
                var i, a = e.quickBtnIcon || A.a.create("i", {
                    style: {
                        position: "absolute",
                        display: "inline-block",
                        left: "6px",
                        top: "3px",
                        backgroundImage: "url(" + $e.svg.getSrc("download", "#ffffff") + ")",
                        backgroundSize: "12px",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        width: "16px",
                        height: "16px"
                    }
                }), l = e.selectBtnIcon || A.a.create("i", {
                    style: {
                        position: "absolute",
                        display: "inline-block",
                        top: "9px",
                        right: "6px",
                        border: "5px solid #FFF",
                        borderBottomColor: "transparent",
                        borderLeftColor: "transparent",
                        borderRightColor: "transparent"
                    }
                }), c = A.a.create("div", {
                    id: e.btnId,
                    style: t,
                    on: e.on,
                    append: [ i = A.a.create("a", {
                        class: "sf-quick-btn",
                        style: o,
                        href: "#",
                        append: [ a ]
                    }), A.a.create("style", {
                        text: Object(s.a)({
                            selector: "#" + e.btnId,
                            style: e.nodeCssStyle || {
                                opacity: .8,
                                display: "none"
                            },
                            append: [ {
                                "button::-moz-focus-inner": {
                                    padding: 0,
                                    margin: 0
                                },
                                ".sf-quick-btn": e.quickBtnCssStyle || {
                                    backgroundColor: "rgba(28,28,28,0.1)"
                                },
                                ".sf-select-btn": {
                                    backgroundColor: "rgba(28,28,28,0.1)"
                                }
                            }, {
                                selector: [ ":hover", ".sf-over" ],
                                join: "",
                                style: {
                                    opacity: 1
                                },
                                append: {
                                    ".sf-quick-btn": e.quickBtnOverCssStyle || {
                                        backgroundColor: "rgba(0, 163, 80, 0.5)"
                                    },
                                    ".sf-select-btn": {
                                        backgroundColor: "rgba(60, 60, 60, 0.5)"
                                    }
                                }
                            }, {
                                join: "",
                                ".sf-over": {
                                    append: {
                                        ".sf-select-btn": {
                                            backgroundColor: "rgba(28,28,28,0.8)"
                                        }
                                    }
                                },
                                ".sf-show": {
                                    display: "block"
                                }
                            } ]
                        })
                    }) ]
                }), u = null, d = null;
                return e.singleBtn || (d = function(e) {
                    var t = "object" == typeof e ? e : document.createTextNode(e), n = u.firstChild;
                    n === l ? u.insertBefore(t, n) : u.replaceChild(t, n);
                }, u = A.a.create("button", {
                    class: "sf-select-btn",
                    style: r,
                    on: e.onSelectBtn,
                    append: [ l ]
                }), c.appendChild(u)), {
                    node: c,
                    setQuality: d,
                    setLoadingState: function() {
                        d(A.a.create("img", {
                            src: $e.svg.getSrc("info", "#ffffff"),
                            style: {
                                width: "14px",
                                height: "14px",
                                marginLeft: "6px",
                                verticalAlign: "middle",
                                top: "-1px",
                                position: "relative"
                            }
                        }));
                    },
                    selectBtn: u,
                    quickBtn: i
                };
            },
            getHiddenList: function(e, t) {
                var n = $e.popupMenu, o = n.createPopupItem("-text-", t).el;
                A.a.create(o, {
                    text: r.a.i18n.getMessage("more") + " " + String.fromCharCode(187),
                    style: {
                        cursor: "pointer"
                    },
                    on: [ "click", function() {
                        for (var e, t = this.parentNode.querySelectorAll("*[" + n.dataArrtVisible + "]"), o = 0; e = t[o]; o++) e.style.display = "block", 
                        e.setAttribute(n.dataArrtVisible, 1);
                        this.parentNode.removeChild(this);
                    } ]
                });
                var i = document.createDocumentFragment();
                return i.appendChild(o), A.a.create(i, {
                    append: e
                }), 0 === t.visibleCount && d.a.trigger(o, "click", {
                    cancelable: !0
                }), i;
            },
            getMenuContainer: function(e) {
                var t = $e.popupMenu, n = e.button, o = e.popupId, r = A.a.create("div", {
                    style: {
                        position: "absolute",
                        minHeight: "24px",
                        cursor: "default",
                        textAlign: "left",
                        whiteSpace: "nowrap",
                        overflow: "auto"
                    }
                });
                "#" === o[0] ? r.id = o.substr(1) : r.classList.add(o);
                var i = t.getContent(e);
                r.appendChild(i.content), setTimeout((function() {
                    i.sizeIconList.forEach((function(e) {
                        d.a.trigger(e, "click", {
                            bubbles: !1,
                            cancelable: !0
                        });
                    }));
                }));
                var a = $e.getPosition(n, e.parent), l = $e.getSize(n), c = function(e) {
                    e.stopPropagation();
                }, u = a.top + l.height, p = {
                    top: u + "px",
                    maxHeight: document.body.offsetHeight - u - 40 + "px"
                };
                return e.leftMenuPos ? p.left = a.left + "px" : p.right = document.body.offsetWidth - a.left - l.width + "px", 
                A.a.create(r, {
                    style: p,
                    on: [ [ "click", c ], [ "mouseover", c ], [ "mouseup", c ], [ "mousedown", c ], [ "mouseout", c ], [ "wheel", function(e) {
                        (e.wheelDeltaY > 0 && 0 === this.scrollTop || e.wheelDeltaY < 0 && this.scrollHeight - (this.offsetHeight + this.scrollTop) <= 0) && e.preventDefault();
                    } ] ],
                    append: [ A.a.create("style", {
                        text: Object(s.a)({
                            selector: ("#" === o[0] ? "" : ".") + o,
                            style: {
                                display: "none",
                                fontFamily: "arial, sans-serif",
                                backgroundColor: "rgba(28,28,28,0.8)",
                                zIndex: 9999,
                                borderRadius: "4px",
                                fontSize: "12px",
                                fontWeight: "bold",
                                minWidth: "190px",
                                color: "#fff"
                            },
                            append: [ {
                                join: "",
                                ".sf-show": {
                                    display: "block"
                                },
                                "::-webkit-scrollbar-track": {
                                    backgroundColor: "#424242"
                                },
                                "::-webkit-scrollbar": {
                                    width: "10px",
                                    backgroundColor: "#424242"
                                },
                                "::-webkit-scrollbar-thumb": {
                                    backgroundColor: "#8e8e8e"
                                }
                            }, {
                                ".sf-menu-item": {
                                    lineHeight: "24px",
                                    color: "#fff"
                                },
                                ".sf-menu-item:hover": {
                                    backgroundColor: "#1c1c1c"
                                }
                            } ]
                        })
                    }) ]
                }), r;
            },
            getMenu: function(e, t, n, o) {
                var r = {
                    links: t,
                    button: e,
                    popupId: n || "#sf-frame-menu",
                    showFileSize: !0,
                    sizeIconStyle: {
                        color: "#fff"
                    },
                    linkClass: "sf-menu-item",
                    bindUmmyInfoDetails: {
                        posLeft: !0,
                        widthLimit: 480,
                        container: o.container,
                        createUmmyInfoDetails: {
                            posLeft: !0,
                            darkTheme: !0
                        }
                    },
                    getHiddenListFunc: this.getHiddenList.bind(this)
                };
                for (var i in o) r[i] = o[i];
                var a = this.getMenuContainer(r);
                (r.container || document.body).appendChild(a);
                var s = function() {
                    a.parentNode && a.parentNode.removeChild(a), l.isShow = !1, r.onHide && r.onHide();
                };
                r.onShow && r.onShow(a), d.a.off(document, "mousedown", s), d.a.on(document, "mousedown", s);
                var l = {
                    isShow: !0,
                    el: a,
                    hide: s,
                    update: function(e) {
                        var t = $e.popupMenu, n = a.lastChild;
                        a.textContent = "", r.links = e;
                        var o = t.getContent(r);
                        setTimeout((function() {
                            o.sizeIconList.forEach((function(e) {
                                d.a.trigger(e, "click", {
                                    bubbles: !1,
                                    cancelable: !0
                                });
                            }));
                        })), a.appendChild(o.content), a.appendChild(n);
                    }
                };
                return l;
            }
        },
        mobileLightBox: {
            id: "sf-lightbox",
            clear: function() {
                var e = document.getElementById($e.mobileLightBox.id);
                null !== e && e.parentNode.removeChild(e);
            },
            getTitle: function(e) {
                var t = [];
                if (t.push(e.format || "???"), e.quality) {
                    var n = e.quality;
                    e.sFps && (n += " " + (e.fps || 60)), t.push(n);
                }
                return e["3d"] && t.push("3D"), e.noAudio && t.push(r.a.i18n.getMessage("withoutAudio")), 
                t.join(" ");
            },
            createItem: function(e) {
                var t = $e.mobileLightBox, n = A.a.create("a", {
                    style: {
                        display: "block",
                        marginBottom: "6px",
                        border: "solid 1px #d3d3d3",
                        lineHeight: "36px",
                        minHeight: "36px",
                        background: "#f8f8f8",
                        verticalAlign: "middle",
                        fontSize: "15px",
                        textAlign: "center",
                        color: "#333",
                        borderRadius: "2px",
                        overflow: "hidden",
                        position: "relative"
                    }
                }), o = "";
                if (e.title) {
                    var r = (e.ext || e.format || "").toLowerCase();
                    r && (r = "." + r), o = g.a.modify(e.title + r);
                }
                if ("string" == typeof e) return n.textContent = e, n;
                n.href = e.href, n.download = o, n.textContent = t.getTitle(e), n.addEventListener("click", (function(t) {
                    e.func && e.func(t), "muxer" !== e.itag && e.forceDownload && $e.downloadOnClick(t, null, {
                        el: this
                    });
                })), e.isHidden && (n.classList.add("isOptional"), n.style.display = "none");
                if (!e.noSize) {
                    const t = $e.getFileSizeIcon({
                        cssFloat: "right",
                        lineHeight: "36px",
                        fontSize: "75%",
                        marginRight: "10px"
                    }, {
                        padding: "10px",
                        verticalAlign: "middle",
                        lineHeight: 0
                    }, {
                        width: "16px",
                        height: "16px"
                    }, {
                        url: e.href
                    });
                    n.appendChild(t.node);
                }
                return n;
            },
            getItems: function(e) {
                var t = $e.mobileLightBox;
                if ("string" == typeof e) return {
                    list: [ t.createItem(e) ],
                    hiddenCount: 0
                };
                for (var n, o = [], r = 0; n = e[r]; r++) [ "ummy", "televzr" ].includes(n.quality) || n.extra || o.push({
                    el: t.createItem(n),
                    prop: n
                });
                o = $e.popupMenu.sortMenuItems(o);
                var i = [], a = [];
                for (r = 0; n = o[r]; r++) n.prop.isHidden ? a.push(n.el) : i.push(n.el);
                return {
                    list: i.concat(a),
                    hiddenCount: a.length
                };
            },
            show: function(e) {
                var t, n = $e.mobileLightBox, o = window.pageYOffset, i = window.innerHeight, a = parseInt(i / 100 * 15), s = void 0, l = function(e) {
                    return i - 46 * (e ? 2 : 1) - 2 * a;
                }, c = function(e) {
                    e.hiddenCount > 0 ? (s.style.height = l(1) + "px", t.style.display = "block") : (t.style.display = "none", 
                    s.style.height = l(0) + "px"), e.hiddenCount === e.list.length && u(t);
                }, u = function(e) {
                    var t = "none", n = e.parentNode.querySelectorAll(".isOptional");
                    "open" !== e.dataset.state ? (e.dataset.state = "open", e.textContent = r.a.i18n.getMessage("more") + " " + String.fromCharCode(171), 
                    t = "block") : (e.dataset.state = "close", e.textContent = r.a.i18n.getMessage("more") + " " + String.fromCharCode(187));
                    for (var o, i = 0; o = n[i]; i++) o.style.display = t;
                }, d = document.getElementById(n.id);
                null !== d && d.parentNode.removeChild(d);
                var p = window.innerWidth;
                p = p <= 250 ? "90%" : "70%", e && 0 !== e.length || (e = r.a.i18n.getMessage("noLinksFound"));
                var f = n.getItems(e), g = A.a.create("div", {
                    id: n.id,
                    style: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        zIndex: 9e3,
                        height: document.body.scrollHeight + "px",
                        background: "rgba(0,0,0,0.85)",
                        textAlign: "center",
                        boxSizing: "content-box"
                    },
                    on: [ [ "click", function(e) {
                        e.preventDefault(), v();
                    } ] ],
                    append: A.a.create("div", {
                        style: {
                            display: "inline-block",
                            width: p,
                            backgroundColor: "#eee",
                            height: i - 2 * a + "px",
                            marginTop: a + o + "px",
                            borderRadius: "4px",
                            padding: "8px",
                            position: "relative",
                            boxSizing: "content-box"
                        },
                        append: [ s = A.a.create("div", {
                            style: {
                                overflowY: "auto",
                                marginBottom: "6px"
                            },
                            append: f.list,
                            on: [ "touchmove", function(e) {
                                e.stopPropagation();
                            } ]
                        }), t = A.a.create(n.createItem(r.a.i18n.getMessage("more") + " " + String.fromCharCode(187)), {
                            href: "#",
                            on: [ "click", function(e) {
                                e.preventDefault(), u(this);
                            } ]
                        }), A.a.create(n.createItem(r.a.i18n.getMessage("close")), {
                            style: {
                                marginBottom: 0
                            },
                            on: [ "click", function(e) {
                                e.preventDefault(), v();
                            } ]
                        }) ],
                        on: [ "click", function(e) {
                            e.stopPropagation();
                        } ]
                    })
                });
                c(f), document.body.appendChild(g);
                var h = document.body.scrollTop, m = {}, v = function() {
                    m.isShow && (document.body.scrollTop = h, m.hide());
                };
                return Object.assign(m, {
                    isShow: !0,
                    el: g,
                    hide: function() {
                        g.parentNode && g.parentNode.removeChild(g), m.isShow = !1;
                    },
                    close: v,
                    update: function(e) {
                        if (null !== g.parentNode) {
                            e && 0 !== e.length || (e = r.a.i18n.getMessage("noLinksFound")), s.textContent = "";
                            var t = n.getItems(e);
                            A.a.create(s, {
                                append: t.list
                            }), c(t);
                        }
                    }
                });
            }
        },
        bridge: function(e) {
            e.args = e.args || [], void 0 === e.timeout && (e.timeout = 300);
            var t = "sf-bridge-" + parseInt(1e3 * Math.random()) + "-" + Date.now();
            window.addEventListener("sf-bridge-" + t, (function n(o) {
                var r;
                window.removeEventListener("sf-bridge-" + t, n), r = o.detail ? JSON.parse(o.detail) : void 0, 
                e.cb(r);
            }));
            var n = '(function(func,args,scriptId,timeout){/* fix */var node=document.getElementById(scriptId);if(node){node.parentNode.removeChild(node)}var fired=false;var done=function done(data){if(fired){return}fired=true;var event=new CustomEvent("sf-bridge-"+scriptId,{detail:JSON.stringify(data)});window.dispatchEvent(event)};timeout&&setTimeout(function(){done()},timeout);args.push(done);func.apply(null,args)})(' + [ e.func.toString(), JSON.stringify(e.args), JSON.stringify(t), parseInt(e.timeout) ].join(",") + ");";
            if (r.a.isSafari) {
                n = n.replace("/* fix */", "(" + function() {
                    "undefined" == typeof CustomEvent && (CustomEvent = function(e, t) {
                        t = t || {
                            bubbles: !1,
                            cancelable: !1
                        };
                        var n = document.createEvent("CustomEvent");
                        return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
                    }, CustomEvent.prototype = window.Event.prototype);
                }.toString() + ")();");
            }
            var o = A.a.create("script", {
                id: t,
                text: n
            });
            document.body.appendChild(o);
        },
        openMediaOnSaveFrom(e) {
            window.open("https://ru.savefrom.net/#url=" + e, "_blank");
        },
        TutorialTooltip: function(e) {
            var t = this;
            this.details = {
                btnTopOffset: -3,
                btnLeftOffset: 0
            }, Object.assign(this.details, e), this.onResize = this.onResize.bind(this), this.onResizeDebouce = a(this.onResize, 250), 
            this.onClose = this.onClose.bind(this), this.target = e.target, "1" !== this.target.dataset.sfHasTooltip && (this.target.dataset.sfHasTooltip = "1", 
            this.tooltipNode = this.getNode(), this.target.addEventListener("mouseup", this.onClose), 
            this.target.addEventListener(d.a.onRemoveEventName, (function() {
                t.onClose && t.onClose(1);
            })), window.addEventListener("resize", this.onResizeDebouce), this.onResize(), this.tooltipNode && (e.parent || document.body).appendChild(this.tooltipNode));
        }
    };
    $e.TutorialTooltip.prototype.getNode = function() {
        var e = this, t = function() {
            var e = 1e3, t = document.getElementById("masthead-positioner"), n = t && window.getComputedStyle(t, null);
            return n && (e = parseInt(n.getPropertyValue("z-index")) + 1), e;
        }();
        if (Ke) var n = A.a.create("div", {
            class: "sf-tooltip",
            style: {
                top: "-70px",
                display: "flex"
            },
            on: [ "mouseup", function(e) {
                e.stopPropagation();
            } ],
            append: [ A.a.create("div", {
                style: {
                    height: "40px",
                    backgroundColor: "#4D4D4D",
                    paddingBottom: "10px",
                    maxWidth: "220px",
                    minWidth: "220px",
                    lineHeight: "16px",
                    fontSize: "14px",
                    fontFamily: "font-family: arial, sans-serif",
                    color: "#fff",
                    display: "flex"
                },
                append: [ A.a.create("div", {
                    style: {
                        width: "60%",
                        margin: "0 0 5px 10px"
                    },
                    append: [ A.a.create("span", {
                        style: {
                            color: "white",
                            fontSize: "14px",
                            fontWeight: "bold",
                            display: "inline-block"
                        },
                        text: "Just hold"
                    }), A.a.create("div", {
                        style: {
                            display: "inline-block",
                            position: "relative",
                            margin: "4px 4px 0 4px",
                            width: "27px",
                            height: "18px",
                            backgroundColor: "black",
                            borderRadius: "5px",
                            border: "1px solid black",
                            borderBottom: "3px solid black"
                        },
                        append: [ A.a.create("div", {
                            style: {
                                fontWeight: "bold",
                                fontSize: "8px",
                                textAlign: "center",
                                zIndex: 1,
                                position: "relative",
                                width: "27px",
                                height: "18px",
                                backgroundColor: "white",
                                color: "black",
                                borderRadius: "5px"
                            },
                            append: [ A.a.create("span", {
                                style: {
                                    display: "inline-block",
                                    marginTop: "2px"
                                },
                                text: "option"
                            }) ]
                        }) ]
                    }), A.a.create("span", {
                        style: {
                            color: "white",
                            fontSize: "14px",
                            fontWeight: "bold"
                        },
                        text: "and click on Download"
                    }) ]
                }), A.a.create("a", {
                    class: "sf-button",
                    text: "OK",
                    style: {
                        height: "18px",
                        width: "50px",
                        display: "inline-block",
                        textAlign: "center",
                        textDecoration: "none",
                        padding: "0 10px",
                        cssFloat: "right",
                        marginTop: "25px",
                        lineHeight: "20px",
                        borderRadius: "3px",
                        fontSize: "12px",
                        color: "#fff",
                        fontWeight: "bolder",
                        backgroundColor: "#167AC6",
                        cursor: "pointer"
                    },
                    on: [ "click", function(t) {
                        t.preventDefault(), e.onClose && e.onClose();
                    } ]
                }), A.a.create("style", {
                    text: Object(s.a)({
                        ".sf-tooltip": {
                            position: "absolute",
                            zIndex: t + 2,
                            append: {
                                ".sf-button:hover": {
                                    backgroundColor: "#126db3 !important"
                                },
                                ".sf-button:active": {
                                    opacity: .9
                                }
                            }
                        }
                    })
                }) ]
            }) ]
        }); else n = A.a.create("div", {
            class: "sf-tooltip",
            on: [ "mouseup", function(e) {
                e.stopPropagation();
            } ],
            append: [ A.a.create("span", {
                style: {
                    display: "inline-block",
                    border: "8px solid transparent",
                    borderRight: "10px solid #4D4D4D",
                    borderLeft: 0,
                    width: 0,
                    top: "8px",
                    left: "0px",
                    position: "absolute"
                }
            }), A.a.create("span", {
                style: {
                    display: "inline-block",
                    backgroundColor: "#4D4D4D",
                    marginLeft: "10px",
                    padding: "10px 10px",
                    maxWidth: "220px",
                    minWidth: "220px",
                    lineHeight: "16px",
                    fontSize: "14px",
                    fontFamily: "font-family: arial, sans-serif",
                    color: "#fff"
                },
                append: [ A.a.create("p", {
                    style: {
                        margin: 0
                    },
                    append: Object(f.a)(r.a.i18n.getMessage("tutorialTooltipText"))
                }), A.a.create("a", {
                    class: "sf-button",
                    text: "OK",
                    style: {
                        display: "inline-block",
                        textAlign: "center",
                        textDecoration: "none",
                        padding: "0 10px",
                        cssFloat: "right",
                        marginTop: "5px",
                        lineHeight: "20px",
                        borderRadius: "3px",
                        fontSize: "12px",
                        color: "#fff",
                        fontWeight: "bolder",
                        backgroundColor: "#167AC6",
                        cursor: "pointer"
                    },
                    on: [ "click", function(t) {
                        t.preventDefault(), e.onClose && e.onClose();
                    } ]
                }), A.a.create("style", {
                    text: Object(s.a)({
                        ".sf-tooltip": {
                            position: "absolute",
                            zIndex: t + 2,
                            append: {
                                ".sf-button:hover": {
                                    backgroundColor: "#126db3 !important"
                                },
                                ".sf-button:active": {
                                    opacity: .9
                                }
                            }
                        }
                    })
                }) ]
            }) ]
        });
        return n;
    }, $e.TutorialTooltip.prototype.onClose = function(e) {
        e && "mouseup" === e.type && (e = null), this.tooltipNode && (this.tooltipNode.parentNode && this.tooltipNode.parentNode.removeChild(this.tooltipNode), 
        this.tooltipNode = null), window.removeEventListener("resize", this.onResizeDebouce), 
        this.target.removeEventListener("mouseup", this.onClose), this.onClose = null, e || this.details.onClose && this.details.onClose();
    }, $e.TutorialTooltip.prototype.onResize = function() {
        var e = this.target;
        if (!e.offsetParent || !e.parentNode) return this.onClose && this.onClose(1);
        var t = $e.getPosition(e, this.details.parent);
        t.top, this.details.btnTopOffset, t.left, t.width, this.details.btnLeftOffset;
    }, $e.mutationWatcher = {
        getMutationObserver: function() {
            return Object(b.a)();
        },
        isAvailable: function() {
            return !!this.getMutationObserver();
        },
        disconnect: function(e) {
            e.observer.disconnect();
        },
        connect: function(e) {
            e.observer.observe(e.target, e.config);
        },
        joinMutations: function(e) {
            for (var t, n, o, r, i, a, s = [], l = [], c = {}; o = e.shift(); ) {
                for (-1 === (a = l.indexOf(o.target)) && (c[a = l.push(o.target) - 1] = {
                    target: o.target,
                    added: [],
                    removed: []
                }), t = c[a], n = void 0, r = 0; i = o.addedNodes[r]; r++) 1 === i.nodeType && (t.added.push(i), 
                n = !0);
                for (r = 0; i = o.removedNodes[r]; r++) 1 === i.nodeType && (t.removed.push(i), 
                n = !0);
                void 0 !== n && void 0 === t.inList && (t.inList = !0, s.push(t));
            }
            return s;
        },
        isMatched: y.a,
        match: function(e, t, n) {
            var o, r, i, a, s = this, l = e.queries, c = !1;
            return [ "added", "removed" ].forEach((function(e) {
                var u = n[e];
                for (a = 0; o = u[a]; a++) for (r = 0; i = l[r]; r++) if (void 0 === i.is || i.is === e) {
                    var d = t[r][e];
                    !0 === s.isMatched(o, i.css) ? d.push(o) : d.push.apply(d, o.querySelectorAll(i.css)), 
                    !1 === c && (c = void 0 !== d[0]);
                }
            })), c;
        },
        filterTarget: function(e, t) {
            var n, o;
            for (n = 0; o = e[n]; n++) if (!0 === this.isMatched(t, o.css)) return !0;
            return !1;
        },
        run: function(e) {
            var t = this, n = {
                config: {
                    childList: !0,
                    subtree: !0
                },
                target: document.body,
                filterTarget: []
            };
            Object.assign(n, e), n._disconnect = this.disconnect.bind(this, n), n._connect = this.connect.bind(this, n), 
            n._match = this.match.bind(this, n);
            for (var o = [], r = 0; r < n.queries.length; r++) o.push({
                added: [],
                removed: []
            });
            o = JSON.stringify(o);
            var i = this.getMutationObserver();
            return n.observer = new i((function(e) {
                var r = t.joinMutations(e);
                if (0 !== r.length) {
                    for (var i, a = !1, s = JSON.parse(o); i = r.shift(); ) !1 === t.filterTarget(n.filterTarget, i.target) && !0 === n._match(s, i) && (a = !0);
                    !0 === a && n.callback(s);
                }
            })), n.trigger = function(e) {
                var t = !1, r = JSON.parse(o), i = {
                    added: [ e ],
                    removed: []
                };
                n._match(r, i) && (t = !0), !0 === t && n.callback(r);
            }, n.start = function() {
                n._disconnect(), n._connect(), n.trigger(n.target);
            }, n.stop = function() {
                n._disconnect();
            }, n.start(), n;
        }
    }, $e.mutationAttrWatcher = {
        isAvailable: function() {
            return !!$e.mutationWatcher.getMutationObserver();
        },
        disconnect: function(e) {
            e.observer.disconnect();
        },
        connect: function(e) {
            e.observer.observe(e.target, e.config);
        },
        run: function(e) {
            var t = {
                config: {
                    attributes: !0,
                    childList: !1,
                    attributeOldValue: !0
                },
                target: document.body
            };
            Object.assign(t, e), Array.isArray(t.attr) || (t.attr = [ t.attr ]), t.config.attributeFilter = t.attr, 
            t._disconnect = this.disconnect.bind(this, t), t._connect = this.connect.bind(this, t);
            for (var n = [], o = 0; o < t.attr.length; o++) n.push({});
            n = JSON.stringify(n);
            var r = $e.mutationWatcher.getMutationObserver();
            return t.observer = new r((function(e) {
                for (var o, r = !1, i = JSON.parse(n); o = e.shift(); ) {
                    var a = t.attr.indexOf(o.attributeName);
                    if (-1 !== a) {
                        var s = o.target.getAttribute(o.attributeName);
                        s !== o.oldValue && (i[a] = {
                            value: s,
                            oldValue: o.oldValue
                        }, r = !0);
                    }
                }
                !0 === r && t.callback(i);
            })), t.start = function() {
                t._disconnect(), t._connect();
                for (var e, o = !1, r = JSON.parse(n), i = 0; e = t.attr[i]; i++) {
                    var a = t.target.getAttribute(e);
                    null !== a && (r[i] = {
                        value: a,
                        oldValue: null
                    }, o = !0);
                }
                !0 === o && t.callback(r);
            }, t.stop = function() {
                t._disconnect();
            }, setTimeout((function() {
                t.start();
            })), t;
        }
    }, $e.waitNodesBySelector = function(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = !1, o = null;
        const r = Promise.resolve().then(() => {
            const r = t.target || document.body, i = $e.mutationWatcher.getMutationObserver();
            let a = null, s = null;
            const l = new Promise((e, t) => {
                a = e, s = t;
            });
            let c = null;
            t.timeout > 0 && (c = setTimeout(() => {
                o && o();
            }, t.timeout));
            let u = [];
            const d = new i(t => {
                let n, o;
                for (n = 0; n < t.length; n++) {
                    let r = t[n];
                    for (o = 0; o < r.addedNodes.length; o++) {
                        let t = r.addedNodes[o];
                        1 === t.nodeType && (Object(y.a)(t, e) ? u.push(t) : u.push.apply(u, t.querySelectorAll(e)));
                    }
                }
                u.length && a(u);
            });
            return d.observe(r, {
                childList: !0,
                subtree: !0
            }), o = () => {
                o = null, s(new Error("ABORTED"));
            }, u.push.apply(u, r.querySelectorAll(e)), u.length && a(u), n && o && o(), l.then(e => (d.disconnect(), 
            clearTimeout(c), e), e => {
                throw d.disconnect(), clearTimeout(c), e;
            });
        });
        return r.abort = () => {
            n = !0, o && o();
        }, r;
    };
    t.a = e => (Xe = e, $e);
}, function(e, t, n) {
    "use strict";
    var o = n(0);
    t.a = function(e) {
        return new Promise((function(t) {
            o.a.sendMessage(e, t);
        }));
    };
}, function(e, t, n) {
    "use strict";
    n.d(t, "b", (function() {
        return p;
    })), n.d(t, "a", (function() {
        return A;
    }));
    var o = n(19), r = n(1), i = n(3), a = n(9), s = n(32), l = n(48);
    function c(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            t && (o = o.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
            }))), n.push.apply(n, o);
        }
        return n;
    }
    function u(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? c(Object(n), !0).forEach((function(t) {
                Object(o.a)(e, t, n[t]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : c(Object(n)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
            }));
        }
        return e;
    }
    class d {
        constructor(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            this.target = e, this.options = Object.assign({
                content: "",
                defaultWidth: 0,
                defaultHeight: 0
            }, t), this.handleMouseleave = this.handleMouseleave.bind(this), this.isVisible = !1, 
            this.timeout = null;
        }
        handleMouseleave() {
            this.hide();
        }
        show(e) {
            if (this.isVisible) return void this.startHideTimeout();
            this.node || (this.node = this.createTooltip(e)), this.isVisible = !0;
            const t = document.body;
            t && (this.node.classList.add("hidden"), t.appendChild(this.node), this.setPos(), 
            this.node.classList.remove("hidden")), this.target.addEventListener("mouseleave", this.handleMouseleave), 
            this.startHideTimeout();
        }
        hide() {
            this.isVisible && (this.isVisible = !1, this.stopHideTimeout(), this.node.classList.add("hidden"), 
            this.target.removeEventListener("mouseleave", this.handleMouseleave), setTimeout(() => {
                if (!this.isVisible && this.node) {
                    const e = this.node.parentNode;
                    e && e.removeChild(this.node), this.node = null;
                }
            }, 250));
        }
        startHideTimeout() {
            this.stopHideTimeout(), this.timeout = setTimeout(() => {
                this.hide();
            }, 3e3);
        }
        stopHideTimeout() {
            clearTimeout(this.timeout);
        }
        createTooltip(e) {
            return r.a.create("div", {
                class: [ "sf-paper-tooltip-ctr" ],
                append: [ r.a.create("div", {
                    class: "sf-paper-tooltip",
                    style: u({
                        display: "flex",
                        align: "center"
                    }, "in" == Object(s.a)() ? {
                        flexDirection: "row"
                    } : ""),
                    append: [ r.a.create("span", {
                        style: u({
                            paddingTop: "6px"
                        }, "in" == Object(s.a)() ? {
                            width: "30px",
                            height: "20px"
                        } : ""),
                        text: "Hold"
                    }), r.a.create("div", {
                        style: {
                            margin: "4px 4px 0 4px",
                            width: "27px",
                            height: "18px",
                            backgroundColor: "black",
                            borderRadius: "5px",
                            border: "1px solid black",
                            borderBottom: "3px solid black"
                        },
                        append: [ r.a.create("div", {
                            style: {
                                fontWeight: "bold",
                                fontSize: "8px",
                                textAlign: "center",
                                zIndex: 1,
                                position: "relative",
                                width: "27px",
                                height: "18px",
                                backgroundColor: "white",
                                color: "black",
                                borderRadius: "5px"
                            },
                            append: [ r.a.create("span", {
                                style: u({
                                    display: "inline-block"
                                }, "in" != Object(s.a)() ? {
                                    marginTop: "5px"
                                } : ""),
                                text: "option"
                            }) ]
                        }) ]
                    }), r.a.create("span", {
                        style: u({
                            paddingTop: "6px"
                        }, "in" == Object(s.a)() ? {
                            width: "60px"
                        } : ""),
                        text: "and click"
                    }) ]
                }), r.a.create("style", {
                    text: Object(a.a)({
                        ".sf-paper-tooltip-ctr": {
                            display: "block",
                            outline: "none",
                            userSelect: "none",
                            cursor: "default",
                            position: "absolute",
                            zIndex: 1e4,
                            transition: "opacity 0.25s",
                            width: "180px"
                        },
                        ".sf-paper-tooltip-ctr.hidden": {
                            opacity: 0
                        },
                        ".sf-paper-tooltip": {
                            display: "block",
                            outline: "none",
                            fontFamily: "Arial",
                            fontSize: "14px",
                            fontWeight: "bold",
                            backgroundColor: "#4D4D4D",
                            borderRadius: "8px",
                            color: "white",
                            padding: "8px",
                            margin: "8px",
                            marginBottom: "0"
                        }
                    })
                }), "photo" !== Object(l.a)(e) && "story" != Object(l.a)(e) ? r.a.create("div", {
                    style: {
                        position: "relative",
                        left: "15px",
                        width: "0",
                        height: "0",
                        borderColor: "#4D4D4D transparent transparent transparent",
                        borderStyle: "solid",
                        borderWidth: "8px 8px 0 8px"
                    }
                }) : "" ]
            });
        }
        setPos() {
            const {pageXOffset: e, pageYOffset: t, innerWidth: n, innerHeight: o} = window, r = o + t, i = n + e, a = this.node.getBoundingClientRect();
            a.width || a.height || (a.width = this.options.defaultWidth, a.height = this.options.defaultHeight);
            const l = this.target.getBoundingClientRect(), c = {}, u = [ "top", "bottom", "left", "right" ].map(s => {
                let u = null, d = null, p = 0;
                if (-1 !== [ "left", "right" ].indexOf(s)) {
                    const e = (l.height - a.height) / 2;
                    if (u = Math.round(l.top + t + e), a.height < o) {
                        let e = u + a.height;
                        e > r && (u -= e - r, p = 1), u < 0 && (u = 0, p = 1);
                    }
                } else "top" === s ? u = Math.round(l.top + t) - a.height : "bottom" === s && (u = Math.round(l.top + t) + l.height);
                if (-1 !== [ "top", "bottom" ].indexOf(s)) {
                    const t = (l.width - a.width) / 2;
                    if (d = Math.round(l.left + e + t), a.width < n) {
                        let e = d + a.width;
                        e > i && (d -= e - i, p = 1), d < 0 && (d = 0, p = 1);
                    }
                } else "left" === s ? d = Math.round(l.left + e - a.width) : "right" === s && (d = Math.round(l.left + e + l.width));
                const A = d + a.width, f = u + a.height, {width: g, height: h} = a;
                let m = h, v = g;
                u < 0 && (m -= -1 * u), f > r && (m -= f - r), d < 0 && (v -= -1 * d), A > i && (v -= A - i);
                const b = 100 / (a.width * a.height) * (v * m) - p;
                return c[s] = {
                    top: u,
                    left: d,
                    quality: b
                };
            });
            u.sort((e, t) => {
                let {quality: n} = e, {quality: o} = t;
                return n === o ? 0 : n > o ? -1 : 1;
            });
            const d = u[0];
            var p = 65;
            "101" == Object(s.a)() && window.innerWidth >= 1293 && window.innerHeight >= 768 && (p = 35), 
            this.node.style.top = d.top + "px", this.node.style.left = d.left + p + "px";
        }
    }
    const p = (e, t, n) => {
        if (!(e.dataset.sfTitleTooltip > 0)) {
            e.dataset.sfTitleTooltip = 1;
            const o = new d(e, t);
            e.addEventListener("show_tooltip", () => {
                o.show(n);
            }), e.addEventListener("hide_tooltip", () => {
                o.hide();
            });
        }
        i.a.trigger(e, "show_tooltip");
    }, A = e => {
        e.dataset.sfTitleTooltip > 0 && i.a.trigger(e, "hide_tooltip");
    };
}, function(e, t, n) {
    "use strict";
    var o = n(21);
    t.a = function(e, t) {
        if (!e || 1 !== e.nodeType) return null;
        if (e.closest) return e.closest(t);
        if (Object(o.a)(e, t)) return e;
        if (!Object(o.a)(e, t + " " + e.tagName)) return null;
        for (let n = e = e.parentNode; n; n = n.parentNode) {
            if (1 !== n.nodeType) return null;
            if (Object(o.a)(n, t)) return n;
        }
        return null;
    };
}, function(e, t, n) {
    "use strict";
    var o = n(6);
    const r = Object(o.a)("extensionMarker"), i = "savefrom-helper-extension", a = {
        getItem(e) {
            let t = null;
            try {
                t = window.sessionStorage.getItem(e);
            } catch (t) {
                r.error("getItem error", e, t);
            }
            return t;
        },
        setItem(e, t) {
            try {
                window.sessionStorage.setItem(e, t);
            } catch (n) {
                r.error("setMarker error", e, t, n);
            }
        },
        hash(e) {
            const t = e.length;
            let n = 0, o = 0;
            if (t > 0) for (;o < t; ) n = (n << 5) - n + e.charCodeAt(o++) | 0;
            return "" + n;
        },
        getMarker() {
            let e = null;
            return e = chrome.runtime.id, this.hash("" + e);
        },
        getCurrentMarker() {
            return this.getItem(i);
        },
        setMarker(e) {
            return this.setItem(i, e);
        },
        getFallbackMarker() {
            return this.getItem(i + "-fallback");
        },
        setFallbackMarker() {
            return this.setItem(i + "-fallback", "1");
        },
        isSingle() {
            const e = this.getMarker();
            let t = this.getCurrentMarker();
            return "1" === t && null === this.getFallbackMarker() && (this.setFallbackMarker(), 
            t = null), null === t && this.setMarker(t = e), t === e;
        }
    };
    t.a = a;
}, function(e, t, n) {
    "use strict";
    var o = n(4), r = n(2);
    t.a = (e, t) => {
        let n = document.createElement("div");
        if ("string" == typeof t) if (document.getElementById(t)) t = document.getElementById(t); else {
            const e = document.createElement("div");
            e.setAttribute("id", t), (t = e).style.position = "fixed", t.style.bottom = "20px", 
            t.style.right = "30px", t.style.display = "flex", t.style.flexDirection = "column-reverse", 
            t.style.overflowX = "hidden", t.style.overflowY = "scroll", t.style.zIndex = "100000", 
            t.style.maxHeight = "95%", document.body.appendChild(t);
        }
        function i() {
            n && (Object(r.d)(n), n = null);
        }
        return Object(o.i)(Object(r.b)(Object(r.a)(e, {
            unmountLayer: i
        }), t), n), i;
    };
}, function(e, t, n) {
    "use strict";
    t.a = (e, t) => {
        let n = !0;
        if (t) {
            if (!Array.isArray(e)) {
                const t = e;
                e = t.args || [], t.disableJson && (n = !1);
            }
        } else t = e, e = [];
        const o = "sf-bridge-" + parseInt(1e3 * Math.random(), 10) + "-" + Date.now();
        return new Promise(r => {
            const i = e => {
                window.removeEventListener(o, i), r(e.detail);
            };
            window.addEventListener(o, i);
            const a = "(function(fn,args,id,useJson){var scriptNode=document.getElementById(id);if(scriptNode){scriptNode.parentNode.removeChild(scriptNode)}return new Promise(function(r){return r(fn.apply(null,args))}).then(function(result){return{result:result}},function(err){return{err:serializeError(err)}}).then(function(result){if(useJson){try{result=JSON.stringify(result)}catch(err){result=JSON.stringify({err:serializeError(err)})}}var e=new CustomEvent(id,{detail:result});window.dispatchEvent(e)});function serializeError(err){return{name:err.name,message:err.message,code:err.code,stack:err.stack}}})(" + [ t ].concat([ e, o, n ].map(e => JSON.stringify(e))).join(",") + ")", s = document.createElement("script");
            s.id = o, s.textContent = a, document.body.appendChild(s);
        }).then(e => {
            n && (e = JSON.parse(e));
            const {err: t, result: o} = e;
            if (t) throw Object.assign(new Error, t);
            return o;
        });
    };
}, function(e, t, n) {
    "use strict";
    t.a = e => "data-" + e.replace(/[A-Z]/g, (function(e) {
        return "-" + e.toLowerCase();
    }));
}, function(e, t, n) {
    "use strict";
    function o(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e;
    }
    n.d(t, "a", (function() {
        return o;
    }));
}, function(e, t, n) {
    var o;
    !function() {
        "use strict";
        var n = {}.hasOwnProperty;
        function r() {
            for (var e = [], t = 0; t < arguments.length; t++) {
                var o = arguments[t];
                if (o) {
                    var i = typeof o;
                    if ("string" === i || "number" === i) e.push(o); else if (Array.isArray(o) && o.length) {
                        var a = r.apply(null, o);
                        a && e.push(a);
                    } else if ("object" === i) for (var s in o) n.call(o, s) && o[s] && e.push(s);
                }
            }
            return e.join(" ");
        }
        e.exports ? (r.default = r, e.exports = r) : void 0 === (o = function() {
            return r;
        }.apply(t, [])) || (e.exports = o);
    }();
}, function(e, t, n) {
    "use strict";
    let o = function(e, t) {
        let n = document.createElement("div");
        return o = "function" == typeof n.matches ? function(e, t) {
            return e.matches(t);
        } : "function" == typeof n.matchesSelector ? function(e, t) {
            return e.matchesSelector(t);
        } : "function" == typeof n.webkitMatchesSelector ? function(e, t) {
            return e.webkitMatchesSelector(t);
        } : "function" == typeof n.mozMatchesSelector ? function(e, t) {
            return e.mozMatchesSelector(t);
        } : "function" == typeof n.oMatchesSelector ? function(e, t) {
            return e.oMatchesSelector(t);
        } : "function" == typeof n.msMatchesSelector ? function(e, t) {
            return e.msMatchesSelector(t);
        } : function(e, t) {
            return !1;
        }, n = null, o(e, t);
    };
    t.a = function(e, t) {
        return o(e, t);
    };
}, function(e, t, n) {
    "use strict";
    var o = n(38);
    t.a = e => new Promise((t, n) => {
        Object(o.a)(e, (e, o) => {
            e ? n(e) : t(o);
        });
    });
}, function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        var t = [];
        return t.toString = function() {
            return this.map((function(t) {
                var n = function(e, t) {
                    var n = e[1] || "", o = e[3];
                    if (!o) return n;
                    if (t && "function" == typeof btoa) {
                        var r = (a = o, s = btoa(unescape(encodeURIComponent(JSON.stringify(a)))), l = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s), 
                        "/*# ".concat(l, " */")), i = o.sources.map((function(e) {
                            return "/*# sourceURL=".concat(o.sourceRoot || "").concat(e, " */");
                        }));
                        return [ n ].concat(i).concat([ r ]).join("\n");
                    }
                    var a, s, l;
                    return [ n ].join("\n");
                }(t, e);
                return t[2] ? "@media ".concat(t[2], " {").concat(n, "}") : n;
            })).join("");
        }, t.i = function(e, n, o) {
            "string" == typeof e && (e = [ [ null, e, "" ] ]);
            var r = {};
            if (o) for (var i = 0; i < this.length; i++) {
                var a = this[i][0];
                null != a && (r[a] = !0);
            }
            for (var s = 0; s < e.length; s++) {
                var l = [].concat(e[s]);
                o && r[l[0]] || (n && (l[2] ? l[2] = "".concat(n, " and ").concat(l[2]) : l[2] = n), 
                t.push(l));
            }
        }, t;
    };
}, function(e, t, n) {
    "use strict";
    t.a = function(e, t) {
        let n = null;
        n = !(t = t || {}).params && /\?/.test(e) ? e.match(/[^?]*\?(.*)/)[1] : e;
        const o = t.sep || "&", r = n.split(o), i = {};
        for (let e = 0, n = r.length; e < n; e++) {
            const n = r[e].split("=");
            let o = n[0];
            const a = n[1] || "";
            if (t.noDecode) i[o] = a; else {
                try {
                    o = decodeURIComponent(o);
                } catch (e) {
                    o = unescape(o);
                }
                try {
                    i[o] = decodeURIComponent(a);
                } catch (e) {
                    i[o] = unescape(a);
                }
            }
        }
        return i;
    };
}, function(e, t, n) {
    "use strict";
    var o = n(2);
    t.a = e => {
        let {locals: t, use: n, unuse: r} = e;
        return o.c.useMemo(n, []), o.c.useEffect(() => r, []), t;
    };
}, function(e, t, n) {
    "use strict";
    t.a = function(e, t) {
        Array.isArray(t) || (t = [ t ]);
        for (let n = e; n; n = n.parentNode) {
            if (1 !== n.nodeType) return null;
            for (let e, o = 0; e = t[o]; o++) if (n.classList.contains(e)) return n;
        }
        return null;
    };
}, function(e, t, n) {
    "use strict";
    t.a = () => window.top !== window.self;
}, function(e, t, n) {
    "use strict";
    var o = n(0), r = n(6), i = n(31), a = n(53), s = n(2), l = n(3), c = n(19);
    function u(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            t && (o = o.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
            }))), n.push.apply(n, o);
        }
        return n;
    }
    function d(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? u(Object(n), !0).forEach((function(t) {
                Object(c.a)(e, t, n[t]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : u(Object(n)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
            }));
        }
        return e;
    }
    const p = Object(r.a)("downloader:providers");
    var A = function(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", n = t ? t + "-converter" : "unknown-converter";
        const r = {
            ec: n
        };
        e.on("run", e => {
            p.info(n, "Send analytics run downloader."), o.a.sendMessage({
                action: "trackConverterStat",
                params: d({
                    ea: "init-converter",
                    el: "true"
                }, r)
            });
        }), e.on("completed", e => {
            p.info(n, "Send analytics downloader completed."), o.a.sendMessage({
                action: "trackConverterStat",
                params: d({
                    ea: "completed-converter",
                    el: "true"
                }, r)
            });
        }), e.on("error", t => {
            e.sendError || (p.info(n, "Send analytics error downloader - " + t.message), o.a.sendMessage({
                action: "trackConverterStat",
                params: d({
                    ea: "error-converter",
                    el: t.message,
                    cd3: location.href
                }, r)
            }), e.sendError = !0);
        });
    }, f = (n(4), n(54));
    class g {
        init() {
            const e = document.createElement("canvas"), t = document.createElement("video");
            if (t.setAttribute("title", "Prevent Sleep"), t.setAttribute("playsinline", ""), 
            this._supported = "function" == typeof e.captureStream, !this._supported) return;
            e.getContext("2d").fillRect(0, 0, 1, 1), t.srcObject = e.captureStream(0), this.video = t, 
            this._inited = !0;
        }
        start() {
            if (this._inited || this.init(), this._supported && this.video.paused) return this.video.play();
        }
        stop() {
            if (this._inited && this._supported && !this.video.paused) return this.video.pause();
        }
    }
    class h {
        start() {
            if (!this._wakeLock) return navigator.wakeLock.request("screen").then(e => (this._wakeLock = e, 
            !0));
        }
        stop() {
            if (this._wakeLock) return this._wakeLock.release().then(() => (this._wakeLock = null, 
            !0));
        }
    }
    var m = class {
        constructor() {
            const e = window.navigator && "wakeLock" in navigator ? h : g;
            this.parent = new e, this.chain = Object(f.a)(1);
        }
        start() {
            return this.chain(() => this.parent.start());
        }
        stop() {
            return this.chain(() => this.parent.stop());
        }
    };
    let v = null, b = 0;
    var y = function() {
        b++, 1 === b && (v || (v = new m), v.start());
        let e = !1;
        return () => {
            e || (e = !0, 0 == --b && v.stop());
        };
    };
    let C = 0;
    function x(e) {
        return e.returnValue = !0;
    }
    var w = function() {
        C++, 1 === C && window.addEventListener("beforeunload", x);
        let e = !1;
        return () => {
            e || (e = !0, 0 == --C && window.removeEventListener("beforeunload", x));
        };
    }, I = n(20), _ = n.n(I), k = n(58), E = n.n(k), M = n(25);
    const S = {
        margin: "0 12px"
    };
    var O = e => {
        let {title: t, status: n, progress: o, progressStatus: r, onClickCancel: i, error: a} = e;
        const l = Object(M.a)(E.a), c = s.c.useMemo(() => ({
            width: o + "%"
        }), [ o ]);
        return s.c.createElement("div", {
            className: _()(l.ffDownloader)
        }, s.c.createElement("div", {
            className: l.container
        }, s.c.createElement("div", {
            onClick: i,
            className: l.closeBtn,
            style: {
                backgroundImage: "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgb3BhY2l0eT0iMC42Ij4KPHBhdGggZD0iTTEzLjY4IDE0LjIyQzEzLjUzNjggMTQuMjE5OSAxMy4zOTk2IDE0LjE2MjkgMTMuMjk4NCAxNC4wNjE2TDMuOTM4MzkgNC43MDE2MkMzLjg0MyA0LjU5OTI1IDMuNzkxMDcgNC40NjM4NiAzLjc5MzU0IDQuMzIzOTZDMy43OTYwMSA0LjE4NDA2IDMuODUyNjggNC4wNTA1OSAzLjk1MTYyIDMuOTUxNjVDNC4wNTA1NiAzLjg1MjcxIDQuMTg0MDMgMy43OTYwNCA0LjMyMzkzIDMuNzkzNTdDNC40NjM4MyAzLjc5MTEgNC41OTkyMiAzLjg0MzAzIDQuNzAxNTkgMy45Mzg0MkwxNC4wNjE2IDEzLjI5ODRDMTQuMTM3IDEzLjM3MzkgMTQuMTg4NCAxMy40NzAxIDE0LjIwOTIgMTMuNTc0OEMxNC4yMyAxMy42Nzk1IDE0LjIxOTMgMTMuNzg4IDE0LjE3ODQgMTMuODg2NkMxNC4xMzc2IDEzLjk4NTIgMTQuMDY4NSAxNC4wNjk1IDEzLjk3OTcgMTQuMTI4OUMxMy44OTEgMTQuMTg4MiAxMy43ODY3IDE0LjIxOTkgMTMuNjggMTQuMjJaIiBmaWxsPSIjNDM0MzQzIi8+CjxwYXRoIGQ9Ik00LjMyMDI5IDE0LjIyQzQuMjEzNTUgMTQuMjE5OSA0LjEwOTI0IDE0LjE4ODIgNC4wMjA1MyAxNC4xMjg5QzMuOTMxODEgMTQuMDY5NSAzLjg2MjY3IDEzLjk4NTIgMy44MjE4NCAxMy44ODY2QzMuNzgxMDEgMTMuNzg4IDMuNzcwMzIgMTMuNjc5NSAzLjc5MTExIDEzLjU3NDhDMy44MTE5MSAxMy40NzAxIDMuODYzMjYgMTMuMzczOSAzLjkzODY5IDEzLjI5ODRMMTMuMjk4NyAzLjkzODQyQzEzLjQwMTEgMy44NDMwMyAxMy41MzY0IDMuNzkxMSAxMy42NzYzIDMuNzkzNTdDMTMuODE2MiAzLjc5NjA0IDEzLjk0OTcgMy44NTI3MSAxNC4wNDg3IDMuOTUxNjVDMTQuMTQ3NiA0LjA1MDU5IDE0LjIwNDMgNC4xODQwNiAxNC4yMDY3IDQuMzIzOTZDMTQuMjA5MiA0LjQ2Mzg2IDE0LjE1NzMgNC41OTkyNSAxNC4wNjE5IDQuNzAxNjJMNC43MDE4OSAxNC4wNjE2QzQuNjAwNzEgMTQuMTYyOSA0LjQ2MzQ2IDE0LjIxOTkgNC4zMjAyOSAxNC4yMloiIGZpbGw9IiM0MzQzNDMiLz4KPC9nPgo8L3N2Zz4K)"
            }
        }), a && s.c.createElement("div", {
            className: l.error
        }, s.c.createElement("div", {
            className: l.errorText
        }, "Error:"), " ", a.message, " "), !a && s.c.createElement("div", null, s.c.createElement("p", {
            className: l.fileName
        }, "Filename: ", t), s.c.createElement("div", {
            className: l.footer
        }, s.c.createElement("div", {
            style: S
        }, s.c.createElement("div", {
            className: l.loadingBar
        }, s.c.createElement("div", {
            className: l.progressBar,
            style: c
        })), s.c.createElement("div", {
            className: l.status
        }, s.c.createElement("div", {
            className: l.statusState
        }, s.c.createElement("div", null, n), s.c.createElement("div", null, r)), s.c.createElement("div", {
            className: l.statusPercentage
        }, o, "%")))))));
    }, z = n(59), N = n.n(z);
    var D = e => {
        let {title: t, status: n, progress: o, progressStatus: r, onClickCancel: i, error: a, blob: l, showTip: c} = e;
        const u = Object(M.a)(N.a), d = s.c.useMemo(() => ({
            width: o + "%"
        }), [ o ]);
        return s.c.createElement("div", {
            className: _()(u.ffDownloader)
        }, s.c.createElement("div", {
            className: u.container
        }, s.c.createElement("svg", {
            width: "12",
            height: "12",
            viewBox: "0 0 12 12",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            onClick: i,
            className: u.closeBtn
        }, s.c.createElement("g", {
            opacity: "0.4"
        }, s.c.createElement("path", {
            d: "M9.11983 9.48007C9.02438 9.47999 8.93288 9.44201 8.86543 9.37447L2.62543 3.13447C2.56184 3.06623 2.52722 2.97597 2.52886 2.8827C2.53051 2.78944 2.56829 2.70045 2.63425 2.63449C2.70021 2.56854 2.78919 2.53075 2.88246 2.52911C2.97572 2.52746 3.06598 2.56208 3.13423 2.62567L9.37423 8.86567C9.42451 8.91602 9.45875 8.98014 9.47261 9.04993C9.48648 9.11972 9.47935 9.19205 9.45213 9.2578C9.42491 9.32354 9.37881 9.37974 9.31967 9.4193C9.26052 9.45886 9.19098 9.48001 9.11983 9.48007Z",
            fill: "#434343"
        }), s.c.createElement("path", {
            d: "M2.88019 9.48007C2.80904 9.48001 2.7395 9.45886 2.68035 9.4193C2.62121 9.37974 2.57512 9.32354 2.54789 9.2578C2.52067 9.19205 2.51354 9.11972 2.52741 9.04993C2.54127 8.98014 2.57551 8.91602 2.62579 8.86567L8.86579 2.62567C8.93404 2.56208 9.0243 2.52746 9.11756 2.52911C9.21083 2.53075 9.29981 2.56854 9.36577 2.63449C9.43173 2.70045 9.46951 2.78944 9.47116 2.8827C9.4728 2.97597 9.43818 3.06623 9.37459 3.13447L3.13459 9.37447C3.06714 9.44201 2.97564 9.47999 2.88019 9.48007V9.48007Z",
            fill: "#434343"
        }))), a && s.c.createElement("div", {
            className: u.error
        }, s.c.createElement("div", {
            className: u.errorText
        }, "Error:"), " ", a.message, " "), !a && s.c.createElement("div", null, s.c.createElement("p", {
            className: u.fileName
        }, "Filename: ", t), s.c.createElement("div", {
            className: u.footer
        }, s.c.createElement("div", null, s.c.createElement("div", {
            className: u.loadingBar
        }, s.c.createElement("div", {
            className: u.progressBar,
            style: d
        })), s.c.createElement("div", {
            className: u.status
        }, s.c.createElement("div", {
            className: u.statusState
        }, s.c.createElement("div", null, n), s.c.createElement("div", null, r)), s.c.createElement("div", {
            className: u.statusPercentage
        }, o, "%"))))), c && s.c.createElement("div", {
            className: u.tipWindow
        }, s.c.createElement("div", {
            className: u.tipText
        }, s.c.createElement("p", null, "If the download did not start, click the Download button")), l && s.c.createElement("a", {
            href: l,
            download: t
        }, s.c.createElement("button", {
            className: u.tipWindowButton,
            type: "button"
        }, "Download")))));
    }, j = n(7), T = n(32);
    const L = Object(r.a)("MediaMuxer"), R = "PREPARE", B = "CONVERTING", P = "DOWNLOADED", F = "INFINITE", q = "FINITE", W = s.c.memo(e => {
        let {sources: t, filename: n, format: r, unmountLayer: c, convertType: u, showConfirmOnClose: d} = e;
        const [p, f] = s.c.useState(null), [g, h] = s.c.useState(!1), [m, v] = s.c.useState("Loading..."), [b, C] = s.c.useState(R), [x, I] = s.c.useState(0), [_, k] = s.c.useState(""), [E, M] = s.c.useState(F), [S, z] = s.c.useState(null), [N, W] = s.c.useState(!1), Q = s.c.useRef();
        s.c.useEffect(() => {
            function e() {
                c();
            }
            return l.a.onRemoveEvent(Q.current, e), () => {
                l.a.offRemoveEvent(Q.current, e);
            };
        }, []), s.c.useEffect(() => {
            const e = {
                run: [],
                completed: [],
                error: []
            }, s = (t, n) => e[t].forEach(e => e(n));
            A({
                on: (t, n) => {
                    e[t] && e[t].push(n);
                }
            }, "youtube-merge");
            let l = !0;
            const d = new a.a(Q.current);
            d.onProgress = (e, t) => {
                l && (I(Math.trunc(100 * e)), [ q, F ].includes(t) && M(t));
            }, d.onProgressStatus = e => {
                l && k(e);
            }, d.onStatus = (e, t) => {
                l && (v(e), [ R, B, P ].includes(t) && C(t));
            }, s("run");
            const p = w(), g = y();
            return d.init().then(() => (Object(j.a)({
                category: "download-start",
                subcategory: Object(T.a)(),
                event: "video"
            }), "hls" === u ? d.hls(t, n, r) : "hlsToMp3" === u ? d.hlsToMp3(t, n) : d.join(t, n, r))).then(() => {
                if (l) {
                    if (o.a.isFirefox) return d.download(), setTimeout(c, 3e3);
                    d.getBuiltBlob().then(e => {
                        const t = document.createElement("a"), n = URL.createObjectURL(e.blob);
                        t.href = n, t.download = e.filename, setTimeout(() => {
                            t.dispatchEvent(new MouseEvent("click"));
                        }, 0), z(n), W(!0);
                    });
                }
            }).then(() => {
                Object(j.a)({
                    category: "download-complete",
                    subcategory: Object(T.a)(),
                    event: "video"
                }), s("completed"), l && (h(!0), v("Complete"), C(P));
            }, e => {
                s("error", e), l && (L.error("Join error", e), f(e));
            }).then(...Object(i.a)(() => {
                p(), g(), l && h(!0);
            })), () => {
                l = !1, p(), g();
            };
        }, []);
        const H = s.c.useCallback(() => {
            (b === P || !d || confirm(o.a.i18n.getMessage("are_you_sure_interrupt_download"))) && c();
        }, [ b ]), G = s.c.useCallback(() => W(!N), [ W, N ]);
        return o.a.isFirefox ? s.c.createElement("div", {
            ref: Q
        }, s.c.createElement(O, {
            title: n,
            format: r,
            status: m,
            progress: x,
            progressStatus: _,
            onClickCancel: H,
            error: p
        })) : s.c.createElement("div", {
            ref: Q
        }, s.c.createElement(D, {
            title: n,
            format: r,
            status: m,
            progress: x,
            progressStatus: _,
            onClickCancel: H,
            error: p,
            blob: S,
            onClickShowTip: G,
            showTip: N
        }));
    });
    t.a = W;
}, function(e, t, n) {
    "use strict";
    var o = n(0);
    t.a = e => new Promise(t => o.a.storage.get(e, t));
}, function(e, t, n) {
    "use strict";
    var o = n(33);
    t.a = class {
        constructor(e) {
            this.target = e.target, this.options = e.options || {
                attributes: !0,
                childList: !1,
                attributeOldValue: !0,
                attributeFilter: []
            }, this.attrs = e.attrs, this.observer = null, this.init();
        }
        init() {
            this.attrs.forEach(e => {
                this.options.attributeFilter.push(e.name);
            });
            const e = Object(o.a)();
            this.observer = new e(e => {
                let t;
                for (;t = e.shift(); ) this._match(t);
            }), this.start();
        }
        trigger() {
            const e = this.attrs;
            for (var t, n = 0; t = e[n]; n++) {
                const e = this.target.getAttribute(t.name);
                null !== e && t.callback({
                    value: e,
                    oldValue: null
                });
            }
        }
        start() {
            this._disconnect(), this._connect();
        }
        stop() {
            this._disconnect();
        }
        _match(e) {
            const t = this.attrs;
            for (let n, o = 0; n = t[o]; o++) n.name === e.attributeName && n.callback({
                value: e.target.getAttribute(e.attributeName),
                oldValue: e.oldValue
            });
        }
        _connect() {
            this.observer.observe(this.target, this.options);
        }
        _disconnect() {
            this.observer.disconnect();
        }
        static isAvailable() {
            return !!Object(o.a)();
        }
    };
}, function(e, t, n) {
    "use strict";
    var o = n(37);
    t.a = e => [ t => Object(o.a)(e).then(() => t), t => Object(o.a)(e).then(() => {
        throw t;
    }) ];
}, function(e, t, n) {
    "use strict";
    t.a = () => {
        switch (window.location.hostname) {
          case "www.youtube.com":
            return "101";

          case "ok.ru":
            return "ok";

          case "vk.com":
            return "vk";

          case "music.yandex.ru":
            return "ya";

          case "www.facebook.com":
          case "web.facebook.com":
            return "fa";

          case "twitch.com":
            return "tw";

          case "www.instagram.com":
            return "in";

          case "my.mail.ru":
            return "ma";

          case "vimeo.com":
            return "vi";

          case "soundcloud.com":
            return "so";

          case "tiktok.com":
            return "ti";

          case "www.dailymotion.com":
            return "da";

          default:
            return "";
        }
    };
}, function(e, t, n) {
    "use strict";
    t.a = () => {
        let e = null;
        return "undefined" != typeof MutationObserver ? e = MutationObserver : "undefined" != typeof WebKitMutationObserver ? e = WebKitMutationObserver : "undefined" != typeof MozMutationObserver && (e = MozMutationObserver), 
        e;
    };
}, function(e, t, n) {
    "use strict";
    class o extends Error {
        constructor(e, t) {
            super(e), this.code = t;
        }
    }
    t.a = o;
}, function(e, t, n) {
    "use strict";
    var o, r = function() {
        return void 0 === o && (o = Boolean(window && document && document.all && !window.atob)), 
        o;
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
    }(), a = [];
    function s(e) {
        for (var t = -1, n = 0; n < a.length; n++) if (a[n].identifier === e) {
            t = n;
            break;
        }
        return t;
    }
    function l(e, t) {
        for (var n = {}, o = [], r = 0; r < e.length; r++) {
            var i = e[r], l = t.base ? i[0] + t.base : i[0], c = n[l] || 0, u = "".concat(l, " ").concat(c);
            n[l] = c + 1;
            var d = s(u), p = {
                css: i[1],
                media: i[2],
                sourceMap: i[3]
            };
            -1 !== d ? (a[d].references++, a[d].updater(p)) : a.push({
                identifier: u,
                updater: h(p, t),
                references: 1
            }), o.push(u);
        }
        return o;
    }
    function c(e) {
        var t = document.createElement("style"), o = e.attributes || {};
        if (void 0 === o.nonce) {
            var r = n.nc;
            r && (o.nonce = r);
        }
        if (Object.keys(o).forEach((function(e) {
            t.setAttribute(e, o[e]);
        })), "function" == typeof e.insert) e.insert(t); else {
            var a = i(e.insert || "head");
            if (!a) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
            a.appendChild(t);
        }
        return t;
    }
    var u, d = (u = [], function(e, t) {
        return u[e] = t, u.filter(Boolean).join("\n");
    });
    function p(e, t, n, o) {
        var r = n ? "" : o.media ? "@media ".concat(o.media, " {").concat(o.css, "}") : o.css;
        if (e.styleSheet) e.styleSheet.cssText = d(t, r); else {
            var i = document.createTextNode(r), a = e.childNodes;
            a[t] && e.removeChild(a[t]), a.length ? e.insertBefore(i, a[t]) : e.appendChild(i);
        }
    }
    function A(e, t, n) {
        var o = n.css, r = n.media, i = n.sourceMap;
        if (r ? e.setAttribute("media", r) : e.removeAttribute("media"), i && "undefined" != typeof btoa && (o += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i)))), " */")), 
        e.styleSheet) e.styleSheet.cssText = o; else {
            for (;e.firstChild; ) e.removeChild(e.firstChild);
            e.appendChild(document.createTextNode(o));
        }
    }
    var f = null, g = 0;
    function h(e, t) {
        var n, o, r;
        if (t.singleton) {
            var i = g++;
            n = f || (f = c(t)), o = p.bind(null, n, i, !1), r = p.bind(null, n, i, !0);
        } else n = c(t), o = A.bind(null, n, t), r = function() {
            !function(e) {
                if (null === e.parentNode) return !1;
                e.parentNode.removeChild(e);
            }(n);
        };
        return o(e), function(t) {
            if (t) {
                if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                o(e = t);
            } else r();
        };
    }
    e.exports = function(e, t) {
        (t = t || {}).singleton || "boolean" == typeof t.singleton || (t.singleton = r());
        var n = l(e = e || [], t);
        return function(e) {
            if (e = e || [], "[object Array]" === Object.prototype.toString.call(e)) {
                for (var o = 0; o < n.length; o++) {
                    var r = s(n[o]);
                    a[r].references--;
                }
                for (var i = l(e, t), c = 0; c < n.length; c++) {
                    var u = s(n[c]);
                    0 === a[u].references && (a[u].updater(), a.splice(u, 1));
                }
                n = i;
            }
        };
    };
}, function(e, t, n) {
    "use strict";
    t.a = function(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        t && !Array.isArray(t) && (t = [ t ]);
        const n = [], o = {
            "{": 0,
            "[": 0
        }, r = {
            "}": "{",
            "]": "["
        }, i = /[{}\]\[":0-9.,-]/, a = /[\r\n\s\t]/;
        let s = "";
        for (let t, l = 0; t = e[l]; l++) if ('"' !== t) i.test(t) ? (s += t, "{" === t || "[" === t ? (o["{"] || o["["] || (s = t), 
        o[t]++) : "}" !== t && "]" !== t || (o[r[t]]--, o["{"] || o["["] || n.push(s))) : "t" === t && "true" === e.substr(l, 4) ? (s += "true", 
        l += 3) : "f" === t && "false" === e.substr(l, 5) ? (s += "false", l += 4) : "n" === t && "null" === e.substr(l, 4) ? (s += "null", 
        l += 3) : a.test(t) || (o["{"] = 0, o["["] = 0, s = ""); else {
            let t = l;
            for (;-1 !== t && (t === l || "\\" === e[t - 1]); ) t = e.indexOf('"', t + 1);
            -1 === t && (t = e.length - 1), s += e.substr(l, t - l + 1), l = t, o["{"] || o["["] || n.push(s);
        }
        const l = [];
        for (let e = 0, o = n.length; e < o; e++) {
            const o = n[e];
            if ("{}" !== o && "[]" !== o) try {
                t.every((function(e) {
                    return e.test(o);
                })) && l.push(JSON.parse(o));
            } catch (e) {}
        }
        return l;
    };
}, function(e, t, n) {
    "use strict";
    t.a = e => new Promise(t => t(e()));
}, function(e, t, n) {
    "use strict";
    var o = n(6);
    const r = Object(o.a)("webRequest");
    var i = function() {
        const e = /^sf-\d+_/, t = {
            urls: [ "<all_urls>" ],
            types: [ "xmlhttprequest" ]
        };
        let n = !1;
        const o = {}, i = {}, a = function(e) {
            for (let t in e) return !1;
            return !0;
        }, s = function(e) {
            delete i[e.requestId], a(o) && a(i) && u();
        }, l = function(t) {
            const n = i[t.requestId], r = t.requestHeaders || [];
            let s = [], l = [];
            const c = [];
            if (n) l = n.changes, s = n.filtered; else if (!a(o)) {
                let t, n;
                for (let i, a = 0; i = r[a]; a++) t = i.name, e.test(t) && (n = o[t], n && (i.name = n.name, 
                i.value = n.value, l.push(i), s.push(n.name.toLowerCase()), s.push(t.toLowerCase()), 
                /cookie/i.test(i.name) && c.push("set-cookie"), clearTimeout(n.timer), delete o[t]));
            }
            if (l.length) {
                n || (i[t.requestId] = {
                    changes: l,
                    filtered: s,
                    filterResponseHeaders: c
                });
                return {
                    requestHeaders: r.filter((function(e) {
                        return -1 === s.indexOf(e.name.toLowerCase());
                    })).concat(l)
                };
            }
        }, c = function(e) {
            const t = i[e.requestId], n = e.responseHeaders;
            if (t && n) {
                const e = t.filterResponseHeaders;
                return {
                    responseHeaders: n.filter((function(t) {
                        return -1 === e.indexOf(t.name.toLowerCase());
                    }))
                };
            }
        }, u = function() {
            n && (n = !1, chrome.webRequest.onBeforeSendHeaders.removeListener(l, t, [ "blocking", "requestHeaders" ]), 
            chrome.webRequest.onHeadersReceived.removeListener(c, t, [ "blocking", "responseHeaders" ]), 
            chrome.webRequest.onResponseStarted.removeListener(s, t), chrome.webRequest.onErrorOccurred.removeListener(s, t), 
            r.debug("webRequest", "rm listener"));
        };
        let d = 10, p = !1;
        let A = null;
        const f = function(e) {
            return (null === A || e) && (A = !!(chrome.webRequest && chrome.webRequest.onBeforeSendHeaders && chrome.webRequest.onResponseStarted && chrome.webRequest.onErrorOccurred)), 
            A;
        }, g = /^user-agent$|^origin$|^cookie$/i;
        return {
            wrapHeaderKey: function(e, i) {
                if (f()) {
                    let a, u = 100;
                    for (;u-- > 0 && (a = "sf-" + parseInt(1e5 * Math.random()) + "_" + e, o[a]); ) ;
                    return o[a] = {
                        name: e,
                        value: i,
                        timer: setTimeout((function() {
                            delete o[a];
                        }), 3e3)
                    }, n || (n = !0, chrome.webRequest.onBeforeSendHeaders.addListener(l, t, [ "blocking", "requestHeaders" ]), 
                    chrome.webRequest.onHeadersReceived.addListener(c, t, [ "blocking", "responseHeaders" ]), 
                    chrome.webRequest.onResponseStarted.addListener(s, t), chrome.webRequest.onErrorOccurred.addListener(s, t), 
                    r.debug("webRequest", "add listener")), a;
                }
                return e;
            },
            isSpecialHeader: function(e) {
                return g.test(e);
            },
            requestPermission: function(e) {
                f() || p ? e(A) : chrome.permissions && chrome.permissions.request ? chrome.permissions.request({
                    permissions: [ "webRequest", "webRequestBlocking" ]
                }, (function(t) {
                    (t || d-- <= 0) && (p = !0), t && f(!0), e(A);
                })) : (p = !0, e(A));
            }
        };
    }();
    const a = n(42), s = function(e) {
        e = e.split(/\r?\n/);
        const t = {};
        return e.forEach((function(e) {
            const n = e.indexOf(":");
            if (-1 === n) return;
            const o = e.substr(0, n).trim().toLowerCase(), r = e.substr(n + 1).trim();
            t[o] = r;
        })), t;
    };
    t.a = function(e, t) {
        const n = {};
        let o = function(e, n) {
            o = null, d.timeoutTimer && clearTimeout(d.timeoutTimer);
            let i = null;
            e && (i = String(e.message || e) || "ERROR"), t && t(i, r(n), n);
        };
        const r = function(e) {
            const t = {};
            t.statusCode = A.status, t.statusText = A.statusText;
            let n = null;
            const o = A.getAllResponseHeaders();
            return "string" == typeof o && (n = s(o)), t.headers = n || {}, t.body = e, t.responseURL = A.responseURL, 
            t;
        };
        "object" != typeof e && (e = {
            url: e
        });
        let l = e.url, c = e.method || e.type || "GET";
        c = c.toUpperCase();
        let u = e.data;
        "string" != typeof u && (u = a.stringify(u)), u && "GET" === c && (l += (/\?/.test(l) ? "&" : "?") + u, 
        u = void 0), !1 === e.cache && -1 !== [ "GET", "HEAD" ].indexOf(c) && (l += (/\?/.test(l) ? "&" : "?") + "_=" + Date.now()), 
        e.headers = e.headers || {}, u && (e.headers["Content-Type"] = e.contentType || e.headers["Content-Type"] || "application/x-www-form-urlencoded; charset=UTF-8");
        const d = {};
        d.url = l, d.method = c, u && (d.data = u), e.json && (d.json = !0), e.xml && (d.xml = !0), 
        e.timeout && (d.timeout = e.timeout), e.mimeType && (d.mimeType = e.mimeType), e.withCredentials && (d.withCredentials = !0), 
        Object.keys(e.headers).length && (d.headers = e.headers), d.timeout > 0 && (d.timeoutTimer = setTimeout((function() {
            o && o(new Error("ETIMEDOUT")), A.abort();
        }), d.timeout));
        const p = {
            0: 200,
            1223: 204
        }, A = (e.localXHR, new XMLHttpRequest);
        A.open(d.method, d.url, !0), d.mimeType && A.overrideMimeType(d.mimeType), d.withCredentials && (A.withCredentials = !0);
        const f = [];
        for (let e in d.headers) i && i.isSpecialHeader(e) && f.push({
            key: e,
            value: d.headers[e]
        }), A.setRequestHeader(e, d.headers[e]);
        A.onload = function() {
            const e = p[A.status] || A.status;
            try {
                if (e >= 200 && e < 300 || 304 === e) {
                    let e = A.responseText;
                    if (d.json) e = JSON.parse(e); else if (d.xml) e = (new DOMParser).parseFromString(e, "text/xml"); else if ("string" != typeof e) throw console.error("Response is not string!", e), 
                    new Error("Response is not string!");
                    return o && o(null, e);
                }
                throw new Error(A.status + " " + A.statusText);
            } catch (e) {
                return o && o(e);
            }
        };
        const g = A.onerror = function() {
            o && o(new Error(A.status + " " + A.statusText));
        };
        let h = null;
        void 0 !== A.onabort ? A.onabort = g : h = function() {
            4 === A.readyState && o && setTimeout((function() {
                return g();
            }));
        }, h && (A.onreadystatechange = h);
        const m = function() {
            try {
                A.send(d.data || null);
            } catch (e) {
                setTimeout((function() {
                    o && o(e);
                }));
            }
        };
        if (i && f.length) {
            const e = function() {
                for (let e, t = 0; e = f[t]; t++) A.setRequestHeader(i.wrapHeaderKey(e.key, e.value), e.value);
            };
            i.requestPermission((function(t) {
                t && e(), o && m();
            }));
        } else m();
        return n.abort = function() {
            o = null, A.abort();
        }, n;
    };
}, function(e, t, n) {
    "use strict";
    function o(e, t) {
        const n = [];
        let o;
        for (;null !== (o = t.exec(e)); ) o.index === t.lastIndex && t.lastIndex++, n.push(o);
        return n;
    }
    n.d(t, "a", (function() {
        return o;
    }));
}, function(e, t, n) {
    "use strict";
    var o = n(57);
    var r = n(0);
    Error;
    t.a = (e, t) => {
        const n = t || {}, {responseStatus: i, responseOk: a = !0, responseType: s = "text", requestPrefix: l = ""} = n, c = function(e, t) {
            if (null == e) return {};
            var n, r, i = o(e, t);
            if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(e);
                for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
            }
            return i;
        }(n, [ "responseStatus", "responseOk", "responseType", "requestPrefix" ]);
        let u = null, d = () => u && u();
        const p = (A = l, r.a.callFn("createRequest", [ A ]));
        var A;
        p.then(e => {
            u = () => r.a.callFn("clearRequest", [ e ]);
        });
        const f = p.then(t => r.a.callFn("sendRequest", [ {
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
                    const e = n.length, o = new Uint8Array(e);
                    for (let t = 0; t < e; t += 1) o[t] = n.charCodeAt(t);
                    return "blob" === t ? new Blob([ o ]) : o.buffer;
                }
                return n;
            }(e, s)).then(e => ({
                response: o,
                body: e
            }));
        }).then(e => (d(), e)).catch(e => {
            throw d(), e;
        });
        return f.abort = () => d(), f;
    };
}, function(e, t, n) {
    "use strict";
    n.d(t, "c", (function() {
        return u;
    })), n.d(t, "d", (function() {
        return d;
    })), n.d(t, "b", (function() {
        return p;
    })), n.d(t, "a", (function() {
        return A;
    }));
    var o = n(0), r = n(2), i = n(65), a = n.n(i), s = n(20), l = n.n(s), c = n(25);
    const u = "matchtv", d = "vk", p = r.c.memo(e => {
        let {items: t = [], theme: n, children: i} = e;
        const s = Object(c.a)(a.a), [p, A] = r.c.useState(!1), f = r.c.useRef(), g = r.c.useRef(), h = r.c.useRef(), m = r.c.useMemo(() => ({
            twitch: s.themeTwitch,
            [d]: s.themeVk,
            [u]: s.themeMatchtv
        }[n]), [ n ]), v = r.c.useCallback(() => {
            A(e => !e);
        }, []);
        return r.c.useEffect(() => {
            const e = e => {
                let t = e.target === f.current || f.current.contains(e.target), n = e.target === g.current;
                t || n || !h.current.classList.contains(s.show) || v();
            };
            return document.addEventListener("click", e), () => {
                document.removeEventListener("click", e);
            };
        }, []), r.c.createElement("div", {
            ref: f,
            className: m
        }, r.c.createElement("div", {
            ref: g,
            onClick: v
        }, i), r.c.createElement("div", {
            ref: h,
            className: l()(s.itemContainer, p ? s.show : s.hide)
        }, !t.length && r.c.createElement("div", {
            className: s.message
        }, o.a.i18n.getMessage("noLinksFound")), t.map(e => r.c.createElement("div", {
            onClick: e.onClick,
            className: s.item
        }, r.c.createElement("div", null, e.title)))));
    }), A = e => r.c.createElement("div", null, e.children);
}, function(e, t, n) {
    "use strict";
    t.decode = t.parse = n(77), t.encode = t.stringify = n(78);
}, function(e, t, n) {
    "use strict";
    t.a = e => new Promise(t => setTimeout(t, e));
}, function(e, t, n) {
    "use strict";
    n.d(t, "a", (function() {
        return a;
    }));
    var o = n(0), r = n(11), i = n(8);
    class a {
        constructor() {
            this.active = 1, this.utils = void 0, this.settings = void 0, this.cache = s;
        }
        async start() {
            this.settings = await o.a.callFn("getPreferences"), this.utils = Object(r.a)({
                preferences: this.settings
            }), this.defaultListeners(), this.init && this.init();
        }
        defaultListeners() {
            document.addEventListener("file.download", e => {
                let {detail: t} = e;
                this.utils.download(t.filename, t.downloadURL);
            });
        }
        initObserver() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            this.observer = new i.a({
                queries: e.map(e => ({
                    css: e.selector,
                    callback: e.handle.bind(e),
                    is: e.type
                }))
            }), this.observer.start();
        }
        appendStyle(e) {
            const t = document.createElement("style");
            t.textContent = e, document.body.appendChild(t);
        }
    }
    class s {
        static set(e, t, n) {
            localStorage.setItem(e, JSON.stringify({
                val: t,
                expires: n ? Date.now() + 60 * n * 1e3 : -1
            }));
        }
        static get(e) {
            const t = localStorage.getItem(e);
            if (!t) return null;
            const {val: n, expires: o} = JSON.parse(t);
            return n && -1 === o || o > Date.now() ? n : null;
        }
    }
}, function(e, t, n) {
    "use strict";
    let o = null;
    t.a = (e, t) => {
        if (!o) {
            let e = document.createElement("div");
            "function" == typeof e.matches ? o = (e, t) => e.matches(t) : "function" == typeof e.matchesSelector ? o = (e, t) => e.matchesSelector(t) : "function" == typeof e.webkitMatchesSelector ? o = (e, t) => e.webkitMatchesSelector(t) : "function" == typeof e.mozMatchesSelector && (o = (e, t) => e.mozMatchesSelector(t)), 
            e = null;
        }
        return o(e, t);
    };
}, function(e, t, n) {
    "use strict";
    var o = function(e) {
        e = e.replace(/\r\n/g, "\n");
        for (var t = "", n = 0; n < e.length; n++) {
            var o = e.charCodeAt(n);
            o < 128 ? t += String.fromCharCode(o) : o > 127 && o < 2048 ? (t += String.fromCharCode(o >> 6 | 192), 
            t += String.fromCharCode(63 & o | 128)) : (t += String.fromCharCode(o >> 12 | 224), 
            t += String.fromCharCode(o >> 6 & 63 | 128), t += String.fromCharCode(63 & o | 128));
        }
        return t;
    };
    t.a = function(e, t, n) {
        let r = "";
        if (n || "undefined" == typeof URL || "undefined" == typeof Blob) {
            const n = o(e);
            r = "data:" + t + ";charset=utf8;base64," + encodeURIComponent(btoa(n));
        } else {
            const n = new Blob([ e ], {
                encoding: "UTF-8",
                type: t
            });
            r = URL.createObjectURL(n);
        }
        return r;
    };
}, function(e, t, n) {
    "use strict";
    var o = n(1);
    t.a = function e(t, n) {
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
        const r = n.fragment || document.createDocumentFragment();
        for (let n = 0, i = t.length; n < i; n++) {
            const i = t[n];
            if ("object" == typeof i) for (let t in i) {
                const n = i[t], a = n.append;
                let s;
                delete n.append, r.appendChild(s = o.a.create(t, n)), void 0 !== a && e(a, {
                    fragment: s
                });
            } else r.appendChild(document.createTextNode(i));
        }
        return r;
    };
}, function(e, t, n) {
    "use strict";
    var o = n(32);
    t.a = e => {
        switch (Object(o.a)()) {
          case "101":
            return "video";

          case "ya":
            return "track";

          case "in":
            if (e.el.className.includes("story")) return "story";
            if (e.el.download.includes("mp4")) return "video";

          case "ma":
            if (0 === Object.keys(e).length) return "track";
            if (e.el.download.includes("mp4")) return "video";

          case "vk":
            return 0 === Object.keys(e).length ? "track" : e.el.download.includes("jpg") || e.el.download.includes("png") ? "photo" : "video";

          case "fa":
            return 0 === Object.keys(e).length ? "photo" : "video";

          case "vi":
            return "video";

          case "sc":
          case "ok":
            return "track";

          case "da":
            return "video";

          default:
            return "";
        }
    };
}, function(e, t, n) {
    "use strict";
    const o = /^[^{]+\{\s*\[native \w/;
    let r = function(e, t) {
        return r = o.test(document.compareDocumentPosition) || o.test(document.contains) ? function(e, t) {
            const n = 9 === e.nodeType ? e.documentElement : e, o = t && t.parentNode;
            return e === o || !(!o || 1 !== o.nodeType || !(n.contains ? n.contains(o) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(o)));
        } : function(e, t) {
            if (t) for (;t = t.parentNode; ) if (t === e) return !0;
            return !1;
        }, r.apply(this, arguments);
    };
    t.a = (e, t) => r(e, t);
}, function(e, t, n) {
    var o = n(55).default;
    e.exports = o;
}, function(e, t, n) {
    "use strict";
    const o = /\\(\\u[0-9a-f]{4})/g;
    t.a = function(e) {
        try {
            return JSON.parse(JSON.stringify(e).replace(o, "$1"));
        } catch (t) {
            return e;
        }
    };
}, function(e, t, n) {
    "use strict";
    t.a = function(e, t) {
        t && !Array.isArray(t) && (t = [ t ]);
        const n = [];
        return e.replace(/<script(?:\s*|\s[^>]+[^\/])>/g, (function(o, r) {
            r += o.length;
            const i = e.indexOf("<\/script>", r);
            if (-1 !== i) {
                const o = e.substr(r, i - r);
                t ? t.every((function(e) {
                    return e.test(o);
                })) && n.push(o) : n.push(o);
            }
        })), n;
    };
}, function(e, t, n) {
    "use strict";
    var o = n(19), r = n(0), i = n(37), a = n(6);
    const s = n(69), l = n(50), c = Object(a.a)("mediaMuxer:transport"), u = () => {}, d = new WeakMap;
    var p = class {
        constructor(e, t) {
            var n = this;
            this.listener = (e, t, n) => {
                switch (e.action) {
                  case "callFn":
                    return this.responseFn(e, n), !0;
                }
            }, this.callFn = function(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                const o = n;
                return o.waitPromise({
                    action: "callFn",
                    fn: e,
                    args: t
                });
            }, this.scope = t, this.pageId = parseInt(1e3 * Math.random(), 10), this.callbackId = 0, 
            this.callbackIdCallback = {}, this.listeners = [], this.transport = e, this.onMessage(this.listener);
        }
        onMessage(e) {
            const t = this.listeners, n = this.callbackIdCallback;
            !t.length && this.transport.onMessage((e, o) => {
                if (o.responseId) {
                    const e = n[o.responseId];
                    return void (e ? e(o.message) : c.error("Callback is not found", o));
                }
                let r;
                r = o.callbackId ? function(e) {
                    let t = !1;
                    return function() {
                        t || (t = !0, e.apply(null, arguments));
                    };
                }(e => {
                    this.transport.sendMessage({
                        responseId: o.callbackId,
                        message: e
                    });
                }) : u;
                let i = null;
                t.forEach(t => {
                    try {
                        const n = t(o.message, {
                            event: e
                        }, r);
                        !0 === n && (i = n);
                    } catch (e) {
                        c.error("Call listener error", e);
                    }
                }), !0 !== i && r();
            }), t.push(e);
        }
        sendMessage(e, t) {
            const n = this.callbackIdCallback, o = {
                message: e
            };
            if (t) {
                o.callbackId = this.pageId + ++this.callbackId;
                const e = e => {
                    delete n[o.callbackId], t(e);
                };
                d.has(t) && (d.delete(t), d.set(e, !0)), n[o.callbackId] = e;
            }
            try {
                this.transport.sendMessage(o);
            } catch (e) {
                throw delete n[o.callbackId], e;
            }
        }
        waitPromise(e) {
            return new Promise((t, n) => {
                const o = e => e.err ? n(l(e.err)) : t(e.result);
                d.set(o, !0), this.sendMessage(e, o);
            });
        }
        responsePromise(e, t) {
            return e.then(e => {
                t({
                    result: e
                });
            }, e => {
                t({
                    err: s(e)
                });
            }).catch((function(e) {
                console.error("responsePromise error", e);
            })), !0;
        }
        resolvePath(e) {
            const t = e.split("."), n = t.pop();
            let o = this.scope;
            for (;t.length; ) o = o[t.shift()];
            return {
                scope: o,
                endPoint: n
            };
        }
        responseFn(e, t) {
            const n = Object(i.a)(() => {
                const {scope: t, endPoint: n} = this.resolvePath(e.fn);
                return t[n].apply(t, e.args);
            });
            return this.responsePromise(n, t);
        }
    }, A = n(40), f = n(34), g = n(31);
    const h = new Map;
    let m = 0;
    const v = e => {
        h.delete(e);
    };
    function b(e) {
        const t = h.get(e);
        if (!t) throw new f.a("Instance is not found", "INSTANCE_IS_NOT_FOUND");
        return t;
    }
    function y(e, t) {
        const n = t.split("."), o = n.pop();
        let r = e;
        for (;n.length; ) r = r[n.shift()];
        return {
            scope: r,
            endPoint: o
        };
    }
    var C = function(e) {
        return e() || (() => {});
    };
    var x = function(e, t) {
        const n = e.indexOf(t);
        -1 !== n && e.splice(n, 1);
    };
    var w = function(e) {
        e = e ? e + "_" : "";
        const t = Date.now();
        return e + Math.floor(1e12 * (t - Math.floor(t))).toString(36) + Math.floor(1e12 * Math.random()).toString(36);
    };
    function I(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            t && (o = o.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
            }))), n.push.apply(n, o);
        }
        return n;
    }
    function _(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? I(Object(n), !0).forEach((function(t) {
                Object(o.a)(e, t, n[t]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : I(Object(n)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
            }));
        }
        return e;
    }
    t.a = class {
        constructor(e) {
            this.frameListener = e => {
                if (this.frame && e.source === this.frame.contentWindow) {
                    const t = e.data;
                    t && this.onMessage(e, t);
                }
            }, this.frameCtr = e, this.frame = null, this.isLoaded = !1, this.destroyed = !1, 
            this.messageStack = [], this.onDestroy = [], this.requestPrefix = w(), this.initTransport(), 
            this.onDestroy.push(C(() => {
                const e = () => r.a.callFn("clearRequestByPrefix", [ this.requestPrefix ]);
                return window.addEventListener("unload", e), () => {
                    window.removeEventListener("unload", e);
                };
            }));
        }
        onProgress(e, t) {}
        onProgressStatus(e) {}
        onStatus(e, t) {}
        download() {
            return this.transport.callFn("download");
        }
        getBuiltBlob() {
            return this.transport.callFn("getBuiltBlob");
        }
        join(e, t, n) {
            return this.transport.callFn("join", [ {
                sources: e,
                filename: t,
                format: n
            } ]);
        }
        hls(e, t, n) {
            return this.transport.callFn("hls", [ {
                sources: e,
                filename: t,
                format: n
            } ]);
        }
        hlsToMp3(e, t) {
            return this.transport.callFn("hlsToMp3", [ {
                sources: e,
                filename: t
            } ]);
        }
        initTransport() {
            const e = this;
            this.transport = new p({
                onMessage(t) {
                    e.onMessage = t;
                },
                sendMessage(t) {
                    e.postMessage(t);
                }
            }, this.getScope()), this.transport.onMessage((e, t, n) => {
                switch (e.action) {
                  case "progress":
                    this.onProgress(e.progress, e.type);
                    break;

                  case "progressStatus":
                    this.onProgressStatus(e.status);
                    break;

                  case "status":
                    this.onStatus(e.status, e.code);
                }
            });
        }
        getScope() {
            return {
                createFetchInstance: e => {
                    let {url: t, options: n} = e;
                    const o = function(e) {
                        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                        m > 1e5 && (m = 0);
                        let n, o = 0;
                        for (;0 === o || h.has(o); ) o = ++m;
                        const r = new Promise(e => {
                            n = e;
                        });
                        return h.set(o, {
                            initFn: e,
                            onInit: n,
                            whenInit: r
                        }), {
                            id: o,
                            methods: t
                        };
                    }(() => {
                        r();
                        const e = Object(A.a)(t, _(_({}, n), {}, {
                            requestPrefix: this.requestPrefix
                        }));
                        return e.then(...Object(g.a)(C(() => {
                            function t() {
                                e.abort();
                            }
                            return this.onDestroy.push(t), () => x(this.onDestroy, t);
                        }))), e;
                    }, [ "abort" ]), r = C(() => {
                        function e() {
                            v(o.id);
                        }
                        return this.onDestroy.push(e), () => x(this.onDestroy, e);
                    });
                    return o;
                },
                instanceInit(e) {
                    let {id: t} = e;
                    return (e => {
                        const t = b(e);
                        let n = null;
                        try {
                            t.init = t.initFn(), t.onInit();
                        } catch (e) {
                            n = e, t.onInit(Promise.reject(new f.a("call initFn error", "CALL_INIT_FN_ERROR")));
                        }
                        if (t.initFn = t.onInit = void 0, Object(i.a)(() => t.init).then(...Object(g.a)(() => {
                            v(e);
                        })), n) throw n;
                        return t.init;
                    })(t);
                },
                instanceCallFn(e) {
                    let {id: t, path: n, args: o} = e;
                    return function(e, t) {
                        let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
                        const o = b(e);
                        return o.whenInit.then(() => {
                            const {scope: e, endPoint: r} = y(o.init, t);
                            return e[r].apply(e, n);
                        });
                    }(t, n, o);
                }
            };
        }
        onMessage() {
            throw new Error("onMessage is not set");
        }
        init() {
            return new Promise((e, t) => {
                this.destroyFrame(), window.addEventListener("message", this.frameListener);
                const n = this.frame = document.createElement("iframe");
                n.src = "https://sf-helper.com/static/joiner2/frame2.html", n.style.position = "absolute", 
                n.style.height = "0px", n.style.width = "0px", n.style.top = "-9999px", n.style.left = "-9999px", 
                n.onload = () => {
                    n.onload = n.onerror = null, this.isLoaded = !0;
                    const o = setTimeout(() => {
                        t(new Error("Load frame timeout"));
                    }, 3e4);
                    try {
                        this.transport.sendMessage({
                            action: "ping"
                        }, () => {
                            clearTimeout(o), e();
                        });
                    } catch (e) {
                        t(e);
                    }
                }, n.onerror = () => {
                    n.onload = n.onerror = null, t(new Error("Load frame error"));
                }, this.frameCtr.appendChild(n);
            }).then(() => {
                for (;this.messageStack.length; ) this.postMessage(this.messageStack.shift());
            });
        }
        postMessage(e) {
            if (!this.destroyed) if (this.isLoaded) {
                if (!this.frame.contentWindow) throw new Error("Window is closed");
                this.frame.contentWindow.postMessage(e, "*");
            } else this.messageStack.push(e);
        }
        destroyFrame() {
            window.removeEventListener("message", this.frameListener), this.frame && this.frame.parentNode && this.frame.parentNode.removeChild(this.frame);
        }
        destroy() {
            this.destroyed = !0, this.destroyFrame(), this.onDestroy.splice(0).forEach(e => e());
        }
    };
}, function(e, t, n) {
    "use strict";
    var o = n(37);
    var r = class {
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
                const n = [ e, t ], o = this.queue.push(n);
                this.maxQueue && o > this.maxQueue && this.queue.splice(0, o - this.maxQueue);
            }
            return n;
        }
        runQueue(e, t) {
            this.activeCount++;
            const n = Object(o.a)(e);
            t(n), n.then(this.finishQueue, this.finishQueue);
        }
    };
    t.a = (e, t) => {
        const n = new r(e, t);
        return e => n.add(e);
    };
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e;
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e;
    };
    function r(e) {
        return e && "object" === (void 0 === e ? "undefined" : o(e)) && "string" == typeof e.name && "string" == typeof e.message;
    }
    t.default = function(e) {
        return r(e) ? Object.assign(new Error, {
            stack: void 0
        }, e) : e;
    }, t.isSerializedError = r;
}, , function(e, t) {
    e.exports = function(e, t) {
        if (null == e) return {};
        var n, o, r = {}, i = Object.keys(e);
        for (o = 0; o < i.length; o++) n = i[o], t.indexOf(n) >= 0 || (r[n] = e[n]);
        return r;
    }, e.exports.default = e.exports, e.exports.__esModule = !0;
}, function(e, t, n) {
    var o = n(35), r = n(70);
    "string" == typeof (r = r.__esModule ? r.default : r) && (r = [ [ e.i, r, "" ] ]);
    var i, a = 0, s = {
        injectType: "lazyStyleTag",
        insert: "head",
        singleton: !1
    }, l = {};
    l.locals = r.locals || {}, l.use = function() {
        return a++ || (i = o(r, s)), l;
    }, l.unuse = function() {
        a > 0 && !--a && (i(), i = null);
    }, e.exports = l;
}, function(e, t, n) {
    var o = n(35), r = n(71);
    "string" == typeof (r = r.__esModule ? r.default : r) && (r = [ [ e.i, r, "" ] ]);
    var i, a = 0, s = {
        injectType: "lazyStyleTag",
        insert: "head",
        singleton: !1
    }, l = {};
    l.locals = r.locals || {}, l.use = function() {
        return a++ || (i = o(r, s)), l;
    }, l.unuse = function() {
        a > 0 && !--a && (i(), i = null);
    }, e.exports = l;
}, function(e, t, n) {
    var o = n(35), r = n(72);
    "string" == typeof (r = r.__esModule ? r.default : r) && (r = [ [ e.i, r, "" ] ]);
    var i, a = 0, s = {
        injectType: "lazyStyleTag",
        insert: "head",
        singleton: !1
    }, l = {};
    l.locals = r.locals || {}, l.use = function() {
        return a++ || (i = o(r, s)), l;
    }, l.unuse = function() {
        a > 0 && !--a && (i(), i = null);
    }, e.exports = l;
}, function(e, t, n) {
    var o = n(35), r = n(73);
    "string" == typeof (r = r.__esModule ? r.default : r) && (r = [ [ e.i, r, "" ] ]);
    var i, a = 0, s = {
        injectType: "lazyStyleTag",
        insert: "head",
        singleton: !1
    }, l = {};
    l.locals = r.locals || {}, l.use = function() {
        return a++ || (i = o(r, s)), l;
    }, l.unuse = function() {
        a > 0 && !--a && (i(), i = null);
    }, e.exports = l;
}, function(e, t, n) {
    var o = n(35), r = n(74);
    "string" == typeof (r = r.__esModule ? r.default : r) && (r = [ [ e.i, r, "" ] ]);
    var i, a = 0, s = {
        injectType: "lazyStyleTag",
        insert: "head",
        singleton: !1
    }, l = {};
    l.locals = r.locals || {}, l.use = function() {
        return a++ || (i = o(r, s)), l;
    }, l.unuse = function() {
        a > 0 && !--a && (i(), i = null);
    }, e.exports = l;
}, function(e, t, n) {
    var o = n(35), r = n(75);
    "string" == typeof (r = r.__esModule ? r.default : r) && (r = [ [ e.i, r, "" ] ]);
    var i, a = 0, s = {
        injectType: "lazyStyleTag",
        insert: "head",
        singleton: !1
    }, l = {};
    l.locals = r.locals || {}, l.use = function() {
        return a++ || (i = o(r, s)), l;
    }, l.unuse = function() {
        a > 0 && !--a && (i(), i = null);
    }, e.exports = l;
}, function(e, t, n) {
    var o = n(35), r = n(76);
    "string" == typeof (r = r.__esModule ? r.default : r) && (r = [ [ e.i, r, "" ] ]);
    var i, a = 0, s = {
        injectType: "lazyStyleTag",
        insert: "head",
        singleton: !1
    }, l = {};
    l.locals = r.locals || {}, l.use = function() {
        return a++ || (i = o(r, s)), l;
    }, l.unuse = function() {
        a > 0 && !--a && (i(), i = null);
    }, e.exports = l;
}, function(e, t, n) {
    var o = n(35), r = n(80);
    "string" == typeof (r = r.__esModule ? r.default : r) && (r = [ [ e.i, r, "" ] ]);
    var i, a = 0, s = {
        injectType: "lazyStyleTag",
        insert: "head",
        singleton: !1
    }, l = {};
    l.locals = r.locals || {}, l.use = function() {
        return a++ || (i = o(r, s)), l;
    }, l.unuse = function() {
        a > 0 && !--a && (i(), i = null);
    }, e.exports = l;
}, , , , function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        return "object" == typeof e ? function e(t, n) {
            var o;
            o = Array.isArray(t) ? [] : {};
            n.push(t), Object.keys(t).forEach((function(r) {
                var i = t[r];
                "function" != typeof i && (i && "object" == typeof i ? -1 !== n.indexOf(t[r]) ? o[r] = "[Circular]" : o[r] = e(t[r], n.slice(0)) : o[r] = i);
            })), "string" == typeof t.name && (o.name = t.name);
            "string" == typeof t.message && (o.message = t.message);
            "string" == typeof t.stack && (o.stack = t.stack);
            return o;
        }(e, []) : "function" == typeof e ? "[Function: " + (e.name || "anonymous") + "]" : e;
    };
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var o = n(23), r = n.n(o)()(!1);
    r.push([ e.i, ".wI7k5--ff-downloader{display:block;overflow:hidden;width:376px;background:#fff;z-index:99999999;transition:.5s;border:1px solid #dedede;box-sizing:border-box;box-shadow:0 -10px 10px rgba(91,91,91,.06),-10px 0 10px rgba(91,91,91,.06),0 10px 10px rgba(91,91,91,.06);border-radius:10px;font-family:sans-serif;font-style:normal;font-weight:600;font-size:16px;line-height:22px;color:#434343}.ziyP5--close-btn{height:18px;width:18px;background-size:100%;border-radius:4px;cursor:pointer;position:absolute;top:5px;right:9px}.ziyP5--close-btn:hover{background:#e2dede}.BWp-4--file-name{font-weight:400;font-size:12px;line-height:14px;padding:6px 12px;margin:0 auto}.GU13e--status{padding-bottom:6px;font-size:14px;margin-top:12px}.GU13e--status,.ZIOer--status-state{display:flex;justify-content:space-between}.ZIOer--status-state{width:fit-content}.ZIOer--status-state>div:first-child{margin-right:8px;font-weight:700}.K3MvR--status-percentage{color:#77cb35;font-weight:700}.s1z4a--error{color:red;padding:10px;font-size:14px;display:flex;margin-left:12px}.jKWjW--error-text{font-weight:700;margin-right:7px}._09OMr--container{position:relative;height:100%;line-height:1}._09OMr--container .lzhWx--notice{margin-top:21px;font-size:11px;border:0;color:rgba(0,0,0,.88)}.zu8hW--footer{height:40px;width:100%;background:#fff}.zu8hW--footer .Flgd3--loader{animation:YEg5S--rotation 3.5s linear forwards;border-radius:50%;border:5px solid #fff;border-top-color:#a29bfe;height:70px;width:70px;display:flex;justify-content:center;align-items:center}.zu8hW--footer .Q1uXw--loading-bar{width:100%;height:6px;background:#dfe6e9;border-radius:5px}.zu8hW--footer .Q1uXw--loading-bar .-kn2K--progress-bar{height:100%;background:#8bc34a;border-radius:5px}", "" ]), 
    r.locals = {
        "ff-downloader": "wI7k5--ff-downloader",
        ffDownloader: "wI7k5--ff-downloader",
        "close-btn": "ziyP5--close-btn",
        closeBtn: "ziyP5--close-btn",
        "file-name": "BWp-4--file-name",
        fileName: "BWp-4--file-name",
        status: "GU13e--status",
        "status-state": "ZIOer--status-state",
        statusState: "ZIOer--status-state",
        "status-percentage": "K3MvR--status-percentage",
        statusPercentage: "K3MvR--status-percentage",
        error: "s1z4a--error",
        "error-text": "jKWjW--error-text",
        errorText: "jKWjW--error-text",
        container: "_09OMr--container",
        notice: "lzhWx--notice",
        footer: "zu8hW--footer",
        loader: "Flgd3--loader",
        rotation: "YEg5S--rotation",
        "loading-bar": "Q1uXw--loading-bar",
        loadingBar: "Q1uXw--loading-bar",
        "progress-bar": "-kn2K--progress-bar",
        progressBar: "-kn2K--progress-bar"
    }, t.default = r;
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var o = n(23), r = n.n(o)()(!1);
    r.push([ e.i, ".Iwvld--ff-downloader{display:block;overflow:hidden;width:300px;background:#fff;z-index:99999999;transition:.5s;border:1px solid #dedede;box-sizing:border-box;box-shadow:0 -10px 10px rgba(91,91,91,.06),-10px 0 10px rgba(91,91,91,.06),0 10px 10px rgba(91,91,91,.06);border-radius:10px;font-family:sans-serif;font-style:normal;font-weight:600;font-size:16px;line-height:22px;color:#434343;padding:16px 14px}.XPnBg--close-btn{background-size:100%;border-radius:4px;cursor:pointer;position:absolute;top:-11px;right:9px}.XPnBg--close-btn:hover{background:#e2dede}.h8wGW--file-name{text-overflow:ellipsis;overflow:hidden;width:216px;font-weight:400;font-size:14px;line-height:18px;margin:12px 0}.YXhTH--status{font-size:14px;margin-top:12px}.YXhTH--status,.pgCcQ--status-state{display:flex;justify-content:space-between}.pgCcQ--status-state{width:fit-content}.pgCcQ--status-state>div:first-child{margin-right:8px;font-weight:700}.p4smi--status-percentage{color:#77cb35;font-weight:700}.jxpOw--error{color:red;font-size:14px;display:flex;margin-left:12px}.NBOIa--error-text{font-weight:700;margin-right:7px}.\\+Mtsr--container{position:relative;height:100%;line-height:1}.\\+Mtsr--container .Rbz-l--notice{margin-top:21px;font-size:11px;border:0;color:rgba(0,0,0,.88)}.W8q4D--footer{width:100%;background:#fff}.W8q4D--footer .A36qu--loader{animation:s6CAC--rotation 3.5s linear forwards;border-radius:50%;border:5px solid #fff;border-top-color:#a29bfe;height:70px;width:70px;display:flex;justify-content:center;align-items:center}.W8q4D--footer .x3HAa--loading-bar{width:100%;height:8px;background:#dfe6e9;border-radius:5px}.W8q4D--footer .x3HAa--loading-bar .Q8FO8--progress-bar{height:100%;background:#8bc34a;border-radius:6px}.ySdCM--tip-window{padding:18px 0 0;font-style:normal;font-weight:400;font-size:12px;line-height:14px;color:#434343;justify-content:space-between;align-items:center}.ySdCM--tip-window,.ySdCM--tip-window .rjEfq--tip-text{display:flex}.ySdCM--tip-window p{margin:0}.ySdCM--tip-window a{display:block}.ySdCM--tip-window a ._5hrC---tip-window-button{width:102px;height:28px;border:none;border-radius:2px;background-color:#8bc34a;color:#fff;font-style:normal;font-weight:500;font-size:12px;line-height:12px}.ySdCM--tip-window a ._5hrC---tip-window-button:hover{cursor:pointer}", "" ]), 
    r.locals = {
        "ff-downloader": "Iwvld--ff-downloader",
        ffDownloader: "Iwvld--ff-downloader",
        "close-btn": "XPnBg--close-btn",
        closeBtn: "XPnBg--close-btn",
        "file-name": "h8wGW--file-name",
        fileName: "h8wGW--file-name",
        status: "YXhTH--status",
        "status-state": "pgCcQ--status-state",
        statusState: "pgCcQ--status-state",
        "status-percentage": "p4smi--status-percentage",
        statusPercentage: "p4smi--status-percentage",
        error: "jxpOw--error",
        "error-text": "NBOIa--error-text",
        errorText: "NBOIa--error-text",
        container: "+Mtsr--container",
        notice: "Rbz-l--notice",
        footer: "W8q4D--footer",
        loader: "A36qu--loader",
        rotation: "s6CAC--rotation",
        "loading-bar": "x3HAa--loading-bar",
        loadingBar: "x3HAa--loading-bar",
        "progress-bar": "Q8FO8--progress-bar",
        progressBar: "Q8FO8--progress-bar",
        "tip-window": "ySdCM--tip-window",
        tipWindow: "ySdCM--tip-window",
        "tip-text": "rjEfq--tip-text",
        tipText: "rjEfq--tip-text",
        "tip-window-button": "_5hrC---tip-window-button",
        tipWindowButton: "_5hrC---tip-window-button"
    }, t.default = r;
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var o = n(23), r = n.n(o)()(!1);
    r.push([ e.i, ".ClHbG--information{border-left:4px solid #c58d39;background:rgba(255,178,63,.7607843137254902);font-weight:700;color:#191919;margin-bottom:12px;font-size:13px;line-height:1.5;padding:5px}.JSkqz--filesCount{margin-bottom:4px;font-size:13px}.iuOVZ--progress{position:relative;height:21px;background-color:#e8e8e8;border-radius:3px;overflow:hidden}.iuOVZ--progress .\\+f7GI--line{height:21px;position:absolute;background-color:#0cf;border-radius:5px;transition:width .1s}.iuOVZ--progress .taRzz--text{position:absolute;top:3px;left:5px;display:flex}.iuOVZ--progress .dSvFi--filename{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;width:226px;margin-right:10px}", "" ]), 
    r.locals = {
        information: "ClHbG--information",
        filesCount: "JSkqz--filesCount",
        progress: "iuOVZ--progress",
        line: "+f7GI--line",
        text: "taRzz--text",
        filename: "dSvFi--filename"
    }, t.default = r;
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var o = n(23), r = n.n(o)()(!1);
    r.push([ e.i, ".ZOo8v--popup--container{position:absolute;right:40px;width:270px;background:#fff;border:1px solid hsla(0,0%,50.2%,.2);z-index:9999;top:7px;min-height:76px;font-size:14px;border-radius:5px;box-shadow:1px 1px 11px rgba(0,0,0,.23921568627450981);color:#000}.vNkEW--flex-column{display:flex;flex-direction:column}.svLRq--popup--title{padding:4px;background:#efefef}._7ZAJJ--popup--body{font-size:17px;padding:1px 25px 32px}.xuER4--btn{background:#6bcc3e;color:#fff;border-radius:3px;padding:9px 10px;display:block;text-align:center;box-shadow:0 6px 18px -5px #6bcc3e;width:179px;margin:23px auto 0}.xuER4--btn,.xuER4--btn:hover{text-decoration:none}.\\+cYks--text--container{text-align:center}.ho-mQ--sub-text--container{font-size:12px;color:#4c4c4c;text-align:center;display:block}._87JEg--close{width:30px;font-size:17px;color:#c0c5cb;align-self:flex-end;background-color:transparent;border:none;margin-top:3px;margin-right:3px;cursor:pointer}.-b33m--hidden{display:none}._0HBd6--circle-loader--icon{animation-name:NQihZ--spin;animation-duration:5s;animation-iteration-count:infinite;animation-timing-function:linear}.Hmeyt--icon{width:51px;opacity:.3;margin:0 auto 12px}@keyframes NQihZ--spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}", "" ]), 
    r.locals = {
        "popup--container": "ZOo8v--popup--container",
        popupContainer: "ZOo8v--popup--container",
        "flex-column": "vNkEW--flex-column",
        flexColumn: "vNkEW--flex-column",
        "popup--title": "svLRq--popup--title",
        popupTitle: "svLRq--popup--title",
        "popup--body": "_7ZAJJ--popup--body",
        popupBody: "_7ZAJJ--popup--body",
        btn: "xuER4--btn",
        "text--container": "+cYks--text--container",
        textContainer: "+cYks--text--container",
        "sub-text--container": "ho-mQ--sub-text--container",
        subTextContainer: "ho-mQ--sub-text--container",
        close: "_87JEg--close",
        hidden: "-b33m--hidden",
        "circle-loader--icon": "_0HBd6--circle-loader--icon",
        circleLoaderIcon: "_0HBd6--circle-loader--icon",
        spin: "NQihZ--spin",
        icon: "Hmeyt--icon"
    }, t.default = r;
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var o = n(23), r = n.n(o)()(!1);
    r.push([ e.i, ".FLBcu--hidden--shadow{box-shadow:inset -2px 1px 2px 0 rgba(0,0,0,.4)}.A50sa--hidden--viewer::-webkit-scrollbar{width:.5em}.A50sa--hidden--viewer::-webkit-scrollbar-track{background:#e0dada}.A50sa--hidden--viewer::-webkit-scrollbar-thumb{background-color:#6b6969;border-radius:3px}.tQBOF--dropdown--item{display:block;padding:0 5px;white-space:nowrap;overflow:hidden;line-height:24px;color:#3d3d3d}.tQBOF--dropdown--item,.tQBOF--dropdown--item:hover{text-decoration:none}.-CinQ--dropdown--container{display:flex;justify-content:space-between}.E9XZe--dropdown--format{min-width:36px}.\\+Hfp---dropdown--quality{min-width:42px;margin-left:6px;display:flex;justify-content:space-between}._4R4Jh--quality--badge{background-color:#505050;color:#fff;padding-left:2px;padding-right:2px;height:19px;vertical-align:middle;margin-top:2px;border-radius:3px;line-height:21px;margin-left:2px}._4mas\\+--dropdown--action{width:30px;display:flex;justify-content:flex-end}._4mas\\+--dropdown--action img{width:14px;margin-left:4px}.A50sa--hidden--viewer{max-height:192px;overflow-y:scroll;background:#f7f7f7}.uyTuz--size--icon{font-size:72%;font-weight:400;margin-left:2px;white-space:nowrap}.kj5iC--separator{display:block;margin:1px 0;border-top:1px solid #d6d6d6}.yjfKv--more--btn{text-align:center;display:block;color:rgba(44,44,44,.6)}.lp9Bs--more--btn-with-pro{display:flex;justify-content:space-between}.lp9Bs--more--btn-with-pro a:hover{background:none!important;color:inherit!important}.b\\+dsr--login--btn{display:block;font-family:Roboto,sans-serif;font-style:normal;font-weight:700;font-size:13px;line-height:14px;color:#46aa4b;padding-top:8px;padding-bottom:8px;text-align:center;text-decoration:none}.autRa--pro-information,.autRa--pro-information .S\\+3y\\+--info{display:flex;justify-content:space-between}.autRa--pro-information .S\\+3y\\+--info img{width:16px;height:16px;margin-right:8px;margin-left:5px;margin-top:3px}.lsy8K--pro--label{line-height:1.9;color:#46aa4b}.XEJXo--subtitles{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}", "" ]), 
    r.locals = {
        "hidden--shadow": "FLBcu--hidden--shadow",
        hiddenShadow: "FLBcu--hidden--shadow",
        "hidden--viewer": "A50sa--hidden--viewer",
        hiddenViewer: "A50sa--hidden--viewer",
        "dropdown--item": "tQBOF--dropdown--item",
        dropdownItem: "tQBOF--dropdown--item",
        "dropdown--container": "-CinQ--dropdown--container",
        dropdownContainer: "-CinQ--dropdown--container",
        "dropdown--format": "E9XZe--dropdown--format",
        dropdownFormat: "E9XZe--dropdown--format",
        "dropdown--quality": "+Hfp---dropdown--quality",
        dropdownQuality: "+Hfp---dropdown--quality",
        "quality--badge": "_4R4Jh--quality--badge",
        qualityBadge: "_4R4Jh--quality--badge",
        "dropdown--action": "_4mas+--dropdown--action",
        dropdownAction: "_4mas+--dropdown--action",
        "size--icon": "uyTuz--size--icon",
        sizeIcon: "uyTuz--size--icon",
        separator: "kj5iC--separator",
        "more--btn": "yjfKv--more--btn",
        moreBtn: "yjfKv--more--btn",
        "more--btn-with-pro": "lp9Bs--more--btn-with-pro",
        moreBtnWithPro: "lp9Bs--more--btn-with-pro",
        "login--btn": "b+dsr--login--btn",
        loginBtn: "b+dsr--login--btn",
        "pro-information": "autRa--pro-information",
        proInformation: "autRa--pro-information",
        info: "S+3y+--info",
        "pro--label": "lsy8K--pro--label",
        proLabel: "lsy8K--pro--label",
        subtitles: "XEJXo--subtitles"
    }, t.default = r;
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var o = n(23), r = n.n(o)()(!1);
    r.push([ e.i, ".YkQQD--button{display:block;padding:5px;color:#fff;text-align:center;background:linear-gradient(180deg,#54b85b,#3a833f);border-radius:2px;text-decoration:none;font-size:12px;margin:5px}.YkQQD--button:hover{background:#3a833f!important}", "" ]), 
    r.locals = {
        button: "YkQQD--button"
    }, t.default = r;
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var o = n(23), r = n.n(o)()(!1);
    r.push([ e.i, '._6BnMg--item--anchor{display:flex;padding:0 5px;text-decoration:none;white-space:nowrap;overflow:hidden}.uGmA2--item--container{width:100%;display:block}.uGmA2--item--container span{font-weight:700}.TpsJ6--televzr-popup-container{border-radius:6px}.t\\+3cf--televzr-popup{background-color:#fff;border:1px solid #ccc;text-align:center;line-height:16px;font-size:12px;font-family:arial,sans-serif;cursor:default;border-radius:6px;padding:6px}.DhgbJ--televzr-popup-header{width:114px;height:42px;margin:7px auto 8px;background:url("data:image/jpeg;base64,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TGJsc2Jvb2wAAAAAAE5ndHZib29sAAAAAABFbWxEYm9vbAAAAAAASW50cmJvb2wAAAAAAEJja2dPYmpjAAAAAQAAAAAAAFJHQkMAAAADAAAAAFJkICBkb3ViQG/gAAAAAAAAAAAAR3JuIGRvdWJAb+AAAAAAAAAAAABCbCAgZG91YkBv4AAAAAAAAAAAAEJyZFRVbnRGI1JsdAAAAAAAAAAAAAAAAEJsZCBVbnRGI1JsdAAAAAAAAAAAAAAAAFJzbHRVbnRGI1B4bEBTgAAAAAAAAAAACnZlY3RvckRhdGFib29sAQAAAABQZ1BzZW51bQAAAABQZ1BzAAAAAFBnUEMAAAAATGVmdFVudEYjUmx0AAAAAAAAAAAAAAAAVG9wIFVudEYjUmx0AAAAAAAAAAAAAAAAU2NsIFVudEYjUHJjQFkAAAAAAAAAAAAQY3JvcFdoZW5QcmludGluZ2Jvb2wAAAAADmNyb3BSZWN0Qm90dG9tbG9uZwAAAAAAAAAMY3JvcFJlY3RMZWZ0bG9uZwAAAAAAAAANY3JvcFJlY3RSaWdodGxvbmcAAAAAAAAAC2Nyb3BSZWN0VG9wbG9uZwAAAAAAOEJJTQPtAAAAAAAQAE4AAAABAAEATgAAAAEAAThCSU0EJgAAAAAADgAAAAAAAAAAAAA/gAAAOEJJTQQNAAAAAAAEAAAAHjhCSU0EGQAAAAAABAAAAB44QklNA/MAAAAAAAkAAAAAAAAAAAEAOEJJTScQAAAAAAAKAAEAAAAAAAAAAThCSU0D9QAAAAAASAAvZmYAAQBsZmYABgAAAAAAAQAvZmYAAQChmZoABgAAAAAAAQAyAAAAAQBaAAAABgAAAAAAAQA1AAAAAQAtAAAABgAAAAAAAThCSU0D+AAAAAAAcAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAA4QklNBAgAAAAAABAAAAABAAACQAAAAkAAAAAAOEJJTQQeAAAAAAAEAAAAADhCSU0EGgAAAAADSwAAAAYAAAAAAAAAAAAAAEsAAADIAAAACwBsAG8AZwBvAF8AaABlAGEAZABlAHIAAAABAAAA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QkkgpdJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSU//9kAOEJJTQQhAAAAAABdAAAAAQEAAAAPAEEAZABvAGIAZQAgAFAAaABvAHQAbwBzAGgAbwBwAAAAFwBBAGQAbwBiAGUAIABQAGgAbwB0AG8AcwBoAG8AcAAgAEMAQwAgADIAMAAxADkAAAABADhCSU0EBgAAAAAABwABAAAAAQEA/+ENw2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmViMTRlOGE4LTU4M2EtZjA0ZC04NTE0LTgzYWUyYWQ5NmZhMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxOWNkMzA3Yi1jYWUwLTBjNDctODg3Ni0zMTc3Yzc1YTk3OTMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iMDM1MTRGQjY3QjlGNzBDRDc2MEY2NzZCNEVGQThCQUUiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IiIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMDMtMTFUMTU6MjQ6NDMrMDM6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIwLTAzLTExVDE1OjM0OjIwKzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTAzLTExVDE1OjM0OjIwKzAzOjAwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NDAzNTg2MzAtNjI2OS01NTQ1LWFiOGEtNWNkZjFiMjMzZGI5IiBzdEV2dDp3aGVuPSIyMDIwLTAzLTExVDE1OjM0OjIwKzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjE5Y2QzMDdiLWNhZTAtMGM0Ny04ODc2LTMxNzdjNzVhOTc5MyIgc3RFdnQ6d2hlbj0iMjAyMC0wMy0xMVQxNTozNDoyMCswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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") no-repeat;background-size:100%}.ifIjF--televzr-popup-footer{width:195px;margin:22px auto 0;color:#63d0ff;font-size:12px;white-space:normal;font-weight:400}.gmsOg--televzr-popup-btn{text-decoration:none;display:inline-block;line-height:18px;white-space:nowrap;font-size:13px;text-align:center;font-family:Roboto,sans-serif;font-weight:500;margin:0;border-radius:90px;padding:0;overflow:hidden;border:2px solid transparent;background:linear-gradient(270deg,#66d1ff,#35c3ff);background-origin:border-box;text-transform:uppercase;width:171px}.gmsOg--televzr-popup-btn .rQDx6--btn-outer{padding:13px 15px;display:block;background:#f4f3f3}.gmsOg--televzr-popup-btn ._8t04c--btn-inner{background:linear-gradient(270deg,#66d1ff,#35c3ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.gmsOg--televzr-popup-btn ._8t04c--btn-inner svg{margin-top:-2px;margin-right:4px}.gmsOg--televzr-popup-btn:disabled{opacity:.5}.gmsOg--televzr-popup-btn.IoXmT--btn-invert{position:relative;overflow:visible}.gmsOg--televzr-popup-btn.IoXmT--btn-invert:before{content:"";position:absolute;left:10px;right:10px;top:20px;bottom:-1px;background:#6dd3ff;filter:blur(12px);border-radius:100px;box-shadow:0 3px 0 0;color:#67cefb}.gmsOg--televzr-popup-btn.IoXmT--btn-invert .rQDx6--btn-outer{background:transparent;padding:7px 8px;position:relative}.gmsOg--televzr-popup-btn.IoXmT--btn-invert ._8t04c--btn-inner{background:none;-webkit-background-clip:border-box;-webkit-text-fill-color:#fff;color:#fff}.gmsOg--televzr-popup-btn.IoXmT--btn-invert ._8t04c--btn-inner svg path{fill:#fff}.gmsOg--televzr-popup-btn.IoXmT--btn-invert:focus,.gmsOg--televzr-popup-btn.IoXmT--btn-invert:hover{background:linear-gradient(90deg,#66d1ff,#35c3ff)}.gmsOg--televzr-popup-btn.DiiWD--btn-small{font-size:12px;line-height:15px;border-width:1px}.gmsOg--televzr-popup-btn.DiiWD--btn-small .rQDx6--btn-outer{padding:8px 15px;background:#fff}.gmsOg--televzr-popup-btn:focus,.gmsOg--televzr-popup-btn:hover{outline:none}.gmsOg--televzr-popup-btn:focus .rQDx6--btn-outer,.gmsOg--televzr-popup-btn:hover .rQDx6--btn-outer{background:transparent}.gmsOg--televzr-popup-btn:focus ._8t04c--btn-inner,.gmsOg--televzr-popup-btn:hover ._8t04c--btn-inner{background:none;-webkit-background-clip:border-box;-webkit-text-fill-color:#fff;color:#fff}.gmsOg--televzr-popup-btn:focus ._8t04c--btn-inner svg path,.gmsOg--televzr-popup-btn:hover ._8t04c--btn-inner svg path{fill:#fff}a.gmsOg--televzr-popup-btn.IoXmT--btn-invert{text-decoration:none}.EJ9VX--popupAngle{display:inline-block;width:0;position:absolute;z-index:1;border-left-width:0;border-left-style:none;border-top:8px solid transparent;border-right:10px solid #fff;border-bottom:8px solid transparent;border-left-color:initial;border-image:initial;top:8px;left:-9px}.NG62r--popupAngle--shadow{border-right-color:#c0bbbb;border-width:8px 11px 9px 0;z-index:0;top:8px;left:-10px}.O240N--logo{width:19px;height:17px;margin-left:5px;vertical-align:middle}._2NWK3--circle-loader--icon{animation-name:awEUc--spin;animation-duration:5s;animation-iteration-count:infinite;animation-timing-function:linear}.TpwT---icon--check{margin-bottom:-13px!important}.Q6Yy4--icon{width:51px;opacity:.3;margin:0 auto 12px}@keyframes awEUc--spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}', "" ]), 
    r.locals = {
        "item--anchor": "_6BnMg--item--anchor",
        itemAnchor: "_6BnMg--item--anchor",
        "item--container": "uGmA2--item--container",
        itemContainer: "uGmA2--item--container",
        "televzr-popup-container": "TpsJ6--televzr-popup-container",
        televzrPopupContainer: "TpsJ6--televzr-popup-container",
        "televzr-popup": "t+3cf--televzr-popup",
        televzrPopup: "t+3cf--televzr-popup",
        "televzr-popup-header": "DhgbJ--televzr-popup-header",
        televzrPopupHeader: "DhgbJ--televzr-popup-header",
        "televzr-popup-footer": "ifIjF--televzr-popup-footer",
        televzrPopupFooter: "ifIjF--televzr-popup-footer",
        "televzr-popup-btn": "gmsOg--televzr-popup-btn",
        televzrPopupBtn: "gmsOg--televzr-popup-btn",
        "btn-outer": "rQDx6--btn-outer",
        btnOuter: "rQDx6--btn-outer",
        "btn-inner": "_8t04c--btn-inner",
        btnInner: "_8t04c--btn-inner",
        "btn-invert": "IoXmT--btn-invert",
        btnInvert: "IoXmT--btn-invert",
        "btn-small": "DiiWD--btn-small",
        btnSmall: "DiiWD--btn-small",
        popupAngle: "EJ9VX--popupAngle",
        "popupAngle--shadow": "NG62r--popupAngle--shadow",
        popupAngleShadow: "NG62r--popupAngle--shadow",
        logo: "O240N--logo",
        "circle-loader--icon": "_2NWK3--circle-loader--icon",
        circleLoaderIcon: "_2NWK3--circle-loader--icon",
        spin: "awEUc--spin",
        "icon--check": "TpwT---icon--check",
        iconCheck: "TpwT---icon--check",
        icon: "Q6Yy4--icon"
    }, t.default = r;
}, function(e, t, n) {
    "use strict";
    function o(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }
    e.exports = function(e, t, n, i) {
        t = t || "&", n = n || "=";
        var a = {};
        if ("string" != typeof e || 0 === e.length) return a;
        var s = /\+/g;
        e = e.split(t);
        var l = 1e3;
        i && "number" == typeof i.maxKeys && (l = i.maxKeys);
        var c = e.length;
        l > 0 && c > l && (c = l);
        for (var u = 0; u < c; ++u) {
            var d, p, A, f, g = e[u].replace(s, "%20"), h = g.indexOf(n);
            h >= 0 ? (d = g.substr(0, h), p = g.substr(h + 1)) : (d = g, p = ""), A = decodeURIComponent(d), 
            f = decodeURIComponent(p), o(a, A) ? r(a[A]) ? a[A].push(f) : a[A] = [ a[A], f ] : a[A] = f;
        }
        return a;
    };
    var r = Array.isArray || function(e) {
        return "[object Array]" === Object.prototype.toString.call(e);
    };
}, function(e, t, n) {
    "use strict";
    var o = function(e) {
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
    e.exports = function(e, t, n, s) {
        return t = t || "&", n = n || "=", null === e && (e = void 0), "object" == typeof e ? i(a(e), (function(a) {
            var s = encodeURIComponent(o(a)) + n;
            return r(e[a]) ? i(e[a], (function(e) {
                return s + encodeURIComponent(o(e));
            })).join(t) : s + encodeURIComponent(o(e[a]));
        })).join(t) : s ? encodeURIComponent(o(s)) + n + encodeURIComponent(o(e)) : "";
    };
    var r = Array.isArray || function(e) {
        return "[object Array]" === Object.prototype.toString.call(e);
    };
    function i(e, t) {
        if (e.map) return e.map(t);
        for (var n = [], o = 0; o < e.length; o++) n.push(t(e[o], o));
        return n;
    }
    var a = Object.keys || function(e) {
        var t = [];
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
        return t;
    };
}, , function(e, t, n) {
    "use strict";
    n.r(t);
    var o = n(23), r = n.n(o)()(!1);
    r.push([ e.i, "._3Twj---theme-vk .jIjvy--item-container .Ctv\\+P--item{margin-left:0;display:block;white-space:nowrap;position:relative;height:30px;line-height:30px;padding:0 15px;color:#2a5885;outline:none}._3Twj---theme-vk .jIjvy--item-container .Ctv\\+P--item:hover{background-color:#e4eaf0}._3Twj---theme-vk .jIjvy--item-container .Ctv\\+P--item .UpHCg--tooltip{top:0;right:228px;padding:0 10px 3px 6px}._3Twj---theme-vk .jIjvy--item-container .Ctv\\+P--item ._05NcQ--download-bar{position:absolute;top:0;left:0}.iy197--theme-matchtv .jIjvy--item-container{right:185px}.iy197--theme-matchtv .jIjvy--item-container ._05NcQ--download-bar{background-image:linear-gradient(90deg,rgba(8,174,234,.12156862745098039),rgba(42,245,152,.7294117647058823))}.jIjvy--item-container{position:absolute;background:#fff;padding:4px 0;z-index:9999;box-shadow:0 1px 3px rgba(80,80,80,.27058823529411763);border:1px solid #c5d0db;border-radius:4px;font-size:12px;min-width:190px;transition:.5s;margin-left:13px}.jIjvy--item-container .Ctv\\+P--item{position:relative;cursor:pointer;padding-top:5px;padding-bottom:5px;padding-left:9px}.jIjvy--item-container .Ctv\\+P--item:hover{background:#e6e6e6}.jIjvy--item-container .Ctv\\+P--item.A-E28--item-disable{opacity:.8}.jIjvy--item-container .aLjWy--message{padding:3px}.jIjvy--item-container.fnXMd--show{display:block}.jIjvy--item-container._7GemG--hide{display:none}", "" ]), 
    r.locals = {
        "theme-vk": "_3Twj---theme-vk",
        themeVk: "_3Twj---theme-vk",
        "item-container": "jIjvy--item-container",
        itemContainer: "jIjvy--item-container",
        item: "Ctv+P--item",
        tooltip: "UpHCg--tooltip",
        "download-bar": "_05NcQ--download-bar",
        downloadBar: "_05NcQ--download-bar",
        "theme-matchtv": "iy197--theme-matchtv",
        themeMatchtv: "iy197--theme-matchtv",
        "item-disable": "A-E28--item-disable",
        itemDisable: "A-E28--item-disable",
        message: "aLjWy--message",
        show: "fnXMd--show",
        hide: "_7GemG--hide"
    }, t.default = r;
} ] ]);