class USER {
	async isExist(account, ctx) {
		const statement = `SELECT * FROM user WHERE account = ?`
		const [result] = await ctx.connection.execute(statement, [account])
		return result
	}

	async login(account, password, ctx) {
		const statement = `SELECT * FROM user WHERE account = ? AND password = ?`
		const result = await ctx.connection.execute(statement, [account, password])
		return result[0]
	}

	async addUser(account, password, name, age, ctx) {
		const statement = `INSERT INTO user (account,password,name,age) VALUES (?,?,?,?)`
		await ctx.connection.execute(statement, [account, password, name, age])
	}

	async getUserInfo(id, ctx) {
		const statement = `SELECT * FROM user WHERE id = ${id}`
		const result = await ctx.connection.execute(statement, [id])
		return result[0]
	}
}
module.exports = new USER()
