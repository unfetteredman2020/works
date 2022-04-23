const { Op } = require("sequelize");
const LawCase = require('../model/lawCase.model');

class LawCaseService {
  async addLawCaseService(lawCase) {
   return LawCase.create(lawCase)
  }
  async getLawCaseService(params) {
    // console.log('params', params)
    return LawCase.findAll({
      where: params
    })
  }
  async getLawCaseDetailService(params) {
    return LawCase.findOne({
      where: params
    })
  }
}


module.exports = new LawCaseService();