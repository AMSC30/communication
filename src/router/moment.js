const router = new require('koa-router')({ prefix: '/moment' })

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

router.post('/delete', deleteMoment)

router.post('/update/:id', updateMoment)

module.exports = router
