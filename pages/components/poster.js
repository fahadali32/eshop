import React from 'react'
import Image from 'next/image'
import styles from '../../styles/Poster.module.css'
import Man from '../../public/m.png'
import Fashion from '../../public/fashion.png'
import Shoe from '../../public/shoe.png'
import Tilt from 'react-parallax-tilt';
import { useEffect, useState } from 'react'

function Poster() {
  var [count, setCount] = useState(0)
  const [img, setImg] = useState()
  const [index, setIndex] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const proImage = {
    0: Shoe.src,
    1: Man.src,
    2: Fashion.src,
  }

  useEffect(() => {

    document.querySelector("#move").onmousemove = function () {
      
      window.clearInterval(intervalId);
    }
    document.querySelector("#move").onmouseleave = function () {
      const intervalId = setInterval(() => {
        
        setIndex((index + 1) % Object.keys(proImage).length);
      }, 5000);
      
      return () => clearInterval(intervalId);
    }
      const intervalId = setInterval(() => {
        setIndex((index + 1) % Object.keys(proImage).length);
      }, 5000);
      
      document.querySelector('#poster').style.backgroundImage = `url(${proImage[index]})`
      return () => clearInterval(intervalId);
      
  }, [index, proImage])
  

  return (
    <div style={{ background: 'black' }}>
      <div className={styles.canvas}>
        <div className={styles.elements}>
          <h2 className={styles.topic}>
            Shop where you like to Buy
            <button className={styles.shopNow}>Shop Now</button>
          </h2>
        </div>
        <Tilt
          className={styles.banner}
          perspective={1500}
          //glareEnable={true}
          glareMaxOpacity={0.45}
          scale={1.02}

        >
          <div className={styles.poster} id='move'>
            <div id='poster' style={{ backgroundImage: img }} className={styles.slider}>

            </div>
          </div>
        </Tilt>
      </div>
    </div>

  )
}

export default Poster