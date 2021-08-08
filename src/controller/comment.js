const { create, deleteComment, replay, getById } = require('../service/comment')

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

	async replayComment(ctx, next) {
		const { content, commentId, momentId } = ctx.request.body
		const { id: userId } = ctx.user

		const res = await replay(content, userId, commentId, momentId, ctx)

		ctx.body = {
			message: '回复成功',
			result: res
		}
		await next()
	}

	async getCommentById(ctx, next) {
		const { momentId } = ctx.request.query
		const result = await getById(momentId, ctx)
		ctx.body = {
			result,
			message: '查询成功'
		}
		await next()
	}
}
module.exports = new Comment()
