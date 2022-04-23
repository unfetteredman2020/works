var Koa = require('koa');
var Router = require('koa-router');
// const { VerifyUser, validate } = require('../middleware/user.middleware')
// const { addLabel, getLabelList, delLabel } = require('../controller/label.controller')
const { addLawCaseController, getLawCaseController, getLawCaseDetailController } = require('../controller/lawCase.controller')
// const { changeUserInfo, getUserInfoController } = require('../controller/user.controller')
var router = new Router({prefix: '/lawCase'});

router.get("/",getLawCaseController);

router.post('/add', addLawCaseController);


router.get('/detail', getLawCaseDetailController);
router.get('/del', );

module.exports = router