const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");


const LawCase = sequelize.define("LawCase", {
  // 在这里定义模型属性
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '用户ID'
  },
  lawCase_id: {
    type: DataTypes.STRING,
    // defaultValue: UUID.v1(),
    allowNull: false,
    comment: 'lawCaseID'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '标题'
  },
  content: {
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
  //   await LawCase.sync({ force: true });
  //   // 这里是代码
  // })();

module.exports = LawCase

