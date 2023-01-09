import handler from "./handler";

import passport, { use } from "passport";
import session from "express-session";
// import { getCookie } from "cookies-next";
// const LocalStrategy = require("passport-local").Strategy;
// import Auth from '../../../models/auth'

handler.use(passport.initialize());
handler.use(passport.session());

handler.post(function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.clearCookie("connect.sid");
      res.json("hi")
    });
  
});
export default handler;
