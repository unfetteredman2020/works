const jwt = require("jsonwebtoken");
const { SECRETKEY } = require("../config/jwt.config");
const auth = (ctx, next) => {
  try {
    const { authorization } = ctx.request.header;
    if (!authorization) {
      return (ctx.body = {
        code: 404,
        msg: "authorization header is required",
        data: [],
      });
    }
    const token = authorization.replace("Bearer ", "");
    var user = jwt.verify(token, SECRETKEY);
    ctx.state.user = user;
  } catch (error) {
    console.log(`auth err`, err);
    switch (error.name) {
      case "TokenExpiredError":
        console.error("error", "token过期", err);
        return ctx.body = {
            code: 404,
            msg: "token过期",
            data: [],
          }
      case "JsonWebTokenError":
        console.error("error", "token验证失败", err);
        return ctx.body = {
            code: 404,
            msg: "token验证失败",
            data: [],
          }
    }
  }
};

module.exports = {
  auth,
};
