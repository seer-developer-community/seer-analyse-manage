module.exports = {
    baseUrl: './',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8999',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '/apis': ''
                }
            }
        }
    }
}