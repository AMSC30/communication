const router = new require('koa-router')({ prefix: '/moment' })
const { verifyAuth } = require('../middleware/user')
const {
	createMoment,
	queryMoment,
	queryList,
	deleteMoment,
	updateMoment
} = require('../controller/moment')

router.post('/add', createMoment)

router.get('/:id', queryMoment)

router.get('/list', queryList)

router.post('/delete/:momentId', verifyAuth, deleteMoment)

router.post('/update/:momentId', verifyAuth, updateMoment)

module.exports = router
