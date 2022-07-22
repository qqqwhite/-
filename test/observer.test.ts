import {observer} from "../src/core/observer";
import {beforeAll} from "@jest/globals";
import {afterAll} from "@jest/globals";
import {jest} from "@jest/globals";
import {expect} from "@jest/globals";
import {it} from "@jest/globals";

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
it('observer',()=>{
    let data={
        a:"a",
        b:"b"
    }
    observer(data);
    data.a = "1";
    expect(data.a).toBe("1");
})