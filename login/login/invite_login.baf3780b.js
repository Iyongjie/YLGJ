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
    "yYn6": [function (require, module, exports) {
        ({
            USER_PHONE: "",
            USER_CODE: "",
            USER_PASSWORD: "",
            init: function () {
                this.bindNavigation(), this.bindWritePhone(), this.bindWriteCode(), this.bindSendCode(), this.bindWritePass(), this.bindSubmit()
            },
            bindNavigation: function () {
                if (window.CLIENT.IS_WEIXIN) return document.querySelector("header").setAttribute("class", "hidden"), document.querySelector(".content").setAttribute("class", "content"), !1;
                document.querySelector(".header_left").addEventListener("click", function () {
                    CLIENT.CLIENT_EVENT("mhd:goBackApp")
                }), document.querySelector(".header_right").addEventListener("click", function () {
                    CLIENT.CLIENT_EVENT("mhd:handleShareWeChat")
                })
            },
            bindWritePhone: function () {
                var e = document.getElementById("input_phone"),
                    t = this;
                e.addEventListener("input", function () {
                    this.value.length > 11 && (this.value = this.value.toString().slice(0, 11)), /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(16[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(this.value) ? t.USER_PHONE = this.value : t.USER_PHONE = null
                })
            },
            bindWriteCode: function () {
                var e = document.getElementById("input_num"),
                    t = this;
                e.addEventListener("input", function () {
                    this.value.length > 6 && (this.value = this.value.toString().slice(0, 6)), /^[0-9]{6}$/.test(this.value) ? t.USER_CODE = this.value : t.USER_CODE = null
                })
            },
            bindSendCode: function () {
                var e = document.getElementById("btnSendCode"),
                    t = null,
                    n = this;
                e.addEventListener("click", function () {
                    var e = 60;
                    if (!n.USER_PHONE) return CLIENT.TOAST("请检查手机号是否正确！"), !1;
                    CODE_AVOID.SHOW(n.USER_PHONE), n.closeAvoid();
                    var i = this;
                    if (t) return !1;
                    t = setInterval(function () {
                        CODE_AVOID.SEND_SUCCESS && (e > 0 ? (i.disabled = "disabled", i.value = e, e--, i.value = e + "s") : (clearInterval(t), i.value = "获取验证码", i.disabled = ""), CODE_AVOID.HIDDEN())
                    }, 1e3)
                })
            },
            bindWritePass: function () {
                var e = document.getElementById("input_password"),
                    t = this;
                e.addEventListener("input", function () {
                    this.value.length > 12 && (this.value = this.value.slice(0, 12)), /^[0-9A-z]{6,12}$/.test(this.value) ? t.USER_PASSWORD = this.value : t.USER_PASSWORD = null
                })
            },
            bindSubmit: function () {
                var e = this;
                document.getElementById("input_login").addEventListener("click", function () {
                    var t = this;
                    t.disabled = "disabled";
                    var n = e.getParameter("origin"),
                        i = e.getParameter("uuid"),
                        d = e.getDeviceNum();
                    if (!n || !i || !d) return CLIENT.TOAST("缺少必要的参数！"), t.disabled = "", !1;
                    if (!e.USER_PHONE) return CLIENT.TOAST("请检查手机号是否正确！"), t.disabled = "", !1;
                    if (!e.USER_CODE) return CLIENT.TOAST("验证码不正确！"), t.disabled = "", !1;
                    if (!e.USER_PASSWORD) return CLIENT.TOAST("请输入6-12位密码！"), t.disabled = "", !1;
                    var s = {
                        mobile: e.USER_PHONE,
                        smsCode: e.USER_CODE,
                        password: e.USER_PASSWORD,
                        confirmPwd: e.USER_PASSWORD,
                        origin: n,
                        invitationUuid: i,
                        deviceNumber: d
                    };
                    axios.post(window.CODE_AVOID.SERVICE + "/regist/registWithAllInfo.html", Qs.stringify(s)).then(function (e) {
                        200 == e.status && (e.data.success ? (window.CLIENT.TOAST(e.data.message), window.location.replace("/success_login/success_login.html")) : (t.disabled = "", window.CLIENT.TOAST(e.data.message)))
                    }).catch(function (e) {
                        t.disabled = "", window.CLIENT.TOAST("服务器繁忙，请稍后再试！")
                    })
                })
            },
            closeAvoid: function () {
                document.getElementById("app").addEventListener("click", function (e) {
                    var t = e || event,
                        n = document.getElementById("btnSendCode");
                    t.target != n && CODE_AVOID.HIDDEN()
                })
            },
            getParameter: function (e) {
                var t = window.location.href,
                    n = new RegExp("(^|\\?|&)" + e + "=([^&]*)(\\s|&|$)", "i"),
                    i = t.substr(1).match(n);
                return null != i ? unescape(i[2]) : null
            },
            getDeviceNum: function () {
                for (var e = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"], t = "", n = 0; n < 32; n++) t += e[parseInt(61 * Math.random())];
                return t
            }
        }).init();
    }, {}]
}, {}, ["yYn6"], null)
//# sourceMappingURL=invite_login.baf3780b.map