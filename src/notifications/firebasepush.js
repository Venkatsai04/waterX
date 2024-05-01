// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDiOKg8nl6tURPhrs9w-7P4KHuDReGMNH0",
    authDomain: "esp32-pwa.firebaseapp.com",
    projectId: "esp32-pwa",
    storageBucket: "esp32-pwa.appspot.com",
    messagingSenderId: "7899767448",
    appId: "1:7899767448:web:3a5304c1bfd01b00e066ed",
    measurementId: "G-CB2MR64LH5"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);


export const reqPerm = async()=>{
    const permisssion = await Notification.requestPermission();
    console.log(permisssion);
    if(permisssion == "granted"){
        const token = await getToken(messaging, {
            vapidKey: 'BA0YxLxidcb4o2bpLO_4Lg6x3vm01sb0_H4GXcXOOEQOrhXTAZAlRfc6pXzDjKec8ee_pvjRQ7nOavKUqxDTThE'
        })
        console.log(token);
    }
}