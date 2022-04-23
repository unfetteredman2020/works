<template>
  <div class="chatContainer">
    <div class="chatBox">
      <!-- <div class="navBar"></div> -->
      <div class="left">
        <el-menu
          class="el-menu-vertical-demo"
          :default-active="$route.path"
          @open="handleOpen"
          @close="handleClose"
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/home" :route="{path: '/home'}">
            <i class="el-icon-s-home"></i>
            <span slot="title">返回首页</span>
          </el-menu-item>
          <el-menu-item index="/addCaseItems/caseList" :route="{path: '/addCaseItems/caseList'}">
            <i class="el-icon-menu"></i>
            <span slot="title">案例列表</span>
          </el-menu-item>
          <el-menu-item index="/addCaseItems/compile" :route="{path: '/addCaseItems/compile'}">
            <i class="el-icon-menu"></i>
            <span slot="title">添加编号</span>
          </el-menu-item>
          <el-menu-item
            index="/addCaseItems/branchCompile"
            :route="{path: '/addCaseItems/branchCompile'}"
          >
            <i class="el-icon-document"></i>
            <span slot="title">添加分编</span>
          </el-menu-item>
          <el-menu-item index="/addCaseItems/chapter" :route="{path: '/addCaseItems/chapter'}">
            <i class="el-icon-document"></i>
            <span slot="title">添加章</span>
          </el-menu-item>
          <el-menu-item index="/addCaseItems/case" :route="{path: '/addCaseItems/case'}">
            <i class="el-icon-setting"></i>
            <span slot="title">添加案例</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  // 定义属性
  data() {
    return {
      active: 0
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // console.log("re");
    // this.active = 0;
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    console.log("this.$route", this.$route.path);
    // window.addEventListener("hashchange", function(res) {
    //   console.log("锚点已改变", res);
    // });
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="less" scoped>
.chatContainer {
  overflow: hidden;
  /* border: 1px solid red; */
  width: 100%;
  height: 100vh;
  background: #3a6186; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #89253e,
    #3a6186
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #89253e,
    #3a6186
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.chatBox {
  /* border: 1px solid blue; */
  box-sizing: border-box;
  margin: 50px auto;
  width: 900px;
  height: 720px;
  display: flex;
}
.navBar {
  width: 15%;
  background-color: #000428;
}
.left {
  width: 30%;
  height: 100%;
  /* border: 1px solid rebeccapurple; */
  // background-color: #f2f3f4;
  background-color: #000428;
  .leftItem {
    text-align: center;
    line-height: 50px;
    height: 50px;
    color: #fff;
    font-size: 14px;
    font-weight: 400;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    // border: 1px solid #f2f3f4;
    background-color: #000428;
  }
  .active {
    background-color: rgb(10, 138, 223);
    color: #fff;
  }
  .leftItem:hover {
    background-color: rgb(10, 138, 223);
    color: #fff;
  }
}
.right {
  // border-bottom: 1px solid rgb(133, 136, 129);
  background-color: #f2f3f4;
  width: 100%;
  height: 100%;
}
</style>