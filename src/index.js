"use strict";
exports.__esModule = true;
exports.MVVM = void 0;
var observer_1 = require("./core/observer");
var compile_1 = require("./core/compile");
function MVVM(opts, prop) {
    var _this = this;
    //初始化
    console.log("start");
    //原始数据
    this.data = opts.data;
    //数据劫持
    this.$options = opts;
    this.$data = opts.data;
    this.$prop = prop;
    this.$el = document.querySelector(opts.el);
    //数据代理+单向绑定
    Object.keys(this.$data).forEach(function (key) {
        _this.proxyData(key);
    });
    //单向绑定
    // render(el,opts.data);
    //双向绑定
    this.init();
}
exports.MVVM = MVVM;
window.MVVM = MVVM;
MVVM.prototype.init = function () {
    (0, observer_1.observer)(this.$data);
    new compile_1.Compile(this);
};
MVVM.prototype.proxyData = function (key) {
    Object.defineProperty(this, key, {
        get: function () {
            return this.$data[key];
        },
        set: function (value) {
            this.$data[key] = value;
        }
    });
};
