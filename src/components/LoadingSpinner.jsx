import React from "react";
import "./spinner.css";

function App(props) {
  const {size = 30, color} = props
  return (
    <div className="spinner">
    <span className="loader" style={{width:`${size}`, height:`${size}` }} ></span>
    </div>
  );

}

export default App;