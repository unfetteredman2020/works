<template>
  <div class="parent">
    <div class="container">
      <div class="card" :style="{'--d':index}" v-for="(item, index) in list" :key="index">
        <div class="content">
          <div class="img">
            <img src="../../assets/pexels-aleksey-kuprikov-3551214.jpg" alt />
          </div>
          <div class="detail">
            <span>{{item.title}}</span>
            <!-- <span>草帽船长</span> -->
          </div>
        </div>
        <a href="#" @click="$router.push(`/lawCase/detail?id=${item.lawCase_id}`)">详情</a>
      </div>
    </div>
  </div>
</template>

<script>
import { getLawCase } from "@/axios/api.js";
import { mapState } from "vuex";
export default {
  components: {},
  // 定义属性
  data() {
    return {
      list: []
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
    ...mapState(["userInfo"])
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async getList() {
      try {
        const res = await getLawCase(this.userInfo.user_id);
        if (res && res.code == 200) {
          this.list = res.data;
        } else {
          this.$message({
            type: "error",
            message: "获取列表数据失败"
          });
        }
        console.log("res", res);
      } catch (error) {
        console.log("error", error);
        this.$message({
          type: "error",
          message: "获取列表数据失败"
        });
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getList();
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
.parent {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(200deg, #b1f4cf, #9880e3);
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 300px;
}
.card {
  position: absolute;
  background: #fff;
  width: 430px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-radius: 100px 20px 20px 100px;
  animation: animate 15s linear infinite;
  animation-delay: calc(3s * var(--d));
}
.container:hover .card {
  animation-play-state: paused;
}
.card .container {
  display: flex;
  align-items: center;
}
.card .img {
  width: 90px;
  height: 90px;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #fff;
  padding: 5px;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
.card .img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.card .detail {
  margin-left: 100px;
}
.card .detail span {
  display: block;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}
.card a {
  font-size: 14px;
  text-decoration: none;
  background: linear-gradient(to bottom, #fbc5ed, #a6c1ee);
  padding: 7px 18px;
  color: #fff;
  border-radius: 25px;
}
@keyframes animate {
  0% {
    opacity: 0;
    transform: translateY(100%) scale(0.5);
  }
  5%,
  20% {
    opacity: 0.4;
    transform: translateY(100%) scale(0.7);
  }
  25%,
  40% {
    opacity: 1;
    transform: translateY(0%) scale(1);
  }
  45%,
  60% {
    opacity: 0.4;
    transform: translateY(-100%) scale(0.7);
  }
  65%,
  100% {
    opacity: 0;
    transform: translateY(-100%) scale(0.5);
  }
}
</style>