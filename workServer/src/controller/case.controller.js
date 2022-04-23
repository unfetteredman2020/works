const UUID = require('uuid')
const { addCompileService, getCompileService, addBranchCompileService, getCompileAndBranchCompileService, addChapterServeice, getAllClassificationService, addCaseService, getCaseListService, delService } = require('../service/case.service')
class CaseController {
  // 添加编
  async addCompileController(ctx, next) {
    try {
      const { user_id, text } = ctx.request.body
      let params = ctx.request.body
      params.compile_id = UUID.v1()
      const res = await addCompileService(params)
      // console.log('res', res)
      ctx.body = {
        code: 200,
        msg: '添加编成功',
        data: res
      }
    } catch (error) {
      console.error('error', error)
      ctx.body = {
        code: 400,
        msg: '添加编失败',
        data: error
      }
    }
  }
  // 获取编列表
  async getCompileController(ctx, next) {
    try {
      const res = await getCompileService(ctx.request.query.user_id)
      ctx.body = {
        code: 200,
        msg: '获取编列表成功',
        data: res
      }
    } catch (error) {
      console.error('error', error)
      ctx.body = {
        code: 400,
        msg: '获取编列表失败 ',
        data: error
      }
    }
  }
  // 添加分编
  async addBranchCompileController(ctx, next) {
    try {
      let params = ctx.request.body
      params.branchCompile_id = UUID.v1()
      const res = await addBranchCompileService(params)
      if (res) {
        ctx.body = {
          code: 200,
          msg: '添加分编成功',
          data: res
        }
      } else {
        ctx.body = {
          code: 400,
          msg: '添加分编失败了',
          data: res
        }
      }

    } catch (error) {
      console.error('error', error)
      ctx.body = {
        code: 400,
        msg: '添加分编失败',
        data: error
      }
    }
  }
  // 获取编和分编的分类选项
  async getCompileAndBranchCompileController(ctx, next) {
    try {
      const res = await getCompileAndBranchCompileService(ctx.request.query.user_id)
      ctx.body = {
        code: 200,
        msg: '获取编和章分类成功',
        data: res
      }
    } catch (error) {
      console.error('error', error)
      ctx.body = {
        code: 200,
        msg: '获取编和章分类成功',
        data: error
      }
    }
  }
  // 添加章
  async addChapterController(ctx, next) {
    try {
      let params = ctx.request.body
      params.chapter_id = UUID.v1()
      const res = await addChapterServeice(params)
      ctx.body = {
        code: 200,
        msg: '添加分编成功',
        data: res
      }
    } catch (error) {
      console.error('error', error)
    }
  }
  // 获取case 所属分类
  async getAllClassificationController(ctx, next) {
    try {
      const res = await getAllClassificationService(ctx.request.query.user_id)
      ctx.body = {
        code: 200,
        msg: '获取所属分类成功',
        data: res
      }
    } catch (error) {
      ctx.body = {
        code: 400,
        msg: '获取所属分类失败',
        data: error
      }
    }
  }
  // 添加case
  async addCaseController(ctx, next) {
    try {
      let params = ctx.request.body
      params.case_id = UUID.v1()
      const res = await addCaseService(params)
      if (res) {
        ctx.body = {
          code: 200,
          msg: '添加文章成功',
          data: res
        }
      } else {
        ctx.body = {
          code: 400,
          msg: '添加文章失败了',
          data: res
        }
      }
      
    } catch (error) {
      console.error('error', error)
      ctx.body = {
        code: 400,
        msg: '添加文章失败',
        data: error
      }
    }
  }
  // 获取case列表
  async getCaseListController(ctx, next) {
    try {
      const res = await getCaseListService(ctx.request.query.user_id)
      ctx.body = {
        code: 200,
        msg: '获取case列表成功',
        data: res
      }
    } catch (error) {
      ctx.body = {
        code: 200,
        msg: '获取case列表失败',
        data: error
      }
    }
  }
  // 删除case案例
  async delController(ctx, next) {
    try {
      const res = await delService(ctx.request.query)
      ctx.body = {
        code: 200,
        msg: '删除case成功',
        data: res
      }
    } catch (error) {
      ctx.body = {
        code: 400,
        msg: '删除case失败',
        data: error
      }
    }
  }
}

module.exports = new CaseController()