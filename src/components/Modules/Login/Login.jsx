import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import styles from "../../../assets/styles/Login.module.scss";
import {postMethod} from "../../Config/ApiHandler";

const Login = () => {
    const [inputData, setInputData] = useState({});

    const handleChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        setInputData({
            ...inputData,
            [e.target.name]: value
        });

    }

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        postMethod("/login", inputData).then((response) => {
            if (response.data.is_admin === 1) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("name", response.data.name);
                localStorage.setItem("email", response.data.email);
            }
        }).catch((error) => {
            console.log(error.response.data.message)
        })
        // history.push("dashboard");
    }

    return (
        <section className={styles.loginPage}>
            <div className={styles.form}>
                <div className={styles.thumbnail}>
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/hat.svg" alt="logo"/>
                </div>
                <form>
                    <input type="email" name="email" value={inputData.email} placeholder="Email Address"
                           onChange={handleChange}/>
                    <input type="password" name="password" value={inputData.password} placeholder="password"
                           onChange={handleChange}/>
                    <button onClick={handleSubmit}>login</button>
                    <p className={styles.message}>Forgot Password? <Link to="/dashboard">Reset</Link></p>
                </form>
            </div>
        </section>
    )
}

export default Login