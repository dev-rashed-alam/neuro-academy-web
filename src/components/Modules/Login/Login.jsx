import React, {useContext, useState} from "react";
import {Link, withRouter} from "react-router-dom";
import styles from "../../../assets/styles/Login.module.scss";
import {postMethod} from "../../Config/ApiHandler";
import {FormContext} from "../../Context/FormContext";
import {toast} from 'react-toastify';
import {removeUserSession, setUserSession} from "../../Config/SessionUtils"

const Login = (props) => {
    const [inputData, setInputData] = useState({});
    const {setLoader} = useContext(FormContext)

    const handleChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        setInputData({
            ...inputData,
            [e.target.name]: value
        });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true)
        postMethod("/api/login", inputData).then((response) => {
            console.log(response.data)
            if (response.data.data.is_admin === 1) {
                setUserSession(response.data.data);
                setLoader(false);
                toast.success("Login Successful!");
                props.history.push("dashboard");
            } else {
                removeUserSession();
            }
        }).catch((error) => {
            removeUserSession();
            setLoader(false);
            toast.error(error.response.data.message);
        })
    }

    return (
        <section className={styles.loginPage}>
            <div className={styles.form}>
                <div className={styles.thumbnail}>
                    <img
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/hat.svg" alt="logo"/>
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

export default withRouter(Login)