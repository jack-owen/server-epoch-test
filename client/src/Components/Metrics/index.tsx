import React, { useEffect, useState } from "react";

import "./style.css";

const Metrics = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);

  return (
    <div className="metrics">
      <h1>/metrics endpoint</h1>
      <div>
        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Metrics;
