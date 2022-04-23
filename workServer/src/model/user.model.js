const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
var UUID = require('uuid');
const User = sequelize.define("User",{
    // 在这里定义模型属性
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: UUID.v1(),
      comment: '用户ID'
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '用户名称'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '密码'
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '用户手机号'
    },
    avatar: {
      type: DataTypes.STRING,
        allowNull: true,
        comment: '头像'
    }
  },
  {
    timestamps: true,
    paranoid: true,
    deletedAt: 'destroyTime'
  }
);

// (async () => {
//     await User.sync({ force: true });
//     // 这里是代码
//   })();

module.exports = User