const Vue = require("vue");
const VueServerRenderer = require("vue-server-renderer");
const fs = require("fs");
const path = require("path");
const Koa = require("koa");
const Router = require("@koa/router");
const static = require("koa-static");
const app = new Koa();
const router = new Router();

app.use(static(__dirname));

const template = fs.readFileSync(
  path.resolve(__dirname, "dist", "index.ssr.html"),
  "utf8"
);

const serverBundle = fs.readFileSync(
  path.resolve(__dirname, "dist", "server.bundle.js"),
  "utf8"
);
const render = VueServerRenderer.createBundleRenderer(serverBundle, {
  template,
});

router.get("/", async (ctx) => {
  ctx.body = await render.renderToString();
});

app.use(router.routes());

app.listen(3000);
