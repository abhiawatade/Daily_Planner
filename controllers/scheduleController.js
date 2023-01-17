const RedisClient = require("../config/connectRedis");
const webpush = require("web-push");
//vapid keys
const publicVapidKey =
  "BJg8uwvEr5FwjPSxAuWxjU126WL3HDjQPq2a9z3d_jpjrXPHO0vS2opSKuXDnUJB1QiBPfG0kv7CeVtm15o2Ruo";

const privateVapidKey = "H_oHbxzRsnkZQ7DzglX5jgI6MkPnW2PpgvdFmW5gl4E";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

const createSchedule = async (req, res) => {
  try {
    // "schedule":["workout","","breakfast"]
    const { schedule, pushSubscription } = req.body;
    console.log(schedule);

    await RedisClient.set("schedule", JSON.stringify(schedule));
    await RedisClient.set("pushSubscription", JSON.stringify(pushSubscription));
    const savedSchedule = await RedisClient.get("schedule");

    webpush
      .sendNotification(
        pushSubscription,
        JSON.stringify({ title: "paradox", body: "be paradox" })
      )
      .catch(console.log);

    res.status(200).json({ message: savedSchedule });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

module.exports = createSchedule;
