import express from 'express'
import passport from 'passport'
import Debug from 'debug'
import mongodb from 'mongodb';
const { MongoClient, ObjectID } = mongodb;
import '../config/strategies/local.strategy.js'


const authRouter = express.Router()

const debug = Debug('app:auth')
const dbName = 'demo1'
const url = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTERNAME}.sabpl.mongodb.net/?retryWrites=true&w=majority`


authRouter.route('/test').get(async (req, res) => {
  debug('process: ', process.env.USERNAME, process.env.PASSWORD, process.env.CLUSTERNAME)
  debug('Connecting DB ...')
  const client = await MongoClient.connect(url)
  const db = client.db(dbName);
  debug('Conneced DB')
  res.send('done')
})

authRouter.route('/signUp').post((req, res) => {
  const { username, password } = req.body;
  let client
  (async function addUser () {
    try {
      debug('Connecting DB ...')
      client = await MongoClient.connect(url)
      const db = client.db(dbName);
      debug('Conneced DB')

      const user = { username, password };
      const results = await db.collection('users').insertOne(user);
      debug(results);
      req.login(results.ops[0], () => {
        res.redirect('/auth/profile');
      });
    } catch (error) {
      debug(error);
    } finally {
      client.close()
    }
  })();
})

authRouter
  .route('/signIn')
  .get((req, res) => {
    res.render('signin');
  })
  .post(
    passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/',
    })
  );

authRouter.route('/profile').get((req, res) => {
  res.json(req.user);
});

export default authRouter 