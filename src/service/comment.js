class Comment {
	async create(mId, uId, content, ctx) {
		const statement = `
                            INSERT INTO comment (content,user_id,moment_id) VALUES (?,?,?)
                        `
		const [result] = await ctx.connection.execute(statement, [content, uId, mId])
		return result
	}
	async deleteComment(id, ctx) {
		const statement = `
                            DELETE FROM comment WHERE id = ?
                        `
		const [result] = await ctx.connection.execute(statement, [id])
		return result
	}

	async replay(content, userId, commentId, momentId, ctx) {
		const statement = `
                            INSERT INTO comment (content,user_id,moment_id,comment_id) VALUES (?,?,?,?)
                        `

		const [result] = await ctx.connection.execute(statement, [content, userId, momentId, momentId])

		return result
	}

	async getById(id, ctx) {
		const statement = `
							SELECT c.id id,content,user_id,comment_id,createAt createTime,updateAt updateTime,
							JSON_OBJECT( 'id', u.id, 'name', u.NAME ) user
							FROM comment c
							LEFT JOIN user u ON c.user_id = u.id 
							WHERE moment_id = ?
							`
		const [result] = await ctx.connection.execute(statement, [id])
		return result
	}
}
module.exports = new Comment()
