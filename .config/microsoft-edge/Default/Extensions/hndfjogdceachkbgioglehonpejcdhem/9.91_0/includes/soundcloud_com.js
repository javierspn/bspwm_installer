!function(A) {
    function t(t) {
        for (var n, s, i = t[0], a = t[1], c = t[2], u = 0, d = []; u < i.length; u++) s = i[u], 
        Object.prototype.hasOwnProperty.call(r, s) && r[s] && d.push(r[s][0]), r[s] = 0;
        for (n in a) Object.prototype.hasOwnProperty.call(a, n) && (A[n] = a[n]);
        for (l && l(t); d.length; ) d.shift()();
        return o.push.apply(o, c || []), e();
    }
    function e() {
        for (var A, t = 0; t < o.length; t++) {
            for (var e = o[t], n = !0, i = 1; i < e.length; i++) {
                var a = e[i];
                0 !== r[a] && (n = !1);
            }
            n && (o.splice(t--, 1), A = s(s.s = e[0]));
        }
        return A;
    }
    var n = {}, r = {
        12: 0
    }, o = [];
    function s(t) {
        if (n[t]) return n[t].exports;
        var e = n[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return A[t].call(e.exports, e, e.exports, s), e.l = !0, e.exports;
    }
    s.m = A, s.c = n, s.d = function(A, t, e) {
        s.o(A, t) || Object.defineProperty(A, t, {
            enumerable: !0,
            get: e
        });
    }, s.r = function(A) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(A, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(A, "__esModule", {
            value: !0
        });
    }, s.t = function(A, t) {
        if (1 & t && (A = s(A)), 8 & t) return A;
        if (4 & t && "object" == typeof A && A && A.__esModule) return A;
        var e = Object.create(null);
        if (s.r(e), Object.defineProperty(e, "default", {
            enumerable: !0,
            value: A
        }), 2 & t && "string" != typeof A) for (var n in A) s.d(e, n, function(t) {
            return A[t];
        }.bind(null, n));
        return e;
    }, s.n = function(A) {
        var t = A && A.__esModule ? function() {
            return A.default;
        } : function() {
            return A;
        };
        return s.d(t, "a", t), t;
    }, s.o = function(A, t) {
        return Object.prototype.hasOwnProperty.call(A, t);
    }, s.p = "";
    var i = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], a = i.push.bind(i);
    i.push = t, i = i.slice();
    for (var c = 0; c < i.length; c++) t(i[c]);
    var l = a;
    o.push([ 94, 0 ]), e();
}({
    94: function(A, t, e) {
        "use strict";
        e.r(t);
        var n = e(19), r = e(0), o = e(17), s = e(12), i = e(7), a = e(13);
        const c = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
        function l(A) {
            return A.dataset.sfSongReady = 1, A;
        }
        const u = A => !A.dataset.sfSongReady, d = () => {
            try {
                return "Tampermonkey" === GM_info.scriptHandler || "Violentmonkey" === GM_info.scriptHandler;
            } catch (A) {
                return !1;
            }
        }, h = () => {
            if (d()) return !1;
            return !(r.a.isGM && navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome"));
        }, p = A => {
            let {downloadURL: t, filename: e} = A;
            if (d()) {
                const A = document.createElement("a");
                A.style.display = "none", A.href = t, A.setAttribute("target", "_blank"), A.download = e, 
                document.body.appendChild(A), A.click(), A.remove();
            } else {
                const A = new CustomEvent("song.download", {
                    detail: {
                        downloadURL: t,
                        filename: e
                    }
                });
                document.dispatchEvent(A);
            }
        }, w = A => {
            const t = document.createElement("a");
            return t.target = "_blank", A && t.classList.add("sf--sc-" + A), t.classList.add("sf--sc-btn", "sc-button", "sc-button-small", "sc-button-icon", "sc-button-responsive"), 
            t.addEventListener("mouseenter", A => {
                if (c) {
                    if (!A.altKey && !A.ctrlKey) return A.preventDefault(), void Object(a.b)(t, {
                        content: r.a.i18n.getMessage("downloadTitle"),
                        defaultWidth: 400,
                        defaultHeight: 60
                    });
                    Object(a.a)(t, {
                        content: r.a.i18n.getMessage("downloadTitle"),
                        defaultWidth: 400,
                        defaultHeight: 60
                    });
                }
            }), Object(i.a)({
                category: "append",
                subcategory: "so",
                event: "b"
            }), t;
        }, g = (A, t) => {
            [ "loading", "error", "playlist", "default" ].includes(t) && (A.classList.remove("sf--sc-loading"), 
            A.classList.add("sf--sc-" + t));
        }, y = A => (A => {
            try {
                let t = A.replace(/[^A-Za-zА-Яа-яЁё0-9\s\.\-\(\)\[\]]/g, "").trim();
                if ("" === t || t.length < 3 || t.test(/\.$/)) throw new Error("filename not valid");
                return t;
            } catch (A) {
                return Date.now() + "_track";
            }
        })("" + A.title) + ".mp3";
        function f(A, t) {
            var e = Object.keys(A);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(A);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(A, t).enumerable;
                }))), e.push.apply(e, n);
            }
            return e;
        }
        function Q(A) {
            for (var t = 1; t < arguments.length; t++) {
                var e = null != arguments[t] ? arguments[t] : {};
                t % 2 ? f(Object(e), !0).forEach((function(t) {
                    Object(n.a)(A, t, e[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(A, Object.getOwnPropertyDescriptors(e)) : f(Object(e)).forEach((function(t) {
                    Object.defineProperty(A, t, Object.getOwnPropertyDescriptor(e, t));
                }));
            }
            return A;
        }
        function C(A, t) {
            return Object(s.a)({
                action: "soundcloudFetchPageInfo",
                clientId: A,
                songEndpoint: t
            });
        }
        async function E(A, t) {
            const e = await C(A, t);
            if (!e || "track" !== e.kind) return;
            const n = await m(A, e);
            return Q(Q({}, e), {}, {
                downloadURL: n,
                filename: y(e)
            });
        }
        function m(A, t) {
            return Object(s.a)({
                action: "soundcloudSearchBestDownloadURL",
                clientID: A,
                song: t
            });
        }
        function b(A, t) {
            return Object(s.a)({
                action: "soundcloudFetchSongsOfPlaylist",
                clientID: A,
                playlist: t
            });
        }
        var k = e(44), I = e(11), M = e(8);
        var B = e(15), S = e(10);
        class O {
            constructor(A) {
                this.selector = '[role="group"].sound.playlist.streamContext', this.type = "added", 
                this.clientID = A;
            }
            handle(A) {
                let {added: t} = A;
                t.filter(u).map(l).map(A => this.renderDownloadButton(A));
            }
            renderDownloadButton(A) {
                const t = A.querySelector(".sc-button-group"), e = w("playlist");
                e.addEventListener("click", this.downloadPlaylist.bind(this)), t.appendChild(e);
            }
            async downloadPlaylist(A) {
                A.stopPropagation();
                const t = A.target;
                g(t, "loading");
                try {
                    const e = A.target.closest(this.selector).querySelector('a[href*="sets/"]').href, n = await C(this.clientID, e);
                    if ("playlist" !== n.kind) throw new Error("It's not playlist.");
                    const r = (await b(this.clientID, n)).map(async A => ({
                        filename: y(A),
                        downloadURL: await m(this.clientID, A)
                    }));
                    (await Promise.all(r)).map(p);
                } catch (A) {
                    throw g(t, "error"), A;
                } finally {
                    g(t, "default");
                }
            }
        }
        var D = e(6);
        const J = Object(D.a)("userCardSingleTrack");
        class K {
            constructor(A, t) {
                this.selector = '[role="group"].sound.streamContext:not(.playlist)', this.type = "added", 
                this.utils = A, this.clientID = t;
            }
            handle(A) {
                let {added: t} = A;
                t.filter(u).map(l).map(A => this.renderDownloadButton(A));
            }
            renderDownloadButton(A) {
                const t = A.querySelector(".sc-button-group");
                t && this.btnPrepare(A).then(A => {
                    A && t.appendChild(A);
                });
            }
            async btnPrepare(A) {
                const t = w(), e = A.closest(this.selector);
                if (!e) return void J.error("root not found", A);
                const n = e.querySelector("a.soundTitle__title[href]");
                if (!n) return void J.error("song url not found", A);
                const r = await C(this.clientID, n.href);
                return r && "track" === r.kind ? (t.href = await m(this.clientID, r), t.download = y(r), 
                t.addEventListener("click", this.utils.downloadOnClick), t) : void 0;
            }
        }
        const L = [ ".listenDetails .trackItem.g-flex-row.sc-type-small .sc-button-group, .chartTrack .sc-button-group", ".trackItem.g-flex-row.sc-type-small.m-playable .sc-button-group" ].join(",");
        class U {
            constructor(A, t) {
                this.selector = L, this.type = "added", this.utils = A, this.clientID = t;
            }
            handle(A) {
                let {added: t} = A;
                t.filter(u).map(l).map(A => this.renderDownloadButton(A));
            }
            renderDownloadButton(A) {
                this.btnPrepare(A).then(t => {
                    Object(i.a)({
                        category: "append",
                        subcategory: "so",
                        event: "b"
                    }), t && A.appendChild(t);
                });
            }
            async btnPrepare(A) {
                const t = w(), e = A.closest(".sc-type-small, .chartTrack");
                if (!e) return void debug.error("root not found", A);
                let n = e.querySelector(".trackItem__trackTitle[href], .chartTrack__title [href]");
                if (!n) return;
                n = n.href;
                const r = await E(this.clientID, n);
                return r ? (t.href = r.downloadURL, t.download = r.filename, t.addEventListener("click", this.utils.downloadOnClick), 
                t) : void 0;
            }
        }
        const x = ".sidebarContent .sc-media:not(.hiddenActions) .sc-button-group", R = ".l-about-top .sc-button-group:nth-child(1)", v = ".l-about-row .sound__soundActions .sc-button-group:nth-child(1)";
        class F {
            constructor(A, t) {
                this.selector = [ v, x, R ].join(","), this.type = "added", this.utils = A, this.clientID = t;
            }
            handle(A) {
                let {added: t} = A;
                t.filter(u).map(l).map(A => this.renderDownloadButton(A));
            }
            renderDownloadButton(A) {
                const t = h(), e = t || !t && -1 === location.pathname.indexOf("/sets/");
                let n;
                this.isTopSidebar(A) ? e && (n = this.prepareButtonForTop()) : n = this.prepareButtonForSidebar(A), 
                n && n.then(t => {
                    t && A.appendChild(t);
                });
            }
            async prepareButtonForSidebar(A) {
                const t = w(), e = A.closest(".sc-media");
                if (!e) return;
                let n;
                const r = e.querySelector(".soundTitle__title[href]");
                if (r && (n = r.href), !r && document.querySelector(v) && (n = location.href), !n) return;
                const o = await E(this.clientID, n);
                return o ? (t.href = o.downloadURL, t.download = o.filename, t.addEventListener("click", this.utils.downloadOnClick), 
                t) : void 0;
            }
            async prepareButtonForTop() {
                const A = w();
                A.dataset.position = "sidebar", A.style.width = A.style.height = "26px";
                const t = await E(this.clientID, location.href);
                return t ? (A.href = t.downloadURL, A.download = t.filename, A.addEventListener("click", this.utils.downloadOnClick), 
                A) : (A.addEventListener("click", this.onDownloadPlaylist.bind(this)), A.classList.remove("sc-button-small"), 
                A);
            }
            async onDownloadPlaylist(A) {
                A.preventDefault(), A.stopPropagation();
                const t = await C(this.clientID, location.href), e = (await b(this.clientID, t)).map(async A => ({
                    filename: y(A),
                    downloadURL: await m(this.clientID, A)
                }));
                (await Promise.all(e)).map(p);
            }
            isTopSidebar(A) {
                return null !== A.closest(".l-about-top");
            }
        }
        function H(A, t) {
            var e = Object.keys(A);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(A);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(A, t).enumerable;
                }))), e.push.apply(e, n);
            }
            return e;
        }
        function j(A) {
            for (var t = 1; t < arguments.length; t++) {
                var e = null != arguments[t] ? arguments[t] : {};
                t % 2 ? H(Object(e), !0).forEach((function(t) {
                    Object(n.a)(A, t, e[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(A, Object.getOwnPropertyDescriptors(e)) : H(Object(e)).forEach((function(t) {
                    Object.defineProperty(A, t, Object.getOwnPropertyDescriptor(e, t));
                }));
            }
            return A;
        }
        class T extends k.a {
            constructor() {
                super(...arguments), this.mutationHandlers = [], this.active = 1;
            }
            async init() {
                this.settings = await r.a.callFn("getPreferences"), this.utils = Object(I.a)({
                    preferences: this.settings
                }), this.active = Number(this.settings.moduleSoundcloud), this.clientId = this.cache.get("client_id"), 
                this.clientId || (this.clientId = await Object(o.a)('function(){var wpchunk=window.webpackChunk||window.webpackJsonp;if(typeof wpchunk==="undefined"){return}var _result;var sections=wpchunk.filter(function(v,k){return k!=="push"});// check fn\nfor(var id in wpchunk){var chunk=wpchunk[id];if(chunk[1]&&chunk[1][41021]){var matches=chunk[1][41021].toString().match(/\\?client_id=(.+?)&/);if(Array.isArray(matches)&&matches[1]){return matches[1]}}}sections.some(function(section){var obj=section[1];return Object.keys(obj).some(function(fnIdx){var result=obj[fnIdx].toString().match(/\\"client_id=\\w+\\"/);if(result&&result[0]){return _result=result[0].split("=")[1].replace(/\\"/,"")}})});return _result}')), 
                this.registerMonoListeners(), this.registerListeners(), this.active && this.initObserver(), 
                this.appendStyle("\n  .sf--sc-btn {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAPklEQVR42mNgGHTgvw/DfxgexJqBiuYja8CD55NrwHxyXTCfWP/OJ0sjFgPmkxvXCWRFDy6MT3MDITw40j8Ak46HYQ4gDfUAAAAASUVORK5CYII=);\n    background-repeat: no-repeat;\n    background-position: 50%;\n  }\n  .sf--sc-playlist {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAMUlEQVR42mL8//8/A7mAiYECwILC82Uk7IzN/xmpYjPjqJ9H/UxTP1OkGQAAAP//AwDcahUV6UvyJwAAAABJRU5ErkJggg==);\n    background-size: 50%;\n  }\n  .sf--sc-loading {\n    background-image: url(data:image/gif;base64,R0lGODlhHgAeAKUAAAQCBISGhMzKzERCROTm5CQiJKSmpGRmZNza3PT29DQyNLS2tBQWFJyanFRSVHx6fNTS1Ozu7CwqLKyurGxubOTi5Pz+/Dw6PLy+vBweHKSipFxaXAQGBIyKjMzOzExKTCQmJKyqrGxqbNze3Pz6/DQ2NBwaHJyenHx+fNTW1PTy9MTCxFxeXP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCQAtACwAAAAAHgAeAAAGtMCWcEgcegoZT3HJFCYIpOEBADg0r84S5zHUADgaIiKKFXqoIMsQAiEmCquykORgNMoJOZGsb5IQan1lFh8ALIJFJAZ5QioMABmIRBUMSkMnAxOSRCqbnp+ggionKaFFIgAmjKAGEhUUkHyfISUECRMjprq7vKAYLAKfJAudQwoAA58nAAFEHQwnnwQUCL3WfSEb1VcqAZZyIABcVwYADn0aH6VzBwd8ESjBniMcHBW9ISF9QQAh+QQJCQAzACwAAAAAHgAeAIUEAgSEgoTEwsRMTkzk4uQkIiSkoqRsamzU0tT08vQ0MjQUEhRcWly0trSUkpR0dnQMCgzMyszs6uzc2tz8+vw8OjyMioxUVlQsKiysqqxkYmS8vrx8fnwEBgSEhoTExsRUUlTk5uR0cnTU1tT09vQ0NjQcGhxcXly8urycnpx8enwMDgzMzszs7uzc3tz8/vw8PjwsLiysrqz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGt8CZcEgcumCVSXHJFL4SRA4A8BhSJq1m8TVYOIaoTqcxPAAKEu2Q0AGUiCHCkGSaktXCgymjVnVKUHiCQxIUaoGDgwcdKolMAoZOBQAxjkUJBS5EDSAollufoaKjohQbIaRLHgAYkaQsJyQWlK6jCCcUFAKoqb2+v74jD0qiLyy1AwAMoygAKUQGBTKjLQFywNiOHwFZWhQpmoMVAF9aGwAaiRkX4TMvKiIvcxYjowkrEN2/ER+JQQAh+QQJCQAuACwAAAAAHgAeAIUEAgSEgoTExsREQkSkoqTs6uxkZmQcHhyUkpTU1tS0trT09vQUEhRUUlR0dnSMiozMzsysqqw0NjQMCgxMSkz08vQsKiycnpzk4uS8vrz8/vx8fnyEhoTMysxERkSkpqTs7uxsbmwkIiSUlpTc2ty8urz8+vwcGhxUVlR8enyMjozU0tSsrqwMDgz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGtkCXcEgcglCNQnHJHGqIIwDgQSwsmsvQITLstFqCYWAiuWKFiwmAQgSBhiaLtHMWSzLnUYtirvvRf4FLFQpKQw8tI4JEJhIAIm9CjgOLQwVqAAlDAgYQlUMbDAYmn1h9paipGiuRqUQXAAOkrhgOJrADT64kKaQJFa7BwsPDGCOtn8BEKAAbqBgMYUMREtKfJiynxNt+CQ/ISxoK4FjMF2cJACmBHQ7ICCqMBBioJgcns8Mkmn9BACH5BAkJADEALAAAAAAeAB4AhQQCBIyKjERGRMTGxCQiJOTm5GRiZKyqrNTW1BQSFDQyNJyanPT29HR2dFxaXMzOzGxqbMTCxNze3BwaHDw6PKSipAwKDExOTCwqLOzu7LS2tPz+/AQGBJSSlMzKzCQmJGRmZKyurNza3BQWFDQ2NJyenPz6/Hx6fFxeXNTS1GxubOTi5BweHDw+PKSmpFRSVPTy9P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa1wJhwSBwyVCpYcclsHgCACpFhai4DpMhQwpoghqXEq2odjgAooolBbEFF5WFH4Cm7WKhNfM/vx00PbEMVHyF+RS8AJGQxFwAOh0YJABwFQykNcJFCHQQneptNoKGkpUIFjKUHECkHHBCmMQ9QLC4AILGzACwxK6mkJSAPscTFpBkHSqSjQicAAccfEkQDFymlEb/G23EFFYJWBcxlEAAaZTAJLn0IAcpCIetEHuCbChjcK5Z8QQAh+QQJCQAzACwAAAAAHgAeAIUEAgSEgoTEwsRMTkzk4uQkIiSkoqRsamz08vTU0tQ0NjS0srQUEhSUkpRcWlx8enwMCgyMiozs6uwsKiz8+vzc2ty8urzMysysqqx0cnQ8PjxkYmQEBgSEhoTExsRUUlTk5uQkJiSkpqRsbmz09vTU1tQ8Ojy0trQcHhycmpxcXlx8fnwMDgyMjozs7uwsLiz8/vzc3ty8vrz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGuMCZcEgcUjodSnHJbMoAAEtzOjQMSkPQJAQaLkIjKjEEyBBhyuEAwEGIhRhHhWp5md/4vL4JghExGhd7RAcAH35CHwArg0MoACxuQjENLo1CIgoNl5ydnmIkn0IyHQQeDA+fMRAAJgIsd50xHAAKMy6IngsPc6K+v1RpQyQCwoMrKAe5LQAplxKsAFhCCRsxlxQKACiSoi4nEsBvCBa5TaF5KwAJwQUCeQQp6NTsRCXmgyoO4iTGVEEAIfkECQkAMQAsAAAAAB4AHgCFBAIEhIaExMbEREJE5ObkpKakJCIkZGJklJaU1NbU9Pb0FBIUtLa0NDI0VFJUdHJ0zM7M7O7snJ6cvL68PDo8fHp8DAoMjI6MTEpM5OLk/P78HB4cjIqMzMrMREZE7OrsrKqsLC4snJqc3Nrc/Pr8FBYUvLq8NDY0XFpcdHZ01NLU9PL0pKKkxMLEPD48fH58DA4M////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABrrAmHBIHGpYLE1xyWxCAABVczoEoQjDlcu1GrYoFyqxAUAQNSTiAbAQeysRasdldtvv+Gaa2HGM8kQBAClEDwAcgEMhABtKQgQSXYkxDBggk5iZmpt3ECIRCRt1mREwAA4qJWGaHxanMXubLRxYnLa3eSQJjokIIYhDLAAmkysLABa1MSMpcYkaAwAnsZsKAgqbEdRUGspNFTAU2G4FJZJMCiVQxG4rHUUj3msbzokpFUQKKueJJNtTQQAAIfkECQkANAAsAAAAAB4AHgCFBAIEhIKExMLEREJE5OLkZGJkpKKkJCIk1NLUVFJUdHJ0tLK0lJKU9PL0NDY0FBYUzMrMbGpsrKqsLCos3NrcXFpc/Pr8DAoMjI6MTEpMfH58vL68nJqcBAYEhIaExMbE5ObkZGZkpKakJCYk1NbUVFZUdHZ0tLa09Pb0PDo8HBoczM7MbG5srK6sLC4s3N7cXF5c/P78TE5MnJ6c////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABrRAmnBIJEpaxaRySXsBOiCmlPbRNIaoEMsyRMhE02EGIJEqAJOwcBW4MkklpHpOr0tJrKhdyHlgiAEAYHs0AwAORA0LKIQ0EDACjZKTlJVMLy0oIA4LlCgqAAoEI2WTDQ8ALJZCCDNuq7CxUq97IgMGRB8PenYxoA+MQg0SMY0VADLFlhYUXJPOc8FMDA8l0FIbB8prCEMWBwAAJGrMRDNPpTRnDtJ1BeERQzEg7XUfKiPdYUEAIfkECQkAMQAsAAAAAB4AHgCFBAIEhIKExMLEVFJU5OLkJCIkpKakbG5s9PL0FBIUlJKU1NbUNDI0vLq8fHp8DAoMjIqMzMrMXFpc7Ors/Pr8LCostLK0dHZ0HB4cnJ6c3N7cPD48BAYEhIaExMbEVFZU5ObkJCYkrKqsdHJ09Pb0FBYUlJaU3NrcNDY0vL68fH58DA4MjI6MzM7MXF5c7O7s/P78////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABrXAmHBIJHpaxaRyGXs9SiSmNLZQRIWUg4N4+limQxdAIGUBNmChJkORvlSRtHxOnxICr/pQVDEQTQApekIfAANEFBEwg1QXC4yQkZKTTBMCFCQuj5EUFQAsJBKbkBQhABCUQiApbamur1OLjA0fDVwFV3qeIYhkjCMcI695TBTElC8MKwFSBgUHaRYAABitMRoERJ4cIGAgGADQQiIcD4JCLAkDslMIC+wj08xDL+x1Cygb2WBBACH5BAkJADEALAAAAAAeAB4AhQQCBISChMTCxERGROTi5KSipCQiJNTS1GRmZPTy9BQSFJSWlLS2tDQyNIyKjMzKzFRWVOzq7KyqrNza3HRydPz6/BwaHAwKDJyenDw+PHx6fISGhMTGxExOTOTm5KSmpCwuLNTW1PT29BQWFJyanLy6vDQ2NIyOjMzOzFxeXOzu7KyurNze3HR2dPz+/BweHAwODP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAazwJhwSCSGJsWkchkTjQzMqJDwqRA3C2KkhZIOKYBQlARIeYURhiua2CDP8Lg8KpKs50JBY0UUjCJ4Qi1lRQmBaAsEh4uMjY5MCWIVLYqMLhkABZOVixWYBY9CKgehpVIipRUpFhqHKAgPQygAABcqgZgZQyovABl3cycwJ1olhqZDLqihIgMKJFEMDRtnArQgRCq3QwO1VlIqDQDUeRcKXUIfLxRwIoBDG7TQyYseHRDbUkEAIfkECQkAMAAsAAAAAB4AHgCFBAIEhIKExMLEREZE5OLkZGZkpKKkHB4c1NLUVFZU9PL0dHZ0tLK0FBYUlJKUNDY0zMrMTE5MbG5srKqsJCYk3Nrc/Pr8DAoMZGJknJ6cBAYEhIaExMbETEpM5ObkbGpspKakJCIk1NbUXFpc9Pb0fH58vL68HBoclJaUzM7MVFJUdHJ0rK6sLCos3N7c/P78////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABrVAmHBIJBI8xaRyKQw9mFAhCVIEMYiKTSU6NDQUUBZAwhW+CFGSAVluu99QiwBOTKmoQxGFRBcGACVFL31CCiBghImKi0UQGCCMFi4wJwAACIsjGhMHliKLBRcsKR+QixZsjKplg6svCxQohBULn0IElg0WfSoAKkMkDwAJhBMUE0QkCLurzUovIwcsUBwdGWUilgPJzEIjACdlFh0NpjAIDQeTQiYPDm0viEIZlleqChILfFxBACH5BAkJAC8ALAAAAAAeAB4AhQQCBISGhMTGxExOTOTm5CQmJKyqrNTW1GxqbPT29DQ2NLy6vBQWFJSSlAwKDMzOzFxaXOzu7CwuLLSytNze3IyOjHx6fPz+/Dw+PMTCxAQGBIyKjMzKzFRWVOzq7CwqLKyurNza3HRydPz6/Dw6PLy+vBweHJyanAwODNTS1GRiZPTy9DQyNLS2tOTi5P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa3wJdwSCQmRsWkcinsqJhQ4YhSTKWMJ0J0WCogmRxAYDtMREeLCHm9JbRW7GjEBFB84y+K6jBMAQAOangvJwANQyMIDGODLwklZkR3jZSVli8hFi2XLxdqLAAaLpcIKBwKgFqWIgwcLgElnI6ytLVsFQoGlBENVEIRKAAFlBYAEEMXAwAilAIkIEQXqrbURCISsUwHENBbERoAHZKTIgASawgFC0MuBSweQw8Duo0tfxm0IwEBk0xBACH5BAkJADMALAAAAAAeAB4AhQQCBISChMTGxERCROTm5CQiJKSipGRiZBQSFJSSlNTW1PT29DQyNLS2tHR2dAwKDIyKjMzOzFRSVOzu7BwaHJyanNze3Dw6PKyurGxqbPz+/AQGBISGhMzKzExKTOzq7CwuLKSmpBQWFJSWlNza3Pz6/DQ2NLy6vHx6fAwODIyOjNTS1FxaXPTy9BweHJyenOTi5Dw+PGxubP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa6wJlwSCSWSsWkcjhZIYcO1HI6/LgAB6IFVhS0qMMGAEBZTCcIDFjYMqWkVIJmLSxN6NSWwIwHLxgAHn1FBA5cQgQbAAh8gzNiIUQcIBWOQyUkT5abnJ1rBBACnpczHgApd54QIgoSi6mdCQUWExUro7i5up0hHiecEy8fl1cmnBwADkQZDxycCiwdRY271UUqAxFUHyiiaxopWEQac0MJAMZ0EBfeMy0xA19CFixqmxFjCroaLwblYEEAADs=);\n    background-size: 50%;\n  }\n  .sf--sc-error {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAVklEQVQoz2P4//8/A7mYgSqa0UF9ff1/GEaXG0SagYrmI2vAg+djtZkIA+bjdTYeA+YT5WcsBswnNcDmY9NIlGaoAQnYxHEFGMHQxqe5gRDGqpnuGQMALmDKhkjc9oYAAAAASUVORK5CYII=);\n  }\n");
            }
            registerListeners() {
                document.addEventListener("song.download", A => {
                    let {detail: t} = A;
                    this.utils.download(t.filename, t.downloadURL);
                });
            }
            registerMonoListeners() {
                const A = A => this.settings = j(j({}, this.settings), {}, {
                    preferences: A
                });
                r.a.onMessage.addListener(async (t, e, n) => {
                    const {action: r, moduleName: o, state: s} = t;
                    if (o === T.moduleName) {
                        if ("getModuleInfo" === r) return n({
                            state: this.active,
                            moduleName: T.moduleName
                        });
                        if ("updatePreferences" === r) return A(t.preferences);
                        if ("changeState" === r) {
                            if (s) return this.initObserver();
                            this.observer.stop();
                            document.querySelectorAll(".sf--sc-btn").forEach(A => A.remove()), document.querySelectorAll('[data-sf-song-ready="1"]').forEach(A => {
                                A.removeAttribute("data-sf-song-ready");
                            });
                        }
                    }
                });
            }
            initObserver() {
                const A = this.clientId;
                this.mutationHandlers = [ new K(this.utils, A), new U(this.utils, A), new F(this.utils, A) ], 
                h() && this.mutationHandlers.push(new O(A));
                this.observer = new M.a({
                    queries: this.mutationHandlers.map(A => ({
                        css: A.selector,
                        callback: A.handle.bind(A),
                        is: A.type
                    }))
                }), this.observer.start();
            }
        }
        T.moduleName = "soundcloud";
        const P = new T;
        B.a.isSingle() && Object(S.a)(T.moduleName, () => P.init(), () => !0);
    }
});