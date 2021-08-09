const router = new require('koa-router')({ prefix: '/user' })
const { login, addUser, getUserInfo } = require('../controller/user')
const { verifyUserExist, handlePassword } = require('../middleware/user')

router.post('/login', verifyUserExist, login)

router.post('/addUser', handlePassword, addUser)

router.get('/getUserInfo', getUserInfo)

module.exports = router
