import createApp from "./app";

export default (context) => {
  // const { app, router } = createApp();
  // return app; // 每个都是新的。
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();
    router.push(context.url); // 跳转到默认路径 可能有异步组件

    router.onReady(() => {
      const matchComponents = router.getMatchedComponents(); // 获取匹配到的组件
      if (matchComponents.length) {
        console.log(matchComponents);
        Promise.all(
          matchComponents.map((component) => {
            if (component.asyncData) {
              return component.asyncData(store);
            }
          })
        ).then(() => {
          context.state = store.state; // 将状态放到上下文中 -> 会将结果放到 window.__INITIAL_STATE__ 上
          resolve(app);
        }, reject);
      } else {
        reject({ code: 404 });
      }
      // resolve(app); // 等待所有的异步组件加载完毕会执行 onReady
    }, reject);
  });
};
