const worker = require("./worker");

const publicVapidKey =
  "BJg8uwvEr5FwjPSxAuWxjU126WL3HDjQPq2a9z3d_jpjrXPHO0vS2opSKuXDnUJB1QiBPfG0kv7CeVtm15o2Ruo";

//checks if current web browser supports Service Worker
if ("serviceWorker" in navigator) {
  registerServiceWorker().catch(console.log);
}

async function registerServiceWorker() {
  const register = await navigator.serviceWorker.register(worker, {
    scope: "/",
  });

  const pushSubscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey,
  });

  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(pushSubscription),
    headers: { "Content-Type": "application/json" },
  });
}
