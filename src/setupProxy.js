const { createProxyMiddleware } = require("http-proxy-middleware");
const proxy = {
    target: "https://kaito-shop.herokuapp.com",
    changeOrigin: true,
};
module.exports = function (app) {
    app.use("/api", createProxyMiddleware(proxy));
};
