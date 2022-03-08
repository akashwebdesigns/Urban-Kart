import React from "react";
import "./errorPage.css";
import { useHistory } from "react-router-dom";

const ErrorPage = () => {
  const history=useHistory();
  return (
    <div className="errDiv">
      <img className="errImg" src="/404.png" alt="" />
      <button onClick={()=>history.push("/")} className="btn">Home Page</button>
    </div>
  );
};

export default ErrorPage;
