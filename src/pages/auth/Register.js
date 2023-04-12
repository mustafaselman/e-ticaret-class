//// kayıtlı olmayan kulllanıcılar için kayıt sayfası
import React from 'react'
import styles from "./auth.module.scss"
import registerImg from "../../assets/register.png"
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <Card cardClass={styles.form}>
        <h2>Register</h2>
        <form>
          <input type="text" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="ConfirmPassword" required />
          <button className="--btn --btn-primary --btn-block">Register</button>
        </form>
        <span className={styles.register}>
          <p>Already an account ?</p>
          <Link to="/login">&nbsp; Login</Link>
        </span>
      </Card>
      <div className={styles.img}>
        <img src={registerImg} alt="Login" width="400" />
      </div>
    </section>
  )
}

export default Register