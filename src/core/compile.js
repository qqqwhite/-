"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.Compile = void 0;
var watcher_1 = require("./watcher");
function Compile(vm) {
    this.vm = vm;
    this.el = vm.$el;
    console.log(this.el);
    this.fragment = null;
    this.init();
}
exports.Compile = Compile;
Compile.prototype = {
    vm: undefined,
    el: undefined,
    init: function () {
        this.fragment = this.nodeFragment(this.el);
        this.compileNode(this.fragment);
        this.el.appendChild(this.fragment); //解析完成添加到元素中
    },
    nodeFragment: function (el) {
        var fragment = document.createDocumentFragment();
        var child = el.firstChild;
        //将子节点，全部移动文档片段里
        while (child) {
            fragment.appendChild(child);
            child = el.firstChild;
        }
        return fragment;
    },
    compileNode: function (fragment) {
        var _this = this;
        var childNodes = fragment.childNodes;
        __spreadArray([], childNodes, true).forEach(function (node) {
            if (_this.isElementNode(node)) {
                _this.compile(node);
            }
            var reg = /\{\{(.*)\}\}/;
            var text = node.textContent;
            if (reg.test(text)) {
                var prop = reg.exec(text)[1];
                _this.compileText(node, prop); //替换模板
            }
            //编译子节点
            if (node.childNodes && node.childNodes.length) {
                _this.compileNode(node);
            }
        });
    },
    compile: function (node) {
        var _this = this;
        var nodeAttrs = node.attributes;
        __spreadArray([], nodeAttrs, true).forEach(function (attr) {
            var name = attr.name;
            if (_this.isDirective(name)) {
                var value = attr.value;
                if (name === "v-model") {
                    _this.compileModel(node, value);
                }
            }
        });
    },
    compileModel: function (node, prop) {
        var _this = this;
        var val = this.vm.$data[prop];
        this.updateModel(node, val);
        new watcher_1.Watcher(this.vm, prop, function (value) {
            _this.updateModel(node, value);
        });
        node.addEventListener('input', function (e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }
            _this.vm.$data[prop] = newValue;
        });
    },
    compileText: function (node, prop) {
        var _this = this;
        var text = this.vm.$data[prop];
        this.updateView(node, text);
        new watcher_1.Watcher(this.vm, prop, function (value) {
            _this.updateView(node, value);
        });
    },
    updateModel: function (node, value) {
        node.value = typeof value == 'undefined' ? '' : value;
    },
    updateView: function (node, value) {
        node.textContent = typeof value === 'undefined' ? '' : value;
    },
    isDirective: function (attr) {
        return attr.indexOf('v-') !== -1;
    },
    isElementNode: function (node) {
        return node.nodeType === 1;
    },
    isTextNode: function (node) {
        return node.nodeType === 3;
    }
};
