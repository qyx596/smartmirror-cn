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
    target: "http://www.people.com.cn/",
    changeOrigin: true,
    pathRewrite: {
        "/rss": ""
    }
}

const SentenceProxy = {
    target: "https://v1.hitokoto.cn",
    changeOrigin: true,
    pathRewrite: {
        "/sentence": ""
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
    );
    app.use(
        '/sentence',
        createProxyMiddleware(SentenceProxy)
    )
};
