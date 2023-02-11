import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import nc from "next-connect";
import passport from "passport";
var session = require("express-session")
const LocalStrategy = require("passport-local").Strategy;
const MongoDBStore = require('express-mongodb-session')(session);
const cors = require("cors");
import Order from '../../models/order'
import { getCookie,deleteCookie } from "cookies-next";
import Auth from "../../models/auth";
import { serialize } from 'cookie';
import Cart from "../../models/cart";
import useUser from '../../lib/auth'

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
  
handler.use(cookieParser())
handler.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { secure : false, maxAge: 60 * 60 * 1000 },
  store 
}))

export default handler.post(async (req,res,next)=>{
    // console.log(req.session);
    const cart = await Cart.find({
        did: getCookie('token', { req, res })
    }).select('-_id')
    // console.log(cart);
    try {
        if (req.session?.passport?.user?.info) {
            let newCarts = cart.map(cart => {
                return { ...cart.toObject(), user: req.session?.passport?.user?.info };
            });
            Order.insertMany(newCarts).then(function () {

                console.log(getCookie('token', { req, res }));

                if (getCookie('token', { req, res })) {
                    res.setHeader('Set-Cookie',[
                        serialize('token','',{
                            maxAge: -1,
                            path:'/',
                        })
                    ])
                    
                    console.log(true);
                } else {
                    console.log(false);
                }

                res.status(200).json("Data inserted")
            }).catch(function (error) {
                console.log(error);
                res.status(200).json("Data cant be inserted")
            });

        } else {
            res.json('data not found')   
        }
        
    } catch (error) {
        res.json(JSON.stringify(error))
    }
})