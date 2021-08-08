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
}
module.exports = new Comment()
