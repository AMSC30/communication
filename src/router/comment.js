const router = new require('koa-router')({ prefix: '/comment' })

const { verifyAuth } = require('../middleware/user')

const { createComment, deleteComment } = require('../controller/comment')

router.post('/add', createComment)

router.post('/delete/:commentId', verifyAuth, deleteComment)

module.exports = router
