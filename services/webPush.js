const express = require("express");
const app = express();
const webpush = require("web-push");

//vapid keys
const publicVapidKey =
  "BJg8uwvEr5FwjPSxAuWxjU126WL3HDjQPq2a9z3d_jpjrXPHO0vS2opSKuXDnUJB1QiBPfG0kv7CeVtm15o2Ruo";

const privateVapidKey = "H_oHbxzRsnkZQ7DzglX5jgI6MkPnW2PpgvdFmW5gl4E";

//webpush setup
webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

app.post("/subscribe", async (req, res) => {
  try {
    const subscription = req.body;
    res.status(200).json({ hey });

    const payload = JSON.stringify({
      title: "Hello",
      body: "this is your first push notify",
    });

    webpush.sendNotification(subscription, payload).catch(console.log);
  } catch (error) {}
});
