const { saveFileInfo, getFileInfoByName } = require('../service/file')
const fs = require('fs')
const config = require('../app/config')
const path = require('path')

class File {
	async uploadSingleFile(ctx, next) {
		const { originalname, mimetype, filename, size } = ctx.req.file
		const { id: userId } = ctx.user

		const result = await saveFileInfo(originalname, mimetype, filename, size, userId, ctx)

		ctx.body = { result, message: '上传成功' }

		await next()
	}
	async getFile(ctx, next) {
		const { name } = ctx.request.params
		const [result] = await getFileInfoByName(name, ctx)

		ctx.response.set('content-type', result.mimetype)
		ctx.body = fs.createReadStream(path.resolve(__dirname, '../../uploads', name))

		await next()
	}
}
module.exports = new File()
