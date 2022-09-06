const validator = async (ctx,next)=>{
	try{
		ctx.verifyParams({
		     goods_name: { type: 'string', required: true },
		     goods_price: { type: 'string', required: true },
		     goods_num: { type: 'string', required: true },
		     goods_img: { type: 'string', required: true },
		   }) 
	}catch(err){
		console.error(err)
		// goodsFormatError.result = err
		return ctx.app.emit('error', err, ctx)
	}
	await next()
}

module.exports = {
	validator
}