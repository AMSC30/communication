const { saveFileInfo, getFileInfoByName } = require('../service/file')
const fs = require('fs')
const path = require('path')
const { updateAvatar } = require('../service/user')

class File {
	async uploadSingleFile(ctx, next) {
		const { originalname, mimetype, filename, size } = ctx.req.file
		const { id: userId } = ctx.user

		const result = await saveFileInfo(originalname, mimetype, filename, size, userId, ctx)

		// 更新头像
		const url = `${process.env.APP_HOST}:${process.env.APP_PORT}/file/${filename}`
		await updateAvatar(url, ctx.user.id, ctx)

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
