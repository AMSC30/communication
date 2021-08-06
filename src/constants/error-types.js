const NO_ACCOUNT_OR_PASSWORD = {
	message: 'account or password is empty',
	handler(ctx) {
		ctx.status = 400
		ctx.body = {
			message: '账号或密码不能为空'
		}
	}
}
const NO_USER = {
	message: 'user not exist',
	handler(ctx) {
		ctx.body = {
			message: '该用户不存在'
		}
	}
}
const WRONG_PASSWORD = {
	message: 'wrong password',
	handler(ctx) {
		ctx.body = {
			message: '密码错误'
		}
	}
}

module.exports = {
	NO_ACCOUNT_OR_PASSWORD,
	NO_USER,
	WRONG_PASSWORD
}
