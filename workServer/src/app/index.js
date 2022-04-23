const path = require("path");

const Koa = require("koa");

const koaBody = require("koa-body");

const parameter = require('koa-parameter')

const cors = require('koa2-cors')

const static = require('koa-static')
const log = require("../logger/index");

const router = require("../router/index");

const app = new Koa();

app.use(cors({
  origin: function(ctx) { //设置允许来自指定域名请求
    console.log('ctx.url', ctx.url)
      // if (ctx.url === '/') {
      //     return '*'; // 允许来自所有域名请求
      // }
      return '*'; 
      // return 'http://127.0.0.1:8080/'; //只允许http://localhost:8080这个域名的请求
  },
  maxAge: 5, //指定本次预检请求的有效期，单位为秒。
  credentials: true, //是否允许发送Cookie
  // allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
  // allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
  // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
}))

app.use(
  koaBody({
    multipart: true,
    formidable: {
      // uploadDir: path.join(__dirname, "../../public/upload"),
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024,
    },
    parsedMethods: ["POST", "PUT", "PATCH", "GET", "DELETE"],
  })
);

app.use(parameter(app))

app.use(static(path.join(__dirname, '../../public/')))
log
  .then((result) => {
    // console.log('result', result)
    for (const key in result) {
      app.on(key, result[key]);
    }
  })
  .catch((err) => {
    console.log("err", err);
  });

app.use(router.routes());

module.exports = app;





