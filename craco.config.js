module.exports = {
    // 扩展webpack
    devServer: {
        proxy: {
            '/api': 'http://localhost:3001',
        }
    }
}