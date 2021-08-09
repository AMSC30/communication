const multer = require('koa-multer')
const config = require('../app/config')

const upload = multer({ dest: config.fileCachePath })

exports.uploadFile = upload.single('file')

exports.uploadFiles = upload.fields([{ name: 'files', maxCount: 10 }])
