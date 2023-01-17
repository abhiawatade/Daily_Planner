const { schedule } = require("node-cron");
const RedisClient = require("../config/connectRedis");

const sendMessage = async () => {
  try {
    let date = new Date();
    let minutes = date.getMinutes();
    let hour = date.getHours();

    const schedule = await RedisClient.get("schedule");
    const parsedSchedule = JSON.parse(schedule);

    const index = hour - 9;

    if (minutes === 30) {
      console.log("Tatake");
    } else {
      if (index - 1 >= 0) {
        console.log(
          `its time to start ${parsedSchedule[index]} task , was ${
            parsedSchedule[index - 1]
          }task complete?`
        );
      } else if (index === 0) {
        console.log("stat your day with " + parsedSchedule[index]);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sendMessage };

///home/abhi/Daily_Planner/node_modules/node-cron/src/task.js:9
// throw 'execution must be a function';
// ^
// execution must be a function can't write as sendMessage it needs to be  {sendMessage}
