import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Nav from '../nav';
import styles from '../../styles/login.module.css'
import Head from 'next/head';
import Link from 'next/link';
import { CgSpinner } from 'react-icons/cg';

function Login(props) {
  const [width, setwidth] = useState('')
  const [qty, setQty] = useState(0)
  const [msg, setMsg] = useState()
  const [display,setDisplay] = useState()
  const [sdisplay,setsDisplay] = useState()

  useEffect(() => {

    async function fetchData() {
      const pro = await axios.get(`${window.origin}/api/`, { withCredentials: true })

      function findSum(A, N) {
        if (N <= 0)
          return 0;
        return (findSum(A, N - 1) + A[N - 1].qty);
      }
      const temp = findSum(pro.data?.adpd, pro.data?.adpd?.length)
      setQty(temp)

    }
    fetchData()

  }, [])

  const router = useRouter()

  async function submitForm(e) {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    axios.defaults.withCredentials = true

    const result = await axios.post(`${window.origin}/api/users/login`, {
      email: email,
      password: password
    }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    }
    )
    setMsg(result.data  )
    console.log(result.data);
    if (result.status == 200 && result.data?.isAuth) {
      router.push("/")
    }
    setDisplay("none")
    setsDisplay("block")

  }
  return (
    <div>
      <Nav prodata={props.data} qty={qty} width={width} />
      <Head>
        <title>E-Shop-login</title>
        <meta name="description" content="E-Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.formCv}>
        <div className={styles.formBd}>
          <h1>Login</h1>
          {msg?.info ? <p className={styles.warn}>{msg?.info}</p>: ""}
          <form onSubmit={(e) => { submitForm(e) }}>
            <input type="email" name="email" className={styles.inputData} placeholder="Input your email" required />
            <br />
            <input type="password" name="password" className={styles.inputData} placeholder="Input your password" required />
            <br />
            <input id="logBefore" style={{display:msg?.info ? "": display}} className={styles.sbbtn} type="submit" value="Log in" />
            <button id="logAfter" style={{display:msg?.info ? "": sdisplay}} className={styles.ansbbtn} type="button"><CgSpinner className={styles.anispi}/></button> 
          </form>
          <br/>
          <p>Dont havent account <Link href={"/auth/register"}><a><u>Register here</u></a></Link></p> 
        </div>

      </div>
    </div>
  )
}

export default Login
export async function getServerSideProps({ req, res }) {
  try {
    const result = await axios(`http://${req.headers.host}/api`, { withCredentials: true })
    console.log("from fast page");
    const data = await result.data
    return {
      props: {
        data: data.data,
        adpd: data.adpd
      }
    }
  } catch (error) {
    return {
      props: {
        notFound: true
      }
    }
  }

}
