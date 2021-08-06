const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const registryRouter = require('../router/index')
const errorHandler = require('../app/error-handler')
const auth = require('../middleware/auth')
const database = require('../middleware/database')
const errorCatcher = require('../middleware/error-catcher')
const app = new Koa()

app.use(bodyParser())

app.use(auth)

app.use(errorCatcher)

app.use(database)

app.registryRouter = registryRouter
app.registryRouter()

app.on('error', errorHandler)

module.exports = app
