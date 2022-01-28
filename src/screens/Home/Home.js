import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <button
        className={styles.button}
        onClick={() => {
          navigate("/web-ar");
        }}
      >
        <p>Open WebAR</p>
      </button>
      <button
        className={styles.button}
        onClick={() => {
          navigate("/web-ar2");
        }}
      >
        <p>Open WebAR2</p>
      </button>
      <button
        className={styles.button}
        onClick={() => {
          navigate("/web-ar3");
        }}
      >
        <p>Open WebAR3</p>
      </button>
    </div>
  );
};

export default Home;
