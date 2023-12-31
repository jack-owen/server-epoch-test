import React, { useEffect, useState } from "react";
import "./style.css";

import config from "../../config.json";

const Time = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [serverTime, setServerTime] = useState<Date>();
  const [clientTime, setClientTime] = useState(new Date());

  useEffect(() => {
    getServerEpoch();
    const getServerEpochInterval = setInterval(() => {
      getServerEpoch();
    }, 30000);

    setClientTime(new Date());
    const intervalId = setInterval(() => {
      setClientTime(new Date());
    }, 100);

    return () => {
      clearInterval(getServerEpochInterval);
      clearInterval(intervalId);
    };
  }, []);

  const getServerEpoch = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${config.serverURI}/time`, {
        headers: { authorization: config.secretToken },
      });

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
      setError("Unable to fetch server time");
    }
  };

  const calculateTimeDifference = () => {
    if (serverTime) {
      const timeDifference = Math.abs(
        clientTime.getTime() - serverTime.getTime()
      );

      return new Date(timeDifference).toISOString().slice(11, 19);
    }
  };

  return (
    <div className="time">
      <h1>/time endpoint</h1>
      <div>
        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <p>Server Epoch: {serverTime?.getTime()}</p>
            <p>Time Difference: {calculateTimeDifference()}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Time;
