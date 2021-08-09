const router = new require('koa-router')({ prefix: '/label' })
const { createLabel, getLabel } = require('../controller/label')

router.post('/add', createLabel)

router.get('/', getLabel)

module.exports = router
