!function(e) {
    function t(t) {
        for (var o, i, s = t[0], l = t[1], u = t[2], c = 0, p = []; c < s.length; c++) i = s[c], 
        Object.prototype.hasOwnProperty.call(r, i) && r[i] && p.push(r[i][0]), r[i] = 0;
        for (o in l) Object.prototype.hasOwnProperty.call(l, o) && (e[o] = l[o]);
        for (d && d(t); p.length; ) p.shift()();
        return a.push.apply(a, u || []), n();
    }
    function n() {
        for (var e, t = 0; t < a.length; t++) {
            for (var n = a[t], o = !0, s = 1; s < n.length; s++) {
                var l = n[s];
                0 !== r[l] && (o = !1);
            }
            o && (a.splice(t--, 1), e = i(i.s = n[0]));
        }
        return e;
    }
    var o = {}, r = {
        17: 0
    }, a = [];
    function i(t) {
        if (o[t]) return o[t].exports;
        var n = o[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(n.exports, n, n.exports, i), n.l = !0, n.exports;
    }
    i.m = e, i.c = o, i.d = function(e, t, n) {
        i.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
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
        var n = Object.create(null);
        if (i.r(n), Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var o in e) i.d(n, o, function(t) {
            return e[t];
        }.bind(null, o));
        return n;
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
    var s = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], l = s.push.bind(s);
    s.push = t, s = s.slice();
    for (var u = 0; u < s.length; u++) t(s[u]);
    var d = l;
    a.push([ 96, 0 ]), n();
}({
    96: function(e, t, n) {
        "use strict";
        n.r(t);
        var o = n(19), r = n(0), a = n(11), i = n(10), s = n(27), l = n(26), u = n(24), d = n(51), c = n(18), p = n(36), f = n(9), h = n(21), m = n(14), g = n(46), v = n(38), b = n(22), y = n(3), w = n(1), k = n(47), _ = n(5), x = n(12), S = n(6), O = n(15), M = n(8), P = n(33), A = n(30);
        function L(e, t) {
            const n = t.split("?extra=")[1].split("#"), o = n[0], r = n[1], a = r ? j(r) : "", i = j(o);
            let s = (a ? a.split(String.fromCharCode(9)) : [])[0].split(String.fromCharCode(11)), l = s.splice(0, 1, i)[0];
            return !!N[l] && (t = N[l].apply(null, [ ...s, e ]));
        }
        function C(e) {
            return /\.m3u8\?/.test(e);
        }
        const N = {
            s: (e, t) => {
                let n = e.length;
                if (n) {
                    let o = function(e, t) {
                        let n = e.length, o = [];
                        if (n) {
                            let e = n;
                            for (t = Math.abs(t); e--; ) t = (n * (e + 1) ^ t + e) % n, o[e] = t;
                        }
                        return o;
                    }(e, t), r = 0;
                    for (e = e.split(""); ++r < n; ) e[r] = e.splice(o[n - 1 - r], 1, e[r])[0];
                    e = e.join("");
                }
                return e;
            },
            i: (e, t, n) => N.s(e, t ^ n)
        };
        function j(e) {
            if (!e || e.length % 4 == 1) return !1;
            for (var t, n, o = 0, r = 0, a = ""; n = e.charAt(r++); ) ~(n = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=".indexOf(n)) && (t = o % 4 ? 64 * t + n : n, 
            o++ % 4) && (a += String.fromCharCode(255 & t >> (-2 * o & 6)));
            return a;
        }
        var I = n(39);
        function q(e) {
            for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
            const r = [];
            for (let t = 0; t < e.length; t++) {
                !r.find(o => n.every(n => o[n] === e[t][n])) && r.push(e[t]);
            }
            return r;
        }
        const D = Object(S.a)("tools/youtube");
        function F(e) {
            return new Promise((t, n) => {
                r.a.sendMessage({
                    action: "getFileSize",
                    url: e
                }, (function(n) {
                    let {fileSize: o} = n;
                    if (0 === o || !Number.isFinite(o)) return t(!1);
                    r.a.sendMessage({
                        action: "getFileSize",
                        url: e,
                        requestOptions: {
                            type: "GET",
                            headers: {
                                Range: `bytes=${o - 8}-${o}`
                            }
                        }
                    }, (function(n) {
                        let {error: o} = n;
                        o ? D.debug(`Link ${e} don't have content`) : D.debug(`Link ${e} have content`), 
                        t(!o);
                    }));
                }));
            });
        }
        var B = n(16), R = n(4), T = n(28);
        const E = e => {
            const t = {
                full: 1080,
                hd: 720,
                sd: 480,
                low: 360,
                lowest: 240,
                mobile: 144
            };
            return e.rawQuality = e.quality, e.quality = t[e.quality] ? String(t[e.quality]) : e.quality, 
            e;
        };
        var H = n(17), V = n(41), U = n(2);
        function z(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(e);
                t && (o = o.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), n.push.apply(n, o);
            }
            return n;
        }
        function W(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? z(Object(n), !0).forEach((function(t) {
                    Object(o.a)(e, t, n[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : z(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                }));
            }
            return e;
        }
        const $ = Object(a.a)({}).svg.getSrc("download", "#4986cc", "20px");
        var J = U.c.memo(e => {
            let {iframeSrc: t} = e;
            const [n, o] = U.c.useState([]);
            return U.c.useEffect(() => {
                Object(x.a)({
                    action: "showjetFetchMovie",
                    iframeVideoURL: t
                }).then(e => {
                    e = e.map(e => W(W({}, e), {}, {
                        onClick() {
                            Object(B.a)(Object(R.e)(T.a, {
                                filename: _.a.modify(e.filename) + ".mp4",
                                format: "mp4",
                                sources: [ {
                                    url: e.endpoint,
                                    format: "mp4"
                                } ],
                                convertType: "hls"
                            }), "sf-muxer-parent");
                        }
                    })), o(e);
                });
            }, []), U.c.createElement(V.b, {
                items: n,
                theme: V.d
            }, U.c.createElement(V.a, null, U.c.createElement("div", {
                className: "like_btn",
                style: {
                    marginLeft: "14px"
                }
            }, U.c.createElement("img", {
                src: $,
                style: {
                    opacity: .5
                },
                alt: ""
            }), U.c.createElement("div", {
                className: "like_button_label"
            }, r.a.i18n.getMessage("download")))));
        }), X = n(54), G = n(7), K = n(13);
        function Q(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(e);
                t && (o = o.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), n.push.apply(n, o);
            }
            return n;
        }
        function Y(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? Q(Object(n), !0).forEach((function(t) {
                    Object(o.a)(e, t, n[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Q(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                }));
            }
            return e;
        }
        const Z = n(42), ee = Object(S.a)("vkontakte_ru"), te = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
        O.a.isSingle() && Object(i.b)("vk", (function(e, t) {
            const n = Object(a.a)(t);
            var o = t.preferences, i = o.moduleVkontakte ? 1 : 0, S = r.a.isChrome || r.a.isFirefox || r.a.isGM && r.a.isTM, O = Object(s.a)(), N = !1;
            if (O) if (/\/video_ext\.php\?.+/.test(location.href)) N = !0; else {
                if (!/\/widget_comments\.php\?.+/.test(location.href)) return;
                O = !1;
            }
            r.a.onMessage.addListener((function(t, n, r) {
                if ("getModuleInfo" === t.action) {
                    if (t.url !== location.href) return;
                    return r({
                        state: i,
                        moduleName: e
                    });
                }
                if ("changeState" === t.action) {
                    if (e !== t.moduleName) return;
                    return V.changeState(t.state);
                }
                "updatePreferences" !== t.action ? i && ("updateLinks" === t.action && U(), "downloadMP3Files" === t.action && (S ? ne.downloadMP3Files() : ne.showListOfAudioFiles(!1)), 
                "downloadPlaylist" === t.action && ne.showListOfAudioFiles(!0), "downloadPhotos" === t.action && ae.downloadPhoto()) : Object.assign(o, t.preferences);
            })), i && setTimeout((function() {
                V.run();
            }));
            const j = [], D = {};
            var V = {
                contextMenu: null,
                isMutation: !1,
                run: function() {
                    if (i = 1, /m\.vk\.com/.test(location.hostname)) return ie.run();
                    N ? oe.addFrameBtn() : (ae.injectStyle(), M.a.isAvailable() && (V.isMutation = !0, 
                    ne.addCustomStyle(), V.mutationMode.enable()));
                },
                changeState: function(e) {
                    O || (i = e, z(), ne.hideLinks(), re.off(), V.hideMenu(), ae.rmCurrentPhotoBtn(), 
                    ne.rmBitrate(), ae.rmPhotoAlbumDlBtn(), V.mutationMode.stop(), e && V.run());
                },
                hideMenu: function() {
                    V.contextMenu && (V.contextMenu.hide(), V.contextMenu = null);
                },
                mutationMode: {
                    observer: null,
                    stop: function() {
                        this.observer && this.observer.stop(), [ "sfSkip" ].forEach((function(e) {
                            for (var t, n = Object(c.a)(e), o = document.querySelectorAll("[" + n + "]"), r = 0; t = o[r]; r++) t.removeAttribute(n);
                        }));
                    },
                    wrapNewAudioOnMouseOver: function() {
                        i && ne.onNewMouseOver.apply(this, arguments);
                    },
                    wrapNewVoiceOnMouseOver: function() {
                        const e = Object(m.a)(this, ".im-mess");
                        if (e && e.querySelector(".sf-voice-btn") || !i) return;
                        let t = w.a.create("a", {
                            href: this.getAttribute("data-mp3") || "#sf-preload",
                            class: [ ne.className, "sf-audio-btn", "sf-voice-btn" ],
                            download: _.a.modify(this.getAttribute("data-mp3")) || "",
                            style: {
                                width: "3px",
                                height: "3px",
                                padding: "0px 9px 9px"
                            },
                            on: [ [ "click", e => {
                                e.stopPropagation(), n.downloadOnClick(e);
                            } ] ]
                        });
                        const o = e.querySelector(".im-mess--actions, .audio-msg-track--duration");
                        Object(G.a)({
                            category: "append",
                            subcategory: "vk",
                            event: "b"
                        }), o && (o.classList.contains("audio-msg-track--duration") && t.classList.add("sf-voice-btn-in-dur"), 
                        o.appendChild(t), e.addEventListener("mouseleave", () => t.style.display = "none"), 
                        e.addEventListener("mouseenter", () => t.style.display = "inline")), n.addStyleRules(`.${ne.className}.sf-voice-btn`, {
                            "background-size": "12px !important"
                        }), n.addStyleRules(`.${ne.className}.sf-voice-btn-in-dur`, {
                            position: "absolute",
                            top: "23px",
                            right: "-13px"
                        });
                    },
                    wrapVideoFeedOnMouseOver: function() {
                        i && (Object(G.a)({
                            category: "append",
                            subcategory: "vk",
                            event: "b"
                        }), re.onLinkHover.apply(this, arguments));
                    },
                    onVideoInsert: function(e) {
                        Object(H.a)("function(){return window.mvcur&&window.mvcur.mvData&&window.mvcur.mvData.is_active_live}").then(t => {
                            var o = n.getParentById(e, "mv_box");
                            o || (o = e);
                            var r = oe.getPlayerNode(o);
                            r && !t ? e.closest(".ShortVideoPost") || window.location.href.includes("clips") ? oe.getLinksFromPlayer(o, r, oe.newClipButton.bind(oe)) : oe.getLinksFromPlayer(o, r, oe.newAppendButton.bind(oe)) : e.dataset.sfSkip = 0;
                        });
                    },
                    onVideoChange: async function(e) {
                        if (await Object(H.a)("function(){return window.mvcur&&window.mvcur.mvData&&window.mvcur.mvData.is_active_live}")) return;
                        var t = this;
                        let n = e;
                        if (".like_cont" === e.className && (n = e.closest('div[id=*="/video_box_wrap/"]')), 
                        /video_box_wrap-?\d+_-?\d+/.test(n.id) && window.location.href.includes("clips") || /post-?\d+_?\d+/.test(n.id) ? t.onVideoInsert(n) : /video_box_wrap-?\d+_-?\d+/.test(n.id) || t.onVideoInsert(n), 
                        n.sfWatch) t.onVideoInsert(n); else {
                            n.sfWatch = !0;
                            const e = new A.a({
                                attrs: [ {
                                    name: "id",
                                    callback() {
                                        t.onVideoInsert(n);
                                    }
                                } ],
                                target: n
                            });
                            e.trigger(), y.a.onRemoveEvent(n, (function() {
                                e.stop(), n.sfWatch = !1, n.dataset.sfSkip = 0;
                            }));
                        }
                        if (document.querySelector('iframe[src*="showjet"]')) {
                            let e = document.querySelector('iframe[src*="showjet"]');
                            const t = document.createElement("div"), n = document.querySelector(".like_btns");
                            n && (n.insertBefore(t, n.querySelector(".ui_actions_menu_wrap._ui_menu_wrap")), 
                            Object(B.a)(Object(R.e)(J, {
                                iframeSrc: e.src
                            }), t));
                        }
                    },
                    newStoryButton: function(e) {
                        setTimeout(() => {
                            let t = e.closest(".stories_item_cont_wrap"), o = t.querySelector("video"), r = t.querySelector(".StoryBottom__line.StoryBottom__line--2");
                            o || (o = t.querySelector(".stories_photo"));
                            const a = w.a.create("div", {
                                id: "savefrom__yt_btn",
                                style: {
                                    display: "flex",
                                    position: "absolute",
                                    right: "60px",
                                    top: "20px",
                                    zIndex: 1e3,
                                    pointerEvents: "auto",
                                    marginLeft: "10px",
                                    verticalAlign: "middle"
                                },
                                append: [ w.a.create("a", {
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
                                        color: "#fff",
                                        marginRight: "8px"
                                    },
                                    append: [ w.a.create("i", {
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
                                    }) ],
                                    on: [ [ "click", function(e) {
                                        e.preventDefault();
                                        let t = o.src;
                                        return "stories_photo" !== o.className || (t = o.style.backgroundImage.substring(5, o.style.backgroundImage.length - 2)), 
                                        Object(x.a)({
                                            action: "downloadVkStory",
                                            downloadFileUrl: t,
                                            filename: Date.now() + ".mp4"
                                        });
                                    } ] ]
                                }), w.a.create("style", {
                                    text: Object(f.a)({
                                        selector: "#savefrom__yt_btn",
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
                                }) ]
                            });
                            r.querySelector("#savefrom__yt_btn") || r.append(a);
                        }, 500);
                    },
                    enable: function() {
                        var e = this;
                        if (this.observer) return this.observer.start();
                        const t = t => {
                            for (let n, o = 0; n = t.added[o]; o++) if (!(n.dataset.sfSkip > 0)) {
                                if ("like_cont" === n.className && !window.location.href.includes("clips")) return;
                                n.dataset.sfSkip = "1", e.onVideoChange(n);
                            }
                        }, n = e => {
                            for (let t, n = 0; t = e.added[n]; n++) Object(G.a)({
                                category: "append",
                                subcategory: "vk",
                                event: "b"
                            }), t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", y.a.one(t, "mouseenter", V.mutationMode.wrapNewAudioOnMouseOver));
                        };
                        this.observer = new M.a({
                            queries: [ {
                                css: ".ShortVideoPost .video_box_wrap > #video_player",
                                is: "added",
                                callback: t
                            }, {
                                css: ".stories_story_bottom",
                                is: "added",
                                callback: t => {
                                    for (let n, o = 0; n = t.added[o]; o++) n.dataset.sfSkip > 0 || (n.dataset.sfSkip = "1", 
                                    e.newStoryButton(n));
                                }
                            }, {
                                css: ".post_video_desc a.lnk",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    y.a.one(t, "mouseenter", V.mutationMode.wrapVideoFeedOnMouseOver));
                                }
                            }, {
                                css: "#mv_box #mv_player_box > .video_box_wrap",
                                is: "added",
                                callback: t => {
                                    for (let n, o = 0; n = t.added[o]; o++) n.dataset.sfSkip > 0 || (n.dataset.sfSkip = "1", 
                                    e.onVideoChange(n));
                                }
                            }, {
                                css: "#mv_box #mv_player_box .video_box_wrap .like_cont",
                                is: "added",
                                callback: t
                            }, {
                                css: "#mv_box #mv_player_box > .video_box_wrap > #video_player",
                                is: "added",
                                callback: t => {
                                    for (let n, o = 0; n = t.added[o]; o++) n = n.parentNode, n.dataset.sfSkip > 0 || (n.dataset.sfSkip = "1", 
                                    e.onVideoChange(n));
                                }
                            }, {
                                css: "#photos_all_block",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    ae.addNewPhotoAlbumDlBtn(t));
                                }
                            }, {
                                css: ".pv_photo_wrap .pv_img_area_wrap",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    ae.addNewDlCurrentPhotoBtn(t));
                                }
                            }, {
                                css: ".audio_row",
                                is: "added",
                                callback: n
                            }, {
                                css: ".top_audio_player .top_audio_player_title",
                                is: "added",
                                callback: n
                            }, {
                                css: ".audio_page_player .audio_page_player_title_performer",
                                is: "added",
                                callback: n
                            }, {
                                css: ".audio-msg-track",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    y.a.one(t, "mouseenter", V.mutationMode.wrapNewVoiceOnMouseOver));
                                }
                            }, {
                                css: "." + y.a.onRemoveClassName,
                                is: "removed",
                                callback: e => {
                                    for (let t, n = 0; t = e.removed[n]; n++) y.a.onRemoveListener(t);
                                }
                            } ]
                        });
                    }
                }
            };
            var U = function() {
                V.changeState(0), V.changeState(1);
            }, z = function() {
                ne.lastRow = null;
                for (var e = document.querySelectorAll("a.savefrom_vk_download,div.savefrom_vk_download,span.savefrom_vk_download"), t = e.length - 1; t >= 0; t--) ne.elIsHidden(e[t]) && e[t].parentNode.removeChild(e[t]);
            }, W = function() {
                if (null !== document.querySelector('.page_block_header_inner._header_inner a.ui_crumb[href="/audio"]')) {
                    const e = document.querySelector(".page_block_header_inner._header_inner div.ui_crumb");
                    if (e && e.textContent) return _.a.modify(e.textContent);
                }
                var e = document.title, t = e.indexOf("|");
                return -1 !== t && (e = e.substr(0, t - 1)), _.a.modify(e);
            }, $ = function(e) {
                try {
                    const t = JSON.parse(e).payload[1];
                    return [ null, null, null, null, null, t[0], t[1], null, t[3] ];
                } catch (e) {}
                for (var t = function(e) {
                    return !0 === e ? 1 : parseInt(e) || 0;
                }, n = function(e) {
                    return !0 === e ? 1 : parseFloat(e) || 0;
                }, o = e.split("<!>"), r = o.length - 1; r >= 0; --r) {
                    var a = o[r];
                    if ("<!" == a.substr(0, 2)) {
                        var i = a.indexOf(">"), s = a.substr(2, i - 2);
                        switch (a = a.substr(i + 1), s) {
                          case "json":
                            var l = null;
                            try {
                                l = JSON.parse(a);
                            } catch (e) {}
                            o[r] = l;
                            break;

                          case "int":
                            o[r] = t(a);
                            break;

                          case "float":
                            o[r] = n(a);
                            break;

                          case "bool":
                            o[r] = !!t(a);
                            break;

                          case "null":
                            o[r] = null;
                            break;

                          case "pageview_candidate":
                            o.pop();
                            break;

                          case "debug":
                            o.pop();
                        }
                    }
                }
                return o;
            }, Q = function(e) {
                return /<em>.*<\/em>/.test(e) && (e = e.replace(/<\/?em>/g, "")), e;
            }, ne = {
                audioElClassList: [ "audio", "audioRow", "audioRowWall" ],
                lastRow: null,
                className: "savefrom_vk_download",
                cache: {},
                lastValidRequest: null,
                waitUntilUnblock: function(e) {
                    var t = this, n = 10;
                    if (!t.lastValidRequest) return Promise.reject(new Error("Last valid request is empty!"));
                    return function o() {
                        return new Promise((function(e) {
                            setTimeout(e, 15e3);
                        })).then((function() {
                            if (e.abort) throw new Error("Abort");
                            return Object(b.a)(t.lastValidRequest).then((function(e) {
                                if (n--, !$(e.body)[5]) {
                                    if (n > 0) return o();
                                    throw new Error("Can't request data");
                                }
                            }));
                        }));
                    }().then((function() {
                        return new Promise((function(e) {
                            setTimeout(e, 250);
                        }));
                    }));
                },
                needUnmask: function(e) {
                    var t = /audio_api_unavailable/;
                    return e.some((function(e) {
                        if (t.test(e[2])) return !0;
                    }));
                },
                unmaskUrlViaUtil: function(e) {
                    return ne.needUnmask(e) ? Object(H.a)([], "function(){return vk.id}").then(t => {
                        const n = e.map(e => {
                            try {
                                return Array.isArray(e) && e[2] ? (e[2] = L(t, e[2]), e) : null;
                            } catch (e) {
                                return ee.debug("track decode error: ", e), null;
                            }
                        });
                        return Promise.all(n).then(e => e.filter(e => null !== e));
                    }) : Promise.resolve(e);
                },
                unmaskUrl: function(e) {
                    return ne.needUnmask(e) ? Object(H.a)([ e ], 'function(idsArr){var aFail=false;var bFail=false;var cFail=false;var unmaskUrl=function unmaskUrl(url){var _url="";if(!aFail&&window.sfUnmaskUrl){try{_url=window.sfUnmaskUrl(url)}catch(err){aFail=true}}if(!cFail&&!_url&&window.AudioPlayerHTML5){try{var res=null;var r={_isHlsUrl:function _isHlsUrl(url){res=url;return true},_initHls:function _initHls(){}};window.AudioPlayerHTML5.prototype._setAudioNodeUrl.apply(r,[null,url]);_url=res}catch(err){cFail=true}}if(!bFail&&!_url&&window.AudioPlayerFlash){try{var r={};window.AudioPlayerFlash.prototype.setUrl.apply(r,[url]);_url=r._url}catch(err){bFail=true}}if(typeof _url!=="string"){_url=""}return _url};idsArr.forEach(function(item){var url=unmaskUrl(item[2]);if(url){item[2]=url}});return idsArr}').then((function(t) {
                        return t || e;
                    })) : Promise.resolve(e);
                },
                _getNewTrackListByIdsWithActionHash(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    let n = 0;
                    const o = {}, r = this.cache, a = e.filter(e => {
                        const t = e.fullId;
                        return !r[t] || (o[t] = r[t], n++, !1);
                    }), i = [];
                    for (;a.length; ) i.push(a.splice(0, 9));
                    const s = e.length;
                    let l = Promise.resolve();
                    i.forEach(e => {
                        l = l.then(() => {
                            const a = () => {
                                if (t.abort) throw new Error("Abort");
                                const a = e.filter(e => e.fullId && e.actionHash && e.urlHash).map(e => e.fullId + "_" + e.actionHash + "_" + e.urlHash), i = {
                                    type: "POST",
                                    headers: {
                                        "Content-Type": "application/x-www-form-urlencoded",
                                        "X-Requested-With": "XMLHttpRequest"
                                    },
                                    data: Z.stringify({
                                        act: "reload_audio",
                                        al: 1,
                                        ids: a.join(",")
                                    }),
                                    url: "/al_audio.php",
                                    localXHR: !0
                                };
                                return Object(b.a)(i).then(e => {
                                    const a = $(e.body)[5];
                                    if (!a || !Array.isArray(a)) throw new Error("Track list is not found!");
                                    return this.lastValidRequest = i, a.forEach(e => {
                                        const t = e[1] + "_" + e[0];
                                        r[t] = e, o[t] = e, n++;
                                    }), t.onProgress && t.onProgress(n, s), new Promise(e => {
                                        setTimeout(e, 250);
                                    });
                                });
                            };
                            let i = 2;
                            const l = () => a().catch(e => {
                                if ("Track list is not found!" === e.message && !t.withoutUnblock) {
                                    if (this.lastValidRequest) return this.waitUntilUnblock(t).then(a);
                                    if (i-- > 0) return new Promise(e => setTimeout(e, 15e3)).then(() => l());
                                }
                                throw e;
                            });
                            return l().catch(e => {
                                "Abort" !== e.message && ee.debug("requestIds error!", e);
                            });
                        });
                    }), l = l.then((function() {
                        Object.keys(r).slice(1e3).forEach((function(e) {
                            delete r[e];
                        }));
                        const t = [];
                        return e.forEach(e => {
                            const n = e.fullId, r = o[n];
                            r && t.push(r);
                        }), t;
                    }));
                    return l = l.then(e => ne.unmaskUrlViaUtil(e)).then(e => {
                        const t = Object(X.a)(5), n = e.map(e => t(() => {
                            const t = e[2], n = (e => {
                                if (ne.isHlsLink(e)) {
                                    const t = (e = e.replace("/index.m3u8", ".mp3")).split("/"), n = -1 !== e.indexOf("audios") ? 1 : 0;
                                    return t.splice(t.length - (2 + n), 1), t.join("/");
                                }
                                return e;
                            })(t);
                            return ne.isHlsLink(t) ? Object(b.a)({
                                method: "HEAD",
                                url: n
                            }).then(() => (e[2] = n, e), t => (ee.warn("getNewTrackListByIdsWithActionHash: mp3 file not available. ", t), 
                            e)) : e;
                        }));
                        return Promise.all(n);
                    }), l;
                },
                _getAlbumIdFromUrl: function(e) {
                    var t = this, n = [ e ], o = Object(u.a)(e);
                    o.z && n.unshift(o.z);
                    var r = null;
                    return n.some((function(e) {
                        if (r = t._getAlbumId(e)) return !0;
                    })), r;
                },
                _getAlbumId: function(e) {
                    if (/[?&]q=/.test(e)) return null;
                    var t = {
                        url: "/al_audio.php",
                        data: {}
                    }, n = /audio_playlist(-?\d+)_(-?\d+)(?:\/(\w+))?/.exec(e);
                    if (n && (t.data.access_hash = n[3] || "", t.data.act = "load_section", t.data.al = 1, 
                    t.data.claim = 0, t.data.owner_id = n[1], t.data.playlist_id = n[2], t.data.type = "playlist", 
                    t.data.offset = 0), !t.data.act) {
                        var o = /audios(-?\d+)/.exec(e);
                        if (o) {
                            var r = /[?&]section=(\w+)/.exec(e), a = r && r[1];
                            if (a && -1 === [ "playlists", "all" ].indexOf(a)) return null;
                            t.data.access_hash = "", t.data.act = "load_section", t.data.al = 1, t.data.claim = 0, 
                            t.data.owner_id = o[1], t.data.playlist_id = -1, t.data.type = "playlist", t.data.offset = 0;
                        }
                    }
                    return t.data.act ? t : null;
                },
                getNewNodeTrackInfo: async function(e) {
                    const t = this.readNewDataAudio(e.dataset.audio), n = this.getNewTrackInfo(t);
                    if (!n || !n.fullId) throw new Error("Track info is not found");
                    return n.url ? ne.unmaskUrlViaUtil([ [ null, null, n.url ] ]).then(e => (n.url = e[0][2], 
                    n)) : n;
                },
                _getAlbumTrackViaApi: function(e, t) {
                    if (!e.url) throw ee.debug("Page is not exists!", e), new Error("Page is not exists!");
                    var n = JSON.parse(JSON.stringify(e.data)), o = function() {
                        return t.abort ? Promise.reject(new Error("Abort")) : Object(b.a)({
                            type: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                                "X-Requested-With": "XMLHttpRequest"
                            },
                            url: e.url,
                            data: n,
                            timeout: 6e4,
                            localXHR: !0
                        }).then((function(e) {
                            const t = $(e.body)[5];
                            if (!t) throw new Error("Album data is empty!");
                            return new Promise((function(e) {
                                setTimeout(e, 250);
                            })).then((function() {
                                return t;
                            }));
                        }));
                    };
                    return o().then((function(e) {
                        var t = 20;
                        return e.hasMore ? function r(a) {
                            return !a || t < 0 ? e : (t--, n.offset = a, o().then((function(t) {
                                return t.list.length ? (e.list.push.apply(e.list, t.list), t.hasMore ? r(t.nextOffset) : e) : e;
                            }), (function(t) {
                                return "Abort" !== t.message && ee.debug("getOffset error!", t), e;
                            })));
                        }(e.nextOffset) : e;
                    }));
                },
                _getAllTrackViaDom: function(e, t) {
                    var n = this;
                    t = t || {};
                    var o = [];
                    return [].slice.call(e.querySelectorAll(".audio_row")).forEach((function(e) {
                        if ((!t.fromPage || !n.elIsHidden(e)) && (t.grabReply || !ae.isReply(e))) {
                            var r = null;
                            try {
                                r = JSON.parse(e.dataset.audio);
                            } catch (e) {}
                            r && o.push(r);
                        }
                    })), {
                        list: o
                    };
                },
                _getNewAudioLinks: function(e, t) {
                    var n = this;
                    t = t || {};
                    var o = (e = e || document) === document, a = ae.getPopup("", "audio", (function() {
                        t.abort = !0;
                    }));
                    a.onPrepare(r.a.i18n.getMessage("download") + " ...");
                    var i = function() {
                        return Promise.resolve().then((function() {
                            return n._getAllTrackViaDom(e, {
                                fromPage: o,
                                grabReply: !1
                            });
                        }));
                    };
                    t.onProgress = function(e, t) {
                        a.onProgress(e, t);
                    };
                    var s = Promise.resolve();
                    return s = (s = (s = (s = o ? s.then((function() {
                        return Promise.resolve().then((function() {
                            var e = n._getAlbumIdFromUrl(location.href);
                            if (!e) throw new Error("Album is not found");
                            return n._getAlbumTrackViaApi(e, t);
                        }));
                    })).catch((function(e) {
                        throw "Album is not found" !== e.message && ee.debug("findAlbumLinks error!", e), 
                        e;
                    })).catch((function() {
                        return i();
                    })) : s.then(i)).then((function(e) {
                        var t = e.list;
                        if (!t.length) throw new Error("Audio is not found");
                        return a.onProgress(0, t.length), e;
                    }))).then((function(e) {
                        var o = [], r = "";
                        "string" == typeof e.title && (r = _.a.modify(e.title));
                        const a = [];
                        return e.list.forEach((function(e) {
                            const t = e[1] + "_" + e[0], n = ne.getTrackActionHash(e), r = ne.getTrackUrlHash(e);
                            -1 === a.indexOf(t) && (a.push(t), o.push({
                                fullId: t,
                                actionHash: n,
                                urlHash: r
                            }));
                        })), n._getNewTrackListByIdsWithActionHash(o, t).then((function(e) {
                            var t = {}, o = [];
                            return e.forEach((function(e) {
                                var r = n.getNewTrackInfo(e);
                                if (r && r.url) {
                                    var a = n.getNewAudioFilename(r), i = n.getNewAudioFullTitle(r);
                                    t[r.fullId] = r.url, o.push({
                                        url: r.url,
                                        title: i,
                                        filename: a
                                    });
                                }
                            })), {
                                linkList: t,
                                trackList: o,
                                title: r
                            };
                        }));
                    }))).then((function(e) {
                        return a.onReady(), e;
                    }), (function(e) {
                        throw a.onReady(), e;
                    }));
                },
                tooltip: {
                    tooltip: void 0,
                    updatePos: function(e, t) {
                        var o = n.getPosition(e), r = n.getSize(this.tooltip);
                        this.tooltip.style.top = o.top + t.top - r.height + "px";
                        var a = o.left + parseInt(t.width / 2) - parseInt(r.width / 2), i = document.body.clientWidth + document.body.scrollLeft;
                        i < a + r.width && (a = i - r.width), this.tooltip.style.left = a + "px";
                    },
                    show: function(e, t) {
                        var n = this;
                        return void 0 !== this.tooltip ? this.hide() : (this.tooltip = w.a.create("div", {
                            class: "sf-tooltip",
                            style: Object.assign({
                                position: "absolute",
                                display: "none",
                                zIndex: 9999,
                                opacity: 0,
                                transition: "opacity 0.2s",
                                whiteSpace: "nowrap"
                            }, t.style),
                            on: [ "mouseenter", function(e) {
                                n.hide();
                            } ]
                        }), document.body.appendChild(this.tooltip)), this.tooltip.style.display = "block", 
                        setTimeout((function() {
                            n.updatePos(e, t), n.tooltip.style.opacity = 1;
                        }), 0), this.tooltip;
                    },
                    hide: function() {
                        this.tooltip && (this.tooltip.style.opacity = 0, this.tooltip.style.display = "none");
                    }
                },
                rmBitrate: function() {
                    void 0 === ne.rmBitrate.style && document.body.appendChild(ne.rmBitrate.style = w.a.create("style", {
                        text: ".sf-bitrate-value {display: none;}"
                    }));
                    for (var e, t = document.querySelectorAll(".sf-bitrate-value"), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                },
                insertNewBitrate: function(e, t) {
                    if (e && t && t.classList.contains("audio_row__info")) {
                        var n = t.querySelector(".audio_row__duration");
                        if (n && (void 0 !== ne.rmBitrate.style && (ne.rmBitrate.style.parentNode.removeChild(ne.rmBitrate.style), 
                        ne.rmBitrate.style = void 0), !n.querySelector(".sf-bitrate-value"))) {
                            var o = w.a.create("span", {
                                text: " " + e,
                                class: "sf-bitrate-value",
                                style: {
                                    position: "absolute",
                                    textAlign: "right",
                                    right: 0,
                                    opacity: "0.8",
                                    top: "14px",
                                    fontSize: "11px",
                                    whiteSpace: "nowrap"
                                }
                            });
                            n.appendChild(o);
                        }
                    }
                },
                onDlBtnLeave: function() {
                    ne.tooltip.hide();
                },
                onDlBtnOver: function() {
                    var e = ne, t = e.tooltip, n = this, o = n.dataset.fullId, a = n.parentNode && n.parentNode.parentNode, i = -6;
                    n.dataset.bitrateOffsetTop && (i = parseInt(n.dataset.bitrateOffsetTop));
                    var s = {
                        top: i,
                        width: 24,
                        style: {
                            backgroundColor: "#fff",
                            border: "1px solid #ccc",
                            color: "rgb(48, 48, 48)"
                        }
                    }, l = t.show(n, s);
                    l.dataset.fullId = o;
                    var u = function() {
                        var t = n.dataset.bitrate, o = n.dataset.size, i = "";
                        e.isHlsLink(n.href) ? i = r.a.i18n.getMessage("download") : o ? t ? (e.insertNewBitrate(t, a), 
                        i = o + " ~ " + t) : i = o : i = r.a.i18n.getMessage("getFileSizeFailTitle"), l.style.padding = "2px 5px 3px", 
                        l.textContent = i;
                    };
                    n.dataset.size || e.isHlsLink(n.href) ? u() : (l.style.padding = "2px 2px 0 2px", 
                    l.textContent = "", l.appendChild(w.a.create("img", {
                        src: "/images/upload.gif",
                        height: 8,
                        width: 32,
                        style: {
                            marginTop: "2px",
                            marginBottom: "1px"
                        }
                    })), n.dataset.preloadOver || (n.dataset.preloadOver = 1, e._preloadNewTrackUrl(n).then((function(r) {
                        if (n.dataset.preloadOver = 2, n.href = r, !e.isHlsLink(r)) return e._onOverInsertBitrate(n, a).then((function() {
                            l.dataset.fullId === o && (u(), t.updatePos(n, s));
                        }));
                        u(), t.updatePos(n, s);
                    })).catch((function(e) {
                        ee.error("_preloadNewTrackUrl error", e), n.dataset.preloadOver = "", l.dataset.fullId === o && (u(), 
                        t.updatePos(n, s));
                    }))));
                },
                preloadIdPromiseMap: {},
                _preloadNewTrackUrl: function(e) {
                    var t = this, n = t.preloadIdPromiseMap, o = e.dataset.fullId, r = e.dataset.actionHash, a = e.dataset.urlHash, i = n[o];
                    return i || (i = n[o] = t._getNewTrackListByIdsWithActionHash([ {
                        fullId: o,
                        actionHash: r,
                        urlHash: a
                    } ], {
                        withoutUnblock: !0
                    }).then((function(e) {
                        delete n[o];
                        var r = null;
                        e.some((function(e) {
                            if (e[1] + "_" + e[0] === o) return r = e, !0;
                        }));
                        var a = r && t.getNewTrackInfo(r);
                        if (!a || !a.url) throw new Error("Track is not found");
                        return a.url;
                    }), (function(e) {
                        throw delete n[o], e;
                    })).then(e => ne.unmaskUrl([ e ])).then(e => e[0])), i;
                },
                isHlsLink: function(e) {
                    return /\.m3u8(\?|$)/.test(e);
                },
                onNewDlBtnClick: function(e) {
                    ne.isHlsLink(this.href) ? (e.preventDefault(), Object(B.a)(Object(R.e)(T.a, {
                        sources: [ {
                            url: this.href,
                            format: "hls"
                        } ],
                        filename: this.download,
                        format: "mp3",
                        convertType: "hlsToMp3"
                    }), "sf-muxer-parent")) : n.downloadOnClick(e);
                    for (var t, o = document.querySelectorAll("._audio_row_" + this.dataset.fullId), r = 0; t = o[r]; r++) t.style.backgroundColor = "#f4f7fc";
                },
                _onNewDlBtnClickWrapper: function(e) {
                    var t = ne, n = this;
                    e.stopPropagation(), (n.dataset.preloadOver > 1 || n.dataset.preloadBitrate > 1) && (n.dataset.preloadDl = 2), 
                    n.dataset.preloadDl ? n.dataset.preloadDl > 1 ? ne.onNewDlBtnClick.call(n, e) : e.preventDefault() : (e.preventDefault(), 
                    n.dataset.preloadDl = 1, t._preloadNewTrackUrl(n).then((function(t) {
                        n.dataset.preloadDl = 2, n.href = t, ne.onNewDlBtnClick.call(n, e);
                    }), (function(e) {
                        ee.error("_preloadNewTrackUrl error", e), n.dataset.preloadDl = "";
                    })));
                },
                getNewDlBtn: function(e, t) {
                    var n = {
                        href: e.url || "#sf-preload",
                        class: [ ne.className, "sf-audio-btn" ],
                        download: _.a.modify(t) || "",
                        data: {
                            duration: e.duration || "",
                            fullId: e.fullId,
                            actionHash: e.actionHash,
                            urlHash: e.urlHash
                        },
                        style: {
                            width: "16px",
                            height: "16px"
                        },
                        on: [ [ "mouseenter", this.onDlBtnOver ], [ "mouseleave", this.onDlBtnLeave ], [ "click", this._onNewDlBtnClickWrapper ], [ "mousedown", function(e) {
                            e.stopPropagation();
                        } ] ]
                    };
                    return (r.a.isGM || r.a.isSafari) && (n.title = r.a.i18n.getMessage("downloadTitle")), 
                    w.a.create("a", n);
                },
                preloadSizePromiseMap: {},
                _onOverInsertBitrate: function(e, t) {
                    var o = this, a = o.preloadSizePromiseMap, i = e.dataset.fullId, s = a[i];
                    return s || (s = a[i] = (e => {
                        let t = D[e];
                        if (t) {
                            const t = j.indexOf(e);
                            -1 !== t && (j.splice(t, 1), j.unshift(e));
                        } else if (t = D[e] = Object(x.a)({
                            action: "getFileSize",
                            url: e
                        }).then(t => (t && !t.error || delete D[e], t)).catch(t => {
                            throw delete D[e], t;
                        }), j.unshift(e), j.length > 100) {
                            const e = j.pop();
                            delete D[e];
                        }
                        return t;
                    })(e.href).then((function(s) {
                        if (delete a[i], !s) throw new Error("Response is empty");
                        if (!s.fileSize) throw delete o.cache[i], new Error("File size is empty");
                        var l = n.sizeHuman(s.fileSize, 2), u = "";
                        e.dataset.duration && (u = Math.floor(s.fileSize / e.dataset.duration / 125) + " " + r.a.i18n.getMessage("kbps")), 
                        e.dataset.bitrate = u, e.dataset.size = l, ne.insertNewBitrate(u, t);
                    }), (function(e) {
                        throw delete a[i], e;
                    }))), s;
                },
                getNewAudioFullTitle: function(e) {
                    var t = [];
                    return e.title && t.push(e.title), e.performer && (t.length && t.unshift(" - "), 
                    t.unshift(e.performer)), t.join("");
                },
                getNewAudioFilename: function(e) {
                    var t = this.getNewAudioFullTitle(e);
                    return t && (t += ".mp3"), t;
                },
                handleNewCurrentAudioRow: function(e, t, o) {
                    if (!e.querySelector("." + ne.className)) {
                        var r = this.getNewAudioFilename(t), a = this.getNewDlBtn(t, r), i = "#6C8CAC";
                        1 === o && (i = "#C4D1DE"), a.classList.remove("sf-audio-btn"), w.a.create(a, {
                            style: {
                                background: "url(" + n.svg.getSrc("download", i) + ") center no-repeat",
                                backgroundSize: "12px",
                                width: "12px",
                                height: "12px",
                                padding: 0,
                                margin: 0,
                                cssFloat: "left",
                                marginRight: "3px",
                                marginTop: "6px",
                                marginBottom: "-2px"
                            }
                        });
                        var s = null;
                        if (y.a.onRemoveEvent(a, (function() {
                            y.a.one(e, "mouseenter", V.mutationMode.wrapNewAudioOnMouseOver), s && s.stop();
                        })), 2 === o) {
                            var l = Object(m.a)(e, ".audio_page_player");
                            l && (s = new A.a({
                                target: l,
                                attrs: [ {
                                    name: "data-full-id",
                                    callback() {
                                        a.parentNode && a.parentNode.removeChild(a), s && s.stop();
                                    }
                                } ]
                            })).trigger();
                        }
                        1 === o && (a.dataset.bitrateOffsetTop = 1), e.insertBefore(a, e.firstChild);
                    }
                },
                handleNewAudioRow: function(e, t, n) {
                    if (!e.querySelector("." + ne.className)) {
                        var r = this, a = this.getNewAudioFilename(n), i = this.getNewDlBtn(n, a), s = t.parentNode;
                        w.a.create(i, {
                            class: [ "audio_row__action" ],
                            style: {
                                width: "24px",
                                height: "24px",
                                cssFloat: "left"
                            },
                            on: [ [ "mouseover", e => {
                                if (te) {
                                    if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void Object(K.b)(i, {
                                        defaultWidth: 400,
                                        defaultHeight: 60
                                    }, {});
                                    Object(K.a)(i, {
                                        defaultWidth: 400,
                                        defaultHeight: 60
                                    });
                                }
                            } ] ]
                        });
                        var l = t.firstChild;
                        l ? t.insertBefore(i, l) : t.appendChild(i), 1 === o.vkShowBitrate && (i.dataset.preloadBitrate || (i.dataset.preloadBitrate = 1, 
                        r._preloadNewTrackUrl(i).then((function(e) {
                            return i.dataset.preloadBitrate = 2, i.href = e, r._onOverInsertBitrate(i, s);
                        })).catch((function(e) {
                            ee.error("_preloadNewTrackUrl error", e);
                        }))));
                    }
                },
                addNewDlTrackBtn: function(e) {
                    var t = this, n = function() {
                        a.disconnect();
                    }, o = null, r = function(r) {
                        o || (o = t.getNewNodeTrackInfo(e)), o.then(n => function(n, o) {
                            t.handleNewAudioRow(e, n, o);
                        }(r, n)).catch(e => {
                            ee.error("Fetch track info error: " + e.message), n();
                        });
                    }, a = new (Object(P.a)())((function(e) {
                        if (i) {
                            for (var t = null, o = null, a = 0; t = e.shift(); ) if ("childList" === t.type && t.addedNodes.length && t.target.classList.contains("audio_row__info")) for (a = 0, 
                            t.addedNodes; o = t.addedNodes[a]; a++) if (o.classList.contains("audio_row__actions")) return void r(o);
                        } else n();
                    }));
                    a.observe(e, {
                        childList: !0,
                        subtree: !0
                    });
                    var s = e.querySelector(".audio_row__actions");
                    s && (r(s), s = null);
                },
                getNewTrackInfo: function(e) {
                    if (!e) return null;
                    var t = {};
                    return "string" == typeof e[2] && (t.url = e[2]), t.title = e[3], t.title && (t.title = _.a.decodeSpecialChars(Q(t.title))), 
                    t.performer = e[4], t.performer && (t.performer = _.a.decodeSpecialChars(Q(t.performer))), 
                    t.duration = parseInt(e[5]), t.actionHash = ne.getTrackActionHash(e), t.urlHash = ne.getTrackUrlHash(e), 
                    e[1] && e[0] && (t.fullId = e[1] + "_" + e[0]), t.id = e[0], t.ownerId = e[1], t;
                },
                getTrackActionHash: e => (e[13] || "").split("/")[2] || "",
                getTrackUrlHash: e => (e[13] || "").split("/")[5] || "",
                readNewDataAudio: function(e) {
                    try {
                        return JSON.parse(e);
                    } catch (e) {
                        return null;
                    }
                },
                addNewDlCurrentTrackBtn: function(e, t) {
                    return Object(H.a)(() => {
                        let e = null;
                        if ("undefined" != typeof ap && ap._currentAudio && (e = ap._currentAudio), !e && "undefined" != typeof cur && cur.audioPage && cur.audioPage._readyAudio && (e = cur.audioPage._readyAudio), 
                        !e) try {
                            e = JSON.parse(localStorage.audio_v9_track);
                        } catch (e) {}
                        return e;
                    }).then(n => {
                        if (!n) {
                            let e = document.querySelector(".audio_page_player[data-audio]");
                            n = e && _this.readNewDataAudio(e.dataset.audio);
                        }
                        let o = n && this.getNewTrackInfo(n);
                        o && (o.url || o.fullId) && this.handleNewCurrentAudioRow(e, o, t);
                    });
                },
                onNewMouseOver: function(e) {
                    var t = ne;
                    if (this && !this.querySelector("." + ne.className)) {
                        var n = null;
                        this.classList.contains("top_audio_player_title") && (n = 1), this.classList.contains("audio_page_player_title_performer") && (n = 2), 
                        n ? t.addNewDlCurrentTrackBtn(this, n) : t.addNewDlTrackBtn(this);
                    }
                },
                addCustomStyle: function() {
                    if (1 !== this.addCustomStyle.hasStyle) {
                        this.addCustomStyle.hasStyle = 1;
                        var e = document.querySelector("#savefrom-styles.sf-audio");
                        e && e.parentNode.removeChild(e), n.addStyleRules(".savefrom_vk_download.sf-audio-btn", {
                            background: "url(" + n.svg.getSrc("download", "#5f7fa2") + ") center no-repeat !important",
                            opacity: "0.4"
                        }, "sf-audio");
                    }
                },
                hideLinks: function() {
                    if (this.addCustomStyle.hasStyle) {
                        this.addCustomStyle.hasStyle = 0;
                        var e = document.querySelector("#savefrom-styles.sf-audio");
                        e && e.parentNode.removeChild(e), n.addStyleRules(".savefrom_vk_download", {
                            display: "none"
                        }, "sf-audio");
                    }
                    ne.tooltip.tooltip && (ne.tooltip.tooltip.parentNode.removeChild(ne.tooltip.tooltip), 
                    ne.tooltip.tooltip = void 0), ne.cache = {};
                },
                elIsHidden: function(e) {
                    return null === e.offsetParent;
                },
                downloadMP3Files: function() {
                    var e = ae.getLayer() || document;
                    ne._getNewAudioLinks(e).then((function(e) {
                        e.linkList;
                        var t = e.trackList, o = e.title || W();
                        let a = t.map(e => ne.isHlsLink(e.url) ? {
                            filename: e.filename,
                            sources: [ {
                                url: e.url,
                                format: "hls"
                            } ],
                            format: "hls",
                            useConverter: !0
                        } : e);
                        if (0 === a.length) return alert(r.a.i18n.getMessage("vkMp3LinksNotFound"));
                        n.downloadList.showBeforeDownloadPopup(a, {
                            type: "audio",
                            folderName: o
                        });
                    }), (function(e) {
                        "Abort" !== e.message && (ee.debug("_getNewAudioLinks error!", e), alert(r.a.i18n.getMessage("vkMp3LinksNotFound")));
                    }));
                },
                showListOfAudioFiles: function(e) {
                    var t = ae.getLayer() || document;
                    ne._getNewAudioLinks(t).then((function(t) {
                        var o = t.linkList, a = t.trackList, i = t.title || W(), s = null;
                        if (e) {
                            if (0 !== (s = a).length) return n.playlist.popupPlaylist(s, i, !0);
                        } else {
                            for (var l in s = [], o) s.push({
                                url: o[l]
                            });
                            if (0 !== s.length) return n.playlist.popupFilelist(s);
                        }
                        alert(r.a.i18n.getMessage("vkMp3LinksNotFound"));
                    }), (function(e) {
                        "Abort" !== e.message && (ee.debug("_getNewAudioLinks error!", e), alert(r.a.i18n.getMessage("vkMp3LinksNotFound")));
                    }));
                },
                requestReloadAudio: function(e, t, n) {
                    const o = {
                        act: "reload_audio",
                        ids: `${e}_${t}_${n}`
                    };
                    return Object(b.a)({
                        type: "POST",
                        url: "/audio",
                        json: !0,
                        data: o
                    }).then(e => {
                        const {data: t} = e.body;
                        return ne.getNewTrackInfo(t[0][0]);
                    });
                }
            }, oe = {
                panelId: "savefrom__vk_video_links",
                videoAttr: "data-savefrom-video",
                hiddenAttr: "data-savefrom-hidden",
                btnBoxId: "sf-iframe-dl-btn",
                btnBox: null,
                style: {
                    fontSize: "10pt",
                    margin: "15px 0",
                    padding: "0"
                },
                getLinksFormUrl: function(e) {
                    if (e) {
                        if ("//" === e.substr(0, 2) && (e = "http:" + e), o.showUmmyItem && this.isRutubeLink(e)) return oe.getRutubeLinks(e);
                        if (this.isPladformLink(e)) return oe.getPladformLinks(e);
                        var t, r = n.embedDownloader.hostings;
                        for (var a in r) {
                            for (var i, s = r[a], l = 0; i = s.re[l]; l++) {
                                var u = e.match(i);
                                if (u) {
                                    t = {
                                        hosting: a,
                                        action: s.action,
                                        extVideoId: u[1]
                                    };
                                    break;
                                }
                            }
                            if (t) break;
                        }
                        if (t) return {
                            request: t
                        };
                    }
                },
                getLinksFromFlashVars: function(e) {
                    var t = Object(u.a)(e, {
                        params: !0
                    });
                    return oe.getLinksFromHtml5MetaData(t);
                },
                getLinksFromHtml5MetaData: function(e) {
                    if (!e) return;
                    var t = e.md_title;
                    if (void 0 === t) return;
                    let n = Object.keys(e).some(e => e.match(/cache([0-9]+)/)) ? /cache([0-9]+)/ : /url([0-9]+)/;
                    var o = {}, r = !1;
                    for (var a in e) {
                        var i = null;
                        if ("extra_data" !== a || "52" !== e.extra) {
                            if (null !== (i = a.match(n))) {
                                var s = e[a], l = s.indexOf("?");
                                -1 !== l && (s = s.substr(0, l)), r = !0, o[i[1]] = s;
                            }
                        } else o[i = e.hd ? "HD" : "SD"] = e[a], r = !0;
                    }
                    return r ? {
                        title: t,
                        links: o
                    } : void 0;
                },
                getRutubeLinks: function(e) {
                    if (/rutube[^\/]+\/(?:play|video)\/embed\/(\d+)/.test(e) || /video\.rutube\./.test(e)) return {
                        isUmmy: !0,
                        links: n.popupMenu.prepareLinks.rutube(e)
                    };
                },
                isRutubeLink: function(e) {
                    return /\/\/.*rutube\..*/.test(e);
                },
                getPladformLinks: function(e) {
                    if (e) {
                        var t = Object(u.a)(e);
                        return {
                            request: {
                                action: "getPladformVideo",
                                extVideoId: {
                                    playerId: t.pl,
                                    videoId: t.videoid
                                }
                            }
                        };
                    }
                },
                isPladformLink: function(e) {
                    return /\/\/.*pladform\..*/.test(e);
                },
                getLinksVideoEl: function(e, t) {
                    var n = t.querySelector(".vv_summary");
                    if (!n) return null;
                    n = n.textContent;
                    for (var o, r, a = {}, i = e.querySelectorAll("source"), s = 0; r = i[s]; s++) {
                        var l = r.src || "", u = l.indexOf("?");
                        -1 !== u && (l = l.substr(0, u));
                        var d = l.match(/\.(\d+)\.[^\/]+$/);
                        null !== d && (a[d[1]] = l, o = !0);
                    }
                    return o ? {
                        title: n,
                        links: a
                    } : void 0;
                },
                getPlayerNode: function(e) {
                    var t = null;
                    return e.closest(".ShortVideoPage__container") ? e : ([ "iframe.video_yt_player", "#html5_player", "#flash_video_obj", "#playerObj", "#player", ".video_box_wrap > #video_player" ].some((function(n) {
                        if (t = e.querySelector(n)) return !0;
                    })), t);
                },
                getLinksFromMv: function(e, t, n) {
                    return Object(H.a)([ t, e ], (e, t) => {
                        const o = window.mvcur;
                        if (o && o.player && o.player.vars) {
                            var r = o.player.vars;
                            return r.vid !== e || r.oid !== t ? n() : {
                                vars: o.player.vars
                            };
                        }
                    }).then(e => e ? oe.getLinksFromHtml5MetaData(e.vars) : null);
                },
                getLinksFromFrame: function(e) {
                    var t = document.body.innerHTML, n = Object(u.a)(location.href), o = parseInt(n.oid), r = parseInt(n.id);
                    if (o && r) {
                        var a = null;
                        if (Object(p.a)(t, [ /"vid":/, /"oid":/, /"md_title":/ ]).some((function(e) {
                            return a = e, !0;
                        })), a && a.vid === r && a.oid === o) return e(null, {
                            request: {
                                hosting: "vk",
                                action: "getVkLinksFromJsonMsg",
                                json: a
                            }
                        });
                        var i = document.body, s = oe.getPlayerNode(i);
                        if (s) return oe.getLinksFromPlayer(i, s, (function(t) {
                            t && e(null, t);
                        }));
                    }
                    return e("ERROR");
                },
                getLinksFromPlayer: function(e, t, o) {
                    if (t) {
                        var r, a;
                        if ("OBJECT" === t.tagName) (a = t.querySelector('param[name="flashvars"]')) && (a = a.getAttribute("value"), 
                        r = oe.getLinksFromFlashVars(a)); else if ("IFRAME" === t.tagName) {
                            var i = t.getAttribute("src");
                            r || (r = oe.getLinksFormUrl(i));
                        } else if ("EMBED" === t.tagName) {
                            var s = t.getAttribute("src");
                            r || (a = t.getAttribute("flashvars")) && (r = oe.getLinksFromFlashVars(a)), r || (r = oe.getLinksFormUrl(s));
                        }
                        if (r) return o(r, e);
                        if ("DIV" === t.tagName && "video_player" === t.id) {
                            var l = t.parentNode.id, d = l && l.match(/video_box_wrap(-?\d+)_(-?\d+)/);
                            if (d) return d.shift(), d = d.map((function(e) {
                                return parseInt(e);
                            })), Object(H.a)(d, (e, t) => {
                                let n = window.mvcur;
                                var o = "video" + e + "_" + t;
                                return n && n.listId && (o = "" + o), {
                                    path: o
                                };
                            }).then(t => {
                                if (t) return o({
                                    request: {
                                        hosting: "vk",
                                        action: "getVKLinks",
                                        extVideoId: t.path,
                                        oidVid: d
                                    }
                                }, e);
                            });
                        }
                        if ("html5_player" === t.id) return Object(H.a)(() => window.html5video && window.html5video.vars ? window.html5video.vars : o()).then(t => {
                            var n = oe.getLinksFromHtml5MetaData(t);
                            if (n) return o(n, e);
                        });
                        if ("A" === t.tagName) {
                            var c = t.href, p = Object(u.a)(c);
                            if (p.to) return r = n.embedDownloader.checkUrl(p.to), o(r ? {
                                request: r
                            } : null, e);
                        }
                        return o(null, e);
                    }
                },
                preparePladformLinks: function(e) {
                    e && "getRutubeLinks" === e.action && (e.links = null);
                    var t = e && e.links, n = "noname", o = {};
                    if (t) for (var r, a = 0; r = t[a]; a++) n = r.title, o[r.quality] && (r.quality = 0), 
                    o[r.quality.toUpperCase()] = r.url;
                    return {
                        title: n,
                        links: o
                    };
                },
                prepareLinks: function(e) {
                    var t = e.title, n = [];
                    for (var o in e.links) {
                        var r = e.links[o], a = r.match(/[\w]+\.(mp4|flv)(?:\?|$)/i), i = (a = a ? a[1] : "flv").toUpperCase();
                        n.push({
                            href: r,
                            quality: o,
                            title: t,
                            ext: a,
                            format: i,
                            forceDownload: !0
                        });
                    }
                    return n;
                },
                getVideoLinksAsAjax: function(e) {
                    var t = /video(-?\d+_-?\d+)/.exec(e);
                    t = t && t[1];
                    var n = Object(u.a)(e).list;
                    return ae._getModuleName().then((function(e) {
                        return new Promise((function(o) {
                            re.getLinkAsAjax([ t, n ], (function(e, t) {
                                o({
                                    hosting: t,
                                    response: e
                                });
                            }), e);
                        }));
                    }));
                },
                async prepareVideoLinks(e) {
                    let t = [];
                    if (e && e.oidVid) {
                        const [n, o] = e.oidVid;
                        let r = await oe.getLinksFromMv(n, o);
                        r && t.push(...oe.prepareLinks(r));
                    }
                    const r = await Object(x.a)(e);
                    if (r) if ("getPladformVideo" === e.action) o.showUmmyItem && "getRutubeLinks" === r.action ? t.push(...n.popupMenu.prepareLinks.rutube(r.links)) : t.push(...oe.prepareLinks(oe.preparePladformLinks(r))); else if (r.links) {
                        const e = n.embedDownloader.reMapHosting(r.action);
                        e && t.push(...n.popupMenu.prepareLinks[e](r.links, r.title));
                    }
                    if (!t.length && "getVKLinks" === e.action) {
                        const {hosting: o, response: r} = await oe.getVideoLinksAsAjax(e.extVideoId);
                        r && r.links && (r.isUmmy ? t.push(...r.links) : t.push(...n.popupMenu.prepareLinks[o](r.links, r.title)));
                    }
                    let a = t.filter(e => -1 !== e.href.indexOf("mycdn.me/")), i = t.filter(e => -1 !== e.href.indexOf("vkuser"));
                    if ((a.length || i || t.length <= 2) && e.extVideoId) {
                        let n = {}, o = document.querySelector('a[href*="' + e.extVideoId + '"]');
                        if (o && o.dataset.length) {
                            let e = o.closest('[id*="post"]');
                            e && (n.post_id = e.dataset.postId), n.list = o.dataset.list, n.paylist_id = "wall_" + o.dataset.video.split("_")[0];
                        }
                        n.video = e.extVideoId.split("?")[0].replace("video", "");
                        const a = location.href.match(/pl_(wall_.\d+)/);
                        a && a[1] && (n.playlist_id = a[1]);
                        const i = document.querySelector(`a[data-video="${n.video}"]`);
                        i && i.dataset.list && (n.list = i.dataset.list);
                        const s = await Object(b.a)({
                            type: "POST",
                            url: "https://vk.com/al_video.php?act=show",
                            data: Y({
                                act: "show",
                                al: 1,
                                autoplay: 1,
                                module: "groups"
                            }, n)
                        }), {hls: l, mp4: u} = await async function(e, t) {
                            let n = Object(I.a)(t, /:"(https:\\\/\\\/[a-z0-9\-]{3,15}\.vkuservideo\.net.*?\.(\d+)\.mp4.*?)",/gm).filter(e => e[1]).map(e => {
                                const [t, n, o] = e;
                                return {
                                    href: n,
                                    quality: o,
                                    format: "MP4"
                                };
                            }), o = Object(I.a)(t, /RESOLUTION=(.*?)\\n(http.*?)\\n/gm).filter(e => e[1]).map(e => {
                                const [t, n, o] = e;
                                return {
                                    quality: n.split("x").length > 1 ? n.split("x")[1] : n,
                                    href: o,
                                    format: "HLS",
                                    noSize: !0
                                };
                            }), r = Object(I.a)(t, /hls":"(.*?)",/gm).filter(e => e[1]).map(e => e[1]).pop(), a = await Object(b.a)(r).then(e => e.body), i = Object(I.a)(a, /QUALITY=(.*?),RESOLUTION=(.*?)\n(.*?)\n/gm);
                            return o.push(...i.filter(e => e[1]).map(t => {
                                const [n, o, r, a] = t;
                                return {
                                    quality: o.split("x").length > 1 ? o.split("x")[1] : o,
                                    href: a,
                                    format: "MP4",
                                    noSize: !0,
                                    func: t => {
                                        t.preventDefault(), t.stopPropagation(), Object(B.a)(Object(R.e)(T.a, {
                                            filename: e + ".mp4",
                                            format: "mp4",
                                            sources: [ {
                                                url: a
                                            } ],
                                            convertType: "hls"
                                        }), "sf-muxer-parent");
                                    }
                                };
                            })), o = o.map(E), {
                                hls: q(o, "href"),
                                mp4: q(n, "href"),
                                dash: []
                            };
                        }(r.title, s.body);
                        t.push(...u, ...l), t = q(t, "href");
                    }
                    return t = await async function(e, t) {
                        const n = [];
                        for (let o = 0; o < e.length; o++) if (t && t(e[o])) n.push(e[o]); else if (-1 !== e[o].href.indexOf("http")) {
                            await F(e[o].href) && n.push(e[o]);
                        } else n.push(e[o]);
                        return n;
                    }(q(t, "quality", "itag"), e => 22 == e.itag), t = t.map(e => (e.title = "." === e.title ? "video-" + e.quality : e.title, 
                    e)), t;
                },
                newAppendButton: function(e, t) {
                    if (!e) return;
                    Object(G.a)({
                        category: "append",
                        subcategory: "vk",
                        event: "b"
                    });
                    var o = t.querySelector("#mv_info"), a = o && o.querySelector(".mv_actions_block .like_cont .like_btns");
                    o = null;
                    const i = e => e ? e.querySelector("#mv_top_controls, #VideoLayerInfo__topControls") : null;
                    var s = i(t);
                    if (s || (s = i(t.closest("#mv_container"))), a && ne.elIsHidden(a) && (a = null), 
                    a || s) {
                        for (var l, u = !(a || !s), d = t.querySelectorAll(".savefrom_vk_download"), c = 0; l = d[c]; c++) l.parentNode.removeChild(l);
                        l = null, d = null;
                        var p = w.a.create("div", {
                            class: [ "savefrom_vk_download", "sf-under-video" ],
                            style: {
                                cursor: "pointer"
                            },
                            on: [ [ "click", async function(o) {
                                if (o.stopPropagation(), y.a.onRemoveEvent(this, V.hideMenu), V.contextMenu && V.contextMenu.isShow) return void V.hideMenu();
                                var a = V.contextMenu = n.popupMenu.quickInsert(this, r.a.i18n.getMessage("download") + "...", "sf-single-video-menu", {
                                    parent: t
                                });
                                if (e.isUmmy) return void a.update(e.links);
                                let i = await oe.prepareVideoLinks(e.request);
                                return i = i.map(e => ("MP4" === e.format && (e.forceDownload = !0), e)), a.update(i);
                            } ], [ "mousedown", function(e) {
                                e.stopPropagation();
                            } ], [ "keydown", function(e) {
                                e.stopPropagation();
                            } ] ]
                        });
                        if (a) {
                            w.a.create(p, {
                                class: [ "like_btn" ],
                                append: [ w.a.create("div", {
                                    class: [ "like_button_icon" ],
                                    append: [ w.a.create("img", {
                                        src: n.svg.getSrc("download", "#828a99"),
                                        width: 16,
                                        height: 16,
                                        style: {
                                            margin: "4px"
                                        }
                                    }) ]
                                }), w.a.create("div", {
                                    class: [ "like_button_label" ],
                                    text: r.a.i18n.getMessage("download")
                                }) ]
                            });
                            var f = a.querySelector(".ui_actions_menu_wrap");
                            f ? f.parentNode.insertBefore(p, f) : a.appendChild(p);
                        } else if (u) {
                            w.a.create(p, {
                                class: [ "mv_top_button" ],
                                style: {
                                    textAlign: "center"
                                },
                                append: [ w.a.create("img", {
                                    class: [ "mv_small_close_icon" ],
                                    style: {
                                        backgroundImage: "none",
                                        width: "20px",
                                        height: "20px"
                                    },
                                    src: n.svg.getSrc("download", "#FFFFFF"),
                                    width: 20,
                                    height: 20
                                }) ]
                            });
                            var h = s.firstChild;
                            if (h) if (ne.elIsHidden(s.lastChild)) {
                                for (;h.nextElementSibling && !ne.elIsHidden(h.nextElementSibling); ) h = h.nextElementSibling;
                                h.parentNode.insertBefore(p, h);
                            } else s.appendChild(p); else s.appendChild(p);
                        }
                    }
                },
                newClipButton: function(e, t) {
                    setTimeout(() => {
                        if (!e) return;
                        Object(G.a)({
                            category: "append",
                            subcategory: "vk",
                            event: "b"
                        });
                        let o = t.closest(".ShortVideoPost");
                        o || (o = t);
                        let a = o.querySelector(".like_btns");
                        a || (a = o.querySelector(".like_cont"));
                        let i = t.closest("#mv_layer_wrap");
                        const s = w.a.create("div", {
                            id: "savefrom__yt_btn",
                            style: {
                                display: "flex",
                                marginLeft: "10px",
                                verticalAlign: "middle"
                            },
                            append: [ w.a.create("a", {
                                class: "sf-quick-dl-btn",
                                href: "javascript:void(0)",
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
                                    color: "#fff",
                                    marginRight: "8px"
                                },
                                append: [ w.a.create("i", {
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
                                }) ],
                                on: [ [ "click", async function(t) {
                                    if (t.stopPropagation(), y.a.onRemoveEvent(this, V.hideMenu), V.contextMenu && V.contextMenu.isShow) return void V.hideMenu();
                                    var o = V.contextMenu = n.popupMenu.quickInsert(this, "Скачивается...", "sf-single-video-menu", {
                                        parent: a
                                    }, "clip");
                                    if (e.isUmmy) return void o.update(e.links);
                                    let r = await oe.prepareVideoLinks(e.request);
                                    if (r = r.map(e => ("MP4" === e.format && (e.forceDownload = !0), e)), 0 === r.length) return this.href = i.querySelector("video").src, 
                                    Object(x.a)({
                                        action: "downloadVkStory",
                                        downloadFileUrl: this.href,
                                        fileName: Date.now() + ".mp4"
                                    });
                                    this.href = (e => {
                                        let t = e[0].quality, n = 0;
                                        for (let o = 0; o < e.length; o++) t < e[o].quality && (t = e[o].quality, n = o);
                                        return e[n].href;
                                    })(r), this.click(), this.href = "javascript:void(0)", t.preventDefault();
                                } ] ]
                            }), w.a.create("style", {
                                text: Object(f.a)({
                                    selector: "#savefrom__yt_btn",
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
                            }), w.a.create("button", {
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
                                on: [ [ "click", async function(t) {
                                    if (t.stopPropagation(), y.a.onRemoveEvent(this, V.hideMenu), V.contextMenu && V.contextMenu.isShow) return void V.hideMenu();
                                    var o = V.contextMenu = n.popupMenu.quickInsert(this, r.a.i18n.getMessage("download") + "...", "sf-single-video-menu", {
                                        parent: a
                                    }, "clip");
                                    if (e.isUmmy) return void o.update(e.links);
                                    let i = await oe.prepareVideoLinks(e.request);
                                    return i = i.map(e => ("MP4" === e.format && (e.forceDownload = !0), e)), o.update(i);
                                } ], [ "mousedown", function(e) {
                                    e.stopPropagation();
                                } ], [ "keydown", function(e) {
                                    e.stopPropagation();
                                } ] ],
                                append: [ w.a.create("i", {
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
                                }), w.a.create("span", {
                                    text: "HD"
                                }) ]
                            }) ]
                        });
                        a && (a.querySelector("#savefrom__yt_btn") || a.append(s));
                    }, 500);
                },
                appendNewFrameBtn: function(e, t) {
                    var a = this;
                    if (!t.querySelector(".savefrom_vk_download")) {
                        var i = n.frameMenu.getBtn({
                            singleBtn: !0,
                            btnId: a.btnBoxId,
                            containerStyle: {
                                top: "10px",
                                right: "10px"
                            },
                            on: [ [ "click", function(t) {
                                if (t.preventDefault(), t.stopPropagation(), V.contextMenu && V.contextMenu.isShow) V.hideMenu(); else {
                                    var s = V.contextMenu = n.frameMenu.getMenu(this, r.a.i18n.getMessage("download") + "...", "sf-frame-menu", {
                                        container: i.container,
                                        onShow: function() {
                                            i.node.classList.add("sf-over");
                                        },
                                        onHide: function() {
                                            V.contextMenu = null, i.node.classList.remove("sf-over");
                                        }
                                    });
                                    if (e.request) {
                                        var l = function(t) {
                                            var i = r.a.i18n.getMessage("noLinksFound");
                                            if (t && "getPladformVideo" === e.request.action) i = o.showUmmyItem && "getRutubeLinks" === t.action ? n.popupMenu.prepareLinks.rutube(t.links) : a.prepareLinks(a.preparePladformLinks(t)); else if (t && t.links) {
                                                var l = n.embedDownloader.reMapHosting(t.action);
                                                l && (i = n.popupMenu.prepareLinks[l](t.links, t.title));
                                            }
                                            s.update(i);
                                        };
                                        try {
                                            r.a.sendMessage(e.request, l);
                                        } catch (t) {
                                            l();
                                        }
                                    } else s.update(a.prepareLinks(e));
                                    !1;
                                }
                            } ], [ "mousedown", function(e) {
                                e.stopPropagation(), 2 === e.button && (V.hideMenu(), i.container.parentNode && i.container.parentNode.removeChild(i.container));
                            } ] ]
                        });
                        i.container = w.a.create("div", {
                            class: "sf-btn-ctr",
                            append: i.node
                        }), i.node.appendChild(w.a.create("style", {
                            text: Object(f.a)([ {
                                selector: [ "body:hover .sf-btn-ctr #" + a.btnBoxId, "body:hover .sf-btn-ctr .sf-frame-menu" ],
                                style: {
                                    display: "block"
                                }
                            } ])
                        })), document.body.appendChild(i.container);
                    }
                },
                addFrameBtn: function() {
                    var e = document.getElementById("page_wrap");
                    e && oe.getLinksFromFrame((function(t, n) {
                        t || oe.appendNewFrameBtn(n, e);
                    }));
                }
            }, re = {
                linkDataAttr: "savefromHasBtn",
                getLinkAsAjaxRequest: function(e, t) {
                    t = t || 0;
                    var n = Object.assign({}, e), o = function() {
                        if (t < 1) return re.getLinkAsAjaxRequest(e, ++t);
                        e.error && e.error();
                    }, r = n.data;
                    0 === t ? r.act = "show_inline" : 1 === t && (r.act = "show"), Object(v.a)(n, (function(t, n, r) {
                        return t || !r || -1 !== r.indexOf('href="/join"') ? o() : void e.success(r);
                    }));
                },
                getVideoDataFromLink: function(e) {
                    var t = e.getAttribute("onclick"), n = /showVideo\(['"]{1}([^'"]+)['"]{1},.?['"]{1}([^'"]+)['"]{1},.*\)/.exec(t);
                    return n && n.shift(), n;
                },
                getLinkAsAjax: function(e, t, a) {
                    re.getLinkAsAjaxRequest({
                        localXHR: 1,
                        type: "POST",
                        url: "/al_video.php",
                        data: {
                            list: e[1],
                            video: e[0],
                            act: "show_inline",
                            module: a,
                            al: 1
                        },
                        success: function(e) {
                            if (!e) return t();
                            var a = e.match(/<iframe[^>]+src=['"]{1}([^'">]+)['"]{1}[^>]+>/i);
                            if (a || (a = e.match(/var\s+opts\s+=\s+({[^}]*})/im)) && (a = a[1].match(/url:\s+['"]{1}([^'"]+)['"]{1}/i)) && 0 !== a[1].indexOf("//") && 0 !== a[1].indexOf("http") && (a = null), 
                            a) {
                                var i = a[1];
                                if (o.showUmmyItem && oe.isRutubeLink(i)) return t(oe.getRutubeLinks(i));
                                if (0 === i.indexOf("//") && (i = "http:" + i), 0 !== i.indexOf("http")) return t();
                                var s = n.embedDownloader.checkUrl(i);
                                if (!s) return t();
                                var l = {
                                    action: s.action,
                                    extVideoId: s.extVideoId
                                };
                                r.a.sendMessage(l, (function(e) {
                                    var o = s.hosting;
                                    return e.action !== l.action && (o = n.embedDownloader.reMapHosting(e.action)), 
                                    t(e, o);
                                }));
                            } else Object(x.a)({
                                action: "getVkLinksFromData",
                                data: e
                            }).then((function(e) {
                                return t(e, "vk");
                            })).catch((function() {
                                return t({}, "vk");
                            }));
                        },
                        error: function() {
                            t();
                        }
                    });
                },
                addDownloadBtn: function(e) {
                    var t = e.href;
                    const o = {
                        display: "inline-block",
                        width: "16px",
                        height: "16px",
                        marginLeft: "5px",
                        backgroundImage: "url(" + n.svg.getSrc("download", "#78A2CC") + ")",
                        backgroundRepeat: "no-repeat",
                        marginBottom: "-4px"
                    };
                    var a = w.a.create("a", {
                        href: "http://savefrom.net/?url=" + encodeURIComponent(t),
                        style: o,
                        on: [ "click", function(e) {
                            if (e.preventDefault(), y.a.onRemoveEvent(i, V.hideMenu), V.contextMenu && V.contextMenu.isShow) V.hideMenu(); else {
                                var t = document.querySelector("#wk_box");
                                t && t.contains(this) || (t = null);
                                var o = {
                                    parent: t
                                }, s = this.getAttribute(n.embedDownloader.dataAttr), l = n.embedDownloader.checkUrl(s);
                                if (l) {
                                    var u = {
                                        action: l.action,
                                        extVideoId: l.extVideoId
                                    }, d = V.contextMenu = n.popupMenu.quickInsert(a, r.a.i18n.getMessage("download") + " ...", "sf-popupMenu", o);
                                    oe.prepareVideoLinks(u).then(e => {
                                        e.map(e => ("MP4" === e.format && (e.forceDownload = !0), e)), d.update(e);
                                    });
                                } else V.contextMenu = n.popupMenu.quickInsert(a, r.a.i18n.getMessage("noLinksFound"), "sf-popupMenu", o);
                            }
                        } ]
                    });
                    a.setAttribute(n.embedDownloader.dataAttr, t);
                    var i = w.a.create("span", {
                        class: "sf-video-feed-container",
                        on: [ "click", function(e) {
                            e.stopPropagation();
                        } ],
                        append: [ a ]
                    }), s = e.querySelector(".post_video_title");
                    s ? s.appendChild(i) : e.appendChild(i);
                },
                onLinkHover: function() {
                    if ("A" === this.tagName) {
                        var e = this.href || "";
                        0 === this.id.indexOf("post_media_lnk") && -1 !== e.indexOf("/video") && (V.contextMenu && V.contextMenu.isShow && V.hideMenu(), 
                        this.dataset[re.linkDataAttr] || (this.dataset[re.linkDataAttr] = 1, re.addDownloadBtn(this)));
                    }
                },
                off: function() {
                    for (var e, t = document.querySelectorAll(".sf-video-feed-container"), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                    var o = Object(c.a)(re.linkDataAttr), r = document.querySelectorAll("*[" + o + "]");
                    for (n = 0; e = r[n]; n++) e.removeAttribute(o);
                }
            }, ae = {
                photoCache: {},
                getAlbumId: function(e) {
                    if (!/(\?|&|#)act=edit/i.test(e)) {
                        var t = [];
                        t.push(e);
                        var n = Object(u.a)(e);
                        n.w && t.push(n.w), n.z && t.push.apply(t, n.z.split("/")), /#/.test(e) && (t.push(e.substr(e.indexOf("#") + 1)), 
                        t.push(decodeURIComponent(e.substr(e.indexOf("#") + 1)))), t.reverse();
                        var o = null, r = null;
                        return t.some((function(e) {
                            if (r = e.match(/(?:\/|#|=|^)(albums?|tag|photos|feed(?:\d+)?_|wall)(-?\d+)(?:_(\d+))?/i)) return r[3] ? o = /^(feed|wall)/.test(r[1]) ? r[1] + r[2] + "_" + r[3] : "album" + r[2] + "_" + r[3] : ("albums" == r[1] && (r[1] = "photos"), 
                            o = r[1] + r[2]), !0;
                        })), o;
                    }
                },
                getModuleName: function(e) {
                    var t = w.a.create("script", {
                        text: "(" + 'function(){if(window.cur&&window.cur.module&&typeof window.cur.module==="string"){document.body.dataset["{dataArg}"]=window.cur.module}}'.replace("{dataArg}", "sfModule") + ")();"
                    });
                    document.body.appendChild(t), setTimeout((function() {
                        t.parentNode.removeChild(t), e(document.body.dataset.sfModule);
                    }), 0);
                },
                isReply: function(e) {
                    return Object(h.a)(e, ".replies " + e.tagName) || Object(h.a)(e, ".wl_replies " + e.tagName);
                },
                getWallPostContent: function() {
                    var e = location.href.match(/wall(-?\d+_\d+)/);
                    if (e = e && e[1]) return document.getElementById("post" + e) || document.getElementById("wpt" + e);
                },
                getPopup: function(e, t, o) {
                    var a, i = n.playlist.getInfoPopupTemplate();
                    w.a.create(i.textContainer, {
                        append: [ w.a.create("p", {
                            text: e,
                            style: {
                                color: "#0D0D0D",
                                fontSize: "20px",
                                marginBottom: "11px",
                                marginTop: "13px"
                            }
                        }), a = w.a.create("p", {
                            text: "",
                            style: {
                                color: "#868686",
                                fontSize: "14px",
                                lineHeight: "24px"
                            }
                        }) ]
                    });
                    var s = n.popupDiv(i.body, "sf_progress_popup", void 0, void 0, o), l = function e(n) {
                        e.state !== n && (e.state = n, i.buttonContainer.style.display = "none", a.style.display = "none", 
                        r.a.sendMessage({
                            action: "getWarningIcon",
                            type: t,
                            color: "#77D1FA"
                        }, (function(e) {
                            i.icon.style.backgroundImage = "url(" + e + ")";
                        })), "progress" === n && (a.style.display = "block"), "error" === n && (r.a.sendMessage({
                            action: "getWarningIcon",
                            type: t,
                            color: "#AAAAAA"
                        }, (function(e) {
                            i.icon.style.backgroundImage = "url(" + e + ")";
                        })), a.style.display = "block"));
                    };
                    return {
                        onPrepare: function(e) {
                            l("progress"), a.textContent = e;
                        },
                        onProgress: function(e, t) {
                            a.textContent = r.a.i18n.getMessage("vkFoundFiles").replace("%d", e) + " " + r.a.i18n.getMessage("vkFoundOf") + " " + t;
                        },
                        onReady: function() {
                            y.a.trigger(s, "kill");
                        },
                        onError: function(e) {
                            l("error"), a.textContent = e;
                        }
                    };
                },
                getLayer: function() {
                    var e = document.getElementById("layer_wrap");
                    return null !== e && "none" !== e.style.display && 0 !== e.textContent.length || (e = null), 
                    null === e && (null !== (e = document.getElementById("wk_layer_wrap")) && "none" !== e.style.display && 0 !== e.textContent.length || (e = null)), 
                    e;
                },
                _getAlbumLinks: function(e, t) {
                    var n = this, o = n.photoCache, r = "";
                    /albums|tags|photos/.test(location.href) && (r = W());
                    var a = {}, i = [], s = 0, l = 0, u = 0, c = 0;
                    return function p() {
                        return function(r) {
                            if (t.abort) return Promise.reject(new Error("Abort"));
                            var i = {
                                act: "show",
                                al: 1,
                                list: e
                            };
                            return r && (i.offset = r), Object(b.a)({
                                type: "POST",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded",
                                    "X-Requested-With": "XMLHttpRequest"
                                },
                                url: "/al_photos.php",
                                data: i,
                                localXHR: !0,
                                timeout: 6e4
                            }).then((function(e) {
                                var t = $(e.body), r = t[6], i = t[8];
                                s || (s = i.length), l = r, u || (u = Math.ceil(r / s));
                                var c = [], p = "";
                                return i.forEach((function(e) {
                                    if (!a[e.id]) {
                                        a[e.id] = 1;
                                        var t = n.getMaxPhotoSize(e);
                                        t && (!p && e.album && (p = _.a.decodeSpecialChars(Object(d.a)(e.album.replace(/<[^>]+>/g, "")))), 
                                        t.id = e.id, o[e.id] = t, c.push(t));
                                    }
                                })), new Promise((function(e) {
                                    setTimeout(e, 250);
                                })).then((function() {
                                    return {
                                        title: p,
                                        list: c
                                    };
                                }));
                            }));
                        }(c * s).then((function(e) {
                            if (u--, c++, i.push.apply(i, e.list), t.onProgress && t.onProgress(i.length, l), 
                            r || (r = e.title), u > 0) return p();
                        }));
                    }().then((function() {
                        if (Object.keys(o).slice(1e3).forEach((function(e) {
                            delete o[e];
                        })), !i.length) throw new Error("Album is empty");
                        return r || (r = W()), {
                            title: r,
                            list: i
                        };
                    }), (function(e) {
                        throw "Abort" !== e.message && ee.debug("Get photo page error!", e), e;
                    }));
                },
                _getPhotoLinks: function(e, t, n) {
                    var o = this;
                    return o._getModuleName().then((function(r) {
                        return function(r) {
                            if (n.abort) return Promise.reject(new Error("Abort"));
                            var a = {
                                act: "show",
                                al: 1,
                                list: t,
                                module: r,
                                photo: e
                            };
                            return Object(b.a)({
                                type: "POST",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded",
                                    "X-Requested-With": "XMLHttpRequest"
                                },
                                url: "/al_photos.php",
                                data: a,
                                localXHR: !0,
                                timeout: 6e4
                            }).then((function(t) {
                                var n = $(t.body)[8], r = null;
                                if (n.some((function(t) {
                                    if (t.id === e) return r = o.getMaxPhotoSize(t), !0;
                                })), !r) throw new Error("Photo is is not found!");
                                return new Promise((function(e) {
                                    setTimeout(e, 250);
                                })).then((function() {
                                    return r;
                                }));
                            }));
                        }(r);
                    })).catch((function(e) {
                        throw "Abort" !== e.message && ee.debug("Get photo error!", e), e;
                    }));
                },
                _getModuleName: function() {
                    return new Promise((function(e, t) {
                        var n = w.a.create("script", {
                            text: '(function(dataArg){if(window.cur&&window.cur.module&&typeof window.cur.module==="string"){document.body.dataset[dataArg]=window.cur.module}})(' + JSON.stringify("sfModule") + ");"
                        });
                        document.body.appendChild(n), setTimeout((function() {
                            n.parentNode.removeChild(n), e(document.body.dataset.sfModule);
                        }), 0);
                    }));
                },
                _getAlbumLinksViaDom: function(e, t) {
                    var n = this, o = n.photoCache;
                    if (t.abort) return Promise.reject(new Error("Abort"));
                    var r = /showPhoto\s*\(\s*["']([-\d_]+)["']\s*,\s*["']([\w\-]+)["']/i, a = /\{["']?temp["']?\s*:\s*(\{.+?\})/i, i = /(\{|,)\s*(\w+)\s*:/gi, s = {}, l = [], u = function(e) {
                        if (!ae.isReply(e) && !ne.elIsHidden(e)) {
                            var t = e.getAttribute("onclick"), o = r.exec(t);
                            if (o) {
                                var u = o[1];
                                if (!s[u]) {
                                    s[u] = 1;
                                    var d = o[2], c = null, p = a.exec(t);
                                    if (p) {
                                        p = p[1].replace(i, '$1"$2":');
                                        var f = null;
                                        try {
                                            f = JSON.parse(p);
                                        } catch (e) {}
                                        c = f && n.getMaxPhotoSize(f);
                                    }
                                    c || (c = {}), c.id = u, c.listId = d, l.push(c);
                                }
                            }
                        }
                    };
                    if ([].slice.call(e.querySelectorAll("a[onclick]")).forEach(u), 0 === l.length && e !== document) {
                        var d = n.getWallPostContent();
                        d && [].slice.call(d.querySelectorAll("a[onclick]")).forEach(u);
                    }
                    return function(e) {
                        var r = Promise.resolve(), a = [], i = e.filter((function(e) {
                            var t = o[e.id];
                            return !t || (a.push(t), !1);
                        }));
                        return t.onProgress && t.onProgress(a.length, e.length), i.forEach((function(i) {
                            r = r.then((function() {
                                return n._getPhotoLinks(i.id, i.listId, t).then((function(n) {
                                    o[i.id] = n, a.push(n), t.onProgress && t.onProgress(a.length, e.length);
                                }), (function(n) {
                                    if ("Abort" === n.message) throw n;
                                    i.url && (a.push(i), t.onProgress && t.onProgress(a.length, e.length), ee.debug("Photo link from dom", n));
                                }));
                            }));
                        })), r = r.then((function() {
                            if (Object.keys(o).slice(1e3).forEach((function(e) {
                                delete o[e];
                            })), !a.length) throw new Error("Photos is not found");
                            return {
                                list: a
                            };
                        }));
                    }(l);
                },
                _getLinks: function(e, t) {
                    var o = this, a = Promise.resolve(), i = {}, s = o.getPopup(W(), "photo", (function() {
                        i.abort = !0;
                    }));
                    i.onProgress = function(e, t) {
                        s.onProgress(e, t);
                    }, s.onPrepare(r.a.i18n.getMessage("download") + " ...");
                    var l = function() {
                        if ((e = e || document) === document) {
                            var t = o.getLayer();
                            t && (e = t);
                        }
                        return o._getAlbumLinksViaDom(e, i);
                    };
                    return a = (a = t ? a.then((function() {
                        return o._getAlbumLinks(t, i);
                    })).catch((function(e) {
                        throw "Album is empty" !== e.message && "Abort" !== e.message && ee.debug("findAlbumLinks error", e), 
                        e;
                    })).catch((function() {
                        return l();
                    })) : a.then(l)).then((function(e) {
                        var t = e.title, r = function(e) {
                            var t = [];
                            e.forEach((function(e) {
                                var n = e.url, r = o.getFilenameFromUrl(n);
                                r || (r = "unknown.jpg"), t.push({
                                    filename: r,
                                    url: n
                                });
                            }));
                            var n = String(t.length).length;
                            return t.forEach((function(e, t) {
                                for (var o = String(t + 1); o.length < n; ) o = "0" + o;
                                e.filename = o + "-" + e.filename;
                            })), t;
                        }(e.list);
                        s.onReady(), t || (t = W()), S ? n.downloadList.showBeforeDownloadPopup(r, {
                            count: r.length,
                            folderName: t,
                            type: "photo",
                            onShowList: function() {
                                o.showListOfLinks(t, r, !0);
                            }
                        }) : o.showListOfLinks(t, r, !0);
                    }), (function(e) {
                        "Abort" !== e.message && ee.debug("_getLinks error", e), s.onError(r.a.i18n.getMessage("noLinksFound"));
                    }));
                },
                rmPhotoAlbumDlBtn: function() {
                    for (var e, t = document.querySelectorAll([ ".sf-dl-ablum-btn-divide", ".sf-dl-ablum-btn" ]), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                },
                addNewPhotoAlbumDlBtn: function(e) {
                    var t = this, n = e.querySelector(".photos_album_intro_info"), o = e.querySelector(".page_block_header_extra"), a = n || o;
                    if (a && !a.querySelector(".sf-dl-ablum-btn")) {
                        var i = w.a.create("a", {
                            text: r.a.i18n.getMessage("vkDownloadPhotoAlbum"),
                            href: "#",
                            class: "sf-dl-ablum-btn",
                            on: [ "click", function(n) {
                                n.preventDefault();
                                var o = ae.getAlbumId(location.href);
                                t._getLinks(e, o);
                            } ]
                        }), s = w.a.create("span", {
                            append: i
                        });
                        n ? (s.classList.add("photos_album_info"), s = w.a.create(document.createDocumentFragment(), {
                            append: [ w.a.create("span", {
                                class: "divide sf-dl-ablum-btn-divide",
                                text: "|"
                            }), s ]
                        })) : o && (s.classList.add("photos_comments_link"), s.style.margin = "0 15px"), 
                        a.appendChild(s);
                    }
                },
                getContainer: function() {
                    var e = document.getElementById("photos_albums_container");
                    return e || (e = document.getElementById("photos_container")), e;
                },
                getFilenameFromUrl: function(e) {
                    var t = /\/([\w\-]+\.[a-z0-9]{3,4})(?:\?|$)/i.exec(e);
                    return t = t && t[1] || "";
                },
                rmCurrentPhotoBtn: function(e) {
                    for (var t, n = void 0, o = document.querySelectorAll(".sf-dl-current-photo-btn"), r = 0; t = o[r]; r++) e && e.contains(t) ? n = t : t.parentNode.removeChild(t);
                    return n;
                },
                style: null,
                injectStyle: function() {
                    this.style ? this.style.parentNode || document.head.appendChild(this.style) : (this.style = w.a.create("style", {
                        text: Object(f.a)({
                            "div > .sf-dl-current-photo-btn": {
                                display: "none",
                                border: "1px solid #F8F8F8",
                                width: "20px",
                                height: "20px",
                                padding: 0,
                                position: "absolute",
                                background: "url(" + n.svg.getSrc("download", "#777777") + ") center no-repeat #F8F8F8",
                                backgroundSize: "12px",
                                top: "20px",
                                left: "30px",
                                zIndex: 10,
                                cursor: "pointer"
                            },
                            "div > .sf-dl-current-photo-btn.sf-style-black": {
                                border: 0,
                                background: "url(" + n.svg.getSrc("download", "#FFF") + ") center no-repeat #000",
                                backgroundSize: "14px",
                                padding: "2px 4px",
                                borderRadius: "2px",
                                opacity: .4,
                                transition: "opacity 100ms linear"
                            },
                            "div > .sf-dl-current-photo-btn:hover": {
                                background: "url(" + n.svg.getSrc("download", "#00B75A") + ") center no-repeat #F8F8F8",
                                backgroundSize: "12px",
                                opacity: .8
                            },
                            "div > .sf-dl-current-photo-btn.sf-style-black:hover": {
                                background: "url(" + n.svg.getSrc("download", "#00B75A") + ") center no-repeat #000",
                                backgroundSize: "14px"
                            },
                            "div > .sf-dl-current-photo-btn:active": {
                                outline: 0,
                                boxShadow: "inset 0 3px 5px rgba(0, 0, 0, 0.125)"
                            },
                            "div:hover > .sf-dl-current-photo-btn": {
                                display: "block"
                            }
                        })
                    }), document.head.appendChild(this.style));
                },
                getMaxPhotoSize: function(e) {
                    var t = null, n = null;
                    [ "w", "z", "y", "x" ].some((function(o) {
                        return !!(t = e[o + "_"]) || (!!(n = e[o + "_src"]) || void 0);
                    })), t || (t = [ n ]);
                    var o, r;
                    return t[0] ? {
                        url: (o = e.base, r = t[0], r.match(/https?:\/\//i) ? ((r = new URL(r)).pathname.match(/\.[a-z]{3}$/i) || (r += ".jpg"), 
                        r.toString()) : (r.match(/\.[a-z]{3}$/i) || (r += ".jpg"), (o || "").replace(/\/[a-z0-9_:\.]*$/i, "") + "/" + r)),
                        width: t[2] && t[1],
                        height: t[1] && t[2]
                    } : null;
                },
                getNewCurrentPhotoLink: function(e, t) {
                    return e ? Object(H.a)([ e ], e => {
                        let t = {};
                        return "undefined" != typeof cur && cur.pvCurPhoto && cur.pvCurPhoto.id === e && (t = cur.pvCurPhoto), 
                        t;
                    }).then(e => {
                        if (!e || !e.id) return t("ID is not found");
                        let n = this.getMaxPhotoSize(e);
                        return n ? t(null, n) : t("URL is not found!");
                    }) : t("ID is empty!");
                },
                addNewDlCurrentPhotoBtn: function(e) {
                    var t = e;
                    if (Object(G.a)({
                        category: "append",
                        subcategory: "vk",
                        event: "b"
                    }), !this.rmCurrentPhotoBtn(t)) {
                        var o = this, a = e.closest(".pv_photo_wrap");
                        if (a) {
                            var i = w.a.create("a", {
                                class: [ "sf-dl-current-photo-btn", "sf-style-black" ],
                                href: "#",
                                title: r.a.i18n.getMessage("download"),
                                on: [ [ "click", function(e) {
                                    if (e.stopPropagation(), e.preventDefault(), y.a.onRemoveEvent(this, V.hideMenu), 
                                    V.contextMenu && V.contextMenu.isShow) return void V.hideMenu();
                                    var i = V.contextMenu = n.popupMenu.quickInsert(this, r.a.i18n.getMessage("download") + " ...", "photoDlMenu", {
                                        parent: t
                                    });
                                    const s = a.querySelector(".like_wrap").classList;
                                    let l = null;
                                    return s.forEach(e => {
                                        const t = e.match(/photo(-?\d+_\d+)/);
                                        l = t && t[1];
                                    }), o.getNewCurrentPhotoLink(l, (function(e, t) {
                                        if (e) return i.update(r.a.i18n.getMessage("noLinksFound"));
                                        var n = _.a.modify(o.getFilenameFromUrl(t.url)), a = n.lastIndexOf("."), s = n.substr(a + 1), l = n.substr(0, a), u = [];
                                        u.push({
                                            href: t.url,
                                            title: l,
                                            quality: r.a.i18n.getMessage("download"),
                                            format: " ",
                                            ext: s,
                                            forceDownload: !0,
                                            isOther: !0,
                                            isBlank: !0,
                                            func: function() {
                                                "undefined" != typeof GM_info && "Tampermonkey" === GM_info.scriptHandler ? setTimeout(() => i.hide(), 2500) : i.hide();
                                            }
                                        }), u.push({
                                            href: "#getAlbum",
                                            title: "",
                                            quality: r.a.i18n.getMessage("vkDownloadPhotoAlbum"),
                                            format: " ",
                                            ext: "",
                                            noSize: !0,
                                            isOther: !0,
                                            func: function(e) {
                                                e.preventDefault(), ae.downloadPhoto(), i.hide();
                                            }
                                        }), i.update(u);
                                    }));
                                } ], [ "mousedown", function(e) {
                                    e.stopPropagation();
                                } ] ]
                            });
                            new M.a({
                                queries: [ {
                                    css: "#pv_photo img",
                                    is: "added",
                                    callback: () => {
                                        V.contextMenu && V.contextMenu.isShow && (V.hideMenu(), i.click());
                                    }
                                } ]
                            }), t.appendChild(i);
                        }
                    }
                },
                downloadPhoto: function() {
                    const e = this.getContainer();
                    let t = this.getAlbumId(location.href);
                    if (!t) {
                        const e = document.querySelector(".pv_album_name a");
                        e && !ne.elIsHidden(e) && (t = this.getAlbumId(e.href));
                    }
                    this._getLinks(e, t);
                },
                showListOfPhotosContent: function(e, t) {
                    var n;
                    return "<!DOCTYPE html><html>" + w.a.create("html", {
                        append: [ w.a.create("head", {
                            append: [ w.a.create("meta", {
                                attr: {
                                    charset: "utf-8"
                                }
                            }), w.a.create("style", {
                                text: "a,img{display:block;margin-bottom:5px;}p{width: 640px}"
                            }) ]
                        }), w.a.create("body", {
                            append: [ e, w.a.create("p", {
                                text: r.a.i18n.getMessage("vkListOfPhotosInstruction")
                            }), w.a.create("br"), w.a.create("br"), (n = document.createDocumentFragment(), 
                            t.forEach((function(e) {
                                var t = e.url, o = e.filename || "", r = w.a.create("img", {
                                    src: t,
                                    alt: "photo"
                                });
                                o && (r = w.a.create("a", {
                                    href: t,
                                    download: o,
                                    append: r
                                })), n.appendChild(r);
                            })), n) ]
                        }) ]
                    }).innerHTML + "</html>";
                },
                showListOfLinks: function(e, t, o) {
                    var a;
                    a = o ? w.a.create(document.createDocumentFragment(), {
                        append: [ w.a.create("p", {
                            append: [ w.a.create("a", {
                                text: r.a.i18n.getMessage("vkListOfPhotos"),
                                href: "#",
                                class: "sf__hidden",
                                style: {
                                    fontWeight: "bolder",
                                    border: "none",
                                    textDecoration: "underline"
                                },
                                on: [ "click", function(n) {
                                    n.preventDefault();
                                    var o = ae.showListOfPhotosContent(e, t), a = "";
                                    r.a.isChrome || r.a.isTM ? (a = Object(g.a)(o, "text/html", !0), r.a.sendMessage({
                                        action: "openTab",
                                        url: a
                                    })) : (a = Object(g.a)(o, "text/html"), window.open(a, "_blank"));
                                } ]
                            }) ]
                        }) ]
                    }) : "";
                    for (var i, s, l = "", u = 0; i = t[u]; u++) l += i.url + "\r\n";
                    var d = w.a.create(document.createDocumentFragment(), {
                        append: [ w.a.create("p", {
                            text: e,
                            style: {
                                color: "#0D0D0D",
                                fontSize: "20px",
                                marginBottom: "11px",
                                marginTop: "5px"
                            }
                        }), w.a.create("p", {
                            append: Object(k.a)(r.a.i18n.getMessage("vkListOfLinksInstruction"))
                        }), a, s = w.a.create("textarea", {
                            text: l,
                            cols: 60,
                            rows: 10,
                            style: {
                                width: "100%"
                            }
                        }), r.a.isChrome || r.a.isFirefox ? w.a.create("button", {
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
                                var t = this;
                                t.disabled = !0, r.a.isFirefox ? (s.select(), document.execCommand("copy")) : r.a.sendMessage({
                                    action: "addToClipboard",
                                    text: l
                                }), setTimeout((function() {
                                    t.disabled = !1;
                                }), 1e3);
                            } ],
                            append: w.a.create("style", {
                                text: Object(f.a)({
                                    "#savefrom_popup_box button:hover:not(:disabled)": {
                                        backgroundColor: "#597A9E !important",
                                        borderColor: "#597A9E !important",
                                        color: "#fff"
                                    },
                                    "#savefrom_popup_box button:active": {
                                        opacity: .9
                                    }
                                })
                            })
                        }) : void 0 ]
                    });
                    n.popupDiv(d);
                }
            }, ie = {
                mobileMenu: null,
                observer: null,
                styleEl: null,
                run: function() {
                    var e = this;
                    if (!M.a.isAvailable()) return;
                    if (e.observer) return e.observer.start();
                    e.observer = new M.a({
                        queries: [ {
                            css: "div.audio_item",
                            is: "added",
                            callback: t => {
                                for (let n, o = 0; n = t.added[o]; o++) n.dataset.sfSkip > 0 || (n.dataset.sfSkip = "1", 
                                e.insertAudioBtn(n));
                            }
                        }, {
                            css: "div.VideoPage",
                            is: "added",
                            callback: t => {
                                for (let n, o = 0; n = t.added[o]; o++) n.dataset.sfSkip > 0 || (n.dataset.sfSkip = "1", 
                                e.insertVideoBtn(n));
                            }
                        }, {
                            css: "." + y.a.onRemoveClassName,
                            is: "removed",
                            callback: e => {
                                for (let t, n = 0; t = e.removed[n]; n++) y.a.onRemoveListener(t);
                            }
                        } ]
                    }), e.insertStyle();
                },
                hideMenu: function() {
                    ie.mobileMenu && (ie.mobileMenu.hide(), ie.mobileMenu = null);
                },
                insertStyle: function() {
                    this.styleEl ? this.styleEl.parentNode || document.head.appendChild(this.styleEl) : (this.styleEl = w.a.create("style", {
                        class: "sf-style",
                        text: Object(f.a)([ {
                            selector: ".savefrom_vk_download.sf-audio",
                            style: {
                                display: "block",
                                float: "right",
                                borderRadius: "3px",
                                width: "22px",
                                height: "22px",
                                marginTop: "1px",
                                marginLeft: "3px",
                                marginRight: "3px",
                                background: "url(" + n.svg.getSrc("download", "#ffffff") + ") center no-repeat",
                                backgroundSize: "12px",
                                backgroundColor: "#5E80AA"
                            }
                        }, {
                            selector: ".audio_item .savefrom_vk_download.sf-audio",
                            style: {
                                position: "absolute",
                                right: "32px",
                                top: 0,
                                bottom: 0,
                                margin: "auto"
                            }
                        }, {
                            selector: ".audio_item.ai_current .savefrom_vk_download.sf-audio",
                            style: {
                                bottom: "auto",
                                top: "6px"
                            }
                        } ])
                    }), document.head.appendChild(this.styleEl));
                },
                getAudioUrlFromNode: async function(e) {
                    const t = await ne.getNewNodeTrackInfo(e);
                    if (!t.fullId || !t.actionHash || !t.urlHash) throw new Error("Track info not valid for fetch audio link");
                    const n = ne.requestReloadAudio(t.fullId, t.actionHash, t.urlHash), o = Object(H.a)([], "function(){return vk.id}");
                    return Promise.all([ n, o ]).then(e => {
                        let [t, n] = e, o = L(n, t.url);
                        return C(o) ? function(e) {
                            if (C(e)) {
                                const t = (e = e.replace("/index.m3u8", ".mp3")).split("/"), n = -1 !== e.indexOf("audios") ? 1 : 0;
                                return t.splice(t.length - (2 + n), 1), t.join("/");
                            }
                            return null;
                        }(o) : o;
                    });
                },
                onAudioBtnClick: function(e) {
                    if (e.preventDefault(), e.stopPropagation(), e.target.href) return n.downloadOnClick(e);
                    const t = e.target.closest(".audio_item");
                    t && this.getAudioUrlFromNode(t).then(t => {
                        e.target.href = t, n.downloadOnClick(e);
                    }).catch(e => {
                        ee.error("getAudioUrlFromNode error: " + e.message);
                    });
                },
                getAudioDlBtnNode: function(e) {
                    return w.a.create("a", {
                        class: [ "savefrom_vk_download", "sf-audio" ],
                        download: _.a.modify(e),
                        target: "_blank",
                        on: [ "click", this.onAudioBtnClick.bind(this) ],
                        title: r.a.i18n.getMessage("download")
                    });
                },
                insertAudioBtn: function(e) {
                    let t = null;
                    const n = e.querySelector(".ai_label");
                    if (n) {
                        const e = n.textContent.trim(), o = n.querySelector(".ai_title"), r = n.querySelector(".ai_artist"), a = o && o.textContent.trim(), i = r && r.textContent.trim();
                        t = a && i ? `${i.trim()} – ${a.trim()}` : e;
                    }
                    t = (t || "unknown") + ".mp3";
                    const o = e.querySelector(".ai_dur");
                    if (!o) return;
                    const r = o.parentNode, a = this.getAudioDlBtnNode(t), i = r.querySelector(".savefrom_vk_download");
                    if (i) i.parentNode.replaceChild(a, i); else {
                        const e = o.nextElementSibling;
                        if (!e) return;
                        r.insertBefore(a, e);
                    }
                },
                onVideoBtnClick: function(e, t) {
                    t.preventDefault(), t.stopPropagation(), ie.hideMenu();
                    var o = ie.mobileMenu = n.mobileLightBox.show(r.a.i18n.getMessage("download") + " ..."), a = r.a.i18n.getMessage("noLinksFound");
                    if (e.request) {
                        var i = function(t) {
                            if (t && "getPladformVideo" === e.request.action) a = oe.prepareLinks(oe.preparePladformLinks(t)); else {
                                var r = n.embedDownloader.reMapHosting(t.action);
                                r && t && t.links && (a = n.popupMenu.prepareLinks[r](t.links, t.title));
                            }
                            if (!a.length) {
                                const e = Array.from(document.body.querySelectorAll('.vv_inline_video source[type="video/mp4"]'));
                                a = e.map(e => {
                                    let t = document.querySelector(".VideoPageInfoRow__title"), n = e.src.match(/.(\d+)\.mp4/);
                                    return {
                                        title: t ? t.textContent : "video",
                                        href: e.src,
                                        forceDownload: !0,
                                        ext: "mp4",
                                        format: "MP4",
                                        quality: n ? n[1] : ""
                                    };
                                });
                            }
                            o.update(a);
                        };
                        try {
                            r.a.sendMessage(e.request, i);
                        } catch (t) {
                            i();
                        }
                    } else a = oe.prepareLinks(e), o.update(a);
                },
                appendVideoBtn: function(e, t) {
                    var o = t.querySelector(".VideoPageInfoRow__title");
                    const r = n.svg.getSvg("download", "#4986cc", "20px");
                    r.style.marginLeft = "17px", r.style.marginTop = "6px", r.style.float = "right", 
                    r.style.cursor = "pointer", r.addEventListener("click", this.onVideoBtnClick.bind(this, e)), 
                    o && o.appendChild(r), y.a.onRemoveEvent(r, ie.hideMenu);
                },
                insertVideoBtn: function(e) {
                    var t = this, n = e.querySelectorAll("iframe, video, a")[0], o = Object(l.a)(e, "VideoPage"), r = function() {
                        var e = /video(-?\d+)_(-?\d+)/.exec(location.href);
                        return e && {
                            request: {
                                hosting: "vk",
                                action: "getVKLinks",
                                extVideoId: "video" + e[1] + "_" + e[2]
                            }
                        };
                    };
                    n ? oe.getLinksFromPlayer(o, n, (function(e, n) {
                        e || (e = r()), e && t.appendVideoBtn(e, n);
                    })) : e.querySelector(".vv_not_support") && r() && t.appendVideoBtn(r(), o);
                }
            };
        }));
    }
});