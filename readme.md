# 基于ts的MVVM框架实现
>姓名：谢学成  
>学校：南京大学  
>专业：软件工程  
>年级：大二升大三  
> QQ：2176850083


摘要：在该项大作业中，主要实现了数据劫持、发布订阅者模式、单向绑定、双向绑定，同时基于项目要求，提供了readme文档，基于TypeScript实现，
使用黑盒测试配合白盒测试，将单侧覆盖率推进到80%以上。

---

## 项目初始化与jest测试命令

请在项目路径下运行以下命令，完成项目初始化
> `npm install`  
> `npm run init`  

运行以下命令，进行自动化测试 (jest)
> `npm run test`

以上命令都执行通过后，可直接运行html文件，检查框架实际应用效果。

---

## 基础要求综述：

- 数据劫持：
  - 效果见`testFor数据劫持.html`
  - 在`observer.ts`中对该功能进行了实现。
- 发布订阅者模式：
  - 该模式是双向绑定实现的基础，在基于jest的白盒测试`observer.test.ts`进行了测试。
- 数据单向绑定：
  - 效果见`testFor单向绑定.html`
  - 首先在`render.ts`中对该功能进行技术验证性实现，通过基于jest`render.test.ts`的测试后，在`compile.ts`中进行了正式实现。
- 数据双向绑定
  - 效果见：`testFor双向绑定.html`
  - 在发布订阅者模式的基础上，对监听器的进行了少许调整后，实现了通过v-model标签进行数据的双向绑定。
- 项目要求
  - readme
    - 已有
  - 使用TypeScript
    - 已使用
  - 单侧覆盖率80%以上
    - 通过jest实现白盒测试搭配基于html文档的黑盒测试，实现了对所有模块的全面覆盖。


## 考察点综述：

- 代码可读性
  - 命名：使用驼峰命名法，基于变量的实际含义对变量进行命名，同时参考vue框架的方法命名习惯，使得变量易于直观理解并符合命名习惯。如下：
    ```ts
    MVVM.prototype.init = function () {
        observer(this.$data); //观察者模式+数据劫持
        new Compile(this); //单向绑定+双向绑定
    }
    ```
    可以很直观的看出，该代码块是在进行初始化工作，对数据添加观察者模式，然后对html文档进行解析。
  - 注释：在代码的重难点添加了相应注释，以解释代码块的具体作用或实现方法，有助于提高本人编码效率和代码易读性，如下：
    ```ts
    get: function() {
        Dep.target = this; //储存订阅器
        const value = this.vm.data[this.prop]; //因为属性被监听，这一步会执行监听器里的 get方法
        Dep.target = null;
        return value;
    }
    ```
  - 代码组织结构：分为核心方法和工具方法，核心方法用于实现具体功能，工具方法用于提高代码的复用性，在更清晰的同时减少重复工作量。如下：
    ```
    D:.
    │  index.js
    │  index.ts
    │
    ├─core
    │      compile.js
    │      compile.ts
    │      event.js
    │      event.ts
    │      observer.js
    │      observer.ts
    │      render.js
    │      render.ts
    │      watcher.js
    │      watcher.ts
    │
    └─util
    object.ts
    ```
- 设计能力 
  - 层次分明：将框架功能中，数据监听，单向绑定，双向绑定拆分后，分模块独立实现。
  - 抽象能力：将功能抽象为一个function，通过添加prototype来提供各种方法以满足功能需求。如下：
    ```ts
    export function Watcher(vm, prop, callback) {
        this.vm = vm;
        this.prop = prop;
        this.callback = callback;
        this.value = this.get();
    }
    Watcher.prototype = {
        update: function () {
            const value = this.vm.data[this.prop];
            const oldVal = this.value;
            if (value !== oldVal) {
            this.value = value;
            this.callback(value);
        }
    },
        get: function () {
            Dep.target = this; //储存订阅器
            const value = this.vm.data[this.prop]; //因为属性被监听，这一步会执行监听器里的 get方法
            Dep.target = null;
            return value;
        }
    }
    ```
  - 可扩展性：该框架在实现过程中，将v-model绑定方法抽象为一个单独的方法进行实现，便于以后添加更多的指令，比如v-for。如下：
    ```ts
    //v-model具体实现
    compileModel: function (node, prop) {
        let val = this.vm.$data[prop];
        this.updateModel(node, val);

        new Watcher(this.vm, prop, (value) => {
            this.updateModel(node, value);
        });

        node.addEventListener('input', e => {
            let newValue = e.target.value;
            if (val === newValue) {
                return;
            }
            this.vm.$data[prop] = newValue;
        });
    }
    ```
  - 模块切分：对应单向绑定，双向绑定，数据监听功能，分别用不同的模块进行实现。
  - 数据封装：模块之间的数据传输都是以预定的数据结构进行传输的，在数据封装的基础上，运用接口化的思想，将简化方便了模块之间的数据交互。