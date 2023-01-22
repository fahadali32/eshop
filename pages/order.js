
import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/check.module.css'
import axios from 'axios'
import Cart from './components/cart'
import Nav from './nav'
import Link from 'next/link'
import Poster from './components/poster'
import { useEffect, useState } from 'react'
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import { v4 as uuidv4 } from 'uuid';
// import { getSession } from '../lib/auth'
import Design from './components/cartdesign'
import useSWR from 'swr'
import { useRouter } from 'next/router'

function Checkout(props) {

    const [isAuth, setAuth] = useState()
    const [qty, setQty] = useState(0)
    const [adpd, setAdpd] = useState([])
    const [iqty, setIqty] = useState(0)
    const [loading, setLoading] = useState(false)
    const [position, setPos] = useState('')
    const [width, setwidth] = useState('')

    useEffect(() => {
        async function getAuth() {
            const result = await axios.get("/api/user", { withCredentials: true })
            setAuth(result.data)
        } getAuth()
        async function fetchData() {
            const pro = await axios.get("/api/", { withCredentials: true })
            console.log(pro);
            function findSum(A, N) {
                if (N <= 0)
                    return 0;
                return (findSum(A, N - 1) + A[N - 1].qty);
            }
            const temp = findSum(pro.data?.adpd, pro.data?.adpd?.length)
            setQty(temp)
            setAdpd(pro.data?.adpd)
            setLoading(true)
        }
        fetchData()

        window.onscroll = function () { myFunction() };
        function myFunction() {
            const data = document.querySelector('#main')
            if (window.scrollY > ((data != null ? data.offsetTop : window.offsetTop) - 150)) {
                setPos('fixed')
                setwidth('100%')
                // console.log(document.querySelector("#Dnavbar").style.width = '100%');
            } else {
                setPos('relative')
                setwidth('100%')
            }
        }
    }, [])

    const router = useRouter()
    async function submitForm(e) {
        e.preventDefault()
        const data = await axios.post(`/api/order`, {
            country: e.target.country.value,
            city: e.target.city.value,
            adress: e.target.adress.value,
            postcode: e.target.postcode.value,
            phone: e.target.phone.value

        }, { withCredentials: true })
        console.log(data);
        if (data.status == 200) {
            router.push('/')
        }
        
    }

    // console.log(isAuth?.passport?.user ? "ase" : "nai");
    return (
        <div>
            <Nav prodata={props.data} qty={qty} position={position} width={width} />
            {loading ?

                isAuth?.passport?.user && adpd.length != 0 ?
                    <div className={styles.formMain}>
                        <div className={styles.checkForm}>
                            <h1>Billing adress</h1>
                            <form onSubmit={(e) => { submitForm(e) }}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><input type='adress' className={styles.formInput} name='country' placeholder='Enter the country name' required></input><br /></td>
                                            <td><input type='adress' className={styles.formInput} name='city' placeholder='Enter the city' required></input><br /></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}><input type='adress' className={styles.formInput} name='adress' placeholder='Enter the adress' required></input><br /></td>
                                        </tr>
                                        <tr>
                                            <td><input type='number' className={styles.formInput} name='postcode' placeholder='Enter the postal code' required></input><br /></td>
                                            <td><input type='number' className={styles.formInput} name='phone' placeholder='Enter the phone number' required></input></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <button className={styles.payBtn}>Pay ${adpd.reduce((acc, curr) => { return acc + curr.price * curr.qty }, 0)} </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </form>
                        </div>
                        {/* <div className={styles.priceBox}>

                        </div> */}
                    </div>
                    :
                    <div>
                        <h3>You havent logged in yet.<Link href={'/auth/login'}><a style={{}}>Login</a></Link> First</h3>
                    </div>


                : ""}



        </div>
    )
}

export async function getServerSideProps({ req, res }) {

    try {
        const t = getCookie('token', { req, res });
        const ck = t?.length || 0
        if (ck == 0) {
            setCookie('token', uuidv4(), {
                req, res,
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: 60 * 1000,
                sameSite: "lax",
                path: '/'
            });
            console.log('cookie set');
        }

        const result = await axios(`http://${req.headers.host}/api`, { withCredentials: true })

        console.log("from fast page");
        console.log(req.headers.host);

        const data = await result.data

        return {
            props: {
                data: data.data,
                adpd: data.adpd,
                token: getCookie('token', { req, res })
            }
        }
    } catch (error) {
        return {
            props: {
                notFound: true
            }
        }
    }
    return {
        props: {}
    }
}

export default Checkout
