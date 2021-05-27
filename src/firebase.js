 import firebase from 'firebase'

// import firebase from 'firebase/app'
 import 'firebase/firebase-messaging'
var firebaseConfig = {
    apiKey: "AIzaSyCD4TiW1qW_GPvhH7IS_wwpotbUCQhp34s",
    authDomain: "carwash-9ff16.firebaseapp.com",
    projectId: "carwash-9ff16",
    storageBucket: "carwash-9ff16.appspot.com",
    messagingSenderId: "287463003324",
    appId: "1:287463003324:web:40d5b77e6ec0695dfdecb9",
    measurementId: "G-2WBBJ9ZTT3"
  };
  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register('../firebase-messaging-sw.js')
  //     .then(function(registration) {
  //       console.log('Registration successful, scope is:', registration.scope);
  //     }).catch(function(err) {
  //       console.log('Service worker registration failed, error:', err);
  //     });
  //   }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const messaging=firebase.messaging();
//   firebase.analytics();
messaging.onMessage(function (payload)  {
  console.log('Message received. ', payload);
 //appendMessage(payload);
 const notificationTitle = payload.notification.title;
 const notificationOptions = {
     body: payload.notification.body,
     icon: payload.notification.icon,        
 };

 if (!("Notification" in window)) {
     console.log("This browser does not support system notifications");
 }
 // Let's check whether notification permissions have already been granted
 else if (Notification.permission === "granted") {
     // If it's okay let's create a notification
     var notification = new Notification(notificationTitle,notificationOptions);
     notification.onclick = function(event) {
         event.preventDefault(); // prevent the browser from focusing the Notification's tab
         window.open(payload.notification.click_action , '_blank');
         notification.close();
     }
 }
//  self.registration.showNotification(notificationTitle,
//    notificationOptions);
});


export default {
  
    messaging: firebase.messaging()
  }

