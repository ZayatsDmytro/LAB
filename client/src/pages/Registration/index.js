import React, { useState } from "react";
import { Link } from 'react-router-dom';

import { createUser, return123 } from '../../api/index.js';
import styles from "./css/styles.module.css";
import image from './images/image.png'; 

const RegisterPage = () => {
    const [userData, setUserData] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    });

      
    
  
    
      


    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        try {
            const response = await createUser(userData); 
            console.log('User successfully created:', response.data);
        } catch (error) {
            console.error('Error creating user:', error.message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.logo}>Vibely</div>
            <div className={styles.formContainer}>
                <h2 className={styles.heading}>Create a new account</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="name"            
                        placeholder="Name" 
                        className={styles.input} 
                        required 
                        value={userData.name} 
                        onChange={handleChange}
                    />
                    <input 
                        type="text" 
                        name="username"      
                        placeholder="Username" 
                        className={styles.input} 
                        required 
                        value={userData.username} 
                        onChange={handleChange}
                    />
                    <input 
                        type="email" 
                        name="email"              
                        placeholder="Email" 
                        className={styles.input} 
                        required 
                        value={userData.email} 
                        onChange={handleChange}
                    />
                    <input 
                        type="password" 
                        name="password"      
                        placeholder="Password" 
                        className={styles.input} 
                        required 
                        value={userData.password} 
                        onChange={handleChange}
                    />
                    <button type="submit" className={styles.button}>Sign Up</button>
                </form>
                <p>
                    Already have an account? <Link to="/login" className={styles.signUpLink}>Log in</Link>
                </p>
            </div>
            <div className={styles.imageContainer}>
                <img src={image} alt="Decorative" className={styles.image} />
            </div>
        </div>
    );
};

export default RegisterPage;
