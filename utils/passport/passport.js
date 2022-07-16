import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import faker from 'faker'
import * as User from '../../models/users.js'
import bCrypt from 'bcrypt'
import logger from '../logger/winston_config.js'


const createHash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

const isValidPassword = (user, password) => {
    return bCrypt.compareSync(password, user.password);
}

export const serverPassport = (app) => {

    // CONFIG PASSPORT

    app.use(passport.initialize());
    app.use(passport.session());

    // Passport middlewares
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        User.users.findById({ _id: id }, done).lean()
    });

    // CONFIG PASSPORT LOCAL

    passport.use('login', new LocalStrategy(
        (username, password, done) => {

            User.users.findOne({ email: username }, (err, user) => {

                if (err) {
                    logger.error("Error in login LocalStrategy")
                    return done(err)
                }

                if (!user) {
                    logger.info("User Not Found with email: " + username);
                    return done(null, false)
                }

                if (!isValidPassword(user, password)) {
                    logger.info("Invalid Password");
                    return done(null, false)
                }

                return done(null, user)
            })

        })
    )

    passport.use('signup', new LocalStrategy(
        { passReqToCallback: true },
        (req, username, password, done) => {
            User.users.findOne({ email: req.body.email }, (err, user) => {

                if (err) {
                    logger.error("Error en signup LocalStrategy " + err);
                    return done(err)
                }

                if (user) {
                    logger.info('User already exists');
                    return done(null, false)
                }

                const newUser = {
                    id: req.body.email,
                    username: username,
                    password: createHash(password),
                    email: req.body.email,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    address: req.body.address,
                    age: req.body.age,
                    phone: req.body.phone,
                    photo: `uploads/${req.body.email}.jpg`
                }

                User.users.create(newUser, (err, userWithId) => {
                    if (err) {
                        logger.error('Error in Saving user: ' + err);
                        return done(err);
                    }
                    logger.info(user)
                    logger.info('User Registration succesful');
                    return done(null, userWithId);
                });
            })
        })
    )


    return passport

}




