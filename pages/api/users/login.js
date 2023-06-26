import handler from "../handler";
import passport, { use } from "passport";
import session from "express-session";
import { getCookie } from "cookies-next";
const LocalStrategy = require("passport-local").Strategy;
import Auth from '../../../models/auth'

passport.use( new LocalStrategy({ usernameField: 'email',passwordField:'password' },async (username, password, done)=> {
  const result = await Auth.find({
    email:username
  })
  console.log("result");
  // console.log(result[0]?.first_name);
  if (result.length != 1) {
    return done(null,false,{ info:"You are not a valid user" })  
  }else{
    if (result[0]?.password == password) {
      return done(null,{ info:result[0].email,name:`${result[0]?.first_name} ${result[0]?.last_name}` })
    } else {
      return done(null,false,{ info:"Wrong email/password" })
    }
    
  } 
}
));

passport.serializeUser(function (user, done) {
  console.log(user);
  console.log(`from serialize ${user.info}`);
  done(null, user);
});

passport.deserializeUser(async function(id, done) {
  
  console.log('deserializeUser (lookup) ' + JSON.stringify(id.info))
  const result = await Auth.find({
    email:id.info
  })
  console.log("info");
  done(null,result)
})

handler.post(async function (req,res,next) {
  // console.log(await Auth.find());

  passport.authenticate('local',
  (err, user, info) => {
    if (err) {
      return next(err); 
    }

    if (!user) {
      return res.status(500).json(info)
    }

    req.logIn(user,async function(err) {
      if (err) {
        return next(err);
      }
      //console.log(`for checking ${req?.session?.passport?.user?.info}`);
      const user = req?.session?.passport?.user?.info
      const ck = getCookie('token', { req, res }) || null
      const save_data = await Auth.updateOne({
        email:user
      },{ did:ck })
      console.log(save_data);
      return res.status(200).json({info:info,data:req.session,isAuth:req.isAuthenticated()});
    });

  })(req, res, next);

});

handler.get(function (req,res) {
  res.json(req?.session)
})


export default handler