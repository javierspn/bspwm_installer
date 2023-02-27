!function(e) {
    function t(t) {
        for (var n, s, i = t[0], l = t[1], c = t[2], u = 0, h = []; u < i.length; u++) s = i[u], 
        Object.prototype.hasOwnProperty.call(o, s) && o[s] && h.push(o[s][0]), o[s] = 0;
        for (n in l) Object.prototype.hasOwnProperty.call(l, n) && (e[n] = l[n]);
        for (d && d(t); h.length; ) h.shift()();
        return a.push.apply(a, c || []), r();
    }
    function r() {
        for (var e, t = 0; t < a.length; t++) {
            for (var r = a[t], n = !0, i = 1; i < r.length; i++) {
                var l = r[i];
                0 !== o[l] && (n = !1);
            }
            n && (a.splice(t--, 1), e = s(s.s = r[0]));
        }
        return e;
    }
    var n = {}, o = {
        18: 0
    }, a = [];
    function s(t) {
        if (n[t]) return n[t].exports;
        var r = n[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(r.exports, r, r.exports, s), r.l = !0, r.exports;
    }
    s.m = e, s.c = n, s.d = function(e, t, r) {
        s.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        });
    }, s.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, s.t = function(e, t) {
        if (1 & t && (e = s(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (s.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var n in e) s.d(r, n, function(t) {
            return e[t];
        }.bind(null, n));
        return r;
    }, s.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return s.d(t, "a", t), t;
    }, s.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, s.p = "";
    var i = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], l = i.push.bind(i);
    i.push = t, i = i.slice();
    for (var c = 0; c < i.length; c++) t(i[c]);
    var d = l;
    a.push([ 95, 0 ]), r();
}({
    95: function(e, t, r) {
        "use strict";
        r.r(t);
        var n = r(19), o = r(0), a = r(8), s = r(11), i = r(44), l = r(12);
        class c {
            constructor(e) {
                this.uid = e;
            }
            fetchTrack(e, t) {
                return Object(l.a)({
                    action: "yandexGetTrack",
                    uid: this.uid,
                    currentPage: location.href,
                    album: e,
                    trackId: t
                }).then(e => ({
                    codec: e.codec,
                    downloadURL: e.downloadURL
                }));
            }
        }
        var d = r(5), u = r(6), h = r(1), p = r(7), f = r(13);
        const m = Object(u.a)("playlistButtons"), b = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
        class y {
            constructor(e, t) {
                this.selector = ".d-track .d-track__actions", this.type = "added", this.utils = e, 
                this.api = t;
            }
            handle(e) {
                let {added: t} = e;
                this.renderButtons(t);
            }
            renderButtons(e) {
                e.filter(e => !e.dataset.sfSongReady).map(e => {
                    e.dataset.sfSongReady = "1";
                    try {
                        const t = e.closest(".d-track");
                        if (!t) return;
                        const {track: r, album: n} = this.parseAlbumAndTrackId(t), a = this.parseArtistName(t), s = this.parseTrackName(t);
                        this.prepareButton(r, n, a, s).then(t => {
                            t && (t.title = o.a.i18n.getMessage("download"), e.style.width = "max-content", 
                            Object(p.a)({
                                category: "append",
                                subcategory: "ya",
                                event: "b"
                            }), e.insertBefore(t, null));
                        });
                    } catch (e) {
                        m.error(e);
                    }
                });
            }
            prepareButton(e, t, r, n) {
                const o = h.a.create("a", {
                    class: [ "d-track__hover", "sf-download" ],
                    append: [ h.a.create(this.utils.svg.getSvg("download", "#747474"), {
                        style: {
                            marginTop: "2px"
                        }
                    }) ],
                    on: [ [ "mouseover", e => {
                        if (b) {
                            if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void Object(f.b)(o, {
                                defaultWidth: 400,
                                defaultHeight: 60
                            });
                            Object(f.a)(o, {
                                defaultWidth: 400,
                                defaultHeight: 60
                            });
                        }
                    } ] ]
                });
                return this.api.fetchTrack(t, e).then(e => {
                    if (e && e.codec && e.downloadURL) return o.download = d.a.modify(`${r ? r + " -" : ""} ${n}.${e.codec}`), 
                    o.href = e.downloadURL, o.addEventListener("click", e => {
                        e.stopPropagation(), this.utils.downloadOnClick(e);
                    }), o;
                    m.error("codec or downloadUrl not found");
                });
            }
            parseAlbumAndTrackId(e) {
                const t = e.querySelector(".d-track__name a").getAttribute("href"), [r, n, o] = /album\/([0-9]+)\/track\/([0-9]+)/.exec(t);
                return {
                    album: n,
                    track: o
                };
            }
            parseTrackName(e) {
                return e.querySelector(".d-track__name").getAttribute("title");
            }
            parseArtistName(e) {
                const t = (e, t) => {
                    const r = (t || document).querySelector(e);
                    return r ? r.getAttribute("title") : null;
                };
                let r = t(".d-track__artists a, .d-track__meta a", e);
                if (r) return r;
                let n = e.closest(".sidebar-album");
                return n ? t(".d-artists a", n) : (r = t(".d-album-summary__pregroup .d-artists a")) ? r : (r = document.querySelector(".page-artist__title")) ? r.innerText : null;
            }
            setError(e) {
                e.title = o.a.i18n.getMessage("vkMp3LinksNotFound"), e.classList.add("sf-icon-error");
            }
            disable() {
                const e = [ "data-sf-song-ready", "data-sf-info" ], t = document.querySelectorAll(e.map(e => `[${e}]`).join(","));
                Array.from(t).forEach(t => ((e, t) => t.forEach(t => e.removeAttribute(t)))(t, e)), 
                Array.from(document.querySelectorAll(".sf-download")).forEach(e => e.remove());
            }
        }
        class g {
            constructor(e, t) {
                this.selector = ".player-controls .deco-link.track__title", this.type = "added", 
                this.observer = void 0, this.button = void 0, this.utils = e, this.api = t;
            }
            handle(e) {
                let {added: t} = e;
                const r = t.pop();
                if (!r) return;
                const n = r.closest(".player-controls").querySelector(".player-controls__seq-controls");
                n && this.renderButton(n);
            }
            renderButton(e) {
                if (e.dataset.sfReady) return;
                const t = h.a.create("a", {
                    title: o.a.i18n.getMessage("download"),
                    class: [ "player-controls__btn", "deco-player-controls__button", "sf-download-in-control" ],
                    append: [ h.a.create(this.utils.svg.getSvg("download", "#747474", 19, 19), {
                        style: {
                            marginTop: "3px"
                        }
                    }) ],
                    on: [ [ "click", e => {
                        e.stopPropagation(), this.utils.downloadOnClick(e);
                    } ] ]
                });
                e.append(t), this.prepareButton(t), !this.observer && this.createObserver(t), e.dataset.sfReady = "1";
            }
            createObserver(e) {
                this.observer = new a.a({
                    queries: [ {
                        css: ".player-controls__track.player-controls__track_shown",
                        is: "removed",
                        callback: () => this.prepareButton(e)
                    } ]
                }), this.observer.start();
            }
            prepareButton(e) {
                const t = e.closest(".player-controls");
                if (!t) return;
                const r = t.querySelector(".deco-link.track__title"), n = t.querySelector(".track__artists a");
                if (!r || !n) return;
                const o = r.getAttribute("title"), a = r.getAttribute("href"), s = n.getAttribute("title"), [i, l, c] = /album\/([0-9]+)\/track\/([0-9]+)/.exec(a);
                return this.api.fetchTrack(l, c).then(t => {
                    let {codec: r, downloadURL: n} = t;
                    e.download = d.a.modify(`${s} - ${o}.${r}`), e.href = n;
                });
            }
            disable() {
                this.observer && this.observer.stop(), Array.from(document.querySelectorAll("[data-sf-ready]")).forEach(e => e.removeAttribute("data-sf-ready"));
                const e = document.querySelector(".sf-download-in-control");
                e && e.remove();
            }
        }
        function w(e, t) {
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
                t % 2 ? w(Object(r), !0).forEach((function(t) {
                    Object(n.a)(e, t, r[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : w(Object(r)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                }));
            }
            return e;
        }
        class k extends i.a {
            constructor() {
                super(...arguments), this.active = 1, this.mutationHandlers = [];
            }
            async init() {
                this.uid = this.prepareUID(), this.api = new c(this.uid), this.settings = await o.a.callFn("getPreferences"), 
                this.active = Number(this.settings.moduleYandexMusic), this.utils = Object(s.a)({
                    preferences: this.settings
                }), this.registerListeners(), this.active && this.initObserver(), this.appendStyle("\n      .theme-white .sf-download { background: white;  box-shadow: 0 0 7px 7px white; }\n      .theme_dark .sf-download { background: #181818; box-shadow: 0 0 7px 7px #181818; } \n      \n      .theme-white .sf-download:hover path { fill: black; }\n      .theme_dark .sf-download:hover path { fill: white; }\n        \n      .theme-white .sf-download path { fill: #a7a7a7; }  \n      \n      .sf-download {\n            margin-top: 3px;\n            margin-right: 6px;\n            padding-right: 10px;\n            padding-left: 10px;\n            float:left;\n      }\n      \n      .sf-download-in-control {\n            margin: 12px;\n            width: 11px;\n            height: 22px;\n            margin-top: 9px;\n      }\n      \n      .theme_dark .sf-download-in-control path { fill: white; }\n      .theme-white .sf-download-in-control path { fill: #3c3b3b; }\n      \n      .sf-icon-error path, .sf-icon-error:hover path { fill: #ff33334a!important; }\n");
            }
            initObserver() {
                this.mutationHandlers = [ new y(this.utils, this.api), new g(this.utils, this.api) ];
                this.observer = new a.a({
                    queries: this.mutationHandlers.map(e => ({
                        css: e.selector,
                        callback: e.handle.bind(e),
                        is: e.type
                    }))
                }), this.observer.start();
            }
            registerListeners() {
                o.a.onMessage.addListener(async (e, t, r) => {
                    const {action: n, moduleName: o, state: a} = e;
                    if ("getModuleInfo" === n) return r({
                        state: this.active,
                        moduleName: k.moduleName
                    });
                    "updatePreferences" !== n ? (this.handleMonoChangeActive(n, o, a), this.handleMonoDownloadAll(n)) : this.settings = v(v({}, this.settings), e.preferences);
                });
            }
            async handleMonoDownloadAll(e) {
                if ("downloadMP3Files" !== e) return;
                let t = Array.from(document.querySelectorAll("a.sf-download[download][href]"));
                t = t.map(e => ({
                    url: e.href,
                    title: e.download,
                    filename: e.download
                })), this.utils.downloadList.showBeforeDownloadPopup(t, {
                    type: "audio",
                    folderName: document.title.trim()
                });
            }
            handleMonoChangeActive(e, t, r) {
                if (k.moduleName === t && "changeState" === e) {
                    if (this.active = r, this.active) return this.initObserver();
                    this.observer.stop(), this.mutationHandlers.forEach(e => e.disable());
                }
            }
            prepareUID() {
                let e = this.cache.get("yandex_uid");
                return e || (e = this.getUidFromHTML(), this.cache.set("yandex_uid", e, 720)), e;
            }
            getUidFromHTML() {
                const e = document.querySelectorAll("script[nonce]");
                let t = 0;
                for (const r of e) {
                    const e = r.innerText.match(/"uid":"([0-9]+)"/);
                    if (e) {
                        t = Number(e[1]);
                        break;
                    }
                }
                return t;
            }
        }
        k.moduleName = "yandexMusic";
        var O = r(10), _ = r(15);
        const x = new k;
        _.a.isSingle() && Object(O.a)(k.moduleName, () => x.start(), () => -1 === location.href.indexOf("api/"));
    }
});