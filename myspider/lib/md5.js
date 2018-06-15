function acv_vote(c, d, b, a) {
    c = c || window.event;
    if (typeof c.stopPropagation != "undefined") {
        c.stopPropagation()
    } else {
        c.cancelBubble = true
    }
    if (a == null) {
        a = ""
    }
    a = a + "";
    $("#acv_stat_" + a + d).html("Loading...");
    $.ajax({
        url: "/jandan-vote.php",
        method: "POST",
        dataType: "json",
        data: {
            id: d,
            vote_type: b
        },
        success: function(i) {
            var g = "#acv_stat_" + a + i.comment_id;
            var e = "#cos_support-" + a + d,
            h = "#cos_unsupport-" + a + d,
            f = 'javascript:alert("You\'ve voted")';
            $(g).html(i.msg);
            $(g).fadeOut(400,
            function() {
                $(g).fadeIn()
            });
            if (i.error) {
                return
            }
            if (i.vote_type == 1) {
                $(e).html($(e).html() * 1 + 1)
            }
            if (i.vote_type == -1) {
                $(h).html($(h).html() * 1 + 1)
            }
            $("#vote4-" + d).attr("href", f);
            $("#vote4-2" + d).attr("href", f);
            $("#votea-" + d).attr("href", f);
            $("#votea-2" + d).attr("href", f)
        }
    })
}
function add_img_loading_mask(d, c) {
    var f = $(d);
    d.onload = null;
    var i = f.parent().parent();
    if (i.find(".bad_content").length > 0 || i.find(".nsfw_content").length > 0) {
        return
    }
    var g = f;
    var b = g.width();
    var j = g.height();
    var i = g.parent();
    i.css("position", "relative");
    var e = g.position();
    var k = $('<div class="gif-mask" style="top:' + e.top + "px;left:" + e.left + "px;width:" + b + "px;height:" + j + "px;line-height:" + j + 'px;">PLAY</div>');
    k.one("click", c);
    f.after(k);
    var h = getCookie("gif-click-load");
    var a = (h == "on" || h == null) ? true: false;
    if (!a && d.src.indexOf("sina") > -1) {
        k.click()
    }
}
function load_sina_gif(d) {
    d.stopPropagation();
    if (/MSIE (6|7|8)/.test(navigator.appVersion)) {
        this.innerText = "Loading..."
    } else {
        this.innerHTML = "Loading..."
    }
    var f = $(this);
    var c = f.parent();
    var a = f.prev("img");
    var b = a.attr("org_src");
    a.one("load",
    function() {
        f.remove();
        c.find(".gif-mask").each(function() {
            var g = $(this).prev("img");
            var h = g.position();
            $(this).css({
                top: h.top,
                left: h.left
            })
        })
    });
    if (b != "") {
        var e = "";
        if (navigator.userAgent.match(/MSIE (6|7|8)\.0/i) != null) {
            e = "?" + new Date().getTime()
        }
        a.attr("src", b + e);
        a.removeAttr("org_src")
    }
}
function setCookie(c, d, e) {
    if (e) {
        var b = new Date();
        b.setTime(b.getTime() + (e * 24 * 60 * 60 * 1000));
        var a = "; expires=" + b.toGMTString()
    } else {
        var a = ""
    }
    document.cookie = c + "=" + d + a + "; path=/"
}
function getCookie(b) {
    var e = b + "=";
    var a = document.cookie.split(";");
    for (var d = 0; d < a.length; d++) {
        var f = a[d];
        while (f.charAt(0) == " ") {
            f = f.substring(1, f.length)
        }
        if (f.indexOf(e) == 0) {
            return decodeURIComponent(f.substring(e.length, f.length))
        }
    }
    return null
}
function htmlEscape(a) {
    return String(a).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}
function jandan_zan(a) {
    var c = "#jandan-zan-" + a,
    b = jQuery(c);
    if (b.hasClass("jandan-zaned")) {
        alert("浣犲凡缁忚禐杩囪繖绡囨枃绔犲暒~~");
        return
    }
    if (a) {
        b.addClass("zan-loader");
        jQuery.post("/jandan-zan.php", {
            post_id: a
        },
        function(d) {
            if (d.error == 0) {
                b.addClass("jandan-zaned").removeClass("zan-loader");
                var e = b.find(".zan-text");
                if (e.length > 0) {
                    e.text(d.zan_count + "涓禐")
                } else {
                    e = b.find(".zan-icon");
                    e.html("&#8801;" + d.zan_count)
                }
            } else {
                alert("浣犲凡缁忚禐杩囪繖绡囨枃绔犲暒~~")
            }
        },
        "json")
    }
}
function jandan_show_msg(d) {
    var b = $("#jandan-msg");
    if (b.length == 0) {
        $("body").append('<div id="jandan-msg"></div>');
        b = $("#jandan-msg")
    }
    b.html(d);
    var c = b.width();
    var a = b.height();
    b.css({
        "margin-left": -c / 2,
        "margin-top": -a / 2
    });
    b.fadeIn("slow",
    function() {
        var e = $(this);
        setTimeout(function() {
            e.fadeOut("slow")
        },
        2000)
    })
}
function ooxx_action(c, e) {
    var d = c.data("id");
    var b = c.data("type");
    var a = c.data("is_loading");
    if (a === true) {
        jandan_show_msg("鏁版嵁鍔犺浇涓�...璇蜂笉瑕侀噸澶嶆搷浣�");
        return
    }
    c.data("is_loading", true);
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/jandan-vote.php",
        data: {
            comment_id: d,
            like_type: b,
            data_type: e
        },
        success: function(i) {
            c.data("is_loading", false);
            if (i.error != 0) {
                jandan_show_msg(i.msg);
                return
            }
            var f = {
                obj: c,
                str: "+ 1",
                startSize: "12px",
                endSize: "30px",
                interval: 800,
                color: "#cd4450",
                weight: "bold"
            };
            f.color = "#00f";
            if (b === "pos") {
                f.color = "#f00"
            }
            $("body").append('<span class="plus-num" id="plus-' + d + '">' + f.str + "</span>");
            var h = $("#plus-" + d);
            var k = f.obj.offset().left;
            var j = f.obj.offset().top - f.obj.height() + 5;
            h.css({
                position: "absolute",
                left: k + "px",
                top: j + "px",
                "z-index": 9999,
                "font-size": f.startSize,
                "line-height": f.endSize,
                color: f.color,
                "font-weight": f.weight
            });
            var g = c.next("span");
            var l = parseInt(g.text());
            g.text(l + 1);
            h.velocity({
                opacity: "0",
                top: (j - 20) + "px"
            },
            f.interval,
            function() {
                h.remove()
            })
        },
        error: function() {
            c.data("is_loading", false)
        }
    })
}
function tucao_time_format(h) {
    var i, c, g;
    var a = h;
    var b = parseInt(new Date().getTime() / 1000);
    var f;
    f = b - a;
    g = parseInt(f / 86400);
    c = parseInt(f / 3600);
    i = parseInt(f / 60);
    if (g > 0 && g < 4) {
        return g + "澶╁墠"
    } else {
        if (g <= 0 && c > 0) {
            return c + "灏忔椂鍓�"
        } else {
            if (c <= 0 && i > 0) {
                return i + "鍒嗛挓鍓�"
            } else {
                var e = new Date(a * 1000);
                return (e.getMonth() + 1) + "鏈�" + e.getDate() + "鏃�"
            }
        }
    }
}
function tucao_create_row(i, d) {
    d = d ? "#" + d + "妤�": "";
    var n = $('<div class="tucao-row" id="tucao-' + i.comment_ID + '"></div>');
    n.data("id", i.comment_ID);
    var j = "";
    if (i.is_tip_user) {
        j = "tucao-tip-author"
    }
    if (i.is_jandan_user) {
        j = "tucao-jandan-author"
    }
    var g = $('<div class="tucao-author"> <a name="tucao-' + i.comment_ID + '"></a><a href="#tucao-' + i.comment_ID + '" class="tucao-floor">' + d + '</a> <span class="' + j + '">' + i.comment_author + "</span></div>");
    var l = $('<div class="tucao-content">' + i.comment_content + "</div>");
    function a(t) {
        if (t) {
            t.stopImmediatePropagation()
        }
        var s = $(this);
        var u = s.offset();
        var q = s.data("id");
        var r = $("#tucao-popup");
        if (r.length === 0) {
            r = $('<div id="tucao-popup"><div class="tucao-popup-author"></div><div class="tucao-popup-content"></div></div>');
            $("body").append(r)
        } else {
            if (r.is(":visible")) {
                r.velocity("fadeOut");
                return
            }
        }
        var p = $("#tucao-" + q);
        if (p.length === 0) {
            return
        }
        r.find(".tucao-popup-author").html(p.find(".tucao-author").html());
        r.find(".tucao-popup-content").html(p.find(".tucao-content").html());
        var o = parseInt(r.height()) + 20;
        if ($JANDAN.IS_MOBILE) {
            r.css({
                top: u.top - o
            })
        } else {
            r.css({
                top: u.top - o,
                left: u.left + 10
            })
        }
        r.velocity("fadeIn")
    }
    function e() {
        var o = $("#tucao-popup");
        if (o.length === 0) {
            return
        }
        o.velocity("fadeOut")
    }
    if ($JANDAN.IS_MOBILE) {
        l.find("a.tucao-link").click(a)
    } else {
        l.find("a.tucao-link").mouseover(a).mouseleave(e)
    }
    var k = $('<div class="tucao-vote"></div>');
    k.append('<span class="tucao-id">#' + i.comment_ID + "</span>");
    var c = $('<span class="tucao-at"">@</span>');
    c.data("id", i.comment_ID);
    c.data("author", i.comment_author);
    c.click(function() {
        var r = $(this);
        var o = "#@[" + r.data("author") + "]" + r.data("id") + "#";
        var q = r.parents(".jandan-tucao").find("textarea.tucao-content");
        var p = q.val();
        if (p.indexOf(o) == -1) {
            q.val(q.val() + " " + o + " ")
        }
        q.focus()
    });
    k.append(c);
    k.append("<span>" + tucao_time_format(i.comment_date_int) + "</span>");
    var m = $('<span class="tucao-like-container"></span>');
    m.append('<a title="鍦堝湀/鏀寔" href="javascript:;" class="tucao-like like" data-id="' + i.comment_ID + '" data-type="pos">OO</a>');
    m.append('[<span class="tucao-oo">' + i.vote_positive + "</span>]");
    k.append(m);
    var h = $('<span class="tucao-unlike-container"></span>');
    h.append('<a title="鍙夊弶/鍙嶅" href="javascript:;" class="tucao-unlike unlike" data-id="' + i.comment_ID + '" data-type="neg">XX</a>');
    h.append('[<span class="tucao-xx">' + i.vote_negative + "</span>]");
    k.append(h);
    var f = $('<a href="javascript:;" data-id="' + i.comment_ID + '" class="tucao-report">鎶曡瘔</a>');
    f.click(function() {
        var p = $(this);
        var o = prompt("璇疯緭鍏ユ姇璇夊師鍥�");
        if ($.trim(o) == "") {
            jandan_show_msg("璇疯緭鍏ユ姇璇夊師鍥�");
            return
        }
        $.ajax({
            url: "/jandan-tucao-opt.php",
            method: "POST",
            data: {
                action: "report",
                comment_id: $(this).data("id"),
                reason: o
            },
            dataType: "json",
            success: function(q) {
                if (q.code != 0) {
                    jandan_show_msg(q.msg);
                    return
                }
                p.velocity("fadeOut", {
                    complete: function(r) {
                        p.remove()
                    }
                })
            },
            error: function(q) {
                jandan_show_msg("hmmm, something wrong")
            }
        })
    });
    k.append(f);
    if ($JANDAN.LOGGED_IN) {
        var b = $('<a title="鍒犻櫎" href="javascript:;" data-id="' + i.comment_ID + '">鍒犻櫎</a>');
        b.click(function() {
            if (!confirm("纭鍒犻櫎鍚�?")) {
                return
            }
            $.ajax({
                url: "/jandan-tucao-opt.php",
                method: "POST",
                data: {
                    action: "del",
                    comment_id: $(this).data("id")
                },
                dataType: "json",
                success: function(o) {
                    if (o.code != 0) {
                        jandan_show_msg(o.msg);
                        return
                    }
                    n.velocity("fadeOut", {
                        complete: function(p) {
                            $(p).remove()
                        }
                    })
                },
                error: function(o) {
                    jandan_show_msg("hmmm, something wrong")
                }
            })
        });
        k.append(b)
    }
    k.find(".tucao-like, .tucao-unlike").click(function() {
        ooxx_action($(this), "tucao")
    });
    n.append(g, l, k);
    return n
}
function tucao_show_hot(a, d) {
    var c = $('<div class="tucao-hot"></div>');
    var f = $('<div class="tucao-hot-title">鐑瘎</div>');
    c.append(f);
    for (var b in d) {
        var e = tucao_create_row(d[b]);
        c.append(e)
    }
    a.append(c)
}
function tucao_show_list(b, e) {
    var a = $('<div class="tucao-list"></div>');
    var c = 1;
    if (e.length > 0) {
        for (var d in e) {
            var f = tucao_create_row(e[d], c);
            a.append(f);
            c++
        }
    }
    a.data("floor_index", c);
    b.append(a)
}
function tucao_append_list(b, e) {
    var a = b.find(".tucao-list");
    var c = parseInt(a.data("floor_index"));
    for (var d in e) {
        var f = tucao_create_row(e[d], c);
        a.append(f);
        c++
    }
    a.data("floor_index", c)
}
function tucao_show_form(a, e) {
    var g = getCookie("comment_author_" + $JANDAN.COOKIE_HASH);
    var d = getCookie("comment_author_email_" + $JANDAN.COOKIE_HASH);
    if (g === null) {
        g = ""
    }
    if (d === null) {
        d = ""
    }
    var f = getCookie("wordpress_logged_in_" + $JANDAN.COOKIE_HASH);
    var c = $('<div class="tucao-form"></div>');
    var i = $('<div>鏄电О锛�<input type="text" class="tucao-nickname" value="' + g + '"> <br>閭锛�<input type="text" class="tucao-email" value="' + d + '"> </div>');
    var h = $('<textarea class="tucao-content"></textarea>');
    h.keydown(function(j) {
        if (j.ctrlKey && j.keyCode == 13) {
            $(this).parents(".tucao-form").find("button").click();
            return false
        }
    });
    var b = $('<div><button type="button" data-id="' + e + '">鐐瑰嚮鍙戝竷 / Ctrl+Enter</button></div>');
    b.click(function() {
        var n = $(this);
        n.prop("disabled", true);
        var m = n.parent().parent();
        var k = m.find("input.tucao-nickname").val();
        var j = m.find("input.tucao-email").val();
        var l = m.find("textarea.tucao-content").val();
        $.ajax({
            url: "/jandan-tucao.php",
            method: "POST",
            data: {
                author: k,
                email: j,
                content: l,
                comment_id: e
            },
            dataType: "json",
            success: function(p) {
                n.prop("disabled", false);
                jandan_show_msg(p.msg);
                if (p.code != 0) {
                    return
                }
                m.find(".tucao-content").val("");
                var o = a.find(".tucao-list");
                var q = tucao_create_row(p.data);
                o.append(q)
            },
            error: function(o) {
                jandan_show_msg("hmmm, something wrong");
                n.prop("disabled", false)
            }
        })
    });
    if (!f) {
        c.append(i)
    }
    c.append(h, b);
    a.append(c)
}
function tucao_show_close_btn(a, b) {
    var c = $('<div class="jandan-tucao-close"></div>');
    c.append('<a href="/qa" title="鏈夋剰瑙佹兂鍚愭Ы锛熺偣杩欓噷鏉ヤ竴鍙�">&circledast; 闂鍙嶉</a> | ');
    var d = $('<a href="javascript:;"> &UpTeeArrow; 鏀惰捣鍚愭Ы</a>');
    d.click(function() {
        $("#jandan-tucao-" + b).slideUp("fast",
        function() {
            var f = $(this).parent().find(".jandan-vote");
            var g = f.offset();
            var e = parseInt(f.height());
            $("body").velocity("scroll", {
                offset: g.top - e
            })
        })
    });
    c.append(d);
    a.append(c)
}
function tucao_show_more_btn(b, c) {
    var a = b.find(".jandan-tucao-showmore");
    if (a.length == 0) {
        a = $('<div class="jandan-tucao-more"> 鈫� 鏄剧ず鏇村鍚愭Ы</div>');
        a.click(function() {
            var d = b.find(".tucao-row:last");
            var e = d.data("id");
            $.ajax({
                url: "/tucao/" + c + "/n/" + e,
                method: "GET",
                dataType: "json",
                success: function(f) {
                    if (f.code != 0) {
                        alert(f.msg);
                        return
                    }
                    if (f.tucao.length) {
                        tucao_append_list(b, f.tucao)
                    }
                    if (!f.has_next_page) {
                        a.hide()
                    }
                },
                error: function(f) {
                    b.html("hmm....something wrong...")
                }
            })
        });
        b.append(a)
    }
}
function tucao_load_content(d, c, b) {
    var a = $('<div class="jandan-tucao" id="jandan-tucao-' + c + '">鏁版嵁鍔犺浇涓�....biubiubiu....</div>');
    d.append(a);
    $.ajax({
        url: "/tucao/" + c,
        method: "GET",
        dataType: "json",
        success: function(f) {
            if (f.code != 0) {
                alert(f.msg);
                return
            }
            a.empty();
            if (f.hot_tucao.length) {
                tucao_show_hot(a, f.hot_tucao)
            }
            tucao_show_list(a, f.tucao);
            if (f.has_next_page) {
                tucao_show_more_btn(a, c)
            }
            tucao_show_close_btn(a, c);
            tucao_show_form(a, c);
            var e = $("#tucao-gg");
            e.css({
                left: 0,
                position: "static",
                display: "block"
            });
            e.appendTo(a)
        },
        error: function(e) {
            a.html("hmm....something wrong...")
        }
    })
}
function gif_mask(a, c) {
    var b = jQuery(a);
    b.one("click",
    function() {
        var d = b.attr("org_src");
        b.attr("src", d);
        b.removeAttr("org_src")
    }).css("cursor", "pointer")
}
var jd9DgSXGMwCNDnfTjI62MY3uasZNUVxUOG = function(o, y, g) {
    var d = o;
    var l = "DECODE";
    var y = y ? y: "";
    var g = g ? g: 0;
    var h = 4;
    y = md5(y);
    var x = md5(y.substr(0, 16));
    var v = md5(y.substr(16, 16));
    if (h) {
        if (l == "DECODE") {
            var b = md5(microtime());
            var e = b.length - h;
            var u = b.substr(e, h)
        }
    } else {
        var u = ""
    }
    var t = x + md5(x + u);
    var n;
    if (l == "DECODE") {
        g = g ? g + time() : 0;
        tmpstr = g.toString();
        if (tmpstr.length >= 10) {
            o = tmpstr.substr(0, 10) + md5(o + v).substr(0, 16) + o
        } else {
            var f = 10 - tmpstr.length;
            for (var q = 0; q < f; q++) {
                tmpstr = "0" + tmpstr
            }
            o = tmpstr + md5(o + v).substr(0, 16) + o
        }
        n = o
    }
    var k = new Array(256);
    for (var q = 0; q < 256; q++) {
        k[q] = q
    }
    var r = new Array();
    for (var q = 0; q < 256; q++) {
        r[q] = t.charCodeAt(q % t.length)
    }
    for (var p = q = 0; q < 256; q++) {
        p = (p + k[q] + r[q]) % 256;
        tmp = k[q];
        k[q] = k[p];
        k[p] = tmp
    }
    var m = "";
    n = n.split("");
    for (var w = p = q = 0; q < n.length; q++) {
        w = (w + 1) % 256;
        p = (p + k[w]) % 256;
        tmp = k[w];
        k[w] = k[p];
        k[p] = tmp;
        m += chr(ord(n[q]) ^ (k[(k[w] + k[p]) % 256]))
    }
    if (l == "DECODE") {
        m = base64_encode(m);
        var c = new RegExp("=", "g");
        m = m.replace(c, "");
        m = u + m;
        m = base64_decode(d)
    }
    return m
}; (function() {
    var b = typeof exports != "undefined" ? exports: typeof self != "undefined" ? self: $.global;
    var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    function a(d) {
        this.message = d
    }
    a.prototype = new Error;
    a.prototype.name = "InvalidCharacterError";
    b.btoa || (b.btoa = function(g) {
        var j = String(g);
        for (var i, e, d = 0,
        h = c,
        f = ""; j.charAt(d | 0) || (h = "=", d % 1); f += h.charAt(63 & i >> 8 - d % 1 * 8)) {
            e = j.charCodeAt(d += 3 / 4);
            if (e > 255) {
                throw new a("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.")
            }
            i = i << 8 | e
        }
        return f
    });
    b.atob || (b.atob = function(g) {
        var j = String(g).replace(/[=]+$/, "");
        if (j.length % 4 == 1) {
            throw new a("'atob' failed: The string to be decoded is not correctly encoded.")
        }
        for (var i = 0,
        h, e, d = 0,
        f = ""; e = j.charAt(d++);~e && (h = i % 4 ? h * 64 + e: e, i++%4) ? f += String.fromCharCode(255 & h >> ( - 2 * i & 6)) : 0) {
            e = c.indexOf(e)
        }
        return f
    })
} ());
function base64_encode(a) {
    return window.btoa(a)
}
function base64_decode(a) {
    return window.atob(a)
} (function(g) {
    function o(u, z) {
        var w = (u & 65535) + (z & 65535),
        v = (u >> 16) + (z >> 16) + (w >> 16);
        return (v << 16) | (w & 65535)
    }
    function s(u, v) {
        return (u << v) | (u >>> (32 - v))
    }
    function c(A, w, v, u, z, y) {
        return o(s(o(o(w, A), o(u, y)), z), v)
    }
    function b(w, v, B, A, u, z, y) {
        return c((v & B) | ((~v) & A), w, v, u, z, y)
    }
    function i(w, v, B, A, u, z, y) {
        return c((v & A) | (B & (~A)), w, v, u, z, y)
    }
    function n(w, v, B, A, u, z, y) {
        return c(v ^ B ^ A, w, v, u, z, y)
    }
    function a(w, v, B, A, u, z, y) {
        return c(B ^ (v | (~A)), w, v, u, z, y)
    }
    function d(F, A) {
        F[A >> 5] |= 128 << (A % 32);
        F[(((A + 64) >>> 9) << 4) + 14] = A;
        var w, z, y, v, u, E = 1732584193,
        D = -271733879,
        C = -1732584194,
        B = 271733878;
        for (w = 0; w < F.length; w += 16) {
            z = E;
            y = D;
            v = C;
            u = B;
            E = b(E, D, C, B, F[w], 7, -680876936);
            B = b(B, E, D, C, F[w + 1], 12, -389564586);
            C = b(C, B, E, D, F[w + 2], 17, 606105819);
            D = b(D, C, B, E, F[w + 3], 22, -1044525330);
            E = b(E, D, C, B, F[w + 4], 7, -176418897);
            B = b(B, E, D, C, F[w + 5], 12, 1200080426);
            C = b(C, B, E, D, F[w + 6], 17, -1473231341);
            D = b(D, C, B, E, F[w + 7], 22, -45705983);
            E = b(E, D, C, B, F[w + 8], 7, 1770035416);
            B = b(B, E, D, C, F[w + 9], 12, -1958414417);
            C = b(C, B, E, D, F[w + 10], 17, -42063);
            D = b(D, C, B, E, F[w + 11], 22, -1990404162);
            E = b(E, D, C, B, F[w + 12], 7, 1804603682);
            B = b(B, E, D, C, F[w + 13], 12, -40341101);
            C = b(C, B, E, D, F[w + 14], 17, -1502002290);
            D = b(D, C, B, E, F[w + 15], 22, 1236535329);
            E = i(E, D, C, B, F[w + 1], 5, -165796510);
            B = i(B, E, D, C, F[w + 6], 9, -1069501632);
            C = i(C, B, E, D, F[w + 11], 14, 643717713);
            D = i(D, C, B, E, F[w], 20, -373897302);
            E = i(E, D, C, B, F[w + 5], 5, -701558691);
            B = i(B, E, D, C, F[w + 10], 9, 38016083);
            C = i(C, B, E, D, F[w + 15], 14, -660478335);
            D = i(D, C, B, E, F[w + 4], 20, -405537848);
            E = i(E, D, C, B, F[w + 9], 5, 568446438);
            B = i(B, E, D, C, F[w + 14], 9, -1019803690);
            C = i(C, B, E, D, F[w + 3], 14, -187363961);
            D = i(D, C, B, E, F[w + 8], 20, 1163531501);
            E = i(E, D, C, B, F[w + 13], 5, -1444681467);
            B = i(B, E, D, C, F[w + 2], 9, -51403784);
            C = i(C, B, E, D, F[w + 7], 14, 1735328473);
            D = i(D, C, B, E, F[w + 12], 20, -1926607734);
            E = n(E, D, C, B, F[w + 5], 4, -378558);
            B = n(B, E, D, C, F[w + 8], 11, -2022574463);
            C = n(C, B, E, D, F[w + 11], 16, 1839030562);
            D = n(D, C, B, E, F[w + 14], 23, -35309556);
            E = n(E, D, C, B, F[w + 1], 4, -1530992060);
            B = n(B, E, D, C, F[w + 4], 11, 1272893353);
            C = n(C, B, E, D, F[w + 7], 16, -155497632);
            D = n(D, C, B, E, F[w + 10], 23, -1094730640);
            E = n(E, D, C, B, F[w + 13], 4, 681279174);
            B = n(B, E, D, C, F[w], 11, -358537222);
            C = n(C, B, E, D, F[w + 3], 16, -722521979);
            D = n(D, C, B, E, F[w + 6], 23, 76029189);
            E = n(E, D, C, B, F[w + 9], 4, -640364487);
            B = n(B, E, D, C, F[w + 12], 11, -421815835);
            C = n(C, B, E, D, F[w + 15], 16, 530742520);
            D = n(D, C, B, E, F[w + 2], 23, -995338651);
            E = a(E, D, C, B, F[w], 6, -198630844);
            B = a(B, E, D, C, F[w + 7], 10, 1126891415);
            C = a(C, B, E, D, F[w + 14], 15, -1416354905);
            D = a(D, C, B, E, F[w + 5], 21, -57434055);
            E = a(E, D, C, B, F[w + 12], 6, 1700485571);
            B = a(B, E, D, C, F[w + 3], 10, -1894986606);
            C = a(C, B, E, D, F[w + 10], 15, -1051523);
            D = a(D, C, B, E, F[w + 1], 21, -2054922799);
            E = a(E, D, C, B, F[w + 8], 6, 1873313359);
            B = a(B, E, D, C, F[w + 15], 10, -30611744);
            C = a(C, B, E, D, F[w + 6], 15, -1560198380);
            D = a(D, C, B, E, F[w + 13], 21, 1309151649);
            E = a(E, D, C, B, F[w + 4], 6, -145523070);
            B = a(B, E, D, C, F[w + 11], 10, -1120210379);
            C = a(C, B, E, D, F[w + 2], 15, 718787259);
            D = a(D, C, B, E, F[w + 9], 21, -343485551);
            E = o(E, z);
            D = o(D, y);
            C = o(C, v);
            B = o(B, u)
        }
        return [E, D, C, B]
    }
    function p(v) {
        var w, u = "";
        for (w = 0; w < v.length * 32; w += 8) {
            u += String.fromCharCode((v[w >> 5] >>> (w % 32)) & 255)
        }
        return u
    }
    function j(v) {
        var w, u = [];
        u[(v.length >> 2) - 1] = undefined;
        for (w = 0; w < u.length; w += 1) {
            u[w] = 0
        }
        for (w = 0; w < v.length * 8; w += 8) {
            u[w >> 5] |= (v.charCodeAt(w / 8) & 255) << (w % 32)
        }
        return u
    }
    function k(u) {
        return p(d(j(u), u.length * 8))
    }
    function e(w, z) {
        var v, y = j(w),
        u = [],
        x = [],
        A;
        u[15] = x[15] = undefined;
        if (y.length > 16) {
            y = d(y, w.length * 8)
        }
        for (v = 0; v < 16; v += 1) {
            u[v] = y[v] ^ 909522486;
            x[v] = y[v] ^ 1549556828
        }
        A = d(u.concat(j(z)), 512 + z.length * 8);
        return p(d(x.concat(A), 512 + 128))
    }
    function t(w) {
        var z = "0123456789abcdef",
        v = "",
        u, y;
        for (y = 0; y < w.length; y += 1) {
            u = w.charCodeAt(y);
            v += z.charAt((u >>> 4) & 15) + z.charAt(u & 15)
        }
        return v
    }
    function m(u) {
        return unescape(encodeURIComponent(u))
    }
    function q(u) {
        return k(m(u))
    }
    function l(u) {
        return t(q(u))
    }
    function h(u, v) {
        return e(m(u), m(v))
    }
    function r(u, v) {
        return t(h(u, v))
    }
    function f(v, w, u) {
        if (!w) {
            if (!u) {
                return l(v)
            }
            return q(v)
        }
        if (!u) {
            return r(w, v)
        }
        return h(w, v)
    }
    if (typeof define === "function" && define.amd) {
        define(function() {
            return f
        })
    } else {
        g.md5 = f
    }
} (this)); (function() {
    var b = typeof exports != "undefined" ? exports: typeof self != "undefined" ? self: $.global;
    var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    function a(d) {
        this.message = d
    }
    a.prototype = new Error;
    a.prototype.name = "InvalidCharacterError";
    b.btoa || (b.btoa = function(g) {
        var j = String(g);
        for (var i, e, d = 0,
        h = c,
        f = ""; j.charAt(d | 0) || (h = "=", d % 1); f += h.charAt(63 & i >> 8 - d % 1 * 8)) {
            e = j.charCodeAt(d += 3 / 4);
            if (e > 255) {
                throw new a("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.")
            }
            i = i << 8 | e
        }
        return f
    });
    b.atob || (b.atob = function(g) {
        var j = String(g).replace(/[=]+$/, "");
        if (j.length % 4 == 1) {
            throw new a("'atob' failed: The string to be decoded is not correctly encoded.")
        }
        for (var i = 0,
        h, e, d = 0,
        f = ""; e = j.charAt(d++);~e && (h = i % 4 ? h * 64 + e: e, i++%4) ? f += String.fromCharCode(255 & h >> ( - 2 * i & 6)) : 0) {
            e = c.indexOf(e)
        }
        return f
    })
} ());
function time() {
    var a = new Date().getTime();
    return parseInt(a / 1000)
}
function microtime(b) {
    var a = new Date().getTime();
    var c = parseInt(a / 1000);
    return b ? (a / 1000) : (a - (c * 1000)) / 1000 + " " + c
}
function chr(a) {
    return String.fromCharCode(a)
}
function ord(a) {
    return a.charCodeAt()
}
function md5(a) {
    return hex_md5(a)
}
var jd9DgSXGMwCNDnfTjI62MY3uasZNUVxUOG = function(n, t, e) {
    var f = "DECODE";
    var t = t ? t: "";
    var e = e ? e: 0;
    var r = 4;
    t = md5(t);
    var d = n;
    var p = md5(t.substr(0, 16));
    var o = md5(t.substr(16, 16));
    if (r) {
        if (f == "DECODE") {
            var m = n.substr(0, r)
        }
    } else {
        var m = ""
    }
    var c = p + md5(p + m);
    var l;
    if (f == "DECODE") {
        n = n.substr(r);
        l = base64_decode(n)
    }
    var k = new Array(256);
    for (var h = 0; h < 256; h++) {
        k[h] = h
    }
    var b = new Array();
    for (var h = 0; h < 256; h++) {
        b[h] = c.charCodeAt(h % c.length)
    }
    for (var g = h = 0; h < 256; h++) {
        g = (g + k[h] + b[h]) % 256;
        tmp = k[h];
        k[h] = k[g];
        k[g] = tmp
    }
    var u = "";
    l = l.split("");
    for (var q = g = h = 0; h < l.length; h++) {
        q = (q + 1) % 256;
        g = (g + k[q]) % 256;
        tmp = k[q];
        k[q] = k[g];
        k[g] = tmp;
        u += chr(ord(l[h]) ^ (k[(k[q] + k[g]) % 256]))
    }
    if (f == "DECODE") {
        if ((u.substr(0, 10) == 0 || u.substr(0, 10) - time() > 0) && u.substr(10, 16) == md5(u.substr(26) + o).substr(0, 16)) {
            u = u.substr(26)
        } else {
            u = ""
        }
        u = base64_decode(d)
    }
    return u
};
function jandan_load_img(b) {
    var d = $(b);
    var f = d.next("span.img-hash");
    var e = f.text();
    f.remove();
    var c = jd9DgSXGMwCNDnfTjI62MY3uasZNUVxUOG(e, "opterjpTI6TWsPoHREIveRghj6OE0Jgp");
    var a = $('<a href="' + c.replace(/(\/\/\w+\.sinaimg\.cn\/)(\w+)(\/.+\.(gif|jpg|jpeg))/, "$1large$3") + '" target="_blank" class="view_img_link">[鏌ョ湅鍘熷浘]</a>');
    d.before(a);
    d.before("<br>");
    d.removeAttr("onload");
    d.attr("src", location.protocol + c.replace(/(\/\/\w+\.sinaimg\.cn\/)(\w+)(\/.+\.gif)/, "$1thumb180$3"));
    if (/\.gif$/.test(c)) {
        d.attr("org_src", location.protocol + c);
        b.onload = function() {
            add_img_loading_mask(this, load_sina_gif)
        }
    }
}
$(function() {
    $("a[href*=#]:not([href=#])").click(function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var l = $(this.hash);
            l = l.length ? l: $("[name=" + this.hash.slice(1) + "]");
            if (l.length) {
                $("body").velocity("scroll", {
                    offset: l.offset().top
                });
                return false
            }
        }
    });
    $(window).scroll(function() {
        var l = $(window).scrollTop();
        if (l > 400) {
            $("#nav_top").fadeIn(400)
        } else {
            $("#nav_top").stop().fadeOut(400)
        }
    });
    $("#nav_top").click(function() {
        $("body").velocity("scroll", {
            offset: 0
        })
    });
    var a = $("#float");
    var f = a.offset();
    $(window).scroll(function() {
        if (a.length > 0) {
            var l = $(document).scrollTop();
            if (l > f.top) {
                a.addClass("div2")
            } else {
                a.removeClass("div2")
            }
        }
    });
    var g = getCookie("comment_author_" + $JANDAN.COOKIE_HASH);
    var c = getCookie("comment_author_email_" + $JANDAN.COOKIE_HASH);
    var d = getCookie("wordpress_logged_in_" + $JANDAN.COOKIE_HASH);
    if ((g && c) || d) {
        $(".comment-hide").remove()
    }
    $(".comment-like, .comment-unlike").click(function() {
        ooxx_action($(this), "comment")
    });
    $(".tucao-btn").click(function() {
        var n = $(this);
        var m = n.data("id");
        var o = n.closest("li");
        var l = o.find("div.jandan-tucao");
        if (l.length) {
            l.slideToggle("fast")
        } else {
            tucao_load_content(o, m)
        }
    });
    var e = $(".star-rating");
    if (e.length > 0) {
        var b = e.attr("id").split("-")[1];
        var j = getCookie("jandan_rate_" + b);
        if (!j) {
            e.on("mouseover", ".ratings_stars",
            function() {
                var l = $(this);
                l.prevAll().andSelf().addClass("ratings_over");
                l.nextAll().removeClass("ratings_vote");
                l.nextAll().removeClass("ratings_over")
            }).on("mouseout", ".ratings_stars",
            function() {
                $(this).nextAll().removeClass("ratings_over")
            }).on("click", ".ratings_stars",
            function() {
                var o = $(this).attr("score");
                var l = $(this).attr("post_id");
                var n = $(".star-rating-" + l + " .total_votes");
                var m = n.html();
                n.addClass("rate-loading").html("");
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "/jandan-rate.php",
                    data: {
                        post_id: l,
                        rate_score: o
                    },
                    success: function(p) {
                        if (p.error == 0) {
                            n.html(p.score).removeClass("rate-loading")
                        } else {
                            alert(p.msg);
                            n.html(m).removeClass("rate-loading")
                        }
                    }
                })
            })
        }
    }
    $(".comment-report").click(function() {
        var m = $(this);
        var l = prompt("璇疯緭鍏ユ姇璇夊師鍥�");
        if (l === null) {
            return
        }
        if ($.trim(l) === "") {
            jandan_show_msg("璇疯緭鍏ユ姇璇夊師鍥�");
            return
        }
        $.ajax({
            url: "/jandan-tucao-opt.php",
            method: "POST",
            data: {
                action: "report",
                comment_id: $(this).data("id"),
                reason: l,
                type: "1"
            },
            dataType: "json",
            success: function(n) {
                if (n.code != 0) {
                    jandan_show_msg(n.msg);
                    return
                }
                alert(n.msg);
                m.velocity("fadeOut", {
                    complete: function(o) {
                        m.remove()
                    }
                })
            },
            error: function(n) {
                jandan_show_msg("hmmm, something wrong")
            }
        })
    });
    var i = {};
    var h = $(".current-post");
    if (h.length != 0) {
        i.post_id = h.attr("id")
    }
    var k = $.ajax({
        url: $JANDAN.API_URL + "/jandan-user.php",
        data: i,
        jsonpCallback: "jandan",
        dataType: "jsonp"
    });
    k.done(function(p) {
        if (window.location.hostname == "i.jandan.net") {
            return
        }
        if (!p.is_logged_in) {
            return
        }
        $JANDAN.LOGGED_IN = true;
        $JANDAN.ADMIN_URL = p.admin_domain;
        if (!$JANDAN.IS_MOBILE) {
            var q = $(".commentlist");
            if (q.length > 0) {
                q.find("li").each(function() {
                    var r = this.id.split("-")[1];
                    if (isNaN(parseInt(r))) {
                        return
                    }
                    $(this).find(".author strong").after('<a class="comment-edit-link" href="' + $JANDAN.ADMIN_URL + "/redirect.php?raction=comment_edit&amp;id=" + r + '"> +</a>')
                })
            }
            var l = $(".post-author");
            if (l.length > 0) {
                l.after('<a class="comment-edit-link" href="' + $JANDAN.ADMIN_URL + "/redirect.php?raction=post_edit&amp;id=" + l.data("post-id") + '"> +</a>')
            }
        }
        var o = $('<div id="authorbar"></div>');
        var n = $("<ul>");
        if (p.post_id) {
            n.append('<li><a href="' + $JANDAN.ADMIN_URL + "/redirect.php?raction=post_edit&amp;id=" + parseInt(p.post_id) + '">缂栬緫</a>(' + p.post_views + ")</li>")
        }
        if (p.pending_post) {
            n.append('<li><a href="' + $JANDAN.ADMIN_URL + '/redirect.php?raction=pending_post">瀹＄ǹ(' + p.pending_post + ")</a></li>")
        }
        if (p.future_posts) {
            n.append('<li><a href="' + $JANDAN.ADMIN_URL + '/redirect.php?raction=future_post">瀹氭椂(' + p.future_posts + ")</a></li>")
        }
        n.append('<li><a href="' + $JANDAN.ADMIN_URL + '/redirect.php?raction=cake">铔嬬硶</a></li>');
        var m = p.user_post_count && p.user_post_limit ? "(" + p.user_post_count + "/" + p.user_post_limit + ")": "";
        n.append('<li><a href="' + $JANDAN.ADMIN_URL + '/redirect.php?raction=post_new">鍐欑ǹ' + m + "</a>");
        n.append('<li><a href="' + $JANDAN.ADMIN_URL + '/wp-admin/admin.php?page=jdcomment-old">瀹″笘(' + p.pending_comments + ")</a></li>");
        n.append("<li>浠婃棩宸插彂甯僛" + p.today_post_count + "]绡�</li>");
        o.append(n);
        $("#footer").append(o)
    })
});