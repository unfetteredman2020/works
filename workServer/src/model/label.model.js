const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Label = sequelize.define("article_label", {
  // 在这里定义模型属性
  label_id: {
    type: DataTypes.STRING,
    allowNull: false,
    // defaultValue: uuidv4(),
    comment: '标签ID'
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '用户ID'
  },
  label_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '用户名称'
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '创建者'
  }
},
  {
    timestamps: true,
    // paranoid: true, //不物理删除
    // deletedAt: 'destroyTime'
  }
);

// (async () => {
//     await Label.sync({ force: true });
//     // 这里是代码
//   })();

module.exports = Label