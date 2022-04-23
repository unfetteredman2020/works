const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");


const Case = sequelize.define("Case", {
  // 在这里定义模型属性
  chapter_id: {
    type: DataTypes.STRING,
    // defaultValue: UUID.v1(),
    allowNull: false,
    comment: '编ID'
  },
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
  case_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'caseID'
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '作者'
  },
  comments: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
    comment: '章内容'
  }
},
  {
    timestamps: true,
    // paranoid: true, //不物理删除
    // deletedAt: 'destroyTime'
  }
);

  // (async () => {
  //   await Case.sync({ force: true });
  //   // 这里是代码
  // })();

module.exports = Case

