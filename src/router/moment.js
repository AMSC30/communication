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

router.post('/delete/:id', verifyAuth, deleteMoment)

router.post('/update/:id', verifyAuth, updateMoment)

module.exports = router
