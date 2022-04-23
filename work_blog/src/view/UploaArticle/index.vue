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
    <el-breadcrumb separator-class="el-icon-arrow-right" :style="{'margin': '20px 0'}">
      <el-breadcrumb-item :to="{ path: '/' }">返回首页</el-breadcrumb-item>
      <el-breadcrumb-item>上传文章</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <div class="titleBox">
        <span>文章标题：</span>
        <span :style="{'margin': '40px 0'}">文章封面：</span>
        <span :style="{'margin': '60px 0'}">文章内容：</span>
      </div>
      <div class="right">
        <el-input class="ipt" v-model="title" placeholder="请输入内容"></el-input>
        <div
          @click="$refs.upload.click()"
          class="el-upload"
          :style="{'border': !avatar ? '1px dashed #8c939d !important': ''}"
        >
          <img class="avatar" v-if="avatar" :src="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <input v-show="false" ref="upload" type="file" @change="onchange" />
        </div>
        <Tinymce v-model="content" />
      </div>
    </div>
    <el-button :style="{'margin': '20px 80px'}" type="primary" @click="submit">上传文章</el-button>
  </div>
</template>

<script>
import Tinymce from "../../components/Tinymce/index";
import { addArticle } from "../../axios/api";
export default {
  components: {
    Tinymce
  },
  // 定义属性
  data() {
    return {
      avatar: "",
      title: "",
      content: ""
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {
  },
  // 方法集合
  methods: {
    getContent() {
      console.log("this.content", this.content);
    },
    onchange(file) {
      this.avatar = window.URL.createObjectURL(file.target.files[0]);
      this.file = file.target.files[0];
    },
    validate() {
      return new Promise((resolve) => {
        if (!this.title) {
          return this.$message({
            type: "error",
            message: "请填写文章标题"
          });
        }
        if (!this.file) {
          return this.$message({
            type: "error",
            message: "请选择文章封面"
          });
        }
        if (!this.content) {
          return this.$message({
            type: "error",
            message: "请填写文章内容"
          });
        }
        
        resolve();
      });
    },
    submit() {
      try {
        console.log('content', this.content)
        this.validate().then(async () => {
          let fd = new FormData();
          fd.append("user_id", this.$store.state.userInfo.user_id);
          fd.append("author", this.$store.state.userInfo.username);
          fd.append("file", this.file);
          fd.append("title", this.title);
          fd.append("content", this.content);
          const res = await addArticle(fd);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "上传文章成功"
            });
          } else {
            this.$message({
              type: "error",
              message: "上传文章失败"
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
.work {
  /* border: 1px solid red; */
  margin: 0 auto;
  width: 90%;
  overflow-y: auto;
  padding-bottom: 100px;
}
.content {
  display: flex;
  margin: 20px 0;
}
.titleBox {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ipt {
  width: 400px;
}

.el-upload {
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
}
</style>