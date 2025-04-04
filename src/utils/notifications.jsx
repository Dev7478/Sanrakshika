// Request notification permission
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

// Check if notifications are supported
export const isNotificationsSupported = () => {
  return 'Notification' in window;
};

// Check if notifications are permitted
export const areNotificationsPermitted = () => {
  return Notification.permission === 'granted';
};

// Send a notification
export const sendNotification = (title, options = {}) => {
  if (!isNotificationsSupported() || !areNotificationsPermitted()) {
    return false;
  }

  const defaultOptions = {
    icon: '/logo192.png',
    badge: '/logo192.png',
    vibrate: [200, 100, 200],
    tag: 'sanrakshika-notification',
    renotify: true,
    requireInteraction: true,
    ...options
  };

  try {
    const notification = new Notification(title, defaultOptions);
    
    notification.onclick = function() {
      window.focus();
      this.close();
    };

    return true;
  } catch (error) {
    console.error('Error sending notification:', error);
    return false;
  }
};

// Send an emergency notification
export const sendEmergencyNotification = (title, message, location) => {
  const options = {
    body: message,
    icon: '/emergency-icon.png',
    badge: '/emergency-badge.png',
    vibrate: [500, 200, 500],
    tag: 'sanrakshika-emergency',
    renotify: true,
    requireInteraction: true,
    data: {
      location,
      timestamp: new Date().toISOString()
    },
    actions: [
      {
        action: 'view',
        title: 'View Details'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  };

  return sendNotification(title, options);
};

// Send a reminder notification
export const sendReminderNotification = (title, message, time) => {
  const options = {
    body: message,
    icon: '/reminder-icon.png',
    badge: '/reminder-badge.png',
    vibrate: [200, 100, 200],
    tag: 'sanrakshika-reminder',
    renotify: true,
    requireInteraction: false,
    data: {
      time,
      timestamp: new Date().toISOString()
    }
  };

  return sendNotification(title, options);
};

// Schedule a notification
export const scheduleNotification = (title, options, delay) => {
  if (!isNotificationsSupported() || !areNotificationsPermitted()) {
    return false;
  }

  try {
    setTimeout(() => {
      sendNotification(title, options);
    }, delay);
    return true;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return false;
  }
};

// Cancel all notifications
export const cancelAllNotifications = () => {
  if (isNotificationsSupported()) {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.getNotifications().then(notifications => {
          notifications.forEach(notification => notification.close());
        });
      });
    }
  }
};

// Handle notification click
export const handleNotificationClick = (notification) => {
  const action = notification.action;
  const data = notification.data;

  switch (action) {
    case 'view':
      // Handle view action
      if (data.location) {
        window.open(`/location/${data.location}`, '_blank');
      }
      break;
    case 'dismiss':
      // Handle dismiss action
      notification.close();
      break;
    default:
      // Default click behavior
      window.focus();
      notification.close();
  }
};

// Set up notification event listeners
export const setupNotificationListeners = () => {
  if (isNotificationsSupported()) {
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data && event.data.type === 'NOTIFICATION_CLICK') {
        handleNotificationClick(event.data.notification);
      }
    });
  }
}; 