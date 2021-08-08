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
		console.log(statement)
		const [result] = await ctx.connection.execute(statement, name ? [name] : [])
		return result
	}
}
module.exports = new Label()
