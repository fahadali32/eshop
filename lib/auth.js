import axios from "axios";

export async function getSession() {
   const result = await axios.get("/api/auth/login",{ withCredentials:true })
   console.log(result?.data);
   return result?.data
}