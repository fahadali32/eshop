import Head from 'next/head'
import React from 'react'

function Header(props) {
  return (
    <div>
        <Head>
            <title>{props.title}</title>
            <meta name="description" content="A Ecommerce platform where you can buy whatever you want." />
            <link rel="icon" href="/favicon.ico" />
            <meta property="og:image" content="/image.png"/>
          </Head>
    </div>
  )
}

export default Header