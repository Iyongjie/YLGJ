parcelRequire = function (e, r, n, t) {
    var i = "function" == typeof parcelRequire && parcelRequire,
        o = "function" == typeof require && require;

    function u(n, t) {
        if (!r[n]) {
            if (!e[n]) {
                var f = "function" == typeof parcelRequire && parcelRequire;
                if (!t && f) return f(n, !0);
                if (i) return i(n, !0);
                if (o && "string" == typeof n) return o(n);
                var c = new Error("Cannot find module '" + n + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            p.resolve = function (r) {
                return e[n][1][r] || r
            };
            var l = r[n] = new u.Module(n);
            e[n][0].call(l.exports, p, l, l.exports, this)
        }
        return r[n].exports;

        function p(e) {
            return u(p.resolve(e))
        }
    }
    u.isParcelRequire = !0, u.Module = function (e) {
        this.id = e, this.bundle = u, this.exports = {}
    }, u.modules = e, u.cache = r, u.parent = i, u.register = function (r, n) {
        e[r] = [function (e, r) {
            r.exports = n
        }, {}]
    };
    for (var f = 0; f < n.length; f++) u(n[f]);
    if (n.length) {
        var c = u(n[n.length - 1]);
        "object" == typeof exports && "undefined" != typeof module ? module.exports = c : "function" == typeof define && define.amd ? define(function () {
            return c
        }) : t && (this[t] = c)
    }
    return u
}({
    "rOfd": [function (require, module, exports) {
        ! function (t) {
            t.CODE_AVOID = {
                MODE_SHOW: !1,
                USER_PHONE: 0,
                SEND_SUCCESS: !1,
                SERVICE: "",
                INIT: function () {
                    var t = this;
                    t.LOAD_SCRIPT("https://cstaticdun.126.net/load.min.js", function () {
                        t.CREAT_ELE()
                    });
                    var e = location.protocol + "//" + location.host + location.port; - 1 == e.indexOf("localhost") ? -1 == e.indexOf("test") && -1 == e.indexOf("temporary") ? this.SERVICE = e + "/dzhzserver" : this.SERVICE = e + "/dzhserver" : this.SERVICE = "/api"
                },
                LOAD_SCRIPT: function (t, e) {
                    if (!t) return !1;
                    var n = document.createElement("script");
                    n.setAttribute("charset", "UTF-8"), n.setAttribute("async", "async"), n.setAttribute("type", "text/javascript"), n.setAttribute("src", t), document.body.appendChild(n), n.readyState ? n.onreadystatechange = function () {
                        "complete" != n.readyState && "loaded" != n.readyState || (n.onreadystatechange = null, e())
                    } : n.onload = function () {
                        e()
                    }
                },
                CREAT_ELE: function () {
                    var t = document.createElement("DIV");
                    t.setAttribute("id", "captcha"), t.style = "position: fixed;bottom: 0.266667rem;left: 0;width: 100%;z-index: 999999;", document.body.appendChild(t)
                },
                HIDDEN: function () {
                    this.MODE_SHOW = !1;
                    for (var t = document.getElementById("captcha"), e = t.childNodes, n = 0; n < e.length; n++) t.removeChild(e[n])
                },
                SHOW: function (e) {
                    var n = this;
                    if (!e) return !1;
                    n.MODE_SHOW = !0, n.SEND_SUCCESS = !1, n.USER_PHONE = e, initNECaptcha({
                        captchaId: "b926fc53d1714e60836bda4303bdf174",
                        element: "#captcha",
                        mode: "embed",
                        width: "85%",
                        onReady: function (t) {},
                        onVerify: function (e, a) {
                            if ("" != a && null != a && null != a) {
                                n.HIDDEN();
                                var i = {
                                    mobile: n.USER_PHONE,
                                    validate: a.validate
                                };
                                axios.post(n.SERVICE + "/smsCode/registValidate.html", Qs.stringify(i)).then(function (e) {
                                    200 == e.status && (e.data.success ? (t.CLIENT.TOAST(e.data.message), n.SEND_SUCCESS = !0) : t.CLIENT.TOAST(e.data.message))
                                }).catch(function (e) {
                                    t.CLIENT.TOAST("服务器繁忙，请稍后再试！")
                                })
                            }
                        }
                    }, function (t) {}, function (e) {
                        t.CLIENT.TOAST("验证码初始化失败！")
                    })
                }
            }, CODE_AVOID.INIT()
        }(window);
    }, {}]
}, {}, ["rOfd"], null)
//# sourceMappingURL=CodeAvoid.fa532c10.map