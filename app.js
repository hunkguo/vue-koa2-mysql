const Koa = require('koa')
const koa_bodyparser = require('koa-bodyparser')
const json =require('koa-json')
const logger = require('koa-logger')
const koa_router =require('koa-router')
const cors = require('koa2-cors');
const jwt = require('koa-jwt');
const path = require('path');
const serve = require('koa-static');
const historyApiFallback = require('koa2-history-api-fallback');
const app = new Koa()
app.use(koa_bodyparser())
app.use(json())
app.use(logger())
app.use(cors())
const router = koa_router();




app.use(async function(ctx, next){
    let start = new Date;
    await next();
    let ms =new Date - start;
    console.log('%s %s - %s', ctx.method, ctx.url, ms);
});





app.on('error', function(err, ctx){
    console.log('server error', err);
});

const auth = require('./server/routes/auth.js')
router.use('/auth', auth.routes());
const home = require('./server/routes/home.js')
router.use('/', home.routes())
const api = require('./server/routes/api.js')
router.use('/api',jwt({secret: 'vue-koa-demo'}), api.routes())

app.use(async function(ctx, next){  //  如果JWT验证失败，返回验证失败信息
  try {
    await next();
  } catch (err) {
    if (401 === err.status) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      };
      console.log(ctx.body)
    } else {
      throw err;
    }
  }
})

app.use(router.routes()).use(router.allowedMethods())
app.use(historyApiFallback());
app.use(serve(path.resolve('dist'))); // 将webpack打包好的项目目录作为Koa静态文件服务的目录

app.listen(8889,() => {
    console.log('Koa is listening in 8889');
});



module.exports = app;
