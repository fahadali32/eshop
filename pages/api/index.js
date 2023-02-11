import handler from "./handler";
import { v4 as uuidv4 } from 'uuid';

import cookie from 'cookie'
import { getCookie, setCookie } from 'cookies-next';
import cors from 'cors';

import Product from '../../models/shop'
import Cart from '../../models/cart'

const corsConfig = {
  origin: true,
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

// handler.use(cors(corsConfig));
// handler.options('*', cors(corsConfig));
handler.use(cors())

handler.get(async(req,res)=>{
        
    console.log("cookie from back");
    const data = await Product.find().limit(5)
    const pro_items = await Product.find().skip(5)
    if (req?.headers?.cookie != undefined) {
      const find_pro = await Cart.find({ did:getCookie('token', { req, res }) || "" })  
      res.json({data:data,pro_items:pro_items,adpd:find_pro})
    }else{
      res.json({data:data,pro_items:pro_items,adpd:{}})
    }
    // console.log(req.session,req.session.id)
    // console.log(process.env.MONGODB_URI);
})

export default handler
