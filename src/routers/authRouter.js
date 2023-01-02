import express from 'express'
import Debug from 'debug'
import pkg from 'mongodb';
const { MongoClient, ObjectID } = pkg;

const authRouter = express.Router()


authRouter.route('/signUp').post((req, res) => {
  // TODO create user
  req.login(req.body, () => {
    res.redirect('/auth/profile')
  })
})

authRouter.route('/profile').get((req, res) => {
  res.json(req.user)
})

export { authRouter }