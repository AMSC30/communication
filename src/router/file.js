const router = new require('koa-router')({ prefix: '/file' })
const { uploadSingleFile, getFile } = require('../controller/file')
const { uploadFile, uploadFiles } = require('../middleware/file')

router.post('/upload/single', uploadFile, uploadSingleFile)

router.post('/upload/multiple', uploadFiles)

router.get('/:name', getFile)

module.exports = router
