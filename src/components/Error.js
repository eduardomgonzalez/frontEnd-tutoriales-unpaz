import React from "react";

const Error = () => {
  return (
    <p
      className="alert alert-danger error errorStyle"
      style={{ textAlign: "center" }}
    >
      Ambos campos son obligatorios
    </p>
  );
};

export default Error;
