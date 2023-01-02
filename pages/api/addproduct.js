import handler from "./handler";
import Cart from '../../models/cart'
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

handler.post(async function(req,res) {
    console.log(req.body.slug);
    //res.json({data:req.body})
    const find_pro = await Cart.find({ 
        slug:req.body.slug,
        did:getCookie('token', { req, res })
    })
    // console.log(find_pro);   
    if (find_pro?.length != 0) {
        console.log("ase");
        res.json({data:0,array:{}})
    }else{

        const data = new Cart({
            product_id:req.body.pid,
            did:getCookie('token', { req, res }),
            title:req.body.title,
            image:req.body.image,
            price:req.body.price,
            qty:req.body.qty,
            slug:req.body.slug
        })
        const result = await data.save()
        res.json({data:1,array:result})
        console.log("nai");
    }
    
})

export default handler