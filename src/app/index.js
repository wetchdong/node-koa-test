const path = require('path')
const Koa = require('koa');
const app = new Koa();
const KoaBody = require('koa-body')
const KoaStatic = require('koa-static')
const parameter = require('koa-parameter')

const errHandler = require('./errHandler')
const router = require('../router')
// const userRouter = require('../router/user.route');
// const goodsRouter = require('../router/goods.route')

app.use(KoaBody({
	 multipart: true,
	  formidable: {
	  // 在配制选项option里, 不推荐使用相对路径
	    // 在option里的相对路径, 不是相对的当前文件. 相对process.cwd()
	    uploadDir: path.join(__dirname, '../upload'),
	    keepExtensions: true,
	  },
	  parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],     
}))
app.use(KoaStatic(path.join(__dirname, '../upload')))
app.use(parameter(app))
app.use(router.routes()).use(router.allowedMethods())

// app.use(goodsRouter.routes())
// app.use(userRouter.routes());


// 统一的错误处理
app.on('error', errHandler)
module.exports=app;