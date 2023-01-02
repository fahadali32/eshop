import handler from "../handler";
import passport, { use } from "passport";
import session from "express-session";
const LocalStrategy = require("passport-local").Strategy;

handler.get(function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

export default handler