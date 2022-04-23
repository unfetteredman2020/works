const { addLabelService, getLabelListService, delLabelService } = require('../service/label.service')

class LabelController {
  async addLabel(ctx, next) {
    try {
      const { user_id, label_name, username } = ctx.request.body
      const res = await addLabelService(ctx.request.body)
      if (res) {
        ctx.body = {
          code: 200,
          msg: '添加成功',
          data: []
        }
      } else {
        ctx.body = {
          code: 404,
          msg: '添加失败',
          data: []
        }
      }
    } catch (error) {
      console.error('error', error)
      ctx.body = {
        code: 404,
        msg: '添加失败',
        data: error
      }
    }
  }
  async getLabelList(ctx, next) {
    try {
      console.log('ctx.request.query', ctx.request.query.user_id)
      const res = await getLabelListService(ctx.request.query.user_id)
      // console.log('res', res)
      ctx.body = {
        code: 200,
        msg: '获取标签列表成功',
        data: res
      }
    } catch (error) {
      console.log('error', error)
      ctx.body = {
        code: 404,
        msg: '添加失败',
        data: error
      }
    }
  }
  async delLabel(ctx, next) {
    try {
      console.log('ctx.request.query', ctx.request.query.label_id)
      const res = await delLabelService(ctx.request.query.label_id)
      // console.log('res', res)
      ctx.body = {
        code: 200,
        msg: '删除标签列表成功',
        data: []
      }
    } catch (error) {
      console.log('error', error)
      ctx.body = {
        code: 404,
        msg: '删除失败',
        data: error
      }
    }
  }
}

module.exports = new LabelController()