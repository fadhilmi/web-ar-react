import React from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  root: {
    display: "flex",
    height: "100vh",
    backgroundColor: "aqua",
    flexDirection: "column",
    alignItems: "center",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    padding: "200px",
  },
  button: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    border: "none",
    borderRadius: "5px",
    width: "250px",
    margin: "20px",
    cursor: "pointer",
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
    flex: 1,
  },
};
const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.root}>
      <div style={styles.wrapper}>
        <button
          style={styles.button}
          onClick={() => {
            navigate("/web-ar");
          }}
        >
          <p style={styles.buttonText}>Open WebAR</p>
        </button>
        <button
          style={styles.button}
          onClick={() => {
            navigate("/web-ar2");
          }}
        >
          <p style={styles.buttonText}>Open WebAR2</p>
        </button>
        <button
          style={styles.button}
          onClick={() => {
            navigate("/web-ar3");
          }}
        >
          <p style={styles.buttonText}>Open WebAR3</p>
        </button>
      </div>
    </div>
  );
};

export default Home;
