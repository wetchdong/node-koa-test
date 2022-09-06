const Router = require('koa-router');

const {upload,create,update,remove,restore,findAll,} = require('../controller/goods.controller');
const {auth,hadAdminPermission} = require('../middleware/auth.middleware')
const { validator } = require('../middleware/goods.middleware')

const router = new Router({ prefix: '/goods' });

router.post('/upload',auth,upload)

router.post('/create',auth,validator,create)
router.put('/update/:id',auth,validator,update)
router.put('/remove/:id/off',auth,remove)
router.put('/restore/:id/on',auth,restore)

// 获取商品列表
router.get('/', findAll)

module.exports = router;