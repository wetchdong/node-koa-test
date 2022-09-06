const path = require('path')
const {
  fileUploadError,
  publishGoodsError,
} = require('../constant/err.type')
const {createGoods,updateGoods,removeGoods,restoreGoods,findGoods} = require('../service/goods.service')

class goodsController{
	async upload(ctx,next){
		
		const { file } = ctx.request.files
		const fileTypes = ['image/jpeg', 'image/png','image/jpg']
		if(file){
			if(!fileTypes.includes(file.type)){
				ctx.body = {
				   code: 0,
				   message: '商品图片上传成功',
				   result: {
				     goods_img:path.basename(file.filepath),
					 ...file
				   },
				}       
			}else{
				return ctx.app.emit('error', fileUploadError, ctx)
			}
		}
			
	}
	async create(ctx,next){
		try{
		const {createdAt, updatedAt, ...res} = await createGoods(ctx.request.body)
			ctx.body={
				code: 0,
				message: '添加商品成功',
				result: res,      
			}
		}catch(err){
			console.error(err)
			 return ctx.app.emit('error', publishGoodsError, ctx)
		}
			
	}
	async update(ctx,next){
		try{
			const res = await updateGoods(ctx.params.id, ctx.request.body)
			if (res) {
			        ctx.body = {
			          code: 0,
			          message: '修改商品成功',
			          result: res,
			        }
			      } else {
			        return ctx.app.emit('error', invalidGoodsID, ctx)
			      }
		}catch(err){
			 console.error(err)
		}
	}
	async remove(ctx){
		
		try{
			const res = await removeGoods(ctx.params.id)
				if (res) {
			      ctx.body = {
			        code: 0,
			        message: '下架商品成功',
			        result: '',
			      }
			    } else {
			      return ctx.app.emit('error', invalidGoodsID, ctx)
			    }
		}catch(err){
			console.error(err)
		}
	}
	async restore(ctx) {
	    const res = await restoreGoods(ctx.params.id)
	    if (res) {
	      ctx.body = {
	        code: 0,
	        message: '上架商品成功',
	        result: '',
	      }
	    } else {
	      return ctx.app.emit('error', invalidGoodsID, ctx)
	    }
	  }
	  async findAll(ctx) {
	      // 1. 解析pageNum和pageSize
	      const { pageNum = 1, pageSize = 10 } = ctx.request.query
	      // 2. 调用数据处理的相关方法
	      const res = await findGoods(pageNum, pageSize)
	      // 3. 返回结果
	      ctx.body = {
	        code: 0,
	        message: '获取商品列表成功',
	        result: res,
	      }
	    }
}

module.exports=new goodsController();