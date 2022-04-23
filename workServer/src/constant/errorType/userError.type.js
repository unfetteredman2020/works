const prefix = 'VERIFY'
module.exports = {
  VERIFYUSEREXIST: {
    code: 409,
    msg: "该手机号已注册，请登录",
    data: [],
  },
  REGISTERERROR: {
    code: 409,
    msg: "注册失败，请重试",
    data: [],
  },
  [`VERIFYLOGINPARAMS`]: {
    code: 400,
    msg: "参数错误，请检查参数",
    data: [],
  },
  [`VERIFYUSERERROR`]: {
    code: 500,
    msg: "查询用户出错了，请重试",
    data: [],
  }
};
