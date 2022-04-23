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
        ref="changeUserForm"
      >
        <el-form-item class="customItem" prop="avatar" label="用户头像">
          <div
            @click="$refs.upload.click()"
            class="el-upload"
            :style="{
              border: !register.avatar ? '1px dashed #8c939d !important' : '',
            }"
          >
            <img class="avatar" v-if="register.avatar" :src="register.avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </div>
          <input v-show="false" ref="upload" type="file" @change="onchange" />
        </el-form-item>
        <el-form-item class="customItem" prop="username" label="请填写用户名">
          <el-input
            placeholder="请填写用户名"
            maxlength="9"
            v-model="register.username"
          ></el-input>
        </el-form-item>
        <el-form-item class="customItem" prop="mobile" label="请填写手机号">
          <el-input
            placeholder="请填写手机号"
            v-model="register.mobile"
          ></el-input>
        </el-form-item>
        <el-form-item class="customItem" prop="password" label="原密码">
          <el-input
            placeholder="请填写原密码"
            maxlength="9"
            minlength="6"
            type="password"
            v-model="register.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="customItem"
          prop="checkPass"
          label="新密码"
        >
          <el-input
            placeholder="请填写新密码"
            maxlength="9"
            minlength="6"
            type="password"
            v-model="register.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-button
          :style="{ margin: '30px auto' }"
          class="regBtn"
          type="primary"
          @click="submitForm"
          >提交</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
// import NavBar from "../../components/NavBar";
import { mapActions } from "vuex";
import { changeUserInfo } from "../../../axios/api";
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
          this.$refs.changeUserForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } 
      callback();
      // else if (value !== this.register.password) {
      //   callback(new Error("两次输入密码不一致!"));
      // } else {
      //   callback();
      // }
    };
    var validatePhone = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("请正确输入手机号!"));
      } else {
        callback();
      }
    };
    return {
      file: null,
      dialogVisible: false,
      disabled: false,
      register: {
        username: this.$store.state.userInfo
          ? this.$store.state.userInfo.username
          : "",
        checkPass: null,
        password: null,
        mobile: this.$store.state.userInfo
          ? this.$store.state.userInfo.mobile
          : "",
        avatar: this.$store.state.userInfo
          ? this.$store.state.userInfo.avatar
          : "",
      },
      rules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: validatePhone },
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: validateUsername },
        ],
        checkPass: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { validator: validatePass2 },
        ],
        password: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          { validator: validatePass },
        ],
      },
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    ...mapActions(["getUserInfo"]),
    submitForm() {
      const that = this;
      this.$refs["changeUserForm"].validate(async (valid) => {
        if (valid) {
          if (!this.register.avatar) {
            return this.$message({
              message: "请选择图片",
              type: "info",
            });
          }
          that.updataUser();
        } else {
          return this.$message({
            message: "请检查用户信息",
            type: "error",
          });
        }
      });
    },
    async updataUser() {
      const {
        file,
        register: { username, password, mobile, checkPass },
      } = this;
      try {
        var fd = new FormData();
        file && fd.append("file", file);
        username && fd.append("username", username);
        password && fd.append("oldPassword", password);
        mobile && fd.append("mobile", mobile);
        checkPass &&  fd.append("newPassword", checkPass);
        fd.append("user_id", this.$store.state.userInfo.user_id);

        const res = await changeUserInfo(fd);
        if (res.code == 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.getUserInfo(this.$store.state.userInfo.user_id);
          this.$router.push("/setting/index");
        } else {
          this.$message({
            message: res.msg || "修改失败",
            type: "error",
          });
        }
      } catch (error) {
        this.$message({
          message: "修改失败",
          type: "error",
        });
      }
    },
    onchange(file) {
      this.register.avatar = window.URL.createObjectURL(file.target.files[0]);
      this.file = file.target.files[0];
    },
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
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
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
  /* border: 1px solid blue; */
  box-sizing: border-box;
  width: 800px;
  /* height: 500px; */
  background: #fff;
}
.customForm {
  box-sizing: border-box;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin: 0 auto; */
  /* color: #fff !important;
  background: #fff; */
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
</style>
