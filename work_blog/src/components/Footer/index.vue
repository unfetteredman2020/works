<template>
  <div class="footer">
    <div class="top">
      <div class="item" v-for="(item, index) in list" :key="index">
        <h2 class="bgc">{{item.lable}}</h2>
        <ol class="bgc">
            <li class="bgc" v-for="(item, idx) in item.child" :key="idx" >{{item.lable}}</li>
        </ol>
      </div>
    </div>
    <!-- <div class="bottom"></div> -->
  </div>
</template>

<script>
export default {
  components: {},
  // 定义属性
  data() {
    return {
      list: [
        {
          lable: '新手上路',
          child: [
            { lable: '成长任务'},
            { lable: '编辑入门'}
          ]
        },
        {
          lable: '我有疑问',
          child: [
            { lable: '意见反馈'},
            { lable: '内容质疑'}
          ]
        },
        {
          lable: '投诉建议',
          child: [
            { lable: '举报不良信息'},
            { lable: '投诉侵权信息'}
          ]
        },
      ]
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {},
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

.footer {
  background-color: #000;
  width: 100%;
  height: 150px;
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
}
.footer>div {
  background-color: #000;
}
.top {
  height: 110px;
  /* border: 1px solid #fff; */
  display: flex;
  justify-content: space-around;
  background-color: #000;
}
.bottom {
  height: 40px;
  border: 1px solid red;
}
.item {
  box-sizing: border-box;
  color: #FFf;
  background-color: #000;
  /* border: 1px solid green; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 400;
}
h2 {
  font-size: 18px;
  margin-bottom: 10px;
}
.bgc  {
  background-color: #000;
}
li {
  margin-bottom: 10px;
}
li:hover {
  cursor: pointer;
}
</style>