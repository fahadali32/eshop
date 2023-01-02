import handler from "./handler";
import Cart from '../../models/cart'
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

handler.post(async function(req,res) {
    const cookie = getCookie('token', { req, res })
    console.log(req.headers.cookie);
    console.log(req.body.pid);
    const find_pro = Cart.deleteOne({ slug: req.body.slug }).then(function(data){
      console.log(data); 
   }).catch(function(error){
      console.log(error); 
   });
    console.log(find_pro);    
    res.json(find_pro)
    
})

export default handler