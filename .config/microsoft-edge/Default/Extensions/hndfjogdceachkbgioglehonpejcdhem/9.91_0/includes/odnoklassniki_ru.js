!function(e) {
    function t(t) {
        for (var o, i, s = t[0], d = t[1], c = t[2], u = 0, f = []; u < s.length; u++) i = s[u], 
        Object.prototype.hasOwnProperty.call(a, i) && a[i] && f.push(a[i][0]), a[i] = 0;
        for (o in d) Object.prototype.hasOwnProperty.call(d, o) && (e[o] = d[o]);
        for (l && l(t); f.length; ) f.shift()();
        return r.push.apply(r, c || []), n();
    }
    function n() {
        for (var e, t = 0; t < r.length; t++) {
            for (var n = r[t], o = !0, s = 1; s < n.length; s++) {
                var d = n[s];
                0 !== a[d] && (o = !1);
            }
            o && (r.splice(t--, 1), e = i(i.s = n[0]));
        }
        return e;
    }
    var o = {}, a = {
        9: 0
    }, r = [];
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
    var s = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], d = s.push.bind(s);
    s.push = t, s = s.slice();
    for (var c = 0; c < s.length; c++) t(s[c]);
    var l = d;
    r.push([ 98, 0 ]), n();
}({
    82: function(e, t, n) {
        var o;
        e.exports = (o = n(83), function(e) {
            var t = o, n = t.lib, a = n.WordArray, r = n.Hasher, i = t.algo, s = [];
            !function() {
                for (var t = 0; t < 64; t++) s[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0;
            }();
            var d = i.MD5 = r.extend({
                _doReset: function() {
                    this._hash = new a.init([ 1732584193, 4023233417, 2562383102, 271733878 ]);
                },
                _doProcessBlock: function(e, t) {
                    for (var n = 0; n < 16; n++) {
                        var o = t + n, a = e[o];
                        e[o] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8);
                    }
                    var r = this._hash.words, i = e[t + 0], d = e[t + 1], p = e[t + 2], h = e[t + 3], m = e[t + 4], v = e[t + 5], g = e[t + 6], y = e[t + 7], k = e[t + 8], w = e[t + 9], b = e[t + 10], _ = e[t + 11], x = e[t + 12], O = e[t + 13], M = e[t + 14], S = e[t + 15], C = r[0], P = r[1], I = r[2], L = r[3];
                    C = c(C, P, I, L, i, 7, s[0]), L = c(L, C, P, I, d, 12, s[1]), I = c(I, L, C, P, p, 17, s[2]), 
                    P = c(P, I, L, C, h, 22, s[3]), C = c(C, P, I, L, m, 7, s[4]), L = c(L, C, P, I, v, 12, s[5]), 
                    I = c(I, L, C, P, g, 17, s[6]), P = c(P, I, L, C, y, 22, s[7]), C = c(C, P, I, L, k, 7, s[8]), 
                    L = c(L, C, P, I, w, 12, s[9]), I = c(I, L, C, P, b, 17, s[10]), P = c(P, I, L, C, _, 22, s[11]), 
                    C = c(C, P, I, L, x, 7, s[12]), L = c(L, C, P, I, O, 12, s[13]), I = c(I, L, C, P, M, 17, s[14]), 
                    C = l(C, P = c(P, I, L, C, S, 22, s[15]), I, L, d, 5, s[16]), L = l(L, C, P, I, g, 9, s[17]), 
                    I = l(I, L, C, P, _, 14, s[18]), P = l(P, I, L, C, i, 20, s[19]), C = l(C, P, I, L, v, 5, s[20]), 
                    L = l(L, C, P, I, b, 9, s[21]), I = l(I, L, C, P, S, 14, s[22]), P = l(P, I, L, C, m, 20, s[23]), 
                    C = l(C, P, I, L, w, 5, s[24]), L = l(L, C, P, I, M, 9, s[25]), I = l(I, L, C, P, h, 14, s[26]), 
                    P = l(P, I, L, C, k, 20, s[27]), C = l(C, P, I, L, O, 5, s[28]), L = l(L, C, P, I, p, 9, s[29]), 
                    I = l(I, L, C, P, y, 14, s[30]), C = u(C, P = l(P, I, L, C, x, 20, s[31]), I, L, v, 4, s[32]), 
                    L = u(L, C, P, I, k, 11, s[33]), I = u(I, L, C, P, _, 16, s[34]), P = u(P, I, L, C, M, 23, s[35]), 
                    C = u(C, P, I, L, d, 4, s[36]), L = u(L, C, P, I, m, 11, s[37]), I = u(I, L, C, P, y, 16, s[38]), 
                    P = u(P, I, L, C, b, 23, s[39]), C = u(C, P, I, L, O, 4, s[40]), L = u(L, C, P, I, i, 11, s[41]), 
                    I = u(I, L, C, P, h, 16, s[42]), P = u(P, I, L, C, g, 23, s[43]), C = u(C, P, I, L, w, 4, s[44]), 
                    L = u(L, C, P, I, x, 11, s[45]), I = u(I, L, C, P, S, 16, s[46]), C = f(C, P = u(P, I, L, C, p, 23, s[47]), I, L, i, 6, s[48]), 
                    L = f(L, C, P, I, y, 10, s[49]), I = f(I, L, C, P, M, 15, s[50]), P = f(P, I, L, C, v, 21, s[51]), 
                    C = f(C, P, I, L, x, 6, s[52]), L = f(L, C, P, I, h, 10, s[53]), I = f(I, L, C, P, b, 15, s[54]), 
                    P = f(P, I, L, C, d, 21, s[55]), C = f(C, P, I, L, k, 6, s[56]), L = f(L, C, P, I, S, 10, s[57]), 
                    I = f(I, L, C, P, g, 15, s[58]), P = f(P, I, L, C, O, 21, s[59]), C = f(C, P, I, L, m, 6, s[60]), 
                    L = f(L, C, P, I, _, 10, s[61]), I = f(I, L, C, P, p, 15, s[62]), P = f(P, I, L, C, w, 21, s[63]), 
                    r[0] = r[0] + C | 0, r[1] = r[1] + P | 0, r[2] = r[2] + I | 0, r[3] = r[3] + L | 0;
                },
                _doFinalize: function() {
                    var t = this._data, n = t.words, o = 8 * this._nDataBytes, a = 8 * t.sigBytes;
                    n[a >>> 5] |= 128 << 24 - a % 32;
                    var r = e.floor(o / 4294967296), i = o;
                    n[15 + (a + 64 >>> 9 << 4)] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8), 
                    n[14 + (a + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), 
                    t.sigBytes = 4 * (n.length + 1), this._process();
                    for (var s = this._hash, d = s.words, c = 0; c < 4; c++) {
                        var l = d[c];
                        d[c] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8);
                    }
                    return s;
                },
                clone: function() {
                    var e = r.clone.call(this);
                    return e._hash = this._hash.clone(), e;
                }
            });
            function c(e, t, n, o, a, r, i) {
                var s = e + (t & n | ~t & o) + a + i;
                return (s << r | s >>> 32 - r) + t;
            }
            function l(e, t, n, o, a, r, i) {
                var s = e + (t & o | n & ~o) + a + i;
                return (s << r | s >>> 32 - r) + t;
            }
            function u(e, t, n, o, a, r, i) {
                var s = e + (t ^ n ^ o) + a + i;
                return (s << r | s >>> 32 - r) + t;
            }
            function f(e, t, n, o, a, r, i) {
                var s = e + (n ^ (t | ~o)) + a + i;
                return (s << r | s >>> 32 - r) + t;
            }
            t.MD5 = r._createHelper(d), t.HmacMD5 = r._createHmacHelper(d);
        }(Math), o.MD5);
    },
    83: function(e, t, n) {
        (function(t) {
            var o;
            e.exports = (o = o || function(e, o) {
                var a;
                if ("undefined" != typeof window && window.crypto && (a = window.crypto), !a && "undefined" != typeof window && window.msCrypto && (a = window.msCrypto), 
                !a && void 0 !== t && t.crypto && (a = t.crypto), !a) try {
                    a = n(!function() {
                        var e = new Error("Cannot find module 'crypto'");
                        throw e.code = "MODULE_NOT_FOUND", e;
                    }());
                } catch (e) {}
                var r = function() {
                    if (a) {
                        if ("function" == typeof a.getRandomValues) try {
                            return a.getRandomValues(new Uint32Array(1))[0];
                        } catch (e) {}
                        if ("function" == typeof a.randomBytes) try {
                            return a.randomBytes(4).readInt32LE();
                        } catch (e) {}
                    }
                    throw new Error("Native crypto module could not be used to get secure random number.");
                }, i = Object.create || function() {
                    function e() {}
                    return function(t) {
                        var n;
                        return e.prototype = t, n = new e, e.prototype = null, n;
                    };
                }(), s = {}, d = s.lib = {}, c = d.Base = {
                    extend: function(e) {
                        var t = i(this);
                        return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function() {
                            t.$super.init.apply(this, arguments);
                        }), t.init.prototype = t, t.$super = this, t;
                    },
                    create: function() {
                        var e = this.extend();
                        return e.init.apply(e, arguments), e;
                    },
                    init: function() {},
                    mixIn: function(e) {
                        for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                        e.hasOwnProperty("toString") && (this.toString = e.toString);
                    },
                    clone: function() {
                        return this.init.prototype.extend(this);
                    }
                }, l = d.WordArray = c.extend({
                    init: function(e, t) {
                        e = this.words = e || [], this.sigBytes = null != t ? t : 4 * e.length;
                    },
                    toString: function(e) {
                        return (e || f).stringify(this);
                    },
                    concat: function(e) {
                        var t = this.words, n = e.words, o = this.sigBytes, a = e.sigBytes;
                        if (this.clamp(), o % 4) for (var r = 0; r < a; r++) {
                            var i = n[r >>> 2] >>> 24 - r % 4 * 8 & 255;
                            t[o + r >>> 2] |= i << 24 - (o + r) % 4 * 8;
                        } else for (r = 0; r < a; r += 4) t[o + r >>> 2] = n[r >>> 2];
                        return this.sigBytes += a, this;
                    },
                    clamp: function() {
                        var t = this.words, n = this.sigBytes;
                        t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4);
                    },
                    clone: function() {
                        var e = c.clone.call(this);
                        return e.words = this.words.slice(0), e;
                    },
                    random: function(e) {
                        for (var t = [], n = 0; n < e; n += 4) t.push(r());
                        return new l.init(t, e);
                    }
                }), u = s.enc = {}, f = u.Hex = {
                    stringify: function(e) {
                        for (var t = e.words, n = e.sigBytes, o = [], a = 0; a < n; a++) {
                            var r = t[a >>> 2] >>> 24 - a % 4 * 8 & 255;
                            o.push((r >>> 4).toString(16)), o.push((15 & r).toString(16));
                        }
                        return o.join("");
                    },
                    parse: function(e) {
                        for (var t = e.length, n = [], o = 0; o < t; o += 2) n[o >>> 3] |= parseInt(e.substr(o, 2), 16) << 24 - o % 8 * 4;
                        return new l.init(n, t / 2);
                    }
                }, p = u.Latin1 = {
                    stringify: function(e) {
                        for (var t = e.words, n = e.sigBytes, o = [], a = 0; a < n; a++) {
                            var r = t[a >>> 2] >>> 24 - a % 4 * 8 & 255;
                            o.push(String.fromCharCode(r));
                        }
                        return o.join("");
                    },
                    parse: function(e) {
                        for (var t = e.length, n = [], o = 0; o < t; o++) n[o >>> 2] |= (255 & e.charCodeAt(o)) << 24 - o % 4 * 8;
                        return new l.init(n, t);
                    }
                }, h = u.Utf8 = {
                    stringify: function(e) {
                        try {
                            return decodeURIComponent(escape(p.stringify(e)));
                        } catch (e) {
                            throw new Error("Malformed UTF-8 data");
                        }
                    },
                    parse: function(e) {
                        return p.parse(unescape(encodeURIComponent(e)));
                    }
                }, m = d.BufferedBlockAlgorithm = c.extend({
                    reset: function() {
                        this._data = new l.init, this._nDataBytes = 0;
                    },
                    _append: function(e) {
                        "string" == typeof e && (e = h.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;
                    },
                    _process: function(t) {
                        var n, o = this._data, a = o.words, r = o.sigBytes, i = this.blockSize, s = r / (4 * i), d = (s = t ? e.ceil(s) : e.max((0 | s) - this._minBufferSize, 0)) * i, c = e.min(4 * d, r);
                        if (d) {
                            for (var u = 0; u < d; u += i) this._doProcessBlock(a, u);
                            n = a.splice(0, d), o.sigBytes -= c;
                        }
                        return new l.init(n, c);
                    },
                    clone: function() {
                        var e = c.clone.call(this);
                        return e._data = this._data.clone(), e;
                    },
                    _minBufferSize: 0
                }), v = (d.Hasher = m.extend({
                    cfg: c.extend(),
                    init: function(e) {
                        this.cfg = this.cfg.extend(e), this.reset();
                    },
                    reset: function() {
                        m.reset.call(this), this._doReset();
                    },
                    update: function(e) {
                        return this._append(e), this._process(), this;
                    },
                    finalize: function(e) {
                        return e && this._append(e), this._doFinalize();
                    },
                    blockSize: 16,
                    _createHelper: function(e) {
                        return function(t, n) {
                            return new e.init(n).finalize(t);
                        };
                    },
                    _createHmacHelper: function(e) {
                        return function(t, n) {
                            return new v.HMAC.init(e, n).finalize(t);
                        };
                    }
                }), s.algo = {});
                return s;
            }(Math), o);
        }).call(this, n(84));
    },
    84: function(e, t) {
        var n;
        n = function() {
            return this;
        }();
        try {
            n = n || new Function("return this")();
        } catch (e) {
            "object" == typeof window && (n = window);
        }
        e.exports = n;
    },
    98: function(e, t, n) {
        "use strict";
        n.r(t);
        var o = n(0), a = n(11), r = n(10), i = n(26), s = n(24), d = n(18), c = n(36), l = n(9), u = n(21), f = n(14), p = n(38), h = n(3), m = n(1), v = n(17), g = n(5), y = n(6);
        var k = function(e) {
            const t = [];
            for (;e.parentElement && 1 === e.parentElement.nodeType; ) {
                let n = "";
                const o = [].slice.call(e.parentElement.children);
                o.length > 1 && (n = `:nth-child(${o.indexOf(e) + 1})`), t.unshift(`${e.tagName}${n}`), 
                e = e.parentElement;
            }
            return t.join(">");
        }, w = n(15), b = n(8), _ = n(31), x = n(33), O = n(12);
        var M = function(e, t) {
            const n = (new DOMParser).parseFromString("<html><body>" + e + "</body></html>", "text/html");
            if (t) {
                let e = n.head.querySelector("base");
                e || (e = n.createElement("base"), e.href = t, n.head.appendChild(e));
            }
            return n;
        }, S = n(28), C = n(16), P = n(4), I = n(22), L = n(39), j = n(7), N = n(13);
        const q = n(42), A = Object(y.a)("odnoklassniki_ru"), E = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
        w.a.isSingle() && Object(r.b)("odnoklassniki", (function(e, t) {
            const r = Object(a.a)(t);
            var y = t.preferences, w = y.moduleOdnoklassniki ? 1 : 0, T = o.a.isChrome || o.a.isFirefox || o.a.isGM && o.a.isTM;
            o.a.onMessage.addListener((function(t, n, o) {
                if ("getModuleInfo" === t.action) {
                    if (t.url !== location.href) return;
                    return o({
                        state: w,
                        moduleName: e
                    });
                }
                if ("changeState" === t.action) {
                    if (e !== t.moduleName) return;
                    return R.changeState(t.state);
                }
                "updatePreferences" !== t.action ? w && ("updateLinks" === t.action && D(), "downloadMP3Files" === t.action && (T ? F.downloadMP3Files() : F.showListOfAudioFiles(!1)), 
                "downloadPlaylist" === t.action && F.showListOfAudioFiles(!0)) : Object.assign(y, t.preferences);
            })), w && setTimeout((function() {
                R.run();
            }));
            var R = {
                linkCache: {},
                contextMenu: null,
                videoToken: null,
                run: function() {
                    if (w = 1, F.getJsSessionId(), U.injectStyle(), V.injectStyle(), b.a.isAvailable()) return R.mutationMode.enable();
                },
                changeState: function(e) {
                    w = e, H.rmBtn(), F.disable(), V.rmCurrentPhotoBtn(), U.disable(), U.rmBtn(), R.hideMenu(), 
                    R.mutationMode.stop(), R.clearCache(), e && R.run();
                },
                hideMenu: function() {
                    R.contextMenu && (R.contextMenu.hide(), R.contextMenu = null);
                },
                clearCache: function() {
                    var e = R.linkCache;
                    for (var t in e) delete e[t];
                },
                mutationMode: {
                    observer: null,
                    stop: function() {
                        this.observer && this.observer.stop(), [ "sfSkip" ].forEach((function(e) {
                            for (var t, n = Object(d.a)(e), o = document.querySelectorAll("[" + n + "]"), a = 0; t = o[a]; a++) t.removeAttribute(n);
                        }));
                    },
                    wrapOnPhotoOver: function() {
                        w && V.addCurrentDlBtn(this);
                    },
                    wrapVideoFeedOnImgOver: function() {
                        w && U.onImgOver.call(this);
                    },
                    wrapAudioOnMouseOver: function() {
                        w && F.onMouseOver.apply(this, arguments);
                    },
                    wrapAudioOnMouseOut: function() {
                        w && F.onMouseOut.apply(this, arguments);
                    },
                    wrapNewAudioOnMouseEnter: function() {
                        if (w) try {
                            F.onNewMouseEnter.apply(this, arguments);
                        } catch (e) {
                            A.error("wrapNewAudioOnMouseEnter error", e);
                        }
                    },
                    enable: function() {
                        if (this.observer) return this.observer.start();
                        var e = this;
                        const t = t => {
                            for (let n, o = 0; n = t.added[o]; o++) n.sfSkip > 0 || (n.sfSkip = "1", h.a.on(n, "mouseenter", e.wrapAudioOnMouseOver), 
                            h.a.on(n, "mouseleave", e.wrapAudioOnMouseOut));
                        }, n = e => {
                            let {added: t} = e;
                            t.forEach(e => {
                                e.sfSkip || (e.sfSkip = "1", F.appendDownloadMobileMusic(e));
                            });
                        }, a = t => {
                            for (let n, o = 0; n = t.added[o]; o++) n.dataset.sfSkip > 0 || (n.dataset.sfSkip = "1", 
                            h.a.one(n, "mouseenter", e.wrapVideoFeedOnImgOver));
                        }, s = e => {
                            let {added: t} = e;
                            t.forEach(e => {
                                if (e.dataset.sfSkip) return;
                                e.dataset.sfSkip = "1";
                                let t = e.closest(".section, .feed-card, .theme-comments-head");
                                t && H.appendDownloadMobileVideo(t);
                            });
                        }, d = [];
                        "m.ok.ru" === location.host && d.push({
                            css: ".music_track_i:not(.actionButton)",
                            is: "added",
                            callback: n
                        }, {
                            css: "#mvplayer_cont, .feed-card_item .vdo.playb, .theme-comments-head [data-video]",
                            is: "added",
                            callback: s
                        }), this.observer = new b.a({
                            queries: [ ...d, {
                                css: ".track.js-track, .track-with-cover.h-mod",
                                is: "added",
                                callback: t
                            }, {
                                css: ".track-with-cover_cnt",
                                is: "added",
                                callback: async e => {
                                    let {added: t} = e;
                                    t.filter(e => !e.dataset.sfReady).map(e => (e.dataset.sfReady = 1, e)).map(e => {
                                        const t = document.createElement("a");
                                        Object(j.a)({
                                            category: "append",
                                            subcategory: "ok",
                                            event: "b"
                                        }), t.classList.add("sf-audio", "savefrom_ok_download"), e.style.position = "relative", 
                                        e.appendChild(t), t.style.position = "absolute", t.style.top = "10px", t.style.right = "15px", 
                                        t.style.width = "16px", t.style.height = "16px";
                                        const n = e.closest(".track-with-cover").dataset.trackId;
                                        t.addEventListener("click", t => {
                                            Object(j.a)({
                                                category: "download",
                                                subcategory: "ok",
                                                event: "track"
                                            }), t.stopPropagation(), t.preventDefault();
                                            const n = e.closest(".track-with-cover"), a = n.querySelector('[data-l="t,artist"]').textContent, r = n.querySelector('[data-l="t,album"]').textContent, i = g.a.modify(`${a} - ${r}`);
                                            o.a.sendMessage({
                                                action: "downloadFile",
                                                options: {
                                                    filename: i + ".mp3",
                                                    url: t.target.href
                                                }
                                            });
                                        }), e.closest(".track-with-cover").addEventListener("mouseleave", () => t.style.display = "none"), 
                                        e.addEventListener("mouseenter", () => {
                                            t.style.display = "block", t.href || o.a.sendMessage({
                                                action: "getOdnoklassnikiAudioLinks",
                                                url: location.href,
                                                trackId: n,
                                                jsessionId: F.jsessionId
                                            }, e => {
                                                const n = e.data;
                                                F.getClientHash(n.play).then(e => {
                                                    t.href = n.play + (e ? "&clientHash=" + e : "");
                                                    const a = n.track, i = Math.floor(a.size / a.duration / 125) + " " + o.a.i18n.getMessage("kbps"), s = r.sizeHuman(a.size, 2);
                                                    t.title = `${s} ~ ${i}`;
                                                });
                                            });
                                        });
                                    });
                                }
                            }, {
                                css: ".mus-tr_i",
                                is: "added",
                                callback: t
                            }, {
                                css: "#photo-layer_photo",
                                is: "added",
                                callback: t => {
                                    if (!o.a.isSafari) for (let n, o = 0; n = t.added[o]; o++) n.dataset.sfSkip > 0 || (n.dataset.sfSkip = "1", 
                                    h.a.one(n, "mouseenter", e.wrapOnPhotoOver));
                                }
                            }, {
                                css: ".vp_video .vid-card_cnt",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) {
                                        if (t.dataset.sfSkip > 0) continue;
                                        t.dataset.sfSkip = "1";
                                        const e = Object(f.a)(t, ".vp_video");
                                        if (!e) return;
                                        const n = H.getPlayerOptions(t);
                                        n && H.appendLinkUnderVideo(e.parentNode, n);
                                    }
                                }
                            }, {
                                css: ".vid-card_cnt .vid-card_cnt_w img",
                                is: "added",
                                callback: t => {
                                    for (let n, o = 0; n = t.added[o]; o++) if (!(n.dataset.sfSkip > 0)) {
                                        if (n.dataset.sfSkip = "1", n = Object(i.a)(n, "vid-card_cnt"), n.dataset.sfSkip) return;
                                        h.a.one(n, "mouseenter", e.wrapVideoFeedOnImgOver);
                                    }
                                }
                            }, {
                                css: ".d_comment_text_w img",
                                is: "added",
                                callback: a
                            }, {
                                css: ".video-card .video-card_img-w img",
                                is: "added",
                                callback: a
                            }, {
                                css: ".vid-card_cnt img, .html5-vpl_vid",
                                is: "added",
                                callback: a
                            }, {
                                css: "." + h.a.onRemoveClassName,
                                is: "removed",
                                callback: e => {
                                    for (let t, n = 0; t = e.removed[n]; n++) h.a.onRemoveListener(t);
                                }
                            }, {
                                css: ".sf-video-feed-bind-on-insert",
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) t.addEventListener("click", U.onBtnClick), 
                                    Object(j.a)({
                                        category: "append",
                                        subcategory: "ok",
                                        event: "b"
                                    });
                                }
                            }, {
                                css: [ "wm-track", "wm-track2" ],
                                is: "added",
                                callback: t => {
                                    for (let n, o = 0; n = t.added[o]; o++) n.dataset.sfSkip > 0 || (n.dataset.sfSkip = "1", 
                                    h.a.one(n, "mouseenter", e.wrapNewAudioOnMouseEnter));
                                }
                            } ]
                        });
                    }
                }
            }, D = function() {
                R.clearCache(), B(), F.getJsSessionId(), H.catchPopup();
            }, B = function() {
                for (var e = document.querySelectorAll(".savefrom_ok_download"), t = e.length - 1; t >= 0; t--) e[t].parentNode.removeChild(e[t]);
            }, F = {
                downloadIdPrefix: "savefrom_ok_audio_download_",
                infoIdPrefix: "savefrom_ok_audio_info_",
                lastRow: null,
                lastRowCandidate: null,
                timer: 0,
                jsessionId: "",
                clientHashV: "",
                scriptNode: null,
                cache: {
                    payloadTracks: {}
                },
                ajaxTimer: {},
                trackIdPromise: {},
                appendDownloadMobileMusic(e) {
                    const t = m.a.create("a", {
                        style: {
                            position: "absolute",
                            top: "-6px",
                            left: "16px"
                        },
                        append: [ r.svg.getSvg("download", "#f1bc7f", 14, 14) ],
                        on: [ "click", async function(t) {
                            t.preventDefault(), t.stopPropagation();
                            const n = k(e), o = await Object(v.a)([ n ], (function(e) {
                                var t = document.querySelector(e);
                                if (t) return t.okData;
                            }));
                            o && o.track ? (A.log("track info", o), F.prepareTrackForDownload(o.track.id).then(e => {
                                r.download(e.filename, e.downloadUrl);
                            }, e => {
                                A.error("appendDownloadMobileMusic. click download error", e), this.style.opacity = .3;
                            })) : A.error("okData not found");
                        } ]
                    }), n = e.querySelector(".music_track_aux");
                    n && n.appendChild(t);
                },
                async prepareTrackForDownload(e) {
                    F.jsessionId || await F.getJsSessionId();
                    const t = await F.getTrackUrlById(e);
                    if (!t.track) throw new Error("Track is not found");
                    if (!t.play) throw new Error("Track url is not found");
                    const n = await F.getClientHash(t.play);
                    return {
                        filename: g.a.modify(`${t.track.ensemble} – ${t.track.name}.mp3`),
                        downloadUrl: `${t.play}&${q.stringify({
                            clientHash: n
                        })}`,
                        duration: t.track.duration,
                        size: t.track.size || -1
                    };
                },
                showRowElements: function(e, t, n) {
                    if (e) {
                        var o = e.querySelectorAll("div.savefrom_ok_download");
                        o = e.querySelectorAll("div.savefrom_ok_download");
                        for (var a = 0; a < o.length; a++) o[a].style.display = t ? "" : "none";
                    }
                },
                getNodeTrackId: function(e) {
                    var t = e.getAttribute("data-query");
                    if (t) try {
                        if ((t = JSON.parse(t)) && t.trackId) return t.trackId;
                    } catch (e) {
                        return null;
                    }
                    var n = e.querySelector("span.track_play[onclick]");
                    if (n) {
                        var o = /(?:playMediatopic|playFeedTrack)\(['"]?(\d+)['"]?/.exec(n.getAttribute("onclick"));
                        return o && o[1];
                    }
                    return e.dataset.trackId ? e.dataset.trackId : null;
                },
                getTrackId: function(e) {
                    var t = F.getNodeTrackId(e);
                    if (t) return (o = {})[t] = e, o;
                    var n = e.id;
                    if (n) {
                        var o, a = n.indexOf("#");
                        if (-1 !== a && (n = n.substr(a + 1)), (t = r.getMatchFirst(n, /^\w+_(\d+)$/i)) || -1 !== n.indexOf("GROUP_FEED") && (t = n.substr(n.lastIndexOf("_") + 1)), 
                        t) return (o = {})[t] = e, o;
                    }
                    return null;
                },
                showRowLinks: function(e) {
                    var t = F.getTrackId(e);
                    for (var n in t) if (F.handleRow(n, t[n])) return !0;
                    return !1;
                },
                disable: function() {
                    F.lastRowCandidate = null, F.lastRow = null;
                    for (var e, t = document.querySelectorAll(".savefrom_ok_download"), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                },
                getJsSessionId: function() {
                    return ("m.ok.ru" === location.host ? () => {
                        const e = Array.from(document.querySelectorAll("script"));
                        for (let t = 0; t < e.length; t++) {
                            if (!e[t].textContent) continue;
                            const n = e[t].textContent.match(/"jsid":"(.*?)"/);
                            if (n && n[1]) return Promise.resolve(n[1]);
                        }
                        return Promise.resolve(void 0);
                    } : function() {
                        return new Promise((function(e, t) {
                            var n = location.protocol + "//" + location.host + "/web-api/music/conf";
                            Object(p.a)({
                                type: "POST",
                                url: n,
                                data: "_",
                                json: !0,
                                localXHR: !0
                            }, (function(n, o, a) {
                                !n && a && a.sid ? e(a.sid) : t(new Error("Get jsSessionId error!"));
                            }));
                        }));
                    })().then((function(e) {
                        F.jsessionId = e;
                    }), (function(e) {
                        A.debug("getJsSessionId error", e);
                    }));
                },
                getLink: function(e) {
                    e && F.jsessionId && (F.ajaxTimer[e] = window.setTimeout((function() {
                        delete F.ajaxTimer[e], F.deleteLink(e);
                    }), 3e4), o.a.sendMessage({
                        action: "getOdnoklassnikiAudioLinks",
                        url: location.href,
                        trackId: e,
                        jsessionId: F.jsessionId
                    }, (function(e) {
                        F.setLink(e.trackId, e.data);
                    })));
                },
                onMouseOver: function() {
                    if (F.jsessionId) {
                        var e = this;
                        e && (F.lastRowCandidate = e, clearTimeout(F.timer), F.lastRow !== e && (F.timer = window.setTimeout((function() {
                            F.showRowElements(F.lastRow, !1), F.lastRow = e, F.lastRowCandidate = null, F.showRowElements(F.lastRow, !0);
                        }), 250)));
                    }
                },
                onMouseOut: function() {
                    var e = this;
                    (F.lastRow && F.lastRow.contains(e) || F.lastRowCandidate && F.lastRowCandidate.contains(e)) && (clearTimeout(F.timer), 
                    F.timer = window.setTimeout((function() {
                        F.showRowElements(F.lastRow, !1), F.lastRow = null, F.lastRowCandidate = null;
                    }), 1e3)), e = null;
                },
                onNewMouseEnter(e) {
                    if (!this.querySelector(".savefrom_ok_download")) {
                        const e = k(this);
                        if (document.querySelector(e) !== this) throw new Error("Node path is incorrect");
                        return F.getNodeTrack(e).then(e => {
                            "WM-TRACK2" === this.tagName ? F.insertButtonOnOver(this, e) : F.insertButton(this, e);
                        });
                    }
                },
                insertButtonOnOver(e, t) {
                    const n = new (Object(x.a)())(n => {
                        if (!w) return o();
                        let a = null, r = null, i = 0, s = 0;
                        for (;a = n.shift(); ) if ("childList" === a.type && a.target === e) for (i = 0, 
                        s = a.addedNodes; r = a.addedNodes[i]; i++) if ("SLOT" === r.tagName && "controls" === r.name) {
                            e.querySelector(".savefrom_ok_download") || (this.insertButton(e, t), o());
                            break;
                        }
                    }), o = function() {
                        n.disconnect();
                    };
                    n.observe(e, {
                        childList: !0
                    });
                },
                insertButton(e, t) {
                    let n = [ "sf-audio", "savefrom_ok_download" ], o = null;
                    if ("WM-TRACK" === e.tagName ? o = e.querySelector(".wm-track_controls") : "WM-TRACK2" === e.tagName && (n.push("sf-audio-2"), 
                    o = e.querySelector('slot[name="controls"]')), e.classList.contains("track-with-cover") && (o = e.querySelector('[data-l="t,addTrack"]')), 
                    !o) {
                        const t = e.querySelector('slot[name="controls"], wm-duration');
                        o = document.createElement("div"), e.insertBefore(o, t);
                    }
                    const a = m.a.create("a", {
                        href: "#",
                        data: {
                            state: "idle",
                            trackId: t.id
                        },
                        class: n,
                        style: {
                            display: "none",
                            position: "relative",
                            width: "16px",
                            height: "16px",
                            verticalAlign: "middle"
                        },
                        on: [ [ "mouseenter", F.handlePreload ], [ "click", F.handleClickNewButton ], [ "mouseenter", function() {
                            z.tooltip.textContent = F.getNewButtonTooltipLabel(this), z.show(this);
                        } ], [ "mouseleave", function() {
                            z.hide();
                        } ], [ "sf-state-change", function() {
                            z.tooltip.textContent = F.getNewButtonTooltipLabel(this), z.updatePos(this);
                        } ], [ "mouseover", e => {
                            if (E) {
                                if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void Object(N.b)(a, {
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                });
                                Object(N.a)(a, {
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                });
                            }
                        } ] ]
                    });
                    Object(j.a)({
                        category: "append",
                        subcategory: "ok",
                        event: "b"
                    }), o.appendChild(a);
                },
                getNewButtonTooltipLabel(e) {
                    switch (e.dataset.state) {
                      case "pending":
                        return "...";

                      case "done":
                        {
                            const {duration: t, size: n} = JSON.parse(e.dataset.data);
                            let a = "";
                            if (n) {
                                const e = r.sizeHuman(n, 2);
                                if (t) {
                                    a = `${e} ~ ${Math.floor(n / t / 125) + " " + o.a.i18n.getMessage("kbps")}`;
                                } else a = "" + e;
                            } else a = o.a.i18n.getMessage("getFileSizeFailTitle");
                            return a;
                        }

                      case "error":
                        return o.a.i18n.getMessage("noLinksFound");

                      default:
                        return "";
                    }
                },
                handlePreload(e) {
                    const t = e.target.closest("wm-track") || e.target.closest("wm-track2"), n = k(t);
                    F.getNodeTrack(n).then(t => {
                        this.dispatchEvent(new CustomEvent("sf-state-change"));
                        const n = this.dataset.trackId = t.id;
                        return F.prepareTrackForDownload(n).then(t => {
                            this.href = t.downloadUrl, this.download = t.filename, this.dataset.data = JSON.stringify({
                                duration: t.duration,
                                size: t.size
                            }), this.dataset.state = "done", this.dispatchEvent(new CustomEvent("sf-state-change")), 
                            this.dataset.downloadOnReady > 0 && F.handleClickNewButton.call(this, e);
                        }, e => {
                            A.error("handlePreload error", e), this.dataset.state = "error", this.dispatchEvent(new CustomEvent("sf-state-change"));
                        });
                    });
                },
                handleClickNewButton(e) {
                    e.stopPropagation(), "done" !== this.dataset.state ? (e.preventDefault(), "1" !== this.dataset.downloadOnReady && (this.dataset.downloadOnReady = "1")) : r.downloadOnClick(e);
                },
                async getTrackUrlById(e) {
                    if (this.trackIdPromise[e]) return this.trackIdPromise[e];
                    if (F.cache.payloadTracks[e]) return F.cache.payloadTracks[e];
                    const t = `https://wmf.ok.ru/play;jsessionid=${F.jsessionId}?` + q.stringify({
                        tid: e
                    });
                    return this.trackIdPromise[e] = Object(v.a)([ t ], "function(url){return fetch(url).then(function(response){return response.json()})}").then(t => {
                        const n = Object.keys(F.cache.payloadTracks);
                        return n.length > 20 && delete F.cache.payloadTracks[n[0]], F.cache.payloadTracks[e] = t, 
                        t;
                    }).then(...Object(_.a)(() => {
                        delete this.trackIdPromise[e];
                    }));
                },
                getNodeTrack: e => Object(v.a)([ e ], 'function(nodePath){var el=document.querySelector(nodePath);if(el&&el.props&&el.props.track){return el.props.track}if(el&&el.model&&el.model._data.get("track")){return el.model._data.get("track")}throw new Error("Track information not found")}'),
                getNodePath(e) {
                    const t = [];
                    for (;e.parentNode && 1 === e.parentNode.nodeType; ) {
                        let n = "";
                        const o = [].slice.call(e.parentNode.childNodes);
                        o.length > 1 && (n = `:nth-child(${o.indexOf(e) + 1})`), t.unshift(`${e.tagName}${n}`), 
                        e = e.parentNode;
                    }
                    return t.join(">");
                },
                handleRow: function(e, t) {
                    if (!e || !t) return !1;
                    var n = t;
                    n.style.position = "relative";
                    var a = t.querySelector(".m_c_duration, .m_portal_duration"), i = document.createElement("div");
                    i.className = "savefrom_ok_download";
                    var s = 40, d = document.getElementById("mmpcw");
                    d && d.contains(t) && (s = 65), r.setStyle(i, {
                        color: "#fff",
                        background: "#46aa19",
                        border: "1px solid #337d12",
                        borderRadius: "3px",
                        padding: "1px 5px",
                        position: "absolute",
                        right: s + "px",
                        top: "50%",
                        lineHeight: "15px",
                        fontSize: "12px",
                        opacity: 0,
                        zIndex: 9999,
                        cursor: "pointer"
                    }), i.addEventListener("click", F.onBoxClick, !1), i.addEventListener("mousedown", (function(e) {
                        e.stopPropagation();
                    }), !1);
                    var c = F.getTitle(e, t), l = function(e, t, n) {
                        null == n && (n = !0);
                        var o = document.createElement("a");
                        return o.href = e, o.className = "savefrom_ok_download", o.textContent = t, n && o.setAttribute("target", "_blank"), 
                        o;
                    }("#", "...");
                    l.id = F.downloadIdPrefix + e, l.title = o.a.i18n.getMessage("downloadTitle"), a && l.setAttribute("data-savefrom-helper-duration", F.secondsFromDurationNode(a)), 
                    c && (c += ".mp3", l.setAttribute("download", g.a.modify(c))), r.setStyle(l, {
                        color: "#fff",
                        fontWeight: "normal"
                    }), l.addEventListener("click", F.onDownloadLinkClick, !1), i.appendChild(l), n.appendChild(i), 
                    F.cache[e] ? F.setLinkFromCache(e, l) : F.getLink(e), i.style.marginTop = "-" + i.offsetHeight / 2 + "px", 
                    i.style.opacity = "1";
                    var u = document.createElement("span");
                    return u.textContent = String.fromCharCode(215), u.title = o.a.i18n.getMessage("close"), 
                    r.setStyle(u, {
                        color: "#fff",
                        fontFamily: "Tahoma,Helvetica,sans-serif",
                        fontSize: "15px",
                        marginLeft: "7px",
                        opacity: ".7",
                        cursor: "pointer"
                    }), u.addEventListener("click", F.onCloseBtnClick, !1), i.appendChild(u), !0;
                },
                onBoxClick: function(e) {
                    e.preventDefault(), e.stopPropagation();
                    var t = this.querySelector("a.savefrom_ok_download");
                    return t ? (h.a.trigger(t, "click", {
                        cancelable: !0
                    }), !1) : (this.style.display = "none", !1);
                },
                onDownloadLinkClick: function(e) {
                    return 2 != e.button && (e.stopPropagation(), "#" == this.href ? (e.preventDefault(), 
                    !1) : (r.downloadOnClick(e), !1));
                },
                onCloseBtnClick: function(e) {
                    if (2 == e.button) return !0;
                    e.preventDefault(), e.stopPropagation();
                    var t = Object(f.a)(this, ".savefrom_ok_download");
                    return t && (t.style.display = "none"), !1;
                },
                deleteLink: function(e, t) {
                    if (!t && e && (t = document.getElementById(F.downloadIdPrefix + e)), t) {
                        var n = t.parentNode;
                        n && n.parentNode.removeChild(n);
                    }
                },
                getHash: function(e, t) {
                    t || (t = [ 4, 3, 5, 6, 1, 2, 8, 7, 2, 9, 3, 5, 7, 1, 4, 8, 8, 3, 4, 3, 1, 7, 3, 5, 9, 8, 1, 4, 3, 7, 2, 8 ]);
                    for (var n = [], o = 0; o < e.length; o++) n.push(parseInt("0x0" + e.charAt(o)));
                    var a = [];
                    (e = (e = n).slice(0))[32] = e[31];
                    var r = 0;
                    for (o = 32; o-- > 0; ) r += e[o];
                    for (var i = 0; i < 32; i++) a[i] = Math.abs(r - e[i + 1] * e[i] * t[i]);
                    return a.join("");
                },
                setLinkFromCache: function(e, t) {
                    if (!F.cache[e]) return !1;
                    if (t || (t = document.getElementById(F.downloadIdPrefix + e)), t) {
                        t.href = F.cache[e].url, t.textContent = "", F.cache[e].downloadAttr && t.setAttribute("download", F.cache[e].downloadAttr);
                        var n = m.a.create(r.svg.getSvg("download", "#ffffff"), {
                            style: {
                                display: "inline-block",
                                width: "16px",
                                height: "16px",
                                verticalAlign: "middle",
                                opacity: "0.9"
                            }
                        });
                        t.appendChild(n);
                        var o = document.createTextNode(F.cache[e].info);
                        return t.nextSibling ? t.parentNode.insertBefore(o, t.nextSibling) : t.parentNode.appendChild(o), 
                        !0;
                    }
                },
                getClientHash: function(e) {
                    return Promise.resolve(function() {
                        const t = n(82);
                        return function(e, t) {
                            for (var n, o = [ 4, 3, 5, 6, 1, 2, 8, 7, 2, 9, 3, 5, 7, 1, 4, 8, 8, 3, 4, 3, 1, 7, 3, 5, 9, 8, 1, 4, 3, 7, 2, 8 ], a = t(/md5=(\w*)/g.exec(e)[1] + "secret"), r = a.length, i = "", s = 0, d = 0; d < r; d++) s += parseInt(a[d], 16);
                            for (var c = 0; c < r; c++) {
                                var l = parseInt(a[c], 16);
                                n = c === r - 1 ? l : parseInt(a[c + 1], 16), i += Math.abs(s - l * n * o[c]);
                            }
                            return i;
                        }(e, e => t(e).toString());
                    }());
                },
                setLink: function(e, t, n) {
                    if (e) {
                        clearTimeout(F.ajaxTimer[e]);
                        var a = document.getElementById(F.downloadIdPrefix + e);
                        if (a && !F.setLinkFromCache(e, a)) {
                            if (!t || !t.play) return F.deleteLink(e, a), void (a.textContent = "?");
                            if (void 0 === n) return this.getClientHash(t.play).then((function(n) {
                                F.setLink(e, t, n);
                            }), (function(t) {
                                F.deleteLink(e, a);
                            }));
                            var i = t.track && t.track.size || -1;
                            F.cache[e] = {}, F.cache[e].url = t.play + (n ? "&clientHash=" + n : "");
                            var s = " (" + r.sizeHuman(i, 2), d = a.getAttribute("data-savefrom-helper-duration");
                            if (t.track && (t.track.duration && (d = t.track.duration), t.track.ensemble && t.track.name)) {
                                var c = t.track.ensemble + " - " + t.track.name;
                                F.cache[e].title = c, F.cache[e].downloadAttr = g.a.modify(c + ".mp3");
                            }
                            if (i && i > 0 && d) {
                                if (d = parseInt(d), isNaN(d)) return void delete F.cache[e];
                                s += " ~ " + (Math.floor(i / d / 125) + " " + o.a.i18n.getMessage("kbps"));
                            }
                            s += ")", F.cache[e].info = s, F.setLinkFromCache(e, a);
                        }
                    }
                },
                getTitle: function(e, t) {
                    if (!e || !t) return "";
                    var n = "", o = t.querySelector(".m_c_artist, .mus-tr_artist, .m_portal_c_artist"), a = t.querySelector(".m_track_source, .mus-tr_song, .m_portla_track_name");
                    return o && (o = o.textContent) && (n += o.trim()), a && (a = a.textContent) && (n && (n += " - "), 
                    n += a.trim()), n ? n.replace(/\<a\s+[^\>]+\>/gi, "").replace(/\<\/a\>/gi, "") : "";
                },
                secondsFromDurationNode: function(e) {
                    if (!e) return 0;
                    var t = e.textContent;
                    if (!t) return 0;
                    var n = t.match(/^(?:\s*(\d+)\s*\:)?\s*(\d+)\s*\:\s*(\d+)/);
                    return n && n.length > 3 ? (n[1] || (n[1] = 0), 3600 * parseInt(n[1]) + 60 * parseInt(n[2]) + parseInt(n[3])) : 0;
                },
                getPlaylistName: function(e) {
                    if (e === document) return;
                    const t = e.querySelector(".mus_h2_tx");
                    return t && g.a.modify(t.textContent) || void 0;
                },
                getNewPlaylistName: function(e) {
                    if (e === document) return;
                    const t = e.querySelector(".wm-list-description_header");
                    return t && g.a.modify(t.textContent) || void 0;
                },
                elIsHidden: function(e) {
                    return null === e.offsetParent;
                },
                getLayer: function() {
                    let e = document.querySelector("#mmpcw");
                    if (e && !e.classList.contains("__hidden") && (e = e.querySelector('div.m_c_s[aria-hidden="false"]'), 
                    e && !F.elIsHidden(e))) return e;
                },
                getNewLayer: function() {
                    let e = document.querySelector("#music_layer wm-collection-section");
                    if (e || (e = document.querySelector("#music_layer")), !e || !F.elIsHidden(e)) return e;
                },
                getPopup: function(e, t, n) {
                    var a, i = r.playlist.getInfoPopupTemplate();
                    m.a.create(i.textContainer, {
                        append: [ e ? m.a.create("p", {
                            text: e,
                            style: {
                                color: "#0D0D0D",
                                fontSize: "20px",
                                marginBottom: "11px",
                                marginTop: "13px"
                            }
                        }) : void 0, a = m.a.create("p", {
                            text: "",
                            style: {
                                color: "#868686",
                                fontSize: "14px",
                                lineHeight: "24px"
                            }
                        }) ]
                    });
                    var s = r.popupDiv(i.body, "sf_progress_popup", void 0, void 0, n), d = function e(n) {
                        e.state !== n && (e.state = n, i.buttonContainer.style.display = "none", a.style.display = "none", 
                        o.a.sendMessage({
                            action: "getWarningIcon",
                            type: t,
                            color: "#77D1FA"
                        }, (function(e) {
                            i.icon.style.backgroundImage = "url(" + e + ")";
                        })), "progress" === n && (a.style.display = "block"), "error" === n && (o.a.sendMessage({
                            action: "getWarningIcon",
                            type: t,
                            color: "#AAAAAA"
                        }, (function(e) {
                            i.icon.style.backgroundImage = "url(" + e + ")";
                        })), a.style.display = "block"));
                    };
                    return {
                        onPrepare: function(e) {
                            d("progress"), a.textContent = e;
                        },
                        onProgress: function(e, t) {
                            a.textContent = o.a.i18n.getMessage("vkFoundFiles").replace("%d", e) + " " + o.a.i18n.getMessage("vkFoundOf") + " " + t;
                        },
                        onReady: function() {
                            h.a.trigger(s, "kill");
                        },
                        onError: function(e) {
                            d("error"), a.textContent = e;
                        }
                    };
                },
                getAudioLinksViaAPI: function(e, t, n) {
                    var a = !1, r = [], i = e.length;
                    return function s() {
                        if (!a) {
                            var d = e.splice(0, 10);
                            if (0 === d.length) return n(r);
                            o.a.sendMessage({
                                action: "getOkAudioListLinks",
                                trackIdArr: d,
                                jsessionId: F.jsessionId
                            }, (function(n) {
                                var o = Promise.resolve();
                                Array.isArray(n) && n.forEach((function(e) {
                                    o = o.then((function() {
                                        if ("string" == typeof e.play && "object" == typeof e.track) {
                                            var t, n = e.play;
                                            return e.track.name && (t = e.track.name), e.track.ensemble && (t = e.track.ensemble + (t ? " - " + t : "")), 
                                            t || (t = "noname"), F.getClientHash(n).then((function(o) {
                                                n += "&clientHash=" + o, r.push({
                                                    url: n,
                                                    duration: e.track.duration || 0,
                                                    title: t,
                                                    filename: g.a.modify(t) + ".mp3"
                                                });
                                            }));
                                        }
                                    })).catch((function(t) {
                                        A.debug("process item error", e, t);
                                    }));
                                })), o.then((function() {
                                    t(i - e.length, i), s();
                                }));
                            }));
                        }
                    }(), {
                        abort: function() {
                            a = !0;
                        }
                    };
                },
                getAudioListLinksPopup: function(e, t, n) {
                    var a, r = this.getPopup(t, "audio", (function() {
                        a && a.abort();
                    }));
                    r.onPrepare(o.a.i18n.getMessage("download") + " ..."), a = this.getAudioLinksViaAPI(e, r.onProgress, (function(e) {
                        0 !== e.length ? (r.onReady(), n(e)) : r.onError(o.a.i18n.getMessage("vkMp3LinksNotFound"));
                    }));
                },
                getAudioLinksIds: e => Promise.resolve().then(() => {
                    for (var t, n = e.querySelectorAll([ ".m_portal_track", ".m_c_tr", ".mus-tr_i" ]), o = [], a = 0; t = n[a]; a++) {
                        var r = F.getTrackId(t);
                        for (var i in r) o.push(i);
                    }
                    return o;
                }),
                getNewAudioLinksIds(e) {
                    const t = k(e);
                    if (!t || document.querySelector(t) === e) return Object(v.a)([ t ], 'function(nodePath){var result=null;try{var container=nodePath===""?document:document.querySelector(nodePath);var ids=[].slice.call(container.querySelectorAll(["wm-track","wm-track2"])).reduce(function(result,node){try{var getTrack=function getTrack(){if(node&&node.props&&node.props.track){return node.props.track}if(node&&node.model&&node.model._data.get("track")){return node.model._data.get("track")}throw new Error("getNewAudioLinksIds")};var track=getTrack();if(track){result.push(track.id)}}catch(err){// console.error(\'getNewAudioLinksIds error\', err);\n}return result},[]);result={result:ids}}catch(err){result={error:{message:err.message,stack:err.stack}}}if(result.error){throw new Error(result.error.message)}else{return result.result}}');
                },
                async getAudioFromWall(e) {
                    let t = e.querySelector(".media-layer.__active");
                    const n = (e = t || e).querySelectorAll(".track-with-cover_cnt");
                    return Array.from(n).map(e => e.closest(".track-with-cover").dataset.trackId);
                },
                getAudioLinks: function(e, t, n) {
                    return Promise.all([ this.getAudioLinksIds(e), this.getNewAudioLinksIds(e), this.getAudioFromWall(e) ]).then(e => [].concat(...e).filter((e, t, n) => n.indexOf(e) === t)).then(e => {
                        this.getAudioListLinksPopup(e, t, n);
                    });
                },
                downloadMP3Files: function() {
                    const e = F.getLayer() || F.getNewLayer() || document, t = F.getPlaylistName(e) || F.getNewPlaylistName(e);
                    F.getAudioLinks(e, t, (function(e) {
                        r.downloadList.showBeforeDownloadPopup(e, {
                            type: "audio",
                            folderName: t
                        });
                    }));
                },
                showListOfAudioFiles: function(e) {
                    const t = F.getLayer() || F.getNewLayer() || document, n = F.getPlaylistName(t) || F.getNewPlaylistName(t);
                    F.getAudioLinks(t, n, (function(t) {
                        t.length ? e ? r.playlist.popupPlaylist(t, n, !0) : r.playlist.popupFilelist(t) : alert(o.a.i18n.getMessage("vkMp3LinksNotFound"));
                    }));
                }
            }, H = {
                requestMobileToken: function(e, t) {
                    let n = null;
                    e.links.some((function(e) {
                        var t = e.url.match(/\/\/([^/]+)/);
                        if (t = t && t[1]) return n = t, !0;
                    }));
                    const a = e => new Promise(t => {
                        const n = new XMLHttpRequest;
                        n.open("POST", location.protocol + "//" + e + "/usr_login", !1), n.withCredentials = !0, 
                        n.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n.onreadystatechange = () => {
                            try {
                                let e = JSON.parse(n.responseText);
                                if (!e.vtkn || !e.ttl) return t();
                                t({
                                    ttl: e.ttl,
                                    vtkn: e.vtkn
                                });
                            } catch (e) {}
                        }, n.send();
                    });
                    Object(v.a)(() => {
                        const e = document.cookie && document.cookie.match(/vdsig=([^;]+);/);
                        if (e && e[1]) return e[1];
                    }).then(r => {
                        if (r) return e.vtkn = r, t(e);
                        const i = n => {
                            let {ttl: o, vtkn: a} = n;
                            o && a && (R.videoToken = {
                                ttl: Date.now() + 1e3 * o,
                                vtkn: a
                            }, e.vtkn = a, t(e));
                        };
                        o.a.isChrome || o.a.isFirefox ? Object(v.a)([ n ], a).then(i) : a(n).then(i);
                    });
                },
                getMobileToken: function(e, t) {
                    if (e.vtkn) return t(e);
                    var n = R.videoToken;
                    return n && n.expire > Date.now() ? (e.vtkn = n.vtkn, t(e)) : H.requestMobileToken(e, t);
                },
                wrapMobileLinks: function(e, t) {
                    H.getMobileToken(e, (function(e) {
                        if (!e || !e.vtkn) return t();
                        e.action = "getOkViaMobileWrapped", e.links.forEach((function(t) {
                            var n = /\?/.test(t.url) ? "&" : "?";
                            t.url += n + "vdsig=" + e.vtkn;
                        })), t(e);
                    }));
                },
                prepareResponse: function(e, t) {
                    var n = function() {
                        t(o.a.i18n.getMessage("noLinksFound"));
                    };
                    if (!e || !e.links) return n();
                    if (!y.showUmmyItem && "getRutubeLinks" === e.action) return n();
                    if ("getOkViaMobile" === e.action) return H.wrapMobileLinks(e, (function(e) {
                        if (!e) return n();
                        H.prepareResponse(e, t);
                    }));
                    var a = null;
                    "getYoutubeLinks" === e.action ? a = "youtube" : "getVimeoLinks" === e.action ? a = "vimeo" : "getDailymotionLinks" === e.action ? a = "dailymotion" : "getRutubeLinks" === e.action && (a = "rutube");
                    var i = null;
                    return i = a ? r.popupMenu.prepareLinks[a](e.links, e.title) : U.prepareLinks(e.links, e.title), 
                    t(i);
                },
                matchOpenGraph: function(e) {
                    if (e && e.movie && e.movie.contentId) {
                        var t = e.movie.contentId;
                        if (-1 !== t.indexOf("rutube.") && y.showUmmyItem) return {
                            action: "getRutubeLinks",
                            links: [ t ]
                        };
                        if (-1 !== t.indexOf("pladform")) {
                            var n = Object(s.a)(t);
                            return {
                                action: "getPladformVideo",
                                extVideoId: {
                                    playerId: n.pl,
                                    videoId: n.videoid
                                }
                            };
                        }
                        var o = r.embedDownloader.checkUrl(t);
                        if (o) return o;
                        var a = e.movie.poster;
                        if ("string" == typeof a) {
                            var i = (Object(s.a)(a).url || a).match(/ytimg\.com\/vi\/([^\/]+)\//);
                            if (i = i && i[1]) return {
                                action: "getYoutubeLinks",
                                extVideoId: i
                            };
                        }
                    }
                },
                switchMetadataProvider: function(e) {
                    if (e && e.provider && e.movie) switch (e.provider) {
                      case "USER_YOUTUBE":
                        if (e.movie.contentId) return {
                            request: {
                                action: "getYoutubeLinks",
                                extVideoId: e.movie.contentId
                            }
                        };
                        break;

                      case "OPEN_GRAPH":
                        var t = this.matchOpenGraph(e);
                        if (t) return {
                            request: t
                        };
                        break;

                      case "LIVE_TV_APP":
                      case "SLIDE_SHOW":
                      case "LIVE_TV_ODKL":
                      case "UPLOADED_ODKL":
                      case "UPLOADED_ATTACHMENT":
                      case "UPLOADED":
                      case "PARTNER":
                      case "YKL":
                        if (e.videos && e.movie.title) return {
                            request: {
                                action: "wrapMobileLinks",
                                title: e.movie.title,
                                links: e.videos
                            }
                        };
                    }
                },
                getPlayerMetadata: function(e, t, n, o) {
                    var a = {
                        cmd: "videoPlayerMetadata",
                        mid: e,
                        rnd: Date.now()
                    };
                    o && (a.mtId = t), Object(p.a)({
                        method: "POST",
                        url: location.protocol + "//" + location.host + "/dk?" + q.stringify(a),
                        json: !0,
                        localXHR: !0
                    }, (function(a, r, i) {
                        return a ? !o && t ? void H.getPlayerMetadata(e, t, n, 1) : n() : n(i);
                    }));
                },
                getEmbed: function(e, t) {
                    var n = Object(s.a)(e);
                    if (!n.id || !n.sig) return t();
                    var a = "http://cdn-ok.com/video/get/?" + q.stringify({
                        id: n.id,
                        format: 1,
                        sig: n.sig,
                        sig2: "oldRotator"
                    });
                    o.a.sendMessage({
                        action: "getData",
                        url: a
                    }, (function(e) {
                        return e && Object(c.a)(e, [ /"sourceType":/, /"sourceId":/ ]).some((function(e) {
                            if ("youtube" === e.sourceType && e.sourceId) return t({
                                request: {
                                    action: "getYoutubeLinks",
                                    extVideoId: e.sourceId
                                }
                            }), !0;
                        })) ? void 0 : t();
                    }));
                },
                readMetadata: function(e, t, n) {
                    if (e.movie && /cdn-ok\.com\/embed/.test(e.movie.contentId)) return this.getEmbed(e.movie.contentId, (function(e) {
                        if (!e || !e.request) return t();
                        o.a.sendMessage(e.request, (function(e) {
                            H.prepareResponse(e, t);
                        }));
                    }));
                    if (!n && e.movie && e.movie.movieId) {
                        var a = e.movie.link && Object(s.a)(e.movie.link, {
                            sep: "&amp;"
                        })["st.vpl.sid"];
                        return this.getPlayerMetadata(e.movie.movieId, a, (function(n) {
                            H.readMetadata(n || e, t, 1);
                        }));
                    }
                    var r = this.switchMetadataProvider(e);
                    return r ? r.links ? t(r.links) : void (r.request ? "getRutubeLinks" === r.request.action ? H.prepareResponse(r.request, t) : "wrapMobileLinks" === r.request.action ? H.wrapMobileLinks(r.request, (function(e) {
                        H.prepareResponse(e, (function(e) {
                            t(e, 1);
                        }));
                    })) : o.a.sendMessage(r.request, (function(e) {
                        H.prepareResponse(e, t);
                    })) : t()) : t();
                },
                prepareVideoUrl(e, t) {
                    let n = e.split("?"), [o, a] = t.split("?");
                    if (!n[1] || !a) return t;
                    if (n = new URLSearchParams(n[1]), a = new URLSearchParams(a), !n.has("type")) return t;
                    const r = n.get("type");
                    return a.has("st.mq") && a.set("st.mq", r), a.has("st.hls") && a.set("st.hls", "off"), 
                    o + "?" + a.toString();
                },
                getMobileVideoSrc: e => e && e.dataMobile && e.dataMobile.videoSrc ? Promise.resolve(e.dataMobile.videoSrc) : e && e.movie && e.movie.id ? Object(O.a)({
                    action: "getOkVideoUrlFromMobile",
                    videoUrl: location.href,
                    videoId: e.movie.id
                }) : Promise.resolve(void 0),
                prepareHlsLinks(e) {
                    const t = e.movie;
                    let n = t && t.title ? t.title : e.compilationTitle || document.title;
                    const o = new RegExp("RESOLUTION=\\d+x(\\d+)\\n(https?.*?)\\n", "g");
                    return Object(I.a)(e.hlsManifestUrl).then(e => Object(L.a)(e.body, o)).then(e => e.map(e => ({
                        title: n,
                        ext: "mp4",
                        format: "MP4",
                        quality: parseInt(e[1]),
                        href: "#mux",
                        forceDownload: !1,
                        noSize: !0,
                        func(t) {
                            t.preventDefault(), Object(C.a)(Object(P.e)(S.a, {
                                filename: g.a.modify(n) + ".mp4",
                                format: "mp4",
                                sources: [ {
                                    url: e[2],
                                    format: "mp4"
                                } ],
                                convertType: "hls"
                            }), "sf-muxer-parent");
                        }
                    })));
                },
                loadLinks: function(e, t) {
                    var n = R.linkCache, a = JSON.stringify(e), r = n[a];
                    if (r) return t.update(r);
                    var i = function(e, r) {
                        var i = function() {
                            t.update(o.a.i18n.getMessage("noLinksFound"));
                        };
                        return e ? e.hlsManifestUrl ? H.prepareHlsLinks(e).then(e => {
                            t.update(e);
                        }, e => {
                            i(), A.error("hls error", e);
                        }) : void H.readMetadata(e, (e, o) => {
                            if (!e) return i();
                            Array.isArray(e) && !e.length && (o = 1), o || (n[a] = e), t.update(e);
                        }, r) : i();
                    };
                    e.metadata ? i(e.metadata) : e.request ? "getOkMetadata" === e.request.action ? o.a.sendMessage(e.request, i) : "getPlayerMetadata" === e.request.action ? this.getPlayerMetadata(e.request.extVideoId, e.request.sid, (function(e) {
                        i(e, 1);
                    })) : "getRutubeLinks" === e.request.action ? H.prepareResponse(e.request, (function(e) {
                        t.update(e);
                    })) : o.a.sendMessage(e.request, (function(e) {
                        H.prepareResponse(e, (function(e) {
                            t.update(e);
                        }));
                    })) : t.update(o.a.i18n.getMessage("noLinksFound"));
                },
                appendLinkUnderVideo: function(e, t) {
                    Object(j.a)({
                        category: "append",
                        subcategory: "ok",
                        event: "b"
                    });
                    var n = e.querySelector(".vp-layer-info_cnt");
                    if (n) {
                        var a = n.querySelector(".savefrom_ok_download"), i = m.a.create("span", {
                            className: "savefrom_ok_download",
                            style: {
                                marginLeft: "12px"
                            },
                            on: [ [ "click", function(e) {
                                e.stopPropagation();
                            } ], [ "mousedown", function(e) {
                                e.stopPropagation();
                            } ], [ "keydown", function(e) {
                                e.stopPropagation();
                            } ] ],
                            append: [ m.a.create("a", {
                                href: "#",
                                text: o.a.i18n.getMessage("download"),
                                on: [ "click", function(n) {
                                    if (n.preventDefault(), h.a.onRemoveEvent(i, R.hideMenu), R.contextMenu && R.contextMenu.isShow) {
                                        if (R.contextMenu.button === this) return void R.hideMenu();
                                        R.hideMenu();
                                    }
                                    var a = R.contextMenu = r.popupMenu.quickInsert(this, o.a.i18n.getMessage("download") + "...", "sf-single-video-menu", {
                                        parent: e
                                    });
                                    H.loadLinks(t, a);
                                } ]
                            }) ]
                        });
                        a && a.parentNode ? (a.parentNode.replaceChild(i, a), a = null) : n.appendChild(i);
                    }
                },
                appendDownloadMobileVideo(e) {
                    const t = {
                        float: "right",
                        display: "flex",
                        alignItems: "center",
                        width: "fit-content"
                    }, n = e.querySelector(".widget-list_infos"), o = e.querySelector("[data-video]");
                    if (!n || !o) return;
                    n.querySelector(".widget-list_actors, .ic") || (t.position = "absolute", t.top = "-7px", 
                    t.right = "0");
                    const a = H.createMobileDownloadContainer(o, {
                        containerStyle: t,
                        menuClass: "sf-mobile-video-menu"
                    });
                    n.appendChild(a);
                },
                createMobileDownloadContainer(e, t) {
                    let {containerStyle: n, menuClass: a} = t;
                    const i = m.a.create("div", {
                        style: n || {},
                        append: [ r.svg.getSvg("download", "#f1bc7f", 14, 14), m.a.create("a", {
                            href: "#",
                            text: o.a.i18n.getMessage("download"),
                            style: {
                                marginLeft: "4px"
                            }
                        }) ],
                        on: [ "click", function(t) {
                            t.preventDefault(), t.stopPropagation(), R.contextMenu = r.popupMenu.quickInsert(this, o.a.i18n.getMessage("download") + " ...", a, {
                                parent: i || t.target
                            }), H.getMobilePlayerOptions(e).then(e => {
                                if (!e) return R.contextMenu.update(o.a.i18n.getMessage("noLinksFound"));
                                H.loadLinks(e, R.contextMenu);
                            });
                        } ]
                    });
                    return i;
                },
                getPlayerOptions: function(e) {
                    var t = Object(f.a)(e, "[data-player-element-id][data-options]"), n = t && t.dataset.options;
                    if (n) {
                        try {
                            n = JSON.parse(n);
                        } catch (e) {}
                        var o = n.flashvars;
                        if (o) {
                            if (o.metadata) {
                                var a = null;
                                try {
                                    a = JSON.parse(o.metadata);
                                } catch (e) {}
                                if (a) return {
                                    metadata: a
                                };
                            }
                            if (o.metadataUrl) return {
                                request: {
                                    action: "getOkMetadata",
                                    url: decodeURIComponent(o.metadataUrl)
                                }
                            };
                            var i = n.url;
                            if (i) {
                                var s = r.embedDownloader.checkUrl(i);
                                if (s) return {
                                    request: s
                                };
                                if (-1 !== i.indexOf("rutube.")) return {
                                    request: {
                                        action: "getRutubeLinks",
                                        links: [ i ]
                                    }
                                };
                            }
                        }
                    }
                },
                async getMobilePlayerOptions(e) {
                    let t, n;
                    try {
                        t = JSON.parse(e.dataset.video);
                    } catch (e) {}
                    if (t && t.movieId) n = t.movieId, n.indexOf("_") && (n = n.split("_")[0]); else {
                        n = new URLSearchParams(location.search).get("st.discId");
                    }
                    if (!n) return void A.error("getMobilePlayerOptions. video id not found");
                    const o = await Object(O.a)({
                        action: "okRequestVideoPage",
                        videoId: n
                    });
                    if (!o) return void A.error("getMobilePlayerOptions. videoPage fetch failed");
                    const a = M(o, "").querySelector(".vp_video .vid-card_cnt");
                    if (!a) return void A.error("getMobilePlayerOptions. Video dataset not found");
                    const r = H.getPlayerOptions(a);
                    return r.metadata ? r.metadata.dataMobile = t : r.metadata = {
                        dataMobile: t
                    }, r;
                },
                catchPopup: function() {
                    var e = null;
                    this.lastWaitEl && this.lastWaitEl.abort(), this.lastWaitEl = this.waitEl((function() {
                        if (e = document.querySelector(".vp_video .vid-card_cnt")) return e;
                    }), (function() {
                        var t = Object(f.a)(e, ".vp_video");
                        if (t) {
                            var n = H.getPlayerOptions(e);
                            n && H.appendLinkUnderVideo(t.parentNode, n);
                        }
                    }));
                },
                rmBtn: function() {
                    for (var e, t = document.querySelectorAll(".savefrom_ok_download"), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                },
                lastWaitEl: null,
                waitEl: function(e, t, n) {
                    var o, a = Object.assign({
                        abort: function() {
                            clearInterval(a.timeout), a.isAborted = !0;
                        }
                    }, {
                        delay: 500,
                        repeat: 12,
                        isAborted: !1,
                        timeout: null
                    }, n);
                    return (o = e()) ? (t(o), a) : (function n() {
                        a.repeat--, a.timeout = setTimeout((function() {
                            if (!a.isAborted) return (o = e()) ? t(o) : void (!a.isAborted && a.repeat && n());
                        }), a.delay);
                    }(), a);
                }
            }, U = {
                btnClassName: "sf-feed-dl-btn",
                style: void 0,
                thumbClassName: "vid-card_img",
                prepareLinks: function(e, t) {
                    if (!e || !e.length) return o.a.i18n.getMessage("noLinksFound");
                    if ("string" == typeof e) return e;
                    t = t || "";
                    for (var n, a, i, s, d = [], c = 0, l = e.length; c < l; c++) {
                        var u = e[c];
                        if ("object" == typeof u && u.url) {
                            s = u.url;
                            var f = u.ext;
                            f || (f = "MP4", -1 !== u.url.indexOf(".mp4") && (f = "MP4"), -1 !== s.indexOf(".flv") && (f = "FLV"), 
                            -1 !== u.url.indexOf(".mov") && (f = "MOV"), -1 !== u.url.indexOf(".mpg") && (f = "MPG")), 
                            i = (f = f.toLowerCase()).toUpperCase(), a = u.subname || u.quality || u.name || f;
                        } else {
                            f = "MP4", -1 !== (s = u).indexOf(".mp4") && (f = "MP4"), -1 !== s.indexOf(".flv") && (f = "FLV"), 
                            -1 !== s.indexOf(".mov") && (f = "MOV"), -1 !== s.indexOf(".mpg") && (f = "MPG"), 
                            i = (f = f.toLowerCase()).toUpperCase(), a = f;
                            var p = r.getMatchFirst(e[c], /\.(\d+)\.mp4/i);
                            p && (a = p);
                        }
                        var h = [ "mobile", "lowest", "low", "sd", "hd", "full", "quad", "ultra" ].indexOf(a);
                        -1 !== h && (a = [ 144, 240, 360, 480, 720, 1080, 1440, "4K" ][h]), n = {
                            href: s,
                            title: u.title ? u.title : t,
                            ext: f,
                            format: i,
                            quality: a,
                            forceDownload: !0
                        }, d.push(n);
                    }
                    return d;
                },
                getPosterData: function(e) {
                    var t = Object(f.a)(e, "[hrefattrs]"), n = t && t.getAttribute("hrefattrs");
                    if (n) {
                        var o = Object(s.a)(n, {
                            params: !0
                        }), a = o["st.vpl.sid"], i = o["st.vpl.id"];
                        if (!i) {
                            var d = Object(f.a)(e, "[data-id]");
                            if ((i = d && d.dataset.id) && "c" === i[0]) return;
                        }
                        if (i && "OK_" === i.substr(0, 3) && (i = r.getMatchFirst(i, /OK_\d+_(\d+)/)), i) return {
                            request: {
                                sid: a,
                                action: "getPlayerMetadata",
                                extVideoId: i
                            }
                        };
                    }
                },
                onBtnClick: function(e) {
                    e.preventDefault(), e.stopPropagation();
                    var t = JSON.parse(this.dataset.sfContext);
                    if (h.a.onRemoveEvent(this, R.hideMenu), R.contextMenu && R.contextMenu.isShow) {
                        if (R.contextMenu.button === this) return void R.hideMenu();
                        R.hideMenu();
                    }
                    var n = document.querySelector("#mtLayer.__active #mtLayerMain > div");
                    n || (n = document.getElementById("vv_content")), n || Object(u.a)(this, ".js-messages-list " + this.tagName) && (n = Object(i.a)(this, "js-messages-list")) && !n.offsetParent && (n = null), 
                    !n && Object(u.a)(this, "#mainContent " + this.tagName) && (n = Object(f.a)(this, "#mainContent"));
                    var a = R.contextMenu = r.popupMenu.quickInsert(this, o.a.i18n.getMessage("download") + " ...", "sf-popupMenu", {
                        parent: n || void 0
                    });
                    Object(j.a)({
                        category: "download",
                        subcategory: "ok",
                        event: "video"
                    }), H.loadLinks(t, a);
                },
                onImgOver: function(e) {
                    var t = Object(u.a)(this, ".mdialog_chat_window .d_comment_text_w " + this.tagName), n = null;
                    if ((t ? n = Object(i.a)(this, "d_comment_text_w") : Object(u.a)(this, ".video-card > .video-card_img-w " + this.tagName) ? n = Object(i.a)(this, "video-card_img-w") : this.classList.contains("vid-card_cnt") ? n = this : Object(u.a)(this, ".vid-card_cnt " + this.tagName) && (n = Object(i.a)(this, "vid-card_cnt")), 
                    n) && (!n.getElementsByClassName(U.btnClassName).length && !!!n.querySelector(".vid-card_live.__active"))) {
                        var a = Object(u.a)(this, ".vid-card_img__link " + this.tagName), s = H.getPlayerOptions(this);
                        if (s || (s = U.getPosterData(this)), s) {
                            s.isChat = t;
                            var d = {};
                            t && Object.assign(d, {
                                left: "15px",
                                top: "15px"
                            }), a && Object.assign(d, {
                                backgroundColor: "#454648",
                                borderColor: "rgb(53, 53, 53)"
                            });
                            var c = m.a.create("i", {
                                class: [ U.btnClassName, "sf-video-feed-bind-on-insert" ],
                                style: d,
                                data: {
                                    sfContext: JSON.stringify(s)
                                },
                                title: o.a.i18n.getMessage("download")
                            });
                            c.appendChild(m.a.create(r.svg.getSvg("download"), {
                                style: {
                                    width: "12px",
                                    height: "12px",
                                    margin: "4px"
                                }
                            })), n.appendChild(c);
                        }
                    }
                },
                injectStyle: function() {
                    this.style ? this.style.parentNode || document.head.appendChild(this.style) : (this.style = m.a.create("style", {
                        text: Object(l.a)({
                            "div > .sf-feed-dl-btn": {
                                display: "none",
                                border: "1px solid #F8F8F8",
                                width: "20px",
                                height: "20px",
                                padding: 0,
                                position: "absolute",
                                top: 0,
                                left: 0,
                                zIndex: 1,
                                cursor: "pointer",
                                backgroundColor: "#F8F8F8"
                            },
                            "div > .sf-feed-dl-btn svg path": {
                                fill: "#eb722e"
                            },
                            "div > .sf-feed-dl-btn:hover svg path": {
                                fill: "#00B75A"
                            },
                            "div > .sf-feed-dl-btn:active": {
                                outline: 0,
                                boxShadow: "inset 0 3px 5px rgba(0, 0, 0, 0.125)"
                            },
                            "div:hover > .sf-feed-dl-btn": {
                                display: "block"
                            },
                            ".sf-audio.savefrom_ok_download": {
                                display: "none",
                                backgroundImage: "url(" + r.svg.getSrc("download", "#ee8208") + ")",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "16px",
                                opacity: .5,
                                marginLeft: "11px"
                            },
                            ".sf-audio.sf-audio-2.savefrom_ok_download": {
                                margin: "0 6px"
                            },
                            ".sf-audio.savefrom_ok_download:hover": {
                                opacity: 1
                            },
                            "wm-track:hover .sf-audio": {
                                display: "flex !important"
                            },
                            "wm-track2:hover .sf-audio": {
                                display: "flex !important"
                            },
                            "#sf-mobile-video-menu": {
                                left: "auto !important",
                                right: "0"
                            }
                        })
                    }), document.head.appendChild(this.style));
                },
                disable: function() {
                    this.style && this.style.parentNode && this.style.parentNode.removeChild(this.style);
                },
                rmBtn: function() {
                    for (var e, t = document.querySelectorAll(".sf-feed-dl-btn"), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                    var o = Object(d.a)("sfSkip2"), a = document.querySelectorAll("[" + o + "]");
                    for (n = 0; e = a[n]; n++) e.removeAttribute(o);
                }
            }, V = {
                style: null,
                rmCurrentPhotoBtn: function(e) {
                    for (var t, n = void 0, o = document.querySelectorAll(".sf-dl-current-photo-btn"), a = 0; t = o[a]; a++) e && e.contains(t) ? n = t : t.parentNode.removeChild(t);
                    return n;
                },
                addDlCurrentPhotoBtn: function(e) {
                    if (!this.rmCurrentPhotoBtn(e)) {
                        var t = R;
                        e.appendChild(m.a.create("a", {
                            class: "sf-dl-current-photo-btn",
                            href: "#",
                            title: o.a.i18n.getMessage("download"),
                            on: [ "click", function(n) {
                                if (n.stopPropagation(), n.preventDefault(), t.contextMenu && t.contextMenu.isShow && t.contextMenu.button === this) {
                                    if (t.contextMenu.button === this) return void t.hideMenu();
                                    t.hideMenu();
                                }
                                var a = function e(t) {
                                    18 !== t.keyCode && 17 !== t.keyCode && (i.hide(), document.removeEventListener("keydown", e));
                                }, i = t.contextMenu = r.popupMenu.quickInsert(this, o.a.i18n.getMessage("download") + " ...", "photoDlMenu", {
                                    parent: e,
                                    onShow: function() {
                                        document.addEventListener("keydown", a);
                                    },
                                    onHide: function() {
                                        document.removeEventListener("keydown", a);
                                    }
                                }), s = [], d = e.querySelector("img.photo-layer_img");
                                if (d) {
                                    var c = d.dataset.fsSrc || d.dataset.nfsSrc || d.src;
                                    c && s.push({
                                        href: c,
                                        title: "photo_" + parseInt(Date.now() / 1e3),
                                        quality: o.a.i18n.getMessage("download"),
                                        format: " ",
                                        ext: "jpg",
                                        forceDownload: !0,
                                        isBlank: !0,
                                        func: function() {
                                            i.hide();
                                        }
                                    });
                                }
                                if (d || (d = e.querySelector("div.gif[data-gifsrc]")), d) {
                                    var l = {
                                        webmsrc: "webm",
                                        mp4src: "mp4",
                                        gifsrc: "gif"
                                    };
                                    Object.keys(l).forEach((function(e) {
                                        var t = d.dataset[e];
                                        if (t) {
                                            var n = l[e];
                                            s.push({
                                                href: t,
                                                title: "gif_" + parseInt(Date.now() / 1e3),
                                                quality: o.a.i18n.getMessage("download"),
                                                format: n.toUpperCase(),
                                                ext: n,
                                                forceDownload: !0,
                                                isBlank: !0,
                                                func: function() {
                                                    i.hide();
                                                }
                                            });
                                        }
                                    }));
                                }
                                0 !== s.length ? i.update(s) : i.update(o.a.i18n.getMessage("noLinksFound"));
                            } ],
                            append: [ m.a.create(r.svg.getSvg("download"), {
                                style: {
                                    width: "12px",
                                    height: "12px",
                                    margin: "4px"
                                }
                            }) ]
                        }));
                    }
                },
                injectStyle: function() {
                    V.style ? V.style.parentNode || document.head.appendChild(V.style) : (V.style = m.a.create("style", {
                        text: Object(l.a)({
                            "div > .sf-dl-current-photo-btn": {
                                display: "none",
                                border: "1px solid #F8F8F8",
                                width: "20px",
                                height: "20px",
                                padding: 0,
                                position: "absolute",
                                backgroundColor: "#F8F8F8",
                                top: "73px",
                                left: "90px",
                                zIndex: 100,
                                cursor: "pointer"
                            },
                            "div > .sf-dl-current-photo-btn svg path": {
                                fill: "#eb722e"
                            },
                            "div > .sf-dl-current-photo-btn:hover svg path": {
                                fill: "#00B75A"
                            },
                            "div > .sf-dl-current-photo-btn:active": {
                                outline: 0,
                                boxShadow: "inset 0 3px 5px rgba(0, 0, 0, 0.125)"
                            },
                            "div:hover > .sf-dl-current-photo-btn": {
                                display: "block"
                            }
                        })
                    }), document.head.appendChild(V.style));
                },
                addCurrentDlBtn: function(e) {
                    if ("1" !== e.dataset.sfSkip2) {
                        e.dataset.sfSkip2 = "1";
                        var t = e.querySelector("img.photo-layer_img");
                        if (t) t.dataset.fsSrc || t.dataset.nfsSrc || t.src || (t = null);
                        t || (t = e.querySelector("div.gif[data-gifsrc]")), t && this.addDlCurrentPhotoBtn(e);
                    }
                }
            };
            const z = new class {
                constructor() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this.options = e, this.tooltip = null, this.init();
                }
                init() {
                    this.tooltip = m.a.create("div", {
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
                        }, this.options.style),
                        on: [ "mouseenter", e => {
                            this.hide();
                        } ]
                    }), document.body.appendChild(this.tooltip);
                }
                updatePos(e) {
                    const t = r.getPosition(e), n = r.getSize(this.tooltip);
                    this.tooltip.style.top = t.top + this.options.top - n.height + "px";
                    let o = t.left + parseInt(this.options.width / 2, 10) - parseInt(n.width / 2, 10);
                    const a = document.body.clientWidth + document.body.scrollLeft;
                    a < o + n.width && (o = a - n.width), this.tooltip.style.left = o + "px";
                }
                show(e) {
                    this.tooltip.style.display = "block", setTimeout(() => {
                        this.updatePos(e), this.tooltip.style.opacity = 1;
                    });
                }
                hide() {
                    this.tooltip.style.opacity = 0, this.tooltip.style.display = "none";
                }
                destroy() {
                    this.tooltip.parentNode && (this.tooltip.parentNode.removeChild(this.tooltip), this.tooltip = null);
                }
            }({
                top: -12,
                width: 16,
                style: {
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    color: "rgb(48, 48, 48)",
                    fontSize: "12px",
                    padding: "3px"
                }
            });
        }));
    }
});