<template>
  <div class="swiper">
    <el-carousel :interval="4000" type="card" height="200px" class="customCarousel">
      <el-carousel-item v-for="item in imgList" :key="item.url" class="customCarousel">
        <!-- <h3 class="medium">{{ item }}</h3> -->
        <img class="swiperImg" :src="item.url" alt />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  components: {},
  // 定义属性
  data() {
    return {
      imgList: [
        { url: require("../../assets/pexels-aleksey-kuprikov-3551214.jpg") },
        { url: require("../../assets/pexels-dimitry-anikin-5044370.jpg") },
        { url: require("../../assets/pexels-victor-dunn-11389730.jpg") }
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
.swiper {
  margin: 80px auto;
  /* height: 350px; */
  width: 90%;
  /* border: 1px solid red; */
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  /* line-height: 350px !important; */
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.customCarousel {
  /* border: 1px solid blue; */
  line-height: 300px;
  height: 300px;
}
.swiperImg {
  width: 100%;
  height: 100%;
}
</style>