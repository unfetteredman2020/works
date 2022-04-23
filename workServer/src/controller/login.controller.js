var jwt = require("jsonwebtoken");
const { SECRETKEY, TIMEOUT } = require("../config/jwt.config");
const { findUser } = require("../service/user.service");
const { VERIFYUSERERROR } = require("../constant/errorType/userError.type");

class Register {
  async loginController(ctx) {
    try {
      const { mobile } = ctx.request.body
      const { dataValues: {password,createdAt, updatedAt,destroyTime, ...res} } = await findUser(mobile);
      console.log('first', res)
      console.log('password', password)
      console.log('res', res)
      const token = jwt.sign(res, SECRETKEY, { expiresIn: TIMEOUT });
      ctx.body = {
        code: 200,
        msg: '登录成功',
        token,
        data: res
      }
    } catch (error) {
      console.log('error', error)
      VERIFYUSERERROR.data = error
      ctx.body = VERIFYUSERERROR;
    }
  }
}

module.exports = new Register();
