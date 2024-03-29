﻿/*!
 FixedColumns 4.0.0
 2019-2021 SpryMedia Ltd - datatables.net/license
*/
(function () {
    var b, v, w = function () {
        function f(a, c) {
            var h = this; if (!v || !v.versionCheck || !v.versionCheck("1.10.0")) throw Error("StateRestore requires DataTables 1.10 or newer"); a = new v.Api(a); this.classes = b.extend(!0, {}, f.classes); this.c = b.extend(!0, {}, f.defaults, c); void 0 === c.left && void 0 !== this.c.leftColumns && (this.c.left = this.c.leftColumns); void 0 === c.right && void 0 !== this.c.rightColumns && (this.c.right = this.c.rightColumns); this.s = { barWidth: 0, dt: a, rtl: "rtl" === b(a.table().node()).css("direction") }; !0 ===
                this.s.dt.settings()[0].oInit.scrollY && (this.s.barWidth = this.s.dt.settings()[0].oBrowser.barWidth); c = { "background-color": "white", bottom: "0px", display: "block", position: "absolute", width: this.s.barWidth + 1 + "px" }; this.dom = {
                    leftBottomBlocker: b("<div>").css(c).css("left", 0).addClass(this.classes.leftBottomBlocker), leftTopBlocker: b("<div>").css(c).css({ left: 0, top: 0 }).addClass(this.classes.leftTopBlocker), rightBottomBlocker: b("<div>").css(c).css("right", 0).addClass(this.classes.rightBottomBlocker), rightTopBlocker: b("<div>").css(c).css({
                        right: 0,
                        top: 0
                    }).addClass(this.classes.rightTopBlocker)
                }; if (this.s.dt.settings()[0]._bInitComplete) this._addStyles(), this._setKeyTableListener(); else a.one("preInit.dt", function () { h._addStyles(); h._setKeyTableListener() }); a.settings()[0]._fixedColumns = this; return this
        } f.prototype.left = function (a) { void 0 !== a && (this.c.left = a, this._addStyles()); return this.c.left }; f.prototype.right = function (a) { void 0 !== a && (this.c.right = a, this._addStyles()); return this.c.right }; f.prototype._addStyles = function () {
            var a = null, c = this.s.dt.column(0).header(),
            h = null; null !== c && (c = b(c), h = c.outerHeight() + 1, a = b(c.closest("div.dataTables_scroll")).css("position", "relative")); var l = this.s.dt.column(0).footer(), e = null; null !== l && (l = b(l), e = l.outerHeight(), null === a && (a = b(l.closest("div.dataTables_scroll")).css("position", "relative"))); for (var d = this.s.dt.columns().data().toArray().length, k = 0, q = b(this.s.dt.table().node()).children("tbody").children("tr"), r = 0, m = 0; m < d; m++) {
                var g = this.s.dt.column(m); if (g.visible()) {
                    var t = b(g.header()), u = b(g.footer()); if (m < this.c.left) {
                        b(this.s.dt.table().node()).addClass(this.classes.tableFixedLeft);
                        a.addClass(this.classes.tableFixedLeft); 0 !== m && (g = this.s.dt.column(m - 1), g.visible() && (k += b(g.nodes()[0]).outerWidth())); for (var n = 0, p = q; n < p.length; n++)g = p[n], b(b(g).children()[m - r]).css(this._getCellCSS(!1, k, "left")).addClass(this.classes.fixedLeft); t.css(this._getCellCSS(!0, k, "left")).addClass(this.classes.fixedLeft); u.css(this._getCellCSS(!0, k, "left")).addClass(this.classes.fixedLeft)
                    } else {
                        n = 0; for (p = q; n < p.length; n++)g = p[n], g = b(b(g).children()[m - r]), g.hasClass(this.classes.fixedLeft) && g.css(this._clearCellCSS("left")).removeClass(this.classes.fixedLeft);
                        t.hasClass(this.classes.fixedLeft) && t.css(this._clearCellCSS("left")).removeClass(this.classes.fixedLeft); u.hasClass(this.classes.fixedLeft) && u.css(this._clearCellCSS("left")).removeClass(this.classes.fixedLeft)
                    }
                } else r++
            } null === c || c.hasClass("index") || (this.s.rtl ? (this.dom.leftTopBlocker.outerHeight(h), a.append(this.dom.leftTopBlocker)) : (this.dom.rightTopBlocker.outerHeight(h), a.append(this.dom.rightTopBlocker))); null === l || l.hasClass("index") || (this.s.rtl ? (this.dom.leftBottomBlocker.outerHeight(e),
                a.append(this.dom.leftBottomBlocker)) : (this.dom.rightBottomBlocker.outerHeight(e), a.append(this.dom.rightBottomBlocker))); r = k = 0; for (m = d - 1; 0 <= m; m--)if (g = this.s.dt.column(m), t = b(g.header()), u = b(g.footer()), g.visible()) if (m >= d - this.c.right) {
                    b(this.s.dt.table().node()).addClass(this.classes.tableFixedRight); a.addClass(this.classes.tableFixedLeft); m !== d - 1 && (g = this.s.dt.column(m + 1), g.visible() && (k += b(g.nodes()[0]).outerWidth())); n = 0; for (p = q; n < p.length; n++)g = p[n], b(b(g).children()[m + r]).css(this._getCellCSS(!1,
                        k, "right")).addClass(this.classes.fixedRight); t.css(this._getCellCSS(!0, k, "right")).addClass(this.classes.fixedRight); u.css(this._getCellCSS(!0, k, "right")).addClass(this.classes.fixedRight)
                } else {
                    n = 0; for (p = q; n < p.length; n++)g = p[n], g = b(b(g).children()[m + r]), g.hasClass(this.classes.fixedRight) && g.css(this._clearCellCSS("right")).removeClass(this.classes.fixedRight); t.hasClass(this.classes.fixedRight) && t.css(this._clearCellCSS("right")).removeClass(this.classes.fixedRight); u.hasClass(this.classes.fixedRight) &&
                        u.css(this._clearCellCSS("right")).removeClass(this.classes.fixedRight)
                } else r++; c && (this.s.rtl ? (this.dom.leftTopBlocker.outerHeight(h), a.append(this.dom.leftTopBlocker)) : (this.dom.rightTopBlocker.outerHeight(h), a.append(this.dom.rightTopBlocker))); l && (this.s.rtl ? (this.dom.leftBottomBlocker.outerHeight(e), a.append(this.dom.leftBottomBlocker)) : (this.dom.rightBottomBlocker.outerHeight(e), a.append(this.dom.rightBottomBlocker)))
        }; f.prototype._getCellCSS = function (a, c, h) {
            return "left" === h ? this.s.rtl ? {
                position: "sticky",
                right: c + (a ? this.s.barWidth : 0) + "px"
            } : { left: c + "px", position: "sticky" } : this.s.rtl ? { left: c + "px", position: "sticky" } : { position: "sticky", right: c + (a ? this.s.barWidth : 0) + "px" }
        }; f.prototype._clearCellCSS = function (a) { return "left" === a ? this.s.rtl ? { position: "", right: "" } : { left: "", position: "" } : this.s.rtl ? { left: "", position: "" } : { position: "", right: "" } }; f.prototype._setKeyTableListener = function () {
            var a = this; this.s.dt.on("key-focus", function (c, h, l) {
                c = b(l.node()).offset(); h = b(b(a.s.dt.table().node()).closest("div.dataTables_scrollBody"));
                if (0 < a.c.left) { var e = b(a.s.dt.column(a.c.left - 1).header()), d = e.offset(), k = e.outerWidth(); c.left < d.left + k && (e = h.scrollLeft(), h.scrollLeft(e - (d.left + k - c.left))) } 0 < a.c.right && (e = a.s.dt.columns().data().toArray().length, l = b(l.node()).outerWidth(), d = b(a.s.dt.column(e - a.c.right).header()).offset(), c.left + l > d.left && (e = h.scrollLeft(), h.scrollLeft(e - (d.left - (c.left + l)))))
            }); this.s.dt.on("draw", function () { a._addStyles() }); this.s.dt.on("column-reorder", function () { a._addStyles() }); this.s.dt.on("column-visibility",
                function () { a._addStyles() })
        }; f.version = "4.0.0"; f.classes = { fixedLeft: "dtfc-fixed-left", fixedRight: "dtfc-fixed-right", leftBottomBlocker: "dtfc-left-bottom-blocker", leftTopBlocker: "dtfc-left-top-blocker", rightBottomBlocker: "dtfc-right-bottom-blocker", rightTopBlocker: "dtfc-right-top-blocker", tableFixedLeft: "dtfc-has-left", tableFixedRight: "dtfc-has-right" }; f.defaults = { i18n: { button: "FixedColumns" }, left: 1, right: 0 }; return f
    }(); (function (f) {
        "function" === typeof define && define.amd ? define(["jquery", "datatables.net"],
            function (a) { return f(a, window, document) }) : "object" === typeof exports ? module.exports = function (a, c) { a || (a = window); c && c.fn.dataTable || (c = require("datatables.net")(a, c).$); return f(c, a, a.document) } : f(window.jQuery, window, document)
    })(function (f, a, c) {
        function h(e, d) { void 0 === d && (d = null); e = new l.Api(e); d = d ? d : e.init().fixedColumns || l.defaults.fixedColumns; return new w(e, d) } b = f; v = b.fn.dataTable; var l = f.fn.dataTable; f.fn.dataTable.FixedColumns = w; f.fn.DataTable.FixedColumns = w; a = f.fn.dataTable.Api.register; a("fixedColumns()",
            function () { return this }); a("fixedColumns().left()", function (e) { var d = this.context[0]; return void 0 !== e ? (d._fixedColumns.left(e), this) : d._fixedColumns.left() }); a("fixedColumns().right()", function (e) { var d = this.context[0]; return void 0 !== e ? (d._fixedColumns.right(e), this) : d._fixedColumns.right() }); f.fn.dataTable.ext.buttons.fixedColumns = {
                action: function (e, d, k, q) {
                    f(k).attr("active") ? (f(k).removeAttr("active").removeClass("active"), d.fixedColumns().left(0), d.fixedColumns().right(0)) : (f(k).attr("active",
                        !0).addClass("active"), d.fixedColumns().left(q.config.left), d.fixedColumns().right(q.config.right))
                }, config: { left: 1, right: 0 }, init: function (e, d, k) { void 0 === e.settings()[0]._fixedColumns && h(e.settings(), k); f(d).attr("active", !0).addClass("active"); e.button(d).text(k.text || e.i18n("buttons.fixedColumns", e.settings()[0]._fixedColumns.c.i18n.button)) }, text: null
            }; f(c).on("init.dt.dtfc", function (e, d) { "dt" === e.namespace && (d.oInit.fixedColumns || l.defaults.fixedColumns) && (d._fixedColumns || h(d, null)) })
    })
})();