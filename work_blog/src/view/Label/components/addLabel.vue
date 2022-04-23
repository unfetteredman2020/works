<template>
  <div class="addLabel">
    <el-form :model="labelForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
      <el-form-item
        label="标签"
        prop="label"
        :rules="[
      { required: true, message: '标签不能为空'},
    ]"
      >
        <el-input
          maxlength="20"
          :style="{'width': '500px'}"
          v-model.number="labelForm.label"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
        <el-button @click="resetForm('numberValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addLabel } from "../../../axios/api";
import {mapState} from 'vuex'
export default {
  components: {},
  // 定义属性
  data() {
    return {
      labelForm: {
        label: ""
      }
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
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            let params = {
              label_name: this.labelForm.label,
              username: this.userInfo.username,
              user_id: this.userInfo.user_id,
            }
            const res = await addLabel(params);
            console.log("res", res);
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "新增标签成功"
              });
              this.$router.push('/label/list')
            } else {
              this.$message({
                type: "error",
                message: "新增标签失败"
              });
            }
          } catch (error) {
            console.log("error", error);
            this.$message({
              type: "error",
              message: "新增标签失败"
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
.addLabel {
  margin: 0 auto;
  padding: 50px 0;
}
</style>