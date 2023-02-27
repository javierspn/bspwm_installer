!function(e) {
    function t(t) {
        for (var o, a, s = t[0], c = t[1], u = t[2], l = 0, f = []; l < s.length; l++) a = s[l], 
        Object.prototype.hasOwnProperty.call(i, a) && i[a] && f.push(i[a][0]), i[a] = 0;
        for (o in c) Object.prototype.hasOwnProperty.call(c, o) && (e[o] = c[o]);
        for (d && d(t); f.length; ) f.shift()();
        return r.push.apply(r, u || []), n();
    }
    function n() {
        for (var e, t = 0; t < r.length; t++) {
            for (var n = r[t], o = !0, s = 1; s < n.length; s++) {
                var c = n[s];
                0 !== i[c] && (o = !1);
            }
            o && (r.splice(t--, 1), e = a(a.s = n[0]));
        }
        return e;
    }
    var o = {}, i = {
        2: 0
    }, r = [];
    function a(t) {
        if (o[t]) return o[t].exports;
        var n = o[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(n.exports, n, n.exports, a), n.l = !0, n.exports;
    }
    a.m = e, a.c = o, a.d = function(e, t, n) {
        a.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
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
        var n = Object.create(null);
        if (a.r(n), Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var o in e) a.d(n, o, function(t) {
            return e[t];
        }.bind(null, o));
        return n;
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
    var d = c;
    r.push([ 79, 0 ]), n();
}({
    79: function(e, t, n) {
        "use strict";
        n.r(t);
        var o = n(0), i = n(11), r = n(10), a = n(27), s = n(18), c = n(52), u = n(36), d = n(9), l = n(3), f = n(1), p = n(12), b = n(6), m = n(15), h = n(8), v = n(7);
        const g = Object(b.a)("dailymotion_com");
        m.a.isSingle() && Object(r.b)("dailymotion", (function(e, t) {
            const n = Object(i.a)(t);
            var r = t.preferences, b = r.moduleDailymotion ? 1 : 0, m = Object(a.a)() && /\/embed\/([\w\-]+)/i.test(document.location.href);
            o.a.onMessage.addListener((function(t, n, o) {
                if ("getModuleInfo" === t.action) {
                    if (t.url !== location.href) return;
                    return o({
                        state: b,
                        moduleName: e
                    });
                }
                if ("changeState" === t.action) {
                    if (e !== t.moduleName) return;
                    return y.changeState(t.state);
                }
                "updatePreferences" !== t.action ? b && "updateLinks" === t.action && y.updateLinks() : Object.assign(r, t.preferences);
            })), b && setTimeout((function() {
                Object(v.a)({
                    category: "append",
                    subcategory: "da",
                    event: "b"
                }), y.run();
            }));
            var y = {
                contextMenu: null,
                linkCache: {},
                embed: null,
                title: "",
                styleIndex: 0,
                btnId: "sf__download_btn",
                result: null,
                popupIsShow: !1,
                run: function() {
                    return b = 1, m ? (Object(v.a)({
                        category: "download",
                        subcategory: "da",
                        event: "video"
                    }), void y.appendIframeButtons()) : h.a.isAvailable() ? y.mutationMode.enable() : void 0;
                },
                changeState: function(e) {
                    m || (b = e, y.rmBtn(), y.mutationMode.stop(), e && y.run());
                },
                hideMenu: function() {
                    y.contextMenu && y.contextMenu.isShow && (y.contextMenu.hide(), y.contextMenu = null);
                },
                updateLinks: function() {
                    y.changeState(0), y.changeState(1);
                },
                appendIframeButtons: function() {
                    var e = this, t = n.frameMenu.getBtn({
                        quickBtnStyleObj: {
                            display: "inline-block",
                            cursor: "pointer",
                            position: "relative",
                            padding: "9px 10px"
                        },
                        quickBtnCssStyle: {
                            backgroundColor: "rgba(0,0,0,.75)"
                        },
                        singleBtn: !0,
                        btnId: e.btnId,
                        containerStyle: {
                            right: "50px",
                            top: "10px"
                        },
                        quickBtnIcon: f.a.create(n.svg.getSvg("download", "#ffffff"), {
                            style: {
                                display: "inline-block",
                                width: "16px",
                                height: "16px",
                                verticalAlign: "middle"
                            }
                        }),
                        on: [ [ "click", function(i) {
                            if (i.preventDefault(), i.stopPropagation(), e.contextMenu && e.contextMenu.isShow) e.hideMenu(); else {
                                var r = e.getIdFromUrl(), a = o.a.i18n.getMessage("download") + " ...", s = e.linkCache[r];
                                s && (a = n.popupMenu.prepareLinks.dailymotion(s.links, s.title));
                                var c = e.contextMenu = n.frameMenu.getMenu(this, a, "sf-frame-menu", {
                                    container: t.container,
                                    onShow: function() {
                                        t.node.classList.add("sf-over");
                                    },
                                    onHide: function() {
                                        e.contextMenu = null, t.node.classList.remove("sf-over");
                                    }
                                });
                                s || o.a.sendMessage({
                                    action: "getDailymotionLinks",
                                    extVideoId: r,
                                    metadata: e.getMetadata(r)
                                }, (function(t) {
                                    var i = o.a.i18n.getMessage("noLinksFound");
                                    t.links && (e.linkCache[r] = t, i = n.popupMenu.prepareLinks.dailymotion(t.links, t.title)), 
                                    c.update(i);
                                }));
                            }
                        } ], [ "mousedown", function(n) {
                            n.stopPropagation(), 2 === n.button && (l.a.off(document.body, "mousemove", s), 
                            e.hideMenu(), t.container.parentNode && t.container.parentNode.removeChild(t.container));
                        } ] ]
                    });
                    t.quickBtn.title = o.a.i18n.getMessage("download"), t.container = f.a.create("div", {
                        class: "sf-btn-ctr",
                        append: t.node
                    }), l.a.on(t.container, "mouseenter", (function() {
                        t.lockHide = !0;
                    })), l.a.on(t.container, "mouseleave", (function() {
                        t.lockHide = !1;
                    }));
                    var i = null, r = !1, a = function() {
                        t.lockHide || (t.container.classList.add("sf-hide-ui"), r = !0);
                    }, s = function() {
                        r && (t.container.classList.remove("sf-hide-ui"), r = !1), clearTimeout(i), i = setTimeout(a, 3e3);
                    };
                    l.a.on(document.body, "mousemove", s), t.node.appendChild(f.a.create("style", {
                        text: Object(d.a)([ {
                            selector: [ "body:hover .sf-btn-ctr:not(.sf-hide-ui) #" + e.btnId, "body:hover .sf-btn-ctr:not(.sf-hide-ui) .sf-frame-menu" ],
                            style: {
                                display: "block"
                            }
                        } ])
                    })), document.body.appendChild(t.container);
                },
                getIdFromUrl: function(e) {
                    var t = (e = e || location.href).match(/\/embed\/video\/([a-z0-9]+)/);
                    return t = t && t[1];
                },
                getMetadata: function(e) {
                    var t = null;
                    return Object(c.a)(document.body.innerHTML, /playerV5/).some((function(n) {
                        return Object(u.a)(n).some((function(n) {
                            if (n && n.metadata && n.metadata.id === e) return t = n.metadata, !0;
                        }));
                    })), t;
                },
                rmBtn: function() {
                    for (var e, t = document.querySelectorAll([ "#" + y.btnId, ".sf-wrapper" ]), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                    y.result = null, y.popupIsShow = !1;
                },
                newGetVideoId: function() {
                    var e = "", t = /\/video\/([^\/?#]+)/.exec(location.href);
                    return t && (e = t[1]), e;
                },
                insertBtn: function(e) {
                    if (!e.querySelector(".sf-dl-btn")) {
                        var t = f.a.create("button", {
                            id: y.btnId,
                            class: [ "sf-dl-btn" ],
                            title: o.a.i18n.getMessage("download"),
                            append: [ f.a.create("span", {
                                append: [ n.svg.getSvg("download", "#000") ]
                            }), f.a.create("style", {
                                text: Object(d.a)({
                                    selector: ".sf-dl-btn",
                                    style: {
                                        display: "block",
                                        border: 0,
                                        borderRadius: "50%",
                                        cursor: "pointer",
                                        background: "#e8e8e8",
                                        width: "32px",
                                        height: "32px",
                                        marginRight: "8px"
                                    },
                                    append: {
                                        selector: "span",
                                        style: {
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginRight: "auto",
                                            marginLeft: "auto",
                                            width: "16px",
                                            height: "16px"
                                        }
                                    }
                                })
                            }) ],
                            on: [ "click", function(e) {
                                if (e.preventDefault(), e.stopPropagation(), y.contextMenu && y.contextMenu.isShow) y.hideMenu(); else {
                                    var t = o.a.i18n.getMessage("download") + " ...", i = y.contextMenu = n.popupMenu.quickInsert(this, t, "sf-popupMenu");
                                    Promise.resolve().then((function() {
                                        var e = y.newGetVideoId();
                                        if (!e) throw new Error("Video is not found");
                                        var t = y.linkCache[e];
                                        return t || Object(p.a)({
                                            action: "getDailymotionLinks",
                                            extVideoId: e
                                        }).then((function(t) {
                                            if (!t || !t.links) throw new Error("Links is not found");
                                            return y.linkCache[e] = t;
                                        }));
                                    })).then((function(e) {
                                        var t = n.popupMenu.prepareLinks.dailymotion(e.links, e.title);
                                        i.update(t);
                                    })).catch((function(e) {
                                        g.debug("Load links error", e), i.update(o.a.i18n.getMessage("noLinksFound"));
                                    }));
                                }
                            } ]
                        });
                        l.a.onRemoveEvent(t, t => {
                            e.dataset.sfSkip = 0, document.body.contains(e) && this.mutationMode.observer.trigger(e);
                        }), e.firstChild ? e.insertBefore(t, e.firstChild) : e.appendChild(t);
                    }
                },
                mutationMode: {
                    observer: null,
                    stop: function() {
                        this.observer && this.observer.stop(), [ "sfSkip" ].forEach((function(e) {
                            for (var t, n = Object(s.a)(e), o = document.querySelectorAll("[" + n + "]"), i = 0; t = o[i]; i++) t.removeAttribute(n);
                        }));
                    },
                    enable: function() {
                        if (this.observer) return this.observer.start();
                        this.observer = new h.a({
                            queries: [ {
                                css: 'div[class^="VideoInfo__reportAndActions"]',
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    y.insertBtn(t));
                                }
                            }, {
                                css: "." + l.a.onRemoveClassName,
                                is: "removed",
                                callback: e => {
                                    for (let t, n = 0; t = e.removed[n]; n++) l.a.onRemoveListener(t);
                                }
                            } ]
                        });
                    }
                }
            };
        }), (function() {
            if (!Object(a.a)()) return !0;
            if (/\/embed\/([\w\-]+)/i.test(location.href)) {
                let e = !1;
                try {
                    e = location.hostname === window.parent.location.hostname;
                } catch (e) {}
                return !e;
            }
        }));
    }
});