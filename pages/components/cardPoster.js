import React from "react";
import styles from "../../styles/CardPoster.module.css";
import Image from "next/image";

function Cardposter() {
  return (
    <div>
      <br />
      <br />
      <br />
      <div className={styles.mainDiv}>
        <div>
          <div className={styles.imagebox}>
            <Image
              src={"/man.png"}
              className={styles.image}
              width={100}
              height={100}
              layout={"responsive"}
              objectFit="contain"
              property="priority"
              alt={"man"}
            ></Image>
          </div>
          <h3 className={styles.cardTxt}>Mens Style</h3>
        </div>
        <div>
          <div className={styles.imagebox}>
            <Image
              src={"/girl.png"}
              className={styles.image}
              width={100}
              height={100}
              layout={"responsive"}
              objectFit="contain"
              property="priority"
              alt={"man"}
            ></Image>
          </div>
          <h3 className={styles.cardTxt}>Womens Style</h3>
        </div>
        <div>
          <div className={styles.imagebox}>
            <Image
              src={"/shoe.png"}
              className={styles.image}
              width={100}
              height={100}
              layout={"responsive"}
              objectFit="contain"
              property="priority"
              alt={"man"}
            ></Image>
          </div>
          <h3 className={styles.cardTxt}>Shoes Collection</h3>
        </div>
        <div>
          <div className={styles.imagebox}>
            <Image
              src={"/family.png"}
              className={styles.image}
              width={100}
              height={100}
              layout={"responsive"}
              objectFit="contain"
              property="priority"
              alt={"man"}
            ></Image>
          </div>
          <h3 className={styles.cardTxt}>Family Collection</h3>
        </div>
      </div>
    </div>
  );
}

export default Cardposter;
