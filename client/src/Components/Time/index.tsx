import { timeStamp } from "console";
import React, { useEffect, useState } from "react";

import "./style.css";

const Time = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverTime, setServerTime] = useState(new Date());
  const [clientTime, setClientTime] = useState(new Date());

  useEffect(() => {
    getServerEpoch();
  }, []);

  const getServerEpoch = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:3001/time`, {
        headers: { authorization: 'mysecrettoken' },
      });

      if (!res.ok) throw new Error(res.statusText);

      const { epoch } = await res.json();

      const epochTimestamp = parseInt(epoch, 10);
      const date = new Date(epochTimestamp);
      setServerTime(date);

      const delay = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
  
      return () => clearTimeout(delay);
    } catch (err) {
      setIsLoading(false);
      console.error("Error:", err);
    }
  };

  const calculateTimeDifference = () => {
    if (serverTime) {
      const timeDifference = Math.abs(
        (clientTime.getSeconds() - serverTime.getSeconds())
      );

      return new Date(timeDifference).toISOString().slice(11, 19);
    }
  };

  return (
    <div className="time">
      <h1>/time endpoint</h1>
      <div>
        {isLoading ? 
          (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) :
          <>
            <p>Server Epoch: {serverTime.getTime()}</p>
            <p>Time Difference: {calculateTimeDifference()}</p>
          </>
        }
      </div>
    </div>
  );
};


export default Time;
