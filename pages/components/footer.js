import React from "react";
import styles from "../../styles/Footer.module.css";
import Image from "next/image";

function Footer() {
  return (
    <div className={styles.footer}>
      <br />
      <div className={styles.position}>
        <div className={styles.fooLogo}>
          <Image
            src={"/logo.svg"}
            alt="Logo"
            width={10}
            height={10}
            layout="responsive"
          ></Image>
        </div>
        <p>E-shop is a online ecommerce platfrom.You can buy various product.</p>
      </div>
    </div>
  );
}

export default Footer;
