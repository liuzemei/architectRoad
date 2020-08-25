const Vue = require("vue");
const VueServerRenderer = require("vue-server-renderer");
const fs = require("fs");
const path = require("path");
const Koa = require("koa");
const Router = require("@koa/router");
const static = require("koa-static");
const app = new Koa();
const router = new Router();

app.use(static(path.resolve(__dirname, "dist")));

const template = fs.readFileSync(
  path.resolve(__dirname, "dist", "index.ssr.html"),
  "utf8"
);
const serverBundle = require("./dist/vue-ssr-server-bundle.json");
const clientManifest = require("./dist/vue-ssr-client-manifest.json");
const render = VueServerRenderer.createBundleRenderer(serverBundle, {
  template,
  clientManifest, // 通过后端注入前端 的  js 脚本
});

// 数据获取可以使用 axios

router.get("/(.*)", async (ctx) => {
  try {
    // 在我们渲染页面的时候需要根据当前路径渲染对应的路由
    ctx.body = await render.renderToString({ url: ctx.url });
  } catch (e) {
    ctx.body = "Page Not Found";
  }
});

app.use(router.routes());

app.listen(3000);
