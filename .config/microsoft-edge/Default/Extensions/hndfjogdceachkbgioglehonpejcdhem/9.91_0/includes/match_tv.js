!function(e) {
    function t(t) {
        for (var n, a, s = t[0], c = t[1], u = t[2], d = 0, f = []; d < s.length; d++) a = s[d], 
        Object.prototype.hasOwnProperty.call(o, a) && o[a] && f.push(o[a][0]), o[a] = 0;
        for (n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
        for (l && l(t); f.length; ) f.shift()();
        return i.push.apply(i, u || []), r();
    }
    function r() {
        for (var e, t = 0; t < i.length; t++) {
            for (var r = i[t], n = !0, s = 1; s < r.length; s++) {
                var c = r[s];
                0 !== o[c] && (n = !1);
            }
            n && (i.splice(t--, 1), e = a(a.s = r[0]));
        }
        return e;
    }
    var n = {}, o = {
        7: 0
    }, i = [];
    function a(t) {
        if (n[t]) return n[t].exports;
        var r = n[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(r.exports, r, r.exports, a), r.l = !0, r.exports;
    }
    a.m = e, a.c = n, a.d = function(e, t, r) {
        a.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        });
    }, a.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, a.t = function(e, t) {
        if (1 & t && (e = a(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (a.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var n in e) a.d(r, n, function(t) {
            return e[t];
        }.bind(null, n));
        return r;
    }, a.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return a.d(t, "a", t), t;
    }, a.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, a.p = "";
    var s = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], c = s.push.bind(s);
    s.push = t, s = s.slice();
    for (var u = 0; u < s.length; u++) t(s[u]);
    var l = c;
    i.push([ 100, 0 ]), r();
}({
    100: function(e, t, r) {
        "use strict";
        r.r(t);
        var n = r(19), o = r(0), i = r(44), a = r(15), s = r(10), c = (r(2), r(4)), u = r(41), l = r(56), d = r.n(l), f = r(16), p = r(28), b = r(5), m = r(12);
        function O(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), r.push.apply(r, n);
            }
            return r;
        }
        function h(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? O(Object(r), !0).forEach((function(t) {
                    Object(n.a)(e, t, r[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : O(Object(r)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                }));
            }
            return e;
        }
        class y {
            constructor() {
                this.selector = ".video-container iframe", this.type = "added";
            }
            handle(e) {
                let {added: t} = e;
                t.filter(e => !e.dataset.sfVideoReady).map(e => (e.dataset.sfVideoReady = 1, e)).map(e => this.renderButton(e));
            }
            async renderButton(e) {
                d.a.use();
                const t = e.closest(".video-container");
                let r = await Object(m.a)({
                    action: "matchTvFetchVideoSources",
                    iframeVideoURL: e.src
                });
                r = r.filter(e => "Auto" !== e.title).map(e => h(h({}, e), {}, {
                    filename: document.title
                }));
                const n = document.createElement("div");
                t.parentElement.insertBefore(n, t.nextSibling);
                const i = r.map(e => ({
                    title: e.title,
                    onClick() {
                        Object(f.a)(Object(c.e)(p.a, {
                            filename: b.a.modify(e.filename) + ".mp4",
                            format: "mp4",
                            sources: [ {
                                url: e.endpoint,
                                format: "mp4"
                            } ],
                            convertType: "hls"
                        }), "sf-muxer-parent");
                    }
                }));
                return Object(f.a)(Object(c.e)(u.b, {
                    items: i,
                    theme: u.c
                }, Object(c.e)(u.a, null, Object(c.e)("div", {
                    className: d.a.locals.downloadButton
                }, o.a.i18n.getMessage("download")))), n);
            }
        }
        function g(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), r.push.apply(r, n);
            }
            return r;
        }
        function v(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? g(Object(r), !0).forEach((function(t) {
                    Object(n.a)(e, t, r[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : g(Object(r)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                }));
            }
            return e;
        }
        class j extends i.a {
            constructor() {
                super(...arguments), this.mutations = [ new y ];
            }
            async init() {
                this.active = Number(this.settings.moduleMatchTv), this.active && this.initObserver(this.mutations), 
                this.registerMonoListeners();
            }
            registerMonoListeners() {
                const e = e => this.settings = v(v({}, this.settings), {}, {
                    preferences: e
                });
                o.a.onMessage.addListener(async (t, r, n) => {
                    const {action: o, moduleName: i, state: a} = t;
                    if ("getModuleInfo" === o) return n({
                        state: this.active,
                        moduleName: j.moduleName
                    });
                    if (i === j.moduleName) {
                        if ("updatePreferences" === o) return e(t.preferences);
                        if ("changeState" === o) {
                            if (a) return this.active = !a, this.initObserver(this.mutations);
                            this.observer.stop();
                            document.querySelectorAll(".sf--dropdown").forEach(e => e.remove());
                        }
                    }
                });
            }
        }
        j.moduleName = "matchTv";
        const w = new j;
        a.a.isSingle() && Object(s.a)(j.moduleName, () => w.start(), () => !0);
    },
    56: function(e, t, r) {
        var n = r(35), o = r(81);
        "string" == typeof (o = o.__esModule ? o.default : o) && (o = [ [ e.i, o, "" ] ]);
        var i, a = 0, s = {
            injectType: "lazyStyleTag",
            insert: "head",
            singleton: !1
        }, c = {};
        c.locals = o.locals || {}, c.use = function() {
            return a++ || (i = n(o, s)), c;
        }, c.unuse = function() {
            a > 0 && !--a && (i(), i = null);
        }, e.exports = c;
    },
    81: function(e, t, r) {
        "use strict";
        r.r(t);
        var n = r(23), o = r.n(n)()(!1);
        o.push([ e.i, '._1xhxO--download-button{float:right;background-size:200% auto;cursor:pointer;color:#fff;border:none;padding:4px 8px;border-radius:6px;background-image:linear-gradient(90deg,#000 0,#434343 51%,#000);transition:.5s}._1xhxO--download-button:hover{background-position:100%}._1xhxO--download-button:after{display:inline-block;width:0;height:0;margin-left:.255em;vertical-align:.055em;content:"";border-top:.3em solid;border-right:.3em solid transparent;border-bottom:0;border-left:.3em solid transparent}', "" ]), 
        o.locals = {
            "download-button": "_1xhxO--download-button",
            downloadButton: "_1xhxO--download-button"
        }, t.default = o;
    }
});