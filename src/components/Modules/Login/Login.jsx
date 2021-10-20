import React from "react";
import { Link,useHistory  } from "react-router-dom";
import styles from "../../../assets/styles/Login.module.scss";

const Login = () => {

    const history = useHistory();

    const handleSubmit = () => {
        history.push("dashboard");
    }

    return (
        <section className={styles.loginPage}>
            <div className={styles.form}>
            <div className={styles.thumbnail}>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/hat.svg" alt="logo" />
            </div>
            <form>
                <input type="text" placeholder="username" />
                <input type="password" placeholder="password" />
                <button onClick={handleSubmit}>login</button>
                <p className={styles.message}>Forgot Password? <Link to="/dashboard">Reset</Link></p>
            </form>
        </div>
        </section>
    )
}

export default Login