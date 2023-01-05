import passport from 'passport'
import { Strategy } from 'passport-local'
import mongodb from 'mongodb';
const { MongoClient, ObjectID } = mongodb;
import Debug from 'debug'
const debug = Debug('app:localStrategy')

export default function localStrategy () {
  passport.use(
    new Strategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      (username, password, done) => {
        const user = { username, password, 'name': 'Jonathan' }
        done(null, user)
        // const url =
        //   'mongodb+srv://dbUser:1R7jzwoc2WuKOK4U@globomantics.o6s8j.mongodb.net?retryWrites=true&w=majority';
        // const dbName = 'globomantics';
        // (async function validateUser () {
        //   let client;
        //   try {
        //     client = await MongoClient.connect(url);
        //     debug('Connected to the mongo DB');

        //     const db = client.db(dbName);

        //     const user = await db.collection('users').findOne({ username });

        //     if (user && user.password === password) {
        //       done(null, user);
        //     } else {
        //       done(null, false);
        //     }
        //   } catch (error) {
        //     done(error, false);
        //   }
        //   client.close();
        // })();
      }
    )
  );
};