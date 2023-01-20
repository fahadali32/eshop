import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import nc from "next-connect";
import passport from "passport";
var session = require("express-session")
const LocalStrategy = require("passport-local").Strategy;
const MongoDBStore = require('express-mongodb-session')(session);
const cors = require("cors");


const handler = nc({
    onError: (err, req, res, next) => {
      console.error(err.stack);
      res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
      res.status(404).end("Page is not found");
    },
  })
  
  const store = new MongoDBStore({
    uri: `mongodb+srv://${process.env.UNAME}:${process.env.PASS}@cluster0.ugi7clf.mongodb.net/session?retryWrites=true&w=majority`,
    // uri:  'mongodb://localhost:27017/',
    collection: 'mySessions'
  });
  
  // Catch errors
  store.on('error', function(error) {
    console.log(error);
  });

  handler.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST"],
    credentials:true
  }))
  handler.use(cookieParser())
  handler.use(bodyParser.urlencoded({ extended:true }))
  handler.use(session({
    secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
    resave: false,
    saveUninitialized: true,
    cookie: { secure : false, maxAge: 60 * 60 * 1000 },
    store 
  }))

export default handler;

