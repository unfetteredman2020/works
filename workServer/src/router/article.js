
var Koa = require('koa');
var Router = require('koa-router');
// const { VerifyUser, validate } = require('../middleware/user.middleware')
const { addArticleController, getAllArticleController, addCommentController } = require('../controller/article.controller')

var router = new Router({prefix: '/article'});

router.post('/add',addArticleController);

router.get('/del',);


router.get('/getAll',getAllArticleController);

router.post('/addComment', addCommentController)

module.exports = router