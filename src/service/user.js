const connection = require('../app/database')

class USER {
	async isExist(account) {
		const statement = `SELECT * FROM user WHERE account = ?`
		const result = await connection.execute(statement, [account])
		return result[0]
	}

	async login(account, password) {
		const statement = `SELECT * FROM user WHERE account = ? AND password = ?`
		const result = await connection.execute(statement, [account, password])
		return result[0]
	}

	async addUser(account, password, name, age) {
		const statement = `INSERT INTO user (account,password,name,age) VALUES (?,?,?,?)`
		await connection.execute(statement, [account, password, name, age])
	}

	async getUserInfo(id) {
		const statement = `SELECT * FROM user WHERE id = ${id}`
		const result = await connection.execute(statement, [id])
		return result[0]
	}
}
module.exports = new USER()
