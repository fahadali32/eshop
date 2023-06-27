import Head from "next/head";
import Image from "next/image";
import styles from "../styles/cart.module.css";
import axios from "axios";
import Cart from "./components/cart";
import Nav from "./nav";
import Link from "next/link";
import Poster from "./components/poster";
import { useEffect, useState } from "react";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { v4 as uuidv4 } from "uuid";
// import { getSession } from '../lib/auth'
import Design from "./components/cartdesign";
import useSWR from "swr";
import Footer from "./components/footer";

export default function Home(props) {
  const [position, setPos] = useState("");
  const [width, setwidth] = useState("");
  const [qty, setQty] = useState(0);
  const [isAuth, setAuth] = useState();
  const [adpd, setAdpd] = useState([]);
  const [iqty, setIqty] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // getSession().then(data=> setAuth(data))
    async function getAuth() {
      const result = await axios.get("/api/auth/login", {
        withCredentials: true,
      });
      // eslint-disable-next-line react-hooks/rules-of-hooks

      setAuth(result.data);
    }
    getAuth();
    window.onscroll = function () {
      myFunction();
    };
    function myFunction() {
      const data = document.querySelector("#main");
      if (
        window.scrollY >
        (data != null ? data.offsetTop : window.offsetTop) - 150
      ) {
        setPos("fixed");
        setwidth("100%");
        // console.log(document.querySelector("#Dnavbar").style.width = '100%');
      } else {
        setPos("relative");
        setwidth("100%");
      }
    }

    async function fetchData() {
      const pro = await axios.get(`${window.origin}/api/`, {
        withCredentials: true,
      });
      //console.log(pro);
      function findSum(A, N) {
        if (N <= 0) return 0;
        return findSum(A, N - 1) + A[N - 1].qty;
      }
      const temp = findSum(pro.data?.adpd, pro.data?.adpd?.length);
      setQty(temp);
      setAdpd(pro.data?.adpd);
      setLoading(true);
    }
    fetchData();
  }, []);

  async function increaseQty(data) {
    // console.log(data.id);
    adpd.map(async (res) => {
      // console.log(res.slug == data.slug);
      if (res.slug == data.slug) {
        // console.log(res);
        res.qty = res.qty + 1;
        setIqty(iqty + 1);
        setQty(qty + 1);
        const find_res = await axios.patch(
          `${window.origin}/api/cart/adPro`,
          {
            id: data.id,
            title: res.title,
            price: res.price,
            image: res.image,
            qty: res.qty,
            slug: res.slug,
          },
          { withCredentials: true }
        );
        console.log(find_res.data);
      }
    });
  }
  async function decreaseQty(data) {
    adpd.map(async (pro) => {
      if (data.slug == pro.slug && pro.qty > 1) {
        setIqty(iqty - 1);
        setQty(qty - 1);
        pro.qty -= 1;
        const result = await axios.patch(
          `${window.origin}/api/cart/adPro`,
          {
            id: data.id,
            title: pro.title,
            price: pro.price,
            image: pro.image,
            qty: pro.qty,
            slug: pro.slug,
          },
          { withCredentials: true }
        );
        console.log(result.data);
      }
    });
  }

  async function deleteItem(data) {
    var result = [];
    //console.log(qty);
    // console.log(data);
    adpd.map(async (pro) => {
      if (data.slug != pro.slug) {
        console.log(adpd.length);
        result.push(pro);
        setQty(qty - data.qty);
      }
      result.length == 0 ? setQty(0) : result;
    });
    setAdpd(result);
    // console.log(data.qty);
    const res = await axios.delete(
      `${window.origin}/api/cart/adPro?id=${data.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      { withCredentials: true }
    );

    console.log(res.data);
    setIqty(iqty - 1);
  }

  //console.log( isAuth?.passport ? "asi" :"nai" );
  // console.log(adpd);
  return (
    <div>
      <Head>
        <title>E-Shop</title>
        <meta name="description" content="E-Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav prodata={props.data} qty={qty} position={position} width={width} />
      <div className={styles.cartbd}>
        {loading ? (
          adpd?.length != 0 ? (
            adpd?.map((data, i) => {
              return (
                <div key={i}>
                  <Design
                    id={data._id}
                    title={data.title}
                    slug={data.slug}
                    image={data.image}
                    price={data.price}
                    qty={data.qty}
                    increaseQty={increaseQty}
                    decreaseQty={decreaseQty}
                    deleteItem={deleteItem}
                  />
                </div>
              );
            })
          ) : (
            <h1>Card is empty</h1>
          )
        ) : (
          <div className={styles.loadingpanel}>
            <div className={styles.loadingimg}></div>
            <div>
              <div className={styles.loadingtext}></div>

              <div className={styles.loadingprice}></div>
            </div>
          </div>
        )}
      </div>
      <hr />
      
      <h2 style={{textAlign:"center"}}>Total price:
        {adpd.reduce((total, price) => {
          return total + price.qty * price.price;
        }, 0)}
      </h2>
     <button onClick={(e)=>{
      alert("Proceed ...")
     }} className={styles.proBtn}>Proceed to checkout</button>
      {/* <footer className={styles.footer}></footer> */}
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  // console.log(req.isAuthenticated());
  try {
    const t = getCookie("token", { req, res });
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
    console.log(req.headers.host);

    const data = await result.data;

    return {
      props: {
        data: data.data,
        adpd: data.adpd,
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
