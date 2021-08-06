const fs = require('fs')

module.exports = function () {
	fs.readdirSync(__dirname).forEach(filePath => {
		if (filePath !== 'index.js') {
			const router = require(`./${filePath}`)
			this.use(router.routes())
			this.use(router.allowedMethods)
		}
	})
}
