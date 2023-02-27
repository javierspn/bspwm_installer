!function(e) {
    function t(t) {
        for (var i, r, s = t[0], l = t[1], d = t[2], u = 0, p = []; u < s.length; u++) r = s[u], 
        Object.prototype.hasOwnProperty.call(a, r) && a[r] && p.push(a[r][0]), a[r] = 0;
        for (i in l) Object.prototype.hasOwnProperty.call(l, i) && (e[i] = l[i]);
        for (c && c(t); p.length; ) p.shift()();
        return o.push.apply(o, d || []), n();
    }
    function n() {
        for (var e, t = 0; t < o.length; t++) {
            for (var n = o[t], i = !0, s = 1; s < n.length; s++) {
                var l = n[s];
                0 !== a[l] && (i = !1);
            }
            i && (o.splice(t--, 1), e = r(r.s = n[0]));
        }
        return e;
    }
    var i = {}, a = {
        6: 0
    }, o = [];
    function r(t) {
        if (i[t]) return i[t].exports;
        var n = i[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(n.exports, n, n.exports, r), n.l = !0, n.exports;
    }
    r.m = e, r.c = i, r.d = function(e, t, n) {
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
        }), 2 & t && "string" != typeof e) for (var i in e) r.d(n, i, function(t) {
            return e[t];
        }.bind(null, i));
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
    }, r.p = "";
    var s = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], l = s.push.bind(s);
    s.push = t, s = s.slice();
    for (var d = 0; d < s.length; d++) t(s[d]);
    var c = l;
    o.push([ 85, 0 ]), n();
}({
    85: function(e, t, n) {
        "use strict";
        n.r(t);
        var i = n(0), a = n(11), o = n(10), r = n(26), s = n(24), l = n(18), d = n(9), c = n(38), u = n(3), p = n(1), f = n(5), m = n(15), h = n(8), v = n(17), g = n(7), y = n(13);
        const _ = {
            position: "absolute",
            top: "38px",
            right: "14px",
            background: "white",
            padding: "4px 9px",
            color: "#3F3F3F",
            fontWeight: "bold",
            textDecoration: "none",
            border: "1px solid #cecece"
        };
        m.a.isSingle() && Object(o.b)("mailru", (function(e, t) {
            const n = Object(a.a)(t);
            var o = t.preferences, m = o.moduleMailru ? 1 : 0;
            const b = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
            var x = i.a.isChrome || i.a.isFirefox || i.a.isGM && i.a.isTM;
            i.a.onMessage.addListener((function(t, n, i) {
                if ("getModuleInfo" === t.action) {
                    if (t.url !== location.href) return;
                    return i({
                        state: m,
                        moduleName: e
                    });
                }
                if ("changeState" === t.action) {
                    if (e !== t.moduleName) return;
                    return k.changeState(t.state);
                }
                "updatePreferences" !== t.action ? m && ("downloadMP3Files" === t.action && (x ? C.downloadMP3Files() : C.showListOfAudioFiles(!1)), 
                "downloadPlaylist" === t.action && C.showListOfAudioFiles(!0)) : Object.assign(o, t.preferences);
            })), m && setTimeout((function() {
                k.run();
            }));
            var k = {
                contextMenu: null,
                run: function() {
                    m = 1, C.injectStyle(), h.a.isAvailable() && this.mutationMode.enable();
                },
                changeState: function(e) {
                    m = e, C.rmBtn(), O.rmBtn(), this.mutationMode.stop(), this.hideMenu(), e && this.run();
                },
                hideMenu: function() {
                    k.contextMenu && (k.contextMenu.hide(), k.contextMenu = null);
                },
                mutationMode: {
                    observer: null,
                    stop: function() {
                        this.observer && this.observer.stop(), [ "sfSkip" ].forEach((function(e) {
                            for (var t, n = Object(l.a)(e), i = document.querySelectorAll("[" + n + "]"), a = 0; t = i[a]; a++) t.removeAttribute(n);
                        }));
                    },
                    wrapAudioOnMouseOver: function() {
                        if (m && !(this.dataset.sfSkip > 0)) {
                            this.dataset.sfSkip = "1";
                            var e = JSON.parse(this.dataset.sfContext);
                            C.onTrackOver(this, e.type);
                        }
                    },
                    enable: function() {
                        if (this.observer) return this.observer.start();
                        const e = e => {
                            for (let t, n = 0; t = e.added[n]; n++) {
                                if (t.dataset.sfSkip > 0) continue;
                                t.dataset.sfSkip = "1";
                                const e = O.getVideoId(t);
                                if (!e) continue;
                                const n = Object(r.a)(t, "b-video__left");
                                if (!n) continue;
                                const i = n.querySelector(".b-video__info-time");
                                i && O.insertBtnInPopup(e, i);
                            }
                        }, t = e => {
                            for (let t, n = 0; t = e.added[n]; n++) {
                                if (t.dataset.sfSkip > 0) continue;
                                t.dataset.sfSkip = "1";
                                const e = O.getVideoId(t);
                                if (!e) continue;
                                const n = Object(r.a)(t, "sp-video__item-page");
                                if (!n) continue;
                                const i = n.querySelector(".sp-video__item-page__info__additional");
                                i && O.insertBtnInPage(e, i, 1);
                            }
                        }, a = e => {
                            for (let t, n = 0; t = e.added[n]; n++) {
                                if (t.dataset.sfSkip > 0) continue;
                                t.dataset.sfSkip = "1";
                                let e = Object(r.a)(t, "sp-video__item-page-new__video-content"), n = e && e.querySelector(".sp-video__item-page-new__actions"), i = e && O.getVideoContentVideoId(e);
                                n && i && O.insertBtnInPage(i, n, 2);
                            }
                        };
                        this.observer = new h.a({
                            queries: [ {
                                css: ".jp__track",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) t.dataset.sfContext = JSON.stringify({
                                        type: 0
                                    }), u.a.one(t, "mouseenter", k.mutationMode.wrapAudioOnMouseOver);
                                }
                            }, {
                                css: ".song-item",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) t.dataset.sfContext = JSON.stringify({
                                        type: 1
                                    }), u.a.one(t, "mouseenter", k.mutationMode.wrapAudioOnMouseOver);
                                }
                            }, {
                                css: ".b-video__left .b-video__container object",
                                is: "added",
                                callback: e
                            }, {
                                css: ".b-video__left .b-video__container video",
                                is: "added",
                                callback: e
                            }, {
                                css: ".sp-video__item-page .sp-video__item-page__video-wrapper object",
                                is: "added",
                                callback: t
                            }, {
                                css: ".sp-video__item-page .sp-video__item-page__video-wrapper video",
                                is: "added",
                                callback: t
                            }, {
                                css: ".sp-video__item-page-new .sp-video__item-page-new__video-content video",
                                is: "added",
                                callback: a
                            }, {
                                css: ".sp-video__item-page-new .sp-video__item-page-new__video-content object",
                                is: "added",
                                callback: a
                            }, {
                                css: ".b-photo",
                                is: "added",
                                callback: e => {
                                    let {added: t} = e;
                                    t.forEach(e => {
                                        const t = e.querySelector(".b-photo__container"), a = document.createElement("a");
                                        for (let e in _) a.style[e] = _[e];
                                        const o = n.svg.getSvg("download", "#2665a9", "13");
                                        o.style.float = "left", o.style.margin = "2px 5px 0 0";
                                        const r = document.createElement("span");
                                        r.innerText = i.a.i18n.getMessage("download"), a.appendChild(o), a.appendChild(r), 
                                        t.appendChild(a), a.addEventListener("click", e => {
                                            e.preventDefault();
                                            const i = t.querySelector(".b-photo__image");
                                            if (i && i.src) {
                                                const e = f.a.modify(i.src.split("/").pop());
                                                n.download(e, i.src);
                                            }
                                        });
                                    });
                                }
                            }, {
                                css: "." + u.a.onRemoveClassName,
                                is: "removed",
                                callback: e => {
                                    for (let t, n = 0; t = e.removed[n]; n++) u.a.onRemoveListener(t);
                                }
                            } ]
                        });
                    }
                }
            }, w = {
                tooltip: void 0,
                updatePos: function(e, t) {
                    var i = n.getPosition(e), a = n.getSize(this.tooltip);
                    this.tooltip.style.top = i.top + t.top - a.height + "px";
                    var o = i.left + parseInt(t.width / 2) - parseInt(a.width / 2), r = document.body.clientWidth + document.body.scrollLeft;
                    r < o + a.width && (o = r - a.width), this.tooltip.style.left = o + "px";
                },
                show: function(e, t) {
                    var n = this;
                    return void 0 !== this.tooltip ? this.hide() : (this.tooltip = p.a.create("div", {
                        class: "sf-tooltip",
                        style: Object.assign({
                            position: "absolute",
                            display: "none",
                            zIndex: 9999,
                            opacity: 0,
                            transition: "opacity 0.2s",
                            whiteSpace: "nowrap",
                            fontSize: "12px",
                            color: "#111",
                            fontFamily: "arial, verdana, sans-serif, Lucida Sans"
                        }, t.style),
                        on: [ "mouseenter", function(e) {
                            n.hide();
                        } ]
                    }), document.body.appendChild(this.tooltip)), this.tooltip.style.display = "block", 
                    setTimeout((function() {
                        n.updatePos(e, t), n.tooltip.style.opacity = 1;
                    })), this.tooltip;
                },
                hide: function() {
                    this.tooltip.style.opacity = 0, this.tooltip.style.display = "none";
                }
            }, S = function() {
                var e = document.title, t = e.indexOf("-");
                return -1 !== t && (e = e.substr(0, t - 1)), f.a.modify(e);
            }, C = {
                className: "sf-audio-panel",
                lastRow: null,
                style: void 0,
                secondsFromDuration: function(e) {
                    var t = e.split(":").map((function(e) {
                        return parseInt(e);
                    }));
                    return 60 * t[0] + t[1];
                },
                getTitle: function(e) {
                    var t = e.querySelector(".jp__track-fullname"), n = e.querySelector(".jp__track-performer");
                    if (null === n && null !== (n = e.querySelector(".jp__track-name-text")) && null !== (n = n.querySelector("a:not(.jp__track-fullname)"))) {
                        var i = t;
                        t = n, n = i;
                    }
                    if (null !== n ? (n = n.textContent.trim()) || (n = "noname") : n = "", n ? n += " - " : n = "", 
                    null !== t) {
                        var a = n + (t = t.textContent);
                        return a = a.replace(/[\r\n\t\s]+/gim, " ").replace(/\s+/g, " ").trim();
                    }
                },
                getTitle2: function(e) {
                    var t = e.querySelector(".title"), n = e.querySelector(".name") || e.querySelector(".b-music__songs__row__body__inner__title__name__link"), i = e.querySelector(".author") || e.querySelector(".b-music__songs__row__body__inner__title__author");
                    n && ((n = n.textContent).length || (n = "noname")), i && (i = i.textContent);
                    return (n && i ? i + " - " + n : t ? t.textContent : "unknown").replace(/[\r\n\t\s]+/gim, " ").replace(/\s+/g, " ").trim();
                },
                getMp3UrlList: function(e) {
                    var t = 1, n = document.querySelectorAll(".b-music__section__content__playlist-songs .song-item");
                    0 === n.length && (n = document.querySelectorAll(".jp__track"), t = 0);
                    for (var i, a = [], o = {}, r = function(e) {
                        s = s.then((function() {
                            return new Promise((function(n) {
                                C.getUrl(e, t, n);
                            }));
                        })).then((function(n) {
                            if (n && !o[n]) {
                                o[n] = 1;
                                var i = "", r = "";
                                if (0 === t ? (i = e.querySelector(".jp__track-duration-total"), r = C.getTitle(e)) : (i = e.querySelector(".time"), 
                                r = C.getTitle2(e)), r) {
                                    var s = f.a.modify(r) + ".mp3", l = i && C.secondsFromDuration(i.textContent);
                                    a.push({
                                        url: n,
                                        filename: s,
                                        title: r,
                                        duration: l
                                    });
                                }
                            }
                        })).catch((function(e) {}));
                    }, s = Promise.resolve(), l = 0; i = n[l]; l++) r(i);
                    s.then((function() {
                        e(a);
                    }));
                },
                showListOfAudioFiles: function(e) {
                    C.getMp3UrlList((function(t) {
                        0 !== t.length && (e ? n.playlist.popupPlaylist(t, S(), !0) : n.playlist.popupFilelist(t));
                    }));
                },
                downloadMP3Files: function() {
                    C.getMp3UrlList((function(e) {
                        0 !== e.length && n.downloadList.showBeforeDownloadPopup(e, {
                            type: "audio",
                            folderName: S()
                        });
                    }));
                },
                onDlBtnOver: function(e) {
                    if (!i.a.isSafari) {
                        var t = this.dataset.duration;
                        if ("mouseenter" === e.type) {
                            var a, o = this, r = w.show(o, a = {
                                top: -14,
                                width: 16,
                                style: {
                                    backgroundColor: "#fff",
                                    border: "1px solid #ccc",
                                    color: "rgb(48, 48, 48)"
                                }
                            });
                            return o.dataset.bitrate ? (r.style.padding = "2px 5px 3px", void (r.textContent = " (" + o.dataset.size + " ~ " + o.dataset.bitrate + ")")) : o.dataset.size ? (r.style.padding = "2px 5px 3px", 
                            void (r.textContent = " (" + o.dataset.size + ")")) : (r.style.padding = "2px 2px 0 2px", 
                            r.textContent = "", r.appendChild(p.a.create("img", {
                                src: "//my9.imgsmail.ru/r/my/preloader_circle_16.gif",
                                height: 16,
                                width: 16
                            })), void fetch(o.href, {
                                method: "GET",
                                credentials: "include"
                            }).then(e => e.headers.get("content-length")).then(e => {
                                if (r.style.padding = "2px 5px 3px", !e) return r.textContent = i.a.i18n.getMessage("getFileSizeFailTitle"), 
                                void w.updatePos(o, a);
                                var s = n.sizeHuman(e, 2);
                                if (t) {
                                    var l = Math.floor(e / t / 125) + " " + i.a.i18n.getMessage("kbps");
                                    o.dataset.bitrate = l, o.dataset.size = s, r.textContent = " (" + s + " ~ " + l + ")";
                                } else o.dataset.size = s, r.textContent = " (" + s + ")";
                                w.updatePos(o, a);
                            }));
                        }
                        w.hide();
                    }
                },
                getUrlViaBridge: function(e, t) {
                    void 0 === C.getUrlViaBridge.index && (C.getUrlViaBridge.index = 0);
                    var n = "sf-bridge-item-" + C.getUrlViaBridge.index;
                    C.getUrlViaBridge.index++, e.classList.add(n);
                    let i = {
                        className: n
                    };
                    Object(v.a)([ i ], (function(e) {
                        var t = e.className, n = document.getElementsByClassName(t)[0];
                        n.classList.remove(t);
                        var i = jQuery(n).data();
                        if (i && i.item) return i.item.url;
                    })).then(e => t(e));
                },
                getUrlById: function(e) {
                    return Object(v.a)([ e ], 'function(id){var url="";var findUrl=function findUrl(items,id){var url="";items.some(function(item){if(item._attr&&item._attr.file===id){url=item._attr.url;return true}});return url};try{url=findUrl(APP.activePage.collection.items,id)}catch(err){}try{if(!url){url=findUrl(APP.player.collection.items,id)}}catch(err){}return url}').then(e => {
                        if (!e) throw new Error("Url is not found");
                        return /^\/\//.test(e) && (e = "https:" + e), e;
                    });
                },
                getUrl: function(e, t, n) {
                    var i = e.dataset.url;
                    if (i) return n(i);
                    if (0 === t) {
                        var a = e.querySelector("a.jp__track-fullname-link");
                        if (null === a) return n();
                        a = a.href;
                        var o = Object(s.a)(a);
                        return o.file && o.uid ? n("https://music.my.mail.ru/file/" + o.file + ".mp3?u=" + encodeURIComponent(o.uid)) : C.getUrlViaBridge(e, (function(t) {
                            t && (e.dataset.url = t), n(t);
                        }));
                    }
                    if (1 === t) {
                        var r = e.dataset.file;
                        return C.getUrlById(r).then((function(e) {
                            n(e);
                        }), (function() {
                            n("https://music.my.mail.ru/file/" + r + ".mp3");
                        }));
                    }
                },
                onDlBtnClick: function(e) {
                    e.stopPropagation(), n.downloadOnClick(e);
                },
                getDlLink: function(e, t, n) {
                    return p.a.create("a", {
                        data: {
                            duration: t || ""
                        },
                        href: e,
                        style: {
                            position: "relative",
                            display: "inline-block",
                            width: "16px",
                            height: "16px",
                            verticalAlign: "middle"
                        },
                        download: f.a.modify(n + ".mp3"),
                        on: [ [ "mouseenter", C.onDlBtnOver ], [ "mouseleave", C.onDlBtnOver ], [ "click", this.onDlBtnClick ] ]
                    });
                },
                addDownloadPanelNew: function(e, t) {
                    if (Object(g.a)({
                        category: "append",
                        subcategory: "ma",
                        event: "b"
                    }), t) {
                        var n = C.getTitle2(e);
                        if (n) {
                            var i = e.querySelector(".time"), a = i && C.secondsFromDuration(i.textContent), o = this.getDlLink(t, a, n), r = p.a.create("div", {
                                class: [ C.className, "type-2" ],
                                append: [ o ],
                                on: [ [ "mouseover", e => {
                                    if (b) {
                                        if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void Object(y.b)(r, {
                                            defaultWidth: 400,
                                            defaultHeight: 60
                                        }, {});
                                        Object(y.a)(r, {
                                            defaultWidth: 400,
                                            defaultHeight: 60
                                        }, {});
                                    }
                                } ] ]
                            }), s = e.querySelector(".icons");
                            if (s) s.appendChild(r); else {
                                const t = e.querySelector(".b-music__songs__row__body__inner__controls");
                                t && (o.classList.add(this.className + "-btn"), p.a.create(r, {
                                    class: [ this.className, "type-3" ],
                                    style: {
                                        background: "none",
                                        verticalAlign: "top"
                                    },
                                    append: [ o ]
                                }), t.appendChild(r));
                            }
                        }
                    }
                },
                addDownloadPanel: function(e, t) {
                    var n = e.querySelector(".jp__track-duration-total");
                    if (null !== n && void 0 !== t) {
                        var i = C.getTitle(e);
                        if (i) {
                            n = C.secondsFromDuration(n.textContent);
                            var a = p.a.create("div", {
                                class: [ C.className, "type-0" ],
                                append: [ this.getDlLink(t, n, i) ]
                            }), o = e.querySelector(".jp__track-management");
                            o && (o.firstChild ? o.insertBefore(a, o.firstChild) : o.appendChild(a));
                        }
                    }
                },
                onTrackOver: function(e, t) {
                    0 === e.getElementsByClassName(C.className).length && C.getUrl(e, t, (function(n) {
                        1 === t ? C.addDownloadPanelNew(e, n) : C.addDownloadPanel(e, n);
                    }));
                },
                injectStyle: function() {
                    this.style ? this.style.parentNode || document.head.appendChild(this.style) : (this.style = p.a.create("style", {
                        text: Object(d.a)([ {
                            selector: "." + this.className,
                            style: {
                                display: "none",
                                left: "22px",
                                backgroundImage: "url(" + n.svg.getSrc("download", "#168DE2") + ")",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "16px"
                            }
                        }, {
                            selector: "." + this.className + "-btn",
                            style: {
                                backgroundImage: "url(" + n.svg.getSrc("download", "#168DE2") + ")",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "16px"
                            }
                        }, {
                            selector: ".jp__track:hover ." + this.className,
                            style: {
                                display: "block",
                                opacity: .5
                            }
                        }, {
                            selector: ".jp__track:hover ." + this.className + ".type-0",
                            style: {
                                display: "inline-block",
                                marginLeft: "-16px",
                                position: "relative",
                                left: "-2px"
                            }
                        }, {
                            selector: ".jp__track.jp__track-plays ." + this.className,
                            style: {
                                left: "-18px"
                            }
                        }, {
                            selector: "." + this.className + ":hover",
                            style: {
                                opacity: "1 !important"
                            }
                        }, {
                            selector: "." + this.className + ".type-2",
                            style: {
                                marginRight: "5px",
                                marginLeft: "5px"
                            }
                        }, {
                            selector: ".song-item:hover ." + this.className + ".type-2",
                            style: {
                                display: "inline-block",
                                opacity: .5
                            }
                        }, {
                            selector: ".b-music__section__content--songs ." + this.className + ".type-3",
                            style: {
                                marginTop: "18px"
                            }
                        }, {
                            selector: ".b-music__section__content--songs .b-music__songs--inline ." + this.className + ".type-3",
                            style: {
                                marginTop: "9px"
                            }
                        } ])
                    }), document.head.appendChild(this.style));
                },
                rmBtn: function() {
                    C.style && (C.style.parentNode.removeChild(C.style), C.style = void 0);
                    for (var e, t = document.querySelectorAll("." + C.className), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                }
            }, O = {
                btnIndex: 0,
                domCache: {},
                className: "sf-video-btn",
                prepareLinks: function(e) {
                    for (var t, n = [], i = 0; t = e[i]; i++) {
                        var a = t.url, o = "FLV";
                        -1 !== a.indexOf(".mp4") && (o = "MP4"), -1 !== a.indexOf(".mov") && (o = "MOV"), 
                        -1 !== a.indexOf(".mpg") && (o = "MPG"), t.quality || (t.quality = "-?-");
                        var r = t.quality.toUpperCase(), s = [ "1080P", "720P", "480P", "360P", "272P" ].indexOf(r);
                        -1 !== s && (r = [ "1080", "720", "480", "360", "272" ][s]);
                        var l = o.toLowerCase(), d = {
                            href: a,
                            title: t.title,
                            ext: l,
                            format: o,
                            quality: r,
                            forceDownload: !0
                        };
                        n.push(d);
                    }
                    if (0 !== n.length) return n;
                },
                showLinkList: function(e, t, a) {
                    if (e || (e = i.a.i18n.getMessage("noLinksFound")), a) {
                        if (!k.contextMenu) return;
                        return e.map(e => (e.noSize = i.a.isFirefox, e)), void k.contextMenu.update(e);
                    }
                    k.contextMenu && k.contextMenu.isShow ? k.hideMenu() : k.contextMenu = n.popupMenu.quickInsert(t, e, "video-links-popup", {
                        parent: Object(r.a)(t, "b-video__main")
                    });
                },
                appendPageBtn: function(e, t, a) {
                    if (null === e.querySelector("." + O.className)) {
                        Object(g.a)({
                            category: "append",
                            subcategory: "ma",
                            event: "b"
                        });
                        var o = null, r = p.a.create("span", {
                            class: O.className,
                            append: [ o = p.a.create("a", {
                                data: {
                                    index: t
                                },
                                href: "#",
                                on: [ "click", function(e) {
                                    e.preventDefault(), u.a.onRemoveEvent(this, k.hideMenu), O.readDomCache(this.dataset.index, this);
                                } ]
                            }) ]
                        });
                        if (1 === a ? (o.style.marginLeft = "15px", o.textContent = i.a.i18n.getMessage("download")) : 2 === a && (p.a.create(o, {
                            style: {
                                fontSize: 0,
                                lineHeight: 0,
                                padding: "6px",
                                boxShadow: "inset 0 0 0 1px #ccc",
                                borderRadius: "3px",
                                display: "inline-block"
                            }
                        }), o.appendChild(n.svg.getSvg("download", "#666", 18, 18))), 2 === a) e.appendChild(r); else if (1 === a) {
                            var s = e.lastChild;
                            e.insertBefore(r, s), s = null;
                        }
                    }
                },
                appendBtn: function(e, t) {
                    if (null === e.querySelector("." + O.className)) {
                        var n = void 0, a = {};
                        e.childNodes.length > 1 ? n = e.childNodes[1] : (n = e.lastChild, a.marginRight = "5px");
                        var o = p.a.create("span", {
                            class: e.lastChild.getAttribute("class") + " " + O.className,
                            append: [ p.a.create("a", {
                                data: {
                                    index: t
                                },
                                text: i.a.i18n.getMessage("download"),
                                href: "#",
                                on: [ "click", function(e) {
                                    e.preventDefault(), u.a.onRemoveEvent(this, k.hideMenu), O.readDomCache(this.dataset.index, this);
                                } ],
                                style: a
                            }) ]
                        });
                        e.insertBefore(o, n), n = null;
                    }
                },
                readDomCache: function(e, t) {
                    O.showLinkList(i.a.i18n.getMessage("download"), t);
                    var a = function() {
                        O.showLinkList(void 0, t, 1);
                    }, r = function(e) {
                        if ("getRutubeLinks" === e.action) {
                            if (!o.showUmmyItem) return a();
                            O.showLinkList(n.popupMenu.prepareLinks.rutube(e.links), t, 1);
                        } else "getMailruLinks" === e.action ? O.showLinkList(n.popupMenu.prepareLinks.mailru(e.links, e.title), t, 1) : O.showLinkList(O.prepareLinks(e.links), t, 1);
                    }, s = O.domCache[parseInt(e)];
                    if (s.links) r(s); else if (s.metadataUrl) {
                        var l = s.metadataUrl;
                        /^\/\//.test(l) && (l = "http:" + l);
                        Object(c.a)({
                            url: l,
                            withCredentials: !0,
                            json: !0,
                            localXHR: !0
                        }, (function(e, t) {
                            var n;
                            (n = e ? null : t.body) && "object" == typeof n ? O.readMeta(n, (function(e) {
                                e.links ? (s.links = e.links, s.action = e.action, r(s)) : a();
                            })) : a();
                        }));
                    } else s.url ? i.a.sendMessage({
                        action: "getMailruLinks",
                        extVideoId: s.url
                    }, (function(e) {
                        e.links ? (s.title = e.title, s.links = e.links, s.action = e.action, r(s)) : a();
                    })) : a();
                },
                readMeta: function(e, t) {
                    var n, a = [];
                    if ("UPLOADED" === e.provider) {
                        if (n = e.movie ? e.movie.title : void 0, !e.videos) return t();
                        e.videos.forEach((function(e) {
                            a.push({
                                quality: e.name,
                                url: e.url,
                                title: n
                            });
                        }));
                    }
                    if ("ugc" === e.provider) {
                        if (n = e.meta ? e.meta.title : void 0, !e.videos) return t();
                        e.videos.forEach((function(e) {
                            a.push({
                                quality: e.key,
                                url: e.url,
                                title: n
                            });
                        }));
                    }
                    return "pladform" === e.provider ? (n = e.meta ? e.meta.title : void 0, void i.a.sendMessage({
                        action: "getPladformVideo",
                        extVideoId: {
                            playerId: e.meta.playerId,
                            videoId: e.meta.videoId
                        }
                    }, (function(e) {
                        if (!e) return t();
                        var i = e.links;
                        if (!i) return t();
                        i.forEach((function(e) {
                            "object" == typeof e && void 0 === e.title && (e.title = n);
                        })), t(e);
                    }))) : 0 === a.length ? t() : t({
                        links: a
                    });
                },
                getFlashVars: function(e) {
                    if (e) {
                        var t = e.querySelector('param[name="flashvars"]');
                        if (t) {
                            var n = t.value, i = Object(s.a)(n, {
                                params: !0
                            });
                            return i.metadataUrl ? {
                                metadataUrl: i.metadataUrl
                            } : void 0;
                        }
                    }
                },
                matchUrl: function(e) {
                    var t = e.match(/\/([^\/]+)\/([^\/]+)\/video\/(.+).html/);
                    return t || (t = e.match(/embed\/([^\/]+)\/([^\/]+)\/(.+).html/)), t;
                },
                getVideoId: function(e) {
                    "OBJECT" !== e.tagName && (e = e.querySelector('object[name="b-video-player"]'));
                    var t = this.getFlashVars(e);
                    if (t) return t;
                    var n = document.querySelector('[data-type="album-json"]');
                    if (n) try {
                        if ((n = JSON.parse(n.textContent)).signVideoUrl) return {
                            metadataUrl: n.signVideoUrl
                        };
                    } catch (e) {}
                    var i = this.matchUrl(location.pathname);
                    return i ? {
                        metadataUrl: "http://api.video.mail.ru/videos/" + i[1] + "/" + i[2] + "/" + i[3] + ".json"
                    } : void 0;
                },
                getVideoContentVideoId: function(e) {
                    var t = null, n = e.querySelector(".sp-video__item-page-new__share__item[data-share-type][data-location]");
                    return n && (t = {
                        url: n.dataset.location
                    }), t;
                },
                insertBtnInPage: function(e, t, n) {
                    e.metadataUrl ? (e.metadataUrl = decodeURIComponent(e.metadataUrl), O.domCache[O.btnIndex] = {
                        metadataUrl: e.metadataUrl
                    }) : O.domCache[O.btnIndex] = Object.assign({}, e), O.appendPageBtn(t, O.btnIndex, n), 
                    O.btnIndex++;
                },
                insertBtnInPopup: function(e, t) {
                    e.metadataUrl && (e.metadataUrl = decodeURIComponent(e.metadataUrl), O.domCache[O.btnIndex] = {
                        metadataUrl: e.metadataUrl
                    }), O.appendBtn(t, O.btnIndex), O.btnIndex++;
                },
                rmBtn: function() {
                    for (var e, t = document.querySelectorAll("." + O.className), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                }
            };
        }));
    }
});