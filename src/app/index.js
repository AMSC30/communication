const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const registryRouter = require('../router/index')
const errorHandler = require('../app/error-handler')
const app = new Koa()

app.use(bodyParser())

app.registryRouter = registryRouter
app.registryRouter()

app.on('error', errorHandler)

module.exports = app
