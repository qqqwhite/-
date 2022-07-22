import {observer} from "./core/observer";
import {Compile} from './core/compile'

export function MVVM(opts,prop){
    console.log("start")
    //原始数据
    this.data = opts.data;
    this.$options = opts;
    this.$data = opts.data;
    this.$prop = prop;
    this.$el = document.querySelector(opts.el);

    //单向绑定(测试)
    // render(el,opts.data);

    this.init();
}
(<any>window).MVVM = MVVM;

//初始化
MVVM.prototype.init = function () {
    //数据劫持+观察者模式
    observer(this.$data)
    //单向绑定+双向绑定
    new Compile(this);
}