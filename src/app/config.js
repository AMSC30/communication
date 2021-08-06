const fs = require('fs')
const path = require('path')

const getKey = filePath => {
	return fs.readFileSync(path.resolve(__dirname, filePath)).toString()
}

module.exports = {
	privateKey: getKey('../constants/private.key'),
	publicKey: getKey('../constants/public.key')
}
