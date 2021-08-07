const {
	create,
	query,
	queryList,
	deleteSingle,
	queryMomentWithUserId,
	updateMoment
} = require('../service/moment')

const { NO_AUTH_TO_UPDATE_MOMENT } = require('../constants/error-types.js')

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
exports.updateMoment = async (ctx, next) => {
	const { id: momentId } = ctx.request.params
	const { id: userId } = ctx.user

	// 验证是否有当前内容
	const result = await queryMomentWithUserId(momentId, userId, ctx)

	if (!result.length) {
		const error = new Error(NO_AUTH_TO_UPDATE_MOMENT.message)
		ctx.app.emit('error', error, ctx)
		return
	}

	const { content } = ctx.request.body
	await updateMoment(momentId, content, ctx)

	ctx.body = '修改成功'

	await next()
}
