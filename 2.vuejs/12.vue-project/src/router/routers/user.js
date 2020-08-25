export default [
  {
    path: "/forget",
    component: () => import(/** forget */ "@/views/User/forget.vue"),
  }, // 会默认代码分割
  {
    path: "/login",
    component: () => import(/** login */ "@/views/User/login.vue"),
  }, // 会默认代码分割
  { path: "/reg", component: () => import(/** reg */ "@/views/User/reg.vue") }, // 会默认代码分割
];
