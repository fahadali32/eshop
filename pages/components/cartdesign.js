import Image from 'next/image'
import React from 'react'
import styles from '../../styles/cart.module.css'
import { GoPlus } from 'react-icons/go'
import { FaMinus } from 'react-icons/fa'
import { VscTrash } from "react-icons/vsc";

function Design(props) {
//   console.log(props);

  const { increaseQty,decreaseQty,deleteItem } = props
  return (
    <div className={styles.panel}>
      <div className={styles.imagebox}>
        <Image src={props.image} className={styles.image} width={100} height={100} layout={'responsive'} objectFit='contain' alt={props.title}></Image>
      </div>
      <div className={styles.details}>
        <h3>{props.title}</h3>
        <p>${props.price}</p>
      </div>
      <div className={styles.btnbox}>
        <button onClick={()=>{ increaseQty(props) }} className={styles.btn}><GoPlus/></button>
        <p className={styles.qty}>{props.qty}</p>
        <button onClick={()=>{ decreaseQty(props) }} className={styles.btn}><FaMinus/></button>
      </div>
      <button onClick={()=>{ deleteItem(props) }} className={styles.trash}><VscTrash style={{color:"red"}}/></button>
    </div>
    
  )
}

export default Design