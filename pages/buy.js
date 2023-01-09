import React, { useEffect } from 'react'
import { useUser } from '../lib/auth'

function Buy() {
  const user = useUser()
  console.log(user)
  return (
    <div>Buy</div>
  )
}

export async function getServerSideProps({ req, res }) {
  return {
    props: {},
  }
}

export default Buy
