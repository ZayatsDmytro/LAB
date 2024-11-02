import styles from "./css/styles.module.css";
import image from './images/image.png'; 
import React from 'react';

const Authorisation = () => {
    return (
        <div className={styles.container}>
            <div className={styles.loginSection}>
                <h1 className={styles.logo}>Vibely</h1>
                <div className={styles.loginBox}>
                    <h2 className={styles.title}>Log in to your account</h2>
                    <p className={styles.subTitle}>Welcome back! Please enter your details.</p>
                    <form className={styles.form}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input type="email" id="email" className={styles.input} required />

                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input type="password" id="password" className={styles.input} required />

                        <button type="submit" className={styles.button}>Log in</button>
                    </form>
                    <p>Don't have an account? <a href="#" className={styles.signUpLink}>Sign up</a></p>
                </div>
            </div>
            <div className={styles.imageSection}>
                <img src={image} alt="Decorative" className={styles.image} />
            </div>
        </div>
    );
};

export default Authorisation;
