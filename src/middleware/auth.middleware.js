const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
const { tokenExpiredError, invalidToken,hasNotAdminPermission } = require('../constant/err.type')
const auth = async (ctx, next)=>{
		
		const { authorization} = ctx.request.header
	  const token = authorization ? authorization.replace('Bearer ', '') : ''
	  
	 // const { authorization } = ctx.request.header.--header
	 // console.log(ctx.request.header.authorization)
	   try {
	      const user = jwt.verify(token, JWT_SECRET)
	      ctx.state.user = user
	    } catch (err) {
	      switch (err.name) {
	        case 'TokenExpiredError':
	          console.error('token已过期', err)
	          return ctx.app.emit('error', tokenExpiredError, ctx)
	        case 'JsonWebTokenError':
			console.log('无效的')
	          console.error('无效的token', err)
	          return ctx.app.emit('error', invalidToken, ctx)
	      }
	    }
	await next()
}
const hadAdminPermission = async (ctx, next) => {
  const { is_admin } = ctx.state.user
	
  if (!is_admin) {
    console.error('该用户没有管理员的权限', ctx.state.user)
    return ctx.app.emit('error', hasNotAdminPermission, ctx)
  }

  await next()
}
module.exports={
	auth,
	hadAdminPermission
}