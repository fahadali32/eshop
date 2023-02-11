import passport from "passport";
import session from "express-session";
import { getCookie } from "cookies-next";
const LocalStrategy = require("passport-local").Strategy;
import handler from "./handler";

handler.use(passport.initialize())
handler.use(passport.session())


handler.get((req, res) => {
    try {
        res.json(req.session)
    } catch (error) {
        console.log(error);
        res.json('not found')
    }
})
export default handler


