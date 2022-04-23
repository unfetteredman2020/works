
const fs = require('fs')
const path = require('path')
var UUID = require('uuid');
const { HOST, PORT } = require('../config/app.config')
// const { htmlTemplate } = require('../template/HtmlTemplate')
const { addArticleService, getAllArticleService, addCommentService } = require('../service/article.service')
class ArticleController {
  async addArticleController(ctx, next) {
    try {
      const { title, content, user_id, username } = ctx.request.body

      // 上传文章封面
      const file = ctx.request.files.file;
      console.log('file', file)
      let articleHash = title + UUID.v1()
      let articleName = articleHash + file.name
      let link = path.join(__dirname, '../../public/static/upload/articleCover/' + articleName)

      const reader = fs.createReadStream(file.path);
      let upstream = fs.createWriteStream(link);
      // 写入文件流
      reader.pipe(upstream);
      // 创建html模版文件
      // fs.writeFileSync(path.join(__dirname, '../../public/static/template/index.html'), htmlTemplate(title, content));

      let params = ctx.request.body
      params.link = `http://${HOST}:${PORT}/static/upload/articleCover/${articleName}`
      params.article_id = articleHash

      const res = await addArticleService(params)
      // console.log('res', res)
      if (res) {
        ctx.body = {
          code: 200,
          msg: '添加成功',
          data: res
        }
      } else {
        ctx.body = {
          code: 404,
          msg: '添加失败',
          data: res
        }
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
  async getAllArticleController(ctx, next) {
    try {
      console.log('ctx.request.query', ctx.request.query)
      const {  user_id, article_id } = ctx.request.query
      let params = {}
      user_id && Object.assign(params, {user_id})
      article_id && Object.assign(params, {article_id})
      console.log('params', params)
      const res = await getAllArticleService(params)
      let newData = res
      if(res) {
        newData.forEach(item=>{
          if(item.comments) {
            item.comments = JSON.parse(item.comments)
          }
        })
      }
      ctx.body = {
        code: 200,
        msg: '获取成功',
        data: newData
      }
    } catch (error) {
      console.error('getAllArticleController', error)
      ctx.body = {
        code: 404,
        msg: '获取失败',
        data: error
      }
    }
  }
  async addCommentController(ctx, next) {
    try {
      const { article_id, comments,  } = ctx.request.body
      const res = await addCommentService(article_id, comments)
      ctx.body = {
        code: 200,
        msg: '添加评论成功',
        data: res
      }
    } catch (error) {
      console.error('error', error)
      ctx.body = {
        code: 400,
        msg: '添加评论失败',
        data: error
      }
    }
  }
}

module.exports = new ArticleController()