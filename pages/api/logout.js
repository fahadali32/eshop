import handler from "./handler";

import passport, { use } from "passport";
import session from "express-session";
import cookie from "cookie";
// import { getCookie } from "cookies-next";
// const LocalStrategy = require("passport-local").Strategy;
// import Auth from '../../../models/auth'

handler.use(passport.initialize());
handler.use(passport.session());

handler.post(function (err, req, res, next) {

  if (req.session) {
    try {
      req.session.passport = ''
      console.log(req.session);
      req.session.save(function (err) {
        if (err) next(err)

      })

    } catch (error) {
      console.log(error);
      res.json({ authenticated: req.isAuthenticated() });
    }

  }
});
export default handler;
