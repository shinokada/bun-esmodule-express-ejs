import express from 'express'
import Debug from 'debug'
import mongodb from 'mongodb';
const { MongoClient, ObjectID } = mongodb;
// you need to add assert { type: "json" } to import JSON in ES modules
// import articles from '../data/mydata.json' assert { type: "json" }

const debug = Debug('app:adminRouter')
const articlesRouter = express.Router()
const username = process.env.USERNAME
const password = process.env.PASSWORD
const cluster = process.env.CLUSTERNAME

articlesRouter.route('/').get(async (req, res) => {
  // res.render('articles', {
  //   articles,
  // })
  const dbName = 'demo1'
  const url = `mongodb+srv://${username}:${password}@${cluster}.sabpl.mongodb.net/?retryWrites=true&w=majority`

  debug('Connecting DB ...')
  const client = await MongoClient.connect(url)
  const db = client.db(dbName)
  const collection = db.collection('articles')

  try {
    const articles = await collection.find().toArray()
    res.render('articles', { articles })
  } catch (error) {
    debug('error', error)
  } finally {
    client.close()
  }
})
// articles/any-id
articlesRouter.route('/:id').get(async (req, res) => {
  const id = req.params.id
  // res.render('article', {
  //   article: articles[id]
  // })
  const dbName = 'demo1'
  const url = `mongodb+srv://${username}:${password}@${cluster}.sabpl.mongodb.net/?retryWrites=true&w=majority`

  debug('Connecting DB ...')
  const client = await MongoClient.connect(url)
  const db = client.db(dbName)
  const collection = db.collection('articles')

  try {
    const article = await collection.findOne({ _id: new ObjectID(id) })
    res.render('article', { article })
  } catch (error) {
    debug('error', error)
  } finally {
    client.close()
  }
})

export default articlesRouter 