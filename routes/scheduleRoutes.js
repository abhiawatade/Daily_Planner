// const Router = require("express").Router();
// const { createSchedule } = require("../controllers/scheduleController");

// Router.route("/").post(createSchedule);

// module.exports = Router;

const express = require("express");
const router = express.Router();
const createSchedule = require("../controllers/scheduleController");

router.post("/", createSchedule);

module.exports = router;
