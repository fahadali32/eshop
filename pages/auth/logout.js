import React, { useEffect } from 'react'
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import passport, { use } from "passport";
import session from "express-session";
import { useRouter } from 'next/router';
import axios from 'axios';
import { serialize } from 'cookie';

function Logout(props) {
    
    const router = useRouter();
    useEffect(()=>{
        (async()=>{
            const data = await axios.post(`${window.origin}/api/logout`, { withCredentials: true })
            console.log(data.data);
            
        })()
        router.push("/auth/login")
    },[router])
    return (
        <div>Redirect to login page...</div>
    )
}

export async function getServerSideProps(context) {
    const { req,res } = context
    // setCookie('token', uuidv4(), {
    //     req, res,
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV !== "development",
    //     maxAge: 60 * 1000,
    //     sameSite: "lax",
    //     path: '/'
    //   });
    //   console.log('cookie set');
    res.setHeader('Set-Cookie',[
        serialize('connect.sid','',{
            maxAge: -1,
            path:'/',
        })
    ])
    return{
        props:{}
    }
}

export default Logout