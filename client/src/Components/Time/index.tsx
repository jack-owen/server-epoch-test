import React, { useEffect, useState } from "react";

import "./style.css";

const Time = () => {
  const [serverEpoch, setServerEpoch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getServerEpoch();
  }, []);

  const getServerEpoch = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:3001/time`, {
        headers: { authorization: 'mysecrettoken' },
      });

      const text = await res.text();

      setServerEpoch(text);
      const delay = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
  
      return () => clearTimeout(delay);
    } catch (err) {
      setIsLoading(false);
      console.error("Error:", err);
    }
  };

  return (
    <div className="time">
      <h1>/time endpoint</h1>
      <div>
        <p>Server Epoch</p>
        {isLoading ? 
          (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) :
          <pre>{serverEpoch}</pre>
        }
      </div>
    </div>
  );
};


export default Time;
