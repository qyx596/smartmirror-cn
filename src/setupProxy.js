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

const rssProxy = {
    target: "https://blog.ethereum.org",
    changeOrigin: true,
    pathRewrite: {
        "/rss": ""
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
    app.use(
        '/rss',
        createProxyMiddleware(rssProxy)
    )
};
