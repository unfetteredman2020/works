var Koa = require('koa');
var Router = require('koa-router');
const { VerifyUser, validate } = require('../middleware/user.middleware')
const { regisetController } = require('../controller/register.controller')
const { loginController } = require('../controller/login.controller')
const { changeUserInfo, getUserInfoController } = require('../controller/user.controller')
var router = new Router({prefix: '/user'});

router.post('/login',validate({mobile: 'string', password: 'string'}), loginController);

router.post('/register', VerifyUser, regisetController);


router.get("/", (ctx, next) => {
  console.log("/");
  ctx.app.emit("infoHandle", ctx, ctx);
  ctx.app.emit("errorHand", { code: 40001, msg: "test errorHand" }, ctx);
});

router.post("/updateUserInfo", changeUserInfo);

router.get("/getUserInfo", getUserInfoController);


module.exports = router