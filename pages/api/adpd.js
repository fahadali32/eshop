import handler from "./handler";
import Cart from '../../models/cart'
import { getCookie } from "cookies-next";

handler.get(async function (req,res) {
    try {
        const find_pro = await Cart.find({ 
            did:getCookie('token', { req, res })
        })
        res.json({data:find_pro || {}})        
    } catch (error) {
        res.json({data:{}})
    }
    // console.log(req.headers.cookie); 
    // /res.send({data:"hi"})     
})
handler.post(async function (req,res) {
    try {
        const find_pro = await Cart.find({ 
            slug:req.body.slug,
            did:getCookie('token', { req, res })
        })
        console.log(`find_pro length ${find_pro.length}`);
        // res.json(find_pro != 0)
        if (find_pro?.length != 0) {
            if (req.body.qty != 0) {
                await Cart.updateOne({
                    slug:req.body.slug,
                    did:getCookie('token', { req, res })
                },{
                    qty:req.body.qty
                })
                
                console.log(find_pro?.length,req.body.slug,getCookie('token', { req, res }));
                res.json(find_pro);    
            }else{
                
            }
        }else{
            const cart_data = new Cart({
                did:getCookie('token', { req, res }),
                title:req.body.title,
                image:req.body.image,
                price:req.body.price,
                qty:req.body.qty,
                slug:req.body.slug
            })
            cart_data.save(function(err,result){
                if (err){
                    console.log(err);
                }
                else{
                    console.log(result)
                }
            })
            res.json({info:req.body})
        }
        
    } catch (error) {
        
    }   
})
export default handler