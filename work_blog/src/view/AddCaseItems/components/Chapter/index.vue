<template>
  <div>
    <el-form
      :model="numberValidateForm"
      ref="numberValidateForm"
      label-width="120px"
      :rules="rules"
      class="demo-ruleForm customForm"
    >
      <el-form-item label="章标题" prop="text">
        <el-input
          maxlength="10"
          :style="{'width': '193px'}"
          v-model="numberValidateForm.text"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="所属编和分编" prop="menuId">
        <el-cascader
          v-model="numberValidateForm.menuId"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          @change="handChange"
          placeholder="请选择所属编和分编"
        ></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
        <el-button @click="resetForm('numberValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getClassification, addChapter } from "../../../../axios/api";
import { mapState } from "vuex";
export default {
  components: {},
  // 定义属性
  data() {
    var check = (rule, value, callback) => {
      console.log("value", value);
      if (!value) {
        // this.numberValidateForm = Object.assign(this.numberValidateForm, {menuId: ''})
        return callback(new Error("请选择所属编和分编"));
      } else if (value.length !== 2) {
        console.log("请选择所属分编");
        // this.numberValidateForm =  Object.assign(this.numberValidateForm, {menuId: ''})
        return callback(new Error("请选择所属分编"));
      }
      callback();
    };
    return {
      numberValidateForm: {
        menuId: [],
        text: ""
      },
      options: [],
      rules: {
        text: [{ required: true, message: "章标题不能为空" }],
        menuId: [{ validator: check, trigger: "change" }]
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
    async addChapter() {
      try {
        let params = {
          user_id: this.userInfo.user_id,
          compile_id: this.numberValidateForm.menuId[0],
          branchCompile_id: this.numberValidateForm.menuId[1],
          text: this.numberValidateForm.text
        };
        const res = await addChapter(params);
        console.log("res", res);
        if (res && res.code == 200) {
          this.$message({
            type: "success",
            message: "添加章成功"
          });
          this.resetForm("numberValidateForm");
        } else {
          this.$message({
            type: "error",
            message: "添加章失败"
          });
        }
      } catch (error) {
        console.log("error", error);
        this.$message({
          type: "error",
          message: "添加章失败"
        });
      }
    },
    handChange(value) {
      console.log("valuesadf", value);
      // if(value.length && value.length !== 2) {
      //   this.numberValidateForm = Object.assign(this.numberValidateForm, {menuId: ''})
      //   this.$message({
      //       type: "error",
      //       message: "请选择所属分编"
      //     });
      // }
    },
    async getClassification() {
      try {
        const res = await getClassification(this.userInfo.user_id);
        console.log("res", res);
        if (res && res.code == 200) {
          this.options = res.data;
        } else {
          this.$message({
            type: "error",
            message: "获取编分类失败"
          });
        }
      } catch (error) {
        console.log("error", error);
        this.$message({
          type: "error",
          message: "获取编分类失败"
        });
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("this.numberValidateForm", this.numberValidateForm);
          this.addChapter();
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
    this.getClassification();
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
.customForm {
  margin: 100px 0;
  /* border: 1px solid red; */
}
</style>