!function(e) {
    function t(t) {
        for (var n, a, u = t[0], l = t[1], s = t[2], c = 0, f = []; c < u.length; c++) a = u[c], 
        Object.prototype.hasOwnProperty.call(o, a) && o[a] && f.push(o[a][0]), o[a] = 0;
        for (n in l) Object.prototype.hasOwnProperty.call(l, n) && (e[n] = l[n]);
        for (d && d(t); f.length; ) f.shift()();
        return i.push.apply(i, s || []), r();
    }
    function r() {
        for (var e, t = 0; t < i.length; t++) {
            for (var r = i[t], n = !0, u = 1; u < r.length; u++) {
                var l = r[u];
                0 !== o[l] && (n = !1);
            }
            n && (i.splice(t--, 1), e = a(a.s = r[0]));
        }
        return e;
    }
    var n = {}, o = {
        5: 0
    }, i = [];
    function a(t) {
        if (n[t]) return n[t].exports;
        var r = n[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(r.exports, r, r.exports, a), r.l = !0, r.exports;
    }
    a.m = e, a.c = n, a.d = function(e, t, r) {
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
        }), 2 & t && "string" != typeof e) for (var n in e) a.d(r, n, function(t) {
            return e[t];
        }.bind(null, n));
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
    var u = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], l = u.push.bind(u);
    u.push = t, u = u.slice();
    for (var s = 0; s < u.length; s++) t(u[s]);
    var d = l;
    i.push([ 91, 0 ]), r();
}({
    91: function(e, t, r) {
        "use strict";
        r.r(t);
        var n = r(0), o = r(11), i = r(10), a = r(27);
        r(15).a.isSingle() && Object(i.b)("lm", (function(e, t) {
            const r = Object(o.a)(t);
            var i = t.preferences, a = i.lmMediaHosting ? 1 : 0;
            i.showUmmyInfo && setTimeout((function() {
                u();
            })), n.a.onMessage.addListener((function(t, r, n) {
                if ("getModuleInfo" === t.action) {
                    if (t.url !== location.href) return;
                    return n({
                        state: a,
                        moduleName: e
                    });
                }
                if ("changeState" === t.action) {
                    if (e !== t.moduleName) return;
                    return l.changeState(t.state);
                }
                "updatePreferences" !== t.action ? a && "updateLinks" === t.action && (l.savefromLinkCount = -1, 
                l.run()) : Object.assign(i, t.preferences);
            })), a && setTimeout((function() {
                l.run();
            }));
            var u = function() {
                "object" == typeof location && /videodownloader\.ummy\.net/.test(location.href) && /pozdravlyaem|congratulations|tebrikler/.test(location.href) && (n.a.sendMessage({
                    action: "updateOption",
                    key: "showUmmyInfo",
                    value: 0
                }), n.a.sendMessage({
                    action: "updateOption",
                    key: "ummyDetected",
                    value: 1
                }));
            }, l = {
                htmlAfter: "",
                linkText: "",
                linkStyle: {
                    border: "none",
                    textDecoration: "none",
                    padding: "0",
                    position: "relative"
                },
                imgStyle: {
                    border: "none",
                    width: "auto",
                    height: "auto"
                },
                buttonSrc: "data:image/gif;base64,R0lGODlhEAAQAOZ3APf39+Xl5fT09OPj4/Hx8evr6/3+/u7u7uDh4OPi497e3t7e3/z8/P79/X3GbuXl5ubl5eHg4WzFUfb39+Pj4lzGOV7LOPz7+/n6+vn5+ZTLj9/e387Ozt7f3/7+/vv7/ISbePn5+m/JV1nRKXmVbkCnKVrSLDqsCuDh4d/e3uDn3/z7/H6TdVeaV1uSW+bn5v39/eXm5eXm5kyHP/f39pzGmVy7J3yRd9/f3mLEKkXCHJbka2TVM5vaZn6Wdfn6+YG/c/r5+ZO/jeLi41aHTIeageLn4f39/vr6+kzNG2PVM5i+lomdf2CXYKHVmtzo2YXNeDqsBebl5uHh4HDKWN3g3kKqEH6WeZHTXIPKdnSPbv79/pfmbE7PHpe1l4O8dTO5DODg4VDLIlKUUtzo2J7SmEWsLlG4NJbFjkrJHP7+/VK5Nfz8+zmnC3KKa+Hg4OHh4Y63j/3+/eDg4Ojo6P///8DAwP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHcALAAAAAAQABAAAAfWgHd2g4SFhYJzdYqLjIpzgx5bBgYwHg1Hk2oNDXKDFwwfDF5NLmMtcStsn4MhGT8YS04aGmU1QRhIGYMTADQAQlAODlloAMYTgwICRmRfVBISIkBPKsqDBAREZmcVFhYVayUz2IMHB1dWOmImI2lgUVrmgwUFLzdtXTxKSSduMfSD6Aik48MGlx05SAykM0gKhAAPAhTB0oNFABkPHg5KMIBCxzlMQFQZMGBIggSDpsCJgGDOmzkIUCAIM2dOhEEcNijQuQDHgg4KOqRYwMGOIENIB90JBAA7",
                sfref: "&utm_source={sfHelperName}&utm_medium=extensions&utm_campaign=link_modifier",
                pageUrl: "http://savefrom.net/",
                anchorAttribute: "savefrom_lm",
                anchorAttributeLink: "savefrom_lm_is_link",
                anchorIndexAttribute: "savefrom_lm_index",
                linkRegExp: null,
                savefromLinkCount: 0,
                re: {
                    mediahosting: {
                        "youtube.com": [ /^https?:\/\/([a-z]+\.)?youtube\.com\/(#!?\/)?watch\?.*v=/i, /^https?:\/\/([a-z0-9]+\.)?youtube\.com\/(embed|v)\/[\w\-]+/i ],
                        "youtu.be": [ /^https?:\/\/([a-z]+\.)?youtu\.be\/[\w\-]+/i ],
                        "google.com": [ /^http:\/\/video\.google\.com\/videoplay\?.*docid=/i ],
                        "break.com": [ /^http:\/\/(www\.)?break\.com\/(index|movies\w*|(\w+\-)+\w+)\/.+\.html$/i, /^http:\/\/view\.break\.com\/\d+/i ],
                        "vimeo.com": [ /^http:\/\/([\w\-]+\.)?vimeo\.com\/\d+$/i ],
                        "sevenload.com": [ /^http:\/\/([\w\-]+\.)?sevenload\.com\/videos\/[-\w\+\/=]+/i, /^http:\/\/([\w\-]+\.)?sevenload\.com\/shows\/.+/i ],
                        "facebook.com": [ /^https?:\/\/(?:www\.)facebook\.com\/([^\/]+\/)*video\.php\?([^&]+&)*v=\d+/i ],
                        "mail.ru": [ /^http:\/\/([a-z0-9_-]+\.)?video\.mail\.ru\/(.+\/)+\d+\.html/i, /^http:\/\/r\.mail\.ru\/\w+\/video\.mail\.ru\/(.+\/)+\d+\.html/i ],
                        "yandex.ru": [ /^http:\/\/video\.yandex\.ru\/users\/[-\w,!\+]+\/view\/[-\w,!\+]+\/?/i ],
                        "rambler.ru": [ /^http:\/\/vision\.rambler\.ru\/users\/[^\/\s]+\/\d+\/[-\w_\+!]+\/?/i ],
                        "smotri.com": [ /^http:\/\/([a-z0-9_-]+\.)?smotri\.com\/video\/view\/\?.*id=v[0-9a-f]/i ],
                        "tvigle.ru": [ /^http:\/\/(www\.)?tvigle\.ru\/channel\/\d+\?.*vid_id=\d+/i, /^http:\/\/(www\.)tvigle\.ru\/prg\/\d+\/\d+/i ],
                        "1tv.ru": [ /^http:\/\/(www\.)?1tv\.ru(\:\d+)?\/newsvideo\/\d+/i, /^http:\/\/(www\.)?1tv\.ru(\:\d+)?\/news\/\w+\d+/i ],
                        "ntv.ru": [ /^http:\/\/news\.ntv\.ru\/(\w+\/)?\d+\/video\/?/i ],
                        "vesti.ru": [ /^http:\/\/(www\.)?vesti\.ru\/videos\?.*vid=\d+/i ],
                        "mreporter.ru": [ /^http:\/\/(www\.)?mreporter\.ru\/reportermessages\!viewreport\.do[^\?]*\?.*reportid=\d+/i ],
                        "autoplustv.ru": [ /^http:\/\/(www\.)?autoplustv\.ru\/494\/\?id=\d+/i ],
                        "amik.ru": [ /^http:\/\/(www\.)?amik\.ru\/video\/vid\d+\.html/i, /^http:\/\/(www\.)?amik\.ru\/video\/vcid\d+\.html/i ],
                        "life.ru": [ /^http:\/\/([\w+\-]+\.)?life\.ru\/video\/\d+/i ]
                    }
                },
                parseHref: function(e, t) {
                    var r = [];
                    r.push(e);
                    var n = e.toLowerCase().indexOf("http://", 7);
                    if (n > 7) r.push(e.substring(n)); else if (t) {
                        var o = t.match(/http%3a(%2f%2f|\/\/)[^\s\&\"\<\>]+/i);
                        if (o && o.length > 0) r.push(decodeURIComponent(o[0])); else {
                            var i = "";
                            try {
                                i = decodeURIComponent(t);
                            } catch (e) {}
                            if (i && (o = i.match(/((?:aHR0cDovL|aHR0cHM6Ly)[a-z0-9+\/=]+)/i)) && o.length > 1) {
                                try {
                                    o = atob(o[1]);
                                } catch (e) {
                                    o = "";
                                }
                                -1 != o.search(/^https?:\/\//i) && r.push(decodeURIComponent(o));
                            }
                        }
                    }
                    return r;
                },
                href: function(e) {
                    return e.getAttribute("href") || "";
                },
                getElementIndex: function(e) {
                    var t = e.innerHTML;
                    if (!t || " " == t) return 1;
                    var r = e.style.backgroundImage;
                    if (r && "none" != r) return 1;
                    for (var n = e.getElementsByTagName("*"), o = 0; o < n.length; o++) {
                        if ("IMG" == n[o].tagName) return 2;
                        if ((r = n[o].style.backgroundImage) && "none" != r) return 1;
                    }
                    return 0;
                },
                run: function() {
                    r.embedDownloader.init(), l.sfref = l.sfref.replace("{sfHelperName}", i.sfHelperName);
                    var e = !!i.lmMediaHosting;
                    if (a = 1, l.linkRegExp = {}, e) for (var t in l.re.mediahosting) l.linkRegExp[t] = l.re.mediahosting[t];
                    var o = document.getElementsByTagName("a");
                    if (l.savefromLinkCount != o.length) {
                        l.savefromLinkCount = o.length;
                        for (var u = {}, s = "", d = (t = 0, o.length); t < d; t++) {
                            var c = g(o[t]);
                            if (c) {
                                var f = 0, m = o[t].getAttribute(l.anchorIndexAttribute);
                                0 === m || m ? f = parseInt(m) : (f = l.getElementIndex(o[t]), o[t].setAttribute(l.anchorIndexAttribute, f)), 
                                u[c] ? f < u[c].index ? (u[c].elements = [ o[t] ], u[c].index = f, s = c) : f == u[c].index && c != s && (u[c].elements.push(o[t]), 
                                s = c) : (u[c] = {
                                    index: f,
                                    elements: [ o[t] ]
                                }, s = c);
                            }
                        }
                        for (var t in u) {
                            var h = 0;
                            for (d = u[t].elements.length; h < d; h++) {
                                var p = u[t].elements[h];
                                p.getAttribute(l.anchorAttribute) || A(p, t);
                            }
                        }
                    }
                    function v(e, t) {
                        if (!e) return !1;
                        if (e == window.location.href) return !1;
                        if (!(t = r.getTopLevelDomain(t)) || !l.linkRegExp[t]) return !1;
                        for (var n = 0; n < l.linkRegExp[t].length; n++) if (-1 != e.search(l.linkRegExp[t][n])) return !0;
                        return !1;
                    }
                    function g(e) {
                        var t = e.href;
                        if ("string" == typeof t && -1 == t.search(/^https?:\/\/([\w\-]+\.)?savefrom\.net\//i)) {
                            var r = l.parseHref(t, e.search);
                            if (r.length > 0) {
                                if (0 != l.href(e).indexOf("#") && v(r[0], e.hostname)) return r[0];
                                if (r.length > 1) for (var n = 1; n < r.length; n++) {
                                    var o = document.createElement("a");
                                    if (o.href = r[n], 0 != l.href(o).indexOf("#") && v(r[n], o.hostname)) return r[n];
                                }
                            }
                        }
                        return "";
                    }
                    function A(e, t) {
                        if (e) {
                            e.setAttribute(l.anchorAttribute, "1");
                            var r = document.createElement("span");
                            r.setAttribute("style", "padding: 0; margin: 0; margin-left: 5px;"), r.addEventListener("click", (function(e) {
                                e.stopPropagation();
                            }));
                            var o = e.parentNode;
                            if (o) {
                                try {
                                    t = encodeURIComponent(t);
                                } catch (e) {
                                    return;
                                }
                                var i = l.pageUrl + "?url=" + t;
                                l.sfref && (i += l.sfref);
                                var a = document.createElement("a");
                                for (var u in a.href = i, a.target = "_blank", a.title = n.a.i18n.getMessage("lmButtonTitle"), 
                                a.style.backgroundImage = "url(" + l.buttonSrc + ")", a.style.backgroundRepeat = "no-repeat", 
                                a.style.width = "16px", a.style.height = "16px", a.style.display = "inline-block", 
                                l.linkStyle) a.style[u] = l.linkStyle[u];
                                e.style.zIndex && (a.style.zIndex = e.style.zIndex), a.setAttribute(l.anchorAttribute, "1"), 
                                a.setAttribute(l.anchorAttributeLink, "1"), l.linkText && (a.textContent = l.linkText), 
                                r.appendChild(a), l.htmlAfter && (r.textContent += l.htmlAfter), e.nextSibling ? o.insertBefore(r, e.nextSibling) : o.appendChild(r);
                            }
                        }
                    }
                },
                changeState: function(e) {
                    i.lmMediaHosting = e, a = e;
                    for (var t, r = document.querySelectorAll("a[" + l.anchorAttributeLink + "]"), n = 0; t = r[n]; n++) (t = t.parentNode).parentNode.removeChild(t);
                    var o = document.querySelectorAll([ "*[" + l.anchorAttribute + "]", "*[" + l.anchorIndexAttribute + "]" ]);
                    for (n = 0; t = o[n]; n++) t.removeAttribute(l.anchorAttribute), t.removeAttribute(l.anchorIndexAttribute);
                    l.savefromLinkCount = -1, e && l.run();
                }
            };
        }), (function() {
            return (!document.contentType || "text/html" === document.contentType) && (!Object(a.a)() && !/yandex\.com\/launcher/.test(location.href));
        }));
    }
});