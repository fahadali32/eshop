import React, { useState } from 'react';
import styles from '../../styles/Home.module.css'
import Image from 'next/image';
import { FaMinus,FaPlus } from "react-icons/fa";
import { FiHeart } from "react-icons/fi"
import {AiFillHeart,AiOutlineHeart} from 'react-icons/ai'
import Link from 'next/link';
import axios from 'axios';

function Cart(props) {
  const [count, setCount] = useState(0);
  const [lc,setLc] = useState(0);
  const [li,setLi] = useState(<AiOutlineHeart/>)

  function quantity(){
    setCount(count+1)
  }
  
  function loveBtn(){
    if (lc == 0) {
      setLi(<AiFillHeart/>)
      setLc(1)
    }else if (lc == 1) {
      setLc(0)
      setLi(<AiOutlineHeart/>)
    }
    console.log(lc);
  }
  const { addtoCart } = props
  return (
    <div key={props.key} style={{"--animation-order": props.id}} id={props.id} className={styles.container}>
        <Link href={`/product/${props.link}`}>
        <a>
          <div className={styles.imagebox}>
            <Image src={props.image} className={styles.image} width={100} height={100} layout={'responsive'} objectFit='contain' property='priority' alt={props.title}></Image>  
          </div>
        </a>
        </Link>
        <div className={styles.detailbox}>
          <h2 className={styles.title}>{props.title}</h2>
          <p className={styles.price}>${props.price}</p>
        </div>
        <div className={styles.qty}>
          <button onClick={()=>{addtoCart(props)}} className={styles.addbtn}>Add to cart</button>
          <span className={styles.loveBtn} onClick={()=>{loveBtn()}}>{li}</span>
        </div>
    </div>
  )
}

export default Cart