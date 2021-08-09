class Moment {
	async create(content, id, ctx) {
		const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`
		await ctx.connection.execute(statement, [content, id])
	}

	async query(id, ctx) {
		const statement = `
			SELECT
				m.id,
				m.content,
				m.createAt createTime,
				m.updateAt updateTime,
				JSON_OBJECT( 'id', u.id, 'name', u.name ) 'user',
				IF(
					COUNT(c.id),
					JSON_ARRAYAGG(
					JSON_OBJECT( 'id', c.id, 'content', c.content, 'createTime', c.createAt, 'updateTime', c.updateAt )),NULL)
				 	'comments',
				IF(
					COUNT(l.id),
					JSON_ARRAYAGG(
					JSON_OBJECT( 'id', l.id, 'name', l.name )) ,NULL)
					labels
			FROM
				moment m
				LEFT JOIN comment c ON m.id = c.moment_id
				LEFT JOIN user u ON m.user_id = u.id
				LEFT JOIN moment_label ml ON m.id = ml.moment_id
				LEFT JOIN label l ON ml.label_id = l.id 
			WHERE
				m.id = ? 
			GROUP BY
				m.id,c.moment_id
			HAVING
				m.id = ?
		`
		const [result] = await ctx.connection.execute(statement, [id, id])
		return result
	}

	// TODO
	async queryList(limit, offset, label, ctx) {
		const statement = ` SELECT m.id ,m.content,m.createAt createTime,
							m.updateAt updateTime,
							JSON_OBJECT('userId',u.id,'name',u.name,'age',u.age,'account',u.account) author,
							(SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id ) commentCount
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

	async addLabels(labelId, momentId, ctx) {
		const statement = `
							INSERT INTO moment_label (moment_id,label_id) VALUES (?,?)
						`
		await ctx.connection.execute(statement, [momentId, labelId])
	}
}
module.exports = new Moment()
