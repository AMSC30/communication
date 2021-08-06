const errorTypes = require('../constants/error-types')
module.exports = (err, ctx) => {
	switch (err.message) {
		case errorTypes.NO_ACCOUNT_OR_PASSWORD.message:
			errorTypes.NO_ACCOUNT_OR_PASSWORD.handler(ctx)
			break
		case errorTypes.NO_USER.message:
			errorTypes.NO_USER.handler(ctx)
			break
		case errorTypes.WRONG_PASSWORD.message:
			errorTypes.WRONG_PASSWORD.handler(ctx)
			break
		default:
			ctx.status = 500
			ctx.body = 'server error'
	}
}
