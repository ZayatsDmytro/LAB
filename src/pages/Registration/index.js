import React from "react";
import styles from "./css/styles.module.css";
import image from './images/image.png'; 

function RegisterPage() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Vibely</div>
      <div className={styles.formContainer}>
        <h2 className={styles.heading}>Create a new account</h2>
        <form className={styles.form}>
          <input type="text" placeholder="Name" className={styles.input} />
          <input type="text" placeholder="Username" className={styles.input} />
          <input type="email" placeholder="Email" className={styles.input} />
          <input type="password" placeholder="Password" className={styles.input} />
          <button className={styles.button}>Sign Up</button>
        </form>
      </div>
      <div className={styles.imageContainer}>
        <img 
          src={image} 
          alt="Decorative" 
          className={styles.image} 
        />
      </div>
    </div>
  );
}

export default RegisterPage;
