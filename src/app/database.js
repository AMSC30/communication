const mysql = require('mysql2')

const env = process.env

const connection = mysql.createPool({
	host: env.MYSQL_HOST,
	port: env.MYSQL_PORT,
	database: env.MYSQL_DATABASE,
	user: env.MYSQL_USER,
	password: env.MYSQL_PASSWORD
})
connection.getConnection((err, conn) => {
	conn.connect(err => {
		if (err) {
			console.log('连接失败:', err)
		} else {
			console.log('数据库连接成功~')
		}
	})
})
module.exports = connection.promise()
