const { registerService } = require("../service/register.service");
const { REGISTERERROR } = require('../constant/errorType/userError.type')
class Login {
  async regisetController(ctx) {
    try {
      const { username, password, mobile } = ctx.request.body;
      const res = await registerService({ username, password, mobile });
      if(res) {
        ctx.body = {
          code: 200,
          msg: '注册成功',
          data: []
        }
      }else {
        ctx.body = REGISTERERROR
      }
    } catch (error) {
      ctx.body = {
        code: 200,
        msg: "login",
        data: error,
      };
      console.error("error", error);
    }
  }
}

module.exports = new Login();
