const { create, query, queryList, deleteSingle } = require('../service/moment')

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
	const { page, pageSize } = ctx.query
	const offset = (page - 1) * pageSize

	const result = await queryList(pageSize, offset, ctx)
	ctx.body = result
	await next()
}

exports.deleteMoment = async (ctx, next) => {
	const { id } = ctx.request.body
	await deleteSingle(id, ctx)
	ctx.body = '删除成功'
	await next()
}
