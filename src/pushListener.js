self.addEventListener('push', function(event) {

  const data = event.data.json();

  const options = {
    body: data.body,
    tag: 'data-notification',
    vibrate: [500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500],

    requireInteraction: true,
    renotify: true,
    icon: '/icon-512x512.png',
    badge: '/badge.png',
    timestamp: Date.parse(data.timestamp),

    data: {
      time: new Date(Date.now()).toString(),
      message: event.data.text()
    }
  };

  const TITLE = `Step #${data.current_step + 1} complete`;

  const promiseChain = self.registration.showNotification(TITLE, options);


  event.waitUntil(promiseChain);
});

self.addEventListener('notificationclick', function(event) {
  // Close notification.
  event.notification.close();

  // Example: Open window after 3 seconds.
  // (doing so is a terrible user experience by the way, because
  //  the user is left wondering what happens for 3 seconds.)
  const urlToOpen = new URL('/live', self.location.origin).href;

  const openPromise = clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  })
  .then((windowClients) => {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url === urlToOpen) {
          matchingClient = windowClient;
          break;
        }
      }

      if (matchingClient) {
        return matchingClient.focus();
      }

      return clients.openWindow(urlToOpen);
  });

  // Now wait for the promise to keep the permission alive.
  event.waitUntil(openPromise);
});
