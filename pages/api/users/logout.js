import handler from "../handler";
import passport, { use } from "passport";
import session from "express-session";
const LocalStrategy = require("passport-local").Strategy;

handler.get((req, res, next) => {
  req.logout();
  req.session.destroy()
  res.clearCookie('connect.sid');
  res.redirect('/');
});


export default handler