
var Koa = require('koa');
var Router = require('koa-router');
// const { VerifyUser, validate } = require('../middleware/user.middleware')
const { addCompileController, getCompileController, addBranchCompileController, getCompileAndBranchCompileController, addChapterController, getAllClassificationController, addCaseController, getCaseListController } = require('../controller/case.controller')

var router = new Router({prefix: '/case'});

router.post('/addCompile',addCompileController);

router.get('/getCompile', getCompileController)

router.post('/addBranchCompile', addBranchCompileController)

// 获取编和分编的分类选项
router.get('/getClassification', getCompileAndBranchCompileController);

// 添加章
router.post('/addChapter', addChapterController)

// 获取case的所属分类
router.get('/getAllClassification', getAllClassificationController);

// 添加case
router.post('/addCase', addCaseController)

// 获取case列表
router.get('/getCaseList', getCaseListController);


// router.get('/del',del);

module.exports = router