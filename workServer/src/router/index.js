const Router = require('koa-router');
const {readDirect } =require('../utils/file')
const router = new Router();

readDirect(__dirname).then(res=> {
  // console.log('route', res)
  res.forEach(item => {
    if(item !== 'index.js') {
      let r = require('./'+item)
      router.use(r.routes())
    }
  });
})
module.exports = router