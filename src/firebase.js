 import firebase from 'firebase'

// import firebase from 'firebase/app'
// import 'firebase/firebase-messaging'
var firebaseConfig = {
    apiKey: "AIzaSyCD4TiW1qW_GPvhH7IS_wwpotbUCQhp34s",
    authDomain: "carwash-9ff16.firebaseapp.com",
    projectId: "carwash-9ff16",
    storageBucket: "carwash-9ff16.appspot.com",
    messagingSenderId: "287463003324",
    appId: "1:287463003324:web:40d5b77e6ec0695dfdecb9",
    measurementId: "G-2WBBJ9ZTT3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const messaging=firebase.messaging();
//   firebase.analytics();
messaging.onMessage(function (payload)  {
  console.log('Message received. ', payload);
  // Update the UI to include the received message.
 console.log(payload.notification.body);
  //appendMessage(payload);
});
// function appendMessage(payload) {
//   const messagesElement = document.querySelector('#messages');
//   const dataHeaderElement = document.createElement('h5');
//   const dataElement = document.createElement('pre');
//   dataElement.style = 'overflow-x:hidden;';
//   dataHeaderElement.textContent = 'Received message:';
//   dataElement.textContent = JSON.stringify(payload, null, 2);
//   messagesElement.appendChild(dataHeaderElement);
//   messagesElement.appendChild(dataElement);
// }
export default {
  
    messaging: firebase.messaging()
  }

