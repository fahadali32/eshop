import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Nav from '../nav';
import styles from '../../styles/login.module.css'
import { CgSpinner } from 'react-icons/cg';
import Head from 'next/head';

function Register(props) {
  const [width, setwidth] = useState('')
  const [qty, setQty] = useState(0)
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
  //console.log(props);
  //console.log(`${window.origin}/api/auth/login`);
  async function submitForm(e) {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    const firstname = e.target.firstname.value
    const lastname = e.target.lastname.value
    const username = e.target.username.value

    axios.defaults.withCredentials = true

    const result = await axios.post(`${window.origin}/api/users/register`, {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
      username: username
    }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    }
    )
    // console.log(result);
    if (result.status == 200 && result.data?.isAuth) {
      router.push('/')
      console.log("logged in");
    } else {
      console.log(result.data);
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
        <meta property="og:image" content="/image.png"/>
      </Head>
      
      <div className={styles.formCv}>
        <div className={styles.formBd}>
          <h1>Register</h1>
          <form onSubmit={(e) => { submitForm(e) }}>
            <input type="name" className={styles.inputData} name="username" placeholder="Input your username" required />
            <br />
            <input type="name" className={styles.inputData} name="firstname" placeholder="Input your firstname" required />
            <br />
            <input type="name" className={styles.inputData} name="lastname" placeholder="Input your lastname" required />
            <br />
            <input type="email" className={styles.inputData} name="email" placeholder="Input your email" required />
            <br />
            <input type="password" className={styles.inputData} name="password" placeholder="Input your password" required />
            <br />
            <input type="submit" className={styles.sbbtn} value="Submit" />
            <button id="logAfter" style={{display:msg?.info ? "": sdisplay}} className={styles.ansbbtn} type="button"><CgSpinner className={styles.anispi}/></button> 
          </form>
        </div>
      </div>

    </div>
  )
}

export default Register
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
