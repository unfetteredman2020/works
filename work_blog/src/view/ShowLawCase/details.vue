<template>
  <div>
    <Heaer/>
    <div class="box">
      <h1>cesfaldsfjaklsf</h1>
      <div id="content"></div>
    </div>
  </div>
</template>

<script>
import Heaer from "@/components/NavBar/index";
import { mapState } from "vuex";
import { getLawCaseDetail } from "@/axios/api.js";

export default {
  components: {
Heaer
  },
  // 定义属性
  data() {
    return {
      title: '暂无数据'
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
    ...mapState(['userInfo'])
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async getLawCaseDetail() {
      try {
        const res = await getLawCaseDetail(this.$route.query.id)
        console.log('res', res)
        if(res && res.code == 200) {
          const content = document.getElementById('content')
          content.innerHTML = res.data.content
          this.title = res.data.title
        }
        
      } catch (error) {
        console.log('error', error)
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    console.log('this.$route.query', this.$route.query)
    this.getLawCaseDetail()
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
  .box {
    width: 80%;
    margin: 10px auto;
    /* border: 1px solid red; */
  }
  .box>h1 {
    text-align: center;
    border-bottom: 1px solid #f2f3f4;
  }
</style>