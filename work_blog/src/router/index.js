// 1. 引入对应模块
import Vue from "vue";
import Router from "vue-router";

// import Login from "../view/Login/index.vue";
// import Home from "../view/Home/index.vue";
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => {
    console.log("err", err);
    return err;
  });
};
// 2. 声明使用
Vue.use(Router);

// 3. 输出路由对象
export default new Router({
  // mode: 'hash',
  // 3.1 配置一级路由
  routes: [
    {
      name: "home",
      path: "/home",
      component: () => import("../view/Home/index.vue"),
      children: [
        { path: "community", component: (resolve) => require(["../components/HomePage/index.vue"], resolve) },

        { path: "case", component: (resolve) => require(["../components/HomePage/index.vue"], resolve) },

        { path: "search", component: (resolve) => require(["../components/HomePage/index.vue"], resolve) },

        { path: "index", component: (resolve) => require(["../components/Swiper/index.vue"], resolve) },

        { path: "", redirect: "/home/index" },
      ],
    },
    {
      path: "/login",
      component: () => import("../view/Login/index.vue"),
    },
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/setting",
      component: () => import("../view/Setting/index.vue"),
      children: [
        { path: "index", component: (resolve) => require(["../view/Setting/components/userInfo.vue"], resolve) },
        { path: "change", component: (resolve) => require(["../view/Setting/components/changeUserInfo.vue"], resolve) },
        { path: "", redirect: "/setting/index" },
      ],
    },
    {
      path: "/uploaArticle",
      component: () => import("../view/UploaArticle/index.vue"),
    },
    {
      path: "/label",
      component: () => import("../view/Label/index.vue"),
      children: [
        { path: "addLabel", component: () => import("../view/Label/components/addLabel.vue") },
        { path: "list", component: () => import("../view/Label/components/labelList.vue") },
        { path: "", redirect: "/Label/addLabel" },
      ],
    },
    { path: "/articleList", component: () => import("../view/ArticleList/index.vue") },
    { path: "/articleDetail", component: () => import("../view/ArticleDetail/index.vue") },
    { path: "/chat", component: () => import("../view/Chat/index.vue") },
    // { path: "/uploadCase", component: () => import('../view/UploadCase/index.vue') },
    {
      path: "/addCaseItems",
      component: () => import("../view/AddCaseItems/index.vue"),
      children: [
        
        { path: "caseList", component: () => import("../view/AddCaseItems/components/CaseList/index.vue") },
        { path: "compile", component: () => import("../view/AddCaseItems/components/Compile/index.vue") },
        { path: "branchCompile", component: () => import("../view/AddCaseItems/components/BranchCompile/index.vue") },
        { path: "chapter", component: () => import("../view/AddCaseItems/components/Chapter/index.vue") },
        { path: "case", component: () => import("../view/AddCaseItems/components/Case/index.vue") },
        { path: "", redirect: "/addCaseItems/compile" },
      ],
    },
    { path: "", redirect: "/home/index" },
  ],
});
