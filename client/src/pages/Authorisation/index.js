// src/pages/Authorisation/index.js
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { getUser } from '../../api/index.js';
import styles from "./css/styles.module.css";
import image from './images/image.png';

const Authorisation = ({ onValueChange }) => {
    
    const navigate = useNavigate();

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
        onValueChange((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };
    
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await getUser(userData);
            console.log('User successfully created:', response.data);
            if(response.data.length > 0){
                navigate('/home');
            }
        } catch (error) {
            console.error('Error creating user:', error.message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginSection}>
                <h1 className={styles.logo}>Vibely</h1>
                <div className={styles.loginBox}>
                    <h2 className={styles.title}>Log in to your account</h2>
                    <p className={styles.subTitle}>Welcome back! Please enter your details.</p>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label htmlFor="username" className={styles.label}>Nickname</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username"
                            className={styles.input} 
                            value={userData.username} 
                            onChange={handleChange} 
                            required 
                        />

                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            className={styles.input} 
                            value={userData.email} 
                            onChange={handleChange}
                            required 
                        />

                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password"
                            className={styles.input} 
                            value={userData.password} 
                            onChange={handleChange}
                            required 
                        />

                        <button 
                            type="submit" 
                            className={styles.button}
                        >
                            Log in
                        </button>
                    </form>
                    <p>
                        Don&apos;t have an account? <Link to="/register" className={styles.signUpLink}>Sign up</Link>
                    </p>
                </div>
            </div>
            <div className={styles.imageSection}>
                <img src={image} alt="Decorative" className={styles.image} />
            </div>
        </div>
    );
};

Authorisation.propTypes = {
    onValueChange: PropTypes.func.isRequired,
};

export default Authorisation;
