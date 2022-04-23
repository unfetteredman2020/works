const fs = require("fs");
const path = require('path')
const { changeUserInfo, findUser } = require('../service/user.service')
class UserController {
  async changeUserInfo(ctx, next) {
    const { username, mobile, oldPassword,newPassword, user_id } = ctx.request.body
    const file = ctx.request.files.file;
    let params = {}
    username && Object.assign(params, { username })
    mobile && Object.assign(params, { mobile })
    oldPassword && Object.assign(params, { oldPassword })
    newPassword && Object.assign(params, { newPassword })
    
    if (file) {

      const reader = fs.createReadStream(file.path);
      let filePath = path.join(__dirname, '../../public/static/upload/avatar')
      let fileResource = filePath + `/${file.name}`;
      const uploadUrl = "http://127.0.0.1:3001/static/upload/avatar";
      if (!fs.existsSync(filePath)) {
        //判断staic/upload文件夹是否存在，如果不存在就新建一个
        fs.mkdir(filePath, async (err) => {
          if (err) {
            console.error('err', err)
            throw new Error(err);
          } else {
            try {
              let upstream = fs.createWriteStream(fileResource);
              reader.pipe(upstream);
              Object.assign(params, { avatar: uploadUrl + `/${file.name}` })
              const res = await changeUserInfo(user_id, params)
              console.log('res', res)
              if (res) {
                ctx.response.body = {
                  code: 200,
                  msg: '修改成功',
                  url: uploadUrl + `/${file.name}`, //返给前端一个url地址
                  data: []
                };
              } else {
                ctx.response.body = {
                  code: 404,
                  msg: '修改失败',
                  data: []
                };
              }
            } catch (error) {
              console.error('changeUserInfo error', error)
            }
          }
        });
      } else {
        try {
          console.log('fileResource', fileResource)
          let upstream = fs.createWriteStream(fileResource);
          reader.pipe(upstream);
          Object.assign(params, { avatar: uploadUrl + `/${file.name}` })
          console.log('params', params)
          const res = await changeUserInfo(user_id, params)
          console.log('res1', res)
          
          if (res) {
            ctx.response.body = {
              code: 200,
              msg: '修改成功',
              url: uploadUrl + `/${file.name}`, //返给前端一个url地址
              data: []
            };
          } else {
            ctx.response.body = {
              code: 404,
              msg: '修改失败',
              data: []
            };
          }
        } catch (error) {
          console.error('no direact error', error)
        }
      }
    } else {
      try {
        const res = await changeUserInfo(user_id, params)
        if(res && res.code) {
          return  ctx.response.body = res
        }
        console.log('res3', res)
        if (res) {
          ctx.response.body = {
            code: 200,
            msg: '修改成功',
            data: []
          };
        } else {
          ctx.response.body = {
            code: 404,
            msg: '修改失败',
            data: []
          };
        }
      } catch (error) {
        console.error('no direact error', error)
      }
    }


  }
  async getUserInfoController(ctx, next) {
    console.log('ctx.request.query', ctx.request.query)
    console.log('ctx.request.query', ctx.request)

    const { user_id } = ctx.request.query
    try {
      const res = await findUser('', user_id)
      console.log('res', res)
      ctx.body = {
        code: 200,
        data: res,
        msg: '获取用户信息成功'
      }
    } catch (error) {
      ctx.body = {
        code: 404,
        data: error,
        msg: '获取用户信息失败'
      }
    }
  }
}

module.exports = new UserController()