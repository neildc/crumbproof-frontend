import { ROOT_URL } from "../constants/hosts";

const WEB_PUSH_PUBLIC_SERVER_KEY =
  "BNcTV0aChYe0rQvFVi89kflPX3TfGCTShaiPT7mAoJg5M1GFmtRB_BYSljIDavClJV6xaQ3Zj6wat3tW-fjWnf8";

function urlBase64ToUint8Array(base64String) {
  // eslint-disable-next-line
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  // eslint-disable-next-line
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function askPushNotificationsPermission() {
  return new Promise((resolve, reject) => {
    const permissionResult = Notification.requestPermission(result => {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  }).then(permissionResult => {
    if (permissionResult !== "granted") {
      /* throw new Error('We weren\'t granted permission.'); */
    }
  });
}

function sendSubscriptionToBackEnd(subscription) {
  return fetch(`${ROOT_URL}/user/web_push_subscription/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(subscription)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(
          "Push subscription failed: Bad status code from server."
        );
      }

      return response.json();
    })
    .then(responseData => {
      if (!(responseData.status && responseData.status.success)) {
        throw new Error("Push subscription failed: Bad response from server.");
      }
    });
}

export function subscribeUserToPush() {
  return navigator.serviceWorker
    .register("service-worker.js")
    .then(registration => {
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(WEB_PUSH_PUBLIC_SERVER_KEY)
      };

      return registration.pushManager.subscribe(subscribeOptions);
    })
    .then(pushSubscription => {
      sendSubscriptionToBackEnd(pushSubscription);
      return pushSubscription;
    });
}
