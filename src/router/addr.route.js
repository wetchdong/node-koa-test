const Router = require('koa-router');
const router = new Router({prefix:'/address'});
const {auth,hadAdminPermission} = require('../middleware/auth.middleware')
const {validator} = require('../middleware/addr.middleware')
router.post('/add',auth,validator,(ctx)=>{
	ctx.body = 'aaa'
})

module.exports = router