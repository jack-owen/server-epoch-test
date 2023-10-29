import React, { useEffect, useState } from "react";
import "./style.css";

import config from "../../config.json";

const Metrics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState("");

  useEffect(() => {
    getPrometheusMetrics();

    const getPrometheusMetricsInterval = setInterval(() => {
      getPrometheusMetrics();
    }, 30000);

    return () => {
      clearInterval(getPrometheusMetricsInterval);
    };
  }, []);

  const getPrometheusMetrics = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${config.serverURI}/metrics`, {
        headers: { authorization: config.secretToken },
      });

      if (!res.ok) throw new Error(res.statusText);

      const text = await res.text();
      setMetrics(text);

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
    <div className="metrics">
      <h1>/metrics endpoint</h1>
      <div>
        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : (
          <pre>{metrics}</pre>
        )}
      </div>
    </div>
  );
};

export default Metrics;
