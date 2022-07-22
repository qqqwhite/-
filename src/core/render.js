"use strict";
exports.__esModule = true;
exports.render = void 0;
function render(el, _data) {
    var template = el.innerHTML;
    el.innerHTML = template.replace(/\{\{\w+\}\}/g, function (str) {
        console.log(str);
        // 截取字符串，得到属性key值
        str = str.substring(2, str.length - 2);
        // 从真实数据中拿到对应属性的值返回，替换{{key}}
        return _data[str];
    });
}
exports.render = render;
