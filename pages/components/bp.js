import Image from 'next/image'
import React from 'react'
import { HiHome } from 'react-icons/hi'
import styles from '../../styles/Bp.module.css'

function BarPost() {
  return (
    <div className={styles.mainBp}>
      {/* <div className={styles.card1}></div> */}

      <div className={styles.box1}>
        <div className={styles.card1main}>
          <div className={styles.card1}>
            <div className={styles.img1}>
              <h1 className={styles.text1}>{"MEN'S COLLECTION"}</h1>
              <Image src={'/man.png'} alt="Logo" width={40} height={50} layout="responsive"></Image>
            </div>
          </div>
        </div>

        <div className={styles.cardmain}>
          <div className={styles.card2}>
            <div className={styles.img2}>
              <h1 className={styles.text2}>{"WOMEN'S COLLECTION"}</h1>
              <Image src={'/women.png'} alt="Logo" width={40} height={50} layout="responsive"></Image>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.box2}>
        <div className={styles.card3main}>
          <div className={styles.card3}>
            <div className={styles.img3}>
              <h1 className={styles.text3}>SHOES COLLECTION</h1>
              <Image src={'/shoe.png'} alt="Logo" width={60} height={50} layout="responsive"></Image>
            </div>
          </div>
        </div>

        <div className={styles.card4}>
          <div className={styles.img4}>
            <h1 className={styles.text4}>SHOES COLLECTION</h1>
            <div className={styles.image4}>
              <Image src={'/family.png'} alt="Logo" width={60} height={50} layout="responsive"></Image>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default BarPost