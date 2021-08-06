// 自定义环境变量解析
require('dotenv').config()

const app = require('./app')

app.listen(process.env.APP_PORT, () => {
	console.log(`app is listening on port ${process.env.APP_PORT}`)
})
