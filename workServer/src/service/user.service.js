const User = require("../model/user.model");

class UserModel {
  /**
   * 查询用户是否存在
   * @param {*} mobile
   * @returns User
   */
  async findUser(mobile, user_id) {
    let params = {}
    if(user_id) {
      params.user_id = user_id
    }else {
      params.mobile = mobile
    }
    return await User.findOne({ where: params });
  }

  /**
   * 修改用户信息
   * @param {*} user_id
   * @param {*} params
   * @returns User
   */
  async changeUserInfo(user_id, params) {
    console.log('params :>> ', params);
    const res = await User.findOne({where: {
      password: params.oldPassword,
      user_id
    }})
    console.log('res--- :>> ', res);
    if(!res) {
      return {
        code: 400,
        msg: '原密码错误',
      }
    }
    if(res && res.password !== params.oldPassword ){
      return {
        code: 400,
        msg: '原密码错误',
      }
    }
    params.password = params.newPassword
    console.log('res :>> ', res);
    return await User.update(params, {
      where: {
        user_id,
      },
    });
  }
}

module.exports = new UserModel();
