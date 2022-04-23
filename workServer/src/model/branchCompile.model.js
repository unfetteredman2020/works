const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
// const UUID = require('uuid')



const BranchCompile = sequelize.define("branchCompile", {
  // 在这里定义模型属性
  compile_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '编ID'
  },
  branchCompile_id: {
    type: DataTypes.STRING,
    allowNull: false,
    // defaultValue: UUID.v1(),
    comment: '分编ID'
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '用户ID'
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '分编标题'
  }
},
  {
    timestamps: true,
    // paranoid: true, //不物理删除
    // deletedAt: 'destroyTime'
  }
);

  // (async () => {
  //   await BranchCompile.sync({ force: true });
  //   // 这里是代码
  // })();

  module.exports = BranchCompile
