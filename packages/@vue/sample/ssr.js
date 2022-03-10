// const { createSSRApp } = require("vue");
const { renderToString } = require("@vue/server-renderer");
const express = require("express");
const fs = require("fs");
const path = require("path");
const manifest = require("./dist/server/ssr-manifest.json");

const server = express();

// 'app.js' 是以入口的名字加上 `.js` 后缀命名的
const appPath = path.join(__dirname, "./dist", "server", manifest["app.js"]);
const createApp = require(appPath).default;

// // 工厂函数：为每个请求创建一个新的 Vue 根实例
// function createApp() {
//   return createSSRApp({
//     data() {
//       return {
//         user: "John Doe",
//       };
//     },
//     template: `<div>Current user is: {{ user }}</div>`,
//   });
// }

server.use(
  "/img",
  express.static(path.join(__dirname, "./dist/client", "img"))
);
server.use("/js", express.static(path.join(__dirname, "./dist/client", "js")));
server.use(
  "/css",
  express.static(path.join(__dirname, "./dist/client", "css"))
);
server.use(
  "/favicon.ico",
  express.static(path.join(__dirname, "./dist/client", "favicon.ico"))
);

// const indexTemplate = fs.readFileSync(
//   path.join(__dirname, "/dist/client/index.html"),
//   "utf-8"
// );

server.get("*", async (req, res) => {
  // const app = createApp();
  // const appContent = await renderToString(app);
  // const html = `
  // <html>
  //   <body>
  //     <h1>My First Heading</h1>
  //     <div id="app">${appContent}</div>
  //   </body>
  // </html>
  // `;
  // res.end(html);

  const { app, router } = createApp();

  await router.push(req.url);
  await router.isReady();

  const appContent = await renderToString(app);

  // const html = indexTemplate
  //   .toString()
  //   .replace('<div id="app">', `<div id="app">${appContent}`);

  // res.setHeader("Content-Type", "text/html");
  // res.send(html);

  fs.readFile(path.join(__dirname, "/dist/client/index.html"), (err, html) => {
    if (err) {
      throw err;
    }
    html = html
      .toString()
      .replace('<div id="app">', `<div id="app">${appContent}`);
    res.setHeader("Content-Type", "text/html");
    res.send(html);
  });
});

console.log("You can navigate to http://localhost:8080");

server.listen(8080);
