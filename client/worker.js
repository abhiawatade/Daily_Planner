self.addEventListener("push", function (event) {
  const data = event.data.JSON();

  // const payload = event.data.text();
  // const data = JSON.parse(payload);
  self.registration.showNotification(data.title, { body: data.body });
});
