import express from 'express'
import Debug from 'debug'
// import mongoose from 'mongoose'
import mongodb from 'mongodb';
const { MongoClient } = mongodb;
// you need to add assert { type: "json" } to import JSON in ES modules
import articles from '../data/mydata.json' assert { type: "json" }
// import { Article } from './articleModel.js'

const debug = Debug('app:adminRouter')
const adminRouter = express.Router()

// mongoose.set('strictQuery', true);

const username = process.env.USERNAME
const password = process.env.PASSWORD
const cluster = process.env.CLUSTERNAME

adminRouter.route('/').get(async (req, res) => {
  const dbName = 'demo1'
  const url = `mongodb+srv://${username}:${password}@${cluster}.sabpl.mongodb.net/?retryWrites=true&w=majority`

  debug('Connecting DB ...')
  const client = await MongoClient.connect(url)
  const db = client.db(dbName)
  const collection = db.collection('articles')

  try {
    const response = await collection.insertMany(articles)
    debug("Data inserted")
    res.json(response)
  } catch (error) {
    debug('error', error)
  } finally {
    client.close()
  }
})

export default adminRouter 