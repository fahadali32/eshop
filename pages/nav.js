import Image from "next/image";
import Link from "next/link";
import React,{useEffect, useState} from "react"
import { HiBars2 } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";
import styles from '../styles/Home.module.css'
import Bar from "./components/bar";
import Cls from "./components/clsbtn"
import { getSession } from "../lib/auth";
import axios from "axios";
import { useRouter } from "next/router";
function Nav(props) {
  const router = useRouter()
  const [data,setData] = useState([])
  //console.log(props.prodata);
  const [count,setCount] = useState(0)
  const [lbar,setBar] = useState(<Bar/>)
  const [display,setDisplay] = useState("none")
  const [isAuth,setAuth] = useState()

  useEffect(()=>{
    async function getAuth() {
      // const result = await axios.get("/api/auth/login",{ withCredentials:true })
      // eslint-disable-next-line react-hooks/rules-of-hooks
      
      setAuth(null)
    }getAuth()
  },[])

  async function getOption(){
    const pro = await axios.get(`${window.origin}/api/auth/logout`,{ withCredentials:true })
    console.log(pro)
    if (pro.data) {
      router.push('/').then(() => router.reload())
    }
  }
  function find(e) {

    //setDisplay("flex")
    console.log(e.target.value.length);
    if (e.target.value.length == 0) {
      setDisplay("none")
      console.log(display);
    }else{
      setDisplay("flex")
    }
    const result = props.prodata.filter((el)=>{
      const result = el.title.toLowerCase().indexOf(e.target.value.toLowerCase())
      if (result != -1) {
        return el
      }else if (e.target.value.length == 0) {
        return null
      }
      else{
        setData(null)
      }
    })
   setData(result)

   //closebtn
   //console.log(display);
  }
  
  function bar() {
    const cls = document.querySelector("#mnav")
    cls.style.display = "block"
    
    if (count == 0) {
      setBar(<Cls/>)
      setCount(1)
      const cls = document.querySelector("#mnav")
      //cls.style.transform = "translate(0%, 0px)"
      cls.classList.toggle("open")
      cls.style.clipPath = "circle(100rem at 90% -10%)";
    }
    if (count == 1) {
      setBar(<Bar/>)
      setCount(0)
      const cls = document.querySelector("#mnav")
      cls.classList.toggle("open")
      //console.log(cls.classList);
      cls.style.clipPath = "circle(10px at 90% -10%)";
    }
    //console.log(count);
  }
  const {position} = props
  // console.log(isAuth?.passport?.user?.info);
  return (
    <div>

      <div id="Dnavbar" style={{position:props.position,width:props.width,zIndex:100}} className={styles.Mnavbody}>
        <div className={styles.logo}>
          <Image src={'/logo.svg'} alt="Logo" width={50} height={50} layout="responsive"></Image>
        </div>
        <div className={styles.Micon}>
            <Link href={"/mycart"}>
            <a className={styles.cl}>
            <p className={styles.numberqt}>{props.qty}</p>
            <FaShoppingCart/>
            </a>
            </Link>
          <div className={styles.bar} onClick={()=>{bar()}}>
            {lbar}
          </div>  
        </div>
        
      </div>
      <div id="mnav" className={styles.Mnavbar}>
        
        <div className={styles.Mnavs}>
        <input autoComplete="new-password" type={"search"} className={styles.searchInput} name="search" onChange={(e)=>{find(e)}}></input>
        <div style={{display:display}} className={styles.searchbox}>
        {data.length == 0 ? (<div style={{display:display}} className={styles.notfound}>Not found</div>) : data.map((product,key)=>{
            return(
              <div id="searchtitle" style={{display:display}} className={styles.searchtitle} key={key}>
                <p>{product.title}</p>
              </div>
            )
        })}
        </div>
        {isAuth?.passport ? 
            <Link href={"#"}>
              <a>Hello Fahad</a>
            </Link>
            :""
          }
          <Link href={"/"}>
            <a>Home</a>
          </Link>
          <Link href={"/about"}>
            <a>About</a>
          </Link>
          <Link href={"/contact"}>
            <a>ContactUs</a>
          </Link>
          {isAuth?.passport ? 
            <Link href={"#"}>
              <a onClick={()=>{getOption()}}>Log out</a>
            </Link> 
          : <Link href={"/auth/login"}>
              <a>Log in</a>
            </Link> 
          }
        </div>
      </div>  
      {/* Desktop Nav bar */}
      <div id="Dnavbar" style={{position:props.position,width:props.width,zIndex:100}} className={styles.Dnavbody}>
        <div  className={styles.navbar}>
          <div className={styles.logo}>
              <Image src={'/logo.svg'} alt="Logo" width={50} height={50} layout="responsive"></Image>
          </div>
          <input type={"search"} name="search" onChange={(e)=>{find(e)}}></input>
          <div className={styles.navholder}>
            <Link href={"/mycart"}>
              <a className={styles.cl}><p className={styles.numberqt}>{props.qty}</p><FaShoppingCart/></a>
            </Link>
            <Link href={"/"}>
            <a>Home</a>
            </Link>
            <Link href={"/about"}>
              <a>About</a>
            </Link>
            <Link href={"/contact"}>
              <a>ContactUs</a>
            </Link>

            { isAuth?.passport ? 
            <div className={styles.dropdown} >
              <div className={styles.avatar}>
                <Image src={`https://avatars.dicebear.com/api/initials/${isAuth?.passport?.user?.info}.png`} alt="Avatar" width={50} height={50} layout="responsive"></Image>
              </div>
              <div className={styles.dropdownCon}>
                <Link href={"#"}>
                <a onClick={()=>{getOption()}}>Log out</a>
                </Link>
                <Link href={"/contact"}>
                <a>Demo</a>
                </Link>
                </div>
            </div>
            : <Link href={"/auth/login"}>
                <a>Login</a>
              </Link> 
            }
            
            
          </div>
          
        </div>
        <div style={{display:display}} className={styles.searchbox}>
        {data.length == 0 ? (<div style={{display:display}} className={styles.notfound}>Not found</div>) : data.map((product,key)=>{
            return(
              <div id="searchtitle" style={{display:display}} className={styles.searchtitle} key={key}>
                <p>{product.title}</p>
              </div>
            )
        })}
        </div>
      </div>

    </div>
  )
}

export default Nav
