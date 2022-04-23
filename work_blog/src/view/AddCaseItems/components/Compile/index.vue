<template>
  <div>
    <el-form :model="chapterForm" ref="chapterForm" label-width="100px" class="demo-ruleForm chapterForm">
      <el-form-item
        label="编"
        prop="chapter"
        :rules="[
      { required: true, message: '请输入编名称'},
    ]"
      >
        <el-input v-model.number="chapterForm.chapter" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('chapterForm')">提交</el-button>
        <el-button @click="resetForm('chapterForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addCompile } from '../../../../axios/api'
import { mapState } from 'vuex'

export default {
  components: {},
  // 定义属性
  data() {
    return {
      chapterForm: {
        chapter: ""
      }
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
     ...mapState(["userInfo"]),
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submit()
        } else {
          this.$message({
            type: 'error',
            message: '请填写编名称'
          })
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async submit() {
      try {
        const res = await addCompile({user_id:this.userInfo.user_id, text: this.chapterForm.chapter})
         console.log('res', res)
        if(res && res.code == 200) {
          this.$message({
            type: 'success',
            message: '添加编成功'
          })
          this.resetForm('chapterForm')
        }else {
          this.$message({
            type: 'error',
            message: '添加编失败'
          })
        }
      } catch (error) {
        console.log('error', error)
        this.$message({
            type: 'error',
            message: '添加编失败'
          })
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
.chapterForm {
  /* border: 1px solid red; */
  width: 500px;
  margin: 100px auto;
}
</style>