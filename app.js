import express from 'express'
import chalk from 'chalk'
import Debug from 'debug'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express()
const debug = Debug('app')
const PORT = process.env.PORT || 3000;

import { articlesRouter } from './src/routers/articlesRouter.js'
import { feedRouter } from './src/routers/feedRouter.js'

// middleware
app.use(morgan('tiny')) // or combined
// To solve the "__dirname is not defined in ES module scope" error, import and use the dirname() method from the path module.
// We used the fileURLToPath method from the url module to get the filename.
// The fileURLToPath method returns the fully-resolved, platform-specific Node.js file path.
// The import.meta object contains context-specific metadata for the module, e.g. the module's URL.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '/public/'))) // serve from static

// set view engine and view path
app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use('/articles', articlesRouter)
app.use('/feed', feedRouter)

app.get('/', (req, res) => {
  res.render('index', { title: 'Bun, EJS and ExpressJS', data: ['a', 'b', 'c'] })
})

app.listen(PORT, () => {
  debug(`listening on port ${chalk.green(PORT)}`)
})