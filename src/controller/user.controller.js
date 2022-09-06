const jwt = require('jsonwebtoken')
const { createUser,getUerInfo,updateById } = require('../service/user.service')
const { userRegisterError } = require('../constant/err.type')
const { JWT_SECRET } = require('../config/config.default')
class UserController{
	async register(ctx,next){
		 const { user_name, password } = ctx.request.body
		  try{
			  const res = await createUser(user_name, password)
			  ctx.body = {
			        code: 0,
			        message: '用户注册成功',
			        result: {
			          id: res.id,
			          user_name: res.user_name,
			        },
			      }
		  }catch(err){
			  console.log(err)
			        ctx.app.emit('error', userRegisterError, ctx)
		  }
		  
		 // if (!user_name || !password) {
		 //       console.error('用户名或密码为空', ctx.request.body)
		 //       ctx.status = 400
		 //       ctx.body = {
		 //         code: '10001',
		 //         message: '用户名或密码为空',
		 //         result: '',
		 //       }
		 //       return
		 //     }
			//   // 合理性
			//  if (await getUerInfo({ user_name })) {
				
			//    ctx.status = 409
			//    ctx.body = {
			//      code: '10002',
			//      message: '用户已经存在',
			//      result: '',
			//    }
			//    return
			//  }
		 
			
	} 
	
	async login(ctx,next){
			const { user_name } = ctx.request.body;
			try{
				const { password, ...res } = await getUerInfo({user_name})
				
				ctx.body = {
					code: 0,
					message: '用户登录成功',
					result: {
					    token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
					},
				}
			}catch(err){
				console.error('用户登录失败', err)
			}
			
			
	}
	async changePassword(ctx,next){
		ctx.body = ctx.state.user
		const {user} = ctx.state;
		
		try{
			await updateById({id:user.id,password:ctx.request.body.password})
			ctx.body = {
			  code: 0,
			    message: '修改密码成功',
			    result: '',
			}      
		}catch(err){
			ctx.body = {
			    code: '10007',
			    message: '修改密码失败',
			    result: '',
			}
		}
		
		
	}
	
}

module.exports = new UserController()