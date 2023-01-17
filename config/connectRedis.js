const Redis = require("redis");

const RedisClient = Redis.createClient({
  // host: "127.0.0.1",
  // port: 6379,
  // legacyMode: true,
  // this caused issue in setting the redis keys
});

RedisClient.on("error", (err) => console.error("redis error", err));

module.exports = RedisClient;
