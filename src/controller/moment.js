const { getLabel } = require('../service/label')
const { create, query, queryList, deleteSingle, updateMoment, addLabels: addLabelsService } = require('../service/moment')

exports.createMoment = async (ctx, next) => {
	await create(ctx.request.body.content, ctx.user.id, ctx)

	ctx.body = '插入成功'

	await next()
}

exports.queryMoment = async (ctx, next) => {
	const { id } = ctx.params

	const result = await query(id, ctx)

	ctx.body = result
	await next()
}

exports.queryList = async (ctx, next) => {
	const { page, pageSize, label = '' } = ctx.query
	const offset = (page - 1) * pageSize

	const result = await queryList(pageSize, offset, label, ctx)
	ctx.body = result
	await next()
}

exports.deleteMoment = async (ctx, next) => {
	const { id } = ctx.request.body
	await deleteSingle(id, ctx)
	ctx.body = '删除成功'
	await next()
}

exports.updateMoment = async (ctx, next) => {
	const { id: momentId } = ctx.request.params

	const { content } = ctx.request.body
	await updateMoment(momentId, content, ctx)

	ctx.body = '修改成功'

	await next()
}

exports.addLabels = async (ctx, next) => {
	const { momentId } = ctx.request.params
	const { labels } = ctx.request.body

	for (let label of labels) {
		// 获取labelId
		const [{ id: labelId }] = await getLabel(label, ctx)

		// 插入到表中
		await addLabelsService(labelId, momentId, ctx)
	}

	ctx.body = {
		message: '插入成功'
	}
	await next()
}
