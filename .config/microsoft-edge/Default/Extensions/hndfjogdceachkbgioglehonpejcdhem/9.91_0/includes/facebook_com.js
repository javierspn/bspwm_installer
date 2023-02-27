!function(e) {
    function t(t) {
        for (var o, i, l = t[0], s = t[1], c = t[2], u = 0, f = []; u < l.length; u++) i = l[u], 
        Object.prototype.hasOwnProperty.call(n, i) && n[i] && f.push(n[i][0]), n[i] = 0;
        for (o in s) Object.prototype.hasOwnProperty.call(s, o) && (e[o] = s[o]);
        for (d && d(t); f.length; ) f.shift()();
        return a.push.apply(a, c || []), r();
    }
    function r() {
        for (var e, t = 0; t < a.length; t++) {
            for (var r = a[t], o = !0, l = 1; l < r.length; l++) {
                var s = r[l];
                0 !== n[s] && (o = !1);
            }
            o && (a.splice(t--, 1), e = i(i.s = r[0]));
        }
        return e;
    }
    var o = {}, n = {
        3: 0
    }, a = [];
    function i(t) {
        if (o[t]) return o[t].exports;
        var r = o[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(r.exports, r, r.exports, i), r.l = !0, r.exports;
    }
    i.m = e, i.c = o, i.d = function(e, t, r) {
        i.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        });
    }, i.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, i.t = function(e, t) {
        if (1 & t && (e = i(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (i.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var o in e) i.d(r, o, function(t) {
            return e[t];
        }.bind(null, o));
        return r;
    }, i.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return i.d(t, "a", t), t;
    }, i.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, i.p = "";
    var l = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], s = l.push.bind(l);
    l.push = t, l = l.slice();
    for (var c = 0; c < l.length; c++) t(l[c]);
    var d = s;
    a.push([ 101, 0 ]), r();
}({
    101: function(e, t, r) {
        "use strict";
        r.r(t);
        var o = r(19), n = r(0), a = r(11), i = r(10), l = r(26), s = r(24), c = r(18), d = r(9), u = r(21), f = r(14), p = r(3), h = r(1), m = r(17), g = r(5), v = r(6), b = r(15), y = r(8), k = r(16), w = r(2), x = r(66), S = r.n(x), O = r(25), M = r(20), j = r.n(M);
        const B = Object(a.a)().svg.getSrc("download", "#84bd07");
        var L = w.c.memo(e => {
            let {classes: t = [], isIcon: r = !0, isText: o = !0, isCircle: a = !1, onClick: i} = e;
            const l = Object(O.a)(S.a);
            return w.c.createElement("div", {
                className: j()(...t, l.container, a && l.circleContainer),
                onClick: i
            }, r && w.c.createElement("img", {
                src: B,
                className: l.logo
            }), o && w.c.createElement("span", {
                className: l.text
            }, n.a.i18n.getMessage("download")));
        }), F = r(4), P = r(7), C = r(13);
        function E(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(e);
                t && (o = o.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), r.push.apply(r, o);
            }
            return r;
        }
        function N(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? E(Object(r), !0).forEach((function(t) {
                    Object(o.a)(e, t, r[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : E(Object(r)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                }));
            }
            return e;
        }
        const q = r(42), D = Object(v.a)("facebook_com"), I = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
        let _;
        b.a.isSingle() && Object(i.b)("facebook", (function(e, t) {
            const r = Object(a.a)(t);
            var o = t.preferences, i = o.moduleFacebook ? 1 : 0;
            n.a.onMessage.addListener((function(t, r, n) {
                if ("getModuleInfo" === t.action) {
                    if (t.url !== location.href) return;
                    return n({
                        state: i,
                        moduleName: e
                    });
                }
                if ("changeState" === t.action) {
                    if (e !== t.moduleName) return;
                    return v.changeState(t.state);
                }
                "updatePreferences" !== t.action ? i && "updateLinks" === t.action && (v.changeState(0), 
                v.changeState(1)) : Object.assign(o, t.preferences);
            })), i && setTimeout((function() {
                v.run();
            }));
            var v = {
                contextMenu: null,
                className: "savefrom_fb_download",
                isMutation: !1,
                run: function() {
                    if (i = 1, O.addStyle(), S.injectStyle(), y.a.isAvailable()) return this.isMutation = !0, 
                    this.initEmbedDownloader(), void this.mutationMode.enable();
                },
                changeState: function(e) {
                    v.hideMenu(), i = e, b.disable(), S.rmCurrentPhotoBtn(), S.rmDataAttrs(), O.rmBtn(), 
                    x.rmBtn(), v.mutationMode.stop(), e && v.run();
                },
                initEmbedDownloader: function() {
                    r.addStyleRules("." + r.embedDownloader.linkClass + " img", {
                        opacity: ".5"
                    }), r.embedDownloader.init();
                },
                mutationMode: {
                    observer: null,
                    stop: function() {
                        this.observer && this.observer.stop(), [ "sfSkip" ].forEach((function(e) {
                            for (var t, r = Object(c.a)(e), o = document.querySelectorAll("[" + r + "]"), n = 0; t = o[n]; n++) t.removeAttribute(r);
                        }));
                    },
                    wrapVideoGetLinks: function(e) {
                        switch (e.tagName) {
                          case "EMBED":
                            x.getLinksFromEmbed(e, (function(e) {
                                x.appendLinks(e && e.links);
                            }));
                            break;

                          case "VIDEO":
                            x.getLinksFromVideo(e, (function(e) {
                                x.appendLinks(e && e.links);
                            }));
                        }
                    },
                    wrapVideoFeedOnLinkHover: function() {
                        i && O.onLinkHover.apply(this);
                    },
                    wrapPhotoOnHover: function(e) {
                        i && S.addCurrentDlBtn(this);
                    },
                    wrapExternalMediaMouseEnter: function() {
                        if (i) {
                            this.dataset[b.linkDataAttr] ? clearTimeout(b.timer) : b.handle(this) ? (b.lastLink && b.lastLink !== this && b.removeBtn(b.lastLink), 
                            r.embedDownloader.hidePanel(), b.lastLink = this) : (p.a.off(this, "mouseenter", v.mutationMode.wrapExternalMediaMouseEnter), 
                            p.a.off(this, "mouseleave", v.mutationMode.wrapExternalMediaMouseLeave));
                        }
                    },
                    wrapExternalMediaMouseLeave: function() {
                        if (i) {
                            var e = this;
                            e.dataset[b.linkDataAttr] && (clearTimeout(b.timer), b.timer = setTimeout((function() {
                                b.removeBtn(e);
                            }), 1500));
                        }
                    },
                    wrapExternalMedia: function(e) {
                        p.a.on(e, "mouseenter", v.mutationMode.wrapExternalMediaMouseEnter), p.a.on(e, "mouseleave", v.mutationMode.wrapExternalMediaMouseLeave);
                    },
                    enable: function() {
                        if (this.observer) return this.observer.start();
                        const e = (e, t) => {
                            if (!(window.location.href.includes("/watch?") && e.ariaLabel || (e.dataset.sfReady && window.location.href.includes("/watch?") && !e.dataset.waRep && e.removeAttribute("data-sf-ready"), 
                            e.dataset.sfReady))) return e.dataset.sfReady = "1", t(e);
                        };
                        this.observer = new y.a({
                            queries: [ {
                                css: "video",
                                is: "added",
                                callback: t => {
                                    let {added: r} = t;
                                    const o = /\/watch/.test(location.href);
                                    r.forEach(t => e(t, () => o ? O.addButtonForWatchPage(t) : t.closest('[role="article"]') ? O.addButtonForFeedPage(t) : void 0));
                                }
                            }, {
                                css: '[role="article"] a[href*="/videos/"], ._6x84 a[href*="/videos/"]',
                                is: "added",
                                callback: t => {
                                    let {added: r} = t;
                                    r.forEach(t => e(t, () => {
                                        O.addHoverButtonForArticleVideo(t);
                                    }));
                                }
                            }, {
                                css: '[role="article"] a[role="link"] div[style] img[alt], [role="article"] div[role="button"] div[style] img[alt]',
                                is: "added",
                                callback: t => {
                                    let {added: r} = t;
                                    r.forEach(t => e(t, () => {
                                        if (!t.closest('a[aria-label*="Reels"]')) return S.addButtonForArticleImage(t);
                                    }));
                                }
                            }, {
                                css: '[data-pagelet="TahoeVideo"]',
                                is: "added",
                                callback: t => {
                                    let {added: r} = t;
                                    r.forEach(t => e(t, () => {
                                        O.addButtonForShowPageVideo(t);
                                    }));
                                }
                            }, {
                                css: '[data-pagelet="Reels"], a[aria-label*="Reels"]',
                                is: "added",
                                callback: t => {
                                    let {added: r} = t;
                                    r.forEach(t => e(t, () => O.addButtonForReelVideo(t)));
                                }
                            }, {
                                css: '[data-pagelet="TahoeRightRail"] a[href*="/videos/"]',
                                is: "added",
                                callback: t => {
                                    let {added: r} = t;
                                    r.forEach(t => e(t, () => {
                                        const e = w.createButton(() => {
                                            const r = x.getVideoIdFromLink(t.href);
                                            r && x.showDownloadMenuByVideoId(e, r);
                                        }, {
                                            preset: "hover"
                                        });
                                        t.appendChild(e);
                                    }));
                                }
                            }, {
                                css: '[data-visualcompletion="media-vc-image"]',
                                is: "added",
                                callback: t => {
                                    let {added: r} = t;
                                    r.forEach(t => e(t, () => {
                                        S.addButtonForShowPageImage(t);
                                    }));
                                }
                            }, {
                                css: [ "embed", "video._ox1" ],
                                is: "added",
                                callback: e => {
                                    for (let r, o = 0; r = e.added[o]; o++) {
                                        var t = !1;
                                        Object(u.a)(r, "#fbxPhotoContentContainer .videoStage " + r.tagName) && (t = !0), 
                                        t ? this.wrapVideoGetLinks(r) : p.a.one(r, "mouseenter", this.wrapVideoFeedOnLinkHover);
                                    }
                                }
                            }, {
                                css: [ ".fbPhotoSnowliftContainer .stageWrapper .stage img.spotlight", ".fbPhotoSnowliftContainer .stageWrapper .stage .videoStage video" ],
                                is: "added",
                                callback: e => {
                                    for (let o, n = 0; o = e.added[n]; n++) if (v.hideMenu(), !(o.dataset.sfSkip > 0)) {
                                        o.dataset.sfSkip = "1";
                                        var t = r.getParentByClass(o, "stageWrapper");
                                        p.a.one(t, "mouseenter", this.wrapPhotoOnHover);
                                    }
                                }
                            }, {
                                css: "a",
                                is: "added",
                                callback: e => {
                                    for (let t, r = 0; t = e.added[r]; r++) t.sfSkip > 0 || (t.sfSkip = "1", this.wrapExternalMedia(t));
                                }
                            }, {
                                css: "." + p.a.onRemoveClassName,
                                is: "removed",
                                callback: e => {
                                    for (let t, r = 0; t = e.removed[r]; r++) p.a.onRemoveListener(t);
                                }
                            } ]
                        });
                    }
                },
                hideMenu: function() {
                    v.contextMenu && (v.contextMenu.hide(), v.contextMenu = null);
                }
            }, b = {
                linkDataAttr: "savefromEd",
                timer: 0,
                lastLink: null,
                re: [ /https?:\/\/(?:[a-z]+\.)?youtube\.com\/(?:#!?\/)?watch\?[^\s\"\'\<\>]*v=([\w\-]+)/i, /https?:\/\/(?:[a-z0-9]+\.)?youtube\.com\/(?:embed|v)\/([\w\-]+)/i, /https?:\/\/(?:[a-z]+\.)?youtu\.be\/([\w\-]+)/i, /https?:\/\/(?:[\w\-]+\.)?vimeo\.com\/(\d+)(?:\?|$)/i ],
                thumbnail: {
                    youtube: {
                        re: [ /ytimg\.com(?:\/|%2F)vi(?:\/|%2F)([\w\-]+)(?:\/|%2F)/i ],
                        url: "http://www.youtube.com/watch?v={vid}"
                    }
                },
                disable: function() {
                    var e = r.embedDownloader.panel;
                    e && (e.style.display = "none");
                },
                removeBtn: function(e) {
                    if (e && "object" == typeof e) {
                        var t = e.querySelector("." + v.className);
                        t && (t.parentNode.removeAttribute(Object(c.a)(b.linkDataAttr)), t.parentNode.removeChild(t)), 
                        e.removeAttribute(Object(c.a)(b.linkDataAttr)), e == this.lastLink && (this.lastLink = null);
                    }
                },
                checkUrl: function(e, t) {
                    if (!t && e.search(/https?:\/\/([\w\-]+\.)?facebook\.com\/l\.php/i) > -1) return this.checkUrl(decodeURIComponent(e), !0);
                    for (var r = 0, o = this.re.length; r < o; r++) {
                        var n = e.match(this.re[r]);
                        if (n && n.length > 0) return n[0];
                    }
                },
                handle: function(e) {
                    var t = e.querySelector("img");
                    if (t) {
                        var o = t.parentNode;
                        if (t.src && "relative" == r.getStyle(o, "position")) {
                            var n = e.getAttribute("ajaxify");
                            if (n && n.search(/\/flash\/expand_inline/i) > -1) {
                                var a = this.getThumbnailUrl(t.src);
                                if (a) return this.createButton(a, o, e, {
                                    display: "block",
                                    position: "absolute",
                                    bottom: "3px",
                                    right: "3px",
                                    zIndex: 9999,
                                    margin: 0,
                                    width: "16px",
                                    height: "16px"
                                }, {
                                    display: "block"
                                });
                            } else if (this.checkUrl(e.href)) return this.createButton(e.href, o, e, {
                                display: "block",
                                position: "absolute",
                                bottom: "3px",
                                right: "3px",
                                zIndex: 9999,
                                margin: 0,
                                width: "16px",
                                height: "16px"
                            }, {
                                display: "block"
                            });
                        }
                        return !1;
                    }
                    return this.createButton(e.href, e, e);
                },
                getThumbnailUrl: function(e) {
                    for (var t in this.thumbnail) for (var o = 0; o < this.thumbnail[t].re.length; o++) {
                        var n = r.getMatchFirst(e, this.thumbnail[t].re[o]);
                        if (n) return this.thumbnail[t].url.replace(/\{vid\}/gi, n);
                    }
                    return "";
                },
                createButton: function(e, t, o, a, i) {
                    if (!(e = this.checkUrl(e))) return !1;
                    var l = document.createElement("a");
                    l.className = v.className, l.href = "http://savefrom.net/?url=" + encodeURIComponent(e), 
                    l.setAttribute(r.embedDownloader.dataAttr, e), l.title = n.a.i18n.getMessage("download"), 
                    r.setStyle(l, {
                        marginLeft: "7px",
                        verticalAlign: "middle"
                    }), a && r.setStyle(l, a);
                    var s = document.createElement("img");
                    return s.className = "icon", s.src = r.svg.getSrc("download", "#a2db16"), r.setStyle(s, {
                        display: "inline-block",
                        width: "16px",
                        height: "16px",
                        verticalAlign: "middle",
                        cursor: "pointer"
                    }), i && r.setStyle(s, i), l.appendChild(s), o.dataset[this.linkDataAttr] = 1, t.appendChild(l), 
                    !0;
                }
            };
            const w = {
                createButton(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    const r = {
                        default: {
                            props: {},
                            style: {}
                        },
                        circle: {
                            props: {
                                isText: !1,
                                isCircle: !0
                            },
                            style: {}
                        },
                        withoutText: {
                            props: {
                                isText: !1
                            },
                            style: {}
                        },
                        hover: {
                            className: "sf-hover-container",
                            props: {
                                isText: !1
                            },
                            style: {
                                position: "absolute",
                                top: "8px",
                                left: "8px"
                            }
                        }
                    };
                    let o = t && t.preset ? t.preset : "default", n = r[o] ? r[o] : r.default, {props: a, style: i} = n;
                    t && t.style && (i = Object.assign(i, t.style));
                    const l = h.a.create("div", {
                        class: n.className || "sf-download-container",
                        style: i
                    });
                    return Object(k.a)(Object(F.e)(L, N(N({}, a), {}, {
                        onClick: t => {
                            t.preventDefault(), t.stopPropagation(), e(t);
                        }
                    })), l), l;
                }
            };
            var x = {
                getLinksFromEmbed: function(e, t) {
                    if (!e) return t(null);
                    var r = e.getAttribute("flashvars");
                    if (null === r) return t(null);
                    var o = Object(s.a)(r).params;
                    if (!o) return t(null);
                    var n = null;
                    try {
                        n = JSON.parse(o).video_data;
                    } catch (e) {}
                    if (!n) return t(null);
                    n.progressive && (n = n.progressive);
                    var a = {}, i = {
                        sd_src: "SD",
                        hd_src: "HD"
                    };
                    Array.isArray(n) || (n = [ n ]);
                    for (var l, c = 0; l = n[c]; c++) [ "sd_src", "hd_src" ].forEach((function(e) {
                        l[e] && (a[l[e]] = i[e]);
                    }));
                    return t({
                        links: a
                    });
                },
                getVideoIdFromLink(e) {
                    let t = -1 !== e.indexOf("&") ? e.indexOf("&") : e.length, r = e.match(/videos\/(\d+)/);
                    return r || (r = e.match(/pcb\.\w+\/(.*?)\?/)), !r && e.includes("/watch/?") ? (r = e.substring(34, t), 
                    r) : !r && e.includes("/watch?") ? (r = e.substring(33, 50), r) : (!r && e.includes("permalink&v=") && (r = e.match(/permalink&v=(\d+)/)), 
                    !r && e.includes("/reel/") && (r = e.match(/reel\/(\d+)/)), r && r[1]);
                },
                requestLocalVideoLinks: function(e) {
                    return new Promise((function(e, t) {
                        r.bridge({
                            func: 'function(cb){var err=null;var token=null;try{token=window.require("DTSGInitialData").token}catch(_err){err=_err.message}cb([err,token])}',
                            cb: function(r) {
                                var o = null, n = null;
                                !r || r[0] ? o = new Error("Get token timeout") : n = r[1], o ? t(o) : e(n);
                            }
                        });
                    })).then((function(t) {
                        const r = `https://www.facebook.com/video/tahoe/async/${e}/?${q.stringify({
                            payloadtype: "primary"
                        })}`, o = q.stringify({
                            __a: 1,
                            fb_dtsg: t
                        });
                        return Object(m.a)([ r, o ], 'function(url,data){return fetch(url,{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:data}).then(function(response){return response.text()})}');
                    })).then((function(t) {
                        return new Promise((function(r, o) {
                            n.a.sendMessage({
                                action: "getFacebookLinksFromData",
                                extVideoId: e,
                                data: t
                            }, (function(e) {
                                e && e.links ? r(e) : o(new Error("Get links from data error"));
                            }));
                        }));
                    })).catch((function(e) {
                        throw D.error("get local links error", e), Object(P.a)({
                            category: "mistake",
                            subcategory: "fa",
                            event: "l"
                        }), e;
                    }));
                },
                requestBgVideoLinks: function(e) {
                    return new Promise((function(t, r) {
                        n.a.sendMessage({
                            action: "getFacebookLinks",
                            extVideoId: e
                        }, (function(e) {
                            e && e.links ? t(e) : r(new Error("Get links error"));
                        }));
                    })).catch((function(e) {
                        throw D.error("get links error", e), e;
                    }));
                },
                requestVideoLinksById: function(e) {
                    return Promise.resolve().then((function() {
                        return x.requestLocalVideoLinks(e);
                    })).catch((function() {
                        return x.requestBgVideoLinks(e);
                    }));
                },
                requestVideoLinks: function(e, t) {
                    return x.requestVideoLinksById(e).then((function(e) {
                        t(e.links, e.title);
                    }), (function(e) {
                        t();
                    }));
                },
                getLinksFromVideo: function(e, t) {
                    if (!e) return t(null);
                    const o = {};
                    var n, a = {}, i = null;
                    if (!i) {
                        let t = Object(f.a)(e, "div[data-ft]");
                        if (t && Object(u.a)(t, ".userContentWrapper[data-ft] " + t.tagName) && (t = Object(f.a)(t, ".userContentWrapper[data-ft]")), 
                        t && (Array.from(t.querySelectorAll("a[href]")).some(e => {
                            const t = /\/videos\/(\d+)/.exec(e.href);
                            if (t) return i = t[1], o.popup_1 = !0, !0;
                        }), !i)) {
                            let e = null;
                            try {
                                e = JSON.parse(t.dataset.ft);
                            } catch (e) {}
                            if (e) {
                                const t = e.mf_story_key, r = e.story_attachment_style;
                                t && "video_inline" === r && (i = t, o.popup_1 = !0);
                            }
                        }
                    }
                    if (!i) {
                        if (Object(f.a)(e, "div._5-yb")) {
                            const e = /\/videos\/(\d+)/.exec(location.href);
                            if (e) {
                                return t({
                                    links: {
                                        id: e[1]
                                    },
                                    popup_1: !0
                                });
                            }
                        }
                    }
                    if (!i) {
                        var s = Object(f.a)(e, ".uiStreamStory[data-story-id]"), c = /:(\d+)$/.exec(s && s.dataset.storyId);
                        (c = c && c[1]) && (i = c);
                    }
                    if (!i && (n = Object(l.a)(e, "fbUserContent"))) {
                        var d = n.querySelector("a[data-video-id]");
                        if (d) (g = d && d.dataset.videoId) && (i = g);
                    }
                    if (!i && (n = Object(f.a)(e, ".userContentWrapper"))) {
                        var p = n.querySelector('div[id^="feed_subtitle_"] a[data-video-channel-id]');
                        if (p) {
                            var h = /\/videos\/(\d+)/.exec(p.href);
                            (g = h && h[1]) && (i = g);
                        } else {
                            var m = n.querySelectorAll('a.profileLink, a[rel="theater"], #fbPhotoSnowliftTimestamp > a[href]'), g = null;
                            [].slice.call(m).some((function(e) {
                                var t = /\/videos\/(\d+)/.exec(e.href);
                                return g = t && t[1];
                            })), g && (i = g);
                        }
                    }
                    if (!i) {
                        var v = !1, b = !1, y = document.getElementById("stream_pagelet"), k = y && y.previousElementSibling;
                        if (k && k.contains(e) && (v = !0), !v) {
                            var w = document.querySelector(".uiStreamStory"), S = w && w.parentNode;
                            (S = S && S.parentNode) && S.contains(e) && (b = !0);
                        }
                        if (v || b) (g = x.getVideoIdFromUrl()) && (i = g);
                    }
                    if (!i && Object(f.a)(e, "#pagelet_group_permalink")) {
                        h = /video_id:"?([^,"]+)/.exec(document.body.innerHTML);
                        (g = h && h[1]) && (i = g);
                    }
                    if (i && (a.id = i), e.src && /^https?:/.test(e.src)) {
                        var O = r.getFileExtension(e.src, "mp4");
                        a[e.src] = O.toUpperCase();
                    }
                    var M = e.querySelectorAll("source");
                    if (M && M.length > 0) for (var j = 0; j < M.length; j++) {
                        O = r.getFileExtension(M[j].src, "mp4");
                        a[M[j].src] = O.toUpperCase();
                    }
                    return Object.keys(a).length ? (o.links = a, t(o)) : t(null);
                },
                getVideoIdFromUrl: function() {
                    var e = null;
                    return r.embedDownloader.hostings.facebook.re.some((function(t) {
                        var r = t.exec(location.href);
                        if (r) return e = r[1], !0;
                    })), e || (e = (e = document.location.href.match(/(\d+).$/)) && e[1] ? e[1] : null), 
                    e;
                },
                getFileName: function(e) {
                    var t = r.getFileName(e);
                    if (t) return t;
                    var o = r.dateToObj();
                    return "facebook_" + (o.year + "-" + o.month + "-" + o.day + "_" + o.hour + "-" + o.min) + "." + r.getFileExtension(e, "mp4");
                },
                prepareLinks: function(e, t) {
                    var r = [];
                    for (var o in e) {
                        var a = this.getFileName(o), i = a.lastIndexOf("."), l = a.substr(i + 1), s = {
                            href: o,
                            title: a = t || a.substr(0, i),
                            format: l.toUpperCase(),
                            quality: e[o],
                            forceDownload: !0
                        };
                        r.push(s);
                    }
                    return 0 === r.length && (r = n.a.i18n.getMessage("noLinksFound")), r;
                },
                appendLinks: function(e) {
                    if (e) {
                        var t = document.getElementById("fbPhotoPageMediaInfo");
                        if (null !== t) {
                            var o = document.querySelector("h2.uiHeaderTitle");
                            if (o && (o = o.textContent), t && !t.querySelector("." + v.className)) {
                                var a = document.createElement("div");
                                a.className = v.className;
                                var i = h.a.create("div", {
                                    title: n.a.i18n.getMessage("download"),
                                    style: {
                                        display: "inline-block",
                                        width: "16px",
                                        height: "16px",
                                        backgroundImage: "url(" + r.svg.getSrc("download", "#a2db16") + ")",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center center",
                                        verticalAlign: "middle",
                                        cursor: "pointer"
                                    }
                                });
                                a.appendChild(i);
                                var l = null;
                                i.addEventListener("click", (function() {
                                    if (v.contextMenu && v.contextMenu.isShow) v.hideMenu(); else {
                                        var t = v.contextMenu = r.popupMenu.quickInsert(this, n.a.i18n.getMessage("download") + " ...", v.className + "_popup");
                                        if (l) t.update(l); else if (e.id) {
                                            var a = e.id;
                                            delete e.id, x.requestVideoLinks(a, (function(o, n) {
                                                l = o ? r.popupMenu.prepareLinks.facebook(o, n) : x.prepareLinks(e), t.update(l);
                                            }));
                                        } else l = x.prepareLinks(e, o), t.update(l);
                                    }
                                })), t.appendChild(a), t = null, a = null, i = null;
                            }
                        }
                    }
                },
                rmBtn: function() {
                    for (var e, t = document.querySelectorAll("." + v.className), r = 0; e = t[r]; r++) e.parentNode.removeChild(e);
                },
                showDownloadMenuByVideoId(e, t) {
                    if (v.contextMenu && v.contextMenu.isShow) v.hideMenu(); else try {
                        const o = v.contextMenu = r.popupMenu.quickInsert(e, n.a.i18n.getMessage("download") + " ...", v.className + "_popup");
                        x.requestVideoLinks(t, (function(e, t) {
                            var n;
                            n = e ? r.popupMenu.prepareLinks.facebook(e, t) : x.prepareLinks(links), o.update(n);
                        }));
                    } catch (e) {
                        Object(P.a)({
                            category: "mistake",
                            subcategory: "fa",
                            event: "l"
                        });
                    }
                }
            }, S = {
                style: null,
                getFilenameFromUrl: function(e) {
                    return r.getMatchFirst(e, /\/([^\/]+\.[a-z0-9]{3,4})(?:\?|$)/i);
                },
                getPhotoIdFromUrl: function() {
                    var e = null, t = Object(s.a)(location.href);
                    return t.fbid && (e = t.fbid), e;
                },
                prepPhotoUrl: function(e) {
                    e && (/[?&]dl=1/.test(e) || (e += (/\?/.test(e) ? "&" : "?") + "dl=1"));
                    return e;
                },
                rmCurrentPhotoBtn: function(e) {
                    for (var t, r = void 0, o = document.querySelectorAll(".sf-dl-current-photo-btn"), n = 0; t = o[n]; n++) e && e.contains(t) ? r = t : t.parentNode.removeChild(t);
                    return r;
                },
                injectStyle: function() {
                    this.style ? this.style.parentNode || document.head.appendChild(this.style) : (this.style = h.a.create("style", {
                        text: Object(d.a)({
                            "div > .sf-dl-current-photo-btn": {
                                display: "none",
                                position: "absolute",
                                top: "10px",
                                left: "10px",
                                width: "28px",
                                height: "24px",
                                border: 0,
                                zIndex: 100,
                                cursor: "pointer",
                                backgroundColor: "#000",
                                padding: 0,
                                borderRadius: "2px",
                                opacity: .4,
                                transition: "opacity 100ms linear",
                                lineHeight: 0
                            },
                            "div > .sf-dl-current-photo-btn svg": {
                                margin: "4px"
                            },
                            "div > .sf-dl-current-photo-btn:hover": {
                                opacity: .8
                            },
                            "div > .sf-dl-current-photo-btn:hover svg path": {
                                fill: "#00B75A"
                            },
                            "body:not(.fullScreen) div:hover > .sf-dl-current-photo-btn": {
                                display: "block"
                            }
                        })
                    }), document.head.appendChild(this.style));
                },
                getPhotoUrlFromCtr: function(e) {
                    var t = [], r = e.querySelector("img.spotlight") || e.querySelector("img.fbPhotoImage");
                    return r && t.push(r.src), t;
                },
                getVideoUrlFromPhotoCtr: function(e) {
                    var t = null, r = e.querySelector(".stage .videoStage video");
                    if (r) {
                        var o = Object(f.a)(r, ".fbPhotoSnowliftPopup");
                        if (o) {
                            var n = o.querySelector('div[id^="feed_subtitle_"] a[data-video-channel-id]');
                            if (n) {
                                var a = /\/videos\/(\d+)/.exec(n.href);
                                a && (t = a[1]);
                            }
                        }
                    }
                    return t;
                },
                getLinksFromPhotoCtr: function(e) {
                    return Object(u.a)(e, ".stageWrapper.showVideo") ? Promise.resolve().then((function() {
                        var t = x.getVideoIdFromUrl();
                        if (t || (t = S.getVideoUrlFromPhotoCtr(e)), t) return x.requestVideoLinksById(t);
                    })).then((function(e) {
                        return r.popupMenu.prepareLinks.facebook(e.links, e.title);
                    })) : Promise.resolve().then((function() {
                        var e = S.getPhotoIdFromUrl();
                        if (e) return new Promise((function(t, r) {
                            n.a.sendMessage({
                                action: "getFacebookPhotoUrl",
                                fbid: e
                            }, (function(e) {
                                e && e.length ? t(e) : r(new Error("getFacebookPhotoUrl can't get url"));
                            }));
                        }));
                        throw new Error("Can't get photo id from url");
                    })).catch((function(t) {
                        return S.getPhotoUrlFromCtr(e);
                    })).then((function(e) {
                        if (!e || !e.length) throw new Error("Photo url not found");
                        return e.map((function(e) {
                            var t = S.prepPhotoUrl(e), r = g.a.modify(S.getFilenameFromUrl(t)), o = /(.+)\.([^.]+)$/.exec(r), a = "jpg", i = r;
                            return o && (a = o[1], i = o[2]), {
                                href: t,
                                title: i,
                                quality: n.a.i18n.getMessage("download"),
                                format: " ",
                                ext: a,
                                isBlank: !0
                            };
                        }));
                    }));
                },
                addDlCurrentPhotoBtn: function(e) {
                    if (!this.rmCurrentPhotoBtn(e)) {
                        var t = h.a.create("a", {
                            class: "sf-dl-current-photo-btn",
                            href: "#",
                            title: n.a.i18n.getMessage("download"),
                            append: [ r.svg.getSvg("download", "#FFF", 16) ],
                            on: [ [ "click", function(t) {
                                if (t.stopPropagation(), t.preventDefault(), v.contextMenu && v.contextMenu.isShow) v.hideMenu(); else {
                                    var o = function e(t) {
                                        18 !== t.keyCode && 17 !== t.keyCode && (a.hide(), document.removeEventListener("keydown", e));
                                    }, a = v.contextMenu = r.popupMenu.quickInsert(this, n.a.i18n.getMessage("download") + " ...", "photoDlMenu", {
                                        parent: e,
                                        onShow: function() {
                                            v.isMutation || document.addEventListener("keydown", o);
                                        },
                                        onHide: function() {
                                            v.isMutation || document.removeEventListener("keydown", o);
                                        }
                                    });
                                    S.getLinksFromPhotoCtr(e).then((function(e) {
                                        e.forEach((function(e) {
                                            e.func = function(t) {
                                                t.preventDefault(), r.download(null, e.href), a.hide();
                                            };
                                        })), a.update(e);
                                    })).catch((function(e) {
                                        D.debug("Get photo links error", e), a.update(n.a.i18n.getMessage("noLinksFound"));
                                    }));
                                }
                            } ], [ "mouseover", e => {
                                if (I) {
                                    if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void Object(C.b)(t, {
                                        defaultWidth: 400,
                                        defaultHeight: 60
                                    }, {});
                                    Object(C.a)(t, {
                                        defaultWidth: 400,
                                        defaultHeight: 60
                                    });
                                }
                            } ] ]
                        });
                        e.appendChild(t);
                    }
                },
                addButtonForArticleImage(e) {
                    const t = e.closest("a");
                    if (!t) return;
                    let o = S.getFilenameFromUrl(e.src);
                    o && !/\.php$/.test(o) || (o = g.a.modify(document.title + ".jpg"));
                    const n = h.a.create("a", {
                        class: "sf-hover-container",
                        href: e.src,
                        download: o,
                        style: {
                            position: "absolute",
                            top: "8px",
                            left: "8px"
                        },
                        on: [ [ "click", e => {
                            e.stopPropagation(), r.downloadOnClick(e);
                        } ], [ "mouseover", e => {
                            if (I) {
                                if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void Object(C.b)(n, {
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                }, {});
                                Object(C.a)(n, {
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                });
                            }
                        } ] ]
                    });
                    Object(P.a)({
                        category: "append",
                        subcategory: "fa",
                        event: "b"
                    }), Object(k.a)(Object(F.e)(L, {
                        isText: !1
                    }), n), t.appendChild(n);
                },
                addButtonForShowPageImage(e) {
                    const t = e.closest('div:not([data-visualcompletion="media-vc-image"])').parentElement.parentElement;
                    if (!t) return;
                    let o = S.getFilenameFromUrl(e.src);
                    o && !/\.php$/.test(o) || (o = document.title + ".jpg");
                    const n = h.a.create("a", {
                        style: {
                            position: "absolute",
                            zIndex: 9999,
                            margin: "15px"
                        },
                        href: e.src,
                        download: o,
                        on: [ [ "click", e => {
                            e.stopPropagation(), r.downloadOnClick(e);
                        } ], [ "mouseover", e => {
                            if (I) {
                                if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void Object(C.b)(n, {
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                }, {});
                                Object(C.a)(n, {
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                });
                            }
                        } ] ]
                    });
                    Object(P.a)({
                        category: "append",
                        subcategory: "fa",
                        event: "b"
                    }), Object(k.a)(Object(F.e)(L, {
                        isText: !1,
                        isCircle: !0
                    }), n), t.prepend(n);
                },
                addCurrentDlBtn: function(e) {
                    e.dataset.sfSkip > 0 || (e.dataset.sfSkip = "1", this.addDlCurrentPhotoBtn(e));
                },
                rmDataAttrs: function() {
                    for (var e, t = Object(c.a)("sfSkip"), r = document.querySelectorAll("*[" + t + "]"), o = 0; e = r[o]; o++) e.removeAttribute(t);
                }
            }, O = {
                style: null,
                addStyle: function() {
                    if (this.style) return void (this.style.parentNode || document.head.appendChild(this.style));
                    this.style = h.a.create("style", {
                        class: "sfFeedStyle",
                        text: Object(d.a)([ {
                            selector: "." + v.className + "-feed.sf-feed",
                            style: {
                                display: "none",
                                width: "20px",
                                height: "20px",
                                padding: 0,
                                position: "absolute",
                                background: "url(" + r.svg.getSrc("download", "#a2db16") + ") center no-repeat transparent",
                                backgroundSize: "16px",
                                top: "5px",
                                left: "5px",
                                zIndex: 1,
                                cursor: "pointer"
                            }
                        }, {
                            selector: 'div[role="dialog"] .' + v.className + "-feed.sf-feed",
                            style: {
                                top: "40px"
                            }
                        }, {
                            selector: "body:not(.fullScreen) div:hover > ." + v.className + "-feed.sf-feed",
                            style: {
                                display: "block"
                            }
                        }, {
                            selector: "." + v.className + "-feed.sf-feed:active",
                            style: {
                                outline: 0
                            }
                        }, {
                            selector: ".sf-hover-container",
                            style: {
                                display: "none"
                            }
                        }, {
                            selector: 'div[role="presentation"]:hover .sf-hover-container, a[role="link"]:hover .sf-hover-container, div[style*="bottom:calc"]:hover .sf-hover-container',
                            style: {
                                display: "block"
                            }
                        } ])
                    }), document.head.appendChild(this.style);
                },
                onDlBtnClick: function(e) {
                    if (e.preventDefault(), e.stopPropagation(), v.contextMenu && v.contextMenu.isShow) v.hideMenu(); else {
                        try {
                            var t = JSON.parse(this.dataset.sfDlLinks);
                        } catch (e) {
                            return;
                        }
                        var o = v.contextMenu = r.popupMenu.quickInsert(this, n.a.i18n.getMessage("download") + " ...", v.className + "_popup");
                        if (t.id) {
                            var a = t.id;
                            delete t.id, x.requestVideoLinks(a, (function(e, n) {
                                var a;
                                a = e ? r.popupMenu.prepareLinks.facebook(e, n) : x.prepareLinks(t), o.update(a);
                            }));
                        } else {
                            var i = x.prepareLinks(t);
                            o.update(i);
                        }
                    }
                },
                addDownloadBtn: function(e, t) {
                    var r = e.querySelector("." + v.className + "-feed");
                    r && r.parentNode.removeChild(r), e.appendChild(h.a.create("a", {
                        data: {
                            sfDlLinks: JSON.stringify(t)
                        },
                        title: n.a.i18n.getMessage("download"),
                        class: [ v.className + "-feed", "sf-feed" ],
                        href: "#",
                        on: [ "click", O.onDlBtnClick ]
                    }));
                },
                addButtonForWatchPage(e) {
                    let t = e.closest("._6x84");
                    const r = /\/live/.test(location.href);
                    t || (t = e.closest(".x1n6yrxt, .xvl6max")), !t && r && (t = e.closest(".x1282nqq").parentNode);
                    let o = t.querySelector('a[href*="/videos/"]');
                    if (o || (o = t.querySelector('a[href*="/watch/?"]')), o || (o = {
                        href: window.location.href
                    }), !o || !o.href) return;
                    let n = x.getVideoIdFromLink(o.href);
                    if (!n) return;
                    const a = w.createButton(() => {
                        x.showDownloadMenuByVideoId(a, n);
                    });
                    Object(P.a)({
                        category: "append",
                        subcategory: "fa",
                        event: "b"
                    });
                    let i = null === t.querySelector('[aria-label="Like"]') ? t.querySelector(".x1u2d2a2") : t.querySelector('[aria-label="Like"]').parentNode;
                    o.href === window.location.href ? (e.dataset.waRep = "1", setTimeout(() => {
                        i.querySelector(".sf-download-container") && _ !== o.href && i.querySelector(".sf-download-container").remove(), 
                        i.prepend(a), _ = o.href;
                    }, 1500)) : (i.querySelector(".sf-download-container") && i.querySelector(".sf-download-container").remove(), 
                    i.prepend(a));
                },
                addButtonForFeedPage(e) {
                    const t = e.closest('[role="article"]');
                    let r = t.querySelector('a[href*="/watch/?v"]');
                    if (r || (r = t.querySelector('a[href*="/videos/"]')), !r) return;
                    let o = r.href, n = x.getVideoIdFromLink(o);
                    if (!n) return;
                    const a = null === t.querySelector('[aria-label="Like"]') ? t.querySelector(".x8182xy").firstChild : t.querySelector('[aria-label="Like"]').parentNode;
                    if (!a) return;
                    const i = w.createButton(() => {
                        x.showDownloadMenuByVideoId(i, n);
                    }, {
                        preset: "withoutText",
                        style: {
                            alignItems: "center",
                            display: "flex"
                        }
                    });
                    Object(P.a)({
                        category: "append",
                        subcategory: "fa",
                        event: "b"
                    }), a.parentElement.insertBefore(i, a);
                },
                addButtonForShowPageVideo(e) {
                    const t = w.createButton(e => {
                        let t = x.getVideoIdFromLink(location.href);
                        t && x.showDownloadMenuByVideoId(e.target, t);
                    }, {
                        preset: "circle",
                        style: {
                            position: "absolute",
                            top: "8px",
                            left: "114px"
                        }
                    });
                    Object(P.a)({
                        category: "append",
                        subcategory: "fa",
                        event: "b"
                    }), e.appendChild(t);
                },
                addButtonForReelVideo(e) {
                    let t = {
                        position: "absolute",
                        top: "80px",
                        left: "16px",
                        zIndex: 10
                    }, r = e.querySelector("div[data-video-id]");
                    if (r || (r = e, t = N(N({}, t), {}, {
                        top: "16px"
                    })), !r) return;
                    const o = w.createButton(e => {
                        let t = r.getAttribute("data-video-id");
                        t || (t = x.getVideoIdFromLink(r.getAttribute("href"))), t && x.showDownloadMenuByVideoId(e.target, t);
                    }, {
                        preset: "circle",
                        style: t
                    });
                    Object(P.a)({
                        category: "append",
                        subcategory: "fa",
                        event: "b"
                    }), e.appendChild(o);
                },
                addHoverButtonForArticleVideo(e) {
                    let t = x.getVideoIdFromLink(e.href);
                    if (!t) return;
                    const r = e.closest('[role="article"], ._6x84');
                    if (!r) return;
                    let o = r.querySelector('div[role="presentation"]');
                    if (!o && (o = e.parentNode, !o)) return;
                    const n = w.createButton(e => {
                        x.showDownloadMenuByVideoId(e.target, t);
                    }, {
                        preset: "hover"
                    });
                    o.appendChild(n);
                },
                onLinkHover: function() {
                    var e = this;
                    if (!(this.dataset.hasSfFeedBtn > 1)) {
                        this.dataset.hasSfFeedBtn = "1";
                        var t = this;
                        return "VIDEO" === t.tagName && (t = t.querySelector("embed") || this), new Promise(e => {
                            "EMBED" === t.tagName ? x.getLinksFromEmbed(t, e) : "VIDEO" === t.tagName && x.getLinksFromVideo(t, e);
                        }).catch(e => (D("getLinks error", e), null)).then(t => {
                            const r = t && t.links;
                            if (r) if (t && t.popup_1) O.addDownloadBtn(e.parentNode, r); else if (Object(u.a)(e, ".uiStreamStory " + e.tagName) || Object(u.a)(e, ".fbPhotoSnowliftContainer " + e.tagName)) {
                                Object(f.a)(e, ".fbPhotoSnowliftPopup .stageWrapper") || O.addDownloadBtn(e.parentNode, r);
                            } else {
                                var o = document.getElementById("pagelet_timeline_main_column") || document.getElementById("stream_pagelet") || document.getElementById("mainContainer");
                                if (o && o.contains(e)) O.addDownloadBtn(e.parentNode, r); else {
                                    var n = document.getElementById("stream_pagelet"), a = n && n.previousElementSibling;
                                    if (a && a.contains(e)) O.addDownloadBtn(e.parentNode, r); else {
                                        var i = document.querySelector(".uiStreamStory"), l = i && i.parentNode;
                                        (l = l && l.parentNode) && l.contains(e) && O.addDownloadBtn(e.parentNode, r);
                                    }
                                }
                            } else e.dataset.hasSfFeedBtn = 0;
                        });
                    }
                },
                rmBtn: function() {
                    let e = [ Object(c.a)("hasSfFeedBtn"), Object(c.a)("sfReady") ];
                    const t = e.map(e => `[${e}]`).join(",");
                    document.querySelectorAll(t).forEach(t => {
                        e.forEach(e => t.removeAttribute(e));
                    });
                    const r = [ ".sf-hover-container", ".sf-download-container", "." + v.className + "-feed" ].join(",");
                    document.querySelectorAll(r).forEach(e => {
                        e.parentNode.removeChild(e);
                    });
                }
            };
        }));
    },
    66: function(e, t, r) {
        var o = r(35), n = r(86);
        "string" == typeof (n = n.__esModule ? n.default : n) && (n = [ [ e.i, n, "" ] ]);
        var a, i = 0, l = {
            injectType: "lazyStyleTag",
            insert: "head",
            singleton: !1
        }, s = {};
        s.locals = n.locals || {}, s.use = function() {
            return i++ || (a = o(n, l)), s;
        }, s.unuse = function() {
            i > 0 && !--i && (a(), a = null);
        }, e.exports = s;
    },
    86: function(e, t, r) {
        "use strict";
        r.r(t);
        var o = r(23), n = r.n(o)()(!1);
        n.push([ e.i, ".VUkNZ--container{display:flex;font-family:inherit;margin-right:10px;font-weight:600;color:#65676b;line-height:1.6;border-radius:4px;padding:5px 4px;cursor:pointer}.VUkNZ--container:hover{background-color:rgba(0,0,0,.05)}.vRyx2--text{margin-left:4px}.BXrR8--circle-container{padding:0;border-radius:100%;width:40px;height:40px;background:#e4e6eb}.BXrR8--circle-container:hover{background-color:#fff}.BXrR8--circle-container .J6uYv--logo{margin:0 auto;max-width:20px}", "" ]), 
        n.locals = {
            container: "VUkNZ--container",
            text: "vRyx2--text",
            "circle-container": "BXrR8--circle-container",
            circleContainer: "BXrR8--circle-container",
            logo: "J6uYv--logo"
        }, t.default = n;
    }
});