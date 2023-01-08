import handler from "../handler";
import passport from "passport";
import session from "express-session";
import { getCookie } from "cookies-next";
const LocalStrategy = require("passport-local").Strategy;
import Auth from '../../../models/auth'

handler.use(passport.initialize())
handler.use(passport.session())

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (username, password, done) => {
    return done(null, { info: username })
}
));

passport.serializeUser(function (user, done) {
    console.log(`from serialize ${user.info}`);
    done(null, user);
});

passport.deserializeUser(async function (id, done) {
    console.log('deserializeUser (lookup) ' + JSON.stringify(id))
    const result = await Auth.find({
        email:id?.info
    })
    console.log(result);
    done(null, result)
})

handler.post(async (req, res,next) => {

    const { username, password, firstname, lastname, email } = req.body
    const emailFind = await Auth.findOne({ email: email })
    const userName = await Auth.findOne({ username: username })

    if (emailFind) {
        res.status(200).json("This email is already used")
    } else if (userName) {
        res.status(200).json("This username is already used")
    } else {
        try {
            const data = new Auth({
                username: username,
                password: password,
                first_name: firstname,
                last_name: lastname,
                email: email
            })

            passport.authenticate('local',
                (err, user, info) => {
                    if (err) {
                        return next(err);
                    }

                    if (!user) {
                        return res.status(500).json(info)
                    }

                    req.logIn(user, async function (err) {
                        if (err) {
                            return next(err);
                        }
                        const result = await data.save()
                        // return res.status(200).json({ info: info, data: req.session, isAuth: req.isAuthenticated() });
                        // res.json(req.session)
                        console.log(`for checking ${req?.session?.passport?.user?.info}`);
                        const user = req?.session?.passport?.user?.info
                        const ck = getCookie('token', { req, res }) || null
                        const save_data = await Auth.updateOne({
                            email: user
                        }, { did: ck })
                        console.log(save_data);
                        return res.status(200).json({ info: info, data: req.session, isAuth: req.isAuthenticated() });
                    });

            })(req, res, next);
            

        } catch (error) {
            
            console.log(error);
            res.json(JSON.stringify(error))
        }

    }
})

export default handler
