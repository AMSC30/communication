class Auth {
	async queryRecord(tableName, sId, uId, ctx) {
		const statement = `
                            SELECT *
                            from ${tableName} 
                            WHERE id = ? AND user_id = ?
                          `
		const [result] = await ctx.connection.execute(statement, [tableName, sId, uId])
		return result
	}
}
module.exports = new Auth()
