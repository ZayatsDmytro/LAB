import React from "react";
import styles from "./css/styles.module.css";

import { FaHome, FaUser, FaBookmark, FaEdit, FaSignOutAlt } from "react-icons/fa";
import image from './images/image.png'; 

function HomeFeed() {
  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.logo}>Vibely</div>
        <div className={styles.profile}>
          <div className={styles.profileImage}></div>
          <div>
            <div className={styles.profileName}>Faizan</div>
            <div>@faizan</div>
          </div>
        </div>
        <div className={styles.navItem}><FaHome className={styles.icon}/> Home</div>
        <div className={styles.navItem}><FaUser className={styles.icon}/> Explore</div>
        <div className={styles.navItem}><FaBookmark className={styles.icon}/> Saved</div>
        <div className={styles.navItem}><FaEdit className={styles.icon}/> Create Post</div>
        <div className={styles.navItem}><FaSignOutAlt className={styles.icon}/> Logout</div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.heading}>Home Feed</div>
        <div className={styles.post}>
          <div className={styles.postTitle}>New stunning learning resource</div>
          <div className={styles.postText}>
            In an ever-evolving world, LearnHub stands as your ultimate learning resource—an interactive, dynamic platform designed to foster curiosity, creativity, and critical thinking. Whether you’re a student, professional, or lifelong learner, LearnHub offers tailored courses, tutorials, and guides in diverse fields.
          </div>
          <img src={image} alt="Post" className={styles.postImage} />
          <div className={styles.postFooter}>
            <span className={styles.icon}>👍</span> 35
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeFeed;
