const router = new require('koa-router')({ prefix: '/comment' })

const { verifyAuth } = require('../middleware/user')

const { createComment, deleteComment, replayComment, getCommentById } = require('../controller/comment')

router.post('/add', createComment)

router.post('/delete/:commentId', verifyAuth, deleteComment)

router.post('/replay', replayComment)

router.get('/', getCommentById)

module.exports = router
