<template>
  <div class="box">
    <Heaer></Heaer>
    <div class="content">
      <!-- <img src="../../assets/undraw_Exploring_re_grb8.png" alt=""> -->
      <el-input placeholder="请输入内容" v-model="title">
        <template slot="prepend">案例名称</template>
      </el-input>
      <Tinymce v-model="content" class="customTinymce" />
      <el-button :style="{ margin: '10px 0' }" type="primary" size="mini" @click="submit">上传案例</el-button>
    </div>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce/index";
import Heaer from "@/components/NavBar/index";
import { addLawCase } from "@/axios/api.js";
import { mapState } from "vuex";
export default {
  components: {
    Tinymce,
    Heaer
  },
  // 定义属性
  data() {
    return {
      content: "",
      title: ""
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
    async submit() {
      try {
        if (!this.title || !this.content) {
          const err = !this.title
            ? "请输入案例名称"
            : !this.content
            ? "请输入内容"
            : "";
          return this.$message({
            type: "error",
            message: err
          });
        }
        let params = {
          user_id: this.userInfo.user_id,
          title: this.title,
          content: this.content
        };
        const res = await addLawCase(params);
        console.log('res', res)
        if (res && res.code == 200) {
          this.$message({
            type: "success",
            message: "添加成功"
          });
        } else {
          this.$message({
            type: "error",
            message: "添加失败"
          });
        }
      } catch (error) {
        console.log("error", error);
        this.$message({
          type: "error",
          message: "添加失败"
        });
      }
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
.box {
  width: 100vw;
  height: 100vh;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  /* position: relative; */
  /* background-image:; */
  /* background-size: 100%; */
  /* baci */
  background-color: #f2f3f4;
}
.customTinymce {
  margin: 10px 0;
}
.content {
  /* border: 1px solid red; */
  width: 80%;
  margin: 30px auto;
  box-shadow: 0 0 12px #fff;
}
</style>