import React from 'react'
import { HiHome } from 'react-icons/hi'
import styles from '../../styles/Home.module.css'

function Bar() {
  return (
    <i className={styles.lbar}>
        <svg viewBox="0 0 104 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="104" height="14" rx="7" fill="white"/>
        <rect x="16" y="40" width="88" height="14" rx="7" fill="white"/>
        </svg>
    </i>
  )
}

export default Bar