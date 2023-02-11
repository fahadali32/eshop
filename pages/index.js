import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import Cart from './components/cart'
import Nav from './nav'
import Poster from './components/poster'
import { useEffect, useState } from 'react'
import { getCookie, setCookie } from 'cookies-next';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BarPost from './components/bp'
import Footer from './components/footer'
import Header from './components/header'

export default function Home(props) {
  const [position, setPos] = useState('')
  const [width, setwidth] = useState('')
  const [qty, setQty] = useState(0)
  const [pr, setPr] = useState()
  const [fooheight,setFoo] = useState()

  useEffect(() => {
    window.onscroll = function () { myFunction() };
    function myFunction() {
      const data = document.querySelector('#main')
      //console.log(window.scrollY,data.offsetTop,window.innerHeight);
      if (window.scrollY > ((data != null ? data.offsetTop : window.offsetTop) - 150)) {
        //console.log('nav dao');
        setPos('fixed')
        setwidth('100%')
        console.log(document.querySelector("#Dnavbar").style.width = '100%');
      } else {
        //console.log('nav utahi nao');
        setPos('relative')
        setwidth('100%')
      }
    }
    
    async function fetchData() {
      const pro = await axios.get(`${window.origin}/api/`, { withCredentials: true })
      // console.log(pro);
      setPr(pro.data)
      const total = pro?.data?.adpd.reduce((acc, curr) => {
        return acc + curr.qty
      }, 0)
      console.log(`Total: ${total}`);
      setQty(total)
      // setQty(pro.data?.adpd?.length)
    }

    const fh = document.documentElement.scrollHeight-document.documentElement.offsetHeight
    console.log(fh);
    setFoo(185)
    

    fetchData()

  }, [])

  async function addtoCart(param) {

    const data = await axios.put(`/api/cart/${param.link}`,
      {
        title: param.title,
        price: param.price,
        image: param.image,
        qty: 1,
        slug: param.link
      },
      { withCredentials: true }
    )
    console.log(data.data);
    if (data.data.data != 0) {
      toast.success('Added to card successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setQty(qty + 1)
    } else {
      toast.warn('Already in cart!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    // console.log(props);
    // alert("hello ")
  }

  let data = props.data ? props.data : null;
  let pro_items = props.pro_items ? props.pro_items : null;
  return (
    <div>
      <Header title={"E-Shop"}/>
      <Nav prodata={props.data} qty={qty} position={position} width={width} />
      <Poster />
      <div id='main' className={styles.main}>
        <div className={styles.cartBody}>
          {data != null ? data.map((product, key) => {
            return (
              <div key={key}>
                <Cart
                  id={key}
                  pid={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.image}
                  link={product.slug}
                  addtoCart={addtoCart}
                />
              </div>
            )
          })
          
          
          :
            <h1>No item found</h1>
          }
          
        </div>
        <br/><br/><br/>
        <BarPost/>
        <br/><br/>
        <div className={styles.cartBody2}>
        {pro_items != null ? pro_items.map((product, key) => {
            return (
              <div key={key}>
                <Cart
                  id={key}
                  pid={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.image}
                  link={product.slug}
                  addtoCart={addtoCart}
                />
              </div>
            )
          })
          :<h1>No item found</h1>
          }
        </div>
        <Footer height={fooheight}/>
      </div>
      
      <ToastContainer />

      
    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  try {
    const t = getCookie('token', { req, res });
    //console.log(t?.length || 0);
    const ck = t?.length || 0
    if (ck == 0) {
      setCookie('token', uuidv4(), {
        req, res,
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 1000,
        sameSite: "lax",
        path: '/'
      });
      console.log('cookie set');
    }



    const result = await axios(`http://${req.headers.host}/api`, { withCredentials: true })

    console.log("from fast page");


    const data = await result.data

    return {
      props: {
        data: data.data,
        pro_items:data.pro_items,
        adpd: data.adpd
      }
    }
  } catch (error) {
    return {
      props: {
        notFound: true
      }
    }
  }

}
