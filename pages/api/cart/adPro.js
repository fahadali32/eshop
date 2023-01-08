import handler from "../handler";
import Cart from '../../../models/cart'
import { getCookie } from "cookies-next";

handler.patch(async function (req, res) {
    const find_pro = await Cart.find({
        slug: req.body.slug,
        did: getCookie('token', { req, res })
    })
    console.log(req.body.id);
    
    // res.json(find_pro)
    
    if (find_pro?.length == 1) {
        // res.json(find_pro)
        try {
            const result = await Cart.updateOne({
                slug: req.body.slug,
                did: getCookie('token', { req, res })
            }, {
                qty: req.body.qty
            })
            // console.log(find_pro?.length,req.body.slug,getCookie('token', { req, res }));
            res.json(result);
        } catch (error) {
            console.log(error);
            res.json(JSON.stringify(error))
        }
    } else {
        try {
            const cart_data = new Cart({
                did: getCookie('token', { req, res }),
                title: req.body.title,
                image: req.body.image,
                price: req.body.price,
                qty: req.body.qty,
                slug: req.body.slug
            })
            cart_data.save(function (err, result) {
                if (err) {
                    // console.log(err);
                    res.json(err)
                }
                else {
                    res.json(result)
                }
            })
        } catch (error) {
            console.log(error);
            res.json(error)
        }
    }
    // res.json(find_pro)
})

handler.delete(async (req, res) => {
    const result = await Cart.find({ _id: req.query.id, did: getCookie('token', { req, res }) })
    if (result.length != 0) {
        try {
            await Cart.findByIdAndDelete(req.query.id);
        } catch (error) {
            res.json(JSON.stringify(error))
        }
    } else {
       res.json("can't delete") 
    }
})

export default handler