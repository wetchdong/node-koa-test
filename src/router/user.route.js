const Router = require('koa-router')
const { register, login,changePassword } = require('../controller/user.controller')

const router = new Router({ prefix: '/users' });
const {
  userValidator,
  verifyUser,
  crpytPassword,
  verifyLogin
} = require('../middleware/user.middleware')

const {auth} = require('../middleware/auth.middleware')

router.post('/register',userValidator, verifyUser, crpytPassword, register);
router.post('/login',userValidator,verifyLogin,login);
router.put('/changePassword',auth,crpytPassword,changePassword)

module.exports = router;