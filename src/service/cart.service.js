const Cart = require('../model/cart.model')
const Goods = require('../model/goods.model')
class CartService{
	async addUpdate(user_id, goods_id){
		
		 // Cart.sync({ force: true })
		 const res = await Cart.findOne({ where: { user_id,goods_id} });
		 if(res){
			  await res.increment('number')
			  return await res.reload()
		 }else{
			return await Cart.create({
			       user_id,
			       goods_id,
			})
		 }

	}
	async findCarts(pageNum, pageSize){
		 const offset = (pageNum - 1) * pageSize
		 const { count, rows } = await Cart.findAndCountAll({
		   attributes: ['id', 'number', 'selected'],
		   offset: offset,
		   limit: pageSize * 1,
		   include: {
		     model: Goods,
		     as: 'goods_info',
		     attributes: ['id', 'goods_name', 'goods_price', 'goods_img'],
		   },
		 })   
		    return {
		      pageNum,
		      pageSize,
		      total: count,
		      list: rows,
		    }
	}
	async updateCarts(params){
		const { id, number, selected } = params;
		 const res = await Cart.findByPk(id)
		    if (!res) return ''
		
		    number !== undefined ? (res.number = number) : ''
		    if (selected !== undefined) {
		      res.selected = selected
		    }
		
		    return await res.save()
	}
	async removeCarts(ids) {
	    return await Cart.destroy({
	      where: {
	        id: {
	          [Op.in]: ids,
	        },
	      },
	    })
	  }
}

module.exports = new CartService()