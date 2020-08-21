import createApp from "./app";

export default () => {
  const { app } = createApp();
  return app; // 每个都是新的。
};
