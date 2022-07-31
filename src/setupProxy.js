const { createProxyMiddleware } = require('http-proxy-middleware');

const CovidProxy = {
    target: 'https://lab.isaaclin.cn/',
    changeOrigin: true,
    pathRewrite: {
        "/covid": ""
    }
}

const WeatherProxy = {
    target: "https://devapi.qweather.com",
    changeOrigin: true,
    pathRewrite: {
        "/weather": ""
    }
}

const tenAPIProxy = {
    target: "https://tenapi.cn/",
    changeOrigin: true,
    pathRewrite: {
        "/ten": ""
    }
}

module.exports = function(app) {
    app.use(
        '/covid',
        createProxyMiddleware(CovidProxy)
    );
    app.use(
        '/weather',
        createProxyMiddleware(WeatherProxy)
    );
    app.use(
        '/ten',
        createProxyMiddleware(tenAPIProxy)
    );
};
