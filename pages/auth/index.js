import axios from 'axios';
import passport from 'passport';
import React, { useEffect, useState } from 'react'
import { getSession } from '../../lib/auth';


function Index(props) {
  const [authData,setAuthdata] = useState()
  useEffect(()=>{
    getSession().then(data=> setAuthdata(data))
    
  },[])
  console.log(authData?.passport);
  
  return(
    authData?.passport ? <div>Index {authData?.passport?.user?.info}</div> : <div>Index</div>
  )
}
export default Index
export function getServerSideProps(context){
  const { req, res } = context;
  //console.log(req.session);

    return{
        props:{
            data:req.headers || {}
        }
    }
}
