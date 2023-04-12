////şifre resetleme sayfası
import React from 'react'
import styles from "./auth.module.scss"
import resetImg from "../../assets/forgot.png"
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'

const Reset = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={resetImg} alt="Reset" width="400" />
      </div>
      <Card cardClass={styles.form}>
        <h2>Reset</h2>
        <form>
          <input type="text" placeholder="Email" required />
          <button className="--btn --btn-primary --btn-block">Reset Password</button>
          <div className={styles.links}>
            <p>
              <Link to="/login">- Login</Link>
            </p>
            <p>
              <Link to="/register">- Register</Link>
            </p>
          </div>
        </form>
      </Card>
    </section>
  )
}

export default Reset