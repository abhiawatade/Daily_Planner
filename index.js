const express = require("express");
const app = express();

const logger = require("morgan");

const PORT = 3000;

const RedisClient = require("./config/connectRedis");
const scheduleRoutes = require("./routes/scheduleRoutes");
require("./services/scheduler");

app.use(express.json());
app.use(logger("dev"));
app.use("/api/schedule", scheduleRoutes);

app.listen(PORT, () => {
  console.log("Server is listening to the port = " + PORT);

  RedisClient.connect()
    .then(() => {
      console.log("connected to redis");
    })
    .catch((e) => {
      console.error(e);
    });
});
