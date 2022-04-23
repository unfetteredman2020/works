<!--
 * @Author: your name
 * @Date: 2022-03-28 15:59:23
 * @LastEditTime: 2022-03-30 09:50:24
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /work_blog/src/view/Setting/index.vue
-->
<template>
  <div class="setting">
    <NavBar />
    <div class="setbox">
      <div class="left">
        <div @click="$router.push('/setting/index')">我的信息</div>
        <div @click="$router.push('/setting/change')">修改信息</div>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/NavBar";

export default {
  components: {
    NavBar
  },
  // 定义属性
  data() {
    return {
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log('this.$refs.upload.click()', this.$refs.upload.click())
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

<style scoped>
.setting {
  /* margin: 100px auto; */
  /* border: 1px solid red; */
}
.setbox {
  /* border: 3px solid blue; */
  margin: 30px auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.left {
  border: 1px solid #eee;
  background-color: #fff;
  width: 200px;
  height: 639px;
  margin-right: 20px;
}
.left > div {
  box-sizing: border-box;
  border: 1px solid #eee;
  background-color: #d9dee2;
  font-size: 14px;
  /* border: 1px solid red; */
  text-align: center;
  height: 35px;
  line-height: 35px;
}
.left > div:hover {
  cursor: pointer;
  background-color: #409EFF;
  color: #fff;
  border: none;
}
.right {
  border: 1px solid #eee;
  width: 800px;
  /* height: 500px; */
  background: #fff;
}

</style>
