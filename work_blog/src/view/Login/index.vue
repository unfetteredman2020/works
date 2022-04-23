<template>
  <div class="login">
    <div class="centerBox">
      <div class="left common">
        <span class="title">Welcome To My Program</span>
        <img src="../../assets/Team presentation _Flatline.png" />
        <span>已有账号？去登录</span>
        <button @click="change(true, $event)">登录</button>
      </div>
      <div class="right common">
        <span class="title">Welcome To My Program</span>
        <img src="../../assets//Designer _Two Color.png" />
        <span>还没账号？去注册</span>
        <button @click="change(false, $event)">注册</button>
      </div>
      <div class="box" :class="{leftAnimation:  !flag, rightAnimation: flag}">
        <!-- 登录 -->
        <div v-show="flag " class="loginBox shape">
          <span class="title">LOGIN</span>
          <el-form
            :style="{'margin': '50px auto'}"
            class="customForm"
            :model="login"
            :rules="rules"
            ref="logForm"
          >
            <el-form-item class="customItem" prop="mobile">
              <el-input
                maxlength="11"
                prefix-icon="el-icon-user-solid"
                placeholder="请填写手机号"
                v-model="login.mobile"
              ></el-input>
            </el-form-item>
            <el-form-item class="customItem" prop="password">
              <el-input
                maxlength="9"
                minlength="6"
                prefix-icon="el-icon-lock"
                autocomplete="off"
                type="password"
                placeholder="请填写密码"
                v-model="login.password"
              ></el-input>
            </el-form-item>
            <el-button
              :style="{'margin': '50px auto'}"
              class="regBtn"
              type="primary"
              @click="submitForm('logForm')"
            >LOGIN</el-button>
          </el-form>
        </div>
        <!-- 注册 -->
        <div v-show="!flag" class="registerBox shape">
          <span class="title">REGISTER</span>
          <el-form class="customForm" :model="register" status-icon :rules="rules" ref="regForm">
            <el-form-item class="customItem" prop="username">
              <el-input
                placeholder="请填写用户名"
                maxlength="9"
                prefix-icon="el-icon-user-solid"
                v-model="register.username"
              ></el-input>
            </el-form-item>
            <el-form-item class="customItem" prop="mobile">
              <el-input
                placeholder="请填写手机号"
                prefix-icon="el-icon-mobile-phone"
                v-model="register.mobile"
              ></el-input>
            </el-form-item>
            <el-form-item class="customItem" prop="password">
              <el-input
                placeholder="请填写密码"
                maxlength="9"
                minlength="6"
                prefix-icon="el-icon-lock"
                type="password"
                v-model="register.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item class="customItem" prop="checkPass">
              <el-input
                placeholder="请再次填写密码"
                maxlength="9"
                minlength="6"
                prefix-icon="el-icon-lock"
                type="password"
                v-model="register.checkPass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-button
              :style="{'margin': '30px auto'}"
              class="regBtn"
              type="primary"
              @click="submitForm('regForm')"
            >REGISTER</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/axios/api.js";
import { mapActions } from "vuex";
export default {
  // components: {},
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
      flag: true, // true: login | false: register
      animation: true,
      login: {
        username: null,
        mobile: null
      },
      register: {
        username: null,
        checkPass: null,
        password: null,
        mobile: null
      },
      rules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: validatePhone }
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
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
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    ...mapActions(["asynUserInfo"]),
    change(bool) {
      console.log("bool", bool);
      this.flag = bool;
    },
    submitForm(formName) {
      console.log("formName", formName);
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (formName == "regForm") {
            const res = await register(this.register);
            if (res && res.code == 200) {
              this.$message({
                message: "注册成功，请登录！",
                type: "success"
              });
              this.flag = true;
            } else {
              this.$message({
                message: res.msg || "注册失败",
                type: "error"
              });
            }
            console.log("res", res);
          } else {
            const res = await login(this.login);
            console.log("res login", res);
            if (res && res.code == 200) {
              localStorage.setItem('userInfo', JSON.stringify(res.data))
              this.asynUserInfo(res.data || {});
              this.$message({
                message: "登录成功！",
                type: "success"
              });
              this.$router.push("/");
            } else {
              this.$message({
                message: res.msg || "登录失败",
                type: "error"
              });
            }
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
.login {
  align-items: center;
  background: #654ea3; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to top,
    #eaafc8,
    #b09ce9
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    #eaafc8,
    #654ea3
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.centerBox {
  /* box-sizing: border-box;
  border: 1px solid #fff;
  background-color: #fff; */
  margin: 10% auto;
  width: 700px;
  height: 500px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  position: relative;
  border-radius: 22px;
  /* box-shadow: 0 0 44px #355c7d; */
}
.common {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 22px;
  box-sizing: border-box;
}
.common > img {
  width: 200px;
  height: 200px;
}
.title {
  margin: 50px auto 10px;
  color: #b09ce9;
  font-size: 24px;
}
.common > span:nth-child(3) {
  margin: 20px 0;
  color: #000;
  font-size: 14px;
  border-radius: 22px;
}
.common > button {
  width: 100px;
  height: 40px;
  border: 1px solid #b09ce9;
  border-radius: 5px;
  color: #a162a3;
  background-color: rgba(165, 116, 116, 0);
}
.left {
  /* box-sizing: border-box; */
  /* border: 1px solid red; */
  background-color: #fff;
}
.right {
  /* border: 1px solid blue; */
}
.shape {
  /* opacity: .5; */
  display: flex;
  flex-direction: column;
  align-content: center;
  box-sizing: border-box;
}
.loginBox {
  /* position: absolute; */
  /* border: 1px solid red; */
  /* animation: mobbile 0.5s; */
  display: flex;
  flex-direction: column;
  align-items: center;
}
.registerBox {
  /* left: 50%; */
  /* position: absolute; */
  /* border: 1px solid blue; */
}
.customForm {
  margin: 0 auto;
  /* border: 1px solid red; */
  color: #fff !important;
}
.customItem {
  color: #fff !important;
  margin: 30px 0 10px;
  width: 325px;
}
.regBtn {
  display: flex;
  justify-content: center;
  background: #df628c;
  border: none;
  margin: 0 auto;
  width: 200px;
}
.box {
  top: -50px;
  top: 0px;
  left: 0;
  position: absolute;
  /* border: 1px solid orange; */
  background-color: red;
  height: 500px;
  width: 350px;
  margin: 0;
  padding: 0;
  border-radius: 12px;
  box-shadow: 0 0 44px #355c7d;
  box-sizing: border-box;
  background: linear-gradient(
    to top,
    #c06c84,
    #6c5b7b,
    #355c7d
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.leftAnimation {
  animation: mobbile linear 0.5s;
  left: 350px;
}
.rightAnimation {
  animation: rights linear 0.5s;
}
@keyframes mobbile {
  0% {
    left: 20px;
    position: absolute;
    /* border-radius: 10%; */
  }
  20% {
    left: 50px;
    position: absolute;
    /* border-radius: 40%; */
  }
  40% {
    left: 100px;
    position: absolute;
    /* border-radius: 40%; */
  }
  50% {
    left: 150px;
    position: absolute;
    /* border-radius: 40%; */
  }
  60% {
    left: 200px;
    position: absolute;
    /* border-radius: 40%; */
  }
  70% {
    left: 250px;
    position: absolute;
    /* border-radius: 40%; */
  }
  80% {
    left: 300px;
    position: absolute;
    /* border-radius: 80%; */
  }
  100% {
    left: 350px;
    position: absolute;
  }
}
@keyframes rights {
  0% {
    left: 350px;
    position: absolute;
    /* border-radius: 10%; */
  }
  20% {
    left: 300px;
    position: absolute;
    /* border-radius: 40%; */
  }
  40% {
    left: 250px;
    position: absolute;
    /* border-radius: 40%; */
  }
  50% {
    left: 200px;
    position: absolute;
    /* border-radius: 40%; */
  }
  60% {
    left: 150px;
    position: absolute;
    /* border-radius: 40%; */
  }
  70% {
    left: 100px;
    position: absolute;
    /* border-radius: 40%; */
  }
  80% {
    left: 50px;
    position: absolute;
    /* border-radius: 80%; */
  }
  100% {
    left: 0px;
    position: absolute;
  }
}
</style>