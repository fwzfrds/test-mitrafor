import React from 'react'
import styles from './Page404.module.css'
import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <>
      <div className={`${styles['page404-container']}`}>
        <h1>Page Not Found | <span className={`${styles.notfound}`}>404</span></h1>
        <Link to={'/'} className={`${styles.redirect}`}>Back to Home</Link>
      </div>
    </>
  )
}

export default Page404