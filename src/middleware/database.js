const connection = require('../app/database')

module.exports = async (ctx, next) => {
	ctx.connection = connection
	await next()
}
