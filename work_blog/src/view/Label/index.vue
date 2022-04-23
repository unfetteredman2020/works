<template>
  <div class="label">
    <NavBar />
    <div class="box">
      <div class="left">
        <span @click="$router.push('/label/list')">标签列表</span>
        <span @click="$router.push('/label/addLabel')">新增标签</span>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/NavBar/index";
export default {
  components: {
    NavBar
  },
  // 定义属性
  data() {
    return {};
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
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
  activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style scoped>
.label {
  /* border: 1px solid red; */
}
.box {
  display: flex;
  /* border: 1px solid blue; */
  align-items: center;
  margin: 20px auto;
}
.box > div {
  height: 500px;
  border: 1px solid #eee;
  margin: 0 auto;
}
.left {
  width: 200px;
  min-width: 150px;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
}
.left > span {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  color: #fff;
  background-color: #409eff;
  text-align: center;
  border-bottom: 1px solid #fff;
}
.left > span:hover {
  cursor: pointer;
  background: #eee;
  color: #409eff;
}
.right {
  width: 900px;
}
</style>