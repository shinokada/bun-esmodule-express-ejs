import express from 'express'
import Debug from 'debug'
import pkg from 'mongodb';
const { MongoClient, ObjectID } = pkg;

const authRouter = express.Router()


authRouter.route('/signUp').post((req, res) => {
  res.json(req.body)
})

export { authRouter }