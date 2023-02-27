!function(e) {
    function t(t) {
        for (var i, a, n = t[0], d = t[1], l = t[2], u = 0, f = []; u < n.length; u++) a = n[u], 
        Object.prototype.hasOwnProperty.call(o, a) && o[a] && f.push(o[a][0]), o[a] = 0;
        for (i in d) Object.prototype.hasOwnProperty.call(d, i) && (e[i] = d[i]);
        for (c && c(t); f.length; ) f.shift()();
        return s.push.apply(s, l || []), r();
    }
    function r() {
        for (var e, t = 0; t < s.length; t++) {
            for (var r = s[t], i = !0, n = 1; n < r.length; n++) {
                var d = r[n];
                0 !== o[d] && (i = !1);
            }
            i && (s.splice(t--, 1), e = a(a.s = r[0]));
        }
        return e;
    }
    var i = {}, o = {
        4: 0
    }, s = [];
    function a(t) {
        if (i[t]) return i[t].exports;
        var r = i[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(r.exports, r, r.exports, a), r.l = !0, r.exports;
    }
    a.m = e, a.c = i, a.d = function(e, t, r) {
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
        }), 2 & t && "string" != typeof e) for (var i in e) a.d(r, i, function(t) {
            return e[t];
        }.bind(null, i));
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
    var n = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], d = n.push.bind(n);
    n.push = t, n = n.slice();
    for (var l = 0; l < n.length; l++) t(n[l]);
    var c = d;
    s.push([ 88, 0 ]), r();
}({
    88: function(e, t, r) {
        "use strict";
        r.r(t);
        var i = r(0), o = r(1), s = r(27), a = r(49), n = r(3), d = r(9), l = r(15), c = r(8), u = r(11), f = r(18), h = r(30), p = r(10), m = r(5), y = r(14), g = r(6), v = r(22), b = r(12), S = r(7), w = r(13), _ = r(40);
        const k = Object(g.a)("instagram");
        l.a.isSingle() && Object(p.b)("instagram", (function(e, t) {
            const r = Object(u.a)(t), s = t.preferences;
            let l = s.moduleInstagram ? 1 : 0;
            const p = {
                "x-asbd-id": "198387",
                "x-ig-app-id": "936619743392459",
                "x-ig-www-claim": "0"
            }, g = {}, B = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
            i.a.onMessage.addListener((function(t, r, i) {
                if ("getModuleInfo" === t.action) {
                    if (t.url !== location.href) return;
                    return i({
                        state: l,
                        moduleName: e
                    });
                }
                if ("changeState" === t.action) {
                    if (e !== t.moduleName) return;
                    return C.changeState(t.state);
                }
                if ("updatePreferences" !== t.action) {
                    if (l) return "updateLinks" === t.action ? C.updateLinks() : void 0;
                } else Object.assign(s, t.preferences);
            })), l && setTimeout((function() {
                C.run();
            }));
            const C = {
                urlR: /\/\/[^\/]+\.[^\/]+\/p\//,
                lastWaitEl: null,
                dlBtnClassName: "savefrom-helper--btn",
                styleEl: null,
                queryHash: window.localStorage.getItem("_sf_query_hash") || "a9441f24ac73000fa17fe6e6da11d59d",
                run: function() {
                    l = 1, this.insertStyle(), c.a.isAvailable() && this.mutationMode.enable();
                },
                rmStyle: function() {
                    this.styleEl && this.styleEl.parentNode && this.styleEl.parentNode.removeChild(this.styleEl);
                },
                insertStyle: function() {
                    this.styleEl ? this.styleEl.parentNode || document.head.appendChild(this.styleEl) : (this.styleEl = o.a.create("style", {
                        text: Object(d.a)([ {
                            selector: "." + this.dlBtnClassName,
                            style: {
                                display: "none",
                                border: "1px solid #F8F8F8",
                                top: "8px",
                                right: "8px",
                                padding: 0,
                                position: "absolute",
                                backgroundColor: "#F8F8F8",
                                cursor: "pointer",
                                lineHeight: 0
                            }
                        }, {
                            selector: "." + this.dlBtnClassName + " svg",
                            style: {
                                margin: "2px"
                            }
                        }, {
                            selector: "." + this.dlBtnClassName + " svg path",
                            style: {
                                fill: "#777777"
                            }
                        }, {
                            selector: ".Embed ." + this.dlBtnClassName,
                            style: {
                                border: "1px solid #B5B5B5",
                                borderRadius: "4px",
                                padding: "3px"
                            }
                        }, {
                            selector: "." + this.dlBtnClassName + ":hover svg path",
                            style: {
                                fill: "#3f729b"
                            }
                        }, {
                            selector: "." + this.dlBtnClassName + ":active",
                            style: {
                                outline: 0,
                                boxShadow: "inset 0 3px 5px rgba(0, 0, 0, 0.125)"
                            }
                        }, {
                            selector: [ "*:hover > ." + this.dlBtnClassName, "*.sf-touch-show > ." + this.dlBtnClassName ],
                            style: {
                                display: "block"
                            }
                        }, {
                            selector: "*.sf-touch-hide > ." + this.dlBtnClassName,
                            style: {
                                display: "none"
                            }
                        } ])
                    }), document.head.appendChild(this.styleEl));
                },
                updateLinks: function() {
                    this.changeState(0), this.changeState(1);
                },
                changeState: function(e) {
                    l = e, this.rmDlBtn(), this.rmStyle(), this.mutationMode.stop(), e && this.run();
                },
                rmDlBtn: function() {
                    const e = document.querySelectorAll("." + this.dlBtnClassName);
                    for (let t, r = 0; t = e[r]; r++) t.parentNode.removeChild(t);
                },
                requestApiEntity(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                    const r = new URLSearchParams({
                        query_hash: C.queryHash,
                        variables: JSON.stringify({
                            shortcode: e
                        })
                    });
                    return Object(v.a)({
                        url: "https://www.instagram.com/graphql/query/?" + r.toString(),
                        json: !0
                    }).then(e => {
                        if (!e.body || !e.body.data || !e.body.data.shortcode_media) throw new Error("Request video from api failed. Empty body");
                        return e.body.data.shortcode_media;
                    }, r => {
                        if (400 == r && 0 === t) return this.refreshQueryHash().then(() => this.requestApiEntity(e, 1));
                    });
                },
                prepVideoFromResponseApi(e, t) {
                    var r;
                    if ("GraphVideo" === t.__typename && t.video_url) {
                        const e = t.title || t.id || "video_instagram";
                        return {
                            filename: m.a.modify(e + ".mp4"),
                            url: t.video_url
                        };
                    }
                    const i = t.edge_sidecar_to_children.edges.shift().node;
                    if ("GraphSidecar" === t.__typename && "GraphImage" !== (null == i ? void 0 : i.__typename)) {
                        const e = t.title || i.id || "video_instagram";
                        return {
                            filename: m.a.modify(e + ".mp4"),
                            url: i.video_url
                        };
                    }
                    if ("GraphSidecar" === t.__typename && null !== (r = t.edge_sidecar_to_children) && void 0 !== r && r.edges) {
                        const {edges: r} = t.edge_sidecar_to_children;
                        if (!r.length) return;
                        const i = e.getAttribute("poster");
                        if (!i) return;
                        const o = r.find(e => {
                            let {node: t} = e;
                            return t.display_url.split("?")[0] === i.split("?")[0];
                        });
                        if (o && "GraphVideo" === o.node.__typename) return this.prepVideoFromResponseApi(e, o.node);
                    }
                },
                async refreshQueryHash() {
                    const e = document.querySelector('link[href*="Consumer.js/"]');
                    return e && e.href ? Object(v.a)(e.href).then(e => {
                        const t = e.body.match(/s="(\w+)",l=/);
                        t && t[1] && (C.queryHash = t[1], window.localStorage.setItem("_sf_query_hash", t[1]), 
                        k.info("new query hash", C.queryHash));
                    }) : (k.error("Consumer.js not found. refreshQueryHash error"), Promise.resolve());
                },
                getVideoInfo: async function(e) {
                    const t = e.getAttribute("src");
                    if ("string" != typeof t || -1 !== t.indexOf("blob:")) {
                        let t = C.getArticleIdFromURL(location.href);
                        if (!t) {
                            const r = e.closest(".sf-root-media-container");
                            r && (t = C.getArticleIdFromContainer(r));
                        }
                        if (!t || -1 !== t.indexOf("/")) {
                            const r = e.closest("article");
                            let i = r && r.querySelector('a[href*="/liked_by"]');
                            if (i) {
                                const e = i.href.match(/\/p\/(.*?)\/liked_by/);
                                e && e[1] && (t = e[1]);
                            }
                        }
                        if (t && -1 === t.indexOf("/")) try {
                            const r = await this.requestApiEntity(t), {filename: i, url: o} = this.prepVideoFromResponseApi(e, r);
                            return {
                                filename: i,
                                url: o
                            };
                        } catch (t) {
                            return void k.error("Get Video from api error: ", t, e);
                        }
                        return;
                    }
                    let r = "mp4";
                    -1 !== t.indexOf(".flv") && (r = "flv");
                    let i = t.match(/\/([^\/?]+)(?:$|\?)/);
                    i = i && i[1], i || (i = "noname." + r);
                    let o = m.a.modify(C.getContentMakerName(e));
                    return o = o ? o + "_" : "", {
                        filename: o + i,
                        url: t
                    };
                },
                getImageInfo: function(e) {
                    let t = null;
                    const r = e.getAttribute("srcset");
                    if ("string" == typeof r) {
                        const e = [];
                        r.split(",").map((function(t) {
                            const r = t.split(" ");
                            e.push({
                                url: r[0],
                                size: r[1]
                            });
                        })), e.sort((function(e, t) {
                            return e.size > t.size ? -1 : 1;
                        }));
                        const i = e.shift();
                        i && (t = i.url);
                    }
                    if (t || (t = e.getAttribute("src")), "string" != typeof t) return;
                    let i = "jpg";
                    -1 !== t.indexOf(".png") && (i = "png");
                    let o = t.match(/\/([^\/?]+)(?:$|\?)/);
                    o = o && o[1], o || (o = "noname." + i);
                    let s = m.a.modify(C.getContentMakerName(e));
                    return s = s ? s + "_" : "", {
                        filename: s + o,
                        url: t
                    };
                },
                getContentMakerName: function(e) {
                    const t = e.closest("article");
                    if (t) {
                        const e = t.querySelector("header span a");
                        return e ? e.textContent : "";
                    }
                    return "";
                },
                getDbBtnEl: function(e) {
                    Object(S.a)({
                        category: "append",
                        subcategory: "in",
                        event: "b"
                    });
                    const t = o.a.create("a", {
                        class: [ this.dlBtnClassName ],
                        href: e.url,
                        download: e.filename,
                        title: i.a.i18n.getMessage("download"),
                        style: {
                            position: "absolute",
                            zIndex: 100
                        },
                        on: [ [ "click", I ], [ "mouseover", e => {
                            if (B) {
                                if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void Object(w.b)(t, {
                                    content: i.a.i18n.getMessage("downloadTitle"),
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                }, {
                                    el: {
                                        className: "mp4",
                                        download: "mp4"
                                    }
                                });
                                Object(w.a)(t, {
                                    content: i.a.i18n.getMessage("downloadTitle"),
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                });
                            }
                        } ] ],
                        append: [ r.svg.getSvg("download", null, 16, 16) ]
                    });
                    return t;
                },
                showOnTouch: function(e, t) {
                    if (e.dataset.sfTouch > 0) return;
                    let r = !1, i = null;
                    const s = function() {
                        r && (clearTimeout(i), i = setTimeout((function() {
                            r && (r = !1, e.classList.remove("sf-touch-show"), e.classList.add("sf-touch-hide"));
                        }), 3e3));
                    };
                    o.a.create(e, {
                        data: {
                            sfTouch: "1"
                        },
                        on: [ [ "touchstart", function(t) {
                            r || (r = !0, e.classList.remove("sf-touch-hide"), e.classList.add("sf-touch-show"));
                        } ], [ "touchend", function(e) {
                            s();
                        } ] ]
                    });
                },
                getArticleIdFromURL(e) {
                    const t = e.split("?")[0].match(/(?:\/p|\/tv)\/(.*)/);
                    if (t && t[1]) return t[1].replace("/", "");
                },
                getArticleIdFromContainer(e) {
                    const t = e.closest("article");
                    if (t) {
                        const e = t.querySelector('a[href*="/p/"], a[href*="/tv/"]');
                        if (e) return C.getArticleIdFromURL(e.href);
                    }
                },
                addDlBtn: async function(e, t, r) {
                    const i = "embed" === t, s = i && document.querySelector(".Header") || e;
                    s && O(s);
                    let d = e, l = null;
                    e.classList.add("sf-root-media-container");
                    let c, u = e.querySelector("div > div > video");
                    if (u || "video" !== r.tagName || "strangeVideo" !== t || (u = r), u && (l = await this.getVideoInfo(u)), 
                    !l) if (i) c = d.querySelector(".EmbedFrame img.EmbeddedMediaImage"), c && (l = this.getImageInfo(c)); else if (c = d.querySelector("div > img[src][srcset]"), 
                    c) l = this.getImageInfo(c); else if (c = d.querySelector("div > img"), l = c && this.getImageInfo(c), 
                    c && ("hidden" === c.style.visibility || !c.src)) {
                        const i = new h.a({
                            target: c,
                            attrs: [ {
                                name: "src",
                                callback: o => {
                                    o.value && (this.addDlBtn(e, t, r), i.stop());
                                }
                            } ]
                        });
                    }
                    if (!l) return;
                    const f = this.getDbBtnEl(l);
                    let p = "", m = null;
                    c ? (p = "image", m = c) : (p = "video", m = u);
                    const y = new h.a({
                        target: m,
                        attrs: [ {
                            name: "src",
                            callback: async e => {
                                e.value !== l.url && (l = null, l = "image" === p ? this.getImageInfo(m) : await this.getVideoInfo(m), 
                                l && f.parentNode ? (f.href = l.url, f.download = l.filename) : y.stop());
                            }
                        } ]
                    });
                    if (n.a.onRemoveEvent(m, (function() {
                        Object(a.a)(document.body, r) && (r.dataset.sfSkip = 0, C.mutationMode.observer.trigger(r));
                    })), i) {
                        const e = document.querySelector(".Header");
                        e && (d = e, o.a.create(f, {
                            style: {
                                position: "relative",
                                zIndex: 100,
                                display: "block",
                                left: "auto",
                                top: "auto",
                                marginLeft: "10px"
                            }
                        }));
                    }
                    d.appendChild(f), this.showOnTouch(d, f);
                },
                parseStoryUrl(e) {
                    let t = !1, r = /instagram.com\/stories\/([^\/?]+)(?:\/(\d+))?(?:\/|\?|$)/.exec(e);
                    r || (r = /instagram.com\/s\/[^\/?]+\?story_media_id=(\d+)_(\d+)/.exec(e), t = !0);
                    let [, i, o] = r;
                    return {
                        username: i,
                        storyId: o,
                        isImplicitHighlightUrl: t
                    };
                },
                getRedirectedUrl: async e => (await Object(_.a)(e, {
                    headers: p
                })).responseURL,
                async getInfoAboutStoryUrl(e) {
                    let {username: t, storyId: r, isImplicitHighlightUrl: i} = this.parseStoryUrl(e);
                    if (!i) return {
                        username: t,
                        storyId: r,
                        isImplicitHighlightUrl: i
                    };
                    const o = await this.getRedirectedUrl(e);
                    if (e === o) throw new ErrorWithCode("Url was not redirected", "URL_WAS_NOT_REDIRECTED");
                    return this.parseStoryUrl(o);
                },
                async getUserIdByUserName(e) {
                    var t;
                    return null === (t = (await Object(_.a)(`https://www.instagram.com/stories/${e}/`, {
                        headers: p
                    })).body.match(/"props":\{"user":\{"id":"([0-9]+)"/i)) || void 0 === t ? void 0 : t[1];
                },
                parseStoriesResponse(e) {
                    var t, r, i;
                    if (!e) return [];
                    return ((null === (t = JSON.parse(e)) || void 0 === t || null === (r = t.reels_media) || void 0 === r || null === (i = r[0]) || void 0 === i ? void 0 : i.items) || []).map(e => {
                        let {pk: t, video_versions: r} = e;
                        return {
                            pk: t,
                            video_versions: r
                        };
                    });
                },
                requestStoriesById: async e => (await Object(_.a)("https://i.instagram.com/api/v1/feed/reels_media/?reel_ids=" + encodeURIComponent(e), {
                    headers: p
                })).body,
                async getStoriesByUsername(e) {
                    const t = await this.getUserIdByUserName(e), r = await this.requestStoriesById(t);
                    return this.parseStoriesResponse(r);
                },
                async getHighlightStories(e) {
                    const t = await this.requestStoriesById("highlight:" + e);
                    return this.parseStoriesResponse(t);
                },
                async getStoriesFromApi(e) {
                    const {username: t, storyId: r, isImplicitHighlightUrl: i} = await this.getInfoAboutStoryUrl(e);
                    return "highlights" === t || i ? this.getHighlightStories(r) : this.getStoriesByUsername(t);
                },
                setStoriesToBucket(e) {
                    e.forEach(e => {
                        let {pk: t, video_versions: r} = e;
                        g[t] = null == r ? void 0 : r[0].url;
                    });
                },
                async getStoryFromBucket(e) {
                    if (!g[e]) {
                        const e = await this.getStoriesFromApi(location.href);
                        this.setStoriesToBucket(e);
                    }
                    return g[e];
                },
                addBtnVideoStory() {
                    const e = document.querySelector("section > div > header");
                    if (!e) return;
                    const t = C.createStoryContainer(e);
                    setTimeout(async () => {
                        const {storyId: e} = this.parseStoryUrl(location.href), r = await this.getStoryFromBucket(e), i = location.href.match(/stories\/(.*?)\/(\d+)/);
                        let o = "instagram_video_story";
                        i && i[1] && i[2] && (o = [ i[1], i[2] ].join(" - "));
                        const s = C.createStoryButton(r, e + ".mp4");
                        s.addEventListener("click", I), t.appendChild(s);
                    }, 100);
                },
                addBtnImageStory(e) {
                    const t = document.querySelector("section > div > header");
                    if (!t) return;
                    const r = C.createStoryContainer(t);
                    setTimeout(() => {
                        let t;
                        if (e.srcset) {
                            const r = e.srcset.split(",")[0];
                            r && (t = r.split(" ")[0]);
                        }
                        if (t || (t = e.src), !t) return;
                        const i = location.href.match(/stories\/(.*?)\/(\d+)/);
                        let o = "instagram_video_story";
                        i && i[1] && i[2] && (o = [ i[1], i[2] ].join(" - "));
                        const s = C.createStoryButton(t, o + ".jpg");
                        s.addEventListener("click", I), r.appendChild(s);
                    }, 100);
                },
                createStoryContainer(e) {
                    if (!e) return;
                    let t = document.querySelector(".sf--story-container");
                    t && t.remove();
                    const r = o.a.create("div", {
                        className: "sf--story-container"
                    }), i = document.querySelector("header > div:nth-child(2) > div:nth-child(2)");
                    if (!i) return e.appendChild(r), r;
                    const s = i.querySelector("button");
                    return s ? i.insertBefore(r, s) : e.appendChild(r), r;
                },
                createStoryButton(e, t) {
                    Object(S.a)({
                        category: "append",
                        subcategory: "in",
                        event: "b"
                    });
                    const s = o.a.create("a", {
                        className: "sf--story-btn",
                        append: [ r.svg.getSvg("download", "white", 15, 15) ],
                        download: t,
                        href: e,
                        style: {
                            cursor: "pointer",
                            marginRight: "2px",
                            marginTop: "2px"
                        },
                        on: [ "mouseover", e => {
                            if (B) {
                                if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void Object(w.b)(s, {
                                    content: i.a.i18n.getMessage("downloadTitle"),
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                }, {
                                    el: {
                                        className: "story"
                                    }
                                });
                                Object(w.a)(s, {
                                    content: i.a.i18n.getMessage("downloadTitle"),
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                });
                            }
                        } ]
                    });
                    return s;
                },
                mutationMode: {
                    observer: null,
                    stop: function() {
                        this.observer && this.observer.stop(), [ "sfSkip" ].forEach((function(e) {
                            const t = Object(f.a)(e), r = document.querySelectorAll("[" + t + "]");
                            for (let e, i = 0; e = r[i]; i++) e.removeAttribute(t);
                        }));
                    },
                    enable: function() {
                        if (this.observer) return this.observer.start();
                        this.observer = new c.a({
                            queries: [ {
                                css: 'section > div > div > div[style*="scale(1)"] > section > div > div > div > div, section > div:not([style]) > div > div > div',
                                is: "added",
                                callback(e) {
                                    let {added: t} = e;
                                    const r = () => {
                                        document.querySelectorAll(".sf--story-btn").forEach(e => e.remove());
                                    };
                                    t.forEach(e => {
                                        const t = e.querySelector("video");
                                        if (t) r(), C.addBtnVideoStory(t); else {
                                            const t = e.querySelector("img");
                                            t && (r(), C.addBtnImageStory(t));
                                        }
                                    });
                                }
                            }, {
                                css: 'div > div > article > div > div:nth-child(2) div[role="button"]',
                                is: "added",
                                callback: e => {
                                    for (let t, r = 0; t = e.added[r]; r++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    C.addDlBtn(t.parentNode, "", t));
                                }
                            }, {
                                css: "._5wCQW > video[controls]",
                                is: "added",
                                callback: e => {
                                    for (let t, r = 0; t = e.added[r]; r++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    C.addDlBtn(t.parentNode, "strangeVideo", t));
                                }
                            }, {
                                css: 'div > div > article > div > div:nth-child(1) div[role="button"]',
                                is: "added",
                                callback: e => {
                                    for (let t, r = 0; t = e.added[r]; r++) t.dataset.sfSkip > 0 || t.querySelector("ul > li") || (t.dataset.sfSkip = "1", 
                                    C.addDlBtn(t.parentNode, "", t));
                                }
                            }, {
                                css: 'div > div > article > div > div[class*="_aatn"] > div > div > div > div ',
                                is: "added",
                                callback: e => {
                                    let {added: t} = e;
                                    for (let e, r = 0; e = t[r]; r++) "1" !== e.dataset.sfSkip && (e.dataset.sfSkip = "1", 
                                    C.addDlBtn(e.parentNode, "", e));
                                }
                            }, {
                                css: 'div > div > article > div div[class*="_aatk"] div[role*="presentation"] ul > li:nth-child(2) > div > div > div > div > div > div  ',
                                is: "added",
                                callback: e => {
                                    let {added: t} = e;
                                    for (let e, r = 0; e = t[r]; r++) "1" !== e.dataset.sfSkip && (e.dataset.sfSkip = "1", 
                                    C.addDlBtn(e.parentNode, "", e));
                                }
                            }, {
                                css: 'div > div > article > div > div:nth-child(1) div[style*="height: calc(100% + 1px); position: absolute; width: 100%;"] > div',
                                is: "added",
                                callback: e => {
                                    for (let t, r = 0; t = e.added[r]; r++) t.dataset.sfSkip > 0 || t.querySelector("ul > li") || (t.dataset.sfSkip = "1", 
                                    C.addDlBtn(t.parentNode, "", t));
                                }
                            }, {
                                css: ".Embed > .Content.EmbedFrame > .EmbedVideo",
                                is: "added",
                                callback: e => {
                                    for (let t, r = 0; t = e.added[r]; r++) {
                                        if (t.dataset.sfSkip > 0) continue;
                                        t.dataset.sfSkip = "1";
                                        const e = Object(y.a)(t, ".Embed");
                                        e && (e.dataset.sfSkip = "1", C.addDlBtn(e, "embed", e));
                                    }
                                }
                            }, {
                                css: ".Embed > .Content.EmbedFrame.EmbedFrameWithSidecar > .EmbedSidecar > div > div > div + div > div > div > div > ul > li > div:nth-child(1) > div:nth-child(1)",
                                is: "added",
                                callback: e => {
                                    for (let t, r = 0; t = e.added[r]; r++) {
                                        if (t.dataset.sfSkip > 0) continue;
                                        t.dataset.sfSkip = "1";
                                        const e = Object(y.a)(t, ".Embed");
                                        if (e && e.dataset.sfSkip > 0) {
                                            const e = document.querySelector(".Header");
                                            e && O(e);
                                        }
                                        C.addDlBtn(t.parentNode, "", t);
                                    }
                                }
                            }, {
                                css: ".Embed",
                                is: "added",
                                callback: e => {
                                    for (let t, r = 0; t = e.added[r]; r++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    C.addDlBtn(t, "embed", t));
                                }
                            }, {
                                css: "." + n.a.onRemoveClassName,
                                is: "removed",
                                callback: e => {
                                    for (let t, r = 0; t = e.removed[r]; r++) n.a.onRemoveListener(t);
                                }
                            } ]
                        });
                    }
                }
            };
            function I(e) {
                return e.stopPropagation(), i.a.isFirefox ? (e.preventDefault(), function(e, t, r) {
                    "sf--story-btn" === r ? Object(S.a)({
                        category: "download",
                        subcategory: "in",
                        event: "story"
                    }) : t.includes("mp4") ? Object(S.a)({
                        category: "download",
                        subcategory: "in",
                        event: "video"
                    }) : Object(S.a)({
                        category: "download",
                        subcategory: "in",
                        event: "photo"
                    });
                    return Object(b.a)({
                        action: "ffInstagramDownloadMedia",
                        downloadFileUrl: e,
                        filename: t
                    });
                }(this.href, this.download)) : r.downloadOnClick(e, void 0, {
                    el: this
                });
            }
            function O(e) {
                const t = e.querySelectorAll("." + C.dlBtnClassName);
                for (let e, r = 0; e = t[r]; r++) e.classList.remove(n.a.onRemoveClassName), e.parentNode.removeChild(e);
            }
        }), (function() {
            return !Object(s.a)() || !!/\/\/[^\/]+\.[^\/]+\/p\//.test(location.href);
        }));
    }
});