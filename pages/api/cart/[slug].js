import handler from "../handler";
import Cart from '../../../models/cart'
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

handler.put(async function (req, res) {
    const find_pro = await Cart.find({
        slug: req.query.slug,
        did: getCookie('token', { req, res })
    })
    // res.json(find_pro)
    if (find_pro.length != 0) {
        res.status(200).json({data:0,array:{}})
    } else {
        try {
            const data = new Cart({
                did: getCookie('token', { req, res }),
                title: req.body.title,
                image: req.body.image,
                price: req.body.price,
                qty: req.body.qty,
                slug: req.body.slug
            })
            const result = await data.save()
            res.status(200).json(res.json({data:1,array:result}))
        } catch (error) {
            res.status(200).json({data:0,array:JSON.stringify(error)})
        }
    }
})


export default handler