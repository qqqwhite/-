"use strict";
exports.__esModule = true;
exports.Dep = exports.observer = void 0;
function defineReactive(data, key, value) {
    //递归调用，监听所有属性
    observer(value);
    var dep = new Dep();
    Object.defineProperty(data, key, {
        get: function () {
            if (Dep.target) {
                dep.addSub(Dep.target);
            }
            return value;
        },
        set: function (newVal) {
            if (value !== newVal) {
                value = newVal;
                dep.notify(); //通知订阅器
            }
        }
    });
}
function observer(data) {
    if (!data || typeof data !== "object") {
        return;
    }
    Object.keys(data).forEach(function (key) {
        defineReactive(data, key, data[key]);
    });
}
exports.observer = observer;
function Dep() {
    this.subs = [];
}
exports.Dep = Dep;
Dep.prototype.addSub = function (sub) {
    this.subs.push(sub);
};
Dep.prototype.notify = function () {
    this.subs.forEach(function (sub) {
        sub.update();
    });
};
Dep.target = null;
