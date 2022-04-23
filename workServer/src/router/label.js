var Koa = require('koa');
var Router = require('koa-router');
// const { VerifyUser, validate } = require('../middleware/user.middleware')
const { addLabel, getLabelList, delLabel } = require('../controller/label.controller')
// const { loginController } = require('../controller/login.controller')
// const { changeUserInfo, getUserInfoController } = require('../controller/user.controller')
var router = new Router({prefix: '/label'});

router.get("/",getLabelList);

router.post('/add', addLabel);

router.get('/del', delLabel);

module.exports = router