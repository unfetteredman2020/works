<template>
  <div class="navBox">
    <div class="left"></div>
    <div class="right">
      <el-popover placement="bottom" class="popover" width="200" trigger="hover">
        <el-row v-for="(item, index) in list" :key="index" class="customRow">
          <el-col :span="3">
            <div :class="item.icon"></div>
          </el-col>
          <el-col :span="19">
            <div>{{ item.lable }}</div>
          </el-col>
          <el-col :span="2">
            <div @click="onClicks(item)" class="el-icon-arrow-right"></div>
          </el-col>
        </el-row>
        <img slot="reference" class="logo" :src="avatar" />
      </el-popover>
      <ul>
        <li @click="$router.push('/uploadCase')">查法条</li>
        <li @click="$router.push('/showLawCase')">案例库</li>
        <li @click="$router.push('/chat')">社区</li>
        <li @click="$router.push('/home/index')">首页</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  // 定义属性
  data() {
    return {
      avatar: this.$store.state.userInfo ? this.$store.state.userInfo.avatar : "../../assets/Laptop.png",
      list: [
        { lable: "资料修改", icon: "el-icon-setting", route: "/setting" },
        { lable: "我的投稿", icon: "el-icon-document", route: "/uploaArticle" },
        { lable: "我的消息", icon: "el-icon-bell", route: "/message" },
        { lable: "上传案例", icon: "el-icon-collection", route: "/addLabel" },
        { lable: "标签管理", icon: "el-icon-notebook-2", route: "/label" },
        { lable: "添加法条分类", icon: "el-icon-s-check", route: "/addCaseItems" },
        { lable: "退出登录", icon: "el-icon-switch-button" },
      ],
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    onClicks(item) {
      if (item.lable !== "退出登录") this.$router.push(item.route);
      else {
        localStorage.removeItem("userInfo");
        this.$router.push("/login");
      }
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style scoped>
div {
  background-color: #fff;
}
.navBox {
  box-shadow: 0 0 12px rgba(40, 139, 139, 0.5);
  min-width: 800px;
  /* border: 1px solid red; */
  box-sizing: border-box;
  background-color: #fff;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
}
.left {
  width: 60%;
  height: 100%;
  /* border: 1px solid blue; */
  background-color: #fff;
}
.right {
  min-width: 500px;
  box-sizing: border-box;
  width: 40%;
  height: 100%;
  /* border: 1px solid olivedrab; */
  background-color: #fff;
}
ul {
  box-sizing: border-box;
  float: left;
  list-style: none;
  background-color: #fff;
}
li {
  box-sizing: border-box;
  background-color: #fff;
  line-height: 70px;
  float: right;
  margin-left: 50px;
  font-size: 14px;
  font-weight: 400;
  /* color: #F2f3f4; */
}
.logo {
  margin: 10px 40px 0 0;
  float: right;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 0 12px #000;
  /* animation: myscalc 1s linear;  */
}
.logo:hover {
  transform: scale(1.3);
  z-index: 999;
}

.menu {
  width: 200px;
  box-sizing: border-box;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
}
.popover {
  height: 500px;
  background-color: #fff;
}
.customRow {
  background-color: #fff;
  margin-top: 20px;
}
</style>
