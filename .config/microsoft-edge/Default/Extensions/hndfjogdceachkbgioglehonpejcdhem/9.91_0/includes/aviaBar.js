!function(e) {
    function t(t) {
        for (var n, o, s = t[0], c = t[1], l = t[2], u = 0, p = []; u < s.length; u++) o = s[u], 
        Object.prototype.hasOwnProperty.call(a, o) && a[o] && p.push(a[o][0]), a[o] = 0;
        for (n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
        for (d && d(t); p.length; ) p.shift()();
        return i.push.apply(i, l || []), r();
    }
    function r() {
        for (var e, t = 0; t < i.length; t++) {
            for (var r = i[t], n = !0, s = 1; s < r.length; s++) {
                var c = r[s];
                0 !== a[c] && (n = !1);
            }
            n && (i.splice(t--, 1), e = o(o.s = r[0]));
        }
        return e;
    }
    var n = {}, a = {
        1: 0
    }, i = [];
    function o(t) {
        if (n[t]) return n[t].exports;
        var r = n[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(r.exports, r, r.exports, o), r.l = !0, r.exports;
    }
    o.m = e, o.c = n, o.d = function(e, t, r) {
        o.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        });
    }, o.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, o.t = function(e, t) {
        if (1 & t && (e = o(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (o.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var n in e) o.d(r, n, function(t) {
            return e[t];
        }.bind(null, n));
        return r;
    }, o.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return o.d(t, "a", t), t;
    }, o.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, o.p = "";
    var s = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], c = s.push.bind(s);
    s.push = t, s = s.slice();
    for (var l = 0; l < s.length; l++) t(s[l]);
    var d = c;
    i.push([ 93, 0 ]), r();
}({
    93: function(e, t, r) {
        "use strict";
        r.r(t);
        var n = r(19), a = r(0), i = r(10), o = r(40);
        function s(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), r.push.apply(r, n);
            }
            return r;
        }
        function c(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? s(Object(r), !0).forEach((function(t) {
                    Object(n.a)(e, t, r[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : s(Object(r)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                }));
            }
            return e;
        }
        Object(i.a)("aviaBar", () => {
            !function(e) {
                var t = {};
                function r(n) {
                    if (t[n]) return t[n].exports;
                    var a = t[n] = {
                        i: n,
                        l: !1,
                        exports: {}
                    };
                    return e[n].call(a.exports, a, a.exports, r), a.l = !0, a.exports;
                }
                r.m = e, r.c = t, r.d = function(e, t, n) {
                    r.o(e, t) || Object.defineProperty(e, t, {
                        enumerable: !0,
                        get: n
                    });
                }, r.r = function(e) {
                    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                        value: "Module"
                    }), Object.defineProperty(e, "__esModule", {
                        value: !0
                    });
                }, r.t = function(e, t) {
                    if (1 & t && (e = r(e)), 8 & t) return e;
                    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
                    var n = Object.create(null);
                    if (r.r(n), Object.defineProperty(n, "default", {
                        enumerable: !0,
                        value: e
                    }), 2 & t && "string" != typeof e) for (var a in e) r.d(n, a, function(t) {
                        return e[t];
                    }.bind(null, a));
                    return n;
                }, r.n = function(e) {
                    var t = e && e.__esModule ? function() {
                        return e.default;
                    } : function() {
                        return e;
                    };
                    return r.d(t, "a", t), t;
                }, r.o = function(e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t);
                }, r.p = "", r(r.s = 0);
            }([ function(e, t, r) {
                r.r(t);
                var n = {
                    sendMessage: function(e, t) {
                        a.a.sendMessage(e, t);
                    },
                    getUILanguage: function() {
                        if ("undefined" != typeof chrome && chrome.i18n && chrome.i18n.getUILanguage) return chrome.i18n.getUILanguage();
                    }
                };
                class i extends Error {
                    constructor(e) {
                        super(e), this.name = "CustomError";
                    }
                }
                var s = i;
                const l = {
                    extend: function() {
                        const e = arguments[0];
                        let t = 1;
                        const r = arguments.length;
                        for (;t < r; t++) {
                            const r = arguments[t];
                            for (let t in r) void 0 !== r[t] && (e[t] = r[t]);
                        }
                        return e;
                    },
                    param: function(e) {
                        if ("string" == typeof e) return e;
                        const t = [];
                        for (let r in e) e.hasOwnProperty(r) && (void 0 !== e[r] && null !== e[r] || (e[r] = ""), 
                        t.push(r + "=" + e[r]));
                        return t.join("&");
                    }
                };
                (function() {
                    l.create = function(t, r) {
                        let n, a;
                        n = "object" != typeof t ? document.createElement(t) : t;
                        for (let t in r) {
                            const i = r[t];
                            (a = e[t]) ? a(n, i) : n[t] = i;
                        }
                        return n;
                    };
                    const e = {
                        text: function(e, t) {
                            e.textContent = t;
                        },
                        data: function(e, t) {
                            for (let r in t) e.dataset[r] = t[r];
                        },
                        class: function(e, t) {
                            if (Array.isArray(t)) {
                                let r = 0;
                                const n = t.length;
                                for (;r < n; r++) e.classList.add(t[r]);
                            } else e.setAttribute("class", t);
                        },
                        style: function(e, t) {
                            if ("object" == typeof t) for (let r in t) {
                                let n = r;
                                "float" === n && (n = "cssFloat");
                                const a = t[r];
                                if (Array.isArray(a)) {
                                    let t = 0;
                                    const r = a.length;
                                    for (;t < r; t++) e.style[n] = a[t];
                                } else e.style[n] = a;
                            } else e.setAttribute("style", t);
                        },
                        append: function(e, t) {
                            Array.isArray(t) || (t = [ t ]);
                            let r = 0;
                            const n = t.length;
                            for (;r < n; r++) {
                                let n = t[r];
                                (n || 0 === n) && ("object" != typeof n && (n = document.createTextNode(n)), e.appendChild(n));
                            }
                        },
                        on: function(e, t) {
                            "object" != typeof t[0] && (t = [ t ]);
                            let r = 0;
                            const n = t.length;
                            for (;r < n; r++) {
                                const n = t[r];
                                Array.isArray(n) && l.on(e, n[0], n[1], n[2]);
                            }
                        },
                        onCreate: function(e, t) {
                            t.call(e, e);
                        }
                    };
                })(), l.on = function(e, t, r, n) {
                    e.addEventListener(t, r, n);
                }, l.off = function(e, t, r, n) {
                    e.removeEventListener(t, r, n);
                }, l.jsLink = function(e, t) {
                    const r = e.href, n = function(e) {
                        e.preventDefault(), e.stopPropagation(), window.open(r), t && t();
                    };
                    return e.addEventListener("click", (function(e) {
                        n(e);
                    })), e.addEventListener("mouseup", (function(e) {
                        (1 === e.button || 2 === e.which) && n(e);
                    })), e;
                }, l.parseUrl = function(e, t) {
                    let r, n = null;
                    r = (t = t || {}).paramsRe ? t.paramsRe : /[^?]+\?(.+)/;
                    const a = !t.params && r.exec(e);
                    n = a ? a[1] : e;
                    const i = t.sep || "&", o = n.split(i), s = {};
                    let c = 0;
                    const l = o.length;
                    for (;c < l; c++) {
                        const e = o[c].split("=");
                        let r = e[0];
                        const n = e[1] || "";
                        if (t.noDecode) s[r] = n; else {
                            try {
                                r = decodeURIComponent(r);
                            } catch (e) {
                                r = unescape(r);
                            }
                            try {
                                s[r] = decodeURIComponent(n);
                            } catch (e) {
                                s[r] = unescape(n);
                            }
                        }
                    }
                    return s;
                }, l.debounce = function(e, t) {
                    let r = null;
                    return function() {
                        const n = this, a = arguments;
                        clearTimeout(r), r = setTimeout((function() {
                            e.apply(n, a);
                        }), t);
                    };
                }, l.getPageScript = function(e, t) {
                    t && !Array.isArray(t) && (t = [ t ]);
                    const r = [];
                    return e.replace(/<script(?:|\s[^>]+[^\/])>/g, (function(n, a) {
                        a += n.length;
                        const i = e.indexOf("<\/script>", a);
                        if (-1 !== i) {
                            const n = e.substr(a, i - a);
                            t ? t.every((function(e) {
                                return e.test(n);
                            })) && r.push(n) : r.push(n);
                        }
                    })), r;
                }, l.findJson = function(e, t) {
                    t && !Array.isArray(t) && (t = [ t ]);
                    const r = [], n = {
                        "{": 0,
                        "[": 0
                    }, a = {
                        "}": "{",
                        "]": "["
                    }, i = /[{}\]\[":0-9.,-]/, o = /[\r\n\s\t]/;
                    let s = "";
                    for (let t, c = 0; t = e[c]; c++) if ('"' !== t) i.test(t) ? (s += t, "{" === t || "[" === t ? (n["{"] || n["["] || (s = t), 
                    n[t]++) : "}" !== t && "]" !== t || (n[a[t]]--, n["{"] || n["["] || r.push(s))) : "t" === t && "true" === e.substr(c, 4) ? (s += "true", 
                    c += 3) : "f" === t && "false" === e.substr(c, 5) ? (s += "false", c += 4) : "n" === t && "null" === e.substr(c, 4) ? (s += "null", 
                    c += 3) : o.test(t) || (n["{"] = 0, n["["] = 0, s = ""); else {
                        let t = c;
                        for (;-1 !== t && (t === c || "\\" === e[t - 1]); ) t = e.indexOf('"', t + 1);
                        -1 === t && (t = e.length - 1), s += e.substr(c, t - c + 1), c = t;
                    }
                    const c = [];
                    for (let e, n = 0; e = r[n]; n++) if ("{}" !== e && "[]" !== e) try {
                        t ? t.every((function(t) {
                            return t.test(e);
                        })) && c.push(JSON.parse(e)) : c.push(JSON.parse(e));
                    } catch (e) {}
                    return c;
                }, l.style2Text = function(e, t) {
                    const r = [];
                    Array.isArray(e) || (e = [ e ]), t && !Array.isArray(t) && (t = [ t ]);
                    const n = function(e, t) {
                        const r = [];
                        for (let e in t) {
                            const n = t[e];
                            "cssFloat" === e && (e = "float");
                            const a = e.replace(/([A-Z])/g, (function(e, t) {
                                return "-" + t.toLowerCase();
                            }));
                            r.push(a + ":" + n);
                        }
                        return r.length ? [ e.join(","), "{", r.join(";"), "}" ].join("") : "";
                    }, a = function(e, r) {
                        if (Array.isArray(r) || (r = [ r ]), t) {
                            const n = [], a = e.join || "" === e.join ? e.join : " ";
                            t.forEach((function(e) {
                                r.forEach((function(t) {
                                    n.push(e + a + t);
                                }));
                            })), r = n;
                        }
                        return r;
                    };
                    return e.forEach((function(e) {
                        let i = null;
                        const o = e.media;
                        let s = e.selector, c = e.style, d = e.append;
                        if (o && d) r.push([ o, "{", l.style2Text(d, t), "}" ].join("")); else if (s || c) i = a(e, s), 
                        r.push(n(i, c)), d && r.push(l.style2Text(d, i)); else for (let t in e) -1 === [ "append", "join" ].indexOf(t) && (s = t, 
                        c = e[t], d = c.append, d && delete c.append, i = a(e, s), r.push(n(i, c)), d && r.push(l.style2Text(d, i)));
                    })), r.join("");
                }, l.styleReset = {
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
                }, l.bridge = function(e) {
                    e.args = e.args || [], void 0 === e.timeout && (e.timeout = 300);
                    const t = "sf-bridge-" + parseInt(1e3 * Math.random()) + "-" + Date.now();
                    window.addEventListener("sf-bridge-" + t, (function r(n) {
                        let a;
                        window.removeEventListener("sf-bridge-" + t, r), a = n.detail ? JSON.parse(n.detail) : void 0, 
                        e.cb(a);
                    }));
                    const r = '(function(a,b,c,d){const e=document.getElementById(c);e&&e.parentNode.removeChild(e);let f=!1;const g=function(a){if(!f){f=!0;const b=new CustomEvent("sf-bridge-"+c,{detail:JSON.stringify(a)});window.dispatchEvent(b)}};d&&setTimeout(function(){g()},d),b.push(g),a.apply(null,b)})(' + [ e.func.toString(), JSON.stringify(e.args), JSON.stringify(t), parseInt(e.timeout) ].join(",") + ");", n = document.createElement("script");
                    n.id = t, n.textContent = r, document.body.appendChild(n);
                }, l.mutationWatcher = {
                    getMutationObserver: function() {
                        let e = null;
                        return "undefined" != typeof MutationObserver ? e = MutationObserver : "undefined" != typeof WebKitMutationObserver ? e = WebKitMutationObserver : "undefined" != typeof MozMutationObserver ? e = MozMutationObserver : "undefined" != typeof JsMutationObserver && (e = JsMutationObserver), 
                        e;
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
                        const t = [], r = [], n = {};
                        let a, i, o, s, c, l;
                        for (;o = e.shift(); ) {
                            for (l = r.indexOf(o.target), -1 === l && (l = r.push(o.target) - 1, n[l] = {
                                target: o.target,
                                added: [],
                                removed: []
                            }), a = n[l], i = void 0, s = 0; c = o.addedNodes[s]; s++) 1 === c.nodeType && (a.added.push(c), 
                            i = !0);
                            for (s = 0; c = o.removedNodes[s]; s++) 1 === c.nodeType && (a.removed.push(c), 
                            i = !0);
                            void 0 !== i && void 0 === a.inList && (a.inList = !0, t.push(a));
                        }
                        return t;
                    },
                    isMatched: null,
                    prepareMatched: function() {
                        if (this.isMatched) return;
                        let e = document.createElement("div");
                        "function" == typeof e.matches ? this.isMatched = function(e, t) {
                            return e.matches(t);
                        } : "function" == typeof e.matchesSelector ? this.isMatched = function(e, t) {
                            return e.matchesSelector(t);
                        } : "function" == typeof e.webkitMatchesSelector ? this.isMatched = function(e, t) {
                            return e.webkitMatchesSelector(t);
                        } : "function" == typeof e.mozMatchesSelector ? this.isMatched = function(e, t) {
                            return e.mozMatchesSelector(t);
                        } : "function" == typeof e.oMatchesSelector ? this.isMatched = function(e, t) {
                            return e.oMatchesSelector(t);
                        } : "function" == typeof e.msMatchesSelector && (this.isMatched = function(e, t) {
                            return e.msMatchesSelector(t);
                        }), e = null;
                    },
                    match: function(e, t, r) {
                        const n = this;
                        let a, i, o, s;
                        const c = e.queries;
                        let l = !1;
                        return [ "added", "removed" ].forEach((function(e) {
                            const d = r[e];
                            for (s = 0; a = d[s]; s++) for (i = 0; o = c[i]; i++) {
                                if (void 0 !== o.is && o.is !== e) continue;
                                const r = t[i][e];
                                !0 === n.isMatched(a, o.css) ? r.push(a) : r.push.apply(r, a.querySelectorAll(o.css)), 
                                !1 === l && (l = void 0 !== r[0]);
                            }
                        })), l;
                    },
                    filterTarget: function(e, t) {
                        let r, n;
                        for (r = 0; n = e[r]; r++) if (!0 === this.isMatched(t, n.css)) return !0;
                        return !1;
                    },
                    run: function(e) {
                        const t = this, r = {
                            config: {
                                childList: !0,
                                subtree: !0
                            },
                            target: document.body,
                            filterTarget: []
                        };
                        l.extend(r, e), r._disconnect = function() {
                            return t.disconnect(r);
                        }, r._connect = function() {
                            return t.connect(r);
                        }, r._match = function(e, n) {
                            return t.match(r, e, n);
                        };
                        let n = [];
                        for (let e = 0; e < r.queries.length; e++) n.push({
                            added: [],
                            removed: []
                        });
                        n = JSON.stringify(n), this.prepareMatched();
                        const a = this.getMutationObserver();
                        return r.observer = new a((function(e) {
                            const a = t.joinMutations(e);
                            if (0 === a.length) return;
                            let i, o = !1;
                            const s = JSON.parse(n);
                            for (;i = a.shift(); ) !1 === t.filterTarget(r.filterTarget, i.target) && !0 === r._match(s, i) && (o = !0);
                            !0 === o && r.callback(s);
                        })), r.start = function() {
                            r._disconnect(), r._connect();
                            let e = !1;
                            const t = JSON.parse(n), a = {
                                added: [ r.target ],
                                removed: []
                            };
                            r._match(t, a) && (e = !0), !0 === e && r.callback(t);
                        }, r.stop = function() {
                            r._disconnect();
                        }, r.start(), r;
                    }
                }, l.request = function(e) {
                    "object" != typeof e && (e = {
                        url: e
                    });
                    const t = {
                        0: 200,
                        1223: 204
                    };
                    return new Promise((function(r, n) {
                        const a = new XMLHttpRequest;
                        a.open("GET", e.url, !0), a.onload = function() {
                            const e = t[a.status] || a.status;
                            (e >= 200 && e < 300 || 304 === e) && "string" == typeof a.responseText ? r({
                                body: a.responseText
                            }) : n(new s(a.status + " " + a.statusText));
                        }, a.onerror = a.onabort = function() {
                            n(new s(a.status + " " + a.statusText));
                        }, a.send();
                    }));
                }, l.tbrExists = function() {
                    return !!document.body.parentNode.dataset.travelBar;
                }, l.tbrSetGlobal = function() {
                    return document.body.parentNode.dataset.travelBar = "1";
                }, l.isFrame = function() {
                    return document.defaultView.self !== document.defaultView.top;
                }, l.isDeny = function() {
                    return /^https?:\/\/(?:[^/]+\.)?(aviasales|search\.hotellook)\.[a-z.]{2,}(?:|\/.*)$/.test(document.referrer);
                }, l.stripStack = function(e) {
                    const t = /([^\s(]+\/)([^\/\s]+\.js)/.exec(e);
                    if (t) {
                        const r = t[1], n = t[2];
                        let a = n;
                        a = a.replace(".lite", "l"), a = a.replace(".min", "m"), a = a.replace("travelBar", "t"), 
                        e = a + ":" + e.split(r + n).join("js");
                    }
                    return e.replace(/\r/g, "").replace(/\s*\n\s*/g, ">").replace(/\s{2,}/g, " ").replace(/https?:\/(?:\/[^\/]+)+\/([^\/]+\.js)/g, "$1");
                };
                const d = {
                    ru: {
                        weekdaysShort: "Вс_Пн_Вт_Ср_Чт_Пт_Сб".split("_"),
                        months: "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_"),
                        monthsCal: "январе_феврале_марте_апреле_мае_июне_июле_августе_сентябре_октябре_ноябре_декабре".split("_"),
                        monthsShort: "янв._февр._мар._апр._мая_июн._июл._авг._сент._окт._нояб._дек.".split("_"),
                        dateFormat: "d MMMM, E",
                        dateFormatNoWeekdays: "d MMMM",
                        timeFormat: "H:mm",
                        dateTimeFormat: "d MMM, H:mm",
                        dateIntervalFormat: "d — d MMMM",
                        dateMonthIntervalFormat: "d MMM — d MMM"
                    },
                    en: {
                        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
                        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
                        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
                        dateFormat: "MMMM d, E",
                        dateFormatNoWeekdays: "MMMM d",
                        timeFormat: "h:mm a",
                        dateTimeFormat: "MMM d, h:mm a",
                        dateIntervalFormat: "MMMM d — d",
                        dateMonthIntervalFormat: "d MMM — d MMM"
                    },
                    de: {
                        weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
                        months: "Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
                        monthsShort: "Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),
                        dateFormat: "E, d. MMMM",
                        dateFormatNoWeekdays: "d. MMMM",
                        timeFormat: "H:mm",
                        dateTimeFormat: "d. MMM, H:mm",
                        dateIntervalFormat: "d. — d. MMMM",
                        dateMonthIntervalFormat: "d. MMM — d. MMM"
                    }
                }, u = {
                    USD: {
                        symbol: "$",
                        standard: "¤#,##0.00",
                        details: {
                            symbolRight: !1,
                            symbolSep: "",
                            toFixed: 2,
                            round: !1,
                            group: ",",
                            decimal: "."
                        }
                    },
                    EUR: {
                        symbol: "€",
                        standard: "#,##0.00 ¤",
                        details: {
                            symbolRight: !0,
                            symbolSep: " ",
                            toFixed: 2,
                            round: !1,
                            group: ".",
                            decimal: ","
                        }
                    },
                    RUB: {
                        symbol: "₽",
                        standard: "#,##0.00 ¤",
                        details: {
                            symbolRight: !0,
                            symbolSep: " ",
                            toFixed: 2,
                            round: !0,
                            group: " ",
                            decimal: ","
                        },
                        getNode: function() {
                            let e = document.querySelector("link.sf-price-font");
                            return e || (e = l.create("link", {
                                class: "sf-price-font",
                                href: "https://fonts.googleapis.com/css?family=PT+Sans:bold",
                                rel: "stylesheet",
                                type: "text/css"
                            }), document.head.appendChild(e)), l.create("span", {
                                text: this.symbol,
                                style: {
                                    fontFamily: '"PT Sans", Arial, serif'
                                }
                            });
                        }
                    },
                    BYR: {
                        symbol: "р.",
                        standard: "#,##0.00 ¤",
                        details: {
                            symbolRight: !0,
                            symbolSep: " ",
                            toFixed: 2,
                            round: !0,
                            group: " ",
                            decimal: ","
                        }
                    },
                    BYN: {
                        symbol: "р.",
                        standard: "#,##0.00 ¤",
                        details: {
                            symbolRight: !0,
                            symbolSep: " ",
                            toFixed: 2,
                            round: !0,
                            group: " ",
                            decimal: ","
                        }
                    },
                    KZT: {
                        symbol: "T",
                        standard: "#,##0.00 ¤",
                        details: {
                            symbolRight: !0,
                            symbolSep: " ",
                            toFixed: 2,
                            round: !0,
                            group: " ",
                            decimal: ","
                        }
                    },
                    UAH: {
                        symbol: "₴",
                        standard: "#,##0.00 ¤",
                        details: {
                            symbolRight: !0,
                            symbolSep: " ",
                            toFixed: 2,
                            round: !0,
                            group: " ",
                            decimal: ","
                        }
                    },
                    THB: {
                        symbol: "฿",
                        details: {
                            symbolRight: !1,
                            symbolSep: "",
                            toFixed: 2,
                            round: !0,
                            group: ",",
                            decimal: "."
                        }
                    }
                }, p = function(e, t, r, n) {
                    let a;
                    const i = {};
                    return e.replace(/([a-zA-Z]+)/g, (function(e, o) {
                        let s = null;
                        switch (n ? i[o] ? s = n : (i[o] = !0, s = r) : s = r, o) {
                          case "d":
                            return s.getUTCDate();

                          case "MMMM":
                            return t.months[s.getUTCMonth()];

                          case "MMM":
                            return t.monthsShort[s.getUTCMonth()];

                          case "h":
                            return a = s.getUTCHours(), a %= 12, a || (a = 12), a;

                          case "H":
                            return s.getUTCHours();

                          case "mm":
                            let e = s.getUTCMinutes();
                            return e < 10 && (e = "0" + e), e;

                          case "a":
                            let r = "AM";
                            return a = s.getUTCHours(), a >= 12 && (r = "PM"), r;

                          case "E":
                            return t.weekdaysShort[s.getUTCDay()];
                        }
                    }));
                }, f = function(e) {
                    let t = e;
                    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(e) && (t = e + "Z"), new Date(t);
                };
                l.getCityName = function(e) {
                    return v.main.avia.getCityName(e);
                }, l.getDate = function(e, t, r) {
                    const n = f(e), a = d[v.language.lang] || d.en;
                    let i = a.dateFormat;
                    return t && (i = a.dateFormatNoWeekdays), r && (i = "d"), i = p(i, a, n), i;
                }, l.getCalMonth = function(e) {
                    const t = f(e), r = d[v.language.lang] || d.en;
                    return (r.monthsCal || r.months)[t.getUTCMonth()];
                }, l.getDateTime = function(e) {
                    const t = f(e), r = d[v.language.lang] || d.en;
                    let n = r.dateTimeFormat;
                    return n = p(n, r, t), n;
                }, l.getDateInterval = function(e, t) {
                    const r = f(e), n = f(t), a = d[v.language.lang] || d.en;
                    let i = null;
                    return i = r.getUTCFullYear() === n.getUTCFullYear() && r.getUTCMonth() === n.getUTCMonth() ? a.dateIntervalFormat : a.dateMonthIntervalFormat, 
                    i = p(i, a, r, n), i;
                }, l.getPriceNode = function(e, t, r) {
                    const n = function(e, t) {
                        let r = u[e];
                        r || (r = {
                            symbol: e,
                            details: {
                                symbolRight: !0,
                                symbolSep: " ",
                                toFixed: 2,
                                round: !1,
                                group: ",",
                                decimal: "."
                            }
                        });
                        const n = r.details;
                        let a = (t = n.round ? Math.round(t) : t.toFixed(n.toFixed)).toString().split("."), i = a[1], o = "";
                        for (let e = 0; e < n.toFixed; e++) o += "0";
                        i === o && (i = "");
                        let s = a[0];
                        s = s.split("").reverse().join(""), s = s.replace(/(\d{3})/g, "$1,"), s = s.split("").reverse().join(""), 
                        "," === s[0] && (s = s.substr(1)), s = s.split(","), s = s.join(n.group), a = [ s ], 
                        i && a.push(i);
                        const c = a.join(n.decimal), l = [ c ];
                        return n.symbolRight ? (n.symbolSep && l.push(n.symbolSep), l.push(r.symbol)) : (n.symbolSep && l.unshift(n.symbolSep), 
                        l.unshift(r.symbol)), {
                            string: l.join(""),
                            value: c,
                            cultureCcy: r
                        };
                    }(e, t), a = n.cultureCcy, i = a.details, o = function() {
                        return !r && a.getNode ? a.getNode() : a.symbol;
                    };
                    let s = i.symbolSep;
                    " " === s && (s = String.fromCharCode(160));
                    const c = [ n.value ];
                    return i.symbolRight ? (s && c.push(s), c.push(o())) : (s && c.unshift(s), c.unshift(o())), 
                    l.create(document.createDocumentFragment(), {
                        append: c
                    });
                }, l.waitResponse = function(e, t, r) {
                    return new Promise((function(n) {
                        const a = l.waitResponse;
                        !function t(i) {
                            if (v.log("waitResponse retry", i), a.timer && clearTimeout(a.timer), !(i < 0)) return r((function(r) {
                                r ? a.timer = setTimeout((function() {
                                    return a.timer = null, t(--i);
                                }), e) : (v.log("waitResponse get response!"), n());
                            }));
                            v.error("waitResponse response is empty!"), n();
                        }(t);
                    }));
                }, l.getParamsFromPage = function(e) {
                    return new Promise((function(t) {
                        let r = !1;
                        "object" != typeof e || Array.isArray(e) || (r = Object.keys(e), e = r.map((function(t) {
                            return e[t];
                        }))), l.bridge({
                            args: [ e ],
                            func: 'function(a,b){const c=[];return a.forEach(function(a){let b=a,d=null;"string"!=typeof b&&(b=a.path,d=a.args);const e=b.split(".");let f,g,h=window;for(;e.length;){f=h,g=e.shift();try{h=f[g]}catch(a){h=null;break}}if(d)try{h=f[g].apply(f,d)}catch(a){h=null}c.push(h)}),b(c)}',
                            cb: function(e) {
                                let n = e;
                                return r && (n = {}, e && e.forEach((function(e, t) {
                                    n[r[t]] = e;
                                }))), t(n);
                            }
                        });
                    }));
                }, l.validatorMap = {
                    origin: "validateIataCode",
                    destination: "validateIataCode",
                    pickUpLocationId: "validateIataCode",
                    dropOffLocationId: "validateIataCode",
                    dateStart: "validateDate",
                    dateEnd: "validateDate",
                    dateIn: "validateDate",
                    dateOut: "validateDate",
                    pickUpDate: "validateDateTime",
                    dropOffDate: "validateDateTime",
                    currency: "validateCcy",
                    adults: "validateAdults",
                    price: "validatePrice",
                    oneDayPrice: "validatePrice",
                    minPriceIn: "validatePrice",
                    minPriceOut: "validatePrice",
                    minPriceBoth: "validatePrice",
                    query: "validateQuery",
                    dayCount: "validateNumber",
                    driverAge: "validateNumber"
                }, l.validate = function(e, t) {
                    const r = l.validatorMap[e];
                    return r && (t = l[r](t)), t;
                }, l.validateIataCode = function(e) {
                    return /^[A-Z]{3}$/.test(e) ? e.toUpperCase() : (v.error("City validation error!", e), 
                    null);
                }, l.validateDate = function(e) {
                    return /^\d{4}-\d{2}-\d{2}$/.test(e) || /^\d{4}-\d{2}$/.test(e) ? e : (v.error("Date validation error!", e), 
                    null);
                }, l.validateDateTime = function(e) {
                    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(e) || (v.error("DateTime validation error!", e), 
                    e = null), e;
                }, l.validateCcy = function(e) {
                    return /^[A-Z]{3}$/.test(e) ? e : (v.error("Currency validation error!", e), null);
                }, l.validateNumber = function(e) {
                    const t = parseInt(e);
                    return isNaN(t) ? (v.error("Number validation error!", e), null) : t;
                }, l.validateAdults = function(e) {
                    const t = l.validateNumber(e);
                    return !t || t < 1 ? (v.error("Adults validation error!", e), null) : t;
                }, l.validateQuery = function(e) {
                    return Array.isArray(e) && e.length ? e : (v.error("Query validation error!", e), 
                    null);
                }, l.validatePrice = function(e) {
                    return /^\d+(\.\d+)?$/.test(e) ? e : (v.error("Price validation error!", e), null);
                }, l.preparePrice = function(e) {
                    if (!e) return v.log("Price is empty!", e), null;
                    const t = (e = (e = (e = e.replace(",", ".")).replace(/[^\d.]/g, "")).replace(/\.(\d{3,})/, "$1")).match(/(\d+)(\.\d+)?/);
                    return t ? (e = t[1], t[2] && (e += t[2]), e = parseFloat(e), isNaN(e) ? (v.log("Price is NaN!", e), 
                    null) : e) : (v.log("Price is empty 2!", e), null);
                }, l.reFormatDate = function(e, t, r) {
                    let n = null;
                    const a = t.exec(e);
                    return a && (n = r.replace(/\$(\d)/g, (function(e, t) {
                        return a[t];
                    }))), n;
                }, l.normalizeDate = function(e, t, r, n) {
                    if (n = n || {}, !e && t && r) {
                        const e = new Date;
                        let a = e.getFullYear();
                        const i = e.getDate(), o = e.getMonth() + 1;
                        let s;
                        s = n.monthMap && void 0 !== n.monthMap[t] ? n.monthMap[t] : parseInt(t);
                        let c = parseInt(r);
                        return (o > s || o === s && c < i) && (a += 1), s < 10 && (s = "0" + s), c < 10 && (c = "0" + c), 
                        l.validateDate([ a, s, c ].join("-"));
                    }
                    return null;
                };
                const h = {
                    USD: "$",
                    EUR: "€",
                    AZN: "₼",
                    GBP: "£",
                    CNY: "¥",
                    GEL: "₾",
                    TRY: "₺",
                    RUB: "₽",
                    UAH: "₴",
                    KZT: "₸",
                    PLN: "zł"
                };
                let m = null;
                l.findCurrency = function(e) {
                    if (!m) {
                        const e = [];
                        for (let t in h) e.push(t, h[t]);
                        m = new RegExp("(" + e.join("|").replace(/\$/, "\\$&") + ")");
                    }
                    const t = m.exec(e);
                    if (t) for (let e in h) if (e === t[1] || h[e] === t[1]) return e;
                    return null;
                }, l.getDateAfterDays = function(e, t) {
                    let r = new Date(e).getTime();
                    r += 24 * t * 60 * 60 * 1e3;
                    const n = new Date(r), a = n.getUTCFullYear();
                    let i = n.getUTCMonth() + 1, o = n.getUTCDate();
                    return i < 10 && (i = "0" + i), o < 10 && (o = "0" + o), l.validateDate([ a, i, o ].join("-"));
                }, l.getCurrentDate = function() {
                    const e = new Date, t = e.getUTCFullYear();
                    let r = e.getUTCMonth() + 1;
                    r < 10 && (r = "0" + r);
                    let n = e.getUTCDate();
                    return n < 10 && (n = "0" + n), [ t, r, n ].join("-");
                }, l.convertTime12to24 = function(e) {
                    const t = /(\d+):(\d+)\s+(PM|AM)/.exec(e);
                    if (t) return t[1] = parseInt(t[1]), t[2] = parseInt(t[2]), "PM" === t[3] && t[1] < 12 && (t[1] += 12), 
                    "AM" === t[3] && 12 === t[1] && (t[1] -= 12), t[1] < 10 && (t[1] = "0" + t[1]), 
                    t[2] < 10 && (t[2] = "0" + t[2]), t[1] + ":" + t[2];
                };
                var g = l;
                const y = {
                    appName: "tbr",
                    appId: "tbr.chrome",
                    version: "20221117.084301",
                    language: null,
                    appInfo: {
                        debug: !0
                    },
                    errorMap: {
                        LOW_PRICE_IS_NOT_FOUND: 10,
                        REQUEST_ABORTED: 11,
                        CCY_NOT_SUPPORT: 42,
                        AVIA_BACK_FAIL: 110,
                        HOTEL_BACK_FAIL: 120,
                        CARS_BACK_FAIL: 160
                    },
                    main: {},
                    error: function() {
                        if (!y.appInfo.debug) return;
                        const e = [ "tbr" ];
                        e.push.apply(e, arguments), console.error.apply(console, e);
                    },
                    log: function() {
                        if (!y.appInfo.debug) return;
                        const e = [ "tbr" ];
                        e.push.apply(e, arguments), console.log.apply(console, e);
                    },
                    emit: function(e) {
                        if (!y.appInfo[e]) return;
                        const t = [].slice.call(arguments, 1);
                        try {
                            n.sendMessage({
                                action: "tbrEvent",
                                type: e,
                                data: t
                            });
                        } catch (e) {
                            y.error("Emit error", e);
                        }
                    },
                    trackError: function(e) {}
                };
                var v = y;
                const b = function(e) {
                    return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
                };
                var _ = function(e) {
                    if ("<all_urls>" === e) return "^https?:\\/\\/.+$";
                    const t = /(\*|http|https|file|ftp):\/\/([^\/]+)(?:\/(.*))?/.exec(e);
                    if (!t) throw new Error("Invalid url-pattern");
                    let r = t[1];
                    "*" === r && (r = "https?");
                    let n = t[2];
                    "*" === n ? n = ".+" : (n = b(n), n = n.replace(/^\\\*\\\./, "(?:[^/]+\\.)?"), n = n.replace(/\\\.\\\*$/g, "\\.[a-z\\.]{2,}"));
                    const a = [ "^", r, ":\\/\\/", n ];
                    let i = t[3];
                    return i ? "*" === i ? (i = "(?:|/.*)", a.push(i), a.push("$")) : i && (i = "/" + i, 
                    i = b(i), i = i.replace(/\\\*/g, ".*"), a.push(i), a.push("$")) : a.push("$"), a.join("");
                };
                const x = {
                    "*://*.ozon.travel/*": [ "ozon_travel", "OZN" ],
                    "*://*.onetwotrip.com/*": [ "onetwotrip_com", "OTT" ],
                    "*://*.onetravel.com/*": [ "onetravel_com", "OTR" ],
                    "*://*.aeroflot.ru/*": [ "aeroflot_ru", "AFL" ],
                    "*://*.momondo.*/*": [ "momondo_com", "MMD" ],
                    "*://*.anywayanyday.com/*": [ "anywayanyday_com", "AWA" ],
                    "*://*.svyaznoy.travel/*": [ "svyaznoy_travel", "SVZ" ],
                    "*://avia.tickets.ru/*": [ "tickets_ru", "ATK" ],
                    "*://*.s7.ru/*": [ "s7_ru", "SSV" ],
                    "*://*.kupibilet.ru/*": [ "kupibilet_ru", "KPB" ],
                    "*://*.trip.ru/*": [ "trip_ru", "TRP.R" ],
                    "*://*.trip.com/*": [ "trip_com", "TRP.C" ],
                    "*://*.ctrip.com/*": [ "ctrip_com", "CTR" ],
                    "*://*.tutu.ru/*": [ "tutu_ru", "TTR" ],
                    "*://*.uralairlines.ru/*": [ "uralairlines_ru", "URA" ],
                    "*://*.flyredwings.com/*": [ "flyredwings_com", "FRW" ],
                    "*://*.airastana.com/*": [ "airastana_com", "AAS" ],
                    "*://*.airmoldova.md/*": [ "airmoldova_md", "AMD" ],
                    "*://*.sindbad.ru/*": [ "sindbad_ru", "SBD" ],
                    "*://*.aviakassa.ru/*": [ "aviakassa_ru", "AKS.R" ],
                    "*://*.aviakassa.com/*": [ "aviakassa_ru", "AKS.C" ],
                    "*://*.biletix.ru/*": [ "biletix_ru", "BLX" ],
                    "*://*.utair.ru/*": [ "utair_ru", "UTR" ],
                    "*://*.kayak.*/*": [ "kayak_com", "KYK" ],
                    "*://*.orbitz.com/*": [ "travelocity_com", "OBZ" ],
                    "*://*.travelocity.com/*": [ "travelocity_com", "TCC.C" ],
                    "*://*.travelocity.ca/*": [ "travelocity_com", "TCC.CA" ],
                    "*://*.expedia.*/*": [ "travelocity_com", "EXD" ],
                    "*://*.expedia-cn.com/*": [ "travelocity_com", "EXP" ],
                    "*://*.priceline.com/*": [ "priceline_com", "PRL" ],
                    "*://*.airasia.com/*": [ "airasia_com", "ASI" ],
                    "*://*.ryanair.com/*": [ "ryanair_com", "RAR" ],
                    "*://booking.etihad.com/*": [ "etihad_com", "ETH" ],
                    "*://*.tripadvisor.ru/*": [ "tripadvisor_ru", "TAD" ],
                    "*://*.wizzair.com/*": [ "wizzair_com", "WZA" ],
                    "*://*.emirates.com/*": [ "emirates_com", "EMR" ],
                    "*://*.delta.com/*": [ "delta_com", "DLT" ],
                    "*://*.united.*/*": [ "united_com", "UND" ],
                    "*://*.jetblue.*/*": [ "jetblue_com", "JTB" ],
                    "*://*.123milhas.*/*": [ "123milhas_com", "MLS" ],
                    "*://*.britishairways.*/*": [ "britishairways_com", "BAW" ],
                    "*://*.cheapoair.*/*": [ "cheapoair_com", "CPA" ],
                    "*://*.skyscanner.*/*": [ "skyscanner_com", "SSC" ]
                };
                var P = x;
                const C = {
                    setType: function(e, t) {
                        t.page.setType(e);
                    },
                    setParam: function(e, t, r) {
                        r.page.set(e, t);
                    },
                    getParam: function(e, t) {
                        return t.page.get(e);
                    },
                    setPrice: function(e, t, r) {
                        r.page.setPrice(e, t);
                    },
                    pageClear: function(e) {
                        e.page.clear();
                    },
                    preparePrice: function(e) {
                        return g.preparePrice(e);
                    },
                    getParamsFromPage: function(e) {
                        return g.getParamsFromPage(e);
                    },
                    locationCheck: function(e) {
                        return Array.isArray(e) || (e = [ e ]), function(t) {
                            return e.some((function(e) {
                                return e.test(t);
                            }));
                        };
                    },
                    domWatcher: function(e) {
                        return e;
                    },
                    details: function(e) {
                        const t = {};
                        for (let r in e) t[r] = "locationCheck" === r ? C.locationCheck(e[r]) : "formWatcher" === r || "priceWatcher" === r ? C.domWatcher(e[r]) : e[r];
                        return t;
                    },
                    parseUrl: function(e, t, r) {
                        return e && "string" != typeof e && (r = t, t = e, e = null), g.parseUrl(e || location.href, {
                            sep: r,
                            paramsRe: t
                        });
                    },
                    matchUrl: function(e) {
                        return e.exec(location.href);
                    },
                    testUrl: function(e) {
                        return e.test(location.href);
                    },
                    dom: function(e) {
                        const t = function(e) {
                            const t = this;
                            this.style = function(r, n) {
                                return e.forEach((function(e) {
                                    e.style[r] = n;
                                })), t;
                            }, this.remove = function(r) {
                                return (e = e.map((function(e) {
                                    return e.cloneNode(!0);
                                }))).forEach((function(e) {
                                    [].slice.call(e.querySelectorAll(r)).forEach((function(e) {
                                        e.parentNode.removeChild(e);
                                    }));
                                })), t;
                            }, this.filter = function(r) {
                                return e.filter(r), t;
                            }, this.getAll = function(r) {
                                return e = [].slice.call(document.querySelectorAll(r)), t;
                            }, this.get = function(r) {
                                e.splice(0);
                                const n = document.querySelector(r);
                                return n && e.push(n), t;
                            }, this.wrap = function(r) {
                                return r.nodeType ? e = [ r ] : r.length && (e = [].slice.call(r)), t;
                            }, this.find = function(r) {
                                const n = [];
                                return e.some((function(e) {
                                    const t = e.querySelector(r);
                                    return t && n.push(t), !0;
                                })), e = n, t;
                            }, this.findAll = function(r) {
                                let n = [];
                                return e.some((function(e) {
                                    return n = [].slice.call(e.querySelectorAll(r)), !0;
                                })), e = n, t;
                            }, this.forEach = function(t) {
                                e.forEach(t);
                            }, this.some = function(t) {
                                return e.some(t);
                            }, this.value = function() {
                                let t = "";
                                return e.some((function(e) {
                                    return t = e.value, !0;
                                })), t;
                            }, this.childText = function() {
                                const t = [];
                                return e.forEach((function(e) {
                                    let r, n = 0;
                                    for (;r = e.childNodes[n]; ) n++, 3 === r.nodeType && t.push(r.textContent);
                                })), t;
                            }, this.html = function() {
                                let t = "";
                                return e.some((function(e) {
                                    return t = e.innerHTML, !0;
                                })), t;
                            }, this.text = function() {
                                let t = "";
                                return e.some((function(e) {
                                    return t = e.textContent, !0;
                                })), t;
                            }, this.len = function() {
                                return e.length;
                            }, this.data = function(t) {
                                let r;
                                return e.some((function(e) {
                                    return r = e.dataset[t], !0;
                                })), r;
                            }, this.prop = function(t) {
                                let r;
                                return e.some((function(e) {
                                    return r = e[t], !0;
                                })), r;
                            }, this.attr = function(t) {
                                let r;
                                return e.some((function(e) {
                                    return r = e.getAttribute(t), !0;
                                })), r;
                            }, this.css = function(t) {
                                let r, n;
                                return e.some((function(e) {
                                    return n = window.getComputedStyle(e), n && (r = n.getPropertyValue(t) || n[t], 
                                    void 0 !== r && (r = "" + r)), !0;
                                })), r;
                            }, this.end = function() {
                                return e;
                            };
                        };
                        return "string" == typeof e ? new t([]).get(e) : e ? new t([]).wrap(e) : new t([]);
                    },
                    string: function(e) {
                        return new function(e) {
                            const t = this;
                            "string" != typeof e && (e = ""), this.replace = function(r, n) {
                                return e = e.replace(r, n), t;
                            }, this.slice = function(r, n) {
                                return e = e.slice(r, n), t;
                            }, this.substr = function(r, n) {
                                return e = e.substr(r, n), t;
                            }, this.trim = function() {
                                return e = e.trim(), t;
                            }, this.toUpperCase = function() {
                                return e = e.toUpperCase(), t;
                            }, this.toLowerCase = function() {
                                return e = e.toLowerCase(), t;
                            }, this.charAt = function(r) {
                                return e = e.charAt(r), t;
                            }, this.search = function(t) {
                                return e.search(t);
                            }, this.match = function(t) {
                                return e.match(t);
                            }, this.indexOf = function(t, r) {
                                return e.indexOf.apply(e, arguments);
                            }, this.lastIndexOf = function(t, r) {
                                return e.lastIndexOf.apply(e, arguments);
                            }, this.split = function(t, r) {
                                return e.split(t, r);
                            }, this.charCodeAt = function(t) {
                                return e.charCodeAt(t);
                            }, this.end = function() {
                                return e;
                            }, this.len = function() {
                                return e.length;
                            };
                        }(e);
                    },
                    array: function(e) {
                        return new function(e) {
                            const t = this;
                            Array.isArray(e) || (e = null), this.slice = function(r, n) {
                                return e && (e = e.slice(r, n)), t;
                            }, this.splice = function(r, n) {
                                return e && (e = e.splice.apply(e, arguments)), t;
                            }, this.filter = function(r) {
                                return e && (e = e.filter(r)), t;
                            }, this.reverse = function() {
                                return e && e.reverse(), t;
                            }, this.sort = function(r) {
                                return e && e.sort(r), t;
                            }, this.concat = function() {
                                return e && (e = e.concat.apply(e, arguments)), t;
                            }, this.map = function(r) {
                                return e && (e = e.map(r)), t;
                            }, this.pop = function() {
                                let t = null;
                                return e && (t = e.pop()), t;
                            }, this.push = function(t) {
                                let r = null;
                                return e && (r = e.push.apply(e, arguments)), r;
                            }, this.shift = function() {
                                let t = null;
                                return e && (t = e.shift()), t;
                            }, this.unshift = function(t) {
                                let r = null;
                                return e && (r = e.unshift.apply(e, arguments)), r;
                            }, this.forEach = function(t) {
                                e && e.forEach(t);
                            }, this.some = function(t) {
                                let r = null;
                                return e && (r = e.some(t)), r;
                            }, this.every = function(t) {
                                let r = null;
                                return e && (r = e.every(t)), r;
                            }, this.join = function(t) {
                                let r = null;
                                return e && (r = e.join(t)), r;
                            }, this.indexOf = function(t, r) {
                                let n = null;
                                return e && (n = e.indexOf.apply(e, arguments)), n;
                            }, this.lastIndexOf = function(t, r) {
                                let n = null;
                                return e && (n = e.lastIndexOf.apply(e, arguments)), n;
                            }, this.get = function(t) {
                                let r = null;
                                return Array.isArray(e) && (r = e[t]), r;
                            }, this.len = function() {
                                let t = null;
                                return e && (t = e.length), t;
                            }, this.end = function() {
                                return e;
                            };
                        }(e);
                    },
                    object: function(e) {
                        return new function(e) {
                            "object" != typeof e && (e = null), this.keys = function() {
                                if (e && "object" == typeof e) return Object.keys(e);
                            }, this.prop = function(t, r) {
                                if (e && "object" == typeof e) return void 0 !== r ? (e[t] = r, this) : e[t];
                            }, this.end = function() {
                                return e;
                            };
                        }(e);
                    },
                    matchTemplate: function(e, t, r) {
                        return g.reFormatDate(e, t, r);
                    },
                    match: function(e, t) {
                        let r = null;
                        return "string" == typeof e && (r = e.match(t)), r;
                    },
                    exec: function(e, t) {
                        return t.exec(e);
                    },
                    test: function(e, t) {
                        return t.test(e);
                    },
                    normalizeDate: function(e, t, r, n) {
                        return g.normalizeDate(e, t, r, n);
                    },
                    closeCurrentBar: function() {
                        v.main.watcher.closeCurrentBar();
                    },
                    log: function() {
                        v.log.apply(null, arguments);
                    },
                    error: function() {
                        v.error.apply(null, arguments);
                    },
                    getPageScript: function(e, t) {
                        return g.getPageScript(e, t);
                    },
                    findJson: function(e, t) {
                        return g.findJson(e, t);
                    },
                    parseInt: function(e) {
                        return parseInt(e);
                    },
                    parseFloat: function(e) {
                        return parseFloat(e);
                    },
                    isNaN: function(e) {
                        return isNaN(e);
                    },
                    getTitle: function() {
                        return document.title;
                    },
                    getUrl: function() {
                        return location.href;
                    },
                    getDateAfterDays: function(e, t) {
                        return g.getDateAfterDays(e, t);
                    },
                    getCurrentDate: function() {
                        return g.getCurrentDate();
                    },
                    convertTime12to24: function(e) {
                        return g.convertTime12to24(e);
                    },
                    jsonParse: function(e) {
                        let t = null;
                        try {
                            t = JSON.parse(e);
                        } catch (e) {}
                        return t;
                    },
                    jsonStringify: function(e) {
                        return JSON.stringify(e);
                    },
                    findCurrency: function(e) {
                        return g.findCurrency(e);
                    }
                }, w = {}, S = {};
                C.addSite = function(e, t, r) {
                    w[e] = r, Array.isArray(t) || (t = [ t ]), t.forEach((function(e) {
                        S[e] = function() {
                            return r;
                        };
                    }));
                }, C.getSitePatternObj = function() {
                    return S;
                }, C.getSiteIdObj = function() {
                    return w;
                }, C.pause = function(e) {
                    return new Promise((function(t) {
                        setTimeout(t, e);
                    }));
                }, C.waitUntil = function(e, t, r) {
                    t || (t = 500), r || (r = 500);
                    let n = !1;
                    const a = setTimeout((function() {
                        n = !0;
                    }), t);
                    return function t() {
                        return new Promise((function(t) {
                            t(e());
                        })).catch((function(e) {
                            v.error("waitUntil condition error", e);
                        })).then((function(e) {
                            return e || n ? (clearTimeout(a), e) : new Promise((function(e) {
                                setTimeout(e, r);
                            })).then(t);
                        }));
                    }();
                }, C.getVersion = function() {
                    return 3;
                }, C.runFn = (e, t) => t.constructor.constructor("return " + t)()(...e), C.getAllUrlSearchParams = () => {
                    const e = location.search, t = new URLSearchParams(e), r = {};
                    return t.forEach((e, t) => {
                        r[t] = e;
                    }), r;
                };
                var k = C, T = function(e) {
                    const t = {}, r = {
                        return: function(e, t, r) {
                            let n;
                            return t && (r = t.value), void 0 !== r && (n = o(e, r)), e.return = n;
                        },
                        "{}": function(e, t, r) {
                            t && (r = t.prop);
                            const n = {};
                            for (let t in r) n[t] = o(e, r[t]);
                            return n;
                        },
                        "[]": function(e, t, r) {
                            t && (r = t.values);
                            const n = [];
                            if (r) {
                                let t = 0;
                                const a = r.length;
                                for (;t < a; t++) n.push(o(e, r[t]));
                            }
                            return n;
                        },
                        function: function(e, t, r, n, a) {
                            if (t) a = t.statement, r = t.name, n = t.args || []; else {
                                const e = [].slice.call(arguments, 2);
                                a = e.pop(), n = e.pop(), r = e.shift();
                            }
                            const i = function() {
                                const t = Object.create(e);
                                t.__parent__scope__ = e;
                                let r = 0;
                                const i = n.length;
                                for (;r < i; r++) t[n[r]] = arguments[r];
                                if (s(t, a), t.hasOwnProperty("return")) return t.return;
                            };
                            return r && (e[r] = i), i;
                        },
                        var: function(e, r, n, a) {
                            return r && (n = r.name, a = r.value), e[n] = o(e, a), t;
                        },
                        raw: function(e, t, r) {
                            return t && (r = t.data), "object" == typeof r ? JSON.parse(JSON.stringify({
                                w: r
                            })).w : r;
                        },
                        if: function(e, r, n, a, i) {
                            r && (n = r.condition, a = r.then, i = r.else);
                            let c = t;
                            return o(e, n) ? c = s(e, a) : void 0 !== i && (c = s(e, i)), c;
                        },
                        re: function(e, t, r, n) {
                            return t && (r = t.pattern, n = t.flags), new RegExp(r, n);
                        },
                        setType: function(e, t, r, n) {
                            t && (n = t.profile, r = t.param);
                            const a = o(e, n);
                            k.setType(o(e, r), a);
                        },
                        setParam: function(e, t, r, n, a) {
                            t && (a = t.profile, r = t.param, n = t.value);
                            const i = o(e, a);
                            k.setParam(o(e, r), o(e, n), i);
                        },
                        getParam: function(e, t, r, n) {
                            t && (n = t.profile, r = t.param);
                            const a = o(e, n);
                            return k.getParam(o(e, r), a);
                        },
                        setPrice: function(e, t, r, n, a) {
                            t && (a = t.profile, r = t.type, n = t.value);
                            const i = o(e, a);
                            k.setPrice(o(e, r), o(e, n), i);
                        },
                        pageClear: function(e, t, r) {
                            t && (r = t.profile);
                            const n = o(e, r);
                            k.pageClear(n);
                        },
                        preparePrice: function(e, t, r) {
                            return t && (r = t.value), k.preparePrice(o(e, r));
                        },
                        getParamsFromPage: function(e, t, r, n) {
                            t && (r = t.params, n = t.actions), Array.isArray(n) && "function" !== n[0] || (n = [ [ "then", n ] ]);
                            const a = n.slice(0);
                            let i, s, c = k.getParamsFromPage(o(e, r));
                            for (;s = a.shift(); ) i = c[s[0]].apply(c, s.slice(1).map((function(t) {
                                return o(e, t);
                            }))), c = i;
                            return i;
                        },
                        locationCheck: function(e, t, r) {
                            t && (r = t.re);
                            const n = r.map((function(t) {
                                return o(e, t);
                            }));
                            return k.locationCheck(n);
                        },
                        domWatcher: function(e, t, r) {
                            t && (r = t.prop);
                            const n = {};
                            let a;
                            for (let t in r) a = r[t], a.cb && (a.cb = o(e, a.cb)), n[t] = a;
                            return n;
                        },
                        details: function(e, t, r) {
                            t && (r = t.prop);
                            const n = {};
                            for (let t in r) n[t] = o(e, "locationCheck" === t ? {
                                type: "locationCheck",
                                re: r[t]
                            } : "formWatcher" === t || "priceWatcher" === t ? {
                                type: "domWatcher",
                                prop: r[t]
                            } : r[t]);
                            return n;
                        },
                        parseUrl: function(e, t, r, n, a) {
                            let i, s, c;
                            return t && (r = t.url, n = t.paramsRe, a = t.sep), r && (i = o(e, r)), n && (s = o(e, n)), 
                            a && (c = o(e, a)), k.parseUrl(i, s, c);
                        },
                        matchUrl: function(e, t, r) {
                            return t && (r = t.re), k.matchUrl(o(e, r));
                        },
                        testUrl: function(e, t, r) {
                            return t && (r = t.re), k.testUrl(o(e, r));
                        },
                        dom: function(e, t, r, n) {
                            if (t) r = t.node, n = t.actions; else {
                                const e = [].slice.call(arguments, 2);
                                n = e.pop(), r = e.shift();
                            }
                            let a;
                            r && (a = o(e, r));
                            const i = n.slice(0);
                            let s, c, l = k.dom(a);
                            for (;c = i.shift(); ) s = l[c[0]].apply(null, c.slice(1).map((function(t) {
                                return o(e, t);
                            }))), l = s;
                            return s;
                        },
                        string: function(e, t, r, n) {
                            t && (r = t.value, n = t.actions);
                            const a = o(e, r), i = n.slice(0);
                            let s, c, l = k.string(a);
                            for (;c = i.shift(); ) s = l[c[0]].apply(null, c.slice(1).map((function(t) {
                                return o(e, t);
                            }))), l = s;
                            return s;
                        },
                        array: function(e, t, r, n) {
                            t && (r = t.value, n = t.actions);
                            const a = o(e, r), i = n.slice(0);
                            let s, c, l = k.array(a);
                            for (;c = i.shift(); ) s = l[c[0]].apply(null, c.slice(1).map((function(t) {
                                return o(e, t);
                            }))), l = s;
                            return s;
                        },
                        object: function(e, t, r, n) {
                            t && (r = t.value, n = t.actions);
                            const a = o(e, r), i = n.slice(0);
                            let s, c, l = k.object(a);
                            for (;c = i.shift(); ) s = l[c[0]].apply(null, c.slice(1).map((function(t) {
                                return o(e, t);
                            }))), l = s;
                            return s;
                        },
                        matchTemplate: function(e, t, r, n, a) {
                            t && (r = t.str, n = t.re, a = t.pattern);
                            const i = o(e, r), s = o(e, n), c = o(e, a);
                            return k.matchTemplate(i, s, c);
                        },
                        match: function(e, t, r, n) {
                            return t && (r = t.value, n = t.re), k.match(o(e, r), o(e, n));
                        },
                        exec: function(e, t, r, n) {
                            return t && (r = t.value, n = t.re), k.exec(o(e, r), o(e, n));
                        },
                        test: function(e, t, r, n) {
                            return t && (r = t.value, n = t.re), k.test(o(e, r), o(e, n));
                        },
                        normalizeDate: function(e, t, r, n, a, i) {
                            t && (r = t.year, n = t.month, a = t.date, i = t.details);
                            const s = o(e, r), c = o(e, n), l = o(e, a), d = o(e, i);
                            return k.normalizeDate(s, c, l, d);
                        },
                        closeCurrentBar: function() {
                            k.closeCurrentBar();
                        },
                        log: function(e, t) {
                            let r;
                            r = t ? t.args : [].slice.call(arguments).slice(2), k.log.apply(null, r.map((function(t) {
                                return o(e, t);
                            })));
                        },
                        error: function(e, t) {
                            let r;
                            r = t ? t.args : [].slice.call(arguments).slice(2), k.error.apply(null, r.map((function(t) {
                                return o(e, t);
                            })));
                        },
                        getPageScript: function(e, t, r, n) {
                            return t && (r = t.str, n = t.re), k.getPageScript(o(e, r), o(e, n));
                        },
                        findJson: function(e, t, r, n) {
                            return t && (r = t.str, n = t.re), k.findJson(o(e, r), o(e, n));
                        },
                        parseInt: function(e, t, r) {
                            return t && (r = t.value), k.parseInt(o(e, r));
                        },
                        parseFloat: function(e, t, r) {
                            return t && (r = t.value), k.parseFloat(o(e, r));
                        },
                        isNaN: function(e, t, r) {
                            return t && (r = t.value), k.isNaN(o(e, r));
                        },
                        getTitle: function(e, t) {
                            return k.getTitle();
                        },
                        getUrl: function(e, t) {
                            return k.getUrl();
                        },
                        getDateAfterDays: function(e, t, r, n) {
                            t && (r = t.date, n = t.days);
                            const a = o(e, r), i = o(e, n);
                            return k.getDateAfterDays(a, i);
                        },
                        getCurrentDate: function(e, t) {
                            return k.getCurrentDate();
                        },
                        convertTime12to24: function(e, t, r) {
                            t && (r = t.value);
                            const n = o(e, r);
                            return k.convertTime12to24(n);
                        },
                        jsonParse: function(e, t, r) {
                            t && (r = t.value);
                            const n = o(e, r);
                            return k.jsonParse(n);
                        },
                        jsonStringify: function(e, t, r) {
                            t && (r = t.value);
                            const n = o(e, r);
                            return k.jsonStringify(n);
                        },
                        findCurrency: function(e, t, r) {
                            t && (r = t.value);
                            const n = o(e, r);
                            return k.findCurrency(n);
                        },
                        pause: function(e, t, r, n) {
                            t && (r = t.time, n = t.actions), Array.isArray(n) && "function" !== n[0] || (n = [ [ "then", n ] ]);
                            const a = n.slice(0);
                            let i, s, c = k.pause(o(e, r));
                            for (;s = a.shift(); ) i = c[s[0]].apply(c, s.slice(1).map((function(t) {
                                return o(e, t);
                            }))), c = i;
                            return i;
                        },
                        waitUntil: function(e, t, r, n, a, i) {
                            if (t) r = t.condition, n = t.time, a = t.interval, i = t.actions; else {
                                const e = [].slice.call(arguments, 2);
                                r = e.shift(), i = e.pop(), n = e.shift(), a = e.shift();
                            }
                            const s = o(e, r), c = o(e, n), l = o(e, a);
                            Array.isArray(i) && "function" !== i[0] || (i = [ [ "then", i ] ]);
                            const d = i.slice(0);
                            let u, p, f = k.waitUntil(s, c, l);
                            for (;p = d.shift(); ) u = f[p[0]].apply(f, p.slice(1).map((function(t) {
                                return o(e, t);
                            }))), f = u;
                            return u;
                        },
                        getVersion: function(e, t) {
                            return k.getVersion();
                        },
                        runFn: function(e, t, r, n) {
                            t && (r = t.args, n = t.code);
                            const a = o(e, r), i = o(e, n);
                            return k.runFn(a, i);
                        }
                    }, n = /^([-+=*/%><!&|^]+|in|instanceof)$/;
                    !function() {
                        const e = function(e, t) {
                            let r = e;
                            for (;r && !r.hasOwnProperty(t); ) r = r.__parent__scope__;
                            return r;
                        }, t = r, n = {
                            "+": function(e, t, r) {
                                return r ? +t : e + t;
                            },
                            "-": function(e, t, r) {
                                return r ? -t : e - t;
                            },
                            "*": function(e, t) {
                                return e * t;
                            },
                            "/": function(e, t) {
                                return e / t;
                            },
                            "%": function(e, t) {
                                return e % t;
                            },
                            ">": function(e, t) {
                                return e > t;
                            },
                            ">=": function(e, t) {
                                return e >= t;
                            },
                            "<": function(e, t) {
                                return e < t;
                            },
                            "<=": function(e, t) {
                                return e <= t;
                            },
                            "==": function(e, t) {
                                return e == t;
                            },
                            "===": function(e, t) {
                                return e === t;
                            },
                            "!=": function(e, t) {
                                return e != t;
                            },
                            "!==": function(e, t) {
                                return e !== t;
                            },
                            "&": function(e, t) {
                                return e & t;
                            },
                            "|": function(e, t) {
                                return e | t;
                            },
                            "^": function(e, t) {
                                return e ^ t;
                            },
                            "<<": function(e, t) {
                                return e << t;
                            },
                            ">>": function(e, t) {
                                return e >> t;
                            },
                            ">>>": function(e, t) {
                                return e >>> t;
                            }
                        };
                        Object.keys(n).forEach((function(e) {
                            const r = n[e];
                            t[e] = function(e, t, n, a, i) {
                                let s;
                                return t && (n = t.left, a = t.right, i = t.unary), s = i ? [ 0, o(e, n) ] : [ o(e, n), o(e, a) ], 
                                r(s[0], s[1], i);
                            };
                        }));
                        const a = {
                            typeof: function(e) {
                                return typeof e;
                            },
                            void: function(e) {},
                            "!": function(e) {
                                return !e;
                            },
                            "~": function(e) {
                                return ~e;
                            }
                        };
                        Object.keys(a).forEach((function(e) {
                            const r = a[e];
                            t[e] = function(e, t, n) {
                                return t && (n = t.left), r(o(e, n));
                            };
                        }));
                        const i = {
                            "=": function(e, t, r, n) {
                                return e[t] = o(r, n);
                            },
                            "+=": function(e, t, r, n) {
                                return e[t] += o(r, n);
                            },
                            "-=": function(e, t, r, n) {
                                return e[t] -= o(r, n);
                            },
                            "*=": function(e, t, r, n) {
                                return e[t] *= o(r, n);
                            },
                            "/=": function(e, t, r, n) {
                                return e[t] /= o(r, n);
                            },
                            "%=": function(e, t, r, n) {
                                return e[t] %= o(r, n);
                            },
                            "<<=": function(e, t, r, n) {
                                return e[t] <<= o(r, n);
                            },
                            ">>=": function(e, t, r, n) {
                                return e[t] >>= o(r, n);
                            },
                            ">>>=": function(e, t, r, n) {
                                return e[t] >>>= o(r, n);
                            },
                            "&=": function(e, t, r, n) {
                                return e[t] &= o(r, n);
                            },
                            "^=": function(e, t, r, n) {
                                return e[t] ^= o(r, n);
                            },
                            "|=": function(e, t, r, n) {
                                return e[t] |= o(r, n);
                            }
                        };
                        Object.keys(i).forEach((function(r) {
                            const n = i[r];
                            t[r] = function(t, r, a, i) {
                                r && (a = r.left, i = r.right);
                                const o = e(t, a);
                                return n(o, a, t, i);
                            };
                        }));
                        const s = {
                            "++": function(e, t, r) {
                                return r ? ++e[t] : e[t]++;
                            },
                            "--": function(e, t, r) {
                                return r ? --e[t] : e[t]--;
                            }
                        };
                        Object.keys(s).forEach((function(r) {
                            const n = s[r];
                            t[r] = function(t, r, a, i) {
                                r && (a = r.left, i = r.prefix);
                                const o = e(t, a);
                                return n(o, a, i);
                            };
                        }));
                        const c = {
                            in: function(e, t, r) {
                                return o(e, t) in o(e, r);
                            },
                            instanceof: function(e, t, r) {
                                return o(e, t) instanceof o(e, r);
                            },
                            "&&": function(e, t, r) {
                                return o(e, t) && o(e, r);
                            },
                            "||": function(e, t, r) {
                                return o(e, t) || o(e, r);
                            }
                        };
                        Object.keys(c).forEach((function(e) {
                            const r = c[e];
                            t[e] = function(e, t, n, a) {
                                return t && (n = t.left, a = t.right), r(e, n, a);
                            };
                        }));
                    }();
                    const a = [ "Infinity", "NaN", "undefined" ], i = [ 1 / 0, NaN, void 0 ], o = function(e, t) {
                        let o;
                        if ("object" == typeof t && null !== t) {
                            let a, i;
                            if (Array.isArray(t)) switch (i = t.length, i > 1 && "string" == typeof t[1] && (3 === i ? n.test(t[1]) && (t = [ t[1], t[0], t[2] ]) : 2 === i && "raw" !== t[0] && n.test(t[1]) && (t = [ t[1], t[0], !0 ])), 
                            a = r[t[0]], i) {
                              case 1:
                                o = a(e, null);
                                break;

                              case 2:
                                o = a(e, null, t[1]);
                                break;

                              case 3:
                                o = a(e, null, t[1], t[2]);
                                break;

                              case 4:
                                o = a(e, null, t[1], t[2], t[3]);
                                break;

                              case 5:
                                o = a(e, null, t[1], t[2], t[3], t[4]);
                                break;

                              default:
                                o = a.apply(null, [ e, null ].concat(t.slice(1)));
                            } else a = r[t.type], o = a(e, t);
                        } else if ("string" == typeof t) {
                            const r = function(e) {
                                const t = function(e) {
                                    const t = e[0];
                                    let r = 0;
                                    for (;;) {
                                        if (r = e.indexOf(t, r + 1), -1 === r) {
                                            r = e.length;
                                            break;
                                        }
                                        if ("\\" !== e[r - 1]) break;
                                    }
                                    let n = "";
                                    try {
                                        n = '"' === t ? JSON.parse('"' + e.substr(1, r - 1) + '"') : JSON.parse('"' + e.substr(1, r - 1).replace(/\\'/g, "'").replace(/"/g, '\\"') + '"');
                                    } catch (e) {}
                                    return {
                                        data: n,
                                        i: r
                                    };
                                }, r = function(e) {
                                    const r = [];
                                    let n, a, i = "", o = 1;
                                    for (;a = e[o]; o++) if ('"' === a || "'" === a) n = t(e.substr(o)), r.push(n.data), 
                                    o += n.i; else {
                                        if ("]" === a) break;
                                        i += a;
                                    }
                                    return i && r.push(parseFloat(i)), {
                                        data: r[0],
                                        i: o
                                    };
                                };
                                let n;
                                return n = /[\["']/.test(e) ? function(e) {
                                    const t = [];
                                    let n, a, i = "", o = 0;
                                    for (;a = e[o]; o++) "." === a ? (i && t.push(i), i = "") : "[" === a ? (i && t.push(i), 
                                    i = "", n = r(e.substr(o)), t.push(n.data), o += n.i) : i += a;
                                    return i && t.push(i), t;
                                }(e) : e.split("."), n;
                            }(t);
                            let n, s = e;
                            if (1 === r.length) {
                                n = r.shift();
                                const e = a.indexOf(n);
                                o = -1 !== e ? i[e] : s[n];
                            } else for (;r.length; ) {
                                if (n = r.shift(), -1 === [ "string", "object" ].indexOf(typeof s)) throw new Error("Prop " + n + " type error!");
                                o = s[n], s = o;
                            }
                        } else o = t;
                        return o;
                    }, s = function(e, r) {
                        let n, a = void 0, i = 0;
                        const s = r.length;
                        for (;i < s; i++) {
                            const s = r[i];
                            if (n = a, a = o(e, s), a === t && (a = n), e.hasOwnProperty("return")) break;
                        }
                        return a;
                    };
                    return Array.isArray(e) && "string" != typeof e[0] || (e = [ e ]), s({}, e);
                };
                k.addSite("skyscanner_com", "*://*.skyscanner.*/*", [ k.details({
                    locationCheck: [ /\/transport\/flights\//, /\/trasporti\/voli\//, /\/transport\/fly\//, /\/tasima\/ucak-bileti\//, /\/transporte\/vuelos\//, /\/transport\/vols\//, /\/transport\/flyg\//, /\/liikennevalineet\/lennot\// ],
                    formWatcher: {
                        ctr2: {
                            query: {
                                css: "#app-root",
                                is: "added"
                            },
                            cb: function(e) {
                                return k.getParamsFromPage({
                                    origin: "__internal.searchParams.originIataCode",
                                    destination: "__internal.searchParams.destinationIataCode",
                                    dateStart: "__internal.searchParams.outboundDate",
                                    dateEnd: "__internal.searchParams.inboundDate",
                                    currency: "__internal.culture.currency"
                                }).then((function(t) {
                                    var r, n;
                                    k.setType("avia", e), k.setParam("origin", t.origin, e), k.setParam("destination", t.destination, e), 
                                    k.setParam("dateStart", t.dateStart, e), k.setParam("dateEnd", t.dateEnd, e), k.setParam("currency", t.currency, e);
                                    const a = k.getAllUrlSearchParams();
                                    k.setParam("adultTickets", null !== (r = a.adults) && void 0 !== r ? r : 0, e), 
                                    k.setParam("childTickets", null !== (n = a.children) && void 0 !== n ? n : 0, e);
                                }));
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: ".BpkText_bpk-text__ZWIzZ.BpkText_bpk-text--lg__Nzk0N",
                                is: "added"
                            },
                            template: "price"
                        }
                    }
                }) ]), k.addSite("momondo_com", "*://*.momondo.*/*", [ k.details({
                    locationCheck: [ /\/aviabilety\//, /\/fluege\//, /\/flybilletter\//, /\/vuelos\//, /\/vluchten\//, /\/lento\//, /\/voos\//, /\/flyg\// ],
                    formWatcher: {
                        changePage: {
                            query: {
                                css: ".c-flights_result_filters_aside-filter filter-duration",
                                is: "removed"
                            },
                            cb: function(e) {
                                k.log("page change!"), k.closeCurrentBar(), k.pageClear(e);
                            }
                        },
                        ctr: {
                            query: [ {
                                css: ".c-flights_result_filters_aside-filter filter-duration",
                                is: "added"
                            } ],
                            cb: function(e) {
                                k.setType("avia", e);
                                const t = k.dom(".c-flights_searchform-route .c-flights_searchform-origin input.c-input-element").value(), r = k.dom(".c-flights_searchform-route .c-flights_searchform-destination input.c-input-element").value(), n = k.matchTemplate(t, /\s\(([A-Z]{3})\)/, "$1"), a = k.matchTemplate(r, /\s\(([A-Z]{3})\)/, "$1");
                                k.setParam("origin", n, e), k.setParam("destination", a, e);
                                const i = [], o = k.exec(k.getUrl(), /\/(\d{4}-\d{1,2}-\d{1,2})(?:\/(\d{4}-\d{1,2}-\d{1,2}))?/);
                                o && (k.array(i).push(o[1]), o[2] && k.array(i).push(o[2]));
                                let s = "", c = "";
                                k.array(i).forEach((function(e, t) {
                                    const r = k.array(k.string(e).split("-")).map((function(e, t) {
                                        return (1 === t || 2 === t) && e < 10 && (e = "0" + e), e;
                                    })).join("-");
                                    0 === t ? s = r : 1 === t && (c = r);
                                })), k.setParam("dateStart", s, e), k.setParam("dateEnd", c, e);
                            }
                        },
                        ccy: {
                            query: {
                                css: ".c-flights_result_result_ticket-aside .c-flights_result_result_ticket-aside-price .c-flights_result_result_ticket-aside-price-label",
                                is: "added"
                            },
                            cb: function(e, t) {
                                k.array(t.added).some((function(t) {
                                    const r = k.dom(t).text(), n = k.exec(r, /\s([A-Z]{3})$/);
                                    if (n) return k.setParam("currency", n[1], e), !0;
                                }));
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: ".c-flights_result_result_ticket-aside .c-flights_result_result_ticket-aside-price .c-flights_result_result_ticket-aside-price-label",
                                is: "added"
                            },
                            template: "price"
                        }
                    },
                    onShow: function(e) {
                        k.dom("#mui-header").style("marginTop", e + "px");
                    },
                    onHide: function() {
                        k.dom("#mui-header").style("marginTop", 0);
                    }
                }), k.details({
                    locationCheck: [ /\/flight-search\// ],
                    formWatcher: {
                        ctr: {
                            query: [ {
                                css: "#searchResultsList > div[id]",
                                is: "added"
                            } ],
                            cb: function(e) {
                                k.setType("avia", e);
                                const t = k.exec(k.getUrl(), /\/flight-search\/([A-Z]{3})-([A-Z]{3})\/(\d{4}-\d{2}-\d{2})(?:\/(\d{4}-\d{2}-\d{2}))?/);
                                return t && (k.setParam("origin", t[1], e), k.setParam("destination", t[2], e), 
                                k.setParam("dateStart", t[3], e), k.setParam("dateEnd", t[4], e)), k.getParamsFromPage({
                                    site_currency: "R9.globals.analytics.pixelContext.site_currency"
                                }).then(t => {
                                    k.setParam("currency", t.site_currency, e);
                                });
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: ".col-price .booking-link .price",
                                is: "added"
                            },
                            template: "price"
                        }
                    },
                    onShow: function(e) {
                        k.dom("#mui-header").style("marginTop", e + "px");
                    },
                    onHide: function() {
                        k.dom("#mui-header").style("marginTop", 0);
                    }
                }), k.details({
                    locationCheck: [ /\/flightsearch\// ],
                    formWatcher: {
                        ctr: {
                            query: [ {
                                css: "#flight-list",
                                is: "added"
                            }, {
                                css: ".results",
                                is: "removed"
                            } ],
                            cb: function(e) {
                                k.setType("avia", e);
                                const t = k.parseUrl(/[?#](.+)/, /[&#]/);
                                k.setParam("origin", t.SO0, e), k.setParam("destination", t.SD0, e), k.setParam("dateStart", k.matchTemplate(t.SDP0, /(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1"), e), 
                                k.setParam("dateEnd", k.matchTemplate(t.SDP1, /(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1"), e);
                            }
                        },
                        ccy: {
                            query: {
                                css: ".ticketinfo .price .unit",
                                is: "added"
                            },
                            template: "currency"
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: ".ticketinfo .price .value",
                                is: "added"
                            },
                            template: "price"
                        }
                    },
                    onShow: function(e) {
                        k.dom("#mui-header").style("marginTop", e + "px");
                    },
                    onHide: function() {
                        k.dom("#mui-header").style("marginTop", 0);
                    }
                }) ]), k.addSite("ozon_travel", "*://*.ozon.travel/*", [ k.details({
                    formWatcher: {
                        loading: {
                            query: {
                                css: 'div[class^="FlightPreLoader_flightPreLoader__"]',
                                is: "added"
                            },
                            cb: function(e) {
                                k.closeCurrentBar(), k.pageClear(e);
                            }
                        },
                        ctr: {
                            query: [ {
                                css: [ '.container section[class^="FlightSearchTariff_tariffs__"]', '.container div[class^="FlightSearch2_headWrap"]' ]
                            }, {
                                css: 'div[class^="FlightPreLoader_flightPreLoader__"]',
                                is: "removed"
                            } ],
                            cb: function(e) {
                                const t = k.matchUrl(/\/search\/(\w{3})(\w{3})(\w{3})?(\w{3})?\/(?:d(\d{4}-\d{2}-\d{2}))(?:d(\d{4}-\d{2}-\d{2}))?/);
                                if (!t) return k.closeCurrentBar(), void k.pageClear(e);
                                let r = t[1], n = t[2];
                                if (!r || !n) return k.error("Origin or destination is empty"), k.pageClear(e);
                                const a = t[3], i = t[4];
                                if (a && i && i !== r && a !== n) return k.error("Unsupported route"), k.pageClear(e);
                                const o = t[5], s = t[6];
                                r = k.string(r).toUpperCase().end(), n = k.string(n).toUpperCase().end(), k.setType("avia", e), 
                                k.setParam("origin", r, e), k.setParam("destination", n, e), k.setParam("dateStart", o, e), 
                                k.setParam("dateEnd", s, e);
                            }
                        },
                        ccy: {
                            query: {
                                css: "div.feed-filters",
                                is: "added"
                            },
                            cb: function(e) {
                                k.setParam("currency", k.dom(".field-currency .u-input").text(), e);
                            }
                        },
                        ccy_2: {
                            query: {
                                css: 'div[class^="FlightSearchTariffSidebar_priceValue"]',
                                is: "added"
                            },
                            cb: function(e) {
                                k.setParam("currency", "RUB", e);
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: 'span[class^="FlightSearchTariff_value"]',
                                is: "added"
                            },
                            template: "price"
                        },
                        price_2: {
                            query: {
                                css: 'div[class^="FlightSearchTariffSidebar_priceValue"]',
                                is: "added"
                            },
                            template: "price"
                        }
                    },
                    onShow: function(e) {
                        k.dom("header.main-header").style("marginTop", e + "px");
                    },
                    onHide: function() {
                        k.dom("header.main-header").style("marginTop", 0);
                    }
                }) ]), k.addSite("onetwotrip_com", "*://*.onetwotrip.com/*", [ k.details({
                    locationCheck: [ /\/f\/search\// ],
                    formWatcher: {
                        ctr: {
                            query: [ {
                                css: '[data-locator="flights-search-results-container"]',
                                is: "added"
                            } ],
                            cb: function(e) {
                                k.pageClear(e);
                                const t = k.matchUrl(/search\/(\d{2})(\d{2})(\w{3})(\w{3})(\d{2})?(\d{2})?/);
                                let r, n, a, i;
                                t && (r = t[3], n = t[4], a = k.normalizeDate(null, t[2], t[1]), t[5] && t[6] && (i = k.normalizeDate(null, t[6], t[5])), 
                                k.setType("avia", e), k.setParam("origin", r, e), k.setParam("destination", n, e), 
                                k.setParam("dateStart", a, e), k.setParam("dateEnd", i, e));
                            }
                        },
                        new_ccy: {
                            query: {
                                css: '[data-locator="flight-variant-buy"] div > span'
                            },
                            cb: function(e, t) {
                                k.array(t.added).some(t => {
                                    const r = k.dom(t).text(), n = k.findCurrency(r);
                                    if (n) return k.setParam("currency", n, e), !0;
                                });
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: '[data-locator="flight-variant"] [data-locator="flight-variant-price"] > span',
                                is: "added"
                            },
                            template: "price"
                        }
                    },
                    bodySelector: "body",
                    styleSelector: "head",
                    onShow: function(e) {
                        k.dom("body").style("paddingTop", e + "px");
                    },
                    onHide: function() {
                        k.dom("body").style("paddingTop", 0);
                    },
                    getSvgTemplate: function(e, t) {
                        if ("close" === e) return [ "svg", {
                            width: t.width || "80",
                            height: t.height || t.width || "80",
                            viewBox: "0 0 80 80"
                        }, [ [ "path", {
                            fill: "#000",
                            d: "M56.9700 52.729L44.243 40l12.728-12.728-4.242-4.243L40 35.757 27.272 23.029l-4.243 4.243L35.757 40 23.029 52.729l4.243 4.242L40 44.243l12.729 12.728z"
                        } ] ] ];
                    },
                    onAddStyle: function(e, t) {
                        e.body && e.body.backgroundColor && k.object(e.body).prop("backgroundColor", "#fcefaf"), 
                        e.suggest && e.suggest["&:hover"] && k.object(e.suggest["&:hover"]).prop("backgroundColor", "#fcefaf");
                    },
                    onCreateBar: function(e) {
                        k.runFn([ e ], 'function(a){const b=a.body.node,c=b.querySelector("a[href=\\"#close\\"]"),d=function(a){const b=document.querySelector("#app");b&&(b.style.paddingTop=a?"55px":0)};if(d(!0),c){const b=a.wDom.get(c);b.setAttribute("title","Close!"),b.removeAttribute("href"),c.addEventListener("click",function(){d(!1)},{once:!0})}if(b){const c=a.wDom.get(b);c.setStyle("position","")}}');
                    },
                    disableFontLink: !0
                }) ]), k.addSite("onetravel_com", "*://*.onetravel.com/*", [ k.details({
                    locationCheck: [ /\/fpnext\/air\/Listing\//i ],
                    formWatcher: {
                        ctr: {
                            query: {
                                css: "#flight-listings"
                            },
                            cb: function(e) {
                                k.pageClear(e);
                                const t = k.dom("input#htxtTripType").value();
                                if ("ROUNDTRIP" !== t && "ONEWAYTRIP" !== t) return k.closeCurrentBar(), void k.pageClear(e);
                                k.setType("avia", e);
                                const r = k.dom("input#htxtOriginCode").value(), n = k.dom("input#htxtDestinationCode").value(), a = k.dom("input#htxtFromDate").value();
                                let i = k.dom("input#htxtToDate").value();
                                const o = k.string(k.dom("span#currencyPicker").data("currentcurrency")).substr(0, 3).end();
                                "01/01/0001" === i && (i = null), k.setParam("origin", r, e), k.setParam("destination", n, e), 
                                k.setParam("dateStart", k.matchTemplate(a, /(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2"), e), 
                                k.setParam("dateEnd", k.matchTemplate(i, /(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2"), e), 
                                k.setParam("currency", o, e);
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: "#flight-listings .contract-block .fare__amount.is--total"
                            },
                            template: "price"
                        }
                    }
                }) ]), k.addSite("kayak_com", "*://*.kayak.*/*", [ k.details({
                    formWatcher: {
                        ctr: {
                            query: {
                                css: [ "#resbody", "#searchResultsList > div" ]
                            },
                            cb: function(e) {
                                const t = k.matchUrl(/\/flights\/(\w{3})-(\w{3})\/(\d{4}-\d{2}-\d{2})(?:\/(\d{4}-\d{2}-\d{2}))?(?:\/(\w{3})-\w{3 })?/);
                                if (t && !t[5]) return k.getParamsFromPage({
                                    origin: "R9.globals.analytics.pixelContext.originCode",
                                    destination: "R9.globals.analytics.pixelContext.destinationCode",
                                    dateStart: "R9.globals.analytics.pixelContext.departureDate",
                                    dateEnd: "R9.globals.analytics.pixelContext.returnDate",
                                    currency: "R9.globals.analytics.pixelContext.site_currency",
                                    tripType: "R9.globals.analytics.pixelContext.roundTrip",
                                    dateStartEn: "R9.globals.analytics.pixelContext.depart_date",
                                    dateEndEn: "R9.globals.analytics.pixelContext.return_date",
                                    travelersAdults: "R9.globals.analytics.pixelContext.travelersAdults",
                                    travelersChildren: "R9.globals.analytics.pixelContext.travelersChildren",
                                    travelersChildrenChild: "R9.globals.analytics.pixelContext.travelersChildrenChild"
                                }).then((function(r) {
                                    var n;
                                    if (k.setType("avia", e), t) k.setParam("origin", t[1], e), k.setParam("destination", t[2], e), 
                                    k.setParam("dateStart", t[3], e), k.setParam("dateEnd", t[4], e); else {
                                        k.setParam("origin", r.origin, e), k.setParam("destination", r.destination, e);
                                        let t = r.dateStart || r.dateStartEn;
                                        t = k.matchTemplate(t, /(\d{4})-(\d{2})-(\d{2})/, "$1-$2-$3"), k.setParam("dateStart", t, e);
                                        let n = r.dateEnd || r.dateEndEn;
                                        n = k.matchTemplate(n, /(\d{4})-(\d{2})-(\d{2})/, "$1-$2-$3"), k.setParam("dateEnd", n, e);
                                    }
                                    k.setParam("adultTickets", r.travelersAdults, e);
                                    const a = null !== (n = r.travelersChildren + r.travelersChildrenChild) && void 0 !== n ? n : 0;
                                    k.setParam("childTickets", a, e), k.setParam("currency", r.currency, e);
                                }));
                                k.closeCurrentBar(), k.pageClear(e);
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: [ ".resultsContainer .booking-link > .price .price-text" ]
                            },
                            template: "price"
                        }
                    }
                }) ]), k.addSite("united_com", [ "*://*.united.*/*" ], [ k.details({
                    formWatcher: {
                        ctr: {
                            query: {
                                css: [ ".app-components-Shopping-SortFilterSection-styles__content--2Zm5F" ]
                            },
                            cb: function(e) {
                                var t;
                                k.setType("avia", e);
                                const r = k.getAllUrlSearchParams();
                                k.setParam("origin", r.f, e), k.setParam("destination", r.t, e), k.setParam("dateStart", r.d, e), 
                                k.setParam("dateEnd", r.r, e), k.setParam("currency", "USD", e);
                                const n = r.px.split(",").map(Number);
                                let a = null;
                                a = n.length > 1 ? n.shift() + n.shift() : n[0];
                                const i = n.reduce((e, t) => e + t, 0);
                                k.setParam("adultTickets", null !== (t = a) && void 0 !== t ? t : 0, e), k.setParam("childTickets", null != i ? i : 0, e);
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: [ ".app-components-Shopping-PriceCard-styles__priceValue--21Ki_ span" ],
                                template: "price"
                            },
                            cb: function(e) {
                                k.setPrice("price", 26, e);
                            }
                        }
                    }
                }) ]), k.addSite("jetblue_com", [ "*://*.jetblue.*/*" ], [ k.details({
                    formWatcher: {
                        ctr: {
                            query: {
                                css: [ ".flex-l.relative.ng-tns-c238-1.ng-star-inserted" ]
                            },
                            cb: function(e) {
                                var t, r;
                                k.setType("avia", e);
                                const n = k.getAllUrlSearchParams();
                                k.setParam("origin", n.from, e), k.setParam("destination", n.to, e), k.setParam("dateStart", n.depart, e), 
                                k.setParam("dateEnd", n.return, e), k.setParam("currency", "USD", e), k.setParam("adultTickets", null !== (t = n.adults) && void 0 !== t ? t : 0, e), 
                                k.setParam("childTickets", null !== (r = n.children) && void 0 !== r ? r : 0, e);
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: [ ".price-text.ng-star-inserted" ],
                                template: "price"
                            },
                            cb: function(e) {
                                k.setPrice("price", 26, e);
                            }
                        }
                    }
                }) ]), k.addSite("123milhas_com", [ "*://*.123milhas.*/*" ], [ k.details({
                    formWatcher: {
                        ctr: {
                            query: {
                                css: [ ".group-selector--to-new-search" ]
                            },
                            cb: function(e) {
                                var t, r;
                                k.setType("avia", e);
                                const n = k.getAllUrlSearchParams();
                                k.setParam("origin", n.de, e), k.setParam("destination", n.para, e), k.setParam("dateStart", k.matchTemplate(n.ida, /(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1"), e), 
                                k.setParam("dateEnd", k.matchTemplate(n.volta, /(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1"), e), 
                                k.setParam("currency", "USD", e), k.setParam("adultTickets", null !== (t = n.adultos) && void 0 !== t ? t : 0, e), 
                                k.setParam("childTickets", null !== (r = parseInt(n.criancas, 10) + parseInt(n.bebes, 10)) && void 0 !== r ? r : 0, e);
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: [ ".theme-text--value-2.ordenation-card__text.theme-text--fake-black.theme-text--pure-white" ],
                                template: "price"
                            },
                            cb: function(e) {
                                k.setPrice("price", 26, e);
                            }
                        }
                    }
                }) ]), k.addSite("britishairways_com", [ "*://*.britishairways.*/*" ], [ k.details({
                    formWatcher: {
                        ctr: {
                            query: {
                                css: [ ".flight-results-wrapper" ]
                            },
                            cb: function(e) {
                                var t, r;
                                k.setType("avia", e);
                                const n = k.getAllUrlSearchParams(), [, a, i, o, s] = /(\w{3})-(\w{3})_(\d{4}-\d{2}-\d{2})(?:,\w{3}-\w{3}_(\d{4}-\d{2}-\d{2}))?/.exec(n.onds);
                                k.setParam("origin", a, e), k.setParam("destination", i, e), k.setParam("dateStart", o, e), 
                                k.setParam("dateEnd", s, e), k.setParam("currency", "USD", e), k.setParam("adultTickets", null !== (t = n.ad) && void 0 !== t ? t : 0, e);
                                const c = null !== (r = parseInt(n.yad, 10) + parseInt(n.ch, 10) + parseInt(n.inf, 10)) && void 0 !== r ? r : 0;
                                k.setParam("childTickets", c, e);
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: [ "span.heading-sm.ng-tns-c69-7.ng-star-inserted" ],
                                template: "price"
                            },
                            cb: function(e) {
                                k.setPrice("price", 26, e);
                            }
                        }
                    }
                }) ]), k.addSite("cheapoair_com", [ "*://*.cheapoair.*/*" ], [ k.details({
                    formWatcher: {
                        ctr: {
                            query: {
                                css: [ ".content-container.col-sm-12.col-lg-9.pr-0.mt-5" ]
                            },
                            cb: function(e) {
                                var t, r;
                                k.setType("avia", e);
                                const n = k.getAllUrlSearchParams();
                                k.setParam("origin", n.d1, e), k.setParam("destination", n.r1, e), k.setParam("dateStart", k.matchTemplate(n.dt1.replaceAll("/", "-"), /(\d{2})-(\d{2})-(\d{4})/, "$3-$1-$2"), e), 
                                k.setParam("dateEnd", k.matchTemplate(n.dt2.replaceAll("/", "-"), /(\d{2})-(\d{2})-(\d{4})/, "$3-$1-$2"), e), 
                                k.setParam("currency", "USD", e);
                                const a = null !== (t = parseInt(n.ad, 10) + parseInt(n.se, 10)) && void 0 !== t ? t : 0;
                                k.setParam("adultTickets", a, e);
                                const i = null !== (r = parseInt(n.ch, 10) + parseInt(n.infs, 10)) && void 0 !== r ? r : 0;
                                k.setParam("childTickets", i, e);
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: [ ".fpamount.fpRoundToFixDecimal" ],
                                template: "price"
                            },
                            cb: function(e) {
                                k.setPrice("price", 26, e);
                            }
                        }
                    }
                }) ]), k.addSite("travelocity_com", [ "*://*.travelocity.com/*", "*://*.travelocity.ca/*", "*://*.orbitz.com/*", "*://*.expedia.*/*", "*://*.expedia-cn.com/*" ], [ k.details({
                    locationCheck: [ /\/Flights-Search/ ],
                    formWatcher: {
                        ctr: {
                            query: {
                                css: "#flightModuleList"
                            },
                            cb: function(e) {
                                const t = k.jsonParse(k.dom("#singlePageModel").text());
                                if (!t) return k.getParamsFromPage({
                                    origin: "IntentMediaProperties.flight_origin",
                                    destination: "IntentMediaProperties.flight_destination",
                                    dateStart: "IntentMediaProperties.travel_date_start",
                                    dateEnd: "IntentMediaProperties.travel_date_end",
                                    currency: "IntentMediaProperties.site_currency",
                                    type: "IntentMediaProperties.product_category",
                                    tripType: "IntentMediaProperties.trip_type"
                                }).then((function(t) {
                                    if ("flights" !== t.type) return void k.pageClear(e);
                                    k.setType("avia", e), k.setParam("origin", t.origin, e), k.setParam("destination", t.destination, e), 
                                    k.setParam("currency", t.currency, e);
                                    const r = k.matchTemplate(t.dateStart, /(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
                                    k.setParam("dateStart", r, e);
                                    let n = null;
                                    "ROUND_TRIP" === t.tripType && (n = k.matchTemplate(t.dateEnd, /(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")), 
                                    k.setParam("dateEnd", n, e);
                                }));
                                k.setType("avia", e), k.setParam("origin", t.departureAirportCode, e), k.setParam("destination", t.arrivalAirportCode, e), 
                                k.setParam("currency", t.currencyCode, e), k.setParam("dateStart", t.departureISODate, e), 
                                t.isOneWay || k.setParam("dateEnd", t.arrivalISODate, e);
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: "#flightModuleList .flight-module.segment .primary-content .full-bold"
                            },
                            template: "price"
                        }
                    }
                }) ]), k.addSite("priceline_com", "*://*.priceline.com/*", [ k.details({
                    locationCheck: [ /\/fly(\/#)?\/search\// ],
                    formWatcher: {
                        ctr: {
                            query: {
                                css: ".fly-search-listings-container"
                            },
                            cb: function(e) {
                                var t, r;
                                const n = k.matchUrl(/\/search\/([^-\/]+)-([^-\/]+)-([^-\/]+)\/(?:([^-\/]+)-([^-\/]+)-([^-\/]+)\/)?/);
                                if (!n) return;
                                k.setType("avia", e);
                                const a = k.array(k.string(n[1]).split(":")).get(0);
                                k.setParam("origin", a, e);
                                const i = k.array(k.string(n[2]).split(":")).get(0);
                                k.setParam("destination", i, e);
                                const o = k.matchTemplate(n[3], /(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
                                k.setParam("dateStart", o, e);
                                const s = k.matchTemplate(n[6], /(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
                                k.setParam("dateEnd", s, e);
                                const c = k.getAllUrlSearchParams();
                                k.setParam("adultTickets", null !== (t = c["num-adults"]) && void 0 !== t ? t : 0, e), 
                                k.setParam("childTickets", null !== (r = c["num-children"]) && void 0 !== r ? r : 0, e), 
                                k.setParam("currency", "USD", e);
                            }
                        }
                    },
                    priceWatcher: {
                        oldPrice: {
                            query: {
                                css: ".fly-itinerary .details .price"
                            },
                            template: "price"
                        },
                        price: {
                            query: {
                                css: ".sc-eCImPb.gJFiwk"
                            },
                            template: "price"
                        }
                    }
                }) ]), k.addSite("aeroflot_ru", "*://*.aeroflot.ru/*", [ k.details({
                    locationCheck: [ /\/app\/.+\/search\?/ ],
                    formWatcher: {
                        change: {
                            query: {
                                css: ".frame__container",
                                is: "removed"
                            },
                            cb: function(e) {
                                k.closeCurrentBar(), k.pageClear(e);
                            }
                        },
                        ctr: {
                            query: {
                                css: ".frame__container"
                            },
                            cb: function(e) {
                                const t = k.parseUrl(), r = k.exec(t.routes, /(\w{3})\.(\d{4}\d{2}\d{2})\.(\w{3})(?:-(\w{3})\.(\d{4}\d{2}\d{2})\.(\w{3}))?/);
                                if (!r) return k.closeCurrentBar(), void k.pageClear(e);
                                const n = r[1], a = r[2], i = r[3], o = r[5];
                                if (o && (i !== r[4] || n !== r[6])) return k.closeCurrentBar(), void k.pageClear(e);
                                k.pageClear(e), k.setType("avia", e), k.setParam("origin", n, e), k.setParam("destination", i, e);
                                const s = k.matchTemplate(a, /(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
                                if (k.setParam("dateStart", s, e), o) {
                                    const t = k.matchTemplate(o, /(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
                                    k.setParam("dateEnd", t, e);
                                }
                                const c = k.dom(".main-module__header__selected-text.main-module__header__selected-text--currency").text();
                                c && k.setParam("currency", c, e);
                            }
                        },
                        ccy: {
                            query: {
                                css: ".main-module__header__selected-text.main-module__header__selected-text--currency",
                                is: "added"
                            },
                            cb: function(e) {
                                const t = k.dom(".main-module__header__selected-text.main-module__header__selected-text--currency").text();
                                t && k.setParam("currency", t, e);
                            }
                        }
                    },
                    priceWatcher: {
                        minPriceOut: {
                            query: {
                                css: ".meta__col--center div > .frame:nth-child(1) .frame__container > div > .flight-search .flight-search__price"
                            },
                            template: "price",
                            key: "minPriceOut"
                        },
                        minPriceIn: {
                            query: {
                                css: ".meta__col--center div > .frame:nth-child(2) .frame__container > div > .flight-search .flight-search__price"
                            },
                            template: "price",
                            key: "minPriceIn"
                        }
                    }
                }) ]), k.addSite("anywayanyday_com", "*://*.anywayanyday.com/*", [ k.details({
                    locationCheck: [ /\/avia\/offers\// ],
                    formWatcher: {
                        ctr: {
                            query: {
                                css: ".offers-tickets-container"
                            },
                            cb: function(e) {
                                const t = k.matchUrl(/\/avia\/offers\/(\d{2})(\d{2})(\w{3})(\w{3})(?:(\d{2})(\d{2})(\w{3})(\w{3}))?/);
                                if (!t) return;
                                k.array(t).shift(), k.setType("avia", e);
                                const r = !t[4];
                                if (!r && (t[2] !== t[7] || t[3] !== t[6])) return void k.error("More one way in URL!", t);
                                k.setParam("origin", t[2], e), k.setParam("destination", t[3], e);
                                const n = k.normalizeDate(null, t[1], t[0]);
                                k.setParam("dateStart", n, e);
                                const a = !r && k.normalizeDate(null, t[5], t[4]);
                                k.setParam("dateEnd", a, e);
                            }
                        },
                        ccy: {
                            query: {
                                css: ".headerSidebar-currencyBlock .dropdown-selected.dropdown-item"
                            },
                            template: "currency"
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: ".offers-tickets-container .fareTickets .b-price"
                            },
                            template: "price"
                        }
                    },
                    onShow: function(e) {
                        k.dom("#app").style("top", e + "px"), k.dom("#app .page-top").style("top", e + "px");
                    },
                    onHide: function() {
                        k.dom("#app").style("top", 0), k.dom("#app .page-top").style("top", 0);
                    }
                }) ]), k.addSite("svyaznoy_travel", "*://*.svyaznoy.travel/*", [ k.details({
                    formWatcher: {
                        ctr: {
                            query: [ {
                                css: ".result._sale .result__price"
                            } ],
                            cb: function(e) {
                                const t = k.dom(".search__way._from .search__abbr").text(), r = k.dom(".search__way._to .search__abbr").text(), n = k.dom(".search__date._from .search__calendar").attr("value"), a = k.dom(".search__date._to .search__calendar").attr("value"), i = k.matchTemplate(n, /(\d{2})\.(\d{2})\.(\d{4})/, "$3-$2-$1"), o = k.matchTemplate(a, /(\d{2})\.(\d{2})\.(\d{4})/, "$3-$2-$1");
                                k.setType("avia", e), k.setParam("origin", t, e), k.setParam("destination", r, e), 
                                k.setParam("dateStart", i, e), k.setParam("dateEnd", o, e), k.dom(".rur").len() && k.setParam("currency", "RUB", e);
                            }
                        },
                        ccy: {
                            query: {
                                css: ".i-icon._rub",
                                is: "added"
                            },
                            cb: function(e, t) {
                                t.added.length && k.setParam("currency", "RUB", e);
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: [ {
                                css: ".result._sale .result__price"
                            } ],
                            template: "price"
                        }
                    }
                }) ]), k.addSite("tickets_ru", "*://avia.tickets.ru/*", [ k.details({
                    locationCheck: [ /\/search\/results/ ],
                    formWatcher: {
                        ctr: {
                            query: {
                                css: ".result_block"
                            },
                            cb: function(e) {
                                return k.getParamsFromPage({
                                    origin: "avia_form_search_params.from_code",
                                    destination: "avia_form_search_params.to_code",
                                    dateStart: "avia_form_search_params.departure_date",
                                    dateEnd: "avia_form_search_params.departure_date1",
                                    fromCode1: "avia_form_search_params.from_code1",
                                    toCode1: "avia_form_search_params.to_code1",
                                    type: "cur_domain_name"
                                }).then((function(t) {
                                    if ("avia" !== t.type) return k.error("Is not avia page!"), void k.pageClear(e);
                                    if (k.setType("avia", e), t.dateEnd && (t.origin !== t.toCode1 || t.destination !== t.fromCode1)) return void k.error("More one way", t);
                                    k.setParam("origin", t.origin, e), k.setParam("destination", t.destination, e);
                                    const r = k.matchTemplate(t.dateStart, /(\d{2})\.(\d{2})\.(\d{4})/, "$3-$2-$1");
                                    k.setParam("dateStart", r, e);
                                    const n = k.matchTemplate(t.dateEnd, /(\d{2})\.(\d{2})\.(\d{4})/, "$3-$2-$1");
                                    k.setParam("dateEnd", n, e);
                                }));
                            }
                        },
                        ccy: {
                            query: {
                                css: ".currency-select_wrapper .chosen-single span"
                            },
                            template: "currency",
                            currencyMap: {
                                RUR: "RUB"
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: "#offers_table .item-block .price-block strong[class]:not(.hidden)"
                            },
                            template: "price"
                        }
                    }
                }) ]), k.addSite("s7_ru", "*://*.s7.ru/*", [ k.details({
                    locationCheck: [ /\/air\?/ ],
                    formWatcher: {
                        ctr: {
                            query: [ {
                                css: "#expandSearchForm"
                            } ],
                            cb: function(e) {
                                k.pageClear(e);
                            }
                        }
                    },
                    priceWatcher: {
                        priceOut: {
                            query: {
                                css: '#exact_outbound_section .select-flights span[data-qa="amount"]'
                            },
                            template: "price",
                            key: "minPriceOut"
                        },
                        priceIn: {
                            query: {
                                css: '#exact_inbound_section .select-flights span[data-qa="amount"]'
                            },
                            template: "price",
                            key: "minPriceIn"
                        },
                        travelWithPriceOut: {
                            query: {
                                css: '#exact_outbound_flight_table .select-tariff span[data-qa="amount"]'
                            },
                            template: "price",
                            key: "minPriceOut"
                        },
                        travelWithPriceIn: {
                            query: {
                                css: '#exact_inbound_flight_table .select-tariff span[data-qa="amount"]'
                            },
                            template: "price",
                            key: "minPriceIn"
                        }
                    },
                    onShow: function(e) {
                        k.dom("body").style("marginTop", e + "px");
                    },
                    onHide: function() {
                        k.dom("body").style("marginTop", 0);
                    }
                }) ]), k.addSite("kupibilet_ru", "*://*.kupibilet.ru/*", [ k.details({
                    formWatcher: {
                        ctr: {
                            query: [ {
                                css: 'div[class^="styled__SearchWrapper-"]'
                            } ],
                            cb: function(e) {
                                const t = k.matchUrl(/\/search\/(?:\w\d{3})(\d{2})(\w{3})(\w{3})(\w{3})(?:(\d{2})(\w{3})(\w{3})?)?/);
                                if (!t) return;
                                if (k.array(t).shift(), t[6]) return void k.error("More two way!", t);
                                const r = !t[4];
                                k.setType("avia", e), k.setParam("origin", t[2], e), k.setParam("destination", t[3], e);
                                const n = {
                                    JAN: 1,
                                    FEB: 2,
                                    MAR: 3,
                                    APR: 4,
                                    MAY: 5,
                                    JUN: 6,
                                    JUL: 7,
                                    AUG: 8,
                                    SEP: 9,
                                    OCT: 10,
                                    NOV: 11,
                                    DEC: 12
                                }, a = k.normalizeDate(null, t[1], t[0], {
                                    monthMap: n
                                });
                                k.setParam("dateStart", a, e);
                                const i = !r && k.normalizeDate(null, t[5], t[4], {
                                    monthMap: n
                                });
                                k.setParam("dateEnd", i, e);
                            }
                        },
                        ccy: {
                            query: {
                                css: 'div[class^="styled__TicketContainer-"] span[class^="styled__StyledButtonText-sc-"]',
                                is: "added"
                            },
                            cb: function(e, t) {
                                k.array(t.added).some((function(t) {
                                    if (k.test(t.textContent, /₽/)) return k.setParam("currency", "RUB", e), !0;
                                }));
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: 'div[class^="styled__TicketContainer-"] span[class^="styled__StyledButtonText-sc-"] span:last-child',
                                is: "added"
                            },
                            template: "price"
                        }
                    },
                    bodySelector: "#app",
                    onCreateBar: function(e) {
                        k.runFn([ e ], 'function(a){const b=a.body.node;if(b){const c=a.wDom.get(b);c.setStyle("position","")}const c=b.querySelector("a[href=\\"#close\\"]");if(c){const b=a.wDom.get(c);b.removeAttribute("href")}const d=b.querySelector("[href*=\\"hydra.aviasales\\"]");if(d){const b=a.wDom.get(d);b.removeAttribute("href")}}');
                    }
                }) ]), k.addSite("trip_ru", "*://*.trip.ru/*", [ k.details({
                    locationCheck: [ /\/choose-your-flight/ ],
                    formWatcher: {
                        ctr: {
                            query: {
                                css: "#airResultContent"
                            },
                            cb: function(e) {
                                return k.getParamsFromPage({
                                    dataLayer: "dataLayer",
                                    origin: "from_airport_iataCode__2",
                                    destination: "to_airport_iataCode__2",
                                    startDate: "startDate",
                                    endDate: "endDate"
                                }).then((function(t) {
                                    let r = null;
                                    k.array(t.dataLayer).some((function(e) {
                                        if (e.startDate && e.originCityCode && e.cityCode) return r = e, !0;
                                    })), r ? (k.setType("avia", e), k.setParam("origin", r.originCityCode, e), k.setParam("destination", r.cityCode, e), 
                                    k.setParam("dateStart", r.startDate, e), k.setParam("dateEnd", r.endDate, e), k.setParam("currency", r.siteCurrency, e)) : k.error("dataLayer is not found");
                                }));
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: ".tripItemTable .tripItemPricePerPersonValue"
                            },
                            template: "price"
                        }
                    }
                }) ]), k.addSite("trip_com", "*://*.trip.com/*", [ k.details({
                    locationCheck: [ /\/flights\/[^\/]+\/tickets-.+/ ],
                    formWatcher: {
                        ctr: {
                            query: {
                                css: ".m-main-list .m-result-list"
                            },
                            cb: function(e) {
                                const t = k.parseUrl();
                                k.setType("avia", e);
                                const r = t.flighttype;
                                if ("rt" === r || "d" === r || "s" === r || "ow" === r) {
                                    const n = k.string(t.dcity).toUpperCase().end();
                                    k.setParam("origin", n, e);
                                    const a = k.string(t.acity).toUpperCase().end();
                                    k.setParam("destination", a, e);
                                    let i = null;
                                    if ("rt" === r || "d" === r) {
                                        i = t.ddate || t.startdate, k.setParam("dateStart", i, e);
                                        const r = t.rdate || t.returndate;
                                        k.setParam("dateEnd", r, e);
                                    } else i = t.ddate || t.startdate;
                                    k.setParam("dateStart", i, e);
                                    const o = k.dom(".mc-hd__currency .mc-hd__dropdown-cur").text();
                                    o && k.setParam("currency", o, e);
                                } else k.pageClear(e), k.closeCurrentBar();
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: ".m-main-list .m-result-list .result-item .o-price-flight"
                            },
                            template: "price"
                        }
                    }
                }) ]), k.addSite("ctrip_com", "*://*.ctrip.com/*", [ k.details({
                    locationCheck: [ /flights\.ctrip\.com\/itinerary\// ],
                    formWatcher: {
                        ctr: {
                            query: {
                                css: ".searchresult_content .cabinV2"
                            },
                            cb: function(e) {
                                k.pageClear(e);
                                const t = k.exec(k.getUrl(), /\/itinerary\/(roundtrip|oneway)\/(\w{3})-(\w{3})/);
                                if (!t) return k.closeCurrentBar(), void k.error("Match url error");
                                const r = t[1], n = k.string(t[2]).toUpperCase().end(), a = k.string(t[3]).toUpperCase().end(), i = k.parseUrl(), o = k.string(i.date).split(","), s = k.array(o).get(0), c = k.array(o).get(1);
                                k.setType("avia", e), k.setParam("origin", n, e), k.setParam("destination", a, e), 
                                k.setParam("dateStart", s, e), "roundtrip" === r && k.setParam("dateEnd", c, e), 
                                k.setParam("currency", "CNY", e);
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: ".searchresult_content .search_box .price .base_price02"
                            },
                            template: "price"
                        }
                    }
                }), k.details({
                    locationCheck: [ /flights\.ctrip\.com\/international\// ],
                    formWatcher: {
                        ctr: {
                            query: {
                                css: ".result-wrapper .flight-list"
                            },
                            cb: function(e) {
                                return k.getParamsFromPage({
                                    flightSegments: "GlobalSearchCriteria.flightSegments",
                                    flightWayEnum: "GlobalSearchCriteria.flightWayEnum"
                                }).then((function(t) {
                                    if (!t.flightSegments || k.array(t.flightSegments).len() < 1 || k.array(t.flightSegments).len() > 2) return k.error("flightSegments problems"), 
                                    k.pageClear(e), void k.closeCurrentBar();
                                    const r = k.array(t.flightSegments).get(0), n = k.array(t.flightSegments).get(1);
                                    if (r && n && (r.departureCityCode !== n.arrivalCityCode || n.departureCityCode !== r.arrivalCityCode)) return k.error("departureCityCode and arrivalCityCode is not same"), 
                                    k.pageClear(e), void k.closeCurrentBar();
                                    k.setType("avia", e);
                                    const a = r.departureCityCode;
                                    k.setParam("origin", a, e);
                                    const i = r.arrivalCityCode;
                                    k.setParam("destination", i, e);
                                    const o = r.departureDate;
                                    if (k.setParam("dateStart", o, e), n) {
                                        const t = n.departureDate;
                                        k.setParam("dateEnd", t, e);
                                    }
                                    k.setParam("currency", "CNY", e);
                                }));
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: ".result-wrapper .flight-list .flight-item .price"
                            },
                            template: "price"
                        }
                    }
                }) ]), k.addSite("sindbad_ru", "*://*.sindbad.ru/*", [ k.details({
                    formWatcher: {
                        ctr: {
                            query: [ {
                                css: ".trips"
                            }, {
                                css: ".wait_loop"
                            } ],
                            cb: function(e) {
                                return k.getParamsFromPage({
                                    origin: "App.searchModel.attributes.request.src",
                                    destination: "App.searchModel.attributes.request.dst",
                                    dateStart: "App.searchModel.attributes.request.date_out",
                                    dateEnd: "App.searchModel.attributes.request.date_in"
                                }).then((function(t) {
                                    k.setType("avia", e), k.setParam("origin", t.origin, e), k.setParam("destination", t.destination, e), 
                                    k.setParam("dateStart", t.dateStart, e), k.setParam("dateEnd", t.dateEnd, e), k.dom(".ruble").len() && k.setParam("currency", "RUB", e);
                                }));
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: ".trips .trip-worth .trip-worth__price",
                                is: "added"
                            },
                            template: "price"
                        }
                    }
                }) ]), k.addSite("aviakassa_ru", [ "*://*.aviakassa.ru/*", "*://*.aviakassa.com/*" ], [ k.details({
                    formWatcher: {
                        ctr: {
                            query: [ {
                                css: ".AviaResultList__Groups"
                            } ],
                            cb: function(e) {
                                const t = k.getUrl(), r = k.test(t, /\/avia\/results\//), n = k.exec(t, /(RT|OW)\w\d+(\w{3})(\w{3})(\d{4})(\d{2})(\d{2})(?:(\w{3})(\w{3})(\d{4})(\d{2})(\d{2}))?/);
                                if (!r || !n) return k.pageClear(e), void k.closeCurrentBar();
                                k.array(n).shift();
                                const a = n[1], i = n[2];
                                if ("RT" === n[0] && (a !== n[7] || i !== n[6])) return k.pageClear(e), void k.closeCurrentBar();
                                const o = k.array([ n[3], n[4], n[5] ]).join("-");
                                let s = null;
                                n[8] && n[9] && n[10] && (s = k.array([ n[8], n[9], n[10] ]).join("-")), k.setType("avia", e), 
                                k.setParam("origin", a, e), k.setParam("destination", i, e), k.setParam("dateStart", o, e), 
                                k.setParam("dateEnd", s, e);
                            }
                        },
                        ccy: {
                            query: {
                                css: ".AviaResultList__Groups .Card .Price__Value"
                            },
                            cb: function(e) {
                                k.dom(".Price__Value").some((function(t) {
                                    const r = t.parentNode;
                                    if (!r) return;
                                    const n = k.dom(r).text();
                                    return k.test(n, /руб/) || k.test(n, /RUR/) ? (k.setParam("currency", "RUB", e), 
                                    !0) : void 0;
                                }));
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: ".AviaResultList__Groups .Card .Price__Value"
                            },
                            template: "price"
                        }
                    }
                }) ]), k.addSite("biletix_ru", "*://*.biletix.ru/*", [ k.details({
                    formWatcher: {
                        ctr: {
                            query: [ {
                                css: ".flights"
                            }, {
                                css: ".progress-ajax-border"
                            } ],
                            cb: function(e) {
                                return k.getParamsFromPage({
                                    origin: "xcnt_transport_from",
                                    destination: "xcnt_transport_to",
                                    dateStart: "xcnt_transport_depart_date",
                                    dateEnd: "xcnt_transport_return_date",
                                    type: "APRT_DATA.searchTickets.type"
                                }).then((function(t) {
                                    if ("avia" !== t.type) return void k.pageClear(e);
                                    k.setType("avia", e), k.setParam("origin", t.origin, e), k.setParam("destination", t.destination, e);
                                    const r = k.matchTemplate(t.dateStart, /(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
                                    k.setParam("dateStart", r, e);
                                    const n = k.matchTemplate(t.dateEnd, /(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
                                    k.setParam("dateEnd", n, e);
                                    let a = k.dom('#currency_form .selected input[name="currency"]').value();
                                    "RUR" === a && (a = "RUB"), k.setParam("currency", a, e);
                                }));
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: ".offers .offer .price .caption"
                            },
                            template: "price"
                        }
                    }
                }) ]), k.addSite("utair_ru", "*://*.utair.ru/*", [ k.details({
                    formWatcher: {
                        ctr: {
                            query: [ {
                                css: ".FlightRow-Cell"
                            } ],
                            cb: function(e) {
                                const t = k.matchUrl(/\/booking\/search\/!\/(\w{3})\/(\w{3})\/(\d{2}.\d{2}.\d{4})\+?(\d{2}.\d{2}.\d{4})?/);
                                if (!t) return k.closeCurrentBar(), void k.pageClear(e);
                                const r = t[1], n = t[2];
                                if (!r || !n) return k.error("Origin or destination is empty"), k.pageClear(e);
                                let a = t[3], i = t[4];
                                a && (a = k.matchTemplate(a, /(\d{2}).(\d{2}).(\d{4})/, "$3-$2-$1")), i && (i = k.matchTemplate(i, /(\d{2}).(\d{2}).(\d{4})/, "$3-$2-$1")), 
                                k.setType("avia", e), k.setParam("origin", r, e), k.setParam("destination", n, e), 
                                k.setParam("dateStart", a, e), k.setParam("dateEnd", i, e), k.setParam("currency", "RUB", e);
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: [ {
                                css: ".OfferControlBody-Text_style_link",
                                is: "added"
                            }, {
                                css: ".OfferControlBody-Text_style_selected",
                                is: "added"
                            } ],
                            template: "price"
                        }
                    }
                }) ]), k.addSite("tripadvisor_ru", "*://*.tripadvisor.ru/*", [ k.details({
                    locationCheck: [ /\/CheapFlightsSearchResults/ ],
                    formWatcher: {
                        ctr: {
                            query: [ {
                                css: "#MAIN .ui_column div:not([class]):not([id])"
                            } ],
                            cb: function(e) {
                                const t = k.parseUrl(), r = k.matchUrl(/airport0\.(\w{3}).*airport1\.(\w{3}).*date0\.(\d{8})(?:.*date1\.(\d{8}))?/) || [];
                                if (!t) return k.closeCurrentBar(), void k.pageClear(e);
                                const n = t.airport0 || r[1], a = t.airport1 || r[2];
                                if (!n || !a) return k.error("Origin or destination is empty"), k.pageClear(e);
                                let i = t.date0 || r[3], o = t.date1 || r[4];
                                i && (i = k.matchTemplate(i, /(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")), o && (o = k.matchTemplate(o, /(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")), 
                                k.setType("avia", e), k.setParam("origin", n, e), k.setParam("destination", a, e), 
                                k.setParam("dateStart", i, e), o && k.setParam("dateEnd", o, e);
                            }
                        },
                        ccy: {
                            query: {
                                css: "#MAIN .ui_column div:not([class]):not([id])",
                                is: "added"
                            },
                            cb: function(e) {
                                const t = k.dom('footer [role="button"]').text();
                                k.setParam("currency", k.findCurrency(t), e);
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: [ {
                                css: 'div > div[style^="width"]',
                                is: "removed"
                            } ],
                            cb: function(e) {
                                k.dom("#MAIN .ui_column:not(#leftRailFilter)").findAll('div[class=""]:first-child>div>div>div:last-child>div>div:first-child').forEach(t => {
                                    const r = k.preparePrice(k.dom(t).text());
                                    k.setPrice("price", r, e);
                                });
                            }
                        }
                    }
                }) ]), k.addSite("airasia_com", "*://*.airasia.com/*", [ k.details({
                    locationCheck: [ /airasia\.com\/select\// ],
                    formWatcher: {
                        ctr: {
                            query: {
                                css: ".booking-summary-content .amount-text"
                            },
                            cb: function(e) {
                                const t = k.matchUrl(/\/select\/[^\/]+\/[^\/]+\/([A-Z]{3})\/([A-Z]{3})\/(\d{4}-\d{2}-\d{2})\/(?:(\d{4}-\d{2}-\d{2})|N)\/\d\/\d\/\d\/[A-Z]\/[A-Z]\/([A-Z]{3})\/[A-Z]+/);
                                if (!t) return k.closeCurrentBar(), void k.pageClear(e);
                                k.setType("avia", e);
                                const r = t[1], n = t[2], a = t[3], i = t[4], o = t[5];
                                k.setParam("origin", r, e), k.setParam("destination", n, e), k.setParam("dateStart", a, e), 
                                k.setParam("dateEnd", i, e), k.setParam("currency", o, e);
                            }
                        }
                    },
                    priceWatcher: {
                        minPriceOut: {
                            query: {
                                css: "#flight-0 .airasia-flight-schedule .fare-amount"
                            },
                            template: "price",
                            key: "minPriceOut"
                        },
                        minPriceIn: {
                            query: {
                                css: "#flight-1 .airasia-flight-schedule .fare-amount"
                            },
                            template: "price",
                            key: "minPriceIn"
                        }
                    }
                }), k.details({
                    locationCheck: [ /flybeyond\.airasia\.com/ ],
                    formWatcher: {
                        ctr: {
                            query: {
                                css: ".transition-results"
                            },
                            cb: function(e) {
                                return k.getParamsFromPage({
                                    currency: "__INITIAL_STATE__.staticData.languageInfo.currency",
                                    searchForm: {
                                        path: "window.eval",
                                        args: [ 'var node = document.querySelector("div[class^=FormWrapperstyled__SearchFormContainer]");var key = Object.keys(node).filter(v=>v.indexOf("__reactInternalInstance") === 0)[0];var item = node[key].child.pendingProps.children.find(function (child) { return child.props.searchForm });var result = Object.assign({}, item.props.searchForm);var formatDate = function(date) {return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(function(i) {return (i < 10 ? "0" : "") + i; }).join("-")};result.outboundDate = {from: formatDate(result.outboundDate.from)};result.inboundDate.to && (result.inboundDate = {to: formatDate(result.inboundDate.to)});result;' ]
                                    }
                                }).then(t => {
                                    const r = k.string(t.currency).toUpperCase().end(), n = t.searchForm;
                                    if (!n) return;
                                    let a = null;
                                    n.outboundDate && (a = n.outboundDate.from);
                                    let i = null;
                                    n.inboundDate && (i = n.inboundDate.to);
                                    let o = null;
                                    if (n.origin && n.origin.places && 1 === n.origin.places.length) {
                                        const e = k.array(n.origin.places).get(0);
                                        e.value && (o = e.value.code);
                                    }
                                    let s = null;
                                    if (n.destination && n.destination.places && 1 === n.destination.places.length) {
                                        const e = k.array(n.destination.places).get(0);
                                        e.value && (s = e.value.code);
                                    }
                                    k.setType("avia", e), k.setParam("origin", o, e), k.setParam("destination", s, e), 
                                    k.setParam("dateStart", a, e), i && k.setParam("dateEnd", i, e), k.setParam("currency", r, e);
                                });
                            }
                        }
                    },
                    priceWatcher: {
                        minPriceOut: {
                            query: {
                                css: '.transition-results div[class^="ResultCardstyled__ResultCardActionsPriceMeta"] span[class*="length-"]'
                            },
                            template: "price"
                        }
                    }
                }) ]), k.addSite("ryanair_com", "*://*.ryanair.com/*", [ k.details({
                    formWatcher: {
                        changePage: {
                            query: {
                                css: ".flight-list",
                                is: "removed"
                            },
                            cb: function(e) {
                                k.log("page change!"), k.closeCurrentBar(), k.pageClear(e);
                            }
                        },
                        ctr: {
                            query: {
                                css: "journey flight-list"
                            },
                            cb: function(e) {
                                const t = k.parseUrl();
                                k.setType("avia", e), k.setParam("origin", t.originIata, e), k.setParam("destination", t.destinationIata, e), 
                                k.setParam("dateStart", t.dateOut, e), k.setParam("dateEnd", t.dateIn, e), k.setParam("extra.ref", k.getUrl(), e);
                                const r = k.string(k.dom(".price__symbol").text()).trim().end(), n = k.findCurrency(r);
                                k.setParam("currency", n, e);
                            }
                        }
                    },
                    priceWatcher: {
                        minPriceOut: {
                            query: {
                                css: "journey-container[outbound] flight-card .price-value"
                            },
                            template: "price",
                            key: "minPriceOut"
                        },
                        minPriceIn: {
                            query: {
                                css: "journey-container[inbound] flight-card .price-value"
                            },
                            template: "price",
                            key: "minPriceIn"
                        }
                    }
                }) ]), k.addSite("wizzair_com", "*://*.wizzair.com/*", [ k.details({
                    formWatcher: {
                        ctr: {
                            query: {
                                css: "#booking-flow-step-select-flight",
                                is: "added"
                            },
                            cb: function(e) {
                                k.setType("avia", e);
                                const t = k.matchUrl(/\/booking\/select-flight\/([A-Z]{3})\/([A-Z]{3})\/(\d{4}-\d{2}-\d{2})\/(\d{4}-\d{2}-\d{2}|null)\/(\d+)\/(\d+)\/(\d+)/);
                                if (t) {
                                    k.setParam("origin", t[1], e), k.setParam("destination", t[2], e), k.setParam("dateStart", t[3], e);
                                    let r = t[4];
                                    "null" === r && (r = null), k.setParam("dateEnd", r, e);
                                }
                            }
                        },
                        ccy: {
                            query: {
                                css: ".flight-select__flight-date-picker__day__price",
                                is: "added"
                            },
                            cb: function(e, t) {
                                let r = null;
                                k.array(t.added).some((function(e) {
                                    return r = k.findCurrency(e.textContent), r;
                                })), r && k.setParam("currency", r, e);
                            }
                        },
                        changePage: {
                            query: {
                                css: "#booking-flow-step-select-flight",
                                is: "removed"
                            },
                            cb: function(e) {
                                k.log("page change!"), k.closeCurrentBar(), k.pageClear(e);
                            }
                        }
                    },
                    priceWatcher: {
                        priceOut: {
                            query: {
                                css: "#outbound-fare-selector .fare-type-button__title"
                            },
                            template: "price",
                            key: "minPriceOut"
                        },
                        priceIn: {
                            query: {
                                css: "#return-fare-selector .fare-type-button__title"
                            },
                            template: "price",
                            key: "minPriceIn"
                        }
                    },
                    onShow: function(e) {
                        k.dom("aside.booking-flow__itinerary").style("top", e + "px"), k.dom("div.booking-flow__sticky-header").style("top", e + "px");
                    },
                    onHide: function() {
                        k.dom("aside.booking-flow__itinerary").style("top", 0), k.dom("div.booking-flow__sticky-header").style("top", 0);
                    }
                }) ]), k.addSite("emirates_com", "*://*.emirates.com/*", [ k.details({
                    locationCheck: [ /\/SelectPrice\.aspx/ ],
                    formWatcher: {
                        ctr: {
                            query: {
                                css: "#ctl00_c_dvOBBResult"
                            },
                            cb: function(e) {
                                return k.setType("avia", e), k.getParamsFromPage({
                                    dataLayer: "dataLayer",
                                    dateStart: "flightDateOutIBE",
                                    dateEnd: "flightDateBackIBE"
                                }).then((function(t) {
                                    let r = null;
                                    if (k.array(t.dataLayer).some((function(e) {
                                        if (e.flightRoute) return r = e, !0;
                                    })), r) {
                                        if (k.array(k.string(r.flightRoute).split("-")).len() > 3) return;
                                        let n = t.dateEnd;
                                        t.dateStart === n && (n = null), k.setParam("origin", r.originSearchIBE, e), k.setParam("destination", r.destinationSearchIBE, e), 
                                        k.setParam("dateStart", t.dateStart || r.flightDepartureDate, e), k.setParam("dateEnd", n || r.flightReturnDate, e), 
                                        k.setParam("currency", r.posCurrencyCode, e);
                                    }
                                }));
                            }
                        }
                    },
                    priceWatcher: {
                        minPriceOut: {
                            query: {
                                css: ".ts-fbr-flight-list.outbound-list .flights-row .ts-fbr-option__price-detail .ts-fbr-option__price[data-from]"
                            },
                            template: "price",
                            key: "minPriceOut"
                        },
                        minPriceIn: {
                            query: {
                                css: ".ts-fbr-flight-list.inbound-list .flights-row .ts-fbr-option__price-detail .ts-fbr-option__price[data-from]"
                            },
                            template: "price",
                            key: "minPriceIn"
                        }
                    }
                }) ]), k.addSite("delta_com", "*://*.delta.com/*", [ k.details({
                    locationCheck: [ /\/flight-search\/search-results/ ],
                    formWatcher: {
                        ctr: {
                            query: {
                                css: ".flightResultTable"
                            },
                            cb: function(e) {
                                return k.setType("avia", e), k.getParamsFromPage({
                                    segments: "delta.shoppingLite.searchCriteria.request.segments",
                                    tripType: "delta.shoppingLite.searchCriteria.request.tripType",
                                    shopType: "delta.shoppingLite.searchCriteria.request.shopType",
                                    pageName: "delta.shoppingLite.searchCriteria.request.pageName",
                                    currencyCode: "delta.shoppingLite.currencyCode"
                                }).then((function(t) {
                                    if ("FLIGHT_SEARCH" !== t.pageName) return k.log("Unsupported pageName"), void k.closeCurrentBar();
                                    if ("MONEY" !== t.shopType) return k.log("Unsupported shopType"), void k.closeCurrentBar();
                                    if (-1 === k.array([ "ROUND_TRIP", "ONE_WAY" ]).indexOf(t.tripType)) return k.log("Unsupported tripType"), 
                                    void k.closeCurrentBar();
                                    const r = t.segments[0];
                                    r && (k.setParam("origin", r.origin, e), k.setParam("destination", r.destination, e), 
                                    k.setParam("dateStart", r.departureDate, e), k.setParam("dateEnd", r.returnDate, e)), 
                                    k.setParam("currency", t.currencyCode, e);
                                }));
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: ".flightResultTableHolder .flightResultTable .priceHolder"
                            },
                            template: "price"
                        }
                    }
                }), k.details({
                    locationCheck: [ /\/flight-search-2\/search-results/, /\/flight-search-2\/search-shop/ ],
                    formWatcher: {
                        ctr: {
                            query: {
                                css: ".flightcardtable"
                            },
                            cb: function(e) {
                                return k.setType("avia", e), k.waitUntil((function() {
                                    return k.getParamsFromPage({
                                        pageName: "idp.shoppingLite.searchCriteria.request.pageName"
                                    }).then(e => "FLIGHT_SEARCH" === e.pageName);
                                })).then(() => k.getParamsFromPage({
                                    segments: "idp.shoppingLite.searchCriteria.request.segments",
                                    tripType: "idp.shoppingLite.searchCriteria.request.tripType",
                                    shopType: "idp.shoppingLite.searchCriteria.request.shopType",
                                    pageName: "idp.shoppingLite.searchCriteria.request.pageName",
                                    currencyCode: "idp.shoppingLite.currencyCode"
                                }).then((function(t) {
                                    if ("FLIGHT_SEARCH" !== t.pageName) return k.log("Unsupported pageName"), void k.closeCurrentBar();
                                    if ("MONEY" !== t.shopType) return k.log("Unsupported shopType"), void k.closeCurrentBar();
                                    if (-1 === k.array([ "ROUND_TRIP", "ONE_WAY" ]).indexOf(t.tripType)) return k.log("Unsupported tripType"), 
                                    void k.closeCurrentBar();
                                    const r = t.segments[0];
                                    r && (k.setParam("origin", r.origin, e), k.setParam("destination", r.destination, e), 
                                    k.setParam("dateStart", r.departureDate, e), k.setParam("dateEnd", r.returnDate, e)), 
                                    k.setParam("currency", t.currencyCode, e);
                                })));
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: ".flightcardContainer .farecellitem .farecellinkcontainer"
                            },
                            template: "price"
                        }
                    }
                }) ]), k.addSite("etihad_com", "*://booking.etihad.com/*", [ k.details({
                    locationCheck: [ /\/webqtrip\.html/ ],
                    formWatcher: {
                        ctr: {
                            query: {
                                css: ".flight-list .flc-table"
                            },
                            cb: function(e) {
                                return k.setType("avia", e), k.getParamsFromPage({
                                    journey: "digitalData.flightSearchData.airSearchCriteria.journey",
                                    itineraryAirportPairs: "digitalData.flightSearchData.airSearchCriteria.itineraryAirportPairs"
                                }).then((function(t) {
                                    if (!t.itineraryAirportPairs || k.array(t.itineraryAirportPairs).len() < 1 || k.array(t.itineraryAirportPairs).len() > 2) return k.closeCurrentBar(), 
                                    void k.pageClear(e);
                                    const r = k.array(t.itineraryAirportPairs).get(0), n = k.array(t.itineraryAirportPairs).get(1);
                                    if (r && n && (r.arrivalCode !== n.departureCode || n.arrivalCode !== r.departureCode)) return k.pageClear(e), 
                                    void k.closeCurrentBar();
                                    let a;
                                    k.setType("avia", e);
                                    const i = r.arrivalCode, o = r.departureCode, s = k.matchTemplate(r.date, /(\d{4})\/(\d{2})\/(\d{2})/, "$1-$2-$3");
                                    n && (a = k.matchTemplate(n.date, /(\d{4})\/(\d{2})\/(\d{2})/, "$1-$2-$3"));
                                    const c = k.dom("#dtcontainer-bundled .flc-table .prices-currency").text();
                                    k.setParam("origin", i, e), k.setParam("destination", o, e), k.setParam("dateStart", s, e), 
                                    k.setParam("dateEnd", a, e), k.setParam("currency", c, e);
                                }));
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: ".flight-list .flc-table .prices-amount"
                            },
                            template: "price"
                        }
                    }
                }) ]), k.addSite("tutu_ru", "*://*.tutu.ru/*", [ k.details({
                    locationCheck: [ /avia\.tutu\.ru\/offers\// ],
                    formWatcher: {
                        clearPage: {
                            query: {
                                css: ".l-result_list",
                                is: "removed"
                            },
                            cb: function(e) {
                                k.closeCurrentBar(), k.pageClear(e);
                            }
                        },
                        ctr: {
                            query: {
                                css: ".l-result_list"
                            },
                            cb: function(e) {
                                return k.setType("avia", e), k.getParamsFromPage({
                                    from: "params.page.searchData.from",
                                    to: "params.page.searchData.to",
                                    date: "params.page.searchData.date",
                                    currency: "exchangeParams.currency"
                                }).then((function(t) {
                                    if (!t.date || k.array(t.date).len() < 1 || k.array(t.date).len() > 2) return k.log("Unsupported tripType"), 
                                    k.closeCurrentBar(), void k.pageClear(e);
                                    const r = k.array(t.from).get(0), n = k.array(t.from).get(1), a = k.array(t.to).get(0), i = k.array(t.to).get(1);
                                    if (r && a && n && i && (r.code !== i.code || n.code !== a.code)) return k.pageClear(e), 
                                    void k.closeCurrentBar();
                                    const o = r.code, s = a.code;
                                    let c = k.array(t.date).get(0);
                                    c = k.matchTemplate(c, /(\d{2})\.(\d{2})\.(\d{4})/, "$3-$2-$1");
                                    let l = k.array(t.date).get(1);
                                    l = k.matchTemplate(l, /(\d{2})\.(\d{2})\.(\d{4})/, "$3-$2-$1"), k.setParam("origin", o, e), 
                                    k.setParam("destination", s, e), k.setParam("dateStart", c, e), k.setParam("dateEnd", l, e), 
                                    k.setParam("currency", t.currency, e);
                                }));
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: {
                                css: ".l-result_list .rm-rzlt_block .rzlt_bott .rm-title"
                            },
                            template: "price"
                        }
                    },
                    bodySelector: ".l-wrapper",
                    onAddStyle: function(e, t) {
                        e.layer && k.object(e.layer).prop("zIndex", "2147483645"), e.body && k.object(e.body).prop("zIndex", "2147483645");
                    }
                }) ]), k.addSite("uralairlines_ru", "*://*.uralairlines.ru/*", [ k.details({
                    locationCheck: [ /book\.uralairlines\.ru\// ],
                    formWatcher: {
                        ctr: {
                            query: {
                                css: ".flight-select-container #flight-to"
                            },
                            cb: function(e) {
                                return k.setType("avia", e), k.getParamsFromPage({
                                    flightModelJson: "sessionStorage.vuejs__booking:flight-model",
                                    currentCurrencyJson: "sessionStorage.vuejs__config:currentCurrency"
                                }).then((function(t) {
                                    let r = null, n = null;
                                    const a = k.jsonParse(t.flightModelJson), i = k.jsonParse(t.currentCurrencyJson);
                                    if (a && i && (n = a.value, r = i.value), !n || !n.to || !n.from) return k.closeCurrentBar(), 
                                    void k.pageClear(e);
                                    const o = n.to.departure, s = n.to.arrival;
                                    let c = n.to.selectedDate;
                                    c = k.matchTemplate(c, /^(\d{4})-(\d{2})-(\d{2})/, "$1-$2-$3");
                                    let l = n.from.selectedDate;
                                    l && (l = k.matchTemplate(l, /^(\d{4})-(\d{2})-(\d{2})/, "$1-$2-$3")), k.setParam("origin", o, e), 
                                    k.setParam("destination", s, e), k.setParam("dateStart", c, e), k.setParam("dateEnd", l, e), 
                                    k.setParam("currency", r, e);
                                }));
                            }
                        }
                    },
                    priceWatcher: {
                        priceTo: {
                            query: {
                                css: ".flight-select-container #flight-to ~ .flights-list-container .flight .price"
                            },
                            template: "price",
                            key: "minPriceOut"
                        },
                        priceFrom: {
                            query: {
                                css: ".flight-select-container #flight-from ~ .flights-list-container .flight .price"
                            },
                            template: "price",
                            key: "minPriceIn"
                        }
                    }
                }) ]), k.addSite("flyredwings_com", "*://*.flyredwings.com/*", [ k.details({
                    locationCheck: [ /avia\.flyredwings\.com\/avia\/result\// ],
                    formWatcher: {
                        ctr: {
                            query: [ {
                                css: ".results .results-flight"
                            }, {
                                css: ".results-flight-new"
                            } ],
                            cb: function(e) {
                                return k.setType("avia", e), k.getParamsFromPage({
                                    results: {
                                        path: "window.eval",
                                        args: [ 'var node = document.querySelector(".results");var key = Object.keys(node).filter(v=>v.indexOf("__reactInternalInstance") === 0)[0];var result = node[key].return.pendingProps;result;' ]
                                    }
                                }).then(t => {
                                    const r = t.results;
                                    if (!r) return k.error("results is empty"), k.pageClear(e), void k.closeCurrentBar();
                                    let n = null, a = null, i = null, o = null, s = r.searchSegment;
                                    s && (n = s.departure, a = s.arrival, i = k.matchTemplate(s.departureDate, /(\d{4})-(\d{2})-(\d{2})/, "$1-$2-$3"), 
                                    s.returnDate && (o = k.matchTemplate(s.returnDate, /(\d{4})-(\d{2})-(\d{2})/, "$1-$2-$3")));
                                    let c = null;
                                    r.variants && k.array(r.variants).some(e => {
                                        if (e.total_price) return c = e.total_price.currency, !0;
                                    }), k.setParam("origin", n, e), k.setParam("destination", a, e), k.setParam("dateStart", i, e), 
                                    k.setParam("dateEnd", o, e), k.setParam("currency", c, e);
                                });
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: [ {
                                css: ".results__flight-thither .card .results-brands-button__price .price"
                            }, {
                                css: ".price.price--bold.results-flight-info__price-value"
                            } ],
                            template: "price"
                        }
                    }
                }) ]), k.addSite("airastana_com", "*://*.airastana.com/*", [ k.details({
                    locationCheck: [ /booking\.airastana\.com\// ],
                    formWatcher: {
                        ctr: {
                            query: [ {
                                css: "#tpl3_bound0-bound-table"
                            }, {
                                css: "#tpl3_calendar-matrix"
                            }, {
                                css: "#tpl4_calendar-matrix"
                            }, {
                                css: "#table-bound0-cell00-available-content .cell-reco-bestprice-integer"
                            } ],
                            cb: function(e) {
                                return k.getParamsFromPage({
                                    city_search_out: "eBaDataLayer.city_search_out",
                                    city_search_in: "eBaDataLayer.city_search_in",
                                    date_search_out: "eBaDataLayer.date_search_out",
                                    date_search_in: "eBaDataLayer.date_search_in",
                                    currency: "eBaDataLayer.currency"
                                }).then((function(t) {
                                    const r = t.city_search_out, n = t.city_search_in, a = k.matchTemplate(t.date_search_out, /(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1");
                                    let i = null;
                                    t.date_search_in && (i = k.matchTemplate(t.date_search_in, /(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1"));
                                    const o = t.currency;
                                    k.setType("avia", e), k.setParam("origin", r, e), k.setParam("destination", n, e), 
                                    k.setParam("dateStart", a, e), i && k.setParam("dateEnd", i, e), k.setParam("currency", o, e);
                                }));
                            }
                        }
                    },
                    priceWatcher: {
                        price: {
                            query: [ {
                                css: "#tpl3_bound0-bound-table .availability-group-cell-price"
                            }, {
                                css: "#table-bound0-cell00-available-content .cell-reco-bestprice-integer"
                            } ],
                            template: "price"
                        },
                        priceReco: {
                            query: {
                                css: "#tpl3_bound0-bound-table .bound-table-flightline .cell-reco-price"
                            },
                            template: "price"
                        },
                        priceCal: {
                            query: {
                                css: ".calendarmatrix-inner-cell.selected .calendarmatrix-price .price-amount"
                            },
                            template: "price"
                        }
                    }
                }) ]), k.addSite("airmoldova_md", "*://*.airmoldova.md/*", [ k.details({
                    locationCheck: [ /airmoldova\.md\// ],
                    formWatcher: {
                        ctr: {
                            query: {
                                css: ".tickets-container"
                            },
                            cb: function(e) {
                                return k.setType("avia", e), k.getParamsFromPage({
                                    origin: "search.originCode",
                                    destination: "search.destinCode",
                                    dateStart: "search.departure",
                                    dateEnd: "search.return",
                                    currency: "prices.currency",
                                    numJourneys: "search.numJourneys"
                                }).then((function(t) {
                                    const r = t.origin, n = t.destination;
                                    let a = t.dateStart;
                                    a = k.matchTemplate(a, /(\d{2})\.(\d{2})\.(\d{4})/, "$3-$2-$1");
                                    let i = null;
                                    2 === t.numJourneys && t.dateEnd && (i = t.dateEnd, i = k.matchTemplate(i, /(\d{2})\.(\d{2})\.(\d{4})/, "$3-$2-$1")), 
                                    k.setParam("origin", r, e), k.setParam("destination", n, e), k.setParam("dateStart", a, e), 
                                    k.setParam("dateEnd", i, e), k.setParam("currency", t.currency, e);
                                }));
                            }
                        }
                    },
                    priceWatcher: {
                        priceOut: {
                            query: {
                                css: ".flight-container:nth-child(1) .tickets-container .ticket .price-value"
                            },
                            template: "price",
                            key: "minPriceOut"
                        },
                        priceIn: {
                            query: {
                                css: ".flight-container:nth-child(1) ~ .flight-container .tickets-container .ticket .price-value"
                            },
                            template: "price",
                            key: "minPriceIn"
                        }
                    }
                }) ]);
                var A = function(e, t) {
                    let r;
                    if (t) r = T(t); else {
                        const t = k.getSitePatternObj(), n = e.pattern, a = t[n];
                        if (!a) throw v.error("Template is not found!", n), new s("Template is not found!");
                        r = a();
                    }
                    Array.isArray(r) || (r = [ r ]);
                    let n = null;
                    return r.some((function(e) {
                        return e.locationCheck ? e.locationCheck(location.href) ? (n = e, !0) : void 0 : (n = e, 
                        !0);
                    })), n;
                }, O = function() {
                    let e = function() {
                        let e = "";
                        return n.getUILanguage && (e = n.getUILanguage()), e || (e = navigator.language), 
                        e && "string" == typeof e || (e = "en"), e.toLowerCase().substr(0, 2);
                    }();
                    const t = {
                        ru: {
                            lang: "ru",
                            foundOneWay: "Найден билет дешевле",
                            foundTwoWay: "Билеты дешевле",
                            view: "Посмотреть",
                            origin: "Туда:",
                            destination: "Обратно:",
                            close: "Закрыть",
                            foundHotel: "Найдена лучшая цена",
                            aroundHotel: "Рядом есть отель лучше",
                            checkIn: "Дата заезда:",
                            checkOut: "Дата отъезда:",
                            inMonth: "в %month%",
                            calLabel: "Выгодное предложение!",
                            suggests: "Ещё отели",
                            foundCars: "Забронируй со скидкой!",
                            carsView: "Сэкономить",
                            e1_foundOneWay: "Есть билеты дешевле",
                            e1_view: "Сэкономить",
                            e2_foundHotel: "Хотите сэкономить?",
                            e2_pricePre: "за",
                            e2_view: "Забронировать дешевле"
                        },
                        en: {
                            lang: "en",
                            foundOneWay: "Found a better price",
                            foundTwoWay: "Better price",
                            view: "Learn more",
                            origin: "Depart:",
                            destination: "Return:",
                            close: "Close",
                            foundHotel: "Found a better price",
                            aroundHotel: "Found a better hotel around",
                            checkIn: "Check-in:",
                            checkOut: "Check-out:",
                            inMonth: "in %month%",
                            calLabel: "Get a better deal!",
                            suggests: "More hotels",
                            foundCars: "Get discount on booking!",
                            carsView: "Book now!"
                        }
                    };
                    return "uk" === e && (e = "ru"), t[e] || t.en;
                }(), D = function(e) {
                    let t = !1;
                    const r = {};
                    for (let n in e) {
                        const a = /^extra\.(.+)$/.exec(n);
                        a && (t = !0, r[a[1]] = e[n]);
                    }
                    return t ? r : null;
                }, E = function() {
                    const e = v.main, t = {}, r = function(e, t) {
                        let r = null;
                        return t.price ? r = t.price : t.minPriceOut && t.minPriceIn ? r = t.minPriceOut + t.minPriceIn : t.minPriceOut ? r = t.minPriceOut : t.minPriceIn && (r = t.minPriceIn), 
                        r;
                    }, n = function(e) {
                        const t = c({
                            limit: 1,
                            adt: e.adultTickets,
                            chd: e.childTickets,
                            cabin: "economy",
                            "fl[0][o]": e.origin,
                            "fl[0][d]": e.destination,
                            "fl[0][dt]": e.dateStart,
                            currency: e.currency,
                            locale: v.language.lang,
                            cid: "GURUOM"
                        }, e.dateEnd ? {
                            "fl[1][dt]": e.dateEnd,
                            "fl[1][d]": e.origin,
                            "fl[1][o]": e.destination
                        } : {});
                        return e.extra && (t.extra = e.extra), Object(o.a)("https://airsearch.api.travelinsides.com/v1/search?" + g.param(t)).then((function(t) {
                            const r = JSON.parse(t.body);
                            if (!r.results.length) throw v.error("API is not success!", t.body), new s("AVIA_BACK_FAIL");
                            return function(e, t, r, n, a) {
                                const i = e.results[0];
                                return {
                                    currency: i.currency,
                                    data: [ c({
                                        depart_date: n,
                                        destination: r,
                                        destinationName: r,
                                        origin: t,
                                        originName: t,
                                        value: i.prices.totalPrice,
                                        url: "https://gurufare.com/ms?key=" + i.key,
                                        vendor: "skyscanner"
                                    }, a ? {
                                        return_date: a
                                    } : {}) ]
                                };
                            }(r, e.origin, e.destination, e.dateStart, e.dateEnd);
                        }));
                    }, a = function(t) {
                        return n(t).then((function(r) {
                            return function(t, r, n) {
                                const a = r.toUpperCase(), i = n.toUpperCase();
                                return a === i ? Promise.resolve() : e.currency.load().then((function() {
                                    if (!e.currency.exists(i) || !e.currency.exists(a)) throw v.error("Currency is not support!", i, a), 
                                    new s("CCY_NOT_SUPPORT");
                                    t.forEach((function(t) {
                                        t.converted_value = e.currency.convert(t.value, a, i);
                                    }));
                                }));
                            }(r.data, r.currency, t.currency).then((function() {
                                return r;
                            }));
                        }));
                    };
                    return {
                        getCityName: function(e) {
                            return Promise.all([ t.cityMap ? Promise.resolve() : g.request({
                                url: "https://api.travelbar.tools/v1/tp/data/cities.json?" + g.param({
                                    partnerId: v.appInfo.id
                                })
                            }).then((function(e) {
                                const r = JSON.parse(e.body), n = {};
                                r.forEach((function(e) {
                                    e.code && e.name && (n[e.code] = {
                                        name: e.name,
                                        name_translations: e.name_translations
                                    });
                                })), t.cityMap = n;
                            })), t.airportCityCodeMap ? Promise.resolve() : g.request({
                                url: "https://api.travelbar.tools/v1/tp/data/airports.json?" + g.param({
                                    partnerId: v.appInfo.id
                                })
                            }).then((function(e) {
                                const r = JSON.parse(e.body), n = {};
                                r.forEach((function(e) {
                                    e.code && e.city_code && (n[e.code] = e.city_code);
                                })), t.airportCityCodeMap = n;
                            })) ]).then((function() {
                                let r = null, n = t.cityMap[e];
                                return n || (e = t.airportCityCodeMap[e], n = t.cityMap[e]), n && (r = n.name_translations && n.name_translations[v.language.lang] || n.name), 
                                r;
                            }));
                        },
                        onGetData: function(t) {
                            if (v.log("Info", t), t.barRequestData) return void v.log("Data from API was requested, before. Skip");
                            t.barRequestData = !0;
                            const r = e.bar.current;
                            r && e.watcher.clearInfoObj(t), v.emit("track", {
                                cd: "flightrequestdata",
                                t: "screenview"
                            }), v.emit("track", {
                                ec: "cheapflight",
                                ea: "requestData",
                                el: v.siteTag,
                                cd: "flightrequestdata",
                                t: "event",
                                tid: "UA-70432435-15"
                            });
                            e.bar.isAborted = !1, a(t).then((function(r) {
                                if (r.data[0].value, e.bar.isAborted) throw new s("REQUEST_ABORTED");
                                return v.emit("track", {
                                    cd: "flightresponsedata",
                                    t: "screenview"
                                }), v.emit("track", {
                                    ec: "cheapflight",
                                    ea: "responseData",
                                    el: v.siteTag,
                                    cd: "flightresponsedata",
                                    t: "event",
                                    tid: "UA-70432435-15"
                                }), e.bar.aviaBarSaveInHistory(t, r), e.bar.create({
                                    type: "avia",
                                    prices: r,
                                    pageInfo: t
                                });
                            })).catch((function(e) {
                                e instanceof s ? v.log(e.message) : (v.error(e), v.trackError(e)), r && r.close(), 
                                function(e) {
                                    let t = "discard";
                                    const r = e.message;
                                    "betterPrice" === r && (t = r), v.emit("track", {
                                        ec: "cheapflight",
                                        ea: t,
                                        el: v.siteTag,
                                        t: "event"
                                    });
                                }(e);
                            }));
                        },
                        page: {
                            getData: function(e, t) {
                                const n = {
                                    origin: e.origin,
                                    destination: e.destination,
                                    dateStart: e.dateStart,
                                    dateEnd: e.dateEnd,
                                    currency: e.currency,
                                    price: r(0, t)
                                }, a = D(e);
                                return a && (n.extra = JSON.stringify(a)), [ "origin", "destination", "dateStart", "currency", "price" ].every((function(e) {
                                    return !!n[e];
                                })) ? n : null;
                            },
                            getPriceId: function(e) {
                                const t = [];
                                return [ "origin", "destination", "dateStart", "dateEnd", "currency" ].every((function(r) {
                                    const n = e[r];
                                    return t.push(n), "dateEnd" === r || !!n;
                                })) ? t.join(";") : null;
                            }
                        }
                    };
                }, N = function() {
                    const e = v.main, t = function(e, t) {
                        let r = null;
                        if (t.price) r = t.price; else if (t.oneDayPrice && e.dayCount) r = t.oneDayPrice * e.dayCount; else if (t.oneDayPrice && e.dateIn && e.dateOut) {
                            const n = new Date(e.dateIn), a = new Date(e.dateOut), i = Math.round((a.getTime() - n.getTime()) / 24 / 60 / 60 / 1e3);
                            r = t.oneDayPrice * i;
                        }
                        return r;
                    }, r = function(e) {
                        let t = Promise.reject(), r = null;
                        return e.query.forEach((function(n, a) {
                            t = t.catch((function() {
                                return function(e, t) {
                                    const r = {
                                        hotel_name: e.query[t],
                                        checkIn: e.dateIn,
                                        checkOut: e.dateOut,
                                        adults: e.adults,
                                        currency: e.currency,
                                        locale: v.language.lang,
                                        partnerId: v.appInfo.id
                                    };
                                    return e.extra && (r.extra = e.extra), g.request({
                                        url: "https://api.travelbar.tools/v1/hotel/prices?" + g.param(r)
                                    }).then((function(e) {
                                        const t = JSON.parse(e.body);
                                        if (!(t && t.success && t.currency && Array.isArray(t.data))) throw v.error("API is not success!", e.body), 
                                        new s("HOTEL_BACK_FAIL");
                                        return t;
                                    }));
                                }(e, a).then((function(e) {
                                    if (!e.hasTarget) throw r = e, new Error("Target is not exists!");
                                    return e;
                                }));
                            }));
                        })), t = t.catch((function(e) {
                            if (!r) throw e;
                            return r;
                        })), t;
                    }, n = function(t) {
                        return r(t).then((function(r) {
                            return function(t, r, n) {
                                const a = r.toUpperCase(), i = n.toUpperCase();
                                return a === i ? Promise.resolve() : e.currency.load().then((function() {
                                    if (!e.currency.exists(i) || !e.currency.exists(a)) throw v.error("Currency is not support!", i, a), 
                                    new s("CCY_NOT_SUPPORT");
                                    t.forEach((function(t) {
                                        t.converted_value = e.currency.convert(t.value, a, i);
                                    }));
                                }));
                            }(r.data, r.currency, t.currency).then((function() {
                                return r;
                            }));
                        }));
                    };
                    return {
                        onGetData: function(t) {
                            if (v.log("Info", t), t.barRequestData) return void v.log("Data from API was requested, before. Skip");
                            t.barRequestData = !0;
                            const r = e.bar.current;
                            r && e.watcher.clearInfoObj(t);
                            v.emit("track", {
                                cd: "hotelrequestdata",
                                t: "screenview"
                            }), v.emit("track", {
                                ec: "hotel",
                                ea: "requestData",
                                el: v.siteTag,
                                cd: "hotelrequestdata",
                                t: "event"
                            }), e.bar.isAborted = !1, n(t).then((function(r) {
                                if (e.bar.isAborted) throw new s("REQUEST_ABORTED");
                                v.emit("track", {
                                    cd: "hotelresponsedata",
                                    t: "screenview"
                                }), v.emit("track", {
                                    ec: "hotel",
                                    ea: "responseData",
                                    el: v.siteTag,
                                    cd: "hotelresponsedata",
                                    t: "event"
                                });
                                const n = function(e) {
                                    let t = null, r = null;
                                    return e.forEach((function(e) {
                                        const n = e.converted_value || e.value;
                                        e.isSuggest ? (null === r || n < r) && (r = n) : (null === t || n < t) && (t = n);
                                    })), [ t, r ];
                                }(r.data), a = n[0], i = n[1], o = t.price + .2 * t.price;
                                let c = a && a < t.price, l = !1, d = !1;
                                if (c || (d = l = i && i < o), c || d || v.log("Has low price!", n, t.price), v.appInfo.debug && (a ? c = !0 : d && (d = l = !0)), 
                                !c && !d) throw new s("betterPrice");
                                return e.bar.create({
                                    type: "hotel",
                                    showSuggestPrice: l,
                                    prices: r,
                                    pageInfo: t
                                });
                            })).catch((function(e) {
                                e instanceof s ? v.log(e.message) : (v.error(e), v.trackError(e)), r && r.close(), 
                                function(e) {
                                    let t = "discard";
                                    const r = e.message;
                                    "betterPrice" === r && (t = r), v.emit("track", {
                                        ec: "hotel",
                                        ea: t,
                                        el: v.siteTag,
                                        t: "event"
                                    });
                                }(e);
                            }));
                        },
                        page: {
                            getData: function(e, r) {
                                const n = {
                                    query: e.query,
                                    dateIn: e.dateIn,
                                    dateOut: e.dateOut,
                                    currency: e.currency,
                                    adults: e.adults,
                                    price: t(e, r)
                                }, a = D(e);
                                return a && (n.extra = JSON.stringify(a)), [ "query", "dateIn", "dateOut", "currency", "adults", "price" ].every((function(e) {
                                    return !!n[e];
                                })) ? n : null;
                            },
                            getPriceId: function(e) {
                                const t = [];
                                return [ "dateIn", "dateOut", "currency", "adults" ].every((function(r) {
                                    const n = e[r];
                                    return t.push(n), !!n;
                                })) ? t.join(";") : null;
                            }
                        }
                    };
                }, I = function() {
                    const e = v.main, t = function(e, t) {
                        let r = null;
                        return t.price && (r = t.price), r;
                    }, r = function(t) {
                        return function(e) {
                            const t = {
                                pickUpLocationId: e.pickUpLocationId,
                                pickUpDate: e.pickUpDate,
                                dropOffLocationId: e.dropOffLocationId,
                                dropOffDate: e.dropOffDate,
                                driverAge: e.driverAge,
                                currency: e.currency,
                                locale: v.language.lang,
                                partnerId: v.appInfo.id
                            };
                            return e.extra && (t.extra = e.extra), g.request({
                                url: "https://api.travelbar.tools/v1/cars/prices?" + g.param(t)
                            }).then((function(e) {
                                const t = JSON.parse(e.body);
                                if (!(t && t.success && t.currency && Array.isArray(t.data))) throw v.error("API is not success!", e.body), 
                                new s("CARS_BACK_FAIL");
                                return t;
                            }));
                        }(t).then((function(r) {
                            return function(t, r, n) {
                                const a = r.toUpperCase(), i = n.toUpperCase();
                                return a === i ? Promise.resolve() : e.currency.load().then((function() {
                                    if (!e.currency.exists(i) || !e.currency.exists(a)) throw v.error("Currency is not support!", i, a), 
                                    new s("CCY_NOT_SUPPORT");
                                    t.forEach((function(t) {
                                        t.converted_value = e.currency.convert(t.value, a, i);
                                    }));
                                }));
                            }(r.data, r.currency, t.currency).then((function() {
                                return r;
                            }));
                        }));
                    };
                    return {
                        onGetData: function(t) {
                            if (v.log("Info", t), t.barRequestData) return void v.log("Data from API was requested, before. Skip");
                            t.barRequestData = !0;
                            const n = e.bar.current;
                            n && e.watcher.clearInfoObj(t);
                            v.emit("track", {
                                cd: "carsrequestdata",
                                t: "screenview"
                            }), v.emit("track", {
                                ec: "cars",
                                ea: "requestData",
                                el: v.siteTag,
                                cd: "carsrequestdata",
                                t: "event"
                            }), e.bar.isAborted = !1, r(t).then((function(r) {
                                if (e.bar.isAborted) throw new s("REQUEST_ABORTED");
                                const n = function(e) {
                                    let t = null;
                                    return e.forEach((function(e) {
                                        const r = e.converted_value || e.value;
                                        (null === t || t > r) && (t = r);
                                    })), t;
                                }(r.data);
                                if (null === n) throw v.error("Low price is not found!", t.price), new s("LOW_PRICE_IS_NOT_FOUND");
                                v.emit("track", {
                                    cd: "carsresponsedata",
                                    t: "screenview"
                                }), v.emit("track", {
                                    ec: "cars",
                                    ea: "responseData",
                                    el: v.siteTag,
                                    cd: "carsresponsedata",
                                    t: "event"
                                });
                                let a = n >= t.price;
                                if (a && v.log("Has lower price!", n, t.price), v.appInfo.debug && (a = !1), a) throw new s("betterPrice");
                                return e.bar.create({
                                    type: "cars",
                                    prices: r,
                                    pageInfo: t
                                });
                            })).catch((function(e) {
                                e instanceof s ? v.log(e.message) : (v.error(e), v.trackError(e)), n && n.close(), 
                                function(e) {
                                    let t = "discard";
                                    const r = e.message;
                                    "betterPrice" === r && (t = r), v.emit("track", {
                                        ec: "cars",
                                        ea: t,
                                        el: v.siteTag,
                                        t: "event"
                                    });
                                }(e);
                            }));
                        },
                        page: {
                            getData: function(e, r) {
                                const n = {
                                    pickUpLocationId: e.pickUpLocationId,
                                    pickUpDate: e.pickUpDate,
                                    dropOffLocationId: e.dropOffLocationId,
                                    dropOffDate: e.dropOffDate,
                                    driverAge: e.driverAge,
                                    currency: e.currency,
                                    price: t(0, r)
                                }, a = D(e);
                                return a && (n.extra = JSON.stringify(a)), [ "pickUpLocationId", "pickUpDate", "dropOffLocationId", "dropOffDate", "driverAge", "currency", "price" ].every((function(e) {
                                    return !!n[e];
                                })) ? n : null;
                            },
                            getPriceId: function(e) {
                                const t = [];
                                return [ "pickUpLocationId", "pickUpDate", "dropOffLocationId", "dropOffDate", "driverAge", "currency" ].every((function(r) {
                                    const n = e[r];
                                    return t.push(n), !!n;
                                })) ? t.join(";") : null;
                            }
                        }
                    };
                };
                const M = [].slice, L = {
                    class: function(e, t) {
                        t.forEach((function(t) {
                            e.classList.add(t);
                        }));
                    },
                    style: function(e, t) {
                        for (let r in t) {
                            const n = t[r];
                            "float" === r && (r = "cssFloat"), e.style[r] = n;
                        }
                    }
                };
                class R {
                    constructor(e, t) {
                        const r = this;
                        let n;
                        r.wDom = e, r.node = t, r.refNode = t.cloneNode(!1), r.events = [], r.customStyle = {}, 
                        r.inlineStyle = {}, r.cssStyle = null, r.nativeStyle = {}, r.checkStyles = [], r.fixLimits = {};
                        let a, i = 0;
                        for (;a = t.childNodes[i]; i++) n = r.wDom.wGet(a), r.refNode.appendChild(n.refNode);
                    }
                    setCheckStyles(e) {
                        this.checkStyles = e;
                    }
                    addCheckStyles(e) {
                        -1 === this.checkStyles.indexOf(e) && this.checkStyles.push(e);
                    }
                    removeCheckStyles(e) {
                        const t = this.checkStyles.indexOf(e);
                        -1 !== t && this.checkStyles.splice(t, 1);
                    }
                    appendChild(e) {
                        const t = this.wDom.wGet(e);
                        this.refNode.appendChild(t.refNode), this.node.appendChild(t.node);
                    }
                    insertBefore(e, t) {
                        const r = this.wDom.wGet(e), n = this.wDom.get(t);
                        this.refNode.insertBefore(r.refNode, n.refNode), this.node.insertBefore(r.node, n.node);
                    }
                    removeChild(e) {
                        const t = this.wDom.get(e);
                        if (!t) throw new Error("wNode is not found!");
                        this.refNode.removeChild(t.refNode), this.node.removeChild(t.node);
                    }
                    setText(e) {
                        this.refNode.textContent = "", this.node.textContent = "", this.appendChild(document.createTextNode(e));
                    }
                    setTextContent(e) {
                        this.refNode.textContent = e, this.node.textContent = e;
                    }
                    addEventListener(e, t, r) {
                        this.node.addEventListener(e, t, r), r = !!r, this.events.push({
                            type: e,
                            listener: t,
                            useCapture: r
                        });
                    }
                    removeEventListener(e, t, r) {
                        this.node.removeEventListener(e, t, r);
                        let n = -1;
                        r = !!r, this.events.some((function(a, i) {
                            if (a.type === e && a.useCapture === r && a.listener === t) return n = i, !0;
                        })), -1 !== n && this.events.splice(n, 1);
                    }
                    setStyle(e, t) {
                        this.refNode.style[e] = t, this.node.style[e] = t, "" === t ? delete this.inlineStyle[e] : this.inlineStyle[e] = t;
                    }
                    setAttribute(e, t) {
                        this.refNode.setAttribute(e, t), this.node.setAttribute(e, t);
                    }
                    removeAttribute(e) {
                        this.refNode.removeAttribute(e), this.node.removeAttribute(e);
                    }
                    setStyleProperty(e, t, r) {
                        const n = this;
                        if (!n.refNode.style.setProperty) return void n.setStyle(e, t);
                        const a = B(e);
                        n.refNode.style.setProperty(a, t, r), n.node.style.setProperty(a, t, r), "" === t ? delete n.inlineStyle[e] : n.inlineStyle[e] = t;
                    }
                    addClass(e) {
                        this.refNode.classList.add(e), this.node.classList.add(e);
                    }
                    removeClass(e) {
                        this.refNode.classList.remove(e), this.node.classList.remove(e);
                    }
                    checkChildList() {
                        const e = this, t = e.fixLimits;
                        let r = !0;
                        void 0 === t.checkChildList && (t.checkChildList = 50);
                        let n, a, i, o, s = !1;
                        for (n = 0; i = e.refNode.childNodes[n]; n++) a = e.wDom.getByRef(i).node, o = e.node.childNodes[n], 
                        o !== a && (t.checkChildList > 0 ? (o ? e.node.insertBefore(a, o) : e.node.appendChild(a), 
                        s = !0, v.log("Fix checkChildList insert node", a)) : (r = !1, v.error("Fix checkChildList insert limited")));
                        const c = e.refNode.childNodes.length, l = M.call(e.node.childNodes, c);
                        if (l.length) if (t.checkChildList > 0) for (n = 0; a = l[n]; n++) a.parentNode && (a.parentNode.removeChild(a), 
                        s = !0, v.log("Fix checkChildList remove node", a)); else r = !1, v.error("Fix checkChildList remove limited");
                        return s && t.checkChildList--, r;
                    }
                    checkAttributes(e) {
                        const t = this, r = t.fixLimits, n = "checkAttributes_" + e;
                        void 0 === r[n] && (r[n] = 50);
                        let a = !0;
                        const i = t.node.getAttribute(e), o = t.refNode.getAttribute(e);
                        return o !== i && (r[n]-- > 0 ? (null === o ? t.node.removeAttribute(e) : t.node.setAttribute(e, o), 
                        v.log("Fix attributes", e, i, ">", o)) : (a = !1, v.error("Fix attributes limited"))), 
                        a;
                    }
                    checkCharacterData() {
                        const e = this, t = e.fixLimits, r = "checkCharacterData";
                        void 0 === t[r] && (t[r] = 50);
                        let n = !0;
                        const a = e.node.textContent, i = e.refNode.textContent;
                        return a !== i && (t[r]-- > 0 ? (e.node.textContent = e.refNode.textContent, v.log("Fix characterData", a, ">", i)) : (n = !1, 
                        v.error("Fix characterData limited"))), n;
                    }
                    fixStyleProperty(e, t, r) {
                        const n = this, a = n.fixLimits, i = "fixStyleProperty" + e;
                        let o = !0;
                        return a[i] ? (o = !1, v.error("Fix styleProperty limited")) : (a[i] = !0, r.forEach((function(a) {
                            n.setStyleProperty(e, a, "important"), v.log("Fix styleProperty", e, t, ">", r);
                        }))), o;
                    }
                    getNode() {
                        return this.node;
                    }
                    buildNode() {
                        const e = this, t = e.refNode.cloneNode(!1);
                        let r, n, a;
                        for (r = 0; a = e.refNode.childNodes[r]; r++) n = e.wDom.getByRef(a), t.appendChild(n.buildNode());
                        return e.events.forEach((function(e) {
                            t.addEventListener(e.type, e.listener, e.useCapture);
                        })), t;
                    }
                }
                const B = function(e) {
                    return "cssFloat" === e && (e = "float"), e.replace(/([A-Z])/g, (function(e, t) {
                        return "-" + t.toLowerCase();
                    }));
                };
                var W = class {
                    constructor() {
                        this.wElements = [], this.refElements = [], this.elements = [];
                    }
                    createElement(e, t, r) {
                        const n = function(e, t) {
                            let r, n;
                            const a = document.createElement(e);
                            for (let e in t) n = t[e], r = L[e], r ? r(a, n) : a[e] = n;
                            return a;
                        }(e, t), a = M.call(arguments, 2);
                        let i, o = 0;
                        for (;i = a[o]; o++) "object" != typeof i && (i = document.createTextNode(i)), n.appendChild(i);
                        return this.wGet(n);
                    }
                    get(e) {
                        let t = null;
                        const r = this.elements.indexOf(e);
                        return -1 !== r && (t = this.wElements[r]), t;
                    }
                    getByRef(e) {
                        let t = null;
                        const r = this.refElements.indexOf(e);
                        return -1 !== r && (t = this.wElements[r]), t;
                    }
                    wrap(e) {
                        return new R(this, e);
                    }
                    wGet(e) {
                        const t = this;
                        let r = t.get(e);
                        return null === r && (r = t.wrap(e), t.addWNode(r)), r;
                    }
                    addWNode(e) {
                        this.elements.push(e.node), this.refElements.push(e.refNode), this.wElements.push(e);
                    }
                    removeWNode(e) {
                        const t = this, r = t.wElements.indexOf(e);
                        -1 !== r && (t.elements.splice(r, 1), t.refElements.splice(r, 1), t.wElements.splice(r, 1));
                    }
                    destroy() {
                        this.elements.splice(0), this.refElements.splice(0), this.wElements.splice(0);
                    }
                };
                const F = function() {
                    v.log.apply(null, arguments);
                }, U = function(e) {
                    for (let t = 1; t < arguments.length; t++) {
                        const r = arguments[t];
                        for (let t in r) Object.prototype.hasOwnProperty.call(r, t) && (e[t] = r[t]);
                    }
                    return e;
                }, q = {}, j = function() {
                    const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                    let t = 10, r = "t";
                    do {
                        t--;
                        for (let t = 0; t < 21; t++) r += e.charAt(Math.floor(Math.random() * e.length));
                    } while (q[r] && t > 0);
                    return q[r] = 1, r;
                }, $ = function() {
                    class e {
                        constructor(e, t, r) {
                            this.type = "conditional", this.selector = e, this.options = r, this.rules = new Y(U({}, r, {
                                parent: this
                            }));
                            for (let e in t) this.rules.add(e, t[e]);
                            this.rules.process();
                        }
                        getRule(e) {
                            return this.rules.get(e);
                        }
                        indexOf(e) {
                            return this.rules.indexOf(e);
                        }
                        addRule(e, t, r) {
                            const n = this.rules.add(e, t, r);
                            return this.options.jss.plugins.onProcessRule(n), n;
                        }
                        toString() {
                            const e = this.rules.toString();
                            return e ? this.selector + "{" + e + "}" : "";
                        }
                    }
                    return {
                        onCreateRule: function(t, r, n) {
                            return /^@media/.test(t) ? new e(t, r, n) : null;
                        }
                    };
                }(), z = function() {
                    const e = function(e) {
                        return e && "object" == typeof e && !Array.isArray(e);
                    };
                    return {
                        onProcessStyle: function(t, r, n) {
                            return t.extend ? function t(r, n, a) {
                                const i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                                if ("string" == typeof r.extend) {
                                    if (a) {
                                        const e = a.getRule(r.extend);
                                        if (e) if (e === n) F("[JSS] A rule tries to extend itself \r\n", n); else if (e.options.parent) {
                                            t(e.options.parent.rules.raw[r.extend], n, a, i);
                                        }
                                    }
                                } else if (Array.isArray(r.extend)) for (let e = 0; e < r.extend.length; e++) t(r.extend[e], n, a, i); else for (let o in r.extend) "extend" === o ? t(r.extend.extend, n, a, i) : e(r.extend[o]) ? (i[o] || (i[o] = {}), 
                                t(r.extend[o], n, a, i[o])) : (i.hasOwnProperty(o) && delete i[o], i[o] = r.extend[o]);
                                for (let o in r) if ("extend" !== o) if ("fallbacks" === o && i[o]) {
                                    Array.isArray(i[o]) || (i[o] = [ i[o] ]);
                                    let e = r[o];
                                    Array.isArray(e) || (e = [ e ]), i[o] = i[o].concat(JSON.parse(JSON.stringify(e)));
                                } else e(i[o]) && e(r[o]) ? t(r[o], n, a, i[o]) : e(r[o]) ? i[o] = t(r[o], n, a) : (i.hasOwnProperty(o) && delete i[o], 
                                i[o] = r[o]);
                                return i;
                            }(t, r, n) : t;
                        }
                    };
                }(), H = function() {
                    const e = /\s*,\s*/g, t = /&/g, r = /\$([\w-]+)/g;
                    function n(e) {
                        return function(t, r) {
                            const n = e.getRule(r);
                            return n ? n.selector : (F("[JSS] Could not find the referenced rule " + r + ". \r\n", n), 
                            r);
                        };
                    }
                    const a = function(e) {
                        return -1 !== e.indexOf("&");
                    };
                    function i(r, n) {
                        const i = n.split(e), o = r.split(e);
                        let s = "";
                        for (let e = 0; e < i.length; e++) {
                            const r = i[e];
                            for (let e = 0; e < o.length; e++) {
                                const n = o[e];
                                s && (s += ", "), s += a(n) ? n.replace(t, r) : r + " " + n;
                            }
                        }
                        return s;
                    }
                    function o(e, t, r) {
                        if (r) return U({}, r, {
                            index: r.index + 1
                        });
                        let n = e.options.nestingLevel;
                        return n = void 0 === n ? 1 : n + 1, U({}, e.options, {
                            nestingLevel: n,
                            index: t.indexOf(e) + 1
                        });
                    }
                    return {
                        onProcessStyle: function(e, t) {
                            if ("regular" !== t.type) return e;
                            const s = t.options.parent;
                            let c = void 0, l = void 0;
                            for (let d in e) {
                                const u = a(d), p = "@" === d[0];
                                if (u || p) {
                                    if (c = o(t, s, c), u) {
                                        let a = i(d, t.selector);
                                        l || (l = n(s)), a = a.replace(r, l), s.addRule(a, e[d], U({}, c, {
                                            selector: a
                                        }));
                                    } else if (p) {
                                        const r = {};
                                        r[t.name] = e[d], s.addRule(d, r, c);
                                    }
                                    delete e[d];
                                }
                            }
                            return e;
                        }
                    };
                }(), J = function() {
                    const e = /([A-Z])/g, t = function(e) {
                        return "-" + e.toLowerCase();
                    }, r = function r(n) {
                        const a = {};
                        for (let r in n) {
                            const i = n[r];
                            "cssFloat" === r && (r = "float"), r = r.replace(e, t), a[r] = i;
                        }
                        return n.fallbacks && (Array.isArray(n.fallbacks) ? a.fallbacks = n.fallbacks.map(r) : a.fallbacks = r(n.fallbacks)), 
                        a;
                    };
                    return {
                        onProcessStyle: function(e) {
                            if (Array.isArray(e)) {
                                for (let t = 0; t < e.length; t++) e[t] = r(e[t]);
                                return e;
                            }
                            return r(e);
                        }
                    };
                }();
                class G {
                    constructor(e, t, r) {
                        this.type = "regular";
                        const n = r.generateClassName;
                        this.name = e, this.className = "", this.options = r, this.style = t, r.className ? this.className = r.className : n && (this.className = n(this, r.sheet)), 
                        this.selector = r.selector || "." + this.className;
                    }
                    toString() {
                        return Z(this.selector, this.style);
                    }
                }
                const V = function e(t) {
                    return Array.isArray(t) ? Array.isArray(t[0]) ? e(t.map((function(e) {
                        return e.join(" ");
                    }))) : t.join(", ") : t;
                }, Z = function(e, t) {
                    const r = t.fallbacks;
                    let n = "";
                    if (r) if (Array.isArray(r)) for (let e = 0; e < r.length; e++) {
                        const t = r[e];
                        for (let e in t) {
                            const r = t[e];
                            null != r && (n += e + ": " + V(r) + ";");
                        }
                    } else for (let e in r) {
                        const t = r[e];
                        null != t && (n += e + ": " + V(t) + ";");
                    }
                    for (let e in t) {
                        let r = t[e];
                        "function" == typeof r && (r = t["$" + e]), null != r && "fallbacks" !== e && (n += e + ": " + V(r) + ";");
                    }
                    return n ? (n = e + " {" + n + "}", n) : n;
                };
                class Y {
                    constructor(e) {
                        this.map = {}, this.raw = {}, this.index = [], this.options = e, this.classes = e.classes;
                    }
                    add(e, t, r) {
                        const n = this.options, a = n.parent, i = n.sheet, o = n.jss, s = n.Renderer, c = n.generateClassName;
                        (r = U({
                            classes: this.classes,
                            parent: a,
                            sheet: i,
                            jss: o,
                            Renderer: s,
                            generateClassName: c
                        }, r)).className || (r.className = this.classes[e]), this.raw[e] = t;
                        const l = K(e, t, r);
                        this.register(l);
                        const d = void 0 === r.index ? this.index.length : r.index;
                        return this.index.splice(d, 0, l), l;
                    }
                    get(e) {
                        return this.map[e];
                    }
                    indexOf(e) {
                        return this.index.indexOf(e);
                    }
                    process() {
                        const e = this.options.jss.plugins;
                        this.index.slice(0).forEach(e.onProcessRule, e);
                    }
                    register(e) {
                        e.name && (this.map[e.name] = e), e.className && e.name && (this.classes[e.name] = e.className), 
                        e.selector && (this.map[e.selector] = e);
                    }
                    toString() {
                        let e = "";
                        for (let t = 0; t < this.index.length; t++) {
                            const r = this.index[t].toString();
                            r && (e += r);
                        }
                        return e;
                    }
                }
                const K = function(e, t, r) {
                    const n = r.jss, a = function e(t) {
                        if (null == t) return t;
                        const r = typeof t;
                        if ("string" === r || "number" === r) return t;
                        if (Array.isArray(t)) return t.map(e);
                        const n = {};
                        for (let r in t) {
                            const a = t[r];
                            n[r] = "object" == typeof a ? e(a) : a;
                        }
                        return n;
                    }(t);
                    if (n) {
                        const t = n.plugins.onCreateRule(e, a, r);
                        if (t) return t;
                    }
                    return e && "@" === e[0] && F("[JSS] Unknown at-rule", e), new G(e, a, r);
                };
                class Q {
                    constructor(e) {
                        const t = "number" == typeof e.index ? e.index : 0;
                        this.classes = {}, this.options = U({
                            sheet: this,
                            parent: this,
                            classes: this.classes,
                            index: t
                        }, e), this.rules = new Y(this.options);
                    }
                    addRule(e, t, r) {
                        const n = this.rules.add(e, t, r);
                        return this.options.jss.plugins.onProcessRule(n), n;
                    }
                    add(e, t) {
                        return this.addRules(e, t);
                    }
                    addRules(e, t) {
                        this.options.jss.onBeforeAddHooks.forEach(r => {
                            r(e, t);
                        });
                        const r = [];
                        for (let n in e) r.push(this.addRule(n, e[n], t));
                        return r;
                    }
                    getRule(e) {
                        return this.rules.get(e);
                    }
                    indexOf(e) {
                        return this.rules.indexOf(e);
                    }
                    toString() {
                        return this.rules.toString();
                    }
                    sync() {
                        this.options.jss.onChange();
                    }
                }
                class X {
                    constructor() {
                        this.hooks = {
                            onCreateRule: [],
                            onProcessRule: [],
                            onProcessStyle: [],
                            onProcessSheet: [],
                            onChangeValue: []
                        };
                    }
                    onCreateRule(e, t, r) {
                        for (let n = 0; n < this.hooks.onCreateRule.length; n++) {
                            const a = this.hooks.onCreateRule[n](e, t, r);
                            if (a) return a;
                        }
                        return null;
                    }
                    onProcessRule(e) {
                        if (e.isProcessed) return;
                        const t = e.options.sheet;
                        for (let r = 0; r < this.hooks.onProcessRule.length; r++) this.hooks.onProcessRule[r](e, t);
                        e.style && this.onProcessStyle(e.style, e, t), e.isProcessed = !0;
                    }
                    onProcessStyle(e, t, r) {
                        for (let n = 0; n < this.hooks.onProcessStyle.length; n++) t.style = e = this.hooks.onProcessStyle[n](e, t, r);
                    }
                    onProcessSheet(e) {
                        for (let t = 0; t < this.hooks.onProcessSheet.length; t++) this.hooks.onProcessSheet[t](e);
                    }
                    onChangeValue(e, t, r) {
                        let n = e;
                        for (let e = 0; e < this.hooks.onChangeValue.length; e++) n = this.hooks.onChangeValue[e](n, t, r);
                        return n;
                    }
                    use(e) {
                        for (let t in e) this.hooks[t] ? this.hooks[t].push(e[t]) : F("[JSS] Unknown hook", t);
                    }
                }
                const ee = function(e) {
                    const t = {};
                    let r, n, a = e.fallbacks;
                    for (r in a && (Array.isArray(a) || (a = [ a ]), a.forEach((function(e) {
                        for (let r in e) t[r] || (t[r] = []), t[r].push(e[r]);
                    }))), e) "fallbacks" !== r && (n = e[r], t[r] ? (Array.isArray(t[r]) || (t[r] = [ t[r] ]), 
                    t[r].push(n)) : t[r] = n);
                    return t;
                };
                var te = class {
                    constructor() {
                        this.sheets = [], this.onBeforeAddHooks = [], this.plugins = new X, this.plugins.use($), 
                        this.plugins.use(z), this.plugins.use(H), this.plugins.use(J);
                    }
                    getSheet() {
                        const e = new Q({
                            jss: this,
                            generateClassName: j
                        });
                        return this.sheets.push(e), e;
                    }
                    toString() {
                        const e = [];
                        return this.sheets.forEach((function(t) {
                            e.push(t.toString());
                        })), e.join("");
                    }
                    getStyleBySelector(e) {
                        let t = {};
                        return this.sheets.some((function(r) {
                            const n = r.rules.map[e];
                            if (n) return t = n.style, !0;
                        })), ee(t);
                    }
                    onChange() {}
                };
                const re = function(e) {
                    const t = /(.+)!important/.exec(e);
                    return t && (e = t[1].trim()), e;
                }, ne = function(e) {
                    return "float" === e && (e = "cssFloat"), e.replace(/-([a-z])/g, (function(e, t) {
                        return t.toUpperCase();
                    }));
                }, ae = function(e, t) {
                    let r, n, a = null;
                    if (!t.cssStyle) {
                        const r = t.refNode, n = r.classList[0];
                        r && n && (a = e.getStyleBySelector("." + n)), t.cssStyle = a || {};
                    }
                    const i = [];
                    i.unshift(t.customStyle), i.unshift(t.inlineStyle), i.unshift(t.cssStyle), i.unshift(t.nativeStyle);
                    const o = {};
                    for (;a = i.shift(); ) for (r in a) n = a[r], r = ne(r), Array.isArray(n) || (n = [ n ]), 
                    n = n.map(re), o[r] = n;
                    return o;
                };
                var ie = class {
                    constructor(e, t) {
                        this.onChange = t, this.destroyed = !1, this.bar = e, this.timer = null;
                    }
                    start() {
                        const e = this, t = function() {
                            e.destroyed || (e.check(), r());
                        }, r = function() {
                            e.stop(), e.timer = setTimeout(t, 5e3);
                        };
                        t(), r();
                    }
                    stop() {
                        clearTimeout(this.timer);
                    }
                    check() {
                        const e = this, t = this.bar, r = this.bar.wDom, n = this.bar.wSheets;
                        !function(t) {
                            if (!t.parentNode) return;
                            const a = r.get(t);
                            if (!a) return void v.error("wNode is not found", t);
                            const i = a.checkStyles;
                            if (!i.length) return;
                            const o = ae(n, a), s = getComputedStyle(t);
                            i.forEach((function(t) {
                                const r = s[t], n = o[t];
                                void 0 !== n && void 0 !== r && -1 === n.indexOf(r) && e.onChange(a, t, s[t], n);
                            }));
                        }(t.body.node);
                    }
                    destroy() {
                        this.destroyed = !0, this.stop();
                    }
                }, oe = function(e, t) {
                    const r = new (g.mutationWatcher.getMutationObserver())((function(e) {
                        let r, n = 0;
                        for (;r = e[n]; n++) ("attributes" === r.type || "characterData" === r.type || "childList" === r.type) && t(r);
                    })), n = {
                        childList: !0,
                        subtree: !0,
                        attributes: !0,
                        attributeOldValue: !0,
                        characterData: !0,
                        characterDataOldValue: !0
                    };
                    this.disconnect = function() {
                        r.disconnect();
                    }, this.connect = function() {
                        r.observe(e, n);
                    }, this.start = function() {
                        this.connect();
                    }, this.destroy = function() {
                        this.disconnect();
                    };
                }, se = function(e, t) {
                    const r = [].slice, n = new (g.mutationWatcher.getMutationObserver())((function(n) {
                        let a, i, o = 0;
                        for (;i = n[o]; o++) if (i.removedNodes.length && (a = r.call(i.removedNodes).indexOf(e), 
                        -1 !== a)) {
                            t(i);
                            break;
                        }
                    })), a = {
                        childList: !0
                    };
                    this.disconnect = function() {
                        n.disconnect();
                    }, this.connect = function() {
                        if (!e.parentNode) return v.error("RemoveWatcher parent is null", e);
                        n.observe(e.parentNode, a);
                    }, this.start = function() {
                        this.connect();
                    }, this.destroy = function() {
                        this.disconnect();
                    };
                }, ce = function() {
                    const e = v.main, t = {}, r = function(e, r) {
                        const n = e.wDom.wGet(e.body.node), a = document.body.parentNode;
                        if (r) {
                            t.marginTop = a.style.marginTop, t.transition = a.style.transition, a.style.transition = "margin-top 0.2s", 
                            n.removeCheckStyles("marginTop"), n.setStyle("marginTop", "-55px"), n.setStyle("transition", "margin-top 0.2s"), 
                            setTimeout((function() {
                                a.style.marginTop = "55px", n.setStyle("marginTop", ""), a.style.setProperty && a.style.setProperty("margin-top", "55px", "important"), 
                                setTimeout((function() {
                                    a.style.transition = t.transition, n.setStyle("transition", "");
                                    document.addEventListener("mousemove", (function e() {
                                        document.removeEventListener("mousemove", e), setTimeout((function() {
                                            n.addCheckStyles("marginTop");
                                        }), 250);
                                    }));
                                }), 250);
                            }), 0);
                            const e = v.currentProfile.onShow;
                            e && e(55);
                        } else {
                            a.style.marginTop = t.marginTop;
                            const e = v.currentProfile.onHide;
                            e && e();
                        }
                    }, a = function(e) {
                        let t = (r = 0, n = 100, Math.floor(Math.random() * (n - r)) + r);
                        var r, n;
                        const a = 100 / e;
                        let i = 0;
                        if (e > 0 && a > 0) for (;t > a; ) t -= a, i++;
                        return i;
                    };
                    class i {
                        constructor(e) {
                            const t = this;
                            this.hostname = v.hostname, this.siteTag = v.siteTag, this.type = e.type, this.details = e, 
                            this.isClosed = !1, this.isRemoved = !1, this.disableFontLink = !!v.currentProfile.disableFontLink, 
                            this.onBarChangeLimit = 5, this.onBarChangeFired = 1, this.onBarChangeStyleFired = 1, 
                            this.onBarChangeStyleLimit = {}, this.onBarRemoveFired = 1, this.container = document.createDocumentFragment(), 
                            this.styleWatcher = new ie(this, (function(e, r, n, a) {
                                t.onBarChangeStyle(e, r, n, a);
                            })), this.wDom = new W, this.wSheets = new te, v.currentProfile.onAddStyle && this.wSheets.onBeforeAddHooks.push((function() {
                                v.currentProfile.onAddStyle(...arguments);
                            })), this.barContent = this.getBarContent(), this.body = this.getBody(), this.content = this.getContent(), 
                            this.wDom.wGet(this.body.content).appendChild(this.content.node), this.style = this.getStyle(), 
                            v.currentProfile.onCreateBar && v.currentProfile.onCreateBar(this), this.container.appendChild(this.body.node), 
                            this.container.appendChild(this.style.node), this.wDom.wGet(this.container), this.wDom.wGet(this.style.node);
                            const r = function(e) {
                                t.onBarChange(e);
                            };
                            this.body.changeWatcher = new oe(this.body.node, r), this.body.changeWatcher.start(), 
                            this.style.changeWatcher = new oe(this.style.node, r), this.style.changeWatcher.start();
                            const n = function(e) {
                                t.onBarRemove(e);
                            };
                            this.body.removeWatcher = new se(this.body.node, n), this.style.removeWatcher = new se(this.style.node, n);
                        }
                        onBarChange(e) {
                            const t = e.type, r = e.target;
                            let n = null;
                            const a = this.wDom.get(r);
                            if (a) {
                                try {
                                    "attributes" === t ? n = a.checkAttributes(e.attributeName) : "characterData" === t ? n = a.checkCharacterData() : "childList" === t && (n = a.checkChildList());
                                } catch (e) {
                                    v.error(e), v.trackError(e);
                                }
                                n || v.error(t, e);
                            } else v.error("wEl not found", e);
                        }
                        onBarChangeStyle(e, t, r, n) {
                            e.fixStyleProperty(t, r, n) || v.error("onBarChangeStyle", t, r, n, e);
                        }
                        onBarRemove(e) {
                            v.error("removed", e), v.main.watcher.closeCurrentBar(), this.onBarRemoveFired--;
                        }
                        trackByVendor(e) {
                            const t = this.barContent.vendor, r = {
                                aviasales: "as",
                                skyscanner: "sc"
                            }[t];
                            return r ? (e.ec += "-" + r, v.emit("track", e)) : v.error("Prefix is not found!", t);
                        }
                        getAviaBarContent() {
                            const e = this, t = this.details, r = t.pageInfo, n = e.wSheets.getSheet(), i = t.prices, o = i.data[function(e) {
                                let t = null, r = null;
                                e.forEach((function(e) {
                                    const n = /(\d{4}.\d{2}.\d{2})/.exec(e.depart_date);
                                    if (!n) return;
                                    const a = n[1];
                                    (null === t || t > a) && (t = a, r = null), a === t && (null === r || e.value < r.value) && (r = e);
                                }));
                                const n = e.indexOf(r);
                                return v.log("Bar item", n, r), v.log("Result prices", e), n;
                            }(i.data)];
                            if (!o) return v.error("Bar item is not found!", t), null;
                            const c = !!o.monthPrice, l = !r.dateEnd, d = {
                                value: o.converted_value || o.value,
                                currency: r.currency,
                                origin: o.origin,
                                originName: o.originName,
                                destination: o.destination,
                                destinationName: o.destinationName,
                                dateStart: o.depart_date,
                                dateEnd: o.return_date,
                                open: v.language.view,
                                monthPrice: !!o.monthPrice,
                                vendor: o.vendor || "aviasales",
                                url: o.url,
                                isCalendar: c,
                                isOneWay: l
                            };
                            if (d.priceText = c ? g.getPriceNode(d.currency, d.value, e.disableFontLink) : g.create(document.createDocumentFragment(), {
                                append: function() {
                                    const t = [];
                                    return r.price > d.value ? (n.add({
                                        redPrice: {
                                            textDecoration: "line-through",
                                            color: "#F44336"
                                        }
                                    }), t.push(g.create("span", {
                                        class: n.classes.redPrice,
                                        append: [ g.getPriceNode(d.currency, r.price, e.disableFontLink) ]
                                    })), t.push(String.fromCharCode(160))) : v.error("Red price is hidden", r.price, d.value), 
                                    t.push(g.getPriceNode(d.currency, d.value, e.disableFontLink)), t;
                                }()
                            }), c ? (d.barTitle = v.language.calLabel, d.dateText = v.language.inMonth.replace("%month%", g.getCalMonth(d.dateStart))) : l ? (d.barTitle = v.language.foundOneWay, 
                            d.dateText = g.getDate(d.dateStart, !0)) : (d.barTitle = v.language.foundTwoWay, 
                            d.dateText = g.getDateInterval(d.dateStart, d.dateEnd)), !d.originName || !d.destinationName) throw v.error("City name is not found!", d.origin, d.destination), 
                            new s("City name is not found!");
                            return function(e, t) {
                                if (t.isCalendar) return;
                                const r = [ "" ];
                                "ru" === v.language.lang && r.push((function() {
                                    t.barTitle = v.language.e1_foundOneWay, t.open = v.language.e1_view;
                                }));
                                const n = r[a(r.length)];
                                n && n();
                            }(0, d), d;
                        }
                        getHotelBarContent() {
                            const e = this, t = this.details, r = t.pageInfo, n = function(e) {
                                let r = null;
                                const n = !!t.showSuggestPrice;
                                e.data.filter((function(e) {
                                    return n === !!e.isSuggest;
                                })).forEach((function(e) {
                                    (null === r || r.value > e.value) && (r = e);
                                }));
                                const a = [];
                                return e.data.forEach((function(e) {
                                    e.isSuggest && e !== r && a.push(e);
                                })), {
                                    barItem: r,
                                    suggestItemList: a
                                };
                            }(t.prices), i = n.barItem;
                            if (!i) return v.error("Bar item is not found!", t), null;
                            const o = function(t) {
                                const n = !!t.isSuggest;
                                ("number" != typeof t.stars || t < 0 || t.stars > 5) && (t.stars = 0);
                                const a = {
                                    name: t.name,
                                    stars: t.stars,
                                    value: t.converted_value || t.value,
                                    currency: r.currency,
                                    dateIn: r.dateIn,
                                    dateOut: r.dateOut,
                                    open: v.language.view,
                                    url: t.deeplink,
                                    isSuggest: n
                                };
                                return a.priceText = g.getPriceNode(a.currency, a.value, e.disableFontLink), a.barTitle = n ? v.language.aroundHotel : v.language.foundHotel, 
                                a.dateText = g.getDateInterval(a.dateIn, a.dateOut), a;
                            }, s = o(i);
                            return s.suggestList = n.suggestItemList.map(o), s.suggestList.sort((function(e, t) {
                                return e.value < t.value ? -1 : 1;
                            })), function(e, t, r) {
                                if (t.isSuggest) return;
                                const n = [ "" ];
                                "ru" === v.language.lang && n.push((function() {
                                    t.barTitle = v.language.e2_foundHotel, t.priceText = g.create(document.createDocumentFragment(), {
                                        append: [ v.language.e2_pricePre + " ", g.getPriceNode(t.currency, t.value, r.disableFontLink) ]
                                    }), t.open = v.language.e2_view;
                                }));
                                const i = n[a(n.length)];
                                i && i();
                            }(0, s, this), s;
                        }
                        getCarsBarContent() {
                            const e = this, t = this.details, r = t.pageInfo, n = t.prices, a = e.wSheets.getSheet(), i = function(e) {
                                let t = null;
                                return e.forEach((function(e) {
                                    (!t || t.value > e.value) && (t = e);
                                })), t;
                            }(n.data);
                            if (!i) return v.error("Bar item is not found!", t), null;
                            const o = {
                                value: i.converted_value || i.value,
                                currency: r.currency,
                                vehicleName: i.vehicleName,
                                pickUpLocName: i.pickUpLocName,
                                pickUpLocCode: i.pickUpLocCode,
                                pickUpDate: i.pickUpDate,
                                dropOffLocName: i.dropOffLocName,
                                dropOffLocCode: i.dropOffLocCode,
                                dropOffDate: i.dropOffDate,
                                url: i.url
                            };
                            return o.priceText = g.create(document.createDocumentFragment(), {
                                append: function() {
                                    const t = [];
                                    return r.price > o.value ? (a.add({
                                        redPrice: {
                                            textDecoration: "line-through",
                                            color: "#F44336"
                                        }
                                    }), t.push(g.create("span", {
                                        class: a.classes.redPrice,
                                        append: [ g.getPriceNode(o.currency, r.price, e.disableFontLink) ]
                                    })), t.push(String.fromCharCode(160))) : v.error("Red price is hidden", r.price, o.value), 
                                    t.push(g.getPriceNode(o.currency, o.value, e.disableFontLink)), t;
                                }()
                            }), o.pickUpText = o.pickUpLocName, o.pickUpLocCode && (o.pickUpText += ", " + o.pickUpLocCode), 
                            o.dropOffText = o.dropOffLocName, o.dropOffLocCode && (o.dropOffText += ", " + o.dropOffLocCode), 
                            o.isOnePoint = o.pickUpText === o.dropOffText, o.isOnePoint ? o.dateText = g.getDateInterval(o.pickUpDate, o.dropOffDate) : (o.pickUpDateText = g.getDate(o.pickUpDate, !0), 
                            o.dropOffDateText = g.getDate(o.dropOffDate, !0)), o.barTitle = v.language.foundCars, 
                            o.open = v.language.carsView, o;
                        }
                        getBarContent() {
                            return "avia" === this.type ? this.getAviaBarContent() : "hotel" === this.type ? this.getHotelBarContent() : "cars" === this.type ? this.getCarsBarContent() : void 0;
                        }
                        insertAviaBar() {
                            const e = this, t = e.wSheets.getSheet(), r = this.barContent, n = document.createDocumentFragment();
                            t.add({
                                cell: {
                                    fallbacks: {
                                        display: "inline-block"
                                    }
                                }
                            }), t.add({
                                title: {
                                    extend: "cell",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    margin: "auto 10px",
                                    lineHeight: "23px",
                                    verticalAlign: "middle"
                                },
                                "@media only screen and (max-width: 1150px)": {
                                    title: {
                                        fontSize: "18px"
                                    }
                                },
                                "@media only screen and (max-width: 1050px)": {
                                    title: {
                                        fontSize: "14px",
                                        marginLeft: "5px",
                                        marginRight: "5px"
                                    }
                                }
                            }), n.appendChild(g.create("div", {
                                class: t.classes.title,
                                append: [ r.barTitle ]
                            })), t.add({
                                flightInfoCell: {
                                    extend: "cell",
                                    fallbacks: {
                                        display: "-webkit-flex",
                                        WebkitFlexGrow: 2
                                    },
                                    display: "flex",
                                    flexGrow: 2,
                                    verticalAlign: "middle",
                                    overflow: "hidden"
                                }
                            });
                            const a = g.create("div", {
                                class: t.classes.flightInfoCell
                            });
                            n.appendChild(a), t.add({
                                info: {
                                    extend: "cell",
                                    fallbacks: {
                                        display: "-webkit-flex"
                                    },
                                    display: "flex",
                                    height: "38px",
                                    border: "1px solid rgba(0,0,0,0.10)",
                                    margin: "auto 10px",
                                    borderRadius: "19px",
                                    padding: "0 15px",
                                    overflow: "hidden"
                                },
                                "@media only screen and (max-width: 1050px)": {
                                    info: {
                                        marginLeft: "5px",
                                        marginRight: "5px",
                                        paddingLeft: "5px",
                                        paddingRight: "5px"
                                    }
                                }
                            });
                            const i = g.create("div", {
                                class: t.classes.info
                            });
                            a.appendChild(i), t.add({
                                point: {
                                    display: "inline-block",
                                    verticalAlign: "middle",
                                    margin: "auto 0",
                                    textOverflow: "ellipsis",
                                    color: "#000",
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                    overflow: "hidden"
                                }
                            });
                            const o = function(e) {
                                return g.create("div", {
                                    class: t.classes.point,
                                    title: e,
                                    text: e
                                });
                            };
                            t.add({
                                flightWrapper: {
                                    extend: "cell",
                                    fallbacks: {
                                        display: "-webkit-flex"
                                    },
                                    display: "flex",
                                    verticalAlign: "middle",
                                    overflow: "hidden",
                                    margin: "auto 0",
                                    lineHeight: "36px"
                                }
                            });
                            const s = g.create("div", {
                                class: t.classes.flightWrapper
                            });
                            i.appendChild(s), s.appendChild(o(r.originName)), t.add({
                                wayIcon: {
                                    display: "inline-block",
                                    verticalAlign: "middle",
                                    margin: "auto 6px",
                                    "& svg": {
                                        display: "block",
                                        opacity: "0.4"
                                    }
                                }
                            });
                            let c = null;
                            c = r.isOneWay ? this.getOneWaySvg() : this.getTwoWaySvg(), s.appendChild(g.create("div", {
                                class: t.classes.wayIcon,
                                append: c
                            })), s.appendChild(o(r.destinationName)), t.add({
                                dates: {
                                    extend: "cell",
                                    verticalAlign: "middle",
                                    margin: "auto 0 auto 10px",
                                    fontSize: "14px",
                                    color: "#978f6c"
                                },
                                "@media only screen and (max-width: 1050px)": {
                                    dates: {
                                        marginLeft: "5px",
                                        marginRight: "5px"
                                    }
                                }
                            });
                            const l = g.create("div", {
                                class: t.classes.dates
                            });
                            i.appendChild(l), l.appendChild(document.createTextNode(r.dateText)), t.add({
                                price: {
                                    verticalAlign: "middle",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    margin: "auto 10px",
                                    lineHeight: "23px",
                                    color: "#4b9f00",
                                    "& *": {
                                        fontWeight: "inherit",
                                        fontSize: "inherit",
                                        lineHeight: "inherit"
                                    }
                                },
                                "@media only screen and (max-width: 1050px)": {
                                    price: {
                                        fontSize: "16px",
                                        marginLeft: "5px",
                                        marginRight: "5px"
                                    }
                                }
                            }), n.appendChild(g.create("div", {
                                class: t.classes.price,
                                append: [ r.priceText ]
                            })), t.add({
                                openBtn: {
                                    extend: "cell",
                                    verticalAlign: "middle",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    color: "#FFF !important",
                                    margin: "auto 10px",
                                    padding: "10px 25px",
                                    backgroundColor: "#4b9f00 !important",
                                    borderRadius: "19px",
                                    textDecoration: "none !important",
                                    "&:hover": {
                                        backgroundColor: "#66ad26 !important",
                                        color: "#FFF !important"
                                    }
                                },
                                "@media only screen and (max-width: 1050px)": {
                                    openBtn: {
                                        fontSize: "14px",
                                        marginLeft: "5px",
                                        marginRight: "5px",
                                        paddingLeft: "10px",
                                        paddingRight: "10px"
                                    }
                                }
                            });
                            const d = g.create("a", {
                                class: t.classes.openBtn,
                                href: r.url,
                                target: "_blank",
                                append: [ r.open ]
                            });
                            g.jsLink(d, (function(t) {
                                e.content.onClick();
                            }));
                            return n.appendChild(d), {
                                node: n,
                                moreBtn: d,
                                moreBtnClick: function() {
                                    window.open(r.url), e.content.onClick();
                                },
                                onAppend: function() {
                                    v.emit("track", {
                                        cd: "flightshow",
                                        t: "screenview"
                                    }), v.emit("track", {
                                        ec: "cheapflight",
                                        ea: "show",
                                        el: e.siteTag,
                                        cd: "flightshow",
                                        t: "event",
                                        tid: "UA-70432435-15"
                                    }), r.isCalendar ? v.emit("track", {
                                        cd: "flight_calendar_show",
                                        t: "screenview"
                                    }) : (e.trackByVendor({
                                        ec: "cheapflight",
                                        ea: "show",
                                        el: e.siteTag,
                                        cd: "flightshow",
                                        t: "event"
                                    }), v.emit("track", {
                                        cd: "flight_betterprice_show",
                                        t: "screenview"
                                    }));
                                },
                                onReplace: function() {
                                    v.emit("track", {
                                        ec: "cheapflight",
                                        ea: "update",
                                        el: e.siteTag,
                                        t: "event"
                                    }), r.isCalendar ? v.emit("track", {
                                        cd: "flight_calendar_update",
                                        t: "screenview"
                                    }) : (e.trackByVendor({
                                        ec: "cheapflight",
                                        ea: "update",
                                        el: e.siteTag,
                                        t: "event"
                                    }), v.emit("track", {
                                        cd: "flight_betterprice_update",
                                        t: "screenview"
                                    }));
                                },
                                onShow: function() {
                                    r.isCalendar && v.emit("track", {
                                        ec: "cheapflight",
                                        ea: "calendarPrice",
                                        el: e.siteTag,
                                        t: "event"
                                    });
                                },
                                onClick: function() {
                                    v.emit("track", {
                                        cd: "flightclick",
                                        t: "screenview"
                                    }), v.emit("track", {
                                        ec: "cheapflight",
                                        ea: "bar_learn-more",
                                        el: e.siteTag,
                                        cd: "flightclick",
                                        t: "event",
                                        tid: "UA-70432435-15"
                                    }), r.isCalendar ? (v.emit("track", {
                                        cd: "flight_calendar_click",
                                        t: "screenview"
                                    }), v.emit("track", {
                                        ec: "cheapflight",
                                        ea: "calendarclick",
                                        el: e.siteTag,
                                        cd: "flight_calendar_click",
                                        t: "event"
                                    })) : (v.emit("track", {
                                        cd: "flight_betterprice_click",
                                        t: "screenview"
                                    }), v.emit("track", {
                                        ec: "cheapflight",
                                        ea: "betterpriceclick",
                                        el: e.siteTag,
                                        cd: "flight_betterprice_click",
                                        t: "event"
                                    }), e.trackByVendor({
                                        ec: "cheapflight",
                                        ea: "betterpriceclick",
                                        el: e.siteTag,
                                        cd: "flight_betterprice_click",
                                        t: "event"
                                    }));
                                },
                                onClose: function() {
                                    v.emit("track", {
                                        ec: "cheapflight",
                                        ea: "close",
                                        el: e.siteTag,
                                        t: "event",
                                        tid: "UA-70432435-15"
                                    }), e.trackByVendor({
                                        ec: "cheapflight",
                                        ea: "close",
                                        el: e.siteTag,
                                        t: "event"
                                    });
                                }
                            };
                        }
                        insertCarsBar() {
                            const e = this, t = e.wSheets.getSheet(), r = this.barContent, n = document.createDocumentFragment();
                            t.add({
                                cell: {
                                    fallbacks: {
                                        display: "inline-block"
                                    },
                                    verticalAlign: "middle",
                                    margin: "auto 5px"
                                }
                            }), t.add({
                                title: {
                                    extend: "cell",
                                    fontSize: "20px",
                                    margin: "auto 10px"
                                },
                                "@media only screen and (max-width: 1150px)": {
                                    title: {
                                        fontSize: "18px"
                                    }
                                },
                                "@media only screen and (max-width: 1050px)": {
                                    title: {
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        marginLeft: "5px",
                                        marginRight: "5px"
                                    }
                                }
                            }), n.appendChild(g.create("div", {
                                class: t.classes.title,
                                append: [ r.barTitle ]
                            })), t.add({
                                pointCell: {
                                    extend: "cell",
                                    fallbacks: {
                                        display: "-webkit-flex",
                                        WebkitFlexDirection: "column"
                                    },
                                    display: "flex",
                                    flexDirection: "column"
                                }
                            }), r.isOnePoint ? (t.add({
                                lineDateCell: {
                                    color: "#666"
                                }
                            }), n.appendChild(g.create("div", {
                                class: t.classes.pointCell,
                                append: [ g.create("div", {
                                    text: r.pickUpText
                                }), g.create("div", {
                                    class: t.classes.lineDateCell,
                                    text: r.dateText
                                }) ]
                            }))) : (n.appendChild(g.create("div", {
                                class: t.classes.pointCell,
                                append: [ g.create("div", {
                                    text: r.pickUpText
                                }), g.create("div", {
                                    text: r.dropOffText
                                }) ]
                            })), t.add({
                                dateCellPoint: {
                                    extend: "cell",
                                    fallbacks: {
                                        display: "-webkit-flex",
                                        WebkitFlexDirection: "column"
                                    },
                                    display: "flex",
                                    flexDirection: "column",
                                    marginLeft: 0,
                                    color: "#666"
                                }
                            }), n.appendChild(g.create("div", {
                                class: t.classes.dateCellPoint,
                                append: [ g.create("div", {
                                    text: r.pickUpDateText
                                }), g.create("div", {
                                    text: r.dropOffDateText
                                }) ]
                            }))), t.add({
                                carCell: {
                                    extend: "cell",
                                    fallbacks: {
                                        WebkitFlexGrow: 1
                                    },
                                    flexGrow: 1,
                                    margin: "auto 10px",
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                    overflow: "hidden",
                                    "& span": {
                                        textOverflow: "ellipsis",
                                        overflow: "hidden"
                                    }
                                },
                                "@media only screen and (max-width: 1050px)": {
                                    carCell: {
                                        fontSize: "14px",
                                        marginLeft: "5px",
                                        marginRight: "5px"
                                    }
                                }
                            });
                            const a = g.create("div", {
                                class: t.classes.carCell,
                                append: [ g.create("span", {
                                    text: r.vehicleName
                                }) ]
                            });
                            n.appendChild(a), t.add({
                                price: {
                                    extend: "cell",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    color: "#4b9f00",
                                    "& *": {
                                        fontWeight: "inherit",
                                        fontSize: "inherit",
                                        lineHeight: "inherit"
                                    }
                                },
                                "@media only screen and (max-width: 1050px)": {
                                    price: {
                                        fontSize: "16px"
                                    }
                                }
                            }), n.appendChild(g.create("div", {
                                class: t.classes.price,
                                append: [ r.priceText ]
                            })), t.add({
                                openBtn: {
                                    extend: "cell",
                                    fontSize: "16px",
                                    color: "#FFF !important",
                                    padding: "10px 20px",
                                    backgroundColor: "#4b9f00 !important",
                                    borderRadius: "19px",
                                    textDecoration: "none !important",
                                    "&:hover": {
                                        backgroundColor: "#66ad26 !important",
                                        color: "#FFF !important"
                                    }
                                },
                                "@media only screen and (max-width: 1050px)": {
                                    openBtn: {
                                        fontSize: "14px",
                                        paddingLeft: "10px",
                                        paddingRight: "10px"
                                    }
                                }
                            });
                            const i = g.create("a", {
                                class: t.classes.openBtn,
                                href: r.url,
                                target: "_blank",
                                append: [ r.open ]
                            });
                            g.jsLink(i, (function(t) {
                                e.content.onClick();
                            }));
                            return n.appendChild(i), {
                                node: n,
                                moreBtn: i,
                                moreBtnClick: function() {
                                    window.open(r.url), e.content.onClick();
                                },
                                onAppend: function() {
                                    v.emit("track", {
                                        cd: "carsshow",
                                        t: "screenview"
                                    }), v.emit("track", {
                                        ec: "cars",
                                        ea: "show",
                                        el: e.siteTag,
                                        cd: "carsshow",
                                        t: "event"
                                    });
                                },
                                onReplace: function() {
                                    v.emit("track", {
                                        ec: "cars",
                                        ea: "update",
                                        el: e.siteTag,
                                        t: "event"
                                    });
                                },
                                onShow: function() {},
                                onClick: function() {
                                    v.emit("track", {
                                        cd: "carsclick",
                                        t: "screenview"
                                    }), v.emit("track", {
                                        ec: "cars",
                                        ea: "click",
                                        el: e.siteTag,
                                        cd: "carsclick",
                                        t: "event"
                                    });
                                },
                                onClose: function() {
                                    v.emit("track", {
                                        ec: "cars",
                                        ea: "close",
                                        el: e.siteTag,
                                        t: "event"
                                    });
                                }
                            };
                        }
                        getHotelSuggests(e) {
                            const t = this, r = t.wDom, n = function(n) {
                                const a = t.wSheets.getSheet(), i = function() {
                                    const e = function(e) {
                                        const t = function(e) {
                                            const t = e.getBoundingClientRect();
                                            return {
                                                top: Math.round(t.top),
                                                left: Math.round(t.left + window.pageXOffset)
                                            };
                                        }(e), r = {
                                            width: (n = e).offsetWidth,
                                            height: n.offsetHeight
                                        };
                                        var n;
                                        let a = t.top + r.height;
                                        return a += 18, {
                                            width: 720,
                                            height: 480,
                                            right: 10,
                                            top: a
                                        };
                                    }(n), t = r.wGet(o);
                                    t.setStyle("width", e.width + "px"), t.setStyle("maxHeight", e.height + "px"), t.setStyle("right", e.right + "px"), 
                                    t.setStyle("top", e.top + "px");
                                };
                                a.add({
                                    layer: {
                                        display: "block",
                                        backgroundColor: "#fff",
                                        padding: "30px 0",
                                        margin: 0,
                                        overflow: "auto",
                                        boxSizing: "border-box",
                                        border: "1px solid #ccc",
                                        boxShadow: "0 10px 20px rgba(0,0,0,.4)",
                                        position: "fixed",
                                        zIndex: "2147483647",
                                        cursor: "default"
                                    }
                                });
                                const o = g.create("div", {
                                    class: a.classes.layer,
                                    on: [ "click", function(e) {
                                        e.stopPropagation();
                                    } ]
                                });
                                a.add({
                                    layerClose: {
                                        display: "block",
                                        position: "absolute",
                                        top: "5px",
                                        right: "5px",
                                        opacity: "0.3",
                                        "&:hover": {
                                            opacity: "0.7"
                                        }
                                    }
                                }), o.appendChild(g.create("a", {
                                    class: a.classes.layerClose,
                                    href: "#tbr-suggests-close",
                                    title: v.language.close,
                                    append: [ g.create(t.getCloseSvg("20")) ],
                                    on: [ "click", function(e) {
                                        e.preventDefault(), e.stopPropagation(), e.isTrusted && p();
                                    } ]
                                }));
                                const s = o.appendChild(g.create("div"));
                                a.add({
                                    suggest: {
                                        display: "table",
                                        width: "100%",
                                        height: "40px",
                                        fontSize: "15px",
                                        padding: "0 30px",
                                        boxSizing: "border-box",
                                        cursor: "pointer",
                                        "&:hover": {
                                            backgroundColor: "#fcefb4"
                                        }
                                    },
                                    suggestCell: {
                                        display: "table-cell",
                                        width: "100px",
                                        verticalAlign: "middle",
                                        padding: "0 5px",
                                        textAlign: "center"
                                    },
                                    suggestName: {
                                        extend: "suggestCell",
                                        width: "auto",
                                        textAlign: "left"
                                    },
                                    suggestStars: {
                                        extend: "suggestCell",
                                        width: "90px",
                                        paddingTop: "2px"
                                    },
                                    suggestDate: {
                                        extend: "suggestCell",
                                        width: "150px",
                                        fontSize: "14px",
                                        color: "#4a4a4a"
                                    },
                                    suggestPrice: {
                                        extend: "suggestCell",
                                        fontWeight: "bold"
                                    },
                                    suggestOpenBtn: {
                                        padding: "6px 15px",
                                        color: "#fff !important",
                                        backgroundColor: "#4b9f00",
                                        borderRadius: "3px",
                                        textDecoration: "none",
                                        fontWeight: "normal",
                                        whiteSpace: "pre",
                                        "&:hover": {
                                            backgroundColor: "#66ad26 !important"
                                        }
                                    }
                                }), e.slice(0, 6).forEach((function(e) {
                                    const r = function(e) {
                                        const r = {};
                                        return e && (r.verticalAlign = "text-bottom"), g.create(t.getStarSvg("#F0BE22", "16"), {
                                            style: r
                                        });
                                    }, n = g.create("span");
                                    for (let t = 0; t < e.stars; t++) n.appendChild(r());
                                    s.appendChild(g.create("div", {
                                        class: a.classes.suggest,
                                        on: [ "click", function(t) {
                                            t.stopPropagation(), t.preventDefault(), window.open(e.url), l();
                                        } ],
                                        append: [ g.create("div", {
                                            class: a.classes.suggestName,
                                            text: e.name
                                        }), g.create("div", {
                                            class: a.classes.suggestStars,
                                            append: [ n ]
                                        }), g.create("div", {
                                            class: a.classes.suggestDate,
                                            text: e.dateText
                                        }), g.create("div", {
                                            class: a.classes.suggestPrice,
                                            append: [ e.priceText ]
                                        }), g.create("div", {
                                            class: a.classes.suggestCell,
                                            append: [ g.jsLink(g.create("a", {
                                                class: a.classes.suggestOpenBtn,
                                                target: "_blank",
                                                href: e.url,
                                                text: e.open
                                            }), (function(e) {
                                                l();
                                            })) ]
                                        }) ]
                                    }));
                                }));
                                const c = document.createDocumentFragment();
                                c.appendChild(o), r.wGet(t.body.node).appendChild(c);
                                const l = function() {
                                    v.emit("track", {
                                        cd: "hotelclick",
                                        t: "screenview"
                                    }), v.emit("track", {
                                        ec: "hotel",
                                        ea: "suggestClick",
                                        el: t.siteTag,
                                        cd: "hotelclick",
                                        t: "event"
                                    });
                                }, d = function e() {
                                    document.body.removeEventListener("click", e), p();
                                }, u = function() {
                                    f.show = !0, document.body.addEventListener("click", d), r.wGet(o).setStyle("display", "block"), 
                                    i(), v.emit("track", {
                                        ec: "hotel",
                                        ea: "suggestsShow",
                                        el: t.siteTag,
                                        cd: "hotelshow",
                                        t: "event"
                                    });
                                }, p = function() {
                                    f.show = !1, r.wGet(o).setStyle("display", "none"), clearTimeout(h);
                                }, f = {
                                    show: !0,
                                    toggle: function() {
                                        "none" === o.style.display ? u() : p();
                                    }
                                };
                                a.sync(), u();
                                let h = null;
                                return function(e) {
                                    e.addEventListener("mouseenter", (function() {
                                        clearTimeout(h);
                                    })), e.addEventListener("mouseleave", (function() {
                                        clearTimeout(h), h = setTimeout((function() {
                                            f.show && p();
                                        }), 1500);
                                    }));
                                }(o), f;
                            };
                            return function() {
                                const e = t.wSheets.getSheet();
                                e.add({
                                    cell: {
                                        fallbacks: {
                                            display: "inline-block"
                                        }
                                    }
                                }), e.add({
                                    moreBtn: {
                                        extend: "cell",
                                        verticalAlign: "middle",
                                        fontSize: "14px",
                                        fontWeight: "normal !important",
                                        color: "#000 !important",
                                        margin: "auto 5px",
                                        padding: "8px 18px",
                                        backgroundColor: "rgba(255, 255, 255, 0.30) !important",
                                        borderRadius: "19px",
                                        boxShadow: "0 0 1px rgba(0,0,0,0.40)",
                                        textDecoration: "none !important",
                                        "&:hover": {
                                            backgroundColor: "rgba(255, 255, 255, 0.70) !important",
                                            color: "#000 !important"
                                        }
                                    },
                                    "@media only screen and (max-width: 1050px)": {
                                        moreBtn: {
                                            fontSize: "12px",
                                            marginLeft: "2px",
                                            marginRight: "2px",
                                            paddingLeft: "7px",
                                            paddingRight: "7px"
                                        }
                                    }
                                });
                                let r = null, a = !1;
                                const i = function() {
                                    r ? a || r.toggle() : r = n(o);
                                }, o = g.create("a", {
                                    class: e.classes.moreBtn,
                                    href: "#tbr-suggests",
                                    append: [ v.language.suggests ],
                                    on: [ "click", function(e) {
                                        e.preventDefault(), e.stopPropagation(), clearTimeout(s), i();
                                    } ]
                                });
                                let s = null;
                                var c;
                                return (c = o).addEventListener("mouseenter", (function() {
                                    clearTimeout(s), s = setTimeout((function() {
                                        r && r.show || (i(), clearTimeout(a), a = setTimeout((function() {
                                            a = !1;
                                        }), 500));
                                    }), 250);
                                })), c.addEventListener("mouseleave", (function() {
                                    clearTimeout(s);
                                })), o;
                            }();
                        }
                        insertHotelBar() {
                            const e = this, t = e.wSheets.getSheet(), r = this.barContent, n = document.createDocumentFragment();
                            t.add({
                                cell: {
                                    fallbacks: {
                                        display: "inline-block"
                                    }
                                }
                            }), t.add({
                                title: {
                                    extend: "cell",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    margin: "auto 10px",
                                    lineHeight: "23px",
                                    verticalAlign: "middle"
                                },
                                "@media only screen and (max-width: 1150px)": {
                                    title: {
                                        fontSize: "18px"
                                    }
                                },
                                "@media only screen and (max-width: 1050px)": {
                                    title: {
                                        fontSize: "14px",
                                        marginLeft: "5px",
                                        marginRight: "5px"
                                    }
                                }
                            }), n.appendChild(g.create("div", {
                                class: t.classes.title,
                                append: [ r.barTitle ]
                            })), t.add({
                                hotelInfoCell: {
                                    extend: "cell",
                                    fallbacks: {
                                        display: "-webkit-flex",
                                        WebkitFlexGrow: 2
                                    },
                                    display: "flex",
                                    flexGrow: 2,
                                    verticalAlign: "middle",
                                    overflow: "hidden"
                                }
                            });
                            const a = g.create("div", {
                                class: t.classes.hotelInfoCell
                            });
                            n.appendChild(a);
                            const i = function(t) {
                                const r = {};
                                return t && (r.verticalAlign = "text-bottom"), g.create(e.getStarSvg(null, "16"), {
                                    style: r
                                });
                            };
                            t.add({
                                starsFull: {
                                    display: "inline-block",
                                    verticalAlign: "middle",
                                    margin: "auto 0",
                                    marginTop: "3px"
                                },
                                "@media only screen and (max-width: 1050px)": {
                                    starsFull: {
                                        display: "none"
                                    }
                                }
                            });
                            const o = g.create("span", {
                                class: t.classes.starsFull
                            });
                            for (let e = 0; e < r.stars; e++) o.appendChild(i());
                            t.add({
                                info: {
                                    extend: "cell",
                                    fallbacks: {
                                        display: "-webkit-flex"
                                    },
                                    display: "flex",
                                    height: "38px",
                                    border: "1px solid rgba(0,0,0,0.10)",
                                    margin: "auto 10px",
                                    borderRadius: "19px",
                                    padding: "0 15px",
                                    boxSizing: "border-box",
                                    lineHeight: "36px",
                                    overflow: "hidden"
                                },
                                hotel: {
                                    textOverflow: "ellipsis",
                                    margin: "auto",
                                    color: "#000",
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                    overflow: "hidden"
                                },
                                "@media only screen and (max-width: 1050px)": {
                                    info: {
                                        marginLeft: "5px",
                                        marginRight: "5px",
                                        paddingLeft: "5px",
                                        paddingRight: "5px"
                                    }
                                }
                            });
                            const s = g.create("div", {
                                class: t.classes.info,
                                append: [ g.create("span", {
                                    class: t.classes.hotel,
                                    title: r.name + function() {
                                        let e = "";
                                        for (let t = 0; t < r.stars; t++) e += String.fromCharCode(9733);
                                        return e && (e = " " + e), e;
                                    }(),
                                    text: r.name
                                }) ]
                            });
                            if (a.appendChild(s), s.appendChild(o), r.stars > 0) {
                                t.add({
                                    starsShort: {
                                        display: "none",
                                        verticalAlign: "middle",
                                        margin: "auto 0 auto 5px"
                                    },
                                    "@media only screen and (max-width: 1050px)": {
                                        starsShort: {
                                            display: "inline-block"
                                        }
                                    }
                                });
                                const e = g.create("span", {
                                    class: t.classes.starsShort,
                                    append: [ r.stars, i(!0) ]
                                });
                                s.appendChild(e);
                            }
                            t.add({
                                dates: {
                                    extend: "cell",
                                    verticalAlign: "middle",
                                    margin: "auto 0 auto 10px",
                                    fontSize: "14px",
                                    color: "#978f6c"
                                },
                                "@media only screen and (max-width: 1050px)": {
                                    dates: {
                                        marginLeft: "5px",
                                        marginRight: "5px"
                                    }
                                }
                            });
                            const c = g.create("div", {
                                class: t.classes.dates,
                                text: r.dateText
                            });
                            s.appendChild(c), t.add({
                                price: {
                                    extend: "cell",
                                    verticalAlign: "middle",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    margin: "auto 10px",
                                    lineHeight: "23px",
                                    color: "#4b9f00",
                                    "& *": {
                                        fontWeight: "inherit",
                                        fontSize: "inherit",
                                        lineHeight: "inherit"
                                    }
                                },
                                "@media only screen and (max-width: 1050px)": {
                                    price: {
                                        fontSize: "16px",
                                        marginLeft: "5px",
                                        marginRight: "5px"
                                    }
                                }
                            }), n.appendChild(g.create("div", {
                                class: t.classes.price,
                                append: [ r.priceText ]
                            })), t.add({
                                openBtn: {
                                    extend: "cell",
                                    verticalAlign: "middle",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    color: "#FFF !important",
                                    margin: "auto 10px",
                                    padding: "10px 25px",
                                    backgroundColor: "#4b9f00 !important",
                                    borderRadius: "19px",
                                    textDecoration: "none",
                                    "&:hover": {
                                        backgroundColor: "#66ad26 !important",
                                        color: "#FFF !important"
                                    }
                                },
                                "@media only screen and (max-width: 1050px)": {
                                    openBtn: {
                                        fontSize: "14px",
                                        marginLeft: "5px",
                                        marginRight: "5px",
                                        paddingLeft: "10px",
                                        paddingRight: "10px"
                                    }
                                }
                            });
                            const l = g.create("a", {
                                class: t.classes.openBtn,
                                href: r.url,
                                target: "_blank",
                                append: [ r.open ]
                            });
                            g.jsLink(l, (function(t) {
                                e.content.onClick();
                            }));
                            if (n.appendChild(l), r.suggestList.length) {
                                const t = e.getHotelSuggests(r.suggestList);
                                n.appendChild(t);
                            }
                            return {
                                node: n,
                                moreBtn: l,
                                moreBtnClick: function() {
                                    window.open(r.url), e.content.onClick();
                                },
                                onAppend: function() {
                                    v.emit("track", {
                                        cd: "hotelshow",
                                        t: "screenview"
                                    }), v.emit("track", {
                                        ec: "hotel",
                                        ea: "show",
                                        el: e.siteTag,
                                        cd: "hotelshow",
                                        t: "event"
                                    }), e.barContent.isSuggest && (v.emit("track", {
                                        cd: "hotelNearbyShow",
                                        t: "screenview"
                                    }), v.emit("track", {
                                        ec: "hotel",
                                        ea: "nearbyShow",
                                        el: e.siteTag,
                                        cd: "hotelNearbyShow",
                                        t: "event"
                                    }));
                                },
                                onReplace: function() {
                                    v.emit("track", {
                                        ec: "hotel",
                                        ea: "update",
                                        el: e.siteTag,
                                        t: "event"
                                    }), e.barContent.isSuggest && (v.emit("track", {
                                        cd: "hotelNearbyUpdate",
                                        t: "screenview"
                                    }), v.emit("track", {
                                        ec: "hotel",
                                        ea: "nearbyUpdate",
                                        el: e.siteTag,
                                        cd: "hotelNearbyUpdate",
                                        t: "event"
                                    }));
                                },
                                onShow: function() {},
                                onClick: function() {
                                    v.emit("track", {
                                        cd: "hotelclick",
                                        t: "screenview"
                                    }), v.emit("track", {
                                        ec: "hotel",
                                        ea: "click",
                                        el: e.siteTag,
                                        cd: "hotelclick",
                                        t: "event"
                                    }), e.barContent.isSuggest && (v.emit("track", {
                                        cd: "hotelNearbyClick",
                                        t: "screenview"
                                    }), v.emit("track", {
                                        ec: "hotel",
                                        ea: "nearbyClick",
                                        el: e.siteTag,
                                        cd: "hotelNearbyClick",
                                        t: "event"
                                    }));
                                },
                                onClose: function() {
                                    v.emit("track", {
                                        ec: "hotel",
                                        ea: "close",
                                        el: e.siteTag,
                                        t: "event"
                                    });
                                }
                            };
                        }
                        getContent() {
                            return "hotel" === this.type ? this.insertHotelBar() : "avia" === this.type ? this.insertAviaBar() : "cars" === this.type ? this.insertCarsBar() : void 0;
                        }
                        getStyle() {
                            const e = this, t = e.wDom.createElement("style", {}, e.wSheets.toString());
                            return e.wSheets.onChange = function() {
                                t.setText(e.wSheets.toString());
                            }, {
                                node: t.getNode()
                            };
                        }
                        getProfileSvg(e, t, r, n) {
                            if (v.currentProfile.getSvgTemplate) {
                                const a = v.currentProfile.getSvgTemplate(e, {
                                    width: t,
                                    height: r,
                                    color: n
                                });
                                if (a) {
                                    const e = (t, r) => {
                                        const [n, a = {}, i = []] = t, o = document.createElementNS(r, n);
                                        for (let e in a) o.setAttribute(e, a[e]);
                                        return i.forEach(t => {
                                            o.appendChild(e(t, o.namespaceURI));
                                        }), o;
                                    };
                                    return e(a, "http://www.w3.org/2000/svg");
                                }
                            }
                        }
                        getCloseSvg(e, t) {
                            const r = this.getProfileSvg("close", e, t);
                            if (r) return r;
                            const n = document.createElementNS("http://www.w3.org/2000/svg", "svg"), a = n.namespaceURI;
                            n.setAttribute("width", e || "80"), n.setAttribute("height", t || e || "80"), n.setAttribute("viewBox", "0 0 80 80");
                            const i = document.createElementNS(a, "path");
                            return n.appendChild(i), i.setAttribute("fill", "#000"), i.setAttribute("d", "M56.971 52.729L44.243 40l12.728-12.728-4.242-4.243L40 35.757 27.272 23.029l-4.243 4.243L35.757 40 23.029 52.729l4.243 4.242L40 44.243l12.729 12.728z"), 
                            n;
                        }
                        getOneWaySvg() {
                            const e = this.getProfileSvg("oneWay");
                            if (e) return e;
                            const t = document.createElementNS("http://www.w3.org/2000/svg", "svg"), r = t.namespaceURI;
                            t.setAttribute("width", "24px"), t.setAttribute("height", "24px"), t.setAttribute("viewBox", "4 4 24 24");
                            const n = document.createElementNS(r, "path");
                            return t.appendChild(n), n.setAttribute("fill", "#000"), n.setAttribute("d", "M4.538 16.618h21.626l-4.48 4.463a.537.537 0 0 0 0 .761c.21.211.551.211.761 0l5.328-5.327a.543.543 0 0 0 0-.762l-5.328-5.327a.537.537 0 0 0-.761 0 .537.537 0 0 0 0 .761l4.48 4.354H4.538a.538.538 0 1 0 0 1.077z"), 
                            t;
                        }
                        getTwoWaySvg() {
                            const e = this.getProfileSvg("twoWay");
                            if (e) return e;
                            const t = document.createElementNS("http://www.w3.org/2000/svg", "svg"), r = t.namespaceURI;
                            t.setAttribute("width", "24px"), t.setAttribute("height", "24px"), t.setAttribute("viewBox", "4 4 24 24");
                            const n = document.createElementNS(r, "path");
                            return t.appendChild(n), n.setAttribute("fill", "#000"), n.setAttribute("d", "M27.391 10.382H5.764l4.481-4.463a.538.538 0 0 0-.761-.761l-5.328 5.328a.542.542 0 0 0 0 .761l5.328 5.328a.538.538 0 0 0 .761-.761L5.764 11.46H27.39a.539.539 0 0 0 .001-1.078zM4.538 21.618h21.626l-4.48 4.463a.537.537 0 0 0 0 .761c.21.211.551.211.761 0l5.328-5.327a.543.543 0 0 0 0-.762l-5.328-5.327a.537.537 0 0 0-.761 0 .537.537 0 0 0 0 .761l4.48 4.354H4.538a.538.538 0 1 0 0 1.077z"), 
                            t;
                        }
                        getStarSvg(e, t, r) {
                            const n = this.getProfileSvg("star", t, r, e);
                            if (n) return n;
                            const a = document.createElementNS("http://www.w3.org/2000/svg", "svg"), i = a.namespaceURI;
                            a.setAttribute("width", t || "24"), a.setAttribute("height", r || t || "24"), a.setAttribute("viewBox", "0 0 24 24"), 
                            e = e || "#000";
                            const o = document.createElementNS(i, "path");
                            return a.appendChild(o), o.setAttribute("fill", e), o.setAttribute("d", "M9.362 9.158l-5.268.584c-.19.023-.358.15-.421.343s0 .394.14.521c1.566 1.429 3.919 3.569 3.919 3.569-.002 0-.646 3.113-1.074 5.19a.504.504 0 0 0 .196.506.494.494 0 0 0 .538.027c1.844-1.047 4.606-2.623 4.606-2.623l4.604 2.625c.168.092.379.09.541-.029a.5.5 0 0 0 .195-.505l-1.07-5.191s2.353-2.14 3.918-3.566a.499.499 0 0 0-.279-.865c-2.108-.236-5.27-.586-5.27-.586l-2.183-4.83a.499.499 0 1 0-.909 0l-2.183 4.83z"), 
                            a;
                        }
                        getBody() {
                            const e = this, t = e.wDom, r = e.wSheets.getSheet();
                            r.add({
                                body: {
                                    extend: g.styleReset,
                                    backgroundColor: "#fcefb4",
                                    color: "#000",
                                    cursor: "pointer",
                                    marginTop: "0px",
                                    display: "table !important",
                                    opacity: "1 !important",
                                    position: "fixed",
                                    top: "0px",
                                    left: "0px",
                                    fontWeight: "normal",
                                    font: "normal normal 14px Arial, sans-serif",
                                    width: "100%",
                                    height: "55px",
                                    lineHeight: "normal",
                                    zIndex: "2147483647",
                                    "&:hover": {
                                        backgroundColor: "#ffeb91"
                                    }
                                },
                                itemLeft: {
                                    display: "table-cell",
                                    verticalAlign: "middle"
                                },
                                itemLeftCloseBtn: {
                                    marginLeft: "4px",
                                    marginTop: "10px"
                                },
                                itemMiddle: {
                                    display: "table-cell",
                                    verticalAlign: "middle",
                                    textAlign: "center"
                                },
                                content: {
                                    maxWidth: "1100px",
                                    display: "inline-block",
                                    width: "100%",
                                    textAlign: "left",
                                    position: "relative"
                                },
                                contentChild: {
                                    fallbacks: [ {
                                        display: "block"
                                    }, {
                                        WebkitAlignItems: "center",
                                        WebkitFlexDirection: "row",
                                        display: "-webkit-flex"
                                    } ],
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    whiteSpace: "pre"
                                },
                                closeBtn: {
                                    width: "45px",
                                    opacity: "0.3",
                                    display: "block",
                                    height: "45px",
                                    textAlign: "center",
                                    cursor: "pointer",
                                    "&:hover": {
                                        opacity: "0.7"
                                    }
                                },
                                rightPadding: {
                                    width: "45px",
                                    display: "table-cell",
                                    verticalAlign: "middle"
                                },
                                "@media only screen and (max-width: 1150px)": {
                                    content: {
                                        maxWidth: "960px"
                                    }
                                },
                                "@media only screen and (max-width: 1050px)": {
                                    content: {
                                        maxWidth: "810px"
                                    },
                                    closeBtn: {
                                        width: "24px"
                                    },
                                    rightPadding: {
                                        width: "24px"
                                    }
                                },
                                "@media only screen and (max-width: 850px)": {
                                    content: {
                                        maxWidth: "700px"
                                    }
                                }
                            });
                            let n = null;
                            const a = g.create("div", {
                                class: r.classes.body,
                                style: {
                                    position: "fixed",
                                    top: "0px",
                                    left: "0px",
                                    display: "table",
                                    width: "100%",
                                    height: "55px",
                                    lineHeight: "normal",
                                    opacity: "1",
                                    zIndex: "2147483647"
                                },
                                on: [ "click", function(t) {
                                    t.stopPropagation(), t.preventDefault(), e.content.moreBtnClick();
                                } ],
                                append: [ g.create("div", {
                                    class: r.classes.itemLeft,
                                    append: g.create("a", {
                                        class: r.classes.closeBtn,
                                        href: "#close",
                                        title: v.language.close,
                                        on: [ "click", function(t) {
                                            t.preventDefault(), t.stopPropagation(), t.isTrusted && (e.close(!0), e.content.onClose());
                                        } ],
                                        append: g.create(e.getCloseSvg("24"), {
                                            class: r.classes.itemLeftCloseBtn
                                        })
                                    })
                                }), g.create("div", {
                                    class: r.classes.itemMiddle,
                                    append: g.create("div", {
                                        class: r.classes.content,
                                        append: n = g.create("div", {
                                            class: r.classes.contentChild
                                        })
                                    })
                                }), g.create("div", {
                                    class: r.classes.rightPadding
                                }) ]
                            });
                            t.wGet(a).setCheckStyles([ "display", "position", "top", "left", "marginTop", "marginLeft", "marginRight", "marginBottom", "opacity", "zIndex", "transform", "visibility" ]);
                            const i = function(e) {
                                e.stopPropagation();
                            }, o = [ !1, !0 ];
                            return [ "pointerdown", "pointerenter", "pointerleave", "pointermove", "pointerout", "pointerover", "pointerup" ].concat([ "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseout", "mouseout", "mouseup" ]).forEach((function(e) {
                                o.forEach((function(t) {
                                    "mouseenter" === e && t || a.addEventListener(e, i, t);
                                }));
                            })), {
                                node: a,
                                content: n
                            };
                        }
                        insertBody(e) {
                            let t = document.body;
                            const r = v.currentProfile;
                            let n = r.bodySelector;
                            if (n) {
                                "function" == typeof n && (n = r.bodySelector());
                                const e = document.querySelector(n);
                                e ? t = e : v.error("Body insert container is not found!");
                            }
                            const a = this.wrapNode(e.node), i = a.strip();
                            return this.wDom.get(i).setAttribute("style", "display: none;"), t.appendChild(i), 
                            e.removeWatcher.start(), new Promise(e => setTimeout(e, 1)).then(() => {
                                a.restore();
                            });
                        }
                        replaceBody(e, t) {
                            const r = t.parentNode;
                            if (!r) return this.insertBody(e);
                            const n = this.wrapNode(e.node), a = n.strip();
                            return this.wDom.get(a).setAttribute("style", "display: none;"), r.replaceChild(a, t), 
                            e.removeWatcher.start(), new Promise(e => setTimeout(e, 1)).then(() => {
                                n.restore();
                            });
                        }
                        insertStyle(e) {
                            let t = document.body;
                            const r = v.currentProfile;
                            let n = r.styleSelector;
                            if (n) {
                                "function" == typeof n && (n = r.styleSelector());
                                const e = document.querySelector(n);
                                e ? t = e : v.error("Style insert container is not found!");
                            }
                            const a = this.wrapNode(e.node);
                            return t.appendChild(a.strip()), e.removeWatcher.start(), new Promise(e => setTimeout(e, 1)).then(() => {
                                a.restore();
                            });
                        }
                        replaceStyle(e, t) {
                            const r = t.parentNode;
                            if (!r) return this.insertStyle(e);
                            const n = this.wrapNode(e.node);
                            return r.replaceChild(n.strip(), t), e.removeWatcher.start(), new Promise(e => setTimeout(e, 1)).then(() => {
                                n.restore();
                            });
                        }
                        destroy() {
                            this.styleWatcher.destroy(), this.body.changeWatcher.destroy(), this.style.changeWatcher.destroy(), 
                            this.body.removeWatcher.destroy(), this.style.removeWatcher.destroy(), this.wDom.destroy();
                        }
                        remove() {
                            if (!this.isRemoved) {
                                this.isRemoved = !0, this.destroy();
                                let e = this.body.node.parentNode;
                                e && e.removeChild(this.body.node), e = this.style.node.parentNode, e && e.removeChild(this.style.node);
                            }
                        }
                        wrapNode(e) {
                            const t = [], r = e => {
                                const n = this.wDom.get(e);
                                return [].slice.call(n.refNode.attributes).forEach(e => {
                                    t.push({
                                        type: "setAttribute",
                                        wNode: n,
                                        name: e.name,
                                        value: e.value
                                    }), n.removeAttribute(e.name);
                                }), [].slice.call(n.refNode.childNodes).forEach(e => {
                                    const n = this.wDom.getByRef(e);
                                    3 === n.refNode.nodeType ? (t.push({
                                        type: "setTextContent",
                                        wNode: n,
                                        value: n.refNode.textContent
                                    }), n.setTextContent("")) : 1 === n.refNode.nodeType && r(n.node);
                                }), e;
                            };
                            return {
                                strip: () => r(e),
                                restore: () => {
                                    t.splice(0).forEach(e => {
                                        const t = e.wNode;
                                        switch (e.type) {
                                          case "setAttribute":
                                            t.setAttribute(e.name, e.value);
                                            break;

                                          case "setTextContent":
                                            t.setTextContent(e.value);
                                        }
                                    });
                                }
                            };
                        }
                        insert() {
                            const e = this.body, t = this.style;
                            return Promise.all([ this.insertBody(e), this.insertStyle(t) ]).then(() => {
                                r(this, !0), this.styleWatcher.start();
                            });
                        }
                        replace(e) {
                            e.isRemoved = !0, e.isClosed = !0, e.destroy();
                            const t = e.body, r = this.body, n = e.style, a = this.style;
                            return Promise.all([ this.replaceBody(r, t.node), this.replaceStyle(a, n.node) ]).then(() => {
                                this.styleWatcher.start();
                            });
                        }
                        close(t) {
                            const a = this;
                            try {
                                if (!this.isClosed && (this.isClosed = !0, this.remove(), r(this, !1), t)) return e.watcher.stopObserver(), 
                                n.sendMessage({
                                    action: "tbrCloseBar",
                                    hostname: a.siteTag
                                });
                            } catch (e) {
                                v.trackError(e);
                            }
                        }
                    }
                    return {
                        current: null,
                        create: function(e) {
                            const t = this.current, r = this.current = new i(e);
                            let n = !1;
                            return Promise.resolve().then(() => t && !t.isClosed ? (n = !0, r.replace(t)) : r.insert()).then(() => {
                                n ? r.content.onReplace() : r.content.onAppend(), r.content.onShow();
                            });
                        },
                        aviaBarSaveInHistory: function(e, t) {
                            if (!v.appInfo.history) return;
                            let r = "", n = "", a = "", i = "";
                            if (t.data.some((function(e) {
                                return r = e.origin, n = e.originName, a = e.destination, i = e.destinationName, 
                                !0;
                            })), r && n && a && i) {
                                const t = {
                                    origin: r,
                                    originCity: n,
                                    destination: a,
                                    destinationCity: i,
                                    dateStart: e.dateStart,
                                    dateEnd: e.dateEnd,
                                    time: parseInt(Date.now() / 1e3)
                                };
                                return v.emit("history", t);
                            }
                        }
                    };
                }, le = function() {
                    const e = v.main, t = {
                        price: function(e, t, r) {
                            const n = e.page;
                            r.key || (r.key = "price");
                            let a, i = 0;
                            for (;a = t.added[i]; i++) {
                                const e = g.preparePrice(a.textContent);
                                n.setPrice(r.key, e);
                            }
                        },
                        currency: function(e, t, r) {
                            const n = e.page;
                            r.key || (r.key = "currency");
                            let a, i = 0;
                            for (;a = t.added[i]; i++) {
                                const e = a.textContent;
                                let t = e && e.replace(/[\s\t]/g, "");
                                r.currencyMap && r.currencyMap[t] && (t = r.currencyMap[t]), n.set(r.key, t);
                            }
                        }
                    }, r = function(t) {
                        const r = this;
                        let n = null;
                        const a = {}, i = {};
                        this.getParams = () => a;
                        const o = function() {
                            if (!n) return;
                            const r = e[n].page.getPriceId(a);
                            delete c().barRequestData, function() {
                                for (let e in i) delete i[e];
                            }(), t.matchPrice = !!r;
                        }, s = g.debounce((function(t) {
                            const i = e[n].page.getData(a, t);
                            i && r.setData(n, i);
                        }), 50);
                        this.setData = function(e, t) {
                            t.type = e;
                            const r = c();
                            for (let e in t) r[e] = t[e];
                            l(t);
                        }, this.setType = function(e) {
                            n = e;
                        }, this.set = function(e, t) {
                            t = g.validate(e, t);
                            const r = a[e];
                            var n, i;
                            n = t, i = r, (Array.isArray(n) && i ? JSON.stringify(n) === JSON.stringify(i) : n === i) || (a[e] = t, 
                            v.log("Page set", e, t), o());
                        }, this.get = function(e) {
                            return a[e] || null;
                        }, this.setPrice = function(t, r) {
                            if (!(r = g.validate(t, r))) return v.error("setPrice error, value is not valid", t, r);
                            if (!n) return v.error("setPrice error, type is not found!", a);
                            const o = function(e) {
                                let t = i[e];
                                return t || (i[e] = t = {}), t;
                            }(e[n].page.getPriceId(a)), c = o[t];
                            r && c !== r && (!c || c > r) && (o[t] = r, v.log("Page setPrice", t, r), s(o));
                        }, this.clear = function() {
                            v.log("Page clear"), t.matchPrice = !1, n = null;
                            for (let e in a) a[e] = null;
                        };
                    }, n = function(e, t) {
                        let r = null;
                        this.stop = function() {
                            r && r.stop(), r = null;
                        }, this.start = function() {
                            r && r.stop(), r = function(e, t) {
                                const r = [], n = [];
                                return Object.keys(t).forEach((function(e) {
                                    let a = t[e].query;
                                    return Array.isArray(a) || (a = [ a ]), a.forEach((function(t) {
                                        n.push(e), r.push(t);
                                    }));
                                })), g.mutationWatcher.run({
                                    callback: function(r) {
                                        let a, i = 0;
                                        for (;a = r[i]; i++) {
                                            if (0 === a.added.length && 0 === a.removed.length) continue;
                                            const r = t[n[i]];
                                            e.summaryStack.push([ r, a ]);
                                        }
                                    },
                                    queries: r
                                });
                            }(e, t);
                        }, this.destroy = this.stop;
                    }, a = function(e) {
                        const r = [], n = t, a = function() {
                            const t = r.length;
                            if (t > 30 && r.shift(), 1 === t) return function t() {
                                const a = r[0];
                                if (!a) return;
                                const i = a[0], o = a[1];
                                let s = Promise.resolve();
                                i.isPrice && !e.matchPrice || (i.cb && (s = s.then((function() {
                                    return i.cb(e, o);
                                }))), i.template && (s = s.then((function() {
                                    return (0, n[i.template])(e, o, i);
                                })))), s.catch((function(e) {
                                    v.error("Parse item error!", e), v.trackError(e);
                                })).then((function() {
                                    const e = r.indexOf(a);
                                    -1 !== e && r.splice(e, 1), t();
                                }));
                            }();
                        };
                        this.push = function(e) {
                            return r.push(e), a();
                        };
                    }, i = function(e) {
                        const t = this, i = {};
                        for (let t in e.formWatcher) i[t] = e.formWatcher[t];
                        for (let t in e.priceWatcher) i[t] = e.priceWatcher[t], i[t].isPrice = !0;
                        t.matchPrice = !1, t.summaryStack = new a(t), t.watcher = new n(t, i), t.page = new r(t), 
                        t.watcher.start(), t.destroy = function() {
                            t.watcher && t.watcher.destroy();
                        };
                    };
                    let o = null;
                    const s = {}, c = function() {
                        const e = location.href;
                        let t = s[e];
                        return t || (t = s[e] = {}), t.adultTickets = o.page.getParams().adultTickets, t.childTickets = o.page.getParams().childTickets, 
                        t;
                    }, l = function() {
                        const t = c(), r = e[t.type];
                        return r ? r.onGetData(t) : v.error("Type is not found!", t);
                    };
                    return {
                        closeCurrentBar: function() {
                            const t = e.bar.current;
                            e.bar.isAborted = !0, t && !t.isClosed && t.close();
                        },
                        stopObserver: function() {
                            o && o.destroy();
                        },
                        clearInfoObj: function(e) {
                            for (let t in s) s[t] !== e && delete s[t];
                        },
                        initProfile: function(e) {
                            o && o.destroy(), o = new i(e);
                        }
                    };
                };
                const de = "UA-70432435-15", ue = "skyscanner";
                !function(e) {
                    if (-1 !== [ "interactive", "complete" ].indexOf(document.readyState)) e(); else {
                        const t = function t() {
                            document.removeEventListener("DOMContentLoaded", t, !1), window.removeEventListener("load", t, !1), 
                            e();
                        };
                        document.addEventListener("DOMContentLoaded", t, !1), window.addEventListener("load", t, !1);
                    }
                }((function() {
                    Promise.resolve().then((function() {
                        if (!document.body) throw new s("Not document!");
                        if (g.isFrame()) throw new s("Inside frame!");
                        if (g.isDeny()) throw new s("Is deny!");
                        v.hostname = location.hostname, v.siteTag = "unknown";
                        const e = function() {
                            const e = location.origin || location.protocol + "//" + location.hostname, t = P, r = Object.keys(t);
                            let n, a, i = {}, o = 0;
                            for (;a = r[o]; o++) if (n = new RegExp(_(a)), n.test(e)) {
                                i.pattern = a;
                                const [e, r] = t[a];
                                i.id = e, i.tag = r;
                                break;
                            }
                            return i.id || (i = null), i;
                        }();
                        if (!e) throw v.error("Profile is not exists!", location.href), new s("Profile is not exists!");
                        return v.siteTag = e.tag, n.sendMessagePromise = function(e) {
                            return new Promise((function(t) {
                                try {
                                    n.sendMessage(e, t);
                                } catch (e) {
                                    throw v.error("API error", e), new s("API error");
                                }
                            }));
                        }, function() {
                            if (!/skyscanner\./.test(location.href)) return;
                            const e = document.querySelector("#skhot");
                            e && e.addEventListener("click", e => {
                                document.referrer && !/skyscanner\./.test(document.referrer) && v.emit("track", {
                                    ec: ue,
                                    tid: de,
                                    ea: "hotel_search"
                                });
                            });
                            const t = document.querySelector("#carhi");
                            t && t.addEventListener("click", e => {
                                document.referrer && !/skyscanner\./.test(document.referrer) && v.emit("track", {
                                    ec: ue,
                                    tid: de,
                                    ea: "car_search"
                                });
                            });
                            const r = document.querySelector("#app-root");
                            /skyscanner\.\w+\/hotels/.test(location.href) && new oe(r, e => {
                                let {addedNodes: t} = e;
                                t.forEach(e => {
                                    if (e.tagName && "SECTION" === e.tagName) {
                                        const t = [ '[class*="OtherRatesRow_OtherRatesRow"] a', '[class*="MainRate_MainRate__ctaButton"] a', '[class*="MainRate_MainRate__ctaButton"] button' ], r = e.querySelectorAll(t.join(","));
                                        r.length && r.forEach(e => {
                                            e.addEventListener("click", () => {
                                                v.emit("track", {
                                                    ec: ue,
                                                    tid: de,
                                                    ea: "hotel-choose"
                                                });
                                            });
                                        });
                                    }
                                });
                            }).start(), /skyscanner\.\w+\/carhire/.test(location.href) && new oe(r, e => {
                                let {addedNodes: t} = e;
                                t.forEach(e => {
                                    if (!e.tagName) return;
                                    const t = e.querySelector('seciton[class*="CarGroupPanel_CarGroupPanel"]');
                                    if (t) {
                                        const e = t.querySelector("button");
                                        e && e.addEventListener("click", () => v.emit("track", {
                                            ec: ue,
                                            tid: de,
                                            ea: "car-choose"
                                        }));
                                    }
                                });
                            }).start(), /skyscanner\.\w+\/transport\/flights/.test(location.href) && new oe(r, e => {
                                let {addedNodes: t} = e;
                                t.forEach(e => {
                                    if (e.tagName && (-1 !== e.classList.toString().indexOf("PricingItem_ctaButton__") && e.addEventListener("click", () => {
                                        v.emit("track", {
                                            ec: ue,
                                            tid: de,
                                            ea: "book-flight"
                                        });
                                    }), !e.classList.length)) {
                                        const t = e.querySelector('[class*="FlightsTicket_container__"] button[class*="TicketStub_ctaButton"]');
                                        t && t.addEventListener("click", () => {
                                            v.emit("track", {
                                                ec: ue,
                                                tid: de,
                                                ea: "choose-flight"
                                            });
                                        });
                                    }
                                });
                            }).start();
                        }(), n.sendMessagePromise({
                            action: "tbrGetInfo"
                        }).then((function(t) {
                            if (g.extend(v.appInfo, t), v.log("Version", v.version), v.log("Set info", t), !t.id) throw new s("Partner id is not set!");
                            let r = null;
                            return v.appInfo.useTemplates && (r = n.sendMessagePromise({
                                action: "tbrGetTemplate",
                                id: e.id
                            })), r;
                        })).then((function(t) {
                            if (v.currentProfile = A(e, t), !v.currentProfile) throw v.error("Invalid location!", location.href), 
                            new s("Invalid location!");
                        })).then((function() {
                            return n.sendMessagePromise({
                                action: "tbrIsAllow",
                                hostname: v.hostname
                            }).then((function(e) {
                                if (!e) throw v.log("Bar is closed!", v.hostname), new s("Bar is closed!");
                                if (g.tbrExists()) throw new s("Bar exists!");
                                if (!g.mutationWatcher.isAvailable()) throw new s("MutationObserver is not support!");
                                g.tbrSetGlobal(), v.language = O;
                            }));
                        }));
                    })).then((function() {
                        const e = v.main;
                        e.avia = E(), e.hotel = N(), e.cars = I(), e.currency = function() {
                            let e = null;
                            return {
                                exists: function(t) {
                                    return !!e[t];
                                },
                                load: function() {
                                    return e ? Promise.resolve(e) : g.request({
                                        url: "https://api.travelbar.tools/v1/as/currencies/all_currencies_rates?" + g.param({
                                            partnerId: v.appInfo.id
                                        })
                                    }).then((function(t) {
                                        const r = JSON.parse(t.body), n = {};
                                        return Object.keys(r).forEach((function(e) {
                                            n[e.toUpperCase()] = r[e];
                                        })), e = n;
                                    }));
                                },
                                convert: function(t, r, n) {
                                    return n = n.toUpperCase(), r = r.toUpperCase(), t * e[r] / e[n];
                                }
                            };
                        }(), e.bar = ce(), e.watcher = le(), e.watcher.initProfile(v.currentProfile);
                    })).catch((function(e) {
                        e instanceof s ? v.log(e.message) : (v.error("Init error!", e), v.trackError(e));
                    }));
                }));
            } ]);
        }, () => !0);
    }
});