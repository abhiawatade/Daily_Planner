const URI = "http://localhost:3000/api/schedule";

const publicVapidKey =
  "BJg8uwvEr5FwjPSxAuWxjU126WL3HDjQPq2a9z3d_jpjrXPHO0vS2opSKuXDnUJB1QiBPfG0kv7CeVtm15o2Ruo";

const form = document.getElementById("myForm");
form.addEventListener("submit", async function (e) {
  try {
    e.preventDefault();
    var inputArray = document.getElementById("InputArray").value;
    var scheduleArray = JSON.parse(inputArray);

    const register = navigator.serviceWorker.register("worker.js", {
      scope: "/",
    });

    if (!(PushManager in window)) {
      alert("Push manager is not available");
      return;
    }
    if (Notification.permission === "denied") {
      alert("need notification permission");
      return;
    }

    const pushSubscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: publicVapidKey,
    });

    const response = await fetch("/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        schedule: scheduleArray,
        pushSubscription,
      }),
    });

    const data = await response.json();
    console.log(data);
    alert("Subscribed");
  } catch (error) {
    alert(error);
  }
});
