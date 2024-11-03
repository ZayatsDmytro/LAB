// src/pages/HomePage/index.js
import PropTypes from "prop-types";
import React from "react";
import { FaBookmark, FaEdit, FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

import styles from "./css/styles.module.css";
import image from './images/image.png'; 

const HomePage = ({ userData }) => {
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.logo}>Vibely</div>
                <div className={styles.profile}>
                    <div className={styles.profileImage}></div>
                    <div>
                        <div className={styles.profileName}>{userData ? userData.name : "user"}</div>
                        <div>@{userData ? userData.username : "username"}</div>
                    </div>
                </div>
                <div className={styles.navItem}><FaHome className={styles.icon}/> Home</div>
                <div className={styles.navItem}><FaUser className={styles.icon}/> Explore</div>
                <div className={styles.navItem}><FaBookmark className={styles.icon}/> Saved</div>
                <div className={styles.navItem}><FaEdit className={styles.icon}/> Create Post</div>
                <Link to="/login" className={styles.navItem}>
                    <FaSignOutAlt className={styles.icon}/> Logout
                </Link>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.heading}>Home Feed</div>
                <div className={styles.post}>
                    <div className={styles.postTitle}>New stunning learning resource</div>
                    <div className={styles.postText}>
                        LearnHub offers tailored courses, tutorials, and guides in diverse fields.
                    </div>
                    <img src={image} alt="Post" className={styles.postImage} />
                </div>
            </div>
        </div>
    );
};

HomePage.propTypes = {
    userData: PropTypes.shape({
        name: PropTypes.string,
        username: PropTypes.string,
    }),
};

export default HomePage;
