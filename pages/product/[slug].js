import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Slug.module.css";
import Image from "next/image";
import Nav from "../nav";
import { GoPlus } from "react-icons/go";
import { FaMinus } from "react-icons/fa";
import Script from "next/script";
import { v4 as uuidv4 } from "uuid";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import Product from "../../models/shop";
import proImg from "../../models/proimg";
import Cart from "../../models/cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import Footer from "../components/footer";

function SLug(props) {
  const router = useRouter();
  const link = router.query;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [img, setImg] = useState([]);
  const [qty, setQty] = useState(0);
  const [iqty, setIqty] = useState(0);
  const [pimg, setImage] = useState(null);

  useEffect(() => {
    // console.log("props");
    console.log(props);
    if (props.data) {
      setData(props.data[0]);
      setImg(props.image);
      setImage(props.image[0].image);
      setLoading(false);
      console.log(`${window.origin}/api`);
      async function fetchData() {
        const pro = await axios.get(`${window.origin}/api`, {
          withCredentials: true,
        });
        //console.log(pro);
        try {
          function findSum(A, N) {
            if (N <= 0) return 0;
            return findSum(A, N - 1) + A[N - 1].qty;
          }
        } catch (error) {
          console.log(error);
        }

        const temp = findSum(pro.data?.adpd, pro.data?.adpd?.length);
        setQty(temp);
        var totalqt = 0;
        const data = pro.data?.adpd.filter((data, i) => {
          return (totalqt = props?.data[0].slug == data.slug ? data.qty : "");
        });
        setIqty(data.length == 1 ? data[0].qty : 0 || 0);

        // setQty(pro.data?.adpd?.length)
      }
      fetchData();
    }
  }, [props]);

  async function buyNow(param) {
    console.log(iqty <= 0);
    if (iqty <= 0) {
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
      setIqty(iqty + 1);
      setQty(qty + 1);

      const data = await axios.put(
        `/api/cart/${link.slug}`,
        {
          title: param.title,
          price: param.price,
          image: param.image,
          qty: 1,
          slug: link.slug,
        },
        { withCredentials: true }
      );

      router.push("/mycart");
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
  }

  async function addtoCart(param) {
    console.log(link.slug);
    // if (iqty <= 0) {
    //   toast.success("Added to card successfully", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    //   setIqty(iqty + 1);
    //   setQty(qty + 1);

    const data = await axios.put(
      `/api/cart/${link.slug}`,
      {
        title: param.title,
        price: param.price,
        image: param.image,
        qty: 1,
        slug: link.slug,
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
      setIqty(iqty + 1);
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
    console.log(data);
  }

  async function increaseQty(data) {
    setIqty(iqty + 1);
    setQty(qty + 1);

    console.log(data);
    const result = await axios.patch(
      `${window.origin}/api/cart/adPro`,
      {
        id: data._id,
        title: data.title,
        price: data.price,
        image: data.image,
        qty: iqty + 1,
        slug: data.slug,
      },
      { withCredentials: true }
    );
    console.log(result.data);
  }
  async function decreaseQty(data) {
    console.log(iqty <= 1);
    if (iqty <= 1) {
    } else {
      setIqty(iqty - 1);
      setQty(qty - 1);
      const result = await axios.patch(
        `${window.origin}/api/cart/adPro`,
        {
          title: data.title,
          price: data.price,
          image: data.image,
          qty: iqty - 1,
          slug: data.slug,
        },
        { withCredentials: true }
      );
      console.log(result.data);
    }
    // setIqty(iqty-1)
    // setQty(qty-1)
  }
  var bw = 3;
  function leave() {
    mag.style.display = "none";
  }

  function startMove(e) {
    move(e);
    mag.style.display = "block";
    //console.log("touched");
  }

  function move(e) {
    var mag = document.querySelector("#mag");
    var image = document.querySelector("#img");
    mag.style.backgroundImage = `url(${image.src})`;
    mag.style.backgroundRepeat = "no-repeat";
    mag.style.backgroundSize = `${image.width * 3}px ${image.height * 3}px`;
    var w = mag.offsetWidth / 2;
    var h = mag.offsetHeight / 2;
    var bw = 3;
    var a,
      x = 0,
      y = 0;
    e.preventDefault();
    e = e || window.event;
    a = image.getBoundingClientRect();
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    if (x > image.width - w / 3) {
      x = image.width - w / 3;
    }
    if (x < w / 3) {
      x = w / 3;
    }
    if (y > image.height - h / 3) {
      y = image.height - h / 3;
    }
    if (y < h / 3) {
      y = h / 3;
    }
    mag.style.left = x - w + "px";
    mag.style.top = y - h + "px";
    mag.style.backgroundPosition =
      "-" + (x * 3 - w + bw) + "px -" + (y * 3 - h + bw) + "px";
  }
  const [post, setPost] = useState(null);
  //console.log(props.data);
  const { slug } = router.query;
  return (
    <div>
      {isLoading ? (
        "No Content Found"
      ) : (
        <div>
          <Head>
            <title>{data["title"]}</title>
            <meta
              name="description"
              content="E-Shop your desire ecommerce site."
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Nav prodata={props?.data2?.data} qty={qty} />
          <div className={styles.maintainBox}>
            <div className={styles.maincontainer}>
              <div className={styles.containerbox}>
                <div id="box" className={styles.imagebox}>
                  <Image
                    id="img"
                    priority={true}
                    onMouseMove={(e) => {
                      startMove(e);
                    }}
                    src={pimg ? pimg : data["image"]}
                    alt={data.title}
                    width={100}
                    height={100}
                    layout={"responsive"}
                  ></Image>
                  <div
                    id="mag"
                    onMouseLeave={(e) => {
                      leave(e);
                    }}
                    onMouseMove={(e) => {
                      move(e);
                    }}
                    className={styles.mag}
                  ></div>
                  <div className={styles.pro}></div>
                </div>
                <div className={styles.slidebox}>
                  {img.map((pro_img, key) => {
                    return (
                      <div key={key} className={styles.imgslide}>
                        <Image
                          src={pro_img.image}
                          key={key}
                          priority={true}
                          onClick={() => {
                            setImage(pro_img.image);
                          }}
                          alt={data.title}
                          width={100}
                          height={100}
                          layout={"responsive"}
                        ></Image>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={styles.mainbox}>
                <p>Product/{data["title"]}</p>
                <br />
                <h1 className={styles.title}>{data["title"]}</h1>
                <br />
                <h2 className={styles.descripsion}>Price:${data["price"]}</h2>

                <div className={styles.sizebox}>
                  <button
                    onClick={() => {
                      increaseQty();
                    }}
                    className={styles.sizebtn}
                  >
                    <h2>M</h2>
                  </button>
                  <button
                    onClick={() => {
                      increaseQty();
                    }}
                    className={styles.sizebtn}
                  >
                    <h2>L</h2>
                  </button>
                  <button
                    onClick={() => {
                      increaseQty();
                    }}
                    className={styles.sizebtn}
                  >
                    <h2>XL</h2>
                  </button>
                </div>

                <div className={styles.allbox}>
                  <div className={styles.qtybox}>
                    <button
                      onClick={() => {
                        increaseQty(data);
                      }}
                      className={styles.btn}
                    >
                      <GoPlus />
                    </button>
                    <p>{iqty}</p>
                    <button
                      onClick={() => {
                        decreaseQty(data);
                      }}
                      className={styles.btn}
                    >
                      <FaMinus />
                    </button>
                  </div>
                  <div className={styles.qtybox}>
                    <button
                      onClick={() => {
                        addtoCart(data);
                      }}
                      className={styles.cartbtn}
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => {
                        buyNow(data);
                      }}
                      className={styles.cartbtn}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
                <h2 className={styles.descripsion}>Product Details</h2>
                <p className={styles.details}>{data["descripsion"]}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
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

  const result = await Product.find({
    slug: context.params.slug,
  });

  function converter(product) {
    const add = product.map((data) => {
      console.log("from map");
      var temp = data.toObject();
      temp._id = temp._id.toString();
      product = temp;
      data = temp;
      return data;
    });
    product = add;
    return product;
  }

  const data = converter(result);

  const imageResult = await proImg.find({ slug: context.params.slug });
  converter(imageResult);

  const image = converter(await proImg.find({ slug: context.params.slug }));

  // const addp = await db('cart').where({
  //   did:context.req.headers.cookie || null,
  //   slug:context.params.slug
  // }).select('*')

  const addp = await Cart.find({
    did: context.req.headers.cookie || null,
    slug: context.params.slug,
  });

  console.log(addp);

  const get2 = await axios.get(`http://${context.req.headers.host}/api`);
  const data2 = await get2.data;

  return {
    props: {
      data: data,
      image: image,
      data2: data2,
      addp: addp,

      //cookie:req?.headers?.cookie || null
    },
  };
}

export default SLug;
