export default [
  {
    path: "/post",
    component: () => import(/**webpackChunkName: 'Article' */ "@/views/Article/post.vue"),
  }, // 会默认代码分割
];
