import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { saveNotificationToken } from "../constants/Api";

//--------GET TOKEN FROM LOCAL STORAGE---------
const jwt = localStorage.getItem("token");

// -------------Initialize Firebase----------------
const firebaseConfig = {
  apiKey: "AIzaSyDC1ecgHuzmN2RxDyQcsHZRDSnSAaqVU0w",
  authDomain: "horizon-residence.firebaseapp.com",
  projectId: "horizon-residence",
  storageBucket: "horizon-residence.appspot.com",
  messagingSenderId: "740497421368",
  appId: "1:740497421368:web:4abea47c8416290d64a2cd",
  measurementId: "G-31KNRS5J5F",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
const setupNotifications = async (message) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted" && jwt) {
      console.log("Notification permission granted.");

      // Get the FCM token
      console.log(message, "Message");
      const token = await getToken(messaging);
      const data = { notification_token: token, device_type: "WEB" };
      saveNotificationToken(data, jwt)
        .then((res) => console.log(res.message))
        .catch((err) => console.log(err.response));
      console.log("FCM Token:", token);
    } else {
      console.log("Notification permission denied.");
    }
  } catch (error) {
    console.log(error);
  }
};
export { messaging, setupNotifications };
