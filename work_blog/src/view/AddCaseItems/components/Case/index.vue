<!--
 * @Author: your name
 * @Date: 2022-03-30 10:39:16
 * @LastEditTime: 2022-03-30 10:41:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /work_blog/src/view/UploadWork/index.vue
-->

<template>
  <div class="work">
    <el-breadcrumb separator-class="el-icon-arrow-right" :style="{ margin: '20px 0' }">
      <el-breadcrumb-item :to="{ path: '/' }">返回首页</el-breadcrumb-item>
      <el-breadcrumb-item>上传文章</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <div class="titleBox">
        <span>案例分类：</span>
        <!-- <span :style="{'margin': '40px 0'}">案例标题：</span> -->
        <span :style="{ margin: '40px 0' }">案例内容：</span>
      </div>
      <div class="right">
        <el-cascader
          v-model="value"
          :options="options"
          :props="{ expandTrigger: 'hover'}"
          @change="handleChange"
        ></el-cascader>
        <!-- <el-input class="ipt" v-model="title" placeholder="请输入内容"></el-input> -->
        <Tinymce v-model="content" class="customTinymce" />
      </div>
    </div>
    <el-button :style="{ margin: '0 80px' }" type="primary" size="mini" @click="submit">上传案例</el-button>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce/index";
import { getAllClassification, addCase } from "@/axios/api";
import { mapState } from "vuex";
export default {
  components: {
    Tinymce
  },
  // 定义属性
  data() {
    return {
      isEdit: false,
      content: "",
      value: [],
      options: []
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
    async getAllClassification() {
      try {
        const res = await getAllClassification(this.userInfo.user_id);
        console.log("res", res);
        if (res && res.code == 200) {
          this.options = res.data;
        } else {
          this.$message({
            type: "error",
            message: "获取分类失败"
          });
        }
      } catch (error) {
        console.log("error", error);
        this.$message({
          type: "error",
          message: "获取分类失败"
        });
      }
    },
    handleChange(value) {
      // console.log(value);
      this.value = value;
    },
    onchange(file) {
      this.avatar = window.URL.createObjectURL(file.target.files[0]);
      this.file = file.target.files[0];
    },
    validate() {
      return new Promise(resolve => {
        if (!this.value.length) {
          return this.$message({
            type: "error",
            message: "请选择case分类"
          });
        }
        if (this.value.length !== 3) {
          console.log('this.value', this.value)
          return this.$message({
            type: "error",
            message: "请选择章分类"
          });
        }
        if (!this.content) {
          return this.$message({
            type: "error",
            message: "请填写章内容"
          });
        }
        resolve();
      });
    },
    submit() {
      try {
        console.log("content", this.value);
        this.validate().then(async () => {
          let fd = {
            user_id: this.userInfo.user_id,
            author: this.userInfo.username,
            comments: this.content,
            compile_id: this.value[0],
            chapter_id:  this.value[1],
            branchCompile_id:  this.value[2],
          };

          const res = await addCase(fd);
          if (res && res.code == 200) {
            this.value = ''
            this.content = null
            this.$router.push('/addCaseItems/caseList')
            this.$message({
              type: "success",
              message: "添加case成功"
            });
            
          } else {
            this.$message({
              type: "error",
              message: "添加case失败"
            });
          }
        });
      } catch (error) {
        console.log("error", error);
        this.$message({
          type: "error",
          message: "上传文章失败"
        });
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getAllClassification();
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
.work {
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin: 0 auto;
  width: 97%;
  overflow-y: auto;
  padding-bottom: 100px;
}
.content {
  display: flex;
  margin: 20px 0 0;
}
.titleBox {
  /* border: 1px solid #201d1d; */
  /* color: ; */
  font-size: 14px;
  font-weight: 400;
  min-width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ipt {
  margin: 20px 0;
  width: 400px;
}

.el-upload {
  /* border: 1px solid red; */
  margin: 20px 0;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  /* width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center; */
}
.avatar {
  border: none;
  /* width: 178px;
  height: 178px; */
  height: 100%;
  width: 100%;
}
.right {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 600px;
  /* overflow-y:auto ; */
}
.customTinymce {
  /* border: 1px solid red; */
  margin: 20px 0 0;
  height: 300px !important;
}
</style>
