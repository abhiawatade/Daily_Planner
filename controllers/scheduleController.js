const RedisClient = require("../config/connectRedis");

const createSchedule = async (req, res) => {
  try {
    // "schedule":["workout","","breakfast"]
    const { schedule } = req.body;
    console.log(schedule);

    await RedisClient.set("schedule", JSON.stringify(schedule));

    const savedSchedule = await RedisClient.get("schedule");

    res.status(200).json({ message: savedSchedule });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

module.exports = createSchedule;

//createSchedule need to be function You can't pass it as object "{createSchedule}"
//it's callback required scheduleRoutes
