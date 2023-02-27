!function(e) {
    function t(t) {
        for (var i, r, o = t[0], l = t[1], d = t[2], p = 0, u = []; p < o.length; p++) r = o[p], 
        Object.prototype.hasOwnProperty.call(a, r) && a[r] && u.push(a[r][0]), a[r] = 0;
        for (i in l) Object.prototype.hasOwnProperty.call(l, i) && (e[i] = l[i]);
        for (c && c(t); u.length; ) u.shift()();
        return s.push.apply(s, d || []), n();
    }
    function n() {
        for (var e, t = 0; t < s.length; t++) {
            for (var n = s[t], i = !0, o = 1; o < n.length; o++) {
                var l = n[o];
                0 !== a[l] && (i = !1);
            }
            i && (s.splice(t--, 1), e = r(r.s = n[0]));
        }
        return e;
    }
    var i = {}, a = {
        16: 0
    }, s = [];
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
    var o = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], l = o.push.bind(o);
    o.push = t, o = o.slice();
    for (var d = 0; d < o.length; d++) t(o[d]);
    var c = l;
    s.push([ 68, 0 ]), n();
}({
    68: function(e, t, n) {
        "use strict";
        n.r(t);
        var i = n(0), a = n(11), s = n(10), r = n(27), o = n(26), l = n(18), d = n(52), c = n(36), p = n(9), u = n(21), f = n(14), b = n(3), h = n(1), g = n(12), m = n(6), y = n(15), v = n(8), k = n(30), S = n(22), _ = n(17), C = n(7);
        const w = Object(m.a)("vimeo_com");
        y.a.isSingle() && Object(s.b)("vimeo", (function(e, t) {
            const n = Object(a.a)(t);
            var s = t.preferences, m = s.moduleVimeo ? 1 : 0, y = Object(r.a)();
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
                    return x.changeState(t.state);
                }
                "updatePreferences" !== t.action || Object.assign(s, t.preferences);
            })), m && setTimeout((function() {
                x.run();
            }));
            var x = {
                panelId: "savefrom__vimeo_links",
                btnBox: null,
                clipId: null,
                timer: null,
                btnPrefix: "sd_ld_bnt_",
                popupIsShow: !1,
                dlBtnClassName: "sf-dl-btn",
                currentMenu: null,
                linkCache: {},
                run: function() {
                    if (m = 1, y) {
                        if (x.clipId = x.getFrameClipId(), x.clipId) return x.appendIframeButtons();
                        y = !1;
                    }
                    this.videoFeed.injectStyle(), v.a.isAvailable() && this.mutationMode.enable();
                },
                changeState: function(e) {
                    y || (m = e, x.videoFeed.disable(), x.rmAllBtn(), x.mutationMode.stop(), e && x.run());
                },
                hideMenu: function() {
                    x.currentMenu && (x.currentMenu.hide(), x.currentMenu = null);
                },
                getFrameClipId: function() {
                    var e = document.location.href.match(/player\.vimeo\.com\/video\/([\w\-]+)/i);
                    if (e = e && e[1]) return e;
                },
                getBrowserVideoData: function(e, t) {
                    var n = e.querySelector(".uploaded_on");
                    if (n || (n = e.querySelector("#info .meta .stats")), !n) return null;
                    if (t && (t = (t = t.match(/([0-9]+)$/)) && t[1]), !t) {
                        var i = e.querySelector("a.js-title") || e.querySelector("a");
                        if (!i) return;
                        var a = i.getAttribute("href");
                        if (!a) return;
                        t = (t = a.match(/\/([0-9]+)$/)) && t[1];
                    }
                    return t ? {
                        id: t,
                        parent: n,
                        style: 1
                    } : void 0;
                },
                getVideoId: function(e) {
                    var t, n = null;
                    if (t = (e = e || document).querySelector(".player[data-clip-id]")) return t.dataset.clipId;
                    if (t = e.querySelector(".player[data-fallback-url]")) {
                        var i = t.dataset.fallbackUrl || "";
                        if (i = i.match(/video\/([0-9]+)\//)) return i[1];
                    }
                    return (t = e.querySelector("div.player_wrapper > div.faux_player[data-clip_id]")) && (n = t.dataset.clip_id) ? n : void 0;
                },
                onBtnClick: function(e, t) {
                    t.stopPropagation(), t.preventDefault();
                    var a = e.id;
                    if (!a) {
                        var s = null;
                        e.playerContainer && (s = Object(f.a)(e.parent, e.playerContainer)), a = x.getVideoId(s);
                    }
                    if (x.currentMenu && x.currentMenu.isShow) return void x.hideMenu();
                    var r = i.a.i18n.getMessage("download") + " ...", o = {};
                    4 === e.style && (o.offsetTop = 20);
                    var l, d = this.dataset.sfMobile > 0;
                    l = x.currentMenu = d ? n.mobileLightBox.show(r) : n.popupMenu.quickInsert(this, r, "sf-popupMenu", o);
                    var c = function(e) {
                        if (e && e.links) {
                            x.linkCache[a] = e;
                            var t = n.popupMenu.prepareLinks.vimeo(e.links, e.title);
                            l.update(t);
                        } else l.update(i.a.i18n.getMessage("noLinksFound"));
                    };
                    const p = x.linkCache[a];
                    if (!p) return x.getLinksFromPage2(a).catch(e => (w.error("getLinksFromPage error", e), 
                    Object(g.a)({
                        action: "getVimeoLinks",
                        extVideoId: a,
                        url: location.href
                    }).catch(e => {
                        throw w.error("getVimeoLinks error", e), e;
                    }))).then(e => {
                        c(e);
                    }, e => {
                        c();
                    });
                    c(p);
                },
                getPlayerConfig: () => Object(_.a)('function(){var clip=null;try{clip=vimeo.clip_page_config.clip}catch(err){throw new Error("Player config is not found")}return{clipId:vimeo.clip_page_config.clip.id,url:vimeo.clip_page_config.player.config_url,clip:clip}}'),
                getLinksFromPage2(e) {
                    return e = parseInt(e, 10), this.getPlayerConfig().then(t => {
                        let {clipId: n, url: i, clip: a} = t;
                        if (n !== e) throw new Error("Clip id is change");
                        const s = e => Object(g.a)({
                            action: "getVimeoLinksFromConfigAction",
                            config: e
                        }).then(e => {
                            if (e) return e;
                            throw new Error("getLinksFromConfig result is empty");
                        });
                        return Promise.resolve().then(() => {
                            if (a) return s(a);
                            throw new Error("Clip is not exists!");
                        }).catch(e => (w.error("Get links from config error", e), Object(S.a)({
                            url: i,
                            localXHR: !0,
                            json: !0,
                            withCredentials: !0
                        }).then(e => {
                            const t = e.body;
                            return s(t);
                        })));
                    });
                },
                rmAllBtn: function() {
                    [ "sfSkip" ].forEach((function(e) {
                        for (var t, n = Object(l.a)(e), i = document.querySelectorAll("[" + n + "]"), a = 0; t = i[a]; a++) t.removeAttribute(n);
                    }));
                    for (var e, t = document.querySelectorAll("." + x.dlBtnClassName), n = 0; e = t[n]; n++) "1" !== e.dataset.sfType && "3" !== e.dataset.sfType || (e = e.parentNode), 
                    e.parentNode.removeChild(e);
                    x.videoFeed.rmBtn(), x.hideMenu();
                },
                appendBtn: function(e) {
                    var t, a = e.parent, s = a.querySelector("." + x.dlBtnClassName);
                    if (s) {
                        if (!s.dataset.sfId && 6 !== e.style) return;
                        s.parentNode.removeChild(s), s = null;
                    }
                    if (1 === e.style ? t = h.a.create("a", {
                        text: i.a.i18n.getMessage("download"),
                        class: [ x.dlBtnClassName, "sf-style-1" ],
                        style: {
                            display: "inline"
                        },
                        data: {
                            sfId: e.id,
                            sfType: e.style
                        },
                        href: "#" + e.id
                    }) : 2 === e.style ? t = h.a.create("button", {
                        text: i.a.i18n.getMessage("download"),
                        class: [ x.dlBtnClassName, "btn", "iconify_down_b" ],
                        data: {
                            sfId: e.id,
                            sfType: e.style
                        }
                    }) : 5 === e.style ? t = h.a.create("button", {
                        class: [ x.dlBtnClassName, "sf-type-5" ],
                        data: {
                            sfId: e.id,
                            sfType: e.style
                        },
                        append: [ h.a.create(n.svg.getSvg("download", "#ffffff"), {
                            style: {
                                display: "inline-block",
                                width: "16px",
                                height: "16px",
                                verticalAlign: "text-bottom",
                                marginRight: ".625rem"
                            }
                        }), h.a.create("span", {
                            style: {
                                marginLeft: 0
                            },
                            text: i.a.i18n.getMessage("download")
                        }) ]
                    }) : 7 === e.style ? t = h.a.create("button", {
                        class: [ x.dlBtnClassName, "sf-type-7" ],
                        data: {
                            sfId: e.id,
                            sfType: e.style
                        },
                        append: [ h.a.create(n.svg.getSvg("download", "#ffffff"), {
                            style: {
                                display: "inline-block",
                                width: "16px",
                                height: "16px",
                                verticalAlign: "text-bottom",
                                marginRight: ".625rem"
                            }
                        }), h.a.create("span", {
                            style: {
                                marginLeft: 0
                            },
                            text: i.a.i18n.getMessage("download")
                        }) ]
                    }) : 3 === e.style ? t = h.a.create("button", {
                        class: [ x.dlBtnClassName, "iris_btn", "iris_btn-switch" ],
                        data: {
                            sfId: e.id,
                            sfType: e.style
                        },
                        append: [ h.a.create(n.svg.getSvg("download", "#00adef"), {
                            style: {
                                display: "inline-block",
                                width: "16px",
                                height: "16px",
                                verticalAlign: "text-bottom",
                                marginRight: ".625rem"
                            }
                        }), h.a.create("span", {
                            class: "iris_btn-content",
                            style: {
                                marginLeft: 0
                            },
                            text: i.a.i18n.getMessage("download")
                        }) ]
                    }) : 4 === e.style ? t = h.a.create("i", {
                        class: [ x.dlBtnClassName, "sf-style-4" ],
                        data: {
                            sfId: e.id,
                            sfType: e.style
                        },
                        style: {
                            display: "inline-block",
                            border: "1px solid #F8F8F8",
                            width: "20px",
                            height: "20px",
                            lineHeight: 0,
                            cursor: "pointer",
                            marginLeft: "10px",
                            verticalAlign: "middle"
                        },
                        append: h.a.create("style", {
                            text: Object(p.a)([ {
                                selector: "." + x.dlBtnClassName + ".sf-style-4",
                                style: {
                                    background: "url(" + n.svg.getSrc("download", "#777777") + ") center no-repeat #F8F8F8",
                                    backgroundSize: "12px"
                                }
                            }, {
                                selector: "." + x.dlBtnClassName + ".sf-style-4:hover",
                                style: {
                                    background: "url(" + n.svg.getSrc("download", "#00B75A") + ") center no-repeat #F8F8F8",
                                    backgroundSize: "12px"
                                }
                            }, {
                                selector: "." + x.dlBtnClassName + ".sf-style-4:active",
                                style: {
                                    outline: 0,
                                    boxShadow: "inset 0 3px 5px rgba(0, 0, 0, 0.125)"
                                }
                            } ])
                        })
                    }) : 6 === e.style && (t = h.a.create("button", {
                        class: [ x.dlBtnClassName, "btn", "btn_sm", "btn_blue_o" ],
                        data: {
                            sfId: e.id,
                            sfType: e.style,
                            sfMobile: 1
                        },
                        style: {
                            marginLeft: "8px"
                        },
                        append: [ h.a.create(n.svg.getSvg("download", "#00adef"), {
                            style: {
                                display: "inline-block",
                                width: "12px",
                                height: "12px",
                                verticalAlign: "text-bottom",
                                marginRight: "4px"
                            }
                        }), h.a.create("span", {
                            class: "btn_text",
                            style: {
                                marginLeft: 0
                            },
                            text: i.a.i18n.getMessage("download")
                        }) ]
                    })), t.addEventListener("click", x.onBtnClick.bind(t, e)), 1 === e.style && (t = h.a.create("span", {
                        append: [ t, " | " ]
                    })), 3 === e.style && (t = h.a.create("div", {
                        class: "clip_info-user_actions",
                        append: [ t ]
                    })), 1 === e.style || 2 === e.style || 6 === e.style) {
                        var r = a.firstChild;
                        r ? a.insertBefore(t, r) : a.appendChild(t);
                    } else a.appendChild(t);
                    Object(C.a)({
                        category: "append",
                        subcategory: "vi",
                        event: "b"
                    });
                },
                playerStateChangeObserver: null,
                observeVideoUi: function(e, t) {
                    var n = t;
                    if (n) {
                        var i = null, a = /(\s|^)with-controls(\s|$)/;
                        this.playerStateChangeObserver && this.playerStateChangeObserver.stop(), this.playerStateChangeObserver = new k.a({
                            attrs: [ {
                                name: "class",
                                callback(t) {
                                    const n = !a.test(t.oldValue), s = !a.test(t.value);
                                    !n && s ? (clearTimeout(i), i = setTimeout((function() {
                                        e.lockHide || e.container.classList.add("sf-hide-ui");
                                    }), 100)) : n && !s && (clearTimeout(i), e.container.classList.remove("sf-hide-ui"));
                                }
                            } ],
                            target: n
                        });
                    }
                },
                appendIframeButtons: function() {
                    var e = this, t = n.frameMenu.getBtn({
                        quickBtnStyleObj: {
                            display: "inline-block",
                            border: 0,
                            borderRadius: ".3em",
                            cursor: "pointer",
                            position: "relative",
                            padding: "6px 8px"
                        },
                        quickBtnCssStyle: {
                            backgroundColor: "rgba(23,35,34,.75)"
                        },
                        quickBtnOverCssStyle: {
                            backgroundColor: "rgb(0, 173, 239)"
                        },
                        nodeCssStyle: {
                            display: "none"
                        },
                        singleBtn: !0,
                        btnId: e.panelId,
                        containerStyle: {
                            left: "10px",
                            top: "10px"
                        },
                        quickBtnIcon: h.a.create(n.svg.getSvg("download", "#ffffff"), {
                            style: {
                                display: "inline-block",
                                width: "16px",
                                height: "16px",
                                verticalAlign: "middle"
                            }
                        }),
                        on: [ [ "click", function(a) {
                            if (a.preventDefault(), a.stopPropagation(), e.currentMenu && e.currentMenu.isShow) e.hideMenu(); else {
                                var s = e.clipId, r = e.linkCache[s], o = i.a.i18n.getMessage("download") + " ...";
                                r && (o = n.popupMenu.prepareLinks.vimeo(r.links, r.title));
                                var l = e.currentMenu = n.frameMenu.getMenu(this, o, "sf-frame-menu", {
                                    leftMenuPos: !0,
                                    container: t.container,
                                    onShow: function() {
                                        t.node.classList.add("sf-over");
                                    },
                                    onHide: function() {
                                        e.currentMenu = null, t.node.classList.remove("sf-over");
                                    }
                                });
                                r || e.getLinksFromPage((function(t, a) {
                                    var r = i.a.i18n.getMessage("noLinksFound");
                                    t && (e.linkCache[s] = {
                                        links: t,
                                        title: a
                                    }, r = n.popupMenu.prepareLinks.vimeo(t, a)), l.update(r);
                                }));
                            }
                        } ], [ "mousedown", function(n) {
                            n.stopPropagation(), 2 === n.button && (a && (a.stop(), a = null), e.hideMenu(), 
                            t.container.parentNode && t.container.parentNode.removeChild(t.container));
                        } ] ]
                    });
                    t.quickBtn.title = i.a.i18n.getMessage("download"), t.container = h.a.create("div", {
                        class: "sf-btn-ctr",
                        append: t.node
                    }), b.a.on(t.container, "mouseenter", (function() {
                        t.lockHide = !0;
                    })), b.a.on(t.container, "mouseleave", (function() {
                        t.lockHide = !1;
                    })), t.node.appendChild(h.a.create("style", {
                        text: Object(p.a)([ {
                            selector: [ "body:hover .sf-btn-ctr:not(.sf-hide-ui) #" + e.panelId, "body:hover .sf-btn-ctr:not(.sf-hide-ui) .sf-frame-menu" ],
                            style: {
                                display: "block"
                            }
                        } ])
                    })), document.body.appendChild(t.container);
                    let a = new v.a({
                        queries: [ {
                            css: '#player .captions[aria-live="assertive"]',
                            is: "added",
                            callback(n) {
                                const i = n.added[0];
                                i && (e.observeVideoUi(t, i), setTimeout((function() {
                                    a.stop(), a = null;
                                }), 0));
                            }
                        } ]
                    });
                },
                getLinksFromPage: function(e) {
                    var t = [ /"video":{/, /"request":{/, /"files":/ ], n = Object(d.a)(document.body.innerHTML, t), a = null;
                    n.some((function(e) {
                        return Object(c.a)(e, t).some((function(e) {
                            if (e.video && e.request && e.request.files) return a = e, !0;
                        }));
                    }));
                    var s = null, r = null, o = null, l = function(t) {
                        return t && (r = t.links || null, o = t.title || null), e(r, o);
                    };
                    return a ? (s = {
                        action: "getVimeoLinksFromConfig",
                        config: a
                    }, i.a.sendMessage(s, l)) : (s = {
                        action: "getVimeoLinks",
                        extVideoId: x.clipId
                    }, i.a.sendMessage(s, l));
                },
                videoFeed: {
                    btnClassName: "sf-feed-dl-btn",
                    style: null,
                    onClick: function(e) {
                        e.preventDefault(), e.stopPropagation();
                        var t = this.dataset.sfId;
                        this.dataset.sfCouchMode;
                        if (x.currentMenu && x.currentMenu.isShow) x.hideMenu(); else {
                            var a = x.linkCache[t], s = i.a.i18n.getMessage("download") + " ...";
                            a && (s = n.popupMenu.prepareLinks.vimeo(a.links, a.title));
                            var r = x.currentMenu = n.popupMenu.quickInsert(this, s, "sf-popupMenu");
                            if (!a) {
                                var o = null;
                                /"url"/.test(t) && (o = JSON.parse(t).url, t = null), i.a.sendMessage({
                                    action: "getVimeoLinks",
                                    extVideoId: t,
                                    url: o
                                }, (function(e) {
                                    var a = null;
                                    e.links ? (x.linkCache[t] = e, a = n.popupMenu.prepareLinks.vimeo(e.links, e.title)) : a = i.a.i18n.getMessage("noLinksFound"), 
                                    r.update(a);
                                }));
                            }
                        }
                    },
                    getBtn: function(e) {
                        return h.a.create("i", {
                            class: e.classList,
                            data: {
                                sfId: e.id,
                                sfCouchMode: e.isCouchMode ? 1 : 0
                            },
                            on: [ "click", this.onClick ]
                        });
                    },
                    onImgOver2: function(e) {
                        var t, n, i = this.parentNode;
                        if ("A" === i.tagName) {
                            var a = i.getAttribute("href");
                            if (a && (n = (n = a.match(/^\/(\d+)$/)) && n[1]) && (t = i.parentNode) && t.classList.contains("contextclip-img") && !(t.dataset.sfBtn > 0)) {
                                t.dataset.sfBtn = "1";
                                var s = [ x.videoFeed.btnClassName, "sf-type1-btn" ];
                                i.appendChild(x.videoFeed.getBtn({
                                    id: n,
                                    classList: s
                                })), i = null, t = null;
                            }
                        }
                    },
                    onImgOver: function(e) {
                        var t, n, i = this.parentNode;
                        if (Object(u.a)(this, "a.contextclip-img-thumb")) {
                            t = this, i = this;
                            var a = /\/([0-9]+)/.exec(this.href);
                            a && (n = a[1]);
                        }
                        if (!n && (Object(u.a)(this, "div.iris_video-vital") || Object(u.a)(this, "li.clip_thumbnail"))) {
                            i = this.querySelector(".iris_thumbnail"), t = this;
                            var s = this.querySelector("a.iris_link-box");
                            if (s) {
                                var r = s.href;
                                !(n = (n = r.match(/\/([0-9]+)/)) && n[1]) && r && (n = JSON.stringify({
                                    url: r
                                }));
                            }
                        }
                        if (!n && "LI" == i.tagName) {
                            if (!(n = i.dataset.resultId) || "clip_" !== n.substr(0, 5)) return;
                            n = n.substr(5), t = i, i = this.querySelector(".thumbnail_wrapper");
                        }
                        if (!n) {
                            if ("A" !== i.tagName) return;
                            if (n = i.dataset.clipId, !(t = i.parentNode)) return;
                        }
                        var o = !1;
                        if (!n) {
                            if ((o = "item_id" === (n = t.id).substr(0, 7) && t.classList.contains("clip")) || "clip" === n.substr(0, 4) || (n = void 0), 
                            !n && "ARTICLE" === t.tagName && t.classList.contains("clip_item") && (n = i.getAttribute("href")), 
                            !n) return;
                            (n = n.match(/([0-9]+)$/)) && (n = n[1]);
                        }
                        if (!t.dataset.sfBtn) {
                            t.dataset.sfBtn = "1";
                            var l = [ x.videoFeed.btnClassName ];
                            this.classList.contains("thumbnail_lg_wide") && l.push("sf-type1-btn"), this.classList.contains("contextclip-img-thumb") && l.push("sf-type4-btn"), 
                            (this.classList.contains("clip_thumbnail") || this.classList.contains("iris_video-vital")) && l.push("sf-type3-btn");
                            var d = t.parentNode;
                            d && "clips" === d.id && l.push("sf-type1-btn"), d = null, o && l.push("sf-type1-btn"), 
                            t.classList.contains("promo_clip") && 1 === l.length && l.push("sf-type1-btn"), 
                            i.appendChild(x.videoFeed.getBtn({
                                id: n,
                                classList: l,
                                isCouchMode: o
                            })), i = null, t = null;
                        }
                    },
                    injectStyle: function() {
                        this.style ? !this.style.parentNode && document.head.appendChild(this.style) : (this.style = h.a.create("style", {
                            text: Object(p.a)([ {
                                selector: [ ".sf-dl-btn.sf-type-5", ".sf-dl-btn.sf-type-7" ],
                                style: {
                                    color: "#fff",
                                    borderColor: "#00adef",
                                    backgroundColor: "#00adef",
                                    minWidth: "68px",
                                    minHeight: "32px",
                                    padding: "0 10px",
                                    lineHeight: "30px",
                                    fontSize: "14px",
                                    width: "auto",
                                    position: "relative",
                                    margin: 0,
                                    fontWeight: 700,
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                    borderRadius: "3px",
                                    letterSpacing: ".1px",
                                    transition: "all .1s ease-in-out",
                                    cursor: "pointer",
                                    marginLeft: ".5rem"
                                }
                            }, {
                                selector: [ ".sf-dl-btn.sf-type-7" ],
                                style: {
                                    verticalAlign: "middle"
                                }
                            }, {
                                selector: [ ".sf-dl-btn.sf-type-5:hover", ".sf-dl-btn.sf-type-7:hover" ],
                                style: {
                                    color: "#fff",
                                    borderColor: "#08c",
                                    backgroundColor: "#08c"
                                }
                            }, {
                                selector: [ "a > .sf-feed-dl-btn", "a .sf-feed-dl-btn.sf-type3-btn", "a > .sf-feed-dl-btn.sf-type4-btn" ],
                                style: {
                                    display: "none",
                                    border: "1px solid #F8F8F8",
                                    width: "20px",
                                    height: "20px",
                                    padding: 0,
                                    position: "absolute",
                                    background: "url(" + n.svg.getSrc("download", "#777777") + ") center no-repeat #F8F8F8",
                                    backgroundSize: "12px",
                                    top: "auto",
                                    left: "auto",
                                    lineHeight: 0
                                }
                            }, {
                                selector: [ "a > .sf-feed-dl-btn.sf-type4-btn" ],
                                style: {
                                    top: 0,
                                    left: 0
                                }
                            }, {
                                selector: [ "a > .sf-feed-dl-btn.sf-type1-btn", "a > div > .sf-feed-dl-btn.sf-type3-btn" ],
                                style: {
                                    top: 0
                                }
                            }, {
                                selector: [ "a > .sf-feed-dl-btn.sf-type2-btn" ],
                                style: {
                                    opacity: .5
                                }
                            }, {
                                selector: [ "a > div > .sf-feed-dl-btn.sf-type3-btn" ],
                                style: {
                                    zIndex: 10
                                }
                            }, {
                                selector: [ "a > .sf-feed-dl-btn:hover", "a > div > .sf-feed-dl-btn.sf-type3-btn:hover" ],
                                style: {
                                    background: "url(" + n.svg.getSrc("download", "#00B75A") + ") center no-repeat #F8F8F8",
                                    backgroundSize: "12px"
                                }
                            }, {
                                selector: [ "a > .sf-feed-dl-btn.sf-type2-btn:hover" ],
                                style: {
                                    opacity: .8
                                }
                            }, {
                                selector: [ "a > .sf-feed-dl-btn:active", "a > div > .sf-feed-dl-btn.sf-type3-btn:active" ],
                                style: {
                                    outline: 0,
                                    boxShadow: "inset 0 3px 5px rgba(0, 0, 0, 0.125)"
                                }
                            }, {
                                selector: [ "a:hover > .sf-feed-dl-btn", "a:hover > div > .sf-feed-dl-btn.sf-type3-btn" ],
                                style: {
                                    display: "block"
                                }
                            } ])
                        }), document.head.appendChild(this.style));
                    },
                    disable: function() {
                        this.style && this.style.parentNode && this.style.parentNode.removeChild(this.style);
                    },
                    rmBtn: function() {
                        for (var e, t = document.querySelectorAll(".sf-feed-dl-btn"), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                        var i = Object(l.a)("sfBtn"), a = document.querySelectorAll("[" + i + "]");
                        for (n = 0; e = a[n]; n++) e.removeAttribute(i);
                    }
                },
                mutationMode: {
                    observer: null,
                    stop: function() {
                        this.observer && this.observer.stop();
                    },
                    wrapOnImgOver: function() {
                        m && x.videoFeed.onImgOver.apply(this, arguments);
                    },
                    wrapOnImgOver2: function() {
                        m && x.videoFeed.onImgOver2.apply(this, arguments);
                    },
                    enable: function() {
                        if (this.observer) return this.observer.start();
                        this.observer = new v.a({
                            queries: [ {
                                css: "#clip #info #tools",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) x.hideMenu(), t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    x.appendBtn({
                                        id: "",
                                        parent: t,
                                        style: 2,
                                        playerContainer: "#clip"
                                    }));
                                }
                            }, {
                                css: "#channel_clip_container #info .meta",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) {
                                        if (x.hideMenu(), t.dataset.sfSkip > 0) continue;
                                        t.dataset.sfSkip = "1";
                                        const e = t.querySelector(".stats") || t.querySelector(".time");
                                        e && x.appendBtn({
                                            id: "",
                                            parent: e,
                                            style: 1,
                                            playerContainer: "#channel_clip_container"
                                        });
                                    }
                                }
                            }, {
                                css: "#browse_content ol.browse_videos_videos > li",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) {
                                        if (t.dataset.sfSkip > 0) continue;
                                        if (t.dataset.sfSkip = "1", "clip_" !== t.id.substr(0, 5)) continue;
                                        const e = x.getBrowserVideoData(t, t.id);
                                        e && x.appendBtn(e);
                                    }
                                }
                            }, {
                                css: "img.thumbnail",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    b.a.one(t, "mouseenter", x.mutationMode.wrapOnImgOver));
                                }
                            }, {
                                css: ".clip_thumbnail .iris_thumbnail img",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) {
                                        if (t.dataset.sfSkip > 0) continue;
                                        t.dataset.sfSkip = "1";
                                        const e = Object(o.a)(t, "clip_thumbnail");
                                        b.a.one(e, "mouseenter", x.mutationMode.wrapOnImgOver);
                                    }
                                }
                            }, {
                                css: ".iris_video-vital .iris_thumbnail img",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) {
                                        if (t.dataset.sfSkip > 0) continue;
                                        t.dataset.sfSkip = "1";
                                        const e = Object(o.a)(t, "iris_video-vital");
                                        b.a.one(e, "mouseenter", x.mutationMode.wrapOnImgOver);
                                    }
                                }
                            }, {
                                css: ".contextclip-img-thumb img",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) {
                                        if (t.dataset.sfSkip > 0) continue;
                                        t.dataset.sfSkip = "1";
                                        const e = Object(o.a)(t, "contextclip-img-thumb");
                                        b.a.one(e, "mouseenter", x.mutationMode.wrapOnImgOver);
                                    }
                                }
                            }, {
                                css: ".clip_main .clip_info a.js-user_link.iris_link-header",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) {
                                        if (t.dataset.sfSkip > 0) continue;
                                        t.dataset.sfSkip = "1", x.hideMenu();
                                        const e = Object(f.a)(t, ".clip_info-wrapper");
                                        if (!e) continue;
                                        const n = e.querySelector(".clip_info-actions");
                                        n && x.appendBtn({
                                            id: "",
                                            parent: n,
                                            style: 3,
                                            playerContainer: ".clip_main"
                                        });
                                    }
                                }
                            }, {
                                css: ".clip_main .clip_main-content div.clip_info-subline--inline",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) {
                                        if (t.dataset.sfSkip > 0) continue;
                                        t.dataset.sfSkip = "1", x.hideMenu();
                                        Object(f.a)(t, ".clip_main-content") && x.appendBtn({
                                            id: "",
                                            parent: t,
                                            style: 5,
                                            playerContainer: ".clip_main"
                                        });
                                    }
                                }
                            }, {
                                css: ".contextclip-img img",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    b.a.one(t, "mouseenter", x.mutationMode.wrapOnImgOver2));
                                }
                            }, {
                                css: ".client_wrapper .clip header h1",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    x.appendBtn({
                                        id: "",
                                        parent: t,
                                        style: 4,
                                        playerContainer: ".clip"
                                    }));
                                }
                            }, {
                                css: ".clip_page .clip .meta_section_subinfo",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) x.appendBtn({
                                        id: "",
                                        parent: t,
                                        style: 6,
                                        playerContainer: ".clip_wrapper"
                                    });
                                }
                            }, {
                                css: "#main .clip_info-subline--inline",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) x.appendBtn({
                                        id: "",
                                        parent: t,
                                        style: 7,
                                        playerContainer: "#main"
                                    });
                                }
                            } ]
                        });
                    }
                }
            };
        }));
    }
});