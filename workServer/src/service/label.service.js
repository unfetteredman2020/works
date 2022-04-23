const { Op } = require("sequelize");

let  Label = require('../model/label.model')
var UUID = require('uuid');
class LabelService {
  async addLabelService(label) {
    // console.log('UUID.v1()', UUID.v1())
    label.label_id = UUID.v1()
    return await Label.create(label)
  }
  async getLabelListService(params) {
    return await Label.findAll({
      where: params
    });
  }
  async delLabelService(label_id) {
    return await Label.destroy({
      where: {
        label_id
      }
    });
  }
}
module.exports = new LabelService();