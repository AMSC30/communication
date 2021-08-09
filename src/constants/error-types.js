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
const NO_AUTH = {
	message: 'NOT AUTH',
	handler(ctx) {
		ctx.body = {
			message: '请先登录'
		}
	}
}
const NO_AUTH_TO_UPDATE_MOMENT = {
	message: 'NOT AUTH TO UPDATE MOMENT',
	handler(ctx) {
		ctx.body = {
			message: '您没有权限执行该操作'
		}
	}
}

const DUPLICATE = {
	message: 'DUPLICATE',
	handler(ctx) {
		ctx.body = {
			message: '该标签已存在'
		}
	}
}
module.exports = {
	NO_ACCOUNT_OR_PASSWORD,
	NO_USER,
	WRONG_PASSWORD,
	NO_AUTH,
	NO_AUTH_TO_UPDATE_MOMENT,
	DUPLICATE
}
