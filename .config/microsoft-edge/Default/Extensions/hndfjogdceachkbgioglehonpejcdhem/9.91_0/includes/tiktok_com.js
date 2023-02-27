!function(t) {
    function e(e) {
        for (var n, r, s = e[0], l = e[1], d = e[2], _ = 0, f = []; _ < s.length; _++) r = s[_], 
        Object.prototype.hasOwnProperty.call(a, r) && a[r] && f.push(a[r][0]), a[r] = 0;
        for (n in l) Object.prototype.hasOwnProperty.call(l, n) && (t[n] = l[n]);
        for (c && c(e); f.length; ) f.shift()();
        return i.push.apply(i, d || []), o();
    }
    function o() {
        for (var t, e = 0; e < i.length; e++) {
            for (var o = i[e], n = !0, s = 1; s < o.length; s++) {
                var l = o[s];
                0 !== a[l] && (n = !1);
            }
            n && (i.splice(e--, 1), t = r(r.s = o[0]));
        }
        return t;
    }
    var n = {}, a = {
        14: 0
    }, i = [];
    function r(e) {
        if (n[e]) return n[e].exports;
        var o = n[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(o.exports, o, o.exports, r), o.l = !0, o.exports;
    }
    r.m = t, r.c = n, r.d = function(t, e, o) {
        r.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: o
        });
    }, r.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, r.t = function(t, e) {
        if (1 & e && (t = r(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var o = Object.create(null);
        if (r.r(o), Object.defineProperty(o, "default", {
            enumerable: !0,
            value: t
        }), 2 & e && "string" != typeof t) for (var n in t) r.d(o, n, function(e) {
            return t[e];
        }.bind(null, n));
        return o;
    }, r.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return r.d(e, "a", e), e;
    }, r.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, r.p = "";
    var s = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], l = s.push.bind(s);
    s.push = e, s = s.slice();
    for (var d = 0; d < s.length; d++) e(s[d]);
    var c = l;
    i.push([ 102, 0 ]), o();
}({
    102: function(t, e, o) {
        "use strict";
        o.r(e);
        var n = o(0), a = o(6), i = o(15), r = o(8), s = o(11), l = o(18), d = o(10), c = o(16), _ = o(4), f = o(2), p = o(67), u = o.n(p), m = o(25), b = o(20), v = o.n(b), g = o(7), h = o(12);
        const x = "middle";
        var y = f.c.memo(t => {
            let {url: e, filename: o, containerType: a = x, children: i} = t;
            const r = Object(m.a)(u.a), [s, l] = f.c.useState(!1), [d, c] = f.c.useState(!1), _ = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome"), p = f.c.useCallback(t => {
                if (t.stopPropagation(), n.a.isFirefox) {
                    t.preventDefault();
                    const n = "ffTiktokDownloadMedia", a = e;
                    return Object(h.a)({
                        action: n,
                        downloadFileUrl: a,
                        filename: o
                    });
                }
                t.altKey || n.a.isFirefox ? Object(g.a)({
                    category: "download",
                    subcategory: "ti",
                    event: "video"
                }) : (d || (c(!0), setTimeout(() => {
                    c(!1);
                }, 2e3)), t.preventDefault());
            }, [ d ]), b = f.c.useCallback(t => {
                t.altKey || t.ctrlKey || n.a.isFirefox || l(!s);
            }, [ s ]), y = f.c.useMemo(() => "large" === a ? r.largeContainer : a === x ? r.middleContainer : "feedItem" === a ? r.feedItemContainer : "", [ a ]);
            return f.c.createElement("div", {
                className: v()(r.container, y)
            }, f.c.createElement("div", {
                className: r.button
            }, n.a.isFirefox ? f.c.createElement("a", {
                onclick: p
            }, i) : f.c.createElement("a", {
                href: e,
                download: o,
                target: "_blank",
                onclick: p,
                onmouseenter: b,
                onmouseleave: b
            }, i), s && f.c.createElement("div", {
                className: v()(r.sf__tooltip)
            }, f.c.createElement("div", {
                className: v()(r.sf__tooltip__triangle)
            }), f.c.createElement("div", {
                className: v()(r.sf__tooltip__container)
            }, f.c.createElement("span", {
                className: v()(r.sf__tooltip__text)
            }, "Hold"), f.c.createElement("div", {
                className: v()(r.sf__tooltip__button, _ ? r.sf__tooltip__button_safari : "")
            }, f.c.createElement("div", {
                className: v()(r.sf__tooltip__button_whiteground, _ ? r.sf__tooltip__button_whiteground_safari : "")
            }, f.c.createElement("span", {
                className: v()(r.sf__tooltip__text__alt)
            }, _ ? "option" : "alt"))), f.c.createElement("span", {
                className: v()(r.sf__tooltip__text)
            }, "and click")))));
        }), w = o(5), k = o(1), S = o(9);
        const j = Object(a.a)("tiktok_com");
        i.a.isSingle() && Object(d.b)("tiktok", (t, e) => {
            const o = Object(s.a)(e), {preferences: a} = e;
            let i = a.moduleTiktok;
            const d = location.pathname.includes("/embed");
            n.a.onMessage.addListener((e, o, n) => {
                if ("getModuleInfo" === e.action) {
                    if (e.url !== location.href) return;
                    return n({
                        state: i,
                        moduleName: t
                    });
                }
                if ("changeState" === e.action) {
                    if (t !== e.moduleName) return;
                    return f.changeState(e.state);
                }
                "updatePreferences" !== e.action || Object.assign(a, e.preferences);
            }), i && setTimeout(() => {
                f.run();
            });
            const f = {
                style: void 0,
                run() {
                    i = 1, d ? r.a.isAvailable() && p.mutationMode.start() : r.a.isAvailable() && (this.mutationMode.start(), 
                    this.injectStyle());
                },
                mutationMode: {
                    observer: null,
                    start() {
                        if (this.observer) return this.observer.start();
                        this.observer = new r.a({
                            queries: [ {
                                css: [ '.feed-item-content video, [class*="-DivBasicPlayerWrapper"] video', 'div[data-e2e="browse-video"] video[src]', ".video-box video[src]", ".video-card video[src]", '.feed-item-content video, [class*="-DivBasicPlayerWrapper"] video', 'div[data-e2e="browse-video"] video' ],
                                is: "added",
                                callback: t => {
                                    for (let e, o = 0; e = t.added[o]; o++) e.dataset.sfSkip > 0 || (e.dataset.sfSkip = "1", 
                                    f.runDesktop(e));
                                }
                            }, {
                                css: [ 'div[data-e2e="feed-video"] video[src]' ],
                                is: "added",
                                callback: t => {
                                    let {added: e} = t;
                                    e.forEach(t => {
                                        t.dataset.sfSkip || (t.dataset.sfSkip = "1", f.addButtonForFeedItem(t));
                                    });
                                }
                            } ]
                        });
                    },
                    stop() {
                        this.observer && this.observer.stop(), document.querySelectorAll(".sf-dl-container, .sf-feed-dl-container").forEach(t => {
                            t.remove();
                        }), f.style && f.style.remove(), [ "sfSkip", "sfReady" ].forEach((function(t) {
                            let e = Object(l.a)(t), o = document.querySelectorAll("[" + e + "]");
                            for (let t, n = 0; t = o[n]; n++) t.removeAttribute(e);
                        }));
                    }
                },
                addButtonForFeedItem(t) {
                    const e = t.closest(".item-video-container");
                    if (!e) return;
                    const o = document.createElement("div");
                    o.classList.add("sf-feed-dl-container"), f.createDownloadButton(o, "video.mp4", t.src, "feedItem"), 
                    e.appendChild(o);
                },
                runDesktop(t) {
                    if (!t) return j.error("videoElement don't found");
                    const e = document.querySelector(".user-username, .share-title");
                    let o = e && e.textContent ? w.a.modify(e.textContent + ".mp4") : "video.mp4";
                    if (!o) {
                        const t = location.href.match(/\d+/);
                        o = t && t[0] ? t[0] : "video.mp4";
                    }
                    const n = t.parentElement;
                    let a = x;
                    if ((t.closest('div[data-e2e="feed-video"]') || t.closest('div[data-e2e="user-post-item-list"]')) && (a = "feedItem"), 
                    t.closest('div[data-e2e="browse-video"]') && (a = "large"), n && !n.dataset.sfReady) {
                        n.dataset.sfReady = String(1);
                        const e = document.createElement("div");
                        e.classList.add("sf-dl-container"), n.appendChild(e), f.createDownloadButton(e, o, t.src, a);
                    }
                },
                createDownloadButton: (t, e, n, a) => (Object(g.a)({
                    category: "append",
                    subcategory: "ti",
                    event: "b"
                }), Object(c.a)(Object(_.e)(y, {
                    url: n,
                    filename: e,
                    containerType: a
                }, [ Object(_.e)("img", {
                    src: o.svg.getSrc("download", "#fff")
                }) ]), t)),
                injectStyle() {
                    this.style = k.a.create("style", {
                        text: Object(S.a)({
                            ".sf-dl-container": {
                                display: "none"
                            },
                            "[class*=-DivVideoContainer]:hover .sf-dl-container": {
                                display: "block"
                            },
                            '[data-sf-ready="1"]:hover .sf-dl-container': {
                                display: "block"
                            }
                        })
                    }), document.body.appendChild(this.style);
                },
                changeState(t) {
                    i = t, this.mutationMode.stop(), t && this.run();
                }
            }, p = {
                mutationMode: {
                    observer: null,
                    start() {
                        if (this.observer) return this.observer.start();
                        this.observer = new r.a({
                            queries: [ {
                                css: "._embed_player_video-wrapper",
                                is: "added",
                                callback: t => {
                                    for (let e, o = 0; e = t.added[o]; o++) e.dataset.sfSkip > 0 || (e.dataset.sfSkip = "1", 
                                    p.insertDownloadButton(e));
                                }
                            } ]
                        });
                    }
                },
                insertDownloadButton(t) {
                    if (!t.dataset.sfReady) {
                        let e;
                        t.dataset.sfReady = String(1);
                        const o = document.querySelector("._embed_video_card-user span"), n = o && o.textContent ? w.a.modify(o.textContent + ".mp4") : "video.mp4";
                        t.addEventListener("mouseenter", () => {
                            const o = document.querySelector("video");
                            o && (e = f.createDownloadButton(t, n, o.src, "large"));
                        }), t.addEventListener("mouseleave", () => {
                            e && e();
                        });
                    }
                }
            };
        });
    },
    67: function(t, e, o) {
        var n = o(35), a = o(90);
        "string" == typeof (a = a.__esModule ? a.default : a) && (a = [ [ t.i, a, "" ] ]);
        var i, r = 0, s = {
            injectType: "lazyStyleTag",
            insert: "head",
            singleton: !1
        }, l = {};
        l.locals = a.locals || {}, l.use = function() {
            return r++ || (i = n(a, s)), l;
        }, l.unuse = function() {
            r > 0 && !--r && (i(), i = null);
        }, t.exports = l;
    },
    90: function(t, e, o) {
        "use strict";
        o.r(e);
        var n = o(23), a = o.n(n)()(!1);
        a.push([ t.i, ".jBOFD--container{position:absolute;z-index:10}.BJ-ZZ--sf__tooltip{display:block;outline:none;-ms-user-select:none;user-select:none;cursor:default;position:absolute;z-index:10000;transition:opacity .25s;top:35px;left:2px;white-space:nowrap}.kXEuk--sf__tooltip__container{outline:none;font-family:Arial;font-size:14px;font-weight:700;background-color:#4d4d4d;border-radius:8px;color:#fff;padding:8px;margin-bottom:0;display:flex}.uvaWg--sf__tooltip__text{padding-top:6px}.gB5-Q--sf__tooltip__text__alt{margin-top:5px;display:inline-block}.GFrc0--sf__tooltip__button{margin:4px 4px 0;width:20px;height:18px;background-color:#000;border-radius:5px;border:solid #000;border-width:1px 1px 3px}.hdWNF--sf__tooltip__triangle{position:relative;left:8px;width:0;height:0;border-color:transparent transparent #4d4d4d;border-style:solid;border-width:0 8px 8px}.KE\\+w5--sf__tooltip__button_whiteground{fontWeight:bold;font-size:8px;text-align:center;z-index:1;position:relative;width:20px;height:18px;background-color:#fff;color:#000;border-radius:5px}.wCmWm--sf__tooltip__button_safari,.mwA8z--sf__tooltip__button_whiteground_safari{width:27px}.jBOFD--container.\\+Ncst--largeContainer{top:20px;left:145px}.jBOFD--container._0AmPQ--middleContainer{top:20px;left:20px}.jBOFD--container.xsLiH--feedItemContainer{top:10px;left:10px}.YBzmP--button{display:flex;align-items:center;justify-content:center;width:30px;height:30px;background-color:rgba(0,0,0,.5);border-radius:50%;z-index:9;border:1px solid hsla(0,0%,50.2%,.5)}.YBzmP--button a{padding:10px}", "" ]), 
        a.locals = {
            container: "jBOFD--container",
            sf__tooltip: "BJ-ZZ--sf__tooltip",
            sfTooltip: "BJ-ZZ--sf__tooltip",
            sf__tooltip__container: "kXEuk--sf__tooltip__container",
            sfTooltipContainer: "kXEuk--sf__tooltip__container",
            sf__tooltip__text: "uvaWg--sf__tooltip__text",
            sfTooltipText: "uvaWg--sf__tooltip__text",
            sf__tooltip__text__alt: "gB5-Q--sf__tooltip__text__alt",
            sfTooltipTextAlt: "gB5-Q--sf__tooltip__text__alt",
            sf__tooltip__button: "GFrc0--sf__tooltip__button",
            sfTooltipButton: "GFrc0--sf__tooltip__button",
            sf__tooltip__triangle: "hdWNF--sf__tooltip__triangle",
            sfTooltipTriangle: "hdWNF--sf__tooltip__triangle",
            sf__tooltip__button_whiteground: "KE+w5--sf__tooltip__button_whiteground",
            sfTooltipButtonWhiteground: "KE+w5--sf__tooltip__button_whiteground",
            sf__tooltip__button_safari: "wCmWm--sf__tooltip__button_safari",
            sfTooltipButtonSafari: "wCmWm--sf__tooltip__button_safari",
            sf__tooltip__button_whiteground_safari: "mwA8z--sf__tooltip__button_whiteground_safari",
            sfTooltipButtonWhitegroundSafari: "mwA8z--sf__tooltip__button_whiteground_safari",
            largeContainer: "+Ncst--largeContainer",
            middleContainer: "_0AmPQ--middleContainer",
            feedItemContainer: "xsLiH--feedItemContainer",
            button: "YBzmP--button"
        }, e.default = a;
    }
});