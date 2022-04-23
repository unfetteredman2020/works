const { Sequelize } = require('sequelize');

// 方法 3: 分别传递参数 (其它数据库)
const sequelize = new Sequelize('workServe', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql' /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
});


// sequelize.authenticate().then(() => {
//   console.log('success');
// }).catch((err) => {
//   console.log('sqlerr', err);
// });

module.exports = sequelize