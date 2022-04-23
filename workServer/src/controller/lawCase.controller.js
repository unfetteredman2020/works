const { addLawCaseService, getLawCaseService,  getLawCaseDetailService } = require('../service/lawCase.service');
var UUID = require('uuid');

class LawCaseController {
  async  addLawCaseController(ctx, next) {
    try {
      const params = ctx.request.body
      params.lawCase_id = UUID.v1()
      console.log('params', params)
      const res = await addLawCaseService(params)
      ctx.body = {
        code: 200,
        msg: '添加法律案例成功',
        data: res
      }
    } catch (error) {
      console.error('error', error)
      ctx.body = {
        code: 400,
        msg: '添加法律案例失败 ',
        data: error
      }
    }
  }
  async getLawCaseController(ctx, next) {
    try {
      const res = await getLawCaseService(ctx.request.query)
      console.log('res11', res)
      ctx.body = {
        code: 200,
        msg: '获取法律案例成功',
        data: res
      }
    } catch (error) {
      console.error('error', error)
      ctx.body = {
        code: 400,
        msg: '获取法律案例失败 ',
        data: error
      }
    }
  }
  async getLawCaseDetailController(ctx, next ) {
    try {
      const res = await getLawCaseDetailService(ctx.request.query)
      ctx.body = {
        code: 200,
        msg: '获取详情成功',
        data: res
      }
    } catch (error) {
      console.error('error', error)
      ctx.body = {
        code: 400,
        msg: '获取详情失败 ',
        data: error
      }
    }
  }
}

module.exports = new LawCaseController()