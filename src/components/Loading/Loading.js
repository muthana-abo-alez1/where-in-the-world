import React from "react";

const Loading = () => {
  return (
    <div className="loading-container d-flex align-items-center flex-column">
      <p className="h5 my-3">Loading...</p>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
