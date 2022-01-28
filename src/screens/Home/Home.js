import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const onOpenAR = () => {
    navigate("/web-ar");
  };
  return (
    <div>
      <h2>Home</h2>

      <button onClick={onOpenAR}>Open AR</button>
    </div>
  );
};

export default Home;
