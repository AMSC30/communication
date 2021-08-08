const { DUPLICATE } = require('../constants/error-types')
const { getLabel, create } = require('../service/label')

class Label {
	async createLabel(ctx, next) {
		const { name } = ctx.request.body

		// 查询是否创建过改标签
		const queryResult = await getLabel(name, ctx)

		if (queryResult.length) {
			const error = new Error(DUPLICATE.message)
			ctx.app.emit('error', error, ctx)
		} else {
			const result = await create(name, ctx)
			ctx.body = {
				message: '标签创建成功',
				result
			}
			await next()
		}
	}

	async getLabel(ctx, next) {
		const { name } = ctx.request.query
		const result = await getLabel(name, ctx)
		ctx.body = {
			message: '查询成功',
			result
		}
		await next()
	}
}
module.exports = new Label()
