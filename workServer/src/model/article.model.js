const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");


const Article = sequelize.define("articles", {
  // 在这里定义模型属性
   article_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '文章ID'
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '用户ID'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '文章标题'
  },
   author: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '作者'
  },
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
    comment: '文章内容'
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '保存地址'
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '评论'
  },
  like_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    comment: '点赞数量'
  }
},
  {
    timestamps: true,
    // paranoid: true, //不物理删除
    // deletedAt: 'destroyTime'
  }
);
  // Article.sync({ force: true });
  // (async () => {
  //   await Article.sync({ force: true });
  //   // 这里是代码
  // })();

module.exports = Article

