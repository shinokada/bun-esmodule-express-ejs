import passport from 'passport'
import { Strategy } from 'passport-local'
import mongodb from 'mongodb';
const { MongoClient } = mongodb;
import Debug from 'debug'
const debug = Debug('app:localStrategy')

const dbName = 'demo1'
const url = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTERNAME}.sabpl.mongodb.net/?retryWrites=true&w=majority`

export default function localStrategy () {
  passport.use(
    new Strategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      (username, password, done) => {
        // const user = { username, password, name: 'Jonathan' }

        // console.log('process.env.USERNAME: ', process.env.PASSWORD, process.env.USERNAME)
        // done(null, user)

        (async function validateUser () {
          let client
          try {
            client = await MongoClient.connect(url)
            debug('Connected to the mongo DB');
            const db = client.db(dbName)

            const user = await db.collection('users').findOne({ username });

            if (user && user.password === password) {
              done(null, user);
            } else {
              done(null, false);
            }
          } catch (error) {
            done(error, false);
          }
          client.close();
        })();
      }
    )
  );
};