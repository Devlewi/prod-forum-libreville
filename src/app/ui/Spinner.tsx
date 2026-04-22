import React from "react";
import "./styles/Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner-overlay">
      {/* Le conteneur loader sera centré par le parent flex */}
      <div className="loader"></div>
    </div>
  );
};

export default Spinner;