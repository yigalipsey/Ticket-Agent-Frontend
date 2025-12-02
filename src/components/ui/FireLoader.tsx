import React from "react";
import styles from "./FireLoader.module.css";

const FireLoader = () => {
  return (
    <div className={styles.fireLoader}>
      <div className={styles.fire}>
        <div className={styles.fireLeft}>
          <div className={styles.mainFireLeft} />
          <div className={styles.particleFireLeft} />
        </div>
        <div className={styles.fireCenter}>
          <div className={styles.mainFireCenter} />
          <div className={styles.particleFireCenter} />
        </div>
        <div className={styles.fireRight}>
          <div className={styles.mainFireRight} />
          <div className={styles.particleFireRight} />
        </div>
        <div className={styles.fireBottom}>
          <div className={styles.mainFireBottom} />
        </div>
      </div>
    </div>
  );
};

export default FireLoader;
