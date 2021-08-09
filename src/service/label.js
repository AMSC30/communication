class Label {
	async create(name, ctx) {
		const statement = `
                            INSERT INTO label (name) VALUES (?)
                        `
		const [result] = await ctx.connection.execute(statement, [name])
		return result
	}
	async getLabel(name, ctx) {
		let statement = `
                            SELECT * FROM label ${name ? 'WHERE name = ?' : ''} 
                        `
		const [result] = await ctx.connection.execute(statement, name ? [name] : [])
		return result
	}

	async getByMomentAndLabel(momentId, labelId, ctx) {
		const statement = `
							SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?
						`
		const [result] = await ctx.connection.execute(statement, [momentId, labelId])
		return result
	}
}
module.exports = new Label()
