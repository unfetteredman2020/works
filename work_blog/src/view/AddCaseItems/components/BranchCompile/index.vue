<template>
  <div class="box">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="编名称" prop="branchCompile_text">
        <el-input placeholder="请输入分编名称" maxlength="15" autocomplete="off" v-model="ruleForm.branchCompile_text"></el-input>
      </el-form-item>
      <el-form-item label="编名称" prop="chapter_id">
        <el-select v-model="ruleForm.compile_id" placeholder="请选择编名称">
          <el-option
            v-for="item in compileList"
            :key="item.compile_id"
            :label="item.text"
            :value="item.compile_id"
          >
            <span style="float: left">{{ item.text }}</span>
            <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCompile, addBranchCompile } from "../../../../axios/api";

import { mapState } from "vuex";
export default {
  components: {},
  // 定义属性
  data() {
    return {
      ruleForm: {
        branchCompile_text: "",
        compile_id: ""
      },
      rules: {
        branchCompile_text: [{ required: true, message: "请输入编名称", trigger: "blur" }],
        compile_id: [
          { required: true, message: "请选择编名称", trigger: "change" }
        ]
      },
      compileList: []
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
    onChange(value) {
      console.log("value", value);
    },
    async getCompile() {
      try {
        const res = await getCompile(this.userInfo.user_id);
        console.log("res", res);
        if (res && res.code == 200) {
          this.compileList = res.data;
          this.$message({
            type: "success",
            message: "获取编成功"
          });
        }
      } catch (error) {
        this.$message({
          type: "error",
          message: "获取编错误"
        });
        console.log("error", error);
      }
    },
    async submit() {
      try {
        console.log("this.", this.compileList);
        let compile_text = this.compileList.filter(
          item => item.compile_id == this.ruleForm.compile_id
        )[0].text;
        console.log("compile_text", compile_text);
        let params = Object.assign(this.ruleForm, {
          user_id: this.userInfo.user_id,
          compile_text
        });
        const res = await addBranchCompile(params);
        if (res && res.code == 200) {
          this.$message({
            type: "success",
            message: "添加章成功"
          });
          this.resetForm("ruleForm");
        } else {
          this.$message({
            type: "error",
            message: "添加章失败"
          });
        }
      } catch (error) {
        console.log("error", error);
        this.$message({
          type: " error",
          message: "添加章失败"
        });
      }
    },
    submitForm(formName) {
      console.log("ruleForm", this.ruleForm.compile_id);
      console.log("this.ch", this.compileList);
      let arr = this.compileList.filter(
        item => item.compile_id == this.resetForm.compile_id
      );
      console.log("arr", arr);
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("ruleForm", this.ruleForm);
          // alert("submit!");
          this.submit();
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
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getCompile();
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

<style lang="less" scoped>
.box {
  width: 100%;
  // border: 1px solid orange;
  padding-top: 100px;
}
</style>