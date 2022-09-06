const validator = (ctx,next)=>{
	console.log(ctx)
	ctx.body ='validator'
}

module.exports={
	validator
}