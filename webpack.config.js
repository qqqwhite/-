const path = require('path');  // node自带包
module.exports = {
    entry:__dirname + "/src/index.ts",   // 打包对入口文件，期望打包对文件入口
    output:{
        filename:'build.js',   // 输出文件名称
        path:path.resolve(__dirname,'dist')  //获取输出路径
    },
    mode: 'development',
    module:{
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts']      // 解析对文件格式
    },
}
