module.exports = {
    // 扩展webpack
    devServer: {
        port: 8002,
        proxy: {
            '/api': 'http://localhost:3001',
        }
    }
}