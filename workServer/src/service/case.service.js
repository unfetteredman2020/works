const Compile = require('../model/compile.model') //编

const BranchCompile = require('../model/BranchCompile.model') //章

const Chapter = require('../model/chapter.model')

const Case = require('../model/case.model') //章内容

class CaseService {
  // 添加编
  async addCompileService(params) {
    return await Compile.create(params)
  }
  // 获取编列表
  async getCompileService(user_id) {
    return await Compile.findAll({
      where: {
        user_id
      }
    })
  }
  // 添加分编
  async addBranchCompileService(params) {
    return await BranchCompile.create(params)
  }

  // 获取编和分类
  async getCompileAndBranchCompileService(user_id) {
    try {
      const compile = await Compile.findAll({
        where: {
          user_id
        }
      })
      // console.log('--chapter--', chapter)
      let typeArr = []
      if (compile.length) {
        for (const item of compile) {
          let parent = {
            value: item.compile_id,
            label: item.text,
          }
          console.log('--item--', item.compile_id)
          const branchCompile = await BranchCompile.findAll({
            where: {
              compile_id: item.compile_id,
              user_id
            }
          })
          // console.log('--compile--', compile)
          let children = []
          branchCompile.forEach(itm => {
            console.log('-----itm-----', itm)
            let obj = {};
            obj.value = itm.branchCompile_id;
            obj.label = itm.branchCompile_text
            children.push(obj)
          })
          children.length && (parent.children = children)
          console.log('-----children-----', children)
          typeArr.push(parent)
        }
      }
      console.log('-------returen----')
      return typeArr
    } catch (error) {
      console.error('error', error)
      return new Error(error)
    }
  }
  // 添加章
  async addChapterServeice(params) {
    return await Chapter.create(params)
  }
  // 获取case 的所属分类
  async getAllClassificationService(user_id) {
    try {
      const compile = await Compile.findAll({ where: { user_id } })
      let typeArr = []
      for (const item of compile) {
        let parent = {
          value: item.compile_id,
          label: item.text,
        }
        // console.log('--item--', item.compile_id)
        const branchCompile = await BranchCompile.findAll({
          where: {
            compile_id: item.compile_id
          }
        })
        // console.log('--compile--', compile)
        let children = []
        for (const itm of branchCompile) {
          // console.log('-----itm-----', itm)
          let obj = {};
          obj.value = itm.branchCompile_id;
          obj.label = itm.branchCompile_text
          children.push(obj)
          const chapter = await Chapter.findAll({
            where: {
              branchCompile_id: itm.branchCompile_id
            }
          })
          let lastChild = []
          chapter.forEach(it => {
            let obj = {};
            obj.value = it.chapter_id;
            obj.label = it.chapter_text
            lastChild.push(obj)
          })
          lastChild.length && (obj.children = lastChild)
        }
        children.length && (parent.children = children)
        // console.log('-----children-----', children)
        typeArr.push(parent)
      }
      return typeArr
    } catch (error) {

      console.error('error')
    }
  }
  // 添加案例
  async addCaseService(params) {
    return await Case.create(params)
  }
  async getCaseListService(user_id) {
    return await Case.findAll({
      where: {
        user_id
      }
    })
  }
  async delService(params) {
    return await Case.destroy({
      where: params,
      force: true
    });
  }
}

module.exports = new CaseService()