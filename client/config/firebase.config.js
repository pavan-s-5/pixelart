import {getApps, getApp, initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY  ,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN  ,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID  ,
  storageBucket:import.meta.env.VITE_REACT_APP_STORAGE_BUCKET  ,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID  ,
  appId: import.meta.env.VITE_REACT_APP_APP_ID  ,
};

// Initialize Firebase
const app = getApps.length > 0? getApp() : initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
export {app, firebaseAuth}
