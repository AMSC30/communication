class File {
	async saveFileInfo(originalName, mimetype, filename, size, userId, ctx) {
		const statement = `
                            INSERT INTO file (original_name,mimetype,filename,size,user_id) VALUES (?,?,?,?,?)
                        `
		const [result] = await ctx.connection.execute(statement, [originalName, mimetype, filename, size, userId])
		return result
	}
	async getFileInfoByName(name, ctx) {
		const statement = `
                            SELECT * FROM file WHERE filename = ?
                        `
		const [result] = await ctx.connection.execute(statement, [name])
		return result
	}
}

module.exports = new File()
