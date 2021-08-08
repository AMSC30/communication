const { create, deleteComment } = require('../service/comment')

class Comment {
	async createComment(ctx, next) {
		const { id: userId } = ctx.user
		const { content, momentId } = ctx.request.body

		const res = await create(momentId, userId, content, ctx)

		ctx.body = {
			result: res,
			message: '插入评论成功'
		}

		await next()
	}

	async deleteComment(ctx, next) {
		const { commentId: id } = ctx.request.params
		const res = await deleteComment(id, ctx)

		ctx.body = {
			result: res,
			message: '删除成功'
		}

		await next()
	}
}
module.exports = new Comment()
