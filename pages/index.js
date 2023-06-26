import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Cart from "./components/cart";
import Nav from "./nav";
import Link from "next/link";
import Poster from "./components/poster";
import { useEffect, useState } from "react";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cardposter from "./components/cardPoster";

export default function Home(props) {
  const [position, setPos] = useState("");
  const [width, setwidth] = useState("");
  const [qty, setQty] = useState(0);
  const [pr, setPr] = useState();

  useEffect(() => {
    window.onscroll = function () {
      myFunction();
    };
    function myFunction() {
      const data = document.querySelector("#main");
      //console.log(window.scrollY,data.offsetTop,window.innerHeight);
      if (
        window.scrollY >
        (data != null ? data.offsetTop : window.offsetTop) - 150
      ) {
        //console.log('nav dao');
        setPos("fixed");
        setwidth("100%");
        console.log((document.querySelector("#Dnavbar").style.width = "100%"));
      } else {
        //console.log('nav utahi nao');
        setPos("relative");
        setwidth("100%");
      }
    }

    async function fetchData() {
      const pro = await axios.get(`${window.origin}/api/`, {
        withCredentials: true,
      });
      // console.log(pro);
      console.log(pro.data);
      setPr(pro.data);
      const total = pro?.data?.adpd.reduce((acc, curr) => {
        return acc + curr.qty;
      }, 0);
      console.log(`Total: ${total}`);
      setQty(total);
      // setQty(pro.data?.adpd?.length)
    }
    fetchData();
  }, []);

  async function addtoCart(param) {
    const data = await axios.put(
      `/api/cart/${param.link}`,
      {
        title: param.title,
        price: param.price,
        image: param.image,
        qty: 1,
        slug: param.link,
      },
      { withCredentials: true }
    );
    console.log(data.data);
    if (data.data.data != 0) {
      toast.success("Added to card successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setQty(qty + 1);
    } else {
      toast.warn("Already in cart!", {
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
    console.log(props);
    // alert("hello ")
  }

  let data = props.data ? props.data : null;
  let data2 = props.data2 ? props.data2 : null;
  console.log(data2);
  return (
    <div>
      <Head>
        <title>E-Shop</title>
        <meta name="description" content="E-Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav prodata={props.data} qty={qty} position={position} width={width} />
      <Poster />
      <div id="main" className={styles.main}>
        <br/><br/>
        <div className={styles.cartBody}>
          {data != null ? (
            data.map((product, key) => {
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
              );
            })
          ) : (
            <h1>No item found</h1>
          )}
        </div>
        <Cardposter />
        <br/><br/>
        <div className={styles.cardContainer}>
          <div className={styles.cartBody2}>
            {data2 != null ? (
              data2.map((product, key) => {
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
                );
              })
            ) : (
              <h1>No item found</h1>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />

      <footer className={styles.footer}></footer>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  try {
    const t = getCookie("token", { req, res });
    //console.log(t?.length || 0);
    const ck = t?.length || 0;
    if (ck == 0) {
      setCookie("token", uuidv4(), {
        req,
        res,
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 1000,
        sameSite: "lax",
        path: "/",
      });
      console.log("cookie set");
    }

    const result = await axios(`http://${req.headers.host}/api`, {
      withCredentials: true,
    });

    console.log("from fast page");

    const data = await result.data;

    return {
      props: {
        data: data.data,
        adpd: data.adpd,
        data2: data.anotherProduct,
      },
    };
  } catch (error) {
    return {
      props: {
        notFound: true,
      },
    };
  }
}
