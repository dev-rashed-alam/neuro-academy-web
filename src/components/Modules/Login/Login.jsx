import React, {useContext, useState} from "react";
import {withRouter} from "react-router-dom";
import styles from "../../../assets/styles/Login.module.scss";
import {FormContext} from "../../Context/FormContext";
import {toast} from "react-toastify";
import {removeUserSession, setUserSession} from "../../Config/SessionUtils";
import {doLogin} from "../../../services/Login";
import {ReactComponent as IconHat} from "../../../assets/images/icons/loginLogo.svg";
import {printApiErrors} from "../../Config/HelperUtils";

const Login = (props) => {
    const [inputData, setInputData] = useState({});
    const {setLoader} = useContext(FormContext);

    const handleChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        setInputData({
            ...inputData,
            [e.target.name]: value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoader(true);
            const {data} = await doLogin(inputData)
            setUserSession(data)
            toast.success("Login Successful!");
            setLoader(false)
            props.history.push("dashboard")
        } catch (error) {
            printApiErrors(error)
            removeUserSession()
            setLoader(false)
        }
    };

    return (
        <section className={styles.loginPage}>
            <div className={styles.form}>
                <div className={styles.thumbnail}>
                    <IconHat/>
                </div>
                <form>
                    <input
                        type="email"
                        name="email"
                        value={inputData.email || ""}
                        placeholder="Email Address"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        value={inputData.password || ""}
                        placeholder="password"
                        onChange={handleChange}
                    />
                    <button onClick={handleSubmit}>login</button>
                </form>
            </div>
        </section>
    );
};

export default withRouter(Login);
