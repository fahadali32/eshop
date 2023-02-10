import React, { useEffect } from 'react'
import styles from '../../styles/Footer.module.css'
import { FaCcVisa,FaCcMastercard,FaPaypal,FaRegCreditCard } from 'react-icons/fa';
import { BsFacebook,BsGithub,BsLinkedin,BsTwitter } from 'react-icons/bs';
import Link from 'next/link';

function Footer(props) {
  useEffect(() => {
    const data = document.getElementById("myFoo")

    console.log(data.offsetHeight);
  }, [])
  return (
    <div id="myFoo" className={styles.footermain} style={{ top: `${props.height}px` }}>
      <div className={styles.footMainbd}>
        <h1 className={styles.footxt}>Eshop</h1>
        <p>A online ecomerce platform</p>
        <div className={styles.social}>
          <Link href={"https://m.facebook.com/i.me.fahad.ali"}>
            <a><BsFacebook className={styles.incon}/></a>
          </Link>
          <Link href={"https://github.com/fahadali32"}>
            <a><BsGithub className={styles.incon}/></a>
          </Link>
          <Link href={"https://www.linkedin.com/mwlite/in/fahad-ali-111034164"}>
            <a><BsLinkedin className={styles.incon}/></a>
          </Link>
          <Link href={"https://twitter.com/FahadAl40129449"}>
            <a><BsTwitter className={styles.incon}/></a>
          </Link>
        </div>
      </div>
      <div className={styles.anotherTxt}>
        <p className={styles.desc}>
          Eshop is demo web app for ecomerce which is running on nextjs.
          This is testing web app so every prodcut that you see here is collected from other sites.
          And all credit goes to the respected owners.
        </p>
      </div>
      <div className={styles.cartImage}>
        <h2>Payment with</h2>
        <FaCcVisa className={styles.incon}/>
        <FaCcMastercard className={styles.incon}/>
        <FaPaypal className={styles.incon}/>
        <FaRegCreditCard className={styles.incon}/>
      </div>
    </div>
  )
}

export default Footer