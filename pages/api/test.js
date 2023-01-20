import handler from "./handler";
import Product from '../../models/shop'
import proImg from "../../models/proimg";
import Cart from "../../models/cart";
import Auth from "../../models/auth";
import mongoose from "mongoose";

handler.get(async (req,res)=>{
    try {
        // const data = new Product({
        //     title:"Nike Shoe",
        //     description:"Featuring materials inspired by spacesuits and quilted stitching on the upper, it takes the largest Air unit to date and blends it with the futuristic look of the final frontier. Mesh on the upper keeps your feet cool",
        //     price:55, 
        //     image: "/nike.svg",
        //     slug :"nike-shoe",		
        // })
        // const result = await data.save()
        // console.log(result);
        await Product.find()
        // const data = await Product.find()
        // console.log(data);
        
        await proImg.find()
        await Cart.find()
        const auth = await Auth.find()
        console.log(auth);
        console.log();
        // const object =  await Cart.deleteOne({ slug: 'puma-buzz' })
        // console.log(object);

        // console.log(process.env.MONGODB_URI);
        // console.log(data);
        res.json({
            test:"sucessfull",
            data:auth,
        })

    } catch (error) {
        console.log(error);
        res.json({ test: "Data is not satisfied..." })
    }
    
})

export default handler