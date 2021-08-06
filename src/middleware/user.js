const errorType = require('../constants/error-types')
const userService = require('../service/user')
const md5Password = require('../utils/md5-password')

exports.verifyUser = async (ctx, next) => {
	let { account, password } = ctx.request.body

	// 校验必填
	if (!account || !password) {
		const error = new Error(errorType.NO_ACCOUNT_OR_PASSWORD.message)
		return ctx.app.emit('error', error, ctx)
	}
	// 校验用户是否存在
	const accountResult = await userService.isExist(account)
	if (accountResult.length === 0) {
		const error = new Error(errorType.NO_USER.message)
		return ctx.app.emit('error', error, ctx)
	}

	// 登录
	password = md5Password(password)

	const loginResult = await userService.login(account, password)
	if (loginResult.length === 0) {
		const error = new Error(errorType.WRONG_PASSWORD.message)
		return ctx.app.emit('error', error, ctx)
	}

	ctx.request.body.password = password

	await next()
}
exports.handlePassword = async (ctx, next) => {
	const { password } = ctx.request.body

	ctx.request.body.password = md5Password(password)

	await next()
}
