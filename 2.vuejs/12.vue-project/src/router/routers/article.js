export default [
  {
    path: "/post",
    component: () => import("@/views/Article/post.vue"),
  }, // 会默认代码分割
];
