const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");


const Compile = sequelize.define("compile", {
  // 在这里定义模型属性
  compile_id: {
    type: DataTypes.STRING,
    allowNull: false,
    // defaultValue: UUID.v1(),
    comment: '编ID'
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '用户ID'
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '编标题'
  }
},
  {
    timestamps: true,
    // paranoid: true, //不物理删除
    // deletedAt: 'destroyTime'
  }
);

  // (async () => {
  //   await Compile.sync({ force: true });
  //   // 这里是代码
  // })();

module.exports = Compile

