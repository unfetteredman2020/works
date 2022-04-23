const { findUser } = require("../service/user.service");
const { RegMobile } = require("../utils/reg");
const { VERIFYUSEREXIST, VERIFYUSERERROR } = require("../constant/errorType/userError.type");
const VerifyUser = async (ctx, next) => {
  try {
    const { mobile } = ctx.request.body;
   
    if (!RegMobile(mobile)) {
      console.log('mobile', mobile)
      return (ctx.body = {
        code: 400,
        msg: "参数错误",
        data: ctx.request.body,
      });
    }
    const res = await findUser(mobile);
    if (res) {
      return (ctx.body = VERIFYUSEREXIST);
    } else {
      console.log("next", next);
      await next();
    }
  } catch (error) {
    console.error("error", error);
    ctx.app.emit("errorHanle", error, ctx);
    ctx.body = VERIFYUSERERROR;
  }
};
const validate = (rules) => {
  return async (ctx, next) => {
    try {
      const { mobile, password } = ctx.request.body;
      console.log('mobile', mobile)
      console.log('ctx.request.body', ctx.request.body)
      if (!mobile || !RegMobile(mobile)) {
        return (ctx.body = {
          code: 400,
          msg: "手机号码不正确，请确认参数",
          data: ctx.request.body,
        });
      }
      const res = await findUser(mobile);
      if (!res || !res.dataValues) {
        return (ctx.body = {
          code: 404,
          msg: "用户未注册",
          data: [],
        });
      }
      console.log('res.dataValues.password', res.dataValues.password)
      console.log('password', password)
      if (res.dataValues && res.dataValues.password != password) {
        return ctx.body = {
          code: 300,
          msg: "密码输入不正确，请重新输入",
          data: [],
        }
      }
      await next();
    } catch (error) {
      return (ctx.body = {
        code: 400,
        msg: "参数错误",
        data: error,
      });
    }
  };
};
module.exports = {
  VerifyUser,
  validate,
};
