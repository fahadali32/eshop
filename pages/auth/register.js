import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Nav from "../nav";
import styles from "../../styles/login.module.css";
import { ThreeDots } from "react-loader-spinner";

function Register(props) {
  const [width, setwidth] = useState("");
  const [qty, setQty] = useState(0);
  const [check,setCheck] = useState(false)
  const [ msg , setMsg ] = useState("")

  useEffect(() => {
    async function fetchData() {
      const pro = await axios.get(`${window.origin}/api/`, {
        withCredentials: true,
      });

      function findSum(A, N) {
        if (N <= 0) return 0;
        return findSum(A, N - 1) + A[N - 1].qty;
      }
      const temp = findSum(pro.data?.adpd, pro.data?.adpd?.length);
      setQty(temp);
    }
    fetchData();
  }, []);

  const router = useRouter();
  //console.log(props);
  //console.log(`${window.origin}/api/auth/login`);
  async function submitForm(e) {
    e.preventDefault();
    setCheck(true)
    const email = e.target.email.value;
    const password = e.target.password.value;
    const firstname = e.target.firstname.value;
    const lastname = e.target.lastname.value;
    const username = e.target.username.value;

    axios.defaults.withCredentials = true;

    const result = await axios.post(
      `${window.origin}/api/users/register`,
      {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        username: username,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    // console.log(result);
    if (result.status == 200 && result.data?.isAuth) {
      // router.push("/");
      console.log("logged in");
    } else {
      setMsg(result.data)
      console.log(result.data);
    }
  }
  return (
    <div>
      <div>
        <Nav prodata={props.data} qty={qty} width={width} />
        <div className={styles.formCv}>
          <div className={styles.formBd}>
            <h1>Register</h1>
            <br/>
            <p style={{color:"red"}}>{msg}</p>
            <form
              onSubmit={(e) => {
                submitForm(e);
              }}
            >
              <input
                type="name"
                className={styles.inputData}
                name="username"
                placeholder="Input your username"
                required
              />
              <br />
              <input
                type="name"
                className={styles.inputData}
                name="firstname"
                placeholder="Input your firstname"
                required
              />
              <br />
              <input
                type="name"
                className={styles.inputData}
                name="lastname"
                placeholder="Input your lastname"
                required
              />
              <br />
              <input
                type="email"
                className={styles.inputData}
                name="email"
                placeholder="Input your email"
                required
              />
              <br />
              <input
                type="password"
                className={styles.inputData}
                name="password"
                placeholder="Input your password"
                required
              />
              
              
              <br />
              <button className={styles.sbbtn} type="submit" value="Log in">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <ThreeDots
                    height="15"
                    width="50"
                    radius="9"
                    color="white"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={check}
                  />
                </div>
                {check ? "" : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
export async function getServerSideProps({ req, res }) {
  try {
    const result = await axios(`http://${req.headers.host}/api`, {
      withCredentials: true,
    });
    console.log("from fast page");
    const data = await result.data;
    return {
      props: {
        data: data.data,
        adpd: data.adpd,
      },
    };
  } catch (error) {
    return {
      props: {
        notFound: true,
      },
    };
  }
}
