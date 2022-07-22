"use strict";
exports.__esModule = true;
exports.Watcher = void 0;
var observer_1 = require("./observer");
function Watcher(vm, prop, callback) {
    this.vm = vm;
    this.prop = prop;
    this.callback = callback;
    this.value = this.get();
}
exports.Watcher = Watcher;
Watcher.prototype = {
    vm: undefined,
    prop: undefined,
    update: function () {
        var value = this.vm.data[this.prop];
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.callback(value);
        }
    },
    get: function () {
        observer_1.Dep.target = this; //储存订阅器
        var value = this.vm.data[this.prop]; //因为属性被监听，这一步会执行监听器里的 get方法
        observer_1.Dep.target = null;
        return value;
    }
};
