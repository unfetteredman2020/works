
const Article = require('../model/article.model')
class ArticleService {
  async addArticleService(params) {
    return await Article.create(params)
  }
  async getAllArticleService(params) {
    return await Article.findAll({
      where: params
    })
  }
  async addCommentService(article_id, comments) {
   try {
    const res = await Article.findAll({
      where: {
        article_id
      }
    })
    console.log('---res---', res[0].comments)
    if(res) {
      let newComment = []
      res && res[0].comments && ( newComment = JSON.parse(res[0].comments) )
      newComment.push(comments)
      console.log('newComment', newComment)
      return await Article.update({ comments: JSON.stringify(newComment) }, {
        where: {
          article_id
        }
      }); 
    }else {
      return null
    }
   } catch (error) {
     console.error('addCommentService error', error)
    return error
   }
  }
}

module.exports = new ArticleService()