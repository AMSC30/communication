const fs = require('fs')

module.exports = function () {
	fs.readdirSync(__dirname).forEach(file => {
		if (file === 'index.js') return

		const router = require(`./${file}`)

		this.use(router.routes())
		this.use(router.allowedMethods())
	})
}
