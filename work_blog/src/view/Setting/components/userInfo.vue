<template>
  <div class="setting">
    <div class="right">
      <el-form
        label-width="140px"
        :label-position="'left'"
        class="customForm"
        :model="register"
        status-icon
        :rules="rules"
        ref="regForm"
      >
        <el-form-item class="customItem" prop="avatar" label="用户头像">
          <div
            @click="$refs.upload.click()"
            class="el-upload"
            :style="{'border': !register.avatar ? '1px dashed #8c939d !important': ''}"
          >
            <img class="avatar" v-if="register.avatar" :src="register.avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </div>
          <!-- <el-button size="mini" class="el-icon-error" type="primary">删除</el-button> -->
          <!-- <i class="el-icon-error delIcon"></i> -->
          <input v-show="false" ref="upload" type="file" @change="onchange" />
        </el-form-item>
        <el-form-item class="customItem" prop="username" label="请填写用户名">
          <!-- <el-input placeholder="请填写用户名" maxlength="9" v-model="register.username"></el-input> -->
          <div :style="{'color': '#000', 'border-bottom': '1px solid #eee'}">{{register.username}}</div>
        </el-form-item>
        <el-form-item class="customItem" prop="mobile" label="请填写手机号">
          <!-- <el-input placeholder="请填写手机号" v-model="register.mobile"></el-input> -->
          <div :style="{'color': '#000', 'border-bottom': '1px solid #eee'}">{{register.mobile}}</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {},
  // 定义属性
  data() {
    var validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {
        callback();
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.register.password !== "") {
          this.$refs.regForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.register.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("请正确输入手机号!"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      disabled: false,
      register: {
        username: this.$store.state.userInfo ? this.$store.state.userInfo.username : "",
        checkPass: null,
        password: null,
        mobile:  this.$store.state.userInfo ? this.$store.state.userInfo.mobile : "",
        avatar: this.$store.state.userInfo ? this.$store.state.userInfo.avatar : ""
      },
      rules: {
        mobile: [
          // { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: validatePhone }
        ],
        username: [
          // { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: validateUsername }
        ],
        checkPass: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePass2 }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePass }
        ]
      }
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
    ...mapState(["userInfo"])
  },
  // 监控data中的数据变化
  watch: {
    userInfo: function(newValue) {
      console.log("newValue", newValue);
    }
  },
  // 方法集合
  methods: {
    // ...mapActions(['increment']),

    onchange(file) {
      console.log("beforeupload", file.target.files[0]);
      // this.imageUrl = file.url
      console.log(
        "window.URL.createObjectURL(file.target.files[0])",
        window.URL.createObjectURL(file.target.files[0])
      );
      this.register.avatar = window.URL.createObjectURL(file.target.files[0]);
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      console.log("file", file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    handleAvatarSuccess(res, file) {
      console.log("handleAvatarSuccess", file);
      this.userInfo.avatar = URL.createObjectURL(file.raw);
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log("userInfo", this.$store.state.userInfo.avatar);
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
.setting {
  /* margin: 100px auto; */
  /* border: 1px solid red; */
}
.setbox {
  /* border: 3px solid blue; */
  margin: 30px auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.left {
  border: 1px solid #eee;
  background-color: #fff;
  width: 200px;
  height: 500px;
  margin-right: 20px;
}
.left > div {
  box-sizing: border-box;
  border: 1px solid #f2f3f4;
  background-color: rgb(239, 247, 252);
  font-size: 14px;
  /* border: 1px solid red; */
  text-align: center;
  height: 35px;
  line-height: 35px;
}
.left > div:hover {
  background-color: rgb(178, 178, 241);
  color: #fff;
  border: none;
}
.right {
  /* border: 1px solid #eee; */
  width: 800px;
  box-sizing: border-box;
  /* height: 500px; */
  background: #fff;
}
.customForm {
  /* margin: 0 auto; */
  /* color: #fff !important;
  background: #fff; */
  display: flex;
  flex-direction: column;
  align-items: center;
}
.customItem {
  color: #fff !important;
  margin: 30px 0 10px;
  width: 525px;
}

.avatar-uploader {
  border: 1px dashed #8c939d !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.el-upload {
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

.delIcon {
  /* background-color: #000;
  color: #000; */
  border: 1px solid red;
  width: 30px;
  height: 30px;
  position: absolute;
  top: -10px;
  right: 0px;
}
</style>
