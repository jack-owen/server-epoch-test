import React, { useEffect, useState } from "react";

import "./style.css";

const Time = () => {
  const [serverEpoch, setServerEpoch] = useState("");

  useEffect(() => {
    getServerEpoch();
  }, []);

  const getServerEpoch = async () => {
    try {
      const res = await fetch(`http://localhost:3001/time`, {
        headers: { authorization: 'mysecrettoken' },
      });

      const text = await res.text();

      setServerEpoch(text);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="time">
      <h1>/time endpoint</h1>
      <div>
        <p>Server Epoch</p>
        <pre>{serverEpoch}</pre>
      </div>
    </div>
  );
};


export default Time;
