const Router = require('koa-router');
const router = new Router({prefix:'/cart'})
const {auth,hadAdminPermission} = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')

const {add,findAll,update,remove} = require('../controller/cart.controller')
router.post('/add',auth,validator({  goods_id: { type: 'string', required: true }}),add)
router.get('/',auth,findAll)
router.put('/update/:id',auth,validator({number: { type: 'string', required: false },
			selected: { type: 'string', required: false },}),update)
router.delete('/remove', auth,validator({ ids: 'array' }), remove)
module.exports = router