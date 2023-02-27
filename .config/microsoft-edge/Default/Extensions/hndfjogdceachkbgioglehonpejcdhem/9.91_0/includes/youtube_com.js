!function(e) {
    function t(t) {
        for (var o, a, s = t[0], l = t[1], d = t[2], u = 0, p = []; u < s.length; u++) a = s[u], 
        Object.prototype.hasOwnProperty.call(i, a) && i[a] && p.push(i[a][0]), i[a] = 0;
        for (o in l) Object.prototype.hasOwnProperty.call(l, o) && (e[o] = l[o]);
        for (c && c(t); p.length; ) p.shift()();
        return r.push.apply(r, d || []), n();
    }
    function n() {
        for (var e, t = 0; t < r.length; t++) {
            for (var n = r[t], o = !0, s = 1; s < n.length; s++) {
                var l = n[s];
                0 !== i[l] && (o = !1);
            }
            o && (r.splice(t--, 1), e = a(a.s = n[0]));
        }
        return e;
    }
    var o = {}, i = {
        19: 0
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
    var s = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], l = s.push.bind(s);
    s.push = t, s = s.slice();
    for (var d = 0; d < s.length; d++) t(s[d]);
    var c = l;
    r.push([ 103, 0 ]), n();
}({
    103: function(e, t, n) {
        "use strict";
        n.r(t);
        var o = n(0), i = n(11), r = n(10), a = n(27), s = n(24), l = n(18), d = n(9), c = n(21), u = n(14), p = n(3), f = n(1), g = n(5), h = n(6), b = n(15), v = n(8), m = n(30), y = n(49), k = n(17), x = n(19), C = n(22), w = n(36), S = n(12);
        function M(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(e);
                t && (o = o.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), n.push.apply(n, o);
            }
            return n;
        }
        const B = n(42), I = Object(h.a)("getYoutubeLinks");
        function L(e, t) {
            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return O(e, t, n).catch(t => (I.error("getVideoLinks error", t), F(e).then(t => {
                let {videoInfo: o} = t;
                return Object(S.a)({
                    action: "ytPrepareVideoInfo",
                    videoId: e,
                    checkSubtitles: n.checkSubtitles,
                    noDash: n.checkSubtitles,
                    config: o
                });
            }))).then(e => {
                if (!e.links) throw new Error("Links not found");
                return e;
            });
        }
        function O(e, t, n) {
            return Object(S.a)(function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? M(Object(n), !0).forEach((function(t) {
                        Object(x.a)(e, t, n[t]);
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : M(Object(n)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                    }));
                }
                return e;
            }({
                action: "getYoutubeLinksFromConfig",
                extVideoId: e,
                url: t,
                config: {
                    args: {
                        video_id: e
                    }
                }
            }, n)).then(e => {
                if (!e.links) throw Error("getYoutubeLinksFromBackground. Links not found");
                return e;
            });
        }
        function F(e) {
            return function(e) {
                const t = "https://www.youtube.com/embed/" + encodeURIComponent(e);
                return Object(C.a)({
                    url: t,
                    localXHR: o.a.isGM
                }).then(e => {
                    const t = Object(w.a)(e.body, /INNERTUBE_CONTEXT":(.*?),/);
                    if (!t.length || !t[0].INNERTUBE_CONTEXT || !t[0].INNERTUBE_API_KEY) throw Error("INNERTUBE_CONTEXT not found");
                    return t[0];
                });
            }(e).then(t => {
                const n = "https://www.youtube.com/youtubei/v1/player?" + B.stringify({
                    key: t.INNERTUBE_API_KEY
                });
                return Object(C.a)({
                    url: n,
                    method: "POST",
                    localXHR: o.a.isGM,
                    json: !0,
                    data: JSON.stringify({
                        context: t.INNERTUBE_CONTEXT,
                        videoId: e
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "X-Youtube-Client-Name": t.INNERTUBE_CONTEXT_CLIENT_NAME || "55",
                        "X-Youtube-Client-Version": t.INNERTUBE_CONTEXT_CLIENT_VERSION || "1.20210331.1.0"
                    }
                });
            }).then(e => ({
                videoInfo: {
                    player_response: e.body
                }
            }));
        }
        var R = n(7), N = n(13);
        const _ = Object(h.a)("youtube_com");
        b.a.isSingle() && Object(r.b)("youtube", (function(e, t) {
            const n = Object(i.a)(t);
            var r = t.preferences, h = r.moduleYoutube ? 1 : 0, b = o.a.isChrome || o.a.isFirefox || o.a.isGM && o.a.isTM, x = Object(a.a)();
            const {experiments: C = {}} = r;
            o.a.onMessage.addListener((function(t, n, o) {
                if ("getModuleInfo" === t.action) {
                    if (t.url !== location.href) return;
                    return o({
                        state: h,
                        moduleName: e
                    });
                }
                if ("changeState" === t.action) {
                    if (e !== t.moduleName) return;
                    return w.changeState(t.state);
                }
                if ("updatePreferences" !== t.action) {
                    if (h) {
                        if ("updateLinks" === t.action) {
                            var i = w.getIdFromLocation();
                            i && M((function(e) {
                                if (e && e.args && e.args.video_id === i) {
                                    var t = document.getElementById(w.buttonId);
                                    null !== t && t.parentNode.removeChild(t), w.responseCache = {}, w.video_id = e.args.video_id;
                                    var n = document.getElementById("watch7-subscription-container");
                                    w.appendDownloadButton(n);
                                }
                            }));
                        }
                        "downloadPlaylist" === t.action && w.downloadPlaylist();
                    }
                } else Object.assign(r, t.preferences);
            })), h && setTimeout((function() {
                w.run();
            }));
            var w = {
                swfargs: null,
                video_id: "",
                buttonId: "savefrom__yt_btn",
                responseCache: {},
                isMobile: !1,
                mobileMenu: null,
                currentMenu: null,
                currentTutorial: null,
                run: function() {
                    if (h = 1, x) {
                        var e = location.href.match(/\/embed\/([\w\-]+)/i);
                        (e = e && e[1]) || (x = !1);
                    }
                    return 0 === location.host.indexOf("m.") ? (w.isMobile = !0, void (v.a.isAvailable() && w.mobileMutationMode.enable())) : x ? (w.video_id = e, 
                    void w.appendFrameButton()) : void (v.a.isAvailable() && (w.videoFeed.injectStyle(), 
                    w.mutationMode.enable()));
                },
                changeState: function(e) {
                    if (h = e, !x && !w.isMobile) {
                        w.tutorial.hide(), w.hideCurrentMenu(), w.videoFeed.rmBtn(), w.mutationMode.stop();
                        var t = document.getElementById(w.buttonId);
                        t && t.parentNode.removeChild(t), e && w.run();
                    }
                },
                hideCurrentMenu: function() {
                    w.currentMenu && (w.currentMenu.hide(), w.currentMenu = null);
                },
                hideMobileMenu: function() {
                    w.mobileMenu && (w.mobileMenu.hide(), w.mobileMenu = null);
                },
                mutationMode: {
                    observer: null,
                    stop: function() {
                        w.mutationMode.observer && w.mutationMode.observer.stop(), [ "sfSkip" ].forEach((function(e) {
                            for (var t, n = Object(l.a)(e), o = document.querySelectorAll("[" + n + "]"), i = 0; t = o[i]; i++) t.removeAttribute(n);
                        }));
                    },
                    wrapVideoFeedOnImgHover: function() {
                        if (h && w.videoFeed.testUrl(location.href) && !(this.dataset.sfBtn > 0)) {
                            this.dataset.sfBtn = "1";
                            var e = JSON.parse(this.dataset.sfContext);
                            this.appendChild(w.videoFeed.getBtnNode(e.id, e.styleIndex));
                        }
                    },
                    wrapNewVideoFeedOnThumbnailHover: function() {
                        if (h && w.videoFeed.testUrl(location.href)) {
                            var e = w.mutationMode, t = this, n = t.href, o = n && (n.match(w.videoFeed.hrefIdPattern) || n.match(w.videoFeed.shortsPattern)), i = o && o[1];
                            if (i && !t.querySelector(".sf-feed-btn")) {
                                var r = w.videoFeed.getBtnNode(i, 2);
                                p.a.onRemoveEvent(r, (function() {
                                    this.parentNode || p.a.one(t, "mouseenter", e.wrapNewVideoFeedOnThumbnailHover);
                                })), t.appendChild(r);
                            }
                            n = null, o = null, i = null, r = null;
                        }
                    },
                    enable: function() {
                        var e = this;
                        if (e.observer) return e.observer.start();
                        const t = t => {
                            if (w.videoFeed.testUrl(location.href)) for (let n, o = 0; n = t.added[o]; o++) {
                                if (n.dataset.sfSkip > 0) continue;
                                n.dataset.sfSkip = "1";
                                const t = n.dataset.videoIds;
                                if (t) {
                                    const o = n.parentNode, i = {};
                                    i.id = t, i.styleIndex = 1, o.dataset.sfContext = JSON.stringify(i), p.a.one(o, "mouseenter", e.wrapVideoFeedOnImgHover);
                                }
                            }
                        }, n = e => {
                            for (let t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                            w.appendNewDownloadButton(t));
                        };
                        e.observer = new v.a({
                            queries: [ {
                                css: "#watch7-subscription-container",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    w.appendDownloadButton(t));
                                }
                            }, {
                                css: "ytd-reel-video-renderer > #player-container",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    w.appendShortDownloadButton(t, t.getAttribute("style")));
                                }
                            }, {
                                css: "button.addto-watch-later-button-sign-in",
                                is: "added",
                                callback: t
                            }, {
                                css: "button.addto-watch-later-button",
                                is: "added",
                                callback: t
                            }, {
                                css: "ytd-thumbnail a#thumbnail img",
                                is: "added",
                                callback: t => {
                                    if (w.videoFeed.testUrl(location.href)) for (let n, o = 0; n = t.added[o]; o++) n.dataset.sfSkip > 0 || (n.dataset.sfSkip = "1", 
                                    p.a.one(Object(u.a)(n, "a"), "mouseenter", e.wrapNewVideoFeedOnThumbnailHover));
                                }
                            }, {
                                css: ".ytd-page-manager #info #info-contents:not([hidden]) #top-level-buttons-computed",
                                is: "added",
                                callback: n
                            }, {
                                css: ".ytd-page-manager #actions .actions-inner #top-level-buttons-computed, .ytd-page-manager #actions #actions-inner #top-level-buttons-computed",
                                is: "added",
                                callback: n
                            }, {
                                css: "." + p.a.onRemoveClassName,
                                is: "removed",
                                callback: e => {
                                    for (let t, n = 0; t = e.removed[n]; n++) p.a.onRemoveListener(t);
                                }
                            } ]
                        });
                    }
                },
                mobileMutationMode: {
                    observer: null,
                    stop: function() {
                        w.mutationMode.observer && w.mutationMode.observer.stop(), [ "sfSkip" ].forEach((function(e) {
                            for (var t, n = Object(l.a)(e), o = document.querySelectorAll("[" + n + "]"), i = 0; t = o[i]; i++) t.removeAttribute(n);
                        }));
                    },
                    enable: function() {
                        if (this.observer) return this.observer.start();
                        this.observer = new v.a({
                            queries: [ {
                                css: 'div > div > div > a[onclick][href="#"] > span[id]',
                                is: "added",
                                callback: e => {
                                    for (let o, i = 0; o = e.added[i]; i++) {
                                        if (0 !== o.id.indexOf("koya_elem_")) continue;
                                        for (var t = 0; t < 4 && o; ) o = o.parentNode, t++;
                                        if (!o || 4 !== t) continue;
                                        let e = 1;
                                        var n = o.querySelector("div:nth-child(1)>h1:nth-child(1)");
                                        if (n || (n = null), !n && Object(c.a)(o, 'div > div > div[id^="koya_child_"]:last-child > div')) {
                                            for (n = o, t = 0; t < 3 && n; ) n = n.parentNode, t++;
                                            n && n.querySelector("div:nth-child(1)>h2:nth-child(1)") ? (o = o.parentNode, e = 2) : n = null;
                                        }
                                        n && (o.dataset.sfSkip > 0 || (o.dataset.sfSkip = "1", w.appendMobileButton("", o, e)));
                                    }
                                }
                            }, {
                                css: "#app .page-container .video-main-content-actions",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    w.appendMobileButton("", t, 3));
                                }
                            }, {
                                css: "#app .page-container .playlist-controls-secondary",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    w.appendMobileButton("", t, 4));
                                }
                            }, {
                                css: "#app .slim-video-action-bar-actions",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    w.appendNewMobileButton(t, 5));
                                }
                            }, {
                                css: "." + p.a.onRemoveClassName,
                                is: "removed",
                                callback: e => {
                                    for (let t, n = 0; t = e.removed[n]; n++) p.a.onRemoveListener(t);
                                }
                            } ]
                        });
                    }
                },
                _onSelectBtnClick: function(e, t) {
                    if (!(t.button > 0)) if (t.stopPropagation(), t.preventDefault(), w.currentMenu && w.currentMenu.isShow) w.hideCurrentMenu(); else {
                        var i = e.btnObj, r = i.videoId, a = w.currentMenu = n.popupMenu.quickInsert(i.node, o.a.i18n.getMessage("download") + " ...", "sf-popupMenu", {
                            onShow: function() {
                                p.a.onRemoveEvent(i.node, w.hideCurrentMenu);
                            },
                            onHide: function() {
                                p.a.offRemoveEvent(i.node, w.hideCurrentMenu);
                            },
                            onItemClick: function(e, t) {
                                var n = t.itag;
                                i.lastItag !== n && o.a.storage.set({
                                    ytLastITag: n
                                }, (function() {
                                    w.quickBtn.setValue(i);
                                })), w.onMenuItemClick(t, {
                                    isPageItem: 1,
                                    videoId: r
                                });
                            },
                            offsetTop: i.popupMenu && i.popupMenu.offsetTop,
                            offsetRight: i.popupMenu && i.popupMenu.offsetRight,
                            parent: i.popupMenu && i.popupMenu.parent
                        }), s = function(e) {
                            return e && e.length ? a.update(e, o.a.i18n.getMessage("partnersLinksOnly")) : a.update(o.a.i18n.getMessage("noLinksFound"));
                        };
                        if (!r) return s();
                        var l = function(e) {
                            let t = [];
                            if (e.links) {
                                var i = n.popupMenu.prepareLinks.youtube(e.links, e.title, e.subtitles);
                                if (!(i = i.filter(e => e.href)).length) return void s(t);
                                if (0 === i.filter(e => ![ "ummy", "televzr" ].includes(e.format)).length) return s(t);
                                i = i.map(e => (![ "360", "720" ].includes(e.quality) || "MP4" !== e.format || isNaN(parseInt(e.itag)) || e.func || (e.func = () => {
                                    _.log("track click downloadItem", e), o.a.sendMessage({
                                        action: "track",
                                        t: "event",
                                        tid: "UA-181742122-3",
                                        el: "mp4_" + e.quality,
                                        ec: "download",
                                        ea: "mp4_" + e.quality
                                    });
                                }), e)), a.update(i);
                            } else s(t);
                        }, d = w.responseCache[r];
                        if (d) return l(d);
                        L(r, location.href, {
                            checkSubtitles: !0
                        }).then(e => {
                            w.responseCache[r] = e, l(e);
                        }, e => {
                            _.error("get links for dropdown error", e), s();
                        }), i.isFirstMenuShow && (i.isFirstMenuShow = !1);
                    }
                },
                appendDownloadButton: function(e) {
                    var t = e.querySelector("#" + w.buttonId);
                    t && (t.parentNode && t.parentNode.removeChild(t), t = null);
                    var n = this, o = {}, i = n.getButtonUnderVideo(w._onSelectBtnClick.bind(null, o));
                    return o.btnObj = i, i.isFirstMenuShow = !0, i.setLoadingState(), e.appendChild(i.node), 
                    M((function(e) {
                        var t = null;
                        if (e && e.args && e.args.video_id && (t = e.args.video_id), t) {
                            i.node.dataset.sfVideoId = t, i.ytConfig = e, i.videoId = t, i.isPage = 1;
                            var o = [], r = function() {
                                r = null, w.tutorial.show({
                                    target: i.node
                                });
                            };
                            o.push((function() {
                                return r && r();
                            })), i.onGetLinksArr = o, n.quickBtn.setValue(i);
                        }
                    }));
                },
                appendNewDownloadButton: function(e, t) {
                    var o = this, i = e.querySelector("#" + w.buttonId);
                    if (i) {
                        if (t) return;
                        i.classList.remove(p.a.onRemoveClassName), i.parentNode && i.parentNode.removeChild(i), 
                        i = null;
                    }
                    var r = new this.getNewButtonUnderVideo(w._onSelectBtnClick);
                    r.isFirstMenuShow = !0, r.setLoadingState();
                    var a = e.childNodes[2];
                    a || (a = e.firstChild), a ? e.insertBefore(r.node, a) : e.appendChild(r.node);
                    let s = null, l = null;
                    return p.a.onRemoveEvent(r.node, (function() {
                        s && (s.abort(), s = null), l && (l.destroy(), l = null), e.parentNode && w.appendNewDownloadButton(e, !0);
                    })), r.popupMenu = {
                        offsetTop: -6,
                        offsetRight: -1,
                        parent: r.menuContainer
                    }, s = n.waitNodesBySelector("#movie_player"), s.then(() => {
                        if (Object(y.a)(document.body, r.node)) return B().then(e => {
                            var t = e && e.args && e.args.video_id;
                            if (t) {
                                r.node.dataset.sfVideoId = t, r.ytConfig = e, r.videoId = t, r.isPage = 1;
                                var n = [];
                                r.onGetLinksArr = n, n.push((function() {
                                    w.tutorial.show({
                                        target: r.selectBtn,
                                        parent: r.menuContainer,
                                        btnLeftOffset: 12,
                                        btnTopOffset: -6
                                    });
                                })), o.quickBtn.setValue(r), Object(R.a)({
                                    category: "append",
                                    subcategory: "101",
                                    event: "b"
                                });
                            } else _.debug("videoId is not found!");
                        });
                        _.debug("Btn not exists");
                    }).catch(e => {
                        "ABORTED" !== e.message && _.error("waitNodesBySelector error", e);
                    });
                },
                appendShortDownloadButton: function(e, t, o) {
                    var i = this;
                    const r = e.parentElement, a = r.children[1], s = r.querySelector("#like-button");
                    a.style.overflow = "visible";
                    var l = e.querySelector("#" + w.buttonId);
                    if (l) {
                        if (o) return;
                        l.classList.remove(p.a.onRemoveClassName), l.parentNode && l.parentNode.removeChild(l), 
                        l = null;
                    }
                    var d = new this.getShortButton(w._onSelectBtnClick);
                    d.isFirstMenuShow = !0, d.setLoadingState(), s.append(d.node);
                    let c = null, u = null;
                    return p.a.onRemoveEvent(d.node, (function() {
                        c && (c.abort(), c = null), u && (u.destroy(), u = null), s.parentNode && w.appendShortDownloadButton(s, t, !0);
                    })), d.popupMenu = {
                        offsetTop: -6,
                        offsetRight: -1,
                        parent: d.menuContainer
                    }, c = n.waitNodesBySelector("#movie_player"), c.then(() => {
                        if (Object(y.a)(document.body, d.node)) return B(t, !0).then(e => {
                            var t = e && e.args && e.args.video_id;
                            if (t) {
                                d.node.dataset.sfVideoId = t, d.ytConfig = e, d.videoId = t, d.isPage = 1;
                                var n = [];
                                d.onGetLinksArr = n, n.push((function() {
                                    w.tutorial.show({
                                        target: d.selectBtn,
                                        parent: d.menuContainer,
                                        btnLeftOffset: 12,
                                        btnTopOffset: -6
                                    });
                                })), i.quickBtn.setValue(d), Object(R.a)({
                                    category: "append",
                                    subcategory: "101",
                                    event: "b"
                                });
                            } else _.debug("videoId is not found!");
                        });
                        _.debug("Btn not exists");
                    }).catch(e => {
                        "ABORTED" !== e.message && _.error("waitNodesBySelector error", e);
                    });
                },
                getIdFromLocation: function(e) {
                    e || (e = document.location.href);
                    var t = e.match(/\/watch\?(?:.+&)?v=([\w\-]+)/i);
                    return (t = t && t[1]) || null;
                },
                getIdFromBackgroundImageUrl(e) {
                    const [, t] = /https:\/\/i.ytimg.com\/vi\/(.*?)\//.exec(e);
                    return t || null;
                },
                getIdFromShortsLocation() {
                    const e = /shorts\/(.*?)$/.exec(location.href)[1];
                    return e || null;
                },
                appendNewMobileButton(e, t) {
                    const i = f.a.create("div", {
                        id: w.buttonId,
                        style: {
                            flex: "1 1",
                            minWidth: 0,
                            overflow: "hidden",
                            margin: "-0.7em -0.57em",
                            marginLeft: "0.7em",
                            marginRight: 0,
                            display: "flex"
                        },
                        append: [ f.a.create("button", {
                            style: {
                                padding: ".7em .57em"
                            },
                            append: [ f.a.create("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center"
                                },
                                append: [ f.a.create("div", {
                                    style: {
                                        display: "block",
                                        height: "24px",
                                        width: "24px",
                                        background: "url(" + n.svg.getSrc("download", "#757575") + ") center no-repeat",
                                        backgroundSize: "20px"
                                    }
                                }), f.a.create("div", {
                                    style: {
                                        marginTop: "7px",
                                        alignSelf: "center",
                                        minHeight: "1em",
                                        lineHeight: "1em"
                                    },
                                    text: o.a.i18n.getMessage("download")
                                }) ]
                            }) ],
                            on: [ "click", e => {
                                e.preventDefault(), w.hideMobileMenu();
                                const t = w.getIdFromLocation(), i = w.mobileMenu = n.mobileLightBox.show(o.a.i18n.getMessage("download") + " ...");
                                return Promise.resolve().then(() => w.responseCache[t] ? w.responseCache[t] : L(t, location.href)).then(e => {
                                    w.responseCache[t] = e;
                                    const o = n.popupMenu.prepareLinks.youtube(e.links, e.title || w.getTitleModify());
                                    _.log("lightbox update"), i.update(o);
                                }, e => {
                                    _.error("getLinks for mobile error", e), i.update(void 0);
                                });
                            } ]
                        }) ]
                    });
                    p.a.onRemoveEvent(i, (function() {
                        w.hideMobileMenu(), document.body.contains(e) && (e.dataset.sfSkip = "0", w.mobileMutationMode.observer.trigger(e));
                    })), e.appendChild(i);
                },
                appendMobileButton: function(e, t, i) {
                    var r = {};
                    3 === i ? Object.assign(r, {
                        display: "flex",
                        height: "24px",
                        background: "url(" + n.svg.getSrc("download", "#757575") + ") center no-repeat",
                        padding: ".7em .57em",
                        marginLeft: ".7em"
                    }) : 4 === i ? Object.assign(r, {
                        display: "flex",
                        width: "24px",
                        background: "url(" + n.svg.getSrc("download", "#eee") + ") center no-repeat",
                        padding: ".7em .57em",
                        marginLeft: ".7em"
                    }) : 1 === i ? Object.assign(r, {
                        display: "inline-block",
                        height: "28px",
                        width: "18px",
                        marginRight: "20px",
                        background: "url(" + n.svg.getSrc("download", "#757575") + ") center no-repeat",
                        cssFloat: "right"
                    }) : 2 === i && Object.assign(r, {
                        display: "inline-block",
                        height: "38px",
                        width: "18px",
                        marginRight: "12px",
                        background: "url(" + n.svg.getSrc("download", "#757575") + ") center no-repeat",
                        backgroundSize: "20px",
                        cssFloat: "right"
                    });
                    var a = f.a.create("div", {
                        data: {
                            id: e
                        },
                        style: r,
                        on: [ "click", function() {
                            var e = this.dataset.id || w.getIdFromLocation();
                            w.hideMobileMenu();
                            var t = w.mobileMenu = n.mobileLightBox.show(o.a.i18n.getMessage("download") + " ..."), i = function(e) {
                                var o = null;
                                e && e.links && (o = n.popupMenu.prepareLinks.youtube(e.links, e.title || w.getTitleModify())), 
                                t.update(o);
                            }, r = w.responseCache[e];
                            if (r) return i(r);
                            L(e, location.href).then(e => {
                                _.info("getLinks for mPlaylist"), i(e);
                            }, e => {
                                _.error("getLinks for mPlaylist error", e), i(void 0);
                            });
                        } ]
                    });
                    p.a.onRemoveEvent(a, (function() {
                        w.hideMobileMenu(), 3 !== i && 4 !== i || document.body.contains(t) && (t.dataset.sfSkip = "0", 
                        w.mobileMutationMode.observer.trigger(t));
                    }));
                    var s = 'div[id^="koya_child_"]:nth-child(1) > a[href="#"] > span[id^="koya_elem_"]', l = t.lastElementChild;
                    l.querySelector(s) || (l = l.previousElementSibling).querySelector(s) || (l = null), 
                    l && (l = l.nextElementSibling), l ? l.parentNode.insertBefore(a, l) : t.appendChild(a);
                },
                getNewButtonUnderVideo: function(e) {
                    var t = this;
                    const i = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
                    this.node = f.a.create("div", {
                        id: w.buttonId,
                        style: {
                            display: [ "-ms-flexbox", "-webkit-flex", "flex" ],
                            marginLeft: "8px",
                            MsFlexDirection: "row",
                            WebkitFlexDirection: "row",
                            flexDirection: "row",
                            MsFlexAlign: "center",
                            WebkitAlignItems: "center",
                            alignItems: "center",
                            MsFlexPack: "center",
                            WebkitJustifyContent: "center",
                            justifyContent: "center",
                            padding: "0 8px 0 0"
                        },
                        append: [ this.menuContainer = f.a.create("div", {
                            style: {
                                position: "relative"
                            }
                        }), this.quickBtn = f.a.create("a", {
                            class: "sf-quick-dl-btn",
                            on: [ [ "click", () => {
                                _.log("track click greenBtn"), o.a.sendMessage({
                                    action: "track",
                                    t: "event",
                                    tid: "UA-181742122-3",
                                    ec: "menu",
                                    el: "menu",
                                    ea: "download"
                                });
                            } ], [ "mouseover", e => {
                                if (i) {
                                    if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void Object(N.b)(this.quickBtn, {
                                        content: o.a.i18n.getMessage("downloadTitle"),
                                        defaultWidth: 400,
                                        defaultHeight: 60
                                    });
                                    Object(N.a)(this.quickBtn, {
                                        content: o.a.i18n.getMessage("downloadTitle"),
                                        defaultWidth: 400,
                                        defaultHeight: 60
                                    });
                                }
                            } ] ],
                            style: {
                                display: "inline-block",
                                fontSize: "inherit",
                                height: "22px",
                                border: "1px solid #00B75A",
                                borderRadius: "3px",
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                paddingLeft: "28px",
                                cursor: "pointer",
                                verticalAlign: "middle",
                                position: "relative",
                                lineHeight: "22px",
                                textDecoration: "none",
                                zIndex: 1,
                                color: "#fff"
                            },
                            href: "#",
                            append: [ f.a.create("i", {
                                style: {
                                    position: "absolute",
                                    display: "inline-block",
                                    left: "6px",
                                    top: "3px",
                                    backgroundImage: "url(" + n.svg.getSrc("download", "#ffffff") + ")",
                                    backgroundSize: "12px",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    width: "16px",
                                    height: "16px"
                                }
                            }), f.a.create("span", {
                                class: "sf-btn-name",
                                style: {
                                    paddingRight: "12px"
                                },
                                text: o.a.i18n.getMessage("download")
                            }) ]
                        }), this.quickBtnStyle = f.a.create("style", {
                            text: Object(d.a)({
                                selector: "#" + w.buttonId,
                                style: {
                                    fontFamily: "Roboto, Arial, sans-serif",
                                    fontSize: "13px"
                                },
                                append: [ {
                                    "button::-moz-focus-inner": {
                                        padding: 0,
                                        margin: 0
                                    },
                                    ".sf-quick-dl-btn": {
                                        backgroundColor: "#00B75A"
                                    },
                                    ".sf-quick-dl-btn:hover": {
                                        backgroundColor: "rgb(0, 163, 80)"
                                    },
                                    ".sf-quick-dl-btn:active": {
                                        backgroundColor: "rgb(0, 151, 74)"
                                    }
                                }, {
                                    media: "@media screen and (max-width: 1293px), screen and (max-height: 768px)",
                                    append: {
                                        ".sf-quick-dl-btn .sf-btn-name": {
                                            display: "none"
                                        }
                                    }
                                } ]
                            })
                        }), this.selectBtn = f.a.create("button", {
                            style: {
                                position: "relative",
                                display: "inline-block",
                                marginLeft: "-2px",
                                fontSize: "inherit",
                                height: "24px",
                                paddingRight: "21px",
                                backgroundColor: "#F8F8F8",
                                border: "1px solid #CCCCCC",
                                borderRadius: "3px",
                                borderTopLeftRadius: "0",
                                borderBottomLeftRadius: "0",
                                cursor: "pointer",
                                color: "#9B9B9B",
                                zIndex: 0,
                                verticalAlign: "middle",
                                boxSizing: "border-box",
                                lineHeight: o.a.isSafari ? "21px" : "22px"
                            },
                            on: [ "mousedown", function(n) {
                                return e.call(this, {
                                    btnObj: t
                                }, n);
                            } ],
                            append: [ this.selectBtnIcon = f.a.create("i", {
                                style: {
                                    position: "absolute",
                                    display: "inline-block",
                                    top: "9px",
                                    right: "6px",
                                    border: "5px solid #868282",
                                    borderBottomColor: "transparent",
                                    borderLeftColor: "transparent",
                                    borderRightColor: "transparent"
                                }
                            }) ]
                        }) ]
                    }), this.node.classList.add(p.a.onRemoveClassName);
                    var r = function(e) {
                        var n = "object" == typeof e ? e : document.createTextNode(e);
                        n.style.marginLeft = 0;
                        var o = t.selectBtn.firstChild;
                        o === t.selectBtnIcon ? t.selectBtn.insertBefore(n, o) : t.selectBtn.replaceChild(n, o);
                    };
                    this.setQuality = r, this.setLoadingState = function() {
                        r(f.a.create("img", {
                            src: n.svg.getSrc("info", "#333333"),
                            style: {
                                width: "14px",
                                height: "14px",
                                marginLeft: "6px",
                                verticalAlign: "middle",
                                top: o.a.isSafari ? "-3px" : "-1px",
                                position: "relative"
                            }
                        }));
                    };
                },
                getButtonUnderVideo: function(e) {
                    var t, i, r = null, a = f.a.create("div", {
                        id: w.buttonId,
                        style: {
                            display: "inline-block",
                            marginLeft: "10px",
                            verticalAlign: "middle"
                        },
                        append: [ i = f.a.create("a", {
                            class: "sf-quick-dl-btn",
                            style: {
                                display: "inline-block",
                                fontSize: "inherit",
                                height: "22px",
                                border: "1px solid #00B75A",
                                borderRadius: "3px",
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                paddingLeft: "28px",
                                cursor: "pointer",
                                verticalAlign: "middle",
                                position: "relative",
                                lineHeight: "22px",
                                textDecoration: "none",
                                zIndex: 1,
                                color: "#fff"
                            },
                            href: "#",
                            append: [ f.a.create("i", {
                                style: {
                                    position: "absolute",
                                    display: "inline-block",
                                    left: "6px",
                                    top: "3px",
                                    backgroundImage: "url(" + n.svg.getSrc("download", "#ffffff") + ")",
                                    backgroundSize: "12px",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    width: "16px",
                                    height: "16px"
                                }
                            }), f.a.create("span", {
                                class: "sf-btn-name",
                                style: {
                                    paddingRight: "12px"
                                },
                                text: o.a.i18n.getMessage("download")
                            }) ]
                        }), f.a.create("style", {
                            text: Object(d.a)({
                                selector: "#" + w.buttonId,
                                append: [ {
                                    "button::-moz-focus-inner": {
                                        padding: 0,
                                        margin: 0
                                    },
                                    ".sf-quick-dl-btn": {
                                        backgroundColor: "#00B75A"
                                    },
                                    ".sf-quick-dl-btn:hover": {
                                        backgroundColor: "rgb(0, 163, 80)"
                                    },
                                    ".sf-quick-dl-btn:active": {
                                        backgroundColor: "rgb(0, 151, 74)"
                                    }
                                }, {
                                    media: "@media screen and (max-width: 1293px)",
                                    append: {
                                        ".sf-quick-dl-btn .sf-btn-name": {
                                            display: "none"
                                        }
                                    }
                                } ]
                            })
                        }), r = f.a.create("button", {
                            style: {
                                position: "relative",
                                display: "inline-block",
                                marginLeft: "-2px",
                                fontSize: "inherit",
                                height: "24px",
                                paddingRight: "21px",
                                backgroundColor: "#F8F8F8",
                                border: "1px solid #CCCCCC",
                                borderRadius: "3px",
                                borderTopLeftRadius: "0",
                                borderBottomLeftRadius: "0",
                                cursor: "pointer",
                                color: "#9B9B9B",
                                zIndex: 0,
                                verticalAlign: "middle",
                                boxSizing: "border-box",
                                lineHeight: "22px"
                            },
                            on: [ "mousedown", e ],
                            append: [ t = f.a.create("i", {
                                style: {
                                    position: "absolute",
                                    display: "inline-block",
                                    top: "9px",
                                    right: "6px",
                                    border: "5px solid #868282",
                                    borderBottomColor: "transparent",
                                    borderLeftColor: "transparent",
                                    borderRightColor: "transparent"
                                }
                            }) ]
                        }) ]
                    });
                    a.classList.add(p.a.onRemoveClassName);
                    var s = function(e) {
                        var n = "object" == typeof e ? e : document.createTextNode(e), o = r.firstChild;
                        o === t ? r.insertBefore(n, o) : r.replaceChild(n, o);
                    };
                    return {
                        node: a,
                        selectBtn: r,
                        quickBtn: i,
                        setQuality: s,
                        setLoadingState: function() {
                            s(f.a.create("img", {
                                src: n.svg.getSrc("info", "#333333"),
                                style: {
                                    width: "14px",
                                    height: "14px",
                                    marginLeft: "6px",
                                    verticalAlign: "middle",
                                    top: "-1px",
                                    position: "relative"
                                }
                            }));
                        }
                    };
                },
                getShortButton: function(e) {
                    var t = this;
                    const i = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
                    this.node = f.a.create("div", {
                        id: w.buttonId,
                        style: {
                            display: [ "-ms-flexbox", "-webkit-flex", "flex" ],
                            marginLeft: "8px",
                            MsFlexDirection: "column",
                            WebkitFlexDirection: "column",
                            flexDirection: "column",
                            MsFlexAlign: "center",
                            WebkitAlignItems: "center",
                            alignItems: "center",
                            MsFlexPack: "center",
                            WebkitJustifyContent: "center",
                            justifyContent: "center",
                            padding: "0 8px 0 0",
                            marginTop: "16px"
                        },
                        append: [ this.menuContainer = f.a.create("div", {
                            style: {
                                position: "relative"
                            }
                        }), this.quickBtn = f.a.create("a", {
                            class: "sf-quick-dl-btn",
                            on: [ [ "click", () => {
                                _.log("track click greenBtn"), o.a.sendMessage({
                                    action: "track",
                                    t: "event",
                                    tid: "UA-181742122-3",
                                    ec: "menu",
                                    el: "menu",
                                    ea: "download"
                                });
                            } ], [ "mouseover", e => {
                                if (i) {
                                    if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void Object(N.b)(this.quickBtn, {
                                        content: o.a.i18n.getMessage("downloadTitle"),
                                        defaultWidth: 400,
                                        defaultHeight: 60
                                    });
                                    Object(N.a)(this.quickBtn, {
                                        content: o.a.i18n.getMessage("downloadTitle"),
                                        defaultWidth: 400,
                                        defaultHeight: 60
                                    });
                                }
                            } ] ],
                            style: {
                                display: "inline-block",
                                fontSize: "inherit",
                                height: "22px",
                                border: "1px solid #606060",
                                borderRadius: "3px",
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                paddingLeft: "28px",
                                marginBottom: "10px",
                                cursor: "pointer",
                                verticalAlign: "middle",
                                position: "relative",
                                lineHeight: "22px",
                                textDecoration: "none",
                                zIndex: 1,
                                color: "#fff"
                            },
                            href: "#",
                            append: [ f.a.create("i", {
                                style: {
                                    position: "absolute",
                                    display: "inline-block",
                                    left: "6px",
                                    top: "3px",
                                    backgroundImage: "url(" + n.svg.getSrc("download", "#ffffff") + ")",
                                    backgroundSize: "12px",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    width: "16px",
                                    height: "16px"
                                }
                            }) ]
                        }), this.quickBtnStyle = f.a.create("style", {
                            text: Object(d.a)({
                                selector: "#" + w.buttonId,
                                style: {
                                    fontFamily: "Roboto, Arial, sans-serif",
                                    fontSize: "13px"
                                },
                                append: [ {
                                    "button::-moz-focus-inner": {
                                        padding: 0,
                                        margin: 0
                                    },
                                    ".sf-quick-dl-btn": {
                                        border: "1px solid #606060",
                                        backgroundColor: "#606060"
                                    },
                                    ".sf-quick-dl-btn:hover": {
                                        border: "1px solid #00B75A",
                                        backgroundColor: "#00B75A"
                                    },
                                    ".sf-quick-dl-btn:active": {
                                        backgroundColor: "rgb(0, 151, 74)"
                                    }
                                } ]
                            })
                        }), this.selectBtn = f.a.create("button", {
                            style: {
                                position: "relative",
                                display: "inline-block",
                                marginLeft: "-2px",
                                fontSize: "inherit",
                                height: "24px",
                                paddingRight: "21px",
                                backgroundColor: "#F8F8F8",
                                border: "1px solid #CCCCCC",
                                borderRadius: "3px",
                                borderTopLeftRadius: "0",
                                borderBottomLeftRadius: "0",
                                cursor: "pointer",
                                color: "#9B9B9B",
                                zIndex: 0,
                                verticalAlign: "middle",
                                boxSizing: "border-box",
                                lineHeight: o.a.isSafari ? "21px" : "22px"
                            },
                            on: [ "mousedown", function(n) {
                                return e.call(this, {
                                    btnObj: t
                                }, n);
                            } ],
                            append: [ this.selectBtnIcon = f.a.create("i", {
                                style: {
                                    position: "absolute",
                                    display: "inline-block",
                                    top: "9px",
                                    right: "6px",
                                    border: "5px solid #868282",
                                    borderBottomColor: "transparent",
                                    borderLeftColor: "transparent",
                                    borderRightColor: "transparent"
                                }
                            }) ]
                        }) ]
                    }), this.node.classList.add(p.a.onRemoveClassName);
                    var r = function(e) {
                        var n = "object" == typeof e ? e : document.createTextNode(e);
                        n.style.marginLeft = 0;
                        var o = t.selectBtn.firstChild;
                        o === t.selectBtnIcon ? t.selectBtn.insertBefore(n, o) : t.selectBtn.replaceChild(n, o);
                    };
                    this.setQuality = r, this.setLoadingState = function() {
                        r(f.a.create("img", {
                            src: n.svg.getSrc("info", "#333333"),
                            style: {
                                width: "14px",
                                height: "14px",
                                marginLeft: "6px",
                                verticalAlign: "middle",
                                top: o.a.isSafari ? "-3px" : "-1px",
                                position: "relative"
                            }
                        }));
                    };
                },
                titleChangeObserver: null,
                playerStateChangeObserver: null,
                observeFrameVideoChange: function(e) {
                    var t = this;
                    if (v.a.isAvailable()) {
                        var n = document.querySelector(".ytp-title-link");
                        n && (this.titleChangeObserver && this.titleChangeObserver.stop(), this.titleChangeObserver = new m.a({
                            attrs: [ {
                                name: "href",
                                callback: function(n) {
                                    var o = n.oldValue && w.getIdFromLocation(n.oldValue), i = n.value && w.getIdFromLocation(n.value);
                                    o !== i && w.video_id !== i && (w.video_id = i, w.frameQualityDetected && (e.link = null, 
                                    e.setLoadingState(), t.quickBtn.setValue(e)));
                                }
                            } ],
                            target: n
                        }));
                        var o = document.querySelector(".html5-video-player");
                        if (o) {
                            var i = null, r = /(\s|^)ytp-autohide(\s|$)/;
                            this.playerStateChangeObserver && this.playerStateChangeObserver.stop(), this.playerStateChangeObserver = new m.a({
                                attrs: [ {
                                    name: "class",
                                    callback(t) {
                                        const n = r.test(t.oldValue), o = r.test(t.value);
                                        !n && o ? (clearTimeout(i), i = setTimeout((function() {
                                            e.lockHide || e.container.classList.add("sf-hide-ui");
                                        }), 100)) : n && !o && (clearTimeout(i), e.container.classList.remove("sf-hide-ui"));
                                    }
                                } ],
                                target: o
                            });
                        }
                    }
                },
                appendFrameButton: function() {
                    if (!(document.body.clientWidth < 220 || document.body.clientHeight < 150)) {
                        var e = w, t = !0, i = n.frameMenu.getBtn({
                            btnId: "sfYtFrameBtn",
                            containerStyle: {
                                top: "40px",
                                right: "20px"
                            },
                            on: [ [ "mousedown", function(t) {
                                t.stopPropagation(), 2 === t.button && (e.onFrameMouseEnterBind && (p.a.off(document.body, "mouseenter", e.onFrameMouseEnterBind), 
                                p.a.off(document.body, "mouseleave", e.onFrameMouseLeaveBind), e.onFrameMouseEnterBind = null, 
                                e.onFrameMouseLeaveBind = null), e.titleChangeObserver && (e.titleChangeObserver.stop(), 
                                e.titleChangeObserver = null), e.playerStateChangeObserver && (e.playerStateChangeObserver.stop(), 
                                e.playerStateChangeObserver = null), e.hideCurrentMenu(), i.container.parentNode && i.container.parentNode.removeChild(i.container));
                            } ] ],
                            onSelectBtn: [ "mousedown", function(r) {
                                if (!(r.button > 0)) {
                                    r.stopPropagation(), r.preventDefault();
                                    var a = e.video_id;
                                    if (e.currentMenu) w.hideCurrentMenu(); else {
                                        var s = e.currentMenu = n.frameMenu.getMenu(this.parentNode, o.a.i18n.getMessage("download") + " ...", "sf-popupMenu", {
                                            container: i.container,
                                            onShow: function() {
                                                i.node.classList.add("sf-over"), t || (t = !1);
                                            },
                                            onHide: function() {
                                                e.currentMenu = null, i.node.classList.remove("sf-over");
                                            },
                                            onItemClick: function(t, n) {
                                                var r = n.itag;
                                                i.lastItag !== r && o.a.storage.set({
                                                    ytLastITag: r
                                                }, (function() {
                                                    e.quickBtn.setValue(i);
                                                })), w.onMenuItemClick(n, {
                                                    isFrameItem: 1,
                                                    videoId: a
                                                });
                                            }
                                        }), l = function(e) {
                                            var t = n.popupMenu.prepareLinks.youtube(e.links, e.title, e.subtitles, {
                                                ummyVid: 136
                                            });
                                            s.update(t);
                                        }, d = e.responseCache[a];
                                        if (d) return l(d);
                                        L(a, location.href, {
                                            checkSubtitles: !0
                                        }).then(t => {
                                            e.responseCache[a] = t, _.log("Links for frame received"), l(t);
                                        }, e => {
                                            _.error("Get links for frame error", e), s.update(o.a.i18n.getMessage("noLinksFound"));
                                        });
                                    }
                                }
                            } ]
                        });
                        i.setLoadingState(), i.container = f.a.create("div", {
                            class: "sf-btn-ctr",
                            append: i.node
                        }), document.body.appendChild(i.container);
                        p.a.on(i.node, "mouseenter", (function t() {
                            p.a.off(i.node, "mouseenter", t), e.frameQualityDetected || (e.frameQualityDetected = !0, 
                            e.quickBtn.setValue(i));
                        })), p.a.one(document, "mouseenter", (function() {
                            e.onFrameMouseEnter(i);
                        })), p.a.on(i.container, "mouseenter", (function() {
                            i.lockHide = !0;
                        })), p.a.on(i.container, "mouseleave", (function() {
                            i.lockHide = !1;
                        })), i.node.appendChild(f.a.create("style", {
                            text: Object(d.a)([ {
                                selector: [ "body:hover .sf-btn-ctr:not(.sf-hide-ui) #sfYtFrameBtn", "body:hover .sf-btn-ctr:not(.sf-hide-ui) .sf-popupMenu" ],
                                style: {
                                    display: "block"
                                }
                            } ])
                        })), this.onFrameMouseEnterBind && (p.a.off(document.body, "mouseenter", this.onFrameMouseEnterBind), 
                        p.a.off(document.body, "mouseleave", this.onFrameMouseLeaveBind)), this.onFrameMouseEnterBind = this.onFrameMouseEnter.bind(this, i), 
                        this.onFrameMouseLeaveBind = this.onFrameMouseLeave.bind(this, i), p.a.on(document.body, "mouseenter", this.onFrameMouseEnterBind), 
                        p.a.on(document.body, "mouseleave", this.onFrameMouseLeaveBind), this.observeFrameVideoChange(i);
                    }
                },
                frameQualityDetected: !1,
                frameQualityTimer: null,
                onFrameMouseEnterBind: null,
                onFrameMouseLeaveBind: null,
                onFrameMouseEnter: function(e) {
                    var t = this;
                    this.frameQualityDetected || (clearTimeout(this.frameQualityTimer), this.frameQualityTimer = setTimeout((function() {
                        t.frameQualityDetected || (t.frameQualityDetected = !0, t.quickBtn.setValue(e));
                    }), 500));
                },
                onFrameMouseLeave: function(e) {
                    this.frameQualityDetected || clearTimeout(this.frameQualityTimer);
                },
                getTitle: function() {
                    var e = document.getElementById("watch-headline-title");
                    if (e) return e.textContent;
                    for (var t = document.getElementsByTagName("meta"), n = 0; n < t.length; n++) {
                        var o = t[n].getAttribute("name");
                        if (o && "title" == o.toLowerCase()) return t[n].getAttribute("content");
                    }
                    return x || w.isMobile ? document.title.replace(/ - YouTube$/, "") : "";
                },
                getTitleModify: function() {
                    var e = w.getTitle();
                    return e && (e = S(e)), e;
                },
                onMenuItemClick: function(e, t) {
                    t = t || {}, e.format || o.a.sendMessage({
                        action: "track",
                        t: "event",
                        ec: "youtube",
                        ea: "new_format",
                        el: e.itag + " " + t.videoId
                    });
                },
                onDlBtnClick: function(e, t, o) {
                    if (o = o || {}, !t) return e.preventDefault(), e.stopPropagation(), void p.a.trigger(this.parentNode.lastChild, "mousedown");
                    w.onMenuItemClick(t, o), "ummy" !== t.quality && "muxer" !== t.itag && t.forceDownload && n.downloadOnClick(e);
                },
                quickBtn: {
                    prepMenuLinks: function(e, t) {
                        for (var o, i = n.popupMenu.prepareLinks.youtube(e, t), r = [], a = 0; o = i[a]; a++) r.push({
                            prop: o
                        });
                        return {
                            menuLinks: i = n.popupMenu.sortMenuItems(r)
                        };
                    },
                    setValueInSelectBtn: function(e, t) {
                        "object" != typeof t && (t = document.createTextNode(t));
                        var n = e.selectBtn.firstChild;
                        n === e.selectBtn.lastChild ? e.selectBtn.insertBefore(t, n) : e.selectBtn.replaceChild(t, n);
                    },
                    getBestItem: e => o.a.callFn("auth.isAuth").then(t => {
                        const n = e.find(e => {
                            const n = e.prop.noAudio || e.prop.noVideo;
                            return !("pro" === e.prop.itag && !t) && !n && "televzr" !== e.prop.itag && !e.prop.isHidden;
                        });
                        return n ? n.prop : void 0;
                    }),
                    bindDlBtn: function(e) {
                        var t = e.quickBtn;
                        e.quickBtnEvent && t.removeEventListener("click", e.quickBtnEvent), t.addEventListener("click", e.quickBtnEvent = function(t) {
                            e.link.func && e.link.func(t), t.stopPropagation(), e.link && w.currentMenu && w.hideCurrentMenu();
                            const n = {
                                videoId: e.videoId || w.video_id,
                                links: e.links
                            };
                            e.isPage ? n.isPage = 1 : n.isFrame = 1, w.onDlBtnClick.call(this, t, e.link, n);
                        });
                    },
                    setBestValue: function(e, t) {
                        var n = e.quickBtn;
                        e.link = t;
                        var i = t.quality;
                        if ("pro" === t.itag) {
                            i = {
                                2160: "4K",
                                4320: "8K",
                                hls: "HLS",
                                1440: "QHD"
                            }[t.quality] || t.quality;
                        } else t.noVideo || (i = parseInt(i));
                        t["3d"] && (i = "3D " + i), t.sFps && (i += " " + (t.fps || 60));
                        var r = f.a.create("span", {
                            text: i,
                            style: {
                                marginLeft: "6px",
                                verticalAlign: "bottom"
                            }
                        });
                        e.setQuality ? e.setQuality(r) : this.setValueInSelectBtn(e, r);
                        var a = [ t.format, i ];
                        if (t.noAudio && a.push(o.a.i18n.getMessage("withoutAudio")), a = a.join(" "), n.title = a, 
                        n.href = t.href, t.title && t.format) {
                            var s = (t.ext || t.format || "").toLowerCase();
                            s && (s = "." + s), n.setAttribute("download", g.a.modify(t.title + s));
                        }
                    },
                    onGetLinks: function(e, t, n) {
                        var i = this;
                        if (t) {
                            var r = Object.keys(t).length;
                            t.meta && r--;
                        }
                        if (!t || !r) return this.setValueInSelectBtn(e, "");
                        o.a.storage.get("ytLastITag", (function(o) {
                            var r = o.ytLastITag;
                            e.lastItag = r;
                            var a = i.prepMenuLinks(t, n || w.getTitleModify());
                            e.onGetLinksArr && e.onGetLinksArr.forEach((function(e) {
                                return e(a.menuLinks);
                            })), i.getBestItem(a.menuLinks).then(t => {
                                t ? i.setBestValue(e, t) : i.setValueInSelectBtn(e, "");
                            });
                        }));
                    },
                    setValue: function(e) {
                        var t = this;
                        this.bindDlBtn(e);
                        var n = e.videoId || w.video_id;
                        if (!n) return this.onGetLinks(e);
                        var i = w.responseCache[n];
                        if (i) return this.onGetLinks(e, i.links, i.title), void (i = null);
                        var r = function(n) {
                            return (n = n || {}).isQuick && (e.quickBtn.dataset.isQuick = "1"), e.links = n.links, 
                            t.onGetLinks(e, n.links, n.title);
                        };
                        e.ytConfig ? o.a.sendMessage({
                            action: "getYoutubeLinksFromConfig",
                            extVideoId: n,
                            url: location.href,
                            noDash: !0,
                            config: e.ytConfig
                        }, r) : L(n, location.href, {
                            noDash: !0
                        }).then(r, e => {
                            _.error("get links quickBtnDownload", e);
                        });
                    }
                },
                videoFeed: {
                    style: null,
                    hrefIdPattern: /[\?&]v=([^&]+)/,
                    shortsPattern: /\/shorts\/([\w-]+)(?:\?|$)/,
                    imgIdPattern: /vi[^\/]*\/([^\/]+)/,
                    rList: [ /\/playlist\?/, /(user|channel|c|show)\/[^\/]+(\/feed|\/featured|\/videos|$)/i, /\/(feed)\/(trending|subscriptions|history)/i ],
                    testUrl: function(e) {
                        return this.rList.some((function(t) {
                            return t.test(e);
                        }));
                    },
                    injectStyle: function() {
                        this.style ? !this.style.parentNode && document.head.appendChild(this.style) : (this.style = f.a.create("style", {
                            class: "sf-feed-style",
                            text: Object(d.a)([ {
                                selector: [ ".contains-percent-duration-watched .sf-feed-btn" ],
                                style: {
                                    bottom: "6px"
                                }
                            }, {
                                selector: [ "a > .sf-feed-btn", "div > .sf-feed-btn", "span > .sf-feed-btn" ],
                                style: {
                                    display: "none",
                                    border: "1px solid #d3d3d3",
                                    width: "20px",
                                    height: "20px",
                                    padding: 0,
                                    position: "absolute",
                                    right: "26px",
                                    bottom: "2px",
                                    borderRadius: "2px",
                                    background: "url(" + n.svg.getSrc("download", "#777777") + ") center no-repeat #F8F8F8",
                                    backgroundSize: "12px",
                                    cursor: "pointer"
                                }
                            }, {
                                selector: [ "a > .sf-feed-btn.style-2" ],
                                style: {
                                    border: 0,
                                    top: 0,
                                    left: 0,
                                    margin: "4px",
                                    padding: "2px 4px",
                                    background: "url(" + n.svg.getSrc("download", "#FFF") + ") center no-repeat #000",
                                    backgroundSize: "14px",
                                    opacity: ".8"
                                }
                            }, {
                                selector: [ "a > .sf-feed-btn:hover", "div > .sf-feed-btn:hover", "span > .sf-feed-btn:hover" ],
                                style: {
                                    background: "url(" + n.svg.getSrc("download", "#00B75A") + ") center no-repeat #F8F8F8",
                                    backgroundSize: "12px"
                                }
                            }, {
                                selector: [ "a > .sf-feed-btn.style-2:hover" ],
                                style: {
                                    border: 0,
                                    top: 0,
                                    left: 0,
                                    margin: "4px",
                                    padding: "2px 4px",
                                    background: "url(" + n.svg.getSrc("download", "#00B75A") + ") center no-repeat #000",
                                    backgroundSize: "14px",
                                    opacity: ".8"
                                }
                            }, {
                                selector: [ "a > .sf-feed-btn:active", "div > .sf-feed-btn:active", "span > .sf-feed-btn:active" ],
                                style: {
                                    outline: 0,
                                    boxShadow: "inset 0 3px 5px rgba(0, 0, 0, 0.125)"
                                }
                            }, {
                                selector: [ "a:hover > .sf-feed-btn", "div:hover > .sf-feed-btn", "span:hover > .sf-feed-btn" ],
                                style: {
                                    display: "block"
                                }
                            }, {
                                selector: [ "ytd-menu-renderer.style-scope.ytd-watch-metadata" ],
                                style: {
                                    overflowY: "visible !important"
                                }
                            } ])
                        }), document.head.appendChild(this.style));
                    },
                    rmBtn: function() {
                        for (var e, t = document.querySelectorAll(".sf-feed-btn"), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                        [ "sfBtn", "sfSkip" ].forEach((function(o) {
                            var i = Object(l.a)(o);
                            for (t = document.querySelectorAll("[" + i + "]"), n = 0; e = t[n]; n++) e.removeAttribute(i);
                        }));
                    },
                    getBtnNode: function(e, t) {
                        var i = [ "sf-feed-btn" ];
                        return t && i.push("style-" + t), f.a.create("i", {
                            class: i,
                            on: [ "click", function(t) {
                                t.preventDefault(), t.stopPropagation();
                                var i = this;
                                if (w.currentMenu && w.currentMenu.isShow) w.hideCurrentMenu(); else {
                                    var r = e, a = i.parentNode;
                                    if (a && "A" === a.tagName && "thumbnail" === a.id) {
                                        var s = w.videoFeed.hrefIdPattern.exec(a.href);
                                        s && (r = s[1]);
                                    }
                                    var l = document.querySelector("#home-page-skeleton.hidden"), d = w.currentMenu = n.popupMenu.quickInsert(i, o.a.i18n.getMessage("download") + " ...", "sf-popupMenu", {
                                        offsetTop: l ? 54 : 0,
                                        onShow: function() {
                                            p.a.onRemoveEvent(i, w.hideCurrentMenu);
                                        },
                                        onHide: function() {
                                            p.a.offRemoveEvent(i, w.hideCurrentMenu);
                                        },
                                        onItemClick: function(e, t) {
                                            w.onMenuItemClick(t, {
                                                isFeedItem: 1,
                                                videoId: r
                                            });
                                        }
                                    });
                                    L(r, location.href, {
                                        checkSubtitles: !0
                                    }).then(e => {
                                        _.log("get links for videoFeed");
                                        const t = n.popupMenu.prepareLinks.youtube(e.links, e.title, e.subtitles);
                                        d.update(t);
                                    }).catch(e => {
                                        _.error("get links for videoFeed err", e), d.update(o.a.i18n.getMessage("noLinksFound"));
                                    });
                                }
                            } ]
                        });
                    }
                },
                downloadPlaylist: function() {
                    const e = e => {
                        const t = [], n = e.querySelectorAll("ytd-browse:not([hidden]) #contents img[src]#img"), o = w.videoFeed.imgIdPattern;
                        for (let e, i = 0; e = n[i]; i++) {
                            const n = e.src.match(o);
                            n && (-1 === t.indexOf(n[1]) && t.push(n[1]));
                        }
                        const i = e.querySelectorAll("*[data-video-id]");
                        for (let e, n = 0; e = i[n]; n++) {
                            const n = e.dataset.videoId;
                            -1 === t.indexOf(n) && t.push(n);
                        }
                        return t;
                    };
                    const t = (e, t, o, i) => {
                        var r = !1, a = {}, s = 0, l = 0, d = e.length, c = void 0;
                        "audio" === t ? (c = [ "audio" ], t = void 0) : (c = [ "video" ], t = parseInt(t) || void 0);
                        var u = function u() {
                            if (!r) {
                                var p = e[s];
                                if (void 0 === p) return 0 === l ? i(a) : void 0;
                                s++, l++, ((e, t, o, i) => {
                                    const r = -1 !== o.indexOf("audio");
                                    L(e, location.href, {
                                        noDash: r
                                    }).then(e => {
                                        let r = n.popupMenu.prepareLinks.youtube(e.links, e.title);
                                        r = n.popupMenu.sortMenuItems(r, {
                                            noProp: !0,
                                            maxSize: t,
                                            minSize: 2,
                                            typeList: o
                                        }), i(r);
                                    }).catch(e => {
                                        _.error("Get yt links for playlist error", e), i(void 0);
                                    });
                                })(p, t, c, (function(e) {
                                    e && (e = e.filter(e => ![ "televzr", "ummy", "pro", "muxer" ].includes(e.itag)));
                                    var t = e ? e[0] : void 0;
                                    if (t) {
                                        var n = (t.ext || t.format || "").toLowerCase();
                                        n && (n = "." + n);
                                        var i = g.a.modify(t.title + n);
                                        a[p] = {
                                            url: t.href,
                                            title: t.title,
                                            filename: i
                                        };
                                    }
                                    o(s, d), l--, u();
                                }));
                            }
                        };
                        return u(), u(), {
                            abort: function() {
                                r = !0;
                            }
                        };
                    };
                    return function() {
                        var i = !1, r = void 0, a = function(e) {
                            var t, i, r, a, s, l = n.playlist.getInfoPopupTemplate();
                            o.a.sendMessage({
                                action: "getWarningIcon",
                                type: "playlist",
                                color: "#77D1FA"
                            }, (function(e) {
                                l.icon.style.backgroundImage = "url(" + e + ")";
                            })), f.a.create(l.textContainer, {
                                append: [ f.a.create("p", {
                                    text: o.a.i18n.getMessage("playlist"),
                                    style: {
                                        color: "#0D0D0D",
                                        fontSize: "20px",
                                        marginBottom: "11px",
                                        marginTop: "13px"
                                    }
                                }), i = f.a.create("div", {
                                    append: [ f.a.create("p", {
                                        text: o.a.i18n.getMessage("quality") + ":",
                                        style: {
                                            color: "#000000",
                                            fontSize: "14px",
                                            marginBottom: "13px",
                                            lineHeight: "24px"
                                        },
                                        append: [ r = f.a.create("select", {
                                            style: {
                                                width: "75px",
                                                marginLeft: "5px"
                                            },
                                            append: [ "720", "480", "360", "240", "Audio" ].map(e => f.a.create("option", {
                                                text: e,
                                                value: e.toLowerCase()
                                            }))
                                        }) ]
                                    }), f.a.create("p", {
                                        text: o.a.i18n.getMessage("qualityNote"),
                                        style: {
                                            color: "#868686",
                                            fontSize: "14px",
                                            lineHeight: "24px"
                                        }
                                    }) ]
                                }), t = f.a.create("p", {
                                    text: "",
                                    style: {
                                        color: "#868686",
                                        fontSize: "14px",
                                        lineHeight: "24px"
                                    }
                                }) ]
                            }), f.a.create(l.buttonContainer, {
                                append: [ s = f.a.create("button", {
                                    text: o.a.i18n.getMessage("cancel"),
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
                                }), a = f.a.create("button", {
                                    text: o.a.i18n.getMessage("continue"),
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
                            });
                            var d = n.popupDiv(l.body, "pl_progress_popup", void 0, void 0, e);
                            return {
                                qualitySelect: function(e) {
                                    t.style.display = "none", l.buttonContainer.style.display = "block", i.style.display = "block", 
                                    a.addEventListener("click", (function() {
                                        e(r.value);
                                    })), s.addEventListener("click", (function() {
                                        p.a.trigger(d, "kill");
                                    }));
                                },
                                onPrepare: function(e) {
                                    t.style.display = "block", l.buttonContainer.style.display = "none", i.style.display = "none", 
                                    t.textContent = e;
                                },
                                onProgress: function(e, n) {
                                    t.textContent = o.a.i18n.getMessage("vkFoundFiles").replace("%d", e) + " " + o.a.i18n.getMessage("vkFoundOf") + " " + n;
                                },
                                onReady: function(e, t) {
                                    p.a.trigger(d, "kill"), b ? n.downloadList.showBeforeDownloadPopup(e, {
                                        type: "playlist",
                                        folderName: t
                                    }) : n.playlist.popupPlaylist(e, t, !0, void 0, "video");
                                },
                                onError: function(e) {
                                    o.a.sendMessage({
                                        action: "getWarningIcon",
                                        type: "playlist",
                                        color: "#AAAAAA"
                                    }, (function(e) {
                                        l.icon.style.backgroundImage = "url(" + e + ")";
                                    })), t.style.display = "block", l.buttonContainer.style.display = "none", i.style.display = "none", 
                                    t.textContent = e;
                                }
                            };
                        }((function() {
                            i = !0, r && r.abort();
                        }));
                        a.qualitySelect((function(n) {
                            a.onPrepare(o.a.i18n.getMessage("download") + " ..."), function(t) {
                                var n = document, i = Object(s.a)(location.href);
                                if (i.list) o.a.sendMessage({
                                    action: "getYoutubeIdListFromPlaylist",
                                    listId: i.list,
                                    baseUrl: location.protocol + "//" + location.host
                                }, (function(n) {
                                    if (!n) return t();
                                    if (!n.idList || 0 === n.idList.length) {
                                        var o = document.querySelector(".playlist-videos-container > .playlist-videos-list");
                                        if (null !== o && (n.idList = e(o)), !n.title) {
                                            var i = document.querySelector(".playlist-info > .playlist-title");
                                            null !== i && (n.title = i.textContent.replace(/\r?\n/g, " ").trim());
                                        }
                                    }
                                    t(n.idList, n.title);
                                })); else {
                                    var r = e(n);
                                    t(r, w.getTitle());
                                }
                            }((function(e, r) {
                                if (i) return;
                                if (!e || 0 === e.length) return void a.onError(o.a.i18n.getMessage("noLinksFound"));
                                const s = (e, n, o) => new Promise(i => t(e, n, o, i));
                                s(e, n, a.onProgress).then(t => 0 === Object.keys(t).length ? s(e, 720, a.onProgress) : t).then(e => {
                                    const t = [];
                                    for (var n in e) t.push(e[n]);
                                    var o = g.a.modify(r);
                                    a.onReady(t, o);
                                });
                            }));
                        }));
                    };
                }()
            };
            w.tutorial = {
                show: function(e) {
                    if (this.hide(), r.onceShowYtTooltip) {
                        e.onClose = function() {
                            t && t.stop(), o.a.sendMessage({
                                action: "updateOption",
                                key: "onceShowYtTooltip",
                                value: r.onceShowYtTooltip = 0
                            });
                        }, w.currentTutorial = new n.TutorialTooltip(e);
                        var t = null, i = document.querySelector("#page.watch");
                        i && (t = w.currentTutorial.attrWatcher = new m.a({
                            attrs: [ {
                                name: "class",
                                callback() {
                                    const {currentTutorial: e} = w;
                                    e && e.tooltipNode.parentNode ? e.onResize() : t.stop();
                                }
                            } ],
                            target: i
                        }));
                    }
                },
                hide: function() {
                    var e = w.currentTutorial;
                    e && (e.onClose && e.onClose(1), e.attrWatcher && e.attrWatcher.stop(), w.currentTutorial = null);
                }
            };
            var S = function(e) {
                return e = (e = (e = (e = (e = (e = e.replace(/[\x2F\x5C\x3A\x7C]/g, "-")).replace(/[\x2A\x3F]/g, "")).replace(/\x22/g, "'")).replace(/\x3C/g, "(")).replace(/\x3E/g, ")")).replace(/(?:^\s+)|(?:\s+$)/g, "");
            }, M = function(e) {
                return Object(k.a)("function(){var ytPlayerConfig=window.ytplayer&&window.ytplayer.config;if(!ytPlayerConfig){return}return{args:ytPlayerConfig.args,sts:ytPlayerConfig.sts,assets:ytPlayerConfig.assets}}").then(t => {
                    if (!t || !t.args || !t.args.video_id) {
                        var n = document.querySelector('#watch7-content meta[itemprop="videoId"]'), o = n && n.getAttribute("content");
                        o && ((t = t || {}).args = t.args || {}, t.args.video_id = o);
                    }
                    return e(t);
                });
            }, B = function(e, t) {
                return Object(k.a)('function(){try{var player=document.querySelector("#movie_player");if(!player){throw new Error("PLAYER_IS_NOT_FOUND")}if(!player.getVideoData){throw new Error("PLAYER_API_IS_NOT_FOUND")}if(!player.getPlayerResponse){(function(fn){if(fn&&!fn.sf_apply){fn.sf_apply=fn.apply;fn.apply=function(self,args){var playerArgs=args[0];if(playerArgs&&playerArgs.raw_player_response){var vars=null;try{vars=JSON.parse(JSON.stringify(playerArgs))}catch(err){// pass\n}player.getSfPlayerVars=function(){return vars}}return fn.sf_apply(self,args)}}})(player.loadVideoByPlayerVars)}var ytPlayer=window.ytplayer;var playerUrl=ytPlayer&&ytPlayer.web_player_context_config&&ytPlayer.web_player_context_config.jsUrl;// when open main page\nif(!playerUrl&&typeof ytcfg==="object"&&ytcfg){playerUrl=ytcfg.data_&&ytcfg.data_.PLAYER_JS_URL}var playerResponse=player.getPlayerResponse&&player.getPlayerResponse();if(!playerResponse){var sfConfig=player.getSfPlayerVars&&player.getSfPlayerVars();playerResponse=sfConfig&&sfConfig.raw_player_response}if(!playerResponse){playerResponse=ytPlayer&&ytPlayer.config&&ytPlayer.config.args&&ytPlayer.config.args.raw_player_response}var videoData=player.getVideoData();var video_id=videoData&&videoData.video_id;return{result:{config:{playerUrl:playerUrl,args:{player_response:playerResponse,video_id:playerResponse&&playerResponse.videoDetails&&playerResponse.videoDetails.videoId}},video_id:video_id}}}catch(err){return{error:{message:err.message,stack:err.stack}}}}').then(e => {
                    let t = null;
                    if (e ? e.error && (t = Object.assign(new Error("UNKNOWN_ERROR"), e.error)) : t = new Error("EMPTY_RESPONSE"), 
                    t) throw t;
                    return e.result;
                }).then(n => {
                    const o = n.config;
                    let i = null;
                    return t ? (e && (i = w.getIdFromBackgroundImageUrl(e)), i || e || (i = w.getIdFromShortsLocation())) : (i = n.video_id, 
                    i || (i = w.getIdFromLocation())), !o.args.player_response || i && i !== o.args.video_id ? i ? {
                        args: {
                            video_id: i
                        }
                    } : null : o;
                });
            };
        }), (function() {
            return !/\/\/gaming\.youtube/.test(location.href);
        }));
    }
});