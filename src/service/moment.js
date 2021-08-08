class Moment {
	async create(content, id, ctx) {
		const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`
		await ctx.connection.execute(statement, [content, id])
	}
	async query(id, ctx) {
		const statement = ` SELECT m.content,m.createAt createTime, m.updateAt 		                updateTime,
							JSON_OBJECT('userId',u.id,'name',u.name,'age',u.age,'account',u.account) author
							from moment m 
							LEFT JOIN user u
							ON m.user_id = u.id
							WHERE m.id = ? 
						`
		const [result] = await ctx.connection.execute(statement, [id])
		return result
	}

	async queryList(limit, offset, ctx) {
		const statement = ` SELECT m.content,m.createAt createTime, m.updateAt 		                updateTime,
							JSON_OBJECT('userId',u.id,'name',u.name,'age',u.age,'account',u.account) author
							from moment m 
							LEFT JOIN user u
							ON m.user_id = u.id
							LIMIT ? OFFSET ?
						`
		const [result] = await ctx.connection.execute(statement, [limit, offset])
		return result
	}
	async deleteSingle(id, ctx) {
		const statement = `DELETE FROM moment WHERE id = ?`
		const [result] = await ctx.connection.execute(statement, [id])
		return result
	}
	async updateMoment(id, content, ctx) {
		const statement = `UPDATE moment SET content = ? WHERE id = ?`
		const [result] = await ctx.connection.execute(statement, [content, id])
		return result
	}
}
module.exports = new Moment()
