import {beforeAll} from "@jest/globals";
import {afterAll} from "@jest/globals";
import {jest} from "@jest/globals";
import {expect} from "@jest/globals";
import {it} from "@jest/globals";
import {render} from "../src/core/render";

let originalLog;
let originalWarn;
let originalError;
// 所有测试用例运行前
beforeAll(() => { // 可以换成 beforeEach
    // 保留原 console 函数引用
    originalLog = console.log;
    originalWarn = console.warn;
    originalError = console.error;
    // 用 jest.fn() 替换，方便模拟
    console.log = jest.fn();
    console.warn = jest.fn();
    console.error = jest.fn();
});
// 所有测试用例运行之后
afterAll(() => { // 可以换成 afterEach
    // 恢复原 console 函数引用
    console.log = originalLog;
    console.warn = originalWarn;
    console.error = originalError;
});
it('render',()=>{
    let el = {
        innerHTML:"{{a}}"
    }
    let data = {
        a:"a"
    }
    render(el,data);
    expect(el.innerHTML).toBe("a");
})