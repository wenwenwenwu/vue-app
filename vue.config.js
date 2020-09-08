const path = require('path');
const { resolve } = require('path');
module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
            return {
                // 常用绝对地址的别名
                resolve: {
                    alias: {
                        '@js': path.resolve(__dirname, './src/assets/js'),
                        '@css': path.resolve(__dirname, './src/assets/css'),
                        '@imgs': path.resolve(__dirname, './src/assets/imgs'),
                        '@c': path.resolve(__dirname, './src/components'),
                    }
                }
            }
        }
    }
}