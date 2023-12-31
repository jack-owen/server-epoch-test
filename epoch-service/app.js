const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const promMid = require("express-prometheus-middleware");

const timeRouter = require("./routes/time");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

app.use((req, res, next) => {
  const authHeader = req.header("Authorization");
  if (authHeader === "mysecrettoken") {
    next();
  } else {
    res.status(403).json({ error: "Forbidden: Invalid Authorization token" });
  }
});

app.use(
  promMid({
    metricsPath: "/metrics",
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  })
);

app.use("/time", timeRouter);

module.exports = app;
