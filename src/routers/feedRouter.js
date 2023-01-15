import express from 'express'
import Debug from 'debug'
// import mongoose from 'mongoose'
import pkg from 'mongodb';
const { MongoClient } = pkg;
// you need to add assert { type: "json" } to import JSON in ES modules
import articles from '../data/mydata.json' assert { type: "json" }
// import { Article } from './articleModel.js'

import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const debug = Debug('app:adminRouter')
const feedRouter = express.Router()

// mongoose.set('strictQuery', true);

const username = process.env.USERNAME
const password = process.env.PASSWORD
const cluster = process.env.CLUSTERNAME

feedRouter.route('/').get(async (req, res) => {
  const dbName = 'demo1'
  const url = `mongodb+srv://${username}:${password}@${cluster}.sabpl.mongodb.net/?retryWrites=true&w=majority`

  debug('Connecting DB ...')
  const client = await MongoClient.connect(url)
  const db = client.db(dbName)
  const collection = db.collection('articles')

  try {
    debug("Inserting")
    const response = await collection.insertMany(articles)
    debug("Data inserted")
    res.json(response)
  } catch (error) {
    debug('error', error)
  } finally {
    client.close()
  }
})

export { feedRouter }