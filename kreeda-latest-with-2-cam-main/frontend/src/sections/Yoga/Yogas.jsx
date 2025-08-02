import React, { useEffect, useState } from "react";
import styles from "./YogaList.module.css"; // Make sure this file exists

const Yogas = () => {
  const [asanas, setAsanas] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/asanas`)
      .then((res) => res.json())
      .then((data) => setAsanas(data))
      .catch((err) => console.error("Failed to load asanas:", err));
  }, []);

  return (
    <div className={styles.gridContainer}>
      {asanas.length === 0 ? (
        <p style={{ textAlign: "center", paddingTop: "2rem" }}>No asanas found.</p>
      ) : (
        asanas.map((asana) => (
          <div className={styles.card} key={asana._id || asana.name}>
            <img src={asana.imageUrl} alt={asana.englishName} className={styles.cardImage} />
            <div className={styles.cardContent}>
              <h3>{asana.englishName}</h3>
              <p><em>{asana.name}</em></p>
              <p>{asana.description}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Yogas;

