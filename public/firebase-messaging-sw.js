try {
  importScripts("/__/firebase/9.6.10/firebase-app-compat.js");
  importScripts("/__/firebase/9.6.10/firebase-messaging-compat.js");
  importScripts("/__/firebase/init.js");
} catch (e) {
  importScripts(
    "https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js"
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js"
  );

  firebase.initializeApp();
}

if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage(function (payload) {
    let notificationTitle, notificationOptions;
    if (payload?.notification) {
      notificationTitle = payload.notification.title;
      notificationOptions = {
        body: payload.notification.body,
        icon: "./logo.png",
        image: "./cover.png",
        tag: payload.data.collapseKey,
        actions: [{ action: "open", title: "Open Link" }],
      };
    } else {
      notificationTitle = "Error occurred in transferring";
      notificationOptions = {
        body: `Error [${payload.data.error}] occurred in transferring ${payload.data.job}`,
        icon: "./logo.png",
        image: "./cover.png",
        tag: payload.data.collapseKey,
      };
    }

    return self.registration
      .getNotifications()
      .then(function (notifications) {
        let currentNotification, i;
        for (i = 0; i < notifications.length; i++) {
          if (
            notifications[i].data &&
            notifications[i].data.FCM_MSG &&
            notifications[i].data.FCM_MSG.data &&
            notifications[i].data.FCM_MSG.data.collapseKey === collapseKey
          )
            currentNotification = notifications[i];
        }

        return currentNotification;
      })
      .then(function (currentNotification) {
        if (currentNotification) {
          currentNotification.close();
        }
        return registration.showNotification(
          notificationTitle,
          notificationOptions
        );
      });
  });

  self.addEventListener(
    "notificationclick",
    function (event) {
      event.notification.close();
      if (event.action === "open") {
        clients
          .openWindow(event.notification.body)
          .then((windowClient) => (windowClient ? windowClient.focus() : null));
      } else {
        clients.openWindow("/");
      }
    },
    false
  );
}
