const jwt = require('jsonwebtoken')
const config = require('../app/config')
const errorTypes = require('../constants/error-types')

module.exports = async (ctx, next) => {
	const noAuthPath = ['/user/login']

	if (noAuthPath.includes(ctx.url)) {
		await next()
	} else {
		const token = ctx.get('Authorization').replace('Bearer ', '')
		try {
			const user = jwt.verify(token, config.publicKey, {
				algorithms: config.tokenAlgorithm
			})

			ctx.user = user
			await next()
		} catch (error) {
			const errorInfo = new Error(errorTypes.NO_AUTH.message)
			ctx.app.emit('error', errorInfo, ctx)
		}
	}
}
