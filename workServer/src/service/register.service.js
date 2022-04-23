const UserModle = require("../model/user.model");
class LoginService {
  async registerService(user) {
    return await UserModle.create(user)
  }
}
module.exports = new LoginService();
