function defineReactive(data, key, value) {
    //递归调用，监听所有属性
    observer(value);
    var dep = new Dep();
    Object.defineProperty(data, key, {
        get: function () {
            if (Dep.target) {
                dep.addSub(Dep.target);
            }
            getOne();
            return value;
        },
        set: function (newVal) {
            if (value !== newVal) {
                value = newVal;
                dep.notify(); //通知订阅器
            }
            setOne();
        }
    });
}

export function observer(data) {
    if (!data || typeof data !== "object") {
        return;
    }
    Object.keys(data).forEach(key => {
        defineReactive(data, key, data[key]);
    });
}

export function Dep() {
    this.subs = [];
}
function getOne(){
    console.log("获取数据")
}
function setOne(){
    console.log("数据赋值")
}
Dep.prototype.addSub = function (sub) {
    this.subs.push(sub);
}
Dep.prototype.notify = function () {
    this.subs.forEach(sub => {
        sub.update();
    })
}
Dep.target = null;