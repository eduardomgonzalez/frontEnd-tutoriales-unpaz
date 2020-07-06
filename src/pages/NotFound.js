import React from "react";
import "./styles/NotFound.scss";
import Error from "../assets/img/404.gif";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 Not Found</h1>
      <img src={Error} alt="Error 404" />
    </div>
  );
};

export default NotFound;
