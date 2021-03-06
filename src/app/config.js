const fs = require('fs')
const path = require('path')

const getKey = filePath => {
	return fs.readFileSync(path.resolve(__dirname, filePath)).toString()
}

module.exports = {
	// 私钥
	privateKey: getKey('../constants/private.key'),
	// 公钥
	publicKey: getKey('../constants/public.key'),
	// token过期时间
	tokenExpiresTime: '24h',
	//token加密方式
	tokenAlgorithm: 'RS256',
	// 文件上传保存路径
	fileCachePath: 'uploads/'
}
