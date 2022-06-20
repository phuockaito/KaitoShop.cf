const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const port = 3001;

const app = express();

app.use(
    "/api",
    createProxyMiddleware({
        target:
            "https://kaito-shop.herokuapp.com",
        headers: {
            accept: "application/json",
            method: "GET,POST,PUT,DELETE",
        },
        changeOrigin: true,
    })
);

app.use(
    "/localhostapi",
    createProxyMiddleware({
        target: `http://localhost:${port}/`,
        headers: {
            accept: "application/json",
            method: "GET,POST,PUT,DELETE",
        },
        changeOrigin: true,
    })
);

app.get("/", (req, res) => {
    console.log("localhost:3001 api is running");
    const data = { result: `Success! from localhostapi on localhost:${port}!!` };
    res.send(JSON.parse(data));
});

app.listen(port, function () {
    console.log(`server running now.. ${port}`);
});
