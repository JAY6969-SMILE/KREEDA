// src/sections/Yoga/YogaPage.jsx
import React from "react";
import asana from "./asana";
//import styles from "../../components/ExercisePageC/ExerciseList.module.css"; // adjust path as needed
import styles from "./YogaList.module.css";


const YogaPage = () => (
  <div>
    <h2>Yoga Asanas</h2>
    <div className={styles.gridContainer}>
  {asana.map(asana => (
    <div className={styles.card} key={asana.name}>
      <img src={asana.imageUrl} alt={asana.name} />
      <h3>{asana.englishName}</h3>
      <p><em>{asana.name}</em></p>
      <p>{asana.description}</p>
    </div>
  ))}
</div>
  </div>
);

export default YogaPage;
