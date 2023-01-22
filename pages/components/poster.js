import React from 'react'
import Image from 'next/image'
import styles from '../../styles/Poster.module.css'
import Man from '../../public/m.png'
import Fashion from '../../public/fashion.png'
import Shoe from '../../public/shoe.png'
import Tilt from 'react-parallax-tilt';
import { useEffect,useState } from 'react'

function Poster() {
  var [count,setCount] = useState(0)
  const [img,setImg] = useState()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const proImage = {
    0:Shoe.src,
    1:Man.src,
    2:Fashion.src,
  }
  
  useEffect(() => {
    var timer = setInterval(() => {
      setCount(count++)
      if (count == 4) {
        //console.log('done');
        // count = 0
        setCount(count++)
      }
      // console.log(count);
      // document.querySelector('#poster').style != null ? document.querySelector('#poster').style.backgroundImage = `url(${proImage[count-1]})` : null
      // document.querySelector('#poster').style.backgroundImage = `url(${proImage[count-1]})`
      setImg(proImage[count-1])
      // console.log(img);
    }, 3000);
    
    document.querySelector("#move").onmousemove = function () {
      window.clearInterval(timer);
    }
    document.querySelector("#move").onmouseout = function () {
      timer = setInterval(() => {
        setCount(count++)
        if (count == 4) {
          //console.log('done');
          // count = 0
          setCount(count++)
        }
        //console.log(count);
        document.querySelector('#poster').style != null ? document.querySelector('#poster').style.backgroundImage = `url(${proImage[count-1]})` : null

      }, 3000);
    }
    return () => {
      window.clearInterval(timer);
    };

  },[count, img, proImage])
  
  return (
    <div style={{background:'black'}}>
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
              <div id='poster' style={{backgroundImage:img}} className={styles.slider}>
                
              </div>
            </div>
        </Tilt>
    </div> 
    </div>
   
  )
}

export default Poster