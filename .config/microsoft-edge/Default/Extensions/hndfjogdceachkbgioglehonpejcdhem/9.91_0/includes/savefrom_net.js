!function(e) {
    function t(t) {
        for (var s, a, o = t[0], u = t[1], l = t[2], c = 0, m = []; c < o.length; c++) a = o[c], 
        Object.prototype.hasOwnProperty.call(n, a) && n[a] && m.push(n[a][0]), n[a] = 0;
        for (s in u) Object.prototype.hasOwnProperty.call(u, s) && (e[s] = u[s]);
        for (d && d(t); m.length; ) m.shift()();
        return r.push.apply(r, l || []), i();
    }
    function i() {
        for (var e, t = 0; t < r.length; t++) {
            for (var i = r[t], s = !0, o = 1; o < i.length; o++) {
                var u = i[o];
                0 !== n[u] && (s = !1);
            }
            s && (r.splice(t--, 1), e = a(a.s = i[0]));
        }
        return e;
    }
    var s = {}, n = {
        11: 0
    }, r = [];
    function a(t) {
        if (s[t]) return s[t].exports;
        var i = s[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(i.exports, i, i.exports, a), i.l = !0, i.exports;
    }
    a.m = e, a.c = s, a.d = function(e, t, i) {
        a.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: i
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
        var i = Object.create(null);
        if (a.r(i), Object.defineProperty(i, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var s in e) a.d(i, s, function(t) {
            return e[t];
        }.bind(null, s));
        return i;
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
    var o = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], u = o.push.bind(o);
    o.push = t, o = o.slice();
    for (var l = 0; l < o.length; l++) t(o[l]);
    var d = u;
    r.push([ 87, 0 ]), i();
}({
    87: function(e, t, i) {
        "use strict";
        i.r(t);
        var s = i(0), n = i(11), r = i(10), a = i(27), o = i(3), u = i(1), l = i(5), d = i(15), c = i(8), m = i(30), f = i(17), p = i(16), h = i(4), b = i(28);
        d.a.isSingle() && Object(r.b)("savefrom", (function(e, t) {
            const i = Object(n.a)(t);
            var r = t.preferences;
            s.a.onMessage.addListener((function(e, t, i) {
                "updatePreferences" !== e.action || Object.assign(r, e.preferences);
            })), setTimeout(() => a.run());
            var a = {
                name: e,
                scriptId: "savefrom__ext_script",
                dataAttr: "data-extension-disabled",
                attrObservers: [],
                run: function() {
                    if (a.setExtParams(), location.href.search(/\/(update-helper|userjs-setup)\.php/i) > -1) {
                        var e = document.getElementById("js-not-remind");
                        e && e.addEventListener("click", (function(e) {
                            0 === e.button && s.a.sendMessage({
                                action: "hideUserjsMigrationInfo"
                            });
                        }));
                    } else c.a.isAvailable() && this.mutationMode.enable();
                },
                mutationMode: {
                    observer: null,
                    stop: function() {
                        this.observer && this.observer.stop();
                    },
                    enable: function() {
                        if (this.observer) return this.observer.start();
                        this.observer = new c.a({
                            queries: [ {
                                css: "form",
                                is: "added",
                                callback: e => {
                                    for (let t, i = 0; t = e.added[i]; i++) a.waitFormId(t), a.mutationMode.stop();
                                }
                            }, {
                                css: '[href="#muxer"][data-sources]',
                                is: "added",
                                callback: e => {
                                    let {added: t} = e;
                                    t.forEach(e => {
                                        e.removeAttribute("download"), e.dataset.watched || (e.dataset.watched = "1", e.addEventListener("click", t => {
                                            t.preventDefault();
                                            const i = JSON.parse(e.dataset.sources);
                                            Object(p.a)(Object(h.e)(b.a, i), "sf-muxer-parent");
                                        }));
                                    });
                                }
                            } ]
                        });
                    }
                },
                waitFormId(e) {
                    const t = new m.a({
                        attrs: [ {
                            name: "id",
                            callback: t => {
                                "sf_form" === t.value && (a.bindForm(e), this.attrObservers.splice(0).forEach(e => e.stop()));
                            }
                        } ],
                        target: e
                    });
                    this.attrObservers.push(t);
                },
                bindForm(e) {
                    e.addEventListener("submit", (function(t) {
                        var n = e.sf_url.value;
                        if (n && "1" != e.getAttribute(a.dataAttr)) {
                            var r = {
                                getVKLinks: [ /^https?:\/\/(?:[a-z]+\.)?(?:vk\.com|vkontakte\.ru)\/(video-?\d+_-?\d+)/i, /^https?:\/\/(?:[a-z]+\.)?(?:vk\.com|vkontakte\.ru)\/video_ext.php\?(.*oid=-?\d+.*)$/i, /^https?:\/\/(?:[a-z]+\.)?(?:vk\.com|vkontakte\.ru)\/[\w\-\.]+\?.*z=(video-?\d+_-?\d+)/i ],
                                getYoutubeLinks: [ /^https?:\/\/(?:[a-z]+\.)?youtube\.com\/(?:#!?\/)?watch\?.*v=([\w\-]+)/i, /^https?:\/\/(?:[a-z0-9]+\.)?youtube\.com\/(?:embed|v)\/([\w\-]+)/i, /^https?:\/\/(?:[a-z]+\.)?youtu\.be\/([\w\-]+)/i ],
                                getVimeoLinks: [ /^https?:\/\/(?:[\w\-]+\.)?vimeo\.com\/(?:\w+\#)?(\d+)/i, /^https?:\/\/player\.vimeo\.com\/video\/(\d+)/i, /^https?:\/\/(?:[\w\-]+\.)?vimeo\.com\/channels\/(?:[^\/]+)\/(\d+)$/i, /^https?:\/\/(?:[\w\-]+\.)?vimeo\.com\/[^\/]+\/review\/(\d+)\/(?:\d+)/i ],
                                getDailymotionLinks: [ /^http:\/\/(?:www\.)?dai\.ly\/([a-z0-9]+)_?/i, /^https?:\/\/(?:[\w]+\.)?dailymotion\.com(?:\/embed|\/swf)?\/video\/([a-z0-9]+)_?/i ],
                                getFacebookLinks: [ /^https?:\/\/(?:[\w]+\.)?facebook\.com(?:\/video)?\/video.php.*[?&]{1}v=([0-9]+).*/i, /^https?:\/\/(?:[\w]+\.)?facebook\.com\/.+\/videos(?:\/\w[^\/]+)?\/(\d+)/i ],
                                getMailruLinks: [ /^https?:\/\/my\.mail\.ru\/([^\/]+\/[^\/]+\/[^\/]+\/[^\/]+\/[^\/]+\.html).*/i, /^https?:\/\/videoapi\.my\.mail\.ru\/videos\/(embed\/[^\/]+\/[^\/]+\/[^\/]+\/[^\/]+\.html).*/i ]
                            };
                            for (var o in r) for (var u = 0; u < r[o].length; u++) {
                                var l = n.match(r[o][u]);
                                if (l && l.length > 1) {
                                    l = l[1];
                                    var d = i.getMatchFirst(n, /list=([\w\-]+)/i);
                                    t.preventDefault(), t.stopPropagation();
                                    var c = {
                                        extVideoId: l,
                                        action: o,
                                        checkSubtitles: !0,
                                        checkLinks: !0
                                    };
                                    return "getVimeoLinks" === o && (c.url = n), s.a.sendMessage(c, (function(e) {
                                        a.setLinks(e.action, e.extVideoId, e.links, e.title, null, e.subtitles, d, e.duration, e.thumb, e.checkLinks);
                                    })), !1;
                                }
                            }
                        }
                    }), !1), document.body.addEventListener("click", (function(e) {
                        var t = e.target;
                        if ("I" === t.tagName && t.classList.contains("file-info-btn")) a.onInfoBtnClick.call(t, e); else {
                            if ("A" != t.tagName) {
                                if ("A" != t.parentNode.tagName) return;
                                t = t.parentNode;
                            }
                            if ((s.a.isChrome || s.a.isFirefox || s.a.isGM) && t.classList.contains("link-download") && !t.classList.contains("disabled") && t.getAttribute("download")) return t.classList.contains("ga_track_events") && t.getAttribute("data-ga-event") && o.a.trigger(t, "sendstats", {
                                bubbles: !0,
                                cancelable: !1
                            }), i.downloadOnClick(e, null, {
                                withoutPropagation: !0
                            });
                            var n = t.getAttribute("data-video-id");
                            if (n && "1" != t.getAttribute(a.dataAttr)) {
                                var r = {
                                    vk: "getVKLinks",
                                    yt: "getYoutubeLinks"
                                };
                                if (2 == (n = n.split(":", 2)).length && r[n[0]]) {
                                    e.preventDefault(), e.stopPropagation(), t.style.display = "none", t.id || (t.id = n[0] + "_" + n[1] + "_" + 1e3 * Math.random() + "_" + (new Date).getTime());
                                    var u = {
                                        extVideoId: n[1],
                                        action: r[n[0]],
                                        checkSubtitles: !0,
                                        checkLinks: !0
                                    };
                                    return s.a.sendMessage(u, (function(e) {
                                        a.setLinks(e.action, e.extVideoId, e.links, e.title, t, e.subtitles, null, e.duration, e.thumb, e.checkLinks);
                                    })), !1;
                                }
                            }
                        }
                    }), !0);
                },
                onInfoBtnClick: function(e) {
                    if (e.preventDefault(), e.stopPropagation(), !this.classList.contains("sf-clicked")) {
                        this.classList.add("sf-clicked");
                        var t = "sf-btn" + function() {
                            for (var e = Date.now(), t = e; e === t; ) t = Date.now();
                            return t;
                        }();
                        this.classList.add(t);
                        var n = function() {
                            var e = document.getElementsByClassName("sf-script")[0];
                            void 0 !== e && e.parentNode.removeChild(e);
                        };
                        n(), document.body.appendChild(u.a.create("script", {
                            class: "sf-script",
                            text: '(function(btnClassName){try{var btn=document.getElementsByClassName(btnClassName);var $btn=$(btn);$btn.unbind("click").removeAttr("onclick").addClass("active");if(btn.onclick){btn.onclick=null}var parent=$btn.closest(".result-box").find(".meta")[0];if(!parent){return}var boxId="file_info"+btnClassName;var box=sf.append(parent,"div",{"id":boxId,"class":"media-info"});sf.append(box,"span",{id:boxId+"_busy"});sf.busy(boxId+"_busy",true)}catch(err){}})(' + JSON.stringify(t) + ")"
                        }));
                        var r = this.nextElementSibling.href, a = this.nextElementSibling.textContent;
                        s.a.sendMessage({
                            action: "getFileSize",
                            url: r
                        }, (function(e) {
                            var r = e.fileSize, o = {
                                size: {
                                    name: {
                                        trans: s.a.i18n.getMessage("size")
                                    },
                                    value: i.sizeHuman(r)
                                }
                            };
                            n(), document.body.appendChild(u.a.create("script", {
                                class: "sf-script",
                                text: '(function(btnClassName,title,json){try{var busy=document.getElementById("file_info"+btnClassName+"_busy");$(busy).slideUp();var btn=document.getElementsByClassName(btnClassName);sf.fileInfo.show(json,title,btn,busy.parentNode)}catch(err){}})(' + [ JSON.stringify(t), JSON.stringify(a), JSON.stringify(o) ].join(",") + ")"
                            }));
                        }));
                    }
                },
                setExtParams: function() {
                    var e = u.a.create("script", {
                        id: "savefrom__ext_params",
                        type: "text/javascript"
                    }), t = {
                        id: r.sfHelperName,
                        version: r.version,
                        enable: 1
                    };
                    e.textContent = '(function(json){try{if(window.setBrowserExtension&&typeof setBrowserExtension=="function"){setBrowserExtension(json)}}catch(err){}})(' + JSON.stringify(t) + ")", 
                    document.body.appendChild(e);
                },
                setLinks: function(e, t, i, s, n, r, o, u, l, d) {
                    if (!1 !== d) switch (e) {
                      case "getYoutubeLinks":
                        a.setYoutubeLinks(t, i, s, n, r, o, u, l);
                        break;

                      case "getVKLinks":
                        a.setVKLinks(t, i, s, n, u, l);
                        break;

                      case "getVimeoLinks":
                        a.setVimeoLinks(t, i, s, n, u, l);
                        break;

                      case "getDailymotionLinks":
                        a.setDailymotionLinks(t, i, s, n, u, l);
                        break;

                      case "getFacebookLinks":
                        a.setFacebookLinks(t, i, s, n, u, l);
                        break;

                      case "getMailruLinks":
                        a.setMailruLinks(t, i, s, n, u, l);
                    } else a.handleError(n);
                },
                handleError: function(e) {
                    if (e) e && (e.style.display = "", e.setAttribute(a.dataAttr, "1"), e.click()); else {
                        var t = document.getElementById("sf_form");
                        t && (t.setAttribute(a.dataAttr, "1"), t.submit(), t.removeAttribute(a.dataAttr));
                    }
                },
                showVideoResult: function(e, t) {
                    e && e.url && e.url.length ? Object(f.a)([ t && t.id, e ], (e, t) => {
                        if (e) {
                            let i = document.getElementById(e);
                            sf.result.replaceAjaxResult(t, !0, !0, i);
                        } else sf.finishRequest(!0), sf.videoResult.show(t);
                    }) : a.handleError(t);
                },
                setVKLinks: function(e, t, s, n, r, o) {
                    if (e && t) {
                        var u = {
                            id: e,
                            url: t,
                            hosting: "vk.com (h)",
                            meta: {
                                title: s ? l.a.modify(s) : "download",
                                source: "http://vk.com/" + e,
                                duration: i.secondsToDuration(r)
                            }
                        };
                        o && (u.thumb = o);
                        for (var d = 0; d < u.url.length; d++) u.url[d].info_url = "#", !u.url[d].ext && u.url[d].type && (u.url[d].ext = u.url[d].type), 
                        u.sd || u.url[d].subname ? !u.hd && u.url[d].subname && parseInt(u.url[d].subname) >= 720 && (u.hd = {
                            url: u.url[d].url
                        }) : u.sd = {
                            url: u.url[d].url
                        };
                        a.showVideoResult(u, n);
                    } else a.handleError(n);
                },
                setYoutubeLinks(e, t, n, r, o, u, d) {
                    if (!e || !t) return a.handleError(r);
                    let c = {
                        id: e,
                        url: [],
                        hosting: "101 (h)",
                        meta: {
                            title: n ? l.a.modify(n) : "download",
                            source: e ? "http://youtube.com/watch?v=" + e : "",
                            duration: i.secondsToDuration(d)
                        },
                        thumb: e ? "http://i.ytimg.com/vi/" + e + "/hqdefault.jpg" : ""
                    }, m = !1;
                    i.video.yt.init();
                    let f = t.meta || {};
                    const p = i.video.yt.format;
                    for (let e in p) {
                        const i = p[e];
                        for (let s in i) {
                            let n = f[s] || {};
                            if (t[s]) {
                                !m && t[s].search(/(\?|&)sig(nature)?=/i) > -1 && (m = !0);
                                let r = i[s].quality;
                                n.quality && (r = n.quality);
                                let a = {
                                    url: t[s],
                                    name: e,
                                    subname: r,
                                    info_url: "#",
                                    type: e,
                                    quality: r,
                                    attr: {}
                                };
                                i[s].sFps && (a.subname += " " + (n.fps || 60)), [ "Audio AAC", "Audio Vorbis", "Audio Opus" ].includes(e) && (a.attr.style = "white-space: nowrap;");
                                const o = {
                                    "Audio AAC": {
                                        type: "AAC",
                                        ext: "aac"
                                    },
                                    "Audio Vorbis": {
                                        type: "Vorbis",
                                        ext: "webm"
                                    },
                                    "Audio Opus": {
                                        type: "Opus",
                                        ext: "webm"
                                    }
                                };
                                i[s]["3d"] ? (a.name = "3D " + a.name, a["3d"] = !0) : i[s].noAudio ? (a.group = "MP4 ", 
                                a.attr.class = "no-audio") : o[e] ? a = Object.assign({}, a, o[e]) : ("flv" !== e.toLowerCase() || c.sd || (c.sd = {
                                    url: t[s]
                                }), parseInt(r) >= 720 && c.sd && !c.hd && (c.hd = {
                                    url: t[s]
                                })), void 0 === a.ext && a.type && (a.ext = a.type.toLowerCase()), c.url.push(a), 
                                delete t[s];
                            }
                        }
                    }
                    if (!m) return void a.handleError(r);
                    if (o && o.length > 0) {
                        let t = e.replace(/[^\w]/, "_"), n = "yt_subs_btn_" + t;
                        t = "yt_subs_" + t;
                        let r = "extension", a = c.meta.title ? btoa(i.utf8Encode(c.meta.title)) : "";
                        c.action = [], c.action.push({
                            name: s.a.i18n.getMessage("subtitles"),
                            attr: {
                                id: n,
                                href: "#"
                            },
                            bind: {
                                click: {
                                    fn: 'sf.youtubeSubtitles("{vid}","{subsId}","{btnId}","{subtToken}","{subsTitle}")'.replace("{vid}", e).replace("{subsId}", t).replace("{btnId}", "#" + n).replace("{subtToken}", r).replace("{subsTitle}", a)
                                }
                            }
                        });
                    }
                    if (!c.url.find(e => {
                        const t = "MP4" === e.type.toLowerCase() && parseInt(e.quality) >= 720;
                        return (!e.attr || "no-audio" !== e.attr.class) && t;
                    }) && t.meta && t.meta.muxer) {
                        const e = t.meta.muxer;
                        c.url.push({
                            ext: e.mmProps.format,
                            type: e.mmProps.format.toUpperCase(),
                            url: "#muxer",
                            name: "MP4",
                            subname: e.quality,
                            info_url: "#",
                            quality: e.quality,
                            attr: {
                                "data-sources": JSON.stringify(e.mmProps)
                            }
                        });
                    }
                    a.showVideoResult(c, r);
                },
                setVimeoLinks: function(e, t, s, n, r, o) {
                    if (e && t) {
                        t && Array.isArray(t) && (t = t.sort((e, t) => {
                            const i = parseInt(e.height), s = parseInt(t.height);
                            return isNaN(i) && isNaN(s) ? 0 : isNaN(i) ? -1 : isNaN(s) ? 1 : i > s ? -1 : i === s ? 0 : 1;
                        }));
                        var u = {
                            id: e,
                            url: t,
                            hosting: "vimeo.com (h)",
                            meta: {
                                title: s ? l.a.modify(s) : "download",
                                source: "http://vimeo.com/" + e,
                                duration: i.secondsToDuration(r)
                            }
                        };
                        o && (u.thumb = o);
                        for (var d = 0; d < u.url.length; d++) u.url[d].info_url = "#", !u.url[d].ext && u.url[d].type && (u.url[d].ext = u.url[d].type), 
                        u.sd || "SD" != u.url[d].name ? u.hd || "HD" != u.url[d].name || (u.hd = {
                            url: u.url[d].url
                        }) : u.sd = {
                            url: u.url[d].url
                        };
                        a.showVideoResult(u, n);
                    } else a.handleError(n);
                },
                setDailymotionLinks: function(e, t, s, n, r, o) {
                    if (e && t) {
                        var u = t.filter((function(e) {
                            if (!e.extra) return !0;
                        })), d = {
                            id: e,
                            url: u = u.map(e => {
                                const t = /\d+x(\d+)/;
                                if (e.ext && e.name) {
                                    const i = e.name.match(t);
                                    i && i[1] && (e.name = e.ext.toUpperCase() + " " + (i && i[1]));
                                }
                                return e;
                            }),
                            hosting: "dailymotion.com (h)",
                            meta: {
                                title: s ? l.a.modify(s) : "download",
                                source: "http://dai.ly/" + e,
                                duration: i.secondsToDuration(r)
                            }
                        };
                        o && (d.thumb = o);
                        for (var c, m = 0, f = 0, p = 0; c = u[p]; p++) c.info_url = "#", c.height >= 720 ? m < c.height && (d.hd = {
                            url: c.url
                        }, m = c.height) : f < c.height && (d.sd = {
                            url: c.url
                        }, f = c.height), delete c.height;
                        a.showVideoResult(d, n);
                    } else a.handleError(n);
                },
                setFacebookLinks: function(e, t, s, n, r, o) {
                    if (e && t) {
                        var u = {
                            id: e,
                            url: t,
                            hosting: "facebook.com (h)",
                            meta: {
                                title: s ? l.a.modify(s) : "download",
                                source: "https://facebook.com/video.php?v=" + e,
                                duration: i.secondsToDuration(r)
                            }
                        };
                        o && (u.thumb = o);
                        for (var d, c = 0; d = t[c]; c++) d.info_url = "#", "SD" === d.name ? u.sd = {
                            url: d.url
                        } : "HD" === d.name && (u.hd = {
                            url: d.url
                        }), d.subname = d.name, d.name = d.ext;
                        a.showVideoResult(u, n);
                    } else a.handleError(n);
                },
                setMailruLinks: function(e, t, s, n, r, o) {
                    if (e && t) {
                        var u = {
                            id: e,
                            url: t,
                            hosting: "mail.ru (h)",
                            meta: {
                                title: s ? l.a.modify(s) : "download",
                                source: "http://my.mail.ru/" + e,
                                duration: i.secondsToDuration(r)
                            }
                        };
                        o && (u.thumb = o);
                        for (var d, c = 0, m = 0; d = u.url[m]; m++) d.info_url = "#", isNaN(parseInt(d.subname)) ? "sd" === d.subname.toLowerCase() ? u.sd = {
                            url: d.url
                        } : "hd" === d.subname.toLowerCase() && (u.hd = {
                            url: d.url
                        }) : (c < d.subname && d.subname < 720 && (u.sd = {
                            url: d.url
                        }, c = d.subname), !u.hd && d.subname >= "720" && (u.hd = {
                            url: d.url
                        }));
                        a.showVideoResult(u, n);
                    } else a.handleError(n);
                }
            };
        }), (function() {
            return Object(a.a)() ? s.a.isGM && -1 !== location.href.indexOf("/tools/helper-check.html") : [ "/faq.php", "/advertising.php", "/EULA.html", "/terms.html", "/privacy-policy.html", "/apk", "/webmaster.php" ].every(e => -1 === location.href.indexOf(e));
        }));
    }
});