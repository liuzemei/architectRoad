export default [
  { path: "/", component: () => import(/** Home */ "@/views/Home/index.vue") }, // 会默认代码分割
  { path: "*", component: () => import(/** 404 */"@/views/404") },
];
