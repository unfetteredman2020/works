<template>
  <div class="chatContainer">
    <div class="chatBox">
      <div class="navBar"></div>
      <div class="left">
        <span></span>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>

export default {
  components: {

  },
  // 定义属性
  data() {
    return {
      
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {

  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style scoped>
  .chatContainer {
    overflow: hidden;
    border: 1px solid red;
    width: 100%;
    height: 100vh;
    background: #3a6186;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #89253e, #3a6186);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #89253e, #3a6186); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }
  .chatBox {
    /* border: 1px solid blue; */
    box-sizing: border-box;
    margin: 50px auto;
    width: 900px;
    height: 700px;
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
    background-color: #f2f3f4;
  }
  .right {
    border: 1px solid rgb(133, 136, 129);
    background-color: #f2f3f4;
    width: 100%;
    height: 100%;
  }
</style>