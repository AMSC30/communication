module.exports = async (ctx, next) => {
	try {
		await next()
	} catch (error) {
		console.log(error)
		ctx.status = 500
		ctx.body = '服务器内部错误'
	}
}
