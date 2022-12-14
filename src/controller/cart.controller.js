const {addUpdate,findCarts,updateCarts,removeCarts} = require('../service/cart.service')

class Cart{
	async add(ctx){
		
		 const user_id = ctx.state.user.id
		 const goods_id = ctx.request.body.goods_id
		let res = await addUpdate(user_id,goods_id)
		if(res){
			ctx.body = {
				code: 0,
				message: '添加到购物车成功',
				result: res,
			}
		}
	}
	async findAll(ctx){
		const { pageNum = 1, pageSize = 10 } = ctx.request.query
		    // 2. 操作数据库
		    const res = await findCarts(pageNum, pageSize)
		    // 3. 返回结果
			console.log(res)
		    ctx.body = {
		      code: 0,
		      message: '获取购物车列表成功',
		      result: res,
		    }
			
	}
	async update(ctx){
		const {id} = ctx.params;
		const { number, selected } = ctx.request.body;
		 if (number === undefined && selected === undefined) {
		       cartFormatError.message = 'number和selected不能同时为空'
		       return ctx.app.emit('error', cartFormatError, ctx)
		 }
		  // 2. 操作数据库
		     const res = await updateCarts({ id, number, selected })
		     // 3. 返回数据
		     ctx.body = {
		       code: 0,
		       message: '更新购物车成功',
		       result: res,
		     }
		
	}
	async remove(ctx){
		const { ids } = ctx.request.body
		const res = await removeCarts(ids)
		ctx.body = {
			   code: 0,
			   message: '删除购物车成功',
			   result: res,
			}
	}
}

module.exports = new Cart()