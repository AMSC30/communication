const errorType = require('../constants/error-types')
const userService = require('../service/user')
const md5Password = require('../utils/md5-password')
const { queryMomentWithUserId } = require('../service/moment')

exports.verifyUser = async (ctx, next) => {
	let { account, password } = ctx.request.body

	// 校验必填
	if (!account || !password) {
		const error = new Error(errorType.NO_ACCOUNT_OR_PASSWORD.message)
		return ctx.app.emit('error', error, ctx)
	}
	// 校验用户是否存在
	const accountResult = await userService.isExist(account, ctx)

	if (accountResult.length === 0) {
		const error = new Error(errorType.NO_USER.message)
		return ctx.app.emit('error', error, ctx)
	}

	// 登录
	password = md5Password(password)

	const loginResult = await userService.login(account, password, ctx)
	if (loginResult.length === 0) {
		const error = new Error(errorType.WRONG_PASSWORD.message)

		ctx.request.body = null

		return ctx.app.emit('error', error, ctx)
	}
	ctx.request.body = {
		...accountResult[0]
	}

	await next()
}

exports.verifyAuth = async (ctx, next) => {
	const { id: momentId } = ctx.request.params || ctx.request.body
	const { id: userId } = ctx.user

	// 验证是否有当前内容
	const result = await queryMomentWithUserId(momentId, userId, ctx)

	if (!result.length) {
		const error = new Error(errorType.NO_AUTH_TO_UPDATE_MOMENT.message)
		ctx.app.emit('error', error, ctx)
		return
	}

	await next()
}

exports.handlePassword = async (ctx, next) => {
	const { password } = ctx.request.body

	ctx.request.body.password = md5Password(password)

	await next()
}
